import Sidebamenu from "./Sidebar-menu"
import axios from 'axios';
import Navbar from "./Navbar"
import { useParams,Link } from "react-router-dom";
import React, {useState,useEffect,useCallback,useRef} from 'react'
import ReactDOM, { render } from 'react-dom'
import {itemvariation,pagesize, rating, timepromotion} from "../constants"
import Pagination from "../hocs/Pagination"
import {shopratingURL,} from "../urls"
import { headers} from '../actions/auth';
const Ratingshop=()=>{
    const [state,setState]=useState({show:false,page_input:1,text:null,page_count:1})
    const [list_review,setListreview]=useState([])
    const [list_reply,setListreply]=useState([])
    const [loading,setLoading]=useState(false)
    const [currentPage, setCurrentPage] = useState({page:1,pagesize:5});
    useEffect(() => {
        const getJournal = async () => {
            await axios(shopratingURL,headers)
           // <-- passed to API URL
            .then(res=>{
                let data=res.data
                setLoading(true)
                const list_reviews=res.data.reviews.map(item=>{
                    return({...item,show_reply:false})
                })
                setState({...state,page_count:data.page_count})
                setListreview(list_reviews)
            })
        }
        getJournal();
    }, []);
    
    
    const showreply=(e,review)=>{
        const list_reviews=list_review.map(item=>{
            if(item.id==review.id){
            return({...item,show_reply:!item.show_reply})
            }
            return({...item,show_reply:false})
        })
        setListreview(list_reviews)
    }
    const setpagechoice=(page,name_choice,value_choice)=>{
        if(page!=value_choice){
            const page_chocie=page<=1?1:page>=state.page_count?state.page_count:page
            let url= new URL(shopratingURL)
            let search_params=url.searchParams
            search_params.set([name_choice],page_chocie)
            setCurrentPage({...currentPage,[name_choice]:page_chocie})
            url.search = search_params.toString();
            setLoading(false)
            setState({...state,show:false})
            let new_url = url.toString();
            axios.get(new_url,headers)
            .then(res=>{ 
                let data=res.data
                setLoading(true)
                const list_reviews=data.reviews.map(item=>{
                    return({...item,show_reply:false})
                })
                setListreview(list_reviews)
                
            })
        }
    }
   const review_choice=list_review.find(item=>item.show_reply)
   console.log(review_choice)
   const setopenreply=(e)=>{
        const list_reviews= list_review.map(item=>{
            return({...item,show_reply:false})
        })
        setListreview(list_reviews)
   }
   const setsubmitreply=()=>{
       let form= new FormData()
       form.append('id',review_choice.id)
       form.append('text',state.text)
       axios.post(shopratingURL,form,headers)
       .then(res=>{
        const list_reviews= list_review.map(item=>{
            if(review_choice.id==item.id){
                return({...item,show_reply:false,get_reply:{text:res.data.text,created:new Date()}})
            }
            return({...item})
        })
        setListreview(list_reviews)
        setState({...state,text:null})
       })
   }
    return(
        <>
        <div id="app">
            <div className="app-content">
                <Navbar/>
                <div className="page-content">
                    <Sidebamenu/>
                    <div className="page-container"> 
                        <div data-v-e9627c50="" className="seller-shop-rating">
                            
                            <div data-v-f68eb30a="" data-v-e9627c50="">
                                <div data-v-f68eb30a="" className="rating">
                                    <div data-v-3f40c0f8="" data-v-f68eb30a="" className="header">
                                        <div data-v-3f40c0f8="" className="caption">
                                            <div data-v-3f40c0f8="" className="title">Đánh Giá Shop</div> 
                                            <div data-v-3f40c0f8="" className="subtitle">Xem đánh giá Shop của bạn</div>
                                        </div> 
                                        <div data-v-3f40c0f8="" className="buttons">
                                            <div data-v-f68eb30a="" data-v-3f40c0f8="" className="performance">
                                                <span data-v-f68eb30a="" data-v-3f40c0f8="" className="score">0.0</span> 
                                                <span data-v-f68eb30a="" data-v-3f40c0f8="" className="total">&nbsp;/&nbsp;5</span>
                                            </div>
                                        </div>
                                    </div> 
                                    <div data-v-e373b4b6="" data-v-f68eb30a="" className="rating-filter-wrapper">
                                        <form data-v-e373b4b6="" autocomplete="off" className="form--label-right">
                                            <div data-v-f68eb30a="" data-v-3f40c0f8="" className="rating-filter">
                                                <div data-v-e373b4b6="" className="form-item">
                                                    <label className="form-item__label"> Tên sản phẩm:</label> 
                                                    <div className="form-item__control">
                                                        <div className="form-item__content">
                                                            <div data-v-e373b4b6="" className="input">
                                                                <div className="input__inner input__inner--normal"> 
                                                                    <input type="text" placeholder="Nhập tên sản phẩm" resize="vertical" rows="2" minrows="2" restrictiontype="input" max="Infinity" min="-Infinity" className="input__input"/> 
                                                                </div>
                                                            </div>
                                                        </div>  
                                                    </div>
                                                </div>
                                                <div data-v-e373b4b6="" className="model-name form-item">
                                                    <label className="form-item__label"> Phân loại hàng:</label> 
                                                    <div className="form-item__control">
                                                        <div className="form-item__content">
                                                            <div data-v-e373b4b6="" className="input">
                                                                <div className="input__inner input__inner--normal"> 
                                                                    <input type="text" placeholder="Nhập tên Phân loại hàng" resize="vertical" rows="2" minrows="2" restrictiontype="input" max="Infinity" min="-Infinity" className="input__input"/> 
                                                                </div>
                                                            </div>
                                                        </div>  
                                                    </div>
                                                </div>
                                                <div data-v-e373b4b6="" className="form-item">
                                                    <label className="form-item__label"> Người mua:</label> 
                                                    <div className="form-item__control">
                                                        <div className="form-item__content">
                                                            <div data-v-e373b4b6="" className="input">
                                                                <div className="input__inner input__inner--normal"> 
                                                                    <input type="text" placeholder="Nhập tên đăng nhập" resize="vertical" rows="2" minrows="2" restrictiontype="input" max="Infinity" min="-Infinity" className="input__input"/> 
                                                                </div>
                                                            </div>
                                                        </div>  
                                                    </div>
                                                </div>
                                                <div data-v-e373b4b6="" className="form-item">
                                                    <label className="form-item__label"> Thời gian Đánh giá:</label>
                                                    <div className="form-item__control">
                                                        <div className="form-item__content">
                                                            <div data-v-e373b4b6="" className="date-picker">
                                                                <div className="date-picker__input">
                                                                    <div tabindex="0" className="selector clearable selector--normal">
                                                                        <div className="selector__prefix">
                                                                            <i className="selector__prefix-icon icon">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M11.5156954,1 C11.7918378,1 12.0156954,1.22385763 12.0156954,1.5 L12.015,2 L14,2 C14.5522847,2 15,2.44771525 15,3 L15,14 C15,14.5522847 14.5522847,15 14,15 L2,15 C1.44771525,15 1,14.5522847 1,14 L1,3 C1,2.44771525 1.44771525,2 2,2 L3.991,2 L3.99143991,1.5 C3.99143991,1.22385763 4.21529754,1 4.49143991,1 C4.76758229,1 4.99143991,1.22385763 4.99143991,1.5 L4.991,2 L11.015,2 L11.0156954,1.5 C11.0156954,1.22385763 11.239553,1 11.5156954,1 Z M14,6 L2,6 L2,14 L14,14 L14,6 Z M5.5,11 C5.77614237,11 6,11.2238576 6,11.5 C6,11.7761424 5.77614237,12 5.5,12 L4.5,12 C4.22385763,12 4,11.7761424 4,11.5 C4,11.2238576 4.22385763,11 4.5,11 L5.5,11 Z M8.5,11 C8.77614237,11 9,11.2238576 9,11.5 C9,11.7761424 8.77614237,12 8.5,12 L7.5,12 C7.22385763,12 7,11.7761424 7,11.5 C7,11.2238576 7.22385763,11 7.5,11 L8.5,11 Z M11.5,11 C11.7761424,11 12,11.2238576 12,11.5 C12,11.7761424 11.7761424,12 11.5,12 L10.5,12 C10.2238576,12 10,11.7761424 10,11.5 C10,11.2238576 10.2238576,11 10.5,11 L11.5,11 Z M5.5,8 C5.77614237,8 6,8.22385763 6,8.5 C6,8.77614237 5.77614237,9 5.5,9 L4.5,9 C4.22385763,9 4,8.77614237 4,8.5 C4,8.22385763 4.22385763,8 4.5,8 L5.5,8 Z M8.5,8 C8.77614237,8 9,8.22385763 9,8.5 C9,8.77614237 8.77614237,9 8.5,9 L7.5,9 C7.22385763,9 7,8.77614237 7,8.5 C7,8.22385763 7.22385763,8 7.5,8 L8.5,8 Z M11.5,8 C11.7761424,8 12,8.22385763 12,8.5 C12,8.77614237 11.7761424,9 11.5,9 L10.5,9 C10.2238576,9 10,8.77614237 10,8.5 C10,8.22385763 10.2238576,8 10.5,8 L11.5,8 Z M3.991,3 L2,3 L2,5 L14,5 L14,3 L12.015,3 L12.0156954,3.5 C12.0156954,3.77614237 11.7918378,4 11.5156954,4 C11.239553,4 11.0156954,3.77614237 11.0156954,3.5 L11.015,3 L4.991,3 L4.99143991,3.5 C4.99143991,3.77614237 4.76758229,4 4.49143991,4 C4.21529754,4 3.99143991,3.77614237 3.99143991,3.5 L3.991,3 Z"></path></svg></i> </div> <div className="selector__inner placeholder line-clamp--1">Chọn thời gian</div> <div className="selector__suffix"><i className="selector__clear-btn icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8,2 C11.3137085,2 14,4.6862915 14,8 C14,11.3137085 11.3137085,14 8,14 C4.6862915,14 2,11.3137085 2,8 C2,4.6862915 4.6862915,2 8,2 Z M10.5924919,5.27303573 C10.4094355,5.1521972 10.1606887,5.17236516 9.99956233,5.33352414 L9.99956233,5.33352414 L8.00023568,7.33325477 L6.00047136,5.33349045 C5.81628967,5.14930876 5.51767215,5.14930876 5.33349045,5.33349045 L5.33349045,5.33349045 L5.27301564,5.40754038 C5.1522078,5.59059052 5.17239885,5.83931011 5.33355782,6.00040399 L5.33355782,6.00040399 L7.33372614,7.99976432 L5.33352414,9.99956232 L5.33352414,9.99956232 L5.27306194,10.0735738 C5.15220491,10.2566181 5.17234775,10.5053668 5.33349045,10.6665095 L5.33349045,10.6665095 L5.40750807,10.7269643 C5.5905645,10.8478028 5.83931125,10.8276348 6.00043768,10.6664759 L6.00043768,10.6664759 L8.00023568,8.66627386 L9.99959601,10.6664422 L9.99959601,10.6664422 L10.0736337,10.726932 C10.2566595,10.8477768 10.5053831,10.827636 10.6665095,10.6665095 C10.8506912,10.4823279 10.8506912,10.1837103 10.6665095,9.99952864 L10.6665095,9.99952864 L8.66674523,7.99976432 L10.6664759,6.00043767 L10.6664759,6.00043767 L10.7269381,5.92642616 C10.8477951,5.74338194 10.8276522,5.49463316 10.6665095,5.33349045 L10.6665095,5.33349045 Z"></path></svg>
                                                                            </i> 
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="popper date-picker__picker" style={{display:'none'}}> 
                                                                    
                                                                </div>
                                                            </div>
                                                        </div>  
                                                    </div>
                                                </div>
                                            </div>
                                            <div data-v-e373b4b6="" className="rating-action">
                                                <div data-v-e373b4b6="" className="rating-action-form form-item">
                                                    <label className="form-item__label empty"> </label> 
                                                    <div className="form-item__control">
                                                        <div className="form-item__content">
                                                            <button data-v-e373b4b6="" type="button" className="button button--primary button--normal">
                                                                <span>Tìm</span>
                                                            </button> 
                                                            <button data-v-e373b4b6="" type="button" className="mr12 button button--normal">
                                                                <span>Nhập Lại</span>
                                                            </button>
                                                        </div>  
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div> 
                                    {loading?
                                    <div data-v-f68eb30a="" className="content">
                                        <div data-v-f68eb30a="" className="tab-wrapper">
                                            <div data-v-f68eb30a="" className="tabs tabs-line tabs-normal tabs-top">
                                                <div className="tabs__nav">  
                                                    <div className="tabs__nav-warp">
                                                        <div className="tabs__nav-tabs" style={{transform: 'translateX(0px)'}}>
                                                            <div className="tabs__nav-tab active" style={{whiteSpace: 'normal'}}>Tất cả </div>
                                                            <div className="tabs__nav-tab" style={{whiteSpace: 'normal'}}>Chưa trả lời </div>
                                                            <div className="tabs__nav-tab" style={{whiteSpace: 'normal'}}>Đã trả lời </div>
                                                        </div> 
                                                        <div className="tabs__ink-bar" style={{width: '72px', transform: 'translateX(0px)'}}></div>
                                                    </div> 
                                                </div> 
                                                <div className="tabs__content">
                                                    <div data-v-f68eb30a="" className="tabs-tabpane"></div>
                                                    <div data-v-f68eb30a="" className="tabs-tabpane" style={{display: 'none'}}></div>
                                                    <div data-v-f68eb30a="" className="tabs-tabpane" style={{display: 'none'}}></div>
                                                </div>
                                            </div> 
                                            <div data-v-f68eb30a="" className="reply-tooltip" style={{display: 'none'}}>
                                                <div data-v-f68eb30a="" className="reply-tooltip-content">Nhấn vào để xem nội dung trả lời đánh giá.</div>
                                            </div>
                                        </div> 
                                        <div data-v-f68eb30a="" className="tabs tabs-module tabs-normal tabs-top">
                                            <div className="tabs__nav">  
                                                <div className="tabs__nav-warp">
                                                    <div className="tabs__nav-tabs" style={{transform: 'translateX(0px)'}}>
                                                        <div className="tabs__nav-tab active">Tất cả </div>
                                                        <div className="tabs__nav-tab">
                                                            <span data-v-f68eb30a="" className="title">5 Sao</span>  
                                                        </div>
                                                        <div className="tabs__nav-tab">
                                                            <span data-v-f68eb30a="" className="title">4 Sao</span>  
                                                        </div>
                                                        <div className="tabs__nav-tab">
                                                            <span data-v-f68eb30a="" className="title">3 Sao</span>  
                                                        </div>
                                                        <div className="tabs__nav-tab">
                                                            <span data-v-f68eb30a="" className="title">2 Sao</span>  
                                                        </div>
                                                        <div className="tabs__nav-tab">
                                                            <span data-v-f68eb30a="" className="title">1 Sao</span>  
                                                        </div>
                                                    </div> 
                                                </div> 
                                            </div> 
                                            <div className="tabs__content">
                                                <div data-v-f68eb30a="" className="tabs-tabpane" ></div> 
                                                <div data-v-f68eb30a="" className="tabs-tabpane" style={{display: 'none'}}></div>
                                                <div data-v-f68eb30a="" className="tabs-tabpane" style={{display: 'none'}}></div>
                                                <div data-v-f68eb30a="" className="tabs-tabpane" style={{display: 'none'}}></div>
                                                <div data-v-f68eb30a="" className="tabs-tabpane" style={{display: 'none'}}></div>
                                                <div data-v-f68eb30a="" className="tabs-tabpane" style={{display: 'none'}}></div>
                                            </div>
                                        </div> 
                                        <div data-v-f68eb30a="" className="table-header table">
                                            <div data-v-f68eb30a="" className="column information">Thông tin Sản phẩm</div> 
                                            <div data-v-f68eb30a="" className="column evaluation-content">Đánh giá của Người mua</div> 
                                            <div data-v-f68eb30a="" className="column reply">Trả lời đánh giá của bạn</div>
                                        </div> 
                                        <div data-v-f68eb30a="" style={{position: 'relative'}}>
                                            {list_review.length==0?
                                                <div data-v-1c375e60="" data-v-f68eb30a="" className="no-result">
                                                    <div data-v-1c375e60="" className="default-page">
                                                        <i className="default-page__icon icon normal">
                                                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 93 87"><defs><rect id="defaultpage_nodata-a" width="45" height="33" x="44" y="32" rx="2"></rect><mask id="defaultpage_nodata-b" width="45" height="33" x="0" y="0" fill="#fff" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox"><use></use></mask></defs><g fill="none" fill-rule="evenodd" transform="translate(-3 -4)"><rect width="96" height="96"></rect><ellipse cx="48" cy="85" fill="#F2F2F2" rx="45" ry="6"></ellipse><path fill="#FFF" stroke="#D8D8D8" d="M79.5,17.4859192 L66.6370555,5.5 L17,5.5 C16.1715729,5.5 15.5,6.17157288 15.5,7 L15.5,83 C15.5,83.8284271 16.1715729,84.5 17,84.5 L78,84.5 C78.8284271,84.5 79.5,83.8284271 79.5,83 L79.5,17.4859192 Z"></path><path fill="#DBDBDB" fill-rule="nonzero" d="M66,6 L67.1293476,6 L67.1293476,16.4294956 C67.1293476,17.1939227 67.7192448,17.8136134 68.4469198,17.8136134 L79,17.8136134 L79,19 L68.4469198,19 C67.0955233,19 66,17.849146 66,16.4294956 L66,6 Z"></path><g fill="#D8D8D8" transform="translate(83 4)"><circle cx="7.8" cy="10.28" r="3" opacity=".5"></circle><circle cx="2" cy="3" r="2" opacity=".3"></circle><path fill-rule="nonzero" d="M10.5,1 C9.67157288,1 9,1.67157288 9,2.5 C9,3.32842712 9.67157288,4 10.5,4 C11.3284271,4 12,3.32842712 12,2.5 C12,1.67157288 11.3284271,1 10.5,1 Z M10.5,7.10542736e-15 C11.8807119,7.10542736e-15 13,1.11928813 13,2.5 C13,3.88071187 11.8807119,5 10.5,5 C9.11928813,5 8,3.88071187 8,2.5 C8,1.11928813 9.11928813,7.10542736e-15 10.5,7.10542736e-15 Z" opacity=".3"></path></g><path fill="#FAFAFA" d="M67.1963269,6.66851903 L67.1963269,16.32 C67.2587277,17.3157422 67.675592,17.8136134 68.4469198,17.8136134 C69.2182476,17.8136134 72.735941,17.8136134 79,17.8136134 L67.1963269,6.66851903 Z"></path><use fill="#FFF" stroke="#D8D8D8" stroke-dasharray="3" stroke-width="2" mask="url(#defaultpage_nodata-b)" xlinkhref="#defaultpage_nodata-a"></use><rect width="1" height="12" x="54" y="46" fill="#D8D8D8" rx=".5"></rect><rect width="1" height="17" x="62" y="40" fill="#D8D8D8" rx=".5"></rect><rect width="1" height="10" x="70" y="48" fill="#D8D8D8" rx=".5"></rect><rect width="1" height="14" x="78" y="43" fill="#D8D8D8" rx=".5"></rect></g></svg>
                                                        </i> 
                                                        <div className="default-page__content">Chưa có đánh giá nào dành cho Shop của bạn</div>
                                                    </div>
                                                </div>:
                                                <div className="body-review">
                                                    <div className="list-review">
                                                        {list_review.map(review=>
                                                        <div key={review.id} className="review-item">
                                                            <div className="review-info">
                                                                <div className="item-space">
                                                                    <div className="item-center">
                                                                        <div>Người Mua:</div>
                                                                        <div className="review-user-image"><img src={review.avatar}/></div>
                                                                        <div className="review-username">{review.user}</div>
                                                                    </div>
                                                                    <div className="review-prrder_id">{review.ref_code}</div>
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="review-detail">
                                                                <div className="review-detail-item">
                                                                    <div className="item-center">
                                                                        <div className="review-detail-item-image">
                                                                            <img src={review.image} />
                                                                        </div>
                                                                        <div className="review-detail-item-info">
                                                                            <div className="review-detail-item-info-name">
                                                                                {review.name}
                                                                            </div>
                                                                            <div className="review-detail-item-info-variation">
                                                                                {itemvariation(review)}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className='vertical-line'></div>
                                                                <div className="review-detail-rating">
                                                                    <div className="review-detail-rating-star">
                                                                        {rating(6,review)}
                                                                    </div>
                                                                    <div className="review-detail-rating-info">
                                                                        {review.info_more}
                                                                    </div>
                                                                    <div className="review-detail-time">
                                                                        {timepromotion(review.created)}
                                                                    </div>
                                                                </div>
                                                                <div className='vertical-line'></div>
                                                                {Object.keys(review.get_reply).length>0?
                                                                <div className="review-detail-reply">
                                                                    <div className="review-detail-text">
                                                                        {review.get_reply.text}
                                                                    </div>
                                                                    <div className="review-detail-reply-time">
                                                                        {timepromotion(review.get_reply.created)}
                                                                    </div>
                                                                </div>:<div className="review-detail-reply">
                                                                    <div className="review-detail-reply-request">
                                                                        <button onClick={(e)=>showreply(e,review)} className="btn-ligth btn">Trả lời</button>
                                                                    </div>
                                                                </div>}
                                                            </div>
                                                        </div>)}
                                                    </div>
                                                </div>}
                                            </div>
                                        </div>:''}
                                    </div> 
                                </div>
                                {loading?
                                <div>
                                    <div className="with-assist">
                                        <div className="item-center page-pagination">
                                            <Pagination
                                                classActive={`buttons active`}
                                                classNormal={`buttons`}
                                                classIcon={`buttons`}
                                                currentPage={currentPage.page}
                                                totalCount={state.page_count}
                                                Pagesize={currentPage.pagesize}
                                                onPageChange={(page) => setpagechoice(page,'page',currentPage.page)}
                                            />
                                        </div>
                                        <div className="pagination-jumperpagination__part">
                                            <span className="pagination-jumper__label">Go to page</span>
                                            <div className="pagination-jumper__input">
                                                <div className="number-input  number-input--no-suffix">
                                                    <input onChange={(e)=>setState({...state,page_input:isNaN(e.target.value)?state.page_input:e.target.value})} type="text" value={state.page_input}  className="input_input"/>
                                                </div>
                                                <button onClick={()=>setpagechoice(state.page_input,'page',currentPage.page)} type="button" className="button btn-m btn-light "><span>Go</span></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>:''}
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
            <div id="modal">
                {review_choice!=undefined?
                <div className="popup modal__transition-enter-done">
                    <div className="popup__overlay"></div>
                    <div className="popup__container">
                        <div className="popup-form _30Mzmz">
                            <div className="popup-form__header">
                                <div className="popup-form__title">Reply</div>
                            </div>
                            <div className="popup-form__main">
                                <div className="popup-form__main-container">
                                    <div className='item-center mb-1'>
                                        <div className="review-user-image ">
                                            <img src={review_choice.avatar}/>
                                        </div>
                                        <div className="review-username mr-1">{review_choice.user}</div>
                                        <div className="d-flex">{rating(6,review_choice)}</div>
                                    </div>
                                    <div className="mb-1">{review_choice.info_more}</div>
                                    
                                    <div data-v-59a709f0="" className="input input__area desc-input">
                                        <textarea onChange={e=>setState({...state,text:e.target.value})} value={state.text} type="textarea" placeholder="Nhập phản hồi của bạn tại đây" resize="vertical" rows="2" minrows="5" maxlength="500" restrictiontype="input" showwordlimit="true" max="Infinity" min="-Infinity" className="input__inner input__inner--normal" style={{resize: 'vertical', minHeight: '98px'}}></textarea>
                                        <span className="input__count">{state.text!=null?state.text.trim().length:0}/500</span>
                                    </div>
                                </div>
                            </div>
                            <div className="popup-form__footer">
                                <button onClick={(e)=>setopenreply(e)} className="cancel-btn">Hủy</button>
                                <button onClick={(e)=>setsubmitreply(e)} type="button" className="btn btn-solid-primary btn--s btn--inline btn-orange _3cdPca" disabled={state.text!=null && state.text!=''?false:true}>Complete</button>
                            </div>
                        </div>
                    </div>
                </div>:''}
            </div>
             
           
        </>
    )
}

export default Ratingshop