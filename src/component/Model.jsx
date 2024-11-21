import React from 'react'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { useLoader } from '@react-three/fiber'

const Model = props => {
    const model = useLoader(GLTFLoader,props.path)
    // console.log(model)
    // Calculate the rotation based on the X-axis position 
    let rotationY = 0 
    if (props.position[0] < 0) { 
        rotationY = -Math.PI / 18 // 10 degrees in radians 
    } else if (props.position[0] > 0) { 
        rotationY = Math.PI / 18 // -10 degrees in radians
    }
    return (
        <primitive 
            object={model.scene}
            scale={props.scale}
            position={props.position}
            rotation={[0, rotationY, 0]} // Apply the Y-axis rotation
        />
    )
}

export default Model