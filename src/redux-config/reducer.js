const initState = {
    userLoginData: null,
    
}

export default (state=initState, action) => {
    switch(action.type) {
        case "SAVE_LOGIN_DATA":
            return {
                ...state,
                userLoginData:action.payload
            }
            case "REMOVE_USER": {
                return {...state, userLoginData: null}
            }
        default:
            return state;
    }
}