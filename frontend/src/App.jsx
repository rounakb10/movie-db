import { BrowserRouter, Route, Routes } from "react-router-dom"
import { DataProvider } from "./context/appContext"
import MovieDetails from "./pages/MovieDetails"
import Home from "./pages/Home"

function App() {
	return (
		<DataProvider>
			<BrowserRouter>
				<Routes>
					<Route path='/:id' element={<MovieDetails />} />
					<Route path='/' element={<Home />} />
				</Routes>
			</BrowserRouter>
		</DataProvider>
	)
}

export default App
