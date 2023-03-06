import { useContext, useEffect } from "react"
import appContext from "../context/appContext"
import { DebounceInput } from "react-debounce-input"
function InputGroup() {
	const { search, searchTerm, setSearchTerm, type, setType } =
		useContext(appContext)
	const handleChange = (e) => {
		setSearchTerm(e.target.value)
	}
	const handleDropdownChange = (e) => {
		setType(e.target.value)
	}
	useEffect(() => {
		search()
	}, [searchTerm, type])
	return (
		<div className='mx-2 flex justify-center text-lg sm:mx-5'>
			<DebounceInput
				type='search'
				minLength={2}
				debounceTimeout={300}
				className='w-full rounded-l-xl px-4 py-3 outline-none dark:bg-neutral-200 dark:text-neutral-900'
				placeholder='Search'
				value={searchTerm}
				onChange={handleChange}
			/>
			<label htmlFor='type' className='hidden'>
				Search type
			</label>
			<select
				name='type'
				id='type'
				className='rounded-r-xl bg-white px-1 py-3 outline-none dark:bg-neutral-200 dark:text-black'
				value={type}
				onChange={handleDropdownChange}
			>
				<option value='all'>All</option>
				<option value='movie'>Movies</option>
				<option value='tv'>Series</option>
			</select>
		</div>
	)
}
export default InputGroup
