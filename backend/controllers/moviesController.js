import { StatusCodes } from "http-status-codes"
import {
	BadRequestError,
	NotFoundError,
	UnauthenticatedError,
} from "../errors/index.js"
import axios from "axios"
import dotenv from "dotenv"
dotenv.config()
import { movieData } from "../data/top_movies.js"
import { seriesData } from "../data/top_series.js"
import NodeCache from "node-cache"
const myCache = new NodeCache()
const ttl = 86400

const API_KEY = process.env.IMDB_API_KEY

const getTopMovies = async (req, res) => {
	const URL = `https://imdb-api.com/en/API/Top250Movies/${API_KEY}`
	const cachedData = myCache.get("topMovies")
	if (cachedData) {
		console.log("Sending cached data")
		res.status(StatusCodes.OK).json(JSON.parse(cachedData))
		return
	}
	// const { data } = await axios.get(URL)
	// const success = myCache.set("topMovies", JSON.stringify(data), ttl)
	// console.log("Caching "+success)
	// res.status(StatusCodes.OK).json(data)

	res.status(StatusCodes.OK).json(movieData)
}

const getTopSeries = async (req, res) => {
	const URL = `https://imdb-api.com/en/API/Top250TVs/${API_KEY}`
	const cachedData = myCache.get("topSeries")
	if (cachedData) {
		console.log("Sending cached data")
		res.status(StatusCodes.OK).json(JSON.parse(cachedData))
		return
	}
	// const { data } = await axios.get(URL)
	// const success = myCache.set("topSeries", JSON.stringify(data), ttl)
	// console.log("Caching " + success)
	// res.status(StatusCodes.OK).json(data)
	res.status(StatusCodes.OK).json(seriesData)
}

const getSearch = async (req, res) => {
	if (req.query.search === "") {
		throw BadRequestError("Missing search params")
	}
	const search = req.query.search
	const URL = `https://imdb-api.com/en/API/Search/${API_KEY}/${search}`
	const cachedData = myCache.get(`search_${search}`)
	if (cachedData) {
		console.log("Sending cached data")
		res.status(StatusCodes.OK).json(JSON.parse(cachedData))
		return
	}
	const { data } = await axios.get(URL)
	const success = myCache.set(`search_${search}`, JSON.stringify(data), ttl)
	console.log("Caching : " + success)
	res.status(StatusCodes.OK).json(data)
}

const getDetails = async (req, res) => {
	if (req.query.movieId === "") {
		throw BadRequestError("Missing search params")
	}
	const id = req.query.movieId
	const URL = `https://imdb-api.com/en/API/Title/${API_KEY}/${id}/Trailer,Ratings,`
	const cachedData = myCache.get(`id_${id}`)
	if (cachedData) {
		console.log("Sending cached data")
		res.status(StatusCodes.OK).json(JSON.parse(cachedData))
		return
	}
	const { data } = await axios.get(URL)
	const success = myCache.set(`id_${id}`, JSON.stringify(data), ttl)
	console.log("Caching : " + success)
	res.status(StatusCodes.OK).json(data)
}

export { getTopMovies, getTopSeries, getSearch, getDetails }
