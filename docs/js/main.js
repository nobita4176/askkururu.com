(function() {
	'use strict';

	var cards;
	document.addEventListener('DOMContentLoaded', function() {
		fetch(
			'./js/furuyoni_cards.json'
		).then(function(res) {
			cards = res.json();
			console.log(cards);
		});
	});

	var pick = function(pool) {
		return shuffle(pool).splice(0, 3);
	};

	var shuffle = function(a) {
		var aa = a.slice(0. a.length); // copy
		for (var i = aa.length - 1; i > 0; i--){
			var r = Math.floor(Math.random() * (i + 1));
			var tmp = aa[i];
			aa[i] = aa[r];
			aa[r] = tmp;
		}
		return aa;
	};

	document.querySelector('main').addEventListener('click', function() {
		var result = pick(cards.normal, 3);
		console.log(result.map(function(c) {return c.name;}));
	});
})();
