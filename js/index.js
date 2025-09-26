
var video = document.getElementById("wpS");
var image = document.getElementById("wpI");
var vi = document.getElementById("wpV");
// Property values
var background = "media/MakotoYuki.webm";
var verticalBackground = "./makoto.webm";
var schedule = document.getElementById("schedule");
var beloved = document.getElementById("beloved");
var currency = 'try';
var apiUrl = '';

function changeDirection(x) {
    if (x.matches) { // If media query matches
        if (background.split('.').pop() == "webm") {
            vi.style.display = "block";
            image.style.display = "none";
            video.src = background;
            vi.load();
        } else {
            vi.style.display = "none";
            image.style.display = "block";
            image.src = background;
        }
    } else {
        if (verticalBackground.split('.').pop() == "webm") {
            vi.style.display = "block";
            image.style.display = "none";
            video.src = verticalBackground;
            vi.load();
        } else {
            vi.style.display = "none";
            image.style.display = "block";
            image.src = verticalBackground;
        }
    }
}

function livelyPropertyListener(name, val) {
    switch (name) {
        case "background":
            if (val.split('.').pop() == "webm") {
                vi.style.display = "block";
                image.style.display = "none";
                video.src = val;
                vi.load();
            } else {
                vi.style.display = "none";
                image.style.display = "block";
                image.src = val;
            }
            break;
        case "vertbackground":
            verticalBackground = val;
            break;
        case "schedule":
            schedule.src = val;
            break;
        case "beloved":
            beloved.src = val;
            break;
        case "weatherapiurl":
            console.log(val);
            apiUrl = val;
            break;
        case "currency":
            currency = val;
            break;
    }
}
// Create a MediaQueryList object
var x = window.matchMedia("(max-height: 1100px)");
// Call listener function at run time
// Attach listener function on state changes
changeDirection(x);
x.onchange=(x)=>{changeDirection(x)};


// Time and Date
const time = document.getElementById("time");
const date = document.getElementById("date");
var d = new Date();
time.innerHTML = `${("0" + d.getHours()).slice(-2)}:${("0" + d.getMinutes()).slice(-2)}`;
myInterval = setInterval(function() {
    var d = new Date();
    time.innerHTML =`${("0" + d.getHours()).slice(-2)}:${("0" + d.getMinutes()).slice(-2)}`;
    date.innerHTML = `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
}, 1000);


// Weather
const forecast = document.getElementById("forecast");
const description = document.getElementById("description");
const temp = document.getElementById("temperature");
const xhr = new XMLHttpRequest();
const chr = new XMLHttpRequest();
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
// İstek tamamlandığında ne yapılacağını belirle
xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
            console.log(xhr);
            const response = JSON.parse(xhr.responseText);
            forecast.src = `https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`;
            description.innerHTML = capitalizeFirstLetter(response.weather[0].description);
            temp.innerHTML = `${Math.round(response.main.temp)}°C`;
        }
    }
};

xhr.open('GET', apiUrl);
xhr.send();

weatherUpdate = setInterval(function() {
    xhr.open('GET', apiUrl);
    xhr.send();
}, 60000);


// Currency
const kurApiUrl = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`;

const usd = document.getElementById("usd");
const yen = document.getElementById("yen");
const eu = document.getElementById("eur");

chr.onreadystatechange = function() {
    if (chr.status === 200) {
        const cres = JSON.parse(chr.responseText);
        usd.innerHTML = (1 / cres[currency].usd).toFixed(2);
        yen.innerHTML = (1 / cres[currency].jpy).toFixed(2);
        eur.innerHTML = (1 / cres[currency].eur).toFixed(2);
    }
};

chr.open('GET', kurApiUrl);
chr.send();

curUpdate = setInterval(function(){
    chr.open('GET', kurApiUrl);
    chr.send();
}, 600000);

// todo edit area   
addEventListener('zero-md-rendered', (e) => {
    document.getElementsByClassName('markdown-body')[0].setAttribute('contenteditable', 'true');
    document.getElementsByClassName('markdown-body')[0].setAttribute('spellcheck', 'false');

    // save edits in todo.md

    document.getElementsByClassName('markdown-body')[0].addEventListener("input", function () {
        if (document.getElementsByClassName('markdown-body')[0].innerText.trim() == "") {
            document.getElementsByClassName('markdown-body')[0].innerText = `Click here for edit`;
        }
        var todoArea = document.getElementsByClassName('markdown-body')[0].innerText.replace('\n', '<br>');
        localStorage.setItem("todo", todoArea);
    });
});

// load edits from localstorage
window.onload = function() {
    document.getElementById("todo-text").innerText = localStorage.getItem("todo") || `Click here for edit`;

}


