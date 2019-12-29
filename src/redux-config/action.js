function saveLoginData(data){
    return dispatch => {
        dispatch({
            type:'SAVE_LOGIN_DATA',
            payload:data
        })
    }
}
const remove_user = () => {
    return {
        type: "REMOVE_USER"
    }
}

export {
    saveLoginData,
    remove_user
}