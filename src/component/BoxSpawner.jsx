import { useState, useEffect, useRef } from 'react'

const BoxSpawner = ({ boxes, setBoxes }) => {
  const animationFrameRef = useRef(null)
  const spawnIntervalRef = useRef(null)
  const lastFrameTimeRef = useRef(Date.now())

  // Function to generate random X position between -10 and 10
  const getRandomX = () => {
    return Math.random() * 20 - 10
  }
  
  // Function to create a new box
  const createNewBox = () => {
    return {
      id: Date.now(),
      position: {
        x: getRandomX(),
        y: 0,
        z: 200
      }
    }
  }
  
  // Update boxes positions with frame-based movement
  const updateBoxes = (currentTime) => {
    const deltaTime = currentTime - lastFrameTimeRef.current
    lastFrameTimeRef.current = currentTime

    setBoxes(prevBoxes => {
      // Move each box forward and filter out boxes that are past -200 z
      const updatedBoxes = prevBoxes
        .map(box => ({
          ...box,
          position: {
            ...box.position,
            z: box.position.z - (deltaTime * 0.05) // Speed adjusted by delta time
          }
        }))
        .filter(box => box.position.z > -200)
      
      return updatedBoxes
    });

    // Continue animation if page is visible
    if (!document.hidden) {
      animationFrameRef.current = requestAnimationFrame(updateBoxes)
    }
  }

  // Handle visibility change
  const handleVisibilityChange = () => {
    if (document.hidden) {
      // Pause animations when tab is hidden
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (spawnIntervalRef.current) {
        clearInterval(spawnIntervalRef.current)
      }
    } else {
      // Resume animations when tab becomes visible
      lastFrameTimeRef.current = Date.now();
      animationFrameRef.current = requestAnimationFrame(updateBoxes)
      
      // Restart spawn interval
      spawnIntervalRef.current = setInterval(() => {
        setBoxes(prevBoxes => [...prevBoxes, createNewBox()])
      }, 1000)
    }
  }
  
  // Setup effect for spawning and animation
  useEffect(() => {
    // Add visibility change listener
    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Initial setup
    spawnIntervalRef.current = setInterval(() => {
      setBoxes(prevBoxes => [...prevBoxes, createNewBox()])
    }, 1000)

    // Start animation frame
    animationFrameRef.current = requestAnimationFrame(updateBoxes)

    // Cleanup
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      
      if (spawnIntervalRef.current) {
        clearInterval(spawnIntervalRef.current)
      }
    }
  }, [])
  
  return (
    <>
      {boxes.map(box => (
        <mesh
          key={box.id}
          position={[box.position.x, box.position.y, box.position.z]}
        >
          <boxGeometry args={[3, 1, 1]} />
          <meshStandardMaterial color="Blue" />
        </mesh>
      ))}
    </>
  )
}

export default BoxSpawner