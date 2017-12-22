(function(global) {
	'use strict';

	var fetch_dict = function() {
		fetch(
			'./js/furuyoni_cards.json'
		).then(function(res) {
			global.cards = res.json();
			console.log(global.cards);
		});
	};
	document.addEventListener('DOMContentLoaded', fetch_dict);

	var pick = function(pool) {
		return shuffle(pool).splice(0, 2);
	};

	var shuffle = function(a) {
		var aa = a.slice(0, a.length); // copy
		for (var i = aa.length - 1; i > 0; i--) {
			var r = Math.floor(Math.random() * (i + 1));
			var tmp = aa[i];
			aa[i] = aa[r];
			aa[r] = tmp;
		}
		return aa;
	};

	document.querySelector('main').addEventListener('click', function() {
		if (! global.cards) {
			fetch_dict();
			return;
		}
		var result = pick(global.cards.normal, 3);
		console.log(result.map(function(c) {return c.name;}));
	});
})(window);
