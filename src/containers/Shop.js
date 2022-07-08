import {detailURL,formatter,localhost,timecreate,shopinfoURL,sort_options,
    itemvariation,rating,listThreadlURL,sort_price_choice, timeago} from "../constants"
import axios from 'axios';
import React, {useState, useEffect,useRef} from 'react'
import Pagination from "../hocs/Pagination"
import {useNavigate , Link,useLocation, Navigate,useParams,useSearchParams} from 'react-router-dom';
import Itemsearch from "./Listitem"
import {connect} from "react-redux"
import { expiry, headers } from "../actions/auth";
const Shopinfo = ({setshow,data,setthreadchoice,setsearchitem,setthread,setsearchcategory,user,
    params,searchitem,listitem}) => {
    const [state, setState] = useState(null)
    const {slug}=useParams()
    let navigate = useNavigate();
    useEffect(()=>{
        setState({...state,thread_id:data.thread_id!=undefined?data.thread_id:undefined})
    },[data])
    const search=Object.fromEntries([...params])
    
    const setshowthread=()=>{
        setshow(true)
            if(state.exist_thread){
              let url=new URL(listThreadlURL)
              let search_params=url.searchParams
              search_params.append('list_thread','ok')
              search_params.append('thread_id',state.thread_id)
              url.search = search_params.toString();
              let new_url = url.toString();
              axios.get(new_url,headers)
              .then(res => { 
                let data=res.data
                setthread(data)
                setthreadchoice(data.threads.find(item=>item.id==state.thread_id))
              })
            }
            else{
            create_thread()
        }
    }
    
    const create_thread=()=>{
        setshow(true)
        let form=new FormData()
        form.append('participants',user.id)
        form.append('participants',state.data.shop_user)
        axios.post(listThreadlURL,form,headers)
        .then(res=>{
            setState({...state,exist_thread:true})
            let data=res.data
            const array=[user.id,state.data.shop_user]
            setthread(data)
            setthreadchoice(data.threads.find(thread=>thread.info_thread.every(item=>array.includes(item.user_id))))
        })
    }
    const setsearch=(name,value)=>{
        delete searchitem.order
        const searchitems={...searchitem,[name]:value}
        setsearchitem(searchitems)
    }

    const setfollow=e=>{
        e.preventDefault();
        if(localStorage.token!='null' && expiry>0){
            let form=new FormData()
            form.append('shop_name',data.shop_name)
            axios.post(detailURL+slug,form,headers)
            .then(res=>{
            let data=res.data
            const shop_info={...state,...data}
                setState(shop_info)
            })
        }
        else{
            navigate(`/buyer/login?next=${window.location}`, { replace: true });
        }
    }
    
    return(
    <div className="shop-page">
        {data!=null?
        <div className="">
            <div className="shop-page__info">
                <div className="section-seller-overview-horizontal containers">
                    <div className="section-seller-overview-horizontal__leading">
                        <div className="section-seller-overview-horizontal__leading-background" style={{backgroundImage: `url(${data.shop_logo})`}}></div>
                        <div className="section-seller-overview-horizontal__leading-background-mask"></div>
                        <div className="section-seller-overview-horizontal__leading-content">
                            <div className="section-seller-overview-horizontal__seller-portrait _3G9pjm">
                                <a className="section-seller-overview-horizontal__seller-portrait-link" href="/soahman">
                                    <div className="avatar _3aM_PS">
                                        <div className="avatar__placeholder">
                                            <svg enable-background="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className="svg-icon icon-headshot"><g><circle cx="7.5" cy="4.5" fill="none" r="3.8" stroke-miterlimit="10"></circle><path d="m1.5 14.2c0-3.3 2.7-6 6-6s6 2.7 6 6" fill="none" stroke-linecap="round" stroke-miterlimit="10"></path></g></svg>
                                        </div>
                                        <img className="avatar__img" src="https://cf.shopee.vn/file/693a071a73b8f22a77bc5f0e54776729_tn"/>
                                    </div>
                                    <div className="section-seller-overview-horizontal__preferred-badge-wrapper">
                                        <div className="_2vYHuP _3KOA3x _1Syx5m">Yêu thích</div>
                                    </div>
                                </a>
                                <div className="section-seller-overview-horizontal__portrait-info">
                                    <h1 className="section-seller-overview-horizontal__portrait-name">soahman</h1>
                                    <div className="section-seller-overview-horizontal__portrait-status">
                                        <div className="section-seller-overview-horizontal__active-time">Online 10 phút trước</div>
                                    </div>
                                </div>
                            </div>
                            <div className="section-seller-overview-horizontal__buttons">
                                <a className={`section-seller-overview-horizontal__button ${data.follow!=undefined && data.follow?'section-seller-overview-horizontal__button--following':''}`}>
                                    <button onClick={(e)=>setfollow(e)} className="button-outline button-outline--complement button-outline--fill">
                                        {data.follow!=undefined && data.follow?"Đang theo":<>
                                        <span className="section-seller-overview-horizontal__icon">
                                            <svg enable-background="new 0 0 10 10" viewBox="0 0 10 10" x="0" y="0" className="svg-icon icon-plus-sign"><polygon points="10 4.5 5.5 4.5 5.5 0 4.5 0 4.5 4.5 0 4.5 0 5.5 4.5 5.5 4.5 10 5.5 10 5.5 5.5 10 5.5"></polygon></svg>
                                        </span>theo dõi</>}
                                    </button>
                                </a>
                                <a argettype="chatButton" className="section-seller-overview-horizontal__button">
                                    <button onClick={()=>setshowthread()} className="button-outline button-outline--complement button-outline--fill">
                                        <span className="section-seller-overview-horizontal__icon">
                                            <svg viewBox="0 0 16 16" className="svg-icon"><g fill-rule="evenodd"><path d="M15 4a1 1 0 01.993.883L16 5v9.932a.5.5 0 01-.82.385l-2.061-1.718-8.199.001a1 1 0 01-.98-.8l-.016-.117-.108-1.284 8.058.001a2 2 0 001.976-1.692l.018-.155L14.293 4H15zm-2.48-4a1 1 0 011 1l-.003.077-.646 8.4a1 1 0 01-.997.923l-8.994-.001-2.06 1.718a.5.5 0 01-.233.108l-.087.007a.5.5 0 01-.492-.41L0 11.732V1a1 1 0 011-1h11.52zM3.646 4.246a.5.5 0 000 .708c.305.304.694.526 1.146.682A4.936 4.936 0 006.4 5.9c.464 0 1.02-.062 1.608-.264.452-.156.841-.378 1.146-.682a.5.5 0 10-.708-.708c-.185.186-.445.335-.764.444a4.004 4.004 0 01-2.564 0c-.319-.11-.579-.258-.764-.444a.5.5 0 00-.708 0z"></path></g></svg>
                                            </span>chat
                                    </button>
                                </a>
                                </div>
                            </div>
                        </div>
                        <div className="section-seller-overview-horizontal__seller-info-list">
                            <div className="section-seller-overview__item section-seller-overview__item--clickable">
                                <div className="section-seller-overview__item-icon-wrapper">
                                    <svg enable-background="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" stroke-width="0" className="svg-icon"><path d="m13 1.9c-.2-.5-.8-1-1.4-1h-8.4c-.6.1-1.2.5-1.4 1l-1.4 4.3c0 .8.3 1.6.9 2.1v4.8c0 .6.5 1 1.1 1h10.2c.6 0 1.1-.5 1.1-1v-4.6c.6-.4.9-1.2.9-2.3zm-11.4 3.4 1-3c .1-.2.4-.4.6-.4h8.3c.3 0 .5.2.6.4l1 3zm .6 3.5h.4c.7 0 1.4-.3 1.8-.8.4.5.9.8 1.5.8.7 0 1.3-.5 1.5-.8.2.3.8.8 1.5.8.6 0 1.1-.3 1.5-.8.4.5 1.1.8 1.7.8h.4v3.9c0 .1 0 .2-.1.3s-.2.1-.3.1h-9.5c-.1 0-.2 0-.3-.1s-.1-.2-.1-.3zm8.8-1.7h-1v .1s0 .3-.2.6c-.2.1-.5.2-.9.2-.3 0-.6-.1-.8-.3-.2-.3-.2-.6-.2-.6v-.1h-1v .1s0 .3-.2.5c-.2.3-.5.4-.8.4-1 0-1-.8-1-.8h-1c0 .8-.7.8-1.3.8s-1.1-1-1.2-1.7h12.1c0 .2-.1.9-.5 1.4-.2.2-.5.3-.8.3-1.2 0-1.2-.8-1.2-.9z"></path></svg>
                                </div>
                                <div className="section-seller-overview__item-text">
                                    <div className="section-seller-overview__item-text-name">Sản phẩm:&nbsp;</div>
                                <div className="section-seller-overview__item-text-value">{data.count_product}</div>
                            </div>
                            <div className="section-seller-overview__item-text section-seller-overview__item-text--no-product">
                                <div className="section-seller-overview__item-text-value">44</div>
                                <div className="section-seller-overview__item-text-name">{data.count_product}</div>
                            </div>
                        </div>
                        <div className="section-seller-overview__item">
                            <div className="section-seller-overview__item-icon-wrapper">
                                <svg enable-background="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className="svg-icon"><g><circle cx="7" cy="4.5" fill="none" r="3.8" stroke-miterlimit="10"></circle><line fill="none" stroke-linecap="round" stroke-miterlimit="10" x1="12" x2="12" y1="11.2" y2="14.2"></line><line fill="none" stroke-linecap="round" stroke-miterlimit="10" x1="10.5" x2="13.5" y1="12.8" y2="12.8"></line><path d="m1.5 13.8c0-3 2.5-5.5 5.5-5.5 1.5 0 2.9.6 3.9 1.6" fill="none" stroke-linecap="round" stroke-miterlimit="10"></path></g></svg>
                            </div>
                            <div className="section-seller-overview__item-text">
                                <div className="section-seller-overview__item-text-name">Đang Theo:&nbsp;</div>
                                <div className="section-seller-overview__item-text-value">{data.count_followings}</div>
                            </div>
                            <div className="section-seller-overview__item-text section-seller-overview__item-text--no-product">
                                <div className="section-seller-overview__item-text-value">{data.count_followings}</div>
                                <div className="section-seller-overview__item-text-name">Đang Theo</div>
                            </div>
                        </div>
                        <div className="section-seller-overview__item">
                            <div className="section-seller-overview__item-icon-wrapper">
                                <svg enable-background="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className="svg-icon"><g><polygon fill="none" points="14 10.8 7 10.8 3 13.8 3 10.8 1 10.8 1 1.2 14 1.2" stroke-linejoin="round" stroke-miterlimit="10"></polygon><circle cx="4" cy="5.8" r="1" stroke="none"></circle><circle cx="7.5" cy="5.8" r="1" stroke="none"></circle><circle cx="11" cy="5.8" r="1" stroke="none"></circle></g></svg>
                            </div>
                        <div className="section-seller-overview__item-text">
                            <div className="section-seller-overview__item-text-name">Tỉ lệ phản hồi Chat:&nbsp;</div>
                            <div className="section-seller-overview__item-text-value">99% (trong vài giờ)
                            <div className="section-seller-overview__inline-icon section-seller-overview__inline-icon--help">
                                <svg width="10" height="10"><g fill="currentColor" fill-rule="nonzero" color="currentColor" stroke-width="0"><path d="M5 10A5 5 0 1 1 5 0a5 5 0 0 1 0 10zM5 .675a4.325 4.325 0 1 0 0 8.65 4.325 4.325 0 0 0 0-8.65z"></path><path d="M6.235 5.073c.334-.335.519-.79.514-1.264a1.715 1.715 0 0 0-.14-.684 1.814 1.814 0 0 0-.933-.951A1.623 1.623 0 0 0 5 2.03a1.66 1.66 0 0 0-.676.14 1.772 1.772 0 0 0-.934.948c-.093.219-.14.454-.138.691a.381.381 0 0 0 .106.276c.07.073.168.113.27.11a.37.37 0 0 0 .348-.235c.02-.047.031-.099.03-.15a1.006 1.006 0 0 1 .607-.933.954.954 0 0 1 .772.002 1.032 1.032 0 0 1 .61.93c.003.267-.1.525-.288.716l-.567.537c-.343.35-.514.746-.514 1.187a.37.37 0 0 0 .379.382c.1.002.195-.037.265-.108a.375.375 0 0 0 .106-.274c0-.232.097-.446.29-.642l.568-.534zM5 6.927a.491.491 0 0 0-.363.152.53.53 0 0 0 0 .74.508.508 0 0 0 .726 0 .53.53 0 0 0 0-.74A.491.491 0 0 0 5 6.927z"></path></g></svg>
                            </div>
                        </div>
                        </div>
                            <div className="section-seller-overview__item-text section-seller-overview__item-text--no-product">
                                <div className="section-seller-overview__item-text-value">99% (trong vài giờ)</div>
                                <div className="section-seller-overview__item-text-name">Tỉ lệ phản hồi Chat</div>
                            </div>
                        </div>
                        <div className="section-seller-overview__item">
                            <div className="section-seller-overview__item-icon-wrapper">
                                <svg width="13" height="14"><g fill="currentColor" fill-rule="nonzero" stroke-width="0.4"><path d="M9.49.903h.453c.498 0 .903.404.903.903v4.993a.452.452 0 1 0 .904 0V1.806C11.75.808 10.94 0 9.944 0H9.49a.452.452 0 1 0 0 .903zM5.879 12.645H1.813a.903.903 0 0 1-.903-.902V1.806c0-.499.405-.903.903-.903h.452a.451.451 0 0 0 0-.903h-.452C.816 0 .007.808.007 1.806v9.936c0 .998.809 1.806 1.806 1.806h4.065a.452.452 0 0 0 0-.903z"></path><path d="M2.265 0H9.49a.451.451 0 1 1 0 .903H2.265a.452.452 0 0 1 0-.903zm.904 3.613H9.04a.452.452 0 1 1 0 .903H3.169a.452.452 0 1 1 0-.903zm0 2.71h3.613a.452.452 0 1 1 0 .904H3.169a.452.452 0 0 1 0-.904zm0 2.709h1.806a.452.452 0 1 1 0 .905H3.169a.452.452 0 0 1 0-.905zm6.322 4.065a2.258 2.258 0 1 0 0-4.515 2.258 2.258 0 0 0 0 4.515zm0 .903a3.161 3.161 0 1 1 0-6.323 3.161 3.161 0 0 1 0 6.323z"></path><path d="M7.575 12.117l3.193-3.194a.451.451 0 1 1 .638.639l-3.192 3.192a.451.451 0 0 1-.639-.637z"></path></g></svg>
                            </div>
                            <div className="section-seller-overview__item-text">
                                <div className="section-seller-overview__item-text-name">Tỉ lệ Shop hủy đơn:&nbsp;</div>
                                <div className="section-seller-overview__item-text-value">1%
                                    <div className="section-seller-overview__inline-icon section-seller-overview__inline-icon--help">
                                        <svg width="10" height="10"><g fill="currentColor" fill-rule="nonzero" color="currentColor" stroke-width="0"><path d="M5 10A5 5 0 1 1 5 0a5 5 0 0 1 0 10zM5 .675a4.325 4.325 0 1 0 0 8.65 4.325 4.325 0 0 0 0-8.65z"></path><path d="M6.235 5.073c.334-.335.519-.79.514-1.264a1.715 1.715 0 0 0-.14-.684 1.814 1.814 0 0 0-.933-.951A1.623 1.623 0 0 0 5 2.03a1.66 1.66 0 0 0-.676.14 1.772 1.772 0 0 0-.934.948c-.093.219-.14.454-.138.691a.381.381 0 0 0 .106.276c.07.073.168.113.27.11a.37.37 0 0 0 .348-.235c.02-.047.031-.099.03-.15a1.006 1.006 0 0 1 .607-.933.954.954 0 0 1 .772.002 1.032 1.032 0 0 1 .61.93c.003.267-.1.525-.288.716l-.567.537c-.343.35-.514.746-.514 1.187a.37.37 0 0 0 .379.382c.1.002.195-.037.265-.108a.375.375 0 0 0 .106-.274c0-.232.097-.446.29-.642l.568-.534zM5 6.927a.491.491 0 0 0-.363.152.53.53 0 0 0 0 .74.508.508 0 0 0 .726 0 .53.53 0 0 0 0-.74A.491.491 0 0 0 5 6.927z"></path></g></svg>
                                    </div>
                                </div>
                            </div>
                            <div className="section-seller-overview__item-text section-seller-overview__item-text--no-product">
                                <div className="section-seller-overview__item-text-value">1%</div>
                                <div className="section-seller-overview__item-text-name">Tỉ lệ Shop hủy đơn</div>
                            </div>
                        </div>
                        <div className="section-seller-overview__item">
                            <div className="section-seller-overview__item-icon-wrapper">
                                <svg enable-background="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className="svg-icon"><g><circle cx="5.5" cy="5" fill="none" r="4" stroke-miterlimit="10"></circle><path d="m8.4 7.5c.7 0 1.1.7 1.1 1.6v4.9h-8v-4.9c0-.9.4-1.6 1.1-1.6" fill="none" stroke-linejoin="round" stroke-miterlimit="10"></path><path d="m12.6 6.9c.7 0 .9.6.9 1.2v5.7h-2" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"></path><path d="m9.5 1.2c1.9 0 3.5 1.6 3.5 3.5 0 1.4-.9 2.7-2.1 3.2" fill="none" stroke-linecap="round" stroke-miterlimit="10"></path></g></svg>
                            </div>
                            <div className="section-seller-overview__item-text">
                                <div className="section-seller-overview__item-text-name">Người theo dõi:&nbsp;</div>
                                <div className="section-seller-overview__item-text-value">{data.num_followers}</div>
                            </div>
                            <div className="section-seller-overview__item-text section-seller-overview__item-text--no-product">
                                <div className="section-seller-overview__item-text-value">{data.num_followers}</div>
                                <div className="section-seller-overview__item-text-name">Người theo dõi</div>
                            </div>
                        </div>
                        <div className="section-seller-overview__item section-seller-overview__item--clickable">
                            <div className="section-seller-overview__item-icon-wrapper">
                                <svg enable-background="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className="svg-icon icon-rating"><polygon fill="none" points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"></polygon></svg>
                            </div>
                            <div className="section-seller-overview__item-text">
                                <div className="section-seller-overview__item-text-name">đánh giá:&nbsp;</div>
                                <div className="section-seller-overview__item-text-value">{data.averge_review.toFixed(1)} ({data.total_review} đánh giá)</div>
                            </div>
                            <div className="section-seller-overview__item-text section-seller-overview__item-text--no-product">
                                <div className="section-seller-overview__item-text-value">{data.averge_review.toFixed(1)} ({data.total_review} đánh giá)</div>
                                <div className="section-seller-overview__item-text-name">đánh giá</div>
                            </div>
                        </div>
                        <div className="section-seller-overview__item">
                            <div className="section-seller-overview__item-icon-wrapper">
                                <svg enable-background="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className="svg-icon"><g><circle cx="6.8" cy="4.2" fill="none" r="3.8" stroke-miterlimit="10"></circle><polyline fill="none" points="9.2 12.5 11.2 14.5 14.2 11" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"></polyline><path d="m .8 14c0-3.3 2.7-6 6-6 2.1 0 3.9 1 5 2.6" fill="none" stroke-linecap="round" stroke-miterlimit="10"></path></g></svg>
                            </div>
                            <div className="section-seller-overview__item-text">
                                <div className="section-seller-overview__item-text-name">tham gia:&nbsp;</div>
                                    <div className="section-seller-overview__item-text-value">{timeago(data.created)}</div>
                                </div>
                            <div className="section-seller-overview__item-text section-seller-overview__item-text--no-product">
                                <div className="section-seller-overview__item-text-value">{timeago(data.created)}</div>
                                <div className="section-seller-overview__item-text-name">tham gia</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{paddingBottom: '0px'}}></div>
            <div className="shop-page-menu">
                <div className="navbar-with-more-menu navbar-with-more-menu--narrow">
                    <div className="containers navbar-with-more-menu__wrapper navbar-with-more-menu__wrapper--no-shadow" style={{backgroundColor: 'rgb(255, 255, 255)'}}>
                        <div className="navbar-with-more-menu__items d-flex">
                            
                            <Link className="navbar-with-more-menu__item navbar-with-more-menu__item--active" to={`/${slug}`}>
                                <span>Dạo</span>
                            </Link>
                            <Link className="navbar-with-more-menu__item" to={`/${slug}#product_list`}>
                                <span>TẤT CẢ SẢN PHẨM</span>
                            </Link>
                            {data.list_category_child.map(category=>
                                <Link onClick={()=>setsearchcategory('categoryID',category.id)} className="navbar-with-more-menu__item" to={`/${slug}?categoryID=${category.id}#productlist`}>
                                    <span>{category.title}</span>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="containers">
                <div className="shop-page__section shop-page__vouchers">
                    <h3 className="shop-page__section-title">Mã giảm giá của Shop</h3>
                    <div className="image-carousel">
                        <div className="image-carousel__item-list-wrapper">
                            <ul className="image-carousel__item-list" style={{width: '100%', transform: 'translate(0px, 0px)'}}>
                                <li className="image-carousel__item" style={{padding: '0px 8px', width: '28.5714%'}}>
                                    <div className="_2e7Dvi">
                                        <div className="_2OWU3q r7z3g7 _2xeaDh">
                                            <div className="_8C6jYD _2zbr2s U_IV4f">
                                                <div className="_4nIo2l">
                                                    <div className="_3l46nX _2xeaDh">
                                                        <div className="D39R0J"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="uRSBSy _3RVYCx U_IV4f">
                                                <div className="B8Mos-">
                                                    <div className="lU-GLL">
                                                        <div className="_26xIz2 _2IVkpm _1tmNHL">
                                                            <div className="S9wWIB">
                                                                <div className="MpE9sV _37mvuv">Giảm ₫2k</div>
                                                            </div>
                                                            <div className="_3tlKS6 _1K7Xn9">Đơn Tối Thiểu ₫180k</div>
                                                        </div>
                                                        <div></div>
                                                        <span className="_30O3Fu _31nfeF _2hA3Ad _16MNlJ">
                                                            <div className="Kvz1on">
                                                                <span className="_3BDy3u _2GsQaz">HSD: 28.05.2022</span>
                                                            </div>
                                                        </span>
                                                        <div className="BFhH9V"></div>
                                                    </div>
                                                </div>
                                                <div className="_7ojJBF">
                                                    <div className="_1b3q1K">
                                                        <button type="button" className="btn btn-solid-primary btn--s btn--inline _2juLw1 _2H9aBl D_d49Y" aria-disabled="false">Lưu</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="shop-decoration">
                    <div className="_1Z4Xy3">
                        <div className="shop-collection-view">
                            <div className="header-section header-section--simple">
                                <div className="header-section__header">
                                    <div className="header-section__header__title">Gợi ý cho bạn</div>
                                    <a className="header-section__header-link" href="/shop_recommended_for_you?catid=100011&amp;itemid=8543592415&amp;shopid=381296735&amp;upstream=pdp">
                                        <button className="button-no-outline">Xem tất cả&nbsp;
                                            <svg enable-background="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0" className="svg-icon icon-arrow-right"><path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></path></svg>
                                        </button>
                                    </a>
                                </div>
                            </div>
                            <div className="header-section__content">

                            </div>
                        </div>
                    </div>
                </div>
                <div className="shop-page__all-products-section">
                    <div className="E7VmWW">
                        <div className="_17MMQ6">
                            <svg viewBox="0 0 12 10" className="svg-icon _2wRTrs icon-all-cate"><g fill-rule="evenodd" stroke="none" stroke-width="1"><g transform="translate(-373 -208)"><g transform="translate(155 191)"><g transform="translate(218 17)"><path d="m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z"></path><path d="m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z"></path><path d="m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z"></path></g></g></g></g></svg>
                            Danh Mục
                        </div>
                        <div>
                            <div className="_1_yYlR _1vetmi">
                                <svg viewBox="0 0 4 7" className="svg-icon _1VXHVI icon-down-arrow-right-filled"><polygon points="4 3.5 0 0 0 7"></polygon></svg>
                                Sản Phẩm
                            </div>
                            {data.list_category_child.map(category=>
                            <div className="_1_yYlR">
                                <svg viewBox="0 0 4 7" className="svg-icon _1VXHVI icon-down-arrow-right-filled"><polygon points="4 3.5 0 0 0 7"></polygon></svg>
                                {category.title}
                            </div>
                            )}
                        </div>
                    </div>
                    <div className="shop-page_product-list">
                        <div className="shop-all-product-view">
                        <Itemsearch
                            searchitem={searchitem}
                            setsearch={setsearch}
                            listitem={listitem}
                            search={search}
                            data={data}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>:''}
    </div>
  )
}
const mapStateToProps = state => ({
    isAuthenticated: state.isAuthenticated,user:state.user
});

export default connect(mapStateToProps)(Shopinfo);