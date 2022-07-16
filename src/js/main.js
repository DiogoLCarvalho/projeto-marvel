const personagens = document.querySelectorAll('.character');
const jogador02 = document.querySelector('#feiticeira-escarlate');
var exportCharacterCont = 0;


let auxSelecterCharacter = false

// Vai percorrer todos os li de personagens
// Ao você colocar o mouse em cima ele chama a função
// Remove a classe seleted de todos os li
// E coloca no final a classe no li q você esta em cima
// Ele remove para que justamente ao vc colocar em outra li ele remova do antigo e johue para o novo
personagens.forEach((personagem) => {

    personagem.addEventListener('mouseenter', () => {

        // Hover personagem selecionado
        if (!auxSelecterCharacter) {

            personagens.forEach((player02) => {
                if (!(player02.getAttribute('class') === 'character second-player_seleted')) {
                    jogador02.classList.add('second-player_seleted');
                }
            })

            // remove a classe 
            const personagemSelecionado = document.querySelector('.seleted');
            personagemSelecionado.classList.remove('seleted')

            // Adiciona nova classe
            personagem.classList.add('seleted');
        } else {
            const personagemSelecionado = document.querySelector('.second-player_seleted');
            personagemSelecionado.classList.remove('second-player_seleted')

            // Adiciona nova classe
            personagem.classList.add('second-player_seleted');
        }


        // Trocar imagem grande 

        // O id tem q ser igual ao nome da imagem. se não, não da certo
        // Passa pelo li selecionado e pega o id dele
        const idSelecionado = personagem.attributes.id.value;


        // Imagem grande do personagem
        const imagemJg1 = document.getElementById('selected__character');
        imagemJg1.src = `src/imagens/${idSelecionado}-big.png`;

        // Mudar nome em baixo
        // Só pega o data-attribute do HTML
        const nameJg2 = document.getElementById('nome-jogador-01');
        nameJg2.innerHTML = personagem.dataset.name;

    })

    personagem.addEventListener('click', () => {
        let nameCaracterCard = document.querySelector('#title__name');
        let thumbnail = document.querySelector('#title_thumbanail');
        let description = document.querySelector('#box__descrition');

        thumbnail.src = '../src/imagens/preview-image.png'
        thumbnail.classList.add('card-img-y', 'rounded', 'color-change-2x');
        description.classList.add('text-center');
        description.innerHTML =
            `
        <span class="placeholder col-6"></span>
        <span class="placeholder col-8"></span>
        <span class="placeholder w-75"></span>
        <span class="placeholder" style="width: 25%;"></span>
        `;

        // Abrir card
        sectionCard.style.display = 'block';

        nameCaracterCard.innerHTML = personagem.dataset.name;

        switch (personagem.dataset.number) {
            case '01':
                var idCharacterAPI = 1009189;
                break;

            case '02':
                var idCharacterAPI = 1009268;
                break;

            case '03':
                var idCharacterAPI = 1009562;
                break;

            case '04':
                var idCharacterAPI = 1009282;
                break;

            case '05':
                var idCharacterAPI = 1009629;
                break;

            case '06':
                var idCharacterAPI = 1009452;
                break;

            case '07':
                var idCharacterAPI = 1010338;
                break;

            case '08':
                var idCharacterAPI = 1009610;
                break;

            case '09':
                var idCharacterAPI = 1009368;
                break;

            default:
                alert('Erro ao selecionar o personagem :( ')
                break;
        }

        // MARVEL API

        fetch(`https://gateway.marvel.com/v1/public/characters/${idCharacterAPI}?&ts=1&apikey=806f2797d31fd36dbdbf2e44ee2c98fb&hash=a3c02225898174c829bb9e7184e35968`).then((responde) => {
            return responde.json();
        }).then((jsonParsed) => {

            jsonParsed.data.results.forEach(element => {

                // Remover classe e spans
                thumbnail.removeAttribute('class');
                description.removeAttribute('class');

                // Excluir dada tag span que da a animação antes do retorno da API
                let spans = document.querySelectorAll('.placeholder')

                for (let value of spans) {
                    value.remove();
                }

                // Colocar img
                var heroImg = element.thumbnail.path + '.' + element.thumbnail.extension;
                thumbnail.src = heroImg;

                // Colocar descrição
                description.innerHTML = element.description == '' ? `Sorry, we did not find any information about the character :( BUT if you wanna know more about <b>${element.name}</b> go check out the comics: <a href="${element.urls[0].url}" target="_blank">here</a>` : element.description;
            });

        });

    });


});



// CARD

// Bounce card animation
let sectionCard = document.querySelector('#card__description');
let card = document.querySelector('.card');

window.onmousedown = function (event) {
    if (event.target == sectionCard) {
        card.classList.add('bounce_card');
    }
}

window.onmouseup = function (event) {
    if (event.target == sectionCard) {
        card.classList.remove('bounce_card');
    }
}

// Sair do card
let btnCancel = document.querySelector('#canc').addEventListener('click', () => {
    // Esconde o card
    sectionCard.style.display = 'none';
});

let btnConf = document.querySelector('#conf').addEventListener('click', () => {
    // Esconde o card
    sectionCard.style.display = 'none';

    // Seleciona o personagem confirmado
    const personagemSelecionado = document.querySelector('.seleted');
    personagemSelecionado.childNodes[1].innerHTML = 'seletecplayer'

    console.log(personagemSelecionado);

    // Variavel auxiliar para selecionar o personagem, para trocar o efeito do azul e vermelho
    auxSelecterCharacter = true;

    // Trocar tag 1P ao confirmar personagem
    const tagPlayer = document.querySelectorAll('.character > .tag');
    tagPlayer.forEach((tag) => {
        tag.innerHTML === 'seletecplayer' ? tag.innerHTML = '1P' : tag.innerHTML = '2P';
    });

    // Mudar a imagem para o segundo personagem
    const imagemJg1 = document.getElementById('selected__character');
    imagemJg1.removeAttribute('id');
    const imagemJg2 = document.querySelector('.big__character.player__number-2 > img');
    imagemJg2.setAttribute('id', 'selected__character');

    // Mudar o nome para o segundo personagem
    const nomeSelecionado = document.getElementById('nome-jogador-01');
    nomeSelecionado.removeAttribute('id');
    const nameJg2 = document.querySelector('.big__character.player__number-2 > .name__character > h2');
    nameJg2.setAttribute('id', 'nome-jogador-01');

    exportCharacterCont++

    if (exportCharacterCont === 2) {
        var seletedPlayerOne = document.querySelector('.seleted');
        var seletedPlayerTwo = document.querySelector('.second-player_seleted');

        seletedPlayerOne = seletedPlayerOne.dataset.name;
        seletedPlayerTwo = seletedPlayerTwo.dataset.name;

        // Mandar os personagens selecionados para o game 
        if (typeof (Storage) === 'function') {
            localStorage.setItem('PlayerOne', seletedPlayerOne);
            localStorage.setItem('PlayerTwo', seletedPlayerTwo);
        } else {
            alert('Infelizmente o seu navegador não suporta localStorage, por favor tente usar outro!')
        }

        // Redirecionar para a página do jogo
        window.location.href = "src/pages/game.html";
    }

});

