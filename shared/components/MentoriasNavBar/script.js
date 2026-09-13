// Carrega a navbar de abas das Mentorias e marca a aba da página atual.
// Basta a página ter <div id="navbar"></div> e importar este arquivo.

// Guarda o endereço desta pasta para o fetch funcionar de qualquer página.
const pastaMentoriasNavBar = new URL(".", document.currentScript.src);


function pastaDaUrlMentorias(endereco) {
    // Devolve o nome da pasta da página, ex: ".../pages/Mentorias/Cursos/index.html" -> "cursos"
    const partes = new URL(endereco, location.href).pathname.split("/");

    partes.pop(); // tira o arquivo (index.html)

    return decodeURIComponent(partes.pop() || "").toLowerCase();
}


function marcarAbaAtivaMentorias(elemento) {
    const pastaAtual = pastaDaUrlMentorias(location.href);

    elemento.querySelectorAll(".abas-mentorias__item").forEach((link) => {

        if (pastaDaUrlMentorias(link.getAttribute("href")) === pastaAtual) {
            link.classList.add("abas-mentorias__item--ativo");
        }

    });
}


async function carregarMentoriasNavBar(id) {
    try {
        const elemento = document.getElementById(id);

        if (!elemento) {
            throw new Error(`Não existe um elemento com id "${id}" nesta página`);
        }

        const caminho = new URL("navbar.html", pastaMentoriasNavBar);

        const resposta = await fetch(caminho);

        if (!resposta.ok) {
            throw new Error(
                `Erro ao carregar ${caminho}: ${resposta.status}`
            );
        }

        elemento.innerHTML = await resposta.text();

        marcarAbaAtivaMentorias(elemento);

    } catch (erro) {
        console.error("Erro ao carregar a MentoriasNavBar:", erro);
    }
}


document.addEventListener("DOMContentLoaded", () => {

    carregarMentoriasNavBar("navbar");

});
