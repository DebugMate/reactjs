/**
 * Returns the default headers for API requests, including the Debugmate token and content type settings.
 * 
 * @param {string} token The Debugmate API token used for authentication in requests.
 * @returns {Object} An object containing the default headers for making API requests.
 */
function DEFAULT_HEADERS(token) {
    return {
        'X-DEBUGMATE-TOKEN': token,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };
}

module.exports = { DEFAULT_HEADERS };
