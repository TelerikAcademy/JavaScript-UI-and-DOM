const { expect } = require('chai');

const { jsdom } = require('jsdom');

const handlebars = require("handlebars");

global.document = jsdom('<html></html>', {});
global.window = document.defaultView;

const solve = require('../task/task');

describe('Test', () => {
    let result;

    beforeEach(() => {
        result = solve();
    })

    describe("Zero tests", () => {
        it('Expect correct structure when no default values are provided', () => {
            document.body.innerHTML = '<div id="root"></div>';
            const root = document.querySelector('#root');

            var template = handlebars.compile(result);
            var data = {
                titles: [{
                    text: "Tab 1",
                    link: "tab-1"
                }, {
                    text: "Tab 2",
                    link: "tab-2"
                }, {
                    text: "Tab 3",
                    link: "tab-3"
                }],
                contents: [{
                    link: "tab-1",
                    text: "Tab 1, no so special...",
                }, {
                    link: "tab-2",
                    text: "<p>Some text in a p</p><a href=\"#\">a link</a>",
                }, {
                    link: "tab-3",
                    text: "<strong>And a list</strong><ul><li>Just</li><li>a</li><li>regular</li><li>list</li></ul>"
                }]
            };

            root.innerHTML = template(data);
            expect(root.firstElementChild.className).to.contains("tabs-control");
            expect(root.querySelectorAll(".list")).to.have.lengthOf("2");
            expect(root.querySelector(".list-titles")).to.not.be.null;
            expect(root.querySelector(".list-contents")).to.not.be.null;
        });
    });
    describe("Regular tests", () => {
        it("Test 1: titles", () => {
            document.body.innerHTML = '<div id="root"></div>';
            const root = document.querySelector('#root');

            var template = handlebars.compile(result);
            var data = {
                titles: [{
                    text: "Tab 1",
                    link: "tab-1"
                }, {
                    text: "Tab 2",
                    link: "tab-2"
                }, {
                    text: "Tab 3",
                    link: "tab-3"
                }],
                contents: [{
                    link: "tab-1",
                    text: "Tab 1, no so special...",
                }, {
                    link: "tab-2",
                    text: "<p>Some text in a p</p><a href=\"#\">a link</a>",
                }, {
                    link: "tab-3",
                    text: "<strong>And a list</strong><ul><li>Just</li><li>a</li><li>regular</li><li>list</li></ul>"
                }]
            };

            root.innerHTML = template(data);

            var titlesList = root.querySelector(".list-titles");
            var klasses = titlesList.className.split(" ");
            klasses.forEach(klass => expect(klass).to.contain("list"));
            expect(titlesList).to.exist;
            expect(klasses).to.have.lengthOf(2);
        });

        it("Test 2: titles have labels", () => {
            document.body.innerHTML = '<div id="root"></div>';
            const root = document.querySelector('#root');

            var template = handlebars.compile(result);
            var data = {
                titles: [{
                    text: "Tab 1",
                    link: "tab-1"
                }, {
                    text: "Tab 2",
                    link: "tab-2"
                }, {
                    text: "Tab 3",
                    link: "tab-3"
                }],
                contents: [{
                    link: "tab-1",
                    text: "Tab 1, no so special...",
                }, {
                    link: "tab-2",
                    text: "<p>Some text in a p</p><a href=\"#\">a link</a>",
                }, {
                    link: "tab-3",
                    text: "<strong>And a list</strong><ul><li>Just</li><li>a</li><li>regular</li><li>list</li></ul>"
                }]
            };

            root.innerHTML = template(data);

            var labels = root.querySelectorAll("label");
            expect(labels).to.have.lengthOf(data.titles.length);
            labels.forEach((label, index) => expect(label.getAttribute("for")).to.eql(data.titles[index].link));
            labels.forEach((label, index) => expect(label.className).to.contains("title"));
            labels.forEach((label, index) => expect(label.innerHTML.trim()).to.equal(data.titles[index].text));
        });

        it("Test 3: contents", () => {
            document.body.innerHTML = '<div id="root"></div>';
            const root = document.querySelector('#root');

            var template = handlebars.compile(result);
            var data = {
                titles: [{
                    text: "Tab 1",
                    link: "tab-1"
                }, {
                    text: "Tab 2",
                    link: "tab-2"
                }, {
                    text: "Tab 3",
                    link: "tab-3"
                }],
                contents: [{
                    link: "tab-1",
                    text: "Tab 1, no so special...",
                }, {
                    link: "tab-2",
                    text: "<p>Some text in a p</p><a href=\"#\">a link</a>",
                }, {
                    link: "tab-3",
                    text: "<strong>And a list</strong><ul><li>Just</li><li>a</li><li>regular</li><li>list</li></ul>"
                }]
            };

            root.innerHTML = template(data);

            var titlesList = root.querySelector(".list-contents");
            var klasses = titlesList.className.split(" ");
            klasses.forEach(klass => expect(klass).to.contain("list"));
            expect(titlesList).to.exist
            expect(klasses).to.have.lengthOf(2);
        });

        it("Test 4: contents have radio buttons", () => {
            document.body.innerHTML = '<div id="root"></div>';
            const root = document.querySelector('#root');

            var template = handlebars.compile(result);
            var data = {
                titles: [{
                    text: "Tab 1",
                    link: "tab-1"
                }, {
                    text: "Tab 2",
                    link: "tab-2"
                }, {
                    text: "Tab 3",
                    link: "tab-3"
                }],
                contents: [{
                    link: "tab-1",
                    text: "Tab 1, no so special...",
                }, {
                    link: "tab-2",
                    text: "<p>Some text in a p</p><a href=\"#\">a link</a>",
                }, {
                    link: "tab-3",
                    text: "<strong>And a list</strong><ul><li>Just</li><li>a</li><li>regular</li><li>list</li></ul>"
                }]
            };

            root.innerHTML = template(data);

            var contentsList = root.querySelector(".list-contents");
            var radios = contentsList.querySelectorAll("input");
            expect(radios).to.have.lengthOf(data.contents.length);
            radios.forEach((radio, index) => expect(radio.getAttribute("type")).to.eql("radio"));
            radios.forEach((radio, index) => expect(radio.id).equal(data.contents[index].link));
            radios.forEach((radio, index) => expect(radio.className).to.contains("tab-content-toggle"));
        });

        it("Test 5: contents have .conten", () => {
            document.body.innerHTML = '<div id="root"></div>';
            const root = document.querySelector('#root');

            var template = handlebars.compile(result);
            var data = {
                titles: [{
                    text: "Tab 1",
                    link: "tab-1"
                }, {
                    text: "Tab 2",
                    link: "tab-2"
                }, {
                    text: "Tab 3",
                    link: "tab-3"
                }],
                contents: [{
                    link: "tab-1",
                    text: "Tab 1, no so special...",
                }, {
                    link: "tab-2",
                    text: "<p>Some text in a p</p><a href=\"#\">a link</a>",
                }, {
                    link: "tab-3",
                    text: "<strong>And a list</strong><ul><li>Just</li><li>a</li><li>regular</li><li>list</li></ul>"
                }]
            };

            root.innerHTML = template(data);

            var contentsList = root.querySelector(".list-contents");
            var contents = contentsList.querySelectorAll(".content");
            expect(contents).to.have.lengthOf(data.contents.length);
            contents.forEach((content, index) => expect(content.innerHTML.trim()).to.equal(data.contents[index].text))
        });
    });
});