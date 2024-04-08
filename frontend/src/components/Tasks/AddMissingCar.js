import axios from "axios";
import { useState } from "react";

export default function AddMissingCar({setLoading}) {
  const [carNumber, setCar] = useState("");
  const [error, setError] = useState("");
  const [ownerNumber, setNumber] = useState("");
  const [ownerName, setName] = useState("");
  const [message, setMessage] = useState('');
    // const [carDetails, setCarDetails] = useState({  })
  const changeCarHandler = (e) => {
    setCar(e.target.value);
  };
  const changeNumberHandler = (e) => {
    setNumber(e.target.value);
  };
  const changeNameHandler = (e) => {
    setName(e.target.value);
  };
  const onSubmitHandler = async() =>{
    if(!carNumber || !ownerName || !ownerNumber){
        setError('Enter all the fields');
        return;
    }
    setLoading(true);
    const currCar = {
        carNumber,
        carOwnerName : ownerName,
        carOwnerNumber : ownerNumber
    }
    try{
        const res = await axios.post(`http://localhost:5000/api/cars/createNewMisingCar`,currCar,
        {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("loggedInUser")}`,
        },
        })
        if(res.status > 400){
            setError('Could not post data');
            setLoading(false);
            return;
        }
        setMessage('Created');
        setLoading(false);
        setCar('');
        setNumber('');
        setName('');  
    }catch(err){
        setError('Could not post data');
        setLoading(false);
    }  
  }
  return (
    <div className="w-[80%] m-auto">
      <label for="carno">Car Details:</label>
      <input
        type="text"
        className="mb-[10px] ml-[25px] w-[50%] border-2 rounded-lg focus:outline-none "
        id="carno"
        onChange={(e) => changeCarHandler(e)}
        value={carNumber}
        placeholder="Enter Car Number here"
      ></input>
      <br />
      <label for="carownername">Owner Name:</label>
      <input
        type="text"
        className="mb-[10px] w-[50%] ml-[10px] border-2 rounded-lg focus:outline-none "
        id="carownername"
        onChange={(e) => changeNameHandler(e)}
        value={ownerName}
        placeholder="Enter Car Owner Name here"
      ></input>
      <br />
      <label for="carownernumber">Owner Number:</label>
      <input
        type="text"
        className="mb-[10px] w-[50%] ml-[10px] border-2 rounded-lg focus:outline-none "
        id="carownernumber"
        value={ownerNumber}
        onChange={(e) => changeNumberHandler(e)}
        placeholder="Enter Car Owner Number here"
      ></input>
      <br />
      <button
      onClick={onSubmitHandler}
        style={{ backgroundColor: "rgba(177, 188, 230, 0.25)" }}
        className="border-2 rounded-lg p-2 text-[#283a7e]"
      >
        Add Data
      </button>
      {error && <p className="text-red-700">{error}</p>}
      {message && <p className="text-green-500">{message}</p>}
    </div>
  );
}
