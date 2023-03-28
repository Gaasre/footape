const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	daisyui: {
		themes: ['light', 'dark', 'corporate', 'cupcake', 'halloween', 'night', 'business', 'fantasy', 'autumn', 'bumblebee', 'light'],
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
	plugins: [require("daisyui")],
};

module.exports = config;
