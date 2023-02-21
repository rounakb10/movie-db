import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import appContext from "../context/appContext"
import CustomContent from "./CustomContent"
import { Tooltip } from "react-tooltip"
import PersonTooltip from "./PersonTooltip"
import { useTheme } from "react-hook-theme"
import placeholder from "../assets/placeholder-person.jpg"

function DetailedContent() {
	const { movieData, showPopup, setShowPopup, popupPerson, setPopupPerson } =
		useContext(appContext)
	const [readMore, setReadMore] = useState(false)
	const { theme } = useTheme()

	return (
		<>
			{movieData.overview && (
				<CustomContent h='overview'>
					<p className='sm:text-lg'>
						{readMore
							? movieData.overview
							: movieData.overview.substring(0, 500)}
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
							{readMore ? "read less" : "read more"}
						</a>
					</p>
				</CustomContent>
			)}
			{movieData.cast && (
				<CustomContent h='cast'>
					<div className='flex gap-4 overflow-y-auto flex-wrap basis-10'>
						{movieData.cast.map((person) => {
							return (
								<React.Fragment key={person.id}>
									<a
										data-tooltip-id={`a${person.id}`}
										data-tooltip-variant={theme}
									>
										<img
											src={person.image || placeholder}
											className='flex-shrink-0 w-10 h-10 object-cover rounded-full'
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
					<div className='flex flex-wrap gap-4'>
						{movieData.trailers.map((trailer) => (
							<Link
								key={trailer.id}
								to={trailer.link}
								target='_blank'
								className='border-surface border-2 px-4 py-2 rounded-xl hover:bg-surface default-transition'
							>
								{trailer.name}
							</Link>
						))}
					</div>
				</CustomContent>
			)}
		</>
	)
}
export default DetailedContent
