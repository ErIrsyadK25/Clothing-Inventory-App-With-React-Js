import React from 'react';
import ProductItem from './ProductItem';
import { getProducts } from '../repository';
import { Link } from 'react-router-dom';
import '../products/bootstrap.css';
import '../../styles.css';
import API from '../login/API';

export default class EditProducts extends React.Component {
	state = {
		product_name: '',
		description: '',
		image: '',
		id_category: '',
		quantity: '',
		date_added: ''
	};
	async componentDidMount() {
		const id = this.props.match.params.id;
		await API.get('/products/' + id).then((res) => {
			this.setState({
				product_name: res.data.data[0]['product_name'],
				description: res.data.data[0]['description'],
				image: res.data.data[0]['image'],
				id_category: res.data.data[0]['id_category'],
				quantity: res.data.data[0]['quantity'],
				date_added: res.data.data[0]['date_added']
			});
		});
		console.log(this.state);
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
		const id = this.props.match.params.id;
		window.event.preventDefault();
		await API.patch('/products/' + id, this.state, {
			headers: { auth: `${JWTToken}` }
		});
		console.log(this.state);
		this.props.history.push('/');
	};

	render() {
		return (
			<div className="container">
				<h2>Edit Data</h2>
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
													value={this.state.product_name}
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
													value={this.state.description}
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
													value={this.state.image}
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
													value={this.state.id_category}
													onChange={this.handlerChange}
												>
													<option value="">Enter Category</option>
													<option value="1" name="id_category">
														Clothings
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
													value={this.state.quantity}
													className="form-control"
													onChange={this.handlerChange}
												/>
											</div>
										</td>
									</tr>
									<tr>
										<td />
										<td>
											<input type="submit" value="Edit" className="btn btn-primary float-right" />
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
