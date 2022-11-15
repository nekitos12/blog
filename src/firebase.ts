import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAHjH4xQQ67xwFXmGFTazu7jRTAajNMTtk",
    authDomain: "blog-49d7d.firebaseapp.com",
    projectId: "blog-49d7d",
    storageBucket: "blog-49d7d.appspot.com",
    messagingSenderId: "912393862072",
    appId: "1:912393862072:web:89f240e5859afc38986d4d",
    measurementId: "G-GLL6JLF0KZ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);