document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Impede a página de recarregar

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log('Tentativa de login:');
    console.log('E-mail:', email);
    console.log('Senha:', password);
  });
});