var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router'); 
var Router = ReactRouter.Router; 
var Route = ReactRouter.Route; 
var Navigation = ReactRouter.Navigation;  
var History = ReactRouter.History; 
var createBrowserHistory = require('history/lib/createBrowserHistory'); 

var helper = require('./helpers.js'); 

/* 
  StorePicker
  This will let us make <StorePicker/>
*/




var App = React.createClass({
  render: function() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Seafood of the Ocean" /> 
        </div>
        <Order /> 
        <Inventory /> 

      </div>
    )
  }
});

/* 
  Add Fish Form 
*/ 

var AddFishForm = React.createClass({
  render: function() {
    return (
      <form className="fish-edit" onSubmit={this.createFish}>
        <input type="text" ref="name" placeholder="Fish Name" />
        <input type="text" ref="price" placeholder="Fish Price" />
        <select ref="status">
          <option value="avaiable">Fresh!</option> 
          <option value="unavaiable">Sold Out!</option> 
        </select> 
        <textarea type="text" ref="desc" placeholder="Desc"></textarea> 
        <input type="text" ref="image" placeholder="URL to image" /> 
        <button type="submit">+ Add Item</button> 
      </form>
    )
  }
}); 

var Header = React.createClass({
  render: function() {
    return (
      <header className="top">
        <h1>Catch 
        <span className="ofThe">
          <span className="of">of</span>
          <span className="the">the</span> 
        </span>
         day</h1>
        <h3 className="tagline"><span>{this.props.tagline}</span></h3>  
      </header>
    )
  }
}); 

var Order = React.createClass({
  render: function() {
    return (
      <div>
        This is the Order 
      </div>
    )
  }
});

var Inventory = React.createClass({
  render: function() {
    return (
      <div>
        This is the Inventory  
        <AddFishForm /> 
      </div>
    )
  }
});



var StorePicker = React.createClass({
  mixins: [History], 
  goToStore: function(event) {
    
    event.preventDefault();  
    console.log(this.refs.storeId.value)
    var storeId = this.refs.storeId.value; 
    this.history.pushState(null, '/store/' + storeId); 
  }, 

  render : function() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h1>Please enter a local store</h1> 
        <input type="text" ref="storeId" defaultValue={helper.getFunName()} required />
        <input type="submit" /> 
      </form>
    )
  }
});

var NotFound = React.createClass({
  render: function() {
    return (
    <h1>Not Found</h1> 
    )
}
})


/*
Rounter 
*/

var routes = (
  <Router history={createBrowserHistory()}>
    <Route path="/" component={StorePicker} /> 
    <Route path="/store/:storeId" component={App} /> 
    <Route path="/*" component={NotFound} /> 
   </Router>
)

ReactDOM.render(routes, document.querySelector('#main'));
