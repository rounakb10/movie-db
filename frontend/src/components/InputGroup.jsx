import { useContext } from "react"
import appContext from "../context/appContext"

function InputGroup() {
	const { search, searchTerm, setSearchTerm } = useContext(appContext)

	const handleSubmit = (e) => {
		e.preventDefault()
		search()
	}

	const handleChange = (e) => setSearchTerm(e.target.value)
	return (
		<form
			onSubmit={handleSubmit}
			className='flex justify-center input-form mx-5 justify-self-center'
		>
			<input
				type='text'
				className='w-full px-4 py-3 text-lg rounded-l-xl COLORS: bg-surface text-text selection:bg-grey placeholder:text-grey outline-none'
				placeholder='Search'
				value={searchTerm}
				onChange={handleChange}
			/>
			<button
				className='px-2 rounded-r-xl bg-surface w-10 hover:bg-lightgrey active:bg-grey'
				type='submit'
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					strokeWidth='1.5'
					className='stroke-text w-6'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
					/>
				</svg>
			</button>
		</form>
	)
}
export default InputGroup
