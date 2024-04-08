import { useNavigate } from "react-router-dom";
import React ,{ useState } from "react";
import Navigator from "../components/Navigator";
import { useRef } from "react";
import axios from "axios";
import Loading from "../components/Loader/Loading";

export default function RegisterCase(props) {
  const [tagsArr, setTagsArr] = useState([]);
  const [loading,setLoading] = React.useState(false);
  const [filters, setFilter] = useState("Missing Children/Person");
  const [content, setContent] = useState("");
  const [error, setError] = React.useState(false);
  const [image, setImage] = React.useState();
  const navigate = useNavigate();
  const tagref = useRef(null);

  const addInput = () => {
    if (tagref.current.value === "") return;
    setTagsArr([...tagsArr, tagref.current.value]);
    tagref.current.value = '';
  };

  const imageSetter = (e) => {
    setImage(e.target.files[0]);
    setError('');
  };

  const imageUploader = async () => {
    if (!image || !filters || !content) {
      setError("All fields are compulsory");
      return;
    }
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "cok0kqhe");
    setLoading(true);
    console.log(image,filters,content);
    await axios
      .post("https://api.cloudinary.com/v1_1/djdqb8feb/image/upload", formData)
      .then(async (response) => {
        if (response.status === 200) {
          let link = response.data.secure_url;

          await axios.post(
            "http://localhost:5000/api/posts/create",
            {
              // postedBy : userCtx.loggedInUser._id,
              // postedState : userCtx.loggedInUser.state,
              content: content,
              url : link,
              filters : filters,
              tags : tagsArr
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("loggedInUser")}`,
              },
            }
          );
          console.log("updated");
          setLoading(false);
          
        }
      });
      navigate('/home')
  };

  const backHandler = () => {
    navigate(-1);
  };

  return (
    <>
      <Navigator heading="Register New Case" backHandler={backHandler} />
      {loading && <Loading/> }
      {!loading && <div className="flex flex-col w-[91%]  m-auto pt-[40px] gap-2">
        <textarea
          rows="8"
          cols="50"
          className="border-2"
          placeholder="Describe new case"
          onChange={(e)=>setContent(e.target.value)}
        ></textarea>

        <select className="border-2 w-[200px]" onChange={(e)=> setFilter(e.target.value)}>
          <option value="Missing Children">Missing Children/Person</option>
          <option value="Un-identified Children Found">
            Un-identified Children Found
          </option>
          <option value="Unidentified Dead Bodies">
            Unidentified Dead Bodies
          </option>
          <option value="Stolen Vehicles">Stolen Vehicles</option>
          <option value="Missing Mobiles">Missing Mobiles</option>
          <option value="Unclaim/Seized Vehicles">
            Unclaim/Seized Vehicles
          </option>
        </select>
        <div className="flex gap-2">
          <input type="text" className="border-2" ref={tagref}></input>
          <button onClick={addInput} className="border-2 w-[100px]">
            Add Tags
          </button>
        </div>
        <div className="flex gap-2">
          {tagsArr.map((tag) => (
            <p>{tag}</p>
          ))}
        </div>
        <input type='file' id='file' placeholder='here' accept='image/png, image/jpg, image/jpeg' onChange={imageSetter}></input>
        {error && <p className="text-red">Error</p>}
        <button className="bg-[#1363DF] text-white rounded p-[10px]" onClick={imageUploader}>
          Create post
        </button>
      </div>}
    </>
  );
}
