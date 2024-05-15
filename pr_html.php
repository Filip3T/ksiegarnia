<?php
    $base = mysqli_connect("localhost", "root", "", "ksiegarnia");
    /* $zapk = "SELECT id_ksiazki, tytul, autor, cena, opis FROM ksiazki";
    $resk = mysqli_query($base, $zapk);
    while($ksiazka = mysqli_fetch_row($resk)) {
        echo $ksiazka[0]." ".$ksiazka[1]." ".$ksiazka[2]." ".$ksiazka[3]." ".$ksiazka[4]." ";
    } */
    /* if(!isset($_POST["znal"])) {
        $zapk = "SELECT id_ksiazki, tytul, autor, cena, opis, ilosc FROM ksiazki";
        $resk = mysqli_query($base, $zapk);
        echo "nie";
        while($ksiazka = mysqli_fetch_row($resk)) {
            echo "'".$ksiazka[0]."','".$ksiazka[1]."','".$ksiazka[2]."','".$ksiazka[3]."','".$ksiazka[4]."','".$ksiazka[5]."',";
            
        }} else {$zapk2 = "SELECT id_ksiazki, tytul, autor, cena, opis, ilosc FROM ksiazki WHERE tytul like '%".$_POST["znal"]."%'";
        $resk2 = mysqli_query($base, $zapk2);
        echo "tak";
        while($ksiazka = mysqli_fetch_row($resk2)) {
            echo "'".$ksiazka[0]."','".$ksiazka[1]."','".$ksiazka[2]."','".$ksiazka[3]."','".$ksiazka[4]."','".$ksiazka[5]."',";
        };
    } */
    if(isset($_POST["id"])) {
        $zapz = "INSERT INTO zamowienia VALUES(null,'".$_POST["iduz"]."','".$_POST["id"]."',".$_POST["ilosc"].",'".$_POST["adres"]."')";
        $resz = mysqli_query($base, $zapz);
        $zapz2 = "UPDATE ksiazki SET ilosc = ilosc - ".$_POST["ilosc"]." WHERE id_ksiazki = ".$_POST["id"];
        $resz2 = mysqli_query($base, $zapz2);
        $zapz3 = "SELECT login, haslo FROM klient WHERE id_klienta = '".$_POST["iduz"]."'";
        $resz3 = mysqli_query($base, $zapz3);
        $reszu3 = mysqli_fetch_row($resz3);
        $_POST["Login-zal"] = $reszu3[0];
        $_POST["Haslo-zal"] = $reszu3[1];
    }
    if(isset($_POST["fal"])) {
        unset($_COOKIE['login']);
        setcookie("login", "", -1);
    }
    if(isset($_COOKIE["login"])) {
        $zapz3 = "SELECT login, haslo FROM klient WHERE login = '".$_COOKIE["login"]."'";
        $resz3 = mysqli_query($base, $zapz3);
        $reszu3 = mysqli_fetch_row($resz3);
        $_POST["Login-zal"] = $reszu3[0];
        $_POST["Haslo-zal"] = $reszu3[1];
    }
?>

<!DOCTYPE html>
<html>
<head>
    <title>Strona główna</title>
    <link rel="stylesheet" href="pr_css.css">
</head>
<body>
    <script>
        var szuk = false;
        var ksiazki = [ <?php if(!isset($_POST["znal"])) {$zapk = "SELECT id_ksiazki, tytul, autor, cena, opis, ilosc FROM ksiazki";
                        $resk = mysqli_query($base, $zapk);
                        while($ksiazka = mysqli_fetch_row($resk)) {
                            echo "'".$ksiazka[0]."','".$ksiazka[1]."','".$ksiazka[2]."','".$ksiazka[3]."','".$ksiazka[4]."','".$ksiazka[5]."',";
                        }echo "];";} else {$zapk2 = "SELECT id_ksiazki, tytul, autor, cena, opis, ilosc FROM ksiazki WHERE tytul like '%".$_POST["znal"]."%'";
                        $resk2 = mysqli_query($base, $zapk2);
                        while($ksiazka = mysqli_fetch_row($resk2)) {
                            echo "'".$ksiazka[0]."','".$ksiazka[1]."','".$ksiazka[2]."','".$ksiazka[3]."','".$ksiazka[4]."','".$ksiazka[5]."',";
                        }echo "]; szuk = true;";
                        }?>
        var uzytkownicy =  [<?php $zapu = "SELECT login, haslo, email FROM klient WHERE admin = 0";
                        $resu = mysqli_query($base, $zapu);
                        while($uzyt = mysqli_fetch_row($resu)) {
                            echo "'".$uzyt[0]."','".$uzyt[1]."','".$uzyt[2]."',";
                        }?>];
        console.log(uzytkownicy);
    </script>
    <div id="body">
        <div id="zal">
            <script>
                var login = <?php if(isset($_POST["Login-zal"])) {
                        $zap1l = "SELECT login, haslo FROM klient WHERE email = '".$_POST["Login-zal"]."' OR login = '".$_POST["Login-zal"]."' AND haslo = '".$_POST["Haslo-zal"]."'";
                        $res1l = mysqli_query($base, $zap1l);
                        if (mysqli_num_rows($res1l) != 0) {
                            echo "'".$_POST["Login-zal"]."'";
                            setcookie("login", $_POST["Login-zal"], time() + (86400 * 30));
                        } else {
                            echo "'zly'";
                        }
                    } else {
                        echo "'brak'";
                    }
                    ?>;
                var id_uz = <?php if(isset($_POST["Login-zal"])) {
                        $zap1l2 = "SELECT id_klienta FROM klient WHERE email = '".$_POST["Login-zal"]."' OR login = '".$_POST["Login-zal"]."' AND haslo = '".$_POST["Haslo-zal"]."'";
                        $res1l2 = mysqli_query($base, $zap1l2);
                        if (mysqli_num_rows($res1l2) != 0) {
                            $res1l21 = mysqli_fetch_row($res1l2);
                            echo $res1l21[0];
                        } else {
                            echo "0";
                        }
                        } else {
                            echo "0";
                        }
                    ?>;
                var admin = <?php if(isset($_POST["Login-zal"])) {
                        $zap1l3 = "SELECT admin FROM klient WHERE email = '".$_POST["Login-zal"]."' OR login = '".$_POST["Login-zal"]."' AND haslo = '".$_POST["Haslo-zal"]."'";
                        $res1l3 = mysqli_query($base, $zap1l3);
                        if (mysqli_num_rows($res1l3) != 0) {
                            $res1l31 = mysqli_fetch_row($res1l3);
                            if($res1l31[0]) {echo "true";}
                            else {echo "false";}
                        } else echo "false"; } else echo "false";?>
            </script>
            <?php
                if (isset($_POST["Login-zar"])) {
                    $zap1r = "SELECT login FROM klient WHERE login = '".$_POST["Login-zar"]."'";
                    $res1r = mysqli_query($base, $zap1r);
                    if(mysqli_num_rows($res1r) == 0) {
                        $zap2r = "SELECT email FROM klient WHERE email = '".$_POST["Email-zar"]."'";
                        $res2r = mysqli_query($base, $zap2r);
                        if(mysqli_num_rows($res2r) == 0) {
                            $zapor = "INSERT INTO klient VALUES(null,'".$_POST["Login-zar"]."','".$_POST["Haslo-zar"]."','".$_POST["Email-zar"]."')";
                            $resor = mysqli_query($base, $zapor); 
                            echo "Zarejestrowano!!!";
                        } else {
                            echo "Nie zarejestrowano!<br>Podany email jest juz uzywany!!!.";
                        }
                    } else {
                        echo "Nie zarejestrowano!<br>Podany login jest juz uzywany!!!.";
                    }
                }
            ?>
        </div>
        <canvas id="canvas" width="1920" height="1080">
        </canvas>
        <div id="form">
        </div>
        <script>
            if ( window.history.replaceState ) {
                window.history.replaceState( null, null, window.location.href );
            }
        </script>
        <script src="pr_js.js"></script>
    </body>
</body>
</html>