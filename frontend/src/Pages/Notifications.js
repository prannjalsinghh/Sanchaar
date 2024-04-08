import React from 'react';
import backIcon from '../images/Notifications/Left Icon.png';
import right from '../images/Notifications/Right Icon.png';
import time from '../images/Notifications/time.png';
import dots from '../images/Notifications/dots.png';
import { useNavigate } from 'react-router-dom';
import UserContext from '../store/userContext';
import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Loading from '../components/Loader/Loading';

const Notifications = () => {
    const userCtx = useContext(UserContext);
    const [loading,setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(()=>{
        setLoading(userCtx.isLoading);
    }
    ,[userCtx.isLoading])

    const goHome = () => {
        navigate('/home')
    }
    return (
        <div>
            <div className='bg-[#F8FAFB]'>
                <div className='w-11/12 mx-auto '>
                    <div className='flex items-center justify-between py-6'>
                        <div className='flex items-center space-x-2'>
                            <img onClick={goHome} src={backIcon} alt="" />
                            <p>Notification</p>
                        </div>
                        <img src={right} alt="" />
                    </div>
                </div>
            </div>
            {loading && <Loading></Loading>}
            {!loading && <>
            {userCtx?.loggedInUser?.notifications?.length===0 && <div className='w-9/12 mx-auto text-gray-500'>No notifications here yet</div>}
            {userCtx?.loggedInUser?.notifications?.map((each) => (
                <div className='bg-white'>
                <div className='w-11/12 mx-auto'>
                    <div className='border border-[#DFF6FF] rounded-2xl mt-3 p-3'>
                        <div className='flex items-center justify-between mb-[2px]'>
                            <p className='font-semibold text-sm text-[#416C87]'> Review received</p>
                            <img src={dots} alt="" />
                        </div>
                        <p className='text-[#1B2328] text-xs mb-1'>New <span className='font-semibold'>{each.request}</span> review received from <span className='font-semibold'>{each.sender}</span>. Tap to play it.</p>
                        <div className='flex items-center space-x-1'>
                            <img className='w-[13px] h-[13px]' src={time} alt="" />
                        </div>
                    </div>
                </div>
            </div>
            ))}
            </>}
            
        </div>

    );
};

export default Notifications;