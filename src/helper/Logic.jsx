import { useFrame } from '@react-three/fiber'

// Create a separate component for game logic inside the canvas
function GameLogic({ 
  carPosition, 
  setCarPosition, 
  score, 
  setScore, 
  boxes, 
  setBoxes 
}) {
  useFrame(() => {
    // Create a copy of boxes to avoid mutation during iteration
    const updatedBoxes = [...boxes];
    
    // Iterate through boxes with index tracking
    for (let i = 0; i < updatedBoxes.length; i++) {
      const box = updatedBoxes[i];
      
      // More precise collision detection
      const isColliding = 
        // Check X-axis proximity (car width consideration)
        Math.abs(carPosition - box.position.x) < 1 && 
        // Check Z-axis proximity (car length and box length consideration)
        box.position.z > -6 && 
        box.position.z < -4
      
      // Collision detection (touch)
      if (isColliding) {
        // console.log('Collision detected!') // Debug log
        setScore(prevScore => prevScore - 10)
        
        // Remove the box after collision
        setBoxes(prevBoxes => 
          prevBoxes.filter(b => b.id !== box.id)
        )
      }
      
      // Passing box detection (scoring)
      if (box.position.z < -6) {
        // console.log('Box passed!') // Debug log
        setScore(prevScore => prevScore + 1)
        
        // Remove the passed box
        setBoxes(prevBoxes => 
          prevBoxes.filter(b => b.id !== box.id)
        )
      }
    }
  })

  return null
}

export default GameLogic