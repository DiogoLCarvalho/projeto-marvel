// FIRST TASK - Project setup

const canvas = document.querySelector('canvas'); // onde o desenho vai acontecer
const c = canvas.getContext('2d'); // Returns an object that provides methods and properties for drawing and manipulating images and graphics on a canvas element in a document.

canvas.width = 1024
canvas.height = 567
c.fillRect(0, 0, canvas.width, canvas.height) // black background





// SECOND TASK - Create a player and enemy - programação orientada a objeto

const gravity = 0.2; // gravidade para o jogador sempre cair

// Class
class Sprite {
    constructor({ position, velocity }) { // passando um objeto = com isso não importa a order
        this.position = position // cada vez que vc instanciar um novo jogador vc podera indicar onde ele esta na tela (canvas)
        this.velocity = velocity
        this.height = 150
    }

    draw() { // colocando o jogador na tela, com a cor, e o posicionamento passado pela instância da classe (50 (largura), 150(altura))
        c.fillStyle = '#FE2C54'
        c.fillRect(this.position.x, this.position.y, 50, this.height)
    }

    update() { // gravidade, velocidade, "fisica do jogo"
        this.draw();


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
    }
});


// THREE TASK - Mover personagens - event listeners
const keys = {
    a:{
        pressed: false
    },
    d:{
        pressed: false
    }
}
// - não da para ir para direita enquanto vc vai para a esqueda pq ele esta -1 - para resolver o ploblema
let lastKey;

// Loop de animação = para gravidade, velocidade, etc
function animate() {
    window.requestAnimationFrame(animate); // sempre chama a função de paramentro, no caso ele mesma


    c.fillStyle = 'black'; // deixa o fundo black
    c.fillRect(0, 0, canvas.width, canvas.height); // limpa a tela

    // jogadores cairem no chão - desenha-los na tela
    player.update();
    enemy.update();

    // THREE TASK - mover para direita e esquerda - com isso vc pode mover duas teclas ao mesmo tempo 
    
    player.velocity.x = 0
    if (keys.a.pressed && lastKey === 'a') {
        player.velocity.x = -1
    }else if (keys.d.pressed && lastKey === 'd') {
        player.velocity.x = 1
    }
}
animate();





// THREE TASK - Mover personagens - event listeners

window.addEventListener('keydown', event => { // faz a verificação de cada tecla que vc clicar no teclado

    switch (event.key) {
        case 'd': // ir para direito
            keys.d.pressed = true
            lastKey = 'd'
            break;
        case 'a': // ir para esquerda
            keys.a.pressed = true 
            lastKey = 'a'
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
         default:
            break;
    }

    console.log(event);
});