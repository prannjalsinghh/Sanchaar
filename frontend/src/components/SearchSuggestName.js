import Navigator from "./Navigator";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ContactIcon from "../Assets/smartphone.png";
import { useState } from "react";
import DoYouKnowImage from "../Assets/doYouKnowImage.png";
import yes from "../Assets/yes.png";
import no from "../Assets/no.png";
import RespectModal from "./RespectModal";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "./Loader/Loading";

const SearchSuggestName = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const unlockProfileHandler = async () => {
    let obj = { name: name, number: location.state.id }
    setLoading(true);
    await axios.post(`http://localhost:5000/api/user/createNonExistingUser`, obj,
    {headers: { Authorization: `Bearer ${localStorage.getItem('loggedInUser')}`}})
    setLoading(false);
    navigate(`/${location.state.id}`)

  }

  const backHandler = () => {
    navigate(-1);
  };


  return (
    <>
      <Navigator heading="Suggest Name" backHandler={backHandler} />
      {loading && <Loading />}
      {!loading && <>
      <div className="flex items-center gap-[10px] pl-[10px] box-border border-2 rounded-md w-5/6 mx-auto mt-[30px]">
        <PersonAddIcon style={{ color: "#5E849C", fontSize: "24px" }} />
        <input
          className="placeholder-gray-500 w-[220px]"
          style={{ outline: "none", height: "48px" }}
          type="text"
          placeholder="First Name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      {name.length === 0 && (
        <div className="flex flex-col gap-8 text-center justify-center items-center h-[70vh]">
          <div className="flex flex-col  items-center">
            <img src={ContactIcon} />
            <p style={{ width: "85%", margin: "auto" }}>
              Please suggest correct first name only else your respect wouldn't
              get Counted
            </p>
          </div>
        </div>
      )}
      {name.length !== 0 && (
        <>
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <img src={DoYouKnowImage} className="" />

            <button

              onClick={unlockProfileHandler}
              style={{
                backgroundColor: "#1363DF",
                color: "white",
                width: "90%",
                height: "52px",
                borderRadius: "10px",
                margin: "24px",
              }}
              className="absolute bottom-0"
            >
              Unlock Now
            </button>
          </div>

        </>
      )}
      </>}
    </>
  );
}
export default SearchSuggestName;