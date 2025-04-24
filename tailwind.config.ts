import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				sanguine: {
					500: '#DC2626', // A rich sanguine red
					600: '#B91C1C', // A deeper shade for hover states
				},
			},
		},
	},
	plugins: [],
};

export default config;
