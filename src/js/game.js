// FIRST TASK - Project setup
const canvas = document.querySelector('canvas'); // onde o desenho vai acontecer
const c = canvas.getContext('2d'); // Returns an object that provides methods and properties for drawing and manipulating images and graphics on a canvas element in a document.

canvas.width = 1024
canvas.height = 567
c.fillRect(0, 0, canvas.width, canvas.height) // black background


// Pegar sprites dos personagens selecionados na página de seleção
var spritesPlayerOne = [];
var spritesPlayerTwo = [];
// informações players
let perfilPlayer = document.querySelector('#image_player');
let perfilEnemy = document.querySelector('#image_enemy');

if (window.localStorage.PlayerOne != undefined && window.localStorage.PlayerTwo != undefined) {
    var playerSettingOne = localStorage.getItem('PlayerOne')
    var playerSettingTwo = localStorage.getItem('PlayerTwo')

} else {
    // Se o jogador cair logo aqui- esses vão ser os jogadores padrões
    alert('A seleção de personagens deu errado :( Mas aproveite com os personagens padrões!')
    var playerSettingOne = 'Viúva Negra'
    var playerSettingTwo = 'Homem Aranha'
}
settings.forEach(e => {

    if (playerSettingOne === e.nome) {
        spritesPlayerOne.push(e.sprites.idle, e.sprites.run, e.sprites.jump, e.sprites.fall, e.sprites.attack1, e.sprites.takeHit, e.sprites.death);
        perfilPlayer.src = e.perfil;
    }

    if (playerSettingTwo === e.nome) {
        spritesPlayerTwo.push(e.sprites.idle, e.sprites.run, e.sprites.jump, e.sprites.fall, e.sprites.attack1, e.sprites.takeHit, e.sprites.death);
        perfilEnemy.src = e.perfil;
    }
});

// informações players
let textPlayer = document.querySelector('.name-text-pl span');
let textEnemy = document.querySelector('.name-text-en span');
textPlayer.textContent = playerSettingOne;
textEnemy.textContent = playerSettingTwo;



// SECOND TASK - Create a player and enemy - programação orientada a objeto

const gravity = 0.7; // gravidade para o jogador sempre cair

// As classes estão no outro arquivo

// SEVENTH TASK - Background sprite
const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imgSrc: '../imagens/game/background_game.png',
});

const characterBack = new Sprite({
    position: {
        x: 260,
        y: 115
    },
    imgSrc: '../imagens/game/dormammu.png',
    scale: 1.5,
    framesMax: 10,
    framesHold: 7
})


// Players - vc tem que passar um objeto com argumento [Destructuring JS]
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
        run: spritesPlayerOne[1],
        jump: spritesPlayerOne[2],
        fall: spritesPlayerOne[3],
        attack1: spritesPlayerOne[4],
        takeHit: spritesPlayerOne[5],
        death: spritesPlayerOne[6]
    },
    attackBox: {
        offset: {
            x: 100,
            y: 0
        },
        width: 144,
        height: 50
    }
});


const enemy = new Fighter({
    position: {
        x: 854,
        y: 400
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: -50,
        y: 0
    },
    imgSrc: spritesPlayerTwo[0].imgSrc,
    framesMax: spritesPlayerTwo[0].framesMax,
    scale: 1.8,
    offset: {
        x: 215,
        y: 147
    },
    sprites: {
        idle: spritesPlayerTwo[0],
        run: spritesPlayerTwo[1],
        jump: spritesPlayerTwo[2],
        fall: spritesPlayerTwo[3],
        attack1: spritesPlayerTwo[4],
        takeHit: spritesPlayerTwo[5],
        death: spritesPlayerTwo[6]
    },
    attackBox: { // verificar extensão do ataque
        offset: {
            x: -300,
            y: 0
        },
        width: 144,
        height: 50
    }
});



const keys = { // THIRD TASK  // - não da para ir para direita enquanto vc vai para a esqueda pq ele esta -1 - para resolver o ploblema: mais os if abaixo
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    }
}


decreaseTimer();


// Loop de animação = para gravidade, velocidade, etc
function animate() {
    window.requestAnimationFrame(animate); // sempre chama a função de paramentro, no caso ele mesma


    c.fillStyle = 'black'; // deixa o fundo black
    c.fillRect(0, 0, canvas.width, canvas.height); // limpa a tela

    // jogadores cairem no chão - desenha-los na tela

    // SEVENTH TASK - Background sprite
    background.update();
    characterBack.update();

    // deixar fundo mais branco
    c.fillStyle = 'rgba(255,255,255,0.05)';
    c.fillRect(0, 0, canvas.width, canvas.height)

    if (!(keys.a.pressed && player.lastKey === 'a')) {
        player.update();
    }
    if (!(keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight')) {
        enemy.updateEnemy(); //Imagem espelhada
    }



    // THIRD TASK - mover para direita e esquerda - com isso vc pode mover duas teclas ao mesmo tempo 
    // Player
    player.velocity.x = 0 // não fica sempre se mexendo

    // mudar a animação
    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -5 // velocidade dos jogadores
        player.updateEnemy();  //virar o personagem
        player.switchSprite('run')
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5 // velocidade dos jogadores
        player.switchSprite('run')
    } else {
        player.switchSprite('idle')
    }

    // JUMP - player
    if (player.velocity.y < 0) {
        player.switchSprite('jump')
    } else if (player.velocity.y > 0) { //caindo
        player.switchSprite('fall')
    }


    // Enemy moviment
    enemy.velocity.x = 0
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -5
        enemy.switchSprite('run')
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 5
        enemy.update();
        enemy.switchSprite('run')
    } else {
        enemy.switchSprite('idle')
    }

    // JUMP - eenmy
    if (enemy.velocity.y < 0) {
        enemy.switchSprite('jump')
    } else if (enemy.velocity.y > 0) { //caindo
        enemy.switchSprite('fall')
    }


    // Colisão entre personagens - quando um atinge o outro
    // FOURTH TASK - Attacks!!!
    // Player atacar
    if (
        colisao({
            player1: player,
            enemy: enemy
        }) &&
        player.isAttacking &&
        player.framaCurrent === 4  // só vai por um ataque de cada vez + tempo que tira o dano em questão da animação
    ) {

        // FIFTH TASK - health life!!!
        enemy.takeHit();
        player.isAttacking = false

        // Animar com a biblioteca
        gsap.to('#enemyHealth', {
            width: enemy.health + '%'
        })
        // document.querySelector('#enemyHealth').style.width = enemy.health + '%'
    }

    // Errar ataque
    if (player.isAttacking && player.framaCurrent === 4) {
        player.isAttacking = false
    }


    // Enemy atacar
    if (
        colisao({
            player1: player,
            enemy: enemy
        }) &&
        enemy.isAttacking &&
        enemy.framaCurrent === 4  // só vai por um ataque de cada vez + tempo que tira o dano em questão da animação
    ) {

        // FIFTH TASK - health life!!!
        player.takeHit();
        enemy.isAttacking = false

        // Animar com a biblioteca
        gsap.to('#playerHealth', {
            width: player.health + '%'
        })
        // document.querySelector('#playerHealth').style.width = player.health + '%'
    }

    // Errar ataque
    if (enemy.isAttacking && enemy.framaCurrent === 4) {
        enemy.isAttacking = false
    }


    // SIXTH TASK - Game trigger and game over
    if (player.health <= 0 || enemy.health <= 0) {
        if (player.health <= 0 && enemy.health > 0) {
            player.switchSprite('death');
        }

        if (enemy.health <= 0 && player.health > 0) {
            enemy.switchSprite('death');
        }

        if (enemy.health === player.health) {
            enemy.switchSprite('death');
            player.switchSprite('death');
        }

        winner({ player, enemy, timerID });
    }

}
animate();


var blockControlE = false;
var blockControlP = false;
var jumpCount = 0;
var jumpMax = 2;

// THIRD  TASK - Mover personagens - event listeners

window.addEventListener('keydown', event => { // faz a verificação de cada tecla que vc clicar no teclado
    if (!blockControlP) {

        // Se um ganhar o outro pode se mexer
        if (!player.dead) {
            switch (event.key) {
                case 'd': // ir para direita
                    keys.d.pressed = true
                    player.lastKey = 'd'
                    break;
                case 'a': // ir para esquerda
                    keys.a.pressed = true
                    player.lastKey = 'a'
                    break;
                case 'w': // jump - sempre vai para baixo por conta da gravidade

                    // Pular uma vez
                    if (player.velocity.y === 0) {
                        player.velocity.y = -14;
                    }
                    break;
                case ' ': // FOURTH TASK - ativar ataque
                    player.attacks();
                    break;
            }
        }
    }

    if (!blockControlE) {

        if (!enemy.dead) {
            // Enemy
            switch (event.key) {
                case 'ArrowRight':
                    keys.ArrowRight.pressed = true
                    enemy.lastKey = 'ArrowRight'
                    break;
                case 'ArrowLeft':
                    keys.ArrowLeft.pressed = true
                    enemy.lastKey = 'ArrowLeft'
                    break;
                case 'ArrowUp':
                    if (enemy.velocity.y === 0) {
                        enemy.velocity.y = -14
                    }
                    break;
                case 'ArrowDown': // FOURTH TASK - ativar ataque
                    enemy.attacks();
                    break;
                default:
                    break;
            }
        }
    }
});

window.addEventListener('keyup', event => { // faz a verificação de cada tecla que vc clicar no teclado
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
            break;
        case 'a':
            keys.a.pressed = false
            break;


        // Enemy
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break;

        default:
            break;
    }
});