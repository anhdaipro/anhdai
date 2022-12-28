import React, { useState,useEffect, useRef } from 'react';
import {useNavigate , Link} from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { login,responseFb,responseGoogle } from '../actions/auth';
import ReactFacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';
import { gapi } from "gapi-script";
import { loginURL } from '../urls';
import { GOOGLE_AUTH_SUCCESS, LOGIN_FAIL, LOGIN_SUCCESS } from '../actions/types';
import styled from "styled-components"
import { validatEemail } from '../constants';
const Flexcenter=styled.div`
display:flex;
justify-content: center;
align-items: center;
`
const Modal=styled(Flexcenter)`
position:fixed;
top:0;
left:0;
right:0;
bottom:0;
z-index;1000
`
const Relative=styled.div`
position:relative
`
const Modalcontent=styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
    background-color: #fff;
    box-sizing: border-box;
    box-shadow: 0 3px 10px 0 rgb(0 0 0 / 14%);
    border-radius: 4px;
    overflow: hidden;
    width: 340px;
    min-height: 336px;
    padding: 24px 0;
    position: relative;
`
const Modalheader=styled.div`
    position: relative;
    width: 100%;
    margin-bottom: 25px;
    height: 24px;
    .title{
        font-size: 20px;
        color: #222;
        width: 100%;
        text-align: center;
    };
    .btn-close{
        width: 16px;
        height: 16px;
        position: absolute;
        top: 4px;
        right: 0;
        padding: 0;
        background: transparent;
        border: 0;
        outline: none;
        cursor: pointer;
    }
`
const Modalbody=styled.div`

`
const Dragcontent=styled.div`
    width:280px;
    position: relative;
    font-size: 12px;
    margin-top: 12px;
    border-radius: 2px;
    background-color: rgba(0,0,0,.09);
    padding: 4px;
    box-sizing: border-box;
    .G3AxnX {
        overflow: hidden;
        position: relative;
        width: 40px;
        height: 40px;
        align-items: center;
        display: flex;
        justify-content: center;
    };
    ._4kKzuv {
        background-color: #ee4d2d;
        cursor:pointer
    };
    .FkL4P7, .vtXNmC {
        position: absolute;
        top: 8px;
        left: 8px;
    };
    .error-drag{
        background-color:#ee2c4a;
    };
    .error-btn{
        background-color:#ee2c4a;
    }
    
`
const Titledrag=styled(Flexcenter)`
position:absolute;
left: 45px;
top: 0;
height: 100%;
width: 230px;
color: rgba(0,0,0,.65);
font-size: 12px;
user-select: none;
cursor: default;
text-align: center;
box-sizing: border-box;
padding: 0 12px;
`
const Position=styled.div`
    position: absolute;
    left: 0;
    top: 0;
    will-change: transform;
`
const Translatestyle=styled.div`
transition: transform .3s ease;
transition-delay: .35s;
`
const ContentProgess=styled.div`
display:${props=>props.drag?"block":"none"};
position:absolute;
left: 0;
transform-origin: left center;
opacity: .3;
background-color: #ee4d2d;
position: absolute;
top: 0;
height: 100%;
&.drag-translate{
    transition: transform .3s ease;
    transition-delay: .35s;
}
`
const Btndrag=styled.div`
display:none;
background-color: #ee4d2d;
`
const Bodymedia=styled.div`
width: 280px; 
height: 150px;
position:relative;
.image-background{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}
`
const Login = ({isAuthenticated,responseGoogle,responseFb}) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '' 
    });
    useEffect(() => {
        function start() {
          gapi.client.init({
            clientId: "456152692700-qape5ita2bvpgdb8rpnb5bkltg8mhpus.apps.googleusercontent.com",
            scope: 'email',
          });
        }
    
        gapi.load('client:auth2', start);
      }, []);
    const [state,setState]=useState({showpass:false,showrepass:false,error_login:0})
    let navigate = useNavigate();
    const dispatch=useDispatch()
    const [drag,setDrag]=useState(false)
    const [show,setShow]=useState(false)
    useEffect(()=>{
        if(state.error_login>1){
            setShow(true)
        }
    },[state.error_login])
    const [dx,setDx]=useState(0)
    const { username, password } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            
            const form=!validatEemail(username)?{username:username,password:password}:{email:username,password:password}
            const res = await axios.post(loginURL,JSON.stringify(form), config);
            
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
                
            });
            
            const data = res.data
            localStorage.setItem("expirationDate", data.access_expires);
            localStorage.setItem('token',data.access);
            localStorage.setItem('refresh',data.refresh)
        } catch (err) {
            setState({...state,error_login:state.error_login+1})
            dispatch({
                type: LOGIN_FAIL
            })
        }
    };
    
    const showpass=(e,name,value)=>{
        e.preventDefault();
        setState({...state,[name]:!value})
    }
    

    useEffect(() => {
        if(isAuthenticated){
            setState({...state,error_login:0})
            const search = window.location.search;
            const params = new URLSearchParams(search);
            if(params.get('next')){
                window.location.href=params.get('next')
            }
            else{
                 window.location.href='/'
            }
        }
    }, [isAuthenticated])
    const dragRef=useRef()
    useEffect(()=>{
        const setprogess=(e)=>{
            e.stopPropagation()
            if(drag && show){
                const rects = dragRef.current.getBoundingClientRect();
                const clientX=e.clientX
                const left =rects.left+22
                const width=rects.width
                const min=left
                const max=left+width-66
                const percent=clientX<min?0:clientX>=max?1-44/280:(clientX-left)/width
                setDx(percent*280)
            }
        }
       
        document.addEventListener('mousemove',setprogess)
        
        return ()=>{
            document.removeEventListener('mousemove',setprogess)
        }
    },[drag,show])

    useEffect(()=>{
        const setdrag=(e)=>{
            if(show && drag){
                setTimeout(() => {
                    setDrag(false)
                    setDx(0)
                }, 500);
                
                if(dx>=98 && dx<=102){
                    setTimeout(() => {
                        setShow(false)
                        setState({...state,error_login:0})
                    },300)
                }
                else{
                    setState({...state,error_drag:true})
                    setTimeout(() => {
                        setState({...state,error_drag:false})    
                    }, 1000);
                }
            } 
        }
        document.addEventListener('mouseup',setdrag)
        return ()=>{
            document.removeEventListener('mouseup',setdrag)
        }
    },[drag,dx,show])
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
                                    <svg viewBox="0 0 16 16" className="_2-4Lck"><path fill="none" stroke="#FF424F" d="M8 15A7 7 0 108 1a7 7 0 000 14z" clipRule="evenodd"></path><rect stroke="none" width="7" height="1.5" x="6.061" y="5" fill="#FF424F" rx=".75" transform="rotate(45 6.06 5)"></rect><rect stroke="none" width="7" height="1.5" fill="#FF424F" rx=".75" transform="scale(-1 1) rotate(45 -11.01 -9.51)"></rect></svg>
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
                                        <svg fill="none" viewBox="0 0 20 12" className="t5jqkM"><path stroke="none" fill="#000" fill-opacity=".54" fillRule="evenodd" d="M19.975 5.823V5.81 5.8l-.002-.008v-.011a.078.078 0 01-.002-.011v-.002a.791.791 0 00-.208-.43 13.829 13.829 0 00-1.595-1.64c-1.013-.918-2.123-1.736-3.312-2.368-.89-.474-1.832-.867-2.811-1.093l-.057-.014a2.405 2.405 0 01-.086-.02L11.884.2l-.018-.003A9.049 9.049 0 0010.089 0H9.89a9.094 9.094 0 00-1.78.197L8.094.2l-.016.003-.021.005a1.844 1.844 0 01-.075.017l-.054.012c-.976.226-1.92.619-2.806 1.09-1.189.635-2.3 1.45-3.31 2.371a13.828 13.828 0 00-1.595 1.64.792.792 0 00-.208.43v.002c-.002.007-.002.015-.002.022l-.002.01V5.824l-.002.014a.109.109 0 000 .013L0 5.871a.206.206 0 00.001.055c0 .01 0 .018.002.027 0 .005 0 .009.003.013l.001.011v.007l.002.01.001.013v.002a.8.8 0 00.208.429c.054.067.11.132.165.197a13.9 13.9 0 001.31 1.331c1.043.966 2.194 1.822 3.428 2.48.974.52 2.013.942 3.09 1.154a.947.947 0 01.08.016h.003a8.864 8.864 0 001.596.16h.2a8.836 8.836 0 001.585-.158l.006-.001a.015.015 0 01.005-.001h.005l.076-.016c1.079-.212 2.118-.632 3.095-1.153 1.235-.66 2.386-1.515 3.43-2.48a14.133 14.133 0 001.474-1.531.792.792 0 00.208-.43v-.002c.003-.006.003-.015.003-.022v-.01l.002-.008c0-.004 0-.009.002-.013l.001-.012.001-.015.001-.019.002-.019a.07.07 0 01-.01-.036c0-.009 0-.018-.002-.027zm-6.362.888a3.823 3.823 0 01-1.436 2.12l-.01-.006a3.683 3.683 0 01-2.178.721 3.67 3.67 0 01-2.177-.721l-.009.006a3.823 3.823 0 01-1.437-2.12l.014-.01a3.881 3.881 0 01-.127-.974c0-2.105 1.673-3.814 3.738-3.816 2.065.002 3.739 1.711 3.739 3.816 0 .338-.047.662-.128.975l.011.009zM8.145 5.678a1.84 1.84 0 113.679 0 1.84 1.84 0 01-3.679 0z" clipRule="evenodd"></path></svg>
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
                                        clientId="456152692700-qape5ita2bvpgdb8rpnb5bkltg8mhpus.apps.googleusercontent.com"
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
        {show &&(<Modal>
            <Modalcontent>
                <div>
                    <Modalheader>
                        <div className="title">Xác nhận</div>
                        <button onClick={()=>setShow(false)} className="btn-close">
                            <svg viewBox="0 0 12 12" fill="rgba(0, 0, 0, 0.54)" width="16px" heigth="16px" ><path d="M12 .766L11.234 0 6 5.234.766 0 0 .766 5.234 6 0 11.234.766 12 6 6.766 11.234 12l.766-.766L6.766 6 12 .766z" fill="currentColor"></path></svg>
                        </button>
                    </Modalheader>
                    <Modalbody>
                        <Bodymedia>
                            <div>
                                <img className="i69kxK" draggable="false" src="data:image/jpeg;base64,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"></img>
                            </div>
                            <Position className={`${drag?'':'_4lItOR'}`} style={{transform: `translate(${dx}px, 46px)`}}>
                                <img className="H61S7b" draggable="false" src="data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAJmUlEQVR4nOyZeWyO+frGr8eYRcfMMPaqXUsVtdVa608ofiKWEqTRIhJ/SJUQIxjSpuTInKqc48SRYP4Qwh/2JSL2nbHvpVX73lbVznPyued5pdNXj7bTyTkn53yT5uV5n+f7ve7rvu7rvp+2jP7D1v8A/9HrdwF2XbeC67o/uq6b4f66slzXXea6bt3Sg/jbVWLAHqiTklpL+vuQIUO4/CdJAZIOuK7brVSRessp6YOwKulo3759h+bl5alq1ar68ssv9fr1a61evTpR0hhJYY7jZJcm4BIx7LpurKS7ERERQ7/99luFhoYqMzNTN2/e1Js3b9SiRYuZkn6RNLE0wZYYsKQByKFy5cqqX7++Ll26pG7duumrr77SZ599pokTDecV775SXSUFXEHSi7CwMK1du1Y1atQwoN98841yc3O1bds27nns3Veqq2xhX+AAnzoQzY4cOVI7duzQs2fP9Pnnnys8PFwPHz7Mv09hjpFdEn37AfYOWCapraTn/+TZXypVqmSaHTRokMni5MmTVnQUobfKSzpWyPMBruselRTnOM71ogJ2PgJ2l6SzknZmZGSkrF+/Xvfu3TMgV69e1bt37yz1DRo00LVr13TmzBl17tzZ2H3//r3dt3fvXjVt2lSxsbFat24d+6ply5aWEaRz7NgxTZ06lT2WS+olqZ/jOKeKArggw7MBm5OT0z83N7d/uXLldPnyZapemzdv1t27dxUcHKzq1avbwRcuXFDdunUNJExz/fvvv1fv3r316NEjLV261MDyfWBgoJ4/f67GjRurYsWK2rBhg6Kjo2ODgoJWS0qR1L0ogAsWHVV9iMLhQJikoJ48eWIM9ejRw8DDXLVq1RQZGWmAHMcxRmGcLLx69UoXL160661atVKvXr0UEBCgWrVq6f79+0pPT1eHDh304sUL7du3byjy82qm2IAr5OXlJZctW1ZBQUFasmSJvv76ayuit2/fWqqxstu3bwv9otV27drpyJEj9h2AHj9+rOPHj1tA3333nTG7e/du0zf3lS9f3iQEywRbp04debVSIsC6deuWWRMAO3XqZNVPc0AObI4UypQpY9LIyMgw4CEhIablAwcO6Ny5czp8+LAVIfchE9gkA8hh06ZN5tfomeDYvzjLDzAFQfQn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" style={{width: `44px`, height: `44px`}}/>
                            </Position>
                        </Bodymedia>
                        <Dragcontent ref={dragRef}>
                            <Titledrag>Kéo sang phải để hoàn thiện bức hình</Titledrag>
                            <ContentProgess className={`${!drag?'drag-translate':''} ${state.error_drag?'error-drag':''}`} drag={drag ||state.error_drag?true:false} style={{width: `44px`, transform: `scaleX(${1+dx/44})`}}></ContentProgess>
                            <Relative>
                                <div onMouseDown={()=>setDrag(true)} className={`_2vvqCt ${state.error_drag?'error-btn':''} ${drag?'':'_4lItOR'} _4kKzuv`} style={{width: `40px`, height: `40px`, transform: `translateX(${dx}px)`}}>
                                    <div>
                                        <div className="G3AxnX">
                                            {state.error_drag?
                                            <svg viewBox="0 0 12 12" fill="white" width="16px" heigth="16px" style={{color:"#fff"}} ><path d="M12 .766L11.234 0 6 5.234.766 0 0 .766 5.234 6 0 11.234.766 12 6 6.766 11.234 12l.766-.766L6.766 6 12 .766z" fill="currentColor"></path></svg>:<>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="white" className="FkL4P7"><path fill-rule="evenodd" clip-rule="evenodd" d="M19.6893 12.75L12.4697 19.9697L13.5303 21.0303L22.0303 12.5303C22.3232 12.2374 22.3232 11.7626 22.0303 11.4697L13.5303 2.96967L12.4697 4.03033L19.6893 11.25L1.5 11.25L1.5 12.75L19.6893 12.75Z"></path></svg>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="white" className="nmxwzK"><path fill-rule="evenodd" clip-rule="evenodd" d="M19.6893 12.75L12.4697 19.9697L13.5303 21.0303L22.0303 12.5303C22.3232 12.2374 22.3232 11.7626 22.0303 11.4697L13.5303 2.96967L12.4697 4.03033L19.6893 11.25L1.5 11.25L1.5 12.75L19.6893 12.75Z"></path></svg>
                                        </>}
                                        </div>
                                            
                                    </div>
                                </div>
                            </Relative>
                        </Dragcontent>
                    </Modalbody>
                </div>
            </Modalcontent>
        </Modal>)}
        </> 
    )
}
const mapStateToProps = state => ({
    isAuthenticated: state.isAuthenticated
});
  
export default connect(mapStateToProps, { login,responseFb,responseGoogle })(Login);