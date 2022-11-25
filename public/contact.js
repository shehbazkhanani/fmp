// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
import {
  getDatabase,
  ref,
  set,
  push
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
  measurementId: "G-X3CZVL215T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase();

window.SubmitEvent = function () {
    let firstname = document.getElementById('firstname')
    let lastname = document.getElementById('lastname')
    let email = document.getElementById('email')
    let comment = document.getElementById('comment')
    if(firstname.value == "" || email.value == "" ) {
        alert('atleast fill firstname & email')
    } else {
   
    let commentData = {
        FirstName : firstname.value,
        LastName : lastname.value,
        Email : email.value,
        Comment : comment.value
    }
    const key = ref(database, "Comment/");
    commentData.id = push(key).key;
    const reference = ref(database, `Comment/${commentData.id}`)
    set(reference, commentData).then(() => {
        alert('your request sended!')
        firstname.value = ""
        lastname.value = ""
        email.value = ""
        comment.value = ""
    }).catch((err) => {
        console.log(err);
    })

}
}