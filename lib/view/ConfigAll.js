// Config.js (c) 2013 Derrick West
// May be freely distributed under the MIT license.
// For further details and documentation:
// http://derrickwest.github.com/config-monitor
(function(root){

  // Module loading
  var Monitor = root.Monitor || require('monitor'),
      UI = Monitor.UI,
      Backbone = Monitor.Backbone;

  /**
  * This is the current configuration with all config sources
  *
  * @class ConfigAll
  * @extends Backbone.View
  * @constructor
  * @param options {Object} View initialization options (See others in Backbone.View)
  */
  var ConfigAll = UI.app.config.ConfigAll = UI.app.config.Config.extend({

    // Define the view
    name: 'Configuration With Sources',
    icon: 'image/configicon.png',
    description: 'Current configuration with sources',

    initialize: function(options) {
      var t = this;
      t.monitor = options.monitor;
      t.component = options.component;
      options.component.setDefaultSize({
        width: 600,
        height: 600
      });

      // Set default monitor options
      if (!t.monitor.get('probeClass')) {
        t.monitor.set({
          probeClass: 'Config'
        });
      }

      // Update the view on monitor change
      if (t.monitor != null) {
        t.monitor.on('change', t.onchange, t);
      }
    },

    onchange: function() {
      var t = this;
      t.$el.html('');
      t.renderSection('Current Configuration', 'Computed (merged) configurations', t.monitor.get('config'));

      var sources = t.monitor.get('sources');
      for (var i = sources.length - 1; i >= 0; i--) {
        var source = sources[i],
            parts = source.name.split(/[\/\\]/),
            heading = parts[parts.length - 1],
            title = source.name;

        // Put File: in front of files
        if (heading.length < source.name.length) {
          heading = 'File: ' + heading;
        }

        // Better tooltips
        if (heading === 'Module Defaults') {
          title = 'From calling setModuleDefaults()';
        }
        if (heading === '$NODE_CONFIG') {
          title = 'From the $NODE_CONFIG environment variable';
        }

        t.renderSection(heading, title, source.parsed);
      }

      // Add tool tips
      UI.tooltip(t.$('*[title]'));
    }

  });

}(this));
