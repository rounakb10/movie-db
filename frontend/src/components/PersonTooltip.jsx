import placeholder from "../assets/placeholder-person.jpg"
function PersonTooltip({ person }) {
	return (
		<div className='flex gap-5 rounded-xl py-2'>
			<img
				src={person.image || placeholder}
				alt={person.name}
				className='w-10 rounded-md md:w-12'
			/>
			<div className='flex flex-col justify-around text-sm sm:text-lg'>
				<h1>Name : {person.name}</h1>
				<p>Character : {person.character}</p>
			</div>
		</div>
	)
}
export default PersonTooltip
