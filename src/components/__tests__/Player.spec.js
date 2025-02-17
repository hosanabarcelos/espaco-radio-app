import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import Player from '@/components/Player.vue'
import { useAudioStore } from '@/stores/audioStore'

vi.mock('@/stores/audioStore', () => ({
	useAudioStore: vi.fn(() => ({
		isPlaying: false,
		selectedRadio: null,
		togglePlay: vi.fn(),
	}))
}))

describe('Player.vue', () => {
	it('renders correctly', () => {
		const wrapper = mount(Player)
		expect(wrapper.exists()).toBe(true)
	})

	it('displays the message "Start listening now!" when no radio is selected', () => {
		const wrapper = mount(Player)
		expect(wrapper.text()).toContain('Comece a ouvir agora!')
	})

	it('disables the play/pause button when no radio is selected', () => {
		const wrapper = mount(Player)
		const playButton = wrapper.find('button')

		expect(playButton.element.disabled).toBe(true)
		expect(playButton.classes()).toContain('disabled:opacity-50')
	})

	it('correctly displays the selected radio', async () => {
		useAudioStore.mockReturnValue({
			isPlaying: true,
			selectedRadio: {
				name: 'Rádio Teste',
				favicon: 'https://example.com/favicon.ico'
			},
			togglePlay: vi.fn(),
		})

		const wrapper = mount(Player)

		expect(wrapper.text()).toContain('Rádio Teste')

		const img = wrapper.find('img')
		expect(img.exists()).toBe(true)
		expect(img.attributes('src')).toBe('https://example.com/favicon.ico')
	})

	it('calls the togglePlay() function when clicking the play/pause button', async () => {
		const togglePlayMock = vi.fn()

		useAudioStore.mockReturnValue({
			isPlaying: false,
			selectedRadio: { name: 'Rádio Teste' },
			togglePlay: togglePlayMock
		})

		const wrapper = mount(Player)

		const playButton = wrapper.find('button')
		await playButton.trigger('click')

		expect(togglePlayMock).toHaveBeenCalled()
	})

	it('animates wave bars only when radio is playing', async () => {
		const wrapper = mount(Player)

		expect(wrapper.find('.wave-bar').classes()).toContain('wave-bar-static')

		useAudioStore.mockReturnValue({
			isPlaying: true,
			selectedRadio: { name: 'Rádio Teste' },
			togglePlay: vi.fn()
		})

		const wrapperPlaying = mount(Player)
		expect(wrapperPlaying.find('.wave-bar').classes()).not.toContain('wave-bar-static')
	})
})
