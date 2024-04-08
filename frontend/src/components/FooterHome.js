import React, { useContext } from "react";
import home from "../images/Profile/home.svg";
import film from "../images/Home/film-fill.svg";
import people from "../images/Home/people.svg";
import person from "../images/Home/profile.svg";
import { useNavigate } from "react-router-dom";
import { borderRadius } from "@mui/system";
import UserContext from "../store/userContext";
import plus from '../images/Home/plus.svg';

const FooterHome = () => {
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();

  const navigateProfileHandler = ()=>{
    navigate(`/${userCtx.loggedInUser.number}`)
  }

  return (
    <div className="w-full bg-[#F7F7F7] fixed bottom-0 z-50">
      <div className="flex items-center justify-between w-9/12 mx-auto py-4">
        <img src={home} className="btncls" alt="" onClick={() => navigate('/home')}/>
        <i class="fa fa-globe" aria-hidden="true" onClick={()=>navigate('/regionalPosts')}></i>
        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            width: "4.5rem",
            height: "4.5rem",
            marginTop:"-50px",
            borderRadius:"9999px"
          }}
        >
          <div className="bg-[#1363DF] rounded-full w-16 h-16 m-[5px] shadow " style={{marginTop: "-15px",
    marginLeft: "-15px"}}>
            <div
              className="flex items-center justify-center"
              onClick={()=>navigate('/registerCase')}
            >
              <p style={{color:"white",fontSize:"40px", cursor:"pointer"}}>+</p>
            </div>
          </div>
        </div>
        <i class="fas fa-tasks" onClick={()=> navigate('/tasks')}></i>
        <img src={person} className="btncls" onClick={navigateProfileHandler} alt="" />
      </div>
    </div>
  );
};

export default FooterHome;
