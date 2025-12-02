// Inicializa Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDGgk0mDtYN4V7lsGqni3buCJ2cN03jccU",
  authDomain: "vistoria-18512.firebaseapp.com",
  projectId: "vistoria-18512",
  storageBucket: "vistoria-18512.firebasestorage.app",
  messagingSenderId: "686144622304",
  appId: "1:686144622304:web:cfa35ba985568d44d10a85",
  measurementId: "G-M5DYEBN29V"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

// Elementos
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");

// Login
loginBtn.addEventListener("click", async () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    const uid = userCredential.user.uid;

    // Pega dados do Firestore
    const docRef = db.collection("consultores").doc(uid);
    const docSnap = await docRef.get();

    if (docSnap.exists) {
      console.log("Dados do usuário:", docSnap.data());
    } else {
      console.log("Usuário logado, mas sem dados no Firestore!");
    }
  } catch (error) {
    console.error("Erro no login:", error.message);
  }
});

