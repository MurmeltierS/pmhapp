class Main{
	constructor(){
		this.settings = (localStorage.getItem('settings') != null) ? localStorage.getItem('settings') : new Settings(); // hole Settings aus dem Storage oder erstelle neues Settingsobjekt
		
		
	}
}