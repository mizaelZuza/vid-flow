const containerVideos = document.querySelector(".videos__container");

async function carregarVideos() {
    try {
        const busca = await fetch('http://localhost:3000/videos');
        const videos = await busca.json()

        videos.forEach((video) => {
            containerVideos.innerHTML += `
            <li class="videos__item">
                <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
                <div class="descricao-video">
                    <img class="img-canal" src="${video.imagem}" alt="Logo do canal">
                    <h3 class="titulo-video">${video.titulo}</h3>
                    <p class="titulo-canal">${video.descricao}</p>
                    <p class="categoria" hidden>${video.categoria}</p>
                </div>
            </li>
            `;
        })
    } catch (error) {
        containerVideos.innerHTML = `<h2 class="mensagem__titulo">Não foi possível carregar os vídeos! ${error}</h2>`
    }
}

carregarVideos();

const barraDePesquisa = document.querySelector(".pesquisar__input");
barraDePesquisa.addEventListener("input", filtrarPesquisa);

function filtrarPesquisa() {
    const videos = document.querySelectorAll(".videos__item");
    if (barraDePesquisa.value !== "") {
        videos.forEach((video) => {
            if (video.innerText.toLowerCase().includes(barraDePesquisa.value.toLowerCase())) {
                video.style.display = "block";
            } else {
                video.style.display = "none";
            }
        })
    } else {
        videos.style.display = "block";
    }
}

const botaoCategoria = document.querySelectorAll(".superior__item");
botaoCategoria.forEach((botao) => {
    let nomeCategoria = botao.getAttribute("name");
    botao.addEventListener("click", () => filtrarCategoria(nomeCategoria));
});

function filtrarCategoria(categoria) {
    const videos = document.querySelectorAll(".videos__item");
    videos.forEach((video) => {
        if (video.querySelector(".categoria").innerText.toLocaleLowerCase() === categoria.toLocaleLowerCase() || categoria.toLocaleLowerCase() === "tudo") {
            video.style.display = "block";
        } else {
            video.style.display = "none";
        }
    })
}