import confetti from "canvas-confetti";
import readyToGo from "./database";

var apiRes;
var answer;
var guessNumber = 0;
var displayStrings = [];
var lyricArr = [];
var todayDateKey;

window.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
        submitGuess();
    }
  });

window.addEventListener("load",prepGame());

function prepGame(){
    window.setTimeout(function(){
        todayDateKey = new Date().toISOString().split("T")[0];
        const alreadyCompleted = localStorage.getItem("twordle-completed-on-" + todayDateKey);
        const data = readyToGo[todayDateKey];
        apiRes = data;
        lyricArr = data.quote.split(" ");
        answer = data.song.toLowerCase();
        if(alreadyCompleted===null){
            localStorage.clear();
        constructHTMLStrings();
        }
        else{
            alreadyCompletedDisplay(alreadyCompleted);
        }
    },1)
}
function showLevel(){
    var words = document.getElementsByClassName("word");
    var displayArr = apiRes.levels[guessNumber];
    for(let i=0;i<displayArr.length;i++){
        var wordToDisplay = words[displayArr[i]];
        wordToDisplay.removeAttribute("class");
        wordToDisplay.setAttribute("class","displayed word");
        wordToDisplay.innerHTML = lyricArr[displayArr[i]];
    }
}
function submitGuess(){
    let guess = String(document.getElementById("input").value).toString().toLowerCase();
    var lastcharofguess = guess.substr(guess.length - 1);
    if(lastcharofguess===" "){
        guess = guess.slice(0,-1);
    }
    if(guess===answer){
        winGame()
    }
    if(guess!==answer){
        incorrectGuess(document.getElementById("input").value)
    }
}

function skipGuess(){
    var guesses = document.getElementsByClassName("guess-score-widget");
    var emojiString = "";
    for(let i=0;i<guesses.length;i++){
        if(guesses[i].style.backgroundColor === "red"){emojiString+="🟥"}
        if(guesses[i].style.backgroundColor === "green"){emojiString+="🟩"; break};
    }
    navigator.clipboard.writeText(emojiString);
    alert("Copied : " + emojiString);
}

function winGame(){
    document.getElementsByClassName("guess-score-widget")[guessNumber].style.backgroundColor = "green";
    document.getElementById("answer").innerHTML = "🤩 " + apiRes.song + " 🤩";
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      localStorage.setItem("twordle-completed-on-" + todayDateKey, guessNumber);
      document.getElementById("skip-button").style.display="block";
    }

function incorrectGuess(guess){
    var guessToInput = guess;
    if(guessToInput==="Guess the song..."||guessToInput===""||guessToInput===" "){guessToInput="SKIPPED"};
    document.getElementsByClassName("previous-guess")[guessNumber].innerHTML=guessToInput;
    document.getElementsByClassName("guess-score-widget")[guessNumber].style.backgroundColor = "red";
    if(guessNumber===4){
        loseGame()
        return
    }
    else{
        guessNumber++;
        showLevel();
    }
}
function loseGame(){
    document.getElementById("answer").innerHTML = "😥 " + apiRes.song + " 😥";
    localStorage.setItem("twordle-completed-on-" + todayDateKey, guessNumber+1);
    document.getElementById("skip-button").style.display="block";
}

function clearInput(){
    document.getElementById("input").value = "";
}
function constructHTMLStrings(){
   for (let i=0;i<lyricArr.length;i++){
    var hiddenText = "";
    for(let p=0;p<lyricArr[i].length;p++){
        hiddenText+="*";
    }
    displayStrings.push("<span class='hidden word' data-index=" + i + ">" + hiddenText + "</span>");
   }
   displayStrings.map((elem) => {document.getElementById("lyric-block").innerHTML+=(elem +" ")});
   showLevel();
}
function alreadyCompletedDisplay(completedOnGuess){
    if(completedOnGuess<5){
        guessNumber = completedOnGuess;
        constructHTMLStrings();
        var buttons = document.getElementsByClassName("guess-score-widget");
        for(let i=0;i<(guessNumber);i++){
            buttons[i].style.backgroundColor = "red";
        }
        buttons[guessNumber].style.backgroundColor = "green";
        document.getElementById("answer").innerHTML =  "🤩 " + apiRes.song + " 🤩";
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });

    }
    else{
        document.getElementById("answer").innerHTML =  "😥 " + apiRes.song + " 😥";
        var buttons = document.getElementsByClassName("guess-score-widget");
        for(let i=0;i<buttons.length;i++){
            buttons[i].style.backgroundColor = "red";
        }
        document.getElementById("lyric-block").innerHTML = apiRes.quote;
    }
    document.getElementById("previous-guess-block").style.display = "none";
    document.getElementById("skip-button").style.display="block";
}
export {
    submitGuess,
    skipGuess,
    clearInput
  }