function TestJs (output) {
    function log(text) {
        window.console.log(text);
    };
    function error(text) {
        window.console.error(text);
    };
    function info(text) {
        window.console.info(text);
    };
    function clear() {
        window.console.clear();
    };
    var Test = {};
    var testConsole = {
        init: function () {
        },
        print: function (text) {
            log(text);
        },
        error: function (text) {
            error(text);
        },
        info: function (text) {
            info(text);
        },
        clear: function () {
            clear();
        }
    };
    var testDocument = {
        init: function () {
            var stylesheet = document.createElement("link");
            stylesheet.setAttribute("rel", "stylesheet");
            stylesheet.setAttribute("type", "text/css");
            stylesheet.setAttribute("href", "TestJs/TestJs.css");
            document.getElementsByTagName("head")[0].appendChild(stylesheet);
            
            var ul = document.getElementById("tests");
            if (ul) {
                this.ul = ul;
            } else {
                this.ul = document.createElement("ul");
                this.ul.setAttribute("id", "tests");
                document.getElementsByTagName("body")[0].appendChild(this.ul);
            }
        },
        li: function (text, css_class) {
            var li = document.createElement("li");
            if (css_class) {
                li.setAttribute("class", css_class);
            }
            li.textContent = text;
            this.ul.appendChild(li);
        },
        print: function (text) {
            this.li(text);
        },
        error: function (text) {
            this.li(text, "error");
        },
        info: function (text) {
            this.li(text, "info");
        },
        clear: function () {
            this.ul.innerHTML = "";
        }   
    };
    switch (output) {
        case "console":
            Test.output = testConsole;
            break;
        case "document":
            Test.output = testDocument;
            break;
        default:
            Test.output = testConsole;
            break;
    }
    Test.output.init();
    Test.assert = function (assertion, value, text) {
        try {
            if (assertion === value) {
                Test.output.print(text + " : Success");
            } else {
                Test.output.error(text + " : Failure (" + assertion + ")");
            }        
        }
        catch (err) {
            Test.output.error(text + " : Failure (" + err + ")");
        }
    };
    Test.info = function (text) {
        Test.output.info(text);
    };
    Test.clear = function () {
        Test.output.clear();
    };
    return Test;
};