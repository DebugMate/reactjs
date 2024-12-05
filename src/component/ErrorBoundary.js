'use client'

import React, { Component } from 'react';
import Debugmate from '../debugmate';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };

        const { domain, token, enabled } = props;

        this.debugmate = new Debugmate({
            domain,
            token,
            enabled
        });

        this.debugmate.setupGlobalErrorHandling();
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error: error };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ errorInfo });
        console.error("Error info:", errorInfo);

        this.debugmate.publish(error);
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong: {this.state.error?.message}</h1>;
        }

        return this.props.children; 
    }
}

export default ErrorBoundary;
