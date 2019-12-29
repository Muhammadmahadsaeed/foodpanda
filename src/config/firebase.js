import firebase from 'firebase'
import { func } from 'prop-types';
import { resolve } from 'dns';
import { reject } from 'q';

const firebaseConfig = {
  apiKey: "AIzaSyCosVk-9R1i9duvfafFzuPLMs24LJfHEFk",
  authDomain: "foodpanda-981c6.firebaseapp.com",
  databaseURL: "https://foodpanda-981c6.firebaseio.com",
  projectId: "foodpanda-981c6",
  storageBucket: "foodpanda-981c6.appspot.com",
  messagingSenderId: "1013776716113",
  appId: "1:1013776716113:web:f767b38247637f96"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  function checkAndCreatRoom(resturantId){
    return new Promise((resolve,reject)=>{
      const currentUser = firebase.auth().currentUser.uid
      const users = {[resturantId] : true , [currentUser]:true}
      firebase.firestore().collection('chatrooms').where(`users.${resturantId}`, "==",true).where(`users.${currentUser}`, "==",true)
      .get().then((snapshot) => {
        let room = {}
  
        snapshot.forEach((doc) => {
          // console.log("rooms===========>",doc.data())
          room = doc.data()
          // console.log(doc.id)
          room.id = doc.id
        })
        if(!room.id){
          room = {users,createdAt: Date.now(),lastMessage:{}}
          firebase.firestore().collection('chatrooms').add(room)
          .then(res=>{
            room.id = res.id
            resolve(room)
          })
  
        }
        else{
          resolve(room)
        }
      })
      
      
     
    })
    
    // console.log(users)
  }

  function getRoomInfo(id){
   return new Promise((resolve,reject) => {
    firebase.firestore().collection('chatrooms').doc(id).get()
    .then(res =>{
      const obj = {id: res.id,...res.data()}
      resolve(obj)
   })
  })
  }

  function sendMessageToDb(text,roomId){
    const message = {text, createdAt: Date.now(),userId: firebase.auth().currentUser.uid}
    return firebase.firestore().collection('chatrooms').doc(roomId).collection('messages').add(message)
  }
  export  {
    firebaseConfig,
    checkAndCreatRoom,
    getRoomInfo,
    sendMessageToDb
  }
