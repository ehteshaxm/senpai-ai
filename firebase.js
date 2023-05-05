// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getAnalytics, isSupported } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDHoyCd2STPks3RgchZcIOYg06PpagsXu4',
  authDomain: 'senpai-e8c77.firebaseapp.com',
  projectId: 'senpai-e8c77',
  storageBucket: 'senpai-e8c77.appspot.com',
  messagingSenderId: '6141298597',
  appId: '1:6141298597:web:cde92861c713909d850a4c',
  measurementId: 'G-BGTNX8NHL6',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage();
export const analytics = isSupported().then((yes) =>
  yes ? getAnalytics(app) : null
);
