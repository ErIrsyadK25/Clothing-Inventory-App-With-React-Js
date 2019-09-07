import React from 'react';
import ProductItem from './ProductItem';
import { getProducts } from '../repository';
import { Link } from 'react-router-dom';
import './bootstrap.css';
import axios from 'axios';
const BASE_URL = 'http://localhost:8080';

export default class ProductList extends React.Component {
	// constructor(props) {
	// 	super(props);
	state = {
		products: [],
		sort: localStorage.getItem('sort') || 'asc',
		sortBy: localStorage.getItem('sortBy') || 'id',
		limit: localStorage.getItem('limit') || 6,
		page: localStorage.getItem('page') || 1,
		search: localStorage.getItem('search') || '%%'
	};
	// }

	// componentDidMount() {
	// 	const { sort, sortBy, limit, page, search } = this.state;
	// 	getProducts(
	// 		`${BASE_URL}/products?sort=${sort}&sorBy=${sortBy}&limit=${limit}&page=${page}&search=%${search}%`
	// 	).then((products) => {
	// 		this.setState({ products });
	// 	});
	// 	// console.log(this.props);
	// }

	async componentDidMount() {
		const { sort, sortBy, limit, page, search } = this.state;
		await axios
			.get(`${BASE_URL}/products?sort=${sort}&sortBy=${sortBy}&limit=${limit}&page=${page}&search=%${search}%`)
			.then((res) => {
				this.setState({ products: res.data.data });
			});
		console.log(this.state);
	}

	handlerChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
		localStorage.setItem([ e.target.name ], e.target.value);
		setTimeout(() => this.componentDidMount(), 200);
	};
	// console.log(e.target.value);
	// setTimeout(() => this.props.callBack(this.state), 250);
	// };

	handlerSubmit = () => {
		localStorage.setItem('sortBy', this.state.sortBy);
		localStorage.setItem('sort', this.state.sort);
		localStorage.setItem('limit', this.state.limit);
		localStorage.setItem('page', this.state.page);
		localStorage.setItem('key', this.state.key);
	};

	render() {
		const { products } = this.state;
		return (
			<div className="container">
				<form onSubmit={this.handlerSubmit}>
					{/* <Link to="/checkout">
					<button className="btn btn-success float-right">Checkout</button>
				</Link>
				<Link to="/cart">
					<button className="btn btn-info float-right" style={{ marginRight: '10px' }}>
						View Cart
					</button>
				</Link> */}
					<Link to="/addproducts">
						<button className="btn btn-primary float-right" style={{ marginRight: '10px' }}>
							Add Data
						</button>
					</Link>
					<div className="float-left">
						<td>
							<select
								id="list"
								name="sort"
								className="form-control"
								value={this.state.sort}
								onChange={this.handlerChange}
							>
								<option value="">Sort</option>
								<option value="asc">Ascending</option>
								<option value="desc">Descending</option>
							</select>
						</td>
					</div>
					<div className="col-sm-2 float-left">
						<td>
							<select
								id="list"
								name="sortBy"
								className="form-control"
								value={this.state.sortBy}
								onChange={this.handlerChange}
							>
								<option disabled>Sort By</option>
								<option value="product_name">Name</option>
								<option value="id_category">Category</option>
								<option value="quantity">By Quantity</option>
								<option value="date_added">Date</option>
							</select>
						</td>
					</div>
					<div className="col-sm-2 float-left">
						<td>
							<select
								id="list"
								className="form-control"
								name="limit"
								value={this.state.limit}
								onChange={this.handlerChange}
							>
								<option disabled>Limit</option>
								<option value="6">6</option>
								<option value="9">9</option>
								<option value="12">12</option>
								<option value="15">15</option>
							</select>
						</td>
					</div>

					{/* <Link to="/">
					<form>
						<tr>
							<td>
								<input
									type="text"
									className="form-control float-right"
									name="search"
									placeholder="Search Data..."
									style={{ marginRight: '10px' }}
								/>
							</td>
						</tr>
					</form>
				</Link> */}

					<h3 className="card-title">List of Available Products</h3>
					<hr />
					{products.map((product, index) => <ProductItem product={product} key={index} />)}

					<br />
					<br />
					<br />
				</form>
			</div>
		);
	}
}
