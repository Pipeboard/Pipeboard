const Docker = require('dockerode');

require('./socket.js');
require('./api.js');

const docker = new Docker();

var parentcontainer = docker.getContainer("pipeboard");
var systemcontainer = null;
var usercontainers = [];

docker.listContainers(function(err, data) {
  if(err) console.log(err);

  let datax = JSON.parse(JSON.stringify(data));
  
  datax.forEach(function(data2) {
    if (data2.Names.includes("pipeboard")) {
      parentcontainer = docker.getContainer(data2.Id);
    }
  });
});

if(parentcontainer == null) {
  docker.createContainer({Cmd: ['/bin/bash'], name: 'pipeboard'}, function(err, container) {
    if (err) console.log(err);
    parentcontainer = container;
    ctnu(parentcontainer);
  });
} else {
  ctnu(parentcontainer);
}

function ctnu(parentcontainer) {
  var pbsgot = null; 

  docker.getContainer("pipeboard_box_system", function(err, container) {
    if(err) console.log(err);
    pbsgot = container;

    if(pbsgot !== null) {
      ctnu(pbsgot);
    } else {
      docker.createContainer({Cmd: ['/bin/bash'], name: "pipeboard_box_system"}, function (err, container) {
        if(err) { console.log(err); }
        ctnu(container);
      })
    }
  
    function ctnu2() {
      systemcontainer = pbsgot;
      systemcontainer.start({Cmd: ['echo test'], function(err, data) {
        if(err) { console.log(err); }
        console.log(data);
      }})
    }
  });
}