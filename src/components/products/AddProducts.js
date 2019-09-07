import React from 'react';
import ProductItem from './ProductItem';
import { getProducts } from '../repository';
import { Link } from 'react-router-dom';
import '../products/bootstrap.css';
import '../../styles.css';
import API from '../login/API';

export default class AddProducts extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			product_name: '',
			description: '',
			image: '',
			id_category: '',
			quantity: '',
			date_added: ''
		};
	}
	handlerChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	componentWillMount() {
		getProducts().then((products) => {
			this.setState({ products });
		});
	}

	handlerSubmit = async () => {
		var JWTToken = localStorage.getItem('auth');
		window.event.preventDefault();
		await API.post('/products', this.state, {
			headers: { auth: `${JWTToken}` }
		});
		console.log(this.state);
		this.props.history.push('/products');
	};

	render() {
		return (
			<div className="container">
				<h2>Add Product</h2>
				<hr />
				<form onSubmit={this.handlerSubmit}>
					<div className="col-md-12">
						<div style={{ marginBottom: '10px' }}>
							<table>
								<tbody>
									<tr>
										<td>Name</td>
										<td>
											<div className="form-group">
												<input
													type="text"
													name="product_name"
													className="form-control"
													onChange={this.handlerChange}
												/>
											</div>
										</td>
									</tr>
									<tr>
										<td>Description</td>
										<td>
											<div className="form-group">
												<input
													type="text"
													name="description"
													className="form-control"
													onChange={this.handlerChange}
												/>
											</div>
										</td>
									</tr>
									<tr>
										<td>Image</td>
										<td>
											<div className="form-group">
												<input
													type="text"
													name="image"
													className="form-control"
													onChange={this.handlerChange}
												/>
											</div>
										</td>
									</tr>
									<tr>
										<td>Category</td>
										<td>
											<div className="form-group">
												<select
													id="list"
													className="form-control"
													name="id_category"
													onChange={this.handlerChange}
												>
													<option value="">Enter Category</option>
													<option value="1" name="id_category">
														Clothing
													</option>
													<option value="2" name="id_category">
														Shoes
													</option>
													<option value="3" name="id_category">
														Watches
													</option>
												</select>
											</div>
										</td>
									</tr>
									<tr>
										<td>Quantity</td>
										<td>
											<div className="form-group">
												<input
													type="text"
													name="quantity"
													className="form-control"
													onChange={this.handlerChange}
												/>
											</div>
										</td>
									</tr>
									<tr>
										<td />
										<td>
											<input type="submit" value="Add" className="btn btn-primary float-right" />
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</form>
			</div>
		);
	}
}
