import { useEffect, useState, Suspense } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars, Html } from '@react-three/drei'
import * as THREE from 'three';
import env from 'react-dotenv'

//models
import Earth from './components/Earth'
import Tree from './components/Tree'
import Trees from './components/Trees'
import Ambulance from './components/Ambulance'
import Atmosphere from './components/Atmosphere'
import { useThree } from "@react-three/fiber";
//material ui
import { Drawer, Box, Typography, Button} from '@mui/material'
import HelpIcon from '@mui/icons-material/Help';

//components
import Dalle from './components/Dalle'
import DrawerContent from './components/DrawerContent'
import GPT from './components/GPT'
import Satellite from './components/Satellite'
import Help from './components/Help'

import logo from '../src/assets/images/logo.png'

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
  const [spin, setSpin] = useState(true)


  function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }


  let openDrawerWithTitle = (title) => {
    setOpenDrawer(true)
    setDrawerTitle(title)
  }

  const urls=[
    "https://www.every.org/climate.change.fund?viewport=desktop",
    "https://carbon180.org/donate",
    "https://www.givingwhatwecan.org/charities/giving-green-fund",
    "https://www.catf.us/",
    "https://www.evergreenaction.com/",
    "https://www.every.org/terrapraxis",
    "https://www.givingwhatwecan.org/charities/future-cleantech-architects"
]
  useEffect(() => {
    const randx = randomIntFromInterval(-10, 10)
    const randy = randomIntFromInterval(-10, 10)
    const randz = randomIntFromInterval(-10, 10)
    const wrapCount = count % 6
    setTrees([...trees, <Tree key={trees.length} position={[randx, randy, randz]} link={urls[wrapCount]}/>])
  }, [count])


  return (
    <>
      <img src={logo} style={{ position: 'absolute', top: 10, left: 10, width: 250}} />
      <Typography sx={{ position: 'absolute', top: 110, left: 20, color: 'white', textTransform: 'uppercase', fontWeight: 700 }} variant="h6">
        Planting the seeds of awareness!
      </Typography>

      <Typography sx={{color: 'white', position: 'absolute', top: 160, left: 20, width: 300, textAlign: 'justify'}}>
      Trees have been our planet's pillars for a very long time…and now they are in danger. Due to anthropogenic activities, whether agriculture, urbanization, illegal logging, or forest fires, tree cover is decreasing at unprecedented rates. Gloob aims to showcase these changes over the past 2 decades, and with that raise awareness of the growing issue.
      </Typography>
      
      <DrawerContent openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} drawerTitle={drawerTitle} />
      <Canvas>
        <Suspense fallback={null}>
          <CameraSettings />
          {/*<OrbitControls enableZoom={false}></OrbitControls>*/}
          <Scene openDrawerWithTitle={openDrawerWithTitle} spin={spin} setSpin={setSpin} />
          {/* <Ambulance /> */}
        </Suspense>

      </Canvas>

      <Button onClick={() => setSpin(!spin)}
        sx={{
          position: 'absolute', bottom: 0, mb: 2, backgroundColor: 'green',
          '&:hover': {
            backgroundColor: 'green',
            border: 'solid 1px white'
          }
        }}
        variant="contained"
      >
        {spin ? 'Stop' : 'Spin'}
      </Button>
      <div className='group w-1/3 absolute bottom-0 left-0 mb-2 ml-5 flex flex-row justify-center items-center space-x-3'>
      <HelpIcon
      className='peer bg-primary-light rounded-3xl hover:rounded-xl transition-all duration-100'
        sx={{
          width: 70,
          height: 70,
          '&:hover': {
            color: 'white',
            border: 'solid 1px white'
          }
        }}/>
        <span className="text-white p-2 rounded-lg text-lg peer-hover:scale-100 bg-primary-light w-3/4 transition-all duration-100 origin-left scale-0">
        <Typography>
        Click countries to start learning about deforestation! Click the satellite to be beamed 
        to some organizations doing good work!
        </Typography>
        </span>
      </div>
    </>
  )
}

const Scene = (props) => {

  return (
    <>
      <pointLight color="#f6f3ea" position={[17, 0, 9]} intensity={1.5} />
      {/* <ambientLight intensity={0.5} /> */}
      <Earth openDrawerWithTitle={props.openDrawerWithTitle} spin={props.spin} setSpin={props.setSpin} />
      <Atmosphere spin={props.spin} />
      <Satellite spin={props.spin}/>
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
