import React, { useState, useEffect } from 'react';

function App() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, []);

  const formattedDate = date.toLocaleDateString();
  const formattedTime = date.toLocaleTimeString();

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial' }}>
      <h1><b>Welcome to CHARUSAT!!!!</b></h1>
      <h2>It is {formattedDate}</h2>
      <h2>It is {formattedTime}</h2>
    </div>
  );
}

export default App;
