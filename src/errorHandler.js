/**
 * Sets up global error handlers for capturing unhandled errors and promise rejections.
 * @param {Object} debugmate - An instanceu of the debugmate module for pblishing errors.
 */
const setupGlobalErrorHandlers = (debugmate) => {

    /**
     * Handles global JavaScript errors.
     * @param {string} message - Error message.
     * @param {string} source - Source file where the error occurred.
     * @param {number} lineNumber - Line number where the error occurred.
     * @param {number} colNumber - Column number where the error occurred.
     * @param {Error} error - The error object, if available.
     */
    const handleGlobalError = (message, source, lineNumber, colNumber, error) => {
        if (!error) {
            error = new Error(message);
            error.fileName = source;
            error.lineNumber = lineNumber;
            error.columnNumber = colNumber;
        }

        debugmate.publish(error);
        console.warn('Global error captured:', { message, source, lineNumber, colNumber, error });
    };

    /**
     * Handles unhandled promise rejections.
     * @param {PromiseRejectionEvent} event - The event object representing the unhandled rejection.
     */
    const handleUnhandledRejection = (event) => {
        console.error('Unhandled Promise Rejection:', event);
        const reason = event.reason instanceof Error ? event.reason : new Error(event.reason);
        debugmate.publish(reason);
    };

    window.onerror = handleGlobalError;
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return {
        cleanupErrorHandlers: () => {
            window.onerror = null;
            window.removeEventListener('unhandledrejection', handleUnhandledRejection);
        },
    };
};

module.exports =  setupGlobalErrorHandlers;