// 代码生成时间: 2025-10-15 21:11:05
// Ensure the Backbone and Underscore libraries are loaded
if (typeof Backbone === 'undefined' || typeof _ === 'undefined') {
  throw new Error('Backbone and Underscore are required for the Loan Approval System.');
}

// Define the Loan model for storing loan details
var LoanModel = Backbone.Model.extend({
  // Default attributes for a new loan application
  defaults: {
    applicantName: '',
    amount: 0,
    interestRate: 0,
    duration: 0,
    approved: false
  },
  // Validate the loan application data
  validate: function(attrs) {
    if (attrs.amount <= 0) {
      return 'The loan amount must be greater than zero.';
    }
    if (attrs.interestRate <= 0) {
      return 'The interest rate must be greater than zero.';
    }
    if (attrs.duration <= 0) {
      return 'The loan duration must be greater than zero.';
    }
  }
});

// Define the LoanCollection for managing multiple loan applications
var LoanCollection = Backbone.Collection.extend({
  model: LoanModel,
  // Method to approve a loan by setting the approved attribute to true
  approveLoan: function(applicantName) {
    var loan = this.findWhere({applicantName: applicantName});
    if (loan) {
      loan.set('approved', true);
    } else {
      throw new Error('Loan application not found for: ' + applicantName);
    }
  },
  // Method to reject a loan by setting the approved attribute to false
  rejectLoan: function(applicantName) {
    var loan = this.findWhere({applicantName: applicantName});
    if (loan) {
      loan.set('approved', false);
    } else {
      throw new Error('Loan application not found for: ' + applicantName);
    }
  }
});

// Define the LoanAppView for user interface interaction
var LoanAppView = Backbone.View.extend({
  el: '#loan-app',
  events: {
    'submit #loan-form': 'submitLoanApplication',
    'click .approve-btn': 'approveLoan',
    'click .reject-btn': 'rejectLoan'
  },
  initialize: function() {
    // Bind the collection events to the view
    this.listenTo(this.collection, 'add', this.addOne);
    this.listenTo(this.collection, 'remove', this.addAll);
  },
  // Render a single loan application to the DOM
  addOne: function(loan) {
    var loanView = new LoanItemView({model: loan});
    this.$el.append(loanView.render().el);
  },
  // Render all loan applications to the DOM
  addAll: function() {
    this.$el.empty();
    this.collection.each(this.addOne, this);
  },
  // Handle loan application submission
  submitLoanApplication: function(e) {
    e.preventDefault();
    var loanData = {
      applicantName: this.$('#applicant-name').val(),
      amount: parseFloat(this.$('#loan-amount').val()),
      interestRate: parseFloat(this.$('#interest-rate').val()),
      duration: parseFloat(this.$('#loan-duration').val())
    };
    var loan = new LoanModel(loanData);
    if (!loan.isValid()) {
      alert(loan.validationError);
      return;
    }
    this.collection.add(loan);
    this.$('#loan-form')[0].reset();
  },
  // Handle loan approval
  approveLoan: function(e) {
    var applicantName = $(e.currentTarget).data('applicant');
    this.collection.approveLoan(applicantName);
  },
  // Handle loan rejection
  rejectLoan: function(e) {
    var applicantName = $(e.currentTarget).data('applicant');
    this.collection.rejectLoan(applicantName);
  }
});

// Define the LoanItemView for rendering individual loan items
var LoanItemView = Backbone.View.extend({
  tagName: 'li',
  template: _.template('<% if (approved) { %><span class="badge badge-success">Approved</span><% } else { %><span class="badge badge-danger">Pending</span><% } %> <%- applicantName %>'),
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});

// Initialize the LoanCollection
var loans = new LoanCollection();

// Initialize the LoanAppView
var loanApp = new LoanAppView({
  collection: loans
});
