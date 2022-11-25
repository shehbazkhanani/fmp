// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
import {
  getAuth,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import {
  getStorage,
  uploadBytes,
  ref,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";
import {
  getDatabase,
  push,
  set,
  ref as dbRef,
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

const storage = getStorage();

let Image = document.getElementById("imageFile");
const name = Math.floor((Math.random() * 10000000000) / 20);
window.submiteImage = function () {
let Image = document.getElementById("imageFile").files[0];
  var reader = new FileReader();
  reader.readAsDataURL(Image);
  const storageRef = ref(storage, `Images/${name}`);
  uploadBytes(storageRef, Image)
    .then((snapshot) => {
        alert('image uploaded')
    })
    .catch((err) => {
      console.log(err);
    });
};

window.submiteEvent = function () {
  let Title = document.getElementById("title");
  let Discription = document.getElementById("discription");
  //   let Image = document.getElementById("imageFile");
  if (Title.value == "" || Discription.value == "") {
    alert("please fill all input feild");
  } else {
    // let imageURL = [];
    // console.log(imageURL, "imageURL");
    getDownloadURL(ref(storage, `Images/${name}`))
      .then((url) => {
        let productData = {
          title: Title.value,
          discription: Discription.value,
        };
        productData.image = url;
        console.log(productData);
        const key = dbRef(database, "Product/");
        productData.id = push(key).key;

        const reference = dbRef(database, `Product/${productData.id}`);
        set(reference, productData);
        alert("data succussfully submited");
        Title.value = "";
        Discription.value = "";
        Image.value = "";
      })
      .catch((error) => {
        // Handle any errors
        console.log(error);
      });
  }
};
