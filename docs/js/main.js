(function(global) {
	'use strict';

	var fetch_dict = function() {
		fetch(
			'./js/furuyoni_cards.json'
		).then(function(res) {
			res.json().then(function(cards) {
				global.cards = cards;
				console.log(global.cards);
			});
		});
	};
	$(document).on('DOMContentLoaded', fetch_dict);

	var pick = function(pool) {
		return shuffle(pool).splice(0, 3);
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

	$('main').on('click', function() {
		if (! global.cards) {
			fetch_dict();
			return;
		}

		var result = pick(global.cards.normal, 3);
		console.log(result.map(function(c) {return c.name;}));

		var modal = $('#modal');
		if (modal.length <= 0) {console.error('#modal not found.'); return;}

		modal.find('.card').each(function(i, e) {
			$(e).find('.name').text('「'+result[i].name+'」');
			$(e).removeClass('atk act enh rea thr inactive');
			result[i].type.forEach(function(t) {
				var map = {'攻':'atk', '行':'act', '付':'enh', '対':'rea', '全':'thr'};
				$(e).addClass(map[t]);
			});
		});
		$('#modal').fadeIn();
	});

	$('#modal').on('dblclick', function(ev) {
		$('#modal').fadeOut();
	});

	$('#modal .card').on('click', function(ev) {
		$('#modal .card').addClass('inactive');
		$(this).removeClass('inactive');
		ev.stopPropagation();
	});
})(window);
