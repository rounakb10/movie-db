/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				surface: "var(--surface)",
				card: "var(--card)",
				bg: "var(--bg)",
				text: "var(--text)",
				grey: "var(--grey)",
				lightgrey: "var(--lightgrey)",
			},
		},
	},
	plugins: [],
}
