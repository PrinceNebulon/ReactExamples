var React = require('react');
var ReactFire = require('reactfire');
var Firebase = require('firebase');

var Header = require('./Header');
var List = require('./List');

var rootUrl = 'https://luminous-torch-5113.firebaseio.com/';


var App = React.createClass({
	// Adds all functions from objects in this list to be avalable as "this.function()"
	mixins: [
		ReactFire
	],
	getInitialState: function() {
		return {
			items: {},
			loaded: false
		}
	},
	// Runs ONCE when this class is instantiated
	componentWillMount: function() {
		this.fb = new Firebase(rootUrl + 'items/');
		this.bindAsObject(this.fb, 'items');
		this.fb.on('value', this.handleDataLoaded);
	},
	render: function() {
		console.debug('[RENDER] app.jsx');
		return <div className="row panel panel-default">
			<div className="col-md-8 col-md-offset-2">
				<h2 className="text-center">
					To-Do List
				</h2>
				<Header itemsStore={this.firebaseRefs.items} />
				<hr />
				<div className={'content ' + (this.state.loaded ? 'loaded' : '')}>
					<List items={this.state.items} />
					{this.deleteButton()}
				</div>
			</div>
		</div>
	},
	deleteButton: function() {
		if (!this.state.loaded) {
			return;
		} else {
			return <div className="text-center clear-complete">
				<hr />
				<button 
					type="button"
					className="btn btn-default"
					onClick={this.onDeleteDoneClick}
					>
					Clear Complete
				</button>
			</div>
		}
	},
	onDeleteDoneClick: function() {
		for (var key in this.state.items) {
			var item = this.state.items[key];
			if (item.done === true) {
				this.fb.child(key).remove();
			}
		}
	},
	handleDataLoaded: function() {
		this.setState({loaded: true});
	}
});

console.debug('Pageload @ ' + (new Date()));
var element = React.createElement(App, {});
React.render(element, document.querySelector('.container'));
