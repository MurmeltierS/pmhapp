class Main {
    constructor() {
        this.settings = new Settings(); // hole Settings aus dem Storage oder erstelle neues Settingsobjekt
        this.requestMensaplan();
        this.klassenListe = new KlassenListe();
        this.klassenListe.requestListe().then(function(e) {
            KlassenMaster.loadKlassenIntoSelect(e);
            if (main.settings.klasse != "") {
                document.querySelector("#selCl").value = main.settings.klasse;
                KlassenMaster.loadCurrentUnterGruppen(this.klassenListe);
            }
            if (main.settings.unterGruppe != "") {
                document.querySelector("#selUn").value = main.settings.unterGruppe;
            }
        }.bind(this));
        Bahn.init();
        document.querySelector(".spsh").classList.add("dnone");
    }

    requestVertretungsplan() {
        Toast.load();
        VertretungsplanMaster.prepare();
        if (parseInt(this.settings.klasse)) {
            if (parseInt(this.settings.unterGruppe)) {
                new VertretungsplanMaster(this.settings.klasse, this.settings.unterGruppe, false).then(function(pPlan) {
                    VertretungsplanMaster.draw(pPlan, false);
                    new VertretungsplanMaster(this.settings.klasse, this.settings.unterGruppe, true).then(function(pPlanN) {
                        VertretungsplanMaster.draw(pPlanN, true);
                        Toast.finish();
                    }.bind(this));
                }.bind(this));
            } else {
                new VertretungsplanMaster(this.settings.klasse, 0, false).then(function(pPlan) {
                    VertretungsplanMaster.draw(pPlan, false);
                    new VertretungsplanMaster(this.settings.klasse, 0, true).then(function(pPlanN) {
                        VertretungsplanMaster.draw(pPlanN, true);
                        Toast.finish();
                    }.bind(this));
                }.bind(this));
            }
        }
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

    displayMensa(pHtml) {
        document.querySelector('#essen').innerHTML = pHtml;
    }

    clickToggleTheme() {
        if (main.settings.theme == "dark") {
            main.settings.setTheme('light');
        } else {
            main.settings.setTheme('dark');
        }

        Theme.changeTheme(main.settings.theme);
    }

    changeKlasse() {
        this.settings.setKlasse(document.querySelector("#selCl").value);
        this.settings.setKlassenName(document.querySelector("#selCl").getSelectedText());
        KlassenMaster.loadCurrentUnterGruppen(this.klassenListe);
    }

    changeUnterGruppe() {
        this.settings.setUnterGruppe(document.querySelector("#selUn").value);
    }

    clickSave() {
        this.requestVertretungsplan();
        Slider.slideTo(0);
    }



}