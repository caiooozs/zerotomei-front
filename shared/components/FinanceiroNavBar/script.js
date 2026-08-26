// Carrega a navbar de abas do Financeiro e marca a aba da página atual.
// Basta a página ter <div id="navbar"></div> e importar este arquivo.

// Guarda o endereço desta pasta para o fetch funcionar de qualquer página.
const pastaFinanceiroNavBar = new URL(".", document.currentScript.src);


function pastaDaUrlFinanceiro(endereco) {
    // Devolve o nome da pasta da página, ex: ".../pages/Financeiro/Receitas/index.html" -> "receitas"
    const partes = new URL(endereco, location.href).pathname.split("/");

    partes.pop(); // tira o arquivo (index.html)

    return decodeURIComponent(partes.pop() || "").toLowerCase();
}


function marcarAbaAtivaFinanceiro(elemento) {
    const pastaAtual = pastaDaUrlFinanceiro(location.href);

    elemento.querySelectorAll(".abas-financeiro__item").forEach((link) => {

        if (pastaDaUrlFinanceiro(link.getAttribute("href")) === pastaAtual) {
            link.classList.add("abas-financeiro__item--ativo");
        }

    });
}


async function carregarFinanceiroNavBar(id) {
    try {
        const elemento = document.getElementById(id);

        if (!elemento) {
            throw new Error(`Não existe um elemento com id "${id}" nesta página`);
        }

        const caminho = new URL("navbar.html", pastaFinanceiroNavBar);

        const resposta = await fetch(caminho);

        if (!resposta.ok) {
            throw new Error(
                `Erro ao carregar ${caminho}: ${resposta.status}`
            );
        }

        elemento.innerHTML = await resposta.text();

        marcarAbaAtivaFinanceiro(elemento);

    } catch (erro) {
        console.error("Erro ao carregar a FinanceiroNavBar:", erro);
    }
}


document.addEventListener("DOMContentLoaded", () => {

    carregarFinanceiroNavBar("navbar");

});
