<script setup>
import { computed } from 'vue'
import { PhHeart } from '@phosphor-icons/vue'

const props = defineProps({
	radio: Object,
	favorites: Set,
	isSelected: Boolean,
})

const emit = defineEmits(['toggle-favorite', 'select-radio'])

const isFavorite = computed(() => props.favorites.has(props.radio.stationuuid))

const toggleFavorite = () => {
	emit('toggle-favorite', props.radio.stationuuid)
}

const selectRadio = () => {
	emit('select-radio', props.radio)
}
</script>

<template>
	<li
		class="flex justify-between items-center p-3 my-1 rounded-lg cursor-pointer transition"
		:class="{
			'bg-gray-700': isSelected,
			'bg-gray-800': !isSelected,
			'text-[#5de3fd] font-bold': isSelected,
			'text-white': !isSelected,
		}"
		@click="selectRadio"
	>
		<span class="truncate max-w-[80%]">{{ radio.name }}</span>
		<button @click.stop="toggleFavorite" class="transition-colors duration-300">
			<PhHeart
				:size="20"
				:weight="isFavorite ? 'fill' : 'regular'"
				:class="isFavorite ? 'text-red-500' : 'text-gray-400 hover:text-red-500'"
			/>
		</button>
	</li>
</template>