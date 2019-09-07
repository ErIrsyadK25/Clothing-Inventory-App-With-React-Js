import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { isAuthenticated } from './repository';

import Login from '../App';
import Products from './products/ProductList';
// import Cart from './products/Cart';
// import Checkout from './products/Checkout';
import AddProducts from './products/AddProducts';
import EditProducts from './products/EditProducts';
import ProductItem from './products/ProductItem';

class Main extends Component {
	state = {
		products: [],
		search: localStorage.getItem('search') || '%%'
	};

	handlerChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
		localStorage.setItem('search', this.state.search);
	};
	// console.log(e.target.value);
	// setTimeout(() => this.props.callBack(this.state), 250);
	// };

	handlerSubmit = () => {
		localStorage.setItem('search', this.state.search);
	};
	logOut() {
		localStorage.removeItem('auth');
	}

	render() {
		const auth = isAuthenticated();
		return (
			<Router>
				<form onSubmit={this.handlerSubmit}>
					<div>
						<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
							<div className="container">
								<Link className="navbar-brand" to="/">
									Inventory
								</Link>
								<button
									className="navbar-toggler"
									type="button"
									data-toggle="collapse"
									data-target="#navbarNavAltMarkup"
									aria-controls="navbarNavAltMarkup"
									aria-expanded="false"
									aria-label="Toggle navigation"
								>
									<span className="navbar-toggler-icon" />
								</button>
								<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
									<div className="navbar-nav">
										<Link className="nav-item nav-link" to="/">
											Products
										</Link>
										{/* {/* <Link className="nav-item nav-link" to="/cart">
										Cart
									</Link> */}
										{/* {auth ? (
										<Link className="nav-item nav-link" to="/checkout">
											Categories
										</Link>
									) : ( */}
										{/* '' )}{' '} */}
										{auth ? (
											<a className="nav-item nav-link" href="/" onClick={this.logOut}>
												Log out
											</a>
										) : (
											<Link className="nav-item nav-link float-right" to="/login">
												Log in
											</Link>
										)}
									</div>
									<div className="margin-right" style={{ margin: 'auto' }} />
									<button
										type="submit"
										className="btn btn-info float-right"
										style={{ margin: '5px' }}
										onSubmit={this.handlerSubmit}
									>
										Search
									</button>
									<div className="navbar">
										<input
											type="text"
											className="form-control"
											name="search"
											placeholder="Search Data..."
											style={{ marginRight: '5px' }}
											value={this.state.search}
											onChange={this.handlerChange}
										/>
									</div>
								</div>
							</div>
						</nav>
						<div className="container">
							<br />
							<Route exact path="/" component={Products} />
							{/* <Route exact path="/checkout" component={Checkout} /> */}
							<Route exact path="/addproducts" component={AddProducts} />
							<Route exact path="/deleteproducts/:id" component={ProductItem} />
							<Route exact path="/editproducts/:id" component={EditProducts} />
							{!auth ? <Route exact path="/login" component={Login} /> : ''}
						</div>
					</div>
				</form>
			</Router>
		);
	}
}

export default Main;
