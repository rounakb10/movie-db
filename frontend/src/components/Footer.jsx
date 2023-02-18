function Footer() {
	return (
		<footer className='flex self-stretch justify-center py-1 md:mx-5 bg-surface text-text text-sm md:rounded-t-md'>
			<p>
				Data provided by{" "}
				<a
					href='https://imdb-api.com'
					className='default-transition hover:text-grey'
				>
					IMDB-API
				</a>
			</p>
		</footer>
	)
}
export default Footer
