// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCQFLPUtsYF5_iJRZHEmrIg4OoBW5UM12g",
    authDomain: "amolite-pk.firebaseapp.com",
    projectId: "amolite-pk",
    storageBucket: "amolite-pk.appspot.com",
    messagingSenderId: "398873836204",
    appId: "1:398873836204:web:7c1a91c85c261210863d09",
    measurementId: "G-X3CZVL215T"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const database = getDatabase();

let FirstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let email = document.getElementById("email");
let password = document.getElementById("password");

// console.log(FirstName, 'FirstName');

window.signup = function (e) {
  e.preventDefault();
  let model = {
    firstName: FirstName.value,
    lastName: lastName.value,
    email: email.value,
    password: password.value,
  };
  // console.log(model);
  createUserWithEmailAndPassword(auth, model.email, model.password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      delete model.password
      model.id = user.uid
      //   console.log(user, 'ussseeerrr');
      const reference = ref(database, `users/${user.uid}/`);
      set(reference, model);
      setTimeout((user) => {
        window.location.replace("login.html");
      }, 1000);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      // ..
    });
};
