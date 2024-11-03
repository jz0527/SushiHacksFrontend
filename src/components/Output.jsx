import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Output = ({ formData }) => {
  const [submittedData, setSubmittedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!formData) {
      setLoading(false);
      return;
    }

    const submitAndFetchData = async () => {
      try {
        // Submit data to backend
        await axios.post('http://127.0.0.1:8000/submit_output/', {
          name: formData.name,
          description: formData.description,
          extra: formData.extra,
          image: formData.image,
        });

        // Fetch data from backend after submission
        const response = await axios.get(`http://127.0.0.1:8000/output_data/${formData.name}`);
        setSubmittedData(response.data);
      } catch (error) {
        setError('An error occurred while submitting or fetching data.');
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    submitAndFetchData();
  }, [formData]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="text-white h-screen bg-black flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold mb-6">Submission Summary</h1>
      <div className="text-lg max-w-[600px] p-4 bg-black/50 border-2 border-[#00df9a] rounded-md">
        <p><strong>ID:</strong> {submittedData.id}</p>
        <p><strong>Product Name:</strong> {submittedData.name}</p>
        <p><strong>Description:</strong> {submittedData.description}</p>
        {submittedData.extra && <p><strong>Additional Info:</strong> {submittedData.extra}</p>}
        {submittedData.image && (
          <div className="mt-4">
            <img src={submittedData.image} alt="Uploaded" className="w-full max-w-[400px] rounded-md shadow-lg" />
          </div>
        )}
      </div>
      <button
        onClick={() => window.location.reload()}
        className="bg-[#00df9a] mt-6 w-[200px] rounded-md font-medium py-3 text-black"
      >
        Go Back
      </button>
    </div>
  );
};

export default Output;
