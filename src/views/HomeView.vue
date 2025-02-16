<script setup>
import { ref, computed, onMounted } from 'vue'
import { getRadios } from '@/services/radio-service'
import Sidebar from '@/components/Sidebar.vue'
import Player from '@/components/Player.vue'
import RadioItem from '@/components/RadioItem.vue'
import { PhMagnifyingGlass } from '@phosphor-icons/vue'

const radios = ref([])
const favoriteRadios = ref([])
const searchQuery = ref('')

const fetchRadios = async () => {
	radios.value = await getRadios()

	const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]')
	favoriteRadios.value = radios.value.filter((radio) => savedFavorites.includes(radio.stationuuid))
}

const updateFavorites = (fav) => {
	favoriteRadios.value = radios.value.filter((radio) => fav.includes(radio.stationuuid))
}

const filteredFavorites = computed(() => {
	return favoriteRadios.value.filter((radio) =>
		radio.name.toLowerCase().includes(searchQuery.value.toLowerCase())
	)
})

onMounted(fetchRadios)
</script>

<template>
	<div>
		<Sidebar :radios="radios" @update-favorites="updateFavorites" />
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
					:favorites="new Set(favoriteRadios.map((r) => r.stationuuid))"
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