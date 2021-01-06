const Docker = require('dockerode');

require('./socket-daemon.js');
require('./socket.js');
require('./api.js');

var docker = new Docker({
  socketPath: __dirname + '/system/pb-docker-daemon.sock',
  // host: '127.0.0.1',
  // port: 33941
});

docker.createContainer({Cmd: ['/bin/bash'], name: 'pipeboard0'}, function(errparent, containerparent) {
  if(errparent) console.log(errparent);
  containerparent.start(function (err, data) {});

  docker.createContainer({Image: 'httpd', Cmd: ['/bin/bash'], name: 'system_apache0', 'cgroup-parent': 'pipeboard0'}, function(err, container) {
    if(err) console.log(err);

    container.start(function (err, data) {
      console.log(data);
      var container2 = docker.getContainer("system_apache0");

      container2.attach({stream: true, stdout: true, stderr: true}, function (err, stream) {
        stream.pipe(process.stdout);
      });
      
      container2.run("test", "echo test", process.stdout, function (err, data, container) {
      });
    });
  });
});