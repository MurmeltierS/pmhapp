class Theme {
    constructor() {

    }

    static changeTheme(pTheme) {
        document.body.setAttribute("theme", pTheme);
    }
}