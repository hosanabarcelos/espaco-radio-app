<script setup>
import { ref, computed, onMounted, watchEffect } from 'vue'
import { getRadios } from '@/services/radio-service'
import Sidebar from '@/components/Sidebar.vue'
import Player from '@/components/Player.vue'
import RadioItem from '@/components/RadioItem.vue'
import { PhMagnifyingGlass } from '@phosphor-icons/vue'
import { useFavoriteStore } from '@/stores/favoriteStore'

const radios = ref([])
const favoriteRadios = ref([])
const searchQuery = ref('')

const favoriteStore = useFavoriteStore()

const fetchRadios = async () => {
	radios.value = await getRadios()
	loadFavorites()
}

const loadFavorites = () => {
	const editedRadios = JSON.parse(localStorage.getItem('editedRadios') || '{}')

	favoriteRadios.value = radios.value
		.filter((radio) => favoriteStore.isFavorite(radio.stationuuid))
		.map((radio) => ({
			...radio,
			editedName: editedRadios[radio.stationuuid] || null,
		}))
}

watchEffect(() => {
	loadFavorites()
})

const filteredFavorites = computed(() => {
	return favoriteRadios.value.filter((radio) => {
		const displayName = radio.editedName || radio.name
		return displayName.toLowerCase().includes(searchQuery.value.toLowerCase())
	})
})

const editRadioName = ({ uuid, newName }) => {
	const editedRadios = JSON.parse(localStorage.getItem('editedRadios') || '{}')
	editedRadios[uuid] = newName
	localStorage.setItem('editedRadios', JSON.stringify(editedRadios))
	loadFavorites()
}

const removeRadio = (uuid) => {
	favoriteStore.toggleFavorite(uuid)
}

onMounted(fetchRadios)
</script>

<template>
	<div>
		<Sidebar :radios="radios" @update-favorites="loadFavorites" />
		<Player />

		<div
			class="h-screen w-[calc(100vw-16rem)] ml-[16rem] flex flex-col items-start justify-start px-6 pt-[6rem] mr-6"
		>
			<h1 class="text-2xl text-white font-bold font-trench ml-2">Favoritos</h1>
			<div class="relative w-full pr-36">
				<PhMagnifyingGlass class="absolute left-2 top-3 text-gray-400" :size="18" />
				<input
					v-model="searchQuery"
					type="text"
					placeholder="Buscar favorito..."
					class="w-full pl-8 p-2 rounded-lg bg-gray-800 text-white focus:outline-none border-[0.5px] border-[#2EABC5] mb-5"
				/>
			</div>

			<ul class="w-full pr-36 overflow-auto favorite-list">
				<RadioItem
					v-for="radio in filteredFavorites"
					:key="radio.stationuuid"
					:radio="radio"
					:favorites="favoriteStore.favorites"
					:showPlayIcon="true"
					:showOptionsIcon="true"
					@edit-name="editRadioName"
					@remove-favorite="removeRadio"
				/>
			</ul>

			<p v-if="favoriteRadios.length === 0" class="text-gray-400 mt-4">
				Nenhuma rádio favoritada ainda.
			</p>
		</div>
	</div>
</template>

<style scoped>
.favorite-list li:last-child {
	margin-bottom: 8rem;
}
</style>