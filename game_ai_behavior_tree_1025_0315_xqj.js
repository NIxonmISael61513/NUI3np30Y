// 代码生成时间: 2025-10-25 03:15:01
// Define the BehaviorTree model using Backbone
var BehaviorTree = Backbone.Model.extend({
  // Initialize the behavior tree with a root node
  initialize: function(rootNode) {
    this.rootNode = rootNode;
  },

  // Tick the behavior tree, running the current node's behavior
  tick: function() {
    if (!this.rootNode) {
      console.error('No root node defined for the behavior tree');
      return;
    }

    this.rootNode.execute();
  }
});

// Define the base Node model for behavior tree nodes
var Node = Backbone.Model.extend({
  // Execute the node's behavior
  execute: function() {
    throw new Error('execute method must be implemented by subclasses');
  },

  // Check if the node should run or not
  isRunning: function() {
    return false;
  },

  // Check if the node has finished its execution
  isFinished: function() {
    return false;
  }
});

// Define a composite node that runs its children in sequence
var CompositeNode = Node.extend({
  initialize: function(children) {
    this.children = children;
    this.currentChildIndex = 0;
  },

  execute: function() {
    if (this.isFinished()) {
      return;
    }

    // If there are no more children to execute, finish the node
    if (this.currentChildIndex >= this.children.length) {
      this.finish();
      return;
    }

    // Execute the next child node
    var child = this.children[this.currentChildIndex];
    this.currentChildIndex++;
    child.execute();
  },

  isFinished: function() {
    return this.currentChildIndex >= this.children.length;
  },

  finish: function() {
    // Override in subclasses to handle node finish behavior
  }
});

// Define a selector node that runs its children randomly
var SelectorNode = CompositeNode.extend({
  finish: function() {
    // Reset the child index for the next tick
    this.currentChildIndex = 0;
  }
});

// Define a sequence node that runs its children in sequence until one fails
var SequenceNode = CompositeNode.extend({
  execute: function() {
    if (this.isFinished()) {
      return;
    }

    // If the previous child failed, finish the sequence
    if (this.children[this.currentChildIndex - 1].isRunning()) {
      this.finish();
      return;
    }

    // Execute the next child node
    var child = this.children[this.currentChildIndex];
    this.currentChildIndex++;
    child.execute();
  },

  finish: function() {
    // Reset the child index for the next tick
    this.currentChildIndex = 0;
  }
});

// Define a condition node that checks a specific condition
var ConditionNode = Node.extend({
  initialize: function(conditionFunction) {
    this.conditionFunction = conditionFunction;
  },

  execute: function() {
    if (this.conditionFunction()) {
      this.succeed();
    } else {
      this.fail();
    }
  },

  succeed: function() {
    // Override in subclasses to handle success behavior
  },

  fail: function() {
    // Override in subclasses to handle failure behavior
  }
});

// Example usage of the behavior tree
var behaviorTree = new BehaviorTree(
  new SelectorNode([
    new SequenceNode([
      new ConditionNode(function() { return true; }), // Always true condition
      new ActionNode('Attack') // Attack action
    ]),
    new SequenceNode([
      new ConditionNode(function() { return false; }), // Always false condition
      new ActionNode('Defend') // Defend action
    ])
  ])
);

// Define an action node that performs an action
var ActionNode = Node.extend({
  initialize: function(actionName) {
    this.actionName = actionName;
  },

  execute: function() {
    console.log('Performing action:', this.actionName);
    this.succeed();
  },

  succeed: function() {
    // Action was successful
  },

  fail: function() {
    // Action failed
  }
});

// Tick the behavior tree to run the AI
setInterval(function() {
  behaviorTree.tick();
}, 100);