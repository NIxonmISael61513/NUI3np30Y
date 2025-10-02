// 代码生成时间: 2025-10-02 17:39:33
// Define a `LearningProgress` model to represent an individual's progress
var LearningProgress = Backbone.Model.extend({
  // Default attributes for the learning progress
  defaults: {
    completed: 0,
    total: 100
  },

  // Method to increment the completed count
  increment: function() {
    this.set('completed', this.get('completed') + 1);
  },

  // Method to check if the learning is completed
  isCompleted: function() {
    return this.get('completed') >= this.get('total');
  },

  // Method to reset the learning progress
  reset: function() {
    this.set({ completed: 0, total: 100 });
  }
});

// Define a `LearningProgressCollection` to manage a collection of learning progress
var LearningProgressCollection = Backbone.Collection.extend({
  model: LearningProgress
});

// Define a `LearningProgressView` to manage the display of learning progress
var LearningProgressView = Backbone.View.extend({
  // tagName for the view's container
  tagName: 'div',

  // Template function for rendering the progress
  template: _.template('<div>Learning Progress: <%= completed %>%</div>'),

  // Events object to handle user interactions
  events: {
    'click #incrementProgress': 'incrementProgress',
    'click #resetProgress': 'resetProgress'
  },

  // Initialize the view with a model
  initialize: function(options) {
    this.model = options.model;
    this.listenTo(this.model, 'change', this.render);
  },

  // Render the view with the current model state
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },

  // Event handler to increment the learning progress
  incrementProgress: function() {
    this.model.increment();
  },

  // Event handler to reset the learning progress
  resetProgress: function() {
    this.model.reset();
  }
});

// Initialize the application
var initialize = function() {
  // Create a new collection and add a model
  var progressCollection = new LearningProgressCollection();
  var progressModel = new LearningProgress();
  progressCollection.add(progressModel);

  // Create a new view and render it
  var progressView = new LearningProgressView({ model: progressModel });
  $('body').append(progressView.render().el);
};

// Run the application on document ready
$(document).ready(initialize);