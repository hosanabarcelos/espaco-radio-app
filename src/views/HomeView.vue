<script setup>
import { ref, onMounted } from "vue";
import { getRadios } from "@/services/radio-service";

const radios = ref([]);
const searchQuery = ref("");
const country = ref("");
const language = ref("");
const page = ref(1);
const totalPages = ref(1);

const fetchRadios = async () => {
  const response = await getRadios(searchQuery.value, country.value, language.value, page.value);
  radios.value = response;

  totalPages.value = Math.ceil(100 / 10);
};

const changePage = (direction) => {
  if (direction === "next" && page.value < totalPages.value) {
    page.value++;
  } else if (direction === "prev" && page.value > 1) {
    page.value--;
  }
  fetchRadios();
};

onMounted(fetchRadios);
</script>

<template>
  <div>
    <h1>Rádios</h1>
    <ul>
      <li v-for="radio in radios" :key="radio.stationuuid">
        <p><strong>Nome:</strong> {{ radio.name }}</p>
        <p><strong>País:</strong> {{ radio.country }}</p>
        <p><strong>Idioma:</strong> {{ radio.language }}</p>
        <p><strong>URL:</strong> <a :href="radio.url" target="_blank">{{ radio.url }}</a></p>
      </li>
    </ul>

    <div>
      <button @click="changePage('prev')" :disabled="page === 1">Anterior</button>
      <span>Página {{ page }} de {{ totalPages }}</span>
      <button @click="changePage('next')" :disabled="page === totalPages">Próximo</button>
    </div>
  </div>
</template>
