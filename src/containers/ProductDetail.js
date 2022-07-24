import {formatter,timecreate,timeago,
    itemvariation,hidestring,rating,ratingitem,list_review_choice,timepromotion} from "../constants"
import axios from 'axios';
import React, {useState, useEffect,useRef, useCallback,useMemo} from 'react'
import ReactDOM from 'react-dom'
import {addToCartURL,productinfoURL,listThreadlURL,addToCartBatchURL} from "../urls"
import Pagination from "../hocs/Pagination"
import {
FacebookShareButton,PinterestShareButton,FacebookMessengerShareButton,TwitterShareButton,
} from "react-share";
import { FacebookIcon,FacebookMessengerIcon,TwitterIcon,PinterestIcon } from "react-share";
import {connect} from "react-redux"
import {useNavigate , Link,useLocation,useParams} from 'react-router-dom';
import { expiry, headers,showchat, showthreads } from "../actions/auth";

const ReviewItem=(props)=>{
    const {review,showmedia,setlikereview,setreport,user}=props
    const [show,setShow]=useState(false)
    const parentref=useRef()
    const [file,setFile]=useState()

    const previewimage = useRef();
    useEffect(() => {
        document.addEventListener('click', handleClick)
        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [])
    const handleClick = (event) => {
        const { target } = event
        if(parentref.current!=null){
            if (!parentref.current.contains(target)) {
                setShow(false)
            }
        }
    }

    const onImageLoad=(e) =>{
        const { width, height } = e.currentTarget
        setFile({width:e.currentTarget.naturalWidth,height:e.currentTarget.naturalHeight})
    }
    return(
        <div className='product-rating'>
        {review.shop!=''?
            <a className="product-rating__avatar" href="${reviews[i].url_shop}">
                <div className="avatar">
                    <div className="avatar__placeholder">
                        <svg enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className="svg-icon icon-headshot"><g><circle cx="7.5" cy="4.5" fill="none" r="3.8" stroke-miterlimit="10"></circle><path d="m1.5 14.2c0-3.3 2.7-6 6-6s6 2.7 6 6" fill="none" strokeLinecap="round" stroke-miterlimit="10"></path></g></svg>
                    </div>
                </div>
            </a>:
            <div className="avatar">
                <div className="avatar__placeholder">
                    <svg enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className="svg-icon icon-headshot"><g><circle cx="7.5" cy="4.5" fill="none" r="3.8" stroke-miterlimit="10"></circle><path d="m1.5 14.2c0-3.3 2.7-6 6-6s6 2.7 6 6" fill="none" strokeLinecap="round" stroke-miterlimit="10"></path></g></svg>
                </div>
            </div>}
            <div className="product-rating__main">
                {review.shop!=''?
                <a className="product-rating__author-name" href={review.url_shop}>{review.anonymous_review?review.user.substr(0,1)+hidestring(review.user)+review.user.substr(-1):review.user}</a>
                :
                <div className="product-rating__author-name">{review.anonymous_review?review.user.substr(0,1)+hidestring(review.user)+review.user.substr(-1):review.user}</div>}
                <div className="repeat-purchase-con">
                    <div className="product-rating__rating d-flex">
                        {ratingitem(6,review)}
                    </div>
                </div>
                {itemvariation(review)!=''?<div className="y8ewrc">Phân loại hàng: {itemvariation(review)}</div>:''}
                <div className="_3NrdYc">{review.info_more}</div>
                {review.review_text!=''?
                <div className="product-rating__tags">
                    {review.review_text.split(',').map(text=>
                    <div className="product-rating__tag">{text}</div>)}
                </div>:""}
                {review.list_file.length>0?
                <div className="rating-modal__image-list-wrapper">
                    <div className="rating-media-list">
                        <div className="rating-media-list__container">
                            {review.list_file.map((file,index)=>
                                <div onClick={(e)=>showmedia(e,file,review)} className={`rating-media-list__image-wrapper rating-media-list__image-wrapper--${file.show?'':'in'}active`}>
                                    <div className="rating-media-list-image__wrapper">
                                        <div className="rating-media-list-image__place-holder">
                                            <svg enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className="svg-icon icon-loading-image"><g><rect fill="none" height="8" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" width="10" x="1" y="4.5"></rect><line fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="1" x2="11" y1="6.5" y2="6.5"></line><rect fill="none" height="3" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" width="3" x="11" y="6.5"></rect><line fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="1" x2="11" y1="14.5" y2="14.5"></line><line fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="6" x2="6" y1=".5" y2="3"></line><line fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="3.5" x2="3.5" y1="1" y2="3"></line><line fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="8.5" x2="8.5" y1="1" y2="3"></line></g></svg>
                                        </div>
                                        <div className="rating-media-list-image__content" style={{backgroundImage: `url(${file.filetype==='video'?file.media_preview:file.file})`}}>
                                            <div className="rating-media-list-image__content--blur"> </div>
                                        </div>
                                    </div>
                                    {file.filetype==='video'?
                                    <div className="rating-media-list__video-cover">
                                        <svg width="23" height="18" viewBox="0 0 23 18" fill="none"><g filter="url(#filter0_d)"><path fillRule="evenodd" clipRule="evenodd" d="M5 4C4.44772 4 4 4.44772 4 5V13C4 13.5523 4.44772 14 5 14H13C13.5523 14 14 13.5523 14 13V5C14 4.44772 13.5523 4 13 4H5ZM11.5 9C11.5 10.3807 10.3807 11.5 9 11.5C7.61929 11.5 6.5 10.3807 6.5 9C6.5 7.61929 7.61929 6.5 9 6.5C10.3807 6.5 11.5 7.61929 11.5 9ZM9 10.6667C9.92047 10.6667 10.6667 9.92047 10.6667 9C10.6667 8.07952 9.92047 7.33333 9 7.33333C8.07953 7.33333 7.33333 8.07952 7.33333 9C7.33333 9.92047 8.07953 10.6667 9 10.6667ZM18.1667 4.83333L14.8333 7.33306V10.6667L18.1667 13.1667V4.83333Z" fill="white"></path></g><defs><filter id="filter0_d" x="0" y="0" width="22.1667" height="18" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix><feOffset></feOffset><feGaussianBlur stdDeviation="2"></feGaussianBlur><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.26 0"></feColorMatrix><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"></feBlend><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"></feBlend></filter></defs></svg>
                                        <span>00:{('0'+Math.round(file.duration)).slice(-2)}</span>
                                    </div>:''}
                                </div>  
                            )}
                            
                        </div>
                        <div className={`rating-media-list__zoomed-image ${review.list_file.find(item=>item.show)?'rating-media-list__zoomed-image--active':''}`}>
                            <div className="rating-media-list-image-carousel" style={{transition: 'all 500ms ease 0s', width: `${review.list_file.find(item=>item.show)?review.list_file.find(item=>item.show).filetype=='video'|| file.width>=536?536:file.width:''}px`}}>
                                <div className="rating-media-list-image-carousel__item-list-wrapper">
                                    <ul className="rating-media-list-image-carousel__item-list" ref={previewimage} style={{marginLeft: `${-536*review.list_file.indexOf(review.list_file.find(item=>item.show))}px`, marginTop: '0px',transition:'all 500ms ease 0s'}}>
                                        {review.list_file.map(file=>
                                            <li key={file.id} className="rating-media-list-image-carousel__item rating-media-list-image-carousel__item--fluid" style={{padding: '0px 0.625rem'}}>
                                                {file.filetype==='video'?
                                                <div className="_43iTyw">
                                                    <video src={file.file} controls="" className="_12mVqG rating-media-list__zoomed-video-item" controlsList="nodownload"></video>
                                                </div>:<img className="rating-media-list__zoomed-image-item" onLoad={(e)=>onImageLoad(e)} src={file.file}/>}
                                            </li>
                                        )}
                                    </ul>
                                </div>
                                <div onClick={(e)=>showmedia(e,review.list_file[review.list_file.indexOf(review.list_file.find((file,i)=>file.show))-1],review)} className="rating-media-list-carousel-arrow rating-media-list-carousel-arrow--prev rating-media-list-carousel-arrow--hint rating-media-list-carousel-arrow--hidden" role="button" tabIndex="0" style={{opacity: 1, visibility: `${review.list_file.findIndex(file=>file.show)===0?'hidden':''}`, transform: 'translateX(calc(-50% + 0px))'}}>
                                    <svg enableBackground="new 0 0 13 20" viewBox="0 0 13 20" x="0" y="0" className="svg-icon icon-arrow-left-bold"><polygon points="4.2 10 12.1 2.1 10 -.1 1 8.9 -.1 10 1 11 10 20 12.1 17.9"></polygon></svg>
                                </div>
                                <div onClick={(e)=>showmedia(e,review.list_file[review.list_file.indexOf(review.list_file.find((file,i)=>file.show))+1],review)} className="rating-media-list-carousel-arrow rating-media-list-carousel-arrow--next rating-media-list-carousel-arrow--hint" role="button" tabIndex="0" style={{opacity: 1, visibility: `${review.list_file.findIndex(file=>file.show)===(review.list_file.length-1)?'hidden':'visible'}`, transform: 'translateX(calc(50% - 0px))'}}>
                                    <svg enableBackground="new 0 0 13 21" viewBox="0 0 13 21" x="0" y="0" className="svg-icon icon-arrow-right-bold"><polygon points="11.1 9.9 2.1 .9 -.1 3.1 7.9 11 -.1 18.9 2.1 21 11.1 12 12.1 11"></polygon></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :''}
                <div className="product-rating__time">{timecreate(review.created)}</div>
                <div className="product-rating__actions item-spaces">
                    <div className='d-flex'>
                        <div onClick={(e)=>setlikereview(e,review)} className={`product-rating__like-button ${user&&review.user_like.some(item=>item==user.id)?'product-rating__like-button--liked':''}`}>
                            <svg width="14px" height="13px" viewBox="0 0 14 13" version="1.1" xmlns="http://www.w3.org/2000/svg"><defs></defs><g stroke="none" strokeWidth="1" fillRule="evenodd"><g id="Product-Ratings-Working" transform="translate(-245.000000, -855.000000)" fillRule="nonzero"><g transform="translate(155.000000, 92.000000)"><g transform="translate(40.000000, 184.000000)"><g transform="translate(0.000000, 326.000000)"><g transform="translate(50.000000, 253.000000)"><g><path d="M0,12.7272727 L2.54545455,12.7272727 L2.54545455,5.09090909 L0,5.09090909 L0,12.7272727 Z M14,5.72727273 C14,5.02727273 13.4272727,4.45454545 12.7272727,4.45454545 L8.71818182,4.45454545 L9.35454545,1.52727273 L9.35454545,1.33636364 C9.35454545,1.08181818 9.22727273,0.827272727 9.1,0.636363636 L8.4,0 L4.2,4.2 C3.94545455,4.39090909 3.81818182,4.70909091 3.81818182,5.09090909 L3.81818182,11.4545455 C3.81818182,12.1545455 4.39090909,12.7272727 5.09090909,12.7272727 L10.8181818,12.7272727 C11.3272727,12.7272727 11.7727273,12.4090909 11.9636364,11.9636364 L13.8727273,7.44545455 C13.9363636,7.31818182 13.9363636,7.12727273 13.9363636,7 L13.9363636,5.72727273 L14,5.72727273 C14,5.79090909 14,5.72727273 14,5.72727273 Z"></path></g></g></g></g></g></g></g></svg>
                        </div>
                        <div className="product-rating__like-count">{review.num_like==0?'hữu ích':review.num_like}</div>
                    </div>
                    <div className='d-flex'>
                        <div className="product-rating__report-menu-button">
                            <div ref={parentref} className="stardust-dropdown">
                                <div onClick={(e)=>setShow(!show)} className="stardust-dropdown__item-header">
                                    <div>
                                        <svg width="4px" height="16px" viewBox="0 0 4 16" version="1.1" xmlns="http://www.w3.org/2000/svg"><defs></defs><g stroke="none" strokeWidth="1" fillRule="evenodd"><g transform="translate(-1301.000000, -550.000000)" fill="#CCCCCC"><g transform="translate(155.000000, 92.000000)"><g transform="translate(40.000000, 184.000000)"><g transform="translate(0.000000, 161.000000)"><g><g transform="translate(50.000000, 2.000000)"><path d="M1058,122.2 C1056.895,122.2 1056,123.096 1056,124.2 C1056,125.306 1056.895,126.202 1058,126.202 C1059.104,126.202 1060,125.306 1060,124.2 C1060,123.096 1059.104,122.2 1058,122.2 M1058,116.6 C1056.895,116.6 1056,117.496 1056,118.6 C1056,119.706 1056.895,120.602 1058,120.602 C1059.104,120.602 1060,119.706 1060,118.6 C1060,117.496 1059.104,116.6 1058,116.6 M1058,111 C1056.895,111 1056,111.896 1056,113 C1056,114.106 1056.895,115.002 1058,115.002 C1059.104,115.002 1060,114.106 1060,113 C1060,111.896 1059.104,111 1058,111"></path></g></g></g></g></g></g></g></svg>
                                    </div>
                                </div>
                                <div className={`stardust-dropdown__item-body ${show?'stardust-dropdown__item-body--open':''}`} style={{opacity:show?1:0}}>
                                    <div onClick={(e)=>{
                                        setShow(false)
                                        setreport(e,review)}} className="product-rating__report-menu-dropdown">báo cáo</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


const Itemdeal=(props)=>{
    const {setbyproduct,item,listsizedeal,listcolordeal,updatevariation,product}=props
    const [show,setShow]=useState(false)
    const [state,setState]=useState({page_no:1,size_id:null,color_id:null,variation_color:[],variation_size:[],count_variation:0,product_id:0,size_value:'',color_value:''})
    const itemref=useRef()
    const [quantity,setQuantity]=useState(1)
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
    useEffect(()=>{
        setQuantity(item.quantity)
    },[item])
    const  variation=(e)=>{
        const size=item.sizes.find(size=>size.value==item.variation_choice.size_value)
        const color=item.colors.find(color=>color.value==item.variation_choice.color_value)
        setState({...state,size_id:size?size.id:null,color_id:color?color.id:null,color_value:item.color_value,
            size_value:item.size_value,
            variation_color:color?color.variation:[],variation_size:size?size.variation:[],count_variation:item.count_variation,product_id:item.product_id})
    }
    
    const setcolor=(e,item)=>{ 
        e.target.classList.toggle('product-variation--selected')
        if(e.target.classList.contains('product-variation--selected')){
          setState({...state,color_id:item.id,variation_color:item.variation,color_value:item.value})  
        }
        else{
          setState({...state,color_id:null,variation_color:[],color_value:''})
        }
    }

    const setsize=(e,item)=>{
        e.target.classList.toggle('product-variation--selected')
        if(e.target.classList.contains('product-variation--selected')){
          setState({...state,size_id:item.id,variation_size:item.variation,size_value:item.value}) 
        }
        else{
          setState({...state,size_id:null,variation_size:[],size_value:''})
        }
    }
    return(
        <div key={item.id} className="Cgh6x3 wAs-X+">
            <a className="HqVUvN" href="/Quần-Baggy-Nam-Ống-Rộng-vải-Hàn-Cao-Cấp-Quần-Âu-công-sở-chất-liệu-co-giãn-phong-cách-Hàn-Quốc-i.275899480.12372283368">
                <span>
                    <div className="jz7csM">
                        <div className="nSiDVN SmTGWY" style={{backgroundImage: `url(${item.image})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}}></div>
                    </div>
                </span>
                <div className="Pa5Yzn">
                    <span className="Y-UTmy">{item.name}</span>
                </div>
            </a>
            <div className="V1SZcW">
                <label className={`stardust-checkbox ${product=='mainproduct'?'disable':''} ${item.check?'stardust-checkbox--checked':''}`}>
                    <input disabled={product=='mainproduct'?true:false} checked={item.check?true:false} className="stardust-checkbox__input" type="checkbox"/>
                    <div onClick={(e)=>{
                        if(product!='mainproduct'){
                            setbyproduct(e,item,'check',!item.check)
                        }
                        }} className="stardust-checkbox__box"></div>
                </label>
                
                <div ref={itemref} className="stardust-popover Krn1TB" id="stardust-popover0" tabindex="0">
                    {item.count_variation>0?
                    <div onClick={(e)=>{
                        setShow(!show)
                        variation(e)}} role="button" className="stardust-popover__target">
                        <span className="bdRKsm">{item.variation_choice.color_value!=''?item.variation_choice.color_value:''}{item.variation_choice.size_value!=''?`,${item.variation_choice.size_value}`:''}
                            <span className="Z6vh+w"></span>
                        </span>
                    </div>:''}
                    {show?
                    <div
                    className="stardust-popover__popover stardust-popover__popover--show stardust-popover__popover--border"
                    style={{top:'30px',left:'-100px'}}
                    >
                      <div className="stardust-popover__arrow" style={{top: '1px', left: '100.508px', transform: 'translate(-4px, -100%)', borderBottom: '10px solid rgba(0, 0, 0, 0.09)', borderLeft: '10px solid transparent', borderRight: '10px solid transparent'}}>
                          <div className="stardust-popover__arrow--inner" style={{borderBottom: '8px solid transparent', borderLeft: '8px solid transparent', borderRight: '8px solid transparent', bottom: '-10px'}}></div>
                      </div>
                      <div>
                          <div className="_3RMcd-">
                              <div className="_2AlHh9">
                                  <div className="_22Wxvt">
                                      {item.colors.length>0?
                                      <div className="NwiGnj">
                                          <div className="_3qC1Fg">{item.colors[0].name}:</div>
                                          {item.colors.map(color=>
                                              <button key={color.id} onClick={(e)=>setcolor(e,color)} className={`product-variation ${state.variation_size.length>0?`${color.variation.some(r=> state.variation_size.includes(r)) && listcolordeal.some(colordeal=>colordeal==color.id) && product!='mainproduct'?'':'disable'}`:''} ${color.id==state.color_id?'product-variation--selected':''}`} aria-label={color.value}>{color.value}
                                                  {state.color_id==color.id?
                                                  <div className="product-variation__tick">
                                                  <svg enableBackground="new 0 0 12 12" viewBox="0 0 12 12" x="0" y="0" className="svg-icon icon-tick-bold"><g><path d="m5.2 10.9c-.2 0-.5-.1-.7-.2l-4.2-3.7c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l3.4 3 5.1-7c .3-.4 1-.5 1.4-.2s.5 1 .2 1.4l-5.7 7.9c-.2.2-.4.4-.7.4 0-.1 0-.1-.1-.1z"></path></g></svg>
                                                  </div>
                                                  :''}
                                              </button>
                                          )}
                                      </div>:''}
                                      {item.sizes.length>0?
                                      <div className="NwiGnj">
                                          <div className="_3qC1Fg">{item.sizes[0].name}:</div>
                                          {item.sizes.map(size=>
                                              <button key={size.id} onClick={(e)=>setsize(e,size)} className={`product-variation ${state.variation_color.length>0?`${size.variation.some(r=> state.variation_color.includes(r)) && listsizedeal.some(sizedeal=>sizedeal==size.id) && product!='mainproduct'?'':'disable'}`:''}${size.id==state.size_id?'product-variation--selected':''}`} aria-label={size.value}>{size.value}
                                                  {state.size_id==size.id?
                                                  <div className="product-variation__tick">
                                                  <svg enableBackground="new 0 0 12 12" viewBox="0 0 12 12" x="0" y="0" className="svg-icon icon-tick-bold"><g><path d="m5.2 10.9c-.2 0-.5-.1-.7-.2l-4.2-3.7c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l3.4 3 5.1-7c .3-.4 1-.5 1.4-.2s.5 1 .2 1.4l-5.7 7.9c-.2.2-.4.4-.7.4 0-.1 0-.1-.1-.1z"></path></g></svg>
                                                  </div>
                                                  :''}
                                              </button>
                                          )}
                                      </div>:''}
                                  </div>
                                  <div className="x94sjQ">
                                      <span className="JoCEu1">Số lượng</span>
                                      <div className="oGEqYd input-quantity">
                                        <button onClick={e=>setQuantity(quantity-1)} className={`${quantity==1?'disable':''} minus-btn btn-adjust`}>
                                            <svg enable-background="new 0 0 10 10" viewBox="0 0 10 10" x="0" y="0" className="svg-icon "><polygon points="4.5 4.5 3.5 4.5 0 4.5 0 5.5 3.5 5.5 4.5 5.5 10 5.5 10 4.5"></polygon></svg>
                                        </button>
                                        <input onChange={e=>setQuantity(isNaN(e.target.value)?quantity:e.target.value)} className="_2KdYzP quantity iRO3yj" type="text" role="spinbutton" aria-valuenow="1" value={quantity}/>
                                        <button onClick={e=>setQuantity(quantity+1)} className={`plus-btn btn-adjust`}><svg enable-background="new 0 0 10 10" viewBox="0 0 10 10" x="0" y="0" className="svg-icon icon-plus-sign"><polygon points="10 4.5 5.5 4.5 5.5 0 4.5 0 4.5 4.5 0 4.5 0 5.5 4.5 5.5 4.5 10 5.5 10 5.5 5.5 10 5.5"></polygon></svg></button>
                                       
                                    </div>
                                </div>
                                  <div className="_270oIB">
                                      <button onClick={()=>setShow(false)} type="button" className="btn btn-light btn--s btn--inline">Trở Lại</button>
                                      <button onClick={(e)=>{updatevariation(e,item,state.color_id,state.size_id,quantity,product)
                                    setShow(false)}} type="button" className={`btn btn-solid-primary btn--s btn--inline ${(item.count_variation==2 && state.color_id&&state.size_id)||(item.count_variation==1 &&  (state.color_id|| state.size_id))?'':'disable'}`}>Xác nhận</button>
                                  </div>
                              </div>
                          </div>
                      </div>
                    </div>
                    :''
                    }
                </div>

            </div>
            <div className="zec-ha">
                <span className={`${item.variation_choice.discount_price?'SdJ6yI':'++PvFX'}`}>₫{formatter.format(item.variation_choice.price)}</span>
                {item.variation_choice.discount_price?
                <span className="++PvFX">₫{formatter.format(item.variation_choice.discount_price)}</span>:''}
            </div>
        </div>
    )
}
let pageSize=5
const ProductDetail = ({report_complete,showchat,show_report,setreport,
    showthreads,data_product,addcartitem,showmediaitem,user,id}) => {
    const [state, setState] = useState({request_report:false,list_host_sale:[],data:null,inventory:null,count_variation:0,quantity:1,review_choice:'all',
    color_id:0,size_id:0,variation_color:[],variation_size:[],page_count:1,rating:[],has_comment:0,
    has_media:0,
    rating_choice:[{review_rating:5},{review_rating:4},{review_rating:3},{review_rating:3},{review_rating:3}]});
    const [waring, setWaring] = useState({warring:false})
    const [variation, setVariation] = useState({data:null,quantity:1})
    const [listreview,setReview]=useState(null)
    const [shop,setShop]=useState(null)
    const [page,setPage]=useState(1)
    const [productdetail,setProductdetail]=useState()
    const [main_product,setMainproduct]=useState()
    const [listmedia,setListmedia]=useState([])
    const [typereview,setTypereview]=useState()
    const [indextype,setIndextype]=useState()
    const [quantity,setQuantity]=useState(1)
    const [list_hot_sales,setListhostsale]=useState([])
    const [data,setData]=useState()
    const [itemdeal,setItemdeal]=useState({color_choice:null,size_choice:null})
    const [byproduct,setByproduct]=useState([])
    const [listcolordeal,setListcolordeal]=useState([])
    const [listsizedeal,setListsizedeal]=useState([])
    const [promotion,setPromotion]=useState()
    const [time,setTime]=useState({hours:0,mins:0,seconds:0})
    useEffect(() => {
        if(data_product){
        const color_choice= data_product.colors.length>0?data_product.colors[0]:null
        const size_choice =color_choice&& data_product.sizes.length>0?data_product.sizes.find(size=>size.variation.some(variation=>color_choice.variation.includes(variation))):null
        const index_choice=data_product.media_upload.length>=5?5:data_product.media_upload.length
        const video_preview=data_product.media_upload.find(item=>item.typefile==='video')
        const image_preview=data_product.media_upload.filter(item=>item.typefile==='image')
        const list_media=video_preview!=undefined?[video_preview,...image_preview]:image_preview
        setItemdeal({color_choice:color_choice,size_choice:size_choice})
        setState({...state,index_choice:index_choice,filechoice:list_media[0]})
        setListmedia(list_media)
        setData(data_product)
        if(data_product.flash_sale && new Date()>new Date(data_product.flash_sale.valid_from)){
            const time_end=data_product.flash_sale.valid_to
            const countDown= setInterval(() => timer(), 1000);
            const  timer=()=> {
                const FalshsaleDate = new Date(time_end);
                const currentDate = new Date();
                let totalSeconds = (FalshsaleDate - currentDate) / 1000;
                setTime({hours:Math.floor(totalSeconds / 3600) % 24,
                    mins: Math.floor(totalSeconds / 60) % 60,
                seconds:Math.floor(totalSeconds) % 60})
                if(totalSeconds<=0){
                    totalSeconds=0
                    clearInterval(countDown);
                }
            }
        }
    }
    },[data_product])

    const number=(number,value)=>{
        return Array(number).fill().map((_,i)=>
            <div key={i} style={{color:'#fff'}} className="countdown-timer__number__item">
                <span>{i}</span>
            </div>
        )
    }
    useEffect(()=>{
        if(!show_report && listreview){
            const list_reviews=listreview.map(review=>{
                return({...review,request_report:false})
            })
            setReview(list_reviews)
        }
        
    },[report_complete])
    let navigate = useNavigate();
    const videoref=useRef();
    const list_preview=listmedia.length>=5?listmedia.slice(state.index_choice-5,state.index_choice):listmedia
   
    const { slug } = useParams();
    useEffect(()=>{
        (async()=>{
            try{
                if(id){
                    if(data_product.shock_deal_type || data_product.promotion){
                        const res =await axios.get(`${productinfoURL}/${id}?choice=${data_product.shock_deal_type?'deal':'combo'}`,headers)
                        const data=res.data
                        if(data_product.shock_deal_type){
                            setMainproduct({image:data_product.image,quantity:1,
                            name:data_product.name,id:data_product.id,check:true,
                            count_variation:data_product.count_variation,deal_id:data.id,
                            colors:data_product.colors,sizes:data_product.sizes,
                            variation_choice:data.variation_choice})
                            const databyproduct=res.data.byproduct
                            setByproduct(databyproduct.map(item=>{
                                return ({...item,check:true,quantity:1})
                            }))
                            setListcolordeal(data.colors_deal)
                            setListsizedeal(data.sizes_deal)
                        }
                        else{
                            setPromotion(res.data)
                        }  
                    }
                    const [obj1,obj2,obj3]=await axios.all([
                        axios.get(`${productinfoURL}/${id}?choice=shop`,headers),
                        axios.get(`${productinfoURL}/${id}?choice=detail`,headers),
                        axios.get(`${productinfoURL}/${id}?choice=hotsale`,headers),
                    ])
                    setProductdetail(obj2.data)
                    setListhostsale(obj3.data)
                    setShop(obj1.data)
                }
            }
            catch(e){
                console.log(e)
            }
        })()
    },[id])
    useEffect(()=>{
        document.addEventListener('scroll',addReview)
        return () => {
            document.removeEventListener('scroll', addReview)
        }
    },[listreview])
    
    const addReview=()=>{
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if(clientHeight + scrollTop === scrollHeight){
            if(!listreview){
                axios.get(`${productinfoURL}/${id}?choice=review`)
                .then(res=>{
                    let data=res.data
                    const list_reviews=data.reviews.map(item=>{
                        return({...item,request_report:false})
                    })
                    setReview(list_reviews)
                    setState(current=>{return{...current,page_count:data.page_count,rating:data.rating,has_comment:data.has_comment,has_media:data.has_media}})
                })  
            }
        }
    }
    

    function setcolor(e,item){ 
        e.target.classList.toggle('product-variation--selected')
        if(e.target.classList.contains('product-variation--selected')){
          setState({...state,color_id:item.id,variation_color:item.variation})
        }
        else{
          setState({...state,color_id:0,variation_color:[]})
        }
        get_price('color_id',item.id)
      }

    function setsize(e,item){
        e.target.classList.toggle('product-variation--selected')
        if(e.target.classList.contains('product-variation--selected')){
          setState({...state,size_id:item.id,variation_size:item.variation})
          
        }
        else{
          setState({...state,size_id:0,variation_size:[]})
        }
        get_price('size_id',item.id)
    }
      
    const get_price=(name,value)=>{
          let variation_active=document.querySelectorAll('.choice_variation .product-variation.product-variation--selected')
          if(variation_active.length>=data.count_variation){
            let url=new URL(addToCartURL)
            let search_params=url.searchParams
            search_params.append('item_id',data.id)
            if(state.color_id!=0){
                search_params.set('color_id',state.color_id)
              }
              if(state.size_id!=0){
                search_params.set('size_id',state.size_id)
            }
            search_params.set([name],value)
            setWaring({...state,warring:false})
            url.search = search_params.toString();
            let new_url = url.toString();
            axios.get(new_url)
            .then(res => { 
              let data=res.data
              setVariation({...variation,data:data})
            }) 
          }
          else{
            setVariation({...variation,data:null})
          }
    }

    const addtocart=(e)=>{
        e.stopPropagation()
        if (localStorage.token!='null' && expiry>0){
            let variation_active=document.querySelectorAll('.product-variation--selected')
            if(variation_active.length===data.count_variation){
            setWaring({...waring,warring:false})
            let form =new FormData()
            if(variation.data){
                form.append('id',variation.data.id)
            }
            form.append('item_id',data.id)
            form.append('quantity',quantity) 
            if(e.currentTarget.classList.contains('btn-tinted')){
                const Divbox=()=>{
                const [remove, setRemove] = useState({remove:false});
                setTimeout(function(){
                setRemove({remove:true})
                },2500)
                return(
                    <>
                    {remove.remove!=true?
                    <div className="action-toast">
                    <div className="toast">
                        <div className="toast__container">
                        <div className="toast__icon">
                            <div className="action-toast__icon">
                            <svg enableBackground="new 0 0 12 12" viewBox="0 0 12 12" x="0" y="0" className="svg-icon icon-tick-bold"><g><path d="m5.2 10.9c-.2 0-.5-.1-.7-.2l-4.2-3.7c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l3.4 3 5.1-7c .3-.4 1-.5 1.4-.2s.5 1 .2 1.4l-5.7 7.9c-.2.2-.4.4-.7.4 0-.1 0-.1-.1-.1z"></path></g></svg>
                            </div>
                        </div>
                        <div className="toast__text">Sản phẩm đã được thêm vào Giỏ hàng</div>
                        </div>
                    </div>
                    </div>
                    :''}
                </>
                )
                }
                ReactDOM.render(
                    <Divbox />,
                    document.getElementById('modal')
                );
                }
                axios.post(addToCartURL,form,headers)
                .then(res=>{
                    addcartitem(res.data)
                })
            }
            else{
                setWaring({...state,warring:true})
            }
        }
        else{
            navigate(`/buyer/login?next=${window.location}`, { replace: true });
        }
    }

    const setlike=()=>{
        if(localStorage.token!='null' && expiry>0){
            let form=new FormData()
            form.append('item_id',data.id)
            axios.post(`${productinfoURL}/${id}`,form,headers)
            .then(res=>{
            data.num_like_item=res.data.num_like_item
            data.like_item=res.data.like_item
            setState({...state,data:data})
            })
        }
        else{
            navigate(`/buyer/login?next=${window.location}`, { replace: true });
        }
    }
  
    const setshowthread=(e)=>{
        e.preventDefault()
        let data={member:[user.id,data.user_id],thread:null,item_id:data.id,send_to:data.user_id}
        showchat(data)
        showthreads()
    }
  
    const setlikereview=(e,review)=>{
        let form=new FormData()
        form.append('review_id',review.id)
        if(localStorage.token!='null' && expiry>0){
            axios.post(productinfoURL,form,headers)
            .then(res=>{
            const list_review=listreview.map(item=>{
                if(review.id==item.id){
                    if(item.user_like.some(item=>item==user.id)){
                        return({...item,user_like:item.user_like.filter(item=>item!=user.id),num_like:res.data.num_like_review})
                    }
                    else{
                    return({...item,user_like:[...item.user_like,user.id],num_like:res.data.num_like_review})
                    }
                }
                return ({...item})
            })
            setReview(list_review)
            })
        }
        else{
            navigate(`/buyer/login?next=${window.location}`, { replace: true });
        }
    }
    
    useEffect(()=>{
        (async()=>{
            if(indextype){
            setPage(1)
            const res = await axios.get(`${productinfoURL}/${data.id}?choice=review&${[typereview.name]}=${typereview.value}`)
            let data=res.data
            setReview(data.reviews)
            setState({...state,review_choice:typereview.value,page_count:data.page_count,rating:data.rating,has_comment:data.has_comment,has_media:data.has_media})
        }
        })()
    },[indextype])
        
    const showfile=(e)=>{
        e.stopPropagation() ;
        showmediaitem(state.filechoice,listmedia)
        console.log(listmedia)
    }
    const  showmedia=(e,item,reviewchoice)=>{
        const list_reviews=listreview.map(review=>{
            if(review.id===reviewchoice.id){
                return({...review,list_file:review.list_file.map(file=>{
                    if (item.file_id===file.file_id){
                        return({...file,show:!file.show})
                    }
                    return({...file,show:false})
                })})
            } 
            return({...review,list_file:review.list_file.map(file=>{
                return({...file,show:false})
            })})
        })
        setReview(list_reviews)
    }

    const setindex=(value)=>{
        setState({...state,index_choice:value})
    }
    
    useEffect(()=>{
        if(videoref && videoref.current){
            videoref.current.addEventListener('ended',e=>{
                setState({...state,finish:true})
            })
        }
    },[videoref])
    
    const total_price_byproducts=useMemo(()=>{
       return byproduct.reduce((total,obj,i)=>{
        if(obj.check){
            return total+obj.variation_choice.price
        }
        return total
    },0)
    },[byproduct])
    const promotion_price_byproducts=useMemo(()=>{
        return byproduct.reduce((total,obj,i)=>{
        if(obj.check){
            return total+obj.variation_choice.discount_price
        }
        return total
    },0)
    },[byproduct])

    const pricemain=()=>{return main_product.variation_choice.discount_price?main_product.variation_choice.discount_price:main_product.variation_choice.price}
    const setbyproduct=useCallback((e,itemchoice,name,value)=>{
        setByproduct(current=>current.map(item=>{
            if(item.id==itemchoice.id){
                return({...item,[name]:value})
            }
            return({...item})
        }))
    },[])

    const updatevariation=useCallback((e,itemchoice,color_id,size_id,quantity,product)=>{
        let url=new URL(addToCartBatchURL)
        let search_params=url.searchParams
        search_params.set('item_id',itemchoice.id)
        if(color_id){
            search_params.set('color_id',color_id)
        }
        if(size_id){
            search_params.set('size_id',size_id)
        }
        url.search = search_params.toString();
        let new_url = url.toString();
        axios.get(new_url,headers)
        .then(res=>{
            const data=res.data
            if(product=='mainproduct'){
                setMainproduct(current=>{return{...current,variation_choice:data,quantity:data.inventory<=quantity?data.inventory:quantity}})
            }
            else{
                
                setByproduct(current=>current.map(item=>{
                    if(item.id==itemchoice.id){
                        return({...item,variation_choice:data,quantity:data.inventory<=quantity?data.inventory:quantity})
                    }
                    return({...item})
                })) 
            }
        }) 
    },[])

    const addtocartbatch=(e)=>{
        const byproducts=byproduct.map(item=>{
            return({byproduct_id:item.byproduct_id,quantity:item.quantity,check:item.check,
            product_id:item.variation_choice.product_id,item_id:item.id})
        })
        const form={deal_id:main_product.deal_id,item_id:main_product.item_id,action:'add',
        product_id:main_product.variation_choice.product_id,quantity:main_product.quantity,
        byproducts:byproducts,item_id:main_product.id}
        
        axios.post(addToCartBatchURL,JSON.stringify(form),headers)
        .then(res => {  
            addcartitem({id:res.data.id,image:data.image,name:data.name,price:pricemain()*main_product.quantity})
        })
    }
    return(
    <div className="page-product">
        {data?
        <div className="containers">
            <div className="item-center _3bDXqx page-product__breadcrumb">
                <a className="_2572CL" href="/">Anhdai</a>
                <svg enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0" className="svg-icon _2m4lrt icon-arrow-right"><path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></path></svg>
                {data.category.split('>').map((item,i)=>{
                    if(i<data.category.split('>').length-1){
                        return <> 
                        <span className="_1w3mKA">{item}</span>
                        <svg enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0" className="svg-icon _2m4lrt icon-arrow-right"><path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></path></svg>
                        </>
                    }
                    else{
                        return <span className="_1w3mKA">{item}</span>
                    }
                })}
                <svg enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0" className="svg-icon _2m4lrt icon-arrow-right"><path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></path></svg>
                <span className="_1w3mKA">{data.name}</span>
            </div>
            <div className="product-briefing d-flex card _1j7uGn">
                <div className="_11Y_VZ">
                    <div className="flex-col">
                        <div className="_11hT2s">
                            <div onClick={(e)=>showfile(e)} className="_2xhOj_">
                                <div className="_3Jd8Mq" style={{display: `${state.filechoice.typefile==='video'?'block':'none'}`}}>
                                    <div className="image-placeholder _2NQS5E">
                                        <svg enableBackground="new 0 0 54 61" viewBox="0 0 54 61" role="img" className="stardust-icon stardust-icon-Anhdai icon-tiny"><path stroke="none" d="M35.67,44.95 C35.34,47.70 33.67,49.91 31.09,51.01 C29.65,51.63 27.72,51.96 26.19,51.85 C23.81,51.76 21.57,51.18 19.50,50.12 C18.77,49.74 17.67,48.99 16.82,48.28 C16.61,48.10 16.58,47.99 16.73,47.78 C16.80,47.67 16.94,47.46 17.25,47.01 C17.71,46.34 17.76,46.26 17.81,46.18 C17.96,45.96 18.19,45.94 18.42,46.12 C18.45,46.14 18.45,46.14 18.47,46.16 C18.50,46.19 18.50,46.19 18.59,46.26 C18.68,46.33 18.74,46.37 18.76,46.39 C20.99,48.13 23.58,49.13 26.20,49.24 C29.84,49.19 32.46,47.55 32.93,45.03 C33.44,42.27 31.27,39.88 27.02,38.54 C25.69,38.13 22.33,36.78 21.71,36.42 C18.80,34.71 17.44,32.47 17.64,29.71 C17.93,25.88 21.49,23.03 25.98,23.01 C27.98,23.01 29.99,23.42 31.91,24.23 C32.60,24.52 33.81,25.18 34.23,25.50 C34.47,25.68 34.52,25.88 34.38,26.11 C34.31,26.24 34.18,26.44 33.91,26.87 L33.91,26.87 C33.55,27.44 33.54,27.46 33.46,27.59 C33.32,27.80 33.15,27.82 32.90,27.66 C30.84,26.28 28.55,25.58 26.04,25.53 C22.91,25.59 20.57,27.45 20.42,29.99 C20.38,32.28 22.09,33.95 25.80,35.22 C33.33,37.64 36.21,40.48 35.67,44.95 M26.37,5.43 C31.27,5.43 35.27,10.08 35.46,15.90 L17.29,15.90 C17.47,10.08 21.47,5.43 26.37,5.43 M51.74,17.00 C51.74,16.39 51.26,15.90 50.66,15.90 L50.64,15.90 L38.88,15.90 C38.59,8.21 33.10,2.08 26.37,2.08 C19.64,2.08 14.16,8.21 13.87,15.90 L2.07,15.90 C1.48,15.91 1.01,16.40 1.01,17.00 C1.01,17.03 1.01,17.05 1.01,17.08 L1.00,17.08 L2.68,54.14 C2.68,54.25 2.69,54.35 2.69,54.46 C2.69,54.48 2.70,54.50 2.70,54.53 L2.70,54.60 L2.71,54.61 C2.96,57.19 4.83,59.26 7.38,59.36 L7.38,59.37 L44.80,59.37 C44.81,59.37 44.83,59.37 44.85,59.37 C44.87,59.37 44.88,59.37 44.90,59.37 L44.98,59.37 L44.98,59.36 C47.57,59.29 49.67,57.19 49.89,54.58 L49.89,54.58 L49.90,54.54 C49.90,54.51 49.90,54.49 49.90,54.46 C49.90,54.39 49.91,54.33 49.91,54.26 L51.74,17.05 L51.74,17.05 C51.74,17.04 51.74,17.02 51.74,17.00"></path></svg>
                                    </div>
                                    <div className="center _1G4Hrb">
                                        <video ref={videoref} dataDashjsPlayer="true" src={state.filechoice.typefile==='video'?state.filechoice.file:''} webkitPlaysinline="webkit-playsinline" className="_7ipvJr" autoPlay={true}></video>
                                    </div> 
                                </div>
                                <div className={`${state.filechoice.typefile==='video'?'_24bhyl yA8B4u':'aGIJCo'}`}>
                                    {state.filechoice.typefile==='video'?'':<div className="_3rslob _1vc1W7" style={{backgroundImage: `url(${state.filechoice.file})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}}></div>}
                                </div>
                                {state.filechoice.typefile==='video' && state.finish?<svg enable-background="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className="svg-icon dBlJ2V"><g opacity=".54"><g><circle cx="7.5" cy="7.5" fill="#040000" r="7.3"></circle><path d="m7.5.5c3.9 0 7 3.1 7 7s-3.1 7-7 7-7-3.1-7-7 3.1-7 7-7m0-.5c-4.1 0-7.5 3.4-7.5 7.5s3.4 7.5 7.5 7.5 7.5-3.4 7.5-7.5-3.4-7.5-7.5-7.5z" fill="#ffffff"></path></g></g><path clip-rule="evenodd" d="m10.2 5.3c.5.7.8 1.4.8 2.2 0 1.9-1.6 3.5-3.5 3.5s-3.5-1.6-3.5-3.5 1.6-3.5 3.5-3.5v.5c-1.6 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3c0-.7-.2-1.3-.6-1.8-.1-.1-.1-.1-.1-.1-.1-.1-.1-.3 0-.4s.3-.1.4.1c0-.1 0 0 0 0z" fill="#ffffff" fill-rule="evenodd"></path><path clip-rule="evenodd" d="m7.5 2.9c0-.1.1-.1.1-.1l1.4 1.5-1.4 1.4c0 .1-.1.1-.1 0z" fill="#ffffff" fill-rule="evenodd"></path></svg>:''}
                            </div>
                        </div>
                        <div className="_2riwuv">
                            {list_preview.map((media,index)=>
                                <div onClick={(e)=>showfile(e)} onMouseEnter={()=>setState({...state,filechoice:media,finish:false})} key={index} className="_1ivFgC">
                                    <div className="_4yF4f1">
                                        <div className="aGIJCo">
                                            <div className="_2UWcUi _1vc1W7" style={{backgroundImage: `url(${media.typefile=='video'?media.image_preview:media.file})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}}></div>
                                        </div>
                                        <img className="_1RZOE3" src="https://cf.shopee.vn/file/cfdc9a14b11e249a76aaf5a492cc2338"/>
                                        {media.typefile==='video'?<svg enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className="svg-icon _3igPfx"><g opacity=".54"><g><circle cx="7.5" cy="7.5" fill="#040000" r="7.3"></circle><path d="m7.5.5c3.9 0 7 3.1 7 7s-3.1 7-7 7-7-3.1-7-7 3.1-7 7-7m0-.5c-4.1 0-7.5 3.4-7.5 7.5s3.4 7.5 7.5 7.5 7.5-3.4 7.5-7.5-3.4-7.5-7.5-7.5z" fill="#ffffff"></path></g></g><path d="m6.1 5.1c0-.2.1-.3.3-.2l3.3 2.3c.2.1.2.3 0 .4l-3.3 2.4c-.2.1-.3.1-.3-.2z" fill="#ffffff"></path></svg>:''}
                                        <div className={`${state.filechoice.file==media.file?'_1KWA0E':''}`}></div>
                                    </div>
                                </div>  
                            )}
                            {listmedia.length>5?
                            <>
                            <button disabled={state.index_choice===5?true:false} onClick={()=>setindex(state.index_choice-1)} className="icon-button _3n5_5z E7Gh7F" tabIndex="-1"><svg enableBackground="new 0 0 13 20" viewBox="0 0 13 20" x="0" y="0" className="svg-icon icon-arrow-left-bold"><polygon points="4.2 10 12.1 2.1 10 -.1 1 8.9 -.1 10 1 11 10 20 12.1 17.9"></polygon></svg></button>
                            <button disabled={state.index_choice===listmedia.length?true:false} onClick={()=>setindex(state.index_choice+1)} className="icon-button _3n5_5z _2YuwlO" tabIndex="-1"><svg enableBackground="new 0 0 13 21" viewBox="0 0 13 21" x="0" y="0" className="svg-icon icon-arrow-right-bold"><polygon points="11.1 9.9 2.1 .9 -.1 3.1 7.9 11 -.1 18.9 2.1 21 11.1 12 12.1 11"></polygon></svg></button>
                            </>:''}
                        </div>
                    </div>
                    <div className="item-center " style={{marginTop: '15px'}}>
                        <div className="item-center _3EqpG1">
                            <div className="_39mrb_">Share:</div>
                            <FacebookShareButton
                                url={window.location}
                                    className="product-sharing sharing-face _1BPLWi"
                                    aria-label="Share on Facebook"
                                >
                                    <FacebookIcon size={24} round />
                            </FacebookShareButton>
                            <FacebookMessengerShareButton
                            url={window.location}
                                className="product-sharing sharing-face _1BPLWi"
                                aria-label="Share on Facebook"
                            >
                                <FacebookMessengerIcon size={24} round/>
                            </FacebookMessengerShareButton>
                            <PinterestShareButton
                                media={window.location}
                                className="product-sharing sharing-face _1BPLWi"
                                aria-label="Share on Pinterest"
                            >
                                <PinterestIcon size={24} round/>
                            </PinterestShareButton>
                            <TwitterShareButton
                            url={window.location}
                                className="product-sharing sharing-twitter _1BPLWi" 
                                aria-label="Share on Twitter"
                            >
                                <TwitterIcon size={24} round/>
                            </TwitterShareButton>
                        </div>
                        <div className="item-center _3nBAy8">
                            <svg onClick={()=>setlike()} width="24" height="20" className="ELoIiZ like-product"><path d="M19.469 1.262c-5.284-1.53-7.47 4.142-7.47 4.142S9.815-.269 4.532 1.262C-1.937 3.138.44 13.832 12 19.333c11.559-5.501 13.938-16.195 7.469-18.07z" stroke="#FF424F" strokeWidth="1.5" fill={data.like_item?'#FF424F':'none'} fillRule="evenodd" strokeLinejoin="round"></path></svg>
                            <div className="pl-1_2 number_like">Đã thích ({data.num_like_item})</div>
                        </div>
                    </div> 
                </div>
                <div className="d-flex _3qq4y7">
                    <div className="flex-auto flex-col _4QIZZo">
                        <div className=" attM6y">
                            <div className="favorite-shop item-center">Yêu thích+</div>
                            <span className="shop-name">{data.name}</span>
                        </div>
                        <div className="item-center _21hHOx">
                            {data.count_review>0?
                            <>
                            <div className="d-flex item-review-rating">
                                <div className="item-number-review item-center">{data.review_rating.toFixed(1)}</div>
                                <div className="tuNfsN">
                                    <div className="rating-stars item-center">
                                        <div className="rating-stars__stars item-center">
                                        {ratingitem(6,data)}
                                        </div>
                                    </div>
                                </div>  
                            </div>
                            <div className="item-center item-review-rating">
                                <div className="item-number-reviews" >{data.count_review}</div>
                                <div className="oMTlt6">Review</div>
                            </div>
                            </>:<div className="vgsTBi">Chưa có đánh giá</div>}
                        
                            <div className="item-center pl-1">
                                <div className="_3b2Btx">{data.num_order}</div>
                                <div className="_3hic1u">đã bán</div>
                            </div>
                        </div>
                        <div style={{marginTop:'10px'}} className="">
                            {data.flash_sale && new Date(data.flash_sale.valid_from)<=new Date()?
                            <div className="SwrRMG">
                                <svg viewBox="0 0 108 21" height="21" width="108" class="flash-sale-logo flash-sale-logo--white"><g fill="currentColor" fill-rule="evenodd"><path d="M0 16.195h3.402v-5.233h4.237V8H3.402V5.037h5.112V2.075H0zm29.784 0l-.855-2.962h-4.335l-.836 2.962H20.26l4.723-14.12h3.576l4.724 14.12zM26.791 5.294h-.04s-.31 1.54-.563 2.43l-.797 2.744h2.74l-.777-2.745c-.252-.889-.563-2.43-.563-2.43zm7.017 9.124s1.807 2.014 5.073 2.014c3.13 0 4.898-2.034 4.898-4.384 0-4.463-6.259-4.147-6.259-5.925 0-.79.778-1.106 1.477-1.106 1.672 0 3.071 1.245 3.071 1.245l1.439-2.824s-1.477-1.6-4.47-1.6c-2.76 0-4.918 1.718-4.918 4.325 0 4.345 6.258 4.285 6.258 5.964 0 .85-.758 1.126-1.457 1.126-1.75 0-3.324-1.462-3.324-1.462zm12.303 1.777h3.402v-5.53h5.054v5.53h3.401V2.075h-3.401v5.648h-5.054V2.075h-3.402zm18.64-1.678s1.692 1.915 4.763 1.915c2.877 0 4.548-1.876 4.548-4.107 0-4.483-6.492-3.871-6.492-6.36 0-.987.914-1.678 2.08-1.678 1.73 0 3.052 1.224 3.052 1.224l1.088-2.073s-1.4-1.501-4.12-1.501c-2.644 0-4.627 1.738-4.627 4.068 0 4.305 6.512 3.87 6.512 6.379 0 1.145-.952 1.698-2.002 1.698-1.944 0-3.44-1.48-3.44-1.48zm19.846 1.678l-1.166-3.594h-4.84l-1.166 3.594H74.84L79.7 2.174h2.623l4.86 14.021zM81.04 4.603h-.039s-.31 1.382-.583 2.172l-1.224 3.752h3.615l-1.224-3.752c-.253-.79-.545-2.172-.545-2.172zm7.911 11.592h8.475v-2.192H91.46V2.173H88.95zm10.477 0H108v-2.192h-6.064v-3.772h4.645V8.04h-4.645V4.366h5.753V2.174h-8.26zM14.255.808l6.142.163-3.391 5.698 3.87 1.086-8.028 12.437.642-8.42-3.613-1.025z"></path></g></svg>
                                <svg height="20" viewBox="0 0 20 20" width="20" class="shopee-svg-icon +BapII"><g fill="none" fill-rule="evenodd" stroke="#fff" stroke-width="1.8" transform="translate(1 1)"><circle cx="9" cy="9" r="9"></circle><path d="m11.5639648 5.05283203v4.71571528l-2.72832027 1.57129639" stroke-linecap="round" stroke-linejoin="round" transform="matrix(-1 0 0 1 20.39961 0)"></path></g></svg>
                                <div class="Suic9m">Kết thúc trong</div>
                                
                                    
                                    <div className="countdown-timer">
                                        <div className="countdown-timer__number">
                                            <div className="countdown-timer__number__hexa countdown-timer__number__hexa--hour" style={{animationDelay: '-1744s',transform:`translateY(-${('0'+time.hours).slice(-2,-1)*17}px)`}}>
                                                {number(10,('0'+time.hours).slice(-2,-1))}
                                            </div>
                                            <div className="countdown-timer__number__deca countdown-timer__number__deca--hour" style={{animationDelay: '-1744s',transform:`translateY(-${('0'+time.hours).slice(-1)*17}px)`}}>
                                                {number(10,('0'+time.hours).slice(-1))} 
                                            </div>
                                        </div>
                                        <div className="countdown-timer__colon">:</div>
                                        <div className="countdown-timer__number">
                                            <div className="countdown-timer__number__hexa countdown-timer__number__hexa--minute" style={{animationDelay: '-174s',transform:`translateY(-${('0'+time.mins).slice(-2,-1)*17}px)`}}>
                                                {number(10,('0'+time.mins).slice(-2,-1))} 
                                            </div>
                                            <div className="countdown-timer__number__deca countdown-timer__number__deca--minute" style={{animationDelay: '-174s',transform:`translateY(-${('0'+time.mins).slice(-1)*17}px)`}}>
                                                {number(10,('0'+time.mins).slice(-1))}  
                                            </div>
                                        </div>
                                        <div className="countdown-timer__colon">:</div>
                                        <div className="countdown-timer__number">
                                            <div className="countdown-timer__number__hexa countdown-timer__number__hexa--second" style={{animationDelay: '-18s',transform:`translateY(-${('0'+time.seconds).slice(-2,-1)*17}px)`}}>
                                                {number(10,('0'+time.seconds).slice(-2,-1))}
                                            </div>
                                            <div className="countdown-timer__number__deca countdown-timer__number__deca--second" style={{animationDelay: '-9s',transform:`translateY(-${('0'+time.seconds).slice(-1)*17}px)`}}>
                                                {number(10,('0'+time.seconds).slice(-1))}
                                            </div>
                                        </div>
                                    </div>
                                
                            </div>:''}
                            <div className=" price__flash-sale">
                                <div className="items-price item-center">
                                <div className={`${!data.percent_discount?'price_current':'price_min_max'}`}>₫{!variation.data?`${formatter.format(data.min_price)}${data.min_price!=data.max_price?` -  ₫${formatter.format(data.max_price)}`:''}`:`${formatter.format(variation.data.price)}`}</div>
                                {data.percent_discount>0?
                                <div className="item-center price_current">
                                    ₫{!variation.data?`${formatter.format(data.min_price*(1-data.percent_discount/100))}${data.min_price!=data.max_price?` -  ₫${formatter.format(data.max_price*(1-data.percent_discount/100))}`:''}`:`${formatter.format(variation.data.discount_price?variation.data.discount_price:variation.data.price)}`}
                                    <div className="box-color">
                                        {variation.data?(variation.data.price-variation.data.discount_price)*100/variation.data.price:data.percent_discount}%Reduce
                                    </div>
                                </div>:""
                                }
                                </div>
                                {data.flash_sale && new Date(data.flash_sale.valid_from)>new Date()?
                                <a className="item-center flash_sale" href="/flash_sale?fromItem=9203700427&amp;promotionId=2029278834">
                                    <svg viewBox="0 0 108 21" height="21" width="108" className="flash-sale-logo flash-sale-logo--default"><g fill="currentColor" fillRule="evenodd"><path d="M0 16.195h3.402v-5.233h4.237V8H3.402V5.037h5.112V2.075H0zm29.784 0l-.855-2.962h-4.335l-.836 2.962H20.26l4.723-14.12h3.576l4.724 14.12zM26.791 5.294h-.04s-.31 1.54-.563 2.43l-.797 2.744h2.74l-.777-2.745c-.252-.889-.563-2.43-.563-2.43zm7.017 9.124s1.807 2.014 5.073 2.014c3.13 0 4.898-2.034 4.898-4.384 0-4.463-6.259-4.147-6.259-5.925 0-.79.778-1.106 1.477-1.106 1.672 0 3.071 1.245 3.071 1.245l1.439-2.824s-1.477-1.6-4.47-1.6c-2.76 0-4.918 1.718-4.918 4.325 0 4.345 6.258 4.285 6.258 5.964 0 .85-.758 1.126-1.457 1.126-1.75 0-3.324-1.462-3.324-1.462zm12.303 1.777h3.402v-5.53h5.054v5.53h3.401V2.075h-3.401v5.648h-5.054V2.075h-3.402zm18.64-1.678s1.692 1.915 4.763 1.915c2.877 0 4.548-1.876 4.548-4.107 0-4.483-6.492-3.871-6.492-6.36 0-.987.914-1.678 2.08-1.678 1.73 0 3.052 1.224 3.052 1.224l1.088-2.073s-1.4-1.501-4.12-1.501c-2.644 0-4.627 1.738-4.627 4.068 0 4.305 6.512 3.87 6.512 6.379 0 1.145-.952 1.698-2.002 1.698-1.944 0-3.44-1.48-3.44-1.48zm19.846 1.678l-1.166-3.594h-4.84l-1.166 3.594H74.84L79.7 2.174h2.623l4.86 14.021zM81.04 4.603h-.039s-.31 1.382-.583 2.172l-1.224 3.752h3.615l-1.224-3.752c-.253-.79-.545-2.172-.545-2.172zm7.911 11.592h8.475v-2.192H91.46V2.173H88.95zm10.477 0H108v-2.192h-6.064v-3.772h4.645V8.04h-4.645V4.366h5.753V2.174h-8.26zM14.255.808l6.142.163-3.391 5.698 3.87 1.086-8.028 12.437.642-8.42-3.613-1.025z"></path></g></svg>
                                    <div className="time-star-flash-sale">BẮT ĐẦU SAU {`${('0'+new Date(data.flash_sale.valid_from).getHours()).slice(-2)}:${('0'+new Date(data.flash_sale.valid_from).getMinutes()).slice(-2)}, ${('0'+new Date(data.flash_sale.valid_from).getDate()).slice(-2)} Th${('0'+new Date(data.flash_sale.valid_from).getMonth()+1).slice(-2)}`}</div>
                                    <svg enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0" className="svg-icon icon-arrow-right"><path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></path></svg>
                                </a>:""}
                            </div>
                        </div>
                        <div className="_7c-I_e">
                            <div className="flex-col">
                            {data.vouchers.length>0?
                            <div className="item-center _3qYU_y discount-voucher">
                                <div className="mini-vouchers item-center">
                                <div className="mini-vouchers__label">Shop discount code</div>
                                <div className="mini-vouchers__wrapper d-flex ">
                                    <div className="mini-vouchers__vouchers d-flex">
                                    {
                                        data.vouchers.map(vocher=>
                                        <div className="voucher-ticket--seller-mini-solid mini-voucher-with-popover">
                                            <div className="item-center">
                                            <span className="voucher-promo-value voucher-promo-value--absolute-value">{vocher.discount_type === '1'?`${vocher.percent}% Giảm`:`Giảm ₫${formatter.format(vocher.amount)}k`}</span>
                                            </div>
                                        </div>
                                        )
                                    }
                                    <div className="mini-vouchers__mask"></div>
                                    </div>
                                </div>
                                </div> 
                                <div className="popover-dropdown filter">
                                <div className="voucher-list">
                                    <div>Shop discount code</div>
                                    <div className="py-2">
                                        Save more when applying Shop's discount code. 
                                        Contact the Shop <br/> if there is a problem with the discount code created by the Shop itself.
                                    </div>
                                    <div className="item-col">
                                        {data.vouchers.map(vocher=>
                                        <div className="_1HdW_G">
                                            <div className="_1k80K2 _2GgEho _2Jjc-J">
                                                <div className="_3frbLs _2nXmFs">
                                                    <div className="_33E3pD">
                                                        <div className="_25_r8I">
                                                            <div className="_3AmYHa _2ep7Ag _2GchKS" style={{backgroundImage: `url(&quot;https://cf.shopee.vn/file/e4a0ec8eed16d49f290516107a3791d7&quot;)`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}}></div>
                                                        </div>
                                                    </div>
                                                    <div className="_2WQCW5">
                                                        <div className="_1ds64- _2Jjc-J">
                                                            <div className="mytS2m"></div>
                                                        </div>
                                                    </div>
                                                    <div className="Jyw0b0"></div>
                                                </div>
                                                <div className="FCu0cQ _2NW6mG">
                                                    <div className="_16SUzs">
                                                        <div className="_3eB1uG item-col">
                                                            <div className="_1Hi5GR _11A33b">
                                                                <div className="FOBwBB">
                                                                    <div className="_6frbci _1VzsJ7">{vocher.discount_type === '1'?`Giảm ${vocher.percent}%`:`Giảm ₫${formatter.format(vocher.amount)}k`}</div>
                                                                </div>
                                                                <div className=" _3SkhRq">Đơn Tối Thiểu ₫{formatter.format(vocher.minimum_order_value/1000)}k <br/> Giảm tối đa ₫{formatter.format(vocher.max_price/1000)}k</div>
                                                            </div>
                                                            <div class>
                                                                <span className="_5BU55m _2a2S8T">HSD: {timepromotion(vocher.valid_to)}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="bXdXbN">
                                                        <div className="_3N_ktJ">
                                                        <button type="button" className={`btn ${vocher?'trans':''} btn-solid-primary btn--s`} aria-disabled="false">{vocher?'Dùng ngay':'Lưu'}</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> 
                                        )}
                                    </div>
                                    </div>
                                </div>
                                </div>
                                :""}
                                {promotion?
                                <div className='item-center _3qYU_y'>
                                <div className="koZBMj">Promotion combo</div>
                                    <div className="mini-vouchers__wrapper d-flex flex-auto ">
                                        <div className="mini-vouchers__vouchers d-flex flex-auto">
                                        
                                            <div className="voucher-ticket voucher-ticket--VN voucher-ticket--seller-mini-solid mini-voucher-with-popover">
                                                <div className="item-center">
                                                    <span className="voucher-promo-value voucher-promo-value--absolute-value">Buy {promotion.quantity_to_reduced} {promotion.combo_type === '1'?`& reduce ${promotion.discount_percent}%`:promotion.combo_type === '2'?`& reduce ₫${formatter.format(promotion.discount_price)}k`:`& only with ₫${formatter.format(promotion.price_special_sale)}k`}</span>
                                                </div>
                                            </div>
                                        <div className="mini-vouchers__mask"></div>
                                        </div>
                                    </div>
                                </div>
                                :""}
                                {data.shock_deal_type?
                                <div className='item-center' >
                                    <div className="koZBMj">Shock deal</div>
                                    <div className="mini-vouchers__wrapper d-flex flex-auto ">
                                    <div className="mini-vouchers__vouchers d-flex flex-auto">
  
                                        <div className=" voucher-ticket--seller-mini-solid mini-voucher-with-popover">
                                            <div className="item-center">
                                            <span className="voucher-promo-value voucher-promo-value--absolute-value">Buy with deal shock</span>
                                            </div>
                                        </div>
                                        <div className="mini-vouchers__mask"></div>
                                    </div>
                                    </div> 
                                </div>
                                :""}
                                <div className="_3qYU_y _1W8scW">
                                    <label className="koZBMj">phí shop</label>
                                    <div className="shipping-item">
                                        <div className="-qKW7n pb-1_2">
                                            <div className="item-center">
                                                <img src="http://localhost:8000/media/my_web/1cdd37339544d858f4d0ade5723cd477.png" width="25" height="15" className="_1gtfJo"/>
                                                Miễn phí vận chuyển
                                            </div>
                                            <div className="pl-2">Miễn phí vận chuyển cho đơn hàng trên ₫300.000</div>
                                        </div>
                                        <div className="item_start">
                                            <div className="_3coA6A">
                                                <svg enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className="svg-icon icon-free-shipping-line"><g><line fill="none" strokeLinejoin="round" strokeMiterlimit="10" x1="8.6" x2="4.2" y1="9.8" y2="9.8"></line><circle cx="3" cy="11.2" fill="none" r="2" strokeMiterlimit="10"></circle><circle cx="10" cy="11.2" fill="none" r="2" strokeMiterlimit="10"></circle><line fill="none" strokeMiterlimit="10" x1="10.5" x2="14.4" y1="7.3" y2="7.3"></line><polyline fill="none" points="1.5 9.8 .5 9.8 .5 1.8 10 1.8 10 9.1" strokeLinejoin="round" strokeMiterlimit="10"></polyline><polyline fill="none" points="9.9 3.8 14 3.8 14.5 10.2 11.9 10.2" strokeLinejoin="round" strokeMiterlimit="10"></polyline></g></svg>
                                            </div>
                                            <div className="item-col">
                                                <div className="item-center ZQR6VS">
                                                    <div className="_2sk4r7">Vận chuyển tới</div>
                                                    <div className="item-center">
                                                        <div className="_28yt5-">
                                                            <div className=" item-center">
                                                                <span className="_2VEa3a">Xã Bàu Chinh, Huyện Châu Đức</span>
                                                                <svg enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0" className="svg-icon icon-arrow-down"><g><path d="m11 2.5c0 .1 0 .2-.1.3l-5 6c-.1.1-.3.2-.4.2s-.3-.1-.4-.2l-5-6c-.2-.2-.1-.5.1-.7s.5-.1.7.1l4.6 5.5 4.6-5.5c.2-.2.5-.2.7-.1.1.1.2.3.2.4z"></path></g></svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="ZQR6VS item-center">
                                                    <div className="_2sk4r7">phí vận chuyển</div>
                                                    <div className="drawer">
                                                        <div className="item-center _35-eEv">₫42.500
                                                            <svg enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0" className="svg-icon icon-arrow-down"><g><path d="m11 2.5c0 .1 0 .2-.1.3l-5 6c-.1.1-.3.2-.4.2s-.3-.1-.4-.2l-5-6c-.2-.2-.1-.5.1-.7s.5-.1.7.1l4.6 5.5 4.6-5.5c.2-.2.5-.2.7-.1.1.1.2.3.2.4z"></path></g></svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`choice_variation ${state.warring?'waring_choice':''}`}>
                                    {data.colors.length>0?
                                    <div className="item-base-line" style={{marginBottom: '8px'}}>
                                        <label className="koZBMj">{data.colors[0].name}</label>
                                        <div className="variation-item item-center">
                                        {data.colors.map(item=>
                                            <button onClick={(e)=>setcolor(e,item)} className={`product-variation${state.variation_size.length>0?`${item.variation.some(r=> state.variation_size.includes(r))?'':' disable'}`:''}${item.id===state.color_id?' product-variation--selected':''}`} aria-label={item.value}>{item.value}
                                            {state.color_id===item.id?
                                            <div className="product-variation__tick">
                                                <svg enableBackground="new 0 0 12 12" viewBox="0 0 12 12" x="0" y="0" className="svg-icon icon-tick-bold"><g><path d="m5.2 10.9c-.2 0-.5-.1-.7-.2l-4.2-3.7c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l3.4 3 5.1-7c .3-.4 1-.5 1.4-.2s.5 1 .2 1.4l-5.7 7.9c-.2.2-.4.4-.7.4 0-.1 0-.1-.1-.1z"></path></g></svg>
                                            </div>
                                            :''}
                                            </button>
                                        )}
                                        </div>
                                    </div>
                                    :''}
                                    {data.sizes.length>0?
                                    <div className="item-base-line" style={{marginBottom: '8px'}}>
                                        <label className="koZBMj">{data.sizes[0].name}</label>
                                        <div className="variation-item item-center">
                                        {data.sizes.map(item=>
                                            <button onClick={(e)=>setsize(e,item)} className={`product-variation${state.variation_color.length>0?`${item.variation.some(r=> state.variation_color.includes(r))?'':' disable'}`:''}${item.id===state.size_id?' product-variation--selected':''}`} aria-label={item.value}>{item.value}
                                            {state.size_id===item.id?
                                            <div className="product-variation__tick">
                                                <svg enableBackground="new 0 0 12 12" viewBox="0 0 12 12" x="0" y="0" className="svg-icon icon-tick-bold"><g><path d="m5.2 10.9c-.2 0-.5-.1-.7-.2l-4.2-3.7c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l3.4 3 5.1-7c .3-.4 1-.5 1.4-.2s.5 1 .2 1.4l-5.7 7.9c-.2.2-.4.4-.7.4 0-.1 0-.1-.1-.1z"></path></g></svg>
                                            </div>
                                            :''}
                                            </button>
                                        )}
                                        </div>
                                    </div>
                                    :''}
                                    <div className="item-center L6Jueq">
                                        <label className="koZBMj">Quanlity</label>
                                        <div className="item-center" id="choice_quantity">
                                            <div className="_16mL_A item-center mr-1 input-quantity">
                                                <button onClick={(e)=>setQuantity(quantity-1)} className="minus-btn btn-adjust">
                                                    <svg enableBackground="new 0 0 10 10" viewBox="0 0 10 10" x="0" y="0" className="svg-icon "><polygon points="4.5 4.5 3.5 4.5 0 4.5 0 5.5 3.5 5.5 4.5 5.5 10 5.5 10 4.5"></polygon></svg>
                                                </button>
                                                <input onChange={e=>setQuantity(isNaN(e.target.value)?quantity:e.target.value)} className="_2KdYzP quantity iRO3yj" type="text" role="spinbutton" aria-valuenow="1" value={quantity}/>
                                                <button onClick={(e)=>setQuantity(quantity+1)} className="plus-btn btn-adjust">
                                                    <svg enableBackground="new 0 0 10 10" viewBox="0 0 10 10" x="0" y="0" className="svg-icon icon-plus-sign"><polygon points="10 4.5 5.5 4.5 5.5 0 4.5 0 4.5 4.5 0 4.5 0 5.5 4.5 5.5 4.5 10 5.5 10 5.5 5.5 10 5.5"></polygon></svg>
                                                </button>
                                            </div>
                                            <div className="inventory">{variation.data?`${variation.data.inventory}`:`${data.total_inventory}`} avaliable</div>
                                        </div>
                                    </div>
                                    {waring.warring?<div className="waring">Please choice size or color</div>:''}
                                </div>
                            </div>
                            {user&&user.id!=data.user_id?
                            <div className="my-1 item-center pl-1">
                                <button onClick={(e)=>addtocart(e)} className="buy _3Kiuzg btn-l item-centers btn-tinted mr-1">
                                    <svg enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className="svg-icon _2FCuXA icon-add-to-cart"><g><g><polyline fill="none" points=".5 .5 2.7 .5 5.2 11 12.4 11 14.5 3.5 3.7 3.5" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"></polyline><circle cx="6" cy="13.5" r="1" stroke="none"></circle><circle cx="11.5" cy="13.5" r="1" stroke="none"></circle></g><line fill="none" strokeLinecap="round" strokeMiterlimit="10" x1="7.5" x2="10.5" y1="7" y2="7"></line><line fill="none" strokeLinecap="round" strokeMiterlimit="10" x1="9" x2="9" y1="8.5" y2="5.5"></line></g></svg>
                                    <span>Add to cart</span> 
                                </button>
                                <button onClick={(e)=>addtocart(e)} className="buy _3Kiuzg btn-l btn-red ">Buy now</button>
                            </div>:''}
                        </div>
                    </div>
                </div> 
            </div>
            <div>
            {main_product || promotion?
            <div style={{display: 'contents'}}>
                {main_product?
                <section className="xg8mCu">
                    <div className="bN31U-">
                        <div className="Rac1ap">
                            <h3 className="CVExdh">Mua thêm deal sốc</h3>
                            <span>
                                <div onClick={e=>navigate(`/addon-deal-selection/${main_product.deal_id}/${main_product.variation_choice.product_id}`)} className="vEKlNi">Xem thêm<svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="rLiIra"><path d="M2 2L6 5.99017L2 10" stroke="currentColor" stroke-width="1.5"></path></svg>
                                </div>
                            </span>
                        </div>
                        <div className="OuwI+w">
                            <Itemdeal
                                item={main_product}
                                product={'mainproduct'}
                                listcolordeal={listcolordeal}
                                listsizedeal={listsizedeal}
                                updatevariation={(e,item,color_id,size_id,quanity,product)=>updatevariation(e,item,color_id,size_id,quanity,product)}
                            />
                            <div className="_91rKmd">
                                <svg enable-background="new 0 0 10 10" viewBox="0 0 10 10" x="0" y="0" className="svg-icon icon-plus-sign"><polygon points="10 4.5 5.5 4.5 5.5 0 4.5 0 4.5 4.5 0 4.5 0 5.5 4.5 5.5 4.5 10 5.5 10 5.5 5.5 10 5.5"></polygon></svg>
                            </div> 
                            {byproduct.map((item,i)=>
                                <Itemdeal
                                item={item}
                                product={'byproduct'}
                                listcolordeal={listcolordeal}
                                listsizedeal={listsizedeal}
                                updatevariation={(e,item,color_id,size_id,quanity,product)=>updatevariation(e,item,color_id,size_id,quanity,product)}
                                setbyproduct={(e,item,name,value)=>setbyproduct(e,item,name,value)}
                                />
                            )}
                        </div>                  
                    </div>
                    <div className="_6Uy99D">
                        <div className="L76BvI">
                            <span> Tổng cộng:</span>
                            <div className="gju3A3">
                                <span className="_1jxndi">₫{formatter.format(main_product.variation_choice.price+total_price_byproducts)}</span>
                                <span className="khJuax">₫{formatter.format(pricemain()+promotion_price_byproducts)}</span>
                            </div>
                            <span className="_8AoNvW">Tiết kiệm</span>
                            <span className="eK2OYx">₫{formatter.format(pricemain()+total_price_byproducts-(main_product.variation_choice.price+promotion_price_byproducts))}</span>
                        </div>
                        <button onClick={e=>addtocartbatch(e)} className="button-outline Yzvdc0 _0FecFw">
                            <svg enable-background="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className="svg-icon _12INAk icon-add-to-cart"><g><g><polyline fill="none" points=".5 .5 2.7 .5 5.2 11 12.4 11 14.5 3.5 3.7 3.5" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"></polyline><circle cx="6" cy="13.5" r="1" stroke="none"></circle><circle cx="11.5" cy="13.5" r="1" stroke="none"></circle></g><line fill="none" stroke-linecap="round" stroke-miterlimit="10" x1="7.5" x2="10.5" y1="7" y2="7"></line><line fill="none" stroke-linecap="round" stroke-miterlimit="10" x1="9" x2="9" y1="8.5" y2="5.5"></line></g></svg>
                        Bấm để mua deal sốc</button>
                    </div>    
                </section>:
                <section className="lt31pc theme--ofs">
                        <h3 class="_6WzJJS">Combo khuyến mãi
                            <div class="cMyLWR e0VUM0">Mua {promotion.quantity_to_reduced} &amp; {promotion.combo_type=='3'?`chỉ với ${promotion.price_special_sale}`:`giảm ${promotion.combo_type=='1'?`${promotion.discount_percent}%`:`₫${formatter.format(promotion.discount_price)}`}`}</div>
                            
                            <Link class="YdRCuG _1ipus9" to={`/bundle-deal/${promotion.id}?fromItem=${data.id}`}>
                                Xem tất cả<svg width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg" class="CRN1qh"><path d="M0.549805 0.705933L4.0498 4.18877L0.549805 7.68877" stroke="currentColor" stroke-width="1.5"></path></svg>
                            </Link>
                        </h3>
                        <ul className="ADFE0a">
                            {promotion.products.map(item=>
                            <li class="vDYt3H">
                                <a title={`${item.name}`} href="/product/182639888/9668689381">
                                <div class="jwWEwt">
                                    <div class="zLenew fj1aPh" style={{backgroundImage: `url(${item.image})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}}></div>
                                    </div>
                                    <p class="AZqucp efbOsy">
                                        <div class="_6H32eD vmbY7Y">
                                            <svg viewBox="0 0 24 11" class="svg-icon"><g fill="#fff" fill-rule="evenodd"><path d="M19.615 7.143V1.805a.805.805 0 0 0-1.611 0v5.377H18c0 1.438.634 2.36 1.902 2.77V9.95c.09.032.19.05.293.05.444 0 .805-.334.805-.746a.748.748 0 0 0-.498-.69v-.002c-.59-.22-.885-.694-.885-1.42h-.002zm3 0V1.805a.805.805 0 0 0-1.611 0v5.377H21c0 1.438.634 2.36 1.902 2.77V9.95c.09.032.19.05.293.05.444 0 .805-.334.805-.746a.748.748 0 0 0-.498-.69v-.002c-.59-.22-.885-.694-.885-1.42h-.002zm-7.491-2.985c.01-.366.37-.726.813-.726.45 0 .814.37.814.742v5.058c0 .37-.364.73-.813.73-.395 0-.725-.278-.798-.598a3.166 3.166 0 0 1-1.964.68c-1.77 0-3.268-1.456-3.268-3.254 0-1.797 1.497-3.328 3.268-3.328a3.1 3.1 0 0 1 1.948.696zm-.146 2.594a1.8 1.8 0 1 0-3.6 0 1.8 1.8 0 1 0 3.6 0z"></path><path d="M.078 1.563A.733.733 0 0 1 .565.89c.423-.15.832.16 1.008.52.512 1.056 1.57 1.88 2.99 1.9s2.158-.85 2.71-1.882c.19-.356.626-.74 1.13-.537.342.138.477.4.472.65a.68.68 0 0 1 .004.08v7.63a.75.75 0 0 1-1.5 0V3.67c-.763.72-1.677 1.18-2.842 1.16a4.856 4.856 0 0 1-2.965-1.096V9.25a.75.75 0 0 1-1.5 0V1.648c0-.03.002-.057.005-.085z" fill-rule="nonzero"></path></g></svg>
                                    </div>{item.name}</p>
                                    <div class="mx6hDy">
                                        <del>₫{formatter.format((item.max_price+item.min_price)/2)}</del>
                                        <em>₫{formatter.format((item.max_price+item.min_price)*(1-item.percent_discount/100)/2)}</em>
                                    </div>
                                </a>
                            </li>
                            )}
                        </ul>
                    
                </section>}
            </div>:''}
            {shop?<>
                <div className="page-product__shop">
                    <div className="_3PlYLN">
                        <a href={shop.shop_url} className="_3IIjTV">
                            <div className="avatar">
                                <div className="avatar__placeholder">
                                    <svg enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className="svg-icon icon-headshot"><g><circle cx="7.5" cy="4.5" fill="none" r="3.8" stroke-miterlimit="10"></circle><path d="m1.5 14.2c0-3.3 2.7-6 6-6s6 2.7 6 6" fill="none" strokeLinecap="round" stroke-miterlimit="10"></path></g></svg>
                                </div>
                                <img src={shop.avatar} alt="" className="avatar__img"/>
                            </div>
                        </a>
                        <div className="item-col ml-1">
                            <p className="pb-1_2">{shop.shop_name}</p>

                            <p className="time_off pb-1_2">Online {!shop.online?`${timeago(shop.is_online)} ago`:''}</p>
                            
                            <div className="d-flex ">
                                {user && data.user_id!=user.id?
                                <button onClick={(e)=>setshowthread(e)} className="mr-1 item-center btn-m btn-tinted">
                                    <svg viewBox="0 0 16 16" className="svg-icon _8j52Y0"><g fillRule="evenodd"><path d="M15 4a1 1 0 01.993.883L16 5v9.932a.5.5 0 01-.82.385l-2.061-1.718-8.199.001a1 1 0 01-.98-.8l-.016-.117-.108-1.284 8.058.001a2 2 0 001.976-1.692l.018-.155L14.293 4H15zm-2.48-4a1 1 0 011 1l-.003.077-.646 8.4a1 1 0 01-.997.923l-8.994-.001-2.06 1.718a.5.5 0 01-.233.108l-.087.007a.5.5 0 01-.492-.41L0 11.732V1a1 1 0 011-1h11.52zM3.646 4.246a.5.5 0 000 .708c.305.304.694.526 1.146.682A4.936 4.936 0 006.4 5.9c.464 0 1.02-.062 1.608-.264.452-.156.841-.378 1.146-.682a.5.5 0 10-.708-.708c-.185.186-.445.335-.764.444a4.004 4.004 0 01-2.564 0c-.319-.11-.579-.258-.764-.444a.5.5 0 00-.708 0z"></path></g></svg>
                                    CHAT NOW
                                </button>:''}
                                <Link className=" btn-light btn-m item-center" to={`${shop.url}?itemId=${data.id}&categoryId=${data.category_id}`}>
                                    <svg enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" strokeWidth="0" className="svg-icon _8j52Y0"><path d="m13 1.9c-.2-.5-.8-1-1.4-1h-8.4c-.6.1-1.2.5-1.4 1l-1.4 4.3c0 .8.3 1.6.9 2.1v4.8c0 .6.5 1 1.1 1h10.2c.6 0 1.1-.5 1.1-1v-4.6c.6-.4.9-1.2.9-2.3zm-11.4 3.4 1-3c .1-.2.4-.4.6-.4h8.3c.3 0 .5.2.6.4l1 3zm .6 3.5h.4c.7 0 1.4-.3 1.8-.8.4.5.9.8 1.5.8.7 0 1.3-.5 1.5-.8.2.3.8.8 1.5.8.6 0 1.1-.3 1.5-.8.4.5 1.1.8 1.7.8h.4v3.9c0 .1 0 .2-.1.3s-.2.1-.3.1h-9.5c-.1 0-.2 0-.3-.1s-.1-.2-.1-.3zm8.8-1.7h-1v .1s0 .3-.2.6c-.2.1-.5.2-.9.2-.3 0-.6-.1-.8-.3-.2-.3-.2-.6-.2-.6v-.1h-1v .1s0 .3-.2.5c-.2.3-.5.4-.8.4-1 0-1-.8-1-.8h-1c0 .8-.7.8-1.3.8s-1.1-1-1.2-1.7h12.1c0 .2-.1.9-.5 1.4-.2.2-.5.3-.8.3-1.2 0-1.2-.8-1.2-.9z"></path></svg> 
                                    XEM SHOP
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="_3n5HPy">
                        <div className="_1utN4D">
                            <button className="_14x4GD gy4qkp">
                                <span className="_3ApBiN">Rating</span>
                                <span className="_33OqNH _2YMXyO">dddddddd</span>
                            </button>
                            <div className="_14x4GD gy4qkp" style={{width:'200px'}}>
                                <span className="_3ApBiN">Join</span>
                                <span className="_33OqNH _2YMXyO">{shop.time} days ago</span>
                            </div>
                        </div>
                        <div className="_1utN4D">
                            <button className="_14x4GD gy4qkp">
                                <span className="_3ApBiN">Product</span> 
                                <span className="_33OqNH _2YMXyO">{shop.count_product}</span>
                            </button>
                            <div className="_14x4GD gy4qkp">
                                <span className="_3ApBiN">Follower</span>
                                <span className="_33OqNH _2YMXyO">{shop.num_follow}</span>
                            </div>
                        </div> 
                    </div>
                </div>
                <div className="page-product__content">
                <div className='page-product__content--left'>
                    
                    <div className="product-detail page-product__detail">
                        {productdetail?
                        <div className="XbKeLg">
                            <div className="_1Qm7yD">CHI TIẾT SẢN PHẨM</div>
                            <div className="Fo12Im">
                                <div className="_1pEVDa">
                                    <label className="_1A0RCW">Danh Mục</label>
                                    <div className="item-center _3bDXqx">
                                        <a className="_2572CL ni2r2i" href="/">Anhdai</a>
                                        <svg enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0" className="svg-icon _2m4lrt icon-arrow-right"><path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></path></svg>
                                    </div>
                                </div>
                                <div className="_1pEVDa">
                                    <label className="_1A0RCW">Chất liệu</label>
                                    <div>Denim</div>
                                </div>
                                {Object.keys(productdetail).map((item,i)=>{
                                if(productdetail[item] && !item.includes('id')){
                                    return(
                                    <div className="_1pEVDa">
                                        <label className="_1A0RCW">{item}</label>
                                        <div>{productdetail[item]}</div>
                                        </div>
                                    )
                                    }
                                })}
                                <div className="_1pEVDa">
                                    <label className="_1A0RCW">Xuất xứ</label>
                                    <div>Trung Quốc</div>
                                </div>
                                <div className="_1pEVDa">
                                    <label className="_1A0RCW">Kho hàng</label>
                                    <div>{data.total_inventory}</div>
                                </div>
                                <div className="_1pEVDa">
                                    <label className="_1A0RCW">Gửi từ</label>
                                    <div>Huyện Đông Anh, Hà Nội</div>
                                </div>
                            </div>
                        </div>:''}
                        <div className="XbKeLg">
                            <div className="_1Qm7yD">MÔ TẢ SẢN PHẨM</div>
                            <div className="Fo12Im">
                                <div className="Mhqp_x">
                                <p className="_2Y002L">{data.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="page-product__content--right">
                    <div className="display: contents">
                        {data.vouchers.length>0?
                        <div className="product-shop-vouchers page-product__shop-voucher">
                            <div className="product-shop-vouchers__header">Mã giảm giá của Shop</div>
                            <div className="product-shop-vouchers__list" style={{maxHeight: '23.25rem'}}>
                                {data.vouchers.map(vocher=>
                                <div className="_1v21H2 _3v4TxM">
                                    <div className="_5i0d1d O5jY-J _1HW0fp _143EYI">
                                        <div className="_2RHirG _3ovy3V _2PNEOW">
                                            <div className="_3bSUDv">
                                                <div className="pbcBSR _2_kJZD">
                                                    <div className="_1PBA5q">
                                                        <div className="_1ZB7C1 qEinNS">{vocher.discount_type === '1'?`Giảm ${vocher.percent}%`:`Giảm ₫${formatter.format(vocher.amount)}k`}</div>
                                                    </div>
                                                    <div className="_3wpzXq _2JzVpY">Đơn Tối Thiểu ₫{formatter.format(vocher.minimum_order_value/1000)}k <br/> Giảm tối đa ₫{formatter.format(vocher.max_price/1000)}k</div>
                                                </div>
                                                
                                                <span className="_3WswQ9 _2IDlYp HO-RDa U0cGFA">
                                                    <div className="x71QpC">
                                                        <div style={{width: '72%', height: '100%', background: 'linear-gradient(270deg, rgb(255, 176, 0) 0%, rgb(235, 23, 23) 100%)'}}></div>
                                                    </div>
                                                    <div className="D56q0_">
                                                        <span className="">Đã dùng 72%, </span>
                                                        <span className="_2-v2uI">HSD: {timepromotion(vocher.valid_to)}</span>
                                                    </div>
                                                </span>
                                            </div>
                                            <div className="_3vsRla">
                                                <div className="UJNhBl _143EYI">
                                                    <div className="_3IM-kK"></div>
                                                </div>
                                            </div>
                                            <div className="_20oZ4H">
                                            </div>
                                        </div>
                                        <div className="_2an6zy J5KS9N _2PNEOW">
                                            <div className="_2nzSet">
                                                <div className="_1kvm2E _1-K4Yt">
                                                    <button type="button" className="btn btn-solid-primary btn--s btn--inline _2e0ome _3HPrsD">Lưu</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>)}
                            </div>
                        </div>:''}
                    </div>
                    <div className="product-shop-hot-sales page-product__hot-sales">
                        <div className="product-shop-hot-sales__header">Top sản phẩm bán chạy</div>
                        {list_hot_sales.map(item=>
                        <Link key={item.id} className="item-card-special__link product-shop-hot-sales__item" to={`${item.url}?itemId=${item.id}`}>
                            <div className="item-card-special">
                                <div className="item-card-special__img">
                                    <div className="lazy-image__container item-card-special__img-background">
                                        <div className="lazy-image__image" style={{backgroundImage: `url(${item.image})`}}></div>
                                    </div>
                                </div>
                                <div className="item-card-special__lower-padding">
                                    <div className="item-card-special__name item-card-special__name--special">🔥{item.name}</div>
                                    <div className="item-card-special__section-price item-card-special__section-price--special">
                                        <div className="item-card-special__current-price item-card-special__current-price--special">₫{formatter.format(item.min_price*(100-item.percent_discount))} {item.max_price!=item.min_price?`₫${formatter.format(item.max_price*(100-item.percent_discount))}`:''}</div>
                                    </div>
                                </div>
                            </div>
                        </Link>)}
                    </div>
                </div>
                </div></>:''}
                <div className="product-ratings">
                    {listreview!=null?<>
                    <div className="product-ratings__header">ĐÁNH GIÁ SẢN PHẨM</div>
                    <div className="product-rating-overview">
                        <div className="product-rating-overview__briefing">
                            <div className="product-rating-overview__score-wrapper">
                                <span className="product-rating-overview__rating-score">{data.review_rating.toFixed(1)}</span>
                                <span className="product-rating-overview__rating-score-out-of"> trên 5 </span>
                            </div>
                            <div className="rating-stars product-rating-overview__stars">
                                <div className="rating-stars__stars">
                                    {rating(6,data)}
                                </div>
                            </div>
                        </div>
                        <div className="product-rating-overview__filters">
                            {list_review_choice(5).map((item,i)=>
                                <div onClick={()=>{
                                    setIndextype(i+1)
                                   
                                    setTypereview({name:item.keys,value:item.value})}}
                              key={i}  className={`product-rating-overview__filter ${item.value===state.review_choice?'product-rating-overview__filter--active':''} `}>{item.name} {item.keys==='all'?'':`(${item.keys==='comment'?state.has_comment:item.keys==='media'?state.has_media:state.rating.filter(i=>item.value==i).length})`}</div>
                            )}
                        </div>
                    </div>
                    {listreview.length===0?
                    <div className="product-ratings-comments-view__no-data">
                        <div className="product-ratings-comments-view__no-data__icon">
                            <img src="https://res.cloudinary.com/dupep1afe/image/upload/v1650097510/eac95a8ac896158642c2761a9e9cd52e_l9erhr.png"/>
                        </div>
                        <div className="product-ratings-comments-view__no-data__text">Chưa có đánh giá</div>
                    </div>:<>
                    <div className="product-ratings__list">
                        <div className="product-comment-list">
                            {listreview.map(review=>
                                <ReviewItem
                                review={review}
                                user={user}
                                
                                setreport={(e,review)=>setreport(e,review)}
                                showmedia={(e,item,review)=>showmedia(e,item,review)}
                                setlikereview={(e,review)=>setlikereview(e,review)}
                                />
                            )}
                        </div>
                        <div className="page-controller product-ratings__page-controller">
                            <Pagination
                                classActive={`button-solid button-solid--primary`}
                                classNomal={`button-no-outline`}
                                currentPage={page}
                                totalCount={state.page_count}
                                pageSize={pageSize}
                                onPageChange={page => setPage(page)}
                            />
                        </div>
                    </div>
                    </>}</>:''}
                </div>
            </div>
        </div>:''}
    </div>
  )
}
const mapStateToProps = state => ({
    isAuthenticated: state.isAuthenticated,user:state.user
});

export default connect(mapStateToProps,{showchat,showthreads})(ProductDetail);
