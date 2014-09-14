'use strict';

// Configuring the Articles module
angular.module('letters').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Letters', 'letters', 'dropdown', '/letters(/create)?');
		Menus.addSubMenuItem('topbar', 'letters', 'List Letters', 'letters');
		Menus.addSubMenuItem('topbar', 'letters', 'New Letter', 'letters/create');
	}
]);