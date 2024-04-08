const GiveRespectEachContact = (props) => {
  return (
    <div
      style={{ backgroundColor: "#F5F8FA" }}
      className="flex gap-2 w-11/12 mx-auto p-[12px] btncls rounded-xl"
      onClick={(e)=>props.clickHandler(props.item.number,props.item.name,props.item.image)}
    >
      {props.type !== "unreg" && (
        <img
          style={{
            borderRadius: "200px",
            width: "60px",
            height: "60px",
            marginRight: "12px",
          }}
          src={props.item.image}
        />
      )}
      {props.type === "unreg" && (
        <img
          style={{
            borderRadius: "200px",
            width: "60px",
            height: "60px",
            marginRight: "12px",
          }}
          src="https://i.stack.imgur.com/l60Hf.png"
        />
      )}
      <div>
        <p className="text-lg">{props.item.name}</p>
        <div className="flex gap-2 items-center">
          {props.type === "unreg" && (
            <p
              style={{ backgroundColor: "#E8E8E8" }}
              className="text-sm font-bold p-[4px] rounded-md"
            >
              Unregistered
            </p>
          )}
          <p style={{ color: "#5E849C" }} className="text-sm ">
            {props.item.number}
          </p>
        </div>
      </div>
    </div>
  );
};
export default GiveRespectEachContact;
