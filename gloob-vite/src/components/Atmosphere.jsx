/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 atmosphere.gltf
*/

import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export default function Atmosphere({ spin, ...props }) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/atmosphere.gltf')
  const { actions } = useAnimations(animations, group)
  useFrame(() => {
    if (spin) {
      group.current.rotation.y += 0.0005
    }

  })
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh name="atmosphere" geometry={nodes.atmosphere.geometry} material={materials.atmosphere} scale={6.65} />
      </group>
    </group>
  )
}

useGLTF.preload('/atmosphere.gltf')
