import { useContext } from "react"
import appContext from "../context/appContext"
import { Toggle } from "react-hook-theme"
function Navbar() {
	const { setChoice, getNothing } = useContext(appContext)
	// eslint-disable-next-line

	return (
		<nav className='flex basis-16 self-stretch gap-6 justify-between items-center mb-4 px-6 bg-surface md:rounded-b-lg'>
			<button
				className='nav-item text-2xl py-4 default-transition hover:text-grey'
				onClick={() => {
					setChoice("theaters")
					getNothing()
				}}
			>
				MovieDB
			</button>
			<div className='flex md:gap-6 gap-3'>
				<button
					className='default-transition hover:text-grey'
					onClick={() => {
						setChoice("movies")
					}}
				>
					Top Movies
				</button>

				<button
					className='default-transition hover:text-grey'
					onClick={() => {
						setChoice("series")
					}}
				>
					Top TV
				</button>
				<Toggle />
			</div>
		</nav>
	)
}
export default Navbar
