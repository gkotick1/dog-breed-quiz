import { useState, useEffect, useCallback } from 'react';
import { fetchAllBreeds, generateQuestion } from '../utils/api';
import Question from './Question';
import Score from './Score';
import Button from './Button';

export default function Quiz() {
  const [allBreeds, setAllBreeds] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [answered, setAnswered] = useState(false);
  const [questionId, setQuestionId] = useState(0);

  const loadQuestion = useCallback(async (breeds) => {
    setLoading(true);
    setAnswered(false);
    const question = await generateQuestion(breeds);
    setCurrentQuestion(question);
    setLoading(false);
  }, []);

  useEffect(() => {
    async function init() {
      const breeds = await fetchAllBreeds();
      setAllBreeds(breeds);
      await loadQuestion(breeds);
    }
    init();
  }, [loadQuestion]);

  const handleAnswer = (correct) => {
    if (correct) setScore(s => s + 1);
    setTotal(t => t + 1);
    setAnswered(true);
  };

  const handleNext = () => {
    setQuestionId(id => id + 1);
    loadQuestion(allBreeds);
  };

  return (
    <div className="quiz">
      <Score score={score} total={total} />

      {loading ? (
        <div className="loading">
          <div className="spinner" />
          <p>Loading next dog...</p>
        </div>
      ) : (
        <>
          <Question
            key={questionId}
            question={currentQuestion}
            onAnswer={handleAnswer}
            answered={answered}
          />
          {answered && (
            <Button onClick={handleNext} variant="default">
              Next Question
            </Button>
          )}
        </>
      )}
    </div>
  );
}
