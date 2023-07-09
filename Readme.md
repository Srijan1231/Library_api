# Nodejs FES Template

# Environment vars

This project uses the following environment variables:

| Name | Description          | Default Value |
| ---- | -------------------- | ------------- |
| CORS | Cors accepted values | "\*"          |

# Pre-requisites

- Install [Node.js](https://nodejs.org/en/) version 18.16.1 LTS
  Recommended For Most Users

# Getting started

- Clone the repository

```
git clone  <git lab template url> <project_name>
```

- Install dependencies

```
cd <project_name>
npm install
```

- Build and run the project

```
npm start
```

Navigate to `http://localhost:8000`
"scripts":
"start": "node server.js",
"dev": "nodemon server.js",
"test": "echo \"Error: no test specified\" && exit 1"
