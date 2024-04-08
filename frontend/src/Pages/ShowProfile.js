import React from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import EachRespect from '../components/EachRespect';
import backIcon from '../images/Profile/backIcon.svg';
import playIcon from '../images/Profile/play_circle.svg';

const ShowProfile = () => {
    const [type, setType] = useState("given");
    const navigate = useNavigate();
    const location = useLocation();
    const route = location.state.id;
    const obj = location.state.obj;

    const navigateToBack = () => {
        navigate(-1);
    }

    return (
        <div>
            <div className='w-11/12 mx-auto mt-6 mb-10'>
                <div className='flex items-center space-x-2'>
                    <img onClick={navigateToBack} src={backIcon} alt="" />
                    <p className='text-[#06283D] font-medium text-xl'>{route}</p>
                </div>
            </div>
            <div className='flex text-center items-center w-11/12 mt-[24px] mx-auto h-[50px] rounded-md bg-[#EBF1F4]'>
                <div
                    style={{ backgroundColor: type === "given" ? "white" : "" }}
                    className="flex gap-2 justify-center items-center w-1/2 ml-[2px] mr-[2px] h-[46px] rounded-md"
                    onClick={(e) => setType("given")}
                >
                    <p style={{ color: "#416C87" }}>Given</p>
                    {
                        (route === 'Respect' && obj?.givenRespects?.length) && <p style={{ borderColor: "#416C87" }} className="border-2 text-xs rounded-md px-1">
                            {obj?.givenRespects?.length}
                        </p>
                    }

                    {
                        (route === 'Good Luck' && obj?.givenGoodLucks?.length) && <p style={{ borderColor: "#416C87" }} className="border-2 text-xs rounded-md px-1">
                            {obj?.givenGoodLucks?.length}
                        </p>
                    }
                    {
                        (route === 'Promise' && obj?.givenPromises?.length) && <p style={{ borderColor: "#416C87" }} className="border-2 text-xs rounded-md px-1">
                            {obj?.givenPromises?.length}
                        </p>
                    }
                    {
                        (route === 'Feedback' && obj?.givenFeedbacks?.length) && <p style={{ borderColor: "#416C87" }} className="border-2 text-xs rounded-md px-1">
                            {obj?.givenFeedbacks?.length}
                        </p>
                    }

                </div>
                <div
                    style={{ backgroundColor: type === "recieved" ? "white" : "" }}
                    className=" flex gap-2 justify-center items-center w-1/2 ml-[2px] mr-[2px] h-[46px] rounded-md"
                    onClick={(e) => setType("recieved")}
                >
                    <p style={{ color: "#416C87" }}>Recieved</p>
                    {
                        (route === 'Respect' && obj?.recievedRespects?.length) && <p style={{ borderColor: "#416C87" }} className="border-2 text-xs rounded-md px-1">
                            {obj?.recievedRespects?.length}
                        </p>
                    }
                    {
                        (route === 'Good Luck' && obj?.recievedGoodLucks?.length) && <p style={{ borderColor: "#416C87" }} className="border-2 text-xs rounded-md px-1">
                            {obj?.recievedGoodLucks?.length}
                        </p>
                    }
                    {
                        (route === 'Promise' && obj?.recievedPromises?.length) && <p style={{ borderColor: "#416C87" }} className="border-2 text-xs rounded-md px-1">
                            {obj?.recievedPromises?.length}
                        </p>
                    }
                    {
                        (route === 'Feedback' && obj?.recievedFeedbacks?.length) && <p style={{ borderColor: "#416C87" }} className="border-2 text-xs rounded-md px-1">
                            {obj?.recievedFeedbacks?.length}
                        </p>
                    }
                </div>
            </div>
            <div className='w-11/12 mx-auto mt-10'>
                <div className='grid grid-cols-2 justify-center gap-4'>
                    {console.log(obj?.givenRespects)}
                    {(type === "given" && route === 'Respect') &&
                        obj?.givenRespects?.map((each) => (
                            <EachRespect key={each._id} each={each}></EachRespect>
                        ))}
                    {(type === "recieved" && route === 'Respect') &&
                        obj?.recievedRespects?.map((each) => (
                            <EachRespect key={each._id} each={each}></EachRespect>
                        ))}
                    {(type === "given" && route === 'Good Luck') &&
                        obj?.givenGoodLucks?.map((each) => (
                            <EachRespect key={each._id} each={each}></EachRespect>
                        ))}
                    {(type === "recieved" && route === 'Good Luck') &&
                        obj?.recievedGoodLucks?.map((each) => (
                            <EachRespect key={each._id} each={each}></EachRespect>
                        ))}
                    {(type === "given" && route === 'Promise') &&
                        obj?.givenPromises?.map((each) => (
                            <EachRespect key={each._id} each={each}></EachRespect>
                        ))}
                    {(type === "recieved" && route === 'Promise') &&
                        obj?.recievedPromises?.map((each) => (
                            <EachRespect key={each._id} each={each}></EachRespect>
                        ))}
                    {(type === "given" && route === 'Feedback') &&
                        obj?.givenFeedbacks?.map((each) => (
                            <EachRespect key={each._id} each={each}></EachRespect>
                        ))}
                    {(type === "recieved" && route === 'Feedback') &&
                        obj?.recievedFeedbacks?.map((each) => (
                            <EachRespect key={each._id} each={each}></EachRespect>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default ShowProfile;