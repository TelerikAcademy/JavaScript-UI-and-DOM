function createSprite(options) {

    'use strict';

    var clearOffset = 5;

    function render(drawCoordinates, clearCoordinates) {
        // { x: Number, y: Number }
        var self = this;
        //     x1 = self.coordinates.x + self.width / 2,
        //     y1 = self.coordinates.y + self.height / 2;

        // self.context.beginPath

        self.context.clearRect(
            clearCoordinates.x - clearOffset,
            clearCoordinates.y - clearOffset,
            self.width + clearOffset * 2,
            self.height + clearOffset * 2
        );

        self.context.drawImage(
            self.spritesheet,
            self.frameIndex * self.width,
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

        self.loopTicksCount += 1;

        if(self.loopTicksCount >= self.loopTicksPerFrame) {
            self.loopTicksCount = 0;

            self.frameIndex += 1;

            if(self.frameIndex >= self.numberOfFrames) {
                self.frameIndex = 0;
            }
        }

        return self;
    }

    var sprite = {
        spritesheet: options.spritesheet,
        context: options.context, // drawing context
        width: options.width, // width of a single sprite
        height: options.height, // height of a single sprite
        numberOfFrames: options.numberOfFrames,
        loopTicksPerFrame: options.loopTicksPerFrame,
        frameIndex: 0,
        loopTicksCount: 0,
        render: render,
        update: update
    };

    return sprite;
}