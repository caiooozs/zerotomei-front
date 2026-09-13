async function carregarComponente(id, caminho) {
    try {
        const elemento = document.getElementById(id);

        const resposta = await fetch(caminho);

        if (!resposta.ok) {
            throw new Error(
                `Erro ao carregar ${caminho}: ${resposta.status}`
            );
        }

        const conteudo = await resposta.text();

        elemento.innerHTML = conteudo;

    } catch (erro) {
        console.error("Erro ao carregar componente:", erro);
    }
}


document.addEventListener("DOMContentLoaded", () => {

    // A navbar de abas é carregada por shared/components/MentoriasNavBar/script.js

    // Menu
    carregarComponente(
        "menu",
        "../../../shared/components/Menu/menu.html"
    );

    // Footer
    carregarComponente(
        "footer",
        "../../../shared/components/Footer/footer.html"
    );

});

