import {
	useNavigate,
	useParams,
	useLocation,
	useSearchParams,
	Link,
} from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import PropagateLoader from "react-spinners/PropagateLoader"
import Cards from "../components/Cards"
import appContext from "../context/appContext"
import { BiLinkExternal } from "react-icons/bi"
function MovieDetails() {
	const { loading, getMovieData, movieData, clearMovieData } =
		useContext(appContext)

	const params = useParams()
	const location = useLocation()

	const [readMore, setReadMore] = useState(false)

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

	useEffect(() => {
		getMovieData({ id: params.id, type: location.search.split("=").at(1) })
		// window.scrollTo({ top: 0, behavior: "smooth" })
		// eslint-disable-next-line
	}, [location])

	let navigate = useNavigate()
	const handleClose = () => {
		navigate("/", { replace: true })
		clearMovieData()
	}

	const handleClick = () => {
		let url = movieData.trailer.link
		window.open(url)
	}

	return (
		<div className='p-2 overflow-hidden'>
			<button type='button' onClick={handleClose} className='mt-2 ml-2'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					strokeWidth='1.5'
					stroke='currentColor'
					className='w-8 stroke-text hover:stroke-grey'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M6 18L18 6M6 6l12 12'
					/>
				</svg>
			</button>

			{loading && (
				<div className='text-center mb-12'>
					<PropagateLoader
						loading={loading}
						size={12}
						color='var(--text)'
					/>
				</div>
			)}
			{movieData ? (
				<div className='mb-8'>
					<div className='grid mt-4 mb-32 md:mx-6 mx-4 md:grid-cols-[40%_60%] grid-cols-1 md:gap-0 gap-6 justify-items-center content-center'>
						<div className='mb-2'>
							<img
								className='rounded-xl md:w-3/4 w-[90%] mx-auto shadow-lg'
								src={movieData.image}
								alt={movieData.title}
							/>
						</div>
						<div className='flex flex-col gap-10'>
							<div className='flex flex-col gap-6 items-center md:items-start '>
								<div className='text-center md:text-start flex flex-col gap-3'>
									<div className='flex items-center gap-2'>
										<h1 className='md:text-4xl text-3xl text-white tracking-wide '>
											{movieData.title}
											<span className='inline-block ml-1'>
												{movieData.originalTitle &&
													`(${movieData.originalTitle})`}
											</span>
										</h1>
										<Link
											to={movieData.website}
											target='_blank'
										>
											<BiLinkExternal size={26} />
										</Link>
									</div>
									<h2 className='md:text-xl text-lg'>
										{movieData.tagline}
									</h2>
								</div>
								<div className='grid grid-cols-[auto,auto] gap-y-1 gap-x-3 text-lg md:text-xl '>
									<span className='text-slate-300'>
										TMDB Rating
									</span>
									<span>
										{movieData.rating}
										/10
									</span>
									<span className='text-slate-300'>
										{!movieData.lastAirDate
											? "Release Date"
											: "Airing Date"}
									</span>
									<span>
										{getDate(movieData.releaseDate)}
										{movieData.status !== "Ended"
											? " - Present"
											: movieData.lastAirDate &&
											  ` - ${getDate(
													movieData.lastAirDate
											  )}`}
									</span>
									<span className='text-slate-300'>
										Languages
									</span>
									<span>{movieData.languages}</span>
									<span className='text-slate-300'>
										Genres
									</span>
									<span>{movieData.genres}</span>
								</div>
								{/* <div className='flex flex-row mb-6 md:gap-2'>
									
									<div className='md:text-xl text-lg flex flex-col gap-3 text-slate-300'>
											
										<span>TMDB Rating: </span>
										<span>Release Date:</span>
										<span>Languages: </span>
										<span>Genres: </span>
									</div>
									<div className='md:text-xl text-lg flex flex-col gap-3 items-end md:items-start'>
										<span>
											{movieData.rating}
											/10
										</span>
										<span>
											{getDate(movieData.releaseDate)}
										</span>
										<span>{movieData.languages}</span>
										<span>{movieData.genres}</span>
									</div>
								</div> */}
							</div>

							{movieData.overview && (
								<div>
									<h1 className='md:text-3xl text-2xl mb-3 text-slate-200'>
										Overview
									</h1>
									<p className='sm:text-lg'>
										{readMore
											? movieData.overview
											: movieData.overview.substring(
													0,
													500
											  )}
										{movieData.overview.length > 500 &&
											(!readMore ? ".." : " ")}
										<a
											className={`cursor-pointer text-blue-300 ${
												movieData.overview.length <= 500
													? "hidden"
													: "inline-block"
											}`}
											onClick={() => {
												setReadMore(!readMore)
											}}
										>
											{readMore
												? "read less"
												: "read more"}
										</a>
									</p>
								</div>
							)}
							{movieData.awards && (
								<div>
									<h1 className='md:text-2xl text-xl mb-3'>
										Awards
									</h1>
									<p className='md:text-lg text-md mb-8'>
										{movieData.awards}
									</p>
								</div>
							)}
							{movieData.stars && (
								<div>
									<h1 className='md:text-2xl text-xl mb-3'>
										Top Cast
									</h1>
									<p className='md:text-lg text-md mb-6'>
										{movieData.stars}
									</p>
								</div>
							)}
							<div>
								<h1 className='md:text-3xl text-2xl mb-3 text-slate-200'>
									Trailers
								</h1>
								<div className='flex gap-5 flex-wrap'>
									{movieData.trailers.map((trailer) => (
										<Link
											key={trailer.id}
											to={trailer.link}
											target='_blank'
											className='text-lg border-surface border-2 px-4 py-2 rounded-xl hover:bg-surface default-transition'
										>
											{trailer.name}
										</Link>
									))}
								</div>
							</div>
						</div>
					</div>
					<div className='text-center'>
						<h3 className='md:text-3xl text-2xl mb-10 md:mt-2 mt-14'>
							You might also like
						</h3>
					</div>
					<Cards data={movieData.similars} />
				</div>
			) : (
				<div></div>
			)}
		</div>
	)
}
export default MovieDetails
