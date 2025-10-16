// 代码生成时间: 2025-10-17 01:43:22
// Define the Data Dictionary Model
var DataDictionaryModel = Backbone.Model.extend({
    defaults: {
        id: '',
        name: '',
        description: ''
    },
    validate: function(attrs) {
        if (!attrs.name) {
            return 'Name is required';
        }
    }
});

// Define the Data Dictionary Collection
var DataDictionaryCollection = Backbone.Collection.extend({
    model: DataDictionaryModel,
    url: '/api/data-dictionaries'
});

// Define the Data Dictionary Item View
var DataDictionaryItemView = Backbone.View.extend({
    tagName: 'div',
    template: _.template('<%= name %> - <%= description %>'),
    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});

// Define the Data Dictionary Collection View
var DataDictionaryCollectionView = Backbone.View.extend({
    el: '#data-dictionaries',
    initialize: function() {
        this.listenTo(this.collection, 'add', this.addItem);
        this.listenTo(this.collection, 'remove', this.removeItem);
        this.listenTo(this.collection, 'reset', this.render);
    },
    addItem: function(model) {
        var itemView = new DataDictionaryItemView({ model: model });
        this.$el.append(itemView.render().el);
    },
    removeItem: function(model) {
        this.$el.find('[data-id="' + model.id + '"]').remove();
    },
    render: function() {
        this.$el.empty();
        this.collection.each(this.addItem, this);
    }
});

// Initialize the application
var initialize = function() {
    // Create a new collection instance
    var dataDictionaries = new DataDictionaryCollection();

    // Create a new collection view instance
    var dataDictionariesListView = new DataDictionaryCollectionView({
        collection: dataDictionaries
    });

    // Fetch the data dictionaries from the server
    dataDictionaries.fetch({
        success: function(collection, response) {
            // Handle successful fetch
            console.log('Data dictionaries fetched successfully');
        },
        error: function(collection, response) {
            // Handle fetch error
            console.error('Error fetching data dictionaries', response);
        }
    });
};

// Start the application
initialize();