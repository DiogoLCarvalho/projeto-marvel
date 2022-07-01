// SIXTH TASK - Game trigger and game over

// Class
class Sprite {
    constructor({ position, imgSrc, scale = 1, framesMax = 1}) { 
        this.position = position 
        this.width = 50
        this.height = 150
        this.image = new Image()
        this.image.src = imgSrc
        this.scale = scale
        this.framesMax = framesMax
        this.framaCurrent = 0
        this.framesChange = 0
        this.framesHold = 8 // mudar a valocidade do baby animado
    }

    draw() {
        // Para animar um elemento vc precisa dividir pelo numero de animações que tera dentro de uma imagem - vc divide a imagem pelos frames
        // c.drawImage(this.image,this.position.x, this.position.y, this.image.width * this.scale , this.image.height * this.scale) sem um elemento de animação
        // SEVENTH TASK - Background sprite
                                // animar baby 
        c.drawImage(this.image, this.framaCurrent * (this.image.width/this.framesMax) ,0, this.image.width/this.framesMax,this.image.height,this.position.x, this.position.y, (this.image.width/this.framesMax)* this.scale , this.image.height * this.scale)

    }


    update() { 
        this.draw();
        this.framesChange++

        if(this.framesChange % this.framesHold === 0){
            if (this.framaCurrent < this.framesMax - 1) {
                this.framaCurrent++
            }else{
                this.framaCurrent = 0
            }
        }

    }
}




// Class
class Fighter {
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
        if (this.position.y + this.height + this.velocity.y >= canvas.height - 10) { // o - 10 é para ajustar onde os jogadores vão vair no chão de acordo com o background
            this.velocity.y = 0
        } else {
            this.velocity.y += gravity // o jogador sempre vai cair no Y, por conta da gravidade. Vc não precisa colocar nada na instancia dele
        }
    }
}