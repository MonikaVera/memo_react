const data = require('../locales/data.json');

/**
 * Translation function to retrieve translation based on the provided key.
 * @param {string} key - Translation key in the format 'namespace/path/to/translation'.
 * @returns {string} - Translated string for the provided key, or an empty string if not found.
 */
export function t(key) {
    const keys = key.split('/');
    let result = data;

    for (const k of keys) {
        result = result[k];
        if (!result) return '';
    }

    return result;
}