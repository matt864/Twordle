import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './javascript/api.js';
import Heading from './components/heading';
import LyricBlockJS from './components/lyric-block';
import GuessScoreBlock from './components/guess-score-block';
import GuessInput from './components/guess-input-block';
import PreviousGuesses from './components/previous-guesses';
import AnswerBlock from './components/answer-block';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<div id="container">
<Heading />
<AnswerBlock />
<LyricBlockJS />
<GuessScoreBlock />
<GuessInput />
<PreviousGuesses />
</div>
);