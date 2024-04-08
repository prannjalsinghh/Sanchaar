import { useNavigate } from "react-router-dom";
import Navigator from "../components/Navigator";
import FooterHome from "../components/FooterHome";

export default function Tasks(props){
    const navigate = useNavigate();
    const backHandler = () =>{
        navigate(-1);
    }
    const navigateToDisplay = (page) => {
      navigate(page)
    }
    return(<>
        <Navigator heading = "Task Options" backHandler = {backHandler}/>
        <div className="w-[91%] m-auto grid grid-cols-2 justify-center gap-x-2 gap-y-4 mb-8 mt-[30px]">
                  <div
                    onClick={(e) => navigateToDisplay("dnaSearch")}
                    style={{ backgroundColor: "rgba(154, 134, 164, 0.25)" }}
                    className=" h-[115px] rounded-2xl px-3 py-2 relative hover:cursor-pointer"
                  >
                    <div className="flex items-center justify-start space-x-1 ">
                      {/* <img src={respect} alt="" /> */}
                      <p className="text-[#06283D] font-semibold text-xl">
                        DNA Search
                      </p>
                    </div>
                    <p className="text-xs text-[#1B2328] absolute bottom-4">
                      Search a person's details by DNA details.
                    </p>
                  </div>
                  <div
                    onClick={(e) => navigateToDisplay("aadharSearch")}
                    style={{ backgroundColor: "rgba(177, 188, 230, 0.25)" }}
                    className=" h-[115px] rounded-2xl px-3 py-2 relative hover:cursor-pointer"
                  >
                    <div className="flex items-center justify-start space-x-1 ">
                      {/* <img src={goodLuck} alt="" /> */}
                      <p className="text-[#06283D] font-semibold text-xl">
                        Aadhar Search
                      </p>
                    </div>
                    <p className="text-xs text-[#1B2328] absolute bottom-4">
                    Search a person's details by Aadhar details.
                    </p>
                  </div>
                  <div
                    onClick={(e) => navigateToDisplay("missingCars")}
                    style={{ backgroundColor: "rgba(183, 229, 221, 0.25)" }}
                    className=" h-[115px] rounded-2xl px-3 py-2 relative hover:cursor-pointer"
                  >
                    <div className="flex items-center justify-start space-x-1 ">
                      {/* <img src={promise} alt="" /> */}
                      <p className="text-[#06283D] font-semibold text-xl">
                        Missing Cars
                      </p>
                    </div>
                    <p className="text-xs text-[#1B2328] absolute bottom-4">
                      Search car details by Car Number.
                    </p>
                  </div>
                </div>
                <FooterHome />
    </>)
}