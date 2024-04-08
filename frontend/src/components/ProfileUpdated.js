import React, { useEffect, useState } from 'react';
import './DetectLocation.css';
import updating from '../images/updating.png';

const ProfileUpdated = ({ updateProfile, setUpdateProfile }) => {

    useEffect(() => {
        setTimeout(() => {
            setUpdateProfile(false);
        }, 1500);
    }, []);

    return (
        <>
            <div className="backdrop-location" />
            <div data-aos="fade-up" data-aos-duration="500" className='flex items-center justify-center absolute top-0 left-0 right-0 h-screen z-[1000]'>
                <div className='w-[215px] h-[135px] mx-auto bg-white rounded-3xl'>
                    <img className='mt-4 mb-2 w-auto mx-auto' src={updating} alt="" />
                    <p className='font-semibold text-sm text-black text-center mt-3 mb-2'>Profile Updated</p>
                    <p className='text-center text-xs text-black'>Your profile has been <br /> updated.</p>
                </div>
            </div>
        </>
    );
};

export default ProfileUpdated;