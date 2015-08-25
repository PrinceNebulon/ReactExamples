var React = require('react');
var ListItem = require('./ListItem');

module.exports = React.createClass({
	render: function() {
		return <div>
			{this.renderList()}
		</div>;
	},
	renderList: function() {
		console.debug(this.props.items)
		if (!this.props.items || Object.keys(this.props.items).length == 0) {
			return <h4>No items</h4>;
		} else {
			var children = [];

			for (var key in this.props.items) {
				var item = this.props.items[key];
				item.key = key;
				children.push(
					<ListItem
						item={item}
						key={key}
						/>
				);
			}

			return children;
		}
	}
});