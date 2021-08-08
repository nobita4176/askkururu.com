import {
	pick,
	fetch_dict_legacy,
} from './dict';
import type {
	Dictionary,
	Card,
} from './dict';


(function() {
	const classname_map: Record<string, string> = {
		'攻撃': 'atk',
		'行動': 'act',
		'付与': 'enh',
		'対応': 'rea',
		'全力': 'thr',
		'?': 'unknown',
	};
	let dict: Dictionary | null = null;
	let origin_includes: boolean = false;
	const taphold_threshold: number = 750;
	let taphold_timer_id: number | null = null;

	const ready = async function() {
		dict = await fetch_dict_legacy();
	};


	$(window).on('DOMContentLoaded', ready);

	$('main').on('click', async function() {
		if (dict == null) {
			await ready();
		}

		const pool: Card[] = origin_includes
			? dict!.normal.filter(function(e: Card) {return e.category === '通常札';}).concat(dict!.origin_normal!.filter(function(e: Card) {return e.category === '通常札';}))
			: dict!.normal.filter(function(e: Card) {return e.category === '通常札';});
		const result: Card[] = pick(pool, 3);
		// console.log(result.map(function(c) {return c.name;}));

		const $modal = $('#modal');
		if ($modal.length <= 0) {
			console.error('#modal not found.');
			return;
		}

		$modal.find('.card').each(function(i, elem) {
			$(elem).find('.name').text('「'+result[i].name+'」');
			$(elem).removeClass('atk act enh rea thr unknown inactive');

			if (result[i].maintype in classname_map) {
				$(elem).addClass(classname_map[result[i].maintype]);
			}
			if (result[i].subtype in classname_map) {
				$(elem).addClass(classname_map[result[i].subtype]);
			}
		});
		$('#modal').fadeIn();
	});

	$('#modal').on('dblclick', function() {
		$('#modal').fadeOut();
	});

	$('#modal #close').on('click', function() {
		$('#modal').fadeOut();
	});

	$('#modal').on('mousedown', function() {
		taphold_timer_id = window.setTimeout(function() {
			$('#modal').fadeOut();
			taphold_timer_id = null;
		}, taphold_threshold);
	});
	$('#modal').on('mouseup', function() {
		if (taphold_timer_id) {window.clearTimeout(taphold_timer_id);}
		taphold_timer_id = null;
	});

	$('#modal .card').on('click', function(ev) {
		$('#modal .card').addClass('inactive');
		$(this).removeClass('inactive');
		ev.stopPropagation();
	});


	$('#button-origin').on('click', function() {
		origin_includes = ! origin_includes;
		$(this).toggleClass('on', origin_includes);
	});


	$('#button-na').on('click', function() {
		window.location.assign('/index.html');
	});
})();
