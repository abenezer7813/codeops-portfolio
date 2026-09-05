import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Header from './components/Header/Header'
import Main from './components/Main/Main'
import Footer from './components/Footer/Footer'


function App() {
  

  return (
    <div className='app' >
      <Header/>
    
     <Main/>

     <Footer/>
    </div>
  )
}

export default App
