import React from 'react'
import { Canvas, useFrame, useThree, extend, useLoader } from '@react-three/fiber'
import { useRef, Suspense } from 'react'
import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import * as THREE from 'three'
extend({OrbitControls})

const Background = props => {
    const { scene } = useThree()
    const texture = useLoader(THREE.TextureLoader, 'sky.jpg')
    texture.mapping = THREE.EquirectangularReflectionMapping
    scene.background = texture
    return null
}

export default Background