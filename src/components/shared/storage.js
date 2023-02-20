
  import firebase from 'firebase';

  const firebaseConfig = {
    apiKey: "AIzaSyCwz8huztm0NnRr6X1eeuC_cvab6w5KZQU",
    authDomain: "sycamore-admin-6ca26.firebaseapp.com",
    projectId: "sycamore-admin-6ca26",
    storageBucket: "sycamore-admin-6ca26.appspot.com",
    messagingSenderId: "671068887694",
    appId: "1:671068887694:web:9ec7562c3b9464dd3447df",
    measurementId: "G-G72GZS6FKL"
  };


firebase.initializeApp(firebaseConfig);
var storage = firebase.storage();

export default storage;