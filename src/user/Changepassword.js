import React,{useState,useEffect, useRef} from 'react';
import axios from 'axios';
import Navbar from "../containers/Navbar"
import User from "./User"
import { useNavigate } from 'react-router';
import { headers } from '../actions/auth';
import {changepassURL, profiledURL} from "../urls"

const Changepassword =()=>{
    const [loading,setLoading]=useState(false)
    const [state,setState]=useState({})
    const navigate=useNavigate()
    const [formData,setformData]=useState({username:'',email:'',avatar:null,old_password:'',new_password:'',new_password2:''})
    useEffect(() => {
        axios.get(profiledURL,headers)
        .then(res=>{
          const data = res.data
          setLoading(true)
          setformData({ ...formData,username:data.username,name:data.name,email:data.email,avatar:data.avatar}) 
            if(data.phone==null){
                navigate(`user/account/phone?next=${window.location}`)
            }
        })
    },[])
    
    const {old_password,new_password}=formData
    const saveinfo=(e)=>{
        e.preventDefault();
        const data=JSON.stringify({ old_password,new_password});
        let form= new FormData()
        form.append('new_password',formData.new_password)
        form.append('old_password',formData.old_password)
        try {
            const res = axios.put(changepassURL, form, headers);
            console.log(res.data)
        } catch (err) {
            setState({...state,invalid:true})
        }
    }
    const regex = new RegExp("(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}")
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
                    avatar={formData.avatar}
                    />
                    <div className="_3D9BVC">
                        <div className="h4QDlo" role="main">
                            <div className="_2YiVnW">
                                <div className="_2w2H6X">
                                    <h1 className="_3iiDCN">Hồ sơ của tôi</h1>
                                    <div className="TQG40c">Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
                                </div>
                                {loading?<div className="goiz2O">
                                    <div className="pJout2">
                                        <form>
                                            <div className="kJiu0u">
                                                <div className="ZsX2q-">
                                                    <h1 className="_2xVij2">Change Password</h1>
                                                    <div className="_2PlnUp">For account security, please do not share your password with others</div>
                                                </div>
                                                <div className="_2gERne">
                                                    <div className="eSOrcn">
                                                        <div className="_3m9JxV">
                                                            <div className="_1p2sNF">
                                                                <div className="J7OZkm">
                                                                    <label className="_3W1PU2" for="password">Mật khẩu hiện tại</label>
                                                                </div>
                                                                <div className="_38MRMp">
                                                                    <input onChange={(e)=>setformData({...formData,old_password:e.target.value})} id="password" className="_2R9TsD _3_Hq9P _3s990d" type="password" autocomplete="off" name="old_password" value={formData.old_password}/>
                                                                </div>
                                                                <button className="_1fdENx">Quên mật khẩu?</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="eSOrcn">
                                                        <div className="_3m9JxV">
                                                            <div className="_1p2sNF">
                                                                <div className="J7OZkm">
                                                                    <label className="_3W1PU2" for="newPassword">Mật khẩu mới</label>
                                                                </div>
                                                                <div className="_38MRMp">
                                                                    <input onChange={(e)=>setformData({...formData,new_password:e.target.value})} id="newPassword" className="_2R9TsD _3_Hq9P" type="password" autocomplete="off" name="new_password1" value={formData.new_password}/>
                                                                </div>
                                                            </div>
                                                            {formData.new_password !='' && formData.new_password.length<6?<>
                                                            <div className="J7OZkm"></div>
                                                            <div className="_38MRMp _3_FqN4">Mật khẩu phải gồm ít nhất 6 ký tự</div></>:''}
                                                            {!regex.test(formData.new_password)?<>
                                                            <div className="J7OZkm"></div>
                                                            <div className="_38MRMp _3_FqN4">Mật khẩu phải dài 8-16 ký tự, chứa ít nhất một ký tự viết hoa và một ký tự viết thường và chỉ bao gồm các chữ cái, số hoặc dấu câu thông thường</div>
                                                            </>:''}
                                                        </div>
                                                    </div>
                                                    <div className="eSOrcn">
                                                        <div className="_3m9JxV">
                                                            <div className="_1p2sNF">
                                                                <div className="J7OZkm">
                                                                    <label className="_3W1PU2" for="newPasswordRepeat">Xác nhận mật khẩu</label>
                                                                </div>
                                                                <div className="_38MRMp">
                                                                    <input onChange={(e)=>setformData({...formData,new_password2:e.target.value})} id="newPasswordRepeat" className="_2R9TsD _3_Hq9P _3s990d" type="password" autocomplete="off" name="new_password2" value={formData.new_password2}/>
                                                                </div>
                                                            </div>
                                                            {formData.new_password!=formData.new_password2?<>
                                                            <div className="J7OZkm"></div>
                                                            <div className="_38MRMp _3_FqN4">Mật khẩu và Mật khẩu xác nhận không giống nhau</div></>:''}
                                                        </div>
                                                    </div>
                                                    <div className="eSOrcn">
                                                        <div className="_1DS7fG"></div> 
                                                        <div className="_1IcdS-">
                                                            <button onClick={(e)=>saveinfo(e)} type="button" className={`btn-solid-primary btn btn--m btn--inline btn`} aria-disabled="true">Xác nhận</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>:''}
                            </div>
                        </div>
                    </div>
                </div>                                   
            </div>
        </div>
    )
}

export default Changepassword