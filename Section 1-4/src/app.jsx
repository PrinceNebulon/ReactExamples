var React = require('react');
var Form = require('./Form');
var Dropdown = require('./Dropdown');

// Render this class; this INSTANTIATES the class defined by HelloWorld
var options = {
	title: 'Choose a dessert',
	items: [
		'Ice Cream',
		'Pie',
		'Flan',
		'Cake'
	]
};

element = React.createElement(Dropdown, options);
React.render(element, document.querySelector('.container'));