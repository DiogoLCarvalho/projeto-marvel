
// FIRST TASK - Project setup

const canvas = document.querySelector('canvas'); // onde o desenho vai acontecer
const c = canvas.getContext('2d'); // Returns an object that provides methods and properties for drawing and manipulating images and graphics on a canvas element in a document.

canvas.width = 1024
canvas.height = 567
c.fillRect(0, 0, canvas.width, canvas.height) // black background






// SECOND TASK - Create a player and enemy - programação orientada a objeto

const gravity = 0.7; // gravidade para o jogador sempre cair

// As classes estão no outro arquivo

// SEVENTH TASK - Background sprite
const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imgSrc: '../imagens/game/background_game.png'
})
const baby = new Sprite({
    position: {
        x: 260,
        y: 430
    },
    imgSrc: '../imagens/game/baby_crying.png',
    scale: 1.2,
    framesMax: 8
})


// Players - vc tem que passar um objeto com argumento [Destructuring JS]
const player = new Fighter({
    position: {
        x: 0,
        y: 0
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
    imgSrc: '../imagens/game/bw/bw_idle.png',
    framesMax: 11,
    scale: 2,
    offset: {
        x: 215,
        y: 157
    },
    sprites: {
        idle: {
            imgSrc: '../imagens/game/bw/bw_idle.png',
            framesMax: 11
        },
        run: {
            imgSrc: '../imagens/game/bw/bw_run.png',
            framesMax: 6
        },
        jump:{
            imgSrc: '../imagens/game/samuraiMack/jump.png',
            framesMax: 2
        },
        fall:{
            imgSrc: '../imagens/game/samuraiMack/fall.png',
            framesMax: 2
        },
        attack1:{
            imgSrc: '../imagens/game/samuraiMack/attack1.png',
            framesMax: 6
        }
    }
});



const enemy = new Fighter({
    position: {
        x: 974,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: '#3E82FC',
    offset: {
        x: -50,
        y: 0
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
    baby.update();
    player.update();
    // enemy.update();

    // THIRD TASK - mover para direita e esquerda - com isso vc pode mover duas teclas ao mesmo tempo 
    // Player
    player.velocity.x = 0 // não fica sempre se mexendo
    
    // mudar a animação
    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -5 // velocidade dos jogadores
        player.switchSprite('run')
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5 // velocidade dos jogadores
        player.switchSprite('run')
    }else{
        player.switchSprite('idle')
    }

    // JUMP
    if (player.velocity.y < 0) {
        player.switchSprite('jump')
    } else if (player.velocity.y > 0) { //caindo
        player.switchSprite('fall')
    }


    // Enemy
    enemy.velocity.x = 0
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -5
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 5
    }


    // Colisão entre personagens - quando um atinge o outro
    // FOURTH TASK - Attacks!!!
    // Player atacar
    if (
        colisao({ player1: player, enemy: enemy }) &&
        player.isAttacking
    ) {
        player.isAttacking = false // só vai por um ataque de cada vez

        // FIFTH TASK - health life!!!
        enemy.health -= 20
        document.querySelector('#enemyHealth').style.width = enemy.health + '%'
    }

    // Enemy atacar
    if (
        colisao({ player1: enemy, enemy: player }) &&
        enemy.isAttacking
    ) {
        enemy.isAttacking = false // só vai por um ataque de cada vez

        // FIFTH TASK - health life!!!
        player.health -= 20
        document.querySelector('#playerHealth').style.width = player.health + '%'
    }

    // SIXTH TASK - Game trigger and game over
    if (player.health <= 0 || enemy.health <= 0) {
        winner({ player, enemy, timerID });
    }

}
animate();






// THIRD  TASK - Mover personagens - event listeners

window.addEventListener('keydown', event => { // faz a verificação de cada tecla que vc clicar no teclado

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
            player.velocity.y = -10
            break;
        case ' ': // FOURTH TASK - ativar ataque
            player.attacks();
            break;



        // Enemy
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
            break;
        case 'ArrowUp':
            enemy.velocity.y = -10
            break;
        case 'ArrowDown': // FOURTH TASK - ativar ataque
            enemy.attacks();
            break;
        default:
            break;
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




//in the code
// FOURTH TASK - Attacks!!!
// FIFTH TASK - health life!!!
// SIXTH TASK - Game trigger and game over
// SEVENTH TASK - Background sprite
