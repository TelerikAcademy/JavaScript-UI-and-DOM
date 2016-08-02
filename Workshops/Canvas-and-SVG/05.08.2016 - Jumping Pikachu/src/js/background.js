var createBackground = function (options) {

    'use strict';

    var background = {
        coordinates: { x: 0, y: 0 },
        speed: options.speed,
        image: options.image,
        height: options.height,
        width: options.width,
        context: options.context,
        render: function () {
            var self = this;

            self.context.drawImage(
                self.image,
                self.coordinates.x,
                self.coordinates.y
            );

            self.context.drawImage(
                self.image,
                self.image.width - Math.abs(self.coordinates.x),
                self.coordinates.y
            );

            return self;
        },
        update: function () {
            var self = this;

            self.coordinates.x -= self.speed.x;

            if(Math.abs(self.coordinates.x) > self.image.width) {
                self.coordinates.x = 0;
            }

            return self;
        }
    };
    
    return background;
};