// 代码生成时间: 2025-10-11 20:14:32
// Define the FirewallRule model
var FirewallRule = Backbone.Model.extend({
  // Model attributes
  defaults: {
    id: null,
    name: '',
    description: '',
    protocol: '',
    sourceIP: '',
    destinationIP: '',
    port: '',
    isEnabled: false
  },

  // Validate the model
  validate: function(attrs) {
    if (!attrs.name) {
      return 'Name is required';
    }
    if (!attrs.protocol) {
      return 'Protocol is required';
    }
    if (!attrs.sourceIP) {
      return 'Source IP is required';
    }
    if (!attrs.destinationIP) {
      return 'Destination IP is required';
    }
  }
});

// Define the FirewallRules collection
var FirewallRules = Backbone.Collection.extend({
  model: FirewallRule,

  // Fetch all rules
  fetchRules: function() {
    return $.ajax({
      url: '/api/firewall/rules',
      method: 'GET',
      success: function(response) {
        this.reset(response);
      }.bind(this),
      error: function(error) {
        console.error('Failed to fetch firewall rules:', error);
      }
    });
  },

  // Add a new rule
  addRule: function(ruleData) {
    var rule = new FirewallRule(ruleData);
    if (rule.isValid()) {
      this.add(rule);
    } else {
      console.error('Invalid rule:', rule.validationError);
    }
  },

  // Remove a rule
  removeRule: function(ruleId) {
    var rule = this.get(ruleId);
    if (rule) {
      this.remove(rule);
    } else {
      console.error('Rule not found:', ruleId);
    }
  },
});

// Initialize the collection
var firewallRules = new FirewallRules();

// Fetch and handle rules
firewallRules.fetchRules();

// Example usage: Adding a new rule
var newRuleData = {
  name: 'New Rule',
  description: 'A sample firewall rule',
  protocol: 'TCP',
  sourceIP: '192.168.1.1',
  destinationIP: '10.0.0.1',
  port: '80',
  isEnabled: true
};
firewallRules.addRule(newRuleData);

// Example usage: Removing a rule
firewallRules.removeRule(1);