// SIXTH TASK - Game trigger and game over

// Class
class Sprite {
    constructor({ position, imgSrc, scale = 1, framesMax = 1, offset = { x: 0, y: 0 }, framesHold = 8 }) {
        this.position = position // cada vez que vc instanciar um novo jogador vc podera indicar onde ele esta na tela (canvas)
        this.width = 50
        this.height = 150
        this.image = new Image()
        this.image.src = imgSrc
        this.scale = scale
        this.framesMax = framesMax
        this.framaCurrent = 0
        this.framesChange = 0
        this.framesHold = framesHold // mudar a valocidade do baby animado
        this.offset = offset
    }

    draw() {
        // Para animar um elemento vc precisa dividir pelo numero de animações que tera dentro de uma imagem - vc divide a imagem pelos frames
        // c.drawImage(this.image,this.position.x, this.position.y, this.image.width * this.scale , this.image.height * this.scale) sem um elemento de animação
        // SEVENTH TASK - Background sprite
        // animar baby 

        c.drawImage(
            this.image,
            this.framaCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
            (this.image.width / this.framesMax) * this.scale,
            this.image.height * this.scale)

    }

    animetedFrames() {
        this.framesChange++

        if (this.framesChange % this.framesHold === 0) {
            if (this.framaCurrent < this.framesMax - 1) {
                this.framaCurrent++
            } else {
                this.framaCurrent = 0
            }
        }
    }

    update() {
        this.draw();
        this.animetedFrames();
    }


}



// Class
class Fighter extends Sprite {
    constructor({ position, velocity, color, imgSrc, scale = 1, framesMax = 1, offset = { x: 0, y: 0 }, sprites, framesHold = 8, attackBox = { offset: {}, width: undefined, height: undefined } }) { // passando um objeto = com isso não importa a order
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
            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height
        }
        this.color = color
        this.isAttacking
        this.health = 100// FIFTH TASK - health life!!!
        this.framaCurrent = 0
        this.framesChange = 0
        this.framesHold = 9 // mudar a valocidade da animação
        this.sprites = sprites
        this.reverse = -1
        this.dead = false
        this.framesHold = framesHold // mudar a valocidade da animação

        // Mudar as animações do jogador
        for (const sprite in this.sprites) {
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imgSrc
        }
    }

    // FOURTH TASK - Attacks!!! - ativa o ataque por um periodo de tempo
    attacks() {
        this.switchSprite('attack1')
        this.isAttacking = true
    }

    takeHit() {
        this.health -= 10 //quantidade que tira vida

        // Animação de derrota e dano
        if (this.health <= 0) {
            this.switchSprite('death')
        } else {
            this.switchSprite('takeHit');
        }
    }



    update() { // gravidade, velocidade, "fisica do jogo"

        this.draw();
        if (!this.dead) { //parar a animação ao morrer
            this.animetedFrames();
        }



        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y

        // Ativar caixa de ataque
        // c.fillRect(this.attackBox.position.x,this.attackBox.position.y, this.attackBox.width, this.attackBox.height)

        //  THREE TASK  - mover x do jogador - não deixa ultrapassar a borda
        if (!(this.position.x + this.width + this.velocity.x >= canvas.width - 10)) {
            if (!(this.position.x + this.width + this.velocity.x <= 160)) {
                this.position.x += this.velocity.x
            }
        }

        // console.log(this.position.x + this.width + this.velocity.x );
        this.position.y += this.velocity.y


        // Não deixar que o player passe a tela     
        if (this.position.y + this.height + this.velocity.y >= canvas.height - 10) { // o - 10 é para ajustar onde os jogadores vão vair no chão de acordo com o background
            this.velocity.y = 0
            this.position.y = 407 //modificar quando chegar no chão e bug a animação na hora de trocar
        } else {
            this.velocity.y += gravity // o jogador sempre vai cair no Y, por conta da gravidade. Vc não precisa colocar nada na instancia dele
        }


    }

    // mudar animações
    switchSprite(sprite) {

        // Não chamar o swich, no ataque, se não bug com a animação idle
        if (this.image === this.sprites.attack1.image && this.framaCurrent < this.sprites.attack1.framesMax - 1) { //mover uma vez o ataque
            return
        }
        // Quando o jogador é atacado - sobreescreva todas as animações
        if (this.image === this.sprites.takeHit.image && this.framaCurrent < this.sprites.takeHit.framesMax - 1) {
            return
        }
        // Não chamar o swich, no ataque, se não bug com a animação idle
        if (this.image === this.sprites.death.image) {
            if (this.framaCurrent === this.sprites.death.framesMax - 1) {
                this.dead = true
            }
            return
        }
        switch (sprite) {
            case 'idle':
                if (this.image !== this.sprites.idle.image) {
                    this.image = this.sprites.idle.image
                    this.framesMax = this.sprites.idle.framesMax  //sobreescreve os frames
                    this.framaCurrent = 0
                }
                break;
            case 'run':
                if (this.image !== this.sprites.run.image) {
                    this.image = this.sprites.run.image
                    this.framesMax = this.sprites.run.framesMax  //sobreescreve os frames
                    this.framaCurrent = 0
                }
                break;
            case 'jump':
                if (this.image !== this.sprites.jump.image) {
                    this.image = this.sprites.jump.image
                    this.framesMax = this.sprites.jump.framesMax  //sobreescreve os frames
                    this.framaCurrent = 0
                }
                break;
            case 'fall':
                if (this.image !== this.sprites.fall.image) {
                    this.image = this.sprites.fall.image
                    this.framesMax = this.sprites.fall.framesMax  //sobreescreve os frames
                    this.framaCurrent = 0
                }
                break;
            case 'attack1':
                if (this.image !== this.sprites.attack1.image) {
                    this.image = this.sprites.attack1.image
                    this.framesMax = this.sprites.attack1.framesMax  //sobreescreve os frames
                    this.framaCurrent = 0
                }
                break;
            case 'takeHit':
                if (this.image !== this.sprites.takeHit.image) {
                    this.image = this.sprites.takeHit.image
                    this.framesMax = this.sprites.takeHit.framesMax  //sobreescreve os frames
                    this.framaCurrent = 0
                }
                break;
            case 'death':
                if (this.image !== this.sprites.death.image) {
                    this.image = this.sprites.death.image
                    this.framesMax = this.sprites.death.framesMax  //sobreescreve os frames
                    this.framaCurrent = 0
                }
                break;
            default:
                break;
        }
    }

    // virar o personagem ao contrario
    updateEnemy() {
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y

        // Ativar caixa de ataque
        // c.fillRect(this.attackBox.position.x,this.attackBox.position.y, this.attackBox.width, this.attackBox.height)

        // Virar o personagem
        c.scale(-1, 1);

        //  THREE TASK  - mover x do jogador - não deixa ultrapassar a borda
        if (!(this.position.x + this.width + this.velocity.x >= canvas.width + 50)) {
            if (!(this.position.x + this.width + this.velocity.x <= 160)) {
                this.position.x += this.velocity.x
            }
        }

        this.position.y += this.velocity.y

        // Não deixar que o player passe a tela     
        if (this.position.y + this.height + this.velocity.y >= canvas.height - 10) { // o - 10 é para ajustar onde os jogadores vão vair no chão de acordo com o background
            this.velocity.y = 0
            this.position.y = 407 //modificar quando chegar no chão e bug a animação na hora de trocar
        } else {
            this.velocity.y += gravity // o jogador sempre vai cair no Y, por conta da gravidade. Vc não precisa colocar nada na instancia dele
        }


        this.flipHorizontally();
        if (!this.dead) {  //parar a animação ao morrer
            this.animetedFrames();
        }
    }

    // virar o personagem ao contrario
    flipHorizontally() {
        if (this === player) {
            playerSettingOne === 'Deadpool'? c.translate(-300, 0) : c.translate(-400, 0);
        }else{
            playerSettingTwo === 'Deadpool'? c.translate(-300, 0) : c.translate(-400, 0);
        }

        c.drawImage(
            this.image,
            this.framaCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            (this.position.x - this.offset.x) * -1,
            this.position.y - this.offset.y,
            (this.image.width / this.framesMax) * this.scale,
            this.image.height * this.scale)

        c.setTransform(1, 0, 0, 1, 0, 0);
    }


}