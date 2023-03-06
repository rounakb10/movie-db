function CustomContent({ h, children, id, hClass }) {
	return (
		<div className='flex flex-col items-start gap-6' id={id}>
			<h1
				className={`text-2xl capitalize text-slate-800 dark:text-slate-200 lg:text-3xl ${hClass}`}
			>
				{h}
			</h1>
			{children}
		</div>
	)
}
export default CustomContent
