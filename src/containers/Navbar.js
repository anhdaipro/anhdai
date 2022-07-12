
import axios from 'axios';
import {formatter,} from "../constants"
import {cartviewURL,categoryhomeURL} from "../urls"
import { logout,headers,expiry } from '../actions/auth';
import { connect } from 'react-redux';
import React, { Fragment, useState,useEffect } from 'react';
import {useNavigate , Link,useLocation,useSearchParams} from 'react-router-dom';
const Navbar = ({ logout, isAuthenticated,data,cartitem,image,user}) => {
    const location = useLocation();
    const [state, setState] = useState({category_home:[],items:[],user_name:null,loading:false,show_choice:false});
    const [keyword,setKeyword]=useState(null);
    const [category,setCategory]=useState([]);
    const [searchchoice,setSearchchoice]=useState(null);
    const [params, setSearchParams] = useSearchParams();
    let navigate=useNavigate();
    console.log(location)
    useEffect(() =>  {
        
        setSearchchoice(data!=undefined?data:null)
    },[data])
    
    useEffect(() =>  {
        if(expiry>0 && localStorage.token!=='null'){
            (async () => {
                try {
                await isAuthenticated
                  const res = await axios.get(cartviewURL,headers)
                  setState({...state,loading:true,view:false,view_account:false,items:res.data.a,user_name:res.data.user_name,image:res.data.image,count:res.data.count}) 
                } catch (error) {
                  console.log(error);
                }
            })();
        }
    }, []);

    
    useEffect(() =>  {
        (async () => {
            try {
            const res = await axios.get(categoryhomeURL)
                  setCategory(res.data)
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    let count_item=state.count
    let list_items=state.items
    if(cartitem!=undefined){
        count_item=state.count+cartitem.length
        list_items=[...cartitem,...state.items]
    }
    
    const logout_user=(e)=> {
        logout();
        window.location.href=`/buyer/login?next=${window.location}`
    };
    
    console.log(localStorage.getItem('access'))
    const viewcart=()=>{
        setState({...state,view:true})
        
    };
    const hidecart=()=>{
        setState({...state,view:false})
    };
    const viewaccount=()=>{
        setState({...state,view_account:true})
    };
    const hideaccount=()=>{
        setState({...state,view_account:false})
    };
    
    console.log(params)
    
    const searchitem=()=>{
        
        if(searchchoice!=null){
        navigate(`/search?keyword=${keyword}&${searchchoice.shop!=undefined?`shop=${data.shop.name}`:`category=${data.category_info.id}`}`)
        }
        else{
            navigate(`/search?keyword=${keyword}`)
        }
    }
        return(
            <>
                <div className="navbar-content">
                    <div className="containers item-center">
                    <div className="item-center">
                        <div className="item-center">
                            <Link className="waves-effect" to="/vendor">
                                <span className="clearfix"> Seller channel </span>
                            </Link>
                        </div>
                        <div className="item-center mx-1">
                            <a className=" waves-effect" href="#">
                                <span className=" mx-1"> Dowload app </span>
                                <span className="mr-1"> Conection </span>
                            </a>
                            <a className="waves-effect header-navbar-background header-navbar-facebook-png" href="#"></a>
                            <a className="waves-effect header-navbar-background header-navbar-instagram-png" href="#"></a>
                        </div>
                    </div>
                    <div className="navbar__spacer"></div>
                    <div className="item-center">
                        <div role="button" className="stardust-popover__target item-center pr-2">
                            <Link className="_183uD9 item-center" to="/user/notifications/cart">
                                <svg viewBox="3 2.5 14 14" x="0" y="0" className="svg-icon icon-notification-2"><path d="m17 15.6-.6-1.2-.6-1.2v-7.3c0-.2 0-.4-.1-.6-.3-1.2-1.4-2.2-2.7-2.2h-1c-.3-.7-1.1-1.2-2.1-1.2s-1.8.5-2.1 1.3h-.8c-1.5 0-2.8 1.2-2.8 2.7v7.2l-1.2 2.5-.2.4h14.4zm-12.2-.8.1-.2.5-1v-.1-7.6c0-.8.7-1.5 1.5-1.5h6.1c.8 0 1.5.7 1.5 1.5v7.5.1l.6 1.2h-10.3z"></path><path d="m10 18c1 0 1.9-.6 2.3-1.4h-4.6c.4.9 1.3 1.4 2.3 1.4z"></path></svg>
                                <span className="pl-1_2">Thông báo</span>
                            </Link>
                        </div>
                        <Link className="navbar__link item-center navbar__link--hoverable" to="/" target="_blank" rel="noopener noreferrer">
                            <div className="navbar__help-center-icon">
                                <svg height="16" viewBox="0 0 16 16" width="16" className="svg-icon icon-help-center"><g fill="none" fillRule="evenodd" transform="translate(1)"><circle cx="7" cy="8" r="7" stroke="currentColor"></circle><path fill="currentColor" d="m6.871 3.992c-.814 0-1.452.231-1.914.704-.462.462-.693 1.089-.693 1.892h1.155c0-.484.099-.858.297-1.122.22-.319.583-.473 1.078-.473.396 0 .715.11.935.33.209.22.319.517.319.902 0 .286-.11.55-.308.803l-.187.209c-.682.605-1.1 1.056-1.243 1.364-.154.286-.22.638-.22 1.045v.187h1.177v-.187c0-.264.055-.506.176-.726.099-.198.253-.396.462-.572.517-.451.825-.737.924-.858.275-.352.418-.803.418-1.342 0-.66-.22-1.188-.66-1.573-.44-.396-1.012-.583-1.716-.583zm-.198 6.435c-.22 0-.418.066-.572.22-.154.143-.231.33-.231.561 0 .22.077.407.231.561s.352.231.572.231.418-.077.572-.22c.154-.154.242-.341.242-.572s-.077-.418-.231-.561c-.154-.154-.352-.22-.583-.22z"></path></g></svg>
                            </div>
                            <span className="navbar__link-text pl-1_2 navbar__link--hoverable">Hỗ Trợ</span>
                        </Link>
                        {user!==null?
                        <div onMouseLeave={()=>hideaccount()} onMouseEnter={()=>viewaccount()} className="item-center pl-2" id="nav">
                            <img id="img-preview2" src={image!=undefined?image:user.avatar}/>
                            <span className="pl-1_2">{user.username}</span>
                            {state.view_account?
                            <div className="log">
                                <Link to="/user/account/profile" className="navbar-account-drawer__button navbar-user-link"> Account</Link>
                                <Link to="/user/account/purchase" className="navbar-account-drawer__button navbar-user-link">Order</Link>
                                <a onClick={(e)=>logout_user(e)} className="navbar-account-drawer__button navbar-user-link">Logout</a>
                            </div>
                            :''}
                        </div>:
                        <div className="item-center ml-2">
                            <Link className=" waves-effect" to="/buyer/login">
                                <span className="">Login</span>
                            </Link>
                            <Link className=" waves-effect ml-1" to="/buyer/signup">
                                <span className="">Signup</span>
                            </Link>
                        </div>}
                    </div> 
                    </div>
                </div>
                {location.pathname!='/cart' && location.pathname!='/checkout' && location.pathname!='/payment'?
                <div className="container-wrapper header-with-search-wrapper">
                    <div className="item-center header-with-search">
                        <Link className="header-with-search__logo-section" to="/">
                            <svg className="svg-icon header-with-search__logo icon-logo" xmlns="http://www.w3.org/2000/svg" width="343.93360595703126px" height="122px" viewBox="78.03319702148437 14 343.93360595703126 122" style={{background: 'rgba(0, 0, 0, 0)'}} preserveAspectRatio="xMidYMid"><defs><filter id="editing-metal-beveled"><feGaussianBlur stdDeviation="4" in="SourceAlpha" result="blur"/><feSpecularLighting surfaceScale="5" specularConstant="0.8" specularExponent="7.5" lightingColor="#ffffff" in="blur" result="specular"><fePointLight x="-250" y="-50" z="300"/></feSpecularLighting><feComposite operator="in" in="specular" in2="SourceAlpha" result="comp"/><feComposite in="SourceGraphic" in2="comp" operator="arithmetic" k1="0" k2="1" k3="1" k4="0"/></filter></defs><g filter="url(#editing-metal-beveled)"><g transform="translate(133.06147575378418, 99)"><path d="M29.18 1.28L29.18 1.28L29.18 1.28Q20.99 1.28 20.22-10.37L20.22-10.37L9.22-10.37L9.22-10.37Q7.94-7.42 7.04-4.86L7.04-4.86L5.38 0L-3.58 0L16.58-42.24L30.34-42.24L33.02-11.14L33.02-11.14Q33.66-4.42 36.22-2.43L36.22-2.43L36.22-2.43Q34.37 1.28 29.18 1.28ZM14.72-23.17L11.20-15.04L20.03-15.04L19.26-31.49L19.26-33.22L14.72-23.17ZM67.01 1.28L67.01 1.28L67.01 1.28Q59.26 1.28 59.26-4.74L59.26-4.74L59.26-4.74Q59.33-6.40 59.84-9.22L59.84-9.22L60.99-15.10L60.99-15.10Q62.72-23.42 62.72-25.28L62.72-25.28L62.72-25.28Q62.72-28.99 60.54-28.99L60.54-28.99L60.54-28.99Q56.90-28.99 54.98-19.46L54.98-19.46L51.20 0L38.34 1.28L44.99-32.70L55.49-33.92L54.46-27.65L54.46-27.65Q57.47-33.92 66.69-33.92L66.69-33.92L66.69-33.92Q71.17-33.92 73.06-32.03L73.06-32.03L73.06-32.03Q74.94-30.14 74.94-25.92L74.94-25.92L74.94-25.92Q74.94-21.95 72.90-12.67L72.90-12.67L72.90-12.67Q71.94-8.51 71.94-6.94L71.94-6.94L71.94-6.94Q71.94-5.38 72.80-4.48L72.80-4.48L72.80-4.48Q73.66-3.58 74.94-3.46L74.94-3.46L74.94-3.46Q74.30-1.28 72.10 0L72.10 0L72.10 0Q69.89 1.28 67.01 1.28ZM112.26-7.10L112.26-7.10L112.26-7.10Q112.26-4.29 115.14-3.46L115.14-3.46L115.14-3.46Q114.43-1.09 111.68 0.19L111.68 0.19L111.68 0.19Q109.38 1.28 106.85 1.28L106.85 1.28L106.85 1.28Q104.32 1.28 103.01 0.61L103.01 0.61L103.01 0.61Q101.70-0.06 100.99-1.15L100.99-1.15L100.99-1.15Q99.84-2.82 99.84-5.95L99.84-5.95L99.84-5.95Q99.84-7.81 100.86-12.93L100.86-12.93L101.76-17.79L101.76-17.79Q102.85-23.36 102.85-25.41L102.85-25.41L102.85-25.41Q102.85-28.99 100.86-28.99L100.86-28.99L100.86-28.99Q98.37-28.99 96.77-25.34L96.77-25.34L96.77-25.34Q96.13-23.94 95.68-21.82L95.68-21.82L91.33 0L78.46 1.28L87.49-44.80L100.35-46.08L99.84-43.52L99.84-43.52Q98.05-33.66 96.51-30.34L96.51-30.34L96.51-30.34Q100.10-33.92 106.69-33.92L106.69-33.92L106.69-33.92Q113.66-33.92 114.94-29.31L114.94-29.31L114.94-29.31Q115.39-27.84 115.39-26.56L115.39-26.56L115.39-26.56Q115.39-25.28 115.30-24.29L115.30-24.29L115.30-24.29Q115.20-23.30 114.88-21.50L114.88-21.50L114.05-16.90L112.58-9.66L112.58-9.66Q112.26-8.19 112.26-7.10ZM153.66-33.92L153.66-33.92L153.66-33.92Q155.97-33.92 157.76-33.41L157.76-33.41L157.76-33.41Q157.82-33.66 157.95-34.37L157.95-34.37L158.27-36.35L158.27-36.35Q158.53-37.63 158.91-39.74L158.91-39.74L159.94-44.80L172.67-46.08L165.57-8.96L165.57-8.96Q165.50-8.58 165.50-7.94L165.50-7.94L165.50-6.91L165.50-6.91Q165.50-5.50 166.21-4.45L166.21-4.45L166.21-4.45Q166.91-3.39 168.06-3.39L168.06-3.39L168.06-3.39Q166.78-0.38 162.88 0.90L162.88 0.90L162.88 0.90Q161.54 1.28 159.65 1.28L159.65 1.28L159.65 1.28Q157.76 1.28 156.03 0.29L156.03 0.29L156.03 0.29Q154.30-0.70 153.79-2.37L153.79-2.37L153.79-2.37Q152.77-0.70 150.72 0.29L150.72 0.29L150.72 0.29Q148.67 1.28 145.70 1.28L145.70 1.28L145.70 1.28Q142.72 1.28 140.26 0.51L140.26 0.51L140.26 0.51Q137.79-0.26 136.26-1.92L136.26-1.92L136.26-1.92Q133.44-5.18 133.44-12.61L133.44-12.61L133.44-12.61Q133.44-22.21 139.07-28.03L139.07-28.03L139.07-28.03Q144.70-33.92 153.66-33.92ZM153.22-30.08L153.22-30.08L153.22-30.08Q150.85-30.08 149.57-27.52L149.57-27.52L149.57-27.52Q148.29-24.96 146.98-18.62L146.98-18.62L146.98-18.62Q145.66-12.29 145.66-6.59L145.66-6.59L145.66-6.59Q145.66-2.69 147.97-2.69L147.97-2.69L147.97-2.69Q150.02-2.69 151.46-4.74L151.46-4.74L151.46-4.74Q152.90-6.78 153.47-10.18L153.47-10.18L156.93-28.93L156.93-28.93Q155.58-30.08 153.22-30.08ZM176.29-1.92L176.29-1.92L176.29-1.92Q174.78-3.58 174.11-6.21L174.11-6.21L174.11-6.21Q173.44-8.83 173.44-13.12L173.44-13.12L173.44-13.12Q173.44-17.41 174.91-21.31L174.91-21.31L174.91-21.31Q176.38-25.22 179.07-28.03L179.07-28.03L179.07-28.03Q184.58-33.92 193.66-33.92L193.66-33.92L193.66-33.92Q196.93-33.92 199.30-32.83L199.30-32.83L210.24-33.92L205.50-8.96L205.50-8.96Q205.31-8.19 205.31-6.78L205.31-6.78L205.31-6.78Q205.31-5.38 206.18-4.48L206.18-4.48L206.18-4.48Q207.04-3.58 208.32-3.46L208.32-3.46L208.32-3.46Q207.68-1.28 205.34 0L205.34 0L205.34 0Q203.01 1.28 200.38 1.28L200.38 1.28L200.38 1.28Q197.76 1.28 196 0.29L196 0.29L196 0.29Q194.24-0.70 193.73-2.37L193.73-2.37L193.73-2.37Q192.70-0.77 190.53 0.26L190.53 0.26L190.53 0.26Q188.35 1.28 185.44 1.28L185.44 1.28L185.44 1.28Q182.53 1.28 180.16 0.51L180.16 0.51L180.16 0.51Q177.79-0.26 176.29-1.92ZM189.79-27.90L189.79-27.90L189.79-27.90Q189.06-26.75 188.42-24.80L188.42-24.80L188.42-24.80Q187.78-22.85 186.72-17.63L186.72-17.63L186.72-17.63Q185.66-12.42 185.66-8.70L185.66-8.70L185.66-8.70Q185.66-4.99 186.24-3.90L186.24-3.90L186.24-3.90Q186.82-2.82 187.84-2.82L187.84-2.82L187.84-2.82Q189.89-2.82 191.39-4.77L191.39-4.77L191.39-4.77Q192.90-6.72 193.47-10.18L193.47-10.18L196.86-28.93L196.86-28.93Q195.52-30.08 193.95-30.08L193.95-30.08L193.95-30.08Q192.38-30.08 191.46-29.57L191.46-29.57L191.46-29.57Q190.53-29.06 189.79-27.90ZM229.06-3.52L229.06-3.52L229.06-3.52Q227.07 1.28 220.74 1.28L220.74 1.28L220.74 1.28Q217.47 1.28 215.42-0.96L215.42-0.96L215.42-0.96Q213.70-2.94 213.70-4.93L213.70-4.93L213.70-4.93Q213.70-10.11 216.06-20.22L216.06-20.22L218.43-32.64L231.42-33.92L227.52-13.70L227.52-13.70Q226.43-8.96 226.43-7.30L226.43-7.30L226.43-7.30Q226.43-3.65 229.06-3.52ZM219.58-41.54L219.58-41.54L219.58-41.54Q219.58-44.03 221.66-45.38L221.66-45.38L221.66-45.38Q223.74-46.72 226.75-46.72L226.75-46.72L226.75-46.72Q229.76-46.72 231.58-45.38L231.58-45.38L231.58-45.38Q233.41-44.03 233.41-41.54L233.41-41.54L233.41-41.54Q233.41-39.04 231.39-37.76L231.39-37.76L231.39-37.76Q229.38-36.48 226.37-36.48L226.37-36.48L226.37-36.48Q223.36-36.48 221.47-37.76L221.47-37.76L221.47-37.76Q219.58-39.04 219.58-41.54Z" fill="#ffffff"/></g></g>
                            </svg>
                        </Link>
                        <div className="header-with-search__search-section">
                            <div className="searchbar ">
                                <div className="searchbar__main" style={{position: 'relative'}}>
                                    <form role="search" className="searchbar-input" autoComplete="off">
                                        <input onChange={(e)=>setKeyword(e.target.value)} aria-label="Hoàn xu Xtra đơn từ 0Đ" className="searchbar-input__input" style={{width:'500px'}} value={(params.get('keyword')!=keyword && params.has('keyword') && keyword!=null)||(!params.has('keyword'))?keyword:params.get('keyword')} maxLength="128" placeholder={`${searchchoice!=null?data.shop!=undefined?'Tìm trong shop':data.category_info!=undefined?`Tìm trong ${data.category_info.title}`:'Tìm trong shoppe':'Hoàn xu Xtra đơn từ 0Đ'}`} autoComplete="off" />
                                    </form>
                                    {(data!=undefined && data.category_info!=undefined) || (data!=undefined&& data.shop!=undefined) ?
                                    
                                    <div onMouseLeave={()=>setState({...state,show_choice:false})} onMouseEnter={()=>setState({...state,show_choice:true})} className="searchbar-selector">
                                        <div className="drawer " id="pc-drawer-id-11" tabindex="0">
                                            <div className="searchbar-selector__selected">
                                                <div className="searchbar-selector__selected-label">{searchchoice!=null?searchchoice.shop!=undefined?'Trong Shop này':data.category_info.title:'Trong Shopee'}</div> 
                                                <svg enable-background="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0" className="svg-icon icon-arrow-down"><g><path d="m11 2.5c0 .1 0 .2-.1.3l-5 6c-.1.1-.3.2-.4.2s-.3-.1-.4-.2l-5-6c-.2-.2-.1-.5.1-.7s.5-.1.7.1l4.6 5.5 4.6-5.5c.2-.2.5-.2.7-.1.1.1.2.3.2.4z"></path></g></svg>
                                            </div>
                                            {state.show_choice?
                                            <div className="drawer__contents" aria-describedby="pc-drawer-id-11" aria-hidden="false" style={{transitionDelay: '0.2s', right: '0px'}}>
                                                <div className="searchbar-selector__options">
                                                    <div onClick={()=>setSearchchoice('ok')} className="searchbar-selector__option">
                                                        <div className="searchbar-selector__option-label">{data.shop!=undefined?'Trong Shop này':data.category_info.title}</div> 
                                                        {searchchoice!=null?
                                                        <svg enable-background="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className="svg-icon searchbar-selector__option-tick icon-tick"><g><path d="m6.5 13.6c-.2 0-.5-.1-.7-.2l-5.5-4.8c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l4.7 4 6.8-9.4c.3-.4.9-.5 1.4-.2.4.3.5 1 .2 1.4l-7.4 10.3c-.2.2-.4.4-.7.4 0 0 0 0-.1 0z"></path></g></svg>
                                                        :''}
                                                    </div>
                                                    <div className="searchbar-selector__option">
                                                        <div onClick={()=>setSearchchoice(null)} className="searchbar-selector__option-label">Trong Shopee</div> 
                                                        {searchchoice==null?
                                                        <svg enable-background="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className="svg-icon searchbar-selector__option-tick icon-tick"><g><path d="m6.5 13.6c-.2 0-.5-.1-.7-.2l-5.5-4.8c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l4.7 4 6.8-9.4c.3-.4.9-.5 1.4-.2.4.3.5 1 .2 1.4l-7.4 10.3c-.2.2-.4.4-.7.4 0 0 0 0-.1 0z"></path></g></svg>
                                                        :''}
                                                    </div>
                                                </div>
                                            </div>:''}
                                        </div>
                                    </div>:''}
                                
                                </div>
                                <div className="item-center">
                                    <button onClick={()=>searchitem()} type="button" className="btn btn-solid-primary btn--s btn--inline">
                                        <svg height="19" viewBox="0 0 19 19" width="19" className="svg-icon "><g fillRule="evenodd" stroke="none" style={{strokeWidth: 1}}><g transform="translate(-1016 -32)"><g><g transform="translate(405 21)"><g transform="translate(611 11)"><path d="m8 16c4.418278 0 8-3.581722 8-8s-3.581722-8-8-8-8 3.581722-8 8 3.581722 8 8 8zm0-2c-3.3137085 0-6-2.6862915-6-6s2.6862915-6 6-6 6 2.6862915 6 6-2.6862915 6-6 6z"></path><path d="m12.2972351 13.7114222 4.9799555 4.919354c.3929077.3881263 1.0260608.3842503 1.4141871-.0086574.3881263-.3929076.3842503-1.0260607-.0086574-1.414187l-4.9799554-4.919354c-.3929077-.3881263-1.0260608-.3842503-1.4141871.0086573-.3881263.3929077-.3842503 1.0260608.0086573 1.4141871z"></path></g></g></g></g></g></svg>
                                    </button>
                                </div>
                            </div>
                            <div className="_1aYDEh">
                                <div className="_2MXg3O">
                                    {category.map(item=>
                                        <Link className="_2o2XQg" to={`/search?keyword=${item.title}`}>{item.title}</Link>
                                    )}
                                    
                                </div>
                            </div>
                        </div>
                        {user!=null?
                        <div onMouseLeave={()=>hidecart()} onMouseEnter={()=>viewcart()} className="stardust-popover ml-2">
                            <div aria-describedby="stardust-popover5" className="stardust-popover__target">
                                <div  className="cart-drawer-container">
                                    <Link className="cart-drawer item-center" to="/cart">
                                        <svg viewBox="0 0 26.6 25.6" className="svg-icon navbar__link-icon icon-shopping-cart-2"><polyline fill="none" points="2 1.7 5.5 1.7 9.6 18.3 21.2 18.3 24.6 6.1 7 6.1" ></polyline><circle cx="10.7" cy="23" r="2.2" stroke="none"></circle><circle cx="19.7" cy="23" r="2.2" stroke="none"></circle></svg>
                                        <div className="cart-number-badge">{count_item}</div>
                                    </Link>
                                </div>
                            </div>
                            {state.view?
                            <div className="cart_view">
                                <div className="_2VDxqS item-center">Sản phẩm mới thêm</div>
                                {
                                    list_items.map((item,index)=>{
                                        if(index<5){
                                            return(
                                            <div key={item.id} onClick={()=>navigate(`${item.item_url}`)} className='item-start cart-item'>
                                                <div className="n0eaQq" style={{backgroundImage: `url(${item.item_image})`}}></div>
                                                <div className="cart-item-name_price">
                                                    <div className="item-center">
                                                        <div className="cart-item-name">
                                                            {item.promotion?<span className="_2-s53F">Combo khuyến mãi</span>:item.shock_deal_type!=null?<span className="_2-s53F">{item.shock_deal_type=='1'?'Buy to receive gift':'Buy with shock deal'}</span>:''}
                                                            {item.item_name}
                                                        </div>
                                                        <div className="cart-item-price">₫{formatter.format(item.price)}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    })
                                }
                                <div className="item-space _14Rqcu">
                                    <div className="_2UHtwe">
                                        {count_item>5?
                                        <><span className="cart-drawer__more-items-count">{count_item-5}</span>
                                        <span> add to cart</span></>:''}
                                    </div>  
                                    <Link to="/cart" className="btn-solid-red item-center btn-m">View Cart</Link>
                                </div>
                            </div>
                            :''}
                        </div>:
                        <div className="header-with-search__cart-wrapper">
                            <div className="stardust-popover">
                                <div  aria-describedby="stardust-popover5" className="stardust-popover__target">
                                    <div className="cart-drawer-container">
                                        <Link className="cart-drawer item-center" to="buyer/login">
                                            <svg viewBox="0 0 26.6 25.6" className="svg-icon navbar__link-icon icon-shopping-cart-2"><polyline fill="none" points="2 1.7 5.5 1.7 9.6 18.3 21.2 18.3 24.6 6.1 7 6.1" style={{strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2.5,strokeMiterlimit: 10}}></polyline><circle cx="10.7" cy="23" r="2.2" stroke="none"></circle><circle cx="19.7" cy="23" r="2.2" stroke="none"></circle></svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>}
                    </div>
                </div>
                :""}
            </>  
     )
}
const mapStateToProps = state => ({
    isAuthenticated: state.isAuthenticated,user:state.user
});

export default connect(mapStateToProps, { logout })(Navbar);