// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import the auth service
import { getDatabase } from "firebase/database"; // Import the database service
import { getStorage } from "firebase/storage"; // Import the storage service
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD3uKHvlx5jwXe0Hqicn08nMvPCS5v2cW4",
    authDomain: "myportfolio-ef883.firebaseapp.com",
    databaseURL: "https://myportfolio-ef883-default-rtdb.firebaseio.com",
    projectId: "myportfolio-ef883",
    storageBucket: "myportfolio-ef883.appspot.com",
    messagingSenderId: "394188612629",
    appId: "1:394188612629:web:9cf132f296a5c20db91a1c",
    measurementId: "G-5KNVMKPR5E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const database = getDatabase(app);
const storage = getStorage(app); // Initialize Firebase Storage
getAnalytics(app);

// Export the services
export { auth, database, storage }; // Export storage along with auth and database
