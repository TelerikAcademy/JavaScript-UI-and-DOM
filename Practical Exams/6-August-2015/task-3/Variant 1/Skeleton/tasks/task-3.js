function solve() {
    return function (selector) {
        var template = '';		
        document.getElementById(selector).innerHTML = template;
    };
}

module.exports = solve;