class Settings{
	constructor(){
		this.obj = new Object();
		this.obj.klasse = "";
		this.obj.klassenName = "";
		this.obj.unterGruppe = "";
		this.obj.theme = "light";
		if(localStorage.getItem('settings') != null){
			this.obj = JSON.parse(localStorage.getItem('settings'));
		}
	}

	setKlasse(pKlasse){
		this.obj.klasse = pKlasse;
		this.save();
	}

	setKlassenName(pKlassenName){
		this.obj.klassenName = pKlassenName;
		this.save();
	}

	setUnterGruppe(pUnterGruppe){
		this.obj.unterGruppe = pUnterGruppe;
		this.save();
	}

	setTheme(pTheme){
		this.obj.theme = pTheme;
		Theme.changeTheme(this.theme);
		this.save();
	}

	get klassenName(){
		return this.obj.klassenName;
	}

	get klasse(){
		return this.obj.klasse;
	}

	get unterGruppe(){
		return this.obj.unterGruppe;
	}

	get theme(){
		return this.obj.theme;
	}

	save(){
		localStorage.setItem('settings', JSON.stringify(this.obj));
	}

}

