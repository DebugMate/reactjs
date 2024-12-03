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

DEBUGMATE_DOMAIN=http://debugmate-app.test
DEBUGMATE_TOKEN=29b68285-5c46-42d0-86a8-19b0c6cd4324
DEBUGMATE_ENABLED=true
```


## Usage

### 1. Report Errors Dynamically
For dynamic error reporting, create a new provider called `DebugmateProvider` (or choose your preferred name). This provider will set user and environment information and manage global error handling.

```js
const DebugmateContext = createContext(null);

export const useDebugmate = () => {
    return useContext(DebugmateContext);
};

const DebugmateProvider = ({ children }) => {
    const debugmate = useMemo(() => new Debugmate(), []);

    const user = {
      id: 1,
      name: 'John Doe',
      email: 'johndoe@email.com',
    }

    const environment = {
      environment: 'local',
      debug: true,
      timezone: 'UTC',
      server: 'apache',
      database: 'mysql 5.7',
      npm: '6.13.4',
    }

    useEffect(() => {
        debugmate.setUser(user);
        debugmate.setEnvironment(environment);
        debugmate.setupGlobalErrorHandling();

        return () => {
            debugmate.cleanupGlobalErrorHandling();
        };
    }, [debugmate]);

    return (
        <DebugmateContext.Provider value={debugmate}>
            {children}
        </DebugmateContext.Provider>
    );
};

export default DebugmateProvider;
```

### 1.1. Wrap Your Application with the DebugmateProvider

To ensure that global error handling is applied throughout your application, wrap your main application with `DebugmateProvider`. Here’s an example:

```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import DebugmateProvider from './DebugmateProvider'; // Importing the DebugmateProvider

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <DebugmateProvider>
      <App/>
    </DebugmateProvider>
  </React.StrictMode>
);
```

### 2. Generating Errors
To generate an error (for example, a division by zero) and report it to Debugmate, you can use a custom hook. When using try/catch, note that you must pass the user and environment along with the error to the publish method, as these details will not be included automatically.

While user and environment are not mandatory parameters, providing them can significantly enhance your error reports by offering valuable context about the user and the environment in which the error occurred. Therefore, you should pass them each time you call the publish method if it is convenient and relevant to your error handling needs.
```js
function GenerateDivisionByZeroError() {
    const debugmate = useDebugmate();

    const user = {
      id: 1,
      name: 'John Doe',
      email: 'johndoe@email.com',
    }

    const environment = {
      environment: 'local',
      debug: true,
      timezone: 'UTC',
      server: 'apache',
      database: 'mysql 5.7',
      npm: '6.13.4',
    }

    try {
        const result = 1 / 0;
        if (!isFinite(result)) {
            throw new Error('Division by zero');
        }
    } catch (error) {
       debugmate.publish(error, user, environment);
    }
}
```
### 3. Using with Next.js

If you are using Next.js, the setup is identical to React. You can create a DebugmateProvider component and wrap your application in the same way you would for React, using the useEffect hook and Debugmate methods to capture and report errors dynamically.
