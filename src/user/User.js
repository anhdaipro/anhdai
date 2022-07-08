import React from 'react';
import axios from 'axios';
import {localhost} from "../constants"
import {Link} from 'react-router-dom'
import {connect} from "react-redux"
const User =({user,image}) =>{

        return(
            <div className="_36cLcR">
                <div className="_1_68zU">
                    <Link className="_2BuJEf" to="/user/account/profile">
                        <div className="avatar">
                            <div className="avatar__placeholder">
                                <svg enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className="svg-icon icon-headshot"><g><circle cx="7.5" cy="4.5" fill="none" r="3.8" stroke-miterlimit="10"></circle><path d="m1.5 14.2c0-3.3 2.7-6 6-6s6 2.7 6 6" fill="none" strokeLinecap="round" stroke-miterlimit="10"></path></g></svg>
                            </div>
                            <img className="avatar__img" src={`${image!=null?image:user!=null?user.image:''}`} />
                        </div>
                    </Link>
                    <div className="_2uLDqN">
                        <div className="_2lG70n">{user!=null?user.username:''}</div>
                        <div>
                            <Link className="_27BCO5" to="/user/account/profile">
                                <svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" style={{marginRight: '4px'}}><path d="M8.54 0L6.987 1.56l3.46 3.48L12 3.48M0 8.52l.073 3.428L3.46 12l6.21-6.18-3.46-3.48" fill="#9B9B9B" fillRule="evenodd"></path></svg>Sửa hồ sơ
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="_1ZnP-m">
                    <div className="stardust-dropdown">
                        <div className="stardust-dropdown__item-header">
                            <Link className="_3aAm2h" to="/user/voucher-wallet">
                                <div className="_21F-bS">
                                    <img src="https://cf.shopee.vn/file/12bc9caf9344342250a67bc34cde32c3"/>
                                </div>
                                <div className="_2i7380">
                                    <span className="_3CHLlN">Tết Sale</span>
                                    <span className="_3W8r9U">
                                        <svg width="32" height="18" viewBox="0 0 32 18" fill="none"><path d="M1 9C1 4.58172 4.58172 1 9 1H23C27.4183 1 31 4.58172 31 9C31 13.4183 27.4183 17 23 17H1V9Z" fill="#EE4D2D"></path><path d="M12.4111 12H11.1758L8.00684 6.95605V12H6.77148V4.89062H8.00684L11.1855 9.9541V4.89062H12.4111V12ZM16.083 12.0977C15.3311 12.0977 14.7207 11.8617 14.252 11.3896C13.7865 10.9144 13.5537 10.2829 13.5537 9.49512V9.34863C13.5537 8.82129 13.6546 8.35091 13.8564 7.9375C14.0615 7.52083 14.348 7.19694 14.7158 6.96582C15.0837 6.7347 15.4938 6.61914 15.9463 6.61914C16.6657 6.61914 17.2207 6.84863 17.6113 7.30762C18.0052 7.7666 18.2021 8.41602 18.2021 9.25586V9.73438H14.75C14.7858 10.1706 14.9307 10.5156 15.1846 10.7695C15.4417 11.0234 15.764 11.1504 16.1514 11.1504C16.695 11.1504 17.1377 10.9307 17.4795 10.4912L18.1191 11.1016C17.9076 11.4173 17.6243 11.6631 17.2695 11.8389C16.918 12.0114 16.5225 12.0977 16.083 12.0977ZM15.9414 7.57129C15.6159 7.57129 15.3522 7.68522 15.1504 7.91309C14.9518 8.14095 14.8249 8.45833 14.7695 8.86523H17.0303V8.77734C17.0042 8.38021 16.8984 8.08073 16.7129 7.87891C16.5273 7.67383 16.2702 7.57129 15.9414 7.57129ZM23.7686 10.3643L24.6084 6.7168H25.7656L24.3252 12H23.3486L22.2158 8.37207L21.1025 12H20.126L18.6807 6.7168H19.8379L20.6924 10.3252L21.7764 6.7168H22.6699L23.7686 10.3643Z" fill="white"></path><path d="M1 17H0V18H1V17ZM9 2H23V0H9V2ZM23 16H1V18H23V16ZM2 17V9H0V17H2ZM30 9C30 12.866 26.866 16 23 16V18C27.9706 18 32 13.9706 32 9H30ZM23 2C26.866 2 30 5.13401 30 9H32C32 4.02944 27.9706 0 23 0V2ZM9 0C4.02944 0 0 4.02944 0 9H2C2 5.13401 5.13401 2 9 2V0Z" fill="white"></path></svg>
                                    </span>
                                </div>
                            </Link>
                        </div>
                        <div className="stardust-dropdown__item-body">
                            <div className="_3aiYwk">
                                <Link className="_3SsG4j" to="/user/voucher-wallet">
                                    <span className="_2PrdXX">Kho voucher của bạn</span>
                                </Link>
                                <Link className="_3SsG4j" to="/tet-sieu-sale ">
                                    <span className="_2PrdXX">Mua 1 tặng 1</span>
                                </Link>
                                <Link className="_3SsG4j" to="/m/khung-gio-san-sale ">
                                    <span className="_2PrdXX">Khung giờ săn sale</span>
                                </Link>
                                <Link className="_3SsG4j" to="/m/cashback ">
                                    <span className="_2PrdXX">Hoàn xu 88%</span>
                                </Link>
                                <Link className="_3SsG4j" to="/m/ma-giam-gia ">
                                    <span className="_2PrdXX">Voucher 88K</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="stardust-dropdown stardust-dropdown--open">
                        <div className="stardust-dropdown__item-header">
                            <Link className="_3aAm2h" to="/user/account/profile">
                                <div className="_21F-bS">
                                    <img src="https://cf.shopee.vn/file/ba61750a46794d8847c3f463c5e71cc4"/>
                                </div>
                                <div className="_2i7380">
                                    <span className="_3CHLlN">Tài khoản của tôi</span>
                                </div>
                            </Link>
                        </div>
                        <div className="stardust-dropdown__item-body stardust-dropdown__item-body--open" style={{opacity: 1}}>
                            <div className="_3aiYwk">
                                <Link className="_3SsG4j _3SzYTH" to="/user/account/profile">
                                    <span className="_2PrdXX">Hồ sơ</span>
                                </Link>
                                <Link className="_3SsG4j" to="/user/account/payment">
                                    <span className="_2PrdXX">Ngân hàng</span>
                                </Link>
                                <Link className="_3SsG4j" to="/user/account/address">
                                    <span className="_2PrdXX">Địa chỉ</span>
                                </Link><Link className="_3SsG4j" to="/user/account/password">
                                    <span className="_2PrdXX">Đổi mật khẩu</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="stardust-dropdown">
                        <div className="stardust-dropdown__item-header">
                            <Link className="_3aAm2h" to="/user/account/purchase">
                                <div className="_21F-bS">
                                    <img src="https://cf.shopee.vn/file/f0049e9df4e536bc3e7f140d071e9078"/>
                                </div>
                                <div className="_2i7380">
                                    <span className="_3CHLlN">Đơn Mua</span>
                                </div>
                            </Link>
                        </div>
                        <div className="stardust-dropdown__item-body">
                            <div className="_3aiYwk"></div>
                        </div>
                    </div>
                    <div className="stardust-dropdown">
                        <div className="stardust-dropdown__item-header">
                            <Link className="_3aAm2h" to="/user/notifications/cart">
                                <div className="_21F-bS">
                                    <img src="https://cf.shopee.vn/file/e10a43b53ec8605f4829da5618e0717c"/>
                                </div>
                                <div className="_2i7380">
                                    <span className="_3CHLlN">Thông báo</span>
                                </div>
                            </Link>
                        </div>
                        <div className="stardust-dropdown__item-body">
                            <div className="_3aiYwk">
                                <Link className="_3SsG4j" to="/user/notifications/cart">
                                    <span className="_2PrdXX">Cập nhật đơn hàng</span>
                                </Link>
                                <Link className="_3SsG4j" to="/user/notifications/promotion">
                                    <span className="_2PrdXX">Khuyến mãi</span>
                                </Link>
                                <Link className="_3SsG4j" to="/user/notifications/wallet">
                                    <span className="_2PrdXX">Cập nhật Ví</span>
                                </Link>
                                <Link className="_3SsG4j" to="/user/notifications/activity">
                                    <span className="_2PrdXX">Hoạt động</span>
                                </Link>
                                <Link className="_3SsG4j" to="/user/notifications/rating"><
                                    span className="_2PrdXX">Cập nhật đánh giá</span>
                                </Link>
                                <Link className="_3SsG4j" to="/user/notifications/shopee">
                                    <span className="_2PrdXX">Cập nhật Anhdai</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="stardust-dropdown">
                        <div className="stardust-dropdown__item-header">
                            <Link className="_3aAm2h" to="/user/voucher-wallet">
                                <div className="_21F-bS">
                                    <img src="https://cf.shopee.vn/file/84feaa363ce325071c0a66d3c9a88748"/>
                                </div>
                                <div className="_2i7380">
                                    <span className="_3CHLlN">Kho Voucher</span>
                                </div>
                            </Link>
                        </div>
                        <div className="stardust-dropdown__item-body">
                            <div className="_3aiYwk"></div>
                        </div>
                    </div>
                    <div className="stardust-dropdown">
                        <div className="stardust-dropdown__item-header">
                            <Link className="_3aAm2h" to="/user/coin">
                                <div className="_21F-bS">
                                    <img src="https://cf.shopee.vn/file/a0ef4bd8e16e481b4253bd0eb563f784"/>
                                </div>
                                <div className="_2i7380">
                                    <span className="_3CHLlN">Anhdai Xu</span>
                                </div>
                            </Link>
                        </div>
                        <div className="stardust-dropdown__item-body">
                            <div className="_3aiYwk"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
}

export default User