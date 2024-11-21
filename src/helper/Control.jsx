import React, { useEffect } from 'react';

const Controls = ({ onMoveLeft, onMoveRight }) => {
  let buttonLeftInterval;
  let buttonRightInterval;

  // Handle keyboard movement
  const handleKeyDown = (e) => {
    switch(e.key) {
      case 'ArrowLeft':
        onMoveLeft();
        break;
      case 'ArrowRight':
        onMoveRight();
        break;
      default:
        break;
    }
  };

  const handleMouseClick = (e) => {
    switch(e.target.id) {
      case 'button-left':
        onMoveLeft();
        break;
      case 'button-right':
        onMoveRight();
        break;
      default:
        break;
    }
  };

  const handleMouseDown = (e) => {
    switch(e.target.id) {
      case 'button-left':
        onButtonLeftHold();
        break;
      case 'button-right':
        onButtonRightHold();
        break;
      default:
        break;
    }
  };

  const handleMouseUp = (e) => {
    switch(e.target.id) {
      case 'button-left':
        stopButtonLeftHold();
        break;
      case 'button-right':
        stopButtonRightHold();
        break;
      default:
        break;
    }
  };

  const onButtonLeftHold = () => {
    buttonLeftInterval = setInterval(() => {
      onMoveLeft();
    }, 100);
  };

  const onButtonRightHold = () => {
    buttonRightInterval = setInterval(() => {
      onMoveRight();
    }, 100);
  };

  const stopButtonLeftHold = () => {
    clearInterval(buttonLeftInterval);
  };

  const stopButtonRightHold = () => {
    clearInterval(buttonRightInterval);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('click', handleMouseClick);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('click', handleMouseClick);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div className='button-area'>
      <button id='button-left'>
        Left
      </button>
      <button id='button-right'>
        Right
      </button>
    </div>
  );
};

export default Controls;
