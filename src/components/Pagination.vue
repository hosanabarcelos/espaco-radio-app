<script setup>
import { defineProps, defineEmits, computed } from 'vue'
import { PhCaretLeft, PhCaretRight } from '@phosphor-icons/vue'

const props = defineProps({
	currentPage: Number,
	totalPages: Number,
})

const emit = defineEmits(['prevPage', 'nextPage'])

const isPrevDisabled = computed(() => props.currentPage <= 1)
const isNextDisabled = computed(() => props.currentPage >= props.totalPages)
</script>

<template>
	<div v-if="totalPages > 1" class="flex justify-between items-center p-3 rounded-lg">
		<button
			@click="emit('prevPage')"
			:disabled="isPrevDisabled"
			class="p-2 bg-gray-700 rounded-md hover:bg-gray-600 disabled:opacity-50"
		>
			<PhCaretLeft :size="22" />
		</button>

		<span class="text-white text-sm"> Página {{ currentPage }} de {{ totalPages }} </span>

		<button
			@click="emit('nextPage')"
			:disabled="isNextDisabled"
			class="p-2 bg-gray-700 rounded-md hover:bg-gray-600 disabled:opacity-50"
		>
			<PhCaretRight :size="22" />
		</button>
	</div>
</template>
