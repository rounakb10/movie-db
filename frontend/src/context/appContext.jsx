import { createContext, useState } from "react"
import axios from "axios"
const appContext = createContext()

export const DataProvider = ({ children }) => {
	const [data, setData] = useState(null)
	const [loading, setLoading] = useState(null)
	const [errorMessage, setErrorMessage] = useState("")
	const [searchTerm, setSearchTerm] = useState("")
	const [type, setType] = useState("all")
	const [movieData, setMovieData] = useState(null)
	const [choice, setChoice] = useState("theaters")
	const getTopMovies = async () => {
		setLoading(true)
		const { data } = await axios("/api/imdb/top_movies")
		if (data) {
			setErrorMessage(data.errorMessage)
			setData(data.items)
		}
		setLoading(false)
	}

	const getTopSeries = async () => {
		setLoading(true)
		const { data } = await axios("/api/imdb/top_series")

		if (data) {
			setData(data.items)
			setErrorMessage(data.errorMessage)
		}
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
		if (searchTerm.trim().length < 2) {
			return
		}
		setLoading(true)

		var searchText = searchTerm.trim().toLocaleLowerCase()
		const { data } = await axios.get(
			`/api/imdb?search=${searchText}&type=${type}`
		)
		console.log(data)
		if (data && data.search === searchText) {
			setErrorMessage(data.errorMessage)
			setData(data.items)
		}

		setLoading(false)
	}

	const getMovieData = async ({ id, type }) => {
		setLoading(true)
		const { data } = await axios(
			`/api/imdb/details?movieId=${id}&type=${type}`
		)
		if (data) {
			setMovieData(data)
			setErrorMessage(data.errorMessage)
		}
		setLoading(false)
	}

	const clearMovieData = async () => {
		setMovieData(null)
	}

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
				setSearchTerm,
				getMovieData,
				getInTheaters,
				movieData,
				choice,
				setChoice,
				clearMovieData,
				type,
				setType,
			}}
		>
			{children}
		</appContext.Provider>
	)
}

export default appContext
