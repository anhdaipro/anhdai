import React, { useState ,useEffect} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup,googleLogin,facebookLogin } from '../actions/auth';
import axios from 'axios';
import {isVietnamesePhoneNumber,generateString,validatePassword} from "../constants"
import ReactFacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { GoogleLogin } from 'react-google-login';
import {otpURL,verifyotpURL} from "../urls"
let id=undefined

const Signup = ({ signup, isAuthenticated,googleLogin,facebookLogin }) => {
    const navigate=useNavigate();
    const [accountCreated, setAccountCreated] = useState(false);
    const[show,setShow]=useState(false);
    const [data,setData]=useState(null);
    const [error,setError]=useState({})
    const [formData, setFormData] = useState({
        username: generateString(12),
        password: '',
        re_password: '',
        phone:'',
        pin:'',
        verify:false
    });
    const [state,setState]=useState({time:60,error:true,showpass:false,showrepass:false,style:{backgroundImage: `url(&quot;https://cf.shopee.vn/file/5569eb9dc7e09e2dbed5315b8f2ea8ba&quot;)`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center'}})
    const { username, email, password,phone } = formData;

    const showpass=(e,name,value)=>{
        e.preventDefault();
        setState({...state,[name]:!value})
    }

    const onSubmit = (e) => {
        e.preventDefault();
            signup(username, email, password,phone);
            setAccountCreated(true);
    };

    const sendotp=(e)=>{
        e.preventDefault();
        e.stopPropagation()
        
        const data={phone:`+84 ${(formData.phone).slice(-9)}`}
        let time=60
        setState({...state,time:time})
        axios.post(otpURL,JSON.stringify(data))
        .then(res=>{
            setShow(true)
            id=res.data.id
            setFormData({...formData,id:res.data.id})
            const countDown = setInterval(() => {
                time--
               
                setState({...state,time:time})
                if (time <= 0) {
                    clearInterval(countDown)
                    time=0
                    setState({...state,time:0})
                }
            }, 1000);
        })
    }

   
    if (isAuthenticated) {
        navigate('/')
    }
    if (accountCreated) {
        navigate('/buyer/login')
    }
    
    const responseGoogle = (res) => {
        googleLogin(res.accessToken);
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        setTimeout(() => {
        
            axios.post('https://anhdai.herokuapp.com/api/v4/login',JSON.stringify({token:localStorage.access_token}), config)
            .then(res=>{
            const token = res.data.access;
            localStorage.setItem('token',token);
            const search = window.location.search;
                const params = new URLSearchParams(search);
                if(params.get('next')){
                    window.location.href=params.get('next')
                }
                else{
                    window.location.href='/'
                }
            })
        }, 100);
      }
    function responseFb(response) {
        facebookLogin(response.accessToken);
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        setTimeout(() => {
            axios.post('https://anhdai.herokuapp.com/api/v4/login',JSON.stringify({token:localStorage.access_token}), config)
            .then(res=>{
                const token = res.data.access;
                localStorage.setItem('token',token);
                const search = window.location.search;
                const params = new URLSearchParams(search);
                if(params.get('next')){
                    window.location.href=params.get('next')
                }
                else{
                    window.location.href='/'
        }
            })
        }, 1000);
    }
    const setpassword=(e)=>{
        e.preventDefault();
        e.stopPropagation()
        const data={phone:`+84 ${(formData.phone).slice(-9)}`,id:id,pin:formData.pin}
        axios.post(verifyotpURL,JSON.stringify(data))
        .then(res=>{
            let data=res.data
            setFormData({...formData,...data})
        })
    }
    
    const setphone=(e)=>{
        e.stopPropagation()
        setFormData({...formData,phone:`${e.target.value}`}) 
        if( !isVietnamesePhoneNumber(e.target.value)){
            setError({...error,phone:true})    
            setFormData({...formData,phone:`${e.target.value}`})  
        }
        else{
            setError({...error,phone:false})   
        }  
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
                    {!show?
                    <form>
                        <div className="_3DQCvf _34gSQ- _2kpMlA">
                            <div className="Xqnqjs">
                                <div className="_3-m13F">
                                    <div className="_11EqvS">Đăng ký</div>
                                </div>
                            </div>
                            <div className="_3e4zDA">
                                <div>
                                </div>
                                <div className="_3mpt9N">
                                    <div className={`_3mizNj ${state.error?'_3ohfoK':''}`}>
                                        <input onChange={(e)=>setphone(e)} className="yReWDs" type="text" placeholder="Số điện thoại" autocomplete="tel" name="phone" value={formData.phone}/>
                                    </div>
                                    <div className="_2RHkvG">{error.phone!=undefined && error.phone?'Số điện thoại không hợp lệ':''}</div>
                                </div>
                                <button onClick={(e)=>sendotp(e)} className="_1ruZ5a _3Nrkgj _3kANJY _1IRuK_ _2oVpc4 hh2rFL _3_offS" disabled={error.phone==undefined || error.phone?true:false}>Tiếp theo</button>
                                <div className="_1uGIn5"><Link className="_3XvOFP" to="/buyer/signup">Đăng ký với email</Link></div>
                                <div>
                                    <div className="IFLxoY">
                                        <div className="_3svg61"></div>
                                        <span className="_1ZEpVL">HOẶC</span>
                                        <div className="_3svg61"></div>
                                    </div>
                                    <div className="_1ix216">
                                        <ReactFacebookLogin
                                            appId="914137032576861"
                                            fields="name,email"
                                            callback={responseFb}
                                            render={renderProps => (
                                            <button type="button" onClick={renderProps.onClick} className="_1tEaLw _1KaMhP _2hu_TW">
                                                <div className="_2cL_gJ">
                                                    <div className="_2YPltP social-white-background social-white-fb-blue-png"></div>
                                                </div>
                                                <div className="">Facebook</div>
                                            </button>)}
                                        />
                                        <GoogleLogin
                                            clientId="487987454497-pgoqpfq7s8tp7icr8c3c7pqm7mvmulbp.apps.googleusercontent.com"
                                            buttonText="Google"
                                            onSuccess={responseGoogle}
                                            onFailure={responseGoogle}
                                            cookiePolicy={'single_host_origin'}
                                            render={renderProps => (
                                                <button type="button" onClick={renderProps.onClick} disabled={renderProps.disabled} className="_1tEaLw _1KaMhP _2hu_TW">
                                                     <div className="_2cL_gJ">
                                                        <div className="_2YPltP social-white-background social-white-google-png"></div>
                                                    </div>
                                                    <div className="">Google</div>
                                                </button>
                                            )}
                                        />,
                                    </div>
                                </div>
                                <div className="_2KbZSJ">
                                    <div className="R49cvp">Bằng việc đăng ký, bạn đã đồng ý với Anhdai về 
                                        <Link to="https://shopee.vn/legaldoc/termsOfService/?__classic__=1" className="_3LmzHH" target="_blank" rel="noopener noreferrer">Điều khoản dịch vụ</Link> &amp; 
                                        <Link to="https://shopee.vn/legaldoc/privacy/?__classic__=1" className="_3LmzHH" target="_blank" rel="noopener noreferrer">Chính sách bảo mật</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="_3AiUtd">
                                <div className="_2O9TWB yjBjsT">Bạn đã có tài khoản? 
                                    <Link className="_25Fkvp" to="/buyer/login">Đăng nhập</Link>
                                </div>
                            </div>
                        </div>
                    </form>:
                    
                    <div className="LqrF0U">
                        <div className="oklrty _1UtINp">
                            <div className="_2Vgu8y">
                                <div className={`_2pher1 ${!formData.verify?'v-JwLd':''}`}>1</div>
                                <p className={`yWjvx9 ${!formData.verify?'_2Xj-3V':''}`}>Xác minh số điện thoại</p>
                            </div>
                            <div className="_37oqYP"></div>
                            <div className="_2Vgu8y">
                                <div className={`_2pher1 ${formData.verify?'v-JwLd':''}`}>2</div>
                                <p className={`yWjvx9 ${formData.verify?'_2Xj-3V':''}`}>Tạo mật khẩu</p>
                            </div>
                            <div className="_37oqYP"></div>
                            <div className="_2Vgu8y">
                                <div className={`_2pher1 ${accountCreated?'v-JwLd':''}`}>
                                    <svg enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className="svg-icon icon-tick"><g><path d="m6.5 13.6c-.2 0-.5-.1-.7-.2l-5.5-4.8c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l4.7 4 6.8-9.4c.3-.4.9-.5 1.4-.2.4.3.5 1 .2 1.4l-7.4 10.3c-.2.2-.4.4-.7.4 0 0 0 0-.1 0z"></path></g></svg>
                                </div>
                                <p className={`yWjvx9 ${accountCreated?'_2Xj-3V':''}`}>Hoàn thành</p>
                            </div>
                        </div>
                            <form>
                                <div className="_34gSQ-">
                                    <div className="Xqnqjs">
                                        <div className="_3qVJYR">
                                            <div onClick={()=>setShow(false)} className="_6naxFx">
                                                <svg viewBox="0 0 22 17" className="yGpYhu"><g stroke="none" strokeWidth="1" fillRule="evenodd" transform="translate(-3, -6)"><path d="M5.78416545,15.2727801 L12.9866648,21.7122915 C13.286114,22.0067577 13.286114,22.4841029 12.9866648,22.7785691 C12.6864297,23.0738103 12.200709,23.0738103 11.9004739,22.7785691 L3.29347136,15.0837018 C3.27067864,15.0651039 3.23845445,15.072853 3.21723364,15.0519304 C3.06240034,14.899273 2.99480814,14.7001208 3.00030983,14.5001937 C2.99480814,14.3002667 3.06240034,14.1003396 3.21723364,13.9476821 C3.23845445,13.9275344 3.2714646,13.9345086 3.29425732,13.9166857 L11.9004739,6.22026848 C12.200709,5.92657717 12.6864297,5.92657717 12.9866648,6.22026848 C13.286114,6.51628453 13.286114,6.99362977 12.9866648,7.288096 L5.78416545,13.7276073 L24.2140442,13.7276073 C24.6478918,13.7276073 25,14.0739926 25,14.5001937 C25,14.9263948 24.6478918,15.2727801 24.2140442,15.2727801 L5.78416545,15.2727801 Z"></path></g></svg>
                                            </div>
                                            <div className="_3p_roN _36wKwh">
                                                <div className="ZWZ4ab">{formData.verify?formData.user_id!=undefined?'Số điện thoại đã được đăng ký':'Thiết lập mật khẩu':'Vui lòng nhập mã xác minh'}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="_3e4zDA _2kpMlA">
                                    {error.verify!=undefined && error.verify?<div className="_7Ao-BQ disryx umTGIP">
                                        <div className="o5DLud">
                                            <svg viewBox="0 0 16 16" className="_2-4Lck"><path fill="none" stroke="#FF424F" d="M8 15A7 7 0 108 1a7 7 0 000 14z" clipRule="evenodd"></path><rect stroke="none" width="7" height="1.5" x="6.061" y="5" fill="#FF424F" rx=".75" transform="rotate(45 6.06 5)"></rect><rect stroke="none" width="7" height="1.5" fill="#FF424F" rx=".75" transform="scale(-1 1) rotate(45 -11.01 -9.51)"></rect></svg>
                                        </div>
                                        <div>
                                            <div className="_3mi2mp">Mã xác minh không hợp lệ</div>
                                        </div>
                                    </div>:''}
                                    {formData.user_id!=undefined?
                                    <div>
                                        <div className="KCx6fd _3nm8yw">
                                            <img className="_2HCc0n" src={formData.avatar}/>
                                        </div>
                                        <div className="_1IpTW3">{formData.username}</div>
                                        <div className="_1f249O">{formData.phone}</div>
                                        <div className="_1WFRNo">Nếu tài khoản trên là của bạn, nhấn "Đăng nhập". Nếu không, chọn "Lấy lại số điện thoại" để dùng số điện thoại đó cho tài khoản mới.</div>
                                    </div>:''}
                                    <div className="WTZd6d">{formData.verify?'Bước cuối thiết lập mật khẩu để hoàn thành việc đăng ký':'Mã xác minh của bạn sẽ được gửi bằng tin nhắn đến'}</div>
                                    <div className="_2cDH1P">{formData.phone}</div>
                                    {formData.verify?
                                    <>
                                    <div className="_8VljFf">
                                        <div className="_3mizNj">
                                            <input onChange={(e)=>setFormData({...formData,password:e.target.value})} className="yReWDs" type={state.showpass?'text':'password'} placeholder="Mật khẩu" autocomplete="new-password" name="new_password1" maxLength="16" value={formData.password}/>
                                            <button onClick={(e)=>showpass(e,'showpass',state.showpass)} className="_1mrJbr" >
                                                {!state.showrepass?
                                                <svg fill="none" viewBox="0 0 20 10" className="_2nnXgl"><path stroke="none" fill="#000" fill-opacity=".54" d="M19.834 1.15a.768.768 0 00-.142-1c-.322-.25-.75-.178-1 .143-.035.036-3.997 4.712-8.709 4.712-4.569 0-8.71-4.712-8.745-4.748a.724.724 0 00-1-.071.724.724 0 00-.07 1c.07.106.927 1.07 2.283 2.141L.631 5.219a.69.69 0 00.036 1c.071.142.25.213.428.213a.705.705 0 00.5-.214l1.963-2.034A13.91 13.91 0 006.806 5.86l-.75 2.535a.714.714 0 00.5.892h.214a.688.688 0 00.679-.535l.75-2.535a9.758 9.758 0 001.784.179c.607 0 1.213-.072 1.785-.179l.75 2.499c.07.321.392.535.677.535.072 0 .143 0 .179-.035a.714.714 0 00.5-.893l-.75-2.498a13.914 13.914 0 003.248-1.678L18.3 6.147a.705.705 0 00.5.214.705.705 0 00.499-.214.723.723 0 00.036-1l-1.82-1.891c1.463-1.071 2.32-2.106 2.32-2.106z"></path></svg>:
                                                <svg fill="none" viewBox="0 0 20 12" className="t5jqkM"><path stroke="none" fill="#000" fill-opacity=".54" fillRule="evenodd" d="M19.975 5.823V5.81 5.8l-.002-.008v-.011a.078.078 0 01-.002-.011v-.002a.791.791 0 00-.208-.43 13.829 13.829 0 00-1.595-1.64c-1.013-.918-2.123-1.736-3.312-2.368-.89-.474-1.832-.867-2.811-1.093l-.057-.014a2.405 2.405 0 01-.086-.02L11.884.2l-.018-.003A9.049 9.049 0 0010.089 0H9.89a9.094 9.094 0 00-1.78.197L8.094.2l-.016.003-.021.005a1.844 1.844 0 01-.075.017l-.054.012c-.976.226-1.92.619-2.806 1.09-1.189.635-2.3 1.45-3.31 2.371a13.828 13.828 0 00-1.595 1.64.792.792 0 00-.208.43v.002c-.002.007-.002.015-.002.022l-.002.01V5.824l-.002.014a.109.109 0 000 .013L0 5.871a.206.206 0 00.001.055c0 .01 0 .018.002.027 0 .005 0 .009.003.013l.001.011v.007l.002.01.001.013v.002a.8.8 0 00.208.429c.054.067.11.132.165.197a13.9 13.9 0 001.31 1.331c1.043.966 2.194 1.822 3.428 2.48.974.52 2.013.942 3.09 1.154a.947.947 0 01.08.016h.003a8.864 8.864 0 001.596.16h.2a8.836 8.836 0 001.585-.158l.006-.001a.015.015 0 01.005-.001h.005l.076-.016c1.079-.212 2.118-.632 3.095-1.153 1.235-.66 2.386-1.515 3.43-2.48a14.133 14.133 0 001.474-1.531.792.792 0 00.208-.43v-.002c.003-.006.003-.015.003-.022v-.01l.002-.008c0-.004 0-.009.002-.013l.001-.012.001-.015.001-.019.002-.019a.07.07 0 01-.01-.036c0-.009 0-.018-.002-.027zm-6.362.888a3.823 3.823 0 01-1.436 2.12l-.01-.006a3.683 3.683 0 01-2.178.721 3.67 3.67 0 01-2.177-.721l-.009.006a3.823 3.823 0 01-1.437-2.12l.014-.01a3.881 3.881 0 01-.127-.974c0-2.105 1.673-3.814 3.738-3.816 2.065.002 3.739 1.711 3.739 3.816 0 .338-.047.662-.128.975l.011.009zM8.145 5.678a1.84 1.84 0 113.679 0 1.84 1.84 0 01-3.679 0z" clipRule="evenodd"></path></svg>
                                                }
                                            </button>
                                        </div>
                                    </div>
                                    <div className="_3ZGVRW _2VbYfm">
                                        <span className="_1cH_X5">Ít nhất một kí tự viết thường.</span>
                                    </div>
                                    <div className="_3ZGVRW _2VbYfm">
                                        <span className="_1cH_X5">Ít nhất một kí tự viết hoa.</span>
                                    </div>
                                    <div className="_3ZGVRW _2VbYfm">
                                        <span className="_1cH_X5">8-16 kí tự</span>
                                    </div>
                                    <div className="_3ZGVRW _2VbYfm">
                                        <span className="_1cH_X5">Chỉ các chữ cái, số và ký tự phổ biến mới có thể được sử dụng</span>
                                    </div>
                                    </>
                                    :
                                    <>
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
                                    </div>
                                    </>}
                                    {!formData.verify?<button onClick={(e)=>setpassword(e)} className="_1ruZ5a _3Nrkgj _3kANJY _1IRuK_ X27k2C hh2rFL _3_offS" disabled={formData.pin.length<6?true:false}>Xác nhận</button>
                                    :<button onClick={(e)=>formData.user_id!=undefined?navigate('/buyer/login'):onSubmit(e)} className="_1ruZ5a _3Nrkgj _3kANJY _1IRuK_ X27k2C hh2rFL _3_offS" disabled={validatePassword(formData.password).length>0?true:false}>{formData.user_id!=undefined?'Đăng nhập':'Đăng ký'}</button>}
                                    {formData.user_id!=undefined?<button className="_1ruZ5a _3Nrkgj _1IRuK_ _2Q4EP0 DZhd7t _3Nrkgj _2WaRLi">Lấy lại số điện thoại</button>:''}
                                </div>
                            </div>
                        </form>
                    </div>}
                </div>
            </div>
        </div>
                 
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.isAuthenticated
});

export default connect(mapStateToProps, { signup,googleLogin,facebookLogin })(Signup);