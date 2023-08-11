const Dropdown = ({ title, options, selectedOption, handleSelect }) => (
	<div className="dropdown-center">
		<button
			className="btn dropdown-toggle"
			type="button"
			style={{ borderColor: '#000' }}
			data-bs-toggle="dropdown"
			aria-expanded="false"
		>
			{title}
		</button>
		<ul className="dropdown-menu">
			{options.map((option) => (
				<li key={option.value}>
					<button
						className={`dropdown-item ${
							selectedOption === option.value ? 'active' : ''
						}`}
						type="button"
						onClick={() => handleSelect(option.value)}
					>
						{option.label}
					</button>
				</li>
			))}
		</ul>
	</div>
)

export default Dropdown
