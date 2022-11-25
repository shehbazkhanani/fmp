// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
import {
  getAuth,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import {
  getDatabase,
  ref,
  onChildAdded,
  remove
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
const auth = getAuth();
const database = getDatabase();

window.UserCheck = function () {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      // ...
    } else {
      // User is signed out
      // ...
      window.location.replace("login.html");
    }
  });
};

UserCheck();

window.logout = function () {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      window.location.replace("login.html");
    })
    .catch((error) => {
      // An error happened.
      alert(error);
    });
};

let CommentData = [];
console.log(CommentData);

window.renderData = function (data) {
  let showData = document.getElementById("display");
  console.log(data);
  showData.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    showData.innerHTML += ` <div class="col-md-4 col-sm-6 col-12">
    <div class="card my-2" style="width: 18rem;">
        <div class="card-body">
        <p class="card-text"> First name : ${data[i].FirstName} </p>
        <p class="card-text"> Last name : ${data[i].LastName} </p>
        <p class="card-text"> Email : ${data[i].Email} </p>
        <p class="card-text"> Comment : ${data[i].Comment} </p>
          <delete class="btn btn-success" onclick="deleteEvent('${data[i].id}')"> Rmove </delete>
        </div>
      </div>
      </div>`;
  }
};

window.initial = function () {
  const reference = ref(database, "Comment");
  onChildAdded(reference, (e) => {
    const val = e.val();
    // console.log("pushed");
    CommentData.push(val);
    renderData(CommentData);
  });
};

initial();

window.deleteEvent = function (id) {
    console.log(id);
const reference = ref(database, `Product/${id}/`)
remove(reference).then((succ) => {
    console.log(succ);
}).catch((err) => {
    console.log(err);
})
}
