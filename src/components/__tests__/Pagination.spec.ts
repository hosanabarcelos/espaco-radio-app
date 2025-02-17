import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Pagination from '@/components/Pagination.vue'

describe('Pagination.vue', () => {
	it('renders correctly with the provided props', () => {
		const wrapper = mount(Pagination, {
			props: { currentPage: 1, totalPages: 5 }
		})

		expect(wrapper.exists()).toBe(true)
		expect(wrapper.text()).toContain('Página 1 de 5')
	})

	it('disables the "Previous" button when on the first page', () => {
		const wrapper = mount(Pagination, {
			props: { currentPage: 1, totalPages: 5 }
		})

		const prevButton = wrapper.find('button:first-child')
		expect(prevButton.element.disabled).toBe(true)
	})

	it('disables the "Next" button when on the last page', () => {
		const wrapper = mount(Pagination, {
			props: { currentPage: 5, totalPages: 5 }
		})

		const nextButton = wrapper.find('button:last-child')
		expect(nextButton.element.disabled).toBe(true)
	})

	it('enable buttons when there are more pages', () => {
		const wrapper = mount(Pagination, {
			props: { currentPage: 3, totalPages: 5 }
		})

		const prevButton = wrapper.find('button:first-child')
		const nextButton = wrapper.find('button:last-child')

		expect(prevButton.element.disabled).toBe(false)
		expect(nextButton.element.disabled).toBe(false)
	})

	it('emits "prevPage" event when clicking the "Previous" button', async () => {
		const wrapper = mount(Pagination, {
			props: { currentPage: 2, totalPages: 5 }
		})

		await wrapper.find('button:first-child').trigger('click')

		expect(wrapper.emitted('prevPage')).toBeTruthy()
		expect(wrapper.emitted('prevPage').length).toBe(1)
	})

	it('emits "nextPage" event when clicking the "Next" button', async () => {
		const wrapper = mount(Pagination, {
			props: { currentPage: 2, totalPages: 5 }
		})

		await wrapper.find('button:last-child').trigger('click')

		expect(wrapper.emitted('nextPage')).toBeTruthy()
		expect(wrapper.emitted('nextPage').length).toBe(1)
	})
})
