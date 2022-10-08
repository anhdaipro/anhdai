import React,{useState,useEffect, useRef} from 'react';
import axios from 'axios';
import Navbar from "../containers/Navbar"
import {isVietnamesePhoneNumber} from "../constants"
import User from "./User"
import { Navigate, useNavigate } from 'react-router';
import { headers } from '../actions/auth';
import {otpURL, profiledURL,} from "../urls"

const Phoneuser =()=>{
    const navigate=useNavigate()
    const [loading,setLoading]=useState(false)
    const[show,setShow]=useState(false);
    const [data,setData]=useState(null);
    const [error,setError]=useState({})
    const [state,setState]=useState({time:60,error:true,showpass:false,showrepass:false,style:{backgroundImage: `url(&quot;https://cf.shopee.vn/file/5569eb9dc7e09e2dbed5315b8f2ea8ba&quot;)`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center'}})
    const [formData,setformData]=useState({verify:false,phone:'',pin:'',username:'',name:'',email:''})
    useEffect(() => {
        axios.get(profiledURL,headers)
        .then(res=>{
          const data = res.data
          setLoading(true)
          setformData(prev=>{return{...prev,username:data.username,name:data.name,email:data.email,avatar:data.avatar}}) 
        })  
    },[])
    
    const sendotp=(e)=>{
        e.preventDefault();
        setShow(true)
        let time=60
        setState({...state,time:time})
        axios.post(otpURL,JSON.stringify({phone:`+84 ${(formData.phone).slice(-9)}`}))
        .then(res=>{
            setformData({...formData,id:res.data.id})
            const countDown = setInterval(() => {
                time--
                console.log(state)
                setState({...state,time:time})
                if (time <= 0) {
                    clearInterval(countDown)
                    time=0
                    setState({...state,time:0})
                }
            }, 1000);
        })
    }

    const saveinfo=()=>{
        axios.post(profiledURL,JSON.stringify({phone:formData.phone}),headers)
        .then(res=>{
            navigate('user/account/password')
        })
    }
    const setphone=(e)=>{
        e.preventDefault();
        setformData({...formData,phone:`${e.target.value}`}) 
        if( !isVietnamesePhoneNumber(e.target.value)){
            setError({...error,phone:true})    
            setformData({...formData,phone:`${e.target.value}`})  
        }
        else{
            setError({...error,phone:false})  
            if(formData.id==undefined){
                window.onclick=(event)=>{
                    if(!event.target.contains(e.target)){
                    setformData({...formData,phone:`+84 ${(e.target.value).slice(-9)}`}) 
                    }
                }
            }   
        }  
    }

    return(
        <div id="main">
            <div className="_193wCc">
                <div className="item-col top container-wrapper">
                    <Navbar
                    />
                </div>
                <div className="containers _1QwuCJ">
                    <User
                    username={formData.username}
                    image={formData.avatar}
                    />
                    <div className="_3D9BVC">
                        <div className="h4QDlo" role="main">
                        <div className="_2zrdzA">
                            <div className="ncjd0G">
                                <h1 className="_2m1XYT">Nhập số điện thoại</h1>
                                <div className="_2NeP3A">Để bảo mật được tốt hơn, vui lòng làm theo những bước dưới đây để nhập số điện thoại.</div>
                                </div>
                                <div className="_1FJjJR">
                                    <form>
                                        <div className="item-center _3Dzoss">
                                            <div className="_3Ki-q-">
                                                <label className="_15kWsQ" for="phone-number">Số điện thoại mới</label>
                                            </div>
                                            <div className="_27CWkz">
                                                <input onClick={e=>setphone(e)} className="_2UnglX _74QI4v" id="phone-number" type="tel" placeholder="Nhập số điện thoại của bạn" autocomplete="tel" value=""/>
                                            </div>
                                        </div>
                                        <div className="item-center _3Dzoss">
                                            <div className="_3Ki-q-">
                                                <label className="_15kWsQ" for="otp">Mã xác minh</label>
                                            </div>
                                            <div className="_27CWkz">
                                                <div className="d-flex _3hI1UC">
                                                    <div className="_33fyJV jz72G0">
                                                        <input className="_3o3qNZ jz72G0" onChange={e=>setformData({...formData,pin:e.target.value})} id="otp" type="text" placeholder="Mã xác minh" autocomplete="off" value=""/>
                                                    </div>
                                                    <button onClick={()=>sendotp()} className="OK6Cf4 _1Q85Vy" disabled={isVietnamesePhoneNumber(formData.phone)?false:true}>Gửi Mã xác minh</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="item-center _3Dzoss">
                                            <div className="_27CWkz">
                                                <button onClick={()=>saveinfo()} type="button" className={`btn btn-solid-primary btn--m btn--inline ${formData.verify?'':'disable'} _2i9kda`} aria-disabled="true">Xác nhận</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>                                   
            </div>
        </div>
    )
}

export default Phoneuser