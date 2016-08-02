var createPokeballs = function (options) {

    var pokeballs = [];
    
    function spawnPokeball(coordinates) {
        var pokeballSprite = createSprite({
            name: 'pokeball',
            image: options.image,
            height: options.image.height,
            width: options.image.width / 18,
            numberOfFrames: 17,
            ticksPerFrame: 5,
            context: options.context
        });

        var pokeballObj = physics.physicalObject({
            name: 'pokeball',
            coordinates: coordinates || { x: options.layer.width - pokeballSprite.width, y: options.layer.height - pokeballSprite.height },
            speed: { x: 6, y: 0 },
            height: pokeballSprite.height,
            width: pokeballSprite.width,
        });

        var parentMove = pokeballObj.move;

        pokeballObj.move = function () {
            return parentMove.call(pokeballObj, { x: -1, y: 0 });
        }

        var newPokeball = {
            sprite: pokeballSprite,
            physics: pokeballObj
        };

        pokeballs.push(newPokeball);

        return newPokeball;
    }

    function remove(pokeballToRemove) {
        var index = pokeballs.findIndex(pb => pb === pokeballToRemove);
        
        pokeballs.splice(index, 1);

        return pokeballs;
    }

    return {
        spawnPokeball,
        remove,
        all: pokeballs
    };
};