import React, { useState } from 'react';
import xIcon from '../images/xIcon.png';
import icon from '../images/Record1.png';
import icon1 from '../images/Record2.png';

const CommitmentLevel = ({ setModal, number, yes, no, setBondingLevel, setYes, bondingLevel, commitmentLevel, setCommitmentLevel, responsibilityLevel, setResponsibilityLevel, setNo }) => {
    const showResponsibilityModal = () => {
        setYes(false);
        setBondingLevel(false);
        setNo(false);
        setCommitmentLevel(false);
        setResponsibilityLevel(true);
    }
    return (
        <div className='flex flex-col items-center justify-center'>
            <img onClick={() => setModal(false)} className='absolute top-8 right-8' src={xIcon} alt="" />
            <div className='flex items-center justify-center'>
                <p className='text-xs font-semibold absolute top-8'>2 out of 3</p>
            </div>
            <img className='mb-4' src={icon} alt="" />
            <p className='font-semibold text-lg px-2 mb-5 text-center'>What Is Commitment level Of {number} ?</p>
            <div className='flex items-center justify-center space-x-2'>
                <button onClick={showResponsibilityModal} className='w-[36px] h-[19px] font-semibold text-xs rounded bg-[#CCEAFF] text-[#47B5FF]'>20%</button>
                <button onClick={showResponsibilityModal} className='w-[36px] h-[19px] font-semibold text-xs rounded bg-[#FFEDCC] text-[#FFAE1B]'>40%</button>
                <button onClick={showResponsibilityModal} className='w-[36px] h-[19px] font-semibold text-xs rounded bg-[#E2CCFF] text-[#9747FF]'>60%</button>
                <button onClick={showResponsibilityModal} className='w-[36px] h-[19px] font-semibold text-xs rounded bg-[#144A6B] text-[#FFFFFF]'>80%</button>
                <button onClick={showResponsibilityModal} className='w-[40px] h-[19px] font-semibold text-xs rounded bg-[#D4F7E9] text-[#24BF81]'>100%</button>
            </div>

        </div>
    );
};

export default CommitmentLevel;