import express from "express"
const router = express.Router()

import {
	getTopMovies,
	getTopSeries,
	getSearch,
	getDetails,
	getTop,
	getTrending,
} from "../controllers/moviesController.js"

router.route("/top_movies").get(getTopMovies)
router.route("/top_series").get(getTopSeries)
router.route("/top").get(getTop)
router.route("/trending").get(getTrending)
router.route("/").get(getSearch)
router.route("/details").get(getDetails)

export default router
