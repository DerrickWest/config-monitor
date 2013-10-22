// Config.js (c) 2013 Derrick West
// May be freely distributed under the MIT license.
// For further details and documentation:
// http://derrickwest.github.com/config-monitor
(function(root){

  // Module loading
  var Monitor = root.Monitor || require('monitor'),
      UI = Monitor.UI,
      Backbone = Monitor.Backbone;

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
  var Config = UI.app.config.Config = Backbone.View.extend({

    // Define the view
    name: 'Current Configuration',
    icon: 'image/configicon.png',
    tags: ['Configuration', 'Utility'],
    description: 'A view of the current configuration',

    initialize: function(options) {
      var t = this;
      t.monitor = options.monitor;
      t.component = options.component;
      options.component.setDefaultSize({
        width: 400,
        height: 300
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
      t.renderSection('', '', t.monitor.get('config'));
    },

    renderSection: function(heading, title, data) {
      var t = this;

      // Create the heading if specified
      var viewTarget = t.$el;
      if (heading) {
        viewTarget = t.$el.append(
          '<div class="nm-app-config-heading" title="' + title + '">' + heading + '</div>' +
          '<div class="nm-app-config-configs"></div>'
          ).find('.nm-app-config-configs').last();
      }

      // Append the JSON data viewer
      t.jsonView = new UI.JsonView({
        model: data
      });
      t.jsonView.render();
      viewTarget.append(t.jsonView.$el);
    }

  });

  // Custom settings form
  Config.SettingsView = Backbone.View.extend({

    render: function() {
      var t = this;

      // Append a monitor picker
      t.monitorPicker = new UI.MonitorPicker({
        el: t.$el,
        hideProbe: true,
        model: t.options.monitor
      });
      t.monitorPicker.render();
    },

  });

}(this));
