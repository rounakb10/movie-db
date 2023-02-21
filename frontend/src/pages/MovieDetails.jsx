import { useNavigate, useParams, useLocation, Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import PropagateLoader from "react-spinners/PropagateLoader"
import Cards from "../components/Cards"
import appContext from "../context/appContext"
import { BiLinkExternal } from "react-icons/bi"
import DetailedContent from "../components/DetailedContent"
import { Toggle } from "react-hook-theme"
function MovieDetails() {
	const { loading, getMovieData, movieData, clearMovieData } =
		useContext(appContext)

	const params = useParams()
	const location = useLocation()

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

	return (
		<div className='p-2'>
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
			<div className='absolute top-5 right-5'>
				<Toggle />
			</div>
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
				<>
					<div className='flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap lg:gap-0 gap-6 justify-items-center content-center'>
						<div className='mb-2 basis-1/3'>
							<img
								className='rounded-xl sm:w-3/4 w-[70%] mx-auto shadow-lg'
								src={movieData.image}
								alt={movieData.title}
							/>
						</div>
						<div className='flex flex-col gap-10 basis-auto lg:basis-2/3'>
							<div className='flex flex-col gap-6 items-center sm:items-start'>
								<div className='text-center md:text-start flex flex-col gap-3'>
									<div className='flex items-center justify-center sm:justify-start gap-2'>
										<h1 className='lg:text-4xl text-3xl font-medium text-slate-900 dark:text-white tracking-tight'>
											{movieData.title}
											<span className='inline-block ml-1'>
												{movieData.originalTitle &&
													`(${movieData.originalTitle})`}
											</span>
										</h1>
										{movieData.website && (
											<Link
												to={movieData.website}
												target='_blank'
											>
												<BiLinkExternal size={24} />
											</Link>
										)}
									</div>
									<h2 className='lg:text-xl text-lg text-center sm:text-start'>
										{movieData.tagline}
									</h2>
								</div>
								<div className='grid grid-cols-[auto,auto] gap-y-1 gap-x-3 text-lg lg:text-xl '>
									<span className='text-slate-900 dark:text-slate-300'>
										TMDB Rating
									</span>
									<span>
										{movieData.rating}
										/10
									</span>
									<span className='text-slate-900 dark:text-slate-300'>
										{movieData.type === "movie"
											? "Release Date"
											: "Airing Date"}
									</span>
									<span>
										{getDate(movieData.releaseDate)}
										{movieData.type === "tv" &&
										movieData.status !== "Ended"
											? " - Present"
											: movieData.lastAirDate &&
											  ` - ${getDate(
													movieData.lastAirDate
											  )}`}
									</span>
									<span className='text-slate-900 dark:text-slate-300'>
										Languages
									</span>
									<span>{movieData.languages}</span>
									<span className='text-slate-900 dark:text-slate-300'>
										Genres
									</span>
									<span>{movieData.genres}</span>
								</div>
							</div>

							<div className='flex mx-2 sm:ml-0 sm:hidden lg:flex flex-col gap-10'>
								<DetailedContent />
							</div>
						</div>
						<div className='hidden mx-2 sm:flex lg:hidden flex-col gap-10'>
							<DetailedContent />
						</div>
					</div>
					<div className='text-center mt-16'>
						<h3 className='md:text-3xl text-2xl mb-10 md:mt-2 mt-14'>
							You might also like
						</h3>
					</div>
					<Cards data={movieData.similars} />
				</>
			) : (
				<div></div>
			)}
		</div>
	)
}
export default MovieDetails
