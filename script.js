//to do: 1. place metrics in a separate div and style as a report box
//       2. calculate accuracy
//       3. generate array of different potential texts user can choose

const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

var timer = [0,0,0,0];
var interval;
var timerRunning = false;

// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time) {
    if (time <= 9) {
        time = "0" + time;
    }
    return time;
}

// Run a standard minute/second/hundredths timer:
function runTimer() {
    let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
    theTimer.innerHTML = "Time: " + currentTime;
    timer[3]++;

    timer[0] = Math.floor((timer[3]/100)/60);
    timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}

// Match the text entered with the provided text on the page:
function spellCheck() {
    let textEntered = testArea.value;
    let originTextMatch = originText.substring(0,textEntered.length);

    if (textEntered == originText) {
        clearInterval(interval);
        testWrapper.style.borderColor = "#429890";
        wordsPerMinute();
        charsPerMinute();
        console.log(timer);
    } else {
        if (textEntered == originTextMatch) {
            testWrapper.style.borderColor = "#65CCf3";
        } else {
            testWrapper.style.borderColor = "#E95D0F";
        }
    }

}

//display the words per minute metric
function wordsPerMinute(){
    var totalMins = timer[0] + timer[1]/60 + (timer[2]/100)/60; //calculate the total number of minutes
    var copy = originText.slice(); //don't want to affect the original originText object
    var numWords = copy.split(" ").length;
    var wpm = numWords/totalMins;
    var wpmElement = document.createElement("div");
    wpmElement.className = "words-per-min";
    var wpmText = document.createTextNode("Words/min: " + wpm.toFixed(2));
    wpmElement.appendChild(wpmText);
    document.querySelector(".meta").appendChild(wpmElement);
    wpmElement.scrollIntoView();
}

//display the chars per min metric
function charsPerMinute(){
    var totalMins = timer[0] + timer[1]/60 + (timer[2]/100)/60; //calculate the total number of minutes
    var copy = originText.slice(); //don't want to affect the original originText object
    var numChars = copy.split('').length;
    var cpm = numChars/totalMins;
    var cpmElement = document.createElement("div");
    cpmElement.className = "chars-per-min";
    var cpmText = document.createTextNode("Chars/min: " + cpm.toFixed(2));
    cpmElement.appendChild(cpmText);
    document.querySelector(".meta").appendChild(cpmElement);
}

// Start the timer:
function start() {
    let textEnterdLength = testArea.value.length;
    if (textEnterdLength === 0 && !timerRunning) {
        timerRunning = true;
        interval = setInterval(runTimer, 10);
    }
}

// Reset everything:
function reset() {
    clearInterval(interval);
    interval = null;
    timer = [0,0,0,0];
    timerRunning = false;

    testArea.value = "";
    theTimer.innerHTML = "Time: 00:00:00";
    testWrapper.style.borderColor = "grey";
    var e = document.querySelector('.words-per-min');
    e.parentNode.removeChild(e);
    var e1 = document.querySelector('.chars-per-min');
    e1.parentNode.removeChild(e1);
    document.querySelector(".intro").scrollIntoView();
}

// Event listeners for keyboard input and the reset
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);
