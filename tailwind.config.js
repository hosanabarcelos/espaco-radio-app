/** @type {import('tailwindcss').Config} */
export default {
	darkMode: "class",
	content: [
		"./index.html",
		"./src/**/*.{vue,js,ts,jsx,tsx}",
		"./src/views/**/*.{vue,js,ts,jsx,tsx}",
		"./src/components/**/*.{vue,js,ts,jsx,tsx}",
	],
	theme: {
		fontFamily: {
			trench: ['Trench Thin', 'sans-serif'],
		},
	},
	plugins: [],
};