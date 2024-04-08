import { useNavigate } from "react-router-dom";
import FooterHome from "../../components/FooterHome";
import Navigator from "../../components/Navigator";

export default function MissingPerson() {
    const navigate = useNavigate();
    const backHandler = () => {
        navigate(-1);
    }
    return(<>
        <Navigator heading = "Missing Person" backHandler={backHandler} />
        <div className="w-[91%] m-auto mt-[30px] mb-[30px]">

        </div>
        <FooterHome />
    </>)
}
