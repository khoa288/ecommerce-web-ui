import { variables } from '../Variables'

class ProductFilter {
	constructor(pageNumber, pageSize, search, searchBy, sortBy, isSortAscending) {
		this.pageNumber = pageNumber
		this.pageSize = pageSize
		this.search = search
		this.searchBy = searchBy
		this.sortBy = sortBy
		this.isSortAscending = isSortAscending
	}
}

class ProductService {
	constructor(httpService) {
		this.httpService = httpService
	}

	async getPagedProducts(productFilter, navigate) {
		const queryString = `?pageNumber=${productFilter.pageNumber}&pageSize=${
			productFilter.pageSize
		}${productFilter.search ? `&search=${productFilter.search}` : ''}${
			productFilter.sortBy
				? `&sortBy=${productFilter.sortBy}&isSortAscending=${productFilter.isSortAscending}`
				: ''
		}`

		const getProductsEndpoint = `${variables.DASHBOARD_PAGE}${queryString}`
		await navigate(getProductsEndpoint)

		const getProductsUri = `${variables.GET_PRODUCTS}${queryString}`

		const getProductsResponse = await this.httpService.get(getProductsUri)
		return getProductsResponse.ok ? getProductsResponse.json() : null
	}

	async getProducts(productFilter) {
		const queryString = `?pageNumber=${productFilter.pageNumber}&pageSize=${
			productFilter.pageSize
		}${productFilter.search ? `&search=${productFilter.search}` : ''}${
			productFilter.searchBy ? `&searchBy=${productFilter.searchBy}` : ''
		}${
			productFilter.sortBy
				? `&sortBy=${productFilter.sortBy}&isSortAscending=${productFilter.isSortAscending}`
				: ''
		}`

		const getProductsUri = `${variables.GET_PRODUCTS}${queryString}`

		const getProductsResponse = await this.httpService.get(getProductsUri)
		return getProductsResponse.ok ? getProductsResponse.json() : null
	}

	async getProductById(id) {
		const getProductByIdResponse = await this.httpService.get(
			`${variables.GET_PRODUCT_BY_ID}/${id}`,
		)
		return getProductByIdResponse.ok ? getProductByIdResponse.json() : null
	}

	async submitOrder(order){
		
	}
}

export { ProductFilter, ProductService }
