Date.prototype.getWeekNumber = function(){
    var d = new Date(+this);
    d.setHours(0,0,0,0);
    d.setDate(d.getDate()+4-(d.getDay()||7));
    return Math.ceil((((d-new Date(d.getFullYear(),0,1))/8.64e7)+1)/7);
};


var vorName = (localStorage.getItem('vorName') != null)? localStorage.getItem('vorName') : "";
var nachName = (localStorage.getItem('nachName') != null)? localStorage.getItem('nachName') : "";

document.getElementById('INvorName').value = vorName;
document.getElementById('INnachName').value = nachName;

document.getElementById('selCl').value = (localStorage.getItem('Klasse') != null)? localStorage.getItem('Klasse') : "";


function loadSMV(){
$.ajax({
  url: "https://kevinsieger.de/api/smv.php?vorName="+vorName+"&nachName"+nachName+"&klasse="+$('#selCl').find(":selected").html(),
})
  .done(function( data ) {
    smv(data);
  });
}




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
        $('.swipe-tab[data-slick-index=' + currentIndex +']').addClass(activeTabClassName);
        $swipeTabsContainer.slick('slickGoTo', currentIndex);
        $swipeTabsContentContainer.slick('slickGoTo', currentIndex);
    });

    //initializes slick navigation tabs swipe handler
    $swipeTabsContentContainer.on('swipe', function(event, slick, direction) {
    	currentIndex = $(this).slick('slickCurrentSlide');
		$swipeTabs.removeClass(activeTabClassName);
		$('.swipe-tab[data-slick-index=' + currentIndex + ']').addClass(activeTabClassName);
	});


function reqPlan(){
  
  $('.theKlasse').text($("#selCl option:selected").html());
  
  var days = ['Montag','Dienstag','Mittwoch','Donnerstag', 'Freitag', 'Samstag'];
  var curr = new Date();
  
  
  for(var i = 0; i < 6; i++){
    $('#day'+i+' .dayTitle').text(days[i] + ' ' + new Date(curr.setDate(curr.getDate() - curr.getDay()+1+i)).getDate() + '.' + (new Date(curr.setDate(curr.getDate() - curr.getDay()+1+i)).getMonth() +1));
  }
  
  var clId = $('#selCl').find(":selected").val();
  localStorage.setItem('Klasse', document.getElementById('selCl').value);
  clId = "0".repeat(5 - clId.toString().length)+clId.toString();
  $.ajax({
  url: "https://kevinsieger.de/api/school.php?n="+clId+"&w="+(new Date().getWeekNumber()),
})
  .done(function( data ) {
    loadPlan(data);
  });
}

function loadPlan(pRaw) {
  
  var raw = pRaw;
  var temp;

  temp = raw.replace(/<\/?span[^>]*>/g, "");
  temp = temp.replace(/<td[^>]*>/g, "<td>");
  temp = temp.replace(/<\/table>/g, "\uE000");
  var days = temp.match(/<table[^\uE000]*/g);

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
  for (var i = 0; i < data.length; i++) {
    $("#day" + i + " table").html('');
    try {
      
      for (var j = 0; j < data[i].length; j++) {
        if(data[i][j][1] != undefined){
        $("#day" + i + " table").append(
          "<tr>" +
            "<td>" +
            data[i][j][1] +
            "</td>" +
            "<td>" +
            data[i][j][2] +
            "</td>" +
            "<td>" +
            data[i][j][4] +
            "</td>" +
            "<td>" +
            data[i][j][5] +
            "</td>" +
            "<td>" +
            data[i][j][6] +
            "</td>" +
            "</tr>"
        );}
        else{
          if(data[i][j].length == 1)
            $("#day" + i + " table").append("<tr><td>Keine Vertretung</td></tr>");
        }
      }
    } catch (e) {}
  }
}

function krankMail(pPerson, pMail){
  window.open('mailto:'+pMail+'?subject=Krankmeldung&body='+encodeURI('Sehr geehrte Frau '+pPerson+',\r\n\r\nich bitte mein krankheitsbedingtes Fehlen zu entschuldigen. Leider ist es mir heute nicht m\u00F6glich\r\nden Unterricht zu besuchen.\r\n\r\nIch bitte Sie, meinen Klassenlehrer und\/oder Fachlehrer zu informieren.\r\n\r\nMit freundlichen Gr\u00FC\u00DFen\r\n'+vorName+' '+nachName),'_self');
}

reqPlan();

function smv(data){
 document.getElementById('news').innerHTML = data; 
}

function saveInfo(){
  setSave();
  localStorage.setItem("vorName", document.getElementById('INvorName').value);
  localStorage.setItem("nachName", document.getElementById('INnachName').value);
  vorName = localStorage.getItem("vorName");
  nachName = localStorage.getItem("nachName");
  loadSMV();
}

function sendM(){
  
  setLoad(true);
  
  
$.ajax({
    type: "POST",
    url: "https://kevinsieger.de/api/maeng.php",
    data: new FormData($('#mae')[0]),
    processData: false,
    contentType: false,
    success: function (data) {
        console.log(data);
      setLoad(false);
    }
});
}


function setLoad(p){
  var nope = (p)? $(".loadingPop").addClass("load") : $(".loadingPop").removeClass("load");
}

function setSave(){
  $(".loadingPop").addClass("save");
  setTimeout(function(){ $(".loadingPop").removeClass("save"); }, 500)
}

loadSMV();

if(localStorage.getItem('first') == null){
  currentIndex = 4;
        $swipeTabs.removeClass(activeTabClassName);
        $('.swipe-tab[data-slick-index=' + currentIndex +']').addClass(activeTabClassName);
        $swipeTabsContainer.slick('slickGoTo', currentIndex);
        $swipeTabsContentContainer.slick('slickGoTo', currentIndex);
  localStorage.setItem('first', 'on');
}