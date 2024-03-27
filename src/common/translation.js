const data = require('../locales/data.json');

export function t(key) {
    const keys = key.split('/');
    let result = data;

    for (const k of keys) {
        result = result[k];
        if (!result) return '';
    }

    return result;
}