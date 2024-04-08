import { useNavigate } from "react-router-dom";
import React from "react";
import rightIcon from "../images/num-pad/arrow-right.png";
import { set, useForm } from "react-hook-form";
import axios from "axios";
import UserContext from "../store/userContext";
import { useContext } from "react";
import img from '../images/continuebyname.png';
import Loading from "./Loader/Loading";

const ContinueByName = ({ number }) => {

  const userCtx = useContext(UserContext);
  const [loading,setLoading] = React.useState(false);
  const [error,setError] = React.useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const userName = data.firstName.trim() + " " + data.lastName.trim();
    const state = data.state.trim();
    const region = data.region.trim();
    const user = {
      number: number,
      name: userName,
      state:state,
      region:region
    };
    setLoading(true);
    try{
      await axios.post('http://localhost:5000/api/user/postUsers', user);
    }catch(e){
      setLoading(false);
      setError("Failed to login")
      console.log(e);
    }
    
    try{
      const res = await axios.post(`http://localhost:5000/api/user/loginByNumber`,{number:number});
      const data1 = res.data;
      userCtx.setLogin(data1.user);
      localStorage.setItem('loggedInUser',data1.token)
      setLoading(false);
      navigate("/home");
    }catch(e){
      setLoading(false);
      setError("Failed to login")
      console.log(e);
    }

  };

  return (<>
    {loading && <Loading />}
    {!loading && <div className="flex flex-col justify-center h-screen -mt-10">
      <img className="w-48 mx-auto mb-6" src={img} alt="" />
      <p className="font-semibold text-[#00386D] text-lg ml-8 mb-2">
        Enter Your Name
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className=" mx-6">
        <input
          {...register("firstName")}
          className="w-full border-2 border-[#D3DBE3] rounded-[10px] h-12 pl-4 focus:outline-none mb-2"
          type="text"
          placeholder="First Name"
          name="firstName"
          id=""
          required
        />
        <input
          {...register("lastName")}
          className="w-full border-2 border-[#D3DBE3] rounded-[10px] h-12 pl-4 focus:outline-none mb-4"
          type="text"
          placeholder="Last Name"
          name="lastName"
          id=""
          required
        />
        <input
          {...register("state")}
          className="w-full border-2 border-[#D3DBE3] rounded-[10px] h-12 pl-4 focus:outline-none mb-4"
          type="text"
          placeholder="State"
          name="state"
          id=""
          required
        />
        <input
          {...register("region")}
          className="w-full border-2 border-[#D3DBE3] rounded-[10px] h-12 pl-4 focus:outline-none mb-4"
          type="text"
          placeholder="Region"
          name="region"
          id=""
          required
        />
        {error && <p className='text-red-500 text-sm'>{error}</p> }
        <button
          type="submit"
          className=" flex items-center justify-center space-x-2 bg-[#1363DF] w-full h-[52px] rounded text-white font-semibold text-lg"
        >
          <p>Continue</p>
          <img src={rightIcon} alt="" />
        </button>
      </form>
    </div>}
    </>);
};

export default ContinueByName;
