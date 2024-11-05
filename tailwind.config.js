/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', 'class'],
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
  	extend: {
  		animation: {
  			gradient: 'gradient 8s ease infinite',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		},
  		keyframes: {
  			gradient: {
  				'0%, 100%': {
  					'background-size': '300% 300%',
  					'background-position': 'left center'
  				},
  				'50%': {
  					'background-size': '300% 300%',
  					'background-position': 'right center'
  				}
  			},
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		maxWidth: {
  			'1600': '1600px'
  		},
  		colors: {
  			'sea-green': {
  				'50': '#ffffff',
  				'100': '#deede2',
  				'200': '#bedcc7',
  				'300': '#93c2a4',
  				'400': '#65a27e',
  				'500': '#4c956c',
  				'600': '#32694b',
  				'700': '#28543e',
  				'800': '#214432',
  				'900': '#1c382b',
  				'950': '#0f1f17',
  				'1000': '#00d137'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}

