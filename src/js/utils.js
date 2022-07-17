// FOURTH TASK - Attacks!!! - para ter a função de ataque de ambos os personagens para não precisar escrever no if abaixo de ataque
function colisao({ player1, enemy }) {
    return (
        player1.attackBox.position.x + player1.attackBox.width >= enemy.position.x &&
        player1.attackBox.position.x <= enemy.position.x + enemy.width &&
        player1.attackBox.position.y + player1.attackBox.height >= enemy.position.y &&
        player1.attackBox.position.y <= enemy.position.y + enemy.height
    )
}
// Botões quando acaba a partida
let buttonsFinish = document.querySelector('.l-main_buttons')

// SIXTH TASK - Game trigger and game over
function winner({ player, enemy, timerID }) {
    clearTimeout(timerID)

    document.querySelector('.c-timer').style.display = 'block';

    if (auxWinner === false) {
        if (player.health === enemy.health) {
            document.querySelector('.c-timer').innerHTML = 'EMPATE';
            buttonsFinish.style.display = 'flex';
            buttonsFinish.style.background = '#00000047';
            blockControlE = true;
            blockControlP = true;
            auxWinner = true;
        } else if (player.health > enemy.health) {
            document.querySelector('.c-timer').innerHTML = 'Jogador 1 Ganhou';
            buttonsFinish.style.display = 'flex';
            buttonsFinish.style.background = '#00000047';
            auxWinner = true;
            blockControlE = true;
        } else if (enemy.health > player.health) {
            document.querySelector('.c-timer').innerHTML = 'Jogador 2 Ganhou';
            buttonsFinish.style.display = 'flex';
            buttonsFinish.style.background = '#00000047';
            auxWinner = true;
            blockControlP = true;
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