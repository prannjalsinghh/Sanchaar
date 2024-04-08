import React from 'react';
import './DetectLocation.css';

const DetectLocation = ({ setDetectLocation }) => {
    return (
        <>
            <div className="backdrop-location" />
            <div data-aos="fade-up" data-aos-duration="500" className='flex items-center justify-center absolute top-0 left-0 right-0 h-screen z-[1000]'>
                <div className='w-[215px] h-[135px] mx-auto bg-white rounded-3xl'>
                    <p className='font-semibold text-sm text-black text-center mt-3 mb-2'>Detect Location</p>
                    <p className='text-center text-xs text-black mb-3'>Allow your location to fetch <br /> your current location?</p>
                    <div className='flex items-center justify-center space-x-2'>
                        <button onClick={() => setDetectLocation(false)} className='bg-[#F2F6F8] rounded-lg w-[50px] h-8 text-center font-semibold text-xs text-[#416C87]'>No</button>
                        <button className='bg-[#47B5FF] rounded-lg w-[50px] h-8 text-center font-semibold text-xs text-white'>Yes</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetectLocation;