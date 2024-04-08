import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Navigator from "../components/Navigator";
import ShieldIcon from "@mui/icons-material/Shield";
import axios from "axios";
import VideocamIcon from "@mui/icons-material/Videocam";
import UserContext from "../store/userContext";
import EachRespect from "../components/EachRespect";
import editIcon from "../Assets/edit.png";
import noDataFound from "../Assets/noDataFound.png";
import home from "../images/Profile/home.svg";
import film from "../images/Home/film-fill.svg";
import people from "../images/Home/people.svg";
import person from "../images/Profile/person blue.svg";
import plus from "../images/Home/plus.svg";
import tikFill from "../images/Profile/tik fill.svg";
import respect from "../images/Home/respect.svg";
import goodLuck from "../images/Home/goodLuck.svg";
import promise from "../images/Home/promise.svg";
import feedback from "../images/Home/feedback.svg";
import Loading from "../components/Loader/Loading";
import AddContact from "../Assets/addcontact.png";
import tick from "../Assets/tick.png";
import FooterHome from "../components/FooterHome";

const Profile = () => {
  const userCtx = useContext(UserContext);
  const params = useParams();
  const [obj, setObj] = useState({});
  const [type, setType] = useState("given");
  const navigate = useNavigate();
  const [isMyProfile, setIsMyProfile] = useState(false);
  const [notExist, setNotExist] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    getUser();

    if (params.id === userCtx.loggedInUser.number) {
      setIsMyProfile(true);
    }
  }, [params.id, userCtx.loggedInUser.number]);

  const getUser = async () => {
    setLoading(true);
    const response = await axios.get(
      `http://localhost:5000/api/user/getUsers/${params.id}`
    );
    const data = response?.data;
    if (data.length === 0) {
      setNotExist(true);
    }
    if (data[0]?.registered == true) {
      setIsRegistered(true);
    }
    setLoading(false);
    setObj(data[0]);
  };

  const backHandler = () => {
    navigate("/home");
  };

  const openSearchHandler = () => {
    navigate("/giveResectSearch");
  };

  const navigateToDisplay = (route) => {
    navigate("/showProfile", { state: { id: route, obj: obj } });
  };

  const addContactHandler = async () => {
    const data = {
      id: userCtx.loggedInUser.number,
      number: obj?.number,
    };
    await axios.post(`http://localhost:5000/api/user/addToContacts`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("loggedInUser")}`,
      },
    });
    setAdded(true);
  };
  return (
    <>
      {loading && <Loading />}
      {!loading && (
        <>
          {" "}
          <Navigator heading="Profile" backHandler={backHandler} icon="share" />
          {!notExist && (
            <>
              <div className="flex flex-col items-center gap-3 justify-center mt-[40px]">
                <img
                  style={{ width: "75px", height: "75px", borderRadius: "50%" }}
                  src={obj?.image}
                />
                <div>{obj?.name}</div>
                <div className="flex gap-0.5">
                  <p
                    style={{ color: "#5E849C" }}
                    className="text-sm font-semibold"
                  >
                    {obj?.number}
                  </p>
                </div>
              </div>

              {/* Changes made here */}
            </>
          )}
          <FooterHome />
          {/* Footer Ends */}
        </>
      )}
    </>
  );
};

export default Profile;
