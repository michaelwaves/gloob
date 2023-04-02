/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 satellite.gltf
*/

import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export default function Satellite(props) {
  const urls=[
    "https://www.every.org/climate.change.fund?viewport=desktop",
    "https://carbon180.org/donate",
    "https://www.givingwhatwecan.org/charities/giving-green-fund",
    "https://www.catf.us/",
    "https://www.evergreenaction.com/",
    "https://www.every.org/terrapraxis",
    "https://www.givingwhatwecan.org/charities/future-cleantech-architects"
]
  const group = useRef()
  const tree = useRef()
  const { nodes, materials, animations } = useGLTF('/satellite.gltf')
  const { actions } = useAnimations(animations, group)
  useEffect(() => {
    console.log(actions)
    actions['ConeAction'].play()
    actions['Plane.001Action'].play()
    actions['PlaneAction'].play()
    actions['Sphere.002Action'].play()
  }, [actions])

  useFrame(() => {
    if(props.spin){
    group.current.rotation.y += 0.005
    tree.current.rotation.y += 0.005
    }
  })
  function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  const handleClick = () => {
    const randurl = randomIntFromInterval(0,urls.length-1)
    window.open(urls[randurl], '_blank')
  }

  return (
    <group ref={group} {...props} dispose={null} onClick={()=>handleClick()}>
      <group name="Scene" position={[10,0,0]} ref={tree} rotation={[-1,1,0]}>
        <group name="Cylinder" scale={0.4}>
          <mesh name="Cylinder_1" geometry={nodes.Cylinder_1.geometry} material={materials.gloob} />
          <mesh name="Cylinder_2" geometry={nodes.Cylinder_2.geometry} material={materials.continent} />
        </group>
        <mesh name="Cube" geometry={nodes.Cube.geometry} material={materials.continent_white} position={[0, -0.13, -0.08]} scale={0.19} />
        <group name="Plane" position={[0, 0, -1.59]} scale={[0.48, 1, 1]}>
          <mesh name="Plane_1" geometry={nodes.Plane_1.geometry} material={materials.grey} />
          <mesh name="Plane_2" geometry={nodes.Plane_2.geometry} material={materials.water_realistic} />
        </group>
        <group name="Plane001" position={[0, 0, 1.48]} rotation={[-Math.PI, 0, -Math.PI]} scale={[0.48, 1, 1]}>
          <mesh name="Plane001_1" geometry={nodes.Plane001_1.geometry} material={materials.grey} />
          <mesh name="Plane001_2" geometry={nodes.Plane001_2.geometry} material={materials.water_realistic} />
        </group>
        <mesh name="Cylinder001" geometry={nodes.Cylinder001.geometry} material={nodes.Cylinder001.material} position={[0, 0.54, 0]} scale={0.11} />
        <mesh name="Sphere001" geometry={nodes.Sphere001.geometry} material={nodes.Sphere001.material} position={[0, 0.67, 0]} scale={0.15} />
        <mesh name="Sphere002" geometry={nodes.Sphere002.geometry} material={materials.grey} position={[0, 0.73, 0]} scale={[0.6, 0.3, 0.6]} />
        <mesh name="Cone" geometry={nodes.Cone.geometry} material={nodes.Cone.material} position={[0, 0.71, 0]} scale={[0.13, 0.21, 0.13]} />
        <mesh name="Cone001" geometry={nodes.Cone001.geometry} material={materials['continent.001']} position={[0, -0.4, 0]} scale={[0.55, 0.32, 0.55]} />
      </group>
    </group>
  )
}

useGLTF.preload('/satellite.gltf')
