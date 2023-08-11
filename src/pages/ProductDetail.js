import { useContext, useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import ServicesContext from '../services/ServicesContext'
import ProductCard from '../components/ProductCard'
import { ProductFilter } from '../services/ProductService'
import { variables } from '../Variables'

const ProductDetail = () => {
	const { productService } = useContext(ServicesContext)
	const { id } = useParams(0)
	const [product, setProduct] = useState()
	const [category, setCategory] = useState('')
	const [relatedProduct, setRelatedProduct] = useState([])
	const navigate = useNavigate()

	useEffect(() => {
		async function getproduct(id) {
			const product = await productService.getProductById(id)
			setProduct(product)
			setCategory(product.category)
		}
		getproduct(id)
	}, [productService, id])

	useEffect(() => {
		async function getRelatedProduct(productFilter) {
			const relatedProduct = await productService.getProducts(productFilter)
			setRelatedProduct(relatedProduct.data)
		}

		const productFilter = new ProductFilter(5, category, 'category', null, null)
		getRelatedProduct(productFilter)
	}, [productService, category])

	const handleCardClick = (productId) => {
		navigate(`/product/${productId}`)
	}

	return (
		<>
			<div className="container">
				<div class="row" style={{ paddingTop: '0.2%' }}>
					<div class="col-auto me-auto">
						<ProductCard data={product} width={'30rem'} />
					</div>
					<div class="col-auto me-auto">
						<div style={{ bottom: '0px', position: 'relative' }}>
							<Link to={variables.DASHBOARD_PAGE}>
								<button
									className="btn mb-3"
									style={{ borderColor: '#000', color: '#000' }}
								>
									Go back
								</button>
							</Link>
						</div>
					</div>
				</div>
				<div style={{ display: 'flex', flexDirection: 'row' }}>
					{relatedProduct.map((item, index) => (
						<>
							{item.id !== Number(id) ? (
								<ProductCard
									key={index}
									data={item}
									width={'30rem'}
									onClick={() => handleCardClick(item.id)}
								/>
							) : (
								<></>
							)}
						</>
					))}
				</div>
			</div>
		</>
	)
}

export default ProductDetail
