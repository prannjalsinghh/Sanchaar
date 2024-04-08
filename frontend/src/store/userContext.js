import React from "react";
const UserContext = React.createContext({
    isLoggedIn: false,
    isLoading:true,
    loggedInUser: {
        registered:false,
        accountCreationDate:Date.now(),
        number: "",
        name:"",
        image:"",
        dateOfBirth:Date.now(),
        verified:false,
        trustScore:0,
        location: {},
        gender:"",
        givenRespects:[],
        recievedRespects:[],
        notifications:[],
        contacts:[],
    },
    setLogin: (user)=>{}
})

export default UserContext;