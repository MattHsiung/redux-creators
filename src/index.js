const reducerCreator = (map, defaultValue) =>
	(state = defaultValue, { type, payload }) =>
		map[type] ? map[type](state, payload) : state;

const actionCreatorCreator = dispatch =>
	type =>
		payload =>
			dispatch({
				type,
				payload,
			});

const asyncActionCreatorCreator = dispatch =>
	({ pending, success, fail }, promise) =>
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

module.exports = {
	reducerCreator,
	actionCreatorCreator,
	asyncActionCreatorCreator,
	asyncCompose,
};
