import axios from "axios";
import { useState } from "react";

export default function LookMissingCars({ setLoading }) {
  const [carNumber, changeCarNumberHandler] = useState("");
  const [error, setError] = useState("");
  const [isDefault, setDefault] = useState(true);
  const [carDetails, setCarDetails] = useState({ carNumber:'',carOwnerName: '', carOwnerNumber:'',isMissing:true,isClaimed:true })
  const changeHandler = (e) => {
    setDefault(true);
    changeCarNumberHandler(e.target.value);
  };
  const findCarsDetails = async () => {
    if (!carNumber) {
      setError("Enter car number");
      return;
    }
    setLoading(true);
    const res = await axios.get(
      `http://localhost:5000/api/cars/lookForMissingCar/${carNumber}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("loggedInUser")}`,
        },
      }
    );
    console.log(res.data);
    const data = res.data;
    if (res.status > 400) {
      console.log(res.ok);
      setError("Data Not Found");
      setLoading(false);
      return;
    }

    setCarDetails({
        carNumber:data.carNumber,
        carOwnerName:data.carOwnerName,
        carOwnerNumber:data.carOwnerNumber,
        isMissing:data.isMissing,
        isClaimed:data.isClaimed
    })
    setLoading(false)
    setDefault(false);
  };
  return (
    <div className="w-[80%] m-auto">
      <p className="font-bold text-lg mb-[20px] ">
        Look for cars by Car Number
      </p>

      <label for="cardetails">Car Details:</label>
      <input
        type="text"
        className="ml-[10px] border-2 rounded-lg focus:outline-none "
        id="cardetails"
        onChange={(e) => changeHandler(e)}
        placeholder="Enter Car Number here"
      ></input>
      <br />
      <button
        style={{ backgroundColor: "rgba(177, 188, 230, 0.25)" }}
        onClick={findCarsDetails}
        className="border-2 rounded-lg p-2 text-[#283a7e]"
      >
        Get Details
      </button>
      {error && <p className="text-red-700">{error}</p>}
      {!isDefault &&
        <div>
            <p>{carDetails.carNumber}</p>
            <p>{carDetails.carOwnerName}</p>
            <p>{carDetails.carOwnerNumber}</p>
            <p>{carDetails.isClaimed === true ? "Claimed":"Not claimed"}</p>
            <p>{carDetails.isMissing === true ? "Found" :"Still Missing"}</p>
        </div>
      }
    </div>
  );
}
