import React from 'react';
import './Appa.css';
import Nav from './Nav';
import Products from './components/products/Products';
import Categories from './Categories';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function Main() {
	return (
		<Router>
			<div className="App">
				<Nav />
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/products" component={Products} />
					<Route path="/categories" component={Categories} />
				</Switch>
			</div>
		</Router>
	);
}
const Home = () => (
	<div>
		<h1>Home Page</h1>
	</div>
);
export default Main;
