// ConfigProbe.js (c) 2013 Derrick West
// May be freely distributed under the MIT license.
// For further details and documentation:
// http://derrickwest.github.com/config-monitor-min
var Monitor = require('monitor'),
    Probe = Monitor.Probe,
    Config = require('config');

var ConfigProbe = Probe.extend({

  probeClass: 'Config',

  initialize: function(){

    // Set the initial probe state
    this.setState();

    // Change the probe state when the config changes
    Config.watch(Config, null, function(){
      this.setState();
    });
  },

  setState: function(){
    this.set({
      config: Config,
      sources: Config.getConfigSources()
    });
  }
});
