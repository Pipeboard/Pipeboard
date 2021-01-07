const Docker = require('dockerode');

require('./socket-daemon.js');
require('./socket.js');
require('./api.js');

const docker = new Docker();

docker.listContainers(function(err, data) {
  if(err) console.log(err);

  var parentcontainer = null;
  var systemcontainer = null;
  var usercontainers = [];

  let datax = JSON.parse(JSON.stringify(data));
  
  datax.forEach(function(data2, parentcontainer) {
    if (data2.Names.includes("/pipeboard")) {
      parentcontainer = docker.getContainer(data2.Id);
    }
  });

  if(parentcontainer == null) {
    docker.createContainer({Cmd: ['/bin/bash'], name: 'pipeboard'}, function(err, container) {
      if (err) console.log(err);
      parentcontainer = container;
      ctnu();
    });
  } else {
    ctnu();
  }

  function ctnu() {
      
  }

});