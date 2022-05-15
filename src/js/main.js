const personagens = document.querySelectorAll('.character');
const jogador02 = document.querySelector('#viuva-negra');

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
        imagemJg1.src = `src/imagens/${idSelecionado}.png`;


        // Mudar nome em baixo

        // Só pega o data-attribute do HTML
        const nomeSelecionado = document.getElementById('nome-jogador-01');
        nomeSelecionado.innerHTML = personagem.dataset.name;


    })
});

