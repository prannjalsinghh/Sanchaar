import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import RespectReceived from '../components/RespectReceived';
import trophy from '../images/Home/trophy.png';
import SpreadRespect from '../components/SpreadRespect';
import InvitePeople from '../components/InvitePeople';
import FooterHome from '../components/FooterHome';
import HomeSidebar from '../components/HomeSidebar';
import xIcon from '../images/Home/🎨 Icon Сolor.png';
import searchIcon from '../images/Home/search.svg';
import user from '../images/Home/Small Card Images.png';
import checkIcon from '../images/Home/filled color.png';
import wallet from '../images/Home/wallet-03.png';
import notification from '../images/Home/notification.png';
import location from '../images/Home/location.png';
import settings from '../images/Home/settings.png';
import logout from '../images/Home/logout.png';
import version from '../images/Home/version.png';
import { useNavigate } from 'react-router-dom';
import auth from '../firebase.init';
import { signOut } from "firebase/auth";
import { useContext } from 'react';
import UserContext from '../store/userContext';
import respect from '../images/Home/respect.svg';
import goodLuck from '../images/Home/goodLuck.svg';
import promise from '../images/Home/promise.svg';
import feedback from '../images/Home/feedback.svg';
import Loading from '../components/Loader/Loading';
import EachPost from '../components/EachPost';
import axios from 'axios';

const Home = () => {
    
    const userCtx = useContext(UserContext);
    const [sidebar, setSidebar] = useState(false);
    const [posts, setPosts] = useState([]);
    const [loading,setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(userCtx.isLoading);
        if(userCtx.isLoading === false){
            renderFeed();
        }
    }, [userCtx.isLoading])

    const renderFeed = async () =>{
        setLoading(true);
        const data = await axios.get(
            "http://localhost:5000/api/posts/showFeed/1"
        ,{
            headers: {
              Authorization: `Bearer ${localStorage.getItem("loggedInUser")}`,
            },
        })
        
        setPosts(data.data);
        console.log(posts)
        setLoading(false);
    }

    const doSignOut = () => {
        signOut(auth).then(() => {
            localStorage.removeItem('loggedInUser');
            navigate('/login');
        }).catch((error) => {
            console.log('error occurred');
        });
    }

    const goToEditProfile = () => {
        navigate('/edit-profile');
    }

    const navigateToSearch = (route)=>{
        navigate('/giveResectSearch',{state:{id:route}})
    }

    return (
        <div className='font-poppins relative min-h-screen'>
            {loading && <Loading></Loading>}
            {!loading && <>
            <Navbar sidebar={sidebar} setSidebar={setSidebar}></Navbar>

            <div className='w-11/12 pt-[70px] mx-auto flex flex-col gap-[20px]'>
                {posts.map((post,idx) => <EachPost post={post} key={idx}/>)}
            </div>
            
            {/* <SpreadRespect></SpreadRespect> */}
            {/* <InvitePeople></InvitePeople> */}
             <FooterHome></FooterHome>
            {
                sidebar && <div data-aos="fade-right"
                    data-aos-duration="500" className={sidebar ? 'left-0 top-0 right-16 z-50 fixed bg-white ' : '-left-full '}>
                    <div className='w-full h-screen'>
                        <div className='w-5/6 mx-auto'>
                            <div className='flex items-center justify-between mt-6 mb-8'>
                                <p className='font-medium text-xl text-[#06283D]'>Menu</p>
                                <img onClick={() => setSidebar(false)} className='btncls' src={xIcon} alt="" />
                            </div>
                            <div className='flex items-center space-x-3 mt-3 mb-5'>
                                <img style={{ width: "50px", height: "50px", borderRadius: "100px" }} src={userCtx.loggedInUser.image} alt="" />
                                <div className=''>
                                    <div className='flex items-center space-x-2'>
                                        <p className='text-[#1B2328]'>{userCtx.loggedInUser.name}</p>
                                        {userCtx.loggedInUser.verified && <img src={checkIcon} alt="" />}
                                    </div>
                                    <button onClick={goToEditProfile} className='text-[#5E849C] text-xs font-semibold'>Edit Profile</button>
                                </div>
                            </div>
                        </div>
                        <hr className='' />
                        
                        <hr />
                        <div onClick={()=>navigate('/notifications')} className='w-5/6 btncls mx-auto flex items-center space-x-2 my-4'>
                            <img src={notification} alt="" />
                            <p className='text-[#1B2328]'>Notification</p>
                        </div>
                        <hr />
                        
                        <hr />
                        <div className='w-5/6 mx-auto flex items-center btncls space-x-2 my-4'>
                            <img src={settings} alt="" />
                            <p className='text-[#1B2328]'>Account Setting</p>
                        </div>
                        <hr />
                        <div onClick={doSignOut} className=' btncls w-5/6 mx-auto flex items-center space-x-2 my-4'>
                            <img src={logout} alt="" />
                            <p className='text-[#1B2328]'>Logout</p>
                        </div>
                        <div className='fixed bottom-0 left-0 right-0'>
                            <hr />
                            <div className='w-5/6 mx-auto flex items-center space-x-2 my-4'>
                                <img src={version} alt="" />
                                <p className='text-[#5E849C]'>Version v1.1</p>
                            </div>
                        </div>
                    </div>
                </div>
            }
            </>}
        </div>
    );
};

export default Home;