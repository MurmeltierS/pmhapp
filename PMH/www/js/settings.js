class Settings{
	constructor(){
		this.klasse = "";
		this.unterGruppe = "";
		this.theme = "light";
	}

	setKlasse(pKlasse){
		this.klasse = pKlasse;
	}

	setUnterGruppe(pUnterGruppe){
		this.unterGruppe = pUnterGruppe;
	}

	setTheme(pTheme){
		this.theme = pTheme;
		Theme.changeTheme(this.theme);
	}
}

