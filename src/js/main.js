const personagens = document.querySelectorAll('.character');
const jogador02 = document.querySelector('#feiticeira-escarlate');

// Vai percorrer todos os li de personagens
// Ao você colocar o mouse em cima ele chama a função
// Remove a classe seleted de todos os li
// E coloca no final a classe no li q você esta em cima
// Ele remove para que justamente ao vc colocar em outra li ele remova do antigo e johue para o novo
personagens.forEach((personagem) => {

    personagem.addEventListener('mouseenter', () => {

        personagens.forEach((player02) => {
            if (!(player02.getAttribute('class') === 'character second-player_seleted')) {
                jogador02.classList.add('second-player_seleted');
            }
        })


        // Hover personagem selecionado

        // remove a classe 
        const personagemSelecionado = document.querySelector('.seleted');
        personagemSelecionado.classList.remove('seleted')
        personagem.classList.remove('second-player_seleted');

        // Adiciona nova classe
        personagem.classList.add('seleted');


        // Trocar imagem grande 

        // O id tem q ser igual ao nome da imagem. se não, não da certo
        // Passa pelo li selecionado e pega o id dele
        const idSelecionado = personagem.attributes.id.value;

        // Imagem grande do personagem
        const imagemJg1 = document.getElementById('selected__character');
        imagemJg1.src = `src/imagens/${idSelecionado}-big.png`;


        // Mudar nome em baixo

        // Só pega o data-attribute do HTML
        const nomeSelecionado = document.getElementById('nome-jogador-01');
        nomeSelecionado.innerHTML = personagem.dataset.name;

    })

    personagem.addEventListener('click', () => {
        let nameCaracterCard = document.querySelector('#title__name');
        let thumbnail = document.querySelector('#title_thumbanail');
        let description = document.querySelector('#box__descrition');

        thumbnail.src = 'src/imagens/preview-image.gif';
        description.innerHTML = ' ';

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

let btnConfirm = document.querySelector('#canc').addEventListener('click', () => {
    sectionCard.style.display = 'none';
});

let btnCancel = document.querySelector('#conf');