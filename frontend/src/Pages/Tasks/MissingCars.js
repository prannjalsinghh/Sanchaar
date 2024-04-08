import Navigator from "../../components/Navigator";
import FooterHome from "../../components/FooterHome";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AddMissingCar from "../../components/Tasks/AddMissingCar";
import LookMissingCars from "../../components/Tasks/LookMissingCars";
import Loading from "../../components/Loader/Loading";
export default function MissingCars() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(0);
  const [loading, setLoading] = useState(false)
  const backHandler = () => {
    navigate(-1);
  };
  
  return (
    <>
      <Navigator heading="Missing Cars" backHandler={backHandler} />
      <div className="w-[91%] m-auto mt-[30px] mb-[30px]">
        <div className="w-[80%] m-auto grid grid-cols-2 justify-center gap-y-4 mb-8 mt-[30px] ">
          <div
            onClick={() => setSelected(0)}
            style={{
              backgroundColor: "rgba(154, 134, 164, 0.25)",
              borderRadius: "16px 0px 0px 16px",
              border: selected === 0 ? "2px solid" : "0",
            }}
            className=" h-[50px] px-2 py-2 text-center relative hover:cursor-pointer text-[#06283D] font-semibold text-xl"
          >
            Add a missing car
          </div>
          <div
            onClick={() => setSelected(1)}
            style={{
              backgroundColor: "rgba(177, 188, 230, 0.25)",
              borderRadius: "0px 16px 16px 0px",
              border: selected === 1 ? "2px solid" : "0",
            }}
            className=" h-[50px] px-2 text-center py-2 relative hover:cursor-pointer text-[#06283D] font-semibold text-xl"
          >
            Look for missing claimed/unclaimed cars
          </div>
        </div>
        
        {selected === 0 && <AddMissingCar setLoading = {setLoading}/>}
        {selected === 1 && <LookMissingCars setLoading = {setLoading}/>}
      </div>
      {loading && <Loading />}
      <FooterHome />
    </>
  );
}
