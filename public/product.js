// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
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
const database = getDatabase();


let ProductData = [];

window.renderData = function (data) {
  let showData = document.getElementById("display");
  console.log(data.length);
  showData.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    showData.innerHTML += ` <div class="col-md-4 col-sm-6 col-12">
    <div class="card mb-3" style="max-width: 640px;">
                    <div class="row g-0">
                      <div class="col-md-4">
                        <img src="${data[i].image}" class="img-fluid rounded-start" alt="...">
                      </div>
                      <div class="col-md-8">
                        <div class="card-body">
                          <h5 class="card-title">${data[i].title}</h5>
                          <p class="card-text">${data[i].discription}</p>
                        </div>
      </div>`;
  }
};

window.initial = function () {
  const reference = ref(database, "Product");
  onChildAdded(reference, (e) => {
    const val = e.val();
    console.log("pushed");
    ProductData.push(val);
    renderData(ProductData);
  });
};

initial();
