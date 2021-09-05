import {
	pick,
	fetch_dict,
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
	const taphold_threshold: number = 750;
	let taphold_timer_id: number | null = null;

	const ready = async function() {
		dict = await fetch_dict();
	};


	$(window).on('DOMContentLoaded', ready);

	$(document).on('click', 'main', async function() {
		if (dict == null) {
			await ready();
		}

		const pool: Card[] = dict!.normal.filter(function(e: Card) {return e.category === '通常札';});
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

	$(document).on('dblclick', '#modal', function() {
		$('#modal').fadeOut();
	});

	$(document).on('click', '#modal #close', function() {
		$('#modal').fadeOut();
	});

	$(document).on('mousedown', '#modal', function() {
		taphold_timer_id = window.setTimeout(function() {
			$('#modal').fadeOut();
			taphold_timer_id = null;
		}, taphold_threshold);
	});
	$(document).on('mouseup', '#modal', function() {
		if (taphold_timer_id) {window.clearTimeout(taphold_timer_id);}
		taphold_timer_id = null;
	});

	$(document).on('click', '#modal .card', function(ev) {
		$('#modal .card').addClass('inactive');
		$(this).removeClass('inactive');
		ev.stopPropagation();
	});


	$(document).on('click', '#button-na', function() {
		window.location.assign('./index2.html');
	});
})();
