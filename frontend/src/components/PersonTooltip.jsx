function PersonTooltip({ person }) {
	return (
		<div className='flex py-2 gap-5 rounded-xl'>
			<img
				src={person.image}
				alt={person.name}
				className='w-10 md:w-12 rounded-md'
			/>
			<div className='flex flex-col text-sm sm:text-lg justify-around'>
				<h1>Name : {person.name}</h1>
				<p>Character : {person.character}</p>
			</div>
		</div>
	)
}
export default PersonTooltip
