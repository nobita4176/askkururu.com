;
;
const pick = function (pool, n) {
    return shuffle(pool).splice(0, n);
};
const shuffle = function (a) {
    const aa = a.slice(0, a.length); // copy
    for (let i = aa.length - 1; i > 0; i--) {
        const r = Math.floor(Math.random() * (i + 1));
        const tmp = aa[i];
        aa[i] = aa[r];
        aa[r] = tmp;
    }
    return aa;
};
const fetch_dict = async function (filename) {
    let response = await window.fetch('./js/' + (filename ?? 'furuyoni_na_cards.json'));
    let dict = await response.json();
    return dict;
};
export { pick, shuffle, fetch_dict, };
