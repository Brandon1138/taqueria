/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				sanguine: {
					100: '#fff1f0',
					200: '#ffd6d2',
					300: '#ffb7b0',
					400: '#ff968e',
					500: '#ff6b5b', // Primary
					600: '#e84c3d',
					700: '#c13628',
					800: '#9a2316',
					900: '#7a1209',
				},
			},
		},
	},
	plugins: [],
};
