const btn = document.querySelector('.login_button');
const msg = document.querySelector('.msg');

btn.addEventListener('click', login);

async function login() {
    const email = document.querySelector('.email').value;
    const password = document.querySelector('.password').value;

    if (!email || !password) {
        msg.style.color = "red";
        msg.textContent = "Preencha todos os campos!";
        return;
    }

    try {
        // Endpoint real da tabela users
        const response = await fetch('https://ep-wandering-leaf-aczo2o7g.apirest.sa-east-1.aws.neon.tech/neondb/rest/v1/users?select=*', {
            method: 'GET',
            headers: {
                'apikey': 'napi_h1oxultl93gyplfy9bxw6titnf8x46a3jxlk1k2idu3iw2e4m1l32k6ot3cwldz0',
                'Content-Type': 'application/json'
            }
        });

        const users = await response.json();

        // Verifica se o usuário existe
        const user = users.find(u => u.email === email && u.senha === password);

        if (user) {
            msg.style.color = "green";
            msg.textContent = `Bem-vindo, ${user.nome}!`;
            // Salvar no localStorage
            localStorage.setItem("userEmail", user.email);
            localStorage.setItem("userName", user.nome);
            // Redirecionar se quiser
            // window.location.href = "dashboard.html";
        } else {
            msg.style.color = "red";
            msg.textContent = "Email ou senha incorretos!";
        }

    } catch (error) {
        console.error(error);
        msg.style.color = "red";
        msg.textContent = "Erro ao conectar com o banco de dados!";
    }
}
