function solve() {
    return function (selector) {
        var template = [
            // put the lines of your template in this array as strings
        ].join('');

        if(template.length) {
            document.getElementById(selector).innerHTML = template;
        }
    };
}

if (typeof module !== 'undefined') {
    module.exports = solve;
}