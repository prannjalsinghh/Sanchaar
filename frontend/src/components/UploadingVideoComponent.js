import React, { useEffect, useState } from 'react';
import './DetectLocation.css';
import ProgressBar from "@ramonak/react-progress-bar";
import RespectSentPage from './RespectSentPage';


const UploadingVideoComponent = (props) => {

    return (
        <div>
            {
                props.stateComponent && <>
                    <div className="backdrop-uploading" />
                    <div data-aos="fade-up"
                        data-aos-duration="400" className='fixed bottom-0 w-full mx-auto h-[130px] bg-white rounded-t-3xl z-[1000]'>
                        <div className='flex flex-col items-start justify-start'>
                            <p className='font-medium text-xl text-[#1B2328] pl-6 pt-6 mb-4'>Uploading</p>
                            <div className='w-11/12 mx-auto'>
                                <ProgressBar completed={100}
                                    bgColor="#24BF81"
                                    baseBgColor="#E0E0E0"
                                    width="320px"
                                    height="25px"
                                    borderRadius="8px"
                                    animateOnRender="true"
                                />
                            </div>
                        </div>
                    </div>
                </>
            }
            {
                !props.stateComponent && <RespectSentPage></RespectSentPage>
            }
        </div>
    );
};

export default UploadingVideoComponent;