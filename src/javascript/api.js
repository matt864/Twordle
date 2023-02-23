import confetti from 'https://cdn.skypack.dev/canvas-confetti';
var apiRes;
var answer;
var guessNumber = 0;

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
    document.getElementById("lyric-block").innerHTML = data.quote;
    answer = data.song.toLowerCase();
    console.log(answer);
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
export {
    submitGuess,
    skipGuess,
  }