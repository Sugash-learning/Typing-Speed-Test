let initialTime = 60;
let initialScore = 0;
let contentDiv = document.getElementById("content");
let counterDiv = document.getElementById("counter");
let typeingArea = document.getElementById("typing_area");

function init() {
    let counterInt = setInterval(() => {
        initialTime--;
        counterDiv.innerHTML = initialTime;
    }, 1000);

    let checkInt = setInterval(() => {
        if (initialTime < 0) {
            counterDiv.innerHTML = "Game Over"
            typeingArea.disabled = true;
            clearInterval(counterInt);
            clearInterval(checkInt);
        }
    }, 400);

    getRandomContents();
}

init();

function getRandomContents() {
    fetch("https://api.quotable.io/random")
        .then(e => e.json())
        .then(res => {
            typeingArea.value = "";
            contentDiv.innerHTML = "";
            let arrContents = res.content.split("");
            arrContents.forEach((element, idx) => {
                const textSpan = document.createElement("span");
                textSpan.innerText = element;
                contentDiv.appendChild(textSpan);
            });
        })
}

typeingArea.addEventListener("keyup", (inp) => {
    let contentQuote = contentDiv.querySelectorAll("span");
    let inpValue = typeingArea.value.split('');

    if (inpValue.length > contentQuote.length) {
        getRandomContents();

        return;
    }

    contentQuote.forEach((each, idx) => {

        const inpContentVal = inpValue[idx];
        if (inpContentVal) {
            each.classList.remove();
            if (inpContentVal === each.innerText) {
                each.className = "correct";
            }
            if (inpContentVal !== each.innerText) {
                each.className = "wrong";
            }
        }
        if (idx > inpValue.length) {
            contentQuote[idx - 1].className = "";
        }
    })
})


