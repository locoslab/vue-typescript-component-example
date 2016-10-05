/// <reference path='../node_modules/@types/jest/index.d.ts' />
import Vue = require('vue')
import {expectToMatchSnapshot, clickNthButton} from 'vue-jest-utils'
import * as SUT from '../src/counter.vue'

// basic unit testing
describe('counter.vue', () => {
	it('should initialize correctly', () => {
		const vm = new Vue({
			el: document.createElement('div'),
			render: (h) => h(SUT),
		})
		expect(vm.$el.querySelector('div span').textContent).toBe('counter')
		expect(vm.$el.querySelector('div span:nth-child(2)').textContent).toBe('1')
	})
})

// or use snapshot testing
describe('counter.vue', () => {
	it('should just work', () => {
		const vm = new Vue({
			el: document.createElement('div'),
			render: (h) => h(SUT),
		})
		clickNthButton(vm.$el, 1)
		clickNthButton(vm.$el, 3)
		clickNthButton(vm.$el, 2)
		return expectToMatchSnapshot(vm)
	})
})
