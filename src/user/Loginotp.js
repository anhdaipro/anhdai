import React, { useState,useEffect } from 'react';
import {useNavigate , Link,useLocation, Navigate} from 'react-router-dom';
import { connect } from 'react-redux';
import { facebookLogin,googleLogin,loginotp,login,expiry } from '../actions/auth';
import ReactFacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';
import {loginURL, otpURL,verifyotpURL,} from "../urls"
import {isVietnamesePhoneNumber,generateString,validatePassword} from "../constants"
let user_id=null
const Loginotp = ({ loginotp, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '' ,
        phone:'',
        pin:''
    });
    console.log(isAuthenticated)
    const [state,setState]=useState({time:60,error:true,showpass:false,showrepass:false})
    const [show,setShow]=useState(false)
    let navigate = useNavigate();
    const { username, password } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = e => {
        e.preventDefault();
        
        (async () => {
            try {
            
                const data={id:formData.id,pin:formData.pin,phone:`+84 ${formData.phone.slice(-9)}`}
                const res = await axios.post(verifyotpURL,JSON.stringify(data))
                    setFormData({...formData,...res.data})
                    if(res.data.user_id!=undefined){
                    loginotp(res.data.user_id)
                    }
                    
            } catch (error) {
                setState({...state,error_verrify:true})
            }
        })();
    };

    window.onclick=(event)=>{
        if(isVietnamesePhoneNumber(formData.phone)){
            setFormData({...formData,phone:`+84 ${(formData.phone).slice(-9)}`})
        }
    }
   
    
    const continueWithFacebook = async () => {
        try {
            const res = await axios.get(`https://web-production-d411.up.railway.app/auth/o/facebook/?redirect_uri=http://localhost:3000/facebook`)

            window.location.replace(res.data.authorization_url);
        } catch (err) {

        }
    };

    if(isAuthenticated) {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        if(params.get('next')){
            window.location.href=params.get('next')
        }
        else{
            window.location.href='/'
        }
     }

     const responseGoogle = (res) => {
        googleLogin(res.accessToken);
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        setTimeout(() => {
            
            axios.post(loginURL,JSON.stringify({token:localStorage.access_token}), config)
            .then(res=>{
            const token = res.data.access;
            localStorage.setItem('token',token);
            const search = window.location.search;
                const params = new URLSearchParams(search);
                if(params.get('next')!=null){
                    window.location.href=params.get('next')
                }
                else{
                    window.location.href='/'
                }
            })
        }, 1000);
      }
    function responseFb(response) {
        
        facebookLogin(response.accessToken);
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        setTimeout(() => {
            axios.post(loginURL,JSON.stringify({token:localStorage.access_token}), config)
            .then(res=>{
                const token = res.data.access;
                localStorage.setItem('token',token);
                const search = window.location.search;
                const params = new URLSearchParams(search);
                if(params.get('next')!=null){
                    window.location.href=params.get('next')
                }
                else{
                    window.location.href='/'
        }
            })
        }, 1000);
    }

    const sendotp=(e)=>{
        e.preventDefault();
        const data={phone:`+84 ${(formData.phone).slice(-9)}`,login:true}
        setShow(true)
        let time=60
        setState({...state,time:time})
        axios.post(otpURL,JSON.stringify(data))
        .then(res=>{
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
    return(  
        <div className="login-user">
            <div className="item-center _2tK8Te">
                <form>
                    {!show?
                    <div className="_39Pw0B _34gSQ- _2kpMlA">
                        <div className="Xqnqjs">
                            <div className="_3-m13F">
                                <div className="_11EqvS">Đăng nhập</div>
                                <div className="_2FAubX">
                                    <div className="LXvhYo">Đăng nhập với mã QR</div>
                                    <Link className="YKCgqk" to="/buyer/login/qr">
                                        <svg width="40" height="40" fill="none" className="_3F92IZ"><g clipPath="url(#clip0)"><path fillRule="evenodd" clipRule="evenodd" d="M18 0H0v18h18V0zM3 15V3h12v12H3zM18 22H0v18h18V22zm-3 15H3V25h12v12zM40 0H22v18h18V0zm-3 15H25V3h12v12z" fill="#EE4D2D"></path><path d="M37 37H22.5v3H40V22.5h-3V37z" fill="#EE4D2D"></path><path d="M27.5 32v-8h-3v8h3zM33.5 32v-8h-3v8h3zM6 6h6v6H6zM6 28h6v6H6zM28 6h6v6h-6z" fill="#EE4D2D"></path><path fill="#fff" d="M-4.3 4l44 43.9-22.8 22.7-43.9-44z"></path></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h40v40H0z"></path></clipPath></defs></svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="_3e4zDA">
                            <div className="_2tFXiF">
                                <div className="_3mizNj">
                                    <input onChange={(e)=>setFormData({...formData,phone:e.target.value})} className="yReWDs" type="text" placeholder="Số điện thoại" autocomplete="tel" name="phone" value={formData.phone}/>
                                </div>
                                <div className="_2RHkvG">
                                </div>
                            </div>
                            <button onClick={(e)=>sendotp(e)} className="_1ruZ5a _3Nrkgj _3kANJY _1IRuK_ hh2rFL _3_offS">Tiếp theo</button>
                            <div className="_1uGIn5">
                                <Link className="_3XvOFP" to="/buyer/login">Đăng nhập với mật khẩu</Link>
                            </div>
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
                                        <button type="button" onClick={()=>renderProps.onClick} className="_1hKScg _2Ct2Hr _39svdr _2P7qLN">
                                        <div className="BnBJFp">
                                            <div className="_30SGUu social-white-background social-white-fb-png"></div>
                                        </div>
                                        <div className="_1DQYn2">Facebook</div>
                                        </button>)}
                                     />
                                   
                                    <GoogleLogin
                                        clientId="487987454497-pgoqpfq7s8tp7icr8c3c7pqm7mvmulbp.apps.googleusercontent.com"
                                        buttonText="Google"
                                        onSuccess={responseGoogle}
                                        onFailure={responseGoogle}
                                        cookiePolicy={'single_host_origin'}
                                        render={renderProps => (
                                            <button type="button" onClick={()=>renderProps.onClick} disabled={renderProps.disabled} className="_1hKScg _2Ct2Hr _1rblAp _2P7qLN">
                                                <div className="BnBJFp _3RUHTS">
                                                    <div className="_30SGUu social-white-background social-white-google-png"></div>
                                                </div>
                                                <div className="_1DQYn2">Google</div>
                                            </button>
                                        )}
                                    />,
                                    <button type="button" onClick={()=>continueWithFacebook()} className="_1hKScg _2Ct2Hr _19QKb7 _2P7qLN">
                                        <div className="BnBJFp">
                                            <div className="_30SGUu social-white-background social-white-apple-png"></div>
                                        </div>
                                        <div className="_1DQYn2">Apple</div>
                                    </button>
                                    
                                </div>
                            </div>
                        </div>
                        <div className="_3AiUtd">
                            <div className="_2O9TWB yjBjsT">Bạn mới biết đến Anhdai? 
                                <Link className="_25Fkvp" to="/buyer/signup">Đăng ký</Link>
                            </div>
                        </div>
                    </div>:
                    <div className="_34gSQ-">
                        <div className="Xqnqjs">
                            <div className="_3qVJYR">
                                <div onClick={()=>navigate('/buyer/login')} className="_6naxFx">
                                    <svg viewBox="0 0 22 17" className="yGpYhu"><g stroke="none" strokeWidth="1" fillRule="evenodd" transform="translate(-3, -6)"><path d="M5.78416545,15.2727801 L12.9866648,21.7122915 C13.286114,22.0067577 13.286114,22.4841029 12.9866648,22.7785691 C12.6864297,23.0738103 12.200709,23.0738103 11.9004739,22.7785691 L3.29347136,15.0837018 C3.27067864,15.0651039 3.23845445,15.072853 3.21723364,15.0519304 C3.06240034,14.899273 2.99480814,14.7001208 3.00030983,14.5001937 C2.99480814,14.3002667 3.06240034,14.1003396 3.21723364,13.9476821 C3.23845445,13.9275344 3.2714646,13.9345086 3.29425732,13.9166857 L11.9004739,6.22026848 C12.200709,5.92657717 12.6864297,5.92657717 12.9866648,6.22026848 C13.286114,6.51628453 13.286114,6.99362977 12.9866648,7.288096 L5.78416545,13.7276073 L24.2140442,13.7276073 C24.6478918,13.7276073 25,14.0739926 25,14.5001937 C25,14.9263948 24.6478918,15.2727801 24.2140442,15.2727801 L5.78416545,15.2727801 Z"></path></g></svg>
                                </div>
                                <div className="_3p_roN _36wKwh">
                                    <div className="ZWZ4ab">Vui lòng nhập mã xác minh</div>
                                </div>
                            </div>
                        </div>
                        <div className="_3e4zDA _2kpMlA">
                            {formData.verify!=undefined&&!formData.verify?<div className="_7Ao-BQ disryx umTGIP">
                            <div className="o5DLud">
                                    <svg viewBox="0 0 16 16" className="_2-4Lck"><path fill="none" stroke="#FF424F" d="M8 15A7 7 0 108 1a7 7 0 000 14z" clipRule="evenodd"></path><rect stroke="none" width="7" height="1.5" x="6.061" y="5" fill="#FF424F" rx=".75" transform="rotate(45 6.06 5)"></rect><rect stroke="none" width="7" height="1.5" fill="#FF424F" rx=".75" transform="scale(-1 1) rotate(45 -11.01 -9.51)"></rect></svg>
                                </div>
                                <div><div className="_3mi2mp">Mã xác minh không hợp lệ</div>
                                </div>
                            </div>
                            :''}
                            <div className="WTZd6d">Mã xác minh của bạn sẽ được gửi bằng tin nhắn đến</div>
                            <div className="_2cDH1P">{`+84 ${formData.phone.slice(-9)}`}</div>
                            <div className="_3bmVj-">
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
                            <button onClick={(e)=>onSubmit(e)} className="_1ruZ5a _3Nrkgj _3kANJY _1IRuK_ X27k2C hh2rFL _3_offS" disabled={formData.pin.length<6?true:false}>Đăng nhập</button>
                        </div>
                    </div>}
                </form>
            </div>
        </div>    
    )
}
const mapStateToProps = state => ({
    isAuthenticated: state.isAuthenticated
});
  
export default connect(mapStateToProps, { loginotp })(Loginotp);