class Theme {
    constructor() {

    }

    static changeTheme(pTheme) {
        document.body.setAttribute("theme", pTheme);
        if(pTheme == "dark"){
        	StatusBar.backgroundColorByHexString("#1d1d1d");
        	RecentsControl.setColor("#1d1d1d")
        }else{
        	StatusBar.backgroundColorByHexString("#ffffff");
        	RecentsControl.setColor("#ffffff");
        }
    }
}