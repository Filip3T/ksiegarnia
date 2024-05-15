function randint(min, max) {
    return Math.random() * (max - min) + min;
}

var login_box_m = "";

function CreateLoginBox() {
    login_box_m = document.createElement("div");
    login_box_m.id = "login-box";
    if (login == "brak") {
        login_box_m.innerHTML = "Nie zalogowano";
    } else if (login == "zly") {
        login_box_m.innerHTML = "Podano zly login";
    } else {
        login_box_m.innerHTML = "Zalogowano jako " + login;
    }
    document.body.appendChild(login_box_m);
}
CreateLoginBox();

var interval;

var panel = document.getElementById("form");
panel.style.left = window.innerWidth * 0.35 + "px";

function menu_glowne(isnew) {
    panel.innerHTML = "<h2>KSIĘGARNIA INTERNETOWA</h2>";
    let form = document.createElement("form")
    panel.append(form);
    if(login == "brak" || login == "zly") {
        let actions = [function() {zaloguj("Zaloguj" , "-zal")},function() {zaloguj("Zarejestruj" , "-zar")}, "<b>Zaloguj</b>", "<b>Zarejestruj</b>"];
        for(let i=0;i<2;i++) {    
            let button = document.createElement("button");
            button.classList.add("button-main");
            button.type = "button";
            button.addEventListener("click", actions[i], false);
            button.innerHTML = actions[i+2];
            form.appendChild(button);
        }
    } else {
        let actions = [przegladaj, wyloguj, "<b>Przeglądaj zasoby</b>", "<b>Wyloguj</b>"];
        for(let i=0;i<2;i++) {    
            let button = document.createElement("button");
            button.classList.add("button-main");
            button.type = "button";
            button.addEventListener("click", actions[i], false);
            button.innerHTML = actions[i+2];
            form.appendChild(button);
        }
        if (admin) {
            let button_ad = document.createElement("button");
            button_ad.classList.add("button-main");
            button_ad.type = "button";
            button_ad.addEventListener("click", przegladaj_uz, false);
            button_ad.innerHTML = "<b>Uzytkownicy</b>";
            form.appendChild(button_ad);
        }
    }
    if (!isnew) {
        interval = setInterval(function() {move(false, 0.35);}, 5);
    }
}

function wyloguj() {
    let falform = document.createElement("form");
    falform.method = "POST";
    falform.action = "pr_html.php"
    panel.appendChild(falform);
    let falinp = document.createElement("input");
    falinp.type = "text";
    falinp.name = "fal";
    falform.appendChild(falinp);
    falform.submit();
}

var przegladaj_u = false;

function przegladaj_uz() {
    przegladaj_u = true;
    interval = setInterval(function() {widen(true, false, 0);}, 5);
}

var uz_c = uzytkownicy.length / 3;
console.log(uz_c);
var page_nu = Math.floor(uz_c / 9) + 1;
var page = 1;

function wypisz_uz() {
    login_box_m.remove();
    panel.innerHTML = "";
    let footer = document.createElement("div");
    footer.id = "footer";
    panel.appendChild(footer);
    let button = document.createElement("button");
    button.classList.add("button-main");
    button.addEventListener("click", function(){panel.innerHTML = "";interval = setInterval(function() {widen(false, false, 0);}, 5); page = 1;}, false);
    button.innerHTML = "WROC";
    button.style.marginTop = "2.5vh";
    footer.appendChild(button);
    let uz = document.createElement("div");
    uz.id = "uzytkownicy";
    panel.appendChild(uz);
    if (page_nu != 1) pages(page_nu, wypisz_uz);
    uz.innerHTML = "";
    if (page * 9 < uz_c) uz_t = page * 9;
    else uz_t = (page * 9) - (9 - (uz_c % 9));
    console.log(uz_t);
    for(let i=(page * 9 - 9);i<uz_t;i++) {
            let uzytkownik = document.createElement("div");
            uzytkownik.classList.add("book");
            uz.appendChild(uzytkownik);
            let login_t = document.createElement("div");
            login_t.classList.add("tyt");
            login_t.innerHTML = uzytkownicy[(i * 3)];
            uzytkownik.appendChild(login_t);
            let info = document.createElement("div");
            info.classList.add("info");
            if(uzytkownicy[(i * 3) + 2] != "") info.innerHTML = "email: " + uzytkownicy[(i * 3) + 2];
            else info.innerHTML = "email: Nie podano";
            uzytkownik.appendChild(info);
            let button = document.createElement("button");
            button.classList.add("buy-button");
            button.type = "button";
            button.innerHTML = "Edytuj";
            button.addEventListener("click",function(){edit(false, uzytkownicy[(i * 3)], 0)},false);
            uzytkownik.appendChild(button);
    }
}


menu_glowne(true);

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
if (canvas.getContext) {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
}

class Triangle {
    constructor(velocity, h, s, l) {
        this.a = [randint(-50, 50), randint(-50, 50)];
        this.b = [randint(-50, 50), randint(-50, 50)];
        this.c = [randint(-50, 50), randint(-50, 50)];
        this.ba = [0, 0];
        this.bb = [0, 0];
        this.bc = [0, 0];
        this.colorh = h;
        this.colors = s;
        this.colorl = l;
        this.velocityy = velocity;
        this.velocityx = velocity;
    }
}

var wave = [];
var numRows = 4; 
var numTrianglesPerRow = 100;
var vel = 0;
var h = 220;
var s = 80;
var l = 50;

for (let j = 0; j < numRows; j++) {
    wave[j] = [];
    for (let i = 0; i < numTrianglesPerRow; i++) {
        if (i == 0) {
            vel = randint(-0.5, 0.5);
        } else {
            vel += randint(-0.1, 0.1);
        }
        if (s != 99 && s != 1) s = Math.round(s + randint(-2, 2));
        else if (s <= 1) s += 2
        else s -= 2
        if (l > 80 && l > 40) l = Math.round(l + randint(-2, 2));
        else if (l <= 40) l += 2
        else l -= 2
        if (h != 20 && h != 340) h = Math.round(h + randint(-20, 20));
        else if (h <= 20) h += 20
        else h -= 20
        wave[j].push(new Triangle(vel, h, s, l));
    }
}

var st = true;

function update() {
    for (let j = 0; j < numRows; j++) {
        let x = 0;
        let y = 0;
        for (let i = 1; i < numTrianglesPerRow; i++) {
            if (wave[j][i].velocityx >= 0) x = randint(-0.1, 0.07)
            else x = randint(-0.07, 0.1)
            if (wave[j][i].velocityy >= 0) y = randint(-0.1, 0.07)
            else y = randint(-0.07, 0.1)
            ctx.beginPath();
            wave[j][i].a[0] = wave[j][i - 1].b[0];
            wave[j][i].a[1] = wave[j][i - 1].b[1];
            ctx.moveTo(wave[j][i].a[0], wave[j][i].a[1]);
            wave[j][i].b[0] = wave[j][i - 1].c[0];
            wave[j][i].b[1] = wave[j][i - 1].c[1];
            ctx.lineTo(wave[j][i].b[0], wave[j][i].b[1]);
            if (st) {
                wave[j][i].c[0] = wave[j][i - 1].c[0] + randint(25, 60);
                wave[j][i].c[1] = wave[j][i - 1].c[1] + randint(-30, 70);
            } else {
                wave[j][i].velocityx += x;
                wave[j][i].velocityy += y;
                wave[j][i].c[0] = wave[j][i].bc[0] + wave[j][i].velocityx;
                wave[j][i].c[1] = wave[j][i].bc[1] + wave[j][i].velocityy;
            }
            ctx.lineTo(wave[j][i].c[0], wave[j][i].c[1]);
            ctx.fillStyle = "hsl(" + wave[j][i].colorh + "," + wave[j][i].colors + "%," + wave[j][i].colorl + "%)";
            ctx.fill();
            wave[j][i].ba[0] = wave[j][i].a[0];
            wave[j][i].ba[1] = wave[j][i].a[1];
            wave[j][i].bb[0] = wave[j][i].b[0];
            wave[j][i].bb[1] = wave[j][i].b[1];
            wave[j][i].bc[0] = wave[j][i].c[0];
            wave[j][i].bc[1] = wave[j][i].c[1];
        }
    }
    st = false;
}

function bg() {
    update();
    setTimeout(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 1)
    window.requestAnimationFrame(bg)
}
bg();

var panleft = window.innerWidth * 0.35;
var panwidth = window.innerWidth * 0.3;
var panvis = 0.3;

function move(right, where) {
    panel.style.left = window.innerWidth * 0.35 + "px"; 
    if (right) panleft += 10;
    else panleft -= 10;
    panel.style.left = panleft + "px";
    if (right) {if(panleft > window.innerWidth * where) clearInterval(interval)};
    if (!right) {if(panleft < window.innerWidth * where) clearInterval(interval)};
}

function zaloguj(name, id) {
    panel.innerHTML = "";
    let header = document.createElement("h2");
    header.innerHTML = name;
    panel.appendChild(header);
    let nform = document.createElement("form");
    nform.method = "POST";
    nform.action = "pr_html.php";
    panel.appendChild(nform)
    let names = ["Login", "Haslo", "Email"]
    let j = 1;
    if(id=="-zar") j = 2;
    for(let i=0;i<=j;i++) {
        let labels = document.createElement("label");
        labels.for = names[i];
        labels.innerHTML = names[i];
        let inp = document.createElement("input");
        inp.classList.add("button-main");
        inp.style.marginTop = "0px";
        inp.id = names[i];
        inp.name = names[i] + id;
        nform.appendChild(labels);
        nform.innerHTML += "<br>";
        nform.appendChild(inp);
    }
    let types = ["reset", "submit", "wyczysc", "wyslij"];
    for(let i=0;i<=1;i++) {
        let button = document.createElement("button");
        button.type = types[i];
        button.classList.add("button-main");
        button.style.width = "10vw";
        button.innerHTML = types[i+2];
        button.style.marginTop = "5vh";
        if (i==1) button.style.marginLeft = "0px";
        nform.appendChild(button);
        nform.innerHTML += " ";
    }
    let button = document.createElement("button");
    button.classList.add("button-main");
    button.type = "button";
    if (name == "Zaloguj") button.style.marginTop = "40vh";
    else button.style.marginTop = "30vh"
    button.addEventListener("click", function(){menu_glowne(false);}, false);
    button.innerHTML = "<b>WROC</b>";
    panel.appendChild(button);
    interval = setInterval(function() {move(true, 0.7);}, 5);
}

function widen(widen, buy, id) {
    panel.innerHTML = "";
    if (widen) panleft -= 5;
    else panleft += 5;
    if (widen) panwidth += 10;
    else panwidth -= 10; 
    panel.style.width = panwidth + "px";
    panel.style.left = panleft + "px";
    if (widen) {if(panvis < 0.8) panvis += 0.005;}
    else {if(panvis > 0.3) panvis -= 0.005;}
    panel.style.background = "rgba(0, 0, 0, " + panvis + ")";
    if (widen) {if(panleft <= 0) {
            clearInterval(interval);
            panel.style.width = window.innerWidth + "px";
            panel.style.left = "0px";
            if (!przegladaj_u) biblioteka();
            else {wypisz_uz(); przegladaj_u = false;}
        } 
    } else {
        if(panleft >= window.innerWidth * 0.35) {
            clearInterval(interval);
            panel.style.width = window.innerWidth * 0.3 + "px";
            panel.style.left = window.innerWidth * 0.35 + "px";
            if (!buy) {
                menu_glowne(true);
                CreateLoginBox();
            } else {
                buy_form(id);
            }
        }
    }
}

function przegladaj() {
    if (login != "brak") {
        panel.innerHTML = "";
        interval = setInterval(function() {widen(true, false, 0);}, 5);
    } else {
        form.innerHTML += "Zaloguj sie zanim zaczniesz przegladac!!";
    }
}

if(szuk) {
    przegladaj();
}


var books_c = ksiazki.length / 6;
var page_n = Math.floor(books_c / 9) + 1;

function biblioteka() {
    login_box_m.remove();
    let footer = document.createElement("div");
    footer.id = "footer";
    panel.appendChild(footer);
    let button = document.createElement("button");
    button.classList.add("button-main");
    button.addEventListener("click", function(){panel.innerHTML = "";interval = setInterval(function() {widen(false, false, 0);}, 5); page = 1;}, false);
    button.innerHTML = "WROC";
    button.style.marginTop = "2.5vh";
    footer.appendChild(button);
    let books = document.createElement("div");
    books.id = "books";
    books.style.marginTop = "8vh";
    panel.appendChild(books);
    if (page_n != 1) pages(page_n, add_books); 
    let head = document.createElement("div");
    head.id = "head";
    panel.appendChild(head);
    let search = document.createElement("form");
    search.id = "search";
    search.action = "pr_html.php";
    search.method = "POST";
    search.style.width = "50vw";
    head.appendChild(search);
    let searchbar = document.createElement("input")
    searchbar.type = "text";
    searchbar.name = "znal";
    searchbar.id = "searchbar"
    search.appendChild(searchbar);
    search.id += " ";
    let sub = document.createElement("input");
    sub.id = "sub";
    sub.type = "submit";
    sub.value = "Szukaj";
    search.appendChild(sub);
    let login_text = "";
    if(login != "brak" && login != "zly") login_text = "Zalogowano jako " + login;
    else login_text = "Nie jestes zalogowany.";
    let login_box = document.createElement("div");
    login_box.id = "zal-head";
    login_box.innerHTML = login_text;
    head.appendChild(login_box);
    add_books();
}

function add_books() {
    let books = document.getElementById("books");
    books.innerHTML = "";
    let books_t = 0;
    if (page * 9 < books_c) books_t = page * 9;
    else books_t = (page * 9) - (9 - (books_c % 9));
    for(let i=(page * 9 - 9);i<books_t;i++) {
        add_book(ksiazki[(i * 6) + 1],ksiazki[(i * 6) + 2],ksiazki[(i * 6) + 3],ksiazki[(i * 6) + 4],ksiazki[(i * 6) + 5], ksiazki[(i * 6)])
    }
}

function add_book(name, author, price, desc, count, id) {
    let book = document.createElement("div");
    book.classList.add("book");
    let books = document.getElementById("books");
    books.appendChild(book);
    let tyt = document.createElement("div");
    tyt.classList.add("tyt");
    tyt.innerHTML = '"' + name + '"';
    book.appendChild(tyt);
    for(let i=0;i<=2;i++) {
        let info = document.createElement("div");
        info.classList.add("info");
        if (i==0) info.innerHTML = "cena: " + price + "zl";
        else if(i==1) info.innerHTML = "autor: " + author;
        else info.innerHTML = "opis:<br>" + desc;
        book.appendChild(info);
    }
    let buy_button = document.createElement("button");
    buy_button.addEventListener("click", function() {buy(id)}, false);
    buy_button.type = "button";
    buy_button.innerHTML = "KUP";
    buy_button.classList.add("buy-button")
    book.appendChild(buy_button);
}

function pages(num, func) {
    if (page != 1) {
        if (document.getElementById("ar-l") != null) document.getElementById("ar-l").remove();
        let arrow_left = document.createElement("div");
        arrow_left.classList.add("arrow");
        arrow_left.innerHTML = "<";
        arrow_left.style.left = "0px";
        arrow_left.id = "ar-l";
        arrow_left.addEventListener("click", function(){page -= 1;func();pages(num, func)}, false);
        panel.appendChild(arrow_left);
    } else {
        if (document.getElementById("ar-l") != null) document.getElementById("ar-l").remove();
    }
    if (page != num) {
        if (document.getElementById("ar-r") != null) document.getElementById("ar-r").remove();
        let arrow_right = document.createElement("div");
        arrow_right.classList.add("arrow");
        arrow_right.innerHTML = ">";
        arrow_right.style.left = window.innerWidth * 0.95 + "px";
        arrow_right.id = "ar-r";
        arrow_right.addEventListener("click", function(){page += 1;func();pages(num, func)}, false);
        panel.appendChild(arrow_right);
    } else {
        if (document.getElementById("ar-r") != null) document.getElementById("ar-r").remove();
    }
}

function buy(id) {
    panel.innerHTML = "";
    interval = setInterval(function() {widen(false, true, id);}, 5);
}

function check_buy(id) {
    if (document.getElementById("message") != null) document.getElementById("message").remove();
    let send = true;
    let count = Number(document.getElementById("ilosc").value);
    let check = ksiazki[((id - 1) * 6) + 5];
    let form = document.getElementById("form2");
    let message = document.createElement("div");
    message.style.fontSize = "2vh";
    message.style.marginLeft = "4vw";
    message.id = "message";
    if (count < 1) {message.innerHTML += "<br>Podaj prawidlowa ilosc!!!"; send = false;}
    if (count > check) {message.innerHTML += "<br>Nie mamy tyle ksiazek!!!"; send = false;} 
    if (document.getElementById("adres").value.length <= 5) {message.innerHTML += "<br>Podaj prawidlowy adres!!!"; send = false;}
    console.log(send)
    if (send) {document.getElementById("id").value = id; document.getElementById("iduz").value = id_uz; form.submit(); message.innerHTML += "<br>Wyslano!!!"}
    form.appendChild(message);
}

function buy_form(id) {
    let name = document.createElement("div");
    name.id = "buy_name";
    name.innerHTML = "Kup ksiazke - " + ksiazki[((id - 1) * 6) + 1];
    panel.appendChild(name);
    let form = document.createElement("form");
    form.id = "form2";
    form.action = "pr_html.php";
    form.method = "POST";
    form.style.marginTop = "5vh";
    panel.appendChild(form);
    let id_form = document.createElement("input");
    id_form.type = "text";
    id_form.name = "id"
    id_form.id = "id"
    id_form.style.position = "absolute";
    id_form.style.left = "-100vw";
    form.append(id_form);
    let iduz_form = document.createElement("input");
    iduz_form.type = "text";
    iduz_form.name = "iduz"
    iduz_form.id = "iduz"
    iduz_form.style.position = "absolute";
    iduz_form.style.left = "-200vw";
    form.append(iduz_form);
    let label_adres = document.createElement("label");
    label_adres.for = "adres";
    label_adres.innerHTML = "Adres zamowienia:"; 
    form.appendChild(label_adres);
    let adres = document.createElement("input");
    adres.id = "adres";
    adres.type = "text";
    adres.name = "adres";
    adres.classList.add("button-main");
    adres.style.marginTop = "0px";
    form.appendChild(adres);
    let label_ilosc = document.createElement("label");
    label_ilosc.for = "ilosc";
    label_ilosc.innerHTML = "Ilosc:"; 
    form.appendChild(label_ilosc);
    let ilosc = document.createElement("input");
    ilosc.id = "ilosc";
    ilosc.type = "number";
    ilosc.name = "ilosc";
    ilosc.min = "0";
    ilosc.style.marginTop = "0px";
    ilosc.classList.add("button-main");
    form.appendChild(ilosc);
    let button1 = document.createElement("input");
    button1.type = "reset";
    button1.value = "Wyczysc";
    button1.classList.add("button-main");
    button1.style.marginTop = "5vh";
    button1.style.width = "10vw";
    form.appendChild(button1);
    form.innerHTML += " ";
    let but = document.createElement("button");
    but.type = "button";
    but.innerHTML = "Wyslij";
    but.classList.add("button-main");
    but.style.marginTop = "5vh";
    but.style.width = "10vw";
    but.style.marginLeft = "0px";
    but.addEventListener("click", function() {check_buy(id);}, false);
    form.appendChild(but);
    let but2 = document.createElement("button");
    but2.type = "button";
    but2.classList.add("button-main");
    but2.style.marginTop = "40vh";
    but2.innerHTML = "WROC";
    but2.addEventListener("click",function(){panel.innerHTML="";interval=setInterval(function(){widen(true,false,0);},5)},false);
    form.appendChild(but2);
}

function edit(book, name, id) {
    panel.innerHTML = "";
    let name_un = document.createElement("div")
    name_un.innerHTML = "Edytuj " + name;
    name_un.classList.add("edit-name");
    panel.appendChild(name_un);
}