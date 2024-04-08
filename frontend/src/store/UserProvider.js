import axios from "axios";
import { useEffect, useReducer } from "react";
import UserContext from "./userContext";
import { set } from "mongoose";
import { useState } from "react";
import Loading from "../components/Loader/Loading";
const defaultUserCtx = {
    isLoggedIn: false,
    isLoading:true,
    loggedInUser: {
        accountCreationDate: Date.now(),
        name: '',
        number: '',
        image: 'https://i.stack.imgur.com/l60Hf.png',
        state:'',
        region:'',
        image:'',
        posts:[],
        notifications:[],
        dateOfBirth:Date.now(),
        gender:'Male'
    }
}

const userReducer = (state, action) => {

    if (action.type === 'SETLOGIN') {
        return {
            isLoggedIn: true,
            
            loggedInUser: {
                accountCreationDate: action.user.accountCreationDate,
                name: action.user.name,
                number: action.user.number,
                image: action.user.image,
                state:action.user.state,
                region:action.user.region,
                posts:action.user.posts,
                notifications:action.user.notifications,
                dateOfBirth:action.user.dateOfBirth,
                gender:action.user.gender
            },
            isLoading:false,
        }
    }




    // if(action.type==='CHANGE'){
    //     return{

    //     }
    // }
}

const UserProvider = (props) => {
    useEffect(() => {
        getLoggedInUser();
    }, [])
    const [UserState, dispatchUserState] = useReducer(userReducer, defaultUserCtx);
    const getLoggedInUser = async () => {
        if (localStorage.getItem('loggedInUser')) {
            const res = await axios.post(`http://localhost:5000/api/user/loginByToken`,{token:localStorage.getItem('loggedInUser')},
            {headers: { Authorization: `Bearer ${localStorage.getItem('loggedInUser')}` }})
            const data = res?.data;
            console.log(data);
            setLogin(data)
        }
    }
    const setLogin = (user) => {
        dispatchUserState({ type: "SETLOGIN", user: user });
    }   

    const userContext = {
        isLoggedIn: UserState.isLoggedIn,
        isLoading:UserState.isLoading,
        loggedInUser: UserState.loggedInUser,
        setLogin: setLogin,

    }

    return (
        <UserContext.Provider value={userContext}>
            {props.children}
        </UserContext.Provider>
    )
}
export default UserProvider;