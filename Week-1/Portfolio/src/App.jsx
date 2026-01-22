import React from 'react'
import Navbar from "./components/Navbar";
import Page1 from "./pages/Page1";
import Loader from './components/Loader';
import Hero from './pages/Hero';
import About from './pages/About';



const App = () => {



  return (
    <div>
      <Loader/>
      <Hero/>
      <About/>
      <Navbar />
      <Page1/>


    </div>
  )
}

export default App
