/* eslint-disable sort-keys */

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
		fontSize: {
			'tiny': '0.625rem',
			'xs': '.75rem',
			'sm': '.875rem',
			'base': '1rem',
			'lg': '1.125rem',
			'xl': '1.25rem',
			'2xl': '1.5rem',
			'3xl': '1.875rem',
			'4xl': '2.25rem',
			'5xl': '3rem',
			'6xl': '4rem',
			'7xl': '5rem'
		},

		spacing: {
			'0': '0px',
			'1': '5px',
			'1.5': '6px',
			'2': '10px',
			'3': '15px',
			'4': '20px',
			'4.5': '25px',
			'5': '30px',
			'5.5': '35px',
			'6': '40px',
			'6.5': '50px',
			'7': '60px',
			'7.5': '65px',
			'8': '75px',
			'9': '80px',
			'10': '90px',
			'11': '100px',
			'15': '150px',
			'5l': '10rem',
			'n1/2': '-50%',
			'24': '24rem',
			'400': '400px'
		},

		boxShadow: {
			outlineLg: '0 0 0 4pt #171926',
			outlineMd: '0 0 0 2pt #171926',
			outlineSm: '0 0 0 1pt #171926'
		},
		borderWidth: {
			DEFAULT: '1px',
			0: '0px',
			4: '4px',
			2: '2px'
		},
		extend: {
			borderRadius: {
				5: '5px',
				8: '8px',
				20: '20px',
				40: '40px'
			},
			borderColor: {
				'color-800': '#171926'
			},
			colors: {
				button: ' #fff',
				outline: {
					DEFAULT: '#34384e',
					light: '#44475a'
				},
				transparent: {
					DEFAULT: 'transparent',
					alt: '#34384e80'
				},
				primary: {
					100: '#dee3ea',
					200: '#b2bdcd',
					300: '#5d7290',
					600: '#031229',
					700: '#1e2130',
					800: '#171926',
					900: '#11121d'
				},

				secondary: {
					'DEFAULT': '#55a5a1',
					'washed-out': '#879eed'
				},
				tertiary: {
					DEFAULT: '#2fd6b5'
				},
				accent: {
					DEFAULT: '#e53265',
					hover: '#fd6868',
					disabled: '#f5bfbf'
				},
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
				},
				black: '#000'
			},
			fontFamily: {
				sans: 'Inter, system-ui',
				serif: 'Inter, system-ui',
				mono: 'Inter, system-ui',
				display: 'Inter, system-ui',
				body: 'Inter, system-ui'
			},
			outline: {
				'no-chrome': 'none'
			},
			transitionTimingFunction: {
				'in-out-hard': 'cubic-bezier(.77, 0, .175, 1)'
			},
			transitionDuration: {
				400: '400ms'
			},
			keyframes: {
				breathe: {
					'0%, 100%': {
						boxShadow: '0 0 20px 2px rgba(222, 227, 234, 0.15)',
						borderColor: '#5d7290'
					},
					'50%': {
						boxShadow: '0 0 20px 2px transparent',
						borderColor: '#1e2130'
					}
				}
			},
			animation: {
				'breathe-slow': 'breathe 5s infinite ease-in-out'
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
	plugins: [require('tailwind-scrollbar'), require('@tailwindcss/line-clamp')]
};
