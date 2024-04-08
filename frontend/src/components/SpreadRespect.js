import React from 'react';
import location from '../images/Home/pin-fill.png';
import contact from '../images/Home/people-fill.png';
import location1 from '../images/Home/pin-fill1.png';
import contact1 from '../images/Home/people-fill1.png';

const SpreadRespect = () => {
    return (
        <div className='w-11/12 mx-auto'>
            <p className='font-semibold text-sm text-[#416C87] mb-4'>Spread Respect</p>
            <div className='flex items-center justify-start space-x-6 mb-6'>
                <div className='bg-[#FFEDCC] w-[165px] h-[115px] rounded-2xl relative'>
                    <div className='absolute left-3 top-3'>
                        <div className='flex space-x-1'>
                            <img src={location} alt="" />
                            <p className='font-semibold text-xl text-[#06283D]'>Nearby</p>
                        </div>
                    </div>
                    <div className='absolute bottom-3 left-4'>
                        <p className='text-[#1B2328] text-xs'>Discover trusted <br /> people nearby you.</p>
                    </div>
                    <div className='absolute right-0'>
                        <img className='rounded-2xl' src={location1} alt="" />
                    </div>
                </div>
                <div className='bg-[#CCEAFF] w-[165px] h-[115px] rounded-2xl relative'>
                    <div className='absolute left-3 top-3'>
                        <div className='flex space-x-1'>
                            <img src={contact} alt="" />
                            <p className='font-semibold text-xl text-[#06283D]'>Contact</p>
                        </div>
                    </div>
                    <div className='absolute bottom-3 left-4'>
                        <p className='text-[#1B2328] text-xs'>Check your friends <br /> on ImageBook.</p>
                    </div>
                    <div className='absolute right-0'>
                        <img className='rounded-2xl' src={contact1} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpreadRespect;