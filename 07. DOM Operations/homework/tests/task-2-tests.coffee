solve = require '../tasks/task-1'
expect = require('chai').expect
jsdom = require 'mocha-jsdom' 

describe 'Task 2 tests', () ->
    htmlTemplate = '<ul id="list"></ul>';
    jsdom();

    beforeEach () ->
        document.body.innerHTML = htmlTemplate

    describe 'Valid', () ->
        it 'expect to add 5 inputs with labels for them', () ->
            func= solve()
