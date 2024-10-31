import React, { useState } from 'react';
import Analytics from './components/Analytics';
import Cards from './components/Cards';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Newsletter from './components/Newsletter';
import Landing from './components/Landing';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div>
      <Navbar />
      <button onClick={() => setCurrentPage('home')}>Home</button>
      <button onClick={() => setCurrentPage('landing')}>Landing</button>
      
      {currentPage === 'home' && (
        <>
          <Hero />
          <Analytics />
          <Newsletter />
          <Cards />
          <Footer />

        </>
      )}
      
      {currentPage === 'landing' && (
        <Landing />
      )}
    </div>
  );
}

export default App;
