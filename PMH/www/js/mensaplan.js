class Mensaplan {
    fetchMensaPage(doWithData, whenFailed) {
        Ajax.getURL(
            "https://www.gsz-zak.de/wp/mensaplan/",
            function(resTxt) {
                doWithData(this.parseMensaContent(resTxt));
            }.bind(this),
            function() {
                whenFailed();
            }
        );
    }

    parseMensaContent(pageContent) {
        var parser = new DOMParser();
        var parsedHTML = parser.parseFromString(pageContent, "text/html");

        var newHTML = "";

        [...parsedHTML.getElementsByTagName("p")].forEach(function(element) {
            if(element.innerText.includes("KW")) {
                if(!element.innerText.includes("KW" + new Date().getWeekNumber())) {
                    alert("Der Speiseplan wurde noch nicht für diese Woche aktualisiert!");
                }
            } else {
                var dayElements = element.innerText.split("\n\n");

                if(dayElements.length === 3) {
                    var dayName = dayElements[0].replace(":", "");
                    var foodDescription = dayElements[1];
                    var otherInfo = dayElements[2];

                    var formattedDayName = "<h2>" + dayName + "</h2>";
                    var formattedFoodDescription = "<p><b>" + foodDescription + "</b></p>";
                    var formattedOtherInfo = "<p><small>" + otherInfo + "</small></p>";

                    newHTML += formattedDayName + formattedFoodDescription + formattedOtherInfo + "<br>";
                }
            }
        });

        return newHTML;
    }
}