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

### 3. Create `.env` file in the root project if you don't have one and add the following variables
```.env
// file: .env

COCKPIT_DOMAIN=http://debugmate-app.test
COCKPIT_TOKEN=29b68285-5c46-42d0-86a8-19b0c6cd4324
COCKPIT_ENABLED=true
```


## Usage

### 1. Report Errors
In the class where you want report the error import the module and call the `debugmate.publish(error)` method
```js
import Debugmate from 'debugmate';

const debugmate = new Debugmate();

try {
    // ...error producing code
} catch (error) {
    debugmate.publish(error)
}
```

### 2. Report Errors Dynamically
For dynamic error reporting, create a new component called `DebugmateGlobalErrorHandler` (or choose your preferred name). This component will set user and environment information and manage global error handling.
```js
import React, { useEffect } from 'react';
import Debugmate from 'devsquad-debugmate';

const debugmate = new Debugmate();

const DebugmateGlobalErrorHandler = ({ children }) => {
    // Set user information
    debugmate.setUser({
        id: 1,
        name: 'John Doe',
        email: 'johndoe@email.com',
    });
    
    // Set environment information
    debugmate.setEnvironment({
        environment: 'local',
        debug: true,
        timezone: 'UTC',
        server: 'apache',
        database: 'mysql 5.7',
        npm: '6.13.4',
    });

    useEffect(() => {
        // Set up global error handling
        debugmate.setupGlobalErrorHandling();

        return () => {
            // Clean up global error handling
            debugmate.cleanupGlobalErrorHandling();
        };
    }, []);

    return <>{children}</>;
};

export default DebugmateGlobalErrorHandler;
```
