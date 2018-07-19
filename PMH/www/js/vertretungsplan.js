class VertretungsplanMaster {
    constructor(pKlasseVal, pUnterGruppeVal, pNext) {
        this.next = (typeof pNext == "undefined") ? false : pNext; // wenn pNext gegeben uU next true (bedeutet nächste Woche soll bearbeitet werden)
        this.klasseVal = pKlasseVal;
        this.unterGruppeVal = pUnterGruppeVal;
        this.date = new Date();
        this.nextWeekDate = new Date();
        this.nextWeekDate.setDate(this.nextWeekDate.getDate() + 7);
        this.week1 = (((this.date.getDay() == 0) ? (this.date.getWeekNumber() + 1) : (this.date.getWeekNumber()).toString().length == 1) ? "0" : "") + ((this.date.getDay() == 0) ? (this.date.getWeekNumber() + 1) : (this.date.getWeekNumber()));
        this.week2 = (((this.nextWeekDate.getDay() == 0) ? (this.nextWeekDate.getWeekNumber() + 1) : (this.nextWeekDate.getWeekNumber()).toString().length == 1) ? "0" : "") + ((this.nextWeekDate.getDay() == 0) ? (this.nextWeekDate.getWeekNumber() + 1) : (this.nextWeekDate.getWeekNumber()));
        return new Promise(function(resolve, reject) { this.handle(resolve, reject); }.bind(this));
    }

    handle(resolve, reject) {
        if (!this.next) {
            new Vertretungsplan(this.week1, this.klasseVal).req().then(function(plan1) {
                this.plan1 = plan1;
                if (this.unterGruppeVal != "0") {
                    new Vertretungsplan(this.week1, this.unterGruppeVal).req().then(function(plan2) {
                        this.plan2 = plan2;
                        resolve(VertretungsplanMaster.merge(this.plan1, this.plan2));
                    }.bind(this));
                } else {
                    resolve(this.plan1);
                }
            }.bind(this));
        } else {
            new Vertretungsplan(this.week2, this.klasseVal).req().then(function(plan1) {
                this.plan1 = plan1;
                if (this.unterGruppeVal != "0") {
                    new Vertretungsplan(this.week2, this.unterGruppeVal).req().then(function(plan2) {
                        this.plan2 = plan2;
                        resolve(VertretungsplanMaster.merge(this.plan1, this.plan2));
                    }.bind(this));
                } else {
                	resolve(this.plan1);
                }
            }.bind(this));
        }
    }

    static draw(pPlan) {
        var data = pPlan.data;
        for (var i = 0; i < data.length; i++) {
            document.querySelector("#day" + i + " table").innerHTML = "";
            for (var j = 0; j < data[i].length; j++) {

                if (data[i][j].length == 1) {
                    document.querySelector("#day" + i + " table").innerHTML += "<tr><td>" + data[i][j][1] + "</tr></td>";
                } else {

                    var moreInfo = "";
                    var margin = 0;
                    while (data[i].length > (j + margin) || margin == 0) {
                        if (data[i][j + margin][1].replace(/&nbsp;/gi, '') == "" || margin == 0) {
                            moreInfo += " " + data[i][j + margin][6];
                            margin++;
                        } else {
                            break;
                        }
                    }

                    document.querySelector("#day" + i + " table").innerHTML += (
                        "<tr>" +
                        "<td class=\"stunde\">" +
                        data[i][j][1] +
                        "</td>" +
                        "<td class=\"fach\">" +
                        data[i][j][2] +
                        "</td>" +
                        "<td style=\"display:none;\">" +
                        data[i][j][4] +
                        "</td>" +
                        "<td class=\"verTyp\">" +
                        data[i][j][5] +
                        "</td>" +
                        "<td style=\"text-align: right; font-size: 28px; color: #F24137;\" onclick=\"openPop('<h1>" + data[i][j][2] + "</h1><h2>" + data[i][j][4].replace("→", " → ") + "</h2><br>" + data[i][j][5] + "<br>" + moreInfo

                        +
                        "')\">" +
                        "<i " + ((moreInfo.replace(/&nbsp;/g, '').replace(/\s*/g, '') != "" || data[i][j][4].match(/→/g) != null) ? (moreInfo) : (moreInfo + " style=\"color:#ada6a6;\" ")) + " class=\"ion-ios-information-outline\"></i>" +
                        "</td>" +
                        "</tr>"
                    );
                }
            }
        }
    }

    static convertValToId(pVal) { //fügt die Nötige Anzahl an "Füllnullen" hinzu um zur Form "00326" zu kommen
        var val = pVal.toString();
        var zeros = "";
        for (var i = 0; i < 5 - val.length; i++) {
            zeros = zeros + "0";
            console.log(zeros);
        }

        var id = "" + (zeros) + (val.toString());

        return id;
    }

    static clear(pPlan) { // entfernt fehlerhafte Lehre Array-Einträge die vom Parsen verursacht werden können
        for (var i = 0; i < pPlan.data.length; i++) {
            for (var k = 0; k < pPlan.data[i].length; k++) {
                if (pPlan.data[i][k].length == 0) {
                    pPlan.data[i].splice(k, 1);
                }

            }
        }

    }

    static merge(pPlan1, pPlan2) { // merges pPlan2 into pPlan1 and returns new Plan
        var plan1 = pPlan1.data.slice(0); // clone pPlan1
        var plan2 = pPlan2.data.slice(0); // clone pPlan2
        try {
            for (var i = 0; i < plan1.length; i++) {
                if (plan1[i][0].length == 1) {
                    plan1[i] = plan2[i];
                } else {
                    for (var k = 0; k < plan2[i].length; k++) {
                        if (plan2[i][k].length > 1) {
                            plan1[i].push(plan2[i][k]);
                        }
                    }
                }

            }
            return new Vertretungsplan(plan1.KW, "merged", plan1);
        } catch (err) {
            Popup.open(err);
        }
    }


}



class Vertretungsplan {

    constructor(pKW, pKlasseVal, pData) {

        if (pKlasseVal == "merged") { // wenn Vertretungsplan gemerged, überspringe das erhalten von Daten
            this.data = pData;
            return this;
        }

        this.KW = pKW; // bereits in form "07" bzw "03";
        this.klasseId = VertretungsplanMaster.convertValToId(pKlasseVal);
        this.rawHtml;
        this.data;
    }

    parse(pData) {
        //console.log(data);
        var temp;

        temp = pData.replace(/<\/?span[^>]*>/g, "");
        temp = temp.replace(/<td[^>]*>/g, "<td>");
        temp = temp.replace(/<\/table>/g, "\uE000");

        var days = temp.match(/<table class="subst"[^\uE000]*/g);

        temp = temp.replace(/<table border="3"[^>]*>/g, "\uE001");
        var dayInfo = temp.match(/<a name="\d"[^\uE001\uE000]*\uE001[^\uE000]*\uE000/g);

        var data = new Array();

        for (var i = 0; i < days.length; i++) {
            data[i] = new Array();
            var tr = new Array();
            days[i] = days[i].replace(/<\/tr>/g, "</tr>\n");
            tr = days[i].match(/<tr.*<\/tr>/g);

            for (var j = 0; j < tr.length; j++) {
                data[i][j] = new Array();
                tr[j] = tr[j].replace(/<\/td>/g, "<\/td>\n");

                var td = tr[j].match(/<td.*<\/td>/g);
                if (td == null) td = new Array();

                for (var k = 0; k < td.length; k++) {
                    data[i][j][k] = td[k].replace(/<\/?td>/g, "");
                }
            }
        }
        console.log(data);
        this.resolve(this);
        return data;
    }

    req() {
        return new Promise(function(resolve, reject) {
            this.resolve = resolve;
            this.reject = reject;
            this.ajax();
        }.bind(this)); //gibt promise zurück die resolvt wird wenn Daten erhalten und geparsed sind
    }

    ajax() {
        Ajax.getURL("http://intern.gsz-zak.de/Vertretungsplan/w/" + this.KW + "/w" + this.klasseId + ".htm",
            function(data) {
                this.data = this.parse(data);
                VertretungsplanMaster.clear(this);

            }.bind(this),
            function(err) {
                this.reject();
                Popup.open(err);
            }.bind(this));
    }
}