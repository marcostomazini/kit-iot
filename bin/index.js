#!/usr/bin/env node

var kitiot  = require('../lib/kit-iot'),
    Insight = require('insight'),
    pkg     = require('../package.json'),
    insight = new Insight({
        trackingCode  : 'UA-5427757-50',
        packageName   : pkg.name,
        packageVersion: pkg.version
    });

//Initiate the kit
var KitIoT = new kitiot();
insight.track('init');

//On io connection start the arduino
KitIoT.io.on('connection', function (socket) {
  KitIoT.connect();
  insight.track('socket', 'connection');

  //Start sending/saving data
  socket.on('start', function () {
    console.log("start");
    //if (!KitIoT.token.getId()) {
    //  KitIoT.logout();
    //  console.log("logout");
    //} else {
    //  KitIoT.start();
    //  insight.track('socket', 'start');
    //  console.log("started");
    //}

    KitIoT.start();
    insight.track('socket', 'start');
    console.log("started");
  });

  //Stop sending/saving data
  socket.on('stop', function () {
    KitIoT.clearLoop(KitIoT.loop);
    insight.track('socket', 'stop');
    console.log("stop");
  });
});
