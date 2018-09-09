# TodoMVC with OrbitDB

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

> Serverless and collaborative Todo lists

TodoMVC application using [OrbitDB](https://github.com/orbitdb/orbit-db) as a database for the todo list and [IPFS](https://github.com/ipfs/js-ipfs) as the storage and networking. This is an example to demonstrate how OrbitDB enables multi-user, real-time and serverless editing of a dataset.

**_Work in progress_**

**[LIVE DEMO](https://ipfs.io/ipfs/QmTJGHccriUtq3qf3bvAQUcDUHnBbHNJG2x2FYwYUecN43/)**

<p align="centers">
  <img src="https://raw.githubusercontent.com/natachadelarosa/example-orbitdb-todomvc-updated/master/screenshots/Screen%20Shot%202018-09-09%20at%2011.10.20.png" width="50%">
</p>

## Install

```
git clone <repo>
cd repo/
npm install
npm run build
```

## Run

```
npm start
```

Open your browser at http://localhost:3000

## Available Scripts

In the project directory, you can run:

- ### `npm start`

- ### `npm test`

- ### `npm run build`

- ### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

## Collaborative editing by multiple users

To collaborate on a TODO list, open the same url in _another browser or incognito window_. You should see the TODO lists sync automatically.

## More Info

This example is based on [React TodoMVC](https://github.com/tastejs/todomvc/tree/master/examples/react).

- Initializing OrbitDB and IPFS happens in [store](https://github.com/natachadelarosa/example-orbitdb-todomvc-updated/blob/master/src/utils/store.js)
- OrbitDB calls happen in [model](https://github.com/natachadelarosa/example-orbitdb-todomvc-updated/blob/master/src/utils/todoModel.js)
- The database and app are hooked together in [app](https://github.com/natachadelarosa/example-orbitdb-todomvc-updated/blob/master/src/index.js#L23)

## Contribute

We'd be happy have contributions! If you find any issues, have suggestions for new features or would like to improve the project, please open an issue.
