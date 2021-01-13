<?php
$envjson0 = base64_decode(__EXSTRNG__);
$envjson = json_decode($envjson0);
$url = $envjson->url;

$token = $envjson->params->token;
if(strpos($envjson->url, "?") !== false) {
  $namespace = explode("?", $envjson->url)[0];
  $namespace = substr($namespace, 1);
} else {
  $namespace = $envjson->url;
  $namespace = substr($namespace, 1);
}

// sio_message('event', $namespace);

function websocket_open($host='',$port=80,$headers='',&$error_string='',$timeout=10,$ssl=false, $persistant = false, $path = '/', $context = null){

  $key=base64_encode(openssl_random_pseudo_bytes(16));

  $header = "GET " . $path . " HTTP/1.1\r\n"
    ."Host: $host\r\n"
    ."pragma: no-cache\r\n"
    ."Upgrade: WebSocket\r\n"
    ."Connection: Upgrade\r\n"
    ."Sec-WebSocket-Key: $key\r\n"
    ."Sec-WebSocket-Version: 13\r\n";

  if(!empty($headers)) foreach($headers as $h) $header.=$h."\r\n";

  $header.="\r\n";

  $host = $host ? $host : "127.0.0.1";
  $port = $port <1 ? ( $ssl ? 443 : 80 ): $port;
  $address = ($ssl ? 'ssl://' : '') . $host . ':' . $port;
  
  $flags = STREAM_CLIENT_CONNECT | ( $persistant ? STREAM_CLIENT_PERSISTENT : 0 );
  $ctx = $context ?? stream_context_create ();
  $sp = stream_socket_client($address, $errno, $errstr, $timeout, $flags, $ctx);
  
  if(!$sp){
    $error_string = "Unable to connect to websocket server: $errstr ($errno)";
    return false;
  }

  stream_set_timeout($sp,$timeout);

  if (!$persistant or ftell($sp) === 0) {

    $rc = fwrite($sp,$header);
    if(!$rc){
      $error_string
        = "Unable to send upgrade header to websocket server: $errstr ($errno)";
      return false;
    }

    $reaponse_header=fread($sp, 1024);

    if (stripos($reaponse_header, ' 101 ') === false
      || stripos($reaponse_header, 'Sec-WebSocket-Accept: ') === false) {
      $error_string = "Server did not accept to upgrade connection to websocket."
        .$reaponse_header. E_USER_ERROR;
      return false;
    }

  }
  return $sp;
}

function websocket_write($sp,$data,$final=true,$binary=true){
  if ($binary)
      $header=chr(($final?0x80:0) | 0x02); // 0x02 binary mode
  else
      $header=chr(($final?0x80:0) | 0x01); // 0x01 text mode

  if(strlen($data)<126) $header.=chr(0x80 | strlen($data));
  elseif (strlen($data)<0xFFFF) $header.=chr(0x80 | 126) . pack("n",strlen($data));
  else $header.=chr(0x80 | 127) . pack("N",0) . pack("N",strlen($data));

  $mask=pack("N",rand(1,0x7FFFFFFF));
  $header.=$mask;

  for($i = 0; $i < strlen($data); $i++)
    $data[$i]=chr(ord($data[$i]) ^ ord($mask[$i % 4]));

  return fwrite($sp,$header.$data);
}

function websocket_read($sp,&$error_string=NULL){
  $data="";

  do{
    $header=fread($sp,2);
    if(!$header){
      $error_string = "Reading header from websocket failed.";
      return false;
    }

    $opcode = ord($header[0]) & 0x0F;
    $final = ord($header[0]) & 0x80;
    $masked = ord($header[1]) & 0x80;
    $payload_len = ord($header[1]) & 0x7F;

    $ext_len = 0;
    if($payload_len >= 0x7E){
      $ext_len = 2;
      if($payload_len == 0x7F) $ext_len = 8;
      $header=fread($sp,$ext_len);
      if(!$header){
        $error_string = "Reading header extension from websocket failed.";
        return false;
      }

      $payload_len= 0;
      for($i=0;$i<$ext_len;$i++)
        $payload_len += ord($header[$i]) << ($ext_len-$i-1)*8;
    }

    if($masked){
      $mask=fread($sp,4);
      if(!$mask){
        $error_string = "Reading header mask from websocket failed.";
        return false;
      }
    }

    $frame_data='';
    do{
      $frame= fread($sp,$payload_len);
      if(!$frame){
        $error_string = "Reading from websocket failed.";
        return false;
      }
      $payload_len -= strlen($frame);
      $frame_data.=$frame;
    }while($payload_len>0);
    if($opcode == 9){
      fwrite($sp,chr(0x8A) . chr(0x80) . pack("N", rand(1,0x7FFFFFFF)));
      continue;
    } elseif($opcode == 8){
      fclose($sp);
    }elseif($opcode < 3){
      $data_len=strlen($frame_data);
      if($masked)
        for ($i = 0; $i < $data_len; $i++)
          $data.= $frame_data[$i] ^ $mask[$i % 4];
      else
        $data.= $frame_data;

    }else
      continue;

  } while(!$final);

  return $data;
}

if($ws = websocket_open('localhost', 81)) {
  websocket_write($ws, "event");
}

echo json_encode(Array(
  "status" => "ok",
  "event" => $namespace,
  "token" => $token,
  "key" => md5($token) . " : " . md5($namespace)
), JSON_PRETTY_PRINT);

// Worker::runAll();

?>