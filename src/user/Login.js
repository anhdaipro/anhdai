import React, { useState,useEffect } from 'react';
import {useNavigate , Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { login,facebookLogin,googleLogin, expiry } from '../actions/auth';
import ReactFacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';
const Login = ({ login, isAuthenticated,googleLogin,facebookLogin}) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '' 
    });
    const [state,setState]=useState({showpass:false,showrepass:false,error_login:0})
    let navigate = useNavigate();
    const { username, password } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = e => {
        e.preventDefault();
        login(username, password);
    };
    
    const showpass=(e,name,value)=>{
        e.preventDefault();
        setState({...state,[name]:!value})
    }
    

    useEffect(() => {
        if(isAuthenticated!=null){
            if(isAuthenticated){
                setState({...state,error_login:0})
                const search = window.location.search;
                const params = new URLSearchParams(search);
                if(params.get('next')!=null){
                    window.location.href=params.get('next')
                }
                else{
                    window.location.href='/'
                }
            }
            else{
                setState({...state,error_login:state.error_login+1})
            }
        }
    }, [isAuthenticated])
   
    
    
     console.log(expiry)
     const responseGoogle = (res) => {
        googleLogin(res.accessToken);
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        setTimeout(() => {
            let form=new FormData()
            form.append('token',localStorage.access_token)
        
            axios.post('https://anhdai.herokuapp.com/api/v4/login',form, config)
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
        }, 100);
      }
    const  responseFb=(response)=> {
        facebookLogin(response.accessToken);
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        setTimeout(() => {
            let form=new FormData()
            form.append('token',localStorage.access_token)
            axios.post('https://anhdai.herokuapp.com/api/v4/login', form, config)
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

    return(  
        <>
        <div className="login-user">
            <div className="item-center _2tK8Te">
                <form onSubmit={e=>onSubmit(e)}>
                    <div className="_3KEKx7 _34gSQ- _2kpMlA">
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
                            {state.error_login>0?
                            <div className="_7Ao-BQ _2CyKyE umTGIP">
                                <div className="o5DLud">
                                    <svg viewBox="0 0 16 16" className="_2-4Lck"><path fill="none" stroke="#FF424F" d="M8 15A7 7 0 108 1a7 7 0 000 14z" clip-rule="evenodd"></path><rect stroke="none" width="7" height="1.5" x="6.061" y="5" fill="#FF424F" rx=".75" transform="rotate(45 6.06 5)"></rect><rect stroke="none" width="7" height="1.5" fill="#FF424F" rx=".75" transform="scale(-1 1) rotate(45 -11.01 -9.51)"></rect></svg>
                                </div>
                                <div>
                                    <div className="_3mi2mp">{state.error_login==1?'Tên tài khoản của bạn hoặc Mật khẩu không đúng, vui lòng thử lại':'Tài khoản hoặc mật khẩu đăng nhập không chính xác. Vui lòng nhấn “Quên?” để đặt lại mật khẩu mới.'}</div>
                                </div>
                            </div>:''}
                            <div className="_3nZHpB">
                                <div className="_3mizNj">
                                    <input required value={formData.username} onChange={e => onChange(e)} className="yReWDs" type="text" placeholder="username/Số điện thoại/Tên đăng nhập" autoComplete="on" name="username" maxLength="128"/>
                                </div>
                                <div className="_2RHkvG"></div>
                            </div>
                            <div className="_35M4-Y">
                                <div className="_3mizNj">
                                    <input required onChange={e => onChange(e)} value={formData.password} className="yReWDs" type={state.showpass?'text':'password'} placeholder="Mật khẩu" autoComplete="current-password" name="password" maxLength="16"/>
                                    <button onClick={(e)=>showpass(e,'showpass',state.showpass)} className="_1mrJbr" >
                                        {!state.showpass?
                                        <svg fill="none" viewBox="0 0 20 10" className="_2nnXgl"><path stroke="none" fill="#000" fill-opacity=".54" d="M19.834 1.15a.768.768 0 00-.142-1c-.322-.25-.75-.178-1 .143-.035.036-3.997 4.712-8.709 4.712-4.569 0-8.71-4.712-8.745-4.748a.724.724 0 00-1-.071.724.724 0 00-.07 1c.07.106.927 1.07 2.283 2.141L.631 5.219a.69.69 0 00.036 1c.071.142.25.213.428.213a.705.705 0 00.5-.214l1.963-2.034A13.91 13.91 0 006.806 5.86l-.75 2.535a.714.714 0 00.5.892h.214a.688.688 0 00.679-.535l.75-2.535a9.758 9.758 0 001.784.179c.607 0 1.213-.072 1.785-.179l.75 2.499c.07.321.392.535.677.535.072 0 .143 0 .179-.035a.714.714 0 00.5-.893l-.75-2.498a13.914 13.914 0 003.248-1.678L18.3 6.147a.705.705 0 00.5.214.705.705 0 00.499-.214.723.723 0 00.036-1l-1.82-1.891c1.463-1.071 2.32-2.106 2.32-2.106z"></path></svg>:
                                        <svg fill="none" viewBox="0 0 20 12" className="t5jqkM"><path stroke="none" fill="#000" fill-opacity=".54" fill-rule="evenodd" d="M19.975 5.823V5.81 5.8l-.002-.008v-.011a.078.078 0 01-.002-.011v-.002a.791.791 0 00-.208-.43 13.829 13.829 0 00-1.595-1.64c-1.013-.918-2.123-1.736-3.312-2.368-.89-.474-1.832-.867-2.811-1.093l-.057-.014a2.405 2.405 0 01-.086-.02L11.884.2l-.018-.003A9.049 9.049 0 0010.089 0H9.89a9.094 9.094 0 00-1.78.197L8.094.2l-.016.003-.021.005a1.844 1.844 0 01-.075.017l-.054.012c-.976.226-1.92.619-2.806 1.09-1.189.635-2.3 1.45-3.31 2.371a13.828 13.828 0 00-1.595 1.64.792.792 0 00-.208.43v.002c-.002.007-.002.015-.002.022l-.002.01V5.824l-.002.014a.109.109 0 000 .013L0 5.871a.206.206 0 00.001.055c0 .01 0 .018.002.027 0 .005 0 .009.003.013l.001.011v.007l.002.01.001.013v.002a.8.8 0 00.208.429c.054.067.11.132.165.197a13.9 13.9 0 001.31 1.331c1.043.966 2.194 1.822 3.428 2.48.974.52 2.013.942 3.09 1.154a.947.947 0 01.08.016h.003a8.864 8.864 0 001.596.16h.2a8.836 8.836 0 001.585-.158l.006-.001a.015.015 0 01.005-.001h.005l.076-.016c1.079-.212 2.118-.632 3.095-1.153 1.235-.66 2.386-1.515 3.43-2.48a14.133 14.133 0 001.474-1.531.792.792 0 00.208-.43v-.002c.003-.006.003-.015.003-.022v-.01l.002-.008c0-.004 0-.009.002-.013l.001-.012.001-.015.001-.019.002-.019a.07.07 0 01-.01-.036c0-.009 0-.018-.002-.027zm-6.362.888a3.823 3.823 0 01-1.436 2.12l-.01-.006a3.683 3.683 0 01-2.178.721 3.67 3.67 0 01-2.177-.721l-.009.006a3.823 3.823 0 01-1.437-2.12l.014-.01a3.881 3.881 0 01-.127-.974c0-2.105 1.673-3.814 3.738-3.816 2.065.002 3.739 1.711 3.739 3.816 0 .338-.047.662-.128.975l.011.009zM8.145 5.678a1.84 1.84 0 113.679 0 1.84 1.84 0 01-3.679 0z" clip-rule="evenodd"></path></svg>
                                        }
                                    </button>
                                </div>
                                <div className="_2RHkvG"></div>
                            </div>
                            <button  className="_1ruZ5a _3Nrkgj _3kANJY _1IRuK_ hh2rFL _3_offS">Login</button>
                            <div className="_1upyIZ">
                                <Link className="_2Sf-pK" to="/buyer/reset">Quên mật khẩu</Link>
                                <Link className="_2Sf-pK" to="/buyer/login/otp">Đăng nhập với SMS</Link>
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
                                        <button type="button" onClick={renderProps.onClick} className="_1hKScg _2Ct2Hr _39svdr _2P7qLN">
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
                                            <button type="button" onClick={renderProps.onClick} disabled={renderProps.disabled} className="_1hKScg _2Ct2Hr _1rblAp _2P7qLN">
                                                <div className="BnBJFp _3RUHTS">
                                                    <div className="_30SGUu social-white-background social-white-google-png"></div>
                                                </div>
                                                <div className="_1DQYn2">Google</div>
                                            </button>
                                        )}
                                    />,
                                    <button type="button"  className="_1hKScg _2Ct2Hr _19QKb7 _2P7qLN">
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
                    </div>
                </form>
            </div>
        </div>
        
        </> 
    )
}
const mapStateToProps = state => ({
    isAuthenticated: state.isAuthenticated
});
  
export default connect(mapStateToProps, { login,googleLogin,facebookLogin })(Login);