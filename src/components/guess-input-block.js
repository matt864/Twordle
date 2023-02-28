import { submitGuess } from "../javascript/api";

function GuessInput() {
    return <div id="input-holder" className="bordered shadow">
    <input id="input" defaultValue={"Guess the song..."}></input>
    <div id="submit-answer" onClick={submitGuess}>SUBMIT</div>  
    </div>;
  }
  
  export default GuessInput;