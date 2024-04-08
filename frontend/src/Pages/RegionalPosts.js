import { useNavigate } from "react-router-dom";
import Navigator from "../components/Navigator";
import FooterHome from "../components/FooterHome";
import { useEffect, useState } from "react";
import axios from "axios";
import EachPost from "../components/EachPost";
import Loading from "../components/Loader/Loading";

export default function RegionalPosts(props){
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading ] = useState(true);
    useEffect(() =>{
        renderFeed();
    },[])

    const renderFeed = async () =>{
        const data = await axios.get(
            "http://localhost:5000/api/posts/showRegionalFeed"
        ,{
            headers: {
              Authorization: `Bearer ${localStorage.getItem("loggedInUser")}`,
            },
        })
        
        setPosts(data.data);
        setLoading(false);
    }
    const backHandler = () =>{
        navigate(-1);
    }
    return(<>
        <Navigator heading = "Regional Cases" backHandler = {backHandler}/>
        {loading && <Loading/>}
        {!loading && <div style={{width: "91%", margin:"auto", paddingTop:"20px"}}>
            {posts?.map((post) => <EachPost post = {post} />)}
        </div>}
        <FooterHome />
    </>)
}