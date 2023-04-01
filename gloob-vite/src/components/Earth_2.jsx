/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 earth_2.gltf
*/

import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { DEFAULTS } from '@react-three/fiber/dist/declarations/src/core/utils'

export default function Earth2(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/earth_2.gltf')
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh name="asia" geometry={nodes.asia.geometry} material={materials.continent} scale={6.37} />
        <mesh name="south_america" geometry={nodes.south_america.geometry} material={materials.continent} scale={6.37} />
        <mesh name="australia" geometry={nodes.australia.geometry} material={materials.continent} scale={6.37} />
        <mesh name="madagascar" geometry={nodes.madagascar.geometry} material={materials.continent} scale={6.37} />
        <mesh name="indonesia" geometry={nodes.indonesia.geometry} material={materials.continent} scale={6.37} />
        <mesh name="iceland" geometry={nodes.iceland.geometry} material={materials.continent} scale={6.37} />
        <mesh name="phillipines" geometry={nodes.phillipines.geometry} material={materials.continent} scale={6.37} />
        <mesh name="indonesia001" geometry={nodes.indonesia001.geometry} material={materials.continent} scale={6.37} />
        <mesh name="papa_new_guinea" geometry={nodes.papa_new_guinea.geometry} material={materials.continent} scale={6.37} />
        <mesh name="africa" geometry={nodes.africa.geometry} material={materials.continent} scale={6.37} />
        <mesh name="new_zealand001" geometry={nodes.new_zealand001.geometry} material={materials.continent} scale={6.37} />
        <mesh name="india" geometry={nodes.india.geometry} material={materials.continent} scale={6.37} />
        <mesh name="china" geometry={nodes.china.geometry} material={materials.continent} scale={6.37} />
        <mesh name="middle_east" geometry={nodes.middle_east.geometry} material={materials.continent} scale={6.37} />
        <mesh name="europe" geometry={nodes.europe.geometry} material={materials.continent} scale={6.37} />
        <mesh name="north_america002" geometry={nodes.north_america002.geometry} material={materials.continent} scale={6.37} />
        <mesh name="central_america" geometry={nodes.central_america.geometry} material={materials.continent} scale={6.37} />
        <mesh name="continent_selected" geometry={nodes.continent_selected.geometry} material={materials.continent_selected} />
        <mesh name="continent_white" geometry={nodes.continent_white.geometry} material={materials.continent_white} position={[0, 0, 3.18]} />
        <mesh name="real_water" geometry={nodes.real_water.geometry} material={materials.water_realistic} rotation={[0, 1.46, 0]} scale={6.09} />
        <mesh name="atmosphere" geometry={nodes.atmosphere.geometry} material={materials.atmosphere} scale={6.65} />
      </group>
    </group>
  )
}

useGLTF.preload('/earth_2.gltf')