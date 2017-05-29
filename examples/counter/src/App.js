import React from 'react';
import { Provider } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import store from './state';
import Counter from './components/Counter';

const App = () => (
	<Provider
		store={store}
	>
		<div className="App">
			<div className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<h2>Welcome to Redux-Creators</h2>
			</div>
			<main>
				<Counter />
			</main>
		</div>
	</Provider>
);

export default App;
