import React,{useState,useEffect, useRef} from 'react';
import axios from 'axios';
import Navbar from "../containers/Navbar"
import User from "./User"
import {profiledURL} from "../urls"
import { headers,expiry } from '../actions/auth';

const Profile =()=>{
    const [state,setState]=useState({list_gender:['MALE','FEMALE','OTHER']})
    const[show,setShow]=useState({date:false,month:false,year:false})
    const [loading,setLoading]=useState(false)
    const [formData,setformData]=useState({phone:'',date:1,month:1,year:2000,username:'',name:'',email:'',image:null})
    useEffect(() => {
        axios.get(profiledURL,headers)
        .then(res=>{
          const data = res.data
          setLoading(true)
          setformData({ username:data.username,name:data.name,email:data.email,
            phone:data.phone,shop_name:data.shop_name,gender:data.gender,
            avatar:data.avatar,date:data.date_of_birth!=null?new Date(data.date_of_birth).getDate():1,month:data.date_of_birth!=null?new Date(data.date_of_birth).getMonth()+1:1,year:data.date_of_birth!=null?new Date(data.date_of_birth).getFullYear():2020});
        })   
    },[])
    
    if(expiry<=0 || localStorage.token=='null'){
        window.location.href="/buyer/login"
    }
    
    const  previewFile=(e)=>{
        [].forEach.call(e.target.files, function(file) {
            setformData({...formData,file:file,avatar:(window.URL || window.webkitURL).createObjectURL(file)})
        })
    }
   
    const setdate=(e,name,value)=>{
        setformData({...formData,[name]:value})
        if(new Date(value,formData.month,formData.date)=="Invalid Date"){  
            setState({...state,valid_date:true}) 
        }
        else{
            setState({...state,valid_date:false}) 
        }
        setShow({...show,[name]:false}) 
        window.onclick=(event)=>{
            let parent=event.target.closest('.dropdown--has-selected')
            if(!event.target.contains(e.target) && !parent){
                setShow({...show,[name]:false})
            }
        }
    }
    const saveinfo=()=>{
        let form=new FormData()
        
        Object.keys(formData).map(item=>{
            form.append(item,formData[item])
        })
        form.append('date_of_birth',`${formData.year}-${('0'+formData.month).slice(-2)}-${('0'+formData.date).slice(-2)}`)
        axios.post(profiledURL,form,headers)
        .then(res=>{
        })
    }
    const inputref=useRef();
    const year_now=new Date().getFullYear()
    const list_year=Array(year_now).fill().map((_, i) => i).filter(item=>item>year_now-100)
    return(
        <div id="main">
            <div className="_193wCc">
                <div className="item-col top container-wrapper">
                    <Navbar
                        image={formData.avatar}
                    />
                </div>
                <div className="containers _1QwuCJ">
                    <User
                    username={formData.username}
                    image={formData.avatar}
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
                                            <div className="_3BlbUs">
                                                <div className="_1iNZU3">
                                                    <div className="_2PfA-y">
                                                        <label>Tên đăng nhập</label>
                                                    </div>
                                                    <div className="_2_JugQ">
                                                        <div className="input-with-validator-wrapper">
                                                            <div className="input-with-validator">
                                                                <input onChange={(e)=>setformData({...formData,username:e.target.value})} type="text" placeholder="" name="username" maxLength="255" value={formData.username}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="_1iNZU3">
                                                    <div className="_1LvCQN">Tên Đăng nhập chỉ có thể thay đổi một lần.</div>
                                                </div>
                                            </div>
                                            <div className="_3BlbUs">
                                                <div className="_1iNZU3">
                                                    <div className="_2PfA-y">
                                                        <label>Tên</label>
                                                    </div>
                                                    <div className="_2_JugQ">
                                                        <div className="input-with-validator-wrapper">
                                                            <div className="input-with-validator">
                                                                <input type="text" placeholder='' onChange={(e)=>setformData({...formData,name:e.target.value})} maxLength="255" value={formData.name}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="_3BlbUs">
                                                <div className="_1iNZU3">
                                                    <div className="_2PfA-y">
                                                        <label>Email</label>
                                                    </div>
                                                    <div className="_2_JugQ">
                                                        <div className="_2bdFDW">
                                                            <div className="_3S9myJ">{formData.email!=null?`${formData.email.substr(0,2)}******@${formData.email.split('@').slice(-1)}`:''}</div>
                                                            <button className="_2CLMxo">{formData.email!=null?'Thay đổi':'Thêm'}</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="_3BlbUs">
                                                <div className="_1iNZU3">
                                                    <div className="_2PfA-y">
                                                        <label>Số điện thoại</label>
                                                    </div>
                                                    <div className="_2_JugQ">
                                                        <div className="_2bdFDW">
                                                            <div className="_3S9myJ">{formData.phone!="None"?`********${formData.phone.substr(formData.phone.length-2,2)}`:''}</div>
                                                            <button className="_2CLMxo">{formData.phone!="None"?'Thay đổi':'Thêm'}</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="_3BlbUs">
                                                <div className="_1iNZU3">
                                                    <div className="_2PfA-y">
                                                        <label>Tên Shop</label>
                                                    </div>
                                                    <div className="_2_JugQ">
                                                        <div className="input-with-validator-wrapper">
                                                            <div className="input-with-validator">
                                                                <input type="text" onChange={(e)=>setformData({...formData,shop_name:e.target.value})} placeholder='' maxLength="255" value={formData.shop_name}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="_3BlbUs">
                                                <div className="_1iNZU3">
                                                    <div className="_2PfA-y">
                                                        <label>Giới tính</label>
                                                    </div>
                                                    <div className="_2_JugQ"> 
                                                        <div className="stardust-radio-group item-center">{
                                                            state.list_gender.map(gender=>
                                                                <div key={gender} onClick={()=>setformData({...formData,gender:gender})} className="stardust-radio">
                                                                    <label className="check_input">
                                                                        <input type="radio" name="gender" checked={gender==formData.gender?true:false} className="radio-input" value={gender}/>
                                                                        <div className="stardust-radio__content">{gender}</div>
                                                                        <span className="checkmark"></span>
                                                                    </label>  
                                                                </div>   
                                                            )
                                                        }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="_3BlbUs">
                                                <div className="_1iNZU3">
                                                    <div className="_2PfA-y">
                                                        <label>Ngày sinh</label>
                                                    </div>
                                                    <div className="_2_JugQ">
                                                        <div className="_2w5iZe">
                                                            <div className="dropdown dropdown--has-selected">
                                                                <div onClick={()=>setShow({...show,date:!show.date,month:false,year:false})} className="dropdown__entry dropdown__entry--selected">
                                                                    <span>{formData.date}</span>
                                                                    <svg enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0" className="svg-icon icon-arrow-down"><g><path d="m11 2.5c0 .1 0 .2-.1.3l-5 6c-.1.1-.3.2-.4.2s-.3-.1-.4-.2l-5-6c-.2-.2-.1-.5.1-.7s.5-.1.7.1l4.6 5.5 4.6-5.5c.2-.2.5-.2.7-.1.1.1.2.3.2.4z"></path></g></svg>
                                                                </div>
                                                                {show.date?
                                                                <div className="popover popover--default">
                                                                    <ul  className='dropdown__options'>
                                                                        {Array(31).fill().map((_, i)=>
                                                                            <li key={i} onClick={(e)=>setdate(e,'date',i+1)} className="dropdown__entry dropdown__entry--optional">{i+1}</li>
                                                                        )}
                                                                    </ul>
                                                                </div>:''}
                                                            </div>
                                                            <div className="dropdown dropdown--has-selected">
                                                                <div onClick={()=>setShow({...show,month:!show.month,date:false,year:false})} className="dropdown__entry dropdown__entry--selected">
                                                                    <span>Tháng {formData.month}</span>
                                                                    <svg enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0" className="svg-icon icon-arrow-down"><g><path d="m11 2.5c0 .1 0 .2-.1.3l-5 6c-.1.1-.3.2-.4.2s-.3-.1-.4-.2l-5-6c-.2-.2-.1-.5.1-.7s.5-.1.7.1l4.6 5.5 4.6-5.5c.2-.2.5-.2.7-.1.1.1.2.3.2.4z"></path></g></svg>
                                                                </div>
                                                                {show.month?<div className="popover popover--default">
                                                                    <ul  className='dropdown__options'>
                                                                        {Array(12).fill().map((_, i)=>
                                                                            <li key={i} onClick={(e)=>setdate(e,'month',i+1)} className="dropdown__entry dropdown__entry--optional">{i+1}</li>
                                                                        )}
                                                                    </ul>
                                                                </div>:''}
                                                            </div>
                                                            <div className="dropdown dropdown--has-selected">
                                                                <div onClick={()=>setShow({...show,year:!show.year,date:false,month:false})} className="dropdown__entry dropdown__entry--selected">
                                                                    <span>{formData.year}</span>
                                                                    <svg enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0" className="svg-icon icon-arrow-down"><g><path d="m11 2.5c0 .1 0 .2-.1.3l-5 6c-.1.1-.3.2-.4.2s-.3-.1-.4-.2l-5-6c-.2-.2-.1-.5.1-.7s.5-.1.7.1l4.6 5.5 4.6-5.5c.2-.2.5-.2.7-.1.1.1.2.3.2.4z"></path></g></svg>
                                                                </div>
                                                                {show.year?<div className="popover popover--default">
                                                                    <ul  className='dropdown__options'>
                                                                        {list_year.reverse().map(i=>
                                                                            <li key={i} onClick={(e)=>setdate(e,'year',i)} className="dropdown__entry dropdown__entry--optional">{i}</li>
                                                                        )}
                                                                    </ul>
                                                                </div>:''}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {new Date(formData.year,formData.month,formData.date)=="Invalid Date"?<div className="_1iNZU3">
                                                    <div className="_3qXkYh">Ngày không hợp lệ, vui lòng chỉnh ngày chính xác</div>
                                                </div>:''}
                                            </div>
                                            <div className="_31PFen">
                                                <button onClick={()=>saveinfo()} type="button" className="btn btn-solid-primary btn-m btn--inline" aria-disabled="false">Lưu</button>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="_1aIEbS">
                                        <div className="X1SONv">
                                            <div className="_1FzaUZ">
                                                <div className="TgSfgo" style={{backgroundImage:`url(${formData.avatar})`}}></div>
                                            </div>
                                            <input ref={inputref} onChange={(e)=>previewFile(e)} className="_2xS5eV" type="file" accept=".jpg,.jpeg,.png"/>
                                            <button onClick={()=>inputref.current.click()} type="button" className="btn-light btn-m item-center btn--inline">Chọn ảnh</button>
                                            <div className="_3Jd4Zu">
                                                <div className="_3UgHT6">Dụng lượng file tối đa 1 MB</div>
                                                <div className="_3UgHT6">Định dạng:.JPEG, .PNG</div>
                                            </div>
                                        </div>
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

export default Profile