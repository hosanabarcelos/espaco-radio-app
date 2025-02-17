<script setup>
import { ref, computed } from 'vue'
import { PhHeart, PhPlay, PhPause } from '@phosphor-icons/vue'
import { useAudioStore } from '@/stores/audioStore'
import { useFavoriteStore } from '@/stores/favoriteStore'

const props = defineProps({
	radio: Object,
	isSelected: Boolean,
	showPlayIcon: Boolean,
	showOptionsIcon: Boolean,
})

const emit = defineEmits(['select-radio', 'edit-name', 'remove-favorite'])

const audioStore = useAudioStore()
const favoriteStore = useFavoriteStore()

const isFavorite = computed(() => favoriteStore.isFavorite(props.radio.stationuuid))
const isPlaying = computed(
	() => audioStore.isPlaying && audioStore.selectedRadio?.stationuuid === props.radio.stationuuid
)
const isEdited = computed(() => !!props.radio.editedName)
const displayName = computed(() => props.radio.editedName || props.radio.name)

const toggleFavorite = () => {
	favoriteStore.toggleFavorite(props.radio.stationuuid)
}

const selectRadio = () => {
	emit('select-radio', props.radio)
}

const togglePlay = () => {
	if (audioStore.selectedRadio?.stationuuid === props.radio.stationuuid) {
		audioStore.togglePlay()
	} else {
		audioStore.playRadio(props.radio)
	}
}

const isDropdownOpen = ref(false)

const toggleDropdown = () => {
	isDropdownOpen.value = !isDropdownOpen.value
}

const handleEdit = () => {
	const newName = prompt('Como que você prefere chamar essa rádio na sua lista?', props.radio.editedName || props.radio.name)
	if (newName) {
		emit('edit-name', { uuid: props.radio.stationuuid, newName })
	}
	isDropdownOpen.value = false
}

const handleRemove = () => {
	emit('remove-favorite', props.radio.stationuuid)
	isDropdownOpen.value = false
}
</script>

<template>
	<li
		class="flex justify-between items-center p-3 my-1 rounded-lg transition"
		:class="{
			'bg-gray-700': isSelected,
			'bg-gray-800': !isSelected,
			'text-[#5de3fd] font-bold': isSelected,
			'text-white': !isSelected,
			'cursor-pointer': !showOptionsIcon,
		}"
		@click="selectRadio"
	>
		<div class="flex items-center space-x-3 flex-1 min-w-0">
			<button
				v-if="showPlayIcon"
				@click.stop="togglePlay"
				class="transition-colors duration-300 shrink-0"
			>
				<PhPlay v-if="!isPlaying" :size="20" class="text-gray-400 hover:text-[#5de3fd]" />
				<PhPause v-else :size="20" class="text-[#5de3fd]" />
			</button>
			<span class="truncate min-w-0">{{ displayName }}</span>
			<span v-if="isEdited" class="text-xs bg-[#2eabc5] px-2 py-1 rounded font-bold radio-item__badge-name">
				{{ radio.name }}
			</span>
		</div>

		<div v-if="showOptionsIcon" class="relative">
			<div class="flex items-center gap-3">
				<PhHeart :size="20" weight="fill" :class="'text-red-500 cursor-default'" />
				<button @click.stop="toggleDropdown" class="p-1 hover:bg-gray-700 rounded">
					<PhDotsThreeOutlineVertical :size="20" class="text-gray-400" />
				</button>
			</div>
			<div
				v-if="isDropdownOpen"
				class="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg z-10"
			>
				<ul>
					<li class="px-4 py-2 hover:bg-gray-700 cursor-pointer" @click="handleEdit">
						Editar nome
					</li>
					<li class="px-4 py-2 hover:bg-gray-700 cursor-pointer" @click="handleRemove">
						Remover dos favoritos
					</li>
				</ul>
			</div>
		</div>

		<button
			v-if="!showOptionsIcon"
			@click.stop="toggleFavorite"
			class="transition-colors duration-300 shrink-0"
		>
			<PhHeart
				:size="20"
				:weight="isFavorite ? 'fill' : 'regular'"
				:class="isFavorite ? 'text-red-500' : 'text-gray-400 hover:text-red-500'"
			/>
		</button>
	</li>
</template>

<style scoped>
@media (max-width: 1024px) {
		.radio-item__badge-name {
				display: none;
		}
}
</style>
