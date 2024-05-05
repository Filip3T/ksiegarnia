function randint(min, max) {
    return Math.random() * (max - min) + min;
}

var interval;

var panel = document.getElementById("form");
panel.style.left = window.innerWidth * 0.35 + "px";

function menu_glowne(isnew) {
    panel.innerHTML = "<h2>KSIĘGARNIA INTERNETOWA</h2>";
    let form = document.createElement("form")
    panel.append(form);
    let actions = [function() {zaloguj("Zaloguj" , "-zal")},function() {zaloguj("Zarejestruj" , "-zar")}, przegladaj, "<b>Zaloguj</b>", "<b>Zarejestruj</b>", "<b>Przeglądaj zasoby</b>"];
    for(let i=0;i<3;i++) {    
        let button = document.createElement("button");
        button.classList.add("button-main");
        button.type = "button";
        button.addEventListener("click", actions[i], false);
        button.innerHTML = actions[i+3];
        form.appendChild(button);
    }
    if (!isnew) {
        interval = setInterval(function() {move(false, 0.35);}, 5);
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
    button.style.marginTop = "40vh";
    button.addEventListener("click", function(){menu_glowne(false);}, false);
    button.innerHTML = "<b>WROC</b>";
    panel.appendChild(button);
    interval = setInterval(function() {move(true, 0.7);}, 5);
}

function widen(widen) {
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
            biblioteka();
        } 
    } else {
        if(panleft >= window.innerWidth * 0.35) {
            clearInterval(interval);
            panel.style.width = window.innerWidth * 0.3 + "px";
            panel.style.left = window.innerWidth * 0.35 + "px";
            menu_glowne(true);
        }
    }
}

function przegladaj() {
    panel.innerHTML = "";
    interval = setInterval(function() {widen(true);}, 5);
    
}

var books_c = ksiazki.length / 6;
var page_n = Math.floor(books_c / 9) + 1;
var page = 1;

function biblioteka() {
    let zal = document.getElementById("zal");
    zal.innerHTML = "";
    let footer = document.createElement("div");
    footer.id = "footer";
    panel.appendChild(footer);
    let button = document.createElement("button");
    button.classList.add("button-main");
    button.addEventListener("click", function(){panel.innerHTML = "";interval = setInterval(function() {widen(false);}, 5)}, false);
    button.innerHTML = "WROC";
    button.style.marginTop = "2.5vh";
    footer.appendChild(button);
    let books = document.createElement("div");
    books.id = "books";
    books.style.marginTop = "8vh";
    panel.appendChild(books);

    if (page_n != 1) pages(); 

    let button2 = document.createElement("button");
    button2.classList.add("button-main");
    button2.addEventListener("click", test, false);
    button2.innerHTML = "TEST";
    button2.style.marginTop = "2.5vh";
    footer.appendChild(button2);

    let head = document.createElement("div");
    head.id = "head";
    panel.appendChild(head);
    let search = document.createElement("form");
    search.id = "search";
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

    add_books();
}

function add_books() {
    let books = document.getElementById("books");
    books.innerHTML = "";
    for(let i=(page * 9 - 9);i<books_c;i++) {
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
    buy_button.addEventListener("click", function() {buy(name, count, id)}, false);
    buy_button.type = "button";
    buy_button.innerHTML = "KUP";
    buy_button.classList.add("buy-button")
    book.appendChild(buy_button);
}

function test() {
    add_book("nazwa1", "cena1", "autor1");
    add_book("nazwa2", "cena2", "autor2");
    add_book("nazwa3", "cena3", "autor3");
    add_book("nazwa4", "cena4", "autor4");
    add_book("nazwa5", "cena5", "autor5");
    add_book("nazwa6", "cena6", "autor6");
    add_book("nazwa7", "cena7", "autor7");
    add_book("nazwa8", "cena8", "autor8");
    add_book("nazwa9", "cena9", "autor9");
}

function pages() {
    if (page != 1) {
        if (document.getElementById("ar-l") != null) document.getElementById("ar-l").remove();
        let arrow_left = document.createElement("div");
        arrow_left.classList.add("arrow");
        arrow_left.innerHTML = "<";
        arrow_left.style.left = "0px";
        arrow_left.id = "ar-l";
        arrow_left.addEventListener("click", function(){page -= 1;add_books();pages()}, false);
        panel.appendChild(arrow_left);
    } else {
        if (document.getElementById("ar-l") != null) document.getElementById("ar-l").remove();
    }
    if (page != page_n) {
        if (document.getElementById("ar-r") != null) document.getElementById("ar-r").remove();
        let arrow_right = document.createElement("div");
        arrow_right.classList.add("arrow");
        arrow_right.innerHTML = ">";
        arrow_right.style.left = window.innerWidth * 0.95 + "px";
        arrow_right.id = "ar-r";
        arrow_right.addEventListener("click", function(){page += 1;add_books();pages()}, false);
        panel.appendChild(arrow_right);
    } else {
        if (document.getElementById("ar-r") != null) document.getElementById("ar-r").remove();
    }
}

function buy(name, count, id) {
    panel.innerHTML = "";
    interval = setInterval(function() {widen(false);}, 5);
}