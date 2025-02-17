import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAudioStore = defineStore('audio', () => {
		const audio = ref<HTMLAudioElement | null>(null);
		const isPlaying = ref(false);
		const selectedRadio = ref<any | null>(null);

		const playRadio = (radio: any | null) => {
				if (audio.value) {
						audio.value.pause();
						audio.value = null;
				}
				if (radio) {
						audio.value = new Audio(radio.url);
						audio.value.play().catch((err) => console.error("Erro ao reproduzir áudio:", err));
						isPlaying.value = true;
						selectedRadio.value = radio;
				} else {
						isPlaying.value = false;
						selectedRadio.value = null;
				}
		};

		const togglePlay = () => {
				if (audio.value) {
						if (isPlaying.value) {
								audio.value.pause();
						} else {
								audio.value.play().catch((err) => console.error("Erro ao retomar áudio:", err));
						}
						isPlaying.value = !isPlaying.value;
				}
		};

		return {
				audio,
				isPlaying,
				selectedRadio,
				playRadio,
				togglePlay,
		};
});
