<script setup>
import { ref } from 'vue'

const isOpen = ref(false)

const toggleDropdown = () => {
	isOpen.value = !isOpen.value
}

const emit = defineEmits(['edit', 'remove'])

const handleEdit = () => {
	emit('edit')
	isOpen.value = false
}

const handleRemove = () => {
	emit('remove')
	isOpen.value = false
}
</script>

<template>
	<div class="relative">
		<button @click.stop="toggleDropdown" class="p-1 hover:bg-gray-700 rounded">
			<span class="text-gray-400">...</span>
		</button>

		<div v-if="isOpen" class="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg z-10">
			<ul>
				<li class="px-4 py-2 hover:bg-gray-700 cursor-pointer" @click="handleEdit">Editar nome</li>
				<li class="px-4 py-2 hover:bg-gray-700 cursor-pointer" @click="handleRemove">
					Remover dos favoritos
				</li>
			</ul>
		</div>
	</div>
</template>

<style scoped>
</style>
