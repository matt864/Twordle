import confetti from "canvas-confetti";

var apiRes;
var answer;
var guessNumber = 0;
var displayStrings = [];

window.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
        submitGuess();
    }
  });

let file = "https://taylorswiftapi.onrender.com/get";
fetch (file)
.then(x => x.json())
.then(t => prepGame(t));

function prepGame(data){
    apiRes = data;
    console.log(apiRes);
    var lyricArr = data.quote.split(" ");
    var tenPerCentStringLength = Math.floor(lyricArr.length *0.1)||1;
    constructHTMLStrings(lyricArr,tenPerCentStringLength);
    answer = data.song.toLowerCase();
    showLevel()
}
function showLevel(){
    displayStrings.map((elem) => {document.getElementById("lyric-block").innerHTML+=(elem +" ")})
}
function submitGuess(){
    let guess = String(document.getElementById("input").value).toString().toLowerCase();
    if(guess===answer){
        winGame()
    }
    if(guess!==answer){
        incorrectGuess(document.getElementById("input").value)
    }
}

function skipGuess(){
window.location.reload()
}

function winGame(){
    document.getElementsByClassName("guess-score-widget")[guessNumber].style.backgroundColor = "green";
    document.getElementById("answer").innerHTML = "🤩 " + apiRes.song + " 🤩";
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
}

function incorrectGuess(guess){
    document.getElementsByClassName("previous-guess")[guessNumber].innerHTML=guess;
    document.getElementsByClassName("guess-score-widget")[guessNumber].style.backgroundColor = "red";
    if(guessNumber===4){
        loseGame()
        return
    }
    guessNumber++;
}
function loseGame(){
    document.getElementById("answer").innerHTML = "😥 " + apiRes.song + " 😥";
}

function clearInput(){
    document.getElementById("input").value = "";
}
function constructHTMLStrings(arrayOfWords,tenPercent){
    var startingWeight = tenPercent*4;
   for (let i=0;i<arrayOfWords.length;i++){
    displayStrings.push("<span class='displayed'>" + arrayOfWords[i] + "</span>");
   }

for (let i=0;i<startingWeight;i++){
    var randomNumber = Math.floor(Math.random()*displayStrings.length);
    var randomItem = displayStrings[randomNumber];
    if(randomItem.search(">/<")===-1&&randomItem.search("class='hidden'")===-1){
        displayStrings.splice(randomNumber,1,randomItem.replace("<span class='displayed'>","<span class='hidden'>"))
    }
   }
   console.log(displayStrings);
}
export {
    submitGuess,
    skipGuess,
    clearInput
  }