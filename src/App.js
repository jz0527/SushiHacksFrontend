import React, { useState, useEffect} from 'react';
import Analytics from './components/Analytics';
import Cards from './components/Cards';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Newsletter from './components/Newsletter';
import Landing from './components/Landing';
import Loading from './components/Loading';
import Output from './components/Output';


function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(null);

  const handleFormSubmit = (data) => {
    setFormData(data);
    setLoading(true);
    setCurrentPage('loading');

    setTimeout(() => {
      setLoading(false);
      setCurrentPage('output');
    }, 3000);
  };

  return (
    <div>
      <Navbar />
      <button onClick={() => setCurrentPage('home')}>Home</button>
      <button onClick={() => setCurrentPage('landing')}>Landing</button>
      
      {currentPage === 'home' && (
        <>
          <Hero setCurrentPage={setCurrentPage} />
          <Analytics />
          <Newsletter />
          <Cards />
          <Footer />
        </>
      )}
      
      {currentPage === 'landing' && (
        <Landing setCurrentPage={setCurrentPage} onSubmit={handleFormSubmit}/>
      )}

      {/* {currentPage === 'loading' && (
        <Loading />
      )} */}

      {loading && <Loading />}
      {currentPage === 'output' && <Output formData={formData} />}
    </div>
  );
}

export default App;
