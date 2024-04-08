import styles from "./RespectModal.module.css";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import respect from "../Assets/respect.png";
import goodLuck from "../Assets/goodLuck.png";
import { useNavigate } from "react-router-dom";

const RespectModal = (props) => {
  const [modalAnim, SetModalAnim] = useState(false);
  const [modalValaue, setModalValue] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    SetModalAnim(true);
  }, []);

  const videoNavigateHandler = ()=>{
    navigate('/video',{state:{id:props.number,name:props.name}});
  }

  return (
    <div>
      <div className={styles.backdrop} onClick={props.closeHandler} />
      <div
        className={styles.modal}
        style={{
          bottom: modalAnim && "-320px",
          transform: modalAnim && "translate(0, -320px)",
          transitionDuration: modalAnim && "0.5s",
        }}
      >
        <div className=" w-[90%] mx-auto mt-[20px]">
          <div className="flex justify-between">
            <div className="flex gap-3">
              <img
                style={{ width: "50px", height: "50px", borderRadius: "100px" }}
                src={props.img?props.img:"https://i.stack.imgur.com/l60Hf.png"}
              />
              <div className="flex flex-col gap-1">
                <p>{props.name}</p>
                <p>{props.number}</p>
              </div>
            </div>
            <div onClick={props.closeHandler}>
              <CloseIcon />
            </div>
          </div>
          <p className="font-semibold mt-[20px] ">Purpose</p>
          <div className="flex justify-around mt-[15px]">
            <div
              onClick={(e) => setModalValue("Respect")}
              className="flex flex-col justify-center items-center"
              style={{
                backgroundColor: "#CCEAFF",
                width: "48%",
                borderRadius: "20px",
                height: "100px",
                border: modalValaue === "Respect" ? "solid 2px #47B5FF" : "",
              }}
            >
              <img src={respect} />
              <p className="text-sm">Respect</p>
            </div>
            <div
              className="flex flex-col justify-center items-center"
              onClick={(e) => setModalValue("Good Luck")}
              style={{
                backgroundColor: "#FFEDCC",
                width: "48%",
                borderRadius: "20px",
                height: "100px",
                border:
                  modalValaue === "Good Luck"
                    ? "solid 2px rgb(255,174,27)"
                    : "",
              }}
            >
              <img src={goodLuck} />
              <p className="text-sm">Good Luck</p>
            </div>
          </div>
          <button
            style={{
              backgroundColor: "#1363DF",
              color: "white",
              width: "90%",
              height: "52px",
              borderRadius: "10px",
              marginBottom: "24px",
            }}
            className="absolute bottom-0"
            onClick={videoNavigateHandler}
          >
            Record Respect
          </button>
        </div>
      </div>
    </div>
  );
};
export default RespectModal;
