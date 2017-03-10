
var el = document.getElementById('input');

// el.addEventListener('click', function() {
//     el.value = 'clicked';
// });

var msgContainer = document.getElementById('msg-container');

function sendMessage() {
    var msg = el.value;
    el.value = '';

    var msgEl = document.createElement('p');
    msgEl.innerText = msg;

    var timeEl = document.createElement('span');
    timeEl.innerHTML = (new Date() + '').split(' ')[4];
    msgEl.appendChild(timeEl);

    msgContainer.appendChild(msgEl);
}

el.addEventListener('keydown', function (e) {
    if (e.keyCode === 13) {
        sendMessage();
    }
});

document.getElementById('send-button')
    .addEventListener('click', function(e) {
        sendMessage();
        console.log(e.clientX, e.clientY);
        console.log(e.pageX, e.pageY);
    });