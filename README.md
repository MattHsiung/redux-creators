# Redux Creators
#### Helper library for Redux to aid in organization and simplification of reducers

**Note:** This library is slightly opinionated on how you write your reducers, which means it is much more restrictive than vanilla Redux.
Therefore you can say that this is less of a helper library so much as it is a guide of how to write reducers.

However the trade-offs here are a more consistent and streamlined way of writing and organizing your reducer code, 
promoting clear flow and making it easy to reason about for others.
 
The meat of your reducer is, and should always be how it transforms the state, everything else is a service to that.
The nice thing about this approach is that it's plug and play with any existing React/Redux app, so you can integrate slowly,
or you can opt-out at any time.

# How To
#### Counter.js (sync action):
```js
    import { actionCreator, reducerCreator } from 'redux-creators';
    
    const INC = 'INCREASE_COUNTER';
    const DEC = 'DECREASE_COUNTER';
    const SET = 'SET_COUNTER';
    
    const increase = (state) => state + 1;
    const decrease = (state) => state - 1;
    const set = (state, value) => Number(value);
    
    const map = {
        [INC]: increase,
        [DEC]: decrease,
        [SET]: set,
    };
    
    export default reducerCreator(map, 0);
    
    export const actions = actionCreator({
        increaseCount: INC,
        decreaseCount: DEC,
        setCounter: SET,
    });
```

#### 1. Define our types:
```js
    const INC = 'INCREASE_COUNTER';
    const DEC = 'DECREASE_COUNTER';
    const SET = 'SET_COUNTER';
```

#### 2. Define define out state transformations:
> (If you've used functional setState in React, you know how to write state transformations) This is where all the real logic happens!
```js
   /**
    * 
    * @param state: the current state value
    * @param payload: the value that gets passed to your dispatcher
    * @return the new state value
    */
    const increase = (state) => state + 1;
    const decrease = (state) => state - 1;
    const set = (state, value) => Number(value);
```

#### 3. Map types to transformations:
```js
   const map = {
       [INC]: increase,
       [DEC]: decrease,
       [SET]: set,
    };
```

#### 4. Export the reducer:
```js
  /**
    * 
    * @param map: <object> mapping of action types to state transformers
    * @param default state: <any> the default state for the reducer
    * @return reducer
  */
   export default reducerCreator(map, 0);
   
   // This creates a reducer just like normal which you can use in combine reducers
```

#### 5. Define action dispatchers:
```js
  /**
    * 
    * @param map: <object> mapping of dispatcher to action types
    * @return <function> which can be directly passed to mapDispatchToProps in connect
  */
   export const actions = actionCreator({
       increaseCount: INC,
       decreaseCount: DEC,
       setCounter: SET,
   });
```

#### 6. Connect to rest of app:
##### Add reducer:
```js
    import { combineReducers } from 'redux';
    import counter from './counter'
    
    const reducers = combineReducers({
        counter,
    })
```

##### Connect Dispatchers:
```js
    import React from 'react';
    import { connect } from 'react-redux';
    import { actions } from './counter';
    
    const Counter = ({ counter, increaseCount, decreaseCount, setCounter }) => {
      ...
    };
    
    const mapState = ({ counter }) => ({ counter });
    export default connect(mapState, actions)(Counter);
```

# That's it!

#### fetchRepos.js (async action):
```js
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
```

As you can see, async actions are very similar to sync actions, however the main difference being that in Redux-Creators we dispatch **multiple** actions per dispatch.

The asyncAction helper requires you to follow the signature of *pending, success, and fail*.
This api is based around promises (pending, resolve, reject), but makes it easy to follow the flow, since **state transformations are synchronous.**

#### Creating the dispatch:
> This is the only real difference, here we use the asyncAction helper to map our promise states to action types. The second argument is the function which will return the promise that is in charge of dispatching actions.

```js
    export const actions = actionCreator({
        fetchRepos: asyncAction({
            pending: PENDING,
            success: SUCCESS,
            fail: FAIL,
        }, fetchRepos),
    });
```