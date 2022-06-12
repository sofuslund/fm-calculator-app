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
			"key-text-dark": "var(--key-text-dark)",
			"key-bg-primary": "var(--key-bg-primary)",
			"key-bg-secondary": "var(--key-bg-secondary)",
			"key-bg-tertiary": "var(--key-bg-tertiary)",
        },
		fontFamily: {
			"serif": "League Spartan",
		},
		boxShadow: {
			primary: '0 -.25rem inset var(--key-bg-primary-dark)',
			secondary: '0 -.25rem inset var(--key-bg-secondary-dark)',
			tertiary: '0 -.25rem inset var(--key-bg-tertiary-dark)',
		},
        extend: {},
    },
    plugins: [],
};
