# DebugMate ReactJS & NextJS

DebugMate is an error tracking and monitoring tool designed for React and Next.js applications. This package captures and sends error reports along with environment, user, and request context information to a remote API.

## Singleton Design Pattern
The Debugmate constructor follows the Singleton design pattern, ensuring that only one instance of Debugmate is created during the application lifecycle. This approach helps maintain consistent error reporting across the app.

If you need to reset or reinitialize Debugmate, you can do so manually:

```js
// Reset the singleton instance
Debugmate.instance = null;

// Create a new instance
const newDebugmate = new Debugmate({
  domain: "https://your-new-domain.com",
  token: "new-api-token",
  enabled: true,
});
```

## Installation

### 1. Add module as a local dependency(_while we're still developing_)
```json
file: package.json

"dependencies": {
    "devsquad-debugmate": "file:<place-here-you-clone-the-repo>"
}
```

### 2. Install dependencies
```bash
npm install
```

## Usage

### Usage With ReactJS
Initialize DebugMate by wrapping your application with the DebugmateProvider. Provide your API domain, token, and any additional context like user and environment.

```js
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { DebugmateProvider } from "debugmate";

ReactDOM.render(
  <React.StrictMode>
    <DebugmateProvider
      domain="https://your-domain.com"
      token="your-api-token"
      enabled={true}
      user={{
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
      }}
      environment={{
        environment: "production",
        debug: false,
        timezone: "UTC",
        server: "nginx",
        database: "PostgreSQL",
      }}
    >
      <App />
    </DebugmateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
```

### Usage With NextJS

To ensure that global errors are properly captured and reported using Debugmate in a Next.js application, it's crucial to set up the ErrorBoundary component. This component will catch errors in the app's lifecycle and send them to Debugmate for detailed error tracking.

Here’s an updated example that combines both the DebugmateProvider and the ErrorBoundary to ensure global error handling is enabled in your Next.js application:

1. To integrate DebugmateProvider, ensure you're using "use client" at the top of your file where the provider is being set up. This will ensure the provider is only rendered on the client side.

```js
"use client";

import { DebugmateProvider } from "debugmate";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <DebugmateProvider
          domain="https://your-domain.com"
          token="your-api-token"
          enabled={true}
          user={{
            id: 1,
            name: "John Doe",
            email: "john.doe@example.com",
          }}
          environment={{
            environment: "production",
            debug: false,
          }}
        >
          {children}
        </DebugmateProvider>
      </body>
    </html>
  );
}
```

2. Implementing ErrorBoundary for Global Error Handling
It’s essential to use an ErrorBoundary to capture and report errors that occur within the React component tree. In this setup, when an error occurs, it is caught and reported to Debugmate for further analysis.

Here is how you can set up the ErrorBoundary:

```js
'use client'

import Debugmate from 'devsquad-debugmate';
import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };

        this.debugmate = new Debugmate({
            domain="https://your-domain.com"
            token="your-api-token" 
            enabled: true, 
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

```

3. Wrapping Your App with ErrorBoundary
Once you’ve set up the ErrorBoundary, make sure to wrap your entire application with it in the layout or _app.js file. This will ensure that all errors across the React component tree are caught by the ErrorBoundary.

```js

"use client";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <DebugmateProvider
          domain="https://your-domain.com"
          token="your-api-token"
          enabled={true}
          user={{
            id: 1,
            name: "John Doe",
            email: "john.doe@example.com",
          }}
          environment={{
            environment: "production",
            debug: false,
          }}
        >
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </DebugmateProvider>
      </body>
    </html>
  );
}

```

### Set User Context
User details can be passed directly via the DebugmateProvider. For manual updates:
```js
import { useDebugmateContext } from 'debugmate';

const debugmate = useDebugmateContext();

debugmate.setUser({
  id: 123,
  name: "Jane Doe",
  email: "jane.doe@example.com",
});
```

### Set Environment Context
Add Environment metadata, such as app version or server info:
```js
import { useDebugmateContext } from 'debugmate';

const debugmate = useDebugmateContext();

debugmate.setEnvironment({
  environment: "staging",
  debug: true,
  timezone: "PST",
  server: "apache",
});
```

### Set Request Context
Request details such as HTTP method, headers, query strings, and body can be set using the setRequest method. This helps in tracking requests tied to specific errors.
```js
import { useDebugmateContext } from "debugmate";

const debugmate = useDebugmateContext();

debugmate.setRequest({
  request: {
    url: "https://api.example.com/resource",
    method: "POST",
    params: { key: "value" },
  },
  headers: {
    Authorization: "Bearer token",
    "Content-Type": "application/json",
  },
  query_string: { search: "query" },
  body: JSON.stringify({ data: "payload" }),
});
```

### Publish Errors
You can publish errors manually using the publish method. Pass optional `user`, `environment` and `request` contexts for better insights:

```js
import { useDebugmateContext } from 'debugmate';

const debugmate = useDebugmateContext();

try {
  throw new Error("Test error");
} catch (error) {
  debugmate.publish(error, user, environment, request);
}
```