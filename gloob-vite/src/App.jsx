import { useEffect, useState, Suspense } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars, Html } from '@react-three/drei'
import * as THREE from 'three';

//models
import Earth from './components/Earth'
import Tree from './components/Tree'
import Ambulance from './components/Ambulance'
import { useThree } from "@react-three/fiber";
//material ui
import { Drawer, Box, Typography } from '@mui/material'

//components
import Dalle from './components/Dalle'

const CameraSettings = () => {
  const { camera } = useThree()
  camera.position.set(0, 0, 15)
  return null
}


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

  const [spin, setSpin] = useState(false) // Spin the earth on click

  useEffect(() => {
    const randx = randomIntFromInterval(-10, 10)
    const randy = randomIntFromInterval(-10, 10)
    const randz = randomIntFromInterval(-10, 10)
    setTrees([...trees, <Tree key={trees.length} position={[randx, randy, randz]} />])
  }, [count])


  return (
    <>
      <Drawer
        open={openDrawer}
        anchor='right'
        onClose={() => setOpenDrawer(false)}

        sx={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0 }}
      >
        <Box>
          <Typography>{drawerTitle}</Typography>
        </Box>
      </Drawer>

      <Canvas>
        <Suspense fallback={null}>
          <CameraSettings />
          <OrbitControls enableZoom={false}></OrbitControls>
          <Scene openDrawerWithTitle={openDrawerWithTitle} spin={spin} setSpin={setSpin} />
          {/* <Ambulance /> */}
        </Suspense>
        <Html>
          <div className='fixed top-0 left-0'>
            <button
              onClick={() => setSpin(!spin)}>
              {spin ? 'Stop' : 'Spin'}
            </button>
          </div>

        </Html>
      </Canvas>




    </>
  )
}

const Scene = (props) => {

  return (
    <>
      <pointLight color="#f6f3ea" position={[17, 0, 9]} intensity={1.5} />
      {/* <ambientLight intensity={0.5} /> */}
      <Earth openDrawerWithTitle={props.openDrawerWithTitle} spin={props.spin} setSpin={props.setSpin} />
      <Stars
        radius={300}
        depth={60}
        count={20000}
        factor={7}
        saturation={0}
        fade={true}
      />
    </>
  )
}

export default App
