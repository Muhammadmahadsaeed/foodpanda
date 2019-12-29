import { combineReducers } from 'redux';
import reducer from '../reducer';
import chatReducer from '../Chat/reducer'

const rootReducer = combineReducers({
    mainReducer:reducer,
    chatReducer:chatReducer
    
})

export default rootReducer;