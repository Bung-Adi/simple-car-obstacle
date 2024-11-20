import React from 'react'

const GameUIOverlay = ({ score, onMoveLeft, onMoveRight }) => {
  return (
    <div className='ui'>
      <div className='score'>
        Score: {score}
      </div>
      <div className='button-area'>
        <button onClick={onMoveLeft} >
          Left
        </button>
        <button onClick={onMoveRight} >
          Right
        </button>
      </div>
    </div>
  );
};

export default GameUIOverlay