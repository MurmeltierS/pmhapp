versionID = 8;

Date.prototype.getWeekNumber = function() {
    var d = new Date(+this);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    return Math.ceil((((d - new Date(d.getFullYear(), 0, 1)) / 8.64e7) + 1) / 7);
};

HTMLSelectElement.prototype.getSelectedText = function() {
    var elt = this;

    if (elt.selectedIndex == -1)
        return null;

    return elt.options[elt.selectedIndex].text;
}


/*

function loadSMV() {
    $.ajax({
            url: "http://78.94.231.65:8524/smv.html?ver=" + versionID,
        })
        .done(function (data) {
            smv(data);
        })
        .fail(function () {
            $.ajax({
                    url: "http://10.128.0.2:8524/smv.html?ver=" + versionID,
                })
                .done(function (data) {
                    smv(data);
                })
                .fail(function () {
                    alert("SMV-Tab konnte nicht geladen werden");
                });
        });


    

}

*/

var weather = new Weather();
weather.fetchFromAPI();

'use strict';

var $swipeTabsContainer = $('.swipe-tabs'),
    $swipeTabs = $('.swipe-tab'),
    $swipeTabsContentContainer = $('.swipe-tabs-container'),
    currentIndex = 0,
    activeTabClassName = 'active-tab';

$swipeTabsContainer.on('init', function(event, slick) {
    $swipeTabsContentContainer.removeClass('invisible');
    $swipeTabsContainer.removeClass('invisible');

    currentIndex = slick.getCurrent();
    $swipeTabs.removeClass(activeTabClassName);
    $('.swipe-tab[data-slick-index=' + currentIndex + ']').addClass(activeTabClassName);
});

$swipeTabsContainer.slick({
    //slidesToShow: 3.25,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    infinite: false,
    swipeToSlide: true,
    touchThreshold: 10
});

$swipeTabsContentContainer.slick({
    asNavFor: $swipeTabsContainer,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    infinite: false,
    swipeToSlide: true,
    draggable: false,
    touchThreshold: 10
});


$swipeTabs.on('click', function(event) {
    // gets index of clicked tab
    currentIndex = $(this).data('slick-index');
    $swipeTabs.removeClass(activeTabClassName);
    $('.swipe-tab[data-slick-index=' + currentIndex + ']').addClass(activeTabClassName);
    $swipeTabsContainer.slick('slickGoTo', currentIndex);
    $swipeTabsContentContainer.slick('slickGoTo', currentIndex);
});

//initializes slick navigation tabs swipe handler
$swipeTabsContentContainer.on('swipe', function(event, slick, direction) {
    currentIndex = $(this).slick('slickCurrentSlide');
    $swipeTabs.removeClass(activeTabClassName);
    $('.swipe-tab[data-slick-index=' + currentIndex + ']').addClass(activeTabClassName);
});



function drawPlan(data, pDel, pNext) {
    if (pNext === true) {

        for (var i = 0; i < data.length; i++) {

            (pDel || ($("#dayN" + i + " table").html() == "<tbody><tr><td>Keine Vertretung</td></tr></tbody>")) ? $("#dayN" + i + " table").html(''): 0;
            try {
                for (var j = 0; j < data[i].length; j = j + 1) {
                    if (data[i][j][1] != undefined && (data[i][j][1] + data[i][j][2] + data[i][j][4] + data[i][j][5]).replace(/&nbsp;/gi, '') != "") {


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

                        $("#dayN" + i + " table").append(
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

                        //console.log(moreInfo.replace(/&nbsp;/g, '').replace(/\s*/g, ''));


                    } else {
                        if (data[i][j].length == 1 && $("#dayN" + i + " table").html() == "")
                            $("#dayN" + i + " table").append("<tr><td>Keine Vertretung</td></tr>");

                    }
                }
            } catch (e) {}
        }

    } else {
        for (var i = 0; i < data.length; i++) {
            (pDel || ($("#day" + i + " table").html() == "<tbody><tr><td>Keine Vertretung</td></tr></tbody>")) ? $("#day" + i + " table").html(''): 0;
            try {

                for (var j = 0; j < data[i].length; j = j + 1) {

                    if (data[i][j][1] != undefined && (data[i][j][1] + data[i][j][2] + data[i][j][4] + data[i][j][5]).replace(/&nbsp;/gi, '') != "") {


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

                        $("#day" + i + " table").append(
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


                    } else {
                        if (data[i][j].length == 1 && $("#day" + i + " table").html() == "")
                            $("#day" + i + " table").append("<tr><td>Keine Vertretung</td></tr>");

                    }
                    //j = j+margin;
                    ////console.log(j);
                }
            } catch (e) {
                //console.log(e.message);
            }
        }
    }
}

function drawInfo(pData, pNext) {



    if (pData != undefined) {
        for (var i = 0; i < pData.length; i++) {
            //console.log("pData:"+pData.length);
            //console.log(pData);
            var dayMatch = /<a name="(\d)"/g;
            var match = dayMatch.exec(pData[i]);
            ////console.log(match[1]);
            var msgData = pData[i].replace(/<\/table>/g, "\ue002");

            console.log(msgData);
            //var msgData = pData[i];


            //console.log(msgData.match(/td/g));
            //var msg = pData[i].match();

            var msgTable = /\ue001([^\ue002]*)/g.exec(msgData)[1];
            msgTable = msgTable.replace(/<\/td>/g, "\ue003")

            ////console.log("MsgData: " + msgTable);

            var msgString = "";
            var re = /\<td>([^\ue003]*)/g;
            var m;
            while (m = re.exec(msgTable)) {
                //console.log(m);
                msgString += "<br>" + m[1];
                //console.log(msgString + match[1]);
            }


            //for (var k = 0; k < /\<td>([^\ue003]*)/g.exec(msgTable).length; k++)


            //$("#day"+((pNext)?("N"):(""))+(match[1] - 1)+" .dayInfo").html(/<td>([^\ue002]*)/g.exec(msgData)[1]);
            $("#day" + ((pNext) ? ("N") : ("")) + (match[1] - 1) + " .dayInfo").html(msgString);


        }
    }


}

function loadPlan(pRaw, pDel, pNext) {

    var raw = pRaw;
    var temp;


    temp = raw.replace(/<\/?span[^>]*>/g, "");
    temp = temp.replace(/<td[^>]*>/g, "<td>");
    temp = temp.replace(/<\/table>/g, "\uE000");

    var days = temp.match(/<table class="subst"[^\uE000]*/g);

    temp = temp.replace(/<table border="3"[^>]*>/g, "\uE001");
    var dayInfo = temp.match(/<a name="\d"[^\uE001\uE000]*\uE001[^\uE000]*\uE000/g);
    //var dayInfo = temp.match(/<a name="\d"[^\uE000]*/g);
    //console.log(dayInfo);

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

    drawPlan(data, pDel, pNext);
    drawInfo(dayInfo, pNext);


}

function convertClId(pClId) {
    var clId = pClId;
    localStorage.setItem('Klasse', document.getElementById('selCl').value);


    var zeros = "";
    for (var i = 0; i < 5 - clId.length; i++) {
        zeros = zeros + "0";
    }

    clId = "" + (zeros) + (clId.toString());

    return clId;
}


function reqPlan() {

    for (i = new Date().getDay() - 2; i >= 0; i--) {
        //console.log("remove day " + i);
        $("#day" + i).addClass('dnone');

    }



    $('.theKlasse').text($("#selCl option:selected").html());

    var days = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
    var curr = new Date();
    var next = new Date();
    next.setDate(next.getDate() + 7);


    for (var i = 0; i < 6; i++) {
        $('#day' + i + ' .dayTitle').text(days[i] + ' ' + new Date(curr.setDate(curr.getDate() - curr.getDay() + 1 + i)).getDate() + '.' + (new Date(curr.setDate(curr.getDate() - curr.getDay() + 1 + i)).getMonth() + 1));
    }

    for (var i = 0; i < 6; i++) {
        $('#dayN' + i + ' .dayTitle').text(days[i] + ' ' + new Date(next.setDate(next.getDate() - next.getDay() + 1 + i)).getDate() + '.' + (new Date(next.setDate(next.getDate() - next.getDay() + 1 + i)).getMonth() + 1));
    }



    setLoad(true);


    //console.log();
    $.ajax({
            url: "http://intern.gsz-zak.de/Vertretungsplan/w/" + (((new Date().getDay() == 0) ? (new Date().getWeekNumber() + 1) : (new Date().getWeekNumber()).toString().length == 1) ? "0" : "") + ((new Date().getDay() == 0) ? (new Date().getWeekNumber() + 1) : (new Date().getWeekNumber())) + "/w" + convertClId($('#selCl').find(":selected").val()) + ".htm",
        })
        .done(function(data) {

            loadPlan(data, true);
            if ($('#selUn option:selected').val() != "x") {
                //console.log("Untergruppe erkannt!");
                $.ajax({
                        url: "http://intern.gsz-zak.de/Vertretungsplan/w/" + (((new Date().getDay() == 0) ? (new Date().getWeekNumber() + 1) : (new Date().getWeekNumber()).toString().length == 1) ? "0" : "") + ((new Date().getDay() == 0) ? (new Date().getWeekNumber() + 1) : (new Date().getWeekNumber())) + "/w" + convertClId($('#selUn').find(":selected").val()) + ".htm",
                    })
                    .done(function(data) {
                        loadPlan(data, false);
                        setLoad(false);

                    });
            } else {
                setLoad(false);
            }



        });

    //next week
    $.ajax({
            url: "http://intern.gsz-zak.de/Vertretungsplan/w/" + (((next.getDay() == 0) ? (next.getWeekNumber() + 1) : (next.getWeekNumber()).toString().length == 1) ? "0" : "") + ((next.getDay() == 0) ? (next.getWeekNumber() + 1) : (next.getWeekNumber())) + "/w" + convertClId($('#selCl').find(":selected").val()) + ".htm",
        })
        .done(function(data) {

            loadPlan(data, true, true);
            if ($('#selUn option:selected').val() != "x") {
                //console.log("Untergruppe erkannt!");
                $.ajax({
                        url: "http://intern.gsz-zak.de/Vertretungsplan/w/" + (((next.getDay() == 0) ? (next.getWeekNumber() + 1) : (next.getWeekNumber()).toString().length == 1) ? "0" : "") + ((next.getDay() == 0) ? (next.getWeekNumber() + 1) : (next.getWeekNumber())) + "/w" + convertClId($('#selUn').find(":selected").val()) + ".htm",
                    })
                    .done(function(data) {
                        loadPlan(data, false, true);
                        setLoad(false);

                    });
            } else {
                setLoad(false);
            }



        });
}


function krankMail(pPerson, pMail) {
    window.open('mailto:' + pMail + '?subject=Krankmeldung&body=' + encodeURI('Sehr geehrte Frau ' + pPerson + ',\r\n\r\nich bitte mein krankheitsbedingtes Fehlen zu entschuldigen. Leider ist es mir heute nicht m\u00F6glich\r\nden Unterricht zu besuchen.\r\n\r\nIch bitte Sie, meinen Klassenlehrer und\/oder Fachlehrer zu informieren.\r\n\r\nMit freundlichen Gr\u00FC\u00DFen\r\n' + vorName + ' ' + nachName), '_self');
}

if (localStorage.getItem('first2') != null) {
    //reqPlan();
}

function smv(data) {
    document.getElementById('news').innerHTML = data;
}

function mensa(data) {
    document.getElementById('essen').innerHTML = data;
}

function saveInfo() {
    setSave();
    //localStorage.setItem("vorName", document.getElementById('INvorName').value);
    //localStorage.setItem("nachName", document.getElementById('INnachName').value);
    //vorName = localStorage.getItem("vorName");
    //nachName = localStorage.getItem("nachName");
    //loadSMV();
    currentIndex = 0;
    $swipeTabs.removeClass(activeTabClassName);
    $('.swipe-tab[data-slick-index=' + currentIndex + ']').addClass(activeTabClassName);
    $swipeTabsContainer.slick('slickGoTo', currentIndex);
    $swipeTabsContentContainer.slick('slickGoTo', currentIndex);
    localStorage.setItem('first2', 'on');
}


//Mängelmelder Momentan Inaktiv
function sendM() {

    setLoad(true);


    $.ajax({
        type: "POST",
        url: "maeng.php",
        data: new FormData($('#mae')[0]),
        processData: false,
        contentType: false,
        success: function(data) {

            setLoad(false);
        }
    });
}


function setLoad(p) {
    // var nope = (p) ? $(".loadingPop").addClass("load") : $(".loadingPop").removeClass("load");
}

function setSave() {
    $(".loadingPop").addClass("save");
    setTimeout(function() {
        $(".loadingPop").removeClass("save");
    }, 500)
}

//loadSMV();

if (localStorage.getItem('first2') == null) {
    currentIndex = 5;
    $swipeTabs.removeClass(activeTabClassName);
    $('.swipe-tab[data-slick-index=' + currentIndex + ']').addClass(activeTabClassName);
    $swipeTabsContainer.slick('slickGoTo', currentIndex);
    $swipeTabsContentContainer.slick('slickGoTo', currentIndex);

}

function changeKlasse() {
    reqPlan();

    $('#selUn').html($('#selUnSave').html());
    $('#selUn').val('x');
    localStorage.setItem('UnKlasse', $('#selUn option:selected').val());

    ermittleUnKlassen();

}

function changeUnKlasse() {

    localStorage.setItem('UnKlasse', $('#selUn option:selected').val());

    reqPlan();

}





function ermittleUnKlassen() {

    $('#selUn option').addClass('dnone');

    //Ermittle Untergruppen
    var i = parseInt($("#selCl option:selected").val()) + 1;
    //console.log("i:" + i);
    //console.log(($('#selUn option[value="' + i + '"]').text()));
    while (($('#selUn option[value="' + i + '"]').text().match(new RegExp($("#selCl option:selected").text(), 'g')) != null)) {

        $('#selUn option[value="' + i + '"]').removeClass('dnone');

        if ($('#selUn option[value="' + i + '"]').text().match(new RegExp($("#selCl option:selected").text(), 'g')) == null || $('#selUn option[value="' + i + '"]').text() == $("#selCl option:selected").text()) {
            $('#selUn option[value="' + i + '"]').addClass('dnone');

        } else {
            $('#selUn option[value="' + i + '"]').html($('#selUn option[value="' + i + '"]').html().replace($("#selCl option:selected").text(), ''));
            $('#selUn option[value="' + i + '"]').removeClass('dnone');

        }
        i++;
    }
}

//ermittleUnKlassen();

$(".spsh").addClass("dnone");


function toggleTheme() {



    if (localStorage.getItem('theme') == "dark") {
        localStorage.setItem('theme', 'light');
    } else {
        localStorage.setItem('theme', 'dark');
    }

    //console.log(localStorage.getItem('theme'));

    changeTheme();

}

function updateBahn() {
    $('#bahn').html("<table><th>Abfahrt</th><th>Ziel</th>" + $("#bahnFrame").contents().find("tbody").html() + "</table>");
    //$("#bahnFrame").remove();
}

function changeTheme() {


    $('body').attr("theme", localStorage.getItem('theme'));

}


$('#bahnFrame').load(function() {
    setTimeout(function() {
        updateBahn();
    }, 5000);
});

function showPrivacyPolicy() {
    document.getElementById('privacyPolicy').innerHTML = "<br><br><br><br><br><br><br><hr><br><h2>Datenschutzerklärung</h4><p>Wir freuen uns sehr über Ihr Interesse an unserem Unternehmen. Datenschutz hat einen besonders hohen Stellenwert für die Geschäftsleitung der Philipp-Matthäus-Hahn-Schule. Eine Nutzung der Internetseiten der Philipp-Matthäus-Hahn-Schule ist grundsätzlich ohne jede Angabe personenbezogener Daten möglich. Sofern eine betroffene Person besondere Services unseres Unternehmens über unsere Internetseite in Anspruch nehmen möchte, könnte jedoch eine Verarbeitung personenbezogener Daten erforderlich werden. Ist die Verarbeitung personenbezogener Daten erforderlich und besteht für eine solche Verarbeitung keine gesetzliche Grundlage, holen wir generell eine Einwilligung der betroffenen Person ein.</p><p>Die Verarbeitung personenbezogener Daten, beispielsweise des Namens, der Anschrift, E-Mail-Adresse oder Telefonnummer einer betroffenen Person, erfolgt stets im Einklang mit der Datenschutz-Grundverordnung und in Übereinstimmung mit den für die Philipp-Matthäus-Hahn-Schule geltenden landesspezifischen Datenschutzbestimmungen. Mittels dieser Datenschutzerklärung möchte unser Unternehmen die Öffentlichkeit über Art, Umfang und Zweck der von uns erhobenen, genutzten und verarbeiteten personenbezogenen Daten informieren. Ferner werden betroffene Personen mittels dieser Datenschutzerklärung über die ihnen zustehenden Rechte aufgeklärt.</p><p>Die Philipp-Matthäus-Hahn-Schule hat als für die Verarbeitung Verantwortlicher zahlreiche technische und organisatorische Maßnahmen umgesetzt, um einen möglichst lückenlosen Schutz der über diese Internetseite verarbeiteten personenbezogenen Daten sicherzustellen. Dennoch können Internetbasierte Datenübertragungen grundsätzlich Sicherheitslücken aufweisen, sodass ein absoluter Schutz nicht gewährleistet werden kann. Aus diesem Grund steht es jeder betroffenen Person frei, personenbezogene Daten auch auf alternativen Wegen, beispielsweise telefonisch, an uns zu übermitteln.</p><br><h2>1. Begriffsbestimmungen</h4><p>Die Datenschutzerklärung der Philipp-Matthäus-Hahn-Schule beruht auf den Begrifflichkeiten, die durch den Europäischen Richtlinien- und Verordnungsgeber beim Erlass der Datenschutz-Grundverordnung (DS-GVO) verwendet wurden. Unsere Datenschutzerklärung soll sowohl für die Öffentlichkeit als auch für unsere Kunden und Geschäftspartner einfach lesbar und verständlich sein. Um dies zu gewährleisten, möchten wir vorab die verwendeten Begrifflichkeiten erläutern.</p><p>Wir verwenden in dieser Datenschutzerklärung unter anderem die folgenden Begriffe:</p><ul style=\"list-style: none\"><li><br><h2>a)    personenbezogene Daten</h4><p>Personenbezogene Daten sind alle Informationen, die sich auf eine identifizierte oder identifizierbare natürliche Person (im Folgenden „betroffene Person“) beziehen. Als identifizierbar wird eine natürliche Person angesehen, die direkt oder indirekt, insbesondere mittels Zuordnung zu einer Kennung wie einem Namen, zu einer Kennnummer, zu Standortdaten, zu einer Online-Kennung oder zu einem oder mehreren besonderen Merkmalen, die Ausdruck der physischen, physiologischen, genetischen, psychischen, wirtschaftlichen, kulturellen oder sozialen Identität dieser natürlichen Person sind, identifiziert werden kann.</p></li><li><br><h2>b)    betroffene Person</h4><p>Betroffene Person ist jede identifizierte oder identifizierbare natürliche Person, deren personenbezogene Daten von dem für die Verarbeitung Verantwortlichen verarbeitet werden.</p></li><li><br><h2>c)    Verarbeitung</h4><p>Verarbeitung ist jeder mit oder ohne Hilfe automatisierter Verfahren ausgeführte Vorgang oder jede solche Vorgangsreihe im Zusammenhang mit personenbezogenen Daten wie das Erheben, das Erfassen, die Organisation, das Ordnen, die Speicherung, die Anpassung oder Veränderung, das Auslesen, das Abfragen, die Verwendung, die Offenlegung durch Übermittlung, Verbreitung oder eine andere Form der Bereitstellung, den Abgleich oder die Verknüpfung, die Einschränkung, das Löschen oder die Vernichtung.</p></li><li><br><h2>d)    Einschränkung der Verarbeitung</h4><p>Einschränkung der Verarbeitung ist die Markierung gespeicherter personenbezogener Daten mit dem Ziel, ihre künftige Verarbeitung einzuschränken.</p></li><li><br><h2>e)    Profiling</h4><p>Profiling ist jede Art der automatisierten Verarbeitung personenbezogener Daten, die darin besteht, dass diese personenbezogenen Daten verwendet werden, um bestimmte persönliche Aspekte, die sich auf eine natürliche Person beziehen, zu bewerten, insbesondere, um Aspekte bezüglich Arbeitsleistung, wirtschaftlicher Lage, Gesundheit, persönlicher Vorlieben, Interessen, Zuverlässigkeit, Verhalten, Aufenthaltsort oder Ortswechsel dieser natürlichen Person zu analysieren oder vorherzusagen.</p></li><li><br><h2>f)     Pseudonymisierung</h4><p>Pseudonymisierung ist die Verarbeitung personenbezogener Daten in einer Weise, auf welche die personenbezogenen Daten ohne Hinzuziehung zusätzlicher Informationen nicht mehr einer spezifischen betroffenen Person zugeordnet werden können, sofern diese zusätzlichen Informationen gesondert aufbewahrt werden und technischen und organisatorischen Maßnahmen unterliegen, die gewährleisten, dass die personenbezogenen Daten nicht einer identifizierten oder identifizierbaren natürlichen Person zugewiesen werden.</p></li><li><br><h2>g)    Verantwortlicher oder für die Verarbeitung Verantwortlicher</h4><p>Verantwortlicher oder für die Verarbeitung Verantwortlicher ist die natürliche oder juristische Person, Behörde, Einrichtung oder andere Stelle, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten entscheidet. Sind die Zwecke und Mittel dieser Verarbeitung durch das Unionsrecht oder das Recht der Mitgliedstaaten vorgegeben, so kann der Verantwortliche beziehungsweise können die bestimmten Kriterien seiner Benennung nach dem Unionsrecht oder dem Recht der Mitgliedstaaten vorgesehen werden.</p></li><li><br><h2>h)    Auftragsverarbeiter</h4><p>Auftragsverarbeiter ist eine natürliche oder juristische Person, Behörde, Einrichtung oder andere Stelle, die personenbezogene Daten im Auftrag des Verantwortlichen verarbeitet.</p></li><li><br><h2>i)      Empfänger</h4><p>Empfänger ist eine natürliche oder juristische Person, Behörde, Einrichtung oder andere Stelle, der personenbezogene Daten offengelegt werden, unabhängig davon, ob es sich bei ihr um einen Dritten handelt oder nicht. Behörden, die im Rahmen eines bestimmten Untersuchungsauftrags nach dem Unionsrecht oder dem Recht der Mitgliedstaaten möglicherweise personenbezogene Daten erhalten, gelten jedoch nicht als Empfänger.</p></li><li><br><h2>j)      Dritter</h4><p>Dritter ist eine natürliche oder juristische Person, Behörde, Einrichtung oder andere Stelle außer der betroffenen Person, dem Verantwortlichen, dem Auftragsverarbeiter und den Personen, die unter der unmittelbaren Verantwortung des Verantwortlichen oder des Auftragsverarbeiters befugt sind, die personenbezogenen Daten zu verarbeiten.</p></li><li><br><h2>k)    Einwilligung</h4><p>Einwilligung ist jede von der betroffenen Person freiwillig für den bestimmten Fall in informierter Weise und unmissverständlich abgegebene Willensbekundung in Form einer Erklärung oder einer sonstigen eindeutigen bestätigenden Handlung, mit der die betroffene Person zu verstehen gibt, dass sie mit der Verarbeitung der sie betreffenden personenbezogenen Daten einverstanden ist.</p></li></ul><br><h2>2. Name und Anschrift des für die Verarbeitung Verantwortlichen</h4><p>Verantwortlicher im Sinne der Datenschutz-Grundverordnung, sonstiger in den Mitgliedstaaten der Europäischen Union geltenden Datenschutzgesetze und anderer Bestimmungen mit datenschutzrechtlichem Charakter ist die:</p><p>Philipp-Matthäus-Hahn-Schule</p><p>Steinachstraße 19</p><p>72336 Balingen</p><p>Deutschland</p><p>Tel.: 07433/93 87 01</p><p>E-Mail: pmh@gsz-bl.de</p><p>Website: https://www.gsz-zak.de</p><br><h2>3. Erfassung von allgemeinen Daten und Informationen</h4><p>Die Internetseite der Philipp-Matthäus-Hahn-Schule erfasst mit jedem Aufruf der Internetseite durch eine betroffene Person oder ein automatisiertes System eine Reihe von allgemeinen Daten und Informationen. Diese allgemeinen Daten und Informationen werden in den Logfiles des Servers gespeichert. Erfasst werden können die (1) verwendeten Browsertypen und Versionen, (2) das vom zugreifenden System verwendete Betriebssystem, (3) die Internetseite, von welcher ein zugreifendes System auf unsere Internetseite gelangt (sogenannte Referrer), (4) die Unterwebseiten, welche über ein zugreifendes System auf unserer Internetseite angesteuert werden, (5) das Datum und die Uhrzeit eines Zugriffs auf die Internetseite, (6) eine Internet-Protokoll-Adresse (IP-Adresse), (7) der Internet-Service-Provider des zugreifenden Systems und (8) sonstige ähnliche Daten und Informationen, die der Gefahrenabwehr im Falle von Angriffen auf unsere informationstechnologischen Systeme dienen.</p><p>Bei der Nutzung dieser allgemeinen Daten und Informationen zieht die Philipp-Matthäus-Hahn-Schule keine Rückschlüsse auf die betroffene Person. Diese Informationen werden vielmehr benötigt, um (1) die Inhalte unserer Internetseite korrekt auszuliefern, (2) die Inhalte unserer Internetseite sowie die Werbung für diese zu optimieren, (3) die dauerhafte Funktionsfähigkeit unserer informationstechnologischen Systeme und der Technik unserer Internetseite zu gewährleisten sowie (4) um Strafverfolgungsbehörden im Falle eines Cyberangriffes die zur Strafverfolgung notwendigen Informationen bereitzustellen. Diese anonym erhobenen Daten und Informationen werden durch die Philipp-Matthäus-Hahn-Schule daher einerseits statistisch und ferner mit dem Ziel ausgewertet, den Datenschutz und die Datensicherheit in unserem Unternehmen zu erhöhen, um letztlich ein optimales Schutzniveau für die von uns verarbeiteten personenbezogenen Daten sicherzustellen. Die anonymen Daten der Server-Logfiles werden getrennt von allen durch eine betroffene Person angegebenen personenbezogenen Daten gespeichert.</p><br><h2>4. Kontaktmöglichkeit über die Internetseite</h4><p>Die Internetseite der Philipp-Matthäus-Hahn-Schule enthält aufgrund von gesetzlichen Vorschriften Angaben, die eine schnelle elektronische Kontaktaufnahme zu unserem Unternehmen sowie eine unmittelbare Kommunikation mit uns ermöglichen, was ebenfalls eine allgemeine Adresse der sogenannten elektronischen Post (E-Mail-Adresse) umfasst. Sofern eine betroffene Person per E-Mail oder über ein Kontaktformular den Kontakt mit dem für die Verarbeitung Verantwortlichen aufnimmt, werden die von der betroffenen Person übermittelten personenbezogenen Daten automatisch gespeichert. Solche auf freiwilliger Basis von einer betroffenen Person an den für die Verarbeitung Verantwortlichen übermittelten personenbezogenen Daten werden für Zwecke der Bearbeitung oder der Kontaktaufnahme zur betroffenen Person gespeichert. Es erfolgt keine Weitergabe dieser personenbezogenen Daten an Dritte.</p><br><h2>5. Kommentarfunktion im Blog auf der Internetseite</h4><p>Die Philipp-Matthäus-Hahn-Schule bietet den Nutzern auf einem Blog, der sich auf der Internetseite des für die Verarbeitung Verantwortlichen befindet, die Möglichkeit, individuelle Kommentare zu einzelnen Blog-Beiträgen zu hinterlassen. Ein Blog ist ein auf einer Internetseite geführtes, in der Regel öffentlich einsehbares Portal, in welchem eine oder mehrere Personen, die Blogger oder Web-Blogger genannt werden, Artikel posten oder Gedanken in sogenannten Blogposts niederschreiben können. Die Blogposts können in der Regel von Dritten kommentiert werden.</p><p>Hinterlässt eine betroffene Person einen Kommentar in dem auf dieser Internetseite veröffentlichten Blog, werden neben den von der betroffenen Person hinterlassenen Kommentaren auch Angaben zum Zeitpunkt der Kommentareingabe sowie zu dem von der betroffenen Person gewählten Nutzernamen (Pseudonym) gespeichert und veröffentlicht. Ferner wird die vom Internet-Service-Provider (ISP) der betroffenen Person vergebene IP-Adresse mitprotokolliert. Diese Speicherung der IP-Adresse erfolgt aus Sicherheitsgründen und für den Fall, dass die betroffene Person durch einen abgegebenen Kommentar die Rechte Dritter verletzt oder rechtswidrige Inhalte postet. Die Speicherung dieser personenbezogenen Daten erfolgt daher im eigenen Interesse des für die Verarbeitung Verantwortlichen, damit sich dieser im Falle einer Rechtsverletzung gegebenenfalls exkulpieren könnte. Es erfolgt keine Weitergabe dieser erhobenen personenbezogenen Daten an Dritte, sofern eine solche Weitergabe nicht gesetzlich vorgeschrieben ist oder der Rechtsverteidigung des für die Verarbeitung Verantwortlichen dient.</p><br><h2>6. Routinemäßige Löschung und Sperrung von personenbezogenen Daten</h4><p>Der für die Verarbeitung Verantwortliche verarbeitet und speichert personenbezogene Daten der betroffenen Person nur für den Zeitraum, der zur Erreichung des Speicherungszwecks erforderlich ist oder sofern dies durch den Europäischen Richtlinien- und Verordnungsgeber oder einen anderen Gesetzgeber in Gesetzen oder Vorschriften, welchen der für die Verarbeitung Verantwortliche unterliegt, vorgesehen wurde.</p><p>Entfällt der Speicherungszweck oder läuft eine vom Europäischen Richtlinien- und Verordnungsgeber oder einem anderen zuständigen Gesetzgeber vorgeschriebene Speicherfrist ab, werden die personenbezogenen Daten routinemäßig und entsprechend den gesetzlichen Vorschriften gesperrt oder gelöscht.</p><br><h2>7. Rechte der betroffenen Person</h4><ul style=\"list-style: none;\"><li><br><h2>a)    Recht auf Bestätigung</h4><p>Jede betroffene Person hat das vom Europäischen Richtlinien- und Verordnungsgeber eingeräumte Recht, von dem für die Verarbeitung Verantwortlichen eine Bestätigung darüber zu verlangen, ob sie betreffende personenbezogene Daten verarbeitet werden. Möchte eine betroffene Person dieses Bestätigungsrecht in Anspruch nehmen, kann sie sich hierzu jederzeit an einen Mitarbeiter des für die Verarbeitung Verantwortlichen wenden.</p></li><li><br><h2>b)    Recht auf Auskunft</h4><p>Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das vom Europäischen Richtlinien- und Verordnungsgeber gewährte Recht, jederzeit von dem für die Verarbeitung Verantwortlichen unentgeltliche Auskunft über die zu seiner Person gespeicherten personenbezogenen Daten und eine Kopie dieser Auskunft zu erhalten. Ferner hat der Europäische Richtlinien- und Verordnungsgeber der betroffenen Person Auskunft über folgende Informationen zugestanden:</p><ul style=\"list-style: none;\"><li>die Verarbeitungszwecke</li><li>die Kategorien personenbezogener Daten, die verarbeitet werden</li><li>die Empfänger oder Kategorien von Empfängern, gegenüber denen die personenbezogenen Daten offengelegt worden sind oder noch offengelegt werden, insbesondere bei Empfängern in Drittländern oder bei internationalen Organisationen</li><li>falls möglich die geplante Dauer, für die die personenbezogenen Daten gespeichert werden, oder, falls dies nicht möglich ist, die Kriterien für die Festlegung dieser Dauer</li><li>das Bestehen eines Rechts auf Berichtigung oder Löschung der sie betreffenden personenbezogenen Daten oder auf Einschränkung der Verarbeitung durch den Verantwortlichen oder eines Widerspruchsrechts gegen diese Verarbeitung</li><li>das Bestehen eines Beschwerderechts bei einer Aufsichtsbehörde</li><li>wenn die personenbezogenen Daten nicht bei der betroffenen Person erhoben werden: Alle verfügbaren Informationen über die Herkunft der Daten</li><li>das Bestehen einer automatisierten Entscheidungsfindung einschließlich Profiling gemäß Artikel 22 Abs.1 und 4 DS-GVO und — zumindest in diesen Fällen — aussagekräftige Informationen über die involvierte Logik sowie die Tragweite und die angestrebten Auswirkungen einer derartigen Verarbeitung für die betroffene Person</li></ul><p>Ferner steht der betroffenen Person ein Auskunftsrecht darüber zu, ob personenbezogene Daten an ein Drittland oder an eine internationale Organisation übermittelt wurden. Sofern dies der Fall ist, so steht der betroffenen Person im Übrigen das Recht zu, Auskunft über die geeigneten Garantien im Zusammenhang mit der Übermittlung zu erhalten.</p><p>Möchte eine betroffene Person dieses Auskunftsrecht in Anspruch nehmen, kann sie sich hierzu jederzeit an einen Mitarbeiter des für die Verarbeitung Verantwortlichen wenden.</p></li><li><br><h2>c)    Recht auf Berichtigung</h4><p>Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das vom Europäischen Richtlinien- und Verordnungsgeber gewährte Recht, die unverzügliche Berichtigung sie betreffender unrichtiger personenbezogener Daten zu verlangen. Ferner steht der betroffenen Person das Recht zu, unter Berücksichtigung der Zwecke der Verarbeitung, die Vervollständigung unvollständiger personenbezogener Daten — auch mittels einer ergänzenden Erklärung — zu verlangen.</p><p>Möchte eine betroffene Person dieses Berichtigungsrecht in Anspruch nehmen, kann sie sich hierzu jederzeit an einen Mitarbeiter des für die Verarbeitung Verantwortlichen wenden.</p></li><li><br><h2>d)    Recht auf Löschung (Recht auf Vergessen werden)</h4><p>Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das vom Europäischen Richtlinien- und Verordnungsgeber gewährte Recht, von dem Verantwortlichen zu verlangen, dass die sie betreffenden personenbezogenen Daten unverzüglich gelöscht werden, sofern einer der folgenden Gründe zutrifft und soweit die Verarbeitung nicht erforderlich ist:</p><ul style=\"list-style: none;\"><li>Die personenbezogenen Daten wurden für solche Zwecke erhoben oder auf sonstige Weise verarbeitet, für welche sie nicht mehr notwendig sind.</li><li>Die betroffene Person widerruft ihre Einwilligung, auf die sich die Verarbeitung gemäß Art. 6 Abs. 1 Buchstabe a DS-GVO oder Art. 9 Abs. 2 Buchstabe a DS-GVO stützte, und es fehlt an einer anderweitigen Rechtsgrundlage für die Verarbeitung.</li><li>Die betroffene Person legt gemäß Art. 21 Abs. 1 DS-GVO Widerspruch gegen die Verarbeitung ein, und es liegen keine vorrangigen berechtigten Gründe für die Verarbeitung vor, oder die betroffene Person legt gemäß Art. 21 Abs. 2 DS-GVO Widerspruch gegen die Verarbeitung ein.</li><li>Die personenbezogenen Daten wurden unrechtmäßig verarbeitet.</li><li>Die Löschung der personenbezogenen Daten ist zur Erfüllung einer rechtlichen Verpflichtung nach dem Unionsrecht oder dem Recht der Mitgliedstaaten erforderlich, dem der Verantwortliche unterliegt.</li><li>Die personenbezogenen Daten wurden in Bezug auf angebotene Dienste der Informationsgesellschaft gemäß Art. 8 Abs. 1 DS-GVO erhoben.</li></ul><p>Sofern einer der oben genannten Gründe zutrifft und eine betroffene Person die Löschung von personenbezogenen Daten, die bei der Philipp-Matthäus-Hahn-Schule gespeichert sind, veranlassen möchte, kann sie sich hierzu jederzeit an einen Mitarbeiter des für die Verarbeitung Verantwortlichen wenden. Der Mitarbeiter der Philipp-Matthäus-Hahn-Schule wird veranlassen, dass dem Löschverlangen unverzüglich nachgekommen wird.</p><p>Wurden die personenbezogenen Daten von der Philipp-Matthäus-Hahn-Schule öffentlich gemacht und ist unser Unternehmen als Verantwortlicher gemäß Art. 17 Abs. 1 DS-GVO zur Löschung der personenbezogenen Daten verpflichtet, so trifft die Philipp-Matthäus-Hahn-Schule unter Berücksichtigung der verfügbaren Technologie und der Implementierungskosten angemessene Maßnahmen, auch technischer Art, um andere für die Datenverarbeitung Verantwortliche, welche die veröffentlichten personenbezogenen Daten verarbeiten, darüber in Kenntnis zu setzen, dass die betroffene Person von diesen anderen für die Datenverarbeitung Verantwortlichen die Löschung sämtlicher Links zu diesen personenbezogenen Daten oder von Kopien oder Replikationen dieser personenbezogenen Daten verlangt hat, soweit die Verarbeitung nicht erforderlich ist. Der Mitarbeiter der Philipp-Matthäus-Hahn-Schule wird im Einzelfall das Notwendige veranlassen.</p></li><li><br><h2>e)    Recht auf Einschränkung der Verarbeitung</h4><p>Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das vom Europäischen Richtlinien- und Verordnungsgeber gewährte Recht, von dem Verantwortlichen die Einschränkung der Verarbeitung zu verlangen, wenn eine der folgenden Voraussetzungen gegeben ist:</p><ul style=\"list-style: none;\"><li>Die Richtigkeit der personenbezogenen Daten wird von der betroffenen Person bestritten, und zwar für eine Dauer, die es dem Verantwortlichen ermöglicht, die Richtigkeit der personenbezogenen Daten zu überprüfen.</li><li>Die Verarbeitung ist unrechtmäßig, die betroffene Person lehnt die Löschung der personenbezogenen Daten ab und verlangt stattdessen die Einschränkung der Nutzung der personenbezogenen Daten.</li><li>Der Verantwortliche benötigt die personenbezogenen Daten für die Zwecke der Verarbeitung nicht länger, die betroffene Person benötigt sie jedoch zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen.</li><li>Die betroffene Person hat Widerspruch gegen die Verarbeitung gem. Art. 21 Abs. 1 DS-GVO eingelegt und es steht noch nicht fest, ob die berechtigten Gründe des Verantwortlichen gegenüber denen der betroffenen Person überwiegen.</li></ul><p>Sofern eine der oben genannten Voraussetzungen gegeben ist und eine betroffene Person die Einschränkung von personenbezogenen Daten, die bei der Philipp-Matthäus-Hahn-Schule gespeichert sind, verlangen möchte, kann sie sich hierzu jederzeit an einen Mitarbeiter des für die Verarbeitung Verantwortlichen wenden. Der Mitarbeiter der Philipp-Matthäus-Hahn-Schule wird die Einschränkung der Verarbeitung veranlassen.</p></li><li><br><h2>f)     Recht auf Datenübertragbarkeit</h4><p>Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das vom Europäischen Richtlinien- und Verordnungsgeber gewährte Recht, die sie betreffenden personenbezogenen Daten, welche durch die betroffene Person einem Verantwortlichen bereitgestellt wurden, in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten. Sie hat außerdem das Recht, diese Daten einem anderen Verantwortlichen ohne Behinderung durch den Verantwortlichen, dem die personenbezogenen Daten bereitgestellt wurden, zu übermitteln, sofern die Verarbeitung auf der Einwilligung gemäß Art. 6 Abs. 1 Buchstabe a DS-GVO oder Art. 9 Abs. 2 Buchstabe a DS-GVO oder auf einem Vertrag gemäß Art. 6 Abs. 1 Buchstabe b DS-GVO beruht und die Verarbeitung mithilfe automatisierter Verfahren erfolgt, sofern die Verarbeitung nicht für die Wahrnehmung einer Aufgabe erforderlich ist, die im öffentlichen Interesse liegt oder in Ausübung öffentlicher Gewalt erfolgt, welche dem Verantwortlichen übertragen wurde.</p><p>Ferner hat die betroffene Person bei der Ausübung ihres Rechts auf Datenübertragbarkeit gemäß Art. 20 Abs. 1 DS-GVO das Recht, zu erwirken, dass die personenbezogenen Daten direkt von einem Verantwortlichen an einen anderen Verantwortlichen übermittelt werden, soweit dies technisch machbar ist und sofern hiervon nicht die Rechte und Freiheiten anderer Personen beeinträchtigt werden.</p><p>Zur Geltendmachung des Rechts auf Datenübertragbarkeit kann sich die betroffene Person jederzeit an einen Mitarbeiter der Philipp-Matthäus-Hahn-Schule wenden.</p></li><li><br><h2>g)    Recht auf Widerspruch</h4><p>Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das vom Europäischen Richtlinien- und Verordnungsgeber gewährte Recht, aus Gründen, die sich aus ihrer besonderen Situation ergeben, jederzeit gegen die Verarbeitung sie betreffender personenbezogener Daten, die aufgrund von Art. 6 Abs. 1 Buchstaben e oder f DS-GVO erfolgt, Widerspruch einzulegen. Dies gilt auch für ein auf diese Bestimmungen gestütztes Profiling.</p><p>Die Philipp-Matthäus-Hahn-Schule verarbeitet die personenbezogenen Daten im Falle des Widerspruchs nicht mehr, es sei denn, wir können zwingende schutzwürdige Gründe für die Verarbeitung nachweisen, die den Interessen, Rechten und Freiheiten der betroffenen Person überwiegen, oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen.</p><p>Verarbeitet die Philipp-Matthäus-Hahn-Schule personenbezogene Daten, um Direktwerbung zu betreiben, so hat die betroffene Person das Recht, jederzeit Widerspruch gegen die Verarbeitung der personenbezogenen Daten zum Zwecke derartiger Werbung einzulegen. Dies gilt auch für das Profiling, soweit es mit solcher Direktwerbung in Verbindung steht. Widerspricht die betroffene Person gegenüber der Philipp-Matthäus-Hahn-Schule der Verarbeitung für Zwecke der Direktwerbung, so wird die Philipp-Matthäus-Hahn-Schule die personenbezogenen Daten nicht mehr für diese Zwecke verarbeiten.</p><p>Zudem hat die betroffene Person das Recht, aus Gründen, die sich aus ihrer besonderen Situation ergeben, gegen die sie betreffende Verarbeitung personenbezogener Daten, die bei der Philipp-Matthäus-Hahn-Schule zu wissenschaftlichen oder historischen Forschungszwecken oder zu statistischen Zwecken gemäß Art. 89 Abs. 1 DS-GVO erfolgen, Widerspruch einzulegen, es sei denn, eine solche Verarbeitung ist zur Erfüllung einer im öffentlichen Interesse liegenden Aufgabe erforderlich.</p><p>Zur Ausübung des Rechts auf Widerspruch kann sich die betroffene Person direkt jeden Mitarbeiter der Philipp-Matthäus-Hahn-Schule oder einen anderen Mitarbeiter wenden. Der betroffenen Person steht es ferner frei, im Zusammenhang mit der Nutzung von Diensten der Informationsgesellschaft, ungeachtet der Richtlinie 2002/58/EG, ihr Widerspruchsrecht mittels automatisierter Verfahren auszuüben, bei denen technische Spezifikationen verwendet werden.</p></li><li><br><h2>h)    Automatisierte Entscheidungen im Einzelfall einschließlich Profiling</h4><p>Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das vom Europäischen Richtlinien- und Verordnungsgeber gewährte Recht, nicht einer ausschließlich auf einer automatisierten Verarbeitung — einschließlich Profiling — beruhenden Entscheidung unterworfen zu werden, die ihr gegenüber rechtliche Wirkung entfaltet oder sie in ähnlicher Weise erheblich beeinträchtigt, sofern die Entscheidung (1) nicht für den Abschluss oder die Erfüllung eines Vertrags zwischen der betroffenen Person und dem Verantwortlichen erforderlich ist, oder (2) aufgrund von Rechtsvorschriften der Union oder der Mitgliedstaaten, denen der Verantwortliche unterliegt, zulässig ist und diese Rechtsvorschriften angemessene Maßnahmen zur Wahrung der Rechte und Freiheiten sowie der berechtigten Interessen der betroffenen Person enthalten oder (3) mit ausdrücklicher Einwilligung der betroffenen Person erfolgt.</p><p>Ist die Entscheidung (1) für den Abschluss oder die Erfüllung eines Vertrags zwischen der betroffenen Person und dem Verantwortlichen erforderlich oder (2) erfolgt sie mit ausdrücklicher Einwilligung der betroffenen Person, trifft die Philipp-Matthäus-Hahn-Schule angemessene Maßnahmen, um die Rechte und Freiheiten sowie die berechtigten Interessen der betroffenen Person zu wahren, wozu mindestens das Recht auf Erwirkung des Eingreifens einer Person seitens des Verantwortlichen, auf Darlegung des eigenen Standpunkts und auf Anfechtung der Entscheidung gehört.</p><p>Möchte die betroffene Person Rechte mit Bezug auf automatisierte Entscheidungen geltend machen, kann sie sich hierzu jederzeit an einen Mitarbeiter des für die Verarbeitung Verantwortlichen wenden.</p></li><li><br><h2>i)      Recht auf Widerruf einer datenschutzrechtlichen Einwilligung</h4><p>Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das vom Europäischen Richtlinien- und Verordnungsgeber gewährte Recht, eine Einwilligung zur Verarbeitung personenbezogener Daten jederzeit zu widerrufen.</p><p>Möchte die betroffene Person ihr Recht auf Widerruf einer Einwilligung geltend machen, kann sie sich hierzu jederzeit an einen Mitarbeiter des für die Verarbeitung Verantwortlichen wenden.</p></li></ul><br><h2>8. Rechtsgrundlage der Verarbeitung</h4><p>Art. 6 I lit. a DS-GVO dient unserem Unternehmen als Rechtsgrundlage für Verarbeitungsvorgänge, bei denen wir eine Einwilligung für einen bestimmten Verarbeitungszweck einholen. Ist die Verarbeitung personenbezogener Daten zur Erfüllung eines Vertrags, dessen Vertragspartei die betroffene Person ist, erforderlich, wie dies beispielsweise bei Verarbeitungsvorgängen der Fall ist, die für eine Lieferung von Waren oder die Erbringung einer sonstigen Leistung oder Gegenleistung notwendig sind, so beruht die Verarbeitung auf Art. 6 I lit. b DS-GVO. Gleiches gilt für solche Verarbeitungsvorgänge die zur Durchführung vorvertraglicher Maßnahmen erforderlich sind, etwa in Fällen von Anfragen zur unseren Produkten oder Leistungen. Unterliegt unser Unternehmen einer rechtlichen Verpflichtung durch welche eine Verarbeitung von personenbezogenen Daten erforderlich wird, wie beispielsweise zur Erfüllung steuerlicher Pflichten, so basiert die Verarbeitung auf Art. 6 I lit. c DS-GVO. In seltenen Fällen könnte die Verarbeitung von personenbezogenen Daten erforderlich werden, um lebenswichtige Interessen der betroffenen Person oder einer anderen natürlichen Person zu schützen. Dies wäre beispielsweise der Fall, wenn ein Besucher in unserem Betrieb verletzt werden würde und daraufhin sein Name, sein Alter, seine Krankenkassendaten oder sonstige lebenswichtige Informationen an einen Arzt, ein Krankenhaus oder sonstige Dritte weitergegeben werden müssten. Dann würde die Verarbeitung auf Art. 6 I lit. d DS-GVO beruhen. Letztlich könnten Verarbeitungsvorgänge auf Art. 6 I lit. f DS-GVO beruhen. Auf dieser Rechtsgrundlage basieren Verarbeitungsvorgänge, die von keiner der vorgenannten Rechtsgrundlagen erfasst werden, wenn die Verarbeitung zur Wahrung eines berechtigten Interesses unseres Unternehmens oder eines Dritten erforderlich ist, sofern die Interessen, Grundrechte und Grundfreiheiten des Betroffenen nicht überwiegen. Solche Verarbeitungsvorgänge sind uns insbesondere deshalb gestattet, weil sie durch den Europäischen Gesetzgeber besonders erwähnt wurden. Er vertrat insoweit die Auffassung, dass ein berechtigtes Interesse anzunehmen sein könnte, wenn die betroffene Person ein Kunde des Verantwortlichen ist (Erwägungsgrund 47 Satz 2 DS-GVO).</p><br><h2>9. Berechtigte Interessen an der Verarbeitung, die von dem Verantwortlichen oder einem Dritten verfolgt werden</h4><p>Basiert die Verarbeitung personenbezogener Daten auf Artikel 6 I lit. f DS-GVO ist unser berechtigtes Interesse die Durchführung unserer Geschäftstätigkeit zugunsten des Wohlergehens all unserer Mitarbeiter und unserer Anteilseigner.</p><br><h2>10. Dauer, für die die personenbezogenen Daten gespeichert werden</h4><p>Das Kriterium für die Dauer der Speicherung von personenbezogenen Daten ist die jeweilige gesetzliche Aufbewahrungsfrist. Nach Ablauf der Frist werden die entsprechenden Daten routinemäßig gelöscht, sofern sie nicht mehr zur Vertragserfüllung oder Vertragsanbahnung erforderlich sind.</p><br><h2>11. Gesetzliche oder vertragliche Vorschriften zur Bereitstellung der personenbezogenen Daten; Erforderlichkeit für den Vertragsabschluss; Verpflichtung der betroffenen Person, die personenbezogenen Daten bereitzustellen; mögliche Folgen der Nichtbereitstellung</h4><p>Wir klären Sie darüber auf, dass die Bereitstellung personenbezogener Daten zum Teil gesetzlich vorgeschrieben ist (z.B. Steuervorschriften) oder sich auch aus vertraglichen Regelungen (z.B. Angaben zum Vertragspartner) ergeben kann. Mitunter kann es zu einem Vertragsschluss erforderlich sein, dass eine betroffene Person uns personenbezogene Daten zur Verfügung stellt, die in der Folge durch uns verarbeitet werden müssen. Die betroffene Person ist beispielsweise verpflichtet uns personenbezogene Daten bereitzustellen, wenn unser Unternehmen mit ihr einen Vertrag abschließt. Eine Nichtbereitstellung der personenbezogenen Daten hätte zur Folge, dass der Vertrag mit dem Betroffenen nicht geschlossen werden könnte. Vor einer Bereitstellung personenbezogener Daten durch den Betroffenen muss sich der Betroffene an einen unserer Mitarbeiter wenden. Unser Mitarbeiter klärt den Betroffenen einzelfallbezogen darüber auf, ob die Bereitstellung der personenbezogenen Daten gesetzlich oder vertraglich vorgeschrieben oder für den Vertragsabschluss erforderlich ist, ob eine Verpflichtung besteht, die personenbezogenen Daten bereitzustellen, und welche Folgen die Nichtbereitstellung der personenbezogenen Daten hätte.</p><br><h2>12. Bestehen einer automatisierten Entscheidungsfindung</h4><p>Als verantwortungsbewusstes Unternehmen verzichten wir auf eine automatische Entscheidungsfindung oder ein Profiling.</p><p>Diese Datenschutzerklärung wurde durch den Datenschutzerklärungs-Generator der DGD Deutsche Gesellschaft für Datenschutz GmbH, die als<a href=\"https://dg-datenschutz.de/datenschutz-dienstleistungen/externer-datenschutzbeauftragter/\" rel=\"nofollow\">Externer Datenschutzbeauftragter Kempten</a> tätig ist, in Kooperation mit dem<a href=\"https://www.wbs-law.de/it-recht/datenschutzrecht\" rel=\"nofollow\">Anwalt für IT- und Datenschutzrecht</a> Christian Solmecke erstellt.</p><br>";
}

//changeTheme();

function openPop(data) {

    $(".popup").html('<i onclick="closePop();" class="ion-ios-close-empty"></i>' + data);
    $(".popup").removeClass("dnone");
    setTimeout(function() {
        $(".popup").addClass("open");
    }, 10);


}

function closePop(data) {

    $(".popup").addClass("down");
    setTimeout(function() {
        $(".popup").addClass("dnone");
        $(".popup").removeClass("down");
        $(".popup").removeClass("open");
    }, 200);


}

main = new Main();
if (main.settings.klasse != "") {
    main.requestVertretungsplan();
}