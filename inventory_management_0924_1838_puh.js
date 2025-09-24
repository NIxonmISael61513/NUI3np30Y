// 代码生成时间: 2025-09-24 18:38:39
// Define the InventoryItem Model
var InventoryItem = Backbone.Model.extend({
    defaults: {
        id: null,
        name: "",
        quantity: 0,
        price: 0.0
    },
    validate: function(attrs) {
        if (!attrs.name) {
            return "Item name is required";
        }
        if (attrs.quantity < 0) {
            return "Quantity cannot be negative";
        }
        if (attrs.price < 0) {
            return "Price cannot be negative";
        }
    }
});

// Define the InventoryItems Collection
var InventoryItems = Backbone.Collection.extend({
    model: InventoryItem,
    localStorage: new Backbone.LocalStorage("InventoryItems"),
    initialize: function() {
        this.on("add", this.addItem, this);
        this.on("remove", this.removeItem, this);
    },
    addItem: function(item) {
        if (this.findWhere({ id: item.id })) {
            console.error("Item with the same ID already exists");
        } else {
            this.create(item);
        }
    },
    removeItem: function(item) {
        this.remove(item);
    }
});

// Define the InventoryApp Router
var InventoryAppRouter = Backbone.Router.extend({
    routes: {
        "": "home",
        "add": "addItem",
        "edit/:id": "editItem",
        "delete/:id": "deleteItem"
    },
    home: function() {
        console.log("Welcome to the Inventory Management System!");
    },
    addItem: function() {
        console.log("Adding a new item...");
    },
    editItem: function(id) {
        console.log("Editing item with ID: " + id);
    },
    deleteItem: function(id) {
        console.log("Deleting item with ID: " + id);
    }
});

// Initialize the InventoryItems Collection
var inventoryItems = new InventoryItems();

// Start the Router
var router = new InventoryAppRouter();
Backbone.history.start();

// Add some sample data to the inventory
inventoryItems.addItem({ id: 1, name: "Apple", quantity: 10, price: 0.5 });
inventoryItems.addItem({ id: 2, name: "Banana", quantity: 20, price: 0.3 });