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
      "monitor": ">=0.6.0 <0.7.0",
      "config-monitor": ">=0.1.1 <0.2.0",
      ...

Then including them in your application startup phase

    // Start monitoring, and load monitor probes
    var Monitor = require('monitor').start();
    var configMonitor = require('config-monitor');

Adding to the Monitor Dashboard
-------------------------------

To add these monitors to your dashboard, install config-monitor in your node path (or globally)

    npm install -g monitor-dashboard
    npm install -g config-monitor

Then start the dashboard

    npm start monitor-dashboard

When adding components into your dashboard, the config-monitor components will be available.

