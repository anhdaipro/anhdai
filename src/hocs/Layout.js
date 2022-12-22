import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import axios from "axios"
import { checkAuthenticated, expiry,headers} from '../actions/auth';
import Message from "../containers/Chat" 
import dayjs from "dayjs"
import { updateuseronlineURL,refreshtokenURL } from '../urls';
const Layout = ({children,checkAuthenticated,user }) => {
    useEffect(() => {
        if(localStorage.token && expiry()>0){
        checkAuthenticated()
        }
    }, []);

    
         
    useEffect(() => {
        const beforeUnLoad = async (e) => {
            e.preventDefault();
            
            
            const res= await axios.post(updateuseronlineURL,JSON.stringify({online:false}),headers())
            console.log(res.dataá)
        }
        window.addEventListener('beforeunload', beforeUnLoad);
        return () => {
          window.removeEventListener('beforeunload', beforeUnLoad);
        };
    }, [user]);
    useEffect(()=>{
        const interval = setInterval(() => {
            if(user){
                axios.post(`${refreshtokenURL}`,JSON.stringify({refresh:localStorage.getItem("refresh")}),headers())
                .then(res=>{
                    const data=res.data
                    localStorage.setItem('token',data.access);
                    const expiri=dayjs().add(24,'hour')
                    localStorage.setItem("expirationDate",expiri);
                })
            }
        },2000)
        return () => clearInterval(interval);
    },[user])
    return (
        <>  
            {children}
            <div id="modal"></div>
            <Message
            />

           
            
        </>  
    );
};

export default connect(null,{checkAuthenticated})(Layout);
