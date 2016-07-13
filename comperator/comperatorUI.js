    /* ----- Main Search Function ----- */

    var SQ, low;

    function parser(){
    // UI  
    frameEmpty();
    showFrameButtons()
    $('#showSearch').show();
    $('#searchHead').hide();
    $('#searchBox').hide(1000);
    $('table#outcomeTab').remove();
    $('iframe').remove();
    $('#outcomeTab').remove()
    $('#outcome').append('<table id="outcomeTab" class="table table-bordered table-hover dataTable" ><thead><tr role="row"><th aria-label="Wyszukiwarka" id="#sort">Porównywarka</th><th aria-label="Nazwa produktu" id="#sort">Nazwa produktu</th><th aria-label="Cena PLN" id="#sort">Cena PLN</th><th aria-label="Cena EUR" id="#sort">Cena EUR</th><th aria-label="Cena EUR Netto" id="#sort">Cena EUR Netto</th><th>Pokaz Pozostałe</th></tr></thead><tbody></tbody></table>');
    $( "#outcomeTable" ).show();
    $( "#frames" ).show();
    $( "#framesPlus" ).show(1000);

    // Real app
    var searchQuery = document.getElementById('searchQuery').value;
        searchQuery = searchQuery.trim();
        searchQuery = searchQuery.replace(/\s/g, "+");
        SQ = searchQuery;

    var lowest = document.getElementById('lowest').value;
    low = lowest;

        compariRO(searchQuery, lowest); 
        agrepHU(searchQuery, lowest);
        salidziniLV(searchQuery, lowest);
        kainosLT(searchQuery, lowest);
        jeftinijeHR(searchQuery, lowest);
        geizhals(searchQuery, lowest);
        ceneo(searchQuery, lowest);
        trovaprezziIT(searchQuery, lowest); 
        pricerunnerDK(searchQuery, lowest); 
        pricerunnerSE(searchQuery, lowest); 
        heurekaCZ(searchQuery, lowest); 
        heurekaSK(searchQuery, lowest);


    // Frames
    $('#IDEFrame').append('<div class="row" style="margin-left:20px;"><h3 class="box-title">Idealo.de &nbsp <img onclick="IDEFrame()" src="img/ref.png"></h3></div><div class="row"><iframe id="idealoDE" style="height: 380px; width: 100%; margin-left:20px; margin-right:20px;" scrolling="yes" src="https://www.idealo.de/preisvergleich/MainSearchProductCategory.html?q=' + searchQuery +'#tiles"></div></div>');
    $('#IATFrame').append('<div class="row" style="margin-left:20px;"><h3 class="box-title">Idealo.at &nbsp <img onclick="IATFrame()" src="img/ref.png"></h3></div><div class="row"><iframe id="idealoAT" style="height: 380px; width: 100%; margin-left:20px; margin-right:20px;" scrolling="yes" src="https://www.idealo.at/preisvergleich/MainSearchProductCategory.html?q=' + searchQuery +'#tiles"></div>');
    $('#IFRFrame').append('<div class="row" style="margin-left:20px;"><h3 class="box-title">Idealo.fr &nbsp <img onclick="IFRFrame()" src="img/ref.png"></h3></div><div class="row"><iframe id="idealoFR" style="height: 380px; width: 100%; margin-left:20px; margin-right:20px;" scrolling="yes" src="https://www.idealo.fr/prechcat.html?q=' + searchQuery +'#tiles"></div>');
    $('#IESFrame').append('<div class="row" style="margin-left:20px;"><h3 class="box-title">Idealo.es &nbsp <img onclick="IESFrame()" src="img/ref.png"></h3></div><div class="row"><iframe id="idealoES" style="height: 380px; width: 100%; margin-left:20px; margin-right:20px;" scrolling="yes" src="https://www.idealo.es/resultados.html?q=' + searchQuery +'#tiles"></div>');
    $('#IITFrame').append('<div class="row" style="margin-left:20px;"><h3 class="box-title">Idealo.it &nbsp <img onclick="IITFrame()" src="img/ref.png"></h3></div><div class="row"><iframe id="idealoIT" style="height: 380px; width: 100%; margin-left:20px; margin-right:20px;" scrolling="yes" src="https://www.idealo.it/risultati.html?q=' + searchQuery +'#tiles"></div></div><div class="box-header"><i class="ion ion-clipboard"></i><h3 class="box-title">Dodatkowe Ramki</h3></div>');
    $('#KNLFrame').append('<a class="btn btn-primary" style="width:100%; margin-bottom:10px;" href="https://www.kieskeurig.nl/search?rq=&min='+ (lowest/euro).toFixed(0) +'&max=&min_default=&max_default=&q=' + searchQuery + '" target="_blank" >Pokaż Kieskeurig.nl</a>');

    };


    /* ------------- UI -------------- */
    
    function sorter(){
        $("#outcomeTab").tablesorter({sortList: [[5,0],[4,0]]});
    }

    function scrollON(){
        $("#scrollON").hide();
        $("#idealoDE").attr("scrolling", "yes");
        $("#idealoAT").attr("scrolling", "yes");
        $("#idealoFR").attr("scrolling", "yes");
        $("#idealoES").attr("scrolling", "yes");
        $("#idealoIT").attr("scrolling", "yes");
        $("#scrollOFF").show();
    }

    function scrollOFF(){
        $("#scrollOFF").hide();
        $("#idealoDE")[0].setAttribute("scrolling", "no");
        $("#idealoAT")[0].setAttribute("scrolling", "no");
        $("#idealoFR")[0].setAttribute("scrolling", "no");
        $("#idealoES")[0].setAttribute("scrolling", "no");
        $("#idealoIT")[0].setAttribute("scrolling", "no");
        $("#scrollON").show();
    }

    function scrollONPlus(){
        $("#scrollONPlus").hide();
        $("#argepHU").attr("scrolling", "yes");
        $("#heurekaCZ").attr("scrolling", "yes");
        $("#heurekaSK").attr("scrolling", "yes");
        $("#compariRO").attr("scrolling", "yes");
        $("#jeftinijeHR").attr("scrolling", "yes");
        $("#kainosLT").attr("scrolling", "yes");
        $("#pricerunnerDK").attr("scrolling", "yes");
        $("#pricerunnerSE").attr("scrolling", "yes");
        $("#salidziniLV").attr("scrolling", "yes");
        $("#scrollOFFPlus").show();
    }

    function scrollOFFPlus(){
        $("#scrollOFFPlus").hide();
        if($("#argepHU").length > 0){
        $("#argepHU")[0].setAttribute("scrolling", "no");
        }
        if($("#heurekaSK").length > 0){
        console.log(1);
        $("#heurekaSK")[0].setAttribute("scrolling", "no");
        }
        if($("#heurekaCZ").length > 0){
        $("#heurekaCZ")[0].setAttribute("scrolling", "no");
        }
        if($("compariRO").length > 0){
        $("#compariRO")[0].setAttribute("scrolling", "no");
        }
        if($("#jeftinijeHR").length > 0){
        $("#jeftinijeHR")[0].setAttribute("scrolling", "no");
        }
        if($("#kainosLT").length > 0){
        $("#kainosLT")[0].setAttribute("scrolling", "no");
        }
        if($("#pricerunnerDK").length > 0){
        $("#pricerunnerDK")[0].setAttribute("scrolling", "no");
        }
        if($("#pricerunnerSE").length > 0){
        $("#pricerunnerSE")[0].setAttribute("scrolling", "no");
        }
        if($("#salidziniLV").length > 0){
        $("#salidziniLV")[0].setAttribute("scrolling", "no");
        }
        $("#scrollONPlus").show();
    }

    function frameEmpty(){

      $('div#IDEFrame').empty();
      $('div#IATFrame').empty();
      $('div#IFRFrame').empty();
      $('div#IESFrame').empty();
      $('div#IITFrame').empty();
      $('div#KNLFrame').empty();
      $('div#AHUFrame').empty();
      $('div#CROFrame').empty();
      $('div#HCZFrame').empty();
      $('div#HSKFrame').empty();
      $('div#JHRFrame').empty();
      $('div#KLTFrame').empty();
      $('div#PDKFrame').empty();
      $('div#PSEFrame').empty();
      $('div#SLVFrame').empty();

    };

    function showFrameButtons(){

      $('#AHU').show(1000);
      $('#CRO').show(1000);
      $('#HCZ').show(1000);
      $('#HSK').show(1000);
      $('#JHR').show(1000);
      $('#KLT').show(1000);
      $('#PDK').show(1000);
      $('#PSE').show(1000);
      $('#SLV').show(1000);

    }

    function IDEFrame(){
        $('div#IDEFrame').empty();
        $('#IDEFrame').append('<div class="row" style="margin-left:20px;"><h3 class="box-title">Idealo.de &nbsp <img onclick="IDEFrame()" src="img/ref.png"></h3></div><div class="row"><iframe id="idealoDE" style="height: 380px; width: 100%; margin-left:20px; margin-right:20px;" scrolling="yes" src="https://www.idealo.de/preisvergleich/MainSearchProductCategory.html?q=' + SQ +'#tiles"></div>');
    };

    function IATFrame(){
        $('div#IATFrame').empty();
        $('#IATFrame').append('<div class="row" style="margin-left:20px;"><h3 class="box-title">Idealo.at &nbsp <img onclick="IATFrame()" src="img/ref.png"></h3></div><div class="row"><iframe id="idealoAT" style="height: 380px; width: 100%; margin-left:20px; margin-right:20px;" scrolling="yes" src="https://www.idealo.at/preisvergleich/MainSearchProductCategory.html?q=' + SQ +'#tiles"></div>');
    };

    function IFRFrame(){
        $('div#IFRFrame').empty();
        $('#IFRFrame').append('<div class="row" style="margin-left:20px;"><h3 class="box-title">Idealo.fr &nbsp <img onclick="IFRFrame()" src="img/ref.png"></h3></div><div class="row"><iframe id="idealoFR" style="height: 380px; width: 100%; margin-left:20px; margin-right:20px;" scrolling="yes" src="https://www.idealo.fr/prechcat.html?q=' + SQ +'#tiles"></div>');
    };

    function IESFrame(){
        $('div#IESFrame').empty();
        $('#IESFrame').append('<div class="row" style="margin-left:20px;"><h3 class="box-title">Idealo.es &nbsp <img onclick="IESFrame()" src="img/ref.png"></h3></div><div class="row"><iframe id="idealoES" style="height: 380px; width: 100%; margin-left:20px; margin-right:20px;" scrolling="yes" src="https://www.idealo.es/resultados.html?q=' + SQ +'#tiles"></div>');
    };

    function IITFrame(){
        $('div#IITFrame').empty();
        $('#IITFrame').append('<div class="row" style="margin-left:20px;"><h3 class="box-title">Idealo.it &nbsp <img onclick="IITFrame()" src="img/ref.png"></h3></div><div class="row"><iframe id="idealoIT" style="height: 380px; width: 100%; margin-left:20px; margin-right:20px;" scrolling="yes" src="https://www.idealo.it/risultati.html?q=' + SQ +'#tiles"></div>');
    };
    function KNLFrame(){
        $('div#KNLFrame').empty();
        $('#KNLFrame').append('<div class="row" style="margin-left:20px;"><h3 class="box-title">Kieskeurig.nl &nbsp <img onclick="KNLFrame()" src="img/ref.png"></h3></div><div class="row"><iframe id="kieskeurigIT" style="height: 380px; width: 100%; margin-left:20px; margin-right:20px;" scrolling="yes" src=https://www.kieskeurig.nl/search?rq=&min='+lowest/euro+'&max=&min_default=&max_default=&sort=rel&pcode=ontharen_ipl&q=' + SQ + '></div>');
    };

    function AHUFrame(){
        $('div#AHUFrame').empty();
        $('#AHU').hide(1000);
        $('#AHUFrame').append('<div class="row" style="margin-left:20px;"><h3 class="box-title">Argep.hu &nbsp <img onclick="AHUFrame()" src="img/ref.png"></h3></div><div class="row"><iframe id="argepHU" style="height: 340px; width: 100%; margin-left:20px; margin-right:20px;" scrolling="yes" src="https://www.argep.hu/main.aspx?suche=' + SQ +'#ajg.1.23B10B1B44CD99BA7501793C78312F6D"></div>');
    };

    function CPLFrame(){
        $('#CPL').show(1000);
    };

    function CROFrame(){
        $('div#CROFrame').empty();
        $('#CRO').hide(1000);
        $('#CROFrame').append('<div class="row" style="margin-left:20px;"><h3 class="box-title">Compari.ro &nbsp <img onclick="CROFrame()" src="img/ref.png"></h3></div><div class="row"><iframe id="compariRO" style="height: 340px; width: 100%; margin-left:20px;" scrolling="yes" src="https://www.compari.ro/CategorySearch.php?st=' + SQ + '&minprice=' + low/leja + '"></div>'); 
    };

    function HCZFrame(){
        $('div#HCZFrame').empty();
        $('#HCZ').hide(1000);
        $('#HCZFrame').append('<div class="row"style="margin-left:20px;"><h3 class="box-title">Heureka.cz &nbsp <img onclick="HCZFrame()" src="img/ref.png"></h3></div><div class="row"><iframe id="heurekaCZ" style="height: 340px; width: 100%; margin-left:20px;" scrolling="yes" src="https://www.heureka.cz/?h%5Bfraze%5D=' + SQ + '&min=' + low/koronaCZ + '&max=&gty=new&o=1&o=3#text"></div>');
    };

    function HSKFrame(){
        $('div#HSKFrame').empty();
        $('#HSK').hide(1000);
        $('#HSKFrame').append('<div class="row" style="margin-left:20px;"><h3 class="box-title">Heureka.sk &nbsp <img onclick="HSKFrame()" src="img/ref.png"></h3></div><div class="row"><iframe id="heurekaSK" style="height: 340px; width: 100%; margin-left:20px;" scrolling="yes" src="https://www.heureka.sk/?h%5Bfraze%5D=' + SQ + '&min=' + low/euro + '&max=&gty=new&o=1&o=3#text"></div>');
    };

    function JHRFrame(){
        $('div#JHRFrame').empty();
        $('#JHR').hide(1000);
        $('#JHRFrame').append('<div class="row" style="margin-left:20px;"><h3 class="box-title">Jeftinije.hr &nbsp <img onclick="JHRFrame()" src="img/ref.png"></h3></div><div class="row"><iframe id="jeftinijeHR" style="height: 340px; width: 100%; margin-left:20px;" scrolling="yes" src="https://www.jeftinije.hr/Trazenje/Proizvodi?q=' + SQ + '&craz=BZ' + low/kuna + 'Z99999#mainContent"></div>');
    };

    function KLTFrame(){
        $('div#KLTFrame').empty();
        $('#KLT').hide(1000);
        $('#KLTFrame').append('<div class="row" style="margin-left:20px;"><h3 class="box-title">Kainos.lt &nbsp <img onclick="KLTFrame()" src="img/ref.png"></h3></div><div class="row"><iframe id="kainosLT" style="height: 340px; width: 100%; margin-left:20px;" scrolling="yes" src="https://www.kainos.lt/lt/search?search_query=' + SQ + '&submit_search=Ie%C5%A1koti#search_results"></div>');
    };

    function PDKFrame(){
        $('div#PDKFrame').empty();
        $('#PDK').hide(1000);
        $('#PDKFrame').append('<div class="row" style="margin-left:20px;"><h3 class="box-title">Pricerunner.dk &nbsp <img onclick="PDKFrame()" src="img/ref.png"></h3></div><div class="row"><iframe id="pricerunnerDK" style="height: 340px; width: 100%; margin-left:20px;" scrolling="yes" src="https://www.pricerunner.dk/search?&q=' + SQ + '#price_list_content"></div>');
    };

    function PSEFrame(){
        $('div#PSEFrame').empty();
        $('#PSE').hide(1000);
        $('#PSEFrame').append('<div class="row" style="margin-left:20px;"><h3 class="box-title">Pricerunner.se &nbsp <img onclick="PSEFrame()" src="img/ref.png"></h3></div><div class="row"><iframe id="pricerunnerSE" style="height: 340px; width: 100%; margin-left:20px;" scrolling="yes" src="https://www.pricerunner.dk/search?&q=' + SQ + '#price_list_content"></div>');
    };

    function SLVFrame(){
        $('div#SLVFrame').empty();
        $('#SLV').hide(1000);
        $('#SLVFrame').append('<div class="row" style="margin-left:20px;"><h3 class="box-title">Salidzini.lv &nbsp <img onclick="SLVFrame()" src="img/ref.png"></h3></div><div class="row"><iframe id="salidziniLV" style="height: 340px; width: 100%; margin-left:20px;" scrolling="yes" src="https://www.salidzini.lv/search.php?q=' + SQ + '&cn=' + low/euro + '#ct"></div>');
    };

    function showSearch(){
      $('#showSearch').hide(300);
      $('#searchHead').show(1000);
      $('#searchBox').show(1000);
    }

    function showCRO(){
      $("#hideCRO").show();
      $("#showCRO").hide();
      $(".CROROW").show();
    };

    function hideCRO(){
      $("#hideCRO").hide();
      $("#showCRO").show();
      $(".CROROW").hide();
    };

    function showAHU(){
      $("#hideAHU").show();
      $("#showAHU").hide();
      $(".AHUROW").show();
    };

    function hideAHU(){
      $("#hideAHU").hide();
      $("#showAHU").show();
      $(".AHUROW").hide();
    };

    function showSLV(){
      $("#hideSLV").show();
      $("#showSLV").hide();
      $(".SLVROW").show();
    };

    function hideSLV(){
      $("#hideSLV").hide();
      $("#showSLV").show();
      $(".SLVROW").hide();
    };

    function showKLT(){
      $("#hideKLT").show();
      $("#showKLT").hide();
      $(".KLTROW").show();
    };

    function hideKLT(){
      $("#hideKLT").hide();
      $("#showKLT").show();
      $(".KLTROW").hide();
    };

    function showJHR(){
      $("#hideJHR").show();
      $("#showJHR").hide();
      $(".JHRROW").show();
    };

    function hideJHR(){
      $("#hideJHR").hide();
      $("#showJHR").show();
      $(".JHRROW").hide();
    };

    function showGEI(){
      $("#hideGEI").show();
      $("#showGEI").hide();
      $(".GEIROW").show();
    };

    function hideGEI(){
      $("#hideGEI").hide();
      $("#showGEI").show();
      $(".GEIROW").hide();
    };

    function showCPL(){
      $("#hideCPL").show();
      $("#showCPL").hide();
      $(".CPLROW").show();
    };

    function hideCPL(){
      $("#hideCPL").hide();
      $("#showCPL").show();
      $(".CPLROW").hide();
    };

    function showTIT(){
      $("#hideTIT").show();
      $("#showTIT").hide();
      $(".TITROW").show();
    };

    function hideTIT(){
      $("#hideTIT").hide();
      $("#showTIT").show();
      $(".TITROW").hide();
    };

    function showPDK(){
      $("#hidePDK").show();
      $("#showPDK").hide();
      $(".PDKROW").show();
    };

    function hidePDK(){
      $("#hidePDK").hide();
      $("#showPDK").show();
      $(".PDKROW").hide();
    };

    function showPSE(){
      $("#hidePSE").show();
      $("#showPSE").hide();
      $(".PSEROW").show();
    };

    function hidePSE(){
      $("#hidePSE").hide();
      $("#showPSE").show();
      $(".PSEROW").hide();
    };

    function showHCZ(){
      $("#hideHCZ").show();
      $("#showHCZ").hide();
      $(".HCZROW").show();
    };

    function hideHCZ(){
      $("#hideHCZ").hide();
      $("#showHCZ").show();
      $(".HCZROW").hide();
    };

    function showHSK(){
      $("#hideHSK").show();
      $("#showHSK").hide();
      $(".HSKROW").show();
    };

    function hideHSK(){
      $("#hideHSK").hide();
      $("#showHSK").show();
      $(".HSKROW").hide();
    };