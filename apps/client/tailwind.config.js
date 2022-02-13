/* eslint-disable sort-keys */
const { colors } = require('./config/colors');

module.exports = {
	content: ['index.html', 'src/**/*.{js,ts,jsx,tsx}'],

	theme: {
		fontFamily: {
			sans: [
				'Inter',
				'-apple-system',
				'BlinkMacSystemFont',
				'Segoe UI',
				'Roboto',
				'Helvetica',
				'Arial',
				'sans-serif'
			],
			mono: ['Menlo', 'Monaco', 'Courier New', 'monospace']
		},
		extend: {
			transformOrigin: {
				0: '0%'
			},
			colors: {
				...colors,

				message: {
					100: '#ff2366',
					200: '#fd51d9',
					300: '#face15',
					400: '#8d4de8',
					500: '#6859ea',
					600: '#7ed321',
					700: '#56b2ba',
					800: '#0cf',
					900: '#f93040',
					1000: '#ff6'
				}
			}
		}
	},
	variants: {
		backgroundColor: ({ after }) => after(['disabled']),
		textColor: ({ after }) => after(['disabled']),
		scrollbar: ['rounded', 'dark'],
		extend: {
			borderWidth: ['last']
		}
	},
	plugins: [
		require('tailwind-scrollbar'),
		require('@tailwindcss/line-clamp'),
		require('tailwindcss-autofill'),
		require('tailwindcss-shadow-fill'),
		require('tailwindcss-text-fill')
	]
};
