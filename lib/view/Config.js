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
        width: 300,
        height: 500
      });
  
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
      t.renderSection(t.monitor.get('config'));
    },

    renderSection: function(section) {
      var t = this;

      t.$el.append(
        '<div class="nm-app-config-heading">Heading</div>' +
        '<div class="nm-app-config-configs"><pre>' +
          JSON.stringify(section, null, 2) +
        '</pre></div>'
        
      );
          
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
        hideProbe: false,
        model: t.monitor
      });
      t.monitorPicker.render();
    },

  });

}(this));
