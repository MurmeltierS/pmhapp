class KlassenMaster {
    constructor() {

    }

    static loadKlassenIntoSelect(pKlassenListe) {
        var select = document.querySelector("#selCl");
        select.innerHTML = '<option value="0" disabled="" selected="">Klasse</option>';
        select.onchange = main.changeKlasse.bind(main);
        for (var i = 0; i < pKlassenListe.klassen.length; i++) {
            select.innerHTML += '<option value="' + pKlassenListe.klassen[i].val + '">' + pKlassenListe.klassen[i].name + '</option>';
        }
        
        

    }

    static loadCurrentUnterGruppen(pKlassenListe) {
    	var unterSelect = document.querySelector("#selUn");
    	unterSelect.innerHTML = '<option value="0" disabled="" selected="">Untergruppe</option>';
    	unterSelect.onchange = main.changeUnterGruppe.bind(main);
        var i = 0;
        var klasseVal = document.querySelector("#selCl").value;
        console.log(klasseVal);
        while (i < pKlassenListe.klassen.length && klasseVal != pKlassenListe.klassen[i].val) {
            i++;
        }
        if (klasseVal == pKlassenListe.klassen[i].val) {
            for (var k = 0; k < pKlassenListe.klassen[i].unterGruppen.length; k++) {
                unterSelect.innerHTML += '<option value="' + pKlassenListe.klassen[i].unterGruppen[k].val + '">' +  pKlassenListe.klassen[i].unterGruppen[k].name.replace(pKlassenListe.klassen[i].name,"") + '</option>';
            }
        }

        
    }


}

class KlassenListe {
    constructor() {
        this.klassen = [];
    }


    requestListe() {
        return new Promise(function(resolve, reject) {
            Ajax.getURL("https://intern.gsz-zak.de/Vertretungsplan/frames/navbar.htm").then(function(data) {
                this.createListFromArray(this.parseListe(data));
                this.detectUnterGruppen();
                resolve(this);
            }.bind(this));
        }.bind(this));
    }

    parseListe(pRaw) {
        var temp = /var\sclasses\s=\s\[([^\]]*)\]/g.exec(pRaw)[1]; //extrahiere den inhalt von var classes aus der navbar
        temp = temp.replace(/"|'|\s/g, '');
        var array = temp.split(",");
        return array;
    }

    createListFromArray(pArray) {
        this.klassen = [];
        for (var i = 0; i < pArray.length; i++) {
            this.klassen.push(new Klasse(pArray[i], (i + 1)));
        }
    }

    detectUnterGruppen() {
        var i = 0;
        var counter = -1;
        var lastKlasse = 0;
        var temp = [];
        while (i < this.klassen.length) {
            if (new RegExp(this.klassen[lastKlasse].name + ".", "g").test(this.klassen[i].name)) {
                temp[counter].addUnterGruppe(this.klassen[i]);
            } else {
                counter++;
                temp.push((this.klassen[i]));
                lastKlasse = i;

            }
            i++;
        }

        this.klassen = temp;

    }
}


class Klasse {
    constructor(pName, pVal) {
        this.name = pName;
        this.val = pVal;
        this.unterGruppen = [];
    }

    addUnterGruppe(pKlasse) {
        this.unterGruppen.push(pKlasse);
    }
}