import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

const initialState = {
  user: "codythepugtest"
}


const userReducer = {state = initialState, action} => {
  return state
}

const store = createStore(userReducer, applyMiddleware(thunkMiddleware))

export { store };
