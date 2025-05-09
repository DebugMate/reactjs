const { Context } = require('./context');
const { setupErrorHandling, cleanupErrorHandling } = require('./debugmate/errorHandlerSetup');
const { sendErrorToAPI } = require('./debugmate/api');
const { trace } = require('./debugmate/trace');

/**
 * Debugmate class to handle error reporting, trace collection, and global error handling.
 * This class is implemented as a singleton to ensure only one instance is used throughout the application.
 */
class Debugmate {
    static instance = null;

    /**
     * Creates a singleton instance of the Debugmate class.
     * 
     * @param {Object} options Configuration options for the Debugmate instance.
     * @param {string} options.domain The domain for the Debugmate API.
     * @param {string} options.token The token used for authenticating with the Debugmate API.
     * @param {boolean} options.enabled Flag to enable or disable Debugmate reporting.
     */
    constructor(options = {}) {
        if (!Debugmate.instance) {
            const { domain, token, enabled = true } = options;
            this.domain = domain;
            this.token = token;
            this.enabled = enabled;
            this.context = new Context();
            Debugmate.instance = this;
        }

        return Debugmate.instance;
    }

    /**
     * Sets the user context to be included in the error report.
     * 
     * @param {Object} user The user object containing user-specific information.
     */
    setUser(user) {
        this.context.setUser(user);
    }

    /**
     * Sets the environment context to be included in the error report.
     * 
     * @param {Object} environment The environment object containing environment-specific details.
     */
    setEnvironment(environment) {
        this.context.setEnvironment(environment);
    }

    /**
     * Sets the request context to be included in the error report.
     * 
     * @param {Object} request The request object containing request-specific details.
     */
    setRequest(request) {
        this.context.setRequest(request);
    }

    /**
     * Publishes the error to the Debugmate API, along with the trace and context information.
     * 
     * @param {Error} error The error object that contains the exception details.
     * @param {Object|null} [userContext=null] The user context to associate with the error report.
     * @param {Object|null} [environmentContext=null] The environment context to associate with the error report.
     * @param {Object|null} [request=null] The request context to associate with the error report.
     */
    async publish(error, userContext = null, environmentContext = null, request = null) {
        if (!this.isPublishingAllowed(error)) return;

        userContext && this.setUser(userContext);
        environmentContext && this.setEnvironment(environmentContext);
        request && this.setRequest(request);

        try {
            const traceData = await trace(error, this.domain, this.token);
            const data = {
                exception: error.name,
                message: error.message,
                file: traceData[0]?.file || 'unknown',
                type: 'web',
                trace: traceData,
                ...this.context.payload(),
            };

            await sendErrorToAPI(this.domain, this.token, data);
        } catch (err) {
            console.error('Error preparing payload:', err);
        }
    }

    /**
     * Checks if error publishing is allowed based on the current configuration and error details.
     * 
     * @param {Error} error The error to check.
     * @returns {boolean} Returns true if publishing is allowed, false otherwise.
     */
    isPublishingAllowed(error) {
        if (!error || !this.enabled || !this.domain || !this.token) {
            console.warn('Error not published to Debugmate. Check environment variables or the error.');
            return false;
        }
        return true;
    }

    /**
     * Sets up global error handling, intercepting errors to report them to Debugmate.
     */
    setupGlobalErrorHandling() {
        setupErrorHandling(this);
    }

    /**
     * Cleans up global error handling, stopping error interception.
     */
    cleanupGlobalErrorHandling() {
        cleanupErrorHandling(this);
    }
}

module.exports = Debugmate;
