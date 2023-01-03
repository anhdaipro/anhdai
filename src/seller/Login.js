import React, { useState } from 'react';
import {useNavigate ,Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/auth';

const Loginvendor = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '' 
    });
    let navigate = useNavigate();
    const { username, password } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = e => {
        e.preventDefault();
        login(username, password);
    };

    if(isAuthenticated) {
        window.location.href="/vendor"
     }
    return(  
        <div className="app-container">
            <div className="page-containers">
                <div className="page-content-wrapper">
                <div className="account-container grid">
                    <div data-v-79905f91="" className="col-8">
                        <div data-v-79905f91="" className="texts">
                            <div data-v-79905f91="" className="title">Bán hàng chuyên nghiệp</div> 
                            <div data-v-79905f91="" className="subtitle">Quản lý shop của bạn một cách hiệu quả hơn trên Anhdai với Anhdai - Kênh Người bán</div>
                        </div> 
                        <div data-v-79905f91="" className="image"></div>
                    </div>
                    <div data-v-79905f91="" className="col-2"></div>
                    <div data-v-79905f91="" className="col-6">
                        <div data-v-1d0455cd="" data-v-79905f91="" className="signin-panel" style={{height: 'auto'}}>
                            <div data-v-1d0455cd="" className="signin">
                                <div data-v-1d0455cd="" className="signin-form">
                                    <div data-v-1d0455cd="" className="signin-title">Đăng nhập vào Kênh Người Bán</div> 
                                    <form data-v-1d0455cd="" autocomplete="off" className="signin-form-template form--label-right" id="shop-login"> 
                                        <div data-v-1d0455cd="" className="form-item">
                                            <label for="username" className="form-item__label empty"> </label> 
                                            <div className="form-item__control">
                                                <div className="form-item__content">
                                                    <div data-v-1d0455cd="" className="input" max-length="100">
                                                        <div className="input__inner input__inner--large"> 
                                                            <input onChange={(e)=>onChange(e)} name='username' type="text" placeholder="Email/Số điện thoại/Tên đăng nhập" size="large" resize="vertical" rows="2" minrows="2" autocomplete="username" restrictiontype="input" max="Infinity" min="-Infinity" className="input__input"/> 
                                                        </div>
                                                    </div>
                                                </div>  
                                            </div>
                                        </div> 
                                        <div data-v-1d0455cd="" className="form-item">
                                            <label for="password" className="form-item__label empty"> </label> 
                                            <div className="form-item__control">
                                                <div className="form-item__content">
                                                    <div data-v-1d0455cd="" className="input" max-length="16">
                                                        <div className="input__inner input__inner--large"> 
                                                            <input onChange={(e)=>onChange(e)} name="password" type="password" placeholder="Mật Khẩu" size="large" resize="vertical" rows="2" minrows="2" autocomplete="current-password" restrictiontype="input" max="Infinity" min="-Infinity" className="input__input"/> 
                                                        </div>
                                                    </div>
                                                </div>  
                                            </div>
                                        </div>  
                                        <div data-v-1d0455cd="" className="remember">
                                            <label data-v-1d0455cd="" className="checkbox">
                                                <input type="checkbox" className="checkbox__input" value="Nhớ tôi"/> 
                                                <span className="checkbox__indicator">
                                                    <i className="icon">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M4.03033009,7.46966991 C3.73743687,7.1767767 3.26256313,7.1767767 2.96966991,7.46966991 C2.6767767,7.76256313 2.6767767,8.23743687 2.96966991,8.53033009 L6.32804531,11.8887055 C6.62093853,12.1815987 7.09581226,12.1815987 7.38870548,11.8887055 L13.2506629,6.02674809 C13.5435561,5.73385487 13.5435561,5.25898114 13.2506629,4.96608792 C12.9577697,4.6731947 12.4828959,4.6731947 12.1900027,4.96608792 L6.8583754,10.2977152 L4.03033009,7.46966991 Z"></path></svg>
                                                    </i> 
                                                </span> 
                                                <span className="checkbox__label">Nhớ tôi</span>
                                            </label> 
                                            <a data-v-1d0455cd="" href="//shopee.vn/buyer/login/reset/?next=https%3A%2F%2Fbanhang.shopee.vn" target="_blank" className="button button--link button--normal underline" style={{textDecoration: 'none'}}>
                                                <span>Quên mật khẩu?</span>
                                            </a>
                                        </div> 
                                        <div data-v-1d0455cd="" className="form-item">
                                            <label className="form-item__label empty"> </label> 
                                            <div className="form-item__control">
                                                <div className="form-item__content">
                                                    <button onClick={(e)=>onSubmit(e)} data-v-1d0455cd="" type="button" className="button btn-orange button--large button--block">
                                                        <span>Đăng nhập</span>
                                                    </button>
                                                </div>  
                                            </div>
                                        </div>
                                    </form> 
                                    <div data-v-1d0455cd="" className="main-sub-account-login"> 
                                        <div data-v-1d0455cd="" className="create-account-frame">Chưa có tài khoản Anhdai? 
                                            <button onClick={()=>navigate('/buyer/signup')} data-v-1d0455cd="" type="button" className="button button--link button--normal" style={{textDecoration: 'none'}}>
                                                <span>Tạo tài khoản</span>
                                            </button>
                                        </div> 
                                        <div data-v-1d0455cd="" className="divider-frame">
                                            <div data-v-1d0455cd="" className="main-sub-account-divider"></div> 
                                            <div data-v-1d0455cd="" className="main-sub-account-or">OR</div> 
                                            <div data-v-1d0455cd="" className="main-sub-account-divider"></div>
                                        </div> 
                                        <button onClick={()=>navigate('/buyer/login')} data-v-1d0455cd="" type="button" className="button button--large" style={{width: '100%'}}>
                                            <span>Đăng nhập với tài khoản Chính/ Phụ</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>    
    )
}
const mapStateToProps = state => ({
    isAuthenticated: state.isAuthenticated
});
  
export default connect(mapStateToProps, { login })(Loginvendor);