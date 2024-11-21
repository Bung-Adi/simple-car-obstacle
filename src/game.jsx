import { Canvas, useFrame } from '@react-three/fiber'
import React, { useState, useRef, useEffect } from 'react'
import * as THREE from 'three';
import { Suspense } from 'react'
import CanvasLoader from './helper/Loader'
import GameLogic from './helper/Logic'
import Background from './component/Background'
import DynamicCamera from './helper/DynamicCamera';
import Floor from './component/Floor'
import BoxSpawner from './component/BoxSpawner'
import Model from './component/Model'
import GameUIOverlay from './component/UI'
import useResponsive from './helper/Responsive';

function Game() {
  // Car position state
  const [carPosition, setCarPosition] = useState(0)
  
  // Score state
  const [score, setScore] = useState(0)
  
  // Boxes state (for collision detection)
  const [boxes, setBoxes] = useState([])

  // Responsivenes
  const isMobile = useResponsive();
  
  return (
    <>
      <Canvas shadows className='canvas'>
        <ambientLight intensity={0.1} />
        <directionalLight color="white" position={[0, 2, 0]} />
        <pointLight intensity={1.12} position={[0, 2, 0]} />
        <DynamicCamera 
          carPosition={carPosition}
          isMobile={isMobile} 
        />
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
        <axesHelper args={[5]}/> // X axis is red. The Y axis is green. The Z axis is blue.
      </Canvas>
      <GameUIOverlay 
        score={score}
        position={setCarPosition}
      />
    </>
  )
}

export default Game