var React = require('react');
var Firebase = require('firebase');

var rootUrl = 'https://luminous-torch-5113.firebaseio.com/';

module.exports = React.createClass({
	getInitialState: function() {
		return {
			text: this.props.item.text,
			newText: this.props.item.text,
			done: this.props.item.done,
			textChanged: false
		};
	},
	componentWillMount: function() {
		this.fb = new Firebase(rootUrl + 'items/' + this.props.item.key);
	},
	render: function() {
		return <div className="input-group">
			<span className="input-group-addon">
				<input 
				type="checkbox"
				checked={this.state.done}
				onChange={this.handleDoneChanged}
				/>
			</span>
			<input 
				disabled={this.state.done}
				type="text"
				className="form-control"
				value={this.state.newText}
				onChange={this.handleTextChanged}
				/>
			<span className="input-group-btn">
				{this.renderButtons()}
			</span>
		</div>;
	},
	renderButtons: function() {
		if (this.state.textChanged) {
			return [
				<button className="btn btn-default"	onClick={this.handleSaveClick}>Save</button>,
				<button className="btn btn-default"	onClick={this.handleCancelClick}>Cancel</button>
			];
		} else {
			return <button 
					className="btn btn-default"
					onClick={this.handleDeleteClick}
					>
					Delete
				</button>;
		}
	},
	handleDoneChanged: function(e) {
		this.setState({done: e.target.checked, textChanged: false, newText: this.state.text});
		this.fb.update({done: e.target.checked});
	},
	handleTextChanged: function(e) {
		this.setState({textChanged: true, newText: e.target.value})
	},
	handleDeleteClick: function(e) {
		this.fb.remove();
	},
	handleSaveClick: function(e) {
		this.setState({text: this.state.newText, textChanged: false});
		this.fb.update({text: this.state.newText});
	},
	handleCancelClick: function(e) {
		this.setState({newText: this.state.text, textChanged: false});
	}
});