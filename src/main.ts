import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PhosphorIcons from "@phosphor-icons/vue"

import App from './App.vue'
import router from './router'

import "tailwindcss/tailwind.css";
import './assets/fonts.css';

const app = createApp(App)

app.use(PhosphorIcons)
app.use(createPinia())
app.use(router)

app.mount('#app')
