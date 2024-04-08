import React, { useEffect, useState, useContext } from 'react';
import UserContext from '../store/userContext';
import leftIcon from '../images/Notifications/Left Icon.png';
import { useNavigate } from 'react-router-dom';
import 'react-phone-number-input/style.css';
import ChangePicture from '../components/ChangePicture';

import ProfileUpdated from '../components/ProfileUpdated';
import axios from 'axios';
import Loading from '../components/Loader/Loading';

const EditProfile = () => {
    const [number, setNumber] = useState('');   
    const userCtx = useContext(UserContext);
    const [image,setImage] = useState(userCtx.loggedInUser.image);
    const [name, setName] = useState(userCtx.loggedInUser.name);
    const [gender,setGender] = useState(userCtx.loggedInUser.gender);

    const [updateProfile, setUpdateProfile] = useState(false);
    const [detectLocation, setDetectLocation] = useState(false);
    const [uploadImage, setUploadImage] = useState(false);
    const [date,setDate] = useState(userCtx.loggedInUser.dateOfBirth);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        setLoading(userCtx.isLoading);
        setImage(userCtx.loggedInUser.image);
        setName(userCtx.loggedInUser.name);
        setGender(userCtx.loggedInUser.gender)
    },[userCtx.isLoading,uploadImage])

    const navigate = useNavigate();
    const goHome = () => {
        navigate('/home');
    }
    
    const toggleGender = (e)=>{
        setGender(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setUpdateProfile(true);

        const updatedUser = {
            number: userCtx.loggedInUser.number,
            name: name,
            image: image,
            dateOfBirth: date,
            gender:gender
        }
        await axios.post(('http://localhost:5000/api/user/updateUser'), updatedUser,{
            headers: { Authorization: `Bearer ${localStorage.getItem('loggedInUser')}` }
        });
        
        setUpdateProfile(false);

    }
    return (
        <div>
            {loading && <Loading/>}
            {!loading && <div className='w-11/12 mx-auto my-6 relative'>
                <div className='flex items-center justify-between mb-10'>
                    <div className='flex items-center space-x-2'>
                        <img onClick={goHome} className='hover:cursor-pointer' src={leftIcon} alt="" />
                        <p className='font-medium text-xl text-[#06283D]'>Edit Profile</p>
                    </div>
                </div>
                <div className='flex flex-col items-center justify-center mb-10'>
                    <img onClick={() => setUploadImage(true)} className='mb-2 hover:cursor-pointer w-[80px] h-[80px] rounded-full' src={image} alt="" />
                    <p onClick={() => setUploadImage(true)} className='font-semibold text-xs text-[#5E849C] hover:cursor-pointer'>Tap to Upload Image</p>
                </div>
                <form onSubmit={handleSubmit} className='w-full mx-auto'>
                    <div className='flex items-center justify-center mb-4 gap-x-4'>
                        <div className='w-full mx-auto'>
                            <p className='font-semibold text-lg text-[#00386D] ml-2 mb-1'> Name</p>
                            <input className='w-full h-11 focus:outline-none border-2 border-[#EBF1F4] rounded-[10px] text-lg text-[#1B2328] placeholder-[#1B2328] pl-3' onChange={(e)=>setName(e.target.value)} defaultValue={name} type="text" name="firstName" id="" />
                        </div>
                    </div>
                    <div className='mb-4'>
                        <p className='font-semibold text-lg text-[#00386D] ml-2 mb-1'>Number</p>
                        <input type='text' readOnly value={userCtx.loggedInUser.number} className='w-full h-11 focus:outline-none border-2 border-[#EBF1F4] rounded-[10px] text-lg text-[#1B2328] placeholder-[#1B2328] pl-3' />
                    </div>
                    
                    <div className='mb-4'>
                        <p className='font-semibold text-lg text-[#00386D] ml-2 mb-1'>Gender</p>
                        <div className='flex items-center justify-center gap-x-4'>
                            <div className='w-full mx-auto'>
                                <div className='w-full h-11 focus:outline-none border-2 border-[#EBF1F4] rounded-[10px] text-lg text-[#1B2328] placeholder-[#1B2328] flex items-center space-x-2 pl-3'>
                                    <input className='bg-[#231F20] w-5 h-5' type="radio" name="gender" value="male" onChange={toggleGender} checked={gender==='male'?"checked":""}/>
                                    <p className='text-lg text-[#1B2328]'>Male</p>
                                </div>
                            </div>
                            <div className='w-full mx-auto'>
                                <div className='w-full h-11 focus:outline-none border-2 border-[#EBF1F4] rounded-[10px] text-lg text-[#1B2328] placeholder-[#1B2328] flex items-center space-x-2 pl-3'>
                                    <input className='bg-[#231F20] w-5 h-5' type="radio" name="gender" value="female" onChange={toggleGender} checked={gender==='female'?"checked":""} />
                                    <p className='text-lg text-[#1B2328]'>Female</p>
                                </div>
                            </div>
                        </div>
                    </div>
                   
                    <div className='mb-6'>
                        <p className='font-semibold text-lg text-[#00386D] ml-2 mb-1'>Date of Birth</p>
                        <div className='relative'>
                            <input className='border-[2px] border-[#EBF1F4] rounded-[10px] w-full pl-3 h-12 space-x-1 text-lg placeholder-[#1B2328] text-[#1B2328] focus:outline-none pr-3' onChange={(e)=>setDate(e.target.value)} defaultValue={date} name="dateInput" type="date" />
                        </div>
                    </div>
                    <div className='mb-4'>
                        <button type='submit' className='w-full h-12 rounded-[10px] bg-[#1363DF] text-white text-lg font-semibold'>Save Change</button>
                    </div>
                </form>

                {
                    uploadImage && <ChangePicture setUploadImage={setUploadImage} sendImage = {(link)=>setImage(link)}></ChangePicture>
                }
                {
                    updateProfile && <ProfileUpdated updateProfile={updateProfile} setUpdateProfile={setUpdateProfile}></ProfileUpdated>
                }
            </div>}
        </div>
    );
};

export default EditProfile;