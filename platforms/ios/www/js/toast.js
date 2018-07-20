class Toast {
    constructor() {

    }
    static save() {	//zeige "Gespeichert!" Meldung für einige Sekunden
        document.querySelector(".loadingPop").classList.add("save");
        setTimeout(function() {
            document.querySelector(".loadingPop").classList.remove("save");
        }, 500)
    }

    static load(){	//zeige Ladeanimation
    	document.querySelector(".loadingPop").classList.add("load");
    }

    static finish() {	//schließe Ladeanimation ab
        document.querySelector(".loadingPop").classList.remove("load");
    }
}