var React = require('react');
var Badge = require('./Badge');

module.exports = React.createClass({
	render: function() {
		var list = this.props.buttons.map(function(buttonData) {
			return <div><Badge {...buttonData} /><br /></div>;
		});
		
		return <div>
			<h1>{this.props.displayTitle}</h1>
			{list}
		</div>
	}
});