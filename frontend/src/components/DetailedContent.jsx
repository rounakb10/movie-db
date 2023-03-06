import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import appContext from "../context/appContext"
import CustomContent from "./CustomContent"
import { Tooltip } from "react-tooltip"
import PersonTooltip from "./PersonTooltip"
import { useTheme } from "react-hook-theme"
import placeholder from "../assets/placeholder-person.jpg"
import { BiLinkExternal } from "react-icons/bi"
import Table from "./Table"

function DetailedContent() {
	const { movieData } = useContext(appContext)

	const [readMore, setReadMore] = useState(false)
	useEffect(() => {
		setReadMore(false)
	}, [movieData])
	const { theme } = useTheme()

	return (
		<div className='flex flex-col gap-12 md:ml-12 3xl:basis-1/2'>
			<div className='flex flex-col items-center gap-6 md:items-start'>
				<div className='flex flex-col gap-3 text-center md:text-left'>
					<div className='flex items-center justify-center gap-2 md:justify-start'>
						<h1 className='text-3xl font-medium tracking-tight text-slate-900 dark:text-white lg:text-4xl'>
							{movieData.title}
							<span className='ml-1 inline-block'>
								{movieData.originalTitle &&
									`(${movieData.originalTitle})`}
							</span>
						</h1>
						{movieData.website && (
							<Link to={movieData.website} target='_blank'>
								<BiLinkExternal size={24} />
							</Link>
						)}
					</div>
					<h2 className='text-lg lg:text-xl'>{movieData.tagline}</h2>
				</div>
				<Table />
			</div>

			{movieData.overview && (
				<CustomContent h='overview'>
					<p className={`sm:text-lg`}>
						{movieData.overview}
						{/* {readMore
							? movieData.overview
							: movieData.overview.substring(0, 420).trim()}
						{movieData.overview.length > 420 &&
							(!readMore ? "... " : " ")}
						<a
							className={`cursor-pointer text-blue-300 ${
								movieData.overview.length <= 420
									? "hidden"
									: "inline-block"
							}`}
							onClick={() => {
								setReadMore(!readMore)
							}}
						>
							{readMore ? "" : "read more"}
						</a> */}
					</p>
				</CustomContent>
			)}
			{movieData.cast && (
				<CustomContent h='cast' id='cast'>
					<div
						className={`my-1 flex max-h-24 flex-wrap gap-4 overflow-y-auto scroll-smooth`}
					>
						{movieData.cast.map((person) => {
							return (
								<React.Fragment key={person.id}>
									<a
										data-tooltip-id={`a${person.id}`}
										data-tooltip-variant={theme}
									>
										<img
											src={person.image || placeholder}
											className='h-10 w-10 flex-shrink-0 rounded-full object-cover'
										/>
									</a>
									<Tooltip id={`a${person.id}`}>
										<PersonTooltip person={person} />
									</Tooltip>
								</React.Fragment>
							)
						})}
					</div>
				</CustomContent>
			)}
			{movieData.trailers && (
				<CustomContent h='trailers'>
					<div className='my-1 flex flex-wrap gap-4'>
						{movieData.trailers.map((trailer) => (
							<Link
								key={trailer.id}
								to={trailer.link}
								target='_blank'
								className='default-transition rounded-xl border-2 border-surface px-4 py-2 hover:bg-text hover:text-bg'
							>
								{trailer.name}
							</Link>
						))}
					</div>
				</CustomContent>
			)}
		</div>
	)
}
export default DetailedContent
