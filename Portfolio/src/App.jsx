import React from 'react'
import Navbar from "./components/Navbar";
import Page1 from "./pages/Page1";
import Loader from './components/Loader';
import Hero from './pages/Hero';



const App = () => {



  return (
    <div>
      <Loader/>
      <Hero/>
      <Navbar />
      <Page1/>


    </div>
  )
}

export default App
