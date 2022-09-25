import React, { useState ,useEffect} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { reset_password,reset_password_confirm } from '../actions/auth';
import axios from 'axios';
import {isVietnamesePhoneNumber,regExp,validatEemail,validatePassword} from "../constants"
import {otpURL,verifyotpURL,} from "../urls"
const ResetPassword = ({match,reset_password,reset_password_confirm}) => {
    const [requestSent, setRequestSent] = useState(false);
    
    const[show,setShow]=useState(false);
    const [error,setError]=useState({})
    const [formData, setFormData] = useState({
        email: '',
        phone:'',
        reset:true,
        pin:'',
        verify_email:false,
        password:'',
        verify_phone:false,
        verify_pin:false
    });
    let navigate = useNavigate();
    const { email,new_password } = formData;
    const [state,setState]=useState({time:60,error:true,showpass:false,showrepass:false,style:{backgroundImage: `url(&quot;https://cf.shopee.vn/file/5569eb9dc7e09e2dbed5315b8f2ea8ba&quot;)`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center'}})
    const setrepass = (e) => {
        e.preventDefault();
        setRequestSent(true);
        setShow(true)
        
        if(validatEemail(formData.email)){
            reset_password(email)
            setFormData({...formData,verify_email:true})
        }
        else{  
            sendotp(e)
        }
        
    };
   
    const verifypin=(e)=>{
        e.preventDefault();
        e.stopPropagation();
        let form=new FormData()
        form.append('id',formData.id)
        form.append('pin',formData.pin)
        form.append('reset',formData.reset)
        form.append('phone',`+84 ${(formData.phone).slice(-9)}`)
        axios.post(verifyotpURL,form)
        .then(res=>{
            setFormData({...formData,verify:res.data.verify,token:res.data.token,uidb64:res.data.uidb64})
            setState({...state,error_pin:res.data.verify?false:true})
        })
    }

    const setpassword=(e)=>{
        e.preventDefault();
        reset_password_confirm(formData.uidb64,formData.token, formData.password);
        setRequestSent(true);
        setTimeout(() => {
            navigate("/buyer/login");
        }, 1500);
    }
    const sendotp=(e)=>{
        e.preventDefault();
        let form=new FormData()
        form.append('phone',`+84 ${(formData.phone).slice(-9)}`)
        form.append('reset',formData.reset)
        let time=60
        setState({...state,time:time})
        axios.post(otpURL,form)
        .then(res=>{
            setShow(true)
            setFormData({...formData,id:res.data.id})
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

    const onChange = e => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const setuser=(e)=>{
        e.stopPropagation()
            setFormData({...formData,email:e.target.value,phone:e.target.value})
            if(isVietnamesePhoneNumber(e.target.value) || validatEemail(e.target.value)){
                setError({...error,phone:false,email:false})
            }
            else{
                if(isVietnamesePhoneNumber(e.target.value)){
                    setError({...error,phone:true,email:false})
                }
                setError({...error,email:true,phone:false})   
            }   
    }
    
    window.onclick=(event)=>{
        if(isVietnamesePhoneNumber(formData.phone)){
            setFormData(prev=>{return{...formData,phone:`+84 ${(formData.phone).slice(-9)}`}})
        }
    }
    const showpass=(e,name,value)=>{
        e.preventDefault();
        setState({...state,[name]:!value})
    }
   
    return(
       <div className="_1229NB">
           <nav className="_10Vl49">
               <div className="_1ilxso">
                   <div className="_1wjIrC">
                       <a className="_33_X2D" href="/">
                           <svg className="svg-icon _3XB6zw _3d2_4f icon-shopee-logo" xmlns="http://www.w3.org/2000/svg" width="343.93360595703126px" height="122px" viewBox="78.03319702148437 14 343.93360595703126 122" style={{background: 'rgba(0, 0, 0, 0)'}} preserveAspectRatio="xMidYMid"><defs><filter id="editing-metal-beveled"><feGaussianBlur stdDeviation="4" in="SourceAlpha" result="blur"/><feSpecularLighting surfaceScale="5" specularConstant="0.8" specularExponent="7.5" lighting-color="#ffffff" in="blur" result="specular"><fePointLight x="-250" y="-50" z="300"/></feSpecularLighting><feComposite operator="in" in="specular" in2="SourceAlpha" result="comp"/><feComposite in="SourceGraphic" in2="comp" operator="arithmetic" k1="0" k2="1" k3="1" k4="0"/></filter></defs><g filter="url(#editing-metal-beveled)"><g transform="translate(133.06147575378418, 99)"><path d="M29.18 1.28L29.18 1.28L29.18 1.28Q20.99 1.28 20.22-10.37L20.22-10.37L9.22-10.37L9.22-10.37Q7.94-7.42 7.04-4.86L7.04-4.86L5.38 0L-3.58 0L16.58-42.24L30.34-42.24L33.02-11.14L33.02-11.14Q33.66-4.42 36.22-2.43L36.22-2.43L36.22-2.43Q34.37 1.28 29.18 1.28ZM14.72-23.17L11.20-15.04L20.03-15.04L19.26-31.49L19.26-33.22L14.72-23.17ZM67.01 1.28L67.01 1.28L67.01 1.28Q59.26 1.28 59.26-4.74L59.26-4.74L59.26-4.74Q59.33-6.40 59.84-9.22L59.84-9.22L60.99-15.10L60.99-15.10Q62.72-23.42 62.72-25.28L62.72-25.28L62.72-25.28Q62.72-28.99 60.54-28.99L60.54-28.99L60.54-28.99Q56.90-28.99 54.98-19.46L54.98-19.46L51.20 0L38.34 1.28L44.99-32.70L55.49-33.92L54.46-27.65L54.46-27.65Q57.47-33.92 66.69-33.92L66.69-33.92L66.69-33.92Q71.17-33.92 73.06-32.03L73.06-32.03L73.06-32.03Q74.94-30.14 74.94-25.92L74.94-25.92L74.94-25.92Q74.94-21.95 72.90-12.67L72.90-12.67L72.90-12.67Q71.94-8.51 71.94-6.94L71.94-6.94L71.94-6.94Q71.94-5.38 72.80-4.48L72.80-4.48L72.80-4.48Q73.66-3.58 74.94-3.46L74.94-3.46L74.94-3.46Q74.30-1.28 72.10 0L72.10 0L72.10 0Q69.89 1.28 67.01 1.28ZM112.26-7.10L112.26-7.10L112.26-7.10Q112.26-4.29 115.14-3.46L115.14-3.46L115.14-3.46Q114.43-1.09 111.68 0.19L111.68 0.19L111.68 0.19Q109.38 1.28 106.85 1.28L106.85 1.28L106.85 1.28Q104.32 1.28 103.01 0.61L103.01 0.61L103.01 0.61Q101.70-0.06 100.99-1.15L100.99-1.15L100.99-1.15Q99.84-2.82 99.84-5.95L99.84-5.95L99.84-5.95Q99.84-7.81 100.86-12.93L100.86-12.93L101.76-17.79L101.76-17.79Q102.85-23.36 102.85-25.41L102.85-25.41L102.85-25.41Q102.85-28.99 100.86-28.99L100.86-28.99L100.86-28.99Q98.37-28.99 96.77-25.34L96.77-25.34L96.77-25.34Q96.13-23.94 95.68-21.82L95.68-21.82L91.33 0L78.46 1.28L87.49-44.80L100.35-46.08L99.84-43.52L99.84-43.52Q98.05-33.66 96.51-30.34L96.51-30.34L96.51-30.34Q100.10-33.92 106.69-33.92L106.69-33.92L106.69-33.92Q113.66-33.92 114.94-29.31L114.94-29.31L114.94-29.31Q115.39-27.84 115.39-26.56L115.39-26.56L115.39-26.56Q115.39-25.28 115.30-24.29L115.30-24.29L115.30-24.29Q115.20-23.30 114.88-21.50L114.88-21.50L114.05-16.90L112.58-9.66L112.58-9.66Q112.26-8.19 112.26-7.10ZM153.66-33.92L153.66-33.92L153.66-33.92Q155.97-33.92 157.76-33.41L157.76-33.41L157.76-33.41Q157.82-33.66 157.95-34.37L157.95-34.37L158.27-36.35L158.27-36.35Q158.53-37.63 158.91-39.74L158.91-39.74L159.94-44.80L172.67-46.08L165.57-8.96L165.57-8.96Q165.50-8.58 165.50-7.94L165.50-7.94L165.50-6.91L165.50-6.91Q165.50-5.50 166.21-4.45L166.21-4.45L166.21-4.45Q166.91-3.39 168.06-3.39L168.06-3.39L168.06-3.39Q166.78-0.38 162.88 0.90L162.88 0.90L162.88 0.90Q161.54 1.28 159.65 1.28L159.65 1.28L159.65 1.28Q157.76 1.28 156.03 0.29L156.03 0.29L156.03 0.29Q154.30-0.70 153.79-2.37L153.79-2.37L153.79-2.37Q152.77-0.70 150.72 0.29L150.72 0.29L150.72 0.29Q148.67 1.28 145.70 1.28L145.70 1.28L145.70 1.28Q142.72 1.28 140.26 0.51L140.26 0.51L140.26 0.51Q137.79-0.26 136.26-1.92L136.26-1.92L136.26-1.92Q133.44-5.18 133.44-12.61L133.44-12.61L133.44-12.61Q133.44-22.21 139.07-28.03L139.07-28.03L139.07-28.03Q144.70-33.92 153.66-33.92ZM153.22-30.08L153.22-30.08L153.22-30.08Q150.85-30.08 149.57-27.52L149.57-27.52L149.57-27.52Q148.29-24.96 146.98-18.62L146.98-18.62L146.98-18.62Q145.66-12.29 145.66-6.59L145.66-6.59L145.66-6.59Q145.66-2.69 147.97-2.69L147.97-2.69L147.97-2.69Q150.02-2.69 151.46-4.74L151.46-4.74L151.46-4.74Q152.90-6.78 153.47-10.18L153.47-10.18L156.93-28.93L156.93-28.93Q155.58-30.08 153.22-30.08ZM176.29-1.92L176.29-1.92L176.29-1.92Q174.78-3.58 174.11-6.21L174.11-6.21L174.11-6.21Q173.44-8.83 173.44-13.12L173.44-13.12L173.44-13.12Q173.44-17.41 174.91-21.31L174.91-21.31L174.91-21.31Q176.38-25.22 179.07-28.03L179.07-28.03L179.07-28.03Q184.58-33.92 193.66-33.92L193.66-33.92L193.66-33.92Q196.93-33.92 199.30-32.83L199.30-32.83L210.24-33.92L205.50-8.96L205.50-8.96Q205.31-8.19 205.31-6.78L205.31-6.78L205.31-6.78Q205.31-5.38 206.18-4.48L206.18-4.48L206.18-4.48Q207.04-3.58 208.32-3.46L208.32-3.46L208.32-3.46Q207.68-1.28 205.34 0L205.34 0L205.34 0Q203.01 1.28 200.38 1.28L200.38 1.28L200.38 1.28Q197.76 1.28 196 0.29L196 0.29L196 0.29Q194.24-0.70 193.73-2.37L193.73-2.37L193.73-2.37Q192.70-0.77 190.53 0.26L190.53 0.26L190.53 0.26Q188.35 1.28 185.44 1.28L185.44 1.28L185.44 1.28Q182.53 1.28 180.16 0.51L180.16 0.51L180.16 0.51Q177.79-0.26 176.29-1.92ZM189.79-27.90L189.79-27.90L189.79-27.90Q189.06-26.75 188.42-24.80L188.42-24.80L188.42-24.80Q187.78-22.85 186.72-17.63L186.72-17.63L186.72-17.63Q185.66-12.42 185.66-8.70L185.66-8.70L185.66-8.70Q185.66-4.99 186.24-3.90L186.24-3.90L186.24-3.90Q186.82-2.82 187.84-2.82L187.84-2.82L187.84-2.82Q189.89-2.82 191.39-4.77L191.39-4.77L191.39-4.77Q192.90-6.72 193.47-10.18L193.47-10.18L196.86-28.93L196.86-28.93Q195.52-30.08 193.95-30.08L193.95-30.08L193.95-30.08Q192.38-30.08 191.46-29.57L191.46-29.57L191.46-29.57Q190.53-29.06 189.79-27.90ZM229.06-3.52L229.06-3.52L229.06-3.52Q227.07 1.28 220.74 1.28L220.74 1.28L220.74 1.28Q217.47 1.28 215.42-0.96L215.42-0.96L215.42-0.96Q213.70-2.94 213.70-4.93L213.70-4.93L213.70-4.93Q213.70-10.11 216.06-20.22L216.06-20.22L218.43-32.64L231.42-33.92L227.52-13.70L227.52-13.70Q226.43-8.96 226.43-7.30L226.43-7.30L226.43-7.30Q226.43-3.65 229.06-3.52ZM219.58-41.54L219.58-41.54L219.58-41.54Q219.58-44.03 221.66-45.38L221.66-45.38L221.66-45.38Q223.74-46.72 226.75-46.72L226.75-46.72L226.75-46.72Q229.76-46.72 231.58-45.38L231.58-45.38L231.58-45.38Q233.41-44.03 233.41-41.54L233.41-41.54L233.41-41.54Q233.41-39.04 231.39-37.76L231.39-37.76L231.39-37.76Q229.38-36.48 226.37-36.48L226.37-36.48L226.37-36.48Q223.36-36.48 221.47-37.76L221.47-37.76L221.47-37.76Q219.58-39.04 219.58-41.54Z" fill="#ffffff"/></g></g>
                            </svg>
                           
                        </a>
                        <div className="_2oP3Vy">Đăng ký</div>
                    </div>
                    <Link to="https://help.shopee.vn/vn/s" target="_blank" rel="noopener noreferrer" className="_3pclFS">Bạn cần giúp đỡ?</Link>
                </div>
            </nav>
            <div style={show?null:{backgroundColor: 'rgb(238, 77, 45)'}}>
                <div className={`_2XRSuf ${show?'':'_2tK8Te'}`} style={show?null:state.style}>
                    <form>
                        <div className="_1yq_ea _34gSQ-">
                            <div className="Xqnqjs">
                                <div className="_3qVJYR">
                                    <div className="_6naxFx">
                                        <svg onClick={()=>navigate('/buyer/login')} viewBox="0 0 22 17" className="yGpYhu"><g stroke="none" strokeWidth="1" fillRule="evenodd" transform="translate(-3, -6)"><path d="M5.78416545,15.2727801 L12.9866648,21.7122915 C13.286114,22.0067577 13.286114,22.4841029 12.9866648,22.7785691 C12.6864297,23.0738103 12.200709,23.0738103 11.9004739,22.7785691 L3.29347136,15.0837018 C3.27067864,15.0651039 3.23845445,15.072853 3.21723364,15.0519304 C3.06240034,14.899273 2.99480814,14.7001208 3.00030983,14.5001937 C2.99480814,14.3002667 3.06240034,14.1003396 3.21723364,13.9476821 C3.23845445,13.9275344 3.2714646,13.9345086 3.29425732,13.9166857 L11.9004739,6.22026848 C12.200709,5.92657717 12.6864297,5.92657717 12.9866648,6.22026848 C13.286114,6.51628453 13.286114,6.99362977 12.9866648,7.288096 L5.78416545,13.7276073 L24.2140442,13.7276073 C24.6478918,13.7276073 25,14.0739926 25,14.5001937 C25,14.9263948 24.6478918,15.2727801 24.2140442,15.2727801 L5.78416545,15.2727801 Z"></path></g></svg>
                                    </div>
                                    <div className="_3p_roN _36wKwh">
                                        <div className="ZWZ4ab">Đặt lại mật khẩu</div>
                                    </div>
                                </div>
                            </div>
                            <div className="_3e4zDA _2kpMlA">
                                {!requestSent?
                                <div className="h4yPIu">
                                    <div className="_3mizNj">
                                        <input onChange={(e)=>setuser(e)} className="yReWDs" type="text" placeholder="Email/Số Điện thoại" autocomplete="off" name="emailOrPhone" maxlength="128" value={formData.phone!=''?formData.phone:formData.email}/>
                                    </div>
                                    <div className="_2RHkvG mb-1">{error.phone!=undefined && error.phone?'Số điện thoại không hợp lệ':error.email !=undefined && error.email?'Email không hợp lệ':''}</div>
                                </div>:<>
                                    {formData.verify_email?
                                    <>
                                    <div className="_3f_d49"><svg viewBox="0 0 77 50" className="_39cto-"><path stroke="none" d="M59.4 0H6.6C2.96 0 0 2.983 0 6.667v36.667C0 47.017 2.953 50 6.6 50h42.826c.7-.008 1.653-.354 1.653-1.497 0-1.156-.814-1.482-1.504-1.482h-.15v-.023H6.6c-1.823 0-3.568-1.822-3.568-3.664V6.667c0-1.842 1.745-3.623 3.568-3.623h52.8c1.824 0 3.6 1.78 3.6 3.623V18c0 .828.538 1.468 1.505 1.468S66 18.828 66 18v-.604-10.73C66 2.983 63.047 0 59.4 0zm-.64 5.76c.374.713.35 1.337-.324 1.733L33.84 21.53c-.423.248-1.575.923-3.124-.004L7.465 7.493c-.672-.396-.52-.896-.146-1.6s.753-1.094 1.426-.698L32.065 19.4 57.202 5.186c.672-.396 1.183-.14 1.556.574zm14.335 26.156l.277.078c.34.092.5.148.45.168 1.862.8 3.178 2.735 3.178 5v7.47c0 2.967-2.28 5.38-5.08 5.38H57.08c-2.8 0-5.08-2.413-5.08-5.38V37.15c0-2.538 1.67-4.665 3.905-5.23v-1.807C55.905 25.087 59.76 21 64.5 21c3.52 0 6.63 2.234 7.944 5.635l.02.05.006.016a9.55 9.55 0 0 1 .625 3.415v1.8zM70.48 28.17a1.28 1.28 0 0 1-.028-.081c-.83-2.754-3.223-4.604-5.954-4.604-3.447 0-6.25 2.974-6.25 6.63v1.655h12.505v-1.655c0-.677-.096-1.33-.275-1.946h.001zm4.18 16.45h-.002c0 1.596-1.227 2.892-2.737 2.892H57.08c-1.507 0-2.737-1.3-2.737-2.893v-7.47c0-1.597 1.227-2.893 2.738-2.893h14.84c1.508 0 2.737 1.3 2.737 2.893v7.47z" fill-opacity=".87" fillRule="evenodd"></path><rect stroke="none" x="63" y="38" width="3" height="6" viewBox="0 0 3 6" rx="1.5" fill-opacity=".87"></rect></svg></div>
                                    <div className="_2rSmEY"><div>Mã xác minh đã được gửi đến địa chỉ email <span className="_25142T">{formData.email}</span>.</div><div>Vui lòng xác minh.</div></div>
                                    </>
                                    :
                                    <>
                                    {state.error_pin!=undefined&&state.error_pin?
                                    <div className="_7Ao-BQ disryx umTGIP">
                                        <div className="o5DLud">
                                            <svg viewBox="0 0 16 16" className="_2-4Lck"><path fill="none" stroke="#FF424F" d="M8 15A7 7 0 108 1a7 7 0 000 14z" clipRule="evenodd"></path><rect stroke="none" width="7" height="1.5" x="6.061" y="5" fill="#FF424F" rx=".75" transform="rotate(45 6.06 5)"></rect><rect stroke="none" width="7" height="1.5" fill="#FF424F" rx=".75" transform="scale(-1 1) rotate(45 -11.01 -9.51)"></rect></svg>
                                        </div>
                                        <div>
                                            <div className="_3mi2mp">Mã xác minh không hợp lệ</div>
                                        </div>
                                    </div>:''}
                                    
                                    {formData.verify?
                                    <>
                                    <div className="_2-ssch">Tạo mật khẩu mới cho</div>
                                    <div className="_1fxVSd">{`+84 ${(formData.phone).slice(-9)}`}</div>
                                    <div className="_8VljFf">
                                        <div className="_3mizNj">
                                            <input required onChange={e => onChange(e)} value={formData.password} className="yReWDs" type={state.showpass?'text':'password'} placeholder="Mật khẩu" autoComplete="current-password" name="password" maxLength="16"/>
                                            <button onClick={(e)=>showpass(e,'showpass',state.showpass)} className="_1mrJbr" >
                                                {!state.showpass?
                                                <svg fill="none" viewBox="0 0 20 10" className="_2nnXgl"><path stroke="none" fill="#000" fill-opacity=".54" d="M19.834 1.15a.768.768 0 00-.142-1c-.322-.25-.75-.178-1 .143-.035.036-3.997 4.712-8.709 4.712-4.569 0-8.71-4.712-8.745-4.748a.724.724 0 00-1-.071.724.724 0 00-.07 1c.07.106.927 1.07 2.283 2.141L.631 5.219a.69.69 0 00.036 1c.071.142.25.213.428.213a.705.705 0 00.5-.214l1.963-2.034A13.91 13.91 0 006.806 5.86l-.75 2.535a.714.714 0 00.5.892h.214a.688.688 0 00.679-.535l.75-2.535a9.758 9.758 0 001.784.179c.607 0 1.213-.072 1.785-.179l.75 2.499c.07.321.392.535.677.535.072 0 .143 0 .179-.035a.714.714 0 00.5-.893l-.75-2.498a13.914 13.914 0 003.248-1.678L18.3 6.147a.705.705 0 00.5.214.705.705 0 00.499-.214.723.723 0 00.036-1l-1.82-1.891c1.463-1.071 2.32-2.106 2.32-2.106z"></path></svg>:
                                                <svg fill="none" viewBox="0 0 20 12" className="t5jqkM"><path stroke="none" fill="#000" fill-opacity=".54" fillRule="evenodd" d="M19.975 5.823V5.81 5.8l-.002-.008v-.011a.078.078 0 01-.002-.011v-.002a.791.791 0 00-.208-.43 13.829 13.829 0 00-1.595-1.64c-1.013-.918-2.123-1.736-3.312-2.368-.89-.474-1.832-.867-2.811-1.093l-.057-.014a2.405 2.405 0 01-.086-.02L11.884.2l-.018-.003A9.049 9.049 0 0010.089 0H9.89a9.094 9.094 0 00-1.78.197L8.094.2l-.016.003-.021.005a1.844 1.844 0 01-.075.017l-.054.012c-.976.226-1.92.619-2.806 1.09-1.189.635-2.3 1.45-3.31 2.371a13.828 13.828 0 00-1.595 1.64.792.792 0 00-.208.43v.002c-.002.007-.002.015-.002.022l-.002.01V5.824l-.002.014a.109.109 0 000 .013L0 5.871a.206.206 0 00.001.055c0 .01 0 .018.002.027 0 .005 0 .009.003.013l.001.011v.007l.002.01.001.013v.002a.8.8 0 00.208.429c.054.067.11.132.165.197a13.9 13.9 0 001.31 1.331c1.043.966 2.194 1.822 3.428 2.48.974.52 2.013.942 3.09 1.154a.947.947 0 01.08.016h.003a8.864 8.864 0 001.596.16h.2a8.836 8.836 0 001.585-.158l.006-.001a.015.015 0 01.005-.001h.005l.076-.016c1.079-.212 2.118-.632 3.095-1.153 1.235-.66 2.386-1.515 3.43-2.48a14.133 14.133 0 001.474-1.531.792.792 0 00.208-.43v-.002c.003-.006.003-.015.003-.022v-.01l.002-.008c0-.004 0-.009.002-.013l.001-.012.001-.015.001-.019.002-.019a.07.07 0 01-.01-.036c0-.009 0-.018-.002-.027zm-6.362.888a3.823 3.823 0 01-1.436 2.12l-.01-.006a3.683 3.683 0 01-2.178.721 3.67 3.67 0 01-2.177-.721l-.009.006a3.823 3.823 0 01-1.437-2.12l.014-.01a3.881 3.881 0 01-.127-.974c0-2.105 1.673-3.814 3.738-3.816 2.065.002 3.739 1.711 3.739 3.816 0 .338-.047.662-.128.975l.011.009zM8.145 5.678a1.84 1.84 0 113.679 0 1.84 1.84 0 01-3.679 0z" clipRule="evenodd"></path></svg>
                                                }
                                            </button>
                                        </div>
                                    </div>
                                    <div className={`_3ZGVRW ${formData.password==null?'_2VbYfm':formData.password.search(/[a-z]/) < 0?'_1ilZVp':'_32YsrV'}`}>
                                        <span className="_1cH_X5">Ít nhất một kí tự viết thường.</span>
                                        {formData.password==null?'':formData.password.search(/[a-z]/) >= 0?<svg fill="none" viewBox="0 0 16 16" className="_1svebZ"><path fill="none" stroke="#6C0" d="M8 15A7 7 0 108 1a7 7 0 000 14z" clipRule="evenodd"></path><path stroke="none" fill="#6C0" fillRule="evenodd" d="M11.621 6.406l-3.98 4.059c-.266.266-.719.244-1.012-.049-.293-.293-.314-.746-.048-1.012l3.98-4.059c.266-.266.719-.245 1.012.048.293.293.314.747.048 1.013z" clipRule="evenodd"></path><path stroke="none" fill="#6C0" fillRule="evenodd" d="M3.803 7.997l2.81 2.532c.267.267.72.245 1.013-.048.293-.293.315-.746.048-1.012l-2.81-2.532c-.267-.267-.72-.245-1.013.048-.293.293-.314.746-.048 1.012z" clipRule="evenodd"></path></svg>:<svg viewBox="0 0 16 16" className="_1svebZ"><path fill="none" stroke="#FF424F" d="M8 15A7 7 0 108 1a7 7 0 000 14z" clipRule="evenodd"></path><rect stroke="none" width="7" height="1.5" x="6.061" y="5" fill="#FF424F" rx=".75" transform="rotate(45 6.06 5)"></rect><rect stroke="none" width="7" height="1.5" fill="#FF424F" rx=".75" transform="scale(-1 1) rotate(45 -11.01 -9.51)"></rect></svg>}
                                    </div>
                                    <div className={`_3ZGVRW  ${formData.password==null?'_2VbYfm':formData.password.search(/[A-Z]/) < 0?'_1ilZVp':'_32YsrV'}`}>
                                        <span className="_1cH_X5">Ít nhất một kí tự viết hoa.</span>
                                        {formData.password==null?'':!formData.password.search(/[A-Z]/) > 0?<svg fill="none" viewBox="0 0 16 16" className="_1svebZ"><path fill="none" stroke="#6C0" d="M8 15A7 7 0 108 1a7 7 0 000 14z" clipRule="evenodd"></path><path stroke="none" fill="#6C0" fillRule="evenodd" d="M11.621 6.406l-3.98 4.059c-.266.266-.719.244-1.012-.049-.293-.293-.314-.746-.048-1.012l3.98-4.059c.266-.266.719-.245 1.012.048.293.293.314.747.048 1.013z" clipRule="evenodd"></path><path stroke="none" fill="#6C0" fillRule="evenodd" d="M3.803 7.997l2.81 2.532c.267.267.72.245 1.013-.048.293-.293.315-.746.048-1.012l-2.81-2.532c-.267-.267-.72-.245-1.013.048-.293.293-.314.746-.048 1.012z" clipRule="evenodd"></path></svg>:<svg viewBox="0 0 16 16" className="_1svebZ"><path fill="none" stroke="#FF424F" d="M8 15A7 7 0 108 1a7 7 0 000 14z" clipRule="evenodd"></path><rect stroke="none" width="7" height="1.5" x="6.061" y="5" fill="#FF424F" rx=".75" transform="rotate(45 6.06 5)"></rect><rect stroke="none" width="7" height="1.5" fill="#FF424F" rx=".75" transform="scale(-1 1) rotate(45 -11.01 -9.51)"></rect></svg>}
                                    </div>
                                    <div className={`_3ZGVRW  ${formData.password==null?'_2VbYfm':formData.password.length<=16 && formData.password.length>=6?'_32YsrV':'_1ilZVp'}`}>
                                        <span className="_1cH_X5">8-16 kí tự</span>
                                        {formData.password==null?'':formData.password.length<=16 && formData.password.length>=6?<svg fill="none" viewBox="0 0 16 16" className="_1svebZ"><path fill="none" stroke="#6C0" d="M8 15A7 7 0 108 1a7 7 0 000 14z" clipRule="evenodd"></path><path stroke="none" fill="#6C0" fillRule="evenodd" d="M11.621 6.406l-3.98 4.059c-.266.266-.719.244-1.012-.049-.293-.293-.314-.746-.048-1.012l3.98-4.059c.266-.266.719-.245 1.012.048.293.293.314.747.048 1.013z" clipRule="evenodd"></path><path stroke="none" fill="#6C0" fillRule="evenodd" d="M3.803 7.997l2.81 2.532c.267.267.72.245 1.013-.048.293-.293.315-.746.048-1.012l-2.81-2.532c-.267-.267-.72-.245-1.013.048-.293.293-.314.746-.048 1.012z" clipRule="evenodd"></path></svg>:<svg viewBox="0 0 16 16" className="_1svebZ"><path fill="none" stroke="#FF424F" d="M8 15A7 7 0 108 1a7 7 0 000 14z" clipRule="evenodd"></path><rect stroke="none" width="7" height="1.5" x="6.061" y="5" fill="#FF424F" rx=".75" transform="rotate(45 6.06 5)"></rect><rect stroke="none" width="7" height="1.5" fill="#FF424F" rx=".75" transform="scale(-1 1) rotate(45 -11.01 -9.51)"></rect></svg>}    
                                    </div>
                                    <div className={`_3ZGVRW ${formData.password==null?'_2VbYfm':formData.password==''||formData.password.match(/[|\\/~^:,;?!&%$@*+]/)?'_1ilZVp':'_32YsrV'}`}>
                                        <span className="_1cH_X5">Chỉ các chữ cái, số và ký tự phổ biến mới có thể được sử dụng</span>
                                        {formData.password==null?'':formData.password!==''&&!formData.password.match(/[|\\/~^:,;?!&%$@*+]/)?<svg fill="none" viewBox="0 0 16 16" className="_1svebZ"><path fill="none" stroke="#6C0" d="M8 15A7 7 0 108 1a7 7 0 000 14z" clipRule="evenodd"></path><path stroke="none" fill="#6C0" fillRule="evenodd" d="M11.621 6.406l-3.98 4.059c-.266.266-.719.244-1.012-.049-.293-.293-.314-.746-.048-1.012l3.98-4.059c.266-.266.719-.245 1.012.048.293.293.314.747.048 1.013z" clipRule="evenodd"></path><path stroke="none" fill="#6C0" fillRule="evenodd" d="M3.803 7.997l2.81 2.532c.267.267.72.245 1.013-.048.293-.293.315-.746.048-1.012l-2.81-2.532c-.267-.267-.72-.245-1.013.048-.293.293-.314.746-.048 1.012z" clipRule="evenodd"></path></svg>:<svg viewBox="0 0 16 16" className="_1svebZ"><path fill="none" stroke="#FF424F" d="M8 15A7 7 0 108 1a7 7 0 000 14z" clipRule="evenodd"></path><rect stroke="none" width="7" height="1.5" x="6.061" y="5" fill="#FF424F" rx=".75" transform="rotate(45 6.06 5)"></rect><rect stroke="none" width="7" height="1.5" fill="#FF424F" rx=".75" transform="scale(-1 1) rotate(45 -11.01 -9.51)"></rect></svg>}
                                    </div></>
                                    :<>
                                    <div className="WTZd6d">Mã xác minh của bạn sẽ được gửi bằng tin nhắn đến</div>
                                    <div className="_2cDH1P">{formData.phone}</div>
                                    <div className={`_3bmVj-`}>
                                        <div className="_17od-X">
                                            <input className="_3PH903" onChange={(e)=>setFormData({...formData,pin:e.target.value})} type="tel" autocomplete="one-time-code" maxlength="6" value={formData.pin}/>
                                                <div className="_2fgA8s">
                                                <div className="DFLIJW"></div>
                                                <div className="DFLIJW"></div>
                                                <div className="DFLIJW"></div>
                                                <div className="DFLIJW"></div>
                                                <div className="DFLIJW"></div>
                                                <div className="DFLIJW"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="_1Voin5"></div>
                                    <div className="_2_xoUf">
                                        <div className="_6avPU2">  
                                            <div className="_3Y39Ew">{state.time>0?`Vui lòng chờ ${state.time} giây để gửi lại.`:'Bạn không nhận được mã?'}</div>
                                            {state.time<=0?
                                            <div className="_6avPU2">
                                                <span onClick={(e)=>sendotp(e)} className="_1bNb0g">Gửi lại</span>
                                            </div>:''}
                                        </div>
                                    </div></>}
                                </>}</>}
                                {!formData.verify?
                                <button onClick={(e)=>!requestSent?setrepass(e):verifypin(e)} disabled={isVietnamesePhoneNumber(formData.phone) || validatEemail(formData.email)?false:true} className=" _1ruZ5a _3Nrkgj _3kANJY _1IRuK_ hh2rFL _3_offS" >Tiếp theo</button>
                                :<button onClick={(e)=>setpassword(e)} disabled={validatePassword(formData.password).length==0?false:true} className=" _1ruZ5a _3Nrkgj _3kANJY _1IRuK_ hh2rFL _3_offS" >Xác nhận</button>}
                            </div>
                        </div>
                    </form>:
                </div>
            </div>
        </div>
                 
    )

};

export default connect(null, { reset_password,reset_password_confirm })(ResetPassword);