<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { PhCaretRight, PhCaretLeft, PhHeart, PhMagnifyingGlass } from '@phosphor-icons/vue'

import { getRadios } from '@/services/radio-service'
import Pagination from './Pagination.vue'
import Dropdown from './Dropdown.vue'
import RadioItem from './RadioItem.vue'

const isOpen = ref(true)
const favorites = ref(new Set())
const allRadios = ref([])
const filteredRadios = ref([])
const displayedRadios = ref([])
const offset = ref(0)
const limit = ref(50)
const isLoading = ref(false)
const hasMoreRadios = ref(true)

const searchQuery = ref('')
const selectedCountry = ref('')
const selectedLanguage = ref('')
const countries = ref([])
const languages = ref([])

const currentPage = ref(1)
const totalPages = ref(1)
const radiosPerPage = 10

const fetchAllRadios = async () => {
	isLoading.value = true
	allRadios.value = await getRadios(0, 6000)

	allRadios.value = allRadios.value.filter((radio) => radio.name.trim() !== '')

	countries.value = [...new Set(allRadios.value.map((radio) => radio.country).filter(Boolean))]
	languages.value = [...new Set(allRadios.value.map((radio) => radio.language).filter(Boolean))]

	displayedRadios.value = allRadios.value.slice(0, limit.value)

	isLoading.value = false
}

const loadMoreRadios = () => {
	const nextOffset = offset.value + limit.value
	const newRadios = allRadios.value.slice(nextOffset, nextOffset + limit.value)

	if (newRadios.length > 0) {
		displayedRadios.value.push(...newRadios)
		offset.value += limit.value
	} else {
		hasMoreRadios.value = false
	}
}

const applyFilters = () => {
	let filtered = [...allRadios.value]

	if (searchQuery.value) {
		filtered = filtered.filter((radio) =>
			radio.name.toLowerCase().includes(searchQuery.value.toLowerCase())
		)
	}
	if (selectedCountry.value) {
		filtered = filtered.filter((radio) => radio.country === selectedCountry.value)
	}
	if (selectedLanguage.value) {
		filtered = filtered.filter((radio) => radio.language === selectedLanguage.value)
	}

	filteredRadios.value = filtered

	if (!searchQuery.value && !selectedCountry.value && !selectedLanguage.value) {
		displayedRadios.value = allRadios.value.slice(0, limit.value)
		hasMoreRadios.value = true
	} else {
		totalPages.value = Math.ceil(filtered.length / radiosPerPage)
		currentPage.value = 1
		updateDisplayedRadios()
	}
}

const updateDisplayedRadios = () => {
	const start = (currentPage.value - 1) * radiosPerPage
	displayedRadios.value = filteredRadios.value.slice(start, start + radiosPerPage)
}

const nextPage = () => {
	if (currentPage.value < totalPages.value) {
		currentPage.value++
		updateDisplayedRadios()
	}
}

const prevPage = () => {
	if (currentPage.value > 1) {
		currentPage.value--
		updateDisplayedRadios()
	}
}

const toggleFavorite = (stationuuid) => {
	if (favorites.value.has(stationuuid)) {
		favorites.value.delete(stationuuid)
	} else {
		favorites.value.add(stationuuid)
	}
}

onMounted(fetchAllRadios)

watch([searchQuery, selectedCountry, selectedLanguage], applyFilters)
</script>

<template>
	<div>
		<div
			class="fixed top-0 left-0 h-full w-64 bg-[#091929] text-white shadow-lg transition-transform duration-300 flex flex-col"
			:class="{ '-translate-x-full': !isOpen, 'translate-x-0': isOpen }"
		>
			<div class="flex items-center justify-between p-4">
				<div class="flex items-center">
					<img src="/logo.png" alt="Logo Space Rádio" class="w-10 h-auto mr-2" />
					<h3 class="text-xl font-bold font-trench">Espaço Rádio</h3>
				</div>
				<button @click="isOpen = false" class="p-2 bg-gray-700 rounded-md hover:bg-gray-600">
					<PhCaretLeft :size="22" />
				</button>
			</div>

			<hr class="border-gray-600 mb-1" />

			<div class="p-2">
				<div class="relative">
					<PhMagnifyingGlass class="absolute left-2 top-2 text-gray-400" :size="18" />
					<input
						v-model="searchQuery"
						type="text"
						placeholder="Buscar rádio..."
						class="w-full pl-8 p-2 rounded-lg bg-gray-800 text-white focus:outline-none"
					/>
				</div>
			</div>

			<Dropdown
				v-model="selectedCountry"
				:items="countries"
				placeholder="Filtrar por País"
				truncate-type="words"
				truncate-limit="5"
			/>
			<Dropdown
				v-model="selectedLanguage"
				:items="languages"
				placeholder="Filtrar por Idioma"
				truncate-type="chars"
				truncate-limit="25"
			/>

			<hr class="border-gray-600 mt-2" />

			<ul class="p-2 flex-grow overflow-y-auto">
				<RadioItem
					v-for="radio in displayedRadios"
					:key="radio.stationuuid"
					:radio="radio"
					:favorites="favorites"
					@toggle-favorite="toggleFavorite"
				/>

				<li
					v-if="hasMoreRadios && !searchQuery && !selectedCountry && !selectedLanguage"
					class="flex justify-center p-3 my-1"
				>
					<button
						@click="loadMoreRadios"
						:disabled="isLoading"
						class="w-full p-2 bg-transparent hover:text-[#2EABC5] transition disabled:opacity-50"
					>
						{{ isLoading ? 'Carregando...' : 'Ver Mais' }}
					</button>
				</li>
			</ul>

			<div v-if="searchQuery || selectedCountry || selectedLanguage" class="p-4">
				<Pagination
					:currentPage="currentPage"
					:totalPages="totalPages"
					@prevPage="prevPage"
					@nextPage="nextPage"
				/>
			</div>
		</div>

		<button
			v-if="!isOpen"
			@click="isOpen = true"
			class="fixed top-4 left-4 p-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-all"
		>
			<PhCaretRight :size="22" />
		</button>
	</div>
</template>