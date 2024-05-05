<?php
    $base = mysqli_connect("localhost", "root", "", "ksiegarnia");
    $zapk = "SELECT id_ksiazki, tytul, autor, cena, opis FROM ksiazki";
    $resk = mysqli_query($base, $zapk);
    while($ksiazka = mysqli_fetch_row($resk)) {
        echo $ksiazka[0]." ".$ksiazka[1]." ".$ksiazka[2]." ".$ksiazka[3]." ".$ksiazka[4]." ";
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
        var ksiazki = [<?php $zapk = "SELECT id_ksiazki, tytul, autor, cena, opis, ilosc FROM ksiazki";
                       $resk = mysqli_query($base, $zapk);
                       while($ksiazka = mysqli_fetch_row($resk)) {
                            echo "'".$ksiazka[0]."','".$ksiazka[1]."','".$ksiazka[2]."','".$ksiazka[3]."','".$ksiazka[4]."','".$ksiazka[5]."',";
                       }?>]
        console.log(ksiazki);
    </script>
    <div id="body">
        <div id="zal">
            <?php
                if (isset($_POST["Login-zal"])) {
                    $zap1l = "SELECT login, haslo FROM klient WHERE email = '".$_POST["Login-zal"]."' OR login = '".$_POST["Login-zal"]."' AND haslo = '".$_POST["Haslo-zal"]."'";
                    $res1l = mysqli_query($base, $zap1l);
                    if (mysqli_num_rows($res1l) != 0) {
                        echo "Zalogowano jako ".$_POST["Login-zal"]."<br>";
                    } else { 
                        echo "Zly login! Nie zalogowano!<br>";
                    }
                } else {
                    echo "Nie jestes zalogowany.<br>";
                }
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