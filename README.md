# vue-typescript-component-example [![Build Status](https://travis-ci.org/locoslab/vue-typescript-component-example.svg?branch=master)](https://travis-ci.org/locoslab/vue-typescript-component-example)
Example project for [Vue.js](http://vuejs.org/) 2.0 and [TypeScript](http://www.typescriptlang.org/) 2.0 using
* [Browserify/watchify](http://browserify.org/) for bundling
* [vueify](https://github.com/vuejs/vueify) for Vue.js components supporting Hot Module Replacement
* [Tsify](https://www.npmjs.com/package/tsify) for TypeScript support in a Browserify environment including source maps
* [Pug](https://pugjs.org) for wrist-friendly templates
* [Jest](https://facebook.github.io/jest/) for unit and snapshot testing
* [html2jade](https://github.com/donpark/html2jade) for compact HTML snapshots
* [TSLint](https://palantir.github.io/tslint/) to check TypeScript sources

and illustrating

* [vue-typescript-component](https://github.com/locoslab/vue-typescript-component) to use TypeScript classes as Vue.js components
* [vue-typescript-import-dts](https://github.com/locoslab/vue-typescript-component) to import `*.vue` files in TypeScript sources
* [vue-typescript-jest](https://github.com/locoslab/vue-typescript-jest) to test Vue.js components and TypeScript sources using Jest

## Setup, Development, Build
``` bash
# once: install dependencies
npm install

# serve with HMR at http://localhost:8080
npm start

# run unit tests in watch mode
npm run test -- --watch

# TSLint
npm run lint

# lint, test, and build for production with minification
npm run dist

# for more, cf. package.json
```

## Dive In
Except `index.html`, all source code is located in the `src` directory. The starting point is `index.ts` which initializes the main Vue instance and adds the top-level `app.vue` component. `counter.ts` illustrates the central Vue.js concepts: data, props, computed properties, watches, and events. The same functionality is also split in two parts in `parent.ts` and `child.ts`, which show the use of a complex listener interface to communicate from child to parent with compile-time type checking.

The development output is located in the `debug` directory and `npm run dist` creates minimized output in the `dist` directory.

The file `test/counter.spec.ts` contains an example Jest unit test that checks the HTML rendering after initialization. Furthermore, it contains a snapshot test that utilizes `html2jade` to generate a compact and readable snapshot of the result after a series of user interactions.

## Notes
This package relies on release candidate versions of TypeScript 2.0 and Vue.js 2.0 and is work in progress.

Inline TypeScript Code in `*.vue` files is not supported, because external TypeScript code allows IDE support and source maps. Additionally, since the TypeScript compiler does not understand `*.vue` files, code reuse between components (including, e.g., interface definitions) is impossible with inline code.

This example does not directly use [Babel](https://babeljs.io/). However, `vueify` automatically enables Babel for `*.vue` files if `babel-core` is present, and `babel-core` is an indirect dependency of `jest`. In this case, `vueify` depends on additional Babel packages, which are, therefore, included as `devDependencies`. To enable complete support for Babel, e.g. to mix TypeScript and ES2015 sources, run `npm i babelify --save-dev` and add `'babelify'` to the `browserify.transform` list in `package.json`.

## Acknowledgements
This project has been heavily inspired by the Browserify template of vue-cli https://github.com/vuejs-templates/browserify.

## License
[The Unlicense](http://unlicense.org)
