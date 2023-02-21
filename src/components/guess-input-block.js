import { submitGuess,skipGuess } from "../javascript/api";

function GuessInput() {
    return <div id="input-holder">
    <input id="input" className="bordered"></input>
    <div id="submit-answer" className="button bordered" onClick={submitGuess}></div> 
    <div id="skip-answer" className="button bordered" onClick={skipGuess}></div>   
    </div>;
  }
  
  export default GuessInput;