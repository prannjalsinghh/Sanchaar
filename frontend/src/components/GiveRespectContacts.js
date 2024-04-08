import Navigator from "../components/Navigator";
import SearchIcon from "@mui/icons-material/Search";
import ContactEach from "../components/ContactEach";
import { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import { Navigate, useNavigate } from "react-router-dom";
import GiveRespectEachContact from "./GiveRespectEachContact";

const GiveRespectContacts = () => {
  const arr = [
    {
      name: "Aarush Mishra",
      number: "+9189237348934",
      img: "https://media.istockphoto.com/photos/portrait-of-handsome-latino-african-man-picture-id1007763808?k=20&m=1007763808&s=612x612&w=0&h=q4qlV-99EK1VHePL1-Xon4gpdpK7kz3631XK4Hgr1ls=",
    },
    {
      name: "Bhageerathi Patel",
      number: "+9189237348934",
      img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80",
    },
  ];
  const unreg = [
    {
      name: "Aarush Mishra",
      number: "+9189237348934",
      img: "https://media.istockphoto.com/photos/portrait-of-handsome-latino-african-man-picture-id1007763808?k=20&m=1007763808&s=612x612&w=0&h=q4qlV-99EK1VHePL1-Xon4gpdpK7kz3631XK4Hgr1ls=",
    },
    {
      name: "Bhageerathi Patel",
      number: "+9189237348934",
      img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80",
    },
  ];
  const [modal,setModal] = useState(false)
  const [searching, setSearching] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate()

  const searchNameHandler = (e) => {
    setName(e.target.value);
  };

  const clickHandler = (number,name,image)=>{
    navigate(`/profile/${number}`);
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
              <p style={{ color: "#47B5FF" }} className="text-sm underline">
                View All
              </p>
            </div>
            <div className="flex flex-col gap-3 mt-[20px]">
              {arr.map((each) => (
                <GiveRespectEachContact item={each} clickHandler={clickHandler} />
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
              {arr
                .filter((obj) => obj.name.includes(name))
                .map((each) => (
                  <GiveRespectEachContact item={each} />
                ))}
            </div>
           </>}
        </div>
      )}
      
    </>
  );
};
export default GiveRespectContacts;
