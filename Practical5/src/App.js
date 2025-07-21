import React, { useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput('');
    setResult('');
  };

  const handleDelete = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  const handleEqual = () => {
    try {
      // Evaluate the expression
      const evalResult = eval(input);
      setResult(evalResult);
    } catch (error) {
      setResult('Error');
    }
  };

  const buttons = [
    '/', '*', '+', '-', 'DEL',
    '1', '2', '3',
    '4', '5', '6',
    '7', '8', '9',
    '0', '.', '='
  ];

  return (
    <div className="calculator">
      <div className="display">
        <div className="previous-result">{result !== '' && `(${result})`}</div>
        <div className="current-input">{input}</div>
      </div>

      <div className="buttons">
        {buttons.map((btn, i) => {
          if (btn === 'DEL') {
            return <button key={i} onClick={handleDelete} className="btn del">DEL</button>;
          }
          if (btn === '=') {
            return <button key={i} onClick={handleEqual} className="btn equal">=</button>;
          }
          return (
            <button
              key={i}
              onClick={() => handleClick(btn)}
              className={`btn ${['/', '*', '+', '-', '.'].includes(btn) ? 'operator' : ''}`}
            >
              {btn}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default App;
