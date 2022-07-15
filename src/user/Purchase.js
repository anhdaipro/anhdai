
import Navbar from "../containers/Navbar"
import User from "./User"
import axios from 'axios';
import React, {useState, useEffect,useCallback} from 'react'
import {connect} from "react-redux"
import Listreview from "../hocs/Review"

import {Link, useNavigate} from 'react-router-dom'
import {formatter,itemvariation} from "../constants"
import { headers,expiry ,showchat,showthreads} from "../actions/auth";
import {purchaselistdURL,listThreadlURL} from "../urls"
const Purchase =({user,showchat,showthreads})=>{
    const [state, setState] = useState({count_order:0,orders:[],user:null,list_type_order:[{name:'Tất cả',type:'1'},{name:'Chờ xác nhận',type:'2'},{name:'Chờ lấy hàng',type:'3'}
,{name:'Đang giao',type:'4'},{name:'Đã giao',type:'5'},{name:'Đã Hủy',type:'6'}],

    review:null,order_choice:null,show_thread:false,show_message:false,threadchoice:null});
    const [show,setShow]=useState(false)
    const [loading,setLoading]=useState(false)
    const [edit,setEdit]=useState(false)
    const [listreview,setListreview]=useState([])
    const [cancel,setCancel]=useState(false)
    const navigate=useNavigate()
    useEffect(() => {
        const getJournal = async () => {
            await axios(purchaselistdURL,headers)
           // <-- passed to API URL
            .then(res=>{
                let data=res.data
                setLoading(true)
                setState({...state,count_order:data.count_order,orders:data.a,loading:true
            })
          })
        }
        getJournal();
    }, []);

    const setshowthread=(e,order)=>{
        e.preventDefault()
        let data={member:[user.id,order.shop.user_id],thread:null,order_id:order.id,send_to:order.user_id}
        showthreads()
        showchat(data) 
    }
    
    window.onscroll=()=>{
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if(clientHeight + scrollTop >= scrollHeight-300 && loading && state.orders.length<state.count_order){
            let url=new URL(purchaselistdURL)
            let search_params=url.searchParams
            setLoading(false)
            search_params.append('offset',state.orders.length)
            url.search = search_params.toString();
            let new_url = url.toString();
            axios(new_url,headers)
            .then(res=>{
                setLoading(true)
                let data=res.data
                const list_order=[...state.orders,...data.a]
                setState({...state,orders:list_order})
            })
        }
    }
    
    const setshow = useCallback((es) => {
        setShow(es);
    }, [show]);

    const setcancel= useCallback((es) => {
        setCancel(es);
    }, [cancel]);

    const setedit = useCallback((ed) => {
        setEdit(ed);
    }, [edit]);

    const setcartitem = useCallback((or) => {
        setState({...state,cartitem:or});
    }, [state]);

    const setlistreview=useCallback((edit) => {
        const list_reviews=listreview.map(review=>{
            if(edit.id==review.id){
                return({...edit})
            }
            else{
                return({...review})
            }
        })
        setListreview(list_reviews)
    }, [listreview]);

    const setChoice=useCallback((item) => {
        const list_cartitem=state.list_cartitem.map(cartitem=>{
            if(item.id==cartitem.id){
                return({...item})
            }
            else{
                return({...cartitem})
            }
        })
        setState({...state,cartitem:list_cartitem});
    }, [state]);

    const editreview=(e,order)=>{
        let url = new URL(purchaselistdURL);
        let search_params = url.searchParams;
        search_params.append('id',order.id)
        search_params.append('review','review')
        url.search = search_params.toString();
        let url_main = url.toString();
        setShow(false)
        axios.get(url_main,headers)
        .then(res=>{
            setState({...state,order_choice:order})
            setListreview(res.data)
            setShow(true)
        })
    }
    if(expiry<=0 || localStorage.token=='null'){
        window.location.href="/buyer/login"
    }
    const review=(e,order)=>{
        setShow(true)
        setEdit(true)
        const cartitem_shop=order.cart_item.map((cartitem)=>{
            return{...cartitem,list_image:[],video:null,review_rating:0,rating_bab_category:[0,0,0],anonymous_review:false,
                info_more:'',list_text:[],review_text:''}
        })
        setState({...state,list_cartitem:cartitem_shop,order_choice:order})
    }

    const cancelorder=(e,order)=>{
        setCancel(true)
        setState({...state,order_choice:order})
    }
    const updateorder=(value)=>{
        setState({...state,orders:value})
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
                         user={user}
                         
                        />
                        <div className="_3D9BVC">
                            <div className="_2mSi0S">
                                <div className="ZS1kj6">
                                    {state.list_type_order.map(item=>
                                    <Link className="_2sowby _23VQQX" to={`/user/purchase/?type=${item.type}`}>
                                        <span className="_2pSH8O">{item.name}</span>
                                    </Link>
                                    )}
                                </div>
                                <div className="_1MmTVs">
                                    <svg width="19px" height="19px" viewBox="0 0 19 19"><g id="Search-New" strokeWidth="1" fill="none" fillRule="evenodd"><g id="my-purchase-copy-27" transform="translate(-399.000000, -221.000000)" strokeWidth="2"><g id="Group-32" transform="translate(400.000000, 222.000000)"><circle id="Oval-27" cx="7" cy="7" r="7"></circle><path d="M12,12 L16.9799555,16.919354" id="Path-184" strokeLinecap="round" strokeLinejoin="round"></path></g></g></g></svg>
                                    <input autocomplete="off" placeholder="Tìm kiếm theo Tên Shop, ID đơn hàng hoặc Tên Sản phẩm" value />
                                </div>
                                <div>
                                    {
                                    state.orders.map(order=>
                                        <div className="_2n4gHk">
                                            <div className="GuWdvd">
                                                <div className="item-center item-space">
                                                    <div className="item-center item-center">
                                                        <div className="_127ZmV _3QG1FZ">
                                                            <svg viewBox="0 0 24 11"><g fill="#fff" fillRule="evenodd"><path d="M19.615 7.143V1.805a.805.805 0 0 0-1.611 0v5.377H18c0 1.438.634 2.36 1.902 2.77V9.95c.09.032.19.05.293.05.444 0 .805-.334.805-.746a.748.748 0 0 0-.498-.69v-.002c-.59-.22-.885-.694-.885-1.42h-.002zm3 0V1.805a.805.805 0 0 0-1.611 0v5.377H21c0 1.438.634 2.36 1.902 2.77V9.95c.09.032.19.05.293.05.444 0 .805-.334.805-.746a.748.748 0 0 0-.498-.69v-.002c-.59-.22-.885-.694-.885-1.42h-.002zm-7.491-2.985c.01-.366.37-.726.813-.726.45 0 .814.37.814.742v5.058c0 .37-.364.73-.813.73-.395 0-.725-.278-.798-.598a3.166 3.166 0 0 1-1.964.68c-1.77 0-3.268-1.456-3.268-3.254 0-1.797 1.497-3.328 3.268-3.328a3.1 3.1 0 0 1 1.948.696zm-.146 2.594a1.8 1.8 0 1 0-3.6 0 1.8 1.8 0 1 0 3.6 0z"></path><path d="M.078 1.563A.733.733 0 0 1 .565.89c.423-.15.832.16 1.008.52.512 1.056 1.57 1.88 2.99 1.9s2.158-.85 2.71-1.882c.19-.356.626-.74 1.13-.537.342.138.477.4.472.65a.68.68 0 0 1 .004.08v7.63a.75.75 0 0 1-1.5 0V3.67c-.763.72-1.677 1.18-2.842 1.16a4.856 4.856 0 0 1-2.965-1.096V9.25a.75.75 0 0 1-1.5 0V1.648c0-.03.002-.057.005-.085z" fillRule="nonzero"></path></g></svg>
                                                        </div>
                                                        <div className="_1CIbL0">{order.shop.name}</div>
                                                        <div onClick={(e)=>setshowthread(e,order)} className="_1q53YG">
                                                            <button className="stardust-button stardust-button--primary">
                                                                <svg viewBox="0 0 17 17" className="svg-icon icon-btn-chat" style={{fill: 'white'}}><g fillRule="evenodd"><path d="M13.89 0C14.504 0 15 .512 15 1.144l-.003.088-.159 2.117.162.001c.79 0 1.46.558 1.618 1.346l.024.15.008.154v9.932a1.15 1.15 0 01-1.779.963l-.107-.08-1.882-1.567-7.962.002a1.653 1.653 0 01-1.587-1.21l-.036-.148-.021-.155-.071-.836h-.01L.91 13.868a.547.547 0 01-.26.124L.556 14a.56.56 0 01-.546-.47L0 13.429V1.144C0 .512.497 0 1.11 0h12.78zM15 4.65l-.259-.001-.461 6.197c-.045.596-.527 1.057-1.106 1.057L4.509 11.9l.058.69.01.08a.35.35 0 00.273.272l.07.007 8.434-.001 1.995 1.662.002-9.574-.003-.079a.35.35 0 00-.274-.3L15 4.65zM13.688 1.3H1.3v10.516l1.413-1.214h10.281l.694-9.302zM4.234 5.234a.8.8 0 011.042-.077l.187.164c.141.111.327.208.552.286.382.131.795.193 1.185.193s.803-.062 1.185-.193c.225-.078.41-.175.552-.286l.187-.164a.8.8 0 011.042 1.209c-.33.33-.753.579-1.26.753A5.211 5.211 0 017.2 7.4a5.211 5.211 0 01-1.706-.28c-.507-.175-.93-.424-1.26-.754a.8.8 0 010-1.132z" fillRule="nonzero"></path></g></svg>
                                                                <span>Chat</span>
                                                            </button>
                                                        </div>
                                                        <Link className="_2L5VLu" to={order.shop.url}>
                                                            <button className="stardust-button">
                                                                <svg enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className="svg-icon icon-btn-shop"><path d="m15 4.8c-.1-1-.8-2-1.6-2.9-.4-.3-.7-.5-1-.8-.1-.1-.7-.5-.7-.5h-8.5s-1.4 1.4-1.6 1.6c-.4.4-.8 1-1.1 1.4-.1.4-.4.8-.4 1.1-.3 1.4 0 2.3.6 3.3l.3.3v3.5c0 1.5 1.1 2.6 2.6 2.6h8c1.5 0 2.5-1.1 2.5-2.6v-3.7c.1-.1.1-.3.3-.3.4-.8.7-1.7.6-3zm-3 7c0 .4-.1.5-.4.5h-8c-.3 0-.5-.1-.5-.5v-3.1c.3 0 .5-.1.8-.4.1 0 .3-.1.3-.1.4.4 1 .7 1.5.7.7 0 1.2-.1 1.6-.5.5.3 1.1.4 1.6.4.7 0 1.2-.3 1.8-.7.1.1.3.3.5.4.3.1.5.3.8.3zm.5-5.2c0 .1-.4.7-.3.5l-.1.1c-.1 0-.3 0-.4-.1s-.3-.3-.5-.5l-.5-1.1-.5 1.1c-.4.4-.8.7-1.4.7-.5 0-.7 0-1-.5l-.6-1.1-.5 1.1c-.3.5-.6.6-1.1.6-.3 0-.6-.2-.9-.8l-.5-1-.7 1c-.1.3-.3.4-.4.6-.1 0-.3.1-.3.1s-.4-.4-.4-.5c-.4-.5-.5-.9-.4-1.5 0-.1.1-.4.3-.5.3-.5.4-.8.8-1.2.7-.8.8-1 1-1h7s .3.1.8.7c.5.5 1.1 1.2 1.1 1.8-.1.7-.2 1.2-.5 1.5z"></path></svg>
                                                                <span>Xem shop</span>
                                                            </button>
                                                        </Link>
                                                    </div>
                                                    <div className="_1lE6Rh item-center">
                                                        {order.received?order.received_date!=null?'':
                                                        <div className="_2hRxNA">
                                                            <Link className="_3nBhmP" to={`order/${order.id}`}>
                                                                <svg enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className="svg-icon icon-free-shipping-line"><g><line fill="none" strokeLinejoin="round" strokeMiterlimit="10" x1="8.6" x2="4.2" y1="9.8" y2="9.8"></line><circle cx="3" cy="11.2" fill="none" r="2" strokeMiterlimit="10"></circle><circle cx="10" cy="11.2" fill="none" r="2" strokeMiterlimit="10"></circle><line fill="none" strokeMiterlimit="10" x1="10.5" x2="14.4" y1="7.3" y2="7.3"></line><polyline fill="none" points="1.5 9.8 .5 9.8 .5 1.8 10 1.8 10 9.1" strokeLinejoin="round" strokeMiterlimit="10"></polyline><polyline fill="none" points="9.9 3.8 14 3.8 14.5 10.2 11.9 10.2" strokeLinejoin="round" strokeMiterlimit="10"></polyline></g></svg>
                                                                <span className="_36mfQM">Giao hàng thành công</span>
                                                            </Link>
                                                            <div className="drawer">
                                                                <svg enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className="svg-icon icon-help"><g><circle cx="7.5" cy="7.5" fill="none" r="6.5" strokeMiterlimit="10"></circle><path d="m5.3 5.3c.1-.3.3-.6.5-.8s.4-.4.7-.5.6-.2 1-.2c.3 0 .6 0 .9.1s.5.2.7.4.4.4.5.7.2.6.2.9c0 .2 0 .4-.1.6s-.1.3-.2.5c-.1.1-.2.2-.3.3-.1.2-.2.3-.4.4-.1.1-.2.2-.3.3s-.2.2-.3.4c-.1.1-.1.2-.2.4s-.1.3-.1.5v.4h-.9v-.5c0-.3.1-.6.2-.8s.2-.4.3-.5c.2-.2.3-.3.5-.5.1-.1.3-.3.4-.4.1-.2.2-.3.3-.5s.1-.4.1-.7c0-.4-.2-.7-.4-.9s-.5-.3-.9-.3c-.3 0-.5 0-.7.1-.1.1-.3.2-.4.4-.1.1-.2.3-.3.5 0 .2-.1.5-.1.7h-.9c0-.3.1-.7.2-1zm2.8 5.1v1.2h-1.2v-1.2z" stroke="none"></path></g></svg>
                                                                <div className="drawer__contents" style={{transitionDelay: '0.2s', transform: 'translate(-50%, 0px)', left: '50%'}}>
                                                                    <div className="arrow-box__container">
                                                                        <div className="arrow-box__arrow item-centers">
                                                                            <div className="arrow-box__arrow-outer">
                                                                                <div className="arrow-box__arrow-inner"></div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="arrow-box__content">
                                                                            <div className="_3Jwg3-">
                                                                                <div className="_5DMUkt">Cập Nhật Mới Nhất</div>
                                                                                <div>{("0" + new Date(order.ordered).getDate()).slice(-2) + "-" + ("0"+(new Date(order.ordered).getMonth()+1)).slice(-2) + "-" +
                                                                                    new Date(order.ordered).getFullYear() + " " + ("0" + new Date(order.ordered).getHours()).slice(-2) + ":" + ("0" + new Date(order.ordered).getMinutes()).slice(-2).toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' })}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>:''}
                                                        <div className="clakWe">{order.received?order.review?'Đã đánh giá':'Đã giao':order.canceled?'Đã hủy':!order.received && order.being_delivered?'Đang giao':'CHỜ XÁC NHẬN'}</div>
                                                    </div>
                                                </div>
                                                <div className="_39XDzv"></div>
                                                <Link to={`/user/purchase/order/${order.id}`}>
                                                    <div className="_2lVoQ1">
                                                        {order.cart_item.map(cartitem=>
                                                            <div className="_1limL3">
                                                                <div>
                                                                    <span className="_1BJEKe">
                                                                        <div className="_3huAcN">
                                                                            <div className="_3btL3m">
                                                                                <div className="image__wrapper">
                                                                                    <div className="image__place-holder">
                                                                                        <svg enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className="svg-icon icon-loading-image"><g><rect fill="none" height="8" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" width="10" x="1" y="4.5"></rect><line fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="1" x2="11" y1="6.5" y2="6.5"></line><rect fill="none" height="3" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" width="3" x="11" y="6.5"></rect><line fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="1" x2="11" y1="14.5" y2="14.5"></line><line fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="6" x2="6" y1=".5" y2="3"></line><line fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="3.5" x2="3.5" y1="1" y2="3"></line><line fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="8.5" x2="8.5" y1="1" y2="3"></line></g></svg>
                                                                                    </div>
                                                                                    <div className="image__content" style={{backgroundImage: `url(${cartitem.item_image})`}}>
                                                                                        <div className="image__content--blur"></div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="_1cxKtp">
                                                                                <div>
                                                                                    <div className="_1xHDVY">
                                                                                        <span className="_30COVM">{cartitem.item_name}</span>
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
                                                                            <span className={`${cartitem.discount_price==0?'mBERmM':'_34DOjq'}`}>₫{formatter.format(cartitem.price)}</span>
                                                                            {cartitem.discount_price>0?<span className="mBERmM _2mEJ4q">₫{cartitem.price-cartitem.discount_price}</span>:''}
                                                                        </div>
                                                                    </span>
                                                                </div>
                                                                <div className="_3tEHtP"></div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="_1J7vLy">
                                                <div className="DI-rNr tyOBoQ"></div>
                                                <div className="DI-rNr _25igL4"></div>
                                            </div>
                                            <div className="_37UAJO">
                                                <div className="_1CH8fe">
                                                    <span className="zO5iWv">
                                                        <div className="_-8oSuS">
                                                            <svg width="16" height="17" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M15.94 1.664s.492 5.81-1.35 9.548c0 0-.786 1.42-1.948 2.322 0 0-1.644 1.256-4.642 2.561V0s2.892 1.813 7.94 1.664zm-15.88 0C5.107 1.813 8 0 8 0v16.095c-2.998-1.305-4.642-2.56-4.642-2.56-1.162-.903-1.947-2.323-1.947-2.323C-.432 7.474.059 1.664.059 1.664z" fill="url(#paint0_linear)"></path><path fillRule="evenodd" clipRule="evenodd" d="M8.073 6.905s-1.09-.414-.735-1.293c0 0 .255-.633 1.06-.348l4.84 2.55c.374-2.013.286-4.009.286-4.009-3.514.093-5.527-1.21-5.527-1.21s-2.01 1.306-5.521 1.213c0 0-.06 1.352.127 2.955l5.023 2.59s1.09.42.693 1.213c0 0-.285.572-1.09.28L2.928 8.593c.126.502.285.99.488 1.43 0 0 .456.922 1.233 1.56 0 0 1.264 1.126 3.348 1.941 2.087-.813 3.352-1.963 3.352-1.963.785-.66 1.235-1.556 1.235-1.556a6.99 6.99 0 00.252-.632L8.073 6.905z" fill="#FEFEFE"></path><defs><linearGradient id="paint0_linear" x1="8" y1="0" x2="8" y2="16.095" gradientUnits="userSpaceOnUse"><stop stopColor="#F53D2D"></stop><stop offset="1" stopColor="#F63"></stop></linearGradient></defs></svg>
                                                        </div>
                                                    </span>
                                                    <div className="_1mmoh8">Tổng số tiền:</div>
                                                    <div className="_1MS3t2">₫{formatter.format(order.amount)}</div>
                                                </div>
                                            </div>
                                            <div className="_1Qn42s">
                                                <div className="_1lM63-">{order.received?order.review?'':
                                                    Math.abs(new Date() - new Date(order.received_date))/(1000 * 3600 * 24)<15?<><span className="_2xFj47">Đánh giá sản phẩm trước
                                                    <div className="drawer"><u className="_1_feWc">{`${new Date(new Date(order.received_date).setDate(new Date(order.received_date).getDate() + 15)).toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).substr(0,10)}`}</u></div>
                                                </span>
                                                <span className="_17rYB5">Đánh giá ngay và nhận 200 Xu</span></>:<span>Không nhận được đánh giá</span>:order.canceled?<span>Bạn đã hủy</span>:''}</div>
                                                <div className="_23TzMz">
                                                    {order.received?!order.review && Math.abs(new Date() - new Date(order.received_date))/(1000 * 3600 * 24)<15?
                                                    <div onClick={e=>review(e,order)} className="_2BTXui">
                                                        <button className="stardust-button stardust-button--primary _2x5SvJ">Đánh Giá</button>
                                                    </div>:
                                                    <div className="_2BTXui">
                                                        <button onClick={e=>navigate(`/cart`)} className="stardust-button stardust-button--primary _2x5SvJ">Mua lại</button>
                                                    </div>
                                                    :order.canceled?
                                                    <div className="_2BTXui">
                                                        <button onClick={e=>navigate(`/cart`)} className="stardust-button stardust-button--primary _2x5SvJ">Mua lại</button>
                                                    </div>:<div className="_2BTXui">
                                                        <button className="stardust-button stardust-button--secondary _2x5SvJ">Chờ</button>
                                                    </div>}
                                                    <div className="_3YxeCv">
                                                        <button className="stardust-button stardust-button--secondary _2x5SvJ">Liên hệ Người bán</button>
                                                    </div>
                                                    {order.received?order.review?
                                                    <div onClick={e=>editreview(e,order)} className="_3YxeCv">
                                                        <button className="stardust-button stardust-button--secondary _2x5SvJ">Xem đánh giá shop</button>
                                                    </div>:Math.abs(new Date() - new Date(order.received_date))/(1000 * 3600 * 24)<15?
                                                    <div className="_3YxeCv">
                                                        <button onClick={e=>navigate(`/cart`)} className="stardust-button stardust-button--secondary _2x5SvJ">Mua lại</button>
                                                    </div>
                                                    :'':order.canceled?
                                                    <div className="_3YxeCv">
                                                        <button className="stardust-button stardust-button--secondary _2x5SvJ">Chi Tiết Đơn Hủy</button>
                                                    </div>:<div className="_3YxeCv">
                                                        <button onClick={(e)=>cancelorder(e,order)} className="stardust-button stardust-button--secondary _2x5SvJ">Hủy đơn</button>
                                                    </div>}    
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                {loading?"":
                                    <div className="loading">
                                        <div className="loading_item item-center">
                                            <div className="ball"></div>
                                            <div className="ball"></div>
                                            <div className="ball"></div>
                                        </div>
                                    </div>}
                                </div>
                            </div>             
                        </div>
                    </div>
                </div>
            </div>
            <div id="modal">
            <Listreview
            show={show}
            edit={edit}
            cancel={cancel}
            list_review={listreview}
            list_cartitem={state.list_cartitem}
            list_orders={state.orders}
            order_choice={state.order_choice}
            updateorder={value=>updateorder(value)}
            setshow={es=>setshow(es)}
            setcancel={es=>setcancel(es)}
            setedit={ed=>setedit(ed)}
            setcartitem={or=>setcartitem(or)}
            user={user}
            setChoice={item=>setChoice(item)}
            setlistreview={edit=>setlistreview(edit)}
        />
            </div>
             
        </>
    ) 
}
const mapStateToProps = state => ({
    isAuthenticated: state.isAuthenticated,user:state.user
});

export default connect(mapStateToProps,{showchat,showthreads})(Purchase);

