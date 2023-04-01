const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	daisyui: {
		themes: ['light', 'dark', 'corporate', 'cupcake', 'halloween', 'night', 'business', 'fantasy', 'autumn', 'bumblebee', 'light',
			{
				custom: {
					"primary": "#c3342e",
							 
					"secondary": "#49afae",
							 
					"accent": "#c1690b",
							 
					"neutral": "#1B1F27",
							 
					"base-100": "#FFFFFF",
					"base-200": "#FCE4D5",
							 
					"info": "#7CB6D5",
							 
					"success": "#188B4C",
							 
					"warning": "#F0C24C",
							 
					"error": "#FC4A7A",
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
	plugins: [require("daisyui")],
};

module.exports = config;
