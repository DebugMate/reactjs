/**
 * Parses an Error object to extract function names, file paths, and line/column numbers from the stack trace.
 * @param {Error} error - The Error object to be parsed.
 * @returns {Object} - An object containing an array of parsed sources and the formatted stack trace as a string.
 */
function parse(error) {
    if (!error.stack) {
        return { sources: [], stack: '' };
    }

    const stacklist = error.stack
        .replace(/\n+/g, "\n")
        .split("\n")
        .filter((item, index, array) => {
            return !!item && index === array.indexOf(item);
        });

    const stackReg = /at\s+([^\s]+)\s+\(([^:]+):(\d+):(\d+)\)/i;
    const stackReg2 = /at\s+([^\s]+)\s+([^\s]+):(\d+):(\d+)/i;

    const sources = [];
    stacklist.forEach((item) => {
        let match = stackReg.exec(item) || stackReg2.exec(item);
        if (match && match.length >= 5) {
            sources.push({
                function: match[1] || 'unknown',
                file: match[2] || 'unknown',
                line: match[3] || 'unknown',
                column: match[4] || 'unknown',
            });
        }
    });

    const stack = stacklist.join('\n');

    return { sources, stack };
}

module.exports = { parse };