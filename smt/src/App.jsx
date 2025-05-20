import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Landing from './Pages/Landing'
import EventDetail from './Pages/EventDetail'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* <Landing></Landing> */}
    <EventDetail></EventDetail>
    </>
  )
}

export default App
