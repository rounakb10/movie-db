import InputGroup from "../components/InputGroup"
import Cards from "../components/Cards"
import PropagateLoader from "react-spinners/PropagateLoader"
import Navbar from "../components/Navbar"
import { useContext, useEffect } from "react"
import appContext from "../context/appContext"
import Footer from "../components/Footer"

function Home() {
	const { data, loading, getNothing, getTopMovies, getTopSeries, choice } =
		useContext(appContext)
	// useEffect(() => {
	// 	if (choice === "theaters") {
	// 		getNothing()
	// 	} else if (choice === "movies") {
	// 		getTopMovies()
	// 	} else if (choice === "series") {
	// 		getTopSeries()
	// 	}
	// }, [choice])

	return (
		<div className='flex h-screen select-none flex-col justify-between gap-4'>
			<Navbar />
			<InputGroup />
			<main className='flex basis-full flex-col gap-2'>
				{loading && (
					<div className='mb-4 text-center'>
						<PropagateLoader
							loading={loading}
							size={14}
							color='var(--text)'
						/>
					</div>
				)}

				{data ? (
					<div className='overflow-hidden px-2 pt-3'>
						<Cards data={data} />
					</div>
				) : (
					<></>
				)}
			</main>

			<Footer />
		</div>
	)
}

export default Home
