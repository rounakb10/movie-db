import { createContext, useState } from "react"
import axios from "axios"
const appContext = createContext()

export const DataProvider = ({ children }) => {
	const [data, setData] = useState(null)
	const [loading, setLoading] = useState(null)
	const [errorMessage, setErrorMessage] = useState("")
	const [searchTerm, setSearchTerm] = useState("")
	const [movieData, setMovieData] = useState(null)
	const [choice, setChoice] = useState("theaters")

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

	const getInTheaters = async () => {
		setLoading(true)
		const { data } = await axios("/api/imdb/in_theaters")
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

	const getMovieData = async ({ id, type }) => {
		setLoading(true)
		const { data } = await axios(
			`/api/imdb/details?movieId=${id}&type=${type}`
		)
		setMovieData(data)
		setLoading(false)
	}

	const clearMovieData = async () => {
		setMovieData(null)
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
				getMovieData,
				getInTheaters,
				movieData,
				choice,
				setChoice,
				clearMovieData,
			}}
		>
			{children}
		</appContext.Provider>
	)
}

export default appContext
