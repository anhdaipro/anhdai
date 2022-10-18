import {timeago} from "../constants"
import axios from 'axios';
import React, {useState, useEffect,useRef} from 'react'
import {useNavigate , Link,useLocation, Navigate,useParams,useSearchParams} from 'react-router-dom';
import Itemsearch from "./Listitem"
import {connect} from "react-redux"
import {shopinfoURL,searchURL,searchshopURL} from "../urls"
import { expiry, headers,showchat, showthreads } from "../actions/auth";
import styled from "styled-components"
import Shopvoycher from "./home/Shopvoucher";
const Flex=styled.div`
display:flex;
`
const Flexcolumn=styled(Flex)`
flex-direction:collumn
`
const Flexcenter=styled(Flex)`
    align-items: center;
    justify-content: center;
`
const ContentInfo=styled.span`
margin: 0.3125rem 0.3125rem 0 0;
text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`
const Boxvoucher=styled(Flex)`
    box-shadow: 0.125rem 0.125rem 0.3125rem rgb(0 0 0 / 7%);
    padding: 0;
    width: 100%;
    height: 6.75rem;
    position:relative;
    border-radius: 0.125rem;
    overflow: visible;
`
const Iteminfo=styled(Flex)`
    flex-direction: column;
    position: relative;
    justify-content:center;
    flex:1;
    max-width: 100%;
    height: 100%;
    padding-right: 0.1875rem;
`

const Styletext=styled.div`
color: #d0011b;
font-size: ${props=>props.size}rem;
line-height: ${props=>props.primary?1.25:1}rem;
font-weight: 500;
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
`
const Percentuse=styled.div`
    width: 100%;
    height: 0.25rem;
    background: rgba(0,0,0,.09);
    border-radius: 0.25rem;
    overflow: hidden;
`
const Boxcontent=styled(Flexcenter)`
    background: #fff4f4;
    border: 1px solid #f8d0d3;
    padding: 0 0 0 0.4375rem;
    flex:1;
    position: relative;
    border-left: 0 solid transparent;
`
const Dot=styled.div`
position:absolute;
height:100%;
width:1px;
right:0;
border-left: 1px dotted #e8e8e8;
`
const Infomore=styled.div`
margin-top:0.25rem
`
const StyleDiv= styled(Flexcenter)`
    border-top: 1px solid #f8d0d3;
    border-bottom: 1px solid #f8d0d3;
    position: relative;
    min-width: 0.3125rem;
    background: linear-gradient(90deg,transparent 0,transparent 0.25rem,#fff4f4 0);
    margin-left: 1px;
    border-radius: 0.1875rem 0 0 0.1875rem;
`
const StyleDiv2= styled.div`
    background: radial-gradient(circle at 0 0.375rem,transparent 0,rgba(0,0,0,.03) 0.1875rem,#f8d0d3 0,#f8d0d3 0.25rem,#fff4f4 0);
    background-size: 0.25rem 0.625rem;
    background-repeat: repeat-y;
    position: absolute;
    top: 0;
    left: 0;
    width: 0.25rem;
    height: 100%;
`
const StyleDiv1= styled.div`
    top: 0;
    left: 0;
    width: 0.3125rem;
    position: absolute;
    height: 100%;`
const ContentWrap=styled.div`
background-color: #fff;
    padding: 1.25rem 1.875rem;
    margin-top:1.5rem
`
const StyleDiv3= styled.div`
    top: 0;
    left: 0;
    background: repeating-linear-gradient(#f8d0d3,#f8d0d3 0.1875rem,transparent 0,transparent 0.625rem);
    background-size: 1px 0.625rem;
    width:1px;
    position: absolute;
    height: 100%;`
const Styletext1=styled.span`
    color: ${props=>props.primary?'#ff424f':'rgba(0,0,0,.54)'};
    font-weight: 400;
    font-size:0.625rem;
`
const listvoucher=[1,2,3,4,5,6,7]
const Shopinfo = ({data,shop_id,showchat,showthreads,setsearchcategory,user}) => {
    const [state, setState] = useState(null)
    const {slug}=useParams()
    let navigate = useNavigate();
    
    const [params, setSearchParams] = useSearchParams();
    const [searchitem,setSearchitem]=useState({page:1,sortby:'pop'})
    const [listitem,setListitem]=useState()
    const [products,setProducts]=useState([])
    const [combos,setCombos]=useState([])
    const [childcategory,setChildcategory]=useState([])
    const search=Object.fromEntries([...params])
    useEffect(()=>{
        (async()=>{
            if(shop_id){
                const [obj1,obj2,obj3] =await axios.all([
                    axios.get(`${shopinfoURL}?choice=gettreecategory&shop_id=${shop_id}`,headers),
                    axios.get(`${shopinfoURL}?choice=deal&shop_id=${shop_id}`,headers),
                    axios.get(`${shopinfoURL}?choice=combo&shop_id=${shop_id}`,headers),
                ])
                setChildcategory(obj1.data)
                setProducts(obj2.data)
                setCombos(obj3.data)
            }
        })()
    },[shop_id])

    useEffect(()=>{
        (async()=>{
            if(shop_id){
            const usesearch=params
            usesearch.set('shop_id',shop_id)
            const res =await axios.get(`${searchshopURL}?${usesearch}`,headers)
            setListitem(res.data)
            }
        })()
    },[params,shop_id])

    const setsearchitem=(items)=>{
        setSearchitem(items) 
        setSearchParams(items)
    }
    const setshowthread=(e)=>{
        e.preventDefault()
        let data={member:[user.id,state.data.user_id],thread:null,send_to:state.data.user_id}
        showchat(data)
        showthreads()
    }
    
    const setsearch=(name,value)=>{
        delete searchitem.order
        const searchitems={...searchitem,[name]:value}
        setsearchitem(searchitems)
    }

    const setfollow=e=>{
        e.preventDefault();
        if(localStorage.token!='null' && expiry>0){
            const form={shop_id:data.id}
            axios.post(shopinfoURL,JSON.stringify(form),headers)
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
        {data?
        <div className="">
            <div className="shop-page__info">
                <div className="section-seller-overview-horizontal containers">
                    <div className="section-seller-overview-horizontal__leading">
                        <div className="section-seller-overview-horizontal__leading-background" style={{backgroundImage: `url(${data.avatar})`}}></div>
                        <div className="section-seller-overview-horizontal__leading-background-mask"></div>
                        <div className="section-seller-overview-horizontal__leading-content">
                            <div className="section-seller-overview-horizontal__seller-portrait _3G9pjm">
                                <Link className="section-seller-overview-horizontal__seller-portrait-link" to={data.url}>
                                    <div className="avatar _3aM_PS">
                                        <div className="avatar__placeholder">
                                            <svg enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className="svg-icon icon-headshot"><g><circle cx="7.5" cy="4.5" fill="none" r="3.8" stroke-miterlimit="10"></circle><path d="m1.5 14.2c0-3.3 2.7-6 6-6s6 2.7 6 6" fill="none" strokeLinecap="round" stroke-miterlimit="10"></path></g></svg>
                                        </div>
                                        <img className="avatar__img" src="https://cf.shopee.vn/file/693a071a73b8f22a77bc5f0e54776729_tn"/>
                                    </div>
                                    <div className="section-seller-overview-horizontal__preferred-badge-wrapper">
                                        <div className="_2vYHuP _3KOA3x _1Syx5m">Yêu thích</div>
                                    </div>
                                </Link>
                                <div className="section-seller-overview-horizontal__portrait-info">
                                    <h1 className="section-seller-overview-horizontal__portrait-name">{data.name}</h1>
                                    <div className="section-seller-overview-horizontal__portrait-status">
                                        <div className="section-seller-overview-horizontal__active-time">Online 10 phút trước</div>
                                    </div>
                                </div>
                            </div>
                            <div className="section-seller-overview-horizontal__buttons">
                                <a className={`section-seller-overview-horizontal__button ${data.follow?'section-seller-overview-horizontal__button--following':''}`}>
                                    <button onClick={(e)=>setfollow(e)} className="button-outline button-outline--complement button-outline--fill">
                                        {data.follow?"Đang theo":<>
                                        <span className="section-seller-overview-horizontal__icon">
                                            <svg enableBackground="new 0 0 10 10" viewBox="0 0 10 10" x="0" y="0" className="svg-icon icon-plus-sign"><polygon points="10 4.5 5.5 4.5 5.5 0 4.5 0 4.5 4.5 0 4.5 0 5.5 4.5 5.5 4.5 10 5.5 10 5.5 5.5 10 5.5"></polygon></svg>
                                        </span>theo dõi</>}
                                    </button>
                                </a>
                                {user && user.id!=data.user_id?
                                <a argettype="chatButton" className="section-seller-overview-horizontal__button">
                                    <button onClick={(e)=>setshowthread(e)} className="button-outline button-outline--complement button-outline--fill">
                                        <span className="section-seller-overview-horizontal__icon">
                                            <svg viewBox="0 0 16 16" className="svg-icon"><g fillRule="evenodd"><path d="M15 4a1 1 0 01.993.883L16 5v9.932a.5.5 0 01-.82.385l-2.061-1.718-8.199.001a1 1 0 01-.98-.8l-.016-.117-.108-1.284 8.058.001a2 2 0 001.976-1.692l.018-.155L14.293 4H15zm-2.48-4a1 1 0 011 1l-.003.077-.646 8.4a1 1 0 01-.997.923l-8.994-.001-2.06 1.718a.5.5 0 01-.233.108l-.087.007a.5.5 0 01-.492-.41L0 11.732V1a1 1 0 011-1h11.52zM3.646 4.246a.5.5 0 000 .708c.305.304.694.526 1.146.682A4.936 4.936 0 006.4 5.9c.464 0 1.02-.062 1.608-.264.452-.156.841-.378 1.146-.682a.5.5 0 10-.708-.708c-.185.186-.445.335-.764.444a4.004 4.004 0 01-2.564 0c-.319-.11-.579-.258-.764-.444a.5.5 0 00-.708 0z"></path></g></svg>
                                            </span>chat
                                    </button>
                                </a>:''}
                                </div>
                            </div>
                        </div>
                        <div className="section-seller-overview-horizontal__seller-info-list">
                            <div className="section-seller-overview__item section-seller-overview__item--clickable">
                                <div className="section-seller-overview__item-icon-wrapper">
                                    <svg enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" strokeWidth="0" className="svg-icon"><path d="m13 1.9c-.2-.5-.8-1-1.4-1h-8.4c-.6.1-1.2.5-1.4 1l-1.4 4.3c0 .8.3 1.6.9 2.1v4.8c0 .6.5 1 1.1 1h10.2c.6 0 1.1-.5 1.1-1v-4.6c.6-.4.9-1.2.9-2.3zm-11.4 3.4 1-3c .1-.2.4-.4.6-.4h8.3c.3 0 .5.2.6.4l1 3zm .6 3.5h.4c.7 0 1.4-.3 1.8-.8.4.5.9.8 1.5.8.7 0 1.3-.5 1.5-.8.2.3.8.8 1.5.8.6 0 1.1-.3 1.5-.8.4.5 1.1.8 1.7.8h.4v3.9c0 .1 0 .2-.1.3s-.2.1-.3.1h-9.5c-.1 0-.2 0-.3-.1s-.1-.2-.1-.3zm8.8-1.7h-1v .1s0 .3-.2.6c-.2.1-.5.2-.9.2-.3 0-.6-.1-.8-.3-.2-.3-.2-.6-.2-.6v-.1h-1v .1s0 .3-.2.5c-.2.3-.5.4-.8.4-1 0-1-.8-1-.8h-1c0 .8-.7.8-1.3.8s-1.1-1-1.2-1.7h12.1c0 .2-.1.9-.5 1.4-.2.2-.5.3-.8.3-1.2 0-1.2-.8-1.2-.9z"></path></svg>
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
                                    <svg enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className="svg-icon"><g><circle cx="7" cy="4.5" fill="none" r="3.8" stroke-miterlimit="10"></circle><line fill="none" strokeLinecap="round" stroke-miterlimit="10" x1="12" x2="12" y1="11.2" y2="14.2"></line><line fill="none" strokeLinecap="round" stroke-miterlimit="10" x1="10.5" x2="13.5" y1="12.8" y2="12.8"></line><path d="m1.5 13.8c0-3 2.5-5.5 5.5-5.5 1.5 0 2.9.6 3.9 1.6" fill="none" strokeLinecap="round" stroke-miterlimit="10"></path></g></svg>
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
                                    <svg enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className="svg-icon"><g><polygon fill="none" points="14 10.8 7 10.8 3 13.8 3 10.8 1 10.8 1 1.2 14 1.2" stroke-linejoin="round" stroke-miterlimit="10"></polygon><circle cx="4" cy="5.8" r="1" stroke="none"></circle><circle cx="7.5" cy="5.8" r="1" stroke="none"></circle><circle cx="11" cy="5.8" r="1" stroke="none"></circle></g></svg>
                                </div>
                            <div className="section-seller-overview__item-text">
                                <div className="section-seller-overview__item-text-name">Tỉ lệ phản hồi Chat:&nbsp;</div>
                                <div className="section-seller-overview__item-text-value">99% (trong vài giờ)
                                    <div className="section-seller-overview__inline-icon section-seller-overview__inline-icon--help">
                                        <svg width="10" height="10"><g fill="currentColor" fillRule="nonzero" color="currentColor" strokeWidth="0"><path d="M5 10A5 5 0 1 1 5 0a5 5 0 0 1 0 10zM5 .675a4.325 4.325 0 1 0 0 8.65 4.325 4.325 0 0 0 0-8.65z"></path><path d="M6.235 5.073c.334-.335.519-.79.514-1.264a1.715 1.715 0 0 0-.14-.684 1.814 1.814 0 0 0-.933-.951A1.623 1.623 0 0 0 5 2.03a1.66 1.66 0 0 0-.676.14 1.772 1.772 0 0 0-.934.948c-.093.219-.14.454-.138.691a.381.381 0 0 0 .106.276c.07.073.168.113.27.11a.37.37 0 0 0 .348-.235c.02-.047.031-.099.03-.15a1.006 1.006 0 0 1 .607-.933.954.954 0 0 1 .772.002 1.032 1.032 0 0 1 .61.93c.003.267-.1.525-.288.716l-.567.537c-.343.35-.514.746-.514 1.187a.37.37 0 0 0 .379.382c.1.002.195-.037.265-.108a.375.375 0 0 0 .106-.274c0-.232.097-.446.29-.642l.568-.534zM5 6.927a.491.491 0 0 0-.363.152.53.53 0 0 0 0 .74.508.508 0 0 0 .726 0 .53.53 0 0 0 0-.74A.491.491 0 0 0 5 6.927z"></path></g></svg>
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
                                <svg width="13" height="14"><g fill="currentColor" fillRule="nonzero" strokeWidth="0.4"><path d="M9.49.903h.453c.498 0 .903.404.903.903v4.993a.452.452 0 1 0 .904 0V1.806C11.75.808 10.94 0 9.944 0H9.49a.452.452 0 1 0 0 .903zM5.879 12.645H1.813a.903.903 0 0 1-.903-.902V1.806c0-.499.405-.903.903-.903h.452a.451.451 0 0 0 0-.903h-.452C.816 0 .007.808.007 1.806v9.936c0 .998.809 1.806 1.806 1.806h4.065a.452.452 0 0 0 0-.903z"></path><path d="M2.265 0H9.49a.451.451 0 1 1 0 .903H2.265a.452.452 0 0 1 0-.903zm.904 3.613H9.04a.452.452 0 1 1 0 .903H3.169a.452.452 0 1 1 0-.903zm0 2.71h3.613a.452.452 0 1 1 0 .904H3.169a.452.452 0 0 1 0-.904zm0 2.709h1.806a.452.452 0 1 1 0 .905H3.169a.452.452 0 0 1 0-.905zm6.322 4.065a2.258 2.258 0 1 0 0-4.515 2.258 2.258 0 0 0 0 4.515zm0 .903a3.161 3.161 0 1 1 0-6.323 3.161 3.161 0 0 1 0 6.323z"></path><path d="M7.575 12.117l3.193-3.194a.451.451 0 1 1 .638.639l-3.192 3.192a.451.451 0 0 1-.639-.637z"></path></g></svg>
                            </div>
                            <div className="section-seller-overview__item-text">
                                <div className="section-seller-overview__item-text-name">Tỉ lệ Shop hủy đơn:&nbsp;</div>
                                <div className="section-seller-overview__item-text-value">1%
                                    <div className="section-seller-overview__inline-icon section-seller-overview__inline-icon--help">
                                        <svg width="10" height="10"><g fill="currentColor" fillRule="nonzero" color="currentColor" strokeWidth="0"><path d="M5 10A5 5 0 1 1 5 0a5 5 0 0 1 0 10zM5 .675a4.325 4.325 0 1 0 0 8.65 4.325 4.325 0 0 0 0-8.65z"></path><path d="M6.235 5.073c.334-.335.519-.79.514-1.264a1.715 1.715 0 0 0-.14-.684 1.814 1.814 0 0 0-.933-.951A1.623 1.623 0 0 0 5 2.03a1.66 1.66 0 0 0-.676.14 1.772 1.772 0 0 0-.934.948c-.093.219-.14.454-.138.691a.381.381 0 0 0 .106.276c.07.073.168.113.27.11a.37.37 0 0 0 .348-.235c.02-.047.031-.099.03-.15a1.006 1.006 0 0 1 .607-.933.954.954 0 0 1 .772.002 1.032 1.032 0 0 1 .61.93c.003.267-.1.525-.288.716l-.567.537c-.343.35-.514.746-.514 1.187a.37.37 0 0 0 .379.382c.1.002.195-.037.265-.108a.375.375 0 0 0 .106-.274c0-.232.097-.446.29-.642l.568-.534zM5 6.927a.491.491 0 0 0-.363.152.53.53 0 0 0 0 .74.508.508 0 0 0 .726 0 .53.53 0 0 0 0-.74A.491.491 0 0 0 5 6.927z"></path></g></svg>
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
                                <svg enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className="svg-icon"><g><circle cx="5.5" cy="5" fill="none" r="4" stroke-miterlimit="10"></circle><path d="m8.4 7.5c.7 0 1.1.7 1.1 1.6v4.9h-8v-4.9c0-.9.4-1.6 1.1-1.6" fill="none" stroke-linejoin="round" stroke-miterlimit="10"></path><path d="m12.6 6.9c.7 0 .9.6.9 1.2v5.7h-2" fill="none" strokeLinecap="round" stroke-linejoin="round" stroke-miterlimit="10"></path><path d="m9.5 1.2c1.9 0 3.5 1.6 3.5 3.5 0 1.4-.9 2.7-2.1 3.2" fill="none" strokeLinecap="round" stroke-miterlimit="10"></path></g></svg>
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
                                <svg enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className="svg-icon icon-rating"><polygon fill="none" points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4" strokeLinecap="round" stroke-linejoin="round" stroke-miterlimit="10"></polygon></svg>
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
                                <svg enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className="svg-icon"><g><circle cx="6.8" cy="4.2" fill="none" r="3.8" stroke-miterlimit="10"></circle><polyline fill="none" points="9.2 12.5 11.2 14.5 14.2 11" strokeLinecap="round" stroke-linejoin="round" stroke-miterlimit="10"></polyline><path d="m .8 14c0-3.3 2.7-6 6-6 2.1 0 3.9 1 5 2.6" fill="none" strokeLinecap="round" stroke-miterlimit="10"></path></g></svg>
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
                            {childcategory.map(category=>
                                <Link onClick={()=>setsearchcategory('categoryID',category.id)} className="navbar-with-more-menu__item" to={`/${slug}?categoryID=${category.id}#productlist`}>
                                    <span>{category.title}</span>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="containers">
                <ContentWrap className="shop-page__vouchers">
                    <h3 className="shop-page__section-title">Mã giảm giá của Shop</h3>
                    
                    <Shopvoycher
                    categories={listvoucher}
                    num_display={3.5}
                    width={1200-30}
                    />
                </ContentWrap>
                <div className="shop-decoration">
                    <div className="_1Z4Xy3">
                        <div className="shop-collection-view">
                            <div className="header-section header-section--simple">
                                <div className="header-section__header">
                                    <div className="header-section__header__title">Gợi ý cho bạn</div>
                                    <a className="header-section__header-link" href="/shop_recommended_for_you?catid=100011&amp;itemid=8543592415&amp;shopid=381296735&amp;upstream=pdp">
                                        <button className="button-no-outline">Xem tất cả&nbsp;
                                            <svg enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0" className="svg-icon icon-arrow-right"><path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></path></svg>
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
                            <svg viewBox="0 0 12 10" className="svg-icon _2wRTrs icon-all-cate"><g fillRule="evenodd" stroke="none" strokeWidth="1"><g transform="translate(-373 -208)"><g transform="translate(155 191)"><g transform="translate(218 17)"><path d="m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z"></path><path d="m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z"></path><path d="m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z"></path></g></g></g></g></svg>
                            Danh Mục
                        </div>
                        <div>
                            <div className="_1_yYlR _1vetmi">
                                <svg viewBox="0 0 4 7" className="svg-icon _1VXHVI icon-down-arrow-right-filled"><polygon points="4 3.5 0 0 0 7"></polygon></svg>
                                Sản Phẩm
                            </div>
                            {childcategory.map(category=>
                            <div className="_1_yYlR">
                                <svg viewBox="0 0 4 7" className="svg-icon _1VXHVI icon-down-arrow-right-filled"><polygon points="4 3.5 0 0 0 7"></polygon></svg>
                                {category.title}
                            </div>
                            )}
                        </div>
                    </div>
                    <div className="shop-page_product-list">
                        {listitem?
                            <div className="shop-all-product-view">
                        
                            <Itemsearch
                                searchitem={searchitem}
                                setsearchitem={(data)=>setsearchitem(data)}
                                setsearch={(name,value)=>setsearch(name,value)}
                                listitem={listitem.list_item_page}
                                search={search}
                                data={listitem}
                                />
                            </div>:''}
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

export default connect(mapStateToProps,{showchat,showthreads})(Shopinfo);