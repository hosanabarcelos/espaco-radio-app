	<script setup>
import { computed } from 'vue'
import { PhHeart } from '@phosphor-icons/vue'

const props = defineProps({
	radio: Object,
	favorites: Set,
})

const emit = defineEmits(['toggle-favorite'])

const isFavorite = computed(() => props.favorites.has(props.radio.stationuuid))

const toggleFavorite = () => {
	emit('toggle-favorite', props.radio.stationuuid)
}
</script>

<template>
	<li
		class="flex justify-between items-center p-3 my-1 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition"
	>
		<span class="truncate max-w-[80%]">{{ radio.name }}</span>
		<button @click="toggleFavorite" class="transition-colors duration-300">
			<PhHeart
				:size="20"
				:weight="isFavorite ? 'fill' : 'regular'"
				:class="isFavorite ? 'text-red-500' : 'text-gray-400 hover:text-red-500'"
			/>
		</button>
	</li>
</template>
