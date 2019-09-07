import React from 'react';
import { Link } from 'react-router-dom';
import API from '../login/API';

function CardProducts({ product, refresh }) {
	async function deleteProduct() {
		var JWTToken = localStorage.getItem('auth');
		window.event.preventDefault();
		await API.delete('/products' + product.id, {
			headers: { auth: `${JWTToken}` }
		});
		// await API.delete("/products/users/" + product.id);

		return refresh();
	}

	return (
		<div className="card" style={{ margin: 7 }}>
			<h3>{product.product_name}</h3>
			<small>Quantity: {product.quantity}</small>
			<p>Category: {product.category}</p>
			<hr />
			<Link to={'/edit/' + product.id}>
				<i className="fa fa-pencil-square-o" aria-hidden="true" />
			</Link>

			<i className="fa fa-trash" aria-hidden="true" onClick={deleteProduct} />
			<br />
		</div>
	);
}

export default CardProducts;
