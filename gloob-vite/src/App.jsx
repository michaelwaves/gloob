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

//material ui
import { Drawer, Box, Typography } from '@mui/material'

//components
import Dalle from './components/Dalle'

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
    <>
      <Drawer
        open={openDrawer}
        anchor='right'
        onClose={() => setOpenDrawer(false)}
      >
        <Box>
          <Typography>{drawerTitle}</Typography>
        </Box>
      </Drawer>

      <Canvas>
        <OrbitControls></OrbitControls>
        <Scene openDrawerWithTitle={openDrawerWithTitle} />
        <Ambulance />
      </Canvas>


    </>
  )
}

const Scene = (props) => {

  return (
    <>
      <ambientLight intensity={0.5} />
      <Earth openDrawerWithTitle={props.openDrawerWithTitle} />
      <Stars />
    </>
  )
}

export default App
