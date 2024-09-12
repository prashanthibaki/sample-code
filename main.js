updated index.html code:
<!DOCTYPE html> 
<html lang="en"> 
<head> 
    <meta charset="UTF-8"> 
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
    <title>Firebase Image Upload</title> 
    <style> 
        /* Simple styles for buttons and sections */ 
        #login-btn, #logout-btn, #upload-section { 
            margin: 20px; 
        } 
        #images-container div { 
            margin-bottom: 20px; 
            padding: 10px; 
            border: 1px solid #ddd; 
            border-radius: 5px; 
            max-width: 320px; 
        } 
        #images-container img { 
            display: block; 
            max-width: 100%; 
            margin: 10px 0; 
        } 
        .progress-bar { 
            width: 100%; 
            background-color: #ddd; 
            border-radius: 5px; 
            overflow: hidden; 
            margin-top: 10px; 
        } 
        .progress-bar div { 
            height: 10px; 
            background-color: #4caf50; 
            width: 0%; 
        } 
    </style> 
</head> 
<body> 
    <h1>Firebase Image Upload Example</h1> 
    <p id="user-name">Not logged in</p> 
     
    <!-- Login Button --> 
    <button id="login-btn" onclick="signInWithGoogle()">Login with Google</button> 
     
    <!-- Logout Button --> 
    <button id="logout-btn" style="display:none;" onclick="logoutUser()">Logout</button> 
     
    <!-- Image Upload Section --> 
    <div id="upload-section" style="display:none;"> 
        <input type="file" id="imageInput"> 
        <button onclick="uploadImage()">Upload Image</button> 
        <div class="progress-bar" id="progress-bar"><div></div></div> 
        <div id="output"></div> 
    </div> 
 
    <!-- Images Display Section --> 
    <h2>Uploaded Images</h2> 
    <div id="images-container"></div> 
 
    <script type="module"> 
        // Import Firebase functions 
        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js"; 
        import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js"; 
        import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js"; 
        import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-storage.js"; 
 
        // Firebase config 
        const firebaseConfig = { 
            apiKey: "AIzaSyBqol7KbGT5p7ppA9z1zu0d7YiIxkaEm1Q", 
            authDomain: "sample-309eb.firebaseapp.com", 
            projectId: "sample-309eb", 
            storageBucket: "sample-309eb.appspot.com", 
            messagingSenderId: "971052026993", 
            appId: "1:971052026993:web:a79d9b0f6f06b08a105fd0", 
            measurementId: "G-63M6TRFSL3" 
        }; 
 
        // Initialize Firebase 
        const app = initializeApp(firebaseConfig); 
        const auth = getAuth(app); 
        const storage = getStorage(app); 
        const db = getFirestore(app); 
 
        const loginButton = document.getElementById('login-btn'); 
        const logoutButton = document.getElementById('logout-btn'); 
        const userName = document.getElementById('user-name'); 
        const uploadSection = document.getElementById('upload-section'); 
        const imageInput = document.getElementById('imageInput'); 
        const output = document.getElementById('output'); 
        const imagesContainer = document.getElementById('images-container'); 
        const progressBar = document.getElementById('progress-bar').firstElementChild; 
 
        // Listen for auth state changes to update the UI accordingly 
        onAuthStateChanged(auth, (user) => { 
            if (user) { 
                userName.innerText = Hello, ${user.displayName}; 
                loginButton.style.display = 'none'; 
                logoutButton.style.display = 'block'; 
                uploadSection.style.display = 'block'; 
                fetchImages();  // Fetch images
