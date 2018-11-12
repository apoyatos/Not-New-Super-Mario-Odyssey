'use strict';

var Shot = require('./Disparo.js');

function Enemy(game, x, y, sprite, frame, speed, moving, shootingVel, shooting) {
  Phaser.Sprite.call(this, game, x, y, sprite, frame);

  this.speed = speed;
  this.moving = moving;
  this.shootingVel = shootingVel;
  this.shooting = shooting;
  this.timeMoving = 0;
  this.timeShooting = 1;

  this.game.physics.arcade.enable(this);
  this.body.collideWorldBounds = true;
  this.body.gravity.y = speed * 5;
}
Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.constructor = Enemy;

Enemy.prototype.AddAnimation = function (name, frames, speed) {
  this.animations.add(name, frames, speed, true);
  return name;
}
Enemy.prototype.Move = function (anim) {
  if(this.game.time.totalElapsedSeconds() < this.timeMoving) {
    this.body.velocity.x = this.speed;
    this.animations.play(anim);
  }
  else {
    this.timeMoving = this.game.time.totalElapsedSeconds() + this.moving;
    this.speed = -this.speed;
  }
}
Enemy.prototype.Shoot = function (target) {
  if(this.game.time.totalElapsedSeconds() > this.timeShooting)
  {
    var shot = new Shot(this.game, this.x, this.y, 'bala', 0);
    this.game.world.addChild(shot);
    shot.scale.setTo( 2, 2);
    var anim = shot.AddAnimation('shoot', [0, 1, 2, 3], 5);
    shot.Shoot(target, this.shootingVel, anim);
    this.timeShooting = this.game.time.totalElapsedSeconds() + this.shooting;
    
    shot.checkWorldBounds = true;
    shot.events.onOutOfBounds.add(shot.RemoveShot, shot);
    return shot;
  }
}

module.exports = Enemy;
