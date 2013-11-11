// ConfigProbeTest.js (c) 2013 Derrick West and other contributors
// May be freely distributed under the MIT license.
// For further details and documentation:
// http://derrickwest.github.com/config-monitor
(function(root){

  // Dependencies
  var Monitor = require('monitor'),
      configMonitor = require('../lib/index'),
      CONFIG = require('config'),
      Backbone = Monitor.Backbone, _ = Monitor._;

  /**
  * Monitor Unit Tests
  *
  * This module contains unit test classes for each of the core classes, and
  * some unit tests for baseline probes.
  *
  * @module UnitTests
  */

  /**
  * Unit tests for the <a href="Config.html">Config</a> probe.
  * @class ConfigTest
  */

  /**
  * Test group for baseline Config probe functionality
  *
  * @method Config
  */
  module.exports['Config'] = {

    /**
    * Tests the initial config values
    * @method Config-InitialValues
    */
    InitialValues: function(test) {
      var configMonitor = new Monitor({probeClass:'Config'});
      configMonitor.connect(function() {
        var json = configMonitor.toJSON().config;
        test.ok(json.Monitor != null, 'Monitor configuration is present');
        test.equal(json.Monitor.appName, 'config-monitor', 'The appName parameter has the correct value');
        test.equal(json.Monitor.serviceBasePort, 42000, 'The serviceBasePort parameter has the correct value');
        test.equal(json.Monitor.portsToScan, 20, 'The portsToScan parameter has the correct value');
        test.equal(json.Monitor.allowExternalConnections, false, 'The allowExternalConnections parameter has the correct value');
        test.done();
      });
    }
  };


}(this));
