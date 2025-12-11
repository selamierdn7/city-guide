

// src/lib/firebase.ts

import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// BURAYI KENDİ KOPYALADIĞIN KODLARLA DEĞİŞTİR
const firebaseConfig = {
    apiKey: "AIzaSyA0u6BWMdIkoQCQimR_zAc8WGdGbDai_2c",
    authDomain: "city-guide-6b462.firebaseapp.com",
    projectId: "city-guide-6b462",
    storageBucket: "city-guide-6b462.firebasestorage.app",
    messagingSenderId: "1081157907562",
    appId: "1:1081157907562:web:3b8a2c5883e2523090c613",
    measurementId: "G-YPKYWRLR07"
};

// Next.js'de hot-reload yüzünden bazen tekrar tekrar başlatmaya çalışır.
// Bu kod "Eğer zaten başladıysa onu kullan, yoksa yeni başlat" der.
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };