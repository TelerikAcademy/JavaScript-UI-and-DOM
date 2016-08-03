# Steps for building HTML templates

##  Task description

You can find the task description [here](task)

##  Steps for solving the task:

### **Read** the description **Analyze** the problem



### Solve the task


### Format for running tests

```javascript
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
```