import {formatter,itemvariation} from "../constants"
import axios from 'axios';
import Navbar from "../containers/Navbar"
import {connect} from "react-redux"
import User from "./User"
import React, {useState, useEffect,useCallback} from 'react'
import { useParams,useLocation, Navigate,useSearchParams,Link, useNavigate } from "react-router-dom";
import { headers,expiry,showchat, showthreads,buyagain } from "../actions/auth";
import {listThreadlURL,orderURL,buyagainURL} from "../urls"
const Orderuser=(props)=>{
    const {showchat,user,showthreads,buyagain}=props
    const { id } = useParams(); // <-- access id match param here
    const [data,setData]=useState(null);
    const [state, setState] = useState({show_thread:false,show_message:false,show_media:false});
    const [params, setSearchParams] = useSearchParams();
    const [searchitem,setSearchitem]=useState({page:1,sortby:'pop'})
    const navigate=useNavigate()
    if(expiry<=0 || localStorage.token=='null'){
        window.location.href="/buyer/login"
    }
    useEffect(() => {
        const getJournal = async () => {
        await axios.get(orderURL+id+'?'+params,headers)
            .then(res=>{
                setData(res.data)
        })
        }
    getJournal();
    },[id,params])

    const setshowthread=(e)=>{
        e.preventDefault()
        let data={member:[user.id,data.shop.user_id],thread:null,order_id:data.id,send_to:data.user_id}
        showchat(data)
        showthreads()
    }

  return(
    <>
        <div id="main">
            <div className="_193wCc">
                <div className="item-col top container-wrapper">
                    <Navbar/>
                </div>
                <div className="containers _1QwuCJ">
                    <User
                    />
                    <div className="_3D9BVC">
                        {data!=null?
                        <div className="_2mSi0S">
                            <div className="_1rcMMD">
                                <div className="_3odSz_">
                                    <div className="_1pKQJd">
                                        <svg enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0" className="svg-icon icon-arrow-left"><g><path d="m8.5 11c-.1 0-.2 0-.3-.1l-6-5c-.1-.1-.2-.3-.2-.4s.1-.3.2-.4l6-5c .2-.2.5-.1.7.1s.1.5-.1.7l-5.5 4.6 5.5 4.6c.2.2.2.5.1.7-.1.1-.3.2-.4.2z"></path></g></svg>
                                        <span>TRỞ LẠI</span>
                                    </div>
                                    <div>
                                        <span>ID ĐƠN HÀNG. {data.ref_code}</span>
                                        <span className="_9aTWMs">|</span>
                                        <span className="_3HECdl">Đơn hàng đã bị hủy</span>
                                    </div>
                                </div>
                                <div className="_1J7vLy">
                                    <div className="DI-rNr tyOBoQ"> </div>
                                    <div className="DI-rNr _25igL4"> </div>
                                </div>
                                <div className="_2NJbNc">
                                    <div className="stepper">
                                        <div className="stepper__step stepper__step--finish">
                                            <div className="stepper__step-icon stepper__step-icon--finish">
                                                <svg enableBackground="new 0 0 32 32" viewBox="0 0 32 32" x="0" y="0" className="svg-icon icon-order-order"><g><path d="m5 3.4v23.7c0 .4.3.7.7.7.2 0 .3 0 .3-.2.5-.4 1-.5 1.7-.5.9 0 1.7.4 2.2 1.1.2.2.3.4.5.4s.3-.2.5-.4c.5-.7 1.4-1.1 2.2-1.1s1.7.4 2.2 1.1c.2.2.3.4.5.4s.3-.2.5-.4c.5-.7 1.4-1.1 2.2-1.1.9 0 1.7.4 2.2 1.1.2.2.3.4.5.4s.3-.2.5-.4c.5-.7 1.4-1.1 2.2-1.1.7 0 1.2.2 1.7.5.2.2.3.2.3.2.3 0 .7-.4.7-.7v-23.7z" fill="none" strokeLinecap="round" stroke-linejoin="round" stroke-miterlimit="10" strokeWidth="3"></path><g><line fill="none" strokeLinecap="round" stroke-miterlimit="10" strokeWidth="3" x1="10" x2="22" y1="11.5" y2="11.5"></line><line fill="none" strokeLinecap="round" stroke-miterlimit="10" strokeWidth="3" x1="10" x2="22" y1="18.5" y2="18.5"></line></g></g></svg>
                                            </div>
                                            <div className="stepper__step-text">Đơn hàng đã đặt</div>
                                            <div className="stepper__step-date">11:58 21-03-2022</div>
                                        </div>
                                        <div className="stepper__step stepper__step--finish">
                                            <div className="stepper__step-icon stepper__step-icon--finish">
                                                <svg enableBackground="new 0 0 32 32" viewBox="0 0 32 32" x="0" y="0" className="svg-icon icon-order-problem"><g><g><path d="m5 3.4v23.7c0 .4.3.7.7.7.2 0 .3 0 .3-.2.5-.4 1-.5 1.7-.5.9 0 1.7.4 2.2 1.1.2.2.3.4.5.4s.3-.2.5-.4c.5-.7 1.4-1.1 2.2-1.1s1.7.4 2.2 1.1c.2.2.3.4.5.4s.3-.2.5-.4c.5-.7 1.4-1.1 2.2-1.1.9 0 1.7.4 2.2 1.1.2.2.3.4.5.4s.3-.2.5-.4c.5-.7 1.4-1.1 2.2-1.1.7 0 1.2.2 1.7.5.2.2.3.2.3.2.3 0 .7-.4.7-.7v-23.7z" fill="none" strokeLinecap="round" stroke-linejoin="round" stroke-miterlimit="10" strokeWidth="3"></path></g><line fill="none" strokeLinecap="round" stroke-linejoin="round" stroke-miterlimit="10" strokeWidth="3" x1="16" x2="16" y1="9" y2="15"></line><circle cx="16" cy="20.5" r="2" stroke="none"></circle></g></svg>
                                            </div>
                                            <div className="stepper__step-text">Đơn hàng đã bị hủy</div>
                                            <div className="stepper__step-date">12:00 23-03-2022</div>
                                        </div>
                                        <div className="stepper__line">
                                            <div className="stepper__line-background" style={{background: 'rgb(224, 224, 224)'}}></div>
                                            <div className="stepper__line-foreground" style={{width: 'calc((100% - 140px) * 1)', background: 'rgb(45, 194, 88)'}}></div>
                                        </div>
                                    </div>
                                    <div className="_1J7vLy">
                                        <div className="DI-rNr tyOBoQ"> </div>
                                        <div className="DI-rNr _25igL4"> </div>
                                    </div>
                                    <div className="_1J7vLy">
                                        <div className="DI-rNr tyOBoQ"> </div>
                                            <div className="DI-rNr _25igL4"> </div>
                                    </div>
                                </div>
                                <div className="_1J7vLy">
                                    <div className="DI-rNr tyOBoQ"> </div>
                                    <div className="DI-rNr _25igL4"> </div>
                                </div>
                                <div>
                                    <div className="_1umrlw">
                                        <div className="_2c2kYQ">Đơn hàng đã bị hủy bởi hệ thống</div>
                                        <div className="_2iv7q8">
                                            <button onClick={e=>{
                                                buyagain(data)
                                                navigate('/cart')
                                            }} className="stardust-button stardust-button--primary _2x5SvJ">Mua lại</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="_1J7vLy">
                                    <div className="DI-rNr tyOBoQ"> </div>
                                    <div className="DI-rNr _25igL4"> </div>
                                </div>
                                <div>
                                    <div className="_1umrlw">
                                        <div className="_2c2kYQ"></div>
                                        <div className="_2iv7q8">
                                            <button className="stardust-button stardust-button--secondary _2x5SvJ">Liên hệ Người bán</button>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className="j7z7l_">
                                        <div className="_1AsWWl"></div>
                                    </div>
                                    <div className="u-QNyq">
                                        <div className="_2WaK8H">
                                            <div className="fE5sHM">Địa chỉ nhận hàng</div>
                                            <div className="_4KkgUa">
                                                <div>
                                                    <div>Nhanh</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="_2wWOHm">
                                            <div className="_2jj5D3">
                                                <div className="_2_z46i">{data.address.name}</div>
                                                <div className="_1J2b7X">
                                                    <span>(+84) {data.address.phone_number}</span>
                                                    <br/>{data.address.address}, {data.address.town}, {data.address.district}, {data.address.city}
                                                </div>
                                            </div>
                                            <div className="_3lh_J3">
                                                <div>
                                                    <div className="_38-lLD">Không có Thông tin vận chuyển.</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                    <div className="_3IcW6-">
                                        <div className="item-center">
                                            <div className="item-center WqnWb-">
                                                <div className="item-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="62" height="16" fill="none"><path fill="#EE4D2D" fillRule="evenodd" d="M0 2C0 .9.9 0 2 0h58a2 2 0 012 2v12a2 2 0 01-2 2H2a2 2 0 01-2-2V2z" clip-rule="evenodd"></path><g clip-path="url(#clip0)"><path fill="#fff" d="M8.7 13H7V8.7L5.6 6.3A828.9 828.9 0 004 4h2l2 3.3a1197.3 1197.3 0 002-3.3h1.6L8.7 8.7V13zm7.9-1.7h1.7c0 .3-.2.6-.5 1-.2.3-.5.5-1 .7l-.6.2h-.8c-.5 0-1 0-1.5-.2l-1-.8a4 4 0 01-.9-2.4c0-1 .3-1.9 1-2.6a3 3 0 012.4-1l.8.1a2.8 2.8 0 011.3.7l.4.6.3.8V10h-4.6l.2 1 .4.7.6.5.7.1c.4 0 .7 0 .9-.2l.2-.6v-.1zm0-2.3l-.1-1-.3-.3c0-.2-.1-.2-.2-.3l-.8-.2c-.3 0-.6.2-.9.5l-.3.5a4 4 0 00-.3.8h3zm-1.4-4.2l-.7.7h-1.4l1.5-2h1.1l1.5 2h-1.4l-.6-.7zm8.1 1.6H25V13h-1.7v-.5.1H23l-.7.5-.9.1-1-.1-.7-.4c-.3-.2-.4-.5-.6-.8l-.2-1.3V6.4h1.7v3.7c0 1 0 1.6.3 1.7.2.2.5.3.7.3h.4l.4-.2.3-.3.3-.5.2-1.4V6.4zM34.7 13a11.2 11.2 0 01-1.5.2 3.4 3.4 0 01-1.3-.2 2 2 0 01-.5-.3l-.3-.5-.2-.6V7.4h-1.2v-1h1.1V5h1.7v1.5h1.9v1h-2v3l.2 1.2.1.3.2.2h.3l.2.1c.2 0 .6 0 1.3-.3v1zm2.4 0h-1.7V3.5h1.7v3.4a3.7 3.7 0 01.2-.1 2.8 2.8 0 013.4 0l.4.4.2.7V13h-1.6V9.3 8.1l-.4-.6-.6-.2a1 1 0 00-.4.1 2 2 0 00-.4.2l-.3.3a3 3 0 00-.3.5l-.1.5-.1.9V13zm5.4-6.6H44V13h-1.6V6.4zm-.8-.9l1.8-2h1.8l-2.1 2h-1.5zm7.7 5.8H51v.5l-.4.5a2 2 0 01-.4.4l-.6.3-1.4.2c-.5 0-1 0-1.4-.2l-1-.7c-.3-.3-.5-.7-.6-1.2-.2-.4-.3-.9-.3-1.4 0-.5.1-1 .3-1.4a2.6 2.6 0 011.6-1.8c.4-.2.9-.3 1.4-.3.6 0 1 .1 1.5.3.4.1.7.4 1 .6l.2.5.1.5h-1.6c0-.3-.1-.5-.3-.6-.2-.2-.4-.3-.8-.3s-.8.2-1.2.6c-.3.4-.4 1-.4 2 0 .9.1 1.5.4 1.8.4.4.8.6 1.2.6h.5l.3-.2.2-.3v-.4zm4 1.7h-1.6V3.5h1.7v3.4a3.7 3.7 0 01.2-.1 2.8 2.8 0 013.4 0l.3.4.3.7V13h-1.6V9.3L56 8.1c-.1-.3-.2-.5-.4-.6l-.6-.2a1 1 0 00-.3.1 2 2 0 00-.4.2l-.3.3a3 3 0 00-.3.5l-.2.5V13z"></path></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h55v16H0z" transform="translate(4)"></path></clipPath></defs></svg>
                                                    </div>
                                                    <div onClick={(e)=>setshowthread(e)} className="_1CIbL0">{data.shop.name}</div>
                                                    <div className="_1q53YG">
                                                        <button className="stardust-button stardust-button--primary">
                                                            <svg viewBox="0 0 17 17" className="svg-icon icon-btn-chat" style={{fill: 'white'}}><g fillRule="evenodd"><path d="M13.89 0C14.504 0 15 .512 15 1.144l-.003.088-.159 2.117.162.001c.79 0 1.46.558 1.618 1.346l.024.15.008.154v9.932a1.15 1.15 0 01-1.779.963l-.107-.08-1.882-1.567-7.962.002a1.653 1.653 0 01-1.587-1.21l-.036-.148-.021-.155-.071-.836h-.01L.91 13.868a.547.547 0 01-.26.124L.556 14a.56.56 0 01-.546-.47L0 13.429V1.144C0 .512.497 0 1.11 0h12.78zM15 4.65l-.259-.001-.461 6.197c-.045.596-.527 1.057-1.106 1.057L4.509 11.9l.058.69.01.08a.35.35 0 00.273.272l.07.007 8.434-.001 1.995 1.662.002-9.574-.003-.079a.35.35 0 00-.274-.3L15 4.65zM13.688 1.3H1.3v10.516l1.413-1.214h10.281l.694-9.302zM4.234 5.234a.8.8 0 011.042-.077l.187.164c.141.111.327.208.552.286.382.131.795.193 1.185.193s.803-.062 1.185-.193c.225-.078.41-.175.552-.286l.187-.164a.8.8 0 011.042 1.209c-.33.33-.753.579-1.26.753A5.211 5.211 0 017.2 7.4a5.211 5.211 0 01-1.706-.28c-.507-.175-.93-.424-1.26-.754a.8.8 0 010-1.132z" fillRule="nonzero"></path></g></svg>
                                                            <span>chat</span>
                                                        </button>
                                                    </div>
                                                    <Link className="_2L5VLu" to={data.shop_url}>
                                                        <button className="stardust-button">
                                                            <svg enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className="svg-icon icon-btn-shop"><path d="m15 4.8c-.1-1-.8-2-1.6-2.9-.4-.3-.7-.5-1-.8-.1-.1-.7-.5-.7-.5h-8.5s-1.4 1.4-1.6 1.6c-.4.4-.8 1-1.1 1.4-.1.4-.4.8-.4 1.1-.3 1.4 0 2.3.6 3.3l.3.3v3.5c0 1.5 1.1 2.6 2.6 2.6h8c1.5 0 2.5-1.1 2.5-2.6v-3.7c.1-.1.1-.3.3-.3.4-.8.7-1.7.6-3zm-3 7c0 .4-.1.5-.4.5h-8c-.3 0-.5-.1-.5-.5v-3.1c.3 0 .5-.1.8-.4.1 0 .3-.1.3-.1.4.4 1 .7 1.5.7.7 0 1.2-.1 1.6-.5.5.3 1.1.4 1.6.4.7 0 1.2-.3 1.8-.7.1.1.3.3.5.4.3.1.5.3.8.3zm.5-5.2c0 .1-.4.7-.3.5l-.1.1c-.1 0-.3 0-.4-.1s-.3-.3-.5-.5l-.5-1.1-.5 1.1c-.4.4-.8.7-1.4.7-.5 0-.7 0-1-.5l-.6-1.1-.5 1.1c-.3.5-.6.6-1.1.6-.3 0-.6-.2-.9-.8l-.5-1-.7 1c-.1.3-.3.4-.4.6-.1 0-.3.1-.3.1s-.4-.4-.4-.5c-.4-.5-.5-.9-.4-1.5 0-.1.1-.4.3-.5.3-.5.4-.8.8-1.2.7-.8.8-1 1-1h7s .3.1.8.7c.5.5 1.1 1.2 1.1 1.8-.1.7-.2 1.2-.5 1.5z"></path></svg>
                                                            <span>Xem shop</span>
                                                        </button>
                                                    </Link>
                                                </div>
                                                <div className="_1lE6Rh"></div>
                                            </div>
                                            <div className="_24pt-Y"></div>
                                            {data.cart_item.map(cartitem=>
                                            <div key={cartitem.id} className="_1limL3">
                                                <div>
                                                    <Link className="_1BJEKe" to={`${cartitem.url}?itemId=${cartitem.item_id}`}><div>
                                                        </div>
                                                        <div className="_3huAcN">
                                                            <div className="_3btL3m">
                                                                <div className="image__wrapper">
                                                                    <div className="image__place-holder">
                                                                        <svg enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className="svg-icon icon-loading-image"><g><rect fill="none" height="8" strokeLinecap="round" stroke-linejoin="round" stroke-miterlimit="10" width="10" x="1" y="4.5"></rect><line fill="none" strokeLinecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="1" x2="11" y1="6.5" y2="6.5"></line><rect fill="none" height="3" strokeLinecap="round" stroke-linejoin="round" stroke-miterlimit="10" width="3" x="11" y="6.5"></rect><line fill="none" strokeLinecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="1" x2="11" y1="14.5" y2="14.5"></line><line fill="none" strokeLinecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="6" x2="6" y1=".5" y2="3"></line><line fill="none" strokeLinecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="3.5" x2="3.5" y1="1" y2="3"></line><line fill="none" strokeLinecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="8.5" x2="8.5" y1="1" y2="3"></line></g></svg>
                                                                    </div>
                                                                    <div className="image__content" style={{backgroundImage: `url(${cartitem.image})`}}>
                                                                        <div className="image__content--blur"> </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="_1cxKtp">
                                                                <div>
                                                                    <div className="_1xHDVY">
                                                                        <span className="_30COVM">{data.cart_item.name}</span>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className="y8ewrc">Phân loại hàng:{itemvariation(cartitem)!=''?`Phân loại hàng: ${itemvariation(cartitem)}`:''}</div>
                                                                        <div className="_2H6lAy">x{cartitem.quantity}</div>
                                                                    <span className="_1RV20z">7 ngày trả hàng</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="_1kvNGb">
                                                            <div>
                                                                <span className="_34DOjq">₫{formatter.format(cartitem.price)}</span>
                                                                <span className="mBERmM _2mEJ4q">₫{formatter.format(cartitem.total_price)}</span>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                                <div className="_3tEHtP"></div>
                                            </div>
                                            )}
                                        </div>
                                        <div className="_1l8TCL">
                                            <div className="_1FDuJg">
                                                <div className="_1bq31i">
                                                    <span>Tổng tiền hàng</span>
                                                </div>
                                                <div className="_2aXD4G">
                                                    <div>₫{formatter.format(data.total)}</div>
                                                </div>
                                            </div>
                                            <div className="_1FDuJg">
                                                <div className="_1bq31i">
                                                    <span>Phí vận chuyển</span>
                                                </div>
                                                <div className="_2aXD4G">
                                                    <div>₫43.400</div>
                                                </div>
                                            </div>
                                            <div className="_1FDuJg _3WktZ1">
                                                <div className="_1bq31i _3zO_LL">
                                                    <span>Tổng số tiền</span>
                                                </div>
                                                <div className="_2aXD4G">
                                                    <div className="_1gMI9H">₫{formatter.format(data.total_final+43000)}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="_1w7apU">
                                    <div className="_1J7vLy">
                                        <div className="DI-rNr tyOBoQ"> </div>
                                        <div className="DI-rNr _25igL4"> </div>
                                    </div>
                                    <div className="_1FDuJg">
                                        <div className="_1bq31i">
                                            <span>
                                                <span className="zO5iWv">
                                                    <span className="_2XMRor">
                                                        <svg width="16" height="17" viewBox="0 0 253 263" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clip-rule="evenodd" d="M126.5 0.389801C126.5 0.389801 82.61 27.8998 5.75 26.8598C5.08763 26.8507 4.43006 26.9733 3.81548 27.2205C3.20091 27.4677 2.64159 27.8346 2.17 28.2998C1.69998 28.7657 1.32713 29.3203 1.07307 29.9314C0.819019 30.5425 0.688805 31.198 0.689995 31.8598V106.97C0.687073 131.07 6.77532 154.78 18.3892 175.898C30.003 197.015 46.7657 214.855 67.12 227.76L118.47 260.28C120.872 261.802 123.657 262.61 126.5 262.61C129.343 262.61 132.128 261.802 134.53 260.28L185.88 227.73C206.234 214.825 222.997 196.985 234.611 175.868C246.225 154.75 252.313 131.04 252.31 106.94V31.8598C252.31 31.1973 252.178 30.5414 251.922 29.9303C251.667 29.3191 251.292 28.7649 250.82 28.2998C250.35 27.8358 249.792 27.4696 249.179 27.2225C248.566 26.9753 247.911 26.852 247.25 26.8598C170.39 27.8998 126.5 0.389801 126.5 0.389801Z" fill="#ee4d2d"></path><path fillRule="evenodd" clip-rule="evenodd" d="M207.7 149.66L119.61 107.03C116.386 105.472 113.914 102.697 112.736 99.3154C111.558 95.9342 111.772 92.2235 113.33 88.9998C114.888 85.7761 117.663 83.3034 121.044 82.1257C124.426 80.948 128.136 81.1617 131.36 82.7198L215.43 123.38C215.7 120.38 215.85 117.38 215.85 114.31V61.0298C215.848 60.5592 215.753 60.0936 215.57 59.6598C215.393 59.2232 215.128 58.8281 214.79 58.4998C214.457 58.1705 214.063 57.909 213.63 57.7298C213.194 57.5576 212.729 57.4727 212.26 57.4798C157.69 58.2298 126.5 38.6798 126.5 38.6798C126.5 38.6798 95.31 58.2298 40.71 57.4798C40.2401 57.4732 39.7735 57.5602 39.3376 57.7357C38.9017 57.9113 38.5051 58.1719 38.1709 58.5023C37.8367 58.8328 37.5717 59.2264 37.3913 59.6604C37.2108 60.0943 37.1186 60.5599 37.12 61.0298V108.03L118.84 147.57C121.591 148.902 123.808 151.128 125.129 153.884C126.45 156.64 126.797 159.762 126.113 162.741C125.429 165.72 123.755 168.378 121.363 170.282C118.972 172.185 116.006 173.221 112.95 173.22C110.919 173.221 108.915 172.76 107.09 171.87L40.24 139.48C46.6407 164.573 62.3785 186.277 84.24 200.16L124.49 225.7C125.061 226.053 125.719 226.24 126.39 226.24C127.061 226.24 127.719 226.053 128.29 225.7L168.57 200.16C187.187 188.399 201.464 170.892 209.24 150.29C208.715 150.11 208.2 149.9 207.7 149.66Z" fill="#fff"></path></svg>
                                                    </span>
                                                </span>
                                                <span className="_3rpoqZ">Phương thức Thanh toán</span>
                                            </span>
                                        </div>
                                        <div className="_2aXD4G">
                                            <div>Tài khoản ngân hàng đã liên kết Ví </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>:''}             
                    </div>
                </div>
            </div>
        </div>
    </>     
  )
}
const mapStateToProps = state => ({
    isAuthenticated: state.isAuthenticated,user:state.user
});
export default connect(mapStateToProps,{showchat,showthreads,buyagain})(Orderuser);
