<script setup>
import { ref, onMounted } from "vue";
import { getRadios } from "@/services/radio-service";
import Sidebar from "@/components/Sidebar.vue";

const radios = ref([]);

const fetchRadios = async () => {
	radios.value = await getRadios();
};

onMounted(fetchRadios);
</script>

<template>
	<div>
		<Sidebar :radios="radios" />
		<main>
			<h1>conteúdo</h1>
		</main>
	</div>
</template>

