import React , {useEffect, useState, useCallback } from 'react';
import axios from 'axios';


const Output = ({ formData }) => {

    const [submittedData, setSubmittedData] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
  if (!formData) return null;

  const submitData = async () => {
    try {
      const response = await axios.post('http://localhost:8000/submit_output/', {
        name: formData.name,
        description: formData.description,
        extra: formData.extra,
        image: formData.image,
      });
      console.log('Data submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting data:', error);
      setError('Error submitting data'); // Set error state
    }
  };

  const fetchData = async () => {
    try {
      // Adjust this URL according to your backend implementation
      const response = await axios.get(`http://localhost:8000/output_data/${formData.name}`);
      setSubmittedData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data'); // Set error state
    } finally {
      setLoading(false); // Always set loading to false
    }
  };

  // Call useEffect to handle submission and fetching of data
  useEffect(() => {
    // Check if formData is valid; if not, return early
    if (!formData) {
      setLoading(false); // If no formData, stop loading
      return;
    }

    // Only call these functions if formData is available
    const submitAndFetch = async () => {
      await submitData();
      await fetchData();
    };

    submitAndFetch(); // Invoke the async function
  }, [formData]); // Dependencies array contains formData
  return (
    <div className='text-white h-screen bg-black flex flex-col items-center justify-center'>
      <h1 className='text-5xl font-bold mb-6'>Submission Summary</h1>
     {/* Submission Summary Section */}
      <div className='text-lg max-w-[600px] p-4 bg-black/50 border-2 border-[#00df9a] rounded-md'>
        <p><strong>Product Name:</strong> {formData.name}</p>
        <p><strong>Description:</strong> {formData.description}</p>
        {/* Conditionally render Additional Info only if it's not empty */}
        {formData.extra && (
          <p><strong>Additional Info:</strong> {formData.extra}</p>
        )}
        {formData.image && (
          <div className='mt-4'>
            <img src={formData.image} alt='Uploaded' className='w-full max-w-[400px] rounded-md shadow-lg' />
          </div>
        )}
      </div>

      {/* Market Research Report Section */}
      <div className="border-2 border-[#00df9a] p-8 mt-10 rounded-md max-w-[600px] w-full text-left">
        <h2 className="text-3xl font-bold mb-4">Market Research Report</h2>
        <p className="text-gray-400">
          Here we will be analyzing current market trends, consumer preferences, and potential demand for your product.
          Filler text lol
          Our detailed research shows that your product could perform well in various target demographics.
          Here are some markets you should target: A, A, BB, C
        </p>
      </div>

        {/* Generated Advertisement Section */}
        <div className="border-2 border-[#00df9a] p-8 mt-10 rounded-md max-w-[600px] w-full text-left">
        <h2 className="text-3xl font-bold mb-4">Generated Advertisement</h2>
        <p className="text-gray-400 mb-4">
          Here's an advertisement generated based on your product details, aimed at attracting potential customers.
        </p>
        {/*Image placeholder */}
        <img src="/path/to/your/generated-ad-image.jpg" alt="Generated Advertisement" className="w-full rounded-md" />
      </div>


      <button
        onClick={() => window.location.reload()}
        className='bg-[#00df9a] mt-6 w-[200px] rounded-md font-medium py-3 text-black'
      >
        Go Back
      </button>
    </div>
  );
};

export default Output;
