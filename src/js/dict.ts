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
	extra: Card[],
	hajimari: Card[],
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

export {
	pick,
	shuffle,
	fetch_dict,
};
