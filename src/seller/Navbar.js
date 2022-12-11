
import axios from 'axios';
import {infosellerURL, refreshtokenURL} from "../urls"
import { headers, logout,expiry, login } from '../actions/auth';
import { connect } from 'react-redux';
import React, { useState,useEffect } from 'react';
import {useNavigate , Link,useLocation} from 'react-router-dom';
const Navbar = ({ logout, isAuthenticated,user }) => {
    const location = useLocation();
    const [state, setState] = useState({loading:false,username:null,image:null});
    let navigate = useNavigate();
    useEffect(() => {
        const info= async () =>{
            if(expiry<=0 && !localStorage.token){
                window.location.href="/vendor/login"
            }
            await axios.get(infosellerURL,headers)
            .then(res=>{
                setState({...state,username:res.data.name,avatar:res.data.avatar})
                
            })
        }
        info();
    }, [])
    useEffect(()=>{
        if(user){
            setTimeout(()=>{
                axios.post(`${refreshtokenURL}/${user.id}`)
                .then(res=>{
                    localStorage.setItem("expirationDate", res.data.access_expires);
                })
            },72000)
        }
    },[user])
    
    const logout_user=(e)=> {
        logout();  
    };
   
    const viewaccount=()=>{
        setState({...state,view_account:true})
    };
    const hideaccount=()=>{
        setState({...state,view_account:false})
    };
   

    return(
        <div data-v-294196ab="" className="header-bar">
            <div data-v-294196ab="" className="header-content">
                <Link data-v-294196ab="" to="/vendor" className="header-logo">
                   
                </Link> 
                <div data-v-294196ab="" className="content-box">
                    <Link data-v-294196ab="" to="/vendor" className="breadcrumb-text">Kênh Người Bán</Link> 
                </div>
                {location.pathname!=='/signin'?<>
                <div onMouseEnter={()=>viewaccount()} onMouseLeave={()=>hideaccount()} data-v-294196ab="" style={{position: 'relative'}}>
                    <div  data-v-294196ab="" className="popover popover--light">
                        <div className="popover__ref">
                            <div data-v-294196ab="" className="account-info-box">
                                <div data-v-294196ab="" className="account-info">
                                    <img data-v-294196ab="" src={state.avatar} className="account-avatar"/> 
                                    <span data-v-294196ab="" className="account-name">{state.username}</span>
                                </div>
                            </div> 
                        </div> 
                        <div className="popper popover__popper popover__popper--light with-arrow headbar-account-tooltip" style={{maxWidth: '300px', position: 'absolute', zIndex: 1, willChange: 'top, left', transformOrigin: 'center top', top: '50px', left: '0px', display: `${state.view_account?'':'none'}`}} x-placement="bottom">
                            <div className="">
                                <ul data-v-294196ab="">
                                    <li data-v-294196ab="" className="account-dropdown-item">
                                        <span data-v-294196ab="" className="icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M23.9 12.9l-1.6-1.6 6.2-6.2 1.6 1.6-6.2 6.2zM32 4.8l-1.6-1.6-1 1L31 5.8l1-1zM19.7 15.6l2.6-1.4-1.3-1.3-1.3 2.7zm8.6-4v16.3c0 .9-.7 1.6-1.6 1.6H1.6c-.9 0-1.6-.7-1.6-1.6V6.2c0-.9.7-1.6 1.6-1.6h24.2l-2 2H2v11.9l5.6-3.8 7.2 6.1 6.7-3 4.7 4.1v-8.4l2.1-1.9zm-2 15.9v-2.9l-5.1-4.4-6.7 3-7-6L2 21v6.5h24.3z"></path></svg>
                                        </span> 
                                        <span data-v-294196ab="" className="text">Hồ Sơ Shop</span>
                                    </li> 
                                    <li data-v-294196ab="" className="account-dropdown-item">
                                        <span data-v-294196ab="" className="icon">
                                            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M31.77 15.42a.93.93 0 0 1 .21.52 1 1 0 0 1-.26.62l-8.07 8a1 1 0 1 1-1.38-1.38L28.62 17H5a1 1 0 0 1-1-1 1 1 0 0 1 1-1h23.6l-6.32-6.33a1 1 0 1 1 1.38-1.38s8.08 8.09 8.11 8.13zM16 4a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v24a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3h2v4a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4h-2z" fillRule="evenodd"></path></svg>
                                        </span> 
                                        <span onClick={(e)=>logout_user(e)} data-v-294196ab="" className="text">Đăng xuất</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div data-v-294196ab="" className="header-action">
                    <div data-v-4e871ba4="" className="popover popover--light" data-v-294196ab="">
                        <div className="popover__ref">
                            <div data-v-4e871ba4="" className="dropdown-button-box">
                                <div data-v-4e871ba4="" className="dropdown-button">
                                    <i data-v-4e871ba4="" className="dropdown-button-icon icon">
                                        <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M1 1.282v1.436c0 .181.002.245.007.275.03.005.094.007.275.007h1.436c.181 0 .245-.002.275-.007.005-.03.007-.094.007-.275V1.282c0-.181-.002-.245-.007-.275A2.248 2.248 0 0 0 2.718 1H1.282c-.181 0-.245.002-.275.007-.005.03-.007.094-.007.275zM1.282 0h1.436c.446 0 .607.046.77.134.163.087.291.215.378.378.088.163.134.324.134.77v1.436c0 .446-.046.607-.134.77a.909.909 0 0 1-.378.378c-.163.088-.324.134-.77.134H1.282c-.446 0-.607-.046-.77-.134a.909.909 0 0 1-.378-.378C.046 3.325 0 3.164 0 2.718V1.282C0 .836.046.675.134.512A.909.909 0 0 1 .512.134C.675.046.836 0 1.282 0zM1 7.282v1.436c0 .181.002.245.007.275.03.005.094.007.275.007h1.436c.181 0 .245-.002.275-.007.005-.03.007-.094.007-.275V7.282c0-.181-.002-.245-.007-.275A2.248 2.248 0 0 0 2.718 7H1.282c-.181 0-.245.002-.275.007-.005.03-.007.094-.007.275zM1.282 6h1.436c.446 0 .607.046.77.134.163.087.291.215.378.378.088.163.134.324.134.77v1.436c0 .446-.046.607-.134.77a.909.909 0 0 1-.378.378c-.163.088-.324.134-.77.134H1.282c-.446 0-.607-.046-.77-.134a.909.909 0 0 1-.378-.378C.046 9.325 0 9.164 0 8.718V7.282c0-.446.046-.607.134-.77a.909.909 0 0 1 .378-.378C.675 6.046.836 6 1.282 6zM1 13.282v1.436c0 .181.002.245.007.275.03.005.094.007.275.007h1.436c.181 0 .245-.002.275-.007.005-.03.007-.094.007-.275v-1.436c0-.181-.002-.245-.007-.275A2.248 2.248 0 0 0 2.718 13H1.282c-.181 0-.245.002-.275.007-.005.03-.007.094-.007.275zM1.282 12h1.436c.446 0 .607.046.77.134.163.087.291.215.378.378.088.163.134.324.134.77v1.436c0 .446-.046.607-.134.77a.909.909 0 0 1-.378.378c-.163.088-.324.134-.77.134H1.282c-.446 0-.607-.046-.77-.134a.909.909 0 0 1-.378-.378c-.088-.163-.134-.324-.134-.77v-1.436c0-.446.046-.607.134-.77a.909.909 0 0 1 .378-.378c.163-.088.324-.134.77-.134zM7 1.282v1.436c0 .181.002.245.007.275.03.005.094.007.275.007h1.436c.181 0 .245-.002.275-.007.005-.03.007-.094.007-.275V1.282c0-.181-.002-.245-.007-.275A2.248 2.248 0 0 0 8.718 1H7.282c-.181 0-.245.002-.275.007-.005.03-.007.094-.007.275zM7.282 0h1.436c.446 0 .607.046.77.134.163.087.291.215.378.378.088.163.134.324.134.77v1.436c0 .446-.046.607-.134.77a.909.909 0 0 1-.378.378c-.163.088-.324.134-.77.134H7.282c-.446 0-.607-.046-.77-.134a.909.909 0 0 1-.378-.378C6.046 3.325 6 3.164 6 2.718V1.282c0-.446.046-.607.134-.77a.909.909 0 0 1 .378-.378C6.675.046 6.836 0 7.282 0zM7 7.282v1.436c0 .181.002.245.007.275.03.005.094.007.275.007h1.436c.181 0 .245-.002.275-.007.005-.03.007-.094.007-.275V7.282c0-.181-.002-.245-.007-.275A2.248 2.248 0 0 0 8.718 7H7.282c-.181 0-.245.002-.275.007-.005.03-.007.094-.007.275zM7.282 6h1.436c.446 0 .607.046.77.134.163.087.291.215.378.378.088.163.134.324.134.77v1.436c0 .446-.046.607-.134.77a.909.909 0 0 1-.378.378c-.163.088-.324.134-.77.134H7.282c-.446 0-.607-.046-.77-.134a.909.909 0 0 1-.378-.378C6.046 9.325 6 9.164 6 8.718V7.282c0-.446.046-.607.134-.77a.909.909 0 0 1 .378-.378c.163-.088.324-.134.77-.134zM7 13.282v1.436c0 .181.002.245.007.275.03.005.094.007.275.007h1.436c.181 0 .245-.002.275-.007.005-.03.007-.094.007-.275v-1.436c0-.181-.002-.245-.007-.275A2.248 2.248 0 0 0 8.718 13H7.282c-.181 0-.245.002-.275.007-.005.03-.007.094-.007.275zM7.282 12h1.436c.446 0 .607.046.77.134.163.087.291.215.378.378.088.163.134.324.134.77v1.436c0 .446-.046.607-.134.77a.909.909 0 0 1-.378.378c-.163.088-.324.134-.77.134H7.282c-.446 0-.607-.046-.77-.134a.909.909 0 0 1-.378-.378c-.088-.163-.134-.324-.134-.77v-1.436c0-.446.046-.607.134-.77a.909.909 0 0 1 .378-.378c.163-.088.324-.134.77-.134zM13 1.282v1.436c0 .181.002.245.007.275.03.005.094.007.275.007h1.436c.181 0 .245-.002.275-.007.005-.03.007-.094.007-.275V1.282c0-.181-.002-.245-.007-.275A2.248 2.248 0 0 0 14.718 1h-1.436c-.181 0-.245.002-.275.007-.005.03-.007.094-.007.275zM13.282 0h1.436c.446 0 .607.046.77.134.163.087.291.215.378.378.088.163.134.324.134.77v1.436c0 .446-.046.607-.134.77a.909.909 0 0 1-.378.378c-.163.088-.324.134-.77.134h-1.436c-.446 0-.607-.046-.77-.134a.909.909 0 0 1-.378-.378c-.088-.163-.134-.324-.134-.77V1.282c0-.446.046-.607.134-.77a.909.909 0 0 1 .378-.378c.163-.088.324-.134.77-.134zM13 7.282v1.436c0 .181.002.245.007.275.03.005.094.007.275.007h1.436c.181 0 .245-.002.275-.007.005-.03.007-.094.007-.275V7.282c0-.181-.002-.245-.007-.275A2.248 2.248 0 0 0 14.718 7h-1.436c-.181 0-.245.002-.275.007-.005.03-.007.094-.007.275zM13.282 6h1.436c.446 0 .607.046.77.134.163.087.291.215.378.378.088.163.134.324.134.77v1.436c0 .446-.046.607-.134.77a.909.909 0 0 1-.378.378c-.163.088-.324.134-.77.134h-1.436c-.446 0-.607-.046-.77-.134a.909.909 0 0 1-.378-.378c-.088-.163-.134-.324-.134-.77V7.282c0-.446.046-.607.134-.77a.909.909 0 0 1 .378-.378c.163-.088.324-.134.77-.134zM13 13.282v1.436c0 .181.002.245.007.275.03.005.094.007.275.007h1.436c.181 0 .245-.002.275-.007.005-.03.007-.094.007-.275v-1.436c0-.181-.002-.245-.007-.275a2.248 2.248 0 0 0-.275-.007h-1.436c-.181 0-.245.002-.275.007-.005.03-.007.094-.007.275zM13.282 12h1.436c.446 0 .607.046.77.134.163.087.291.215.378.378.088.163.134.324.134.77v1.436c0 .446-.046.607-.134.77a.909.909 0 0 1-.378.378c-.163.088-.324.134-.77.134h-1.436c-.446 0-.607-.046-.77-.134a.909.909 0 0 1-.378-.378c-.088-.163-.134-.324-.134-.77v-1.436c0-.446.046-.607.134-.77a.909.909 0 0 1 .378-.378c.163-.088.324-.134.77-.134z" fillRule="evenodd"></path></svg>
                                    </i>
                                </div>
                            </div> 
                        </div> 
                        <div className="popper popover__popper popover__popper--light with-arrow category-buttons-popover" style={{display: 'none', maxWidth: '350px'}}>
                            <div className="popover__content">
                                <div data-v-4e871ba4="" className="category-popover-box">
                                    <div data-v-de245ce2="" data-v-4e871ba4="" className="category-item">
                                        <div data-v-de245ce2="" className="item-container">
                                            <div data-v-de245ce2="" className="item-icon" style={{backgroundImage: `url(&quot;https://deo.shopeemobile.com/shopee/seller-live-sg/rootpages/static/framework/image/bg-wallet.b00fc46.png&quot;)`}}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M27.4 30H4.6c-1 0-1.8-.8-1.8-1.8V10.7c0-1 .8-1.8 1.8-1.8l21-7c1 0 1.8.8 1.8 1.8V9c1 0 1.8.8 1.8 1.8v17.5c-.1.9-.8 1.7-1.8 1.7zM25.6 4.6c0-.5-.4-.9-.9-.9L10.3 9h15.3V4.6zm1.8 14.9h-3.5v1.8h3.5v-1.8zm0 3.5h-5.3v-5.3h5.3v-6.1c0-.5-.4-.9-.9-.9h-21c-.5 0-.9.4-.9.9v15.8c0 .5.4.9.9.9h21c.5 0 .9-.4.9-.9V23z"></path></svg>
                                            </div>
                                        </div> 
                                        <span data-v-de245ce2="" className="item-name">Số dư TK Shopee</span>
                                    </div>
                                </div> 
                            </div>
                        </div>
                    </div>
                    <div data-v-72fcd3b1="" className="header-notification" data-v-294196ab="" style={{margin: '0px 8px'}}>
                        <div data-v-72fcd3b1="" className="notification-box">
                            <div data-v-72fcd3b1="" className="popover popover--light">
                                <div className="popover__ref">
                                    <div data-v-72fcd3b1="" className="notification-icon-wrap">
                                        <div data-v-72fcd3b1="" className="badge-x">
                                            <button data-v-72fcd3b1="" type="button" className="notification-icon button button--link button--normal">
                                                <i className="icon">
                                                    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M10 15a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1h4zM8.5 0a.5.5 0 0 1 .5.5v.593a5.4 5.4 0 0 1 4.383 4.892l.54 7.015h.577a.5.5 0 1 1 0 1h-13a.5.5 0 1 1 0-1h.577l.54-7.015A5.4 5.4 0 0 1 7 1.093V.5a.5.5 0 0 1 .5-.5h1zM8 2a4.4 4.4 0 0 0-4.386 4.062L3.08 13h9.84l-.534-6.938A4.4 4.4 0 0 0 8 2z" fillRule="evenodd"></path></svg>
                                                </i>
                                            </button> 
                                            <sup className="badge-x__sup badge-x__sup--num badge-x__sup--fixed" style={{width: '24px', right: '12px'}}>35</sup>
                                        </div>
                                    </div> 
                                </div> 
                                <div className="popper popover__popper popover__popper--light with-arrow headbar-notification-popover" style={{display: 'none', maxWidth: '380px'}}>
                                    <div className="popover__content">
                                        <div>
                                            <div className="notification-menu">
                                                <div data-v-72fcd3b1="" className="menu-header">
                                                    <div data-v-72fcd3b1="" className="menu-header-left">Thông báo đã nhận gần đây</div> 
                                                        <button data-v-72fcd3b1="" type="button" className="button button--link button--normal">
                                                            <span>Đánh dấu đã đọc tất cả</span>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div data-v-72fcd3b1="" id="headerbar-notification-menu-body" className="menu-body has-data" style={{maxHeight: '457px'}}>
                                            </div>
                                        </div> 
                                    </div> 
                                </div> 
                            </div> 
                        </div> 
                    </div> 
                    <div data-v-294196ab="" className="education-frame">
                        <a data-v-294196ab="" href="https://banhang.shopee.vn/help/" target="_blank" className="education-hub education">Anhdai UNI</a>
                    </div>
                </div>                  
                </>:<>
                <div data-v-294196ab="" className="link-box">
                    <div data-v-294196ab="" className="link-item">
                        <a data-v-294196ab="" href="https://shopee.vn" target="_blank">Trang chủ Shopee</a> 
                        <div data-v-294196ab="" className="link-badge">MỚI</div>
                    </div> 
                    <div data-v-294196ab="" className="sns-box">
                        <div data-v-294196ab="" className="sns">
                            <a data-v-294196ab="" href="//www.facebook.com/ShopeeVN" target="_blank" className="sns-icon">
                                <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm0-1A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm-.75-2h1.5V8.8h1.875L11 7.6H8.75V7c0-.48.113-1.5.938-1.5H11V4.09c-.188-.03-.563-.09-1.313-.09C8.15 4 7.25 4.39 7.25 5.8v1.8H5v1.2h2.25V13z" fillRule="nonzero"></path></svg></a></div> <div data-v-294196ab="" className="sns"><a data-v-294196ab="" href="//instagram.com/Shopee_VN" target="_blank" className="sns-icon"><svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M4 0h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4zm0 1a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V4a3 3 0 0 0-3-3H4zm8 2a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-4 8.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7zm0-1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" fillRule="nonzero"></path></svg>
                            </a>
                        </div> 
                    </div>
                </div></>}
            </div>
        </div>
    )
}
const mapStateToProps = state => ({
    isAuthenticated: state.isAuthenticated,user:state.user
});

export default connect(mapStateToProps, { logout,login })(Navbar);