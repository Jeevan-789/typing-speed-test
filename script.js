let time = 60;
let timer;
let started = false;

function startTest() {
    document.getElementById("input").value = "";
    time = 60;
    started = true;

    timer = setInterval(() => {
        time--;
        document.getElementById("time").innerText = time;

        if (time === 0) {
            clearInterval(timer);
            calculateResult();
        }
    }, 1000);
}

function calculateResult() {
    let text = document.getElementById("text").innerText;
    let input = document.getElementById("input").value;

    let words = input.trim().split(" ").length;
    let wpm = words;

    let correct = 0;
    for (let i = 0; i < input.length; i++) {
        if (input[i] === text[i]) correct++;
    }

    let accuracy = ((correct / text.length) * 100).toFixed(2);

    document.getElementById("wpm").innerText = wpm;
    document.getElementById("accuracy").innerText = accuracy;
}
