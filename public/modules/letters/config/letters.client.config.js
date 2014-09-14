'use strict';

// Configuring the Articles module
angular.module('letters').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('tobar', 'Letters', 'letters', 'dropdown', '/letters(/create)?');
		Menus.addSubMenuItem('tobar', 'letters', 'List Letters', 'letters');
		Menus.addSubMenuItem('tobar', 'letters', 'New Letter', 'letters/create');
	}
]);