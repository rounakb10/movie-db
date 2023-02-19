import { useContext, useEffect, useState } from "react"
import appContext from "../context/appContext"
import MovieCard from "./MovieCard"
function Cards({ data }) {
	const [currPage, setCurrPage] = useState(1)
	const { choice } = useContext(appContext)
	useEffect(() => {
		setCurrPage(1)
	}, [choice])
	return (
		<>
			<div className='grid lg:grid-cols-6 md:grid-cols-5 sm:grid-cols-3 grid-cols-2 lg:gap-8 gap-6 my-4 mx-3'>
				{data &&
					data.map(
						(item, index) =>
							index < 30 * currPage &&
							30 * (currPage - 1) <= index && (
								<MovieCard dataItem={item} key={item.id} />
							)
					)}
			</div>
			{data.length > 30 && (
				<div className='flex justify-center gap-2'>
					<button
						onClick={() => {
							setCurrPage(currPage - 1)
							window.scrollTo({ top: 0, behavior: "smooth" })
						}}
						disabled={currPage === 1}
						className='hidden sm:block'
					>
						Prev
					</button>
					{[...Array(parseInt(Math.ceil(data.length / 30)))].map(
						(x, i) => {
							return (
								<button
									className={`p-2 rounded-lg border-[1px] border-slate-400 hover:opacity-60 ${
										currPage === i + 1 &&
										"bg-card hover:opacity-100"
									}`}
									key={i + 1}
									onClick={() => {
										setCurrPage(i + 1)
										window.scrollTo({
											top: 0,
											behavior: "smooth",
										})
									}}
								>
									{i + 1}
								</button>
							)
						}
					)}
					<button
						onClick={() => {
							setCurrPage(currPage + 1)
							window.scrollTo({ top: 0, behavior: "smooth" })
						}}
						disabled={
							currPage === parseInt(Math.ceil(data.length / 30))
						}
						className='hidden sm:block'
					>
						Next
					</button>
				</div>
			)}
		</>
	)
}
export default Cards
