# Redux Schema via Runtypes

```
.______       _______  _______   __    __  ___   ___         _______.  ______  __    __   _______ .___  ___.      ___      
|   _  \     |   ____||       \ |  |  |  | \  \ /  /        /       | /      ||  |  |  | |   ____||   \/   |     /   \     
|  |_)  |    |  |__   |  .--.  ||  |  |  |  \  V  /        |   (----`|  ,----'|  |__|  | |  |__   |  \  /  |    /  ^  \    
|      /     |   __|  |  |  |  ||  |  |  |   >   <          \   \    |  |     |   __   | |   __|  |  |\/|  |   /  /_\  \   
|  |\  \----.|  |____ |  '--'  ||  `--'  |  /  .  \     .----)   |   |  `----.|  |  |  | |  |____ |  |  |  |  /  _____  \  
| _| `._____||_______||_______/  \______/  /__/ \__\    |_______/     \______||__|  |__| |_______||__|  |__| /__/     \__\ 
                                                                                                                           
```

[![NPM](https://nodei.co/npm/redux-runtypes-schema.png?downloads=true&stars=true)](https://nodei.co/npm/redux-runtypes-schema/)

[![CircleCI](https://circleci.com/gh/mobify/redux-runtypes-schema.svg?style=svg)](https://circleci.com/gh/mobify/redux-runtypes-schema)

## Introduction

This library provides a reducer that enables full Redux store validation against
a known schema defined using the [runtypes](https://github.com/pelotom/runtypes)
library.

Inspiration for this library is based on the article [*Redux and JSON Schema -
Two great tastes that go great
together*](https://blog.prismatik.com.au/redux-and-json-schema-c63368931143).

A common issue with Redux is understanding what your stores schema is (or should
be) as your application grows. Running the app and inspecting the store using
the Redux dev tools is great for development but is not foolproof, as different
reducers may modify the store in inconsistent ways and leave your store in an
unexpected state.

This library runs the state returned from the root reducer through runtype
validation as a final step. This means that if you dispatch an action and the
reducer modifies the store in a way that doesn't match your intended schema,
you'll get a validation warning in your console.

## Usage

Using `redux-runtypes-schema` is as easy as passing your root reducer and
a runtype definition to the `createSchemaReducer` function and using
that to create your Redux store.

```js
import createSchemaReducer from 'redux-runtypes-schema'
import Runtypes from 'runtypes'

const Schema = Runtypes.Record({
    // Schema defined here using runtypes records and types
})

// Set up project reducer(s)
const rootReducer = combineReducers({
    // all top-level keys for project defined here.
})

// Wrap project reducer in schema reducer
const reducer = createSchemaReducer(
    Schema,
    combineReducers(reducers)
)

const store = createStore(reducer)

// TODO: Launch app (render react app with <Provider store={store}>
```

## Developing

Begin by installing npm dependencies:

```sh
$ npm install
```

`redux-runtypes-schema` is written using TypeScript and built using Rollup.
These are both new technologies to Mobify and would be considered to be in
the "evaluate" stage of a "technology radar".

### Running tests

Run all tests with:

```sh
$ npm test
```

Start [jest](https://facebook.github.io/jest/) (the testing tool) in "watch"
by running:

```sh
$ npm run test:watch
```

This will start jest and watch for file changes. Any time you change a file
and save it, jest will automatically re-run affected tests. This is a very
efficient way to develop changes/bugfixes for the library.

### Pull Requests

This project is hosted on Github. Use the Pull Request feature to contribute
changes back to this project (we 💖 community contributions).

## Deployment

`redux-runtypes-schema` is managed by Mobify's Mobitron bot. Releases are
started by messaging @mobitron in Slack. @mobitron creates a release branch from
`develop`, updates the version numbers, and merges to `master`.

Once that is done, a CircleCI build will run and push the updated code to npm.

### Starting a release

Message @mobitron in Slack. `@mobitron release redux-runtypes-schema
minor|patch`. Choose between `minor` and `patch` when doing the release.
Releases should follow [semver](semver.org).
