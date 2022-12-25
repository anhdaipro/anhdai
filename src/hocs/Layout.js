import React, { useEffect } from 'react';
import { connect ,useDispatch,useSelector} from 'react-redux';
import axios from "axios"
import { checkAuthenticated, expiry,headers} from '../actions/auth';
import Message from "../containers/Chat" 
import dayjs from "dayjs"
import { updateuseronlineURL,refreshtokenURL } from '../urls';
const timerefresh=5*60*1000
const Layout = ({children,checkAuthenticated}) => {
    useEffect(() => {
        if(localStorage.token && expiry()>0){
        checkAuthenticated()
        }
    }, []);

    const user=useSelector(state=>state.user) 
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
    useEffect(() => {
        if(expiry()<timerefresh && expiry()>=0 && localStorage.token){
            axios.post(`${refreshtokenURL}`,JSON.stringify({refresh:localStorage.getItem("refresh")}),headers())
            .then(res=>{
                const data=res.data
                localStorage.setItem('token',data.access);
                const expiri=dayjs().add(24,'hour')
                localStorage.setItem("expirationDate",expiri);
            })
        }
    }, [])
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
        },timerefresh)
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
