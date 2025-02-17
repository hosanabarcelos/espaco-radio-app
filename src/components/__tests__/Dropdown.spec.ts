import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Dropdown from '@/components/Dropdown.vue'

describe('Dropdown.vue', () => {
	const items = ['Brazil', 'EUA', 'Canadá']
	const placeholder = 'Selecione um país'

	it('renders correctly with the provided props', () => {
		const wrapper = mount(Dropdown, {
			props: { items, placeholder }
		})

		expect(wrapper.find('select').exists()).toBe(true)
		expect(wrapper.find('option').exists()).toBe(true)
		expect(wrapper.text()).toContain(placeholder)
	})

	it('displays items correctly', () => {
		const wrapper = mount(Dropdown, {
			props: { items, placeholder }
		})

		const options = wrapper.findAll('option')
		expect(options.length).toBe(items.length + 1)
		expect(options[1]?.text()).toBe('Brazil')
		expect(options[2]?.text()).toBe('EUA')
		expect(options[3]?.text()).toBe('Canadá')
	})

	it('selects an item and emits the correct event', async () => {
		const wrapper = mount(Dropdown, {
			props: { items, placeholder, modelValue: '' }
		})

		const select = wrapper.find('select')
		await select.setValue('EUA')

		expect(wrapper.emitted('update:modelValue')).toBeTruthy()
		expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['EUA'])
	})

	it('disables the dropdown when the disabled prop is true', () => {
		const wrapper = mount(Dropdown, {
			props: { items, placeholder, disabled: true }
		})

		const select = wrapper.find('select')
		expect(select.element.disabled).toBe(true)
		expect(select.classes()).toContain('cursor-not-allowed')
	})
})
