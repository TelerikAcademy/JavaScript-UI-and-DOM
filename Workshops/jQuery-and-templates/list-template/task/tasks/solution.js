function solve() {
    return function (selector) {
        var template = [
            // template lines go here
        ].join('');

        document.getElementById(selector).innerHTML = template;
    }
}

if(typeof module !== 'undefined') {
    module.exports = solve;
}