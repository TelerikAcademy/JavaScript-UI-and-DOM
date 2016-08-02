window.addEventListener('load', function () {

    'use strict';

    var WIDTH = 512,
        HEIGHT = WIDTH / 2;

    var playerCanvas = document.getElementById('player-layer'),
        pokeballCanvas = document.getElementById('terrain-layer'),
        backgroundCanvas = document.getElementById('background-layer');

    backgroundCanvas.height = HEIGHT;
    backgroundCanvas.width = WIDTH;

    pokeballCanvas.height = HEIGHT;
    pokeballCanvas.width = WIDTH;

    playerCanvas.height = HEIGHT;
    playerCanvas.width = WIDTH;

    var player = createPlayer();

    var background = createBackground({
            context: backgroundCanvas.getContext('2d'),
            width: WIDTH,
            height: HEIGHT,
            speed: { x: 5, y: 0 },
            image: document.getElementById('background')
        });

    // jump on keydown
    document.addEventListener('keydown', function (ev) {
        if (ev.keyCode !== 38) {
            return;
        }

        if (!player.physics.isJumping) {
            player.physics.startJumping();
        }
    });

    var pokeballs = createPokeballs({
        layer: pokeballCanvas,
        context: pokeballCanvas.getContext('2d'),
        image: document.getElementById('pokeball')
    });

    // used to define intervals between pokeball spawning
    var frame = 0;

    function animationLoop() {
        
        var last,
            lastPb,
            i,
            len,
            pb;

        // move and render background
        background
            .update()
            .render();

        // player moving and rendering
        last = player.physics.move({ x: 1, y: 0 });

        player
            .sprite
            .render(player.physics.coordinates, last)
            .update();

        // pokeballs moving and rendering
        for (i = 0; i < pokeballs.all.length; i += 1) {
            pb = pokeballs.all[i];

            // TODO: extract in method
            lastPb = pb.physics.move();

            if ((pb.physics.coordinates.x + pb.physics.width) >= 0) {
                pb.sprite
                    .render(pb.physics.coordinates, lastPb)
                    .update();

                // game over
                if (player.physics.collidesWith(pb.physics)) {
                    // TODO: extract in method
                    playerCanvas.getContext('2d').clearRect(0, 0, WIDTH, HEIGHT);
                    pokeballCanvas.getContext('2d').clearRect(0, 0, WIDTH, HEIGHT);

                    document.getElementById('player-layer').getContext('2d').drawImage(
                        document.getElementById('dead'),
                        0,
                        0
                    );

                    return;
                }
            } else {
                pokeballs.remove(pb);
            }
        }

        // ~1% chance to spawn pokeball once every 2 frames
        // TODO: improve spawning logic
        frame = (frame + 1) % 2;
        if ((Math.random() < 1 / 100) && !frame) {
            pokeballs.spawnPokeball();
        }

        // loop the game
        window.requestAnimationFrame(animationLoop);
    }

    animationLoop();
});