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
* [vue-typescript-import-dts](https://github.com/locoslab/vue-typescript-import-dts) to import `*.vue` files in TypeScript sources
* [vue-typescript-jest](https://github.com/locoslab/vue-typescript-jest) to test Vue.js components and TypeScript sources using Jest
* [vue-jest-utils](https://github.com/locoslab/vue-jest-utils) to simplify snapshot testing of Vue.js components using Jest and html2jade

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

### Notable Features
* TypeScript classes as Vue.js components using decorators with [vue-typescript-component](https://github.com/locoslab/vue-typescript-component)
```typescript
import Vue = require('vue')
import * as vts from 'vue-typescript-component'

// http://vuejs.org/guide/components.html
@vts.component()
// extend Vue to get code completion for Vue.js instance functionality
export default class CounterTs extends Vue {
	// http://vuejs.org/api/#props
	@vts.prop({type: String, required: false})
	fromParent: String

	// http://vuejs.org/api/#data
	name = 'counter'
	count = 0

	// http://vuejs.org/api/#methods
	inc() {
		this.count++
	}
	dec() {
		this.count--
	}

	// http://vuejs.org/api/#computed
	get opposite(): number {
		return -this.count
	}
	set opposite(value: number) {
		this.count = -value
	}

	// http://vuejs.org/api/#watch
	@vts.watch('count')
	watchForSignChange(val: number, oldVal: number) {
		if (val === -oldVal) {
			this.$emit('signChanged')
		}
	}

	// http://vuejs.org/api/#Options-Lifecycle-Hooks
	created(): void {
		this.count++
	}
}
```

* Import `*.vue` files in TypeScript classes with [vue-typescript-import-dts](https://github.com/locoslab/vue-typescript-import-dts)
```typescript
// the child component
import * as Child from './child.vue'

@vts.component({components: {Child}})
export default class ParentTs extends Vue implements ChildListener {...}
```

* Use a complex listener interface with compile-time type checks
```typescript
// child component declares listener interface
export interface ChildListener {
	inc(): void
	dec(): void
	greet(text: String): void
}
```
```typescript
// parent components imports and implements interface
import { ChildListener } from './child'
export default class ParentTs extends Vue implements ChildListener {...}
```

* Jest unit testing of Vue.js components (JavaScript or TypeScript) with [vue-typescript-jest](https://github.com/locoslab/vue-typescript-jest)
```typescript
/// <reference path='../node_modules/@types/jest/index.d.ts' />
import Vue = require('vue')
import * as SUT from '../src/counter.vue'

describe('counter.vue', () => {
	it('should initialize correctly', () => {
		const vm = new Vue({
			el: document.createElement('div'),
			render: (h) => h(SUT),
		})
		expect(vm.$el.querySelector('div span').textContent).toBe('counter')
	})
})
```

* Simple Jest snapshot testing with [vue-jest-utils](https://github.com/locoslab/vue-jest-utils)
```typescript
// ...
import {expectToMatchSnapshot, clickNthButton} from 'vue-jest-utils'
describe('counter.vue', () => {
	it('should just work', () => {
		const vm = new Vue({
			el: document.createElement('div'),
			render: (h) => h(SUT),
		})
		clickNthButton(vm.$el, 1)
		clickNthButton(vm.$el, 3)
		clickNthButton(vm.$el, 2)
		// return a Promise that
		// 1. calls vm.nextTick()
		// 2. checks the snapshot of vm.$el using html2jade
		return expectToMatchSnapshot(vm)
	})
})
```

## Notes
Inline TypeScript Code in `*.vue` files is not supported, because external TypeScript code allows IDE support and source maps. Additionally, since the TypeScript compiler does not understand `*.vue` files, code reuse between components (including, e.g., interface definitions) is impossible with inline code.

This example does not directly use [Babel](https://babeljs.io/). However, `vueify` automatically enables Babel for `*.vue` files if `babel-core` is present, and `babel-core` is an indirect dependency of `jest`. In this case, `vueify` depends on additional Babel packages, which are, therefore, included as `devDependencies`. To enable complete support for Babel, e.g. to mix TypeScript and ES2015 sources, run `npm i babelify --save-dev` and add `'babelify'` to the `browserify.transform` list in `package.json`.

## Contributing
Contributions including bug reports, tests, and documentation are more than welcome. Cf. above for how to get started with development.

## Acknowledgements
This project has been heavily inspired by the Browserify template of vue-cli (<https://github.com/vuejs-templates/browserify>).

## License
[The Unlicense](http://unlicense.org)
