import Quiz from './components/Quiz';
import './App.css';

function App() {
  return (
    <div className="app">
      <h1>Dog Breed Quiz</h1>
      <p className="subtitle">Can you guess the breed from the photo?</p>
      <Quiz />
    </div>
  );
}

export default App;
