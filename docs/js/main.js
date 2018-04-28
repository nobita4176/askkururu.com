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

	var use_origin = false;

	$('main').on('click', function() {
		if (! global.cards) {
			fetch_dict();
			return;
		}

		var pool = use_origin ? global.cards.normal.concat(global.cards.origin_normal) : global.cards.normal;
		var result = pick(pool, 3);
		// console.log(result.map(function(c) {return c.name;}));

		var modal = $('#modal');
		if (modal.length <= 0) {console.error('#modal not found.'); return;}

		modal.find('.card').each(function(i, e) {
			$(e).find('.name').text('「'+result[i].name+'」');
			$(e).removeClass('atk act enh rea thr inactive');
			result[i].type.forEach(function(t) {
				var map = {'攻':'atk', '行':'act', '付':'enh', '対':'rea', '全':'thr', '?':'unknown'};
				$(e).addClass(map[t]);
			});
		});
		$('#modal').fadeIn();
	});

	$('#modal').on('dblclick', function(ev) {
		$('#modal').fadeOut();
	});

	var taphold_threshold = 750;
	var taphold_timer_id = null;
	$('#modal').on('mousedown', function(ev) {
		taphold_timer_id = setTimeout(function() {
			$('#modal').fadeOut();
			taphold_timer_id = null;
		}, taphold_threshold);
	});
	$('#modal').on('mouseup', function(ev) {
		if (taphold_timer_id) {clearTimeout(taphold_timer_id);}
		taphold_timer_id = null;
	});

	$('#modal .card').on('click', function(ev) {
		$('#modal .card').addClass('inactive');
		$(this).removeClass('inactive');
		ev.stopPropagation();
	});

	$('#button-origin').on('click', function(ev) {
		$(this).toggleClass('on');
		use_origin = !(use_origin);
	});
})(window);
