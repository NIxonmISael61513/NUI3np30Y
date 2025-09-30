// 代码生成时间: 2025-09-30 19:58:36
// Define a Device model.
var Device = Backbone.Model.extend({
  // Define default attributes.
  defaults: {
    id: null,
    name: 'Unknown Device',
    status: 'offline',
    actions: []
  },

  // Initialize the model.
  initialize: function() {
    // Initialize any additional properties or listeners here.
  },

  // Method to toggle device status.
  toggleStatus: function() {
    this.set('status', this.get('status') === 'online' ? 'offline' : 'online');
  },

  // Method to perform an action on the device.
  performAction: function(action) {
    var deviceActions = this.get('actions');
    if (deviceActions.includes(action)) {
      this.trigger('perform:action', action);
    } else {
      throw new Error('Action is not supported by the device.');
    }
  }
});

// Define a DeviceCollection collection.
var DeviceCollection = Backbone.Collection.extend({
  model: Device,

  // Fetch devices from the server (mocked for this example).
  fetchDevices: function(callback) {
    var devices = [
      { id: 1, name: 'Television', status: 'online', actions: ['turnOn', 'turnOff'] },
      { id: 2, name: 'Air Conditioner', status: 'offline', actions: ['setTemperature', 'turnOn', 'turnOff'] }
    ];

    // Simulate fetching devices from a server.
    setTimeout(function() {
      this.reset(devices);
      if (callback) callback(this.models);
    }.bind(this), 1000);
  },

  // Method to find a device by its name.
  findByName: function(name) {
    return this.find(function(device) {
      return device.get('name') === name;
    });
  }
});

// Instantiate the collection and fetch devices.
var devices = new DeviceCollection();
devices.fetchDevices(function(devices) {
  console.log('Devices fetched:', devices);
});

// Define a DeviceView view.
var DeviceView = Backbone.View.extend({
  tagName: 'div',
  className: 'device',
  template: _.template('<strong><%= name %></strong> - Status: <%= status %>'),

  events: {
    'click button': 'toggleDeviceStatus'
  },

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },

  toggleDeviceStatus: function() {
    this.model.toggleStatus();
  }
});

// Create a view for each device and attach it to the DOM.
devices.each(function(device) {
  var view = new DeviceView({ model: device });
  $('body').append(view.render().el);
});

// Handling actions to perform on devices.
devices.on('perform:action', function(action) {
  console.log('Action performed:', action);
});