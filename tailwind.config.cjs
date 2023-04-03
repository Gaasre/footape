const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	daisyui: {
		themes: ['light', 'dark', 'corporate', 'cupcake', 'halloween', 'night', 'business', 'fantasy', 'autumn', 'bumblebee', 'light',
			{
				custom: {
					"primary": "#169e6c",

					"secondary": "#d4e2df",

					"accent": "#ebcaa5",

					"neutral": "#1B1F27",

					"base-100": "#FFFFFF",
					"base-200": "#f8f8fa",
					"base-300": "#FFFFFF",

					"info": "#04A8D1",

					"success": "#10BC58",

					"warning": "#E57D06",

					"error": "#E0355D",
				}
			}],
	},
	theme: {
		extend: {
			colors: {
				'secondary-hover': '#E97777',
				'gray': '#828282',
				'dark-gray': '#747474',
				'black': '#3C3C3C',
				'blue': '#59C4FF',
				'red': '#FD8A8A',
				'green': '#88E544',
				'yellow': '#DECF4B'
			}
		}
	},
	plugins: [require("daisyui"), require('@tailwindcss/typography')],
};

module.exports = config;
