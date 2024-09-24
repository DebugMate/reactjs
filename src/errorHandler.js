const setupGlobalErrorHandlers = (debugmate) => {

    const handleGlobalError = (message, source, lineno, colno, error) => {
        if (!error) {
            error = new Error(message);
            error.fileName = source;
            error.lineNumber = lineno;
            error.columnNumber = colno;
        }

        debugmate.publish(error);
        console.error('Global error captured:', { message, source, lineno, colno, error });
    };

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

export default setupGlobalErrorHandlers;