var physics = (function () {

    'use strict';

    // rectangular collision detection logic
    // TODO: replace with circular collision detection logic
    function collidesWith(otherPhysicalObject) {

        var self = this;

        var selfLeft = self.coordinates.x,
            selfRight = self.coordinates.x + self.width,
            selfTop = self.coordinates.y,
            selfBottom = self.coordinates.y + self.height;

        var otherLeft = otherPhysicalObject.coordinates.x,
            otherRight = otherPhysicalObject.coordinates.x + otherPhysicalObject.width,
            otherTop = otherPhysicalObject.coordinates.y,
            otherBottom = otherPhysicalObject.coordinates.y + otherPhysicalObject.height;

        return selfLeft < otherRight
            && selfRight > otherLeft
            && selfTop < otherBottom
            && selfBottom > otherTop;
    }

    // moves the caller(using the coordinates and speed properties of the caller) and return the coordinates before moving
    function move(delta) {

        var self = this,
            last = JSON.parse(JSON.stringify(self.coordinates));

        self.coordinates = { 
            x: self.coordinates.x + self.speed.x * delta.x, 
            y: self.coordinates.y + self.speed.y * delta.y
        };

        return last;
    }

    // teleports the caller object to the given coordinates and returns it's previous position
    function teleportTo(coordinates) {

        var last = this.coordinates;
        this.coordinates = coordinates;
        return last;
    }

    // creates a new physcal object by a set of options
    function physicalObject(options) {

        return {
            name: options.name,
            coordinates: options.coordinates, // x- and y-axis coordinates 
            width: options.width, // width of the physical object
            height: options.height, // height of the physical object
            speed: options.speed, // speed for the x and y axises
            move: move, // move method
            teleportTo: teleportTo, // teleport method
            collidesWith: collidesWith // collision method
        };
    }

    return {
        physicalObject
    }
} ());