versionID = 8;

Date.prototype.getWeekNumber = function () {
    var d = new Date(+this);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    return Math.ceil((((d - new Date(d.getFullYear(), 0, 1)) / 8.64e7) + 1) / 7);
};


//var vorName = (localStorage.getItem('vorName') != null) ? localStorage.getItem('vorName') : "";
//var nachName = (localStorage.getItem('nachName') != null) ? localStorage.getItem('nachName') : "";

//document.getElementById('INvorName').value = vorName;
//document.getElementById('INnachName').value = nachName;

document.getElementById('selCl').value = (localStorage.getItem('Klasse') != null) ? localStorage.getItem('Klasse') : "";
document.getElementById('selUn').value = (localStorage.getItem('UnKlasse') != null) ? localStorage.getItem('UnKlasse') : "";

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

    var mensaplan = new Mensaplan();
    mensaplan.fetchMensaPage(
        function(newHTML) {
            mensa(newHTML);
        },
        function() {
            alert("Verbindung zur Mensa-Seite fehlgeschlagen!");
        }
    );
}




'use strict';

var $swipeTabsContainer = $('.swipe-tabs'),
    $swipeTabs = $('.swipe-tab'),
    $swipeTabsContentContainer = $('.swipe-tabs-container'),
    currentIndex = 0,
    activeTabClassName = 'active-tab';

$swipeTabsContainer.on('init', function (event, slick) {
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


$swipeTabs.on('click', function (event) {
    // gets index of clicked tab
    currentIndex = $(this).data('slick-index');
    $swipeTabs.removeClass(activeTabClassName);
    $('.swipe-tab[data-slick-index=' + currentIndex + ']').addClass(activeTabClassName);
    $swipeTabsContainer.slick('slickGoTo', currentIndex);
    $swipeTabsContentContainer.slick('slickGoTo', currentIndex);
});

//initializes slick navigation tabs swipe handler
$swipeTabsContentContainer.on('swipe', function (event, slick, direction) {
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

                            + "')\">" +
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

                            + "')\">" +
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
        .done(function (data) {

            loadPlan(data, true);
            if ($('#selUn option:selected').val() != "x") {
                //console.log("Untergruppe erkannt!");
                $.ajax({
                        url: "http://intern.gsz-zak.de/Vertretungsplan/w/" + (((new Date().getDay() == 0) ? (new Date().getWeekNumber() + 1) : (new Date().getWeekNumber()).toString().length == 1) ? "0" : "") + ((new Date().getDay() == 0) ? (new Date().getWeekNumber() + 1) : (new Date().getWeekNumber())) + "/w" + convertClId($('#selUn').find(":selected").val()) + ".htm",
                    })
                    .done(function (data) {
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
        .done(function (data) {

            loadPlan(data, true, true);
            if ($('#selUn option:selected').val() != "x") {
                //console.log("Untergruppe erkannt!");
                $.ajax({
                        url: "http://intern.gsz-zak.de/Vertretungsplan/w/" + (((next.getDay() == 0) ? (next.getWeekNumber() + 1) : (next.getWeekNumber()).toString().length == 1) ? "0" : "") + ((next.getDay() == 0) ? (next.getWeekNumber() + 1) : (next.getWeekNumber())) + "/w" + convertClId($('#selUn').find(":selected").val()) + ".htm",
                    })
                    .done(function (data) {
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
    reqPlan();
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
    loadSMV();
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
        success: function (data) {

            setLoad(false);
        }
    });
}


function setLoad(p) {
    var nope = (p) ? $(".loadingPop").addClass("load") : $(".loadingPop").removeClass("load");
}

function setSave() {
    $(".loadingPop").addClass("save");
    setTimeout(function () {
        $(".loadingPop").removeClass("save");
    }, 500)
}

loadSMV();

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

ermittleUnKlassen();

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


$('#bahnFrame').load(function () {
    setTimeout(function () {
        updateBahn();
    }, 5000);
});



changeTheme();

function openPop(data) {

    $(".popup").html('<i onclick="closePop();" class="ion-ios-close-empty"></i>' + data);
    $(".popup").removeClass("dnone");
    setTimeout(function () {
        $(".popup").addClass("open");
    }, 10);


}

function closePop(data) {

    $(".popup").addClass("down");
    setTimeout(function () {
        $(".popup").addClass("dnone");
        $(".popup").removeClass("down");
        $(".popup").removeClass("open");
    }, 200);


}