import { submitGuess,skipGuess } from "../javascript/api";

function GuessInput() {
    return <div id="input-holder">
    <input id="input" className="bordered shadow"></input>
    <div id="submit-answer" className="button bordered shadow" onClick={submitGuess}></div> 
    <div id="skip-answer" className="button bordered shadow" onClick={skipGuess}></div>   
    </div>;
  }
  
  export default GuessInput;