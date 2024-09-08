// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import the auth service
import { getDatabase } from "firebase/database"; // Import the database service
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD3uKHvlx5jwXe0Hqicn08nMvPCS5v2cW4",
    authDomain: "myportfolio-ef883.firebaseapp.com",
    databaseURL: "https://myportfolio-ef883-default-rtdb.firebaseio.com",
    projectId: "myportfolio-ef883",
    storageBucket: "myportfolio-ef883.appspot.com",
    messagingSenderId: "394188612629",
    appId: "1:394188612629:web:ee248d85bf81e53cb91a1c",
    measurementId: "G-L1L4C5QRHJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const database = getDatabase(app);
getAnalytics(app);
// Export the services
export { auth, database };
