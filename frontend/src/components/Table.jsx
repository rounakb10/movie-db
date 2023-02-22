import { useContext } from "react"
import appContext from "../context/appContext"

function Table() {
	const { movieData } = useContext(appContext)

	const getDate = (val) => {
		var date = new Date(val)
		var options = {
			year: "numeric",
			month: "short",
			day: "numeric",
		}
		var formattedDate = date.toLocaleDateString("en-IN", options)
		return formattedDate
	}
	return (
		<div className='grid grid-cols-[auto,auto] gap-y-1 gap-x-3 text-lg lg:text-xl '>
			<span className='text-slate-900 dark:text-slate-300'>
				TMDB Rating
			</span>
			<span>
				{movieData.rating || "-"}
				/10
			</span>
			<span className='text-slate-900 dark:text-slate-300'>
				{movieData.type === "movie" ? "Release Date" : "Airing Date"}
			</span>
			<span>
				{movieData.releaseDate ? (
					<>
						{getDate(movieData.releaseDate)}
						{movieData.type === "tv" && movieData.status !== "Ended"
							? " - Present"
							: movieData.lastAirDate &&
							  ` - ${getDate(movieData.lastAirDate)}`}
					</>
				) : (
					"-"
				)}
			</span>
			<span className='text-slate-900 dark:text-slate-300'>
				Languages
			</span>
			<span>{movieData.languages}</span>
			<span className='text-slate-900 dark:text-slate-300'>Genres</span>
			<span>{movieData.genres}</span>
		</div>
	)
}
export default Table
