import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Replace with your Firebase configuration
// Get these values from: https://console.firebase.google.com/
// 1. Create a new project or select existing one
// 2. Go to Project Settings > General > Your apps
// 3. Click "Web app" to get configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQN0feaMZQ6toHPVBCGfIhnvQBJW_M79o",
  authDomain:  "e-clone-8ec5e.firebaseapp.com",
  projectId:  "e-clone-8ec5e",
  appId: "1:786179168334:web:4ce8b2963cb69d0f22cb1f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Enable GoogleAuthProvider with additional scopes if needed
googleProvider.addScope('email');
googleProvider.addScope('profile');
