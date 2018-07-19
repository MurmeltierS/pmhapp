class KlassenMaster{
	constructor(){

	}



	
}

class KlassenListe{
	constructor(){
		this.klassen = [];
	}


	requestListe(){
		Ajax.getURL("https://intern.gsz-zak.de/Vertretungsplan/frames/navbar.htm").then(function(data){
			this.createListFromArray(this.parseListe(data));
		}.bind(this));
	}

	parseListe(pRaw){
		var temp = /var\sclasses\s=\s\[([^\]]*)\]/g.exec(pRaw)[1]; //extrahiere den inhalt von var classes aus der navbar
		temp = temp.replace(/"|'|\s/g,'');
		var array = temp.split(",");
		return array;
	}

	createListFromArray(pArray){
		this.klassen = [];
		for (var i = 0; i < pArray.length; i++) {
			this.klassen.push(new Klasse(pArray[i], (i+1)));
		}
	}
}


class Klasse{
	constructor(pName,pVal){
		this.name = pName;
		this.val = pVal;
		this.unterGruppen = [];
	}

	addUnterGruppe(pKlasse){
		this.unterGruppe.push(pKlasse);
	}
}

