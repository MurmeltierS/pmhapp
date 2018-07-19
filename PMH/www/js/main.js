class Main {
    constructor() {
        this.settings = (localStorage.getItem('settings') != null) ? localStorage.getItem('settings') : new Settings(); // hole Settings aus dem Storage oder erstelle neues Settingsobjekt

        this.requestMensaplan();
    }


    requestMensaplan() {
    	var mensaplan = new Mensaplan();
        mensaplan.fetchMensaPage(
            function(newHTML) {
                this.displayMensa(newHTML);
            }.bind(this),
            function() {
                Popup.open("Verbindung zur Mensa-Seite fehlgeschlagen!");
            }.bind(this)
        );
    }

    displayMensa(pHtml){
    	document.querySelector('#essen').innerHTML = pHtml;
    }




}