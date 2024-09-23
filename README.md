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
