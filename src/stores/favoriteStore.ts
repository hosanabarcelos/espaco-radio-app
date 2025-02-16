import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useFavoriteStore = defineStore('favorites', () => {
		const favorites = ref(new Set(JSON.parse(localStorage.getItem('favorites') || '[]')));

		const toggleFavorite = (stationuuid: string) => {
				if (favorites.value.has(stationuuid)) {
						favorites.value.delete(stationuuid);
				} else {
						favorites.value.add(stationuuid);
				}
				localStorage.setItem('favorites', JSON.stringify([...favorites.value]));
		};

		const isFavorite = (stationuuid: string) => {
				return favorites.value.has(stationuuid);
		};

		watch(favorites, () => {
				localStorage.setItem('favorites', JSON.stringify([...favorites.value]));
		}, { deep: true });

		return {
				favorites,
				toggleFavorite,
				isFavorite,
		};
});