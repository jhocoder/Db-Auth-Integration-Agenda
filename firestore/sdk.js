// firestore/sdk.js
import { initializeApp } from "firebase/app";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAVtc9eEkQ7Cfi05bT7D8ATu1Seu_hrB_E",
  authDomain: "agenda4tucode.firebaseapp.com",
  projectId: "agenda4tucode",
  storageBucket: "agenda4tucode.firebasestorage.app",
  messagingSenderId: "664124141206",
  appId: "1:664124141206:web:53158a9bd4aaa87e4a1cb7"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar app para usarla en otros archivos
export { app };
