import {formatter,timecreate,timeago,
    itemvariation,hidestring,rating,ratingitem,list_review_choice,timepromotion} from "../constants"
import axios from 'axios';
import React, {useState, useEffect,useRef} from 'react'
import ReactDOM from 'react-dom'
import {addToCartURL,productinfoURL,listThreadlURL,} from "../urls"
import Pagination from "../hocs/Pagination"
import {
    FacebookShareButton,
    PinterestShareButton,
    FacebookMessengerShareButton,
    TwitterShareButton,
  } from "react-share";
import { FacebookIcon,FacebookMessengerIcon,TwitterIcon,PinterestIcon } from "react-share";
import {connect} from "react-redux"
import {useNavigate , Link,useLocation, Navigate,useParams} from 'react-router-dom';
import { expiry, headers,showchat, showthreads } from "../actions/auth";
let pageSize=5
const ProductDetail = ({report_complete,showchat,show_report,setreport,showthreads,data_product,setthread,addcartitem,showmediaitem,user}) => {
    const [state, setState] = useState({request_report:false,list_host_sale:[],data:null,inventory:null,count_variation:0,quantity:1,review_choice:'all',
    color_id:0,size_id:0,variation_color:[],variation_size:[],page_count:1,rating:[],has_comment:0,
    has_media:0,
    rating_choice:[{review_rating:5},{review_rating:4},{review_rating:3},{review_rating:3},{review_rating:3}]});
    const [waring, setWaring] = useState({warring:false})
    const [variation, setVariation] = useState({data:null,quantity:1})
    const [listreview,setReview]=useState(null)
    const [shop,setShop]=useState(null)
    const [page,setPage]=useState(1)
    const [listmedia,setListmedia]=useState([])
    const [list_hot_sales,setListhostsale]=useState([])
    const [itemdeal,setItemdeal]=useState({main_prouct:null,byproduct:[],color_choice:null,size_choice:null})
    useEffect(() => {
        
        const byproduct=data_product.byproduct!=undefined?data_product.byproduct:undefined
        const color_choice= data_product.color.length>0?data_product.color[0]:null
        const size_choice =color_choice!=null&& data_product.size.length>0?data_product.size.find(size=>size.variation.some(variation=>color_choice.variation.includes(variation))):null
        const index_choice=data_product.media_upload.length>=5?5:data_product.media_upload.length
        const video_preview=data_product.media_upload.find(item=>item.media_type==='video')
        const image_preview=data_product.media_upload.filter(item=>item.media_type==='image')
        const list_media=video_preview!=undefined?[video_preview,...image_preview]:image_preview
        setItemdeal({...itemdeal,byproduct:byproduct,color_choice:color_choice,size_choice:size_choice})
        setState({...state,data:data_product,index_choice:index_choice,filechoice:list_media[0],exist_thread:data_product.exist_thread,thread_id:data_product.thread_id!=undefined?data_product.thread_id:null})
        setListmedia(list_media)
        setListhostsale(data_product.list_host_sale)
    },[data_product])
    useEffect(()=>{
        if(!show_report && listreview!=null){
            const list_reviews=listreview.map(review=>{
                return({...review,request_report:false})
            })
            setReview(list_reviews)
        }
        
    },[report_complete])
    let navigate = useNavigate();
    const videoref=useRef();
    const list_preview=listmedia.length>=5?listmedia.slice(state.index_choice-5,state.index_choice):listmedia
    console.log(state.index_choice)
    const { slug } = useParams();
    const previewimage = useRef();
    
    window.onscroll=()=>{
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if(clientHeight + scrollTop === scrollHeight){
            let url=new URL(productinfoURL)
            let search_params=url.searchParams
            search_params.set('item_id',state.data.id)
            if(shop===null){
            search_params.set('shop',true)
            }
            else if (listreview===null){
                search_params.set('review','ok')
            }
            url.search = search_params.toString();
            let new_url = url.toString();
            if(shop===null || listreview===null){
                axios.get(new_url)
                .then(res=>{
                    let data=res.data
                    if(shop===null){
                        setShop(data)
                    }
                    else{
                        const list_reviews=data.reviews.map(item=>{
                            return({...item,request_report:false})
                        })
                        setReview(list_reviews)
                        setState({...state,page_count:data.page_count,rating:data.rating,has_comment:data.has_comment,has_media:data.has_media})
                    }
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
        get_price(item,'color_id')
      }

    function setsize(e,item){
        e.target.classList.toggle('product-variation--selected')
        if(e.target.classList.contains('product-variation--selected')){
          setState({...state,size_id:item.id,variation_size:item.variation})
          
        }
        else{
          setState({...state,size_id:0,variation_size:[]})
        }
        get_price(item,'size_id')
    }
      
    const get_price=(item,name)=>{
        setTimeout(function(){
          let variation_active=document.querySelectorAll('.choice_variation .product-variation.product-variation--selected')
          if(variation_active.length>=state.data.count_variation){
            let url=new URL(addToCartURL)
            let search_params=url.searchParams
            search_params.append('item_id',state.data.id)
            if(state.color_id!=0){
              search_params.set('color_id',state.color_id)
            }
            if(state.size_id!=0){
              search_params.set('size_id',state.size_id)
            }
            search_params.set(name,item.id)
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
        },10)
    }

    const addtocart=(e)=>{
        e.stopPropagation()
        if (localStorage.token!='null' && expiry>0){
            let variation_active=document.querySelectorAll('.product-variation--selected')
            if(variation_active.length===state.data.count_variation){
            setWaring({...waring,warring:false})
            let form =new FormData()
            if(variation.data!=null){
                form.append('id',variation.data.id)
            }
            form.append('item_id',state.data.id)
            form.append('quantity',state.quantity) 
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
            form.append('item_id',state.data.id)
            axios.post( productinfoURL,form,headers)
            .then(res=>{
            state.data.num_like_item=res.data.num_like_item
            state.data.like_item=res.data.like_item
            setState({...state,data:state.data})
            })
        }
        else{
            navigate(`/buyer/login?next=${window.location}`, { replace: true });
        }
    }

    const minus=(e)=>{
        const quanity=variation.quantity==1?1:variation.quantity-1
        setVariation({...variation,quantity:quanity})
    }

    const add=(e)=>{
        variation.quantity+=1
        setVariation({...variation,quantity:variation.quantity})
    }
    
    const setshowthread=(e)=>{
        e.preventDefault()
        let data={member:[state.data.user_id,user.id],thread:null,item_id:state.data.id}
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
    
    const showreview=(value,name)=>{
        setPage(value)
        let url=new URL(productinfoURL)
        let search_params=url.searchParams
        search_params.set('item_id',state.data.id)
        search_params.append('review','ok')
        search_params.append([name],value)
        url.search = search_params.toString();
        let new_url = url.toString();
        axios.get(new_url)
        .then(res=>{
            let data=res.data
            setReview(data.reviews)
            setState({...state,review_choice:value,page_count:data.page_count,rating:data.rating,has_comment:data.has_comment,has_media:data.has_media})
        })
    }
   
    const showfile=(e)=>{
        e.stopPropagation() ;
        showmediaitem(state.filechoice,listmedia)
        console.log(listmedia)
    }
    function showmedia(item,reviewchoice){
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
        console.log(list_reviews)
        previewimage.current.style.marginLeft=`${-532*reviewchoice.list_file.indexOf(item)}px`
        console.log(previewimage.current)
        setReview(list_reviews)
    }
    const setindex=(value)=>{
        setState({...state,index_choice:value})
    }
    const setrequestreport=(e,reviewchoice)=>{
        e.stopPropagation()
        const list_reviews=listreview.map(review=>{
            if(review.id===reviewchoice.id){
                return({...review,request_report:!review.request_report})
            } 
            return({...review,request_report:false})
        })
        setReview(list_reviews)
        window.onclick=(event)=>{
            const parent=event.target.closest('.product-rating__report-menu-button')
            if(!parent){
                const list_reviews=listreview.map(review=>{
                    return({...review,request_report:false})
                })
                setReview(list_reviews)
            }
        }
    }

    
    useEffect(()=>{
        if(videoref!=undefined && videoref.current!=undefined){
            videoref.current.addEventListener('ended',e=>{
                setState({...state,finish:true})
            })
        }
    },[state,videoref])
    return(
    <div className="page-product">
        {state.data!=null?
        <div className="containers">
            <div className="item-center _3bDXqx page-product__breadcrumb">
                <a className="_2572CL" href="/">Anhdai</a>
                <svg enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0" className="svg-icon _2m4lrt icon-arrow-right"><path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></path></svg>
                {state.data.category.split('>').map((item,i)=>{
                    if(i<state.data.category.split('>').length-1){
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
                <span className="_1w3mKA">{state.data.item_name}</span>
            </div>
            <div className="product-briefing d-flex card _1j7uGn">
                <div className="_11Y_VZ">
                    <div className="flex-col">
                        <div className="_11hT2s">
                            <div onClick={(e)=>showfile(e)} className="_2xhOj_">
                                <div className="_3Jd8Mq" style={{display: `${state.filechoice.media_type==='video'?'block':'none'}`}}>
                                    <div className="image-placeholder _2NQS5E">
                                        <svg enableBackground="new 0 0 54 61" viewBox="0 0 54 61" role="img" className="stardust-icon stardust-icon-Anhdai icon-tiny"><path stroke="none" d="M35.67,44.95 C35.34,47.70 33.67,49.91 31.09,51.01 C29.65,51.63 27.72,51.96 26.19,51.85 C23.81,51.76 21.57,51.18 19.50,50.12 C18.77,49.74 17.67,48.99 16.82,48.28 C16.61,48.10 16.58,47.99 16.73,47.78 C16.80,47.67 16.94,47.46 17.25,47.01 C17.71,46.34 17.76,46.26 17.81,46.18 C17.96,45.96 18.19,45.94 18.42,46.12 C18.45,46.14 18.45,46.14 18.47,46.16 C18.50,46.19 18.50,46.19 18.59,46.26 C18.68,46.33 18.74,46.37 18.76,46.39 C20.99,48.13 23.58,49.13 26.20,49.24 C29.84,49.19 32.46,47.55 32.93,45.03 C33.44,42.27 31.27,39.88 27.02,38.54 C25.69,38.13 22.33,36.78 21.71,36.42 C18.80,34.71 17.44,32.47 17.64,29.71 C17.93,25.88 21.49,23.03 25.98,23.01 C27.98,23.01 29.99,23.42 31.91,24.23 C32.60,24.52 33.81,25.18 34.23,25.50 C34.47,25.68 34.52,25.88 34.38,26.11 C34.31,26.24 34.18,26.44 33.91,26.87 L33.91,26.87 C33.55,27.44 33.54,27.46 33.46,27.59 C33.32,27.80 33.15,27.82 32.90,27.66 C30.84,26.28 28.55,25.58 26.04,25.53 C22.91,25.59 20.57,27.45 20.42,29.99 C20.38,32.28 22.09,33.95 25.80,35.22 C33.33,37.64 36.21,40.48 35.67,44.95 M26.37,5.43 C31.27,5.43 35.27,10.08 35.46,15.90 L17.29,15.90 C17.47,10.08 21.47,5.43 26.37,5.43 M51.74,17.00 C51.74,16.39 51.26,15.90 50.66,15.90 L50.64,15.90 L38.88,15.90 C38.59,8.21 33.10,2.08 26.37,2.08 C19.64,2.08 14.16,8.21 13.87,15.90 L2.07,15.90 C1.48,15.91 1.01,16.40 1.01,17.00 C1.01,17.03 1.01,17.05 1.01,17.08 L1.00,17.08 L2.68,54.14 C2.68,54.25 2.69,54.35 2.69,54.46 C2.69,54.48 2.70,54.50 2.70,54.53 L2.70,54.60 L2.71,54.61 C2.96,57.19 4.83,59.26 7.38,59.36 L7.38,59.37 L44.80,59.37 C44.81,59.37 44.83,59.37 44.85,59.37 C44.87,59.37 44.88,59.37 44.90,59.37 L44.98,59.37 L44.98,59.36 C47.57,59.29 49.67,57.19 49.89,54.58 L49.89,54.58 L49.90,54.54 C49.90,54.51 49.90,54.49 49.90,54.46 C49.90,54.39 49.91,54.33 49.91,54.26 L51.74,17.05 L51.74,17.05 C51.74,17.04 51.74,17.02 51.74,17.00"></path></svg>
                                    </div>
                                    <div className="center _1G4Hrb">
                                        <video ref={videoref} dataDashjsPlayer="true" src={state.filechoice.media_type==='video'?state.filechoice.file:''} webkitPlaysinline="webkit-playsinline" className="_7ipvJr" autoPlay={true}></video>
                                    </div> 
                                </div>
                                <div className={`${state.filechoice.media_type==='video'?'_24bhyl yA8B4u':'aGIJCo'}`}>
                                    {state.filechoice.media_type==='video'?'':<div className="_3rslob _1vc1W7" style={{backgroundImage: `url(${state.filechoice.file})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}}></div>}
                                </div>
                                {state.filechoice.media_type==='video' && state.finish?<svg enable-background="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className="shopee-svg-icon dBlJ2V"><g opacity=".54"><g><circle cx="7.5" cy="7.5" fill="#040000" r="7.3"></circle><path d="m7.5.5c3.9 0 7 3.1 7 7s-3.1 7-7 7-7-3.1-7-7 3.1-7 7-7m0-.5c-4.1 0-7.5 3.4-7.5 7.5s3.4 7.5 7.5 7.5 7.5-3.4 7.5-7.5-3.4-7.5-7.5-7.5z" fill="#ffffff"></path></g></g><path clip-rule="evenodd" d="m10.2 5.3c.5.7.8 1.4.8 2.2 0 1.9-1.6 3.5-3.5 3.5s-3.5-1.6-3.5-3.5 1.6-3.5 3.5-3.5v.5c-1.6 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3c0-.7-.2-1.3-.6-1.8-.1-.1-.1-.1-.1-.1-.1-.1-.1-.3 0-.4s.3-.1.4.1c0-.1 0 0 0 0z" fill="#ffffff" fill-rule="evenodd"></path><path clip-rule="evenodd" d="m7.5 2.9c0-.1.1-.1.1-.1l1.4 1.5-1.4 1.4c0 .1-.1.1-.1 0z" fill="#ffffff" fill-rule="evenodd"></path></svg>:''}
                            </div>
                        </div>
                        <div className="_2riwuv">
                            {list_preview.map((media,index)=>
                                <div onClick={(e)=>showfile(e)} onMouseEnter={()=>setState({...state,filechoice:media,finish:false})} key={index} className="_1ivFgC">
                                    <div className="_4yF4f1">
                                        <div className="aGIJCo">
                                            <div className="_2UWcUi _1vc1W7" style={{backgroundImage: `url(${media.media_type=='video'?media.image_preview:media.file})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}}></div>
                                        </div>
                                        <img className="_1RZOE3" src="https://cf.shopee.vn/file/cfdc9a14b11e249a76aaf5a492cc2338"/>
                                        {media.media_type==='video'?<svg enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className="svg-icon _3igPfx"><g opacity=".54"><g><circle cx="7.5" cy="7.5" fill="#040000" r="7.3"></circle><path d="m7.5.5c3.9 0 7 3.1 7 7s-3.1 7-7 7-7-3.1-7-7 3.1-7 7-7m0-.5c-4.1 0-7.5 3.4-7.5 7.5s3.4 7.5 7.5 7.5 7.5-3.4 7.5-7.5-3.4-7.5-7.5-7.5z" fill="#ffffff"></path></g></g><path d="m6.1 5.1c0-.2.1-.3.3-.2l3.3 2.3c.2.1.2.3 0 .4l-3.3 2.4c-.2.1-.3.1-.3-.2z" fill="#ffffff"></path></svg>:''}
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
                            <svg onClick={()=>setlike()} width="24" height="20" className="ELoIiZ like-product"><path d="M19.469 1.262c-5.284-1.53-7.47 4.142-7.47 4.142S9.815-.269 4.532 1.262C-1.937 3.138.44 13.832 12 19.333c11.559-5.501 13.938-16.195 7.469-18.07z" stroke="#FF424F" strokeWidth="1.5" fill={state.data.like_item?'#FF424F':'none'} fillRule="evenodd" strokeLinejoin="round"></path></svg>
                            <div className="pl-1_2 number_like">Đã thích ({state.data.num_like_item})</div>
                        </div>
                    </div> 
                </div>
                <div className="d-flex _3qq4y7">
                    <div className="flex-auto flex-col _4QIZZo">
                        <div className=" attM6y">
                            <div className="favorite-shop item-center">Yêu thích+</div>
                            <span className="shop-name">{state.data.item_name}</span>
                        </div>
                        <div className="item-center _21hHOx">
                            {state.data.count_review>0?
                            <>
                            <div className="d-flex item-review-rating">
                                <div className="item-number-review item-center">{state.data.review_rating.toFixed(1)}</div>
                                <div className="tuNfsN">
                                    <div className="rating-stars item-center">
                                        <div className="rating-stars__stars item-center">
                                        {ratingitem(6,state.data)}
                                        </div>
                                    </div>
                                </div>  
                            </div>
                            <div className="item-center item-review-rating">
                                <div className="item-number-reviews" >{state.data.count_review}</div>
                                <div className="oMTlt6">Review</div>
                            </div>
                            </>:<div className="vgsTBi">Chưa có đánh giá</div>}
                        
                            <div className="item-center pl-1">
                                <div className="_3b2Btx">{state.data.num_order}</div>
                                <div className="_3hic1u">đã bán</div>
                            </div>
                        </div>
                        <div className="item_product-flash-sale">
                            <div className=" price__flash-sale">
                                <div className="items-price item-center">
                                <div className={`${state.data.program_valid===0?'price_current':'price_min_max'}`}>₫{variation.data===null?`${formatter.format(state.data.min_price)}${state.data.min_price!=state.data.max_price?` -  ₫${formatter.format(state.data.max_price)}`:''}`:`${formatter.format(variation.data.price)}`}</div>
                                {state.data.percent_discount>0 && state.data.program_valid>0?
                                <div className="item-center">
                                    ₫{variation.data===null?`${formatter.format(state.data.min_price*(1-state.data.percent_discount/100))}${state.data.min_price!=state.data.max_price?` -  ₫${formatter.format(state.data.max_price*(1-state.data.percent_discount/100))}`:''}`:`${variation.price*(1-variation.data.percent_discount/100)}`}
                                    <div className="box-color">
                                        {variation.data!=null?variation.data.percent_discount:state.data.percent_discount}%Reduce
                                    </div>
                                </div>:""
                                }
                                </div>
                                {state.data.flash_sale.length>0?
                                <a className="item-center flash_sale" href="/flash_sale?fromItem=9203700427&amp;promotionId=2029278834">
                                    <svg viewBox="0 0 108 21" height="21" width="108" className="flash-sale-logo flash-sale-logo--default"><g fill="currentColor" fillRule="evenodd"><path d="M0 16.195h3.402v-5.233h4.237V8H3.402V5.037h5.112V2.075H0zm29.784 0l-.855-2.962h-4.335l-.836 2.962H20.26l4.723-14.12h3.576l4.724 14.12zM26.791 5.294h-.04s-.31 1.54-.563 2.43l-.797 2.744h2.74l-.777-2.745c-.252-.889-.563-2.43-.563-2.43zm7.017 9.124s1.807 2.014 5.073 2.014c3.13 0 4.898-2.034 4.898-4.384 0-4.463-6.259-4.147-6.259-5.925 0-.79.778-1.106 1.477-1.106 1.672 0 3.071 1.245 3.071 1.245l1.439-2.824s-1.477-1.6-4.47-1.6c-2.76 0-4.918 1.718-4.918 4.325 0 4.345 6.258 4.285 6.258 5.964 0 .85-.758 1.126-1.457 1.126-1.75 0-3.324-1.462-3.324-1.462zm12.303 1.777h3.402v-5.53h5.054v5.53h3.401V2.075h-3.401v5.648h-5.054V2.075h-3.402zm18.64-1.678s1.692 1.915 4.763 1.915c2.877 0 4.548-1.876 4.548-4.107 0-4.483-6.492-3.871-6.492-6.36 0-.987.914-1.678 2.08-1.678 1.73 0 3.052 1.224 3.052 1.224l1.088-2.073s-1.4-1.501-4.12-1.501c-2.644 0-4.627 1.738-4.627 4.068 0 4.305 6.512 3.87 6.512 6.379 0 1.145-.952 1.698-2.002 1.698-1.944 0-3.44-1.48-3.44-1.48zm19.846 1.678l-1.166-3.594h-4.84l-1.166 3.594H74.84L79.7 2.174h2.623l4.86 14.021zM81.04 4.603h-.039s-.31 1.382-.583 2.172l-1.224 3.752h3.615l-1.224-3.752c-.253-.79-.545-2.172-.545-2.172zm7.911 11.592h8.475v-2.192H91.46V2.173H88.95zm10.477 0H108v-2.192h-6.064v-3.772h4.645V8.04h-4.645V4.366h5.753V2.174h-8.26zM14.255.808l6.142.163-3.391 5.698 3.87 1.086-8.028 12.437.642-8.42-3.613-1.025z"></path></g></svg>
                                    <div className="time-star-flash-sale">BẮT ĐẦU SAU 21:00, 11 Th11</div>
                                    <svg enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0" className="svg-icon icon-arrow-right"><path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></path></svg>
                                </a>:""}
                            </div>
                        </div>
                        <div className="_7c-I_e">
                            <div className="flex-col">
                            {state.data.voucher.length>0?
                            <div className="item-center _3qYU_y discount-voucher">
                                <div className="mini-vouchers item-center">
                                <div className="mini-vouchers__label">Shop discount code</div>
                                <div className="mini-vouchers__wrapper d-flex ">
                                    <div className="mini-vouchers__vouchers d-flex">
                                    {
                                        state.data.voucher.map(vocher=>
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
                                        {state.data.voucher.map(vocher=>
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
                                {state.data.promotion_combo.length>0?
                                <div className='item-center _3qYU_y'>
                                <div className="koZBMj">Promotion combo</div>
                                    <div className="mini-vouchers__wrapper d-flex flex-auto ">
                                        <div className="mini-vouchers__vouchers d-flex flex-auto">
                                        {state.data.promotion_combo.map(promotion=>
                                            <div className="voucher-ticket voucher-ticket--VN voucher-ticket--seller-mini-solid mini-voucher-with-popover">
                                                <div className="item-center">
                                                    <span className="voucher-promo-value voucher-promo-value--absolute-value">Buy {promotion.quantity_to_reduced} {promotion.combo_type === '1'?`& reduce ${promotion.discount_percent}%`:promotion.combo_type === '2'?`& reduce ₫${formatter.format(promotion.discount_price)}k`:`& only with ₫${formatter.format(promotion.price_special_sale)}k`}</span>
                                                </div>
                                            </div>
                                            )
                                        }
                                        <div className="mini-vouchers__mask"></div>
                                        </div>
                                    </div>
                                </div>
                                :""}
                                {state.data.deal_shock.length>0?
                                <div className='item-center' >
                                    <div className="koZBMj">Shock deal</div>
                                    <div className="mini-vouchers__wrapper d-flex flex-auto ">
                                    <div className="mini-vouchers__vouchers d-flex flex-auto">
                                        {state.data.deal_shock.map(deal=>
                                        <div className=" voucher-ticket--seller-mini-solid mini-voucher-with-popover">
                                            <div className="item-center">
                                            <span className="voucher-promo-value voucher-promo-value--absolute-value">Buy with deal shock</span>
                                            </div>
                                        </div>
                                        )}
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
                                    {state.data.color.length>0?
                                    <div className="item-base-line" style={{marginBottom: '8px'}}>
                                        <label className="koZBMj">{state.data.color[0].name}</label>
                                        <div className="variation-item item-center">
                                        {state.data.color.map(item=>
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
                                    {state.data.size.length>0?
                                    <div className="item-base-line" style={{marginBottom: '8px'}}>
                                        <label className="koZBMj">{state.data.size[0].name}</label>
                                        <div className="variation-item item-center">
                                        {state.data.size.map(item=>
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
                                                <button onClick={(e)=>minus(e)} className="minus-btn btn-adjust">
                                                    <svg enableBackground="new 0 0 10 10" viewBox="0 0 10 10" x="0" y="0" className="svg-icon "><polygon points="4.5 4.5 3.5 4.5 0 4.5 0 5.5 3.5 5.5 4.5 5.5 10 5.5 10 4.5"></polygon></svg>
                                                </button>
                                                <input className="_2KdYzP quantity iRO3yj" type="text" role="spinbutton" aria-valuenow="1" value={variation.quantity}/>
                                                <button onClick={(e)=>add(e)} className="plus-btn btn-adjust">
                                                    <svg enableBackground="new 0 0 10 10" viewBox="0 0 10 10" x="0" y="0" className="svg-icon icon-plus-sign"><polygon points="10 4.5 5.5 4.5 5.5 0 4.5 0 4.5 4.5 0 4.5 0 5.5 4.5 5.5 4.5 10 5.5 10 5.5 5.5 10 5.5"></polygon></svg>
                                                </button>
                                            </div>
                                            <div className="inventory">{variation.data!=null?`${variation.data.inventory}`:`${state.data.item_inventory}`} avaliable</div>
                                        </div>
                                    </div>
                                    {waring.warring?<div className="waring">Please choice size or color</div>:''}
                                </div>
                            </div>
                            {user!=null && user.id!=state.data.shop_user?
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
            {state.data.deal_shock.length>0?
            <div style="display: contents;">
                <section className="_3zEHx0">
                    <div className="_18qwfY">
                        <div className="_2stg1K">
                            <h3 className="eL8esm">Mua thêm deal sốc</h3>
                            <span>
                                <div className="_2c4DDg">Xem thêm
                                    <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="_2cZQo0"><path d="M2 2L6 5.99017L2 10" stroke="currentColor" stroke-width="1.5"></path></svg>
                                </div>
                            </span>
                        </div>
                        <div className="FAlQt0">
                            <div className="_3eSrlV Xtxtlj">
                                <a className="_1HN33t" href="/Quần-Baggy-Nam-Ống-Rộng-vải-Hàn-Cao-Cấp-Quần-Âu-công-sở-chất-liệu-co-giãn-phong-cách-Hàn-Quốc-i.275899480.12372283368">
                                    <span>
                                        <div className="_2xjPnf">
                                            <div className="_13tcE_ _2LFWga" style="background-image: url(&quot;https://cf.shopee.vn/file/e66d8780015636588a0c4c8d797564d7_tn&quot;); background-size: contain; background-repeat: no-repeat;"></div>
                                        </div>
                                    </span>
                                    <div className="_3lizqa">
                                        <span className="_3DwJRx">{state.data.item_name}</span>
                                    </div>
                                </a>
                                <div className="_2eqQf0">
                                    <label className="stardust-checkbox stardust-checkbox--disabled stardust-checkbox--checked">
                                        <input checked className="stardust-checkbox__input" type="checkbox"/>
                                        <div className="stardust-checkbox__box"></div>
                                    </label>
                                    <div className="stardust-popover _3XPJ2Z" id="stardust-popover0" tabindex="0">
                                        <div role="button" className="stardust-popover__target">
                                            <span className="_1b3job">{itemdeal.color_choice!=null?itemdeal.color_choice.value:''}{itemdeal.size_choice!=null?`,${itemdeal.size_choice}`:''}
                                                <span className="_2RY7-Q"></span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="_3m5v9Z">
                                    <span className="_3BOLsU">₫{(state.data.min_price+state.data.max_price)/2}</span>
                                    {state.data.count_discount_valid?
                                    <span className="_3QGCLf">₫{(state.data.item_discount_min+state.data.item_discount_min)/2}</span>:''}
                                </div>
                            </div>
                            <div className="_3ai7Fq">
                                <svg enable-background="new 0 0 10 10" viewBox="0 0 10 10" x="0" y="0" className="shopee-svg-icon icon-plus-sign"><polygon points="10 4.5 5.5 4.5 5.5 0 4.5 0 4.5 4.5 0 4.5 0 5.5 4.5 5.5 4.5 10 5.5 10 5.5 5.5 10 5.5"></polygon></svg>
                            </div> 
                            {itemdeal.byproduct.map(item=>
                                <div className="_3eSrlV Xtxtlj">
                                    <a className="_1HN33t" href="/Quần-Baggy-Nam-Ống-Rộng-vải-Hàn-Cao-Cấp-Quần-Âu-công-sở-chất-liệu-co-giãn-phong-cách-Hàn-Quốc-i.275899480.12372283368">
                                        <span>
                                            <div className="_2xjPnf">
                                                <div className="_13tcE_ _2LFWga" style="background-image: url(&quot;https://cf.shopee.vn/file/e66d8780015636588a0c4c8d797564d7_tn&quot;); background-size: contain; background-repeat: no-repeat;"></div>
                                            </div>
                                        </span>
                                        <div className="_3lizqa">
                                            <span className="_3DwJRx">{item.item_name}</span>
                                        </div>
                                    </a>
                                    <div className="_2eqQf0">
                                        <label className="stardust-checkbox stardust-checkbox--disabled stardust-checkbox--checked">
                                            <input checked className="stardust-checkbox__input" type="checkbox"/>
                                            <div className="stardust-checkbox__box"></div>
                                        </label>
                                        <div className="stardust-popover _3XPJ2Z" id="stardust-popover0" tabindex="0">
                                            <div role="button" className="stardust-popover__target">
                                                <span className="_1b3job">{itemdeal.color_choice!=null?itemdeal.color_choice.value:''}{itemdeal.size_choice!=null?`,${itemdeal.size_choice}`:''}
                                                    <span className="_2RY7-Q"></span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="_3m5v9Z">
                                        <span className="_3BOLsU">₫{(state.data.min_price+state.data.max_price)/2}</span>
                                        {state.data.count_discount_valid?
                                        <span className="_3QGCLf">₫{(state.data.item_discount_min+state.data.item_discount_min)/2}</span>:''}
                                    </div>
                                </div>
                            )}
                        </div>                  
                    </div>
                    <div className="WyFbFq">
                        <div className="_3Dhxnq">
                            <span> Tổng cộng:</span>
                            <div className="jejfWt">
                                <span className="_1fDy7V">₫928.000</span>
                                <span className="_2vTi-e">₫546.000</span>
                            </div>
                            <span className="_3X8X28">Tiết kiệm</span>
                            <span className="_26brOQ">₫382.000</span>
                        </div>
                        <button className="shopee-button-outline _35l9Gd _1LDVl2">
                            <svg enable-background="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className="shopee-svg-icon _2kMy9d icon-add-to-cart"><g><g><polyline fill="none" points=".5 .5 2.7 .5 5.2 11 12.4 11 14.5 3.5 3.7 3.5" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"></polyline><circle cx="6" cy="13.5" r="1" stroke="none"></circle><circle cx="11.5" cy="13.5" r="1" stroke="none"></circle></g><line fill="none" stroke-linecap="round" stroke-miterlimit="10" x1="7.5" x2="10.5" y1="7" y2="7"></line><line fill="none" stroke-linecap="round" stroke-miterlimit="10" x1="9" x2="9" y1="8.5" y2="5.5"></line></g></svg>Bấm để mua deal sốc
                        </button>
                    </div>    
                </section>
            </div>:''}
            {shop!=null?<>
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
                                <button onClick={(e)=>setshowthread(e)} className="mr-1 item-center btn-m btn-tinted">
                                    <svg viewBox="0 0 16 16" className="svg-icon _8j52Y0"><g fillRule="evenodd"><path d="M15 4a1 1 0 01.993.883L16 5v9.932a.5.5 0 01-.82.385l-2.061-1.718-8.199.001a1 1 0 01-.98-.8l-.016-.117-.108-1.284 8.058.001a2 2 0 001.976-1.692l.018-.155L14.293 4H15zm-2.48-4a1 1 0 011 1l-.003.077-.646 8.4a1 1 0 01-.997.923l-8.994-.001-2.06 1.718a.5.5 0 01-.233.108l-.087.007a.5.5 0 01-.492-.41L0 11.732V1a1 1 0 011-1h11.52zM3.646 4.246a.5.5 0 000 .708c.305.304.694.526 1.146.682A4.936 4.936 0 006.4 5.9c.464 0 1.02-.062 1.608-.264.452-.156.841-.378 1.146-.682a.5.5 0 10-.708-.708c-.185.186-.445.335-.764.444a4.004 4.004 0 01-2.564 0c-.319-.11-.579-.258-.764-.444a.5.5 0 00-.708 0z"></path></g></svg>
                                    CHAT NOW
                                </button>
                                <Link className=" btn-light btn-m item-center" to={shop.shop_url}>
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
                        {state.data !=null && state.data.item_detail.length>0?
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
                                {Object.keys(state.data.item_detail[0]).map((item,i)=>{
                                if(state.data.item_detail[0][item]!=null && !item.includes('id')){
                                    return(
                                    <div className="_1pEVDa">
                                        <label className="_1A0RCW">{item}</label>
                                        <div>{state.data.item_detail[0][item]}</div>
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
                                    <div>{state.data.item_inventory}</div>
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
                                <p className="_2Y002L">{state.data.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="page-product__content--right">
                    <div className="display: contents">
                        {state.data.voucher.length>0?
                        <div className="product-shop-vouchers page-product__shop-voucher">
                            <div className="product-shop-vouchers__header">Mã giảm giá của Shop</div>
                            <div className="product-shop-vouchers__list" style={{maxHeight: '23.25rem'}}>
                                {state.data.voucher.map(vocher=>
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
                                                <div>
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
                        <a className="item-card-special__link product-shop-hot-sales__item" href={item.item_url}>
                            <div className="item-card-special">
                                <div className="item-card-special__img">
                                    <div className="lazy-image__container item-card-special__img-background">
                                        <div className="lazy-image__image" style={{backgroundImage: `url(${item.item_image})`}}></div>
                                    </div>
                                </div>
                                <div className="item-card-special__lower-padding">
                                    <div className="item-card-special__name item-card-special__name--special">🔥{item.item_name}</div>
                                    <div className="item-card-special__section-price item-card-special__section-price--special">
                                        <div className="item-card-special__current-price item-card-special__current-price--special">₫{formatter.format(item.min_price*(100-item.percent_discount))} {item.max_price!=item.min_price?`₫${formatter.format(item.max_price*(100-item.percent_discount))}`:''}</div>
                                    </div>
                                </div>
                            </div>
                        </a>)}
                    </div>
                </div>
                </div></>:''}
                <div className="product-ratings">
                    {listreview!=null?<>
                    <div className="product-ratings__header">ĐÁNH GIÁ SẢN PHẨM</div>
                    <div className="product-rating-overview">
                        <div className="product-rating-overview__briefing">
                            <div className="product-rating-overview__score-wrapper">
                                <span className="product-rating-overview__rating-score">{state.data.review_rating.toFixed(1)}</span>
                                <span className="product-rating-overview__rating-score-out-of"> trên 5 </span>
                            </div>
                            <div className="rating-stars product-rating-overview__stars">
                                <div className="rating-stars__stars">
                                    {rating(6,state.data)}
                                </div>
                            </div>
                        </div>
                        <div className="product-rating-overview__filters">
                            {list_review_choice(5).map(item=>
                                <div onClick={()=>showreview(item.value,item.keys)} className={`product-rating-overview__filter ${item.value===state.review_choice?'product-rating-overview__filter--active':''} `}>{item.name} {item.keys==='all'?'':`(${item.keys==='comment'?state.has_comment:item.keys==='media'?state.has_media:state.rating.filter(i=>item.value==i).length})`}</div>
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
                                        <a className="product-rating__author-name" href={review.url_shop}>{review.rating_anonymous?review.user.substr(0,1)+hidestring(review.user)+review.user.substr(-1):review.user}</a>
                                        :
                                        <div className="product-rating__author-name">{review.rating_anonymous?review.user.substr(0,1)+hidestring(review.user)+review.user.substr(-1):review.user}</div>}
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
                                                        <div onClick={()=>showmedia(file,review)} className={`rating-media-list__image-wrapper rating-media-list__image-wrapper--${file.show?'':'in'}active`}>
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
                                                    <div className="rating-media-list-image-carousel" style={{transition: 'all 500ms ease 0s', width: '520px'}}>
                                                        <div className="rating-media-list-image-carousel__item-list-wrapper">
                                                            <ul className="rating-media-list-image-carousel__item-list" ref={previewimage} style={{marginLeft: `${-530*review.list_file.indexOf(review.list_file.find(item=>item.show))}px`, marginTop: '0px',transition:'all 500ms ease 0s'}}>
                                                                {review.list_file.map(file=>
                                                                    <li key={file.id} className="rating-media-list-image-carousel__item rating-media-list-image-carousel__item--fluid" style={{padding: '0px 0.625rem'}}>
                                                                        {file.filetype==='video'?
                                                                        <div className="_43iTyw">
                                                                            <video src={file.file} controls="" className="_12mVqG rating-media-list__zoomed-video-item" controlsList="nodownload"></video>
                                                                        </div>:<img className="rating-media-list__zoomed-image-item" src={file.file}/>}
                                                                    </li>
                                                                )}
                                                            </ul>
                                                        </div>
                                                        <div onClick={()=>showmedia(review.list_file[review.list_file.indexOf(review.list_file.find((file,i)=>file.show))-1],review)} className="rating-media-list-carousel-arrow rating-media-list-carousel-arrow--prev rating-media-list-carousel-arrow--hint rating-media-list-carousel-arrow--hidden" role="button" tabIndex="0" style={{opacity: 1, visibility: `${review.list_file.findIndex(file=>file.show)===0?'hidden':''}`, transform: 'translateX(calc(-50% + 0px))'}}>
                                                            <svg enableBackground="new 0 0 13 20" viewBox="0 0 13 20" x="0" y="0" className="svg-icon icon-arrow-left-bold"><polygon points="4.2 10 12.1 2.1 10 -.1 1 8.9 -.1 10 1 11 10 20 12.1 17.9"></polygon></svg>
                                                        </div>
                                                        <div onClick={()=>showmedia(review.list_file[review.list_file.indexOf(review.list_file.find((file,i)=>file.show))+1],review)} className="rating-media-list-carousel-arrow rating-media-list-carousel-arrow--next rating-media-list-carousel-arrow--hint" role="button" tabIndex="0" style={{opacity: 1, visibility: `${review.list_file.findIndex(file=>file.show)===(review.list_file.length-1)?'hidden':'visible'}`, transform: 'translateX(calc(50% - 0px))'}}>
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
                                                <div onClick={(e)=>setlikereview(e,review)} className={`product-rating__like-button ${user!=null&&review.user_like.some(item=>item==user.id)?'product-rating__like-button--liked':''}`}>
                                                    <svg width="14px" height="13px" viewBox="0 0 14 13" version="1.1" xmlns="http://www.w3.org/2000/svg"><defs></defs><g stroke="none" strokeWidth="1" fillRule="evenodd"><g id="Product-Ratings-Working" transform="translate(-245.000000, -855.000000)" fillRule="nonzero"><g transform="translate(155.000000, 92.000000)"><g transform="translate(40.000000, 184.000000)"><g transform="translate(0.000000, 326.000000)"><g transform="translate(50.000000, 253.000000)"><g><path d="M0,12.7272727 L2.54545455,12.7272727 L2.54545455,5.09090909 L0,5.09090909 L0,12.7272727 Z M14,5.72727273 C14,5.02727273 13.4272727,4.45454545 12.7272727,4.45454545 L8.71818182,4.45454545 L9.35454545,1.52727273 L9.35454545,1.33636364 C9.35454545,1.08181818 9.22727273,0.827272727 9.1,0.636363636 L8.4,0 L4.2,4.2 C3.94545455,4.39090909 3.81818182,4.70909091 3.81818182,5.09090909 L3.81818182,11.4545455 C3.81818182,12.1545455 4.39090909,12.7272727 5.09090909,12.7272727 L10.8181818,12.7272727 C11.3272727,12.7272727 11.7727273,12.4090909 11.9636364,11.9636364 L13.8727273,7.44545455 C13.9363636,7.31818182 13.9363636,7.12727273 13.9363636,7 L13.9363636,5.72727273 L14,5.72727273 C14,5.79090909 14,5.72727273 14,5.72727273 Z"></path></g></g></g></g></g></g></g></svg>
                                                </div>
                                                <div className="product-rating__like-count">{review.num_like==0?'hữu ích':review.num_like}</div>
                                            </div>
                                            <div className='d-flex'>
                                                <div className="product-rating__report-menu-button">
                                                    <div className="stardust-dropdown">
                                                        <div onClick={(e)=>setrequestreport(e,review)} className="stardust-dropdown__item-header">
                                                            <div>
                                                                <svg width="4px" height="16px" viewBox="0 0 4 16" version="1.1" xmlns="http://www.w3.org/2000/svg"><defs></defs><g stroke="none" strokeWidth="1" fillRule="evenodd"><g transform="translate(-1301.000000, -550.000000)" fill="#CCCCCC"><g transform="translate(155.000000, 92.000000)"><g transform="translate(40.000000, 184.000000)"><g transform="translate(0.000000, 161.000000)"><g><g transform="translate(50.000000, 2.000000)"><path d="M1058,122.2 C1056.895,122.2 1056,123.096 1056,124.2 C1056,125.306 1056.895,126.202 1058,126.202 C1059.104,126.202 1060,125.306 1060,124.2 C1060,123.096 1059.104,122.2 1058,122.2 M1058,116.6 C1056.895,116.6 1056,117.496 1056,118.6 C1056,119.706 1056.895,120.602 1058,120.602 C1059.104,120.602 1060,119.706 1060,118.6 C1060,117.496 1059.104,116.6 1058,116.6 M1058,111 C1056.895,111 1056,111.896 1056,113 C1056,114.106 1056.895,115.002 1058,115.002 C1059.104,115.002 1060,114.106 1060,113 C1060,111.896 1059.104,111 1058,111"></path></g></g></g></g></g></g></g></svg>
                                                            </div>
                                                        </div>
                                                        <div className={`stardust-dropdown__item-body ${review.request_report?'stardust-dropdown__item-body--open':''}`} style={{opacity:review.request_report?1:0}}>
                                                            <div onClick={(e)=>setreport(e,review)} className="product-rating__report-menu-dropdown">báo cáo</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
