import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'

//models
import Earth from './components/Earth'
import Tree from './components/Tree'
import Ambulance from './components/Ambulance'

import {Drawer} from '@mui/material'

const Cube = () => (
  <mesh>
    <boxBufferGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color="hotpink" />
  </mesh>

)
function App() {

  const [openDrawer, setOpenDrawer] = useState(false)

  const [drawerTitle, setDrawerTitle] = useState('')

  const [count, setCount] = useState(1)
  const [trees, setTrees] = useState([])
  
  
  function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }


  let openDrawerWithTitle = (title) => {
    setOpenDrawer(true)
    setDrawerTitle(title)
  }
  
  
  useEffect(() => {
    const randx = randomIntFromInterval(-10, 10)
    const randy = randomIntFromInterval(-10, 10)
    const randz = randomIntFromInterval(-10, 10)
    setTrees([...trees, <Tree key={trees.length} position={[randx, randy, randz]} />])
  }, [count])

  return (
    <div className="">
      <Drawer
        open={openDrawer}
        anchor='right'
        onClose={() => setOpenDrawer(false)}
      >
        <h1>{drawerTitle}</h1>
      </Drawer>

      <div className='absolute top-0 left-0 bg-blue-900 w-screen h-screen rounded-lg'>
        <Canvas>
          <OrbitControls></OrbitControls>
          <Scene openDrawerWithTitle={openDrawerWithTitle}></Scene>
          {trees}
          <Ambulance />
        </Canvas>

      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          tree count is {count}
        </button>
        <p>
          Click to add a random <code>TREE</code>
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

const Scene = (props) => {

  return (
    <>
      <ambientLight intensity={0.5} />
      <Earth openDrawerWithTitle={props.openDrawerWithTitle}/>
      <Stars />
    </>
  )
}

export default App
