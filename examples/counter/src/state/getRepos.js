import { actionCreator, asyncAction, reducerCreator } from 'redux-creators';
import { fetchRepos } from './api';

const defaultState = {
	repos: [],
	loading: false,
	err: null,
}

const PENDING = 'FETCHING_REPOS';
const SUCCESS = 'FETCH_SUCCESS_REPOS';
const FAIL = 'FETCH_FAIL_REPOS';

const pending = (state) => ({
	...state,
	loading: true,
	err: null,
});
const success = (state, repos) => ({
	repos: repos.slice(0, 5),
	loading: false,
	err: null,
});
const fail = (state, err) => ({
	...state,
	loading: false,
	err,
});

const map = {
	[PENDING]: pending,
	[SUCCESS]: success,
	[FAIL]: fail,
};

export default reducerCreator(map, defaultState);

export const actions = actionCreator({
	fetchRepos: asyncAction({
		pending: PENDING,
		success: SUCCESS,
		fail: FAIL,
	}, fetchRepos),
});
