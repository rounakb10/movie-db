function CustomContent({ h, children }) {
	return (
		<div className='flex flex-col gap-3 items-start'>
			<h1 className='lg:text-3xl text-2xl capitalize text-slate-800 dark:text-slate-200'>
				{h}
			</h1>
			{children}
		</div>
	)
}
export default CustomContent
