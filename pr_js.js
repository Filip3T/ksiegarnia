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
    let actions = [zaloguj, zaloguj, zaloguj, "<b>Zaloguj</b>", "<b>Zarejestruj</b>", "<b>Przeglądaj zasoby</b>"];
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
        if (l != 99 && l > 40) l = Math.round(l + randint(-2, 2));
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

function move(right, where) {
    panel.style.left = window.innerWidth * 0.35 + "px"; 
    console.log(panleft);
    if (right) panleft += 15;
    else panleft -= 15;
    panel.style.left = panleft + "px";
    if (right) {if(panleft > window.innerWidth * where) clearInterval(interval)};
    if (!right) {if(panleft < window.innerWidth * where) clearInterval(interval)};
}

function zaloguj() {
    panel.innerHTML = "";
    let header = document.createElement("h2");
    header.innerHTML = "Zaloguj";
    panel.appendChild(header);
    let nform = document.createElement("form");
    nform.method = "POST";
    nform.action = "pr_html.php";
    panel.appendChild(nform)
    let names = ["Login", "Haslo"]
    for(let i=0;i<=1;i++) {
        let labels = document.createElement("label");
        labels.for = names[i];
        labels.innerHTML = names[i];
        let inp = document.createElement("input");
        inp.classList.add("button-main");
        inp.style.marginTop = "0px";
        inp.id = names[i];
        inp.name = names[i] + "-zal";
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