import axios from 'axios';
import Navbar from "../seller/Navbar"
import Timeoffer from "./Timeoffer"
import {Link,useNavigate,useParams} from 'react-router-dom'
import React, {useState,useEffect,useCallback,memo,useMemo} from 'react'
import {formatter,valid_from,valid_to,time_end,timesubmit} from "../constants"
import {headers} from "../actions/auth"
import { newFollowOffershopURL,detailFollowOffershopURL } from '../urls';

let Pagesize=5
const FollowerOfferInfo=(props)=>{
    const navite=useNavigate();
    const [state,setState]=useState({timeSecond:5,code_type:[{image:'http://localhost:8000/media/my_web/shop.png',value:'All',name:"All product"},
        {image:'http://localhost:8000/media/my_web/product.png',value:'Product',name:"Product"}],
        discount_type:[{value:'1',name:"Percent"},{value:'2',name:"Amount"}],voucher_type:[
        {value:'Offer'},{value:'Complete coin'}],
        limit:[{value:'L',name:'Limited'},{value:'U',name:'Unlimited'}],open_discount:false,open_time:false})
    const [follower_offer,setFolloweroffer]=useState({offer_name:'',
        discount_type:'1',amount:null,percent:null,
        maximum_usage:null,voucher_type:"Offer",maximum_discount:0,minimum_order_value:null,
        valid_from:valid_from.toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).substr(0,16),
        valid_to:valid_to.toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).substr(0,16),
        setting_display:'Show many'})
   
    const [open,setOpen]=useState(false)
    const [show,setShow]=useState({items:false,byproduct:false})
    const [currentPage, setCurrentPage] = useState({items:1,byproduct:1});
    const [loading,setLoading]=useState(false)
    const [timeend,setTime_end]=useState(()=>time_end.toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).substr(0,16))
    const [timestart,setTime_start]=useState(()=>new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).substr(0,16))
    const {id}=useParams()
    const edit=id?true:false
    const url=id?`${detailFollowOffershopURL}/${id}`:newFollowOffershopURL
    useEffect(() => {
        (async () => {
            if(id){
                const res = await axios(url,headers)
                const data=res.data
                const limit=data.maximum_discount==null?'U':'L'
                setFolloweroffer({...data,limit:limit,valid_from:timesubmit(data.valid_from),valid_to:timesubmit(data.valid_to)})
                setLoading(true)
                setTime_end(timesubmit(data.valid_to))
                setTime_start(timesubmit(data.valid_from))
            }
            else{
                setLoading(true)
            }
          })();
    }, [id])
    
    const opendiscount=(e)=>{
        setState({...state,open_discount:!state.open_discount})
        window.onclick=(event)=>{
            let parent=event.target.closest('.select__menu')
            if(!e.target.contains(event.target) && !parent){
                setState({...state,open_discount:false})
            }
        }
    }

    const setform=(e)=>{
        setFolloweroffer({...follower_offer,[e.target.name]:e.target.value})
    }

    const complete=()=>{
        if(follower_offer.offer_name==''){
            return 
        }
        else{
            const data={...follower_offer,action:'submit'}
            axios.post(url,JSON.stringify(data),headers)
            .then(res=>{
                if(res.data.success){
                    const countDown = setInterval(() => {
                        state.timeSecond--;
                        setState({...state,complete:true})
                        if (state.timeSecond <= 0) {
                            clearInterval(countDown)
                            setState({...state,complete:false})
                            navite('/marketing/follow-prize/list')
                        }
                    }, 1000);
                }
            })
        }
    }
    
    const setdatevalid=(index,date)=>{
        if(index==0){
            setFolloweroffer({...follower_offer,valid_from:date.time.toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).substr(0,10)+' '+('0'+date.hours).slice(-2)+':'+("0"+date.minutes).slice(-2)})
        }
        else{
            setFolloweroffer({...follower_offer,valid_to:date.time.toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).substr(0,10)+' '+('0'+date.hours).slice(-2)+':'+("0"+date.minutes).slice(-2)})
        }
    }


    const setdiscount=(item)=>{
        setFolloweroffer({...follower_offer,discount_type:item.value})
        setState({...state,open_discount:false})
    }
   
    return(
        <>
            <div id="app">
                <Navbar/>
                <div className="wrapper">
                    {loading && (<div className="content-wrapper">
                        <div className="banner">
                            Tạo mã giảm giá mới
                        </div>
                        <div className="voucher-shop-container">
                            <div className="vourcher-shop">
                                <div className="voucher-basic-info">
                                    <h4>info basic</h4>
                                    <div className="basic-info-wrapper">
                                        <div>
                                            
                                            <div className="item-base-lines ">
                                                <label for="" className="form-item__label">
                                                    Tên Ưu Đãi
                                                </label>
                                                <div className="item-col">
                                                    <div className="input-inner" style={{width: '450px'}}> 
                                                        <input onChange={(e)=>setform(e)} type="text" value={follower_offer.offer_name}  className="form-select" name="offer_name" placeholder="Enter" style={{width: '450px'}} required/>
                                                        <div className="input__suffix"></div>
                                                    </div>
                                                    <div className="info_more">Coupon name not visible to buyers</div>
                                                </div>
                                            </div>
                                            
                                            <div className="item-base-lines ">
                                                <label for="" className="form-item__label">Thời gian lưu Ưu Đãi Follower</label>
                                                <Timeoffer
                                                    data={follower_offer}
                                                    time_start={timestart}
                                                    time_end={timeend}
                                                    edit={edit}
                                                    setdatevalid={(index,date)=>setdatevalid(index,date)}
                                                 
                                                />
                                            </div>
                                            <div className="item-base-lines ">
                                                <label for="" className="form-item__label">
                                                    Tên Ưu Đãi
                                                </label>
                                                <div className="form-item__control">
                                                    <div className="form-item__content">
                                                        <p data-v-047a15b4="">7 ngày kể từ lúc Voucher được lưu vào Kho Voucher</p>
                                                    </div>  
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <img src="https://deo.shopeemobile.com/shopee/seller-live-sg/rootpages/static/modules/vouchers/image/multilang_voucher_illustration_vn.29df4f1.png" alt=""/>
                                        </div>
                                    </div>
                                </div>
                                <div className="voucher-reward-setting">
                                    <h4>Setting basic</h4>
                                    
                                        <div >
                                            <div className="item-base-lines reward-type-form">
                                                <label for="" className="form-item__label">Loại Ưu Đãi</label>
                                                <div className="d-flex">   
                                                    
                                                    <div  className="custom-radio">
                                                        <label className="check_input">Voucher
                                                            <input type="radio" checked={true} />
                                                            <span className="checkmark"></span>
                                                        </label>
                                                    </div>
                                                     
                                                </div>
                                            </div>
                                            <div className="item-base-lines reward-type-form">
                                                <label for="" className="form-item__label">Type voucher</label>
                                                <div className="d-flex">   
                                                    {state.voucher_type.map(item=>
                                                    <div onClick={()=>setFolloweroffer({...follower_offer,voucher_type:item.value})} className="custom-radio">
                                                        <label className="check_input">{item.value}
                                                            <input type="radio" checked={item.value===follower_offer.voucher_type?true:false} name="voucher_type"/>
                                                            <span className="checkmark"></span>
                                                        </label>
                                                    </div>
                                                    )}  
                                                </div>
                                            </div>
                                            
                                            <div className="item-base-lines">  
                                                <label className="form-item__label" for="price" >Discount type</label>
                                                <div className="form-item__control">
                                                    <div className="form-item__content">
                                                        <div className="discount-amount">
                                                            <div className="input-group discount-amount-group d-flex">
                                                                <span onClick={(e)=>opendiscount(e)} className="input-group__prepend" style={{width: '160px'}}>
                                                                    <div className="select discount-type">
                                                                        <div tabIndex="0" className="selector item-space selector--normal">
                                                                            <div className="selector__inner line-clamp--1">{follower_offer.discount_type=='1'?"Percent":'Amount'}</div> 
                                                                            <div className="selector__suffix">
                                                                                <i className="selector__suffix-icon icon">
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M8,9.18933983 L4.03033009,5.21966991 C3.73743687,4.9267767 3.26256313,4.9267767 2.96966991,5.21966991 C2.6767767,5.51256313 2.6767767,5.98743687 2.96966991,6.28033009 L7.46966991,10.7803301 C7.76256313,11.0732233 8.23743687,11.0732233 8.53033009,10.7803301 L13.0303301,6.28033009 C13.3232233,5.98743687 13.3232233,5.51256313 13.0303301,5.21966991 C12.7374369,4.9267767 12.2625631,4.9267767 11.9696699,5.21966991 L8,9.18933983 Z"></path></svg>
                                                                                </i>
                                                                            </div>
                                                                        </div> 
                                                                    </div>
                                                                </span> 
                                                                <span className="input-group__append">
                                                                    <div className="discount-amount-wrapper _2a1tAIRs54WPp0HU8eeDzK">
                                                                        <div className="input currency-input">
                                                                            <div className="input__inner input__inner--normal    item-center">
                                                                                {follower_offer.discount_type=="2"?
                                                                                <>
                                                                                <div className="input__prefix">₫
                                                                                    <span className="input__prefix-split"></span>
                                                                                </div> 
                                                                                <input onChange={(e)=>setform(e)} value={follower_offer.amount} type="text" placeholder="Nhập vào" name='amount' resize="vertical" rows="2" minrows="2" maxLength="13" restrictiontype="value" max="Infinity" min="-Infinity" className="input__input"/>
                                                                                </>:
                                                                                <>
                                                                                <input type="text" onChange={(e)=>setform(e)} value={follower_offer.percent} placeholder=" " name='percent' size="normal" resize="vertical" rows="2" minrows="2" restrictiontype="value" max="Infinity" min="-Infinity" className="input__input"/> 
                                                                                <div className="input__suffix"><span className="input__suffix-split"></span>%GIẢM</div>
                                                                                </>}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="popper" style={{display:state.open_discount?'block':'none',top:'110%',position:'absolute'}}> 
                                                        <div className="select__menu" style={{maxWidth: '440px', maxHeight: '218px'}}>
                                                            <div className="scrollbar">
                                                                <div className="scrollbar__wrapper">
                                                                    <div className="scrollbar__bar vertical">
                                                                        <div className="scrollbar__thumb" style={{top: '0px', height: '0px'}}></div>
                                                                    </div>  
                                                                    <div className="scrollbar__content" style={{position: 'relative'}}>
                                                                        <div className="select__options">
                                                                            {state.discount_type.map(item=>
                                                                                <div onClick={(e)=>setdiscount(item)} data-v-0d5f8626="" className={`option ${item.value==follower_offer.discount_type?'selected':''}`}>{item.name}</div>     
                                                                            )}
                                                                            
                                                                        </div>
                                                                        <div className="resize-triggers">
                                                                            <div className="expand-trigger">
                                                                                <div style={{width: '1px', height: '1px'}}></div>
                                                                            </div>
                                                                            <div className="contract-trigger"></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div> 
                                                        <p className="select__filter-empty" style={{display: 'none'}}></p> 
                                                    </div>
                                                </div>
                                            </div>
                                            {follower_offer.discount_type=='1'?
                                            <div className="item-base-lines mb-1">                                        
                                                <label className="form-item__label" for="discount_price" >Maximum discount</label>                                          
                                                <div className="max_discount-option">
                                                    <div className="d-flex pb-1">
                                                        {state.limit.map(item=>
                                                        <div onClick={()=>setFolloweroffer({...follower_offer,limit:item.value})} className=" custom-radio">
                                                            <label className="check_input">{item.name}
                                                                <input type="radio" checked={follower_offer.limit==item.value?true:false} className="custom-input"/>
                                                                <span className="checkmark"></span>
                                                            </label>
                                                        </div>
                                                        )}  
                                                    </div>
                                                    {follower_offer.limit=='L'?
                                                    <div className="form-item__control">
                                                        <div className="form-item__content">
                                                            <div className="input currency-input max-voucher-amount">
                                                                <div className="input__inner input__inner--normal    item-center">
                                                                    <div className="input__prefix">
                                                                        ₫<span className="input__prefix-split"></span>
                                                                    </div> 
                                                                    <input onChange={(e)=>setFolloweroffer({...follower_offer,maximum_discount:e.target.value})} type="text" placeholder="Nhập vào" resize="vertical" rows="2" minrows="2" maxlength="13" restrictiontype="value" max="Infinity" min="-Infinity" className="input__input"/> 
                                                                </div>
                                                            </div>
                                                        </div> 
                                                    </div>:''}
                                                </div>
                                            </div>:''}
                                            <div className="item-base-lines minium-basket-prize ">
                                                <label className="form-item__label" for="price" >Minimum order value</label>
                                                <div className="input-inner" style={{width: '400px'}}> 
                                                    <input onChange={(e)=>setform(e)} type="text" className="form-select weigth" value={follower_offer.minimum_order_value} name="minimum_order_value" placeholder="Enter" style={{width: '400px'}} required/>
                                                </div>
                                            </div>
                                            <div className="item-base-lines prize-quntity">
                                                <label className="form-item__label" for="price" >Maximum usage</label>
                                                <div className="my-1">
                                                    <div className="input-inner" style={{width: '400px'}}> 
                                                        <input onChange={(e)=>setform(e)} type="text" className="form-select" value={follower_offer.maximum_usage} name="maximum_usage" placeholder="Enter" style={{width: '400px'}} required/>
                                                    </div>
                                                    <div className="info_more"><p className="reminder">Tổng số Mã giảm giá có thể sử dụng</p></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div data-v-047a15b4="" className="item-base-lines">
                                            <label className="form-item__label"> Sản phẩm áp dụng</label> 
                                            <div className="form-item__control">
                                                <div className="form-item__content">
                                                    <div data-v-047a15b4="">
                                                        <span data-v-047a15b4="">Tất cả sản phẩm</span> 
                                                        <div data-v-047a15b4="" className="popover popover--light">
                                                            <div className="popover__ref"> 
                                                            <i data-v-047a15b4="" className="all-products-question-icon icon">
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8,1 C11.8659932,1 15,4.13400675 15,8 C15,11.8659932 11.8659932,15 8,15 C4.13400675,15 1,11.8659932 1,8 C1,4.13400675 4.13400675,1 8,1 Z M8,2 C4.6862915,2 2,4.6862915 2,8 C2,11.3137085 4.6862915,14 8,14 C11.3137085,14 14,11.3137085 14,8 C14,4.6862915 11.3137085,2 8,2 Z M7.98750749,10.2375075 C8.40172105,10.2375075 8.73750749,10.5732939 8.73750749,10.9875075 C8.73750749,11.401721 8.40172105,11.7375075 7.98750749,11.7375075 C7.57329392,11.7375075 7.23750749,11.401721 7.23750749,10.9875075 C7.23750749,10.5732939 7.57329392,10.2375075 7.98750749,10.2375075 Z M8.11700238,4.60513307 C9.97011776,4.60513307 10.7745841,6.50497267 9.94298079,7.72186504 C9.76926425,7.97606597 9.56587088,8.14546785 9.27050506,8.31454843 L9.11486938,8.39945305 L8.95824852,8.47993747 C8.56296349,8.68261431 8.49390831,8.75808648 8.49390831,9.0209925 C8.49390831,9.29713488 8.27005069,9.5209925 7.99390831,9.5209925 C7.71776594,9.5209925 7.49390831,9.29713488 7.49390831,9.0209925 C7.49390831,8.34166619 7.7650409,7.99681515 8.35913594,7.6662627 L8.76655168,7.45066498 C8.9424056,7.3502536 9.04307851,7.26633638 9.11735517,7.1576467 C9.52116165,6.56675314 9.11397414,5.60513307 8.11700238,5.60513307 C7.41791504,5.60513307 6.82814953,6.01272878 6.75715965,6.55275918 L6.75,6.66244953 L6.74194433,6.75232516 C6.69960837,6.98557437 6.49545989,7.16244953 6.25,7.16244953 C5.97385763,7.16244953 5.75,6.9385919 5.75,6.66244953 C5.75,5.44256682 6.87194406,4.60513307 8.11700238,4.60513307 Z"></path></svg>
                                                            </i>
                                                        </div> 
                                                        <div className="popper popover__popper popover__popper--light with-arrow" style={{display: `none`, maxWidth: `320px`}}>
                                                            <div className="popover__content">
                                                                <div data-v-047a15b4="">
                                                                    Một số sản phẩm sẽ không được tham gia khuyến mãi theo quy định của pháp luật.
                                                                    <a data-v-047a15b4="" href="https://banhang.shopee.vn/edu/article/12073" target="_blank" className="promotion-product-error-blocked-link button button--link button--normal underline">
                                                                        <span>Tìm hiểu thêm.</span>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>  
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="bottom-card">
                                <div className="fix-container fixed-bottom">
                                    <div className="action-button">
                                        <button className="cancel-btn btn-m btn-light">Cancel</button>
                                        <button onClick={(e)=>complete(e)} className="submit save-btn btn-orange mr-1 btn-m" type="button" >Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>)}
                </div>
            </div>
            <div id="modal">
            {state.complete?
                <div className="sucess-box">
                    <div className="create-sucess" style={{width: '360px'}}>
                        <div className="item-centers">
                            <span className="item-centers item-check-sucess">
                                <i className="icon check-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M4.03 7.47a.75.75 0 00-1.06 1.06l3.358 3.359a.75.75 0 001.06 0l5.863-5.862a.75.75 0 00-1.061-1.06l-5.332 5.33L4.03 7.47z"></path></svg>
                                </i>
                            </span>
                        </div>
                        <div className="item-centers title-sucess">Created a new discount code</div>
                        <div className="item-centers content-sucess">Your discount code is valid from date {new Date(follower_offer.valid_from).toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).substr(0,16)} - {new Date(follower_offer.valid_to).toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).substr(0,16)}</div>
                        <div className="item-centers">
                            <button className="btn-m btn-light">View detail</button>
                            <button className="btn-m btn-orange">
                                <span className="time-down">Back to product page after ({state.timeSecond}s)</span>
                            </button>
                        </div>
                    </div>
                </div>:""}
            </div>
            
        </>
    )
}
export default memo(FollowerOfferInfo)