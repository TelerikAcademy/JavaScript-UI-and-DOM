(function($) {
    $.fn.zoom = function(size) {
        size = parseFloat(size);

        this.on('mouseover', function() {
            var $this = $(this);
            var oldWidth = parseFloat($this.css('width'));
            var oldHeight = parseFloat($this.css('height'));
            $this.css('width', (oldWidth * size) + 'px');
            $this.css('height', (oldHeight * size) + 'px');
        });

        this.on('mouseout', function() {
            var $this = $(this);
            var oldWidth = parseFloat($this.css('width'));
            var oldHeight = parseFloat($this.css('height'));
            $this.css('width', (oldWidth / size) + 'px');
            $this.css('height', (oldHeight / size) + 'px');
        });

        // For chaining
        return this;
    };
}(jQuery));