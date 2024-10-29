import React from 'react';
import Single from '../assets/single.png'
import Double from '../assets/double.png'
import Triple from '../assets/triple.png'

const Cards = () => {
  return (
    <div className='w-full py-[10rem] px-4 bg-white'>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8'>
          <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
              <img className='w-20 mx-auto mt-[-3rem] bg-white' src={Single} alt="/" />
              <h2 className='text-2xl font-bold text-center py-8'>Starter</h2>
              <p className='text-center text-4xl font-bold'>Free</p>
              <div className='text-center font-medium'>
                  <p className='py-2 border-b mx-8 mt-8'>Basic audience research</p>
                  <p className='py-2 border-b mx-8'>Limited to one platform suggestion</p>
                  <p className='py-2 border-b mx-8'>Support through email</p>
              </div>
              <button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3'>Get Started</button>
          </div>
          <div className='w-full shadow-xl bg-gray-100 flex flex-col p-4 md:my-0 my-8 rounded-lg hover:scale-105 duration-300'>
              <img className='w-20 mx-auto mt-[-3rem] bg-transparent' src={Double} alt="/" />
              <h2 className='text-2xl font-bold text-center py-8'>Pro</h2>
              <p className='text-center text-4xl font-bold'>$39/month</p>
              <div className='text-center font-medium'>
                  <p className='py-2 border-b mx-8 mt-8'>Up to 5 targeted communities</p>
                  <p className='py-2 border-b mx-8'>Customized ad text generation</p>
                  <p className='py-2 border-b mx-8'>Priority support</p>
              </div>
              <button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3'>Start Trial</button>
          </div>
          <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
              <img className='w-20 mx-auto mt-[-3rem] bg-white' src={Triple} alt="/" />
              <h2 className='text-2xl font-bold text-center py-8'>Enterprise</h2>
              <p className='text-center text-4xl font-bold'>Contact for custom pricing</p>
              <div className='text-center font-medium'>
                  <p className='py-2 border-b mx-8 mt-8'>Unlimited platform and audience targeting</p>
                  <p className='py-2 border-b mx-8'>Comprehensive ad generation (text and image)</p>
                  <p className='py-2 border-b mx-8'>Dedicated account manager</p>
              </div>
              <button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3'>Contact Us</button>
          </div>
      </div>
    </div>
  );
};

export default Cards;
