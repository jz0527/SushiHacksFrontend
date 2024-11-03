import React, { useState } from 'react';

const Landing = ({ setCurrentPage, onSubmit }) => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [extra, setExtra] = useState('');
  const [error, setError] = useState('');

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
    if (!name || !description) {
      setError('Product Name and Description are required. Please fill them out to proceed.');
      return;
    }

    setError('');
    const data = { name, description, extra, image };
    onSubmit(data); // Pass form data to App.js

    setCurrentPage('loading');
    setTimeout(() => {
      setCurrentPage('output');
    }, 3000);
  };

  return (
    <div className='text-white h-screen bg-black flex flex-col items-center justify-center'>
      <div className='text-center p-10 max-w-[800px] mx-auto flex flex-col items-center gap-6'>
        <h1 className='text-5xl font-bold'>Getting Started</h1>

        {/* Product Name Textbox */}
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Enter the product name*'
          className='w-full max-w-[400px] border-2 border-[#00df9a] rounded-md p-4 text-gray-400 bg-black/50'
          required
        />

        {/* Product Description Textbox */}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Provide a product description*'
          className='w-full max-w-[400px] h-[100px] border-2 border-[#00df9a] rounded-md p-4 text-gray-400 bg-black/50'
          required
        />

        {/* Additional Information Textbox */}
        <textarea
          value={extra}
          onChange={(e) => setExtra(e.target.value)}
          placeholder='Provide additional information'
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

        {/* Display Error Message */}
        {error && <p className='text-red-500'>{error}</p>}

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
