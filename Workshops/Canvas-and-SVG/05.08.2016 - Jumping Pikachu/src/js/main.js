window.addEventListener('load', function () {

    'use strict';

    function applyGravityVertical(physicalBody, gravity) {

        // TODO: extract ground level logic
        if (physicalBody.coordinates.y === (HEIGHT - physicalBody.height)) {
            return;
        }

        if (physicalBody.coordinates.y > (HEIGHT - physicalBody.height)) {
            physicalBody.coordinates.y = HEIGHT - physicalBody.height;
            physicalBody.speed.y = 0;
            return;
        }

        physicalBody.speed.y += gravity;
    }

    var WIDTH = 512,
        HEIGHT = WIDTH / 2;

    var playerCanvas = document.getElementById('player-canvas'),
        playerContext = playerCanvas.getContext('2d'),
        playerImg = document.getElementById('pikachu-sprite');

    playerCanvas.width = WIDTH;
    playerCanvas.height = HEIGHT;

    var pikachuRunningSprite = createSprite({
        spritesheet: playerImg,
        width: playerImg.width / 4,
        height: playerImg.height,
        context: playerContext,
        numberOfFrames: 4,
        loopTicksPerFrame: 5
    });


    var pikachuJumpingImg = document.getElementById('pikachu-jumping-sprite');

    var pikachuJumpingSprite = createSprite({
        spritesheet: pikachuJumpingImg,
        context: playerContext,
        width: pikachuJumpingImg.width / 2,
        height: pikachuJumpingImg.height,
        numberOfFrames: 2,
        loopTicksPerFrame: 10
    });

    var pikachuBody = createPhysicalBody({
        defaultAcceleration: { x: 5, y: 20 },
        coordinates: { x: 10, y: HEIGHT - pikachuRunningSprite.height },
        speed: { x: 0, y: 0 },
        height: pikachuRunningSprite.height,
        width: pikachuRunningSprite.width
    });

    window.addEventListener('keydown', function (event) {

        switch (event.keyCode) {
            case 37:
                if (pikachuBody.speed.x < 0) {
                    return;
                }

                pikachuBody.accelerate('x', -1);
                break;
            case 38:
                // jumping
                if (pikachuBody.coordinates.y < (HEIGHT - pikachuBody.height)) {
                    return;
                }

                pikachuBody.accelerate('y', -1);
                break;
            case 39:
                if (pikachuBody.speed.x > 0) {
                    return;
                }

                pikachuBody.accelerate('x', 1);
                break;
            default:
                break;
        }
    });

    window.addEventListener('keyup', function (event) {
        if ((event.keyCode !== 37) && (event.keyCode !== 39)) {
            return;
        }

        pikachuBody.speed.x = 0;
    });

    var pokeballCanvas = document.getElementById('pokeball-canvas'),
        pokeballContext = pokeballCanvas.getContext('2d'),
        pokeballImg = document.getElementById('pokeball-sprite');

    pokeballCanvas.width = WIDTH;
    pokeballCanvas.height = HEIGHT;

    function createPokeball(offsetX) {
        var pokeballSprite = createSprite({
            spritesheet: pokeballImg,
            context: pokeballContext,
            width: pokeballImg.width / 18,
            height: pokeballImg.height,
            numberOfFrames: 18,
            loopTicksPerFrame: 5
        });

        var pokeballBody = createPhysicalBody({
            defaultAcceleration: { x: 5, y: 0 },
            coordinates: { x: offsetX, y: HEIGHT - pokeballSprite.height },
            speed: { x: -5, y: 0 },
            width: pokeballSprite.width,
            height: pokeballSprite.height
        });

        return {
            sprite: pokeballSprite,
            body: pokeballBody
        };
    }

    var pokeballs = [];

    function spawnPokeball() {
        var spawnChance = 0.02,
            spawnOffsetX = 100;

        if (Math.random() < spawnChance) {
            if (pokeballs.length) {
                var lastPokeball = pokeballs[pokeballs.length - 1];
                var starting = Math.max(lastPokeball.body.coordinates.x + lastPokeball.body.width + spawnOffsetX, WIDTH);
                var newPokeball = createPokeball(starting);
                pokeballs.push(newPokeball);

            } else {
                pokeballs.push(createPokeball(WIDTH));
            }
        }
    }

    var background = createBackground({
        width: WIDTH,
        height: HEIGHT,
        speedX: 10
    });

    var currentPikachuSprite = pikachuRunningSprite;
    
    function gameLoop() {

        var pokeball,
            lastPikachuCoordinates,
            i,
            lastPokeballCoordinates;


        applyGravityVertical(pikachuBody, 2);
        lastPikachuCoordinates = pikachuBody.move();

        if((pikachuBody.coordinates.y + pikachuBody.height) < HEIGHT) {
            currentPikachuSprite = pikachuJumpingSprite;
        } else {
            currentPikachuSprite = pikachuRunningSprite;
        }

        currentPikachuSprite
            .render(pikachuBody.coordinates, lastPikachuCoordinates)
            .update();

        // update, draw, move all pokeballs
        for (i = 0; i < pokeballs.length; i += 1) {

            pokeball = pokeballs[i];

            // if out of game field, remove pokeball
            if (pokeball.body.coordinates.x < -pokeball.body.width) {
                pokeballs.splice(i, 1);
                i -= 1;
                continue;
            }

            lastPokeballCoordinates = pokeball.body.move();

            pokeball.sprite
                .render(pokeball.body.coordinates, lastPokeballCoordinates)
                .update();

            // endgame logic
            if (pikachuBody.collidesWith(pokeball.body)) {
                playerContext.drawImage(
                    document.getElementById('dead-player'),
                    0,
                    0
                );
                // document.getElementById('game-over-song').play();
                return;
            }
        }

        spawnPokeball();

        background.render();
        background.update();

        window.requestAnimationFrame(gameLoop);
    }

    gameLoop();
});