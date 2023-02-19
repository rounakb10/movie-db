import { Link } from "react-router-dom"
import placeholder from "../assets/placeholder.svg"

const MovieCard = ({ dataItem }) => {
	const { title, image, imDbRating, id } = dataItem

	return (
		<div className='bg-card rounded-xl flex  default-transition hover:opacity-70 hover:shadow-lg hover:shadow-white-900/100 hover:scale-[1.02] active:scale-[1.01]'>
			<Link to={`/${id}`} className='link block'>
				<div className='flex h-full flex-col items-center text-center'>
					<img
						src={image || placeholder}
						className='rounded-xl aspect-[2/3] object-cover'
						width='100%'
						alt={title}
						loading='lazy'
					/>
					<div className='md:px-1 my-1 md:my-3 flex flex-col md:min-h-[15%] items-center text-sm'>
						<p>
							{title.length > 70
								? title.substring(0, 70) + "..."
								: title}
						</p>
						<p>{imDbRating && `IMDb : ${imDbRating} / 10`}</p>
					</div>
				</div>
			</Link>
		</div>
	)
}

export default MovieCard
