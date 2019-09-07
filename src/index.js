import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './styles.css';
import Main from './components/Main';
// import App from './App';
import * as serviceWorker from './serviceWorker';
// import ValidatedLoginForm from './components/login/ValidatedLoginForms.js';

ReactDOM.render(<Main />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
