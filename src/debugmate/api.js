const { DEFAULT_HEADERS } = require('../utils/headers');

/**
 * Sends an error to the Debugmate API.
 *
 * @async
 * @param {string} domain The Debugmate API domain.
 * @param {string} token The authentication token to send the error.
 * @param {Object} data The error data to be sent.
 * @returns {Promise<void>} A promise that resolves when the request is completed.
 */
async function sendErrorToAPI(domain, token, data) {
    try {
        const response = await fetch(`${domain}/api/capture`, {
            method: 'POST',
            headers: DEFAULT_HEADERS(token),
            body: JSON.stringify(data),
        });
        await handleResponse(response);
    } catch (err) {
        console.error('Error while sending to Debugmate API:', err);
    }
}

/**
 * Handles the response from the API after attempting to send an error.
 *
 * @async
 * @param {Response} response The API response containing the status and body.
 * @throws {Error} If the response is unsuccessful or if an error occurs while processing the response body.
 * @returns {Promise<void>} A promise that resolves when the response has been processed.
 */
async function handleResponse(response) {
    if (!response.ok) {
        throw new Error(`Request error: ${response.status}`);
    }

    const text = await response.text();
    if (!text) {
        console.log('Debugmate: Empty response received, assuming success.');
        return;
    }

    try {
        const data = JSON.parse(text);
        if (!data.success) {
            console.error('Failed to report error:', data);
        }
    } catch (err) {
        console.error('Error parsing response:', err);
    }
}

/**
 * Fetches code preview from the Debugmate API based on the provided files.
 *
 * @async
 * @param {string} domain The Debugmate API domain.
 * @param {string} token The authentication token to send the request.
 * @param {Array<Object>} files List of files for which previews are requested. Each object contains file information like path and line.
 * @returns {Promise<Object>} An object with the previews of the requested files.
 */
async function getCodePreviewFromAPI(domain, token, files) {
    try {
        const response = await fetch(`${domain}/api/preview-file`, {
            method: 'POST',
            headers: DEFAULT_HEADERS(token),
            body: JSON.stringify({ files }),
        });

        if (!response.ok) {
            console.error(`Error fetching preview: ${response.statusText}`);
            return {};
        }

        const data = await response.json();
        return data.previews || {};
    } catch (err) {
        console.error('Error while fetching preview from API:', err);
        return {};
    }
}

module.exports = { sendErrorToAPI, handleResponse, getCodePreviewFromAPI };
