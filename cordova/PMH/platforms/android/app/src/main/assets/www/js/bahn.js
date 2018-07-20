class Bahn {
    construcor() {

    }

    static init() {
        document.querySelector('#bahnFrame').onload = function() {
            setInterval(function() {
                Bahn.update();
            }, 5000);
        }.bind(this);

    }

    static update() {
        var cr = 0;

        //alert(document.querySelector("#bahnFrame").contentWindow.window.document.querySelector("tbody").innerHTML);
        document.querySelector("#bahn").innerHTML = ("<table><th>Abfahrt</th><th>Ziel</th>") + document.querySelector("#bahnFrame").contentWindow.window.document.querySelector("tbody").innerHTML + "</table>"
        //search for tripMessage with not &nbsp;
        cr++;
        /*
        var tr = document.querySelector("#bahn").querySelectorAll("tr");
        cr++;
        for (var i = 1; i < tr.length; i++) {
            try {
                var msg = tr[i].querySelector(".tripMessage").innerText;
                cr++;
                if (msg != "" && msg != "\u00A0" && msg != " ") {
                    alert("'"+msg+"'");
                    alert(msg == "");
                    alert( msg == "\u00A0");
                    tr[i].querySelectorAll("td")[1].innerHTML += '<div style="float:right" onclick="Popup.open(\'' + msg + '\')"><i style="font-size:1.1rem;color:#F24137;" class="ion-ios-information-outline"></i></div>';

                } else {
                    tr[i].querySelector("td")[1].innerHTML += '<div style="float:right"><i &nbsp;="" style="float:right;font-size:1.1rem;color:#ada6a6;" class="ion-ios-information-outline"></i></div>';
                }
            } catch (e) {
                Popup.open(e);
            }
            */
        }


    }
}