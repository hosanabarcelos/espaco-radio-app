<script setup>
import { ref, watch } from 'vue'
import { PhCaretDown } from '@phosphor-icons/vue'

const props = defineProps({
	items: Array,
	placeholder: String,
	truncateType: {
		type: String,
		default: 'words',
	},
	truncateLimit: {
		type: Number,
		default: 5,
	},
	modelValue: String,
})

const emit = defineEmits(['update:modelValue'])

const selectedValue = ref(props.modelValue)

const truncateText = (text, type = 'words', limit = 5) => {
	if (type === 'words') {
		const words = text.split(' ')
		if (words.length > limit) {
			return words.slice(0, limit).join(' ') + '...'
		}
		return text
	} else if (type === 'chars') {
		if (text.length > limit) {
			return text.slice(0, limit) + '...'
		}
		return text
	}
	return text
}

watch(selectedValue, (newValue) => {
	emit('update:modelValue', newValue)
})

watch(
	() => props.modelValue,
	(newValue) => {
		selectedValue.value = newValue
	}
)
</script>

<template>
	<div class="relative mx-2">
		<select
			v-model="selectedValue"
			class="w-full p-2 pl-4 pr-10 mb-1 rounded-lg bg-gray-800 text-white focus:outline-none appearance-none"
		>
			<option value="">
				{{
					selectedValue
						? truncateText(`Remover filtro ❌`, truncateType, truncateLimit)
						: truncateText(placeholder, truncateType, truncateLimit)
				}}
			</option>

			<option v-for="item in items" :key="item" :value="item">
				{{ truncateText(item, truncateType, truncateLimit) }}
			</option>
		</select>

		<div class="absolute inset-y-0 right-0 mr-3 flex items-center px-2 pointer-events-none">
			<PhCaretDown :size="18" class="text-[#2EABC5]" />
		</div>
	</div>
</template>