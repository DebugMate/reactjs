const { parse } = require('./stackTraceParser');
const setupGlobalErrorHandlers = require('./errorHandler');
const { Context } = require('./context');

class Debugmate {
    constructor() {
        this.domain = process.env.REACT_APP_DEBUGMATE_DOMAIN || process.env.NEXT_PUBLIC_DEBUGMATE_DOMAIN;
        this.token = process.env.REACT_APP_DEBUGMATE_TOKEN || process.env.NEXT_PUBLIC_DEBUGMATE_TOKEN;
        this.enabled = process.env.REACT_APP_DEBUGMATE_ENABLED || process.env.NEXT_PUBLIC_DEBUGMATE_ENABLED;

        this.context = new Context();
    }

    setUser(user) {
        this.context.setUser(user);
    }

    setEnvironment(environment) {
        this.context.setEnvironment(environment);
    }

    setRequest(request) {
        this.context.setRequest(request);
    }

    publish(error, userContext = null, environmentContext = null) {
        if (!this.isPublishingAllowed(error)) return;

        if (userContext) {
            this.setUser(userContext);
        }

        if (environmentContext) {
            this.setEnvironment(environmentContext);
        }

        const requestPayload = this.context.appRequest();
        const data = this.payload(error, requestPayload);

        fetch(`${this.domain}/api/capture`, {
            method: 'POST',
            headers: {
                'X-DEBUGMATE-TOKEN': this.token,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(this.handleResponse)
            .catch(err => console.error('Debugmate error:', err));
    }

    isPublishingAllowed(error) {
        if (!error || this.enabled == 'false' || !this.domain || !this.token) {
            console.warn('Error not published to Debugmate. Check environment variables or the error.');
            return false;
        }
        return true;
    }

    handleResponse(response) {
        if (!response.ok) {
            throw new Error(`Request error: ${response.status}`);
        }

        return response.text().then(text => {
            if (!text) { 
                console.log('Debugmate: Empty response received, assuming success.');
                return;
            }

            try {
                const data = JSON.parse(text);
                if (!data.success) {
                    console.error('Failed to report error:', data);
                }
            } catch (e) {
                console.error('Error parsing response:', e);
            }
        });
    }

    setupGlobalErrorHandling() {
        setupGlobalErrorHandlers(this);
    }

    cleanupGlobalErrorHandling() {
        if (this.errorHandlers) {
            this.errorHandlers.cleanupErrorHandlers();
        }
    }

    payload(error, request) {
        const trace = this.trace(error);

        let data = {
            exception: error.name,
            message: error.message,
            file: trace[0]?.file || 'unknown',
            type: 'web',
            trace: trace,
            ...this.context.payload(),
        };

        return data;
    }

    trace(error) {
        const stackTrace = parse(error);
        if (!stackTrace.sources || stackTrace.sources.length === 0) {
            return [];
        }

        return stackTrace.sources.map(source => ({
            file: source.file,
            line: source.line,
            column: source.column,
            function: source.function,
            class: source.file,
            preview: stackTrace.stack.split('\n'),
        }));
    }
}

module.exports = Debugmate;