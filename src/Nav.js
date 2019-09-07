import React from 'react';
import './Appa.css';
import { Link } from 'react-router-dom';

function Nav() {
	const navStyle = {
		color: 'white'
	};
	return (
		<nav>
			<h3>Logo</h3>
			<ul className="nav-links">
				<Link style={navStyle} to="/products">
					<li>Products</li>
				</Link>
				<Link style={navStyle} to="/categories">
					<li>Categories</li>
				</Link>
			</ul>
		</nav>
	);
}

export default Nav;
