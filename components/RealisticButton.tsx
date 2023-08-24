import React, { useState } from 'react';

const RealisticButton = () => {
  const [isPressed, setIsPressed] = useState(false);

  const buttonStyle = {
    backgroundColor: isPressed ? '#45a049' : '#4caf50',
    borderRadius: '50%',
    color: 'white',
    fontSize: '1rem',
    padding: '1rem 2rem',
    cursor: 'pointer',
    transition: 'transform 0.1s, background-color 0.1s',
    transform: isPressed ? 'scale(0.95)' : 'scale(1)',
  };

  const handlePress = () => {
    setIsPressed(true);
    setTimeout(() => {
      setIsPressed(false);
    }, 100);
  };

  return (
    <button style={buttonStyle} onClick={handlePress}>
        🤗
    </button>
  );
};

export default RealisticButton;
