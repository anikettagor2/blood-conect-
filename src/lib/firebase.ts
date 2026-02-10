
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyBxzztbSC8yCqm874aW_isHM0o8Bi4MJtA",
    authDomain: "bloodline-d98af.firebaseapp.com",
    projectId: "bloodline-d98af",
    storageBucket: "bloodline-d98af.firebasestorage.app",
    messagingSenderId: "426241289878",
    appId: "1:426241289878:web:2423c41d7f0a36fd9f5cb7",
    measurementId: "G-PJCV3W6SGZ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

let analytics;
isSupported().then((supported) => {
    if (supported) {
        analytics = getAnalytics(app);
    }
});

export { app, auth, db, storage, analytics };
