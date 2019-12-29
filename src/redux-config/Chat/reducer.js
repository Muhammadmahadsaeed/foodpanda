import {CONSTANT} from './action'
// import reducer from '../reducer';
const initState = {
    messages: [],
    
}

 const chatReducer = (state = initState, action) => {
    switch(action.type) {
        case CONSTANT.updateMessages:{
            return {
                ...state,
                messages:action.data
            }
        }
            
            case CONSTANT.removeUSer: {
                return {...state, userLoginData: null}
            }
        default:
            return state;
    }
}
export default chatReducer