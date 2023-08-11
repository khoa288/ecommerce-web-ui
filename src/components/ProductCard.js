const ProductCard = ({data, width, onClick}) => {
	return (
		<>
			{data && (
				<>
					<div className="card" style={{ width: width }} onClick={onClick}>
						<img
							className="card-img-top"
							variant="top"
							src={data.thumbnail}
							alt="thumbnail"
						/>
						<div className="card-body">
							<h4 className="card-title">{data.title}</h4>
							<p className="card-text">
								<strong>Brand:</strong> {data.brand}
								<br />
								<strong>Category:</strong> {data.category}
								<br />
								<strong>Price:</strong> ${data.price}
								<br />
								<strong>Rating:</strong> {data.rating}/5.00
							</p>
						</div>
					</div>
				</>
			)}
		</>
	)
}

export default ProductCard
