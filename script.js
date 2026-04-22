const textElement = document.getElementById("text");
const inputElement = document.getElementById("input");
const timeElement = document.getElementById("time");
const wpmElement = document.getElementById("wpm");
const accuracyElement = document.getElementById("accuracy");

// 🔹 Random sentences list
const sentences = [
    "The quick brown fox jumps over the lazy dog.",
    "JavaScript is a powerful programming language.",
    "Practice coding every day to improve your skills.",
    "Typing fast requires both speed and accuracy.",
    "Consistency is the key to success in programming.",
    "Artificial intelligence is transforming the world.",
    "Frontend development involves HTML CSS and JavaScript.",
    "Debugging is an essential skill for every developer."
];

let time = 60;
let timer;
let started = false;

// 🔹 Get random sentence
function getRandomSentence() {
    return sentences[Math.floor(Math.random() * sentences.length)];
}

// 🔹 Start test
function startTest() {
    inputElement.value = "";
    inputElement.disabled = false;

    // set random sentence
    textElement.innerText = getRandomSentence();

    time = 60;
    started = true;

    timeElement.innerText = time;

    clearInterval(timer);

    timer = setInterval(() => {
        time--;
        timeElement.innerText = time;

        if (time === 0) {
            clearInterval(timer);
            finishTest();
        }
    }, 1000);
}

// 🔹 Stop timer when sentence completed
inputElement.addEventListener("input", () => {
    if (!started) return;

    const originalText = textElement.innerText;
    const typedText = inputElement.value;

    // if full sentence typed correctly → stop timer
    if (typedText === originalText) {
        clearInterval(timer);
        finishTest();
    }
});

// 🔹 Final result calculation
function finishTest() {
    started = false;
    inputElement.disabled = true;

    const originalText = textElement.innerText;
    const typedText = inputElement.value;

    const words = typedText.trim().split(/\s+/).length;
    const timeTaken = 60 - time;

    const wpm = Math.round((words / timeTaken) * 60) || 0;

    let correct = 0;
    for (let i = 0; i < typedText.length; i++) {
        if (typedText[i] === originalText[i]) correct++;
    }

    const accuracy = ((correct / originalText.length) * 100).toFixed(2);

    wpmElement.innerText = wpm;
    accuracyElement.innerText = accuracy;
}
