import confetti from 'https://cdn.skypack.dev/canvas-confetti';

var answer;
var guessNumber = 0;

let file = "https://taylorswiftapi.onrender.com/get";
fetch (file)
.then(x => x.json())
.then(t => prepGame(t));

function prepGame(data){
    console.log(data);
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
        incorrectGuess(guess)
    }
}

function skipGuess(){
    incorrectGuess(" ");
}

function winGame(){
    document.getElementsByClassName("guess-score-widget")[guessNumber].style.backgroundColor = "green";
    document.getElementById("answer").innerHTML = answer;
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
}

function incorrectGuess(guess){
    document.getElementsByClassName("previous-guess")[guessNumber].innerHTML=guess;
    document.getElementsByClassName("guess-score-widget")[guessNumber].style.backgroundColor = "red";
    guessNumber++;
}
export {
    submitGuess,
    skipGuess,
  }