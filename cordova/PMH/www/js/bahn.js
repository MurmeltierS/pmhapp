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
    	//alert(document.querySelector("#bahnFrame").contentWindow.window.document.querySelector("tbody").innerHTML);
        document.querySelector("#bahn").innerHTML = ("<table><th>Abfahrt</th><th>Ziel</th>") + document.querySelector("#bahnFrame").contentWindow.window.document.querySelector("tbody").innerHTML + "</table>"
    	//search for tripMessage with not &nbsp;

    	var tr = document.querySelector("#bahn").querySelectorAll("tr");

    	for (var i = 0; i < tr.length; i++) {
    		var msg = tr[i].querySelector(".tripMessage").innerHTML;

    		if(msg != "&nbsp;"&&msg != ""){
    			//alert(msg);
    			tr[i].querySelectorAll("td")[1].innerHTML += "<br>"+msg;
    		}
    	}
    	

    }
}