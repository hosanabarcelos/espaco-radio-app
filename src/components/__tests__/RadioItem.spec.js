import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import RadioItem from '@/components/RadioItem.vue'
import { useAudioStore } from '@/stores/audioStore'
import { useFavoriteStore } from '@/stores/favoriteStore'

vi.mock('@/stores/audioStore', () => ({
	useAudioStore: vi.fn(() => ({
		isPlaying: false,
		selectedRadio: null,
		togglePlay: vi.fn(),
		playRadio: vi.fn()
	}))
}))

vi.mock('@/stores/favoriteStore', () => ({
	useFavoriteStore: vi.fn(() => ({
		isFavorite: vi.fn(() => false),
		toggleFavorite: vi.fn()
	}))
}))

describe('RadioItem.vue', () => {
	const radioMock = {
		stationuuid: '123',
		name: 'Rádio Teste',
		editedName: null,
		favicon: 'https://example.com/favicon.ico'
	}

	it('renders correctly', () => {
		const wrapper = mount(RadioItem, {
			props: {
				radio: radioMock,
				isSelected: false,
				showPlayIcon: true,
				showOptionsIcon: true,
				isDropdownOpen: false
			}
		})

		expect(wrapper.exists()).toBe(true)
		expect(wrapper.text()).toContain('Rádio Teste')
	})

	it('displays the play/pause button correctly', () => {
		const wrapper = mount(RadioItem, {
			props: { radio: radioMock, showPlayIcon: true }
		})

		const playButton = wrapper.find('button')
		expect(playButton.exists()).toBe(true)
	})

	it('opens and closes the dropdown correctly', async () => {
		const wrapper = mount(RadioItem, {
			props: { radio: radioMock, isDropdownOpen: false, showOptionsIcon: true }
		})

		const dropdownButton = wrapper.find('.dropdown-button')
		await dropdownButton.trigger('click')

		expect(wrapper.emitted('dropdown-toggle')).toBeTruthy()
		expect(wrapper.emitted('dropdown-toggle')?.[0]).toEqual(['123'])
	})
})
