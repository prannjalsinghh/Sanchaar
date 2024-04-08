import React, { useEffect,useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import leftIcon from "../images/Notifications/Left Icon.png";
import loveIcon from "../images/Home/Right Icon.png";
import notification from "../images/Home/Right Icon (1).png";
import person from "../images/Notifications/Vector.png";
import search from "../images/Notifications/search.png";
import ContactEach from "./ContactEach";
import UserContext from "../store/userContext";
import { useState } from "react";
import ohNoImage from "../Assets/ohNoImage.png";
import add from '../Assets/add.png'
import 'react-phone-number-input/style.css'
import { isPossiblePhoneNumber } from 'react-phone-number-input'
import PhoneInput from 'react-phone-number-input'
import GiveRespectEachContact from "./GiveRespectEachContact";
import axios from "axios";
import Loading from "./Loader/Loading";

const GiveRespectSearchPage = () => {
  const location = useLocation();
  const userCtx = useContext(UserContext);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [searchResult,setSearchResult] =useState({});

  useEffect(()=>{
    if(!location.state.id){
      navigate('/home');
    }
  },[])

  useEffect(()=>{
    onInputChange();
  },[input])

  const onInputChange = async ()=>{
    if( input.length === 0) return;

    setLoading(true);
    const res = await axios.get(`http://localhost:5000/api/user/searchUserPartialNumber/${input}`,
    {headers: { Authorization: `Bearer ${localStorage.getItem('loggedInUser')}`}})
    const data = res.data;
    if(data && data.number!==userCtx.loggedInUser.number){
      setSearchResult({
        name: data.name,
        number: data.number,
        image: data.image,
        registered:data.registered
      })
    }
    if(!data){
      setSearchResult(null)
    }
    setLoading(false);
  }
  

  const goToNotifications = () => {
    navigate("/notifications");
  };
  const openContactHandler = () => {
    navigate("/contacts",{state:{id:'send'}});
  };
  const suggestNameHandler = ()=>{
    navigate('/suggestName',{state:{id:input,request:location.state.id}})
  }
  const clickHandler = (number,name,img)=>{
    navigate('/video',{state:{id:number,name:name,img:img,request:location.state.id}})
  }
  return (
    <div>
      <div className="w-11/12 mx-auto my-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link to="/home">
              <img className="hover:cursor-pointer" src={leftIcon} alt="" />
            </Link>
            <Link to="/home">
              <p className="font-medium text-xl text-[#06283D]">ImageBook</p>
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <img
              onClick={goToNotifications}
              className="hover:cursor-pointer"
              src={notification}
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="">
        <div className="w-11/12 w-fit mx-auto mt-12 flex items-center space-x-3">
        <PhoneInput
            className="border-[2px] border-[#EBF1F4] rounded-[10px] p-[10px] h-12 text-lg"
            defaultCountry="IN"
            placeholder="Enter phone number"
            value={input}
            onChange={setInput}
          />
          <div
            className="w-[44px] h-12 shadow-lg rounded-xl flex btncls items-center justify-center"
            onClick={openContactHandler}
          >
            <img src={person} alt="" />
          </div>
        </div>
        {!input && (
          <div className="flex flex-col items-center justify-center space-y-3 mt-24">
            <img src={search} alt="" />
            <p className="text-[#416C87] text-sm text-center">
              Search people by <br /> number
            </p>
          </div>
        )}
        {loading && <Loading/>}
        {!loading && <>{
          input && <div className=" w-11/12 mx-auto mt-[27px]">
          <p
            style={{ color: "#5E849C" }}
            className="text-sm font-semibold"
          >
            Suggested Results
          </p>
          
        </div>
        }
        
          {(input && searchResult && searchResult.registered==true ) && <div className="mt-[20px]">
            
              <GiveRespectEachContact item={searchResult} clickHandler={clickHandler} />
            </div>}
        {input && input!==userCtx.loggedInUser.number && (!searchResult || searchResult?.registered==false) && isPossiblePhoneNumber(input) && (
            <>
              <div className="w-11/12 flex flex-row justify-between items-center mt-[20px] mx-auto bg-[#F5F8FA] rounded-xl h-[70px] px-[15px]" onClick={suggestNameHandler}>
                  <div className="flex flex-col gap-0.5 ">
                    <p className="text-lg">{input}</p>
                    <p className="text-sm text-[#5E849C]">Unregistered</p>
                  </div>
                  <img src={add}/>
              </div>
            </>
          )}
          {input && input===userCtx.loggedInUser.number && <div className=" w-11/12 mx-auto mt-[27px]"><p
            className="text-sm text-red-500"
          >Seems like you entered your mobile number.</p></div>}</>}
      </div>
    </div>
  );
};

export default GiveRespectSearchPage;
