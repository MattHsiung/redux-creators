import { createStore, combineReducers } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import counter from './counter'

const reducers = combineReducers({
	counter,
})

const initialState = {};

export default createStore(reducers, initialState, devToolsEnhancer());