import adapter from '@sveltejs/adapter-auto'; // auto predefinito | node quello che dice nel video

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter()
	}
};

export default config;
