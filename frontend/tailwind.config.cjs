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
			screens: {
				"3xl": "2160px",
				"4xl": "3200px",
			},
		},
	},
	darkMode: ["class", '[data-theme="dark"]'],
	plugins: [require("prettier-plugin-tailwindcss")],
	tailwindConfig: "./styles/tailwind.config.js",
}
