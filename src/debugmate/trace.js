const { parse } = require('../stackTraceParser');
const { getCodePreviewFromAPI } = require('./api');
/**
 * Parses the error stack trace and retrieves relevant information such as file, line, column, function name, and preview.
 * 
 * @param {Error} error The error object to parse the stack trace from.
 * @param {string} domain The domain of the Debugmate API to fetch previews from.
 * @param {string} token The token used for authenticating API requests.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of stack trace data objects, including preview content.
 */
async function trace(error, domain, token) {
    try {
        const sources = await parse(error);
        const files = sources.map(({ file, line }) => ({ path: file, line }));
        const previews = await getCodePreviewFromAPI(domain, token, files);
        
        return sources.map(({ name, message, file, line, column, function: func }) => {

            const fileName = getPathAfterSrc(file);
            const previewKey = previews[file + ':' + line] ?? previews[fileName + ':' + line];

            return {
                name,
                message,
                file: file || 'unknown',
                line,
                column: column || 0,
                function: func || 'anonymous',
                preview: previewKey ?? ['Preview not available']
        }});
    } catch (err) {
        console.error('Error while parsing stack trace:', err);
        return [];
    }
}

function getPathAfterSrc(path) {
    const srcIndex = path.indexOf('/src/');
    
    if (srcIndex !== -1) {
        return path.slice(srcIndex + 5);
    }
    
    return path;
}

module.exports = { trace };
