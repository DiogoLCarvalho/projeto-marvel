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
    imgSrc: '../imagens/game/hf/hf_idle.png',
    framesMax: 9,
    framesHold:10,
    scale: 1.8,
    offset: { //onde ele vai estar no background
        x: 215,
        y: 147
    },
    sprites: {
        idle: {
            imgSrc: '../imagens/game/hf/hf_idle.png',
            framesMax: 9
        },
        run: {
            imgSrc: '../imagens/game/hf/hf_run.png',
            framesMax: 2
        },
        jump: {
            imgSrc: '../imagens/game/hf/hf_jump.png',
            framesMax: 2
        },
        fall: {
            imgSrc: '../imagens/game/hf/hf_fall.png',
            framesMax: 1
        },
        attack1: {
            imgSrc: '../imagens/game/hf/hf_attack1.png',
            framesMax: 6
        },
        takeHit: {
            imgSrc: '../imagens/game/hf/hf_takehit.png',
            framesMax: 3
        },
        death: {
            imgSrc: '../imagens/game/hf/hf_death.png',
            framesMax: 1
        }
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
        x: 954,
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
    imgSrc: '../imagens/game/bw/bw_idle.png',
    framesMax: 11,
    scale: 1.8,
    offset: {
        x: 215,
        y: 147
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
        takeHit: {
            imgSrc: '../imagens/game/bw/bw_takehit.png',
            framesMax: 3
        },
        death: {
            imgSrc: '../imagens/game/bw/bw_death.png',
            framesMax: 4
        }
    },
    attackBox: { // verificar extensão do ataque
        offset: {
            x: -200,
            y: 0
        },
        width: 100,
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
    c.fillStyle = 'rgba(255,255,255,0.030)';
    c.fillRect(0, 0, canvas.width, canvas.height)

    player.update();
    enemy.updateEnemy(); //Imagem espelhada


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
        winner({ player, enemy, timerID });
    }

}
animate();





var blockControl = false;
var jumpCount = 0;
var jumpMax = 2;

// THIRD  TASK - Mover personagens - event listeners

window.addEventListener('keydown', event => { // faz a verificação de cada tecla que vc clicar no teclado
    if (!blockControl) {

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




//in the code
// FOURTH TASK - Attacks!!!
// FIFTH TASK - health life!!!
// SIXTH TASK - Game trigger and game over
// SEVENTH TASK - Background sprite
