class Mensaplan {
    fetchMensaPage(doWithData, whenFailed, asObj) {
        Ajax.getURL(
            "https://www.gsz-zak.de/wp/mensaplan/",
            function(resTxt) {
                doWithData(this.parseMensaContent(resTxt, asObj));
            }.bind(this),
            function() {
                whenFailed();
            }
        );
    }

    parseMensaContent(pageContent, asObj) {
        var parser = new DOMParser();
        var parsedHTML = parser.parseFromString(pageContent, "text/html");
        var array = new Array();
        var newHTML = "";

        [...parsedHTML.getElementsByTagName("p")].forEach(function(element) {
            if (element.innerText.includes("KW")) {
                var weekNr = ((((new Date().getDay() == 0) ? (new Date().getWeekNumber() + 1) : (new Date().getWeekNumber())).toString().length == 1) ? "0" : "") + ((new Date().getDay() == 0) ? (new Date().getWeekNumber() + 1) : (new Date().getWeekNumber()));
                console.log('Mensa WochenNr:', weekNr);
                if (!element.innerText.includes("KW" + weekNr)) {
                    Popup.open("Der Speiseplan wurde noch nicht für diese Woche aktualisiert!");
                }
            } else {
                var dayElements = element.innerText.split("\n\n");

                if (dayElements.length === 3) {
                    var dayName = dayElements[0].replace(":", "");
                    var foodDescription = dayElements[1];
                    var otherInfo = dayElements[2];

                    var formattedDayName = "<h2>" + dayName + "</h2>";
                    var formattedFoodDescription = "<p><b>" + foodDescription + "</b></p>";
                    var formattedOtherInfo = "<p><small>" + otherInfo + "</small></p>";

                    var tempObject = new Object();
                    tempObject.dayName = dayName;
                    tempObject.foodDescription = foodDescription;
                    tempObject.otherInfo = otherInfo;
                    array.push(tempObject);

                    newHTML += formattedDayName + formattedFoodDescription + formattedOtherInfo + "<br>";
                }
            }
        });
        if(asObj){
            return array;
        }
        return newHTML;
    }
}