import { Canvas, useFrame } from '@react-three/fiber'
import React, { useState, useRef } from 'react'
import { Suspense } from 'react'
import { OrbitControls, Preload, useGLTF } from '@react-three/drei'
import CanvasLoader from './helper/Loader'
import GameLogic from './helper/Logic'
import Background from './component/Background'
import Orbit from './component/Orbit'
import Floor from './component/Floor'
import BoxSpawner from './component/BoxSpawner'
import Model from './component/Model'
import GameUIOverlay from './component/UI'

function Game() {
  // Car position state
  const [carPosition, setCarPosition] = useState(0)
  
  // Score state
  const [score, setScore] = useState(0)
  
  // Boxes state (for collision detection)
  const [boxes, setBoxes] = useState([])
  
  // Move car left
  const moveCarLeft = () => {
    setCarPosition(currentPosition => 
      Math.min(currentPosition + 1, 5)
    )
  }
  
  // Move car right
  const moveCarRight = () => {
    setCarPosition(currentPosition => 
      Math.max(currentPosition - 1, -5)
    )
  }
  
  return (
    <>
      <Canvas shadows className='canvas' camera={{position: [0,10,-10]}}>
        <ambientLight intensity={0.1} />
        <directionalLight color="white" position={[0, 2, 0]} />
        <pointLight intensity={1.12} position={[0, 2, 0]} />
        <Suspense fallback={<CanvasLoader />}>
          <Model 
              path='/car/scene.gltf' 
              scale={new Array(3).fill(0.6)}
              position={[carPosition,0,-5]}
          />
          <BoxSpawner boxes={boxes} setBoxes={setBoxes} />
          <Background/>
          <Floor position={[0,-0.7,0]}/>
          
          {/* Add GameLogic inside the canvas */}
          <GameLogic 
            carPosition={carPosition}
            setCarPosition={setCarPosition}
            score={score}
            setScore={setScore}
            boxes={boxes}
            setBoxes={setBoxes}
          />
        </Suspense>
        {/* <Orbit/> */}
        {/* <axesHelper args={[5]}/> // X axis is red. The Y axis is green. The Z axis is blue. */}
      </Canvas>
      <GameUIOverlay 
        score={score} 
        onMoveLeft={moveCarLeft}
        onMoveRight={moveCarRight}
      />
    </>
  )
}

export default Game