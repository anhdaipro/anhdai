import Sidebamenu from "./Sidebar-menu"
import axios from 'axios';
import Navbar from "./Navbar"
import { useParams,Link,useSearchParams } from "react-router-dom";
import React, {useState,useEffect,useCallback,useRef} from 'react'
import ReactDOM, { render } from 'react-dom'
import {itemvariation,pagesize, rating, timepromotion, timevalue} from "../constants"
import Pagination from "../hocs/Pagination"
import {shopratingURL,} from "../urls"
import { headers} from '../actions/auth';
import Daterange from "../hocs/Daterange";
import Tabs from "./Tabs";
const stars=[5,4,3,2,1]
const listchoice=[
    {name:"Tất cả",value:'1'},
    {name:"Chưa trả lời",value:'2'},
    {name:"Đã trả lời",value:'3'},

]
const Ratingshop=()=>{
    const [state,setState]=useState({show:false,page_input:1,text:null,page_count:1})
    const [list_review,setListreview]=useState([])
    const [formdata,setFormdata]=useState({product_name:'',category_name:'',username:''})
    const {username,category_name,product_name}=formdata
    const [score,setScore]=useState(0)
    const [loading,setLoading]=useState(false)
    const [currentPage,setCurrentPage]=useState(1)
    const [page_size,setPagesize]=useState(5)
    const [params, setSearchParams] = useSearchParams();
    const [choice,setChoice]=useState('1')
    const [daychoice,setDaychoice]=useState({start:null,end:null})
    const productRef=useRef()
    const categoryRef=useRef()
    const usernameRef=useRef()
    const {end,start}=daychoice
    
    useEffect(() => {
        const getJournal = async () => {
            if(score){
                params.set('review_rating',score)
            }
            else{
                params.delete('review_rating')
            }
            params.set('page',currentPage)
            params.set('page_size',page_size)
            if(username){
                params.set('username',username)
            }
            else{
                params.delete('username',username)
            }
            if(category_name){
                params.set('category_name',category_name)
            }
            else{
                params.delete('category_name')
            }
            if(product_name){
                params.set('product_name',product_name)
            }
            else{
                params.delete('product_name')
            }
            if(start){
                params.set('start_day',timevalue(start))
            }
            else{
                params.delete('start_day')
            }
            if(end){
                params.set('end_day',timevalue(end))
            }
            else{
                params.delete('end_day')
            }
            setLoading(false)
            const res=await axios(`${shopratingURL}?${params}`,headers())
            let data=res.data
            setLoading(true)
            const list_reviews=res.data.reviews.map(item=>{
                return({...item,show_reply:false})
            })
            setState({...state,page_count:data.page_count})
            setListreview(list_reviews)
        }
        getJournal();
    }, [score,currentPage,page_size,category_name,product_name,username,end,start]);
    
    const setsearch=(e)=>{
        setFormdata({...formdata,product_name:productRef.current.value,username:usernameRef.current.value,category_name:categoryRef.current.value})
    }
    const showreply=(e,review)=>{
        const list_reviews=list_review.map(item=>{
            if(item.id==review.id){
            return({...item,show_reply:!item.show_reply})
            }
            return({...item,show_reply:false})
        })
        setListreview(list_reviews)
    }
    const setpagechoice=(page)=>{
        const page_chocie=page<=1?1:page>=state.page_count?state.page_count:page
        setCurrentPage(page_chocie)
    }
   const review_choice=list_review.find(item=>item.show_reply)
  
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
       axios.post(shopratingURL,form,headers())
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
                                                                <div className="input__inner input__inner--normal    item-center"> 
                                                                    <input ref={productRef} type="text" placeholder="Nhập tên sản phẩm" resize="vertical" rows="2" minrows="2" restrictiontype="input" max="Infinity" min="-Infinity" className="input__input"/> 
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
                                                                <div className="input__inner input__inner--normal    item-center"> 
                                                                    <input ref={categoryRef} type="text" placeholder="Nhập tên Phân loại hàng" resize="vertical" rows="2" minrows="2" restrictiontype="input" max="Infinity" min="-Infinity" className="input__input"/> 
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
                                                                <div className="input__inner input__inner--normal    item-center"> 
                                                                    <input ref={usernameRef} type="text" placeholder="Nhập tên đăng nhập" resize="vertical" rows="2" minrows="2" restrictiontype="input" max="Infinity" min="-Infinity" className="input__input"/> 
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
                                                                
                                                                
                                                                <Daterange
                                                                    setDaychoice={data=>setDaychoice(data)} 
                                                                    daychoice={daychoice}
                                                                    title="Chọn thời gian"
                                                                />
                                                                
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
                                                            <button onClick={e=>setsearch(e)} data-v-e373b4b6="" type="button" className="button button--primary button--normal">
                                                                <span>Tìm</span>
                                                            </button> 
                                                            <button onClick={()=>{
                                                                setFormdata({...formdata,product_name:'',category_name:'',username:''})
                                                                setDaychoice({start:null,end:null})
                                                
                                                                }} 
                                                                data-v-e373b4b6="" type="button" className="mr12 button button--normal">
                                                                <span>Nhập Lại</span>
                                                            </button>
                                                        </div>  
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div> 
                                    
                                    <div data-v-f68eb30a="" className="content">
                                        <div data-v-f68eb30a="" className="tab-wrapper">
                                            <div data-v-f68eb30a="" className="tabs tabs-line tabs-normal tabs-top">
                                                <Tabs
                                                choice={choice}
                                                loading={loading}
                                                listchoice={listchoice}
                                                setchoice={data=>setChoice(data)}
                                                />
                                               
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
                                                        <div onClick={()=>setScore(0)} className={`tabs__nav-tab ${score==0?'active':''}`}>Tất cả </div>
                                                        {stars.map((item,index)=>
                                                            <div onClick={()=>setScore(item)} key={index} className={`tabs__nav-tab ${score==item?'active':''}`}>
                                                                <span data-v-f68eb30a="" className="title">{item} Sao</span>  
                                                            </div>
                                                        )}
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
                                                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 93 87"><defs><rect id="defaultpage_nodata-a" width="45" height="33" x="44" y="32" rx="2"></rect><mask id="defaultpage_nodata-b" width="45" height="33" x="0" y="0" fill="#fff" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox"><use></use></mask></defs><g fill="none" fillRule="evenodd" transform="translate(-3 -4)"><rect width="96" height="96"></rect><ellipse cx="48" cy="85" fill="#F2F2F2" rx="45" ry="6"></ellipse><path fill="#FFF" stroke="#D8D8D8" d="M79.5,17.4859192 L66.6370555,5.5 L17,5.5 C16.1715729,5.5 15.5,6.17157288 15.5,7 L15.5,83 C15.5,83.8284271 16.1715729,84.5 17,84.5 L78,84.5 C78.8284271,84.5 79.5,83.8284271 79.5,83 L79.5,17.4859192 Z"></path><path fill="#DBDBDB" fillRule="nonzero" d="M66,6 L67.1293476,6 L67.1293476,16.4294956 C67.1293476,17.1939227 67.7192448,17.8136134 68.4469198,17.8136134 L79,17.8136134 L79,19 L68.4469198,19 C67.0955233,19 66,17.849146 66,16.4294956 L66,6 Z"></path><g fill="#D8D8D8" transform="translate(83 4)"><circle cx="7.8" cy="10.28" r="3" opacity=".5"></circle><circle cx="2" cy="3" r="2" opacity=".3"></circle><path fillRule="nonzero" d="M10.5,1 C9.67157288,1 9,1.67157288 9,2.5 C9,3.32842712 9.67157288,4 10.5,4 C11.3284271,4 12,3.32842712 12,2.5 C12,1.67157288 11.3284271,1 10.5,1 Z M10.5,7.10542736e-15 C11.8807119,7.10542736e-15 13,1.11928813 13,2.5 C13,3.88071187 11.8807119,5 10.5,5 C9.11928813,5 8,3.88071187 8,2.5 C8,1.11928813 9.11928813,7.10542736e-15 10.5,7.10542736e-15 Z" opacity=".3"></path></g><path fill="#FAFAFA" d="M67.1963269,6.66851903 L67.1963269,16.32 C67.2587277,17.3157422 67.675592,17.8136134 68.4469198,17.8136134 C69.2182476,17.8136134 72.735941,17.8136134 79,17.8136134 L67.1963269,6.66851903 Z"></path><use fill="#FFF" stroke="#D8D8D8" strokeDasharray="3" strokeWidth="2" mask="url(#defaultpage_nodata-b)" xlinkhref="#defaultpage_nodata-a"></use><rect width="1" height="12" x="54" y="46" fill="#D8D8D8" rx=".5"></rect><rect width="1" height="17" x="62" y="40" fill="#D8D8D8" rx=".5"></rect><rect width="1" height="10" x="70" y="48" fill="#D8D8D8" rx=".5"></rect><rect width="1" height="14" x="78" y="43" fill="#D8D8D8" rx=".5"></rect></g></svg>
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
                                                                        <div className="review-user-image"><img src={review.user.avatar}/></div>
                                                                        <div className="review-username">{review.user.username}</div>
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
                                                                {review.reply?
                                                                <div className="review-detail-reply">
                                                                    <div className="review-detail-text">
                                                                        {review.reply.text}
                                                                    </div>
                                                                    <div className="review-detail-reply-time">
                                                                        {timepromotion(review.reply.created)}
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
                                        </div>
                                    </div> 
                                </div>
                                {loading?
                                <div>
                                    <div className="with-assist">
                                        <div className="item-center page-pagination">
                                            <Pagination
                                                classActive={`pager__page active`}
                                                classNormal={`pager__page`}
                                                classIcon={`pager__page`}
                                                currentPage={currentPage.page}
                                                totalCount={state.page_count}
                                                Pagesize={currentPage.pagesize}
                                                onPageChange={(page) => setpagechoice(page)}
                                            />
                                        </div>
                                        <div className="pagination-jumperpagination__part">
                                            <span className="pagination-jumper__label">Go to page</span>
                                            <div className="pagination-jumper__input">
                                                <div className="number-input  number-input--no-suffix">
                                                    <input onChange={(e)=>setState({...state,page_input:isNaN(e.target.value)?state.page_input:e.target.value})} type="text" value={state.page_input}  className="input_input"/>
                                                </div>
                                                <button onClick={()=>setpagechoice(state.page_input)} type="button" className="button btn-m btn-light "><span>Go</span></button>
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
                                        <textarea onChange={e=>setState({...state,text:e.target.value})} value={state.text} type="textarea" placeholder="Nhập phản hồi của bạn tại đây" resize="vertical" rows="2" minrows="5" maxlength="500" restrictiontype="input" showwordlimit="true" max="Infinity" min="-Infinity" className="input__inner input__inner--normal    item-center" style={{resize: 'vertical', minHeight: '98px'}}></textarea>
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