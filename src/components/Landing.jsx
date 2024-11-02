import React, { useState } from 'react';

const Landing = ({ setCurrentPage }) => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [extra, setExtra] = useState('');

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

  const handleSubmit = () => {
    // Add submit logic here
    console.log("Submitted name:", name);
    console.log("Submitted description:", description);
    console.log("Submitted addition info:", extra);
    console.log("Submitted image:", image);
  };

  return (
    <div className='text-white h-screen bg-black flex flex-col items-center justify-center'>
      <div className='text-center p-10 max-w-[800px] mx-auto flex flex-col items-center gap-6'>
        <h1 className='text-5xl font-bold'>Welcome to Your AI-Powered Advertising Solution</h1>
        <p className='text-xl'>
          Our platform helps small businesses connect with their ideal audiences through targeted, AI-driven advertising.
        </p>

        {/*Product Name Textbox*/}
        <div className='flex flex-col sm:flex-row items-center justify-between w-full max-w-[400px]'>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Enter the product name...'
              className='w-full max-w-[400px] border-2 border-[#00df9a] rounded-md p-4 text-gray-400 bg-black/50'
              required
            />
          </div>

        {/* Product Description Textbox */}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Provide a product description...'
          className='w-full max-w-[400px] h-[100px] border-2 border-[#00df9a] rounded-md p-4 text-gray-400 bg-black/50'
          required
        />

        {/* Additional Information Textbox */}
        <textarea
          value={extra}
          onChange={(e) => setExtra(e.target.value)}
          placeholder='Provide additional information...'
          className='w-full max-w-[400px] h-[100px] border-2 border-[#00df9a] rounded-md p-4 text-gray-400 bg-black/50'
        />

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
          <button
            onClick={handleSubmit}
            className='bg-[#00df9a] w-[200px] rounded-md font-medium py-3 text-black'
          >
            Submit
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
