import Navigator from "../components/Navigator";
import SearchIcon from "@mui/icons-material/Search";
import ContactEach from "../components/ContactEach";
import { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import ForNewUser from "../components/ForNewUser";
import GiveRespectEachContact from "../components/GiveRespectEachContact";
import RespectModal from "../components/RespectModal";
import axios from "axios";
import { useContext } from "react";
import UserContext from "../store/userContext";
import { set } from "mongoose";
import Loading from "../components/Loader/Loading";

const ContactsPage = () => {
  
  const location = useLocation();

  const [modal,setModal] = useState(false)
  const [arr,setArr] = useState([]);
  const [searching, setSearching] = useState(false);
  const [name, setName] = useState("");
  const [sentUser,setSentUser ] = useState('')
  const navigate = useNavigate()
  const userCtx = useContext(UserContext);
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    loadData();
  },[userCtx.loggedInUser.number])

    useEffect(()=>{
      setLoading(userCtx.isLoading)
    },[userCtx.isLoading])

  const loadData = async ()=>{
    const res = await axios.get(`http://localhost:5000/api/user/getContacts/${userCtx.loggedInUser.number}`,
    {headers: { Authorization: `Bearer ${localStorage.getItem('loggedInUser')}`}})
    setArr(res.data);
    console.log(res.data)
  }

  const searchNameHandler = (e) => {
    setName(e.target.value);
  };

  const setModalOpen = (user)=>{
    setSentUser({
      name:user.name,
      number:user.number,
      img:user.img
    });
    setModal(true);
  }
  const modalCloseHandler = ()=>{
    setModal(false);
  }

  const backHandler = () => {

    if (searching === true) {
      setSearching(false);
      return;
    }
    navigate(-1);
  }
  


  return (
    <>
      <Navigator heading="Select Contact" backHandler={backHandler} />
      {loading && <Loading/>}
      {!loading && <>
      {!searching && (
        <>
          {" "}
          <div className="flex justify-between w-11/12 mx-auto mt-[40px]">
            <h3 className="text-lg">All Contacts</h3>
            <div onClick={(e) => setSearching(true)}>
              <SearchIcon />
            </div>
          </div>
          <div className=" ">
            <div className="flex flex-row justify-between w-11/12 mx-auto mt-[27px]">
              <p style={{ color: "#5E849C" }} className="text-sm font-semibold">
                Contacts on ImageBook
              </p>
              
            </div>
            <div className="flex flex-col gap-3 mt-[20px]">
              { arr?.map((each) => (
                <ContactEach item={each} />
              ))}
            </div>
          </div>
          
        </>
      )}
       {searching && (
        <div className="flex flex-col">
          <div className="flex justify-center items-center gap-3 mt-[40px] w-11/12 mx-auto">
            <div className="flex items-center gap-2 box-border border-2 rounded-md w-5/6">
              <PersonIcon style={{ color: "#5E849C", fontSize: "30px" }} />
              <input
                className="placeholder-gray-500"
                style={{ outline: "none", height: "48px" }}
                type="text"
                placeholder="Search your contact"
                onChange={searchNameHandler}
              />
            </div>
            <SearchIcon />
          </div>

          {name.length !== 0 && <><div className="flex flex-row justify-between w-11/12 mx-auto mt-[27px]">
            <p style={{ color: "#5E849C" }} className="text-sm font-semibold">
              Contacts on ImageBook
            </p>
            <p style={{ color: "#47B5FF" }} className="text-sm underline">
              View All
            </p>
          </div>
            <div className="flex flex-col gap-3 mt-[20px]">
              { arr
                .filter((obj) => obj.name.includes(name))
                .map((each) => (
                  <ContactEach item={each} />
                ))}
                
            </div>
            </>}
        </div>
      )}
      {/*{modal && <RespectModal name={sentUser.name} number={sentUser.number} img={sentUser.img} closeHandler={modalCloseHandler}/>} */}
      </>}
    </>
  );
};
export default ContactsPage;
