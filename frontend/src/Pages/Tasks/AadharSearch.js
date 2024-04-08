import axios from "axios";
import FooterHome from "../../components/FooterHome";
import Navigator from "../../components/Navigator";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loading from "../../components/Loader/Loading";
export default function AadharSearch() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [aadharNumber, setAadharNumber] = useState("");
  const [isDefault, setDefault] = useState(true);
  const [person, setPerson] = useState({
    number: "",
    name: "",
    address: "",
    fathersName: "",
    isIndian: null,
  });
  const changeHandler = (e) => {
    setPerson({
      number: "",
      name: "",
      address: "",
      fathersName: "",
      isIndian: null,
    });
    setDefault(true);
    setError("");
    setAadharNumber(e.target.value);
  };
  const findPersonsDetails = async () => {
    setDefault(true);
    setError(false);
    setLoading(true);
    if (!aadharNumber) {
      setError("Enter Aadhar Number");
      setLoading(false);
      return;
    }
    try {
      const res = await axios.get(
        `http://localhost:5000/api/aadhar/findAadhar/${aadharNumber}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("loggedInUser")}`,
          },
        }
      );
      console.log(res.data)
      const data = res.data;
      if(res.status > 400){
        console.log(res.ok)
        setError("Data Not Found");
        setLoading(false);
        return;
      }
      setPerson({
        number: data.aadhar_number,
        name: data.name,
        address: data.address,
        fathersName: data.fathers_name,
        isIndian: data.indian,
      });
      setDefault(false);
      setLoading(false);
    } catch (err) {
      setError("Data Not Found");
      setLoading(false);
    }
  };
  const backHandler = () => {
    navigate(-1);
  };

  return (
    <>
      <Navigator heading="Aadhar Search" backHandler={backHandler} />
      <div className="w-[91%] m-auto mt-[30px] mb-[30px]">
        <p className="font-bold text-lg mb-[20px] ">
          Search Person's details by Aadhar Number
        </p>

        <label for="aadharno">Aadhar Number:</label>
        <input
          type="text"
          className="ml-[10px] border-2 rounded-lg focus:outline-none "
          id="aadharno"
          onChange={(e) => changeHandler(e)}
          placeholder="Enter Aadhar Card Number"
        ></input>
        <br />
        <button
          style={{ backgroundColor: "rgba(177, 188, 230, 0.25)" }}
          onClick={findPersonsDetails}
          className="border-2 rounded-lg p-2 text-[#283a7e]"
        >
          Get Details
        </button>
        {error && <p className="text-red-700">{error}</p>}
        {!isDefault && person && (
          <div className="">
            <p>{person.name}</p>
            <p>{person.address}</p>
            <p>{person.fathersName}</p>
            <p>{person.isIndian ? "Indian" : "NRI"}</p>
          </div>
        )}
      </div>

      {loading && <Loading />}

      <FooterHome />
    </>
  );
}
