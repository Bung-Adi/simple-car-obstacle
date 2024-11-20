import React from 'react'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { useLoader } from '@react-three/fiber'

const Model = props => {
    const model = useLoader(GLTFLoader,props.path)
    console.log(model)
    return (
        <primitive 
            object={model.scene}
            scale={props.scale}
            position={props.position}
        />
    )
}

export default Model