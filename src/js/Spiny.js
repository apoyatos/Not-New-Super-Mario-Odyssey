'use strict';

var Enemy = require('./Enemigo.js');

function Spiny(game, x, y, sprite, frame, speed, movingTime) {
    Enemy.call(this, game, x, y, sprite, frame, 0, 0);
    //Tipo
    this.type = sprite;
    //Movimiento
    this.speed = speed;
    this.movingTime = movingTime;
    this.movingTimer = 0;
    //Sprites y animaciones
    this.scale.setTo(2.5, 2.5);
    this.animations.add('walkRight', [0, 1], 5, true);
    this.animations.add('walkLeft', [2, 3], 5, true);
}
Spiny.prototype = Object.create(Enemy.prototype);
Spiny.constructor = Spiny;

//Movimiento
Spiny.prototype.Move = function () {
    if (this.game.time.totalElapsedSeconds() < this.movingTimer) {
        this.body.velocity.x = this.speed;
        if (this.speed < 0)
            this.animations.play('walkRight');
        else
            this.animations.play('walkLeft');
    }
    else {
        this.movingTimer = this.game.time.totalElapsedSeconds() + this.movingTime;
        this.speed = -this.speed;
    }
}

module.exports = Spiny;