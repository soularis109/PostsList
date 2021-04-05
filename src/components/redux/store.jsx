import {applyMiddleware, combineReducers, createStore} from "redux";
import postsReducer from "./posts-reducer";
import thunkMiddleware from 'redux-thunk'


let reducers = combineReducers({
    postsPage: postsReducer
});


let store = createStore(reducers, applyMiddleware(thunkMiddleware));
window.__store__ = store;

export default store;