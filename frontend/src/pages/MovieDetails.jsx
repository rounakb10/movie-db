import { useNavigate, useParams, useLocation, Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import PropagateLoader from "react-spinners/PropagateLoader"
import Cards from "../components/Cards"
import appContext from "../context/appContext"
import DetailedContent from "../components/DetailedContent"
import { Toggle } from "react-hook-theme"
import placeholder from "../assets/placeholder.svg"
import CustomContent from "../components/CustomContent"

function MovieDetails() {
	const { loading, getMovieData, movieData, clearMovieData } =
		useContext(appContext)

	const params = useParams()
	const location = useLocation()

	useEffect(() => {
		getMovieData({ id: params.id, type: location.search.split("=").at(1) })
		window.scrollTo({ top: 0, behavior: "smooth" })
	}, [location])

	let navigate = useNavigate()
	const handleClose = () => {
		navigate("/", { replace: true })
		clearMovieData()
	}

	return (
		<div className='px-2 py-8 md:py-12'>
			<button
				type='button'
				onClick={handleClose}
				className='absolute top-4 right-4'
			>
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
			<div className='absolute top-4 right-16'>
				<Toggle />
			</div>
			{loading && (
				<div className='mb-12 text-center'>
					<PropagateLoader
						loading={loading}
						size={12}
						color='var(--text)'
					/>
				</div>
			)}
			{movieData ? (
				<div className='flex flex-col gap-12'>
					<div className='flex flex-col items-center justify-around gap-6 md:flex-row-reverse	md:gap-0'>
						<div className='mt-6 max-w-xl flex-shrink-0 basis-1/3 md:self-start'>
							<img
								className='mx-auto w-[70%] rounded-xl shadow-lg md:w-3/4 lg:w-3/4'
								src={movieData.image || placeholder}
								alt={movieData.title}
							/>
						</div>

						<DetailedContent />
					</div>

					{movieData.similars && (
						<CustomContent
							h='You might also like'
							hClass='self-center'
						>
							<div className='py-2'>
								<Cards data={movieData.similars} />
							</div>
						</CustomContent>
					)}
				</div>
			) : (
				<div></div>
			)}
		</div>
	)
}
export default MovieDetails
