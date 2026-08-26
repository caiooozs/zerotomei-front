// Carrega a navbar de abas das Atividades e marca a aba da página atual.
// Basta a página ter <div id="navbar"></div> e importar este arquivo.

// Guarda o endereço desta pasta para o fetch funcionar de qualquer página.
const pastaAtividadesNavBar = new URL(".", document.currentScript.src);


function pastaDaUrl(endereco) {
    // Devolve o nome da pasta da página, ex: ".../pages/Atividades/VisãoGeral/index.html" -> "visãogeral"
    const partes = new URL(endereco, location.href).pathname.split("/");

    partes.pop(); // tira o arquivo (index.html)

    return decodeURIComponent(partes.pop() || "").toLowerCase();
}


function marcarAbaAtiva(elemento) {
    const pastaAtual = pastaDaUrl(location.href);

    elemento.querySelectorAll(".abas-atividades__item").forEach((link) => {

        if (pastaDaUrl(link.getAttribute("href")) === pastaAtual) {
            link.classList.add("abas-atividades__item--ativo");
        }

    });
}


async function carregarAtividadesNavBar(id) {
    try {
        const elemento = document.getElementById(id);

        if (!elemento) {
            throw new Error(`Não existe um elemento com id "${id}" nesta página`);
        }

        const caminho = new URL("navbar.html", pastaAtividadesNavBar);

        const resposta = await fetch(caminho);

        if (!resposta.ok) {
            throw new Error(
                `Erro ao carregar ${caminho}: ${resposta.status}`
            );
        }

        elemento.innerHTML = await resposta.text();

        marcarAbaAtiva(elemento);

    } catch (erro) {
        console.error("Erro ao carregar a AtividadesNavBar:", erro);
    }
}


document.addEventListener("DOMContentLoaded", () => {

    carregarAtividadesNavBar("navbar");

});
