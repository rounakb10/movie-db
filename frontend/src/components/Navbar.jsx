import { useContext } from "react"
import appContext from "../context/appContext"
import { Theme } from "react-switch-theme"
function Navbar() {
	const { setChoice } = useContext(appContext)
	// eslint-disable-next-line
	const [theme, toggleTheme] = useContext(Theme)

	return (
		<nav className=' flex self-stretch gap-6 justify-between items-center mb-4 px-6 bg-surface md:rounded-b-lg'>
			<button
				className='nav-item text-2xl py-4 default-transition hover:text-grey'
				onClick={() => {
					setChoice("theaters")
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
					Top 60 Movies
				</button>

				<button
					className='default-transition hover:text-grey'
					onClick={() => {
						setChoice("series")
					}}
				>
					Top 60 TV
				</button>
				<button className='default-transition' onClick={toggleTheme}>
					{theme === "light" ? (
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth='1.5'
							className='w-6 default-transition stroke-text hover:stroke-grey'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z'
							/>
						</svg>
					) : (
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth='1.5'
							stroke='currentColor'
							className='w-6 default-transition stroke-text hover:stroke-grey'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z'
							/>
						</svg>
					)}
				</button>
			</div>
		</nav>
	)
}
export default Navbar
