import React from 'react';

const Landing = () => {
  return (
    <div className='text-white h-screen bg-black flex items-center justify-center'>
      <div className='text-center p-10 max-w-[800px] mx-auto'>
        <h1 className='text-5xl font-bold mb-6'>Welcome to Your AI-Powered Advertising Solution</h1>
        <p className='text-xl mb-4'>
          Our platform helps small businesses connect with their ideal audiences through targeted, AI-driven advertising.
        </p>
        <button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 py-3 text-black'>
          Learn More
        </button>
      </div>
    </div>
  );
};

export default Landing;
