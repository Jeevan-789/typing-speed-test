const textEl = document.getElementById("text");
const inputEl = document.getElementById("input");
const timeEl = document.getElementById("time");
const wpmEl = document.getElementById("wpm");
const accEl = document.getElementById("accuracy");

// 🔹 Sentences
const sentences = [
    "The quick brown fox jumps over the lazy dog.",
    "JavaScript makes web pages interactive and dynamic.",
    "Practice daily to become a better programmer.",
    "Typing speed improves with consistent effort.",
    "Frontend development is fun and creative."
];

let timer;
let time = 0;
let running = false;

// 🔹 Random sentence
function getSentence() {
    return sentences[Math.floor(Math.random() * sentences.length)];
}

// 🔹 Start Test
function startTest() {
    inputEl.value = "";
    inputEl.disabled = false;

    textEl.innerText = getSentence();

    time = 0;
    running = true;
    timeEl.innerText = time;

    clearInterval(timer);

    // ⏱ Stopwatch (count UP)
    timer = setInterval(() => {
        time++;
        timeEl.innerText = time;
    }, 1000);
}

// 🔹 Detect typing
inputEl.addEventListener("input", () => {
    if (!running) return;

    const original = textEl.innerText;
    const typed = inputEl.value;

    // ✅ Stop when sentence completed
    if (typed === original) {
        clearInterval(timer);
        running = false;
        finishTest();
    }
});

// 🔹 Final result
function finishTest() {
    inputEl.disabled = true;

    const original = textEl.innerText;
    const typed = inputEl.value;

    const words = typed.trim().split(/\s+/).length;

    const wpm = Math.round((words / time) * 60) || 0;

    let correct = 0;
    for (let i = 0; i < typed.length; i++) {
        if (typed[i] === original[i]) correct++;
    }

    const accuracy = ((correct / original.length) * 100).toFixed(2);

    wpmEl.innerText = wpm;
    accEl.innerText = accuracy;
}
