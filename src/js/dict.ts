export interface Card {
	name: string,
	owner: string,
	category: string,
	cost: string | null,
	maintype: string,
	subtype: string,
	range?: string,
	damage?: string,
	charge?: string,
	text: string | null,
};

export interface Dictionary {
	normal: Card[],
	extra?: Card[],
	hajimari?: Card[],
	origin_normal?: Card[],
};

const pick = function(pool: Card[], n: number): Card[] {
	return shuffle(pool).splice(0, n);
};

const shuffle = function<T>(a: T[]): T[] {
	const aa = a.slice(0, a.length); // copy
	for (let i = aa.length - 1; i > 0; i--) {
		const r = Math.floor(Math.random() * (i + 1));
		const tmp = aa[i];
		aa[i] = aa[r];
		aa[r] = tmp;
	}
	return aa;
};

const fetch_dict = async function(filename?: string): Promise<Dictionary> {
	let response = await window.fetch('./js/' + (filename ?? 'furuyoni_na_cards.json'));
	let dict: Dictionary = await response.json();
	return dict;
};


interface LegacyCard {
	name: string,
	owner: string,
	type: ('攻'|'行'|'付'|'対'|'全')[],
	text: string,
};

interface LegacyDictionary {
	normal: LegacyCard[],
	special: LegacyCard[],
	extra: LegacyCard[],
	origin_normal: LegacyCard[],
	origin_special: LegacyCard[],
	origin_extra: LegacyCard[],
};

const fetch_dict_legacy = async function(filename?: string): Promise<Dictionary> {
	const maintype_map: Record<string,string> = {
		'攻': '攻撃',
		'行': '行動',
		'付': '付与',
	};
	const subtype_map: Record<string,string> = {
		'対': '対応',
		'全': '全力',
	};

	let response = await window.fetch('./js/' + (filename ?? 'furuyoni_cards.json'));
	let data: LegacyDictionary = await response.json();

	let dict: Dictionary = {
		'normal': [],
		'origin_normal': [],
	};
	for (let i in data.normal) {
		let e = data.normal[i];
		let card: Card = {
			'name': e.name,
			'owner': e.owner,
			'category': '通常札',
			'cost': null,
			'maintype': e.type[0] in maintype_map ? maintype_map[e.type[0]] : '',
			'subtype': e.type.length >= 2 && e.type[1] in subtype_map ? subtype_map[e.type[1]] : '',
			'text': e.text,
		};
		dict.normal.push(card);
	}
	for (let i in data.origin_normal) {
		let e = data.origin_normal[i];
		let card: Card = {
			'name': e.name,
			'owner': e.owner,
			'category': '通常札',
			'cost': null,
			'maintype': e.type[0] in maintype_map ? maintype_map[e.type[0]] : '',
			'subtype': e.type.length >= 2 && e.type[1] in subtype_map ? subtype_map[e.type[1]] : '',
			'text': e.text,
		};
		dict.origin_normal!.push(card);
	}
	return dict;
};

export {
	pick,
	shuffle,
	fetch_dict,
	fetch_dict_legacy,
};
