import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Table from './Table'
import Dropdown from './Dropdown'
import { ProductFilter } from '../services/ProductService'
import ServicesContext from '../services/ServicesContext'
import { useDebounce } from 'use-debounce'

const ProductTable = () => {
	const { productService } = useContext(ServicesContext)
	const [data, setData] = useState([])
	const [totalPages, setTotalPages] = useState(0)
	const [totalRecords, setTotalRecords] = useState(0)
	const [pageNumber, setPageNumber] = useState(1)
	const [displayedPageNumber, setDisplayedPageNumber] = useState(1)
	const [pageSize, setPageSize] = useState(10)
	const [search, setSearch] = useState('')
	const [deferredSearch] = useDebounce(search, 500)
	const [sortBy, setSortBy] = useState('')
	const [isSortAscending, setIsSortAscending] = useState(true)
	const navigate = useNavigate()

	useEffect(() => {
		async function getQueryParams() {
			const params = new URLSearchParams(window.location.search)
			setPageNumber(
				params.get('pageNumber') === null || params.get('pageNumber') < 1
					? 1
					: Number(params.get('pageNumber')),
			)
			setDisplayedPageNumber(
				params.get('pageNumber') === null ? 1 : Number(params.get('pageNumber')),
			)
			setPageSize(params.get('pageSize') === null ? 10 : Number(params.get('pageSize')))
			setSearch(params.get('search') === null ? '' : params.get('search'))
			setSortBy(params.get('sortBy') === null ? '' : params.get('sortBy'))
			setIsSortAscending(
				params.get('isSortAscending') === null
					? true
					: params.get('isSortAscending').toLowerCase() === 'true',
			)
		}
		getQueryParams()
	}, [])

	useEffect(() => {
		async function getData(productFilter) {
			const product = await productService.getPagedProducts(productFilter, navigate)
			setData(product.data)
			setTotalPages(product.totalPages)
			setTotalRecords(product.totalRecords)
		}

		const productFilter = new ProductFilter(
			pageNumber,
			pageSize,
			deferredSearch,
			null,
			sortBy,
			isSortAscending,
		)

		getData(productFilter, navigate)
	}, [
		productService,
		pageNumber,
		pageSize,
		deferredSearch,
		sortBy,
		isSortAscending,
		totalPages,
		navigate,
	])

	useEffect(() => {
		if (Number(totalPages) !== 0 && Number(totalPages) < pageNumber) {
			setPageNumber(Number(totalPages))
			setDisplayedPageNumber(Number(totalPages))
		}
	}, [totalPages, pageNumber])

	const handlePageChange = async (e) => {
		e.preventDefault()
		if (e.target.pageNumber.value > totalPages) {
			setPageNumber(Number(totalPages))
			setDisplayedPageNumber(Number(totalPages))
		} else if (e.target.pageNumber.value < 1) {
			setPageNumber(1)
			setDisplayedPageNumber(1)
		} else {
			setPageNumber(Number(e.target.pageNumber.value))
			setDisplayedPageNumber(Number(e.target.pageNumber.value))
		}
	}

	return (
		<div>
			<div className="container">
				<h3>Products table</h3>
				<div className="row">
					<div className="col-auto me-auto">
						<p>Total products: {totalRecords}</p>
					</div>
					<div className="col-auto">
						<div className="container text-center" style={{ paddingRight: 0 }}>
							<div className="row justify-content-end">
								<div className="col-auto">
									<Dropdown
										title="Sort by"
										options={[
											{ value: '', label: 'Default' },
											{ value: 'price', label: 'Price' },
											{
												value: 'rating',
												label: 'Rating',
											},
										]}
										selectedOption={sortBy}
										handleSelect={(value) => setSortBy(value)}
									/>
								</div>
								<div className="col-auto" style={{ paddingLeft: 0 }}>
									<Dropdown
										title="Order"
										options={[
											{ value: true, label: 'Ascending' },
											{
												value: false,
												label: 'Descending',
											},
										]}
										selectedOption={isSortAscending}
										handleSelect={(value) => setIsSortAscending(value)}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<input
				className="input form-control form-control-md"
				style={{ borderColor: '#000' }}
				type="text"
				placeholder="Search for products"
				value={search}
				onChange={(e) => {
					e.preventDefault()
					setSearch(e.target.value)
				}}
			/>

			<Table
				data={data}
				columns={[
					{ field: 'id', label: 'No.' },
					{ field: 'brand', label: 'Brand' },
					{ field: 'title', label: 'Title' },
					{
						field: 'price',
						label: 'Price',
						format: (value) => `$${value.toFixed(2)}`,
					},
					{
						field: 'rating',
						label: 'Rating',
						format: (value) => `${value}/5.00`,
					},
				]}
			/>

			<div className="container text-center">
				<div className="row">
					<div className="col-auto me-auto">
						<p>
							Current page: {pageNumber} out of {totalPages}
						</p>
					</div>
					<div className="col"></div>
					<div className="col-auto">
						<form className="row g-2" onSubmit={handlePageChange}>
							<div className="col-auto">
								<input
									id="pageNumber"
									name="pageNumber"
									className="input form-control"
									style={{ borderColor: '#000' }}
									type="number"
									placeholder="Page"
									value={displayedPageNumber}
									onChange={(e) => setDisplayedPageNumber(e.target.value)}
								/>
							</div>
							<div className="col-auto">
								<button
									type="submit"
									className="btn mb-3"
									style={{ borderColor: '#000' }}
								>
									Go
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProductTable
