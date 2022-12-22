// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics} from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyCF7tXpWHOpkpeI8et2EssGvl0d_klUlWo",
	authDomain: "comments-section-97c6c.firebaseapp.com",
	projectId: "comments-section-97c6c",
	storageBucket: "comments-section-97c6c.appspot.com",
	messagingSenderId: "306129731182",
	appId: "1:306129731182:web:56dc6ec25a61aaa9fff07f",
	measurementId: "G-SXSPPF0PWJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
