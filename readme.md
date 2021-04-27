# Book Searcher

Vasco Maia | April 2021

# 1 Project goal

The goal of this project is to put into practise the acquired knowledge of current web technnologies across the development stack (frontend / backend / devOps).

This application uses a thrid party [API](https://openlibrary.org/developers/api) for book searching using several possible parameters.

The applicaion, besides the main purpose, also implements user authentication using the JSON Web Token industry standard method.

The entire application is hosted in a Kubernetes cluster, with each distinct component of the system containerized and ready to be horizontaly scaled.

# 2 Architecture

This application is composed by three components. The frontend which handles the interaction with the users, the backend which handles communication with a third party API, database persistence and user authentication.

The several components of the application are containerized using [Docker](https://www.docker.com/) and instantiated in a [Kubernetes](https://kubernetes.io) cluster. The orchestration of the entire system is handled by [Skaffold](https://skaffold.dev/) which manages the creation of all the application components and provides live code updates during development.

# 3 Frontend

The frontend of the application was developed using the [React](https://reactjs.org/) framework with special emphasis on current tendencies such as hooks and classless components.

In regards to state management, it was used [Redux](https://redux.js.org/) together with [Redux-thunk](https://github.com/reduxjs/redux-thunk) to provide an application-wide single store and ease communication between components.

For the user interface, [Ant Design](https://ant.design/docs/react/introduce) was used which contains a set of high quality components and is used by several high-profile companies such as Alibaba, Baidu and Tencent.

# 4 Backend

The backend of the application is developed in [Node.js](https://nodejs.org/en/) using [Express](http://expressjs.com/) framework to implement the application API with a minimal footprint.

In addition [Typescript](https://www.typescriptlang.org/) was used in order to provide static type definitions and code validation.

Data persistence is handled by a non-SQL [Mongo](https://www.mongodb.com/) database using [Mongoose](https://mongoosejs.com/).

# 5 Auth

The application implements a fully functional user authentication system using the [JSON Web Token](https://jwt.io) standard.

The system allows for user creation, deletion, signin and signout with reliability and security. The current system allows for auto login and credential refreshing every 15 minutes.

# 6 Installation

## 6.1 - Requirements

6.1.1 - Docker and Kubernetes must be installed beforehand;

6.1.2 - Make your operating system redirect booksearcher.dev to 127.0.0.1.

On windows you can achieve this by going to C:\Windows\System32\drivers\etc, edit the "hosts" file and add the following to the end of the file:

```
127.0.0.1 booksearcher.dev
```

6.1.3 - Install ingress-nginx on your kubernetes context:
Ingress-nginx instalation (https://kubernetes.github.io/ingress-nginx/deploy/)

For windows/mac:

```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.40.1/deploy/static/provider/cloud/deploy.yaml
```

6.1.4 - Create a json web token secret on kubernetes:

```
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=<the_actual_secret>
```

6.1.5 - Create a refresh json web token secret on kubernetes:

```
kubectl create secret generic jwt-refresh-secret --from-literal=JWT_REFRESH_KEY=<the_actual_secret>
```

## 6.2 - Start on development mode:

6.2.1 - Have skaffold installed on your operating system (https://skaffold.dev/).

6.2.2 - On the command line on the folder where skaffold.yaml file is, type "skaffold dev".
