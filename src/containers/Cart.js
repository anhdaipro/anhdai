
import axios from 'axios';
import Navbar from "./Navbar"
import {formatter,ItemRecommend,itemvariation,rating,
arraymove,} from "../constants"
import {useNavigate , Link,useLocation, Navigate} from 'react-router-dom';
import {updatecartURL,listThreadlURL,listorderURL,cartURL,itemrecentlyURL,savevoucherURL} from "../urls"
import Pagination from '../hocs/Pagination';
import React, { useState,createRef,useEffect,useRef } from 'react';
import { headers,expiry} from '../actions/auth';
import ReactDOM, { render } from 'react-dom'
import Message from "./Chat"
import { connect } from 'react-redux';
let PageSize = 10;
const Divbox=(props)=>{
    const {shop,elem,list_item_promotion_unique,list_item_remainder,save_voucher,remove_voucher,apply_voucher}=props
    const scrollTop = document.documentElement.scrollTop;
    const [text,setText]=useState('')
    const [show,setShow]=useState(false)
    const voucherref=useRef()

    useEffect(() => {
        document.addEventListener('click', handleClick)
        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [])

    useEffect(()=>{
        if(shop){
            setShow(shop.show_voucher)
        }
    },[shop,show])
    const handleClick = (event) => {
        const { target } = event
        if(voucherref.current!=null){
            if (!voucherref.current.contains(target)) {
                setShow(false)
            }
        }
    }
    return (
    <>
    {show?
    <div ref={voucherref} className="popover HGTXIW" style={{top:`${scrollTop + elem.getBoundingClientRect().top+30}px`}}>
        <div className="_2iCXFt" id="shopVouchersModal">
            <h3 className="_1DEUtY">KING SPORT Voucher</h3>
            <div className="_38kqI1">
                <span className="_1u9Qa8">Mã Voucher</span>
                <div className="_3K7VlY">
                    <div className="input-with-validator-wrapper">
                        <div className="input-with-validator">
                            <input onChange={e=>setText(e.target.value)} type="text" value={text}/>
                        </div>
                    </div>
                </div>
                <button className="stardust-button _1qeHH1 vkpLTO _239aDK">
                    <span>Áp Dụng</span>
                </button>
            </div>
            <div className="_2LFlG9 _3q13mI">
                <p className="_3wBALl">Chọn sản phẩm từ shop trước khi nhập mã voucher</p>
                <div className="TTPjDC">
                    {shop.list_voucher_unique.map(item=>
                    <div className="p_OJGO" key={item.voucher_info.id}>
                        <div className="_5i0d1d O5jY-J _1yUbW1 DY-Dpp _143EYI">
                            <div className="_2RHirG _3oSONR _2Rm6Ay">
                                <div className="LClnj2 _2_y4Mg">
                                    <div className="_3SJn9j">
                                        <div className="_30UvsL _2qEmXV" style={{backgroundImage: `url(https://cf.shopee.vn/file/0ba6ce378d11d47af8d4b269a312188d)`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}}></div>
                                    </div>
                                </div>
                                <div className="_3vsRla">
                                    <div className="UJNhBl _143EYI">
                                        <div className="_3IM-kK"></div>
                                    </div>
                                </div>
                                <div className="_20oZ4H"></div>
                            </div>
                            <div className="_2an6zy _3rRCR8 _2Rm6Ay">
                                <div className="_1DXz_g">
                                    <div className="pbcBSR qGqBKE">
                                        <div className="_1PBA5q">
                                            <div className="_247YiT qEinNS">{item.voucher_info.discount_type=='2'?`Giảm ₫${formatter.format(item.amount/1000)}k`:`Giảm ${item.voucher_info.percent}%`}</div>
                                        </div>
                                        <div className="_1MSgem _2JzVpY">Đơn Tối Thiểu ₫{formatter.format(item.voucher_info.minimum_order_value/1000)}k</div>
                                    </div>
                                    <div></div>
                                    <span className="_3WswQ9 _2IDlYp HO-RDa _130ybB">
                                        <div className="x71QpC">
                                            <div style={{width: '86%', height: '100%', background: 'linear-gradient(270deg, rgb(255, 176, 0) 0%, rgb(235, 23, 23) 100%)'}}></div>
                                        </div>
                                        <div className="D56q0_">
                                            <span className="xb1Q-e">Đã dùng 86%, </span>
                                            <span className="_2-v2uI">HSD: {item.voucher_info.valid_to}</span>
                                        </div>
                                    </span>
                                </div>
                                {item.voucher_info.id==shop.voucher?'':
                                item.voucher_user==false?
                                <button onClick={()=>save_voucher(item)} type="button" className="btn btn--s btn--inline btn-solid-primary">Lưu</button>:
                                <button onClick={()=>apply_voucher(item)} type="button" className={`btn btn--s btn--inline _19mZp5 ${[...list_item_promotion_unique,...list_item_remainder].find(item=>item.shop_name==shop.shop_name && item.check)?'':'disable'}`}>Áp dụng</button>}
                            </div>
                            {item.voucher_info.id==shop.voucher?
                            <div onClick={()=>remove_voucher(item)} className="_1DC8ps">
                                <svg fill="none" viewport="0 0 21 18" className="svg-icon icon-voucher-close"><path fillRule="evenodd" clip-rule="evenodd" d="M.05.001C.016.33 0 .663 0 1v7c0 5.523 4.477 10 10 10h10V.001H.05z" fill="#000" fill-opacity=".26"></path><rect x="13.273" y="5" width="1.029" height="10.285" rx=".5" transform="rotate(45 13.273 5)" fill="#fff"></rect><rect x="6.727" y="5" width="10.285" height="1.029" rx=".5" transform="rotate(45 6.727 5)" fill="#fff"></rect></svg>
                            </div>:''}
                        </div>
                    </div>)}
                </div>
            </div>
        </div>
    </div>
    :''}
    </>
    )
}

const Iteminfo=(props)=>{
    const {item,shop,cartitem,product,checked,adjustitem,removeitem,variation,setcolor,setsize,update}=props
    const [show,setShow]=useState(false)
    const [items,setItems]=useState([])
    const [state,setState]=useState({page_no:1})
    const itemref=useRef()
    useEffect(() => {
        document.addEventListener('click', handleClick)
        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [])

    const handleClick = (event) => {
        const { target } = event
        if(itemref.current!=null){
            if (!itemref.current.contains(target)) {
                setShow(false)
            }
        }
    }
    const finditem=(e,item)=>{
        axios.get(`${updatecartURL}?item_id=${item.item_id}`,headers)
        .then(rep=>{
            let data=rep.data
            setItems(data.list_item)
            setState({...state,page_count:data.page_count,page:data.page,loading_item:true})
        })
        
    }

    const handlePageChange=(page,item)=>{
        setState({...state,loading_item:false})
        axios.get(`${updatecartURL}?item_id=${item.item_id}&page=${page}`,headers)
        .then(rep=>{
            let data=rep.data
            setItems(data.list_item)
            this.setState({...state,loading_item:true,page_no:page})
        })
    }
    return(
        <div key={item.id} className="d-flex p-1">
            <div className="item-check item-center">
                {product=='mainproduct'?
                <label className={`stardust-checkbox ${item.check?'stardust-checkbox--checked':''}`}>
                    <input onChange={(e)=>checked(e,item)} type="checkbox" value={item.id} checked={item.check?true:false} className="stardust-checkbox__input" type="checkbox"/>
                    <div className="stardust-checkbox__box"></div>
                </label>
                :''}
            </div>
            <div className="shop-item-info item-center">
                <Link to={item.item_url}>
                    <div className="shop-item-image" style={{backgroundImage: `url(${item.item_image})`}}></div>
                </Link>
                <div className="shop-item-name">{item.item_name}</div>
            </div>
            <div className="shop-item-variation">
                <div ref={itemref} className="aUj6f2">
                    <div onClick={(e)=>{
                        setShow(!show)
                        variation(e,item,product,cartitem)}} className="ns42ir">
                        <div className="shop-item-variation-title item-center"> phân loại
                            <button className={`_2Ipt-j ${show?'_2zsvOt':''}`}></button>
                        </div>
                        <div className="shop-item-variation-content">
                            {itemvariation(item)}
                        </div>
                    </div>
                    <div>
                        {show?
                        <div className="_3qAzj1 modal__transition-enter-done">
                            <div className="arrow-box__container">
                                <div className="arrow-box__arrow arrow-box__arrow--center">
                                    <div className="arrow-box__arrow-outer">
                                        <div className="arrow-box__arrow-inner"></div>
                                    </div>
                                </div>
                                <div className="arrow-box__content">
                                    <div className="_32z-AY">
                                        <div className="_39MbPI">
                                            {item.color.length>0?
                                            <div className="_3gvvQI">
                                                <div className="_3_Bulc">{item.color[0].name}:</div>
                                                {item.color.map(item=>
                                                    <button key={item.id} onClick={(e)=>setcolor(e,item,product,cartitem)} className={`product-variation${state.variation_size.length>0?`${item.variation.some(r=> state.variation_size.includes(r))?'':' disable'}`:''}${item.id==state.color_id?' product-variation--selected':''}`} aria-label={item.value}>{item.value}
                                                        {state.color_id==item.id?
                                                        <div className="product-variation__tick">
                                                        <svg enableBackground="new 0 0 12 12" viewBox="0 0 12 12" x="0" y="0" className="svg-icon icon-tick-bold"><g><path d="m5.2 10.9c-.2 0-.5-.1-.7-.2l-4.2-3.7c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l3.4 3 5.1-7c .3-.4 1-.5 1.4-.2s.5 1 .2 1.4l-5.7 7.9c-.2.2-.4.4-.7.4 0-.1 0-.1-.1-.1z"></path></g></svg>
                                                        </div>
                                                        :''}
                                                    </button>
                                                )}
                                            </div>
                                            :''}
                                            {item.size.length>0?
                                            <div className="_3gvvQI">
                                                <div className="_3_Bulc">{item.size[0].name}:</div>
                                                {item.size.map(item=>
                                                    <button key={item.id} onClick={(e)=>setsize(e,item,product,cartitem)} className={`product-variation${state.variation_color.length>0?`${item.variation.some(r=> state.variation_color.includes(r))?'':' disable'}`:''}${item.id==state.size_id?' product-variation--selected':''}`} aria-label={item.value}>{item.value}
                                                        {this.state.size_id==item.id?
                                                        <div className="product-variation__tick">
                                                            <svg enableBackground="new 0 0 12 12" viewBox="0 0 12 12" x="0" y="0" className="svg-icon icon-tick-bold"><g><path d="m5.2 10.9c-.2 0-.5-.1-.7-.2l-4.2-3.7c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l3.4 3 5.1-7c .3-.4 1-.5 1.4-.2s.5 1 .2 1.4l-5.7 7.9c-.2.2-.4.4-.7.4 0-.1 0-.1-.1-.1z"></path></g></svg>
                                                        </div>
                                                        :''}
                                                    </button>                
                                                )}
                                            </div>
                                            :''}
                                            <div className="_18oYnx">
                                                <button onClick={(e)=>setShow(false)} className="cancel-btn">Trở Lại</button>
                                                <button onClick={(e)=>{
                                                    update(e,item,shop,cartitem)
                                                    setShow(false)
                                                }} className="button-solid button-solid--primary">Xác nhận</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>:''}
                    </div>
                </div>
            </div>
            <div className="shop-item-price-origin item-center">
                <span className={`_1CXksa ${item.discount_price>0?'_1k1Vcm':''}`}>₫{formatter.format(item.price)}</span>
                {item.discount_price>0?
                <span className="_1CXksa">₫{formatter.format(item.price-item.discount_price)}</span>
                :''}
            </div>
            <div className="shop-item-quantity">
                <div className="item-center">
                    <button onClick={(e)=>adjustitem(e,item,product,cartitem,item.quantity-1)} className={`minus-btn btn-adjust`}>
                        <svg enableBackground="new 0 0 10 10" viewBox="0 0 10 10" x="0" y="0" className="svg-icon "><polygon points="4.5 4.5 3.5 4.5 0 4.5 0 5.5 3.5 5.5 4.5 5.5 10 5.5 10 4.5"></polygon></svg>
                    </button>
                    <input className="_2KdYzP quantity iRO3yj" type="text" role="spinbutton" aria-valuenow="1" value={item.quantity} />
                    <button onClick={(e)=>adjustitem(e,item,product,cartitem,item.quantity+1)} className={`plus-btn btn-adjust ${item.inventory<=item.quantity?'disable':''}`}>
                        <svg enableBackground="new 0 0 10 10" viewBox="0 0 10 10" x="0" y="0" className="svg-icon icon-plus-sign"><polygon points="10 4.5 5.5 4.5 5.5 0 4.5 0 4.5 4.5 0 4.5 0 5.5 4.5 5.5 4.5 10 5.5 10 5.5 5.5 10 5.5"></polygon></svg>
                    </button>
                </div>
            </div>
            <div className="shop-item-price item-centers">₫{formatter.format(item.total_price)}</div>
            <div className='_2y8iJi _2qPRqW' >
                <button onClick={e=>removeitem(e,item,product)} className="item-delete button-no-outline">Xóa</button>
                <div className={`_1-rOD0 ${item.show?'_1EMX1h':''}`}>
                    {items.length>0 && item.show?
                    <div className="_2Nuk_- _2kB0Ra">
                        {state.loading_item?
                        <>
                        <div className="_1bmRDE">
                        {items.map(item=>
                            <div className="grid__column-2-4" key={item.item_id}>
                                <Link className="home-product-item" to={item.item_url}>
                                    <div className="home-product-item__image" style={{backgroundImage: `url(${item.item_image})`}}></div>
                                    <div className="home-product-item-info">
                                        <div className="home-product-item__name">{item.item_name}</div>
                                        <div className="home-product-item__discount">
                                            {<div className="home-product-item__discount-voucher">
                                                <svg className="clipath-left" viewBox="-0.5 -0.5 4 16">
                                                    <path d="M4 0h-3q-1 0 -1 1a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3q0 1 1 1h3" strokeWidth="1" transform="" stroke="currentColor" fill="#f69113"></path>
                                                </svg>   
                                                <div className="home-product-item__discount-voucher-content">{item.voucher_percent}%Reduce </div>
                                                <svg className="clipath-right" viewBox="-0.5 -0.5 4 16">
                                                    <path d="M4 0h-3q-1 0 -1 1a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3q0 1 1 1h3" strokeWidth="1" transform="rotate(180) translate(-3 -15)" stroke="currentColor" fill="#f69113"></path>
                                                </svg>
                                            </div>}
                                        
                                            <div className="home-product-item__discount-deal-shock">mua kèm deal soc</div>
                                        </div>
                                        <div className="_3_FVSo">  
                                            <div className={`${item.percent_discount>0 && item.program_valid>0?'home-product-item__price-old zp9xm9':'home-product-item__price _3c5u7X'}`}>₫{formatter.format((item.max_price+item.min_price)/2)}</div>
                                            {item.percent_discount>0 && item.program_valid>0?
                                            <div className="home-product-item__price-current">
                                                <span className="_1y2DMk">₫</span><span className="_3c5u7X">{formatter.format((item.max_price+item.min_price)/2*(100-item.percent_discount)/100)}</span>
                                            </div>
                                            :''}
                                            <div className="_2YM55k">
                                                <svg height="12" viewBox="0 0 20 12" width="20" className="svg-icon icon-free-shipping"><g fill="none" fillRule="evenodd" transform=""><rect fill="#00bfa5" fillRule="evenodd" height="9" rx="1" width="12" x="4"></rect><rect height="8" rx="1" stroke="#00bfa5" width="11" x="4.5" y=".5"></rect><rect fill="#00bfa5" fillRule="evenodd" height="7" rx="1" width="7" x="13" y="2"></rect><rect height="6" rx="1" stroke="#00bfa5" width="6" x="13.5" y="2.5"></rect><circle cx="8" cy="10" fill="#00bfa5" r="2"></circle><circle cx="15" cy="10" fill="#00bfa5" r="2"></circle><path d="m6.7082481 6.7999878h-.7082481v-4.2275391h2.8488017v.5976563h-2.1405536v1.2978515h1.9603297v.5800782h-1.9603297zm2.6762505 0v-3.1904297h.6544972v.4892578h.0505892c.0980164-.3134765.4774351-.5419922.9264138-.5419922.0980165 0 .2276512.0087891.3003731.0263672v.6210938c-.053751-.0175782-.2624312-.038086-.3762568-.038086-.5122152 0-.8758247.3017578-.8758247.75v1.8837891zm3.608988-2.7158203c-.5027297 0-.8536919.328125-.8916338.8261719h1.7390022c-.0158092-.5009766-.3446386-.8261719-.8473684-.8261719zm.8442065 1.8544922h.6544972c-.1549293.571289-.7050863.9228515-1.49238.9228515-.9864885 0-1.5903965-.6269531-1.5903965-1.6464843 0-1.0195313.6165553-1.6669922 1.5872347-1.6669922.9580321 0 1.5366455.6064453 1.5366455 1.6083984v.2197266h-2.4314412v.0351562c.0221328.5595703.373095.9140625.9169284.9140625.4110369 0 .6924391-.1376953.8189119-.3867187zm2.6224996-1.8544922c-.5027297 0-.853692.328125-.8916339.8261719h1.7390022c-.0158091-.5009766-.3446386-.8261719-.8473683-.8261719zm.8442064 1.8544922h.6544972c-.1549293.571289-.7050863.9228515-1.49238.9228515-.9864885 0-1.5903965-.6269531-1.5903965-1.6464843 0-1.0195313.6165553-1.6669922 1.5872347-1.6669922.9580321 0 1.5366455.6064453 1.5366455 1.6083984v.2197266h-2.4314412v.0351562c.0221328.5595703.373095.9140625.9169284.9140625.4110369 0 .6924391-.1376953.8189119-.3867187z" fill="#fff"></path><path d="m .5 8.5h3.5v1h-3.5z" fill="#00bfa5"></path><path d="m0 10.15674h3.5v1h-3.5z" fill="#00bfa5"></path><circle cx="8" cy="10" fill="#047565" r="1"></circle><circle cx="15" cy="10" fill="#047565" r="1"></circle></g></svg>
                                            </div>
                                        </div>
                                        
                                        <div className="home-product-item__action">
                                            <div className="home-product-item__like">
                                                <svg height="16" viewBox="0 0 16 16" width="16" version="1.1"><path d="m7.251221 4.2145388c-.549143-.4552525-1.2488781-.7145388-1.951221-.7145388-1.5719593 0-2.8 1.2269253-2.8 2.7970027 0 .5878515.158291 1.1598348.483492 1.7618948.6414654 1.1875754 1.5644044 2.1358244 4.4829309 4.7799304l.5348542.4864596.5326254-.4807607c2.9306205-2.660747 3.8471674-3.6039919 4.486777-4.7931984.3223805-.5993922.4793205-1.1689848.4793205-1.7543257 0-1.5700774-1.2280407-2.7970027-2.8-2.7970027-.7029148 0-1.4032175.2597087-1.9497845.7133288l-.0367779.0309601c-.1203966.1029087-.2318185.2143106-.3329071.3329122l-.3805305.4464557-.3805305-.4464557c-.1010886-.1186016-.2125105-.2300035-.3301434-.3305672z" fill="none" stroke="#000" strokeOpacity=".54"></path></svg>
                                            </div>
                                            <div className="home-product-item__rating" data-sqe="rating">
                                                <div className="rating-stars">
                                                    <div className="d-flex">
                                                        {rating(item,6)}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="home-product-item__sold item-center">Đã bán {item.num_order}</div>
                                        </div>
                                        <div className="home-product-item__origin">
                                            <span className="home-product-item__brand">{item.item_brand}</span>
                                            <span className="home-product-item__origin-name">{item.shop_city}</span>
                                        </div>
                                        <div className="home-product-item__favourite">
                                            
                                            <span>Yêu thích</span>
                                        </div>
                                        <div className="home-product-item__sale-off">
                                            <div className="flex-col">
                                                <span className="home-product-item__sale-off-percent">{item.percent_discount}</span>
                                                <span className="home-product-item__sale-off-label">GIẢM</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )}
                        </div>
                        <div className='page-controller page-controller--v2'>
                            <Pagination
                                classActive={`button-solid button-solid--primary`}
                                classNormal={`button-no-outline`}
                                classIcon={`icon-button`}
                                currentPage={state.page_no}
                                totalCount={state.page_count}
                                pageSize={PageSize}
                                onPageChange={page => handlePageChange(page,item)}
                            />
                        </div>
                        </>
                        :<div className="loading">
                            <div className="loading_item item-center">
                                <div className="ball"></div>
                                <div className="ball"></div>
                                <div className="ball"></div>
                            </div>
                        </div>}
                    </div>
                    :''}
                    <button onClick={(e)=>finditem()} className={`button-no-outline NJSFiA item-center ${item.show?'_1OWzl_':''}`}>
                        <span className="_1pXUYq">Tìm sản phẩm tương tự</span>
                        <svg enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className="svg-icon _27CqwY icon-down-arrow-filled"><path d="m6.5 12.9-6-7.9s-1.4-1.5.5-1.5h13s1.8 0 .6 1.5l-6 7.9c-.1 0-.9 1.3-2.1 0z"></path></svg>
                    </button>
                </div>
            </div> 
        </div>
        )
    }
class Cart extends React.Component{
    constructor(props) {
    super(props);
    this.state = {name:'',list_item_recommend:[],loading_item:false,page_no:1,items:[],size_id:0,color_id:0,
        variation_color:[],variation_size:[],count_variation:0,variation_id:0,shopchoice:null,show_thread:false,
        threadchoice:null,threads:[],messages:[],list_threads:[],user:null,show_message:false,error:false}
    }
    
    voucherapply = createRef();
    componentDidMount(){
        if(expiry<=0 || localStorage.token=='null'){
            window.location.href=`/buyer/login?next=${window.location}`
        }
        (async () => {
            await this.props.isAuthenticated
        try {
            
            const [obj1, obj2] = await axios.all([
                axios.get(cartURL,headers),
                axios.get(listorderURL,headers),
            ])
            
            let list_voucher_shop=[]
            let count_order=0
            let total=0
            let total_discount=0
            let discount_promotion=0
            let discount_deal=0
            let discount_voucher=0
            let count_cartitem=0
            obj2.data.orders.map(order=>{
                list_voucher_shop=[...list_voucher_shop,order.voucher]
                total+=order.total
                total_discount+=order.total_discount
                discount_promotion+=order.discount_promotion
                discount_deal+=order.discount_deal
                discount_voucher+=order.discount_voucher
                count_order+=order.count
                count_cartitem+=order.count_cartitem
            })
            const list_shop=obj1.data.list_shop.map(shop=>{
                let order=obj2.data.orders.find(order=>order.shop_name==shop.shop_name)
                if(order!=undefined&& order.shop_name==shop.shop_name){
                    return({...shop,voucher:order.voucher,discount_voucher_shop:order.discount_voucher_shop,loading_voucher:true})
                }
                return({...shop})
            })

           
            for(let i=0 ;i<obj1.data.list_shop.length;i++){
                let list_voucher_items=[]
                for(let j=0;j<obj1.data.cart_item.length;j++){
                    if(obj1.data.cart_item[j].shop_name==obj1.data.list_shop[i].shop_name){
                        if(obj1.data.cart_item[j].voucher_user.length>0){
                            for(let k=0;k<obj1.data.cart_item[j].list_voucher.voucher_info.length;k++){
                                if(list_voucher_items[obj1.data.cart_item[j].list_voucher.voucher_info[k].id]) continue;
                                list_voucher_items[obj1.data.cart_item[j].list_voucher.voucher_info[k].id] = true;
                                obj1.data.list_shop[i].list_voucher_unique.push({'voucher_info':obj1.data.cart_item[j].list_voucher.voucher_info[k],'voucher_user':obj1.data.cart_item[j].voucher_user[k]});
                                obj1.data.list_shop[i].show_voucher=false
                            }
                        }
                    }  
                }
            }
            
            this.setState({
                count:obj1.data.cart_item.length,
                list_cartitem:obj1.data.cart_item,
                list_voucher_shop:list_voucher_shop,
                count_order:count_order,
                total:total,list_threads:obj2.data.list_threads,
                user:obj1.data.user,
                count_cartitem:count_cartitem,
                total_discount:total_discount,
                discount_promotion:discount_promotion,
                discount_deal:discount_deal,list_shop:list_shop,
                discount_voucher:discount_voucher,loading:true})
            }
            catch (error) {
            console.log(error);
            }
        })()
        
        document.body.onscroll=()=>{
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
            if(clientHeight + scrollTop == scrollHeight && this.state.list_item_recommend.length==0){
                (async () => {
                    try {
                        const res = await axios.get(itemrecentlyURL,headers)
                        let data=res.data
                        this.setState({list_item_recommend:data}); 
                    } catch (error) {
                      console.log(error);
                    }
                })()
            }
        } 
    }

   
    checkall(e){
        let form=new FormData()
        this.state.list_shop.map(shop=>{
            form.append('shop_name',shop.shop_name)
        })

        this.state.list_cartitem.map(item=>{
            if(e.target.checked){
                item.check=true
                form.append('id_checked',item.id)
            }
            else{
                item.check=false
                form.append('id_check',item.id)
            }
        })

        axios.post(cartURL,form,headers)
        .then(rep=>{
            let data=rep.data
            this.setState({total:data.total,total_discount:data.total_discount,discount_promotion:data.discount_promotion,
                discount_deal:data.discount_deal,count_order:data.count,
                discount_voucher:data.discount_voucher,count_cartitem:data.count_cartitem,
                list_cartitem:this.state.list_cartitem
            })
        }) 
    }
    
    checkshop(e,shop){
        let form=new FormData()
        form.append('shop_name',shop.shop_name)
        this.state.list_cartitem.map(item=>{
            if(item.shop_name===shop.shop_name){
                if(e.target.checked){
                    item.check=true
                    form.append('id_checked',item.id)
                }
                else{
                    item.check=false
                    form.append('id_check',item.id)
                }
            }
        })

        axios.post(cartURL,form,headers)
        .then(rep=>{
            let data=rep.data
            this.setState({total:data.total,total_discount:data.total_discount,discount_promotion:data.discount_promotion,
                discount_deal:data.discount_deal,count_order:data.count,
                discount_voucher:data.discount_voucher,count_cartitem:data.count_cartitem,
                list_cartitem:this.state.list_cartitem
            })
        }) 
    }


    checked(e,item){
        
        let form=new FormData()
        if(item.check){
            form.append('id_check',item.id)
        }
        else{
            form.append('id_checked',item.id)
        }
        form.append('shop_name',item.shop_name)
        const list_cartitem=this.state.list_cartitem.map(cartitem=>{
            if(item.id==cartitem.id){
                return({...cartitem,check:!cartitem.check})
            }
            return({...cartitem})
        })
        this.setState({list_cartitem:list_cartitem})
        axios.post(cartURL,form,headers)
        .then(rep=>{
            let data=rep.data
            this.setState({total:data.total,total_discount:data.total_discount,discount_promotion:data.discount_promotion,
                discount_deal:data.discount_deal,count_order:data.count,
                discount_voucher:data.discount_voucher
            })
        }) 
    }

    setcolor(e,item){ 
        e.target.classList.toggle('product-variation--selected')
        if(e.target.classList.contains('product-variation--selected')){
          this.setState({color_id:item.id,variation_color:item.variation})  
        }
        else{
          this.setState({color_id:0,variation_color:[]})
        }
    }

    setsize(e,item){
        e.target.classList.toggle('product-variation--selected')
        if(e.target.classList.contains('product-variation--selected')){
          this.setState({size_id:item.id,variation_size:item.variation}) 
        }
        else{
          this.setState({size_id:0,variation_size:[]})
        }
    }
      
    update(e,data,item){
        data.open=false
        this.setState({[item]:data})
        if(e.target.classList.contains('button-solid')){
            let form=new FormData()
            let variation_active=document.querySelectorAll('.product-variation.product-variation--selected')
            if(variation_active.length>=this.state.count_variation){
                if(data.percent_discount_deal==undefined){
                    form.append('cartitem_id',data.id)
                }
                else{
                    form.append('byproduct_id',data.id)
                }
                form.append('item_id',data.item_id)
                if(this.state.color_id!==0){
                    form.append('color_id',this.state.color_id)
                    }
                if(this.state.size_id!==0){
                    form.append('size_id',this.state.size_id)
                }
                axios.post(updatecartURL,form,headers)
                .then(rep=>{
                    let result=rep.data
                    data.price=result.price
                    data.size_value=result.size_value
                    data.color_value=result.color_value
                    data.id=result.id
                    data.total_price=result.total_price
                    data.inventory=result.inventory
                    this.setState({[item]:data})
                    this.setState({size_id:0,color_id:0,variation_color:[],variation_size:[],count_variation:0,variation_id:0})
                 })
                }
            }
            else{
                this.setState({size_id:0,color_id:0,variation_color:[],variation_size:[],count_variation:0,variation_id:0})
            }
    }

    variation(e,item,cartitem,shop){
        if(item.open==false){
            this.setState({size_id:0,color_id:0,variation_color:[],variation_size:[],count_variation:0,variation_id:0})
        }
        
        else{ 
            
            for(let i in item.size){
                if(item.size_value==item.size[i].value){
                    this.state.size_id=item.size[i].id
                    this.state.variation_size=item.size[i].variation
                }
            }
            for(let i in item.color){
                if(item.color_value==item.color[i].value){
                    this.state.color_id=item.color[i].id
                    this.state.variation_color=item.color[i].variation
                }
            }
            this.setState({size_id:this.state.size_id,color_id:this.state.color_id,variation_color:this.state.variation_color,variation_size:this.state.variation_size,count_variation:item.count_variation,variation_id:item.variation_id})
        }
    }
   
    
    adjustitem(e,item,product,cartitemchoice,value){
        const list_cartitem=product=='mainproduct'?this.state.list_cartitem.map(cartitem=>{
            if(item.id==cartitem.id){
                return({...cartitem,quantity:value})
            }
            return({...cartitem})
        }):this.state.list_cartitem.map(cartitem=>{
            if(cartitemchoice.id==cartitem.id){
                cartitem.byproduct.map(byproduct=>{
                if(byproduct.id==item.id){
                    return({...byproduct,quantity:value})
                }
                return({...byproduct})
                })
                return({...cartitem,quantity:value})
            }
            return({...cartitem})
        })
        this.setState({list_cartitem:list_cartitem})
        this.fetchdata(e,item,product,value)
    }
    
    fetchdata(e,item,product,value){
        let form=new FormData()
        if(product=='byproduct'){
            form.append('byproduct_id',item.id)
        }
        else{
            form.append('cartitem_id',item.id)
        }
        form.append('quantity',value)
        axios.post(cartURL,form,headers)
        .then(rep=>{
            let data=rep.data
            this.setState({total:data.total,total_discount:data.total_discount,discount_promotion:data.discount_promotion,
                discount_deal:data.discount_deal,count_order:data.count,
                discount_voucher:data.discount_voucher
            })
        }) 
    }

    removeitem(e,itemchoice,product){
        let form=new FormData()
        if(product=='byproduct'){
            form.append('byproduct_id_delete',itemchoice.id)
        }
        else{
        form.append('cartitem_id_delete',itemchoice.id)
        }
        axios.post(cartURL,form,headers)
        .then(resp => {
        let data=resp.data
        const list_cartitem=this.state.list_cartitem.filter(item=>item.id!=itemchoice.id)
        this.setState({list_cartitem:list_cartitem,total:data.total,total_discount:data.total_discount,discount_promotion:data.discount_promotion,
            discount_deal:data.discount_deal,count_order:data.count,
            discount_voucher:data.discount_voucher})
        })
    }

    
    apply_voucher(voucher,shop,list_shop){
        let form=new FormData()
        form.append('voucher_id',voucher.voucher_info.id)
        form.append('shop_name',shop.shop_name)
        shop.voucher=voucher.voucher_info.id
        shop.show_voucher=false
        shop.loading_voucher=false
        axios.post(cartURL,form,headers)
        .then(rep=>{
            let data=rep.data
            shop.loading_voucher=true

            shop.discount_voucher_shop=data.discount_voucher_shop
            this.setState({[list_shop]:shop})
        })
    }

    remove_voucher(voucher,shop,list_shop){
        let form=new FormData()
        form.append('shop_name',shop.shop_name)
        form.append('voucher_id_remove',voucher.voucher_info.id)
        shop.voucher=0
        shop.discount_voucher_shop=0
        shop.show_voucher=true
        shop.loading_voucher=false
        axios.post(cartURL,form,headers)
        .then(rep=>{
            let data=rep.data
            shop.loading_voucher=true
            this.setState({[list_shop]:shop})
        })
    }

    save_voucher(voucher,shop,list_shop){
        let form=new FormData()
        form.append('voucher_id',voucher.voucher_info.id)
        voucher.voucher_user=true
        this.setState({[list_shop]:shop})
        axios.post(savevoucherURL,form,headers)
        .then(rep=>{
            let data=rep.data
        })
    }
  
    add_voucher(e,shop,list_shop){
        e.stopPropagation()
        shop.show_voucher=!shop.show_voucher
        this.setState({size_id:0,color_id:0,variation_color:[],variation_size:[],count_variation:0,variation_id:0})
        for(let i in shop.list_voucher_unique){
            if (shop.voucher==shop.list_voucher_unique[i].voucher_info.id){
                arraymove(shop.list_voucher_unique,i,0)
            }
        }
        this.setState({[list_shop]:shop,shop_choice:shop})
        if(shop.show_voucher){
            for(let i in this.state.list_shop){
                if(this.state.list_shop[i].shop_name!==shop.shop_name){
                    this.state.list_shop[i].show_voucher=false
                }
            }
            for(let i in this.state.list_item_promotion_unique){
                this.state.list_item_promotion_unique[i].open=false
                for(let j in this.state.list_item_promotion_unique[i].byproduct){
                    this.state.list_item_promotion_unique[i].byproduct[j].open=false 
                }
            }
            for(let i in this.state.list_item_remainder){
                this.state.list_item_remainder[i].open=false
                for(let j in this.state.list_item_remainder[i].byproduct){
                    this.state.list_item_remainder[i].byproduct[j].open=false 
                }
            }
        }
        window.onclick=(event)=>{
            let parent=event.target.closest('.popover.HGTXIW')
            if(!e.target.contains(event.target) && !parent){
                shop.show_voucher=false
            }
            this.setState({[list_shop]:shop})
        }
        this.setState({list_item_remainder:this.state.list_item_remainder,list_item_promotion_unique:this.state.list_item_promotion_unique})
        
    }

 

    list_voucher(list_shop,shop,cartitem){
        let list_voucher_unique=[]
        let list_voucher_items=[]
        if(cartitem.voucher_user.length>0){
            for(let k=0;k<cartitem.list_voucher.voucher_info.length;k++){
                if(list_voucher_items[cartitem.list_voucher.voucher_info[k].id]) continue;
                list_voucher_items[cartitem.list_voucher.voucher_info[k].id] = true;
                list_voucher_unique.push({voucher_info:cartitem.list_voucher.voucher_info[k],voucher_user:cartitem.voucher_user[k]});
            }
        }
        shop.list_voucher_unique=list_voucher_unique
        this.setState({[list_shop]:shop})
    }
    
    checkout(e,warring){
        e.stopPropagation()
        if(this.state.count_order>0){
            this.setState({error:false})
            window.location.href='/checkout'
        }
        else{
            this.setState({error:true})
        }
    }

    setshowthread=(order)=>{
        if(this.state.list_threads.length>0 && this.state.list_threads.some(thread=>thread.list_participants.includes(this.state.user.user_id) && thread.list_participants.includes(order.shop_user))){
            let threadchoice=this.state.list_threads.find(thread=>thread.list_participants.includes(this.state.user.user_id) && thread.list_participants.includes(order.shop_user))
            let url=new URL(listThreadlURL)
            let search_params=url.searchParams
            search_params.append('list_thread','ok')
            search_params.append('thread_id',threadchoice.id)
            url.search = search_params.toString();
            let new_url = url.toString();
            axios.get(new_url,headers)
            .then(res => { 
                this.setState({show_thread:true,show_message:true,threadchoice:threadchoice,threads:res.data.threads,messages:res.data.messages})
                })  
            }
        else{
            this.create_thread(order)
        }
    }

    create_thread=(order)=>{
        let form=new FormData()
        form.append('participants',this.state.user.user_id)
        form.append('participants',order.shop_user)
        axios.post(listThreadlURL,form,headers)
        .then(res=>{
            this.setState({show_thread:true,show_message:true,threadchoice:res.data.threadchoice,threads:res.data.threads,messages:res.data.messages})
        })
      }

    item_promotion=(shop)=>{
        return this.state.list_cartitem.find(cartitem=>cartitem.promotion && shop.shop_name==cartitem.shop_name)
    }
    render(){
        console.log(this.props.user)
        let {count,count_order,total,discount_promotion,loading,count_cartitem,
        discount_deal,total_discount,discount_voucher,list_shop,list_item_promotion_unique,
        list_item_remainder,list_voucher_shop,warring,list_cartitem}=this.state
        return(
            <>
                <div id="main">
                    <div className="top container-wrapper">
                        <Navbar/>
                    </div>
                    {loading?
                    <div className="_164M6a">
                        <div className="cart-page-header-wrapper">
                            <div className="container">
                                <div className="item-center">
                                    <div className="cart-page-header">
                                        <a className="cart-page-logo" href="/">
                                            <div></div>
                                            <svg viewBox="0 0 192 65" className="svg-icon icon-logo"><g fillRule="evenodd"><path d="M35.6717403 44.953764c-.3333497 2.7510509-2.0003116 4.9543414-4.5823845 6.0575984-1.4379707.6145919-3.36871.9463856-4.896954.8421628-2.3840266-.0911143-4.6237865-.6708937-6.6883352-1.7307424-.7375522-.3788551-1.8370513-1.1352759-2.6813095-1.8437757-.213839-.1790053-.239235-.2937577-.0977428-.4944671.0764015-.1151823.2172535-.3229831.5286218-.7791994.45158-.6616533.5079208-.7446018.5587128-.8221779.14448-.2217688.3792333-.2411091.6107855-.0588804.0243289.0189105.0243289.0189105.0426824.0333083.0379873.0294402.0379873.0294402.1276204.0990653.0907002.0706996.14448.1123887.166248.1287205 2.2265285 1.7438508 4.8196989 2.7495466 7.4376251 2.8501162 3.6423042-.0496401 6.2615109-1.6873341 6.7308041-4.2020035.5160305-2.7675977-1.6565047-5.1582742-5.9070334-6.4908212-1.329344-.4166762-4.6895175-1.7616869-5.3090528-2.1250697-2.9094471-1.7071043-4.2697358-3.9430584-4.0763845-6.7048539.296216-3.8283059 3.8501677-6.6835796 8.340785-6.702705 2.0082079-.004083 4.0121475.4132378 5.937338 1.2244562.6816382.2873109 1.8987274.9496089 2.3189359 1.2633517.2420093.1777159.2898136.384872.1510957.60836-.0774686.12958-.2055158.3350171-.4754821.7632974l-.0029878.0047276c-.3553311.5640922-.3664286.5817134-.447952.7136572-.140852.2144625-.3064598.2344475-.5604202.0732783-2.0600669-1.3839063-4.3437898-2.0801572-6.8554368-2.130442-3.126914.061889-5.4706057 1.9228561-5.6246892 4.4579402-.0409751 2.2896772 1.676352 3.9613243 5.3858811 5.2358503 7.529819 2.4196871 10.4113092 5.25648 9.869029 9.7292478M26.3725216 5.42669372c4.9022893 0 8.8982174 4.65220288 9.0851664 10.47578358H17.2875686c.186949-5.8235807 4.1828771-10.47578358 9.084953-10.47578358m25.370857 11.57065968c0-.6047069-.4870064-1.0948761-1.0875481-1.0948761h-11.77736c-.28896-7.68927544-5.7774923-13.82058185-12.5059489-13.82058185-6.7282432 0-12.2167755 6.13130641-12.5057355 13.82058185l-11.79421958.0002149c-.59136492.0107446-1.06748731.4968309-1.06748731 1.0946612 0 .0285807.00106706.0569465.00320118.0848825H.99995732l1.6812605 37.0613963c.00021341.1031483.00405483.2071562.01173767.3118087.00170729.0236381.003628.0470614.00554871.0704847l.00362801.0782207.00405483.004083c.25545428 2.5789222 2.12707837 4.6560709 4.67201764 4.7519129l.00576212.0055872h37.4122078c.0177132.0002149.0354264.0004298.0531396.0004298.0177132 0 .0354264-.0002149.0531396-.0004298h.0796027l.0017073-.0015043c2.589329-.0706995 4.6867431-2.1768587 4.9082648-4.787585l.0012805-.0012893.0017073-.0350275c.0021341-.0275062.0040548-.0547975.0057621-.0823037.0040548-.065757.0068292-.1312992.0078963-.1964115l1.8344904-37.207738h-.0012805c.001067-.0186956.0014939-.0376062.0014939-.0565167M176.465457 41.1518926c.720839-2.3512494 2.900423-3.9186779 5.443734-3.9186779 2.427686 0 4.739107 1.6486899 5.537598 3.9141989l.054826.1556978h-11.082664l.046506-.1512188zm13.50267 3.4063683c.014933.0006399.014933.0006399.036906.0008531.021973-.0002132.021973-.0002132.044372-.0008531.53055-.0243144.950595-.4766911.950595-1.0271786 0-.0266606-.000853-.0496953-.00256-.0865936.000427-.0068251.000427-.020262.000427-.0635588 0-5.1926268-4.070748-9.4007319-9.09145-9.4007319-5.020488 0-9.091235 4.2081051-9.091235 9.4007319 0 .3871116.022399.7731567.067838 1.1568557l.00256.0204753.01408.1013102c.250022 1.8683731 1.047233 3.5831812 2.306302 4.9708108-.00064-.0006399.00064.0006399.007253.0078915 1.396026 1.536289 3.291455 2.5833031 5.393601 2.9748936l.02752.0053321v-.0027727l.13653.0228215c.070186.0119439.144211.0236746.243409.039031 2.766879.332724 5.221231-.0661182 7.299484-1.1127057.511777-.2578611.971928-.5423827 1.37064-.8429007.128211-.0968312.243622-.1904632.34346-.2781231.051412-.0452164.092372-.083181.114131-.1051493.468898-.4830897.498124-.6543572.215249-1.0954297-.31146-.4956734-.586228-.9179769-.821744-1.2675504-.082345-.1224254-.154023-.2267215-.214396-.3133151-.033279-.0475624-.033279-.0475624-.054399-.0776356-.008319-.0117306-.008319-.0117306-.013866-.0191956l-.00256-.0038391c-.256208-.3188605-.431565-.3480805-.715933-.0970445-.030292.0268739-.131624.1051493-.14997.1245582-1.999321 1.775381-4.729508 2.3465571-7.455854 1.7760208-.507724-.1362888-.982595-.3094759-1.419919-.5184948-1.708127-.8565509-2.918343-2.3826022-3.267563-4.1490253l-.02752-.1394881h13.754612zM154.831964 41.1518926c.720831-2.3512494 2.900389-3.9186779 5.44367-3.9186779 2.427657 0 4.739052 1.6486899 5.537747 3.9141989l.054612.1556978h-11.082534l.046505-.1512188zm13.502512 3.4063683c.015146.0006399.015146.0006399.037118.0008531.02176-.0002132.02176-.0002132.044159-.0008531.530543-.0243144.950584-.4766911.950584-1.0271786 0-.0266606-.000854-.0496953-.00256-.0865936.000426-.0068251.000426-.020262.000426-.0635588 0-5.1926268-4.070699-9.4007319-9.091342-9.4007319-5.020217 0-9.091343 4.2081051-9.091343 9.4007319 0 .3871116.022826.7731567.068051 1.1568557l.00256.0204753.01408.1013102c.250019 1.8683731 1.04722 3.5831812 2.306274 4.9708108-.00064-.0006399.00064.0006399.007254.0078915 1.396009 1.536289 3.291417 2.5833031 5.393538 2.9748936l.027519.0053321v-.0027727l.136529.0228215c.070184.0119439.144209.0236746.243619.039031 2.766847.332724 5.22117-.0661182 7.299185-1.1127057.511771-.2578611.971917-.5423827 1.370624-.8429007.128209-.0968312.243619-.1904632.343456-.2781231.051412-.0452164.09237-.083181.11413-.1051493.468892-.4830897.498118-.6543572.215246-1.0954297-.311457-.4956734-.586221-.9179769-.821734-1.2675504-.082344-.1224254-.154022-.2267215-.21418-.3133151-.033492-.0475624-.033492-.0475624-.054612-.0776356-.008319-.0117306-.008319-.0117306-.013866-.0191956l-.002346-.0038391c-.256419-.3188605-.431774-.3480805-.716138-.0970445-.030292.0268739-.131623.1051493-.149969.1245582-1.999084 1.775381-4.729452 2.3465571-7.455767 1.7760208-.507717-.1362888-.982582-.3094759-1.419902-.5184948-1.708107-.8565509-2.918095-2.3826022-3.267311-4.1490253l-.027733-.1394881h13.754451zM138.32144123 49.7357905c-3.38129629 0-6.14681004-2.6808521-6.23169343-6.04042014v-.31621743c.08401943-3.35418649 2.85039714-6.03546919 6.23169343-6.03546919 3.44242097 0 6.23320537 2.7740599 6.23320537 6.1960534 0 3.42199346-2.7907844 6.19605336-6.23320537 6.19605336m.00172791-15.67913203c-2.21776751 0-4.33682838.7553485-6.03989586 2.140764l-.19352548.1573553V34.6208558c0-.4623792-.0993546-.56419733-.56740117-.56419733h-2.17651376c-.47409424 0-.56761716.09428403-.56761716.56419733v27.6400724c0 .4539841.10583425.5641973.56761716.5641973h2.17651376c.46351081 0 .56740117-.1078454.56740117-.5641973V50.734168l.19352548.1573553c1.70328347 1.3856307 3.82234434 2.1409792 6.03989586 2.1409792 5.27140956 0 9.54473746-4.2479474 9.54473746-9.48802964 0-5.239867-4.2733279-9.48781439-9.54473746-9.48781439M115.907646 49.5240292c-3.449458 0-6.245805-2.7496948-6.245805-6.1425854 0-3.3928907 2.79656-6.1427988 6.245805-6.1427988 3.448821 0 6.24538 2.7499081 6.24538 6.1427988 0 3.3926772-2.796346 6.1425854-6.24538 6.1425854m.001914-15.5438312c-5.28187 0-9.563025 4.2112903-9.563025 9.4059406 0 5.1944369 4.281155 9.4059406 9.563025 9.4059406 5.281657 0 9.562387-4.2115037 9.562387-9.4059406 0-5.1946503-4.280517-9.4059406-9.562387-9.4059406M94.5919049 34.1890939c-1.9281307 0-3.7938902.6198995-5.3417715 1.7656047l-.188189.1393105V23.2574169c0-.4254677-.1395825-.5643476-.5649971-.5643476h-2.2782698c-.4600414 0-.5652122.1100273-.5652122.5643476v29.2834155c0 .443339.1135587.5647782.5652122.5647782h2.2782698c.4226187 0 .5649971-.1457701.5649971-.5647782v-9.5648406c.023658-3.011002 2.4931278-5.4412923 5.5299605-5.4412923 3.0445753 0 5.516841 2.4421328 5.5297454 5.4630394v9.5430935c0 .4844647.0806524.5645628.5652122.5645628h2.2726775c.481764 0 .565212-.0824666.565212-.5645628v-9.5710848c-.018066-4.8280677-4.0440197-8.7806537-8.9328471-8.7806537M62.8459442 47.7938061l-.0053397.0081519c-.3248668.4921188-.4609221.6991347-.5369593.8179812-.2560916.3812097-.224267.551113.1668119.8816949.91266.7358184 2.0858968 1.508535 2.8774525 1.8955369 2.2023021 1.076912 4.5810275 1.646045 7.1017886 1.6975309 1.6283921.0821628 3.6734936-.3050536 5.1963734-.9842376 2.7569891-1.2298679 4.5131066-3.6269626 4.8208863-6.5794607.4985136-4.7841067-2.6143125-7.7747902-10.6321784-10.1849709l-.0021359-.0006435c-3.7356476-1.2047686-5.4904836-2.8064071-5.4911243-5.0426086.1099976-2.4715346 2.4015793-4.3179454 5.4932602-4.4331449 2.4904317.0062212 4.6923065.6675996 6.8557356 2.0598624.4562232.2767364.666607.2256796.9733188-.172263.035242-.0587797.1332787-.2012238.543367-.790093l.0012815-.0019308c.3829626-.5500403.5089793-.7336731.5403767-.7879478.258441-.4863266.2214903-.6738208-.244985-1.0046173-.459427-.3290803-1.7535544-1.0024722-2.4936356-1.2978721-2.0583439-.8211991-4.1863175-1.2199998-6.3042524-1.1788111-4.8198184.1046878-8.578747 3.2393171-8.8265087 7.3515337-.1572005 2.9703036 1.350301 5.3588174 4.5000778 7.124567.8829712.4661613 4.1115618 1.6865902 5.6184225 2.1278667 4.2847814 1.2547527 6.5186944 3.5630343 6.0571315 6.2864205-.4192725 2.4743234-3.0117991 4.1199394-6.6498372 4.2325647-2.6382344-.0549182-5.2963324-1.0217793-7.6043603-2.7562084-.0115337-.0083664-.0700567-.0519149-.1779185-.1323615-.1516472-.1130543-.1516472-.1130543-.1742875-.1300017-.4705335-.3247898-.7473431-.2977598-1.0346184.1302162-.0346012.0529875-.3919333.5963776-.5681431.8632459"></path></g></svg>
                                            <div className="cart-page-logo__page-name">Giỏ hàng</div>
                                        </a>
                                    </div>
                                    <div className="cart-page-searchbar">
                                        <div className="searchbar" role="combobox" aria-expanded="false" aria-owns="searchbar-listbox">
                                            <div className="searchbar__main">
                                                <form role="search" className="searchbar-input" autoComplete="off">
                                                    <input aria-label="5 mã Freeship có sẵn trong ví" className="searchbar-input__input" maxLength="128" placeholder="5 mã Freeship có sẵn trong ví" autoComplete="off" aria-autocomplete="list" aria-controls="searchbar-listbox" value=""/>
                                                </form>
                                            </div>
                                            <button type="button" className="btn btn-solid-primary btn--s btn--inline searchbar__search-button">
                                                <svg height="19" viewBox="0 0 19 19" width="19" className="svg-icon "><g fillRule="evenodd" stroke="none" strokeWidth="1"><g transform="translate(-1016 -32)"><g><g transform="translate(405 21)"><g transform="translate(611 11)"><path d="m8 16c4.418278 0 8-3.581722 8-8s-3.581722-8-8-8-8 3.581722-8 8 3.581722 8 8 8zm0-2c-3.3137085 0-6-2.6862915-6-6s2.6862915-6 6-6 6 2.6862915 6 6-2.6862915 6-6 6z"></path><path d="m12.2972351 13.7114222 4.9799555 4.919354c.3929077.3881263 1.0260608.3842503 1.4141871-.0086574.3881263-.3929076.3842503-1.0260607-.0086574-1.414187l-4.9799554-4.919354c-.3929077-.3881263-1.0260608-.3842503-1.4141871.0086573-.3881263.3929077-.3842503 1.0260608.0086573 1.4141871z"></path></g></g></g></g></g></svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="containers">
                            <div className="_1nft6V">
                                <div className="_2cf99j">
                                    <svg height="12" viewBox="0 0 20 12" width="20" className="svg-icon _1NxVa_ icon-free-shipping"><g fill="none" fillRule="evenodd" transform=""><rect fill="#00bfa5" fillRule="evenodd" height="9" rx="1" width="12" x="4"></rect><rect height="8" rx="1" stroke="#00bfa5" width="11" x="4.5" y=".5"></rect><rect fill="#00bfa5" fillRule="evenodd" height="7" rx="1" width="7" x="13" y="2"></rect><rect height="6" rx="1" stroke="#00bfa5" width="6" x="13.5" y="2.5"></rect><circle cx="8" cy="10" fill="#00bfa5" r="2"></circle><circle cx="15" cy="10" fill="#00bfa5" r="2"></circle><path d="m6.7082481 6.7999878h-.7082481v-4.2275391h2.8488017v.5976563h-2.1405536v1.2978515h1.9603297v.5800782h-1.9603297zm2.6762505 0v-3.1904297h.6544972v.4892578h.0505892c.0980164-.3134765.4774351-.5419922.9264138-.5419922.0980165 0 .2276512.0087891.3003731.0263672v.6210938c-.053751-.0175782-.2624312-.038086-.3762568-.038086-.5122152 0-.8758247.3017578-.8758247.75v1.8837891zm3.608988-2.7158203c-.5027297 0-.8536919.328125-.8916338.8261719h1.7390022c-.0158092-.5009766-.3446386-.8261719-.8473684-.8261719zm.8442065 1.8544922h.6544972c-.1549293.571289-.7050863.9228515-1.49238.9228515-.9864885 0-1.5903965-.6269531-1.5903965-1.6464843 0-1.0195313.6165553-1.6669922 1.5872347-1.6669922.9580321 0 1.5366455.6064453 1.5366455 1.6083984v.2197266h-2.4314412v.0351562c.0221328.5595703.373095.9140625.9169284.9140625.4110369 0 .6924391-.1376953.8189119-.3867187zm2.6224996-1.8544922c-.5027297 0-.853692.328125-.8916339.8261719h1.7390022c-.0158091-.5009766-.3446386-.8261719-.8473683-.8261719zm.8442064 1.8544922h.6544972c-.1549293.571289-.7050863.9228515-1.49238.9228515-.9864885 0-1.5903965-.6269531-1.5903965-1.6464843 0-1.0195313.6165553-1.6669922 1.5872347-1.6669922.9580321 0 1.5366455.6064453 1.5366455 1.6083984v.2197266h-2.4314412v.0351562c.0221328.5595703.373095.9140625.9169284.9140625.4110369 0 .6924391-.1376953.8189119-.3867187z" fill="#fff"></path><path d="m .5 8.5h3.5v1h-3.5z" fill="#00bfa5"></path><path d="m0 10.15674h3.5v1h-3.5z" fill="#00bfa5"></path><circle cx="8" cy="10" fill="#047565" r="1"></circle><circle cx="15" cy="10" fill="#047565" r="1"></circle></g></svg><span className="_1Xcrmf">Nhấn vào mục Mã giảm giá ở cuối trang để hưởng miễn phí vận chuyển bạn nhé!</span>
                                </div>
                                <div className="item-col">
                                    <div className="order-total-header">
                                        <div className="item-check">
                                            <label className={`stardust-checkbox ${count==count_cartitem?'stardust-checkbox--checked':''}`}>
                                                <input defaultChecked onChange={e=>this.checkall(e)} checked={count_cartitem==count?true:false}  className="stardust-checkbox__input" type="checkbox"/>
                                                <div className="stardust-checkbox__box"></div>
                                            </label>
                                        </div>
                                        <div className="item-name">Product</div>
                                        <div className="item-price">Price</div>
                                        <div className="item-quantity">Quantity</div>
                                        <div className="item-total-price">Total Item Price</div>
                                        <div className="item-action">Action</div>    
                                    </div>
                                    {
                                        this.state.list_shop.map((shop,index)=>{
                                            return(
                                            <div className="order-total-shop" key={shop.shop_name}>
                                                <div className="item-center shop-info _3ApheT">
                                                    <div className="item-check">
                                                        <label className={`stardust-checkbox ${list_cartitem.some(item => !item.check && item.shop_name==shop.shop_name)?'':'stardust-checkbox--checked'}`}>
                                                            <input onChange={(e)=>this.checkshop(e,shop)} checked={list_cartitem.some(item => !item.check&&item.shop_name==shop.shop_name)?false:true} className="stardust-checkbox__input" type="checkbox"/>
                                                            <div className="stardust-checkbox__box"></div>
                                                        </label>
                                                    </div>
                                                    <div className="shop-name">{shop.shop_name}</div>
                                                    <button onClick={()=>this.setshowthread(shop)} className="_13iGI_">
                                                        <svg viewBox="0 0 16 16" className="svg-icon _2KYoW7 "><g fillRule="evenodd"><path d="M15 4a1 1 0 01.993.883L16 5v9.932a.5.5 0 01-.82.385l-2.061-1.718-8.199.001a1 1 0 01-.98-.8l-.016-.117-.108-1.284 8.058.001a2 2 0 001.976-1.692l.018-.155L14.293 4H15zm-2.48-4a1 1 0 011 1l-.003.077-.646 8.4a1 1 0 01-.997.923l-8.994-.001-2.06 1.718a.5.5 0 01-.233.108l-.087.007a.5.5 0 01-.492-.41L0 11.732V1a1 1 0 011-1h11.52zM3.646 4.246a.5.5 0 000 .708c.305.304.694.526 1.146.682A4.936 4.936 0 006.4 5.9c.464 0 1.02-.062 1.608-.264.452-.156.841-.378 1.146-.682a.5.5 0 10-.708-.708c-.185.186-.445.335-.764.444a4.004 4.004 0 01-2.564 0c-.319-.11-.579-.258-.764-.444a.5.5 0 00-.708 0z"></path></g></svg>
                                                    </button>
                                                </div>
                                                <div className="shop_item">
                                                    {this.item_promotion(shop)?
                                                        <div className="shop-item-order">
                                                            <div className="shop-discount">
                                                                <span className="discount">Promotion combo</span>
                                                                <span className="discount-title">Buy {this.item_promotion(shop).promotion.quantity_to_reduced} more {this.item_promotion(shop).promotion.combo_type=='1'?` (will be reduced ${this.item_promotion(shop).promotion.discount_percent}%)`:this.item_promotion(shop).promotion.combo_type=='2'?` (will be reduced ₫${formatter.format(this.item_promotion(shop).promotion.discount_price)}`:` (only with ₫${formatter.format(this.item_promotion(shop).promotion.price_special_sale)}`}</span>
                                                                    <span className="add-byproduct">
                                                                        <Link to={this.item_promotion(shop).promotion.combo_url}>Add
                                                                            <svg viewBox="0 0 12 12" fill="none" width="12" height="12" color="#ee4d2d" className="_1KsfYG"><path fillRule="evenodd" clipRule="evenodd" d="M9.293 6L4.146.854l.708-.708L10 5.293a1 1 0 010 1.414l-5.146 5.147-.708-.707L9.293 6z" fill="currentColor"></path></svg>
                                                                        </Link>
                                                                    </span>
                                                                </div>
                                                                {list_cartitem.filter(cartitem=>cartitem.promotion && cartitem.shop_name==shop.shop_name).map((item,i)=>{
                                                                    <Iteminfo
                                                                    item={item}
                                                                    adjustitem={(e,item,product,cartitemchoice,value)=>this.adjustitem(e,item,product,cartitemchoice,value)}
                                                                    removeitem={(e,item,product)=>this.removeitem(e,item,product)}
                                                                    checked={(e,item)=>this.checked(e,item)}
                                                                    product='mainproduct'
                                                                    shop={shop}
                                                                    />
                    
                                                                }
                                                            )}
                                                        </div>
                                                    :''}
                                                    {list_cartitem.filter(cartitem=>!cartitem.promotion &&shop.shop_name==cartitem.shop_name).map((cartitem,i)=>
                                                        <div className="shop-item-order">
                                                            {cartitem.shock_deal_type!==null?
                                                                <div className="shop-discount">
                                                                    <span className="discount">Deal sốc</span>
                                                                    <span className="discount-title">{cartitem.shock_deal_type=='1'?'Mua kèm deal shock':'Buy to receive gift'}</span>
                                                                        <span className="add-byproduct">
                                                                            <Link to={cartitem.variation_url}>{cartitem.byproduct.length>0?'Edit':'Add'}
                                                                                <svg viewBox="0 0 12 12" fill="none" width="12" height="12" color="#ee4d2d" className="_1KsfYG"><path fillRule="evenodd" clipRule="evenodd" d="M9.293 6L4.146.854l.708-.708L10 5.293a1 1 0 010 1.414l-5.146 5.147-.708-.707L9.293 6z" fill="currentColor"></path></svg>
                                                                            </Link>
                                                                        </span>
                                                                </div>
                                                            :''}
                                                            <Iteminfo
                                                                item={cartitem}
                                                                i={i}
                                                                product='mainproduct'
                                                                shop={shop}
                                                            />
                                                            {cartitem.byproduct.length>0?<div className="_1fU7BV"></div>:""}
                                                                {cartitem.byproduct.map((item,j)=>{     
                                                                    <Iteminfo
                                                                    item={item}
                                                                    i={j}
                                                                    shop={shop}
                                                                    product='byproduct'
                                                                    cartitem={cartitem}
                                                                    />
                                                                }   
                                                            )}
                                                        </div>
                                                    )}
                                                    
                                                </div>
                                                { shop.list_voucher_unique.length>0?
                                                <div className="_2KyioW">
                                                    <svg fill="none" viewBox="0 -2 23 22" className="svg-icon _195k0Z icon-voucher-line"><g filter="url(#voucher-filter0_d)"><mask id="a" fill="#fff"><path fillRule="evenodd" clipRule="evenodd" d="M1 2h18v2.32a1.5 1.5 0 000 2.75v.65a1.5 1.5 0 000 2.75v.65a1.5 1.5 0 000 2.75V16H1v-2.12a1.5 1.5 0 000-2.75v-.65a1.5 1.5 0 000-2.75v-.65a1.5 1.5 0 000-2.75V2z"></path></mask><path d="M19 2h1V1h-1v1zM1 2V1H0v1h1zm18 2.32l.4.92.6-.26v-.66h-1zm0 2.75h1v-.65l-.6-.26-.4.91zm0 .65l.4.92.6-.26v-.66h-1zm0 2.75h1v-.65l-.6-.26-.4.91zm0 .65l.4.92.6-.26v-.66h-1zm0 2.75h1v-.65l-.6-.26-.4.91zM19 16v1h1v-1h-1zM1 16H0v1h1v-1zm0-2.12l-.4-.92-.6.26v.66h1zm0-2.75H0v.65l.6.26.4-.91zm0-.65l-.4-.92-.6.26v.66h1zm0-2.75H0v.65l.6.26.4-.91zm0-.65l-.4-.92-.6.26v.66h1zm0-2.75H0v.65l.6.26.4-.91zM19 1H1v2h18V1zm1 3.32V2h-2v2.32h2zm-.9 1.38c0-.2.12-.38.3-.46l-.8-1.83a2.5 2.5 0 00-1.5 2.29h2zm.3.46a.5.5 0 01-.3-.46h-2c0 1.03.62 1.9 1.5 2.3l.8-1.84zm.6 1.56v-.65h-2v.65h2zm-.9 1.38c0-.2.12-.38.3-.46l-.8-1.83a2.5 2.5 0 00-1.5 2.29h2zm.3.46a.5.5 0 01-.3-.46h-2c0 1.03.62 1.9 1.5 2.3l.8-1.84zm.6 1.56v-.65h-2v.65h2zm-.9 1.38c0-.2.12-.38.3-.46l-.8-1.83a2.5 2.5 0 00-1.5 2.29h2zm.3.46a.5.5 0 01-.3-.46h-2c0 1.03.62 1.9 1.5 2.3l.8-1.84zM20 16v-2.13h-2V16h2zM1 17h18v-2H1v2zm-1-3.12V16h2v-2.12H0zm1.4.91a2.5 2.5 0 001.5-2.29h-2a.5.5 0 01-.3.46l.8 1.83zm1.5-2.29a2.5 2.5 0 00-1.5-2.3l-.8 1.84c.18.08.3.26.3.46h2zM0 10.48v.65h2v-.65H0zM.9 9.1a.5.5 0 01-.3.46l.8 1.83A2.5 2.5 0 002.9 9.1h-2zm-.3-.46c.18.08.3.26.3.46h2a2.5 2.5 0 00-1.5-2.3L.6 8.65zM0 7.08v.65h2v-.65H0zM.9 5.7a.5.5 0 01-.3.46l.8 1.83A2.5 2.5 0 002.9 5.7h-2zm-.3-.46c.18.08.3.26.3.46h2a2.5 2.5 0 00-1.5-2.3L.6 5.25zM0 2v2.33h2V2H0z" mask="url(#a)"></path></g><path clipRule="evenodd" d="M6.49 14.18h.86v-1.6h-.86v1.6zM6.49 11.18h.86v-1.6h-.86v1.6zM6.49 8.18h.86v-1.6h-.86v1.6zM6.49 5.18h.86v-1.6h-.86v1.6z"></path><defs><filter id="voucher-filter0_d" x="0" y="1" width="20" height="16" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix><feOffset></feOffset><feGaussianBlur stdDeviation=".5"></feGaussianBlur><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.09 0"></feColorMatrix><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"></feBlend><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"></feBlend></filter></defs></svg>
                                                    <div className="_3AO0Qs">
                                                        <div className="_3jzcVN">{shop.discount_voucher_shop>0 && shop.loading_voucher?`Shop Voucher giảm ₫${formatter.format(shop.discount_voucher_shop)}`:shop.discount_voucher_shop==0 && shop.loading_voucher?`Shop Voucher giảm đến 10%`:'Dang tai...'}</div>
                                                        <div className="_2HbD-j">Mới</div>
                                                        <div ref={this.voucherapply} className="jYNW8J" onClick={(e)=>this.add_voucher(e,shop,list_shop)} style={{position: 'relative'}}>
                                                            <div className="sCcysm">Xem thêm voucher</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                :''}
                                                <div className="_1UHCH_">
                                                    <svg enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className="svg-icon _2MyMZE icon-free-shipping-line"><g><line fill="none" strokeLinejoin="round" strokeiterlimit="10" x1="8.6" x2="4.2" y1="9.8" y2="9.8"></line><circle cx="3" cy="11.2" fill="none" r="2" strokeIterlimit="10"></circle><circle cx="10" cy="11.2" fill="none" r="2" strokeiterlimit="10"></circle><line fill="none" strokeiterlimit="10" x1="10.5" x2="14.4" y1="7.3" y2="7.3"></line><polyline fill="none" points="1.5 9.8 .5 9.8 .5 1.8 10 1.8 10 9.1" strokeLinejoin="round" strokeiterlimit="10"></polyline><polyline fill="none" points="9.9 3.8 14 3.8 14.5 10.2 11.9 10.2" strokeLinejoin="round" strokeiterlimit="10"></polyline></g></svg>
                                                    <div className="UNDzvL">Giảm ₫15.000 phí vận chuyển đơn tối thiểu ₫50.000; Giảm ₫70.000 phí vận chuyển đơn tối thiểu ₫300.000</div><div className="drawer" id="pc-drawer-id-0" tabIndex="0">
                                                        <span className="_3xILt1"> Tìm hiểu thêm </span>
                                                    </div>
                                                </div>
                                            </div>
                                            )
                                        })
                                    }
                                </div>  
                                <div className="_2jol0L _3GVi82">
                                    <div className="_2gJN5P _1vM5hW">
                                        <svg fill="none" viewBox="0 -2 23 22" className="svg-icon icon-voucher-line"><g filter="url(#voucher-filter0_d)"><mask id="a" fill="#fff"><path fillRule="evenodd" clipRule="evenodd" d="M1 2h18v2.32a1.5 1.5 0 000 2.75v.65a1.5 1.5 0 000 2.75v.65a1.5 1.5 0 000 2.75V16H1v-2.12a1.5 1.5 0 000-2.75v-.65a1.5 1.5 0 000-2.75v-.65a1.5 1.5 0 000-2.75V2z"></path></mask><path d="M19 2h1V1h-1v1zM1 2V1H0v1h1zm18 2.32l.4.92.6-.26v-.66h-1zm0 2.75h1v-.65l-.6-.26-.4.91zm0 .65l.4.92.6-.26v-.66h-1zm0 2.75h1v-.65l-.6-.26-.4.91zm0 .65l.4.92.6-.26v-.66h-1zm0 2.75h1v-.65l-.6-.26-.4.91zM19 16v1h1v-1h-1zM1 16H0v1h1v-1zm0-2.12l-.4-.92-.6.26v.66h1zm0-2.75H0v.65l.6.26.4-.91zm0-.65l-.4-.92-.6.26v.66h1zm0-2.75H0v.65l.6.26.4-.91zm0-.65l-.4-.92-.6.26v.66h1zm0-2.75H0v.65l.6.26.4-.91zM19 1H1v2h18V1zm1 3.32V2h-2v2.32h2zm-.9 1.38c0-.2.12-.38.3-.46l-.8-1.83a2.5 2.5 0 00-1.5 2.29h2zm.3.46a.5.5 0 01-.3-.46h-2c0 1.03.62 1.9 1.5 2.3l.8-1.84zm.6 1.56v-.65h-2v.65h2zm-.9 1.38c0-.2.12-.38.3-.46l-.8-1.83a2.5 2.5 0 00-1.5 2.29h2zm.3.46a.5.5 0 01-.3-.46h-2c0 1.03.62 1.9 1.5 2.3l.8-1.84zm.6 1.56v-.65h-2v.65h2zm-.9 1.38c0-.2.12-.38.3-.46l-.8-1.83a2.5 2.5 0 00-1.5 2.29h2zm.3.46a.5.5 0 01-.3-.46h-2c0 1.03.62 1.9 1.5 2.3l.8-1.84zM20 16v-2.13h-2V16h2zM1 17h18v-2H1v2zm-1-3.12V16h2v-2.12H0zm1.4.91a2.5 2.5 0 001.5-2.29h-2a.5.5 0 01-.3.46l.8 1.83zm1.5-2.29a2.5 2.5 0 00-1.5-2.3l-.8 1.84c.18.08.3.26.3.46h2zM0 10.48v.65h2v-.65H0zM.9 9.1a.5.5 0 01-.3.46l.8 1.83A2.5 2.5 0 002.9 9.1h-2zm-.3-.46c.18.08.3.26.3.46h2a2.5 2.5 0 00-1.5-2.3L.6 8.65zM0 7.08v.65h2v-.65H0zM.9 5.7a.5.5 0 01-.3.46l.8 1.83A2.5 2.5 0 002.9 5.7h-2zm-.3-.46c.18.08.3.26.3.46h2a2.5 2.5 0 00-1.5-2.3L.6 5.25zM0 2v2.33h2V2H0z" mask="url(#a)"></path></g><path clipRule="evenodd" d="M6.49 14.18h.86v-1.6h-.86v1.6zM6.49 11.18h.86v-1.6h-.86v1.6zM6.49 8.18h.86v-1.6h-.86v1.6zM6.49 5.18h.86v-1.6h-.86v1.6z"></path><defs><filter id="voucher-filter0_d" x="0" y="1" width="20" height="16" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix><feOffset></feOffset><feGaussianBlur stdDeviation=".5"></feGaussianBlur><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.09 0"></feColorMatrix><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"></feBlend><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"></feBlend></filter></defs></svg>
                                        <div className="_2YRnUZ">Anhdai Voucher</div>
                                        <div className="_4WXRJn"></div>
                                        <span className="_3fKJp8">Chọn hoặc nhập mã</span>
                                    </div>
                                    <div className="_1ri0rT _3c0xgj"></div>
                                    <div className="j1liQm _2VzSPd">
                                        <label className="stardust-checkbox stardust-checkbox--disabled">
                                            <input className="stardust-checkbox__input" checked type="checkbox"/>
                                            <div className="stardust-checkbox__box"></div>
                                        </label>
                                    </div>
                                    <div className="j1liQm DOOM4N _2gEAGZ item-center">
                                        <svg fill="none" viewBox="0 0 18 18" className="svg-icon _1nDYM0 icon-coin-line"><path stroke="#FFA600" strokeWidth="1.3" d="M17.35 9A8.35 8.35 0 11.65 9a8.35 8.35 0 0116.7 0z"></path><path fill="#FFA600" fillRule="evenodd" stroke="#FFA600" strokeWidth=".2" d="M6.86 4.723c-.683.576-.998 1.627-.75 2.464.215.725.85 1.258 1.522 1.608.37.193.77.355 1.177.463.1.027.2.051.3.08.098.03.196.062.294.096.06.021.121.044.182.067.017.006.107.041.04.014-.07-.028.071.03.087.037.286.124.56.27.82.44.114.076.045.024.151.111a2.942 2.942 0 01.322.303c.087.093.046.042.114.146.18.275.245.478.235.8-.01.328-.14.659-.325.867-.47.53-1.232.73-1.934.696a4.727 4.727 0 01-1.487-.307c-.45-.182-.852-.462-1.242-.737-.25-.176-.643-.04-.788.197-.17.279-.044.574.207.75.753.532 1.539.946 2.474 1.098.885.144 1.731.124 2.563-.224.78-.326 1.416-.966 1.607-1.772.198-.838-.023-1.644-.61-2.29-.683-.753-1.722-1.17-2.706-1.43a4.563 4.563 0 01-.543-.183c.122.048-.044-.02-.078-.035a4.77 4.77 0 01-.422-.212c-.594-.338-.955-.722-.872-1.369.105-.816.757-1.221 1.555-1.28.808-.06 1.648.135 2.297.554.614.398 1.19-.553.58-.947-1.33-.86-3.504-1.074-4.77-.005z" clipRule="evenodd"></path></svg>
                                        <div className="_1hOsmP">Anhdai Xu</div>
                                        <div className="_1WYjnM">Bạn chưa có Anhdai Xu</div>
                                        <div className="stardust-popover _5Io674">
                                            <div role="button" aria-describedby="stardust-popover0" className="stardust-popover__target">
                                                <div>
                                                    <svg enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className="svg-icon _21ZtEX icon-help"><g><circle cx="7.5" cy="7.5" fill="none" r="6.5" strokeMiterlimit="10"></circle><path d="m5.3 5.3c.1-.3.3-.6.5-.8s.4-.4.7-.5.6-.2 1-.2c.3 0 .6 0 .9.1s.5.2.7.4.4.4.5.7.2.6.2.9c0 .2 0 .4-.1.6s-.1.3-.2.5c-.1.1-.2.2-.3.3-.1.2-.2.3-.4.4-.1.1-.2.2-.3.3s-.2.2-.3.4c-.1.1-.1.2-.2.4s-.1.3-.1.5v.4h-.9v-.5c0-.3.1-.6.2-.8s.2-.4.3-.5c.2-.2.3-.3.5-.5.1-.1.3-.3.4-.4.1-.2.2-.3.3-.5s.1-.4.1-.7c0-.4-.2-.7-.4-.9s-.5-.3-.9-.3c-.3 0-.5 0-.7.1-.1.1-.3.2-.4.4-.1.1-.2.3-.3.5 0 .2-.1.5-.1.7h-.9c0-.3.1-.7.2-1zm2.8 5.1v1.2h-1.2v-1.2z" stroke="none"></path></g></svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="j1liQm _8tayl2 z2gYIU">-₫0</div>
                                    <div className="_1ri0rT _2amAdj"></div>
                                    <div className="W2HjBQ zzOmij">
                                        <div className="_1E2dyV">
                                            <label className={`stardust-checkbox ${count==count_cartitem?'stardust-checkbox--checked':''}`}>
                                                <input  onChange={e=>this.checkall(e)} checked={count_cartitem==count?true:false}  className="stardust-checkbox__input" type="checkbox"/>
                                                <div className="stardust-checkbox__box"></div>
                                            </label>
                                        </div>
                                        <button className="_28e55C clear-btn-style">Chọn tất cả ({this.state.count})</button>
                                        <button className="clear-btn-style j9RJQY">Xóa</button>
                                        <div className=""><button className="clear-btn-style">Bỏ sản phẩm không hoạt động</button></div>
                                        <button className="clear-btn-style _2mPWt7">Lưu vào mục Đã thích</button>
                                        <div className="_2ntEgZ"></div>
                                        {total_discount>0||discount_deal>0||discount_promotion>0||discount_voucher>0 && this.state.show_order?
                                        <div className="stardust-popover" onMouseEnter={()=>this.setState({show_order:true})} onMouseLeave={()=>this.setState({show_order:false})}>
                                            <div className="stardust-popover__target">
                                                <div className="_2BT_es">
                                                    <div className="item-center">
                                                        <div className="flex-end _2LMWss">
                                                            <div className="_10A7e2">Total payment ({count_order} {count_order>1?'products':'product'}):</div>
                                                            <div className="nBHs8H">₫{formatter.format(total-total_discount-discount_voucher-discount_promotion-discount_deal)}</div>
                                                        </div>
                                                        <div className="M2OhX6">
                                                            <svg viewBox="0 0 12 12" fill="none" width="12" height="12" color="rgba(0, 0, 0, 0.54)"><path fillRule="evenodd" clipRule="evenodd" d="M6 4L.854 9.146.146 8.44l5.147-5.146a1 1 0 011.414 0l5.147 5.146-.707.707L6 4z" fill="currentColor"></path></svg>
                                                        </div>
                                                    </div>
                                                    <div className="_1TwgPm">Tiết kiệm<span className="_2e4fz5">₫{formatter.format(total_discount+discount_voucher+discount_promotion+discount_deal)}k</span></div>
                                                </div>
                                            </div>
                                            {this.state.show_order?
                                                <div className="stardust-popover__popover stardust-popover__popover--show" style={{top:'-312px',right:'0',transformOrigin:'441.758px bottom'}}>
                                                    <div className="stardust-popover__arrow" style={{bottom: '-19px', left: '441.758px', transform: 'translate(-6px, -100%)', borderTop: '10px solid rgb(255, 255, 255)', borderLeft: '0px solid transparent', borderRight: '0px solid transparent'}}>
                                                        <div className="stardust-popover__arrow--inner" style={{borderTop: '16px solid rgb(255, 255, 255)', borderLeft: '12px solid transparent', borderRight: '12px solid transparent', top: '-10px'}}></div>
                                                    </div>
                                                    <div className="_3_1Trb">
                                                        <div className="_1P0ZXf">Chi tiết khuyến mãi</div>
                                                        <div className="_2gELoZ">
                                                            <div className="_1219oq">
                                                                <span className="_1QnjKN">Tổng tiền hàng</span>
                                                                <span>₫{formatter.format(this.state.total)}</span>
                                                            </div>
                                                        </div>
                                                        <div className="_2gELoZ _16PoCd">
                                                            {this.state.total_discount>0?
                                                            <div className="_1219oq">
                                                                <span className="_1QnjKN">Giảm giá sản phẩm</span>
                                                                <span className="">-₫{formatter.format(this.state.total_discount)}</span>
                                                            </div>:''}
                                                            {this.state.discount_voucher>0?
                                                                <div className="_1219oq">
                                                                    <span className="_1QnjKN">Voucher giảm giá</span>
                                                                    <span className="">-₫{formatter.format(this.state.discount_voucher)}</span>
                                                                </div>:''}
                                                            {this.state.discount_deal>0?                                                
                                                            <div className="_1219oq">
                                                                <span className="_1QnjKN">Giảm giá deal</span>
                                                                <span className="">-₫{formatter.format(this.state.discount_deal)}</span>
                                                            </div>:''}
                                                            {this.state.discount_promotion>0?
                                                                <div className="_1219oq">
                                                                    <span className="_1QnjKN">Giảm giá khuyến mãi</span>
                                                                    <span className="">-₫{formatter.format(this.state.discount_promotion)}</span>
                                                                </div>:''}
                                                        </div>
                                                        <div className="_2gELoZ">
                                                            <div className="_1219oq">
                                                                <span className="_1QnjKN uDWyka">Tiết kiệm</span>
                                                                <span className="imvFus">-₫{formatter.format(this.state.total_discount+this.state.discount_voucher+this.state.discount_promotion+this.state.discount_deal)}</span>
                                                            </div>
                                                            <div className="_1219oq">
                                                                <span className="_1QnjKN uDWyka">Tổng số tiền</span>
                                                                <span className="_3pc_Bt">₫{formatter.format(this.state.total-this.state.total_discount-discount_voucher-this.state.discount_promotion-this.state.discount_deal)}</span>
                                                            </div>
                                                            <div className="K9ylvZ">Số tiền cuối cùng thanh toán</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            :''}
                                        </div>:
                                        <div className="_2BT_es">
                                            <div className="flex-end _2LMWss">
                                                <div className="_10A7e2">Total payment ({count_order} {count_order>1?'products':'product'}):</div>
                                                <div className="nBHs8H">₫{formatter.format(total)}</div>
                                            </div>
                                        </div>}
                                            
                                        <button onClick={(e)=>this.checkout(e,warring)} className="button-solid button-solid--primary">
                                            <span className="kcsswk">Mua hàng</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="_3BIslJ">
                        <div className="loading_item item-center">
                            <div className="ball"></div>
                            <div className="ball"></div>
                            <div className="ball"></div>
                        </div>
                    </div>
                    }
                </div>
                <div id="modal">
                    <Divbox
                        shop={this.state.shopchoice}
                        elem={this.voucherapply.current}
                        list_item_promotion_unique={this.state.list_item_promotion_unique}
                        list_item_remainder={this.state.list_item_remainder}
                        apply_voucher={voucher=>this.apply_voucher(voucher,this.state.shopchoice,this.state.list_shop)}
                        remove_voucher={voucher=>this.remove_voucher(voucher,this.state.shopchoice,this.state.list_shop)}
                        save_voucher={voucher=>this.save_voucher(voucher,this.state.shopchoice,this.state.list_shop)}
                        />
                    {this.state.error?
                    <div className="popup modal__transition-enter-done">
                        <div className="popup__overlay"></div>
                        <div className="popup__container">
                            <div className="alert-popup card">
                                <div className="alert-popup__message">Bạn vẫn chưa chọn sản phẩm nào để mua.
                                    <div className="alert-popup__message-list"></div>
                                </div>
                                <div className="alert-popup__button-horizontal-layout">
                                    <button onClick={()=>this.setState({error:false})} className="button-solid button-solid--primary ">OK</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    :''}
                </div>
            </>
        )
    }
}
const mapStateToProps = state => ({
    isAuthenticated: state.isAuthenticated,user:state.user
});

export default connect(mapStateToProps)(Cart);

  