import Navigator from "./Navigator";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ContactIcon from "../Assets/smartphone.png";
import { useEffect, useState } from "react";
import DoYouKnowImage from "../Assets/doYouKnowImage.png";
import yes from "../Assets/yes.png";
import no from "../Assets/no.png";
import RespectModal from "./RespectModal";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const SuggestName = () => {
  const [name, setName] = useState("");
  const [modal, setModal] = useState(false);
  const [yesNo,setYesNo] = useState('');
  const navigate = useNavigate(); 
  const location = useLocation();


  useEffect(()=>{
    if(!location.state.id || !location.state.request){
      navigate('/home');
    }
  },[])

  const backHandler = () => {
    navigate(-1);
  };

  const createUserHandler = async ()=>{
    const obj = {name:name,number:location.state.id}
    const res = await axios.post('http://localhost:5000/api/user/createNonExistingUser',obj,
    {headers: { Authorization: `Bearer ${localStorage.getItem('loggedInUser')}`}});
    
    navigate('/newCreatedUserProfile',{state:{id:location.state.id,request:location.state.request}});
  }
  return (
    <>
      <Navigator heading="Suggest Name" backHandler={backHandler} />
      <div className="flex items-center gap-[12px] box-border border-2 rounded-md w-5/6 m-auto mt-[30px] pl-[10px]">
        <PersonAddIcon style={{ color: "#5E849C", fontSize: "24px" }} />
        <input
          className="placeholder-gray-500"
          style={{ outline: "none", height: "48px" }}
          type="text"
          placeholder="First Name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      
        <div className="flex flex-col gap-8 text-center justify-center items-center mt-[150px]">
          <div className="flex flex-col items-center">
          <img src={ContactIcon} />
          <p style={{ width: "85%", margin: "auto" }}>
            Please suggest correct first name only else your respect wouldn't
            get Counted
          </p>
          </div>
        </div>
        <button
        onClick={createUserHandler}
        disabled={!name}
        style={{
                position:"absolute",
                bottom:"0",
                backgroundColor: "#1363DF",
                color: "white",
                width: "90%",
                height: "52px",
                borderRadius: "10px",
                margin: "24px",
                opacity: name?"1":"0.5"
              }}>Suggest Name</button>
     
      
    </>
  );
};
export default SuggestName;
