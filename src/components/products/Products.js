import React, { Component } from 'react';
// import axios from "axios";
import CardProduct from '../products/CardProducts';
import API from '../login/API';

export class Products extends Component {
	state = {
		product: []
	};

	componentDidMount = async () => {
		await API.get('/products').then((response) =>
			this.setState({
				product: response.data.data
			})
		);
		console.log(this.state);
	};

	render() {
		const renderData = this.state.product.map((product) => {
			return <CardProduct product={product} key={product.id} refresh={this.componentDidMount} />;
		});

		return (
			<div className="container">
				<h1>Products Page</h1>
				<div className="row">{renderData}</div>
			</div>
		);
	}
}

export default Products;
