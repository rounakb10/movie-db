import { createContext, useState } from "react"
import axios from "axios"
const appContext = createContext()

export const DataProvider = ({ children }) => {
	const [data, setData] = useState(null)
	const [loading, setLoading] = useState(null)
	const [errorMessage, setErrorMessage] = useState("")
	const [searchTerm, setSearchTerm] = useState("")

	const getTopMovies = async () => {
		setLoading(true)
		const { data } = await axios("/api/imdb/top_movies")
		setErrorMessage(data.errorMessage)
		setData(data.items)
		setLoading(false)
	}

	const getTopSeries = async () => {
		setLoading(true)
		const { data } = await axios("/api/imdb/top_series")
		setErrorMessage(data.errorMessage)
		setData(data.items)
		setLoading(false)
	}

	const getNothing = async () => {
		setLoading(null)
		setData(null)
		setErrorMessage("")
	}

	const search = async () => {
		setLoading(true)
		if (searchTerm !== "") {
			var searchText = searchTerm.trim().toLocaleLowerCase()
			const { data } = await axios.get(`/api/imdb?search=${searchText}`)
			if (data.results) setData(data.results)
			setErrorMessage(data.errorMessage)
		}
		setLoading(false)
	}

	const switchTheme = () => {}

	return (
		<appContext.Provider
			value={{
				data,
				loading,
				errorMessage,
				searchTerm,
				getTopMovies,
				getTopSeries,
				getNothing,
				search,
				switchTheme,
				setSearchTerm,
			}}
		>
			{children}
		</appContext.Provider>
	)
}

export default appContext
