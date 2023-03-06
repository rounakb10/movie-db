import { useContext } from "react"
import appContext from "../context/appContext"
import { Toggle } from "react-hook-theme"
function Navbar() {
	const { setChoice, getNothing, getTopMovies, getTopSeries, setSearchTerm } =
		useContext(appContext)
	// eslint-disable-next-line

	return (
		<nav className='flex flex-shrink-0 basis-16 justify-between overflow-clip bg-surface md:rounded-b-lg'>
			<button
				className='default-transition px-2 text-2xl hover:bg-neutral-100 hover:dark:bg-neutral-900  sm:px-6'
				onClick={() => {
					setChoice("theaters")
					getNothing()
					setSearchTerm("")
				}}
			>
				MovieDB
			</button>
			<div className='flex items-stretch'>
				<button
					className='default-transition px-2 hover:bg-neutral-100 hover:dark:bg-neutral-900  sm:px-4'
					onClick={() => {
						setChoice("movies")
						getTopMovies()
						setSearchTerm("")
					}}
				>
					Top Movies
				</button>

				<button
					className='default-transition px-2 hover:bg-neutral-100 hover:dark:bg-neutral-900 sm:px-4'
					onClick={() => {
						setChoice("series")
						getTopSeries()
						setSearchTerm("")
					}}
				>
					Top TV
				</button>

				<div className='self-center sm:mr-5'>
					<Toggle />
				</div>
			</div>
		</nav>
	)
}
export default Navbar
