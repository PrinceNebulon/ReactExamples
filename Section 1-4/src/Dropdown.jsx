var React = require('react');
var Button = require('./Button');
var ListItem = require('./ListItem');

module.exports = React.createClass({
	handleClick: function() {
		this.state.open = !this.state.open;
		this.setState(this.state);
	},
	getInitialState: function() {
		return { open: false };
	},
	handleItemClick: function(item) {
		console.log('got ' + item);
		this.state.open = !this.state.open;
		this.state.itemTitle = item;
		this.setState(this.state);
	},
	render: function() {
		var list = this.props.items.map(function(item) {
			return <ListItem 
				item={item} 
				whenItemClicked={this.handleItemClick}
				className={this.state.itemTitle === item ? 'active' : ''} />
		}.bind(this));

		return <div className="dropdown">
			<Button 
				className="btn-default" 
				title={this.state.itemTitle || this.props.title} 
				subTitleClassName="caret" 
				onClick={this.handleClick} />
			<ul className={"dropdown-menu " + (this.state.open ? 'show' : '')}>{list}</ul>
		</div>;
	}
});