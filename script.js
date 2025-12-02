// Import Firebase
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDGgk0mDtYN4V7lsGqni3buCJ2cN03jccU",
  authDomain: "vistoria-18512.firebaseapp.com",
  projectId: "vistoria-18512",
  storageBucket: "vistoria-18512.firebasestorage.app",
  messagingSenderId: "686144622304",
  appId: "1:686144622304:web:cfa35ba985568d44d10a85",
  measurementId: "G-M5DYEBN29V"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Elementos
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const msg = document.getElementById("msg");

// Função para cadastrar usuário
signupBtn.addEventListener("click", async () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    // Cria documento do usuário no Firestore
    await setDoc(doc(db, "usuarios", uid), { email });

    msg.style.color = "green";
    msg.textContent = "Usuário cadastrado com sucesso!";
  } catch (error) {
    msg.style.color = "red";
    msg.textContent = error.message;
  }
});

// Função para login
loginBtn.addEventListener("click", async () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    // Puxa dados do Firestore
    const docRef = doc(db, "usuarios", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      msg.style.color = "green";
      msg.textContent = `Login realizado! Bem-vindo(a), ${docSnap.data().email}`;
    } else {
      msg.style.color = "red";
      msg.textContent = "Usuário não encontrado no Firestore!";
    }
  } catch (error) {
    msg.style.color = "red";
    msg.textContent = error.message;
  }
});
