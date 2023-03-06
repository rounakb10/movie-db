import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import { ThemeProvider } from "react-hook-theme"
import "react-hook-theme/dist/styles/style.css"
import "react-tooltip/dist/react-tooltip.css"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
	<React.StrictMode>
		<ThemeProvider options={{ theme: "light", save: true }}>
			<App />
		</ThemeProvider>
	</React.StrictMode>
)
