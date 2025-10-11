// 代码生成时间: 2025-10-12 03:47:23
// Define the FeatureCollection model to represent a collection of features
var FeatureModel = Backbone.Model.extend({
    "defaults": {
        "name": "",
        "type": "",
        "value": ""
    },
    "initialize": function() {
        console.log("FeatureModel initialized with name: " + this.get("name"));
    },
    "validate": function(attrs) {
        if (!attrs.name) {
            return "Name is required";
        }
    }
});

// Define the FeatureCollection to hold multiple FeatureModels
var FeatureCollection = Backbone.Collection.extend({
    "model": FeatureModel,
    "initialize": function() {
        console.log("FeatureCollection initialized");
    }
});

// Define the FeatureEngineView to render and manage the UI for feature engineering
var FeatureEngineView = Backbone.View.extend({
    "el": "#feature-engine",
    "events": {
        "submit form": "addFeature"
    },
    "initialize": function() {
        this.collection = new FeatureCollection();
        this.listenTo(this.collection, 'add', this.renderFeature);
        console.log("FeatureEngineView initialized");
    },
    "renderFeature": function(featureModel) {
        var featureTemplate = _.template(
            "<div><%= name %> (<%= type %>): <%= value %></div>"
        );
        var featureHtml = featureTemplate(featureModel.toJSON());
        $(this.el).append(featureHtml);
    },
    "addFeature": function(event) {
        event.preventDefault();
        var name = $(event.target).find("input[name='name']