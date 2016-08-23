/* globals require describe it before document $ jQuery console global*/
var expect = require("chai").expect;
var jsdom = require("jsdom");
var jq = require("jquery");
var result = require("../task/task-3.js")();
var handlebars = require("handlebars");

describe("Navigation task: Tests", function() {
    before(function(done) {
        jsdom.env({
            html: "",
            done: function(errors, window) {
                global.window = window;
                global.document = window.document;
                global.$ = jq(window);
                Object.keys(window)
                    .filter(function(prop) {
                        return prop.toLowerCase()
                            .indexOf("html") >= 0;
                    }).forEach(function(prop) {
                        global[prop] = window[prop];
                    });
                done();
            }
        });
    });

    /* Test Start */

    it("Expect .nav to exist", function() {
        var jQueryDummy = $;
        $ = jQuery = undefined;
        document.body.innerHTML = "<div id='root'></div>";
        var template = handlebars.compile(result());
        $ = jQuery = jQueryDummy;

        var data = {};

        var $root = $("#root");
        $root.html(template(data));

        expect($root.find(".nav").length).to.equal(1);
    });

    /* Test End */
    /* Test Start */

    it("Expect Logo to exist, when provided", function() {
        var jQueryDummy = $;
        $ = jQuery = undefined;
        document.body.innerHTML = "<div id='root'></div>";
        var template = handlebars.compile(result());
        $ = jQuery = jQueryDummy;

        var data = {
            logo: {
                url: "http://telerikacademy.com",
                image: "logo.png"
            },
            items: []
        };

        var $root = $("#root");
        $root.html(template(data));

        var $logoItem = $root.find(".logo.nav-item");

        //Logo li exists
        expect($logoItem.length).to.equal(1);

        var $logoLink = $logoItem.find("a");
        expect($logoLink.attr("href")).to.equal(data.logo.url);
        expect($logoLink.find("img").attr("src")).to.equal(data.logo.image);
    });

    /* Test End */
    /* Test Start */

    it("Expect Logo NOT to exist, when NOT provided", function() {
        var jQueryDummy = $;
        $ = jQuery = undefined;
        document.body.innerHTML = "<div id='root'></div>";
        var template = handlebars.compile(result());
        $ = jQuery = jQueryDummy;

        var data = {
            items: []
        };

        var $root = $("#root");
        $root.html(template(data));

        var $logoItem = $root.find(".logo.nav-item");

        //Logo li exists
        expect($logoItem.length).to.equal(0);
    });

    /* Test End */
    /* Test Start */

    it("Expect outer .nav-items to exist, when no logo", function() {
        var jQueryDummy = $;
        $ = jQuery = undefined;
        document.body.innerHTML = "<div id='root'></div>";
        var template = handlebars.compile(result());
        $ = jQuery = jQueryDummy;

        var data = {
            items: [{
                title: "Academy",
                url: "http://academy.telerik.com"
            }, {
                url: "#/courses",
                title: "Courses"
            }, {
                url: "#/archive",
                title: "Archive"
            }, {
                url: "#/forum",
                title: "Forum"
            }, {
                url: "#/help",
                title: "Help"
            }, {
                url: "#/profile",
                title: "User"
            }]
        };

        var $root = $("#root");
        $root.html(template(data));

        var $outerNavItems = $root.find(".nav > .nav-item");

        expect($outerNavItems.length).to.equal(data.items.length);
    });

    /* Test End */
    /* Test Start */

    it("Expect outer .nav-items to exist, when with logo", function() {
        var jQueryDummy = $;
        $ = jQuery = undefined;
        document.body.innerHTML = "<div id='root'></div>";
        var template = handlebars.compile(result());
        $ = jQuery = jQueryDummy;

        var data = {
            logo: {
                url: "http://telerikacademy.com",
                image: "logo.png"
            },
            items: [{
                title: "Academy",
                url: "http://academy.telerik.com"
            }, {
                url: "#/courses",
                title: "Courses"
            }, {
                url: "#/archive",
                title: "Archive"
            }, {
                url: "#/forum",
                title: "Forum"
            }, {
                url: "#/help",
                title: "Help"
            }, {
                url: "#/profile",
                title: "User"
            }]
        };

        var $root = $("#root");
        $root.html(template(data));

        var $outerNavItems = $root.find(".nav > .nav-item");

        expect($outerNavItems.length).to.equal(data.items.length + 1);
    });

    /* Test End */
    /* Test Start */

    it("Expect outer .nav-items to have the correct titles", function() {
        var jQueryDummy = $;
        $ = jQuery = undefined;
        document.body.innerHTML = "<div id='root'></div>";
        var template = handlebars.compile(result());
        $ = jQuery = jQueryDummy;

        var data = {
            items: [{
                title: "Academy",
                url: "http://academy.telerik.com"
            }, {
                url: "#/courses",
                title: "Courses"
            }, {
                url: "#/archive",
                title: "Archive"
            }, {
                url: "#/forum",
                title: "Forum"
            }, {
                url: "#/help",
                title: "Help"
            }, {
                url: "#/profile",
                title: "User"
            }]
        };

        var $root = $("#root");
        $root.html(template(data));

        var $outerNavItemTitles = $root.find(".nav > .nav-item > a");

        expect($outerNavItemTitles.length).to.equal(data.items.length);

        $outerNavItemTitles.each((index, navItemTitle) => {
            var $navItemTitle = $(navItemTitle);
            expect($navItemTitle.html()).to.equal(data.items[index].title);
        });
    });

    /* Test End */
    /* Test Start */

    it("Expect outer .nav-items to have the correct links", function() {
        var jQueryDummy = $;
        $ = jQuery = undefined;
        document.body.innerHTML = "<div id='root'></div>";
        var template = handlebars.compile(result());
        $ = jQuery = jQueryDummy;

        var data = {
            items: [{
                title: "Academy",
                url: "http://academy.telerik.com"
            }, {
                url: "#/courses",
                title: "Courses"
            }, {
                url: "#/archive",
                title: "Archive"
            }, {
                url: "#/forum",
                title: "Forum"
            }, {
                url: "#/help",
                title: "Help"
            }, {
                url: "#/profile",
                title: "User"
            }]
        };

        var $root = $("#root");
        $root.html(template(data));

        var $outerNavItemTitles = $root.find(".nav > .nav-item > a");

        expect($outerNavItemTitles.length).to.equal(data.items.length);

        $outerNavItemTitles.each((index, navItemTitle) => {
            var $navItemTitle = $(navItemTitle);
            expect($navItemTitle.attr("href")).to.equal(data.items[index].url);
        });
    });

    /* Test End */
    /* Test Start */

    it("Expect nested .subnav to exist, when nested items are provided", function() {
        var jQueryDummy = $;
        $ = jQuery = undefined;
        document.body.innerHTML = "<div id='root'></div>";
        var template = handlebars.compile(result());
        $ = jQuery = jQueryDummy;

        var data = {
            items: [{
                title: "Academy",
                url: "http://academy.telerik.com",
                items: [{
                        title: "This is sample 1",
                        url: "#/this-is-sample-1"
                    },

                    {
                        title: "This is sample 2",
                        url: "#/this-is-sample-2"
                    }
                ]
            }]
        };

        var $root = $("#root");
        $root.html(template(data));

        expect($root.find(".subnav").length).to.be.gte(1);
    });

    /* Test End */
    /* Test Start */

    it("Expect .subnav to exist only when the item has nested items property", function() {
        var jQueryDummy = $;
        $ = jQuery = undefined;
        document.body.innerHTML = "<div id='root'></div>";
        var template = handlebars.compile(result());
        $ = jQuery = jQueryDummy;

        var data = {
            items: [{
                title: "Academy",
                url: "http://academy.telerik.com",
                items: [{
                        title: "This is sample 1",
                        url: "#/this-is-sample-1"
                    },

                    {
                        title: "This is sample 2",
                        url: "#/this-is-sample-2"
                    }
                ]
            }, {
                title: "User",
                url: "#/user"
            }]
        };
        var $root = $("#root");
        $root.html(template(data));

        expect($root.find(".subnav").length).to.equal(1);
    });

    /* Test End */
    /* Test Start */

    it("Expect nested .subnav NOT TO exist, when nested items are NOT provided", function() {
        var jQueryDummy = $;
        $ = jQuery = undefined;
        document.body.innerHTML = "<div id='root'></div>";
        var template = handlebars.compile(result());
        $ = jQuery = jQueryDummy;

        var data = {
            logo: {
                url: "http://telerikacademy.com",
                image: "logo.png"
            },
            items: [{
                title: "Academy",
                url: "http://academy.telerik.com"
            }, {
                url: "#/courses",
                title: "Courses"
            }, {
                url: "#/archive",
                title: "Archive"
            }, {
                url: "#/forum",
                title: "Forum"
            }, {
                url: "#/help",
                title: "Help"
            }, {
                url: "#/profile",
                title: "User"
            }]
        };

        var $root = $("#root");
        $root.html(template(data));

        expect($root.find(".subnav").length).to.equal(0);
    });

    /* Test End */
    /* Test Start */

    it("Expect inner .nav-items to exist, when provided", function() {
        var jQueryDummy = $;
        $ = jQuery = undefined;
        document.body.innerHTML = "<div id='root'></div>";
        var template = handlebars.compile(result());
        $ = jQuery = jQueryDummy;

        var data = {
            items: [{
                title: "Academy",
                url: "http://academy.telerik.com",
                items: [{
                        title: "This is sample 1",
                        url: "#/this-is-sample-1"
                    },

                    {
                        title: "This is sample 2",
                        url: "#/this-is-sample-2"
                    }
                ]
            }]
        };
        var $root = $("#root");
        $root.html(template(data));

        expect($root.find(".subnav .nav-item").length).to.equal(data.items[0].items.length);
    });

    /* Test End */
    /* Test Start */

    it("Expect inner .nav-items to have the correct titles", function() {
        var jQueryDummy = $;
        $ = jQuery = undefined;
        document.body.innerHTML = "<div id='root'></div>";
        var template = handlebars.compile(result());
        $ = jQuery = jQueryDummy;

        var data = {
            items: [{
                title: "Academy",
                url: "http://academy.telerik.com",
                items: [{
                        title: "This is sample 1",
                        url: "#/this-is-sample-1"
                    },

                    {
                        title: "This is sample 2",
                        url: "#/this-is-sample-2"
                    }
                ]
            }]
        };
        var $root = $("#root");
        $root.html(template(data));

        var $subnavItemLinks = $root.find(".subnav .nav-item a");
        expect($subnavItemLinks.length).to.equal(data.items[0].items.length);
        $subnavItemLinks.each((index, subnavItemLink) => {
            var $subnavItemLink = $(subnavItemLink);
            expect($subnavItemLink.html()).to.equal(data.items[0].items[index].title);
        });
    });

    /* Test End */
    /* Test Start */

    it("Expect inner .nav-items to have the correct links", function() {
        var jQueryDummy = $;
        $ = jQuery = undefined;
        document.body.innerHTML = "<div id='root'></div>";
        var template = handlebars.compile(result());
        $ = jQuery = jQueryDummy;

        var data = {
            items: [{
                title: "Academy",
                url: "http://academy.telerik.com",
                items: [{
                        title: "This is sample 1",
                        url: "#/this-is-sample-1"
                    },

                    {
                        title: "This is sample 2",
                        url: "#/this-is-sample-2"
                    }
                ]
            }]
        };
        var $root = $("#root");
        $root.html(template(data));

        var $subnavItemLinks = $root.find(".subnav .nav-item a");
        expect($subnavItemLinks.length).to.equal(data.items[0].items.length);
        $subnavItemLinks.each((index, subnavItemLink) => {
            var $subnavItemLink = $(subnavItemLink);
            expect($subnavItemLink.attr("href")).to.equal(data.items[0].items[index].url);
        });
    });

    /* Test End */
    /* Test Start */

    it("Expect inner .nav-items to have the correct titles with multiple .subnav elements", function() {
        var jQueryDummy = $;
        $ = jQuery = undefined;
        document.body.innerHTML = "<div id='root'></div>";
        var template = handlebars.compile(result());
        $ = jQuery = jQueryDummy;

        var data = {
            items: [{
                title: "Academy 1",
                url: "http://academy.telerik.com",
                items: [{
                        title: "This is sample 11",
                        url: "#/this-is-sample-11"
                    },

                    {
                        title: "This is sample 12",
                        url: "#/this-is-sample-12"
                    }
                ]
            }, {
                title: "Academy 2",
                url: "http://academy.telerik.com",
                items: [{
                        title: "This is sample 21",
                        url: "#/this-is-sample-21"
                    },

                    {
                        title: "This is sample 22",
                        url: "#/this-is-sample-22"
                    }
                ]
            }]
        };
        var $root = $("#root");
        $root.html(template(data));

        var $subnavs = $root.find(".subnav");

        expect($subnavs.length).to.equal(data.items.length);

        $subnavs.each((sindex, subnav) => {
            var $subnav = $(subnav);

            var $navItems = $subnav.find(".nav-item");
            expect($navItems.length).to.equal(data.items[sindex].items.length);

            $navItems.each((index, navItem) => {
                var $link = $(navItem).find("a");
                expect($link.html()).to.equal(data.items[sindex].items[index].title);
            });
        });
    });

    /* Test End */
    /* Test Start */

    it("Expect inner .nav-items to have the correct links with multiple .subnav elements", function() {
        var jQueryDummy = $;
        $ = jQuery = undefined;
        document.body.innerHTML = "<div id='root'></div>";
        var template = handlebars.compile(result());
        $ = jQuery = jQueryDummy;

        var data = {
            items: [{
                title: "Academy 1",
                url: "http://academy.telerik.com",
                items: [{
                        title: "This is sample 11",
                        url: "#/this-is-sample-11"
                    },

                    {
                        title: "This is sample 12",
                        url: "#/this-is-sample-12"
                    }
                ]
            }, {
                title: "Academy 2",
                url: "http://academy.telerik.com",
                items: [{
                        title: "This is sample 21",
                        url: "#/this-is-sample-21"
                    },

                    {
                        title: "This is sample 22",
                        url: "#/this-is-sample-22"
                    }
                ]
            }]
        };

        var $root = $("#root");
        $root.html(template(data));

        var $subnavs = $root.find(".subnav");

        expect($subnavs.length).to.equal(data.items.length);

        $subnavs.each((sindex, subnav) => {
            var $subnav = $(subnav);

            var $navItems = $subnav.find(".nav-item");
            expect($navItems.length).to.equal(data.items[sindex].items.length);

            $navItems.each((index, navItem) => {
                var $link = $(navItem).find("a");
                expect($link.attr("href")).to.equal(data.items[sindex].items[index].url);
            });
        });
    });

    /* Test End */
});