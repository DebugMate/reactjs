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
        this.process = {
            platform: typeof window !== 'undefined' && navigator.platform ? navigator.platform : 'unknown',
            version: typeof window !== 'undefined' && navigator.appVersion ? navigator.appVersion : 'unknown',
        };
        this.operatingSystem = this.checkOperationSystem();
    }

    /**
     * Set the error information.
     * @param {Error} error
     * @returns {Context}
     */
    setError(error) {
        this.error = error;
    }

    /**
     * Set the current request information (request, headers, query_string, body).
     * @param {Request} request
     * @returns {Context}
     */
    setRequest(request) {
        this.request = request;
    }

    /**
     * Set the current user information (id, name, email).
     * @param {User} user
     * @returns {Context}
     */
    setUser(user) {
        this.user = user;
    }

    /**
     * Set the current environment information (environment, debug, timezone, server, database, npm).
     * @param {Environment} environment
     * @returns {Context}
     */
    setEnvironment(environment) {
        this.environment = environment;
    }

    /**
     * Set the process information (platform and version).
     * @param {Object} process
     * @returns {Context} The context instance.
     */
    setProcess(process) {
        this.process = process;
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
        return {
            environment: this.filterKeys([
                this.javascriptContext(),
                this.appEnvironmentVariables(),
                this.systemContext(),
            ]),
        };
    }

    javascriptContext() {
        return this.processInfo?.version
            ? { group: 'JavaScript', variables: { version: this.getProcess.version || 'unknown' } }
            : {};
    }

    appEnvironmentVariables() {
        const vars = {};
        this.addIfDefined(vars, 'environment', this.environment?.environment);
        this.addIfDefined(vars, 'debug', this.environment?.debug);
        this.addIfDefined(vars, 'timezone', this.environment?.timezone);

        return Object.keys(vars).length ? { group: 'App', variables: vars } : {};
    }

    systemContext() {
        const vars = {
            os: this.operatingSystem,
            server: this.environment?.server,
            database: this.environment?.database,
            npm: this.environment?.npm,
            browser: this.request?.headers?.['user-agent'],
        };

        return { group: 'System', variables: vars };
    }

    addIfDefined(target, key, value) {
        if (value !== undefined) {
            target[key] = value;
        }
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

module.exports.Context = Context;