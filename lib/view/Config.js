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
    },

    events: {
    },

    render: function() {
      var t = this;

      t.renderSection();
      t.renderSection();
      t.renderSection();
    },


    renderSection: function() {
      var t = this;

      t.$el.append(
        '<div class="nm-app-config-heading">Heading</div>' +
        '<div class="nm-app-config-configs">Configs</div>'
      );
          
    }

  });

  var FONT_SIZES = [
    'x-small', 'small', 'medium',
    'large', 'x-large', 'xx-large'];
  
  
  // Add the drop-down caret to dropdown toolbar items
      t.fontPicker = t.$el.find('.font-picker');
      UI.DropDownMenu.addCaret(t.fontPicker)

  // Styling
  
  // Attach an HTML editor
      t.editor = new wysihtml5.Editor("nm-core-html-textarea", {
        name: "nm-core-html-composer",
        toolbar: "nm-core-html-toolbar",
        style: false,
        stylesheets: [
          '/static/css/default/bootstrap.min.css',
          '/static/css/default/font-awesome.css',
          '/static/css/default/MonitorUI.css',
          '/static/css/default/PageView.css',
          '/static/css/default/ComponentView.css',
          '/app/core/Core.css',
          '/app/core/wysihtml5.css'],
        parser: function(str) {return str;}  // Disable HTML sanitation
      });
  
var cssId = 'Core.css';
if (!$.getElementById(Core.css))
{
    var head  = $.getElementsByTagName('head')[0];
    var link  = $.createElement('Core.css');
    link.id   = Core.css;
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = 'http://website.com/css/stylesheet.css';
    link.media = 'all';
    head.appendChild(link);
}
  
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
