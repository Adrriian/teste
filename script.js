// Substitua pela sua Publishable Client Key do Neon Auth
const PUBLISHABLE_KEY = "pck_gzfvbf2a5b5fgdevaqf9jh414jgz9p5t97n02v39fp5er";

// URLs do Neon Auth
const SIGNUP_URL = `https://api.neon-auth.com/v1/signup`;
const LOGIN_URL = `https://api.neon-auth.com/v1/signin`;

const signupBtn = document.getElementById("signup-btn");
const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");

signupBtn.addEventListener("click", async () => {
    const name = document.getElementById("signup-name").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const msg = document.getElementById("signup-msg");

    try {
        const res = await fetch(SIGNUP_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${PUBLISHABLE_KEY}`
            },
            body: JSON.stringify({ name, email, password })
        });

        const data = await res.json();

        if (res.ok) {
            msg.style.color = "green";
            msg.textContent = "Usuário cadastrado com sucesso!";
        } else {
            msg.style.color = "red";
            msg.textContent = data.error || "Erro no cadastro";
        }
    } catch (err) {
        msg.style.color = "red";
        msg.textContent = "Erro na conexão com Neon Auth";
        console.error(err);
    }
});

loginBtn.addEventListener("click", async () => {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    const msg = document.getElementById("login-msg");

    try {
        const res = await fetch(LOGIN_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${PUBLISHABLE_KEY}`
            },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (res.ok) {
            msg.style.color = "green";
            msg.textContent = "Login realizado com sucesso!";
            localStorage.setItem("token", data.token);
            localStorage.setItem("userName", data.user.name);
            showDashboard(data.user.name);
        } else {
            msg.style.color = "red";
            msg.textContent = data.error || "Erro no login";
        }
    } catch (err) {
        msg.style.color = "red";
        msg.textContent = "Erro na conexão com Neon Auth";
        console.error(err);
    }
});

logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    document.getElementById("dashboard").style.display = "none";
    document.getElementById("signup-form").style.display = "block";
    document.getElementById("login-form").style.display = "block";
});

function showDashboard(name) {
    document.getElementById("dashboard").style.display = "block";
    document.getElementById("welcome-msg").textContent = `Bem-vindo, ${name}!`;
    document.getElementById("signup-form").style.display = "none";
    document.getElementById("login-form").style.display = "none";
}

// Verifica se já está logado
window.onload = () => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("userName");
    if (token && name) {
        showDashboard(name);
    }
};

