import React from 'react'

const Floor = props => {
    return(
        <mesh {...props} receiveShadow>
            <boxGeometry args={[20,1,200]}/>
            <meshPhysicalMaterial/>
        </mesh>
    )
  }
export default Floor