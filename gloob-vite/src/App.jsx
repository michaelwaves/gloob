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

const Cube = () => (
  <mesh>
    <boxBufferGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color="hotpink" />
  </mesh>

)
function App() {
  const [count, setCount] = useState(1)
  const [trees, setTrees] = useState([])
  function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  useEffect(() => {
    const randx = randomIntFromInterval(-10, 10)
    const randy = randomIntFromInterval(-10, 10)
    const randz = randomIntFromInterval(-10, 10)
    setTrees([...trees, <Tree key={trees.length} position={[randx, randy, randz]} />])
  }, [count])

  return (
    <div className="App">

      <div className='bg-blue-900 w-[80vh] h-[50vh] rounded-lg'>
        <Canvas>
          <OrbitControls></OrbitControls>
          <Scene></Scene>
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

const Scene = () => {

  return (
    <>
      <ambientLight intensity={0.5} />
      <Earth />
      <Stars />
    </>
  )
}

export default App
