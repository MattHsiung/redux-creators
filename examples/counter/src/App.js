import React from 'react';
import { Provider } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import store from './state';
import Counter from './components/Counter';
import Repos from './components/Repos';

const App = () => (
	<Provider
		store={store}
	>
		<div className="App">
			<div className="App-header">
				<h2>Redux-Creators</h2>
			</div>
			<main>
				<Counter />
				<Repos />
			</main>
		</div>
	</Provider>
);

export default App;
