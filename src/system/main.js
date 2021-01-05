var Docker = require('dockerode');

var docker = new Docker({
  // socketPath: '/var/run/docker.sock',
  // host: '127.0.0.1',
  // port: 33941
});

docker.createContainer({Image: 'httpd', Cmd: ['/bin/bash'], name: 'test'}, function (err, container) {
  console.log(err);
  // console.log(container);
  container.start(function (err, data) {
    console.log(data);
    var container2 = docker.getContainer("test");
    container2.attach({stream: true, stdout: true, stderr: true}, function (err, stream) {
      stream.pipe(process.stdout);
    });
    docker.run("test", "echo test", process.stdout, function (err, data, container) {
      // console.log(data.StatusCode);
    });
  });
});


// docker.run('httpd', [], process.stdout, {
//   'Volumes': {
//     './containers/test/home': {}
//   },
//   'ExposedPorts': {
//     '80/tcp': {}
//   }
// }, function(err, data, container) {
//   // if (err){
//   //   return console.error(err);
//   // }
//   // // console.log(data.StatusCode);

//   // docker.createContainer({ /*...*/ Tty: true /*...*/ }, function(err, container) {

//   //   container.attach({stream: true, stdout: true, stderr: true}, function (err, stream) {
//   //     stream.pipe(process.stdout);
//   //   });

//   // })
// });