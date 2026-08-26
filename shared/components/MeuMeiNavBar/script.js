// Carrega a navbar superior do Meu MEI e marca a aba da página atual.
// Basta a página ter <div id="navbar"></div> e importar este arquivo.

// Guarda o endereço desta pasta para o fetch funcionar de qualquer página.
const pastaMeuMeiNavBar = new URL(".", document.currentScript.src);


function pastaDaUrl(endereco) {
    // Devolve o nome da pasta da página, ex: ".../pages/MeuMEI/Guias/index.html" -> "guias"
    const partes = new URL(endereco, location.href).pathname.split("/");

    partes.pop(); // tira o arquivo (index.html)

    return decodeURIComponent(partes.pop() || "").toLowerCase();
}


function marcarAbaAtiva(elemento) {
    const pastaAtual = pastaDaUrl(location.href);

    elemento.querySelectorAll(".abas-mei__item").forEach((link) => {

        if (pastaDaUrl(link.getAttribute("href")) === pastaAtual) {
            link.classList.add("abas-mei__item--ativo");
        }

    });
}


async function carregarMeuMeiNavBar(id) {
    try {
        const elemento = document.getElementById(id);

        if (!elemento) {
            throw new Error(`Não existe um elemento com id "${id}" nesta página`);
        }

        const caminho = new URL("navbar.html", pastaMeuMeiNavBar);

        const resposta = await fetch(caminho);

        if (!resposta.ok) {
            throw new Error(
                `Erro ao carregar ${caminho}: ${resposta.status}`
            );
        }

        elemento.innerHTML = await resposta.text();

        marcarAbaAtiva(elemento);

    } catch (erro) {
        console.error("Erro ao carregar a MeuMeiNavBar:", erro);
    }
}


document.addEventListener("DOMContentLoaded", () => {

    carregarMeuMeiNavBar("navbar");

});
