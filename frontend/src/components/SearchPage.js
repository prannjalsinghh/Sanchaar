import React, { useState ,useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import leftIcon from "../images/Notifications/Left Icon.png";
import loveIcon from "../images/Home/Right Icon.png";
import notification from "../images/Home/Right Icon (1).png";
import person from "../images/Notifications/Vector.png";
import search from "../images/Notifications/search.png";
import ContactEach from "./ContactEach";
import ForNewUser from "./ForNewUser";
import PhoneInput from "react-phone-number-input";
import Search from "@mui/icons-material/Search";
import axios from "axios";
import { useContext } from "react";
import UserContext from "../store/userContext";


const SearchPage = () => {
  const userCtx = useContext(UserContext);

  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [searchResult,setSearchResult] =useState({}); 

  useEffect(()=>{
    onInputChange();
  },[input]);

  const onInputChange = async ()=>{
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
  }
  

  const goToNotifications = () => {
    navigate("/notifications");
  };
  const openContactHandler = () => {
    navigate("/contacts",{state:{id:'send'}});
  };

  const setModalOpen = ()=>{
    navigate('/profile',{state:{id:''}})
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
        <div className="w-11/12 mx-auto mt-12 flex justify-center items-center space-x-3">
          <div className="border-[2px] border-[#EBF1F4] rounded-[10px] p-[10px] h-12 text-lg flex ">
            <Search style={{ color: "#5E849C" }} />
            <input type="tel" style={{ outline: "none" }} className="placeholder-[#5E849C] w-[200px]" placeholder="Type Here" onChange={(e) => setInput(e.target.value)} />
          </div>
          <div
            className="w-[44px] h-12 shadow-lg rounded-xl flex items-center justify-center"
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
        {input?.length !== 0 &&
          searchResult && (
            <>
              <div className="flex flex-row justify-between w-11/12 mx-auto mt-[27px]">
                <p
                  style={{ color: "#5E849C" }}
                  className="text-sm font-semibold"
                >
                  Contacts on ImageBook
                </p>
                <p style={{ color: "#47B5FF" }} className="text-sm underline">
                  View All
                </p>
              </div>
               <div className="flex flex-col gap-3 mt-[20px]">
                <ContactEach item={searchResult} />
              </div>
            </>
          )}
        
      </div>

    </div>
  );
};

export default SearchPage;
