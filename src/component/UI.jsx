import Reac, { useState, useEffect } from 'react';
import Controls from '../helper/Control';

const GameUIOverlay = ({ score, position }) => {
  const [showWelcomeText, setShowWelcomeText] = useState(true);

  const onMoveLeft = () => {
    position(currentPosition => 
      Math.min(currentPosition + 1, 5)
    );
  };

  const onMoveRight = () => {
    position(currentPosition => 
      Math.max(currentPosition - 1, -5)
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcomeText(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showWelcomeText && (
        <div className='welcome-overlay'>
          <div className='welcome-text'>
            Get Ready!
            <br />
            Dodge the Boxes
          </div>
          <div className="welcome-hint">
            <p>U can use keyboard arrow btw</p>
          </div>
        </div>
      )}
      <div className='ui'>
        <div className='score'>
          Score: {score}
        </div>
        <Controls onMoveLeft={onMoveLeft} onMoveRight={onMoveRight} />
      </div>
    </>
  );
};

export default GameUIOverlay;
