// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// TODO: Replace the following with your app's Firebase project configuration
// To get these, go to Firebase Console -> Project Settings -> General -> Web Apps
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
let app, db;
try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    console.log("Firebase initialized (Pending real credentials)");
} catch (e) {
    console.error("Firebase initialization error:", e);
}

// Handle Form Submission
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('vectrospark-form');
    const msgDiv = document.getElementById('form-message');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            msgDiv.textContent = "Submitting...";
            msgDiv.className = "";

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;

            // Prevent actual submission if using placeholder credentials
            if (firebaseConfig.apiKey === "YOUR_API_KEY_HERE") {
                msgDiv.textContent = "Simulated Success! Data captured (Add real Firebase credentials in db.js to save to your cloud database).";
                msgDiv.className = "success";
                form.reset();
                return;
            }

            try {
                // Add a new document with a generated id.
                const docRef = await addDoc(collection(db, "inquiries"), {
                    name: name,
                    email: email,
                    service: service,
                    message: message,
                    timestamp: serverTimestamp()
                });
                
                msgDiv.textContent = "Thank you! Your request has been saved securely.";
                msgDiv.className = "success";
                form.reset();
            } catch (error) {
                console.error("Error adding document: ", error);
                msgDiv.textContent = "Error submitting request. Please try again later.";
                msgDiv.className = "error";
            }
        });
    }
});
