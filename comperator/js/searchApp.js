  function outcome(url, img, name, price, co){
    this.url = url;
    this.img = img;
    this.named = name;
    this.price = price;
    this.co = co;
  }



  var euro, leja, forint, funt, dolar, kuna;

  function getCurrency(){
            
            var cors_api_url = 'https://hidden-chamber-98689.herokuapp.com/http://www.nbp.pl/home.aspx?f=/kursy/kursya.html';
            $.get(cors_api_url, function(data){
            
                var result = data.replaceAll('src', '');

                var result = $(result);

                result = $(result); 
                result = result.find('td.right');
                euro = parseFloat(result[15].innerText.replace(/,/g, '.'));
                forint = parseFloat(result[17].innerText.replace(/,/g, '.'));
                funt = parseFloat(result[21].innerText.replace(/,/g, '.'));
                leja = parseFloat(result[39].innerText.replace(/,/g, '.'));
                dolar = parseFloat(result[3].innerText.replace(/,/g, '.'));
                kuna = parseFloat(result[37].innerText.replace(/,/g, '.'));
                koronaDK = parseFloat(result[29].innerText.replace(/,/g, '.'));
                koronaSE = parseFloat(result[35].innerText.replace(/,/g, '.'));
                koronaCZ = parseFloat(result[27].innerText.replace(/,/g, '.'));

                curs = [euro, forint, funt, leja, dolar, kuna, koronaDK, koronaSE, koronaCZ, 1];
                curF = curs[0];
                curT = curs[9];

                document.getElementById('euro').innerText = euro.toFixed(4);               
                document.getElementById('funt').innerText = funt.toFixed(4);            
                document.getElementById('dolar').innerText = dolar.toFixed(4);
                document.getElementById('korDK').innerText = koronaDK.toFixed(4);
                document.getElementById('korSE').innerText = koronaSE.toFixed(4);
                document.getElementById('korCZ').innerText = koronaCZ.toFixed(4);
                document.getElementById('leja').innerText = leja.toFixed(4);

              }); 


    };


function kieskeuringNL(searchQP, lowest){
      console.log(0);
      var cors_api_url = 'http://www.kieskeurig.nl/search?rq=&min='+lowest/euro+'&max=&min_default=&max_default=&sort=rel&pcode=ontharen_ipl&q=' + searchQP;
      $.getJSON('http://whateverorigin.org/get?url=' + encodeURIComponent(cors_api_url) + '&callback=?', function(data){
      console.log(data.contents);


      });

}


function compariRO(searchQP, lowest){
        
            
            var cors_api_url = 'https://hidden-chamber-98689.herokuapp.com/https://www.compari.ro/CategorySearch.php?st=' + searchQP + "&minprice=" + lowest/leja;
            var urlField = 'https://www.compari.ro/CategorySearch.php?st=' + searchQP + "&minprice=" + lowest/leja;
            var img = "img/compariRO.png";
            $.get(cors_api_url, function(data){
                      var outcomeArray = [];
                      var outcomeArrayTwo = [];   
                      var result = data;
                      result = $(result);
                      var resulted = result.find('div.product');
                      if(resulted.length == 0){

                        result = result.find('div.offer-box-container');
                        $.each(result, function(i, val){

                            var name = val.childNodes[1].childNodes[5].childNodes[1].innerText;
                            name = name.replace(/[\n]+/g, '');
                            name = name.substring(0,65);
                            var priceString = val.childNodes[1].childNodes[9].childNodes[3].innerText;
                            priceString = priceString.replace(/[a-z-A-Z\s]+/g, '')
                            var price = parseInt(priceString)*leja;
                            price = price.toFixed(2);
                            if(lowest - price > 0){
                            }else{
                            var outcomeCOM = new outcome(urlField, img, name, price, "compariRO");
                            outcomeArray.push(outcomeCOM);
                            }
                        });

                      }else{

                        var results = result.find('div.featured-products');
                        if(results.length > 0){
                        $.each(results, function(i, val){

                            var name = val.childNodes[1].childNodes[1].childNodes[3].childNodes[1].childNodes[1].innerText;
                            name = name.replace(/[\n]+/g, '');
                            name = name.substring(0,65);
                            var priceString = val.childNodes[1].childNodes[1].childNodes[5].childNodes[3].innerText;
                            priceString = priceString.replace(/[a-z-A-Z\s\n]+/g, '')
                            var price = parseInt(priceString)*leja;
                            price = price.toFixed(2);
                            if(lowest - price > 0){
                            }else{
                            var outcomeCOM = new outcome(urlField, img, name, price, "compariRO");
                            outcomeArray.push(outcomeCOM);
                            }
                        });
                        }

                        $.each(resulted, function(i, val){

                            var name = val.childNodes[3].childNodes[1].innerText;
                            name = name.replace(/[\n]+/g, '');
                            name = name.substring(0,65);
                            var priceString = val.childNodes[5].innerText;
                            priceString = priceString.replace(/[a-z-A-Z\s]+/g, '')
                            var price = parseInt(priceString)*leja;
                            price = price.toFixed(2);
                            if(lowest - price > 0){
                            }else{
                            var outcomeCOM = new outcome(urlField, img, name, price, "compariRO");
                            outcomeArray.push(outcomeCOM);
                            }
                        });
                      }
                      var best = outcomeArray.sort(function(a, b){return a.price - b.price });

                      if (best.length > 0) {

                            $('#outcomeTable tbody').append('<tr role="row" ><td ><a href="' + best[0].url +'" target="_blank"><img src="' + best[0].img +'"></a></td><td>'+ best[0].named +'</td><td>'+ best[0].price +'</td><td>'+ (best[0].price/euro).toFixed(2) +'</td><td>'+ (0.8*best[0].price/euro).toFixed(2) +'</td><td><button id="showCRO" class="btn btn-primary" onclick="showCRO()">Pokaż</button><button class="btn btn-primary" id="hideCRO" onclick="hideCRO()" style="display : none">Schowaj</button></td></tr>')

                        for (var i = 1; i < best.length; i++) {

                            $('#outcomeTable tbody').append('<tr role="row" class="CROROW" style = "display : none;" ><td ><a href="' + best[i].url +'" target="_blank"><img src="' + best[i].img +'"></a></td><td>'+ best[i].named +'</td><td>'+ best[i].price +'</td><td>'+ (best[i].price/euro).toFixed(2) +'</td><td>'+ (0.8*best[i].price/euro).toFixed(2) +'</td></tr>')
                      
                        };
                      }else{
                        CROFrame();
                      };

            }).fail(function(){

                console.log("couldn't get data from compari.ro");
                
            });;
            

};

      
function agrepHU(searchQP, lowest){
           
            var cors_api_url = 'https://hidden-chamber-98689.herokuapp.com/http://www.argep.hu/main.aspx?suche=' + searchQP + '&min=' + lowest/forint*100 + '&max=9000000';
            var urlField = "http://www.argep.hu/main.aspx?suche=" + searchQP;
            var img = "img/argepHU.png";
              
              $.get(cors_api_url, function(data){

                      var outcomeArray = [];   
                      var result = data.replaceAll('src', '');
                          result = $(result); 
                      var resulted = result.find('tr.TABLE_WHITE_KATALOG');
                          if (resulted.length > 0) {

                             $.each(resulted, function(i, val){
                                  
                                  var name = val.childNodes[1].childNodes[0].childNodes[1].innerText;
                                  name = name.replace(/[\n]+/g, '');
                                  name = name.substring(0,65);
                                  var priceString = val.childNodes[2].childNodes[0].childNodes[0].childNodes[0].childNodes[2].innerText;
                                  priceString = priceString.replace(/[a-z-A-Z\s]+/g, '');
                                  var price = parseInt(priceString)*forint/100;
                                  price = price.toFixed(2);
                                  if(lowest - price > 0){
                                  }else{
                                  var outcomeAGR = new outcome(urlField, img, name, price, "agrepHU");
                                  outcomeArray.push(outcomeAGR);
                                  }
                                  
                              });

                          }else{

                            result = result.find('tr.TABLE_WHITE');
                            $.each(result, function(i, val){
                                  var name = val.childNodes[1].innerText;
                                  name = name.replace(/[\n]+/g, '');
                                  name = name.substring(0,65);
                                  var priceString = val.childNodes[2].childNodes[0].childNodes[1].innerText;
                                  priceString = priceString.replace(/[a-z-A-Z\s]+/g, '');
                                  var price = parseInt(priceString)*forint/100;
                                  price = price.toFixed(2);
                                  if(lowest - price > 0){
                                  }else{
                                  var outcomeAGR = new outcome(urlField, img, name, price, "agrepHU");
                                  outcomeArray.push(outcomeAGR);
                                  }
                              });


                          } 

                      var best = outcomeArray.sort(function(a, b){return a.price - b.price });
                      if(best.length > 0){
                          $('#outcomeTable tbody').append('<tr role="row" ><td ><a href="' + best[0].url +'" target="_blank"><img src="' + best[0].img +'"></a></td><td>'+ best[0].named +'</td><td>'+ best[0].price +'</td><td>'+ (best[0].price/euro).toFixed(2) +'</td><td>'+ (0.73*best[0].price/euro).toFixed(2) +'</td><td><button id="showAHU" class="btn btn-primary" onclick = "showAHU()">Pokaż</button><button class="btn btn-primary" id="hideAHU" onclick = "hideAHU()" style="display : none">Schowaj</button></td></tr>')

                        for (var i = 1; i < best.length; i++) {

                          $('#outcomeTable tbody').append('<tr role="row" class="AHUROW" style = "display : none;" ><td ><a href="' + best[i].url +'" target="_blank"><img src="' + best[i].img +'"></a></td><td>'+ best[i].named +'</td><td>'+ best[i].price +'</td><td>'+ (best[i].price/euro).toFixed(2) +'</td><td>'+ (0.73*best[i].price/euro).toFixed(2) +'</td></tr>')
                      
                        };
                      }else{
                        AHUFrame();
                      };


            }).fail(function(){

                console.log("couldn't get data from agrep.hu");
                AHUFrame();

            });
};


function salidziniLV(searchQP, lowest) {

            var img = "img/salidziniLV.png";
            var cors_api_url = 'https://hidden-chamber-98689.herokuapp.com/https://www.salidzini.lv/search.php?q=' + searchQP + "&cn=" + lowest/euro;
            var urlField = 'https://www.salidzini.lv/search.php?q=' + searchQP + "&cn=" + lowest/euro;
            $.get(cors_api_url, function(data){

                    var outcomeArray = [];   
                    var result = data.replaceAll('src', '');
                    result = $(result); 
                    result = result.find('td.list_item');

                      $.each(result, function(i, val){

                        var name = val.childNodes[2].childNodes[0];
                        var nameTwo = val.childNodes[3].childNodes[0];
                        if (name.innerText == ""){
                            var named = val.childNodes[3].childNodes[0].innerText;
                        }else{
                            var named = name.innerText;
                        };
                        named = named.replace(/[\n]+/g, '');
                        named = named.substring(0,65);

                        var priceString = val.childNodes[3].childNodes[1];
                        if (priceString == undefined){
                            var priceStringed = val.childNodes[4].childNodes[1].innerText;
                        }else{
                            var priceStringed = priceString.innerText;
                        };
                        priceStringed = priceStringed.replace(/[a-z-A-Z\s]+/g, '');
                        var price = parseInt(priceStringed*euro);
                        price = price.toFixed(2);

                        if(lowest - price > 0){
                        }else{
                        var outcomeSAL = new outcome(urlField, img, named, price, "salidziniLV");
                        outcomeArray.push(outcomeSAL);
                        }

                      });

                      var best = outcomeArray.sort(function(a, b){return a.price - b.price });

                      if(best.length > 0){
                          $('#outcomeTable tbody').append('<tr role="row" ><td ><a href="' + best[0].url +'" target="_blank"><img src="' + best[0].img +'"></a></td><td>'+ best[0].named +'</td><td>'+ best[0].price +'</td><td>'+ (best[0].price/euro).toFixed(2) +'</td><td>'+ (0.79*best[0].price/euro).toFixed(2) +'</td><td><button id="showSLV" class="btn btn-primary" onclick="showSLV()">Pokaż</button><button class="btn btn-primary" id="hideSLV" onclick="hideSLV()" style="display : none">Schowaj</button></td></tr>')

                        for (var i = 1; i < best.length; i++) {

                          $('#outcomeTable tbody').append('<tr role="row" class="SLVROW" style = "display : none;" ><td ><a href="' + best[i].url +'" target="_blank"><img src="' + best[i].img +'"></a></td><td>'+ best[i].named +'</td><td>'+ best[i].price +'</td><td>'+ (best[i].price/euro).toFixed(2) +'</td><td>'+ (0.79*best[i].price/euro).toFixed(2) +'</td></tr>')
                      
                        };
                      }else{
                        SLVFrame();
                      };
                  }).fail(function(){

                          console.log("couldn't get data from salidziniLV");

                  });
};

function kainosLT(searchQP, lowest){

            var img = "img/kainosLT.png";
            var cors_api_url = 'https://hidden-chamber-98689.herokuapp.com/http://www.kainos.lt/lt/search?search_query=' + searchQP + '&submit_search=Ie%C5%A1koti'
            var urlField = "http://www.kainos.lt/lt/search?search_query=" + searchQP + "&submit_search=Ie%C5%A1koti";
            $.get(cors_api_url, function(data){

                  var outcomeArray = [];   
                  var result = data.replaceAll('src', '');
                  result = $(result);
                  var resulted = result.find('tr.block-link');
                  if (resulted.length == 0) {

                    result = result.find('tr.price-row');
                    $.each(result, function(i, val){

                      var name = val.childNodes[11].childNodes[1].childNodes[1].innerText;
                      name = name.replace(/[\n]+/g, '');
                      name = name.substring(0,65);
                      var priceString = val.childNodes[11].childNodes[1].childNodes[3].innerText;
                      priceString = priceString.replace(/[a-z-A-Z()\s]+/g, '');
                      var price = parseInt(priceString)*euro;
                      price = price.toFixed(2);
                      if(lowest - price > 0){
                      }else{
                      var outcomeKAI = new outcome(urlField, img, name, price, "kainosLT");
                      outcomeArray.push(outcomeKAI);
                      }
                    });

                  }else{
                   $.each(resulted, function(i, val){

                      var name = val.childNodes[1].childNodes[1].childNodes[3].innerText;
                      name = name.replace(/[\n]+/g, '');
                      name = name.substring(0,65);
                      var priceString = val.childNodes[1].childNodes[1].childNodes[5].childNodes[0].data;
                      priceString = priceString.replace(/[a-z-A-Z().\s]+/g, '');
                      var price = parseInt(priceString)*euro;
                      price = price.toFixed(2);
                      if(lowest - price > 0){
                      }else{
                      var outcomeKAI = new outcome(urlField, img, name, price, "kainosLT");
                      outcomeArray.push(outcomeKAI);
                      }
                    });
                  };
                    var best = outcomeArray.sort(function(a, b){return a.price - b.price });
                    if(best.length > 0){
                          $('#outcomeTable tbody').append('<tr role="row" ><td ><a href="' + best[0].url +'" target="_blank"><img src="' + best[0].img +'"></a></td><td>'+ best[0].named +'</td><td>'+ best[0].price +'</td><td>'+ (best[0].price/euro).toFixed(2) +'</td><td>'+ (0.79*best[0].price/euro).toFixed(2) +'</td><td><button id="showKLT" class="btn btn-primary" onclick="showKLT()">Pokaż</button><button class="btn btn-primary" onclick="hideKLT()" id="hideKLT" style="display : none">Schowaj</button></td></tr>')

                      for (var i = 1; i < best.length; i++) {

                          $('#outcomeTable tbody').append('<tr role="row" class="KLTROW" style = "display : none;" ><td ><a href="' + best[i].url +'" target="_blank"><img src="' + best[i].img +'"></a></td><td>'+ best[i].named +'</td><td>'+ best[i].price +'</td><td>'+ (best[i].price/euro).toFixed(2) +'</td><td>'+ (0.79*best[i].price/euro).toFixed(2) +'</td></tr>')
                      
                      };
                    }else{
                        KLTFrame();
                      };

                  }).fail(function(){

                          console.log("couldn't get data from kainosLT");

                  });
};




function jeftinijeHR(searchQP, lowest) {

            var img = "img/jeftinijeHR.png";
            var cors_api_url = 'https://hidden-chamber-98689.herokuapp.com/https://www.jeftinije.hr/Trazenje/Proizvodi?q=' + searchQP + "&craz=BZ" + "2000" +"Z99999";
            var urlField = 'https://www.jeftinije.hr/Trazenje/Proizvodi?q=' + searchQP;
            $.get(cors_api_url, function(data){

                  var outcomeArray = [];   
                  var result = data.replaceAll('src', '');
                  result = $(result);
                  var results = result.find('div.productBox');
                  if (results.length == 0) {
                    results = result.find('div.productBoxGrid ');
                  };

                      $.each(results, function(i, val){

                          var name = val.childNodes[1].childNodes[3].childNodes[1].childNodes[1].innerText;
                          name = name.replace(/[\n]+/g, '');
                          name = name.substring(0,65);
                          var priceString = val.childNodes[1].childNodes[3].childNodes[3].childNodes[1].innerText;
                          priceString = priceString.replace(/[a-z-A-Z().\s]+/g, '');
                          var price = parseInt(priceString)*kuna;
                          price = price.toFixed(2);
                          if(lowest - price > 0){
                          }else{
                          var outcomeJEF = new outcome(urlField, img, name, price, "jeftinijeHR");
                          outcomeArray.push(outcomeJEF);
                          }
                        });

                      var best = outcomeArray.sort(function(a, b){return a.price - b.price });
                      if(best.length > 0){

                          $('#outcomeTable tbody').append('<tr role="row" ><td ><a href="' + best[0].url +'" target="_blank"><img src="' + best[0].img +'"></a></td><td>'+ best[0].named +'</td><td>'+ best[0].price +'</td><td>'+ (best[0].price/euro).toFixed(2) +'</td><td>'+ (0.75*best[0].price/euro).toFixed(2) +'</td><td><button class="btn btn-primary" id="showJHR" onclick="showJHR()">Pokaż</button><button class="btn btn-primary" id="hideJHR" onclick="hideJHR()" style="display : none">Schowaj</button></td></tr>')

                      for (var i = 1; i < best.length; i++) {

                          $('#outcomeTable tbody').append('<tr role="row" class="JHRROW" style = "display : none;" ><td ><a href="' + best[i].url +'" target="_blank"><img src="' + best[i].img +'"></a></td><td>'+ best[i].named +'</td><td>'+ best[i].price +'</td><td>'+ (best[i].price/euro).toFixed(2) +'</td><td>'+ (0.75*best[i].price/euro).toFixed(2) +'</td></tr>')
                      
                      };
                      }else{
                        JHRFrame();
                      };
                    }).fail(function(){

                          console.log("couldn't get data from jeftinijeHR");

                  });
};



function geizhals(searchQP, lowest) {

            var img = "img/geizhals.png";
            var cors_api_url = 'https://hidden-chamber-98689.herokuapp.com/http://geizhals.at/?fs=' + searchQP + '&in='
            var urlField = 'http://geizhals.at/?fs=' + searchQP + '&in=';

            $.get(cors_api_url, function(data){
              var outcomeArray = [];   
              var result = data.replaceAll('src', '');
              result = $(result);
              result = result.find('table');
              var specialLinked = undefined;
              var j = 1;
              while(specialLinked == undefined){
              specialLinked = result[0].childNodes[0].childNodes[j].childNodes[3].childNodes[0].childNodes[0];
              j = j + 1;
              };
              var specialLink = specialLinked.href;

 
                    if (specialLink.length > 0) {
      
                          specialLink = specialLink.slice(specialLink.indexOf('geizhals'), specialLink.length) + "?t=alle&plz=&va=b&vl=uk&hloc=at&hloc=de&hloc=uk&v=e#filterform";
                          specialLink = specialLink.replace(/(file:\/\/)/g, '')  
                          var urlFieldTwo = specialLink;        
                          var cors_api_url_2 = 'https://hidden-chamber-98689.herokuapp.com/' + specialLink;
                  
                          $.get(cors_api_url_2, function(data){
                            var outcomeArray = [];   
                            var result = data.replaceAll('src', '');
                            result = $(result);
                            result = result.find('div.offer');
                                $.each(result, function(i, val){

                                    var name = val.childNodes[9].childNodes[0].data;
                                    name = name.replace(/[\n]+/g, '');
                                    name = name.substring(0,65);
                                    var priceString = val.childNodes[1].childNodes[0].childNodes[0].data;
                                    priceString = priceString.replace(/[a-z-A-Z()€\s]+/g, '');
                                    var price = parseInt(priceString)*euro;
                                    price = price.toFixed(2);
                                    if(lowest - price > 0){
                                    }else{
                                    var outcomeGEI = new outcome('http://geizhals.at/?fs=' + searchQP + '&in=', img, name, price, "geizhals");
                                    outcomeArray.push(outcomeGEI);
                                    }
                                  });
                            var best = outcomeArray.sort(function(a, b){return a.price - b.price });
                      if(best.length > 0){
                          $('#outcomeTable tbody').append('<tr role="row" ><td ><a href="' + best[0].url +'" target="_blank"><img src="' + best[0].img +'"></a></td><td>'+ best[0].named +'</td><td>'+ best[0].price +'</td><td>'+ (best[0].price/euro).toFixed(2) +'</td><td>'+ (0.8*best[0].price/euro).toFixed(2) +'</td><td><button id="showGEI" class="btn btn-primary" onclick="showGEI()">Pokaż</button><button class="btn btn-primary" id="hideGEI" onclick="hideGEI()" style="display : none">Schowaj</button></td></tr>')

                      for (var i = 1; i < best.length; i++) {

                          $('#outcomeTable tbody').append('<tr role="row" class="GEIROW" style = "display : none;" ><td ><a href="' + best[i].url +'" target="_blank"><img src="' + best[i].img +'"></a></td><td>'+ best[i].named +'</td><td>'+ best[i].price +'</td><td>'+ (best[i].price/euro).toFixed(2) +'</td><td>'+ (0.8*best[i].price/euro).toFixed(2) +'</td></tr>')
                      
                      };
                      };

                            })
                    }else{

                          console.log("no specialLink found");

                    }; 

              }).fail(function(){

                    console.log("couldn't get data from geizhals");

              });
};

function ceneo(searchQP, lowest) {

          var cors_api_url = 'https://hidden-chamber-98689.herokuapp.com/http://www.ceneo.pl/;szukaj-' + searchQP + ";m" + lowest + ";0112-0.htm";
          var urlField = 'http://www.ceneo.pl/;szukaj-' + searchQP;
          var img = "img/ceneoPL.png";

          $.get(cors_api_url, function(data){

              var outcomeArray = [];   
              var result = data.replaceAll('src', '');
              result = $(result);
              result = result.find('div.btn-compare-outer');
              var specialLink = result[0].childNodes[1].href;
              if(specialLink.indexOf("promotion") == -1){
              }else{
                if(1 < result.length){
                specialLink = result[1].childNodes[1].href;
                }
              }
              if (specialLink.length > 0){
                  var specialLink = specialLink.replace(/(file:\/\/\/)+/g, 'http://www.ceneo.pl/');
                  var cors_api_url = 'https://hidden-chamber-98689.herokuapp.com/' + specialLink;
                  var urlFieldTwo = specialLink;
                  $.get(cors_api_url, function(data){

                            var outcomeArray = [];   
                            var result = data.replaceAll('src', '');
                            result = $(result);
                            result = result.find('tr.product-offer');
                           
                                $.each(result, function(i, val){

                                    var name = val.childNodes[7].childNodes[1].childNodes[1].childNodes[1].childNodes[1].innerText;
                                    name = name.replace(/[\n]+/g, '');
                                    name = name.substring(0,65);
                                    var priceString = val.childNodes[9].childNodes[1].childNodes[1].innerText;
                                    priceString = priceString.replace(/[a-z-A-Z()€\s]+/g, '');
                                    priceString = priceString.replace(/,/g, '.');
                                    var price = parseInt(priceString);
                                    price = price.toFixed(2);
                                    if(lowest - price > 0){
                                    }else{
                                    var outcomeCEN = new outcome(urlFieldTwo, img, name, price, "ceneo");
                                    outcomeArray.push(outcomeCEN);
                                    }
                                  });

                            var best = outcomeArray.sort(function(a, b){return a.price - b.price });
                      if(best.length > 0){
                          $('#outcomeTable tbody').append('<tr role="row" ><td ><a href="' + specialLink +'" target="_blank"><img src="' + best[0].img +'"></a></td><td>'+ best[0].named +'</td><td>'+ best[0].price +'</td><td>'+ (best[0].price/euro).toFixed(2) +'</td><td>'+ (0.77*best[0].price/euro).toFixed(2) +'</td><td><button class="btn btn-primary" id="showCPL" onclick="showCPL()">Pokaż</button><button class="btn btn-primary" id="hideCPL" onclick="hideCPL()" style="display : none">Schowaj</button></td></tr>')

                      for (var i = 0; i < best.length; i++) {

                          $('#outcomeTable tbody').append('<tr role="row" class="CPLROW" style = "display : none;" ><td ><a href="' + specialLink +'" target="_blank"><img src="' + best[i].img +'"></a></td><td>'+ best[i].named +'</td><td>'+ best[i].price +'</td><td>'+ (best[i].price/euro).toFixed(2) +'</td><td>'+ (0.77*best[i].price/euro).toFixed(2) +'</td></tr>')
                      
                      };
                    }else{
                        CPLFrame();
                      };
                  }).fail(function(){

                      console.log("no specialLink found");

                  })


              }else{
                    console.log("no specialLink found")
              };

            }).fail(function(){

                  console.log("couldn't get data from ceneo");

            });
        };

function trovaprezziIT(searchQP, lowest) {

            var img = "img/trovaprezziIT.png"
            var cors_api_url = 'https://hidden-chamber-98689.herokuapp.com/http://www.trovaprezzi.it/categoria.aspx?id=-1&libera=' + searchQP + '&prezzomin=&prezzomax=';
            var urlField = 'http://www.trovaprezzi.it/categoria.aspx?id=-1&libera=' + searchQP + '&prezzomin=&prezzomax=';
            $.get(cors_api_url, function(data){


              var outcomeArray = [];   
              var result = data.replaceAll('src', '');
              result = $(result);
              if (result.find('div.catsMITitle').length > 0){
                  var specialLink = result.find('div.catsMI');
                  specialLink = specialLink[0].childNodes[1].childNodes[1].href;
                  var cors_api_url_2 = "http://www.trovaprezzi.it/" + specialLink.slice(8)
                  $.getJSON('http://whateverorigin.org/get?url=' + cors_api_url_2 + '&callback=?')
                    .then(function(data){
                      var result = $(data.contents.replaceAll('src', ''));
                      result = result.find('div.listing_item_info');

                      $.each(result, function(i, val){

                          var name = val.childNodes[1].childNodes[1].innerText;
                          name = name.replace(/[\n]+/g, '');
                          name = name.substring(0,65);
                          var priceString = val.childNodes[5].childNodes[5].innerText;
                          priceString = priceString.replace(/[a-z-A-Z:()€\s]+/g, '');
                          priceString = priceString.replace(/,/g, '.');
                          var price = parseInt(priceString)*euro;
                          price = price.toFixed(2);
                          if(lowest - price > 0){
                          }else{
                          var outcomeTRO = new outcome(urlField, img, name, price, "trovaprezziIT");
                          outcomeArray.push(outcomeTRO);
                          }
                      });
                    var best = outcomeArray.sort(function(a, b){return a.price - b.price });
                    if(best.length > 0){
                            $('#outcomeTable tbody').append('<tr role="row" ><td ><a href="' + best[0].url +'" target="_blank"><img src="' + best[0].img +'"></a></td><td>'+ best[0].named +'</td><td>'+ best[0].price +'</td><td>'+ (best[0].price/euro).toFixed(2) +'</td><td>'+ (0.78*best[0].price/euro).toFixed(2) +'</td><td><button class="btn btn-primary" id="showTIT" onclick="showTIT()">Pokaż</button><button class="btn btn-primary" onclick="hideTIT" id="hideTIT" style="display : none">Schowaj</button></td></tr>')

                    for (var i = 1; i < best.length; i++) {

                            $('#outcomeTable tbody').append('<tr role="row" class="TITROW" style = "display : none;" ><td ><a href="' + best[i].url +'" target="_blank"><img src="' + best[i].img +'"></a></td><td>'+ best[i].named +'</td><td>'+ best[i].price +'</td><td>'+ (best[i].price/euro).toFixed(2) +'</td><td>'+ (0.78*best[i].price/euro).toFixed(2) +'</td></tr>')
                                      
                    };
                    };

                  }).fail(function(){

                      console.log("couldn't get data from trovaprezziIT");

                  }); 


              }else{
                if (result.find('div.listing_item_info').length > 0){

                  result = result.find('div.listing_item_info');
                    $.each(result, function(i, val){

                        var name = val.childNodes[1].childNodes[1].innerText;
                        name = name.replace(/[\n]+/g, '');
                        name = name.substring(0,65);
                        var priceString = val.childNodes[5].childNodes[5].innerText;
                        priceString = priceString.replace(/[a-z-A-Z:()€\s]+/g, '');
                        priceString = priceString.replace(/,/g, '.');
                        var price = parseInt(priceString)*euro;
                        price = price.toFixed(2);
                        if(lowest - price > 0){
                        }else{
                        var outcomeTRO = new outcome(urlField, img, name, price, "trovaprezziIT");
                        outcomeArray.push(outcomeTRO);
                        }
                    });

                }else{
                  result = result.find('div.list_item');
                    $.each(result, function(i, val){

                        var name = val.childNodes[1].innerText;
                        name = name.replace(/[\n]+/g, '');
                        name = name.substring(0,65);
                        var priceString = val.childNodes[5].innerText;
                        priceString = priceString.replace(/[a-z-A-Z:()€\s]+/g, '');
                        priceString = priceString.replace(/,/g, '.');
                        var price = parseInt(priceString)*euro;
                        price = price.toFixed(2);
                        if(lowest - price > 0){
                        }else{
                        var outcomeTRO = new outcome(urlField, img, name, price, "trovaprezziIT");
                        outcomeArray.push(outcomeTRO);
                        }
                    });  

                
               };
              };
              var best = outcomeArray.sort(function(a, b){return a.price - b.price });
              if (best.length > 0){
                          $('#outcomeTable tbody').append('<tr role="row" ><td ><a href="' + best[0].url +'" target="_blank"><img src="' + best[0].img +'"></a></td><td>'+ best[0].named +'</td><td>'+ best[0].price +'</td><td>'+ (best[0].price/euro).toFixed(2) +'</td><td>'+ (0.78*best[0].price/euro).toFixed(2) +'</td><td><button class="btn btn-primary" id="showTIT" onclick="showTIT()">Pokaż</button><button class="btn btn-primary" id="hideTIT" onclick="hideTIT()" style="display : none">Schowaj</button></td></tr>')

                      for (var i = 1; i < best.length; i++) {

                          $('#outcomeTable tbody').append('<tr role="row" class="TITROW"  style = "display : none;" ><td ><a href="' + best[i].url +'" target="_blank"><img src="' + best[i].img +'"></a></td><td>'+ best[i].named +'</td><td>'+ best[i].price +'</td><td>'+ (best[i].price/euro).toFixed(2) +'</td><td>'+ (0.78*best[i].price/euro).toFixed(2) +'</td></tr>')
                      
                      };
              };

              }).fail(function(){

                  console.log("couldn't get data from trovaprezziIT");

              });

        };


function pricerunnerDK(searchQP, lowest){
            
            var img = "img/pricerunnerSE.png"
            var searchQPE = searchQP.replace(/\+/g, "2B");
            var searchQ = searchQP.replace(/\+/g, " ");
            var cors_api_url_bot = 'https://hidden-chamber-98689.herokuapp.com/https://redbot.org/?uri=http%3A%2F%2Fwww.pricerunner.dk%2Fsearch%3F%26q%3D' + searchQP;
            var urlField = 'www.pricerunner.dk/search?&q=' + searchQP;

            $.get(cors_api_url_bot, function(bot){

                  var resultLink = bot;
                  resultLink = $(resultLink);
                  resultLink = resultLink[29];
                  resultLink = resultLink.childNodes[5].childNodes[11].childNodes[1].href;
                  resultLink = resultLink.slice(resultLink.indexOf('id'), resultLink.length); 
                  var cors_api_url_har = 'https://hidden-chamber-98689.herokuapp.com/https://redbot.org/?' + resultLink;
                  var x = new XMLHttpRequest();
                  x.open('GET', cors_api_url_har, true);
                  x.send(null);
                  x.onreadystatechange = function() {
                    if (x.readyState == 4) {
                      var link = x.responseText
                      link = link.replace(/\n/g, '');
                      link = link.match(/(redirectURL)(.*?)(\",)/g);
                      link = link[0].replace(/[\s : \" , ]/g, '');
                      link = link.replace(/(redirectURL)/g, '');
                      var nextLink = link.substring(2, link.length);
                      nextLink = "http://www.pricerunner.dk/c" + nextLink;
                      nextLink = nextLink.replace(/\//g, '%2F');
                      nextLink = nextLink.replace(/:/g, '%3A');
                      nextLink = nextLink.replace(/\?/g, '%3F');
                      nextLink = nextLink.replace(/&/g, '%26');
                      nextLink = nextLink.replace(/=/g, '%3D');
                      nextLink = nextLink.replace(/\+/g, '%2B');
                      nextLink = 'https://hidden-chamber-98689.herokuapp.com/https://redbot.org/?uri=' + nextLink;

                      $.get(nextLink, function(bot){

                      var resultLink = bot;
                      resultLink = $(resultLink);
                      resultLink = resultLink[29];
                      resultLink = resultLink.childNodes[5].childNodes[11].childNodes[1].href;
                      resultLink = resultLink.slice(resultLink.indexOf('id'), resultLink.length); 
                      var cors_api_url_har = 'https://hidden-chamber-98689.herokuapp.com/https://redbot.org/?' + resultLink;
                      var y = new XMLHttpRequest();
                      y.open('GET', cors_api_url_har, true);
                      y.send(null);
                      y.onreadystatechange = function() {
                        if (y.readyState == 4) {
                          var linked = y.responseText

                          linked = linked.replace(/\n/g, '');
                          linked = linked.match(/(redirectURL)(.*?)(\",)/g);
                          linked = linked[0].replace(/[\s : \" , ]/g, '');
                          linked = linked.replace(/(redirectURL)/g, '');


                          if(linked.length < 10){
                            linked = y.responseText;

                            linked = linked.replace(/\n/g, '');
                            linked = linked.match(/(url)(.*?)(\",)/g);
                            linked = linked[0].replace(/[\s : \" , ]/g, '');
                            linked = linked.replace(/(url)/g, '');
                            var wholeLink = [linked.slice(0, 4), ":", linked.slice(4)].join('') + "&price_min=" + lowest/koronaDK + "&price_max=17710";
                            }else{
                            var wholeLink = linked.substring(2, linked.length);
                            wholeLink = "http://www.pricerunner.dk/c" + wholeLink + "&price_min=" + lowest/koronaDK + "&price_max=17710" + "&sort=3";
                            };

                              $.getJSON('http://whateverorigin.org/get?url=' + wholeLink + '&callback=?')
                              .then(function(data){

                                    var outcomeArray = [];
                                    var result = $(data.contents.replaceAll('src', ''));
                                   // var result = $(data.contents);

                                    var name = searchQ;
                                    var prices = result.find('div.price');

                                    $.each(prices, function(i, val){
                                      if(i % 2 == 0){
                                      var toCheck = val.childNodes[1].childNodes[1].childNodes[1].href;
                                          var tags = searchQ.split(" ")
                                          var checker = 0;
                                          for (var j = 0; j < tags.length; j++){
                                          var str = new RegExp(tags[j], 'i')
                                          var check = toCheck.match(str);
                                          if(check){
                                            checker = checker + 1; 
                                          }
                                          }
                                          if(checker == tags.length){
                                          var priceString = val.childNodes[1].childNodes[1].innerText;
                                          priceString = priceString.replace(/[a-z-A-Z:()€\s,.]+/g, '');
                                          priceString = priceString.replace(/,/g, '.');
                                          var price = parseInt(priceString)*koronaDK;
                                          price = price.toFixed(2);
                                          if(lowest - price > 0){
                                          }else{ 
                                          var outcomePRI = new outcome(wholeLink, img, name, price, "pricerunnerDK");
                                          outcomeArray.push(outcomePRI);
                                          };
                                          };    
                                      };
                                    });
                                    var url = 'www.pricerunner.dk/search?&q=' + searchQP;
                                    var best = outcomeArray.sort(function(a, b){return a.price - b.price });
                      if(best.length > 0){
                      $('#outcomeTable tbody').append('<tr role="row" ><td ><a href="' + best[0].url +'" target="_blank"><img src="' + best[0].img +'"></a></td><td>'+ best[0].named +'</td><td>'+ best[0].price +'</td><td>'+ (best[0].price/euro).toFixed(2) +'</td><td>'+ (0.75*best[0].price/euro).toFixed(2) +'</td><td><button class="btn btn-primary" id="showPDK" onclick="showPDK()">Pokaż</button><button class="btn btn-primary" id="hidePDK" onclick="hidePDK()" style="display : none">Schowaj</button></td></tr>')

                      for (var i = 0; i < best.length; i++) {

                          $('#outcomeTable tbody').append('<tr role="row" class="PDKROW" style = "display : none;" ><td ><a href="' + best[i].url +'" target="_blank"><img src="' + best[i].img +'"></a></td><td>'+ best[i].named +'</td><td>'+ best[i].price +'</td><td>'+ (best[i].price/euro).toFixed(2) +'</td><td>'+ (0.75*best[i].price/euro).toFixed(2) +'</td></tr>')
                      
                      };
                      }else{
                        PDKFrame();
                      };

                                })
                                .fail(function(){

                                    console.log("couldn't get data from pricerunner.dk");

                                });
                          }; 
                        };
                      });
                      };
                    };

          }); 

};


function pricerunnerSE(searchQP, lowest){
            
            var img = "img/pricerunnerSE.png"
            var searchQPE = searchQP.replace(/\+/g, "2B");
            var searchQ = searchQP.replace(/\+/g, " ");
            var cors_api_url_bot = 'https://hidden-chamber-98689.herokuapp.com/https://redbot.org/?uri=http%3A%2F%2Fwww.pricerunner.se%2Fsearch%3F%26q%3D' + searchQP;
            var urlField = 'www.pricerunner.se/search?&q=' + searchQP;

            $.get(cors_api_url_bot, function(bot){

                  var resultLink = bot;
                  resultLink = $(resultLink);
                  resultLink = resultLink[29];
                  resultLink = resultLink.childNodes[5].childNodes[11].childNodes[1].href;
                  resultLink = resultLink.slice(resultLink.indexOf('id'), resultLink.length);
                  var cors_api_url_har = 'https://hidden-chamber-98689.herokuapp.com/https://redbot.org/?' + resultLink;
                  var x = new XMLHttpRequest();
                  x.open('GET', cors_api_url_har, true);
                  x.send(null);
                  x.onreadystatechange = function() {
                    if (x.readyState == 4) {
                      var link = x.responseText
                      link = link.replace(/\n/g, '');
                      link = link.match(/(redirectURL)(.*?)(\",)/g);
                      link = link[0].replace(/[\s : \" , ]/g, '');
                      link = link.replace(/(redirectURL)/g, '');
                      var nextLink = link.substring(2, link.length);
                      nextLink = "http://www.pricerunner.se/c" + nextLink;
                      nextLink = nextLink.replace(/\//g, '%2F');
                      nextLink = nextLink.replace(/:/g, '%3A');
                      nextLink = nextLink.replace(/\?/g, '%3F');
                      nextLink = nextLink.replace(/&/g, '%26');
                      nextLink = nextLink.replace(/=/g, '%3D');
                      nextLink = nextLink.replace(/\+/g, '%2B');
                      nextLink = 'https://hidden-chamber-98689.herokuapp.com/https://redbot.org/?uri=' + nextLink;

                      $.get(nextLink, function(bot){

                      var resultLink = bot;
                      resultLink = $(resultLink);
                      resultLink = resultLink[29];
                      resultLink = resultLink.childNodes[5].childNodes[11].childNodes[1].href;
                      resultLink = resultLink.slice(resultLink.indexOf('id'), resultLink.length);
                      var cors_api_url_har = 'https://hidden-chamber-98689.herokuapp.com/https://redbot.org/?' + resultLink;
                      var y = new XMLHttpRequest();
                      y.open('GET', cors_api_url_har, true);
                      y.send(null);
                      y.onreadystatechange = function() {
                        if (y.readyState == 4) {
                          var linked = y.responseText

                          linked = linked.replace(/\n/g, '');
                          linked = linked.match(/(redirectURL)(.*?)(\",)/g);
                          linked = linked[0].replace(/[\s : \" , ]/g, '');
                          linked = linked.replace(/(redirectURL)/g, '');

                          if(linked.length < 10){
                            linked = y.responseText;

                            linked = linked.replace(/\n/g, '');
                            linked = linked.match(/(url)(.*?)(\",)/g);
                            linked = linked[0].replace(/[\s : \" , ]/g, '');
                            linked = linked.replace(/(url)/g, '');
                            var wholeLink = [linked.slice(0, 4), ":", linked.slice(4)].join('') + "&price_min=" + lowest/koronaSE + "&price_max=99999";
                            }else{
                            var wholeLink = linked.substring(2, linked.length);
                            wholeLink = "http://www.pricerunner.se/c" + wholeLink + "&price_min=" + lowest/koronaSE + "&price_max=99999";
                            };

                              $.getJSON('http://whateverorigin.org/get?url=' + wholeLink + '&callback=?')
                              .then(function(data){
                                    var outcomeArray = [];
                                    var result = $(data.contents.replaceAll('src', ''));

                                    var name = searchQ;
                                    var prices = result.find('div.price');

                                    $.each(prices, function(i, val){
                                      if(i % 2 == 0){
                                          var toCheck = val.childNodes[1].childNodes[1].childNodes[1].href;
                                          var tags = searchQ.split(" ")
                                          var checker = 0;
                                          for (var j = 0; j < tags.length; j++){
                                          var str = new RegExp(tags[j], 'i')
                                          var check = toCheck.match(str);
                                          if(check){
                                            checker = checker + 1; 
                                          }
                                          }
                                          if(checker == tags.length){
                                          var priceString = val.childNodes[1].childNodes[1].innerText;
                                          priceString = priceString.replace(/[a-z-A-Z:()€\s,.]+/g, '');
                                          priceString = priceString.replace(/,/g, '.');
                                          var price = parseInt(priceString)*koronaSE;
                                          price = price.toFixed(2);
                                          if(lowest - price > 0){
                                          }else{
                                          var url = 'www.pricerunner.se/search?&q=' + searchQP;
                                          var outcomePRI = new outcome(url, img, name, price, "pricerunnerSE");
                                          outcomeArray.push(outcomePRI);
                                          };
                                          };
                                      };
                                    });

                                    var best = outcomeArray.sort(function(a, b){return a.price - b.price });

                      if(best.length > 0){
                          $('#outcomeTable tbody').append('<tr role="row" class = "first" ><td ><a href="' + best[0].url +'" target="_blank"><img src="' + best[0].img +'"></a></td><td>'+ best[0].named +'</td><td>'+ best[0].price +'</td><td>'+ (best[0].price/euro).toFixed(2) +'</td><td>'+ (0.75*best[0].price/euro).toFixed(2) +'</td><td><button class="btn btn-primary" id="showPSE" onclick="showPSE()">Pokaż</button><button class="btn btn-primary" id="hidePSE" onclick="hidePSE()" style="display : none">Schowaj</button></td></tr>')

                      for (var i = 1; i < best.length; i++) {

                          $('#outcomeTable tbody').append('<tr role="row" class="PSEROW" style = "display : none;" ><td ><a href="' + best[i].url +'" target="_blank"><img src="' + best[i].img +'"></a></td><td>'+ best[i].named +'</td><td>'+ best[i].price +'</td><td>'+ (best[i].price/euro).toFixed(2) +'</td><td>'+ (0.75*best[i].price/euro).toFixed(2) +'</td></tr>')
                      
                      };
                      }else{
                        PSEFrame();
                      };

                                })
                                .fail(function(){

                                    console.log("couldn't get data from pricerunner.se");

                                });
                          }; 
                        };
                      });
                      };
                    };

          }); 

};




function heurekaCZ (searchQP, lowest) { 
            searchQP = searchQP.replace(/[+]/g, '%2B')
            var img = "img/heurekaSK.png"
            var cors_api_url = 'https://hidden-chamber-98689.herokuapp.com/http://www.heureka.cz/?h%5Bfraze%5D=' + searchQP + "&min=" + lowest/koronaCZ + "&max=&gty=new&o=1&o=3";
            var urlField = 'http://www.heureka.cz/?h%5Bfraze%5D=' + searchQP + "&min=" + lowest/koronaCZ + "&max=&gty=new&o=1&o=3";
            var x = new XMLHttpRequest();
            x.open('GET', cors_api_url, true);
            x.send(null);
            x.onreadystatechange = function() {

                if (x.readyState == 4) {

                    var outcomeArray = [];
                    var result = x.responseText.replaceAll('src', '');
                    result = result.substring(0, result.indexOf('fulltext'))
                    result = $(result)
                    result = result.find('div.product');
                    var resultName = result.find('div.desc');
                    result = result.find('div.wherebuy');
                    var name = [];

                    $.each(resultName, function(i, val){

                        name[i] = val.childNodes[1].innerText;
                        name[i] = name[i].replace(/[\n]+/g, '');
                        name[i] = name[i].substring(0,65);

                    });

                    $.each(result, function(i, val){
                        var priceString = val.childNodes[1].innerText;
                        priceString = priceString.slice(0, priceString.indexOf('-'));
                        priceString = priceString.replace(/[a-z-A-Z()€\s]+/g, '');
                        //priceString = priceString.slice(0, (parseInt(lowest/koronaCZ).toFixed(0)).length)
                        var price = parseInt(priceString);
                        price = (price * koronaCZ ).toFixed(2);
                        if(lowest - price > 0){
                        }else{
                        var outcomeHCZ = new outcome(urlField, img, name[i], price, "heurekaCZ");
                        outcomeArray.push(outcomeHCZ);
                        }

                    });
                    var best = outcomeArray.sort(function(a, b){return a.price - b.price });
                    if(best.length > 0){

                          $('#outcomeTable tbody').append('<tr role="row" ><td ><a href="' + best[0].url +'" target="_blank"><img src="' + best[0].img +'"></a></td><td>'+ best[0].named +'</td><td>'+ best[0].price +'</td><td>'+ (best[0].price/euro).toFixed(2) +'</td><td>'+ (0.79*best[0].price/euro).toFixed(2) +'</td><td><button id="showHSK" class="btn btn-primary" onclick="showHCZ()">Pokaż</button><button class="btn btn-primary" id="hideHCZ" onclick="hideHCZ()" style="display : none">Schowaj</button></td></tr>')

                      for (var i = 1; i < best.length; i++) {

                          $('#outcomeTable tbody').append('<tr role="row" class="HCZROW" style = "display : none;" ><td ><a href="' + best[i].url +'" target="_blank"><img src="' + best[i].img +'"></a></td><td>'+ best[i].named +'</td><td>'+ best[i].price +'</td><td>'+ (best[i].price/euro).toFixed(2) +'</td><td>'+ (0.79*best[i].price/euro).toFixed(2) +'</td></tr>')
                      
                      };
                    }else{
                        HCZFrame();
                    };  
                };

            };
};


function heurekaSK (searchQP, lowest) { 
            searchQP = searchQP.replace(/[+]/g, '%2B')
            var img = "img/heurekaSK.png"
            var cors_api_url = 'https://hidden-chamber-98689.herokuapp.com/http://www.heureka.sk/?h%5Bfraze%5D=' + searchQP + "&min=" + lowest/euro + "&max=&gty=new&o=1&o=3";
            var urlField = 'http://www.heureka.sk/?h%5Bfraze%5D=' + searchQP + '&m=f&min=&max=&o=3';
            var x = new XMLHttpRequest();
            x.open('GET', cors_api_url, true);
            x.send(null);
            x.onreadystatechange = function() {

                if (x.readyState == 4) {

                    var outcomeArray = [];
                    var result = x.responseText.replaceAll('src', '');
                    result = $(result)
                    result = result.find('div.product');
                    var resultName = result.find('div.desc');
                    result = result.find('div.wherebuy');
                    var name = [];

                    $.each(resultName, function(i, val){

                        name[i] = val.childNodes[1].innerText;
                        name[i] = name[i].replace(/[\n]+/g, '');
                        name[i] = name[i].substring(0,65);

                    });

                    $.each(result, function(i, val){

                        var priceString = val.childNodes[1].innerText;
                        priceString = priceString.replace(/[a-z-A-Z()€\s]+/g, '');
                        var price = parseInt(priceString);
                        price = (price * euro ).toFixed(2);
                        if(lowest - price > 0){
                        }else{
                        var outcomeHCZ = new outcome(urlField, img, name[i], price, "heurekaSK");
                        outcomeArray.push(outcomeHCZ);
                        }  
                    });
                    
                    var best = outcomeArray.sort(function(a, b){return a.price - b.price });
                    if(best.length > 0){

                          $('#outcomeTable tbody').append('<tr role="row" ><td ><a href="' + best[0].url +'" target="_blank"><img src="' + best[0].img +'"></a></td><td>'+ best[0].named +'</td><td>'+ best[0].price +'</td><td>'+ (best[0].price/euro).toFixed(2) +'</td><td>'+ (0.8*best[0].price/euro).toFixed(2) +'</td><td><button id="showHSK" class="btn btn-primary" onclick="showHSK()">Pokaż</button><button class="btn btn-primary" id="hideHSK" onclick="hideHSK()" style="display : none">Schowaj</button></td></tr>');  

                      for (var i = 1; i < best.length; i++) {

                          $('#outcomeTable tbody').append('<tr class="HSKROW" role="row" style = "display : none;" ><td ><a href="' + best[i].url +'" target="_blank"><img src="' + best[i].img +'"></a></td><td>'+ best[i].named +'</td><td>'+ best[i].price +'</td><td>'+ (best[i].price/euro).toFixed(2) +'</td><td>'+ (0.8*best[i].price/euro).toFixed(2) +'</td><td></td></tr>')
                      
                      };
                    }else{
                      HSKFrame();
                    }  
                };

            };
};


String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};
