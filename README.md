config-monitor
==============

Node-Monitor add-on for the npm config module.

Adding To Your App
-------------------

Probes are added to your application by specifying monitor-min and config-monitor as dependencies within your package.json file

    "dependencies": {
      ...
      "config": ">=0.4.31 <0.5.0",
      ...
      "monitor-min": ">=0.5.8 <0.6.0",
      "config-monitor": ">=0.1.1 <0.2.0",
      ...

Then including them in your application startup phase

    // Start monitoring, and load monitor probes
    var Monitor = require('monitor-min').start();
    var configMonitor = require('config-monitor');

Adding to Node Monitor
----------------------

To add these monitors to your node monitor UI, install config-monitor in your node path (or globally)

    npm install -g config-monitor

Then start node monitor

    npm start monitor

When adding components into your dashboard, the config-monitor components will be avilable.

