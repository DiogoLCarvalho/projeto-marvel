// FIRST TASK - Project setup

const canvas = document.querySelector('canvas'); // onde o desenho vai acontecer
const c = canvas.getContext('2d'); // Returns an object that provides methods and properties for drawing and manipulating images and graphics on a canvas element in a document.

canvas.width = 1024
canvas.height = 567
c.fillRect(0, 0, canvas.width, canvas.height) // black background






// SECOND TASK - Create a player and enemy - programação orientada a objeto

const gravity = 0.7; // gravidade para o jogador sempre cair

// Class
class Sprite {
    constructor({ position, velocity, color, offset }) { // passando um objeto = com isso não importa a order
        this.position = position // cada vez que vc instanciar um novo jogador vc podera indicar onde ele esta na tela (canvas)
        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastKey // THREE TASK - mover o inimigo
        this.attackBox = { //FOURTH TASK - braço para atacar
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: offset,
            width: 100,
            height: 50
        }
        this.color = color
        this.isAttacking
        this.health = 100// FIFTH TASK - health life!!!
    }

    draw() { // colocando o jogador na tela, com a cor, e o posicionamento passado pela instância da classe (50 (largura), 150(altura))
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.width, this.height)

        // FOURTH TASK
        if (this.isAttacking) {
            c.fillStyle = '#FCFC81';
            c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);
        }
    }

    // FOURTH TASK - Attacks!!! - ativa o ataque por um periodo de tempo
    attacks() {
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 100);
    }

    update() { // gravidade, velocidade, "fisica do jogo"
        this.draw();
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y

        this.position.x += this.velocity.x //  THREE TASK  - mover x do jogador
        this.position.y += this.velocity.y

        // Não deixar que o player passe a tela     
        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0
        } else {
            this.velocity.y += gravity // o jogador sempre vai cair no Y, por conta da gravidade. Vc não precisa colocar nada na instancia dele
        }
    }
}

// Players - vc tem que passar um objeto com argumento [Destructuring JS]
const player = new Sprite({
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
    }
});



const enemy = new Sprite({
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

// FOURTH TASK - Attacks!!! - para ter a função de ataque de ambos os personagens para não precisar escrever no if abaixo de ataque
function colisao({ player1, enemy }) {
    return (
        player1.attackBox.position.x + player1.attackBox.width >= enemy.position.x &&
        player1.attackBox.position.x <= enemy.position.x + enemy.width &&
        player1.attackBox.position.y + player1.attackBox.height >= enemy.position.y &&
        player1.attackBox.position.y <= enemy.position.y + enemy.height
    )
}


// SIXTH TASK - Game trigger and game over
function winner({ player, enemy, timerID }) {
    clearTimeout(timerID)

    document.querySelector('.c-timer').style.display = 'block';

    if (auxWinner === false) {
        if (player.health === enemy.health) {
            document.querySelector('.c-timer').innerHTML = 'EMPATE';
            auxWinner = true;
        } else if (player.health > enemy.health) {
            document.querySelector('.c-timer').innerHTML = 'Jogador 1 Ganhou';
            auxWinner = true;
        } else if (enemy.health > player.health) {
            document.querySelector('.c-timer').innerHTML = 'Jogador 2 Ganhou';
            auxWinner = true;
        }
    }
}

// SIXTH TASK - Game trigger and game over
// Diminuir o tempo do jogo
let timer = 60;
let timerID;
let auxWinner = false;
function decreaseTimer() {

    if (timer > 0) {
        timerID = setTimeout(decreaseTimer, 1000)
        timer--
        document.querySelector('#timer').innerHTML = timer
    }

    if (timer === 0) {
        winner({ player, enemy, timerID });
    }

}
decreaseTimer();


// Loop de animação = para gravidade, velocidade, etc
function animate() {
    window.requestAnimationFrame(animate); // sempre chama a função de paramentro, no caso ele mesma


    c.fillStyle = 'black'; // deixa o fundo black
    c.fillRect(0, 0, canvas.width, canvas.height); // limpa a tela

    // jogadores cairem no chão - desenha-los na tela
    player.update();
    enemy.update();

    // THIRD TASK - mover para direita e esquerda - com isso vc pode mover duas teclas ao mesmo tempo 
    // Player
    player.velocity.x = 0 // não fica sempre se mexendo
    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -5 // velocidade dos jogadores
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5 // velocidade dos jogadores
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
