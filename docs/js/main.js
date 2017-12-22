(function() {
	'use strict';

	document.addEventListener('DOMContentLoaded', function() {
		fetch('./furuyoni_cards.json').then(function(cards) {
			console.log(cards);
		});
	});
})();
