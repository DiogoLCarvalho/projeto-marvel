# 🎮👊 Jogo de luta da Marvel  👊🎮
 
<p align="center">
   <img src="https://user-images.githubusercontent.com/84794798/179769953-6ef0542c-fef8-4de4-a6fa-66ef30391e24.jpg" width="100%" >
</p>

## Teste por este link: :exclamation: :exclamation:
https://marvelgame.netlify.app/

## Comentários 📢

<p  'align= justify'>
 
Como um grande fã da Marvel e um apaixonado por tecnologia e jogos, este projeto sem dúvidas é um dos meus favoritos até agora. O projeto tenta emular os jogos antigos de luta, com os personagens da Marvel.

</p>

<p  'align= justify'>

A ideia é o jogador escolher os personagens, e colocá-los para brigar!!!   <img src="https://c.tenor.com/pGdhE0hGps4AAAAC/goku-fighting.gif" width="40px" >

</p>

## Comandos :keyboard:

 Teclado
  - `Jogador 1`: 
    - `w`: Pular
    - `a`: Mover para esqueda
    - `d`: Mover para direita
    - `ESPAÇO`: Atacar
    <br>
  - `Jogador 2`:
    - `seta para cima`: Pular
    - `seta para esquerda`: Mover para esqueda
    - `seta para direita`: Mover para direita
    - `seta para baixo`: Atacar
    
## Explicação geral ✒️
    
#### Início (index.html)

<p  'align= justify'>

Na primeira página, o jogador pode escolher o personagem para jogar. Ao selecionar, um modal será aberto, conectando com a API da Marvel, mostrando mais informações do personagem quando disponível. Enquanto essa conexão acontece, uma animação de carregamento vai ser carregada, esta animação foi feita com bootstrap 5. O jogador terá a opção de confirmar o personagem ou cancelar e escolher outro. Quando ele confirmar, o segundo jogador pode escolher o seu personagem também. O último detalhe é que nas páginas, há uma opção de tocar uma música de fundo, para aumentar o clima do jogo 🎶🤩

</p>
        
 ```js
// As trocas de imagens e informações são capturadas pelo dataset que está no HTML
 const personagens = document.querySelectorAll('.character');
 
personagens.forEach((personagem) => {
    personagem.addEventListener('mouseenter', () => {
    ...
    }
    personagem.addEventListener('click', () => {
    ...
    }

}
```

<br>

 ```js
// API conectado com fetch, dependendo do personagem escolhido a api irá buscar as informações dos personagens
switch (personagem.dataset.number) {
            case '01':
                var idCharacterAPI = 1009189;
                break;
...
fetch(`https://gateway.marvel.com/v1/public/characters/${idCharacterAPI}?`).then((responde) => {
            return responde.json();
        }).then((jsonParsed) => {

```

<br>

 ```js
// Quando os dois jogadores selecionarem seus personagens o resultado é armazenado no localStorage
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
```    

#### Jogo (game.html)

<p align="center">
   <img src="https://user-images.githubusercontent.com/84794798/179787208-aec84f5f-7471-403c-8e00-7ff8fa064f43.jpg" width="100%" >
</p>

<p  'align= justify'>


Pelo localStorage salvo, é possível saber qual personagem foi escolhido e uma verificação é feita. Os sprites são resgatados de um objeto que tem todos os personagens. Toda a esquematização do jogo está nos arquivos game.js, classes.js e utils.js. Resumindo, o jogo usa addEventListener para escutar os comandos, assim executa as funções e classes com seus métodos. Há também variáveis que controlam o tempo, vida, gravidade e velocidade, etc. Toda a parte de colocar as imagens na tela é feita por canvas HTML. Ao terminar o jogo existe uma opção de reiniciar a partida ou escolher novos personagens. 

</p>

 ```js
 //Informações dos personagens
{
        nome: 'Viúva Negra',
        sprites: {
            idle: {
                imgSrc: '../imagens/game/bw/bw_idle.png',
                framesMax: 11
            },
            run: {
                imgSrc: '../imagens/game/bw/bw_run.png',
                framesMax: 6
            },
            jump: {
                imgSrc: '../imagens/game/bw/bw_jump.png',
                framesMax: 4
            },
            fall: {
                imgSrc: '../imagens/game/bw/bw_fall.png',
                framesMax: 5
            },
            attack1: {
                imgSrc: '../imagens/game/bw/bw_attack1.png',
                framesMax: 6
            },
          ...
    },
```

<br>

```js
 // CANVAS HTML
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d'); 

canvas.width = 1024
canvas.height = 567
c.fillRect(0, 0, canvas.width, canvas.height)
  
```
<br>

```js

 // Jogador número um
const player = new Fighter({
    position: {
        x: 200,
        y: 400
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: '#FE2C54',
    offset: {
        x: 0,
        y: 0
    },
    imgSrc: spritesPlayerOne[0].imgSrc,
    framesMax: spritesPlayerOne[0].framesMax,
    framesHold: 10,
    scale: 1.8,
    offset: { //onde ele vai estar no background
        x: 215,
        y: 147
    },
    sprites: {
        idle: spritesPlayerOne[0],
  ...
  
```

<br>

```js
 // Classes e seus métodos
class Fighter extends Sprite {
    constructor({ position, velocity, color, imgSrc, scale = 1, framesMax = 1, offset = { x: 0, y: 0 }, sprites, framesHold = 8, attackBox = { offset: {}, width: undefined, height: undefined } }) {
        super({ position, imgSrc, scale, framesMax, offset, framesHold })

        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastKey // THREE TASK - mover o inimigo
        this.attackBox = { //FOURTH TASK - braço para atacar
            position: {
                x: this.position.x,
                y: this.position.y
            },
  ...
   attacks() {
      this.switchSprite('attack1')
      this.isAttacking = true
   }
   ...
```
#### OBS :exclamation:
* O código está todo comentado para melhor compreensão, aqui só abordei alguns tópicos.
* Para carregar as imagens dos personagens, o código divide a imagem em várias partes. A dica é colocar os sprites em uma imagem, sempre dando um espaço maior para caber todas as animações.

## Obrigado pela atenção :exclamation:
#### Créditos
* Estilo inical do projeto inspirado por: <a href="https://www.youtube.com/c/DevemDobro" target="_blank">Dev em Dobro</a>
* Ideia do jogo inspirado por: <a href="https://www.youtube.com/c/ChrisCourses" target="_blank">Chris Courses</a>
* Imagens dos ícones iniciais por: <a href="https://twitter.com/clacefall" target="_blank">@clacefall</a>
* Música de fundo por: <a href="https://www.youtube.com/watch?v=p5hQqs3OEMM" target="_blank">Catapult Reservatory, LLC. ℗ 2019 8 Bit Universe LLC</a>
* API: <a href="https://developer.marvel.com/" target="_blank">Marvel</a>
* Sprites dos personagens: <a href="https://mugenarchive.com/forums/downloads.php?do=cat&id=213-marvel-comics&page=8&sort=lastuploadedit" target="_blank">Mugenarchive</a>



<p align="justify">
<img src="https://c.tenor.com/cJc3zMD59LwAAAAM/marvel-loki.gif" width="40%" >
</p>
