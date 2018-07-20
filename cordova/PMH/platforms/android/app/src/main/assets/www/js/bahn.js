class Bahn {
    construcor() {

    }

    static init() {
        document.querySelector('#bahnFrame').onload = function() {
            setTimeout(function() {
                Bahn.update();
            }, 5000);
        }.bind(this);

    }

    static update() {
        document.querySelector("#bahn").innerHTML = ("<table><th>Abfahrt</th><th>Ziel</th>") + document.querySelector("#bahnFrame").contentWindow.window.querySelector("tbody").innerHTML + "</table>"
    }
}