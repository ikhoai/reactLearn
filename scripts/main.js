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
  getInitialState: function() {
    return {
      fishes: {}, 
      order: {}
    }
  }, 
  
  addFish: function(fish) {
    console.log(fish); 
    var timestamp = (new Date()).getTime();
    //update state
    console.log(this); 
    this.state.fishes['fish-' + timestamp] = fish;  
    
    //set the state
    this.setState({ fishes: this.state.fishes }); 
  }, 

  getSampleFish: function() {
    this.setState({
      fishes : require('./sample-fishes')
    }); 
  }, 

  renderFish: function(key) {
    console.log(this.state); 
    return <Fish key={key} index={key} detail={this.state.fishes[key]} /> 
  }, 

  render: function() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Seafood of the Ocean" /> 
          <ul className="list-of-fishes">
            {Object.keys(this.state.fishes).map(this.renderFish)}
          </ul> 
        </div>
        <Order /> 
        <Inventory addFish={this.addFish} getSampleFish={this.getSampleFish}/> 

      </div>
    )
  }
});

/* 
  Fish Component 
*/  
var Fish = React.createClass({
  render: function() {
    var isAvailable = (this.props.detail.status === 'available' ? true: false); 
    var buttonText = (isAvailable ? 'Add to Order' : 'Sold Out!'); 
    return (
      <li className="menu-fish">
        <img src={this.props.detail.image} /> 
        <h3 className="fish-name">{this.props.detail.name}
          <span className="price">{helper.formatPrice(this.props.detail.price)}</span>
        </h3>
        <p>{this.props.detail.desc}</p>  
        <button disabled={!isAvailable}>{buttonText}</button>
      </li> 
    )
  }
}); 


/* 
  Add Fish Form 
*/ 

var AddFishForm = React.createClass({
  createFish: function(event) {
    event.preventDefault(); 
    var fish = {
      name: this.refs.name.value, 
      price: this.refs.price.value, 
      status: this.refs.status.value,
      desc: this.refs.desc.value,
      image: this.refs.image.value
    }
    //console.log(fish); 
    this.props.addFish(fish); 
    this.refs.fishForm.reset(); 
  }, 
  
  render: function() {
    return (
      <form className="fish-edit" ref="fishForm" onSubmit={this.createFish}>
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
        <h2>Inventory</h2>   
        <AddFishForm {...this.props} /> 
        <button onClick={this.props.getSampleFish}>Get Sample Fish</button> 
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
