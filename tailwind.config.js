module.exports = {
    content: [
        "./index.html", 
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        colors: {
			"background-light": "var(--background-light)",
			"background": "var(--background)",
			"background-dark": "var(--background-dark)",
			"text": "var(--text)",
			"key-text-light": "var(--key-text-light)",
			"key-text": "var(--key-text)",
			"key-text-dark": "var(--key-text-dar)",
			"key-bg-primary": "var(--key-bg-primary)",
			"key-bg-primary-dark": "var(--key-bg-primary-dar)",
			"key-bg-secondary": "var(--key-bg-secondary)",
			"key-bg-secondary-dark": "var(--key-bg-secondary-dark)",
			"key-bg-tertiary": "var(--key-bg-tertiary)",
			"key-bg-tertiary-dark": "var(--key-bg-tertiary-dark)",
        },
		fontFamily: {
			"serif": "League Spartan",
		},
        extend: {},
    },
    plugins: [],
};
