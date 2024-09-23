import { parse } from './stackTraceParser';
import { Context } from './context';
import setupGlobalErrorHandlers from './errorHandler';

class Debugmate {
    constructor() {
        this.domain = process.env.REACT_APP_DEBUGMATE_DOMAIN;
        this.token = process.env.REACT_APP_DEBUGMATE_TOKEN;
        this.enabled = process.env.REACT_APP_DEBUGMATE_ENABLED;
    }

    publish(error, request) {
        console.log('This dentro de publish:', this);
        if (!error || !this.enabled || !this.domain || !this.token) {
            console.log('Error not published to Debugmate. Check environment variables or the error.');
            return;
        }

        const context = new Context();
        const appContext = this.checkAppContext();

        if (appContext?.getUser) {
            context.setUser(appContext.getUser());
        }

        if (appContext?.getEnvironment) {
            context.setEnvironment(appContext.getEnvironment());
        }

        if (request) {
            context.setRequest(request);
        }

        fetch(`${this.domain}/api/capture`, {
            method: 'POST',
            headers: {
                'X-DEBUGMATE-TOKEN': this.token,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(this.payload(error, context)),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Request error: ${response.status}`);
                }

                return response.text();
            })
            .then(text => {
                try {
                    const data = JSON.parse(text);

                    if (!data.success) {
                        console.error('Failed to report error:', data);
                    }
                } catch (e) {
                    console.error('Error parsing response:', e);
                }
            })
            .catch(err => {
                console.error('Error:', err);
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

    payload(error, context) {
        const trace = this.trace(error);

        console.log('Trace:', trace);

        let data = {
            exception: error.name,
            message: error.message,
            file: trace[0].file,
            type: 'web',
            trace: trace
        };

        if (context) {
            context.setError(error);
            data = { ...data, ...context.payload() };
        }

        return data;
    }

    trace(error) {

        let stackTrace = parse(error);

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

    checkAppContext() {
        return null;
    }
}

export default Debugmate;