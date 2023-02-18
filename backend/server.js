import express from "express"
const app = express()

import dotenv from "dotenv"
dotenv.config()

import "express-async-errors"
import morgan from "morgan"

// import imdb from "imdb-api"

//routers
// import authRouter from "./routes/authRouter.js"
import moviesRouter from "./routes/moviesRouter.js"

//middleware
import errorHandlerMiddleware from "./middleware/error-handler.js"
import notFoundMiddleware from "./middleware/not-found.js"
// import authenticateUser from "./middleware/auth.js"

if (process.env.NODE_ENV !== "production") {
	app.use(morgan("dev"))
}

app.use(express.json())

// const cli = new imdb.Client({ apiKey: process.env.OMDB_API_KEY })
// cli.get({ id: "tt3896198" }).then(console.log)

app.use("/api/imdb", moviesRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000
app.listen(port, () => {
	console.log(`Server running on PORT ${port}`)
})
