/**
* @typedef {Object} User
* @property {number} id
* @property {string} name
* @property {string} email
*/

/**
* @typedef {Object} Environment
* @property {string} environment
* @property {boolean} debug
* @property {string} timezone
* @property {string} server
* @property {string} database
* @property {string} npm
*/

/**
* @typedef {Object} Request
* @property {Object} request
* @property {Object} headers
* @property {Object} query_string
* @property {string} body
*/

class Context {
    constructor() {
        this.error = null;
        this.request = null;
        this.user = null;
        this.environment = null;
        this.process = {
            platform: typeof window !== 'undefined' && navigator.platform ? navigator.platform : 'unknown',
            version: typeof window !== 'undefined' && navigator.appVersion ? navigator.appVersion : 'unknown',
        };
    }

    /**
     * Set the error information.
     * @param {Error} error
     * @returns {Context}
     */
    setError(error) {
        this.error = error;
        return this;
    }

    /**
     * Set the current request information (request, headers, query_string, body).
     * @param {Request} request
     * @returns {Context}
     */
    setRequest(request) {
        this.request = request;
        return this;
    }

    /**
     * Set the current user information (id, name, email).
     * @param {User} user
     * @returns {Context}
     */
    setUser(user) {
        this.user = user;
        return this;
    }

    /**
     * Set the current environment information (environment, debug, timezone, server, database, npm).
     * @param {Environment} environment
     * @returns {Context}
     */
    setEnvironment(environment) {
        this.environment = environment;
        return this;
    }

    /**
     * Set the process information (platform and version).
     * @param {Object} process
     * @returns {Context} The context instance.
     */
    setProcess(process) {
        this.process = process;
        return this;
    }

    /**
     * Get the process information, or default values if not set.
     * @returns {Object}
     */
    get getProcess() {
        return this.process || { platform: 'unknown', version: 'unknown' };
    }

    /**
     * Check and return the name of the operating system.
     * @returns {string}
     */
    checkOperationSystem() {
        const osValue = this.getProcess.platform.toLowerCase();

        const operationalSystem = {
            'macintel': 'MacOS',
            'win32': 'Windows',
            'linux': 'Linux',
            'android': 'Android',
        };

        return operationalSystem[osValue] || 'Unknown';
    }

    /**
     * Get the combined payload with user, request, and environment information.
     * @returns {Object} The combined context information.
     */
    payload() {
        return {
            ...this.appUser(),
            ...this.appRequest(),
            ...this.appEnvironment(),
        };
    }

     /**
     * Get the user information if set.
     * @returns {User} User information or an empty object if not set.
     */
    appUser() {
        return this.user ? { user: this.user } : {};
    }

    /**
     * Get the request information, including URL, method, headers, query string, and body.
     * @returns {Request} Request information.
     */
    appRequest() {
        const url = window.location.href || 'unknown';
        let queryParams = {};

        if (url !== 'unknown') {
            queryParams = this.getQueryParams();
        }

        return {
            request: {
                request: {
                    url: url,
                    method: this.request?.method || 'GET',
                    params: this.request?.params || {},
                },
                headers: this.request?.headers || {},
                query_string: queryParams,
                body: this.request?.body || '',
            }
        };
    }

    /**
     * Get the query parameters from the URL as an object.
     * @returns {Object} An object with query parameters.
     */
    getQueryParams() {
        const queryString = window.location.search.substring(1);
        const params = new URLSearchParams(queryString);

        return Object.fromEntries(params.entries());
    }

    /**
     * Get the environment information, including JavaScript, application, and system context.
     * @returns {Object} Environment information grouped into JavaScript, App, and System contexts.
     */
    appEnvironment() {
        const javascriptContext = {
            group: 'JavaScript',
            variables: {
                version: this.getProcess.version || 'unknown',
            }
        };

        const environmentVariables = {
            environment: this.environment?.environment || 'unknown',
            debug: this.environment?.debug || 'unknown',
            timezone: this.environment?.timezone || 'unknown',
        };

        const environmentContext = {
            group: 'App',
            variables: environmentVariables,
        };

        const systemVariables = {
            os: this.checkOperationSystem(),
            server: this.environment?.server || 'unknown',
            database: this.environment?.database || 'unknown',
            npm: this.environment?.npm || 'unknown',
            browser: navigator.userAgent || 'unknown',
        };

        const systemContext = {
            group: 'System',
            variables: systemVariables,
        };

        return {
            environment: this.filterKeys([javascriptContext, environmentContext, systemContext])
        };
    }

    /**
     * Filter out keys from an array of objects that have no properties.
     * @param {Array<Object>} array An array of objects to filter.
     * @returns {Array<Object>} A filtered array of objects.
     */
    filterKeys(array) {
        return array.filter(value => Object.keys(value).length !== 0);
    }
}

module.exports = { Context };