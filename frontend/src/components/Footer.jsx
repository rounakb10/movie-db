function Footer() {
	return (
		<footer className='flex basis-6 justify-center self-stretch bg-surface py-1 text-sm text-text md:rounded-t-md'>
			<p>
				Data provided by{" "}
				<a
					href='https://developers.themoviedb.org'
					className='default-transition hover:opacity-50'
				>
					TheMovieDB
				</a>
			</p>
		</footer>
	)
}
export default Footer
