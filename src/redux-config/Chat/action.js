import * as firebase from "firebase/app";
import "firebase/auth";
const CONSTANT = {
    updateMessages: 'UPDATE_MESSAGE',
    
}
const getMessages = (roomId) =>{
    return dispatch =>{
        firebase.firestore().collection('chatrooms').doc(roomId).collection('messages').orderBy('createdAt')
        .onSnapshot(docs =>{
            const messages = []
            docs.forEach((doc) =>{
                const obj = {...doc,id: doc.id}
                messages.push(obj)
                console.log("chla",messages)
            })
            dispatch({
                type : CONSTANT,
                data : messages
            })
        })
    }
}
export {
    getMessages,
    CONSTANT
}