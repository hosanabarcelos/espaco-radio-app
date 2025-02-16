<script setup>
import { PhPlay, PhPause } from '@phosphor-icons/vue'
import { useAudioStore } from '@/stores/audioStore'

const audioStore = useAudioStore()
</script>

<template>
	<div
		class="fixed bottom-0 left-0 right-0 bg-[#010409] text-white p-4 flex items-center justify-center shadow-lg h-20 border-t border-gray-600 z-10"
	>
		<button
			@click="audioStore.togglePlay"
			:disabled="!audioStore.selectedRadio"
			class="p-3 bg-[#2EABC5] rounded-full hover:bg-[#1E7A8C] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
		>
			<PhPlay v-if="!audioStore.isPlaying" class="w-6 h-6" />
			<PhPause v-else class="w-6 h-6" />
		</button>

		<div v-if="audioStore.selectedRadio" class="flex items-center space-x-4 absolute left-4">
			<img
				:src="audioStore.selectedRadio.favicon"
				alt="Favicon da Rádio"
				class="w-12 h-12 rounded-lg object-cover"
			/>
			<div>
				<h2 class="text-lg font-bold">{{ audioStore.selectedRadio.name }}</h2>
			</div>
		</div>
		<div v-else class="flex items-center space-x-4 absolute left-4">
			<div>
				<h2 class="text-xl font-bold font-trench ml-2">Comece a ouvir agora!</h2>
			</div>
		</div>
		<div class="flex items-center space-x-2 absolute right-8">
			<div
				v-for="i in 10"
				:key="i"
				class="wave-bar"
				:class="{ 'wave-bar-static': !audioStore.isPlaying }"
			></div>
		</div>
	</div>
</template>

<style scoped>
.wave-bar {
	width: 4px;
	height: 20px;
	background-color: #2eabc5;
	animation: wave 1.2s infinite ease-in-out;
	border-radius: 2px;
}

.wave-bar-static {
	animation: none;
	height: 4px;
	margin-top: 8px;
}

.wave-bar:nth-child(1) {
	animation-delay: 0s;
}
.wave-bar:nth-child(2) {
	animation-delay: 0.2s;
}
.wave-bar:nth-child(3) {
	animation-delay: 0.4s;
}
.wave-bar:nth-child(4) {
	animation-delay: 0.6s;
}
.wave-bar:nth-child(5) {
	animation-delay: 0.8s;
}
.wave-bar:nth-child(6) {
	animation-delay: 0.8s;
}
.wave-bar:nth-child(7) {
	animation-delay: 0.6s;
}
.wave-bar:nth-child(8) {
	animation-delay: 0.4s;
}
.wave-bar:nth-child(9) {
	animation-delay: 0.2s;
}
.wave-bar:nth-child(10) {
	animation-delay: 0s;
}

@keyframes wave {
	0%,
	100% {
		transform: scaleY(1);
	}
	50% {
		transform: scaleY(0.3);
	}
}
</style>