

const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
var originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
const circleOne = document.querySelector("#easy");
const circleTwo = document.querySelector("#medium");
const circleThree = document.querySelector("#hard");

var timer = [0,0,0,0];
var interval;
var timerRunning = false;
var rightChar = 0; 
var wrongChar = 0;
var tableBuilt = false;

var easyText = "Here is some easy text to type.";
var mediumText = "This text is more complicated. Be mindful of Proper Nouns and all types of punctuation!"
var hardText = "You have to type this text EXACTLY in the field below. The timer will only stop if and ONLY IF you match this text exactly. Once you are done typing, you will see your words per minute, your chars per minute, and your accuracy. Good Luck!"

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
    theTimer.innerHTML = currentTime;
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
        var wpm = wordsPerMinute();
        var cpm = charsPerMinute();
        var a = accuracy();
        if(!tableBuilt){ //this if statement makes sure the table is not built multiple times
            buildTable(wpm, cpm, a);
            tableBuilt = true;
        }
    } else {
        if (textEntered == originTextMatch) {
            testWrapper.style.borderColor = "#65CCf3";
            rightChar++;
        } else {
            testWrapper.style.borderColor = "#E95D0F";
            wrongChar++;
        }
    }

}

//display the words per minute metric
function wordsPerMinute(){
    //calculating the words per minute metric
    var totalMins = timer[0] + timer[1]/60 + (timer[2]/100)/60; //calculate the total number of minutes
    var copy = originText.slice(); //don't want to affect the original originText object
    var numWords = copy.split(" ").length;
    var wpm = numWords/totalMins;
    return wpm.toFixed(2); 
    //populating the table
}

//display the chars per min metric
function charsPerMinute(){
    var totalMins = timer[0] + timer[1]/60 + (timer[2]/100)/60; //calculate the total number of minutes
    var copy = originText.slice(); //don't want to affect the original originText object
    var numChars = copy.split('').length;
    var cpm = numChars/totalMins;
    return cpm.toFixed(2); 
}

//display the accuracy of typing
function accuracy(){
   var a = rightChar/(rightChar+wrongChar)*100;
   console.log(rightChar);
   console.log(wrongChar);
   return a.toFixed(2) + "%";
}

//build the table of metrics after typing is done
function buildTable(wpm, cpm, a){
    //setting up the table and its rows
    var metricsTable = document.createElement("table");
    metricsTable.className = "metrics";
    document.querySelector('.main').appendChild(metricsTable);
    var headRow = document.createElement("tr");
    headRow.className = "heading";
    metricsTable.appendChild(headRow);
    var newRow = document.createElement("tr");
    newRow.className = "metrics-row";
    metricsTable.appendChild(newRow);

    //settng up the elements
    var wpmHeadingElement = document.createElement("th");
    var wpmHeadingText = document.createTextNode("Words per min");
    var wpmCell = document.createElement("td");
    var wpmText = document.createTextNode(wpm);

    var cpmHeadingElement = document.createElement("th");
    var cpmHeadingText = document.createTextNode("Chars per min");
    var cpmCell = document.createElement("td");
    var cpmText = document.createTextNode(cpm);

    var aHeadingElement = document.createElement("th");
    var aHeadingText = document.createTextNode("Accuracy while typing");
    var aCell = document.createElement("td");
    var aText = document.createTextNode(a);

    //adding nodes to the DOM tree
    headingElements = [wpmHeadingElement, cpmHeadingElement, aHeadingElement];
    headingTexts = [wpmHeadingText, cpmHeadingText, aHeadingText];
    cells = [wpmCell, cpmCell, aCell];
    texts = [wpmText, cpmText, aText];

    for(var i = 0; i < headingElements.length; i++){
        headingElements[i].appendChild(headingTexts[i]);
        headRow.appendChild(headingElements[i]);
        cells[i].appendChild(texts[i]);
        newRow.appendChild(cells[i]);
    }
    
    //scrolling into view
    metricsTable.scrollIntoView();
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
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "grey";
    rightChar = 0; 
    wrongChar = 0;
    var tables = document.querySelectorAll('.metrics');
    tables.forEach(function(t){
        t.parentNode.removeChild(t);
    });
    tableBuilt = false;
    document.querySelector(".intro").scrollIntoView();
}

function changeText(node){
    if(node == circleOne){
        document.querySelector("#origin-text p").innerHTML = easyText;
        originText = document.querySelector("#origin-text p").innerHTML
        circleOne.classList.toggle("chosen");
        circleTwo.classList.toggle("chosen", false);
        circleThree.classList.toggle("chosen", false);
    } else if (node == circleTwo){
        document.querySelector("#origin-text p").innerHTML = mediumText;
        originText = document.querySelector("#origin-text p").innerHTML;
        circleTwo.classList.toggle("chosen");
        circleOne.classList.toggle("chosen", false);
        circleThree.classList.toggle("chosen", false)
    } else {
        document.querySelector("#origin-text p").innerHTML = hardText;
        originText = document.querySelector("#origin-text p").innerHTML;
        circleThree.classList.toggle("chosen");
        circleOne.classList.toggle("chosen", false);
        circleTwo.classList.toggle("chosen", false);
    }
}

// Event listeners for keyboard input and the reset
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);
circleOne.addEventListener("click", function(){changeText(circleOne)}, false);
circleTwo.addEventListener("click", function(){changeText(circleTwo)}, false);
circleThree.addEventListener("click", function(){changeText(circleThree)}, false);