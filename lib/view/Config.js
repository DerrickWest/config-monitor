// Config.js (c) 2013 Derrick West
// May be freely distributed under the MIT license.
// For further details and documentation:
// http://derrickwest.github.com/config-monitor
(function(root){

  // Module loading
  var Monitor = root.Monitor || require('monitor'),
      UI = Monitor.UI,
      Backbone = Monitor.Backbone,
      _ = Monitor._;

  // Define the app on first load
  UI.app.config = UI.app.config || {};

  /**
  * This is the view for the config module
  *
  * @class Config
  * @extends Backbone.View
  * @constructor
  * @param options {Object} View initialization options (See others in Backbone.View)
  */
  var Config= UI.app.config.Config= Backbone.View.extend({

    // Define the view
    name: 'Config Monitor',
    icon: 'image/configicon.png',
    description: 'Monitor your application configurations',
    defaultOptions: {
      title: 'Configurations',
      background: true
    },

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

      if (t.monitor != null) {
        t.monitor.on('change', t.onchange, t);
      }
    },

    events: {
    },

    render: function() {
      var t = this;
    },

    onchange: function() {
      var t = this;
      t.$el.html('');
      t.renderSection('Computed Config', 'Active configuration', t.monitor.get('config'));

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
    },

    renderSection: function(heading, title, data) {
      var t = this;

      // Create the process info view, deferring render until we get real data
      var viewTarget = t.$el.append(
        '<div class="nm-app-config-heading" title="' + title + '">' + heading + '</div>' +
        '<div class="nm-app-config-configs"></div>'
        ).find('.nm-app-config-configs').last();
      t.jsonView = new UI.JsonView({
        model: data
      });
      t.jsonView.render();
      viewTarget.append(t.jsonView.$el);

    }

  });

  // Custom settings form
  Config.SettingsView = Backbone.View.extend({

    initialize: function(options) {
      var t = this;
    },

    events: {
    },

    render: function() {
      var t = this;
      t.monitor = t.options.monitor;

      // Append a monitor picker
      t.monitorPicker = new UI.MonitorPicker({
        el: t.$el,
        hideProbe: true,
        model: t.monitor
      });
      t.monitorPicker.render();
    },

  });

}(this));