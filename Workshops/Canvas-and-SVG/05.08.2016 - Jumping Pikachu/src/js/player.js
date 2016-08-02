function createPlayer() {
    
    'use strict';

    var playerCanvas = document.getElementById('player-layer'),
        playerImageSprite = document.getElementById('player'),
        numberOfFrames = 3,
        ticksPerFrame = 5;

    var playerSprite = createSprite({
        name: 'player',
        image: playerImageSprite,
        width: playerImageSprite.width / (numberOfFrames + 1),
        height: playerImageSprite.height,
        numberOfFrames: numberOfFrames,
        ticksPerFrame: ticksPerFrame,
        context: playerCanvas.getContext('2d')
    });

    var playerPhysical = physics.physicalObject({
        name: 'player',
        coordinates: { x: 10, y: playerCanvas.height - playerImageSprite.height },
        width: playerSprite.width / 4,
        height: playerSprite.height,
        speed: { x: 0, y: 5 }
    });

    var parentMove = playerPhysical.move;

    playerPhysical.jumpHeight = 25;
    playerPhysical.jumpStep = 0;
    playerPhysical.isJumping = false;

    // TODO: refactor jumping
    var jumpArc = [],
        i,
        currentJumpStep;

    for(i = 0; i < playerPhysical.jumpHeight * 2; i += 1) {
        if(i < playerPhysical.jumpHeight) {
            jumpArc.push({ x: 0, y: -1 });
        } else {
            jumpArc.push({ x: 0, y: 1 });
        }
    }

    playerPhysical.startJumping = function () {
        if(!this.isJumping) {
            this.isJumping = true;
            currentJumpStep = 0;
        }

        if(this.isJumping && (currentJumpStep >= jumpArc.length)) {
            this.isJumping = false;
            return parentMove.call(this, { x: 1, y: 0 });
        }

        return parentMove.call(playerPhysical, jumpArc[currentJumpStep++]);
    };

    playerPhysical.move = function () {

        if(this.isJumping) {
            return this.startJumping();
        }

        return parentMove.call(this, { x: 1, y: 0 });
    }

    return {
        sprite: playerSprite,
        physics: playerPhysical
    };
}