<?php

if($_POST["submit"]) {
    $recipient="p.m.suwalski@gmail.com"; // poczta@ksiegowoscwchmurze.com
    $subject="Wiadomość ze strony WWW";
    $sender=$_POST["sender"];
    $firma=$_POST["firma"];
    $phone=$_POST["phone"];
    $senderEmail=$_POST["senderEmail"];
    $message=$_POST["message"];

    $mailBody="Imię i nazwisko: $sender\nFirma: $firma\nEmail: $senderEmail\nNumer telefonu: $phone\n\n$message";

    mail($recipient, $subject, $mailBody, "From: $sender <$senderEmail>");

    $thankYou="<p>Thank you! Your message has been sent.</p>";
}

?>

<!DOCTYPE html>
<html class="full" lang="pl">
<!-- Make sure the <html> tag is set to the .full CSS class. Change the background image in the full.css file. -->

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Księgowość w chmurze</title>

    <!-- Bootstrap Core CSS -->
    <link href="css/bootstrap.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="css/full.css" rel="stylesheet">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>

<body>

   
    <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="cont">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header nav-head">
                <img src="img/logo.png" class="logo" alt="">
            </div>
            <div class="navbar-header menued">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                </div>            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

                <ul class="nav navbar-nav nav-right">
                    <li class="double">
                        <a href="index.html">Księgowość<br> w chmurze</a>
                    </li>
                    <li class="singled">
                        <a class="chosen" href="how.html">Jak to działa?</a>
                    </li>
                    <li class="single">
                        <a href="offer.html">Oferta</a>
                    </li>
                    <li class="single">
                        <a href="about.html">O nas</a>
                    </li>
                </ul>
            </div>
            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container -->
    </nav>
    <div class="how row">
    <div class="header-m">
        <div class="smaller">
        <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12">
                <h1 class="motto-header">
                    <span><b>Wystarczy tylko internet</b></span>
                </h1>
            </div>
        </div>
        <div class="row">
            <div class="col-md-2 col-sm-2 col-xs-0">
                
            </div>
            <div class="col-md-10 col-sm-10 col-xs-12">
                <p class="p-header">
                    <span><b>Księgowość to kopalnia wiedzy o Twojej firmie</b></span>
                </p>
            </div>
        </div>
        </div>
    </div>
    </div>
    <div class="content row">
        <div class="col-md-12">
            <p>
                <img src="img/logo_color.png" style="padding-top:80px;" alt="Księgowość w chmurze">
            </p>
        </div>
        <div class="col-sm-1 col-md-1 col-xs-0"></div>
        <div class="col-sm-10 col-md-10 col-xs-12">
            <h2 style="padding-top:30px;">Jak to działa?</h2>
            <p>
                Do księgowości w chmurze potrzebny jest dostęp do Internetu i komputer, tablet lub smartfon
                <br><br>
                Kupujesz abonament na któryś z programów do prowadzenia działalności np. program do fakturowania lub do prowadzenia magazynu lub inny który jest Ci potrzebny. Logujesz się do swoich programów w Internecie czyli do własnej chmury. Wystawiasz faktury, prowadzisz gospodarkę magazynową lub cokolwiek co jest Ci niezbędne do prowadzenia działalności.
                <br><br>
                Potem jedną czynnością w programie wysyłasz wszystkie niezbędne informacje do nas.
                <br><br>
                Dokumenty które muszą być fizycznie dostarczone wysyłasz w dogodnej formie np. skanu, kserokopii lub oryginału poprzez kuriera, 
            <p>
<?php
if($_POST["submit"]){
    echo '
    </div>
    </div>
    <div id="pop" class="popup">
        <h2>Email wysłany!</h2>
        <div class="poptop">
            <p style="margin:30px;">Dziękujemy za wysłanie wiadomości email nasz konsulatant skontaktuje się z państwem</p>
        </div>
        <div class="popbot">
            <h6 class="center">
                <button class="btnp" onclick="popCancel()">OK</button>
            </h6>
        </div>
    </div>
    ';
}else{
    echo '
    <h2 id="former" style="padding-top:45px;">Jeśli masz pytania... napisz do nas!</h2>
    </div>
    </div>
    <div class="content row" id="former">
        <div id="form">
        <form method="post" action="how.php">
            <div class="col-sm-1 col-md-1 col-xs-0"></div>
            <div class="col-sm-10 col-md-10 col-xs-12">
            <div class="col-md-5 info">
                <div class="form-group">
                <input type="text" id="name" class="form-control" placeholder="Imię i nazwisko" name="sender">
                </div>
                <div class="form-group">
                <input type="text" id="company" class="form-control" placeholder="Firma" name="firma">
                </div>
                <div class="form-group">
                <input type="mail" id="mail" class="form-control" placeholder="E-mail" name="senderEmail">
                </div>
                <div class="form-group">
                <input type="number" id="phone" class="form-control" placeholder="Numer telefonu" name="phone">
                </div>
            </div>
            <div class="col-md-7">
                <div class="form-group">
                <textarea name="message" id="message"  class="form-control" placeholder="Treść wiadomości" name="message"></textarea>
                </div>
            </div>
            <div class="col-md-12">
            <input type="submit" name="submit" id="submit" class="btn btn-primary" value="Wyślij wiadomość" onclick="popOpen()"></button>
            </div>
        </div>
        </form>
        </div>
            
    </div>
    ';
} ?>                

    
    <div style="padding:18px;">&nbsp</div>
    <div class="footer row">
        <p><img src="img/logo_bottom.png" id="bottom" alt="ksiegowosc w chmurze"></p>
    </div>
    <script>
        function popCancel() {
            $("#pop").fadeOut(500);
        };
    </script>
    <!-- jQuery -->
    <script src="js/jquery.js"></script>
        
    <!-- Bootstrap Core JavaScript -->
    <script src="js/bootstrap.min.js"></script>


</body>

</html>