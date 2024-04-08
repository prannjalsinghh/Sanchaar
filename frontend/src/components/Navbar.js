import React, { useState } from 'react';
import leftIcon from '../images/Home/menu.svg';
import loveIcon from '../images/Home/Right Icon.png';
import notification from '../images/Home/notification.svg';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ sidebar, setSidebar }) => {
    const navigate = useNavigate();
    const goToNotifications = () => {
        navigate('/notifications')
    }
    return (
        <div >
            <div className='w-full p-5 mx-auto pt-6 fixed bg-white'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center space-x-2'>
                        <img onClick={() => setSidebar(true)} className='hover:cursor-pointer' src={leftIcon} alt="" />
                        <Link to='/home'><p className='font-medium text-xl text-[#06283D]'>Sanchaar</p></Link>
                    </div>
                    <div className='flex items-center space-x-2'>
                        {/* <img className='hover:cursor-pointer' src={loveIcon} alt="" /> */}
                        <img onClick={goToNotifications} className='hover:cursor-pointer' src={notification} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;