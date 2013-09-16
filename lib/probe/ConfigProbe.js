// ConfigProbe.js (c) 2013 Derrick West
// May be freely distributed under the MIT license.
// For further details and documentation:
// http://derrickwest.github.com/config-monitor-min
(function(root) {

  // Module loading - this runs server-side only
  var Monitor = require('monitor-min'),
      Backbone = Monitor.Backbone,
      TRIGGER_EVENT = 'config-probe-change',
      Probe = Monitor.Probe,
      _ = Monitor._,
      log = Monitor.getLogger('ConfigProbe'),
      CONFIG = require('config');

  // Create a single watcher for all probe instances.  This is done
  // because node-config doesn't have an un-watch.  If it did, the
  // watcher would be created and destroyed along with the probe.
  CONFIG.watch(CONFIG, null, function(){
    Backbone.trigger(TRIGGER_EVENT, arguments);
  });

  /**
  * Remote exposure and control of configuration parameters.
  *
  * This probe can monitor the state of, and make changes to local configuration
  * parameters.
  *
  * @class ConfigProbe
  * @extends Probe
  * @constructor
  * @param model - Monitor data model elements
  *     @param model.config {Object} Copy of the current config object
  *     @param model.sources {Object} Named, ordered list of configuration sources
  *       Name=filename or display name, Value=config object at that source
  *     @param model.lastChange {Object} Last changed info
  *     @param model.lastChange.object {Object} Changed object
  *     @param model.lastChange.propertyName {Object} Name of the changed property within the object
  *     @param model.lastChange.priorValue {Mixed} Value before the change
  *     @param model.lastChange.newValue {Mixed} Value after the change
  */
  var ConfigProbe = Probe.extend({

    // Exposed probeClass name for monitors
    probeClass: 'Config',

    initialize: function(){
      var t = this;
      Probe.prototype.initialize.apply(t, arguments);

      // Watch for config changes
      Backbone.on(TRIGGER_EVENT, t.onChange, t);

      // Set the initial value
      t.onChange([]);
    },

    release: function() {
      var t = this;
      Probe.prototype.release.apply(t, arguments);
      Backbone.off(TRIGGER_EVENT, t.onChange, t);
    },

    onChange: function(args) {
      var t = this,
          configCopy = JSON.parse(JSON.stringify(CONFIG)),
          lastChange = {
            propertyName:args[1],
            priorValue:args[2],
            newValue:args[3]
          },
          setTo = {
            config: configCopy,
            sources: CONFIG.getConfigSources(),
            lastChange: lastChange
          };

      log.info('onChange', setTo);
      t.set(setTo);
    }

  });

}(this));
