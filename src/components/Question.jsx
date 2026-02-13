import { useState } from 'react';
import Button from './Button';

function formatBreed(breed) {
  return breed.split(' ').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
}

export default function Question({ question, onAnswer, answered }) {
  const [textInput, setTextInput] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [wasCorrect, setWasCorrect] = useState(null);

  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (!textInput.trim() || answered) return;
    const guess = textInput.trim().toLowerCase();
    const correct = guess === question.correctBreed.toLowerCase();
    setWasCorrect(correct);
    onAnswer(correct);
  };

  const handleOptionClick = (option) => {
    if (answered) return;
    const correct = option === question.correctBreed;
    setSelectedOption(option);
    setWasCorrect(correct);
    onAnswer(correct);
  };

  const handleShowOptions = () => {
    setShowOptions(true);
  };

  return (
    <div className="question">
      <div className="image-container">
        <img src={question.imageUrl} alt="Mystery dog" />
      </div>

      <p className="prompt">What breed is this dog?</p>

      {!showOptions ? (
        <div className="text-answer">
          <form onSubmit={handleTextSubmit}>
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Type your guess..."
              disabled={answered}
              autoFocus
            />
            <Button onClick={handleTextSubmit} disabled={answered || !textInput.trim()}>
              Submit
            </Button>
          </form>
          {!answered && (
            <button className="show-options-link" onClick={handleShowOptions}>
              Too hard? Show multiple choice
            </button>
          )}
        </div>
      ) : (
        <div className="options">
          {question.options.map((option) => {
            let variant = 'default';
            if (answered) {
              if (option === question.correctBreed) variant = 'correct';
              else if (option === selectedOption) variant = 'incorrect';
            }
            return (
              <Button
                key={option}
                variant={variant}
                onClick={() => handleOptionClick(option)}
                disabled={answered}
              >
                {formatBreed(option)}
              </Button>
            );
          })}
        </div>
      )}

      {answered && (
        <div className={`feedback ${wasCorrect ? 'correct' : 'incorrect'}`}>
          {wasCorrect
            ? 'Correct!'
            : `Wrong! The answer was ${formatBreed(question.correctBreed)}.`}
        </div>
      )}
    </div>
  );
}
