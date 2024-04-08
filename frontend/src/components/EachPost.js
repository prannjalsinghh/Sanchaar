import { useEffect } from "react";

const EachPost = ({post})=>{
    useEffect(()=>{

    })
    return(
        <div>
            <div className="flex flex-row justify-between  my-[10px]">
                <div className="flex flex-row gap-[10px]">
                    {/* <img className="h-[50px] w-[50px]" src = {post.statesrc}/> */}
                    <div>
                        <div className="text-black text-xl">{post.region}({post.postedState})<span className="text-gray-400 text-sm">@{post.postedByName}</span></div>
                        <div className="text-sm text-gray-400">{post.postCreationDate}</div>
                    </div>
                </div>
                <button className="border-2 h-[30px]" >Request Evidence and files</button>
                
            </div>
            <div className="my-[10px]">{post.content}</div>
            <div>
                <img className="h-[400px] mx-auto" src = {post.url}/>
            </div>
        </div>
    )
}
export default EachPost;