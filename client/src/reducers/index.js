import {combineReducers} from 'redux';
import posts from './posts'
import auth  from './auth'
//if key===value(post) then we can only write the key
//the state is the whole obj
export default combineReducers({posts,auth})
