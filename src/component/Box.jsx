import React from 'react'

const Box = props => {
    return(
        <mesh {...props} receiveShadow>
            <boxGeometry args={[1,1,1]}/>
            <meshPhysicalMaterial color="blue"/>
        </mesh>
    )
  }
export default Box