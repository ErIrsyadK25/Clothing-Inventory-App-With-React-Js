import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

export function getProducts() {
	// this.state = {
	// 	products: [],
	// 	query: {
	// 		sort: 'asc',
	// 		sortBy: 'product_name',
	// 		limit: 4,
	// 		page: 1
	// 	}
	// };

	// const { sort, sortBy, limit, page } = this.state.query;
	return axios.get(`${BASE_URL}/products`).then((response) => response.data.data);
}

export function addProducts(add) {
	return axios.post(`${BASE_URL}/products`, { add }).then((response) => response.data);
}

export function getCartProducts(cart) {
	return axios.post(`${BASE_URL}/products/:id/add=:number`, { cart }).then((response) => response.data);
}

export function login(data) {
	return axios
		.post(`${BASE_URL}/login`, { email: data.email, password: data.password })
		.then((response) => {
			localStorage.setItem('auth', response.data.token);
			localStorage.setItem('x-access-token-expiration', Date.now() + 2 * 60 * 60 * 1000);
			return response.data;
		})
		.catch((err) => Promise.reject('Authentication Failed!'));
}

export function isAuthenticated() {
	return localStorage.getItem('auth') && localStorage.getItem('x-access-token-expiration') > Date.now();
}
