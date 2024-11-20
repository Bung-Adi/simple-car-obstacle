import React from 'react'
import { Canvas, useFrame, useThree, extend, useLoader } from '@react-three/fiber'
import { useRef, Suspense } from 'react'
import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import * as THREE from 'three'
extend({OrbitControls})

const Orbit = () => {
    const {camera,gl} = useThree()
    return(
        <orbitControls attach='orbitControls' args={[camera,gl.domElement]} />
    )
}

export default Orbit