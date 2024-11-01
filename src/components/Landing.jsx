import React, { useState } from 'react';

const Landing = ({ setCurrentPage }) => {
  const [image, setImage] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className='text-white h-screen bg-black flex flex-col items-center justify-center'>
      <div className='text-center p-10 max-w-[800px] mx-auto flex flex-col items-center gap-6'>
        <h1 className='text-5xl font-bold'>Welcome to Your AI-Powered Advertising Solution</h1>
        <p className='text-xl'>
          Our platform helps small businesses connect with their ideal audiences through targeted, AI-driven advertising.
        </p>
        
        {/* Drop Area */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className='relative w-full max-w-[400px] h-[200px] border-4 border-dashed border-[#00df9a] rounded-lg flex items-center justify-center text-center p-4 cursor-pointer bg-black/50'
        >
          <p className='text-gray-400'>Drag and drop an image here, or click to upload from your device.</p>
          <input
            type='file'
            onChange={handleFileInput}
            className='absolute inset-0 opacity-0 cursor-pointer'
            accept='image/*'
          />
        </div>

        {/* Image Preview */}
        {image && (
          <div className='mt-6'>
            <img src={image} alt='Uploaded' className='w-full max-w-[400px] rounded-md shadow-lg' />
          </div>
        )}

        {/* Buttons */}
        <div className='flex gap-4'>
          <button className='bg-[#00df9a] w-[200px] rounded-md font-medium py-3 text-black'>
            Learn More
          </button>
          <button
            onClick={() => setCurrentPage('home')}
            className='bg-gray-600 hover:bg-gray-700 w-[200px] rounded-md font-medium py-3 text-white transition duration-200'
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
