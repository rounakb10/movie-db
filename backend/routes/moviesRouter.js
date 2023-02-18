import express from "express"
const router = express.Router()

import {
	getTopMovies,
	getTopSeries,
	getSearch,
	getDetails,
} from "../controllers/moviesController.js"

router.route("/top_movies").get(getTopMovies)
router.route("/top_series").get(getTopSeries)
router.route("/").get(getSearch)
router.route("/details").get(getDetails)

export default router
