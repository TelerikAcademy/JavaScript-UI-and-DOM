var createSprite = (function () {

    'use strict';

    var clearOffset = 10;

    function render(drawCoordinates, clearCoordinates) {

        var self = this;
        
        self.context.clearRect(
            clearCoordinates.x - clearOffset,
            clearCoordinates.y - clearOffset,
            self.width + clearOffset * 2,
            self.height + clearOffset * 2
        );

        self.context.drawImage(
            self.image,
            self.width * self.frameIndex,
            0,
            self.width,
            self.height,
            drawCoordinates.x,
            drawCoordinates.y,
            self.width,
            self.height
        );

        return self;
    }

    function update() {

        var self = this;
        
        self.ticksCount += 1;
        if(self.ticksCount > self.ticksPerFrame) {
            self.ticksCount = 0;
            
            self.frameIndex += 1;

            if(self.frameIndex > self.numberOfFrames) {
                self.frameIndex = 0;
            }
        }

        return self;
    }

    function sprite(options) {

        return {
            name: options.name,
            image: options.image,
            height: options.height,
            width: options.width,
            frameIndex: 0,
            ticksCount: 0,
            numberOfFrames: options.numberOfFrames,
            ticksPerFrame: options.ticksPerFrame,
            context: options.context,
            render: render,
            update: update
        };
    }

    return sprite;
} ());