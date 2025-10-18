// 代码生成时间: 2025-10-19 06:47:03
// Ensure Backbone is included or available in the scope
if (typeof Backbone === 'undefined') {
  throw new Error('Backbone is not defined. Please include Backbone.js before running this script.');
}


// Define a DocItem Model to represent each API endpoint
var DocItem = Backbone.Model.extend({
  defaults: {
    method: '',
    path: '',
    summary: '',
    notes: '',
    params: [],
    response: ''
  }
});

// Define a DocCollection Collection to hold all the API endpoints
var DocCollection = Backbone.Collection.extend({
  model: DocItem,

  // Function to add an API endpoint to the collection
  addEndpoint: function(method, path, summary, notes, params, response) {
    this.add(new DocItem({
      method: method,
      path: path,
      summary: summary,
      notes: notes,
      params: params || [],
      response: response
    }));
  },

  // Function to generate the API documentation as a JSON object
  generateDoc: function() {
    var doc = {
      api: []
    };
    this.each(function(item) {
      doc.api.push({
        method: item.get('method'),
        path: item.get('path'),
        summary: item.get('summary'),
        notes: item.get('notes'),
        params: item.get('params'),
        response: item.get('response')
      });
    });
    return doc;
  }
});

// Initialize the collection
var apiDocs = new DocCollection();

// Example usage: Adding API endpoints to the collection
apiDocs.addEndpoint('GET', '/users', 'Get a list of users', 'This endpoint returns a list of users.', [{ name: 'limit', type: 'int', description: 'Limit the number of users returned' }], 'Array of User objects');
apiDocs.addEndpoint('POST', '/users', 'Create a new user', 'This endpoint creates a new user.', [{ name: 'username', type: 'string', description: 'The username of the new user' }, { name: 'email', type: 'string', description: 'The email of the new user' }], 'User object');

// Generate the API documentation
var apiDocumentation = apiDocs.generateDoc();

// You can then output this JSON to a file, display it in the UI, or send it to a server
console.log(JSON.stringify(apiDocumentation, null, 2));