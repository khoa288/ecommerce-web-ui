import { useNavigate } from 'react-router-dom'

const Table = ({ data, columns, isClickable = true }) => {
	const navigate = useNavigate()

	const handleRowClick = (id) => {
		navigate(`/product/${id}`)
	}

	return (
		<div className="table-responsive" style={{ paddingTop: '0.2%' }}>
			<table className="table table-striped table-bordered" style={{ borderColor: '#000' }}>
				<thead className="thead-light">
					<tr>
						{columns.map((column, index) => (
							<th key={index} scope="col">
								{column.label}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{data.map((item, index) => (
						<tr
							key={index}
							onClick={() => (isClickable ? handleRowClick(item.id) : null)}
						>
							{columns.map((column, colIndex) => (
								<td key={colIndex}>
									{column.format
										? column.format(item[column.field])
										: item[column.field]}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default Table
