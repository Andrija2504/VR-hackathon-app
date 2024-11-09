import './App.css'
// import Profile from './components/Profile'
import { Canvas } from '@react-three/fiber';
import {OrbitControls} from '@react-three/drei'
import Sphere360 from './components/Sphere360'
import PostsPage from './components/PostsPage';

function App() {

  return (
    <>
      <div>
        <PostsPage/>
      </div>
    </>
  )
}

export default App
