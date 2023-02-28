import { skipGuess } from "../javascript/api";

function Heading() {
  return <div id="header">
  <h1>Twordle</h1>
  <img id="skip-button" src={`${process.env.PUBLIC_URL}/images/skip-button.png`}  onClick={skipGuess} />
  </div>;
}

export default Heading;