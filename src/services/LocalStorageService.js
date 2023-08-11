class LocalStorageService {
	setUsername(username) {
		localStorage.setItem('username', username)
	}

	getUsername() {
		return localStorage.getItem('username')
	}

	removeUsername() {
		localStorage.removeItem('username')
	}

	addProduct(productId, quantity) {
		const existProduct = localStorage.getItem(`product-${productId}`)
		let currentQuantity = 0
		if (existProduct){
			currentQuantity = existProduct[1]
		}
		const product = [productId, quantity+currentQuantity]
		localStorage.setItem(`product-${productId}`, product)
	}

	setProduct(productId, quantity){
		const product = [productId, quantity]
		localStorage.setItem(`product-${productId}`, product)
	}

	getProductQuantity(productId) {
		return localStorage.getItem(`product-${productId}`)[1]
	}

	removeProduct(productId){
		return localStorage.removeItem(`product-${productId}`)
	}
}

export default LocalStorageService
