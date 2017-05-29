const reducerCreator = (map, defaultValue) =>
	(state = defaultValue, { type, payload }) =>
		map[type] ? map[type](state, payload) : state;

const actionCreatorCreator = type =>
	dispatch =>
		payload =>
			dispatch({
				type,
				payload,
			});

const asyncActionCreatorCreator = ({ pending, success, fail }, promise) =>
	dispatch =>
		payload => {
			dispatch(pending);
			return promise(payload)
				.then((res) => dispatch({
					type: success,
					payload: res,
				}))
				.catch((err) => dispatch({
					type: fail,
					payload: err,
				}));
		};

const asyncCompose = (...promises) => (payload) =>
	promises.reduce(
		(one, two) => one.then(two),
		Promise.resolve(payload)
	);

const asyncAction = (types, promise) => ({
	types,
	promise,
});

const actionCreator = (actionCreators) => (dispatch) =>
	Object.keys(actionCreators)
		.reduce((acc, key) => {
			const actionType = actionCreators[key];
			const isSync = typeof actionType === 'string';
			if (isSync) {
				acc[key] = actionCreatorCreator(actionType)(dispatch);
			} else {
				acc[key] = asyncActionCreatorCreator(actionType.types, actionType.promise)(dispatch)
			}
			return acc;
		}, {});

module.exports = {
	reducerCreator,
	actionCreator,
	actionCreatorCreator,
	asyncActionCreatorCreator,
	asyncCompose,
	asyncAction,
};
