import { createStore, combineReducers } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import counter from './counter'
import repos from './getRepos';

const reducers = combineReducers({
	counter,
	repos,
})

const initialState = {};

export default createStore(reducers, initialState, devToolsEnhancer());