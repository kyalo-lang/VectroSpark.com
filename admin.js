import { auth, db, firebaseConfig } from './db.js';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { collection, query, orderBy, getDocs } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', () => {
    const loginView = document.getElementById('login-view');
    const dashboardView = document.getElementById('dashboard-view');
    const loginForm = document.getElementById('admin-login-form');
    const errorDiv = document.getElementById('login-error');
    const logoutBtn = document.getElementById('logout-btn');
    const tbody = document.getElementById('inquiries-tbody');

    // Simulate login if keys are placeholders
    const isSimulated = firebaseConfig.apiKey === "YOUR_API_KEY_HERE";

    // 1. Auth State Listener
    if (!isSimulated) {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                showDashboard();
                fetchInquiries();
            } else {
                showLogin();
            }
        });
    }

    // 2. Login Logic
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            errorDiv.style.display = 'none';
            
            const email = document.getElementById('admin-email').value;
            const password = document.getElementById('admin-password').value;

            if (isSimulated) {
                // Simulated login success
                showDashboard();
                loadSimulatedData();
                return;
            }

            try {
                await signInWithEmailAndPassword(auth, email, password);
                // Listener will auto-switch to dashboard
            } catch (error) {
                errorDiv.textContent = "Invalid email or password.";
                errorDiv.style.display = 'block';
                console.error(error);
            }
        });
    }

    // 3. Logout Logic
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            if (isSimulated) {
                showLogin();
                return;
            }
            try {
                await signOut(auth);
            } catch (error) {
                console.error("Logout error", error);
            }
        });
    }

    // View Toggles
    function showLogin() {
        loginView.style.display = 'block';
        dashboardView.style.display = 'none';
        if(loginForm) loginForm.reset();
    }

    function showDashboard() {
        loginView.style.display = 'none';
        dashboardView.style.display = 'block';
    }

    // Fetch Real Data from Firestore
    async function fetchInquiries() {
        tbody.innerHTML = "<tr><td colspan='5' style='text-align: center;'>Loading data...</td></tr>";
        try {
            const q = query(collection(db, "inquiries"), orderBy("timestamp", "desc"));
            const querySnapshot = await getDocs(q);
            
            tbody.innerHTML = "";
            if(querySnapshot.empty) {
                tbody.innerHTML = "<tr><td colspan='5' style='text-align: center;'>No inquiries found.</td></tr>";
                return;
            }

            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const date = data.timestamp ? data.timestamp.toDate().toLocaleString() : 'N/A';
                
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${date}</td>
                    <td><strong>${data.name}</strong></td>
                    <td><a href="mailto:${data.email}" style="color: var(--accent-3);">${data.email}</a></td>
                    <td><span style="background: rgba(138,43,226,0.2); padding: 5px 10px; border-radius: 20px; font-size: 0.9em;">${data.service}</span></td>
                    <td>${data.message}</td>
                `;
                tbody.appendChild(tr);
            });
        } catch (error) {
            console.error("Error fetching documents: ", error);
            tbody.innerHTML = "<tr><td colspan='5' style='text-align: center; color: #ff3366;'>Failed to load data. Make sure Firestore rules allow read access for authenticated users.</td></tr>";
        }
    }

    // Simulated Data (for demo before keys are added)
    function loadSimulatedData() {
        tbody.innerHTML = `
            <tr>
                <td>${new Date().toLocaleString()}</td>
                <td><strong>Jane Smith</strong></td>
                <td><a href="mailto:jane@example.com" style="color: var(--accent-3);">jane@example.com</a></td>
                <td><span style="background: rgba(138,43,226,0.2); padding: 5px 10px; border-radius: 20px; font-size: 0.9em;">Video Editing</span></td>
                <td>Hi, I need a YouTube vlog edited by next week. Is this possible?</td>
            </tr>
            <tr>
                <td>${new Date(Date.now() - 86400000).toLocaleString()}</td>
                <td><strong>Mark Johnson</strong></td>
                <td><a href="mailto:mark@company.com" style="color: var(--accent-3);">mark@company.com</a></td>
                <td><span style="background: rgba(138,43,226,0.2); padding: 5px 10px; border-radius: 20px; font-size: 0.9em;">Web Development</span></td>
                <td>Looking for a complete redesign of my startup's landing page.</td>
            </tr>
            <tr style="background: rgba(255, 20, 147, 0.1);">
                <td colspan='5' style='text-align: center;'><em>This is simulated data. Add your Firebase keys to see real inquiries!</em></td>
            </tr>
        `;
    }
});
