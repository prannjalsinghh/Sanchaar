import React, { useState } from 'react';
import rightTik from '../images/rightTik.png';
import share from '../images/share.png';
import call from '../images/call.png';
import video from '../images/video.png';
import { Link, useNavigate } from 'react-router-dom';
import xIcon from '../images/cross.png';
import fb from '../images/fb.png';
import twitter from '../images/twitter.png';
import wApp from '../images/whatsapp.png';
import pinterest from '../images/pinterest.png';
import link from '../images/copyLink.png';

const RespectSentPage = () => {
    const [shareModal, setShareModal] = useState(false);
    const [copied, setCopied] = useState(false);
    const navigate = useNavigate();
    const goHome = () => {
        navigate('/home');
    }
    const goToRecordVideo = () => {
        navigate('/video');
    }
    return (
        <div data-aos="fade-up"
            data-aos-duration="400" className=''>
            <div style={{ opacity: shareModal ? '60' : '100' }} className='w-11/12 mx-auto flex flex-col items-center justify-center h-screen'>
                <img className='mb-3' src={rightTik} alt="" />
                <p className='font-semibold text-2xl mb-1'>Cheers! Respect Sent</p>
                <p className='text-sm mb-4'>Keep spreading posivity and respect</p>
                <div className='flex items-center justify-center'>
                    <img onClick={() => setShareModal(true)} src={share} alt="" />
                    <img src={call} alt="" />
                    <img onClick={goToRecordVideo} src={video} alt="" />
                </div>
                <div className='fixed bottom-4 left-0 right-0'>
                    <div className='w-11/12 mx-auto'>
                        <button onClick={goHome} className='w-full mx-auto h-[52px] bg-[#1363DF] rounded-lg text-white font-semibolod text-lg'>Home</button>
                    </div>
                </div>
            </div>

            {
                shareModal &&
                <>
                <div className='backdrop'  />
                <div data-aos="fade-up"
                    data-aos-duration="400" className='fixed bottom-0 left-0 right-0 z-50 '>
                    <div className='w-full bg-white rounded-t-3xl'>
                        <div className='h-64 w-11/12 mx-auto px-4 py-5'>
                            <div className='flex items-center justify-between mb-3'>
                                <p className='font-medium text-xl text-[#1B2328]'>Share</p>
                                <img onClick={() => setShareModal(false)} src={xIcon} alt="" />
                            </div>
                            <hr className='bg-[#CCEAFF] mb-3' />
                            <p className='text-sm text-[#1B2328] mb-4'>Share this profile via</p>
                            <div className='flex items-center justify-start space-x-2 mb-4'>
                                <img src={fb} alt="" />
                                <img src={twitter} alt="" />
                                <img src={wApp} alt="" />
                                <img src={pinterest} alt="" />
                            </div>
                            <p className='text-sm text-[#1B2328] mb-3'>Or Copy Link</p>
                            <div className='relative'>
                                <input value="Imagebook.org/Share Link" className='h-11 bg-[#EBF1F4] rounded-lg w-full focus:outline-none text-[#1B2328] text-sm pl-10' type="text" />
                                <img className='absolute top-[10px] left-2' src={link} alt="" />
                                {
                                    !copied && <div className='absolute right-0 top-0'>
                                        <button onClick={() => setCopied(true)} className='bg-white rounded-[7px] font-semibold text-sm text-black w-24 h-11'>Copy</button>
                                    </div>
                                }
                                {
                                    copied && <div className='absolute right-0 top-0'>
                                        <button className='bg-[#47B5FF] rounded-[7px] font-semibold text-sm text-white w-24 h-11'>Copied</button>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                </>
            }
        </div>
    );
};

export default RespectSentPage;