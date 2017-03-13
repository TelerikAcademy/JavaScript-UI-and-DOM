/* globals Handlebars document solve */

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
        title: "Courses",
        items: [{
            title: "HTML Basics",
            url: "#/html-basics"
        }, {
            title: "CSS Styling",
            url: "#/css-styling"
        }, {
            title: "JavaScript Fundamentals",
            url: "#/jsf"
        }, {
            title: "JavaScript UI & DOM",
            url: "#/js-ui-dom"
        }, {
            title: "JavaScript OOP",
            url: "#/js-opp"
        }, {
            title: "JavaScript Application",
            url: "#/js-apps"
        }]
    }, {
        url: "#/archive",
        title: "Archive"
    }, {
        url: "#/forum",
        title: "Forum",
        items: [{
            title: "Web",
            url: "#/web"
        }, {
            title: "Mobile",
            url: "#/mobile"
        }, {
            title: "Core",
            url: "#/core"
        }, {
            title: "Embeded",
            url: "#/embeded"
        }, {
            title: "Algorithms",
            url: "#/algorithms"
        }]
    }, {
        url: "#/help",
        title: "Help"
    }, {
        url: "#/profile",
        title: "User",
        items: [{
            title: "Profile",
            url: "#/profime"
        }, {
            title: "My courses",
            url: "#/my-courses"
        }, {
            title: "Certificates",
            url: "#/certificates"
        }, {
            title: "Logout",
            url: "#/logout"
        }]
    }]
};

var templateString = solve()();
var handlebars = handlebars || Handlebars;
var template = handlebars.compile(templateString);
document.getElementById("main-header").innerHTML = template(data);