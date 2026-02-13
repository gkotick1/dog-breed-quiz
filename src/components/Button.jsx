import '../styles/Quiz.css';

export default function Button({ children, onClick, variant = 'default', disabled = false }) {
  return (
    <button
      className={`btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
