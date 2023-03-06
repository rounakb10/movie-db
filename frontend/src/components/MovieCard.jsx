import { Link } from "react-router-dom"
import placeholder from "../assets/placeholder.svg"
import ProgressiveImage from "react-progressive-graceful-image"

const MovieCard = ({ dataItem }) => {
	const { name, title, image, rating, id } = dataItem
	return (
		<div className='default-transition hover:shadow-white-900/100 relative flex rounded-xl shadow-md hover:scale-[1.02] hover:opacity-80 active:scale-[1.01] dark:shadow-neutral-400/10'>
			<Link
				to={`/${id}?type=${name ? "tv" : "movie"}`}
				className='link block'
			>
				<div className='flex h-full  flex-col items-center text-center'>
					{/* <img
						src={image || placeholder}
						className='rounded-xl aspect-[2/3] object-cover'
						width='100%'
						alt={title}
						loading='lazy'
					/> */}

					<ProgressiveImage
						src={image || placeholder}
						placeholder={placeholder}
					>
						{(src, loading) => (
							<img
								className={`rounded-xl image${
									loading ? " loading" : " loaded"
								}`}
								src={src}
								alt={title}
							/>
						)}
					</ProgressiveImage>

					<div className='flex flex-col items-center py-2 text-sm md:px-1 md:py-3'>
						<p>
							{title.length > 70
								? title.substring(0, 70) + "..."
								: title}
						</p>
						<p>{rating && `TMDB : ${rating} / 10`}</p>
					</div>
				</div>
				{/* <div className='absolute top-0 p-2 flex w-full text-center items-center justify-center'>
					<span className='text-black dark:text-white text-4xl opacity-0 group-hover:opacity-100 default-transition'>
						<p className='text-sm'>{overview}</p>
						
					</span>
				</div> */}
			</Link>
		</div>
	)
}

export default MovieCard
