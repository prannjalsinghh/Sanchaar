import React from 'react';
import login from '../images/num-pad/checkmark-circle-2.png';
import backSpace from '../images/num-pad/backspace.png';
import { useState } from 'react';
import ContinueByName from './ContinueByName';
import OtpInput from 'react18-input-otp';

const OtpPage = ({ setValid, number }) => {
    const [hidden, setHidden] = useState(false);;
    const [otp, setOtp] = useState('');
    const handleChange = (enteredOtp) => {
        setOtp(enteredOtp);
    };

    const OtpAppendZero = () => {
        setOtp(otp + '0');
    }
    const OtpAppendOne = () => {
        setOtp(otp + '1');
    }
    const OtpAppendTwo = () => {
        setOtp(otp + '2');
    }
    const OtpAppendThree = () => {
        setOtp(otp + '3');
    }
    const OtpAppendFour = () => {
        setOtp(otp + '4');
    }
    const OtpAppendFive = () => {
        setOtp(otp + '5');
    }
    const OtpAppendSix = () => {
        setOtp(otp + '6');
    }
    const OtpAppendSeven = () => {
        setOtp(otp + '7');
    }
    const OtpAppendEight = () => {
        setOtp(otp + '8');
    }
    const OtpAppendNine = () => {
        setOtp(otp + '9');
    }
    const OtpRemoveNum = () => {
        setOtp(otp.slice(0, -1));
    }

    const handleVerify = async (e) => {
        e.preventDefault();
        setHidden(true);
    }

    return (
        <div className='h-full'>
            {
                !hidden &&
                <>
                    <p className='font-semibold text-[25px]  mx-8 mb-2 leading-tight'>OTP Sent</p>
                    <p className='mx-8 mb-4'>Waiting to automatically detect SMS <br /> sent to <span className='font-semibold text-[#1B2328]'>{number}</span></p>
                    <form onSubmit={handleVerify}>
                        <div className='mx-6 flex items-center justify-between mb-6'>
                            {/* <div className='rounded-[10px] border-2 border-[#D3DBE3] w-16 h-12 flex items-center justify-center text-center text-[22px] font-medium'>
                            <p className=''>{otp[0]}</p>
                        </div>
                        <div className='rounded-[10px] border-2 border-[#D3DBE3] w-16 h-12 flex items-center justify-center text-center text-[22px] font-medium'>
                            <p className=''>{otp[1]}</p>
                        </div>
                        <div className='rounded-[10px] border-2 border-[#D3DBE3] w-16 h-12 flex items-center justify-center text-center text-[22px] font-medium'>
                            <p className=''>{otp[2]}</p>
                        </div>
                        <div className='rounded-[10px] border-2 border-[#D3DBE3] w-16 h-12 flex items-center justify-center text-center text-[22px] font-medium'>
                            <p className=''>{otp[3]}</p>
                        </div> */}
                            <OtpInput className='rounded-[10px] border-2 border-[#D3DBE3] w-10 h-10 mr-3 flex items-center justify-center text-center text-[22px] font-medium' value={otp} shouldAutoFocus={true} onChange={handleChange} numInputs={6} />
                        </div>
                        <div className='flex items-center justify-center space-x-4 mx-6 mb-4'>
                            <button className='w-[176px] h-[52px] bg-[#DFF6FF] rounded-lg font-semibold text-lg text-[#416C87]'>Resend OTP</button>
                            <button type='submit' className='flex items-center justify-center w-[176px] h-[52px] bg-[#1363DF] text-white text-lg font-semibold space-x-2 rounded-lg'>
                                <img src={login} alt="" />
                                <p>Login</p>
                            </button>
                        </div>
                    </form>
                    <p className='ml-6 text-[13px]'>Entered Wrong Number? <span onClick={() => setValid(false)} className='text-[#0093ED] font-semibold hover:cursor-pointer'>Edit Number</span></p>
                    <div className='w-full mx-auto font-roboto space-y-2'>
                        <div className='mx-14 flex justify-between items-center pt-10'>
                            <div onClick={OtpAppendOne} className='w-[50px] h-[50px] rounded-full shadow items-center justify-center'>
                                <p className='font-semibold text-[30px] text-center mt-1'>1</p>
                            </div>
                            <div onClick={OtpAppendTwo} className='w-[50px] h-[50px] rounded-full shadow items-center justify-center'>
                                <p className='font-semibold text-[30px] text-center mt-1'>2</p>
                            </div>
                            <div onClick={OtpAppendThree} className='w-[50px] h-[50px] rounded-full shadow items-center justify-center'>
                                <p className='font-semibold text-[30px] text-center mt-1'>3</p>
                            </div>
                        </div>
                        <div className='mx-14 flex justify-between items-center'>
                            <div onClick={OtpAppendFour} className='w-[50px] h-[50px] rounded-full shadow items-center justify-center'>
                                <p className='font-semibold text-[30px] text-center mt-1'>4</p>
                            </div>
                            <div onClick={OtpAppendFive} className='w-[50px] h-[50px] rounded-full shadow items-center justify-center'>
                                <p className='font-semibold text-[30px] text-center mt-1'>5</p>
                            </div>
                            <div onClick={OtpAppendSix} className='w-[50px] h-[50px] rounded-full shadow items-center justify-center'>
                                <p className='font-semibold text-[30px] text-center mt-1'>6</p>
                            </div>
                        </div>
                        <div className='mx-14 flex justify-between items-center'>
                            <div onClick={OtpAppendSeven} className='w-[50px] h-[50px] rounded-full shadow items-center justify-center'>
                                <p className='font-semibold text-[30px] text-center mt-1'>7</p>
                            </div>
                            <div onClick={OtpAppendEight} className='w-[50px] h-[50px] rounded-full shadow items-center justify-center'>
                                <p className='font-semibold text-[30px] text-center mt-1'>8</p>
                            </div>
                            <div onClick={OtpAppendNine} className='w-[50px] h-[50px] rounded-full shadow items-center justify-center'>
                                <p className='font-semibold text-[30px] text-center mt-1'>9</p>
                            </div>
                        </div>
                        <div className='mx-14 flex justify-between items-center'>
                            <div className='w-[50px] h-[50px] rounded-full shadow items-center justify-center'>
                                <p className='font-semibold text-[30px] text-center mt-1'>+</p>
                            </div>
                            <div onClick={OtpAppendZero} className='w-[50px] h-[50px] rounded-full shadow items-center justify-center'>
                                <p className='font-semibold text-[30px] text-center mt-1'>0</p>
                            </div>
                            <div onClick={OtpRemoveNum} className='w-[50px] h-[50px] rounded-full shadow items-center justify-center relative'>
                                <img className='absolute top-[15px] left-[10px]' src={backSpace} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center justify-center'>
                        <div className='font-normal text-sm text-center text-[#1B2328] absolute bottom-4'>
                            <p>By continuing you will agree</p>
                            <p>to our <span className='text-[#1363DF] font-semibold underline'>Term & Condition</span></p>
                        </div>
                    </div>
                </>
            }
            {
                hidden &&
                <ContinueByName></ContinueByName>
            }
        </div>
    );
};

export default OtpPage;