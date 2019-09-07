import React from 'react';
import { Link } from 'react-router-dom';

// import { async } from 'q';
// import API from '../login/API';

export default class ProductItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			products: [],
			quantity: 1
		};
	}

	handleInputChange = (event) => this.setState({ [event.target.name]: event.target.value });

	addToCart = () => {
		let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {};
		let id = this.props.product.id.toString();
		cart[id] = cart[id] ? cart[id] : 0;
		let qty = cart[id] + parseInt(this.state.quantity);
		if (this.props.product.quantity) {
			cart[id] = this.props.product.quantity;
		} else {
			cart[id] = qty;
		}
		localStorage.setItem('cart', JSON.stringify(cart));
	};

	deleteProducts = async () => {
		// var JWTToken = localStorage.getItem('auth');
		// const id = this.props.product.id;
		// window.event.preventDefault();
		// await API.delete('/products/' + id, this.state.products, {
		// 	headers: { auth: `${JWTToken}` }
		// });
		// console.log(this.state);
		// this.props.history.push('/');
	};

	// addQty = async () => {
	// 	const id = this.props.match.params.id;
	// 	await API.patch(`/products/${id}/add=1`).then((res) => {
	// 		this.setState({
	// 			quantity: res.data.data[0]['quantity']
	// 		});
	// 	});
	// 	return refresh();
	// };

	reduceQty = () => {};

	render() {
		const { product } = this.props;
		return (
			<div className="col-md-12">
				<div className="card" style={{ marginBottom: '10px' }}>
					<div className="card-body">
						<h4 className="card-text">{product.product_name}</h4>
						<h5 className="card-text" />
						<img src={product.image} />
						<hr />
						<span className="card-text">
							<h6 className="card-text">{product.description}</h6>
							<small>Available Quantity: </small>
							{product.quantity}
						</span>
						<hr />
						{product.quantity > 0 ? (
							<div>
								<button className="btn btn-sm btn-success float-right" onClick={this.addQty}>
									Add
								</button>
								<input
									type="number"
									value={this.state.quantity}
									name="quantity"
									onChange={this.handleInputChange}
									className="float-right"
									style={{
										width: '40px',
										marginRight: '5px',
										borderRadius: '3px',
										marginLeft: '5px'
									}}
								/>
								<div />
								<button className="btn btn-sm btn-warning float-right" onClick={this.reduceQty}>
									Min
								</button>
							</div>
						) : (
							<p className="text-danger"> product is out of stock </p>
						)}
						<Link to={'/editproducts/' + product.id}>
							<button className="btn btn-sm btn-primary float-left" style={{ marginRight: '5px' }}>
								Edit
							</button>
						</Link>
						<Link to={'/' + product.id}>
							<button className="btn btn-sm btn-danger float-left" onClick={this.deleteProducts}>
								Delete
							</button>
						</Link>
					</div>
				</div>
			</div>
		);
	}
}
