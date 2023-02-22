import { StatusCodes } from "http-status-codes"
import {
	BadRequestError,
	NotFoundError,
	UnauthenticatedError,
} from "../errors/index.js"
import axios from "axios"
import dotenv from "dotenv"
dotenv.config()
import { inTheatersData } from "../data/in_theaters.js"
import NodeCache from "node-cache"
const myCache = new NodeCache()
const ttl = 86400

const API_KEY = process.env.IMDB_API_KEY
const TMDB_API_KEY = process.env.TMDB_API_KEY

function combine({ arr, newData }) {
	arr = arr.concat(newData.results || newData.items)
	return arr
}

function getImage(posterPath) {
	return `https://image.tmdb.org/t/p/w500${posterPath}`
}

const getTopMovies = async (req, res) => {
	let cachedData = myCache.get("topMovies")
	if (cachedData) {
		console.log("Sending cached data")
		res.status(StatusCodes.OK).json(JSON.parse(cachedData))
		return
	}
	const URL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${TMDB_API_KEY}&language=en-US&region=IN&page=`
	let { data } = await axios.get(`${URL}1`)
	let arr = data.results

	for (let i = 2; i <= 15; i++) {
		let { data } = await axios.get(`${URL}${i}`)
		arr = combine({ arr, newData: data })
	}

	if (arr.length === 0) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			errorMessage: "Some error occurred",
			items: [],
		})
	}

	arr.forEach((element) => {
		element.image = getImage(element.poster_path)
		element.rating = element.vote_average
	})

	const success = myCache.set(
		"topMovies",
		JSON.stringify({ items: arr, errorMessage: "" }),
		ttl
	)
	console.log("Caching " + success)
	cachedData = myCache.get("topMovies")
	res.status(StatusCodes.OK).json(JSON.parse(cachedData))
}

const getTopSeries = async (req, res) => {
	let cachedData = myCache.get("topSeries")
	if (cachedData) {
		console.log("Sending cached data")
		res.status(StatusCodes.OK).json(JSON.parse(cachedData))
		return
	}
	const URL = `https://api.themoviedb.org/3/tv/top_rated?api_key=${TMDB_API_KEY}&language=en-US&region=IN&page=`
	let { data } = await axios.get(`${URL}1`)
	let arr = data.results

	for (let i = 2; i <= 15; i++) {
		let { data } = await axios.get(`${URL}${i}`)
		arr = combine({ arr, newData: data })
	}

	if (arr.length === 0) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			errorMessage: "Some error occurred",
			items: [],
		})
	}

	arr.forEach((element) => {
		element.title = element.name
		element.image = getImage(element.poster_path)
		element.rating = element.vote_average
	})

	const success = myCache.set(
		"topSeries",
		JSON.stringify({ items: arr, errorMessage: "" }),
		ttl
	)
	console.log("Caching " + success)
	cachedData = myCache.get("topSeries")
	res.status(StatusCodes.OK).json(JSON.parse(cachedData))
}

const getInTheaters = async (req, res) => {
	const URL = `https://imdb-api.com/en/API/InTheaters/${API_KEY}`
	const cachedData = myCache.get("inTheaters")
	if (cachedData) {
		console.log("Sending cached data")
		res.status(StatusCodes.OK).json(JSON.parse(cachedData))
		return
	}
	// const { data } = await axios.get(URL)
	// const success = myCache.set("inTheaters", JSON.stringify(data), ttl)
	// console.log("Caching " + success)
	// res.status(StatusCodes.OK).json(data)
	res.status(StatusCodes.OK).json(inTheatersData)
}

const getSearch = async (req, res) => {
	const search = req.query.search
	const type = req.query.type
	if (
		search === "" ||
		(type !== "movie" && type !== "tv" && type !== "all")
	) {
		throw new BadRequestError("Missing search params")
	}
	let data
	if (type === "movie") {
		data = await searchHelper({ search, type: "movie" })
	} else if (type === "tv") {
		data = await searchHelper({ search, type: "tv" })
	} else {
		data = await searchHelper({ search, type: "movie" })
		let tvData = await searchHelper({ search, type: "tv" })
		data.items = combine({ arr: data.items, newData: tvData })
	}
	data.search = search
	res.status(StatusCodes.OK).json(data)
}

async function searchHelper({ search, type }) {
	let URL = `https://api.themoviedb.org/3/search/${type}?api_key=${TMDB_API_KEY}&language=en-US&query=${search}&page=1&include_adult=false`
	let { data } = await axios.get(URL)
	let arr = data.results
	let pages = data.total_pages
	if (pages > 1) {
		for (let i = 2; i <= 2; i++) {
			URL = `https://api.themoviedb.org/3/search/${type}?api_key=${TMDB_API_KEY}&language=en-US&query=${search}&page=${i}&include_adult=false`
			let { data: newData } = await axios.get(URL)
			arr = combine({ arr, newData })
		}
	}

	arr.map((item) => {
		item.title = item.name || item.title
		if (item.poster_path) item.image = getImage(item.poster_path)
		if (item.vote_average) {
			item.rating = parseFloat(item.vote_average).toPrecision(2)
		}
		item.type = type
	})
	return { items: arr }
}

const getDetails = async (req, res) => {
	if (
		req.query.movieId === "" ||
		(req.query.type !== "movie" && req.query.type !== "tv")
	) {
		throw new BadRequestError("Missing params")
	}
	const id = req.query.movieId
	const type = req.query.type

	const URL = `https://api.themoviedb.org/3/${type}/${id}?api_key=${TMDB_API_KEY}&language=en-US&append_to_response=videos`
	let { data: fullData } = await axios.get(URL)
	let data = {}
	data.title = fullData.name || fullData.title
	data.image = getImage(fullData.poster_path)
	if (fullData.vote_average) {
		data.rating = parseFloat(fullData.vote_average).toPrecision(2)
	}
	data.releaseDate = fullData.first_air_date || fullData.release_date
	data.lastAirDate = fullData.last_air_date
	data.status = fullData.status
	data.overview = fullData.overview
	data.tagline = fullData.tagline
	data.originalTitle = fullData.original_title || fullData.original_name
	if (data.originalTitle === data.title) {
		data.originalTitle = null
	}
	data.website = fullData.homepage
	data.type = type
	data.trailers = []
	fullData.videos.results.map((video, index) => {
		if (video.type === "Trailer") {
			video.link = `https://youtube.com/watch?v=${video.key}`
			data.trailers.push(video)
		}
	})
	if (data.trailers.length === 0) {
		data.trailers = null
	}
	fullData.genres.map((genre, index) => {
		if (index === 0) {
			data.genres = genre.name
		} else data.genres += ", " + genre.name
	})
	// data.language = fullData.spoken_languages.at(0).english_name
	fullData.spoken_languages.map((language, index) => {
		if (index === 0) {
			data.languages = language.english_name
		} else data.languages += ", " + language.english_name
	})

	let RECOMMENDED_URL = `https://api.themoviedb.org/3/${type}/${id}/recommendations?api_key=${TMDB_API_KEY}&language=en-US`
	let { data: similars } = await axios.get(RECOMMENDED_URL)
	if (similars.results.length === 0) {
		RECOMMENDED_URL = `https://api.themoviedb.org/3/${type}/${id}/similar?api_key=${TMDB_API_KEY}&language=en-US`
		let { data } = await axios.get(RECOMMENDED_URL)
		similars = data
	}

	similars.results = similars.results.slice(0, 12)
	similars.results.forEach((element) => {
		element.title = element.name || element.title
		element.image = getImage(element.poster_path)
		element.rating = parseFloat(element.vote_average).toPrecision(2)
	})

	data.similars = similars.results

	const CAST_URL = `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${TMDB_API_KEY}&language=en-US`
	let { data: cast } = await axios.get(CAST_URL)
	cast = cast.cast //data returns cast and crew

	cast.map((person) => {
		if (person.profile_path) {
			person.image = getImage(person.profile_path)
		}
	})

	data.cast = cast

	res.status(StatusCodes.OK).json(data)
}

export { getTopMovies, getTopSeries, getSearch, getDetails, getInTheaters }
