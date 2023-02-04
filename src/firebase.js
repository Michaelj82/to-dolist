import {initializeApp} from 'firebase/app'
import {getDatabase} from 'firebase/database'
import {getAuth} from 'firebase/auths'
const firebaseConfig = {
    apiKey: "AIzaSyBnjXW_2SGtGCpC4LzHODoTlmpFKfhKWVw",
    authDomain: "todolist-d2b06.firebaseapp.com",
    projectId: "todolist-d2b06",
    storageBucket: "todolist-d2b06.appspot.com",
    messagingSenderId: "770376056689",
    appId: "1:770376056689:web:c00ba4cb60b649496540d0",
    measurementId: "G-RK1X37PXPJ"
}

const app = initializeApp(firebaseConfig);
const database = getDatabase(app)
const auth = getAuth()

let button = null
//button will be something from HTML for signing up 
//right now empty, just brining in basic code

button.addEventListener('click', (e)=>{

    let email = document.getElementById('email').ariaValueMax;
    let password = document.getElementById('password').ariaValueMax;
    let username = document.getElementById('username').ariaValueMax;



    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        alert('user created')

    })
    .catch((error)=> {
        const errorcode = error.code;
        const errorMessage = error.message;

        alert(errorMessage)
    });
});