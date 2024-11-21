import React, { useRef, useEffect } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

const DynamicCamera = ({ carPosition, isMobile }) => {
  const { camera, size } = useThree()
  const cameraRef = useRef()
  
  const DAMPING_FACTOR = 0.08 // Smoothness of movement
  const CAMERA_HEIGHT = 3 // Camera height above the ground
  const CAMERA_DISTANCE = 8 // Distance behind the car

  const velocity = useRef(new THREE.Vector3()) // Create a velocity vector to track camera movement

  useFrame((state, delta) => {
    if (!cameraRef.current) return

    // Calculate target position
    const targetPosition = new THREE.Vector3(
      carPosition, 
      CAMERA_HEIGHT, 
      -CAMERA_DISTANCE
    )

    // Calculate desired movement
    const direction = targetPosition.clone().sub(camera.position)
    
    // Apply damping
    velocity.current.lerp(direction, DAMPING_FACTOR)
    
    // Move camera
    camera.position.add(velocity.current.multiplyScalar(delta * 10))

    // Always look at the car's position
    camera.lookAt(new THREE.Vector3(carPosition, 0, -5))
  })

  return (
    <PerspectiveCamera 
      ref={cameraRef}
      makeDefault 
      fov={isMobile ? 140 : 90}
      near={0.1} 
      far={1000}
    />
  )
}

export default DynamicCamera