import * as firebase from 'firebase';
//import '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAaMAO5EIaAfjLhDi-18hygkMDoAIjG3Fs",
  authDomain: "subitizing-app.firebaseapp.com",
  databaseURL: "https://subitizing-app.firebaseio.com",
  projectId: "subitizing-app",
  storageBucket: "subitizing-app.appspot.com",
  messagingSenderId: "609081304576",
  appId: "1:609081304576:web:bf2c64eebbbb994f725ae5"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };