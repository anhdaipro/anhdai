import axios from 'axios';
import React, {useState, useEffect,useCallback,memo,useRef} from 'react'
import { headers } from '../actions/auth';
import {formatter,itemvariation,hidestring,list_review_text_star,
star_solid,star_empty,dataURLtoFile,rating_score,list_rating_category_bab,list_reason_cancel} from "../constants"
import {threadlURL,purchaselistdURL,localhost, reviewURL,} from "../urls"
const Listreview=({order_choice,cancel,list_orders,setcancel,show,list_review,user,setshow,updateorder,
    edit,setedit,list_cartitem,setcartitem,setChoice,setlistreview})=>{
    const [state, setState] = useState({loading:false,review:null,submit:false,
    reason_choice:null});
    const [submit,setSubmit]=useState(false)
  
    const [showinfo,setShowinfo]=useState(false)
    const [showdata,setShowdata]=useState(false)
    const inforef=useRef()
    const [statusreview,setStatusreview]=useState(false)
    const [preview,setPreview]=useState({width:520,index:0})
    useEffect(()=>{
        setShowdata(show)
    },[show])

    function rating_score_main(number,item){
        return Array(number).fill().map((_,k)=>{
            if(item.review_rating){
                <div onClick={(e)=>rating_choice(e,k,item)} className="rating-stars__star rating-stars__star--clickable _2Jb05n" style={{width: '36px', height: '36px'}}>{k<=item.review_rating ?star_solid:star_empty}</div>
            }
            else{
                <div onClick={(e)=>rating_choice(e,k,item)} className="rating-stars__star rating-stars__star--clickable _2Jb05n" style={{width: '36px', height: '36px'}}>{star_empty}</div>
            }
        })
    }

    function rating_score_bad(number,item,i){
        return Array(number).fill().map((_,k)=>{
            if(item.review_rating!=undefined){
                return(<div onClick={(e)=>rating_choice_bad(e,k,item,i)} className="rating-stars__star rating-stars__star--clickable _2Jb05n" style={{width: '26px', height: '26px'}}>{k<=item.rating_bab_category[i]?star_solid:star_empty}</div>)
            }
            else{
                return(<div onClick={(e)=>rating_choice_bad(e,k,item,i)} className="rating-stars__star rating-stars__star--clickable _2Jb05n" style={{width: '26px', height: '26px'}}>{star_empty}</div>)
            }
        })
        
    }
    
    useEffect(() => {
        document.addEventListener('click', handleClick)
        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [])

    const handleClick = (event) => {
        const { target } = event
        if(inforef.current!=null){
            if (!inforef.current.contains(target)) {
                setShowinfo(false)
            }
        }
    }

    const editreview=(e,review)=>{
        e.stopPropagation()
        setedit(true)
        const video=review.list_file.find(file=>file.filetype=='video')?review.list_file.find(file=>file.filetype=='video'):null
        const list_image=review.list_file.filter(file=>file.filetype!='video')
        const list_text=review.review_text.split(',').filter(it=>it!='')
        setState({...state,review:{list_text:list_text,list_image:list_image,video:video}})
    }

    
    function rating_choice(e,k,item){
        e.stopPropagation()
        const list_text=item.review_text.split(',').filter(it=>it!='')
        item.list_text=list_text
        item.review_rating=k
        if(item==state.review){
            setState({...state,review:item})
        }
        else{
            setChoice(item)
        }
    }

    function rating_choice_bad(e,k,item,i){
        e.stopPropagation()
        item.rating_bab_category[i]=k
        if(item==state.review){
            setState({...state,review:item})
        }
        else{
            setChoice(item)
        }
    }

    const previewFile=(e,item)=>{
        [].forEach.call(e.target.files, function(file) {
            e.stopPropagation()
            if ((/image\/.*/.test(file.type))){
                
                // convert image file to base64 string
                item.list_image.push({file:(window.URL || window.webkitURL).createObjectURL(file),file_choice:file,duration:0,file_preview:null,id:item.id})
                if(item==state.review){
                    setState({...state,review:item})
                }
                else{
                    setChoice(item)
                }
            }
            else{ 
                var url = (window.URL || window.webkitURL).createObjectURL(file);
                var video = document.createElement('video');
                video.src = url;
                video.addEventListener('loadeddata', e =>{
                    video.currentTime=1
                });
                video.addEventListener('timeupdate',e=>{
                    let canvas = document.createElement('canvas');
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
                    let image = canvas.toDataURL("image/png");
                    let file_preview = dataURLtoFile(image,'dbc9a-rg53.png');
                    item.video={filetype:'video',file_choice:file,id:item.id,media_preview:image,file_preview:file_preview,duration:video.duration}
                    if(item==state.review){
                        setState({...state,review:item})
                    }
                    else{
                        setChoice(item)
                    } 
                })
                video.preload = 'metadata';
                // Load video in Safari / IE11
                video.muted = true;
                video.playsInline = true;
                }
            })
    }

    console.log(list_cartitem)
    function setopenreview(e){
        e.stopPropagation()
        setShowdata(false)
        setedit(false)
        setState({...state,review:null})
    }

    function setclosereview(e){
        e.stopPropagation()
        setShowdata(false)
        setedit(false)
        setState({...state,review:null})
        setcartitem(null)
    }

    function removevideo(e,item){
        e.stopPropagation()
        item.video=null
        if(item==state.review){
            setState({...state,review:item})
        }
        else{
            setChoice(item)
        }
    }

    function removeimage(e,image,item){
        e.stopPropagation()
        const array =item.list_image.filter(img=>img.file!=image.file)
        item.list_image=array
        if(item==state.review){
            setState({...state,review:item})
        }
        else{
            setChoice(item)
        }
    }

    function infomoreReview(e,item){
        e.stopPropagation()
        item.info_more=e.target.value
        if(item==state.review){
            setState({...state,review:item})
        }
        else{
            setChoice(item)
        }
    }

    function setanonymous(e,item){
        e.stopPropagation()
        item.anonymous_review=!item.anonymous_review
        if(item==state.review){
            setState({...state,review:item})
        }
        else{
            setChoice(item)
        }
    }

    function setreviewtext(e,item,text){
        e.stopPropagation()
        e.target.classList.toggle('_3XOOTd')
        if(e.target.classList.contains('_3XOOTd')){
            if(!item.list_text.includes(text)){
                item.list_text.push(text)
            }
        }
        else{
            const list_text=item.list_text.filter(tex=>text!=tex)
            item.list_text=list_text
        }
        
        if(item==state.review){
            setState({...state,review:item})
        }
        else{
            setChoice(item)
        }
    }

    const submitreview=(e)=>{
        e.stopPropagation()
        let form=new FormData()
        if (state.review){
            form.append('action','update')
            form.append('review_rating',state.review.review_rating)
            form.append('anonymous_review',state.review.anonymous_review)
            form.append('review_text',state.review.list_text)
            form.append('rating_bab_category',state.review.rating_bab_category)
            form.append('info_more',state.review.info_more)
            if(state.review.video){
                if(state.review.video.file_choice){
                    form.append('video_preview',state.review.video.file_preview)
                    form.append('video',state.review.video.file_choice)
                    form.append('duration',state.review.video.duration)
                }
                form.append('file_id',state.review.video.id)
            }
            state.review.list_image.map(image=>{
                if(image.file_choice){
                    form.append('image',image.file_choice)
                }
                form.append('file_id',image.id)
            })
            axios.post(`${reviewURL}/${state.review.id}`,form,headers)
            .then(res=>{
                setedit(false)
                setStatusreview(false)
                setlistreview(res.data)
            })
        }
        else{
            setSubmit(true)
            form.append('total_xu',receivexu())
            list_cartitem.map(cartitem=>{
                form.append('cartitem_id',cartitem.id)
                form.append('review_rating',cartitem.review_rating)
                form.append('anonymous_review',cartitem.anonymous_review)
                form.append('review_text',cartitem.list_text)
                form.append('rating_bab_category',cartitem.rating_bab_category)
                form.append('info_more',cartitem.info_more)
                if(cartitem.video){
                    form.append('video_preview',cartitem.video.file_preview)
                    form.append('video',cartitem.video.file_choice)
                    form.append('duration',cartitem.video.duration)
                    form.append('id_video',cartitem.video.id)
                }
                cartitem.list_image.map(image=>{
                    form.append('image',image.file_choice)
                    form.append('id_image',image.id)
                })
                
            })
            if(checkvalidrating()){
                alert('Đánh giá Chất lượng sản phẩm, Dịch vụ của Người bán và Dịch vụ vận chuyển của bạn đang cao hơn đánh giá chung, vui lòng kiểm tra lại.')
            }
            else{
                axios.post(purchaselistdURL,form,headers)
                .then(res=>{
                    const orders=list_orders.map(order=>{
                        if(order.id==order_choice.id){
                            return({...order,review:true})
                        }
                        return({...order})
                    })
                    updateorder(orders)
                    setedit(false)
                    setState({...state,review:null})
                    setcartitem(null)
                    setSubmit(false)
                    setStatusreview(false)
                    setShowdata(false)  
                })
            }
        }
    }
    
    function rating_product(item){
        return(
            <div className={`rating-modal-handler__container ${(item==state.review &&state.review) || (item==list_cartitem[list_cartitem.length-1] && list_cartitem)?"rating-modal-handler__container--last":''}`}>
                <a className="c1C69v _1uii4D" href={`${item.url}?itemId=${item.item_id}`} target="_blank" rel="noopener noreferrer">
                    <div className="image__wrapper _2ylgGg">
                        <div className="image__place-holder">
                            <svg enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className="svg-icon icon-loading-image"><g><rect fill="none" height="8" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" width="10" x="1" y="4.5"></rect><line fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="1" x2="11" y1="6.5" y2="6.5"></line><rect fill="none" height="3" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" width="3" x="11" y="6.5"></rect><line fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="1" x2="11" y1="14.5" y2="14.5"></line><line fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="6" x2="6" y1=".5" y2="3"></line><line fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="3.5" x2="3.5" y1="1" y2="3"></line><line fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="8.5" x2="8.5" y1="1" y2="3"></line></g></svg>
                        </div>
                        <div className="image__content" style={{backgroundImage: `url(${item.image})`}}>
                            <div className="image__content--blur"> </div>
                        </div>
                    </div>
                    <div className="_32UJVi">
                        <div className="_2e-TQb">{item.name}</div>
                        {itemvariation(item)!=''?<div className="_1WE6N8">Phân loại hàng: {itemvariation(item)}</div>:""}
                    </div>
                </a>
                <div className="rating-modal-handler__rating-stars-wrapper rating__stars">
                    <div className="rating-stars__container">
                        {rating_score_main(6,item)}
                    </div>
                </div>
                {item.review_rating<3 && item.review_rating>0?
                <div className="_2U_4pf">
                    <div className="_2CGEXm">Vui lòng đánh giá mức độ hài lòng của bạn cho các mục sau.</div>
                    <div className="_1REb6E">
                        {list_rating_category_bab.map((category,i)=>
                            <div className="U10Dyc">
                                <div className="DTVWp-">
                                    {list_rating_category_bab[i]}
                                </div>
                                <div className="rating-stars__container">
                                    {rating_score_bad(6,item,i)}
                                </div>
                            </div>
                        )}
                    </div>
                </div>:''}
                {item.review_rating>0?
                <>
                <div className="CIhqAx">
                    {list_review_text_star[item.review_rating-1].map(text=>
                        <span onClick={(e)=>setreviewtext(e,item,text)} className={`_336Vq- ${item.list_text.includes(text)?'_3XOOTd':''}`}>{text}</span>
                    )}
                </div>
                <div className="_1ZUFQn">
                    <textarea value={item.info_more!=''?item.info_more:''} onChange={e => infomoreReview(e,item)} className="_2t-71S" maxLength="300" placeholder="Hãy chia sẻ vì sao bạn chưa thực sự thích sản phẩm này nhé" style={{overflow: 'hidden', overflowWrap: 'break-word', height: '100px'}}></textarea>
                    <div className="_3ClA8M">
                        {item.video || item.list_image.length>0?
                            <>
                            <>
                            {item.video?
                            <div className="_2b-JH- M4LSKO" style={{backgroundImage:`url(${item.video.media_preview})`}}>
                                <button onClick={(e)=>removevideo(e,item)}>
                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path fillRule="evenodd" clip-rule="evenodd" d="M8.28268 0.908882C8.47794 0.71362 8.79452 0.71362 8.98978 0.908882L9.0908 1.0099C9.28606 1.20516 9.28606 1.52174 9.0908 1.717L1.71669 9.09112C1.52142 9.28638 1.20484 9.28638 1.00958 9.09112L0.908564 8.9901C0.713301 8.79484 0.713301 8.47826 0.908563 8.283L8.28268 0.908882Z" fill="#F6F6F6"></path><path fillRule="evenodd" clip-rule="evenodd" d="M1.00973 0.908882C1.20499 0.71362 1.52157 0.71362 1.71683 0.908882L9.09095 8.28299C9.28621 8.47826 9.28621 8.79484 9.09095 8.9901L8.98993 9.09112C8.79467 9.28638 8.47809 9.28638 8.28283 9.09112L0.908713 1.717C0.713451 1.52174 0.71345 1.20516 0.908713 1.0099L1.00973 0.908882Z" fill="#F6F6F6"></path></svg>
                                </button>
                                <div className="_29MNEg">
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><g filter="url(#filter0_d)"><path fillRule="evenodd" clip-rule="evenodd" d="M5 4C4.44772 4 4 4.44772 4 5V13C4 13.5523 4.44772 14 5 14H13C13.5523 14 14 13.5523 14 13V5C14 4.44772 13.5523 4 13 4H5ZM11.5 9C11.5 10.3807 10.3807 11.5 9 11.5C7.61929 11.5 6.5 10.3807 6.5 9C6.5 7.61929 7.61929 6.5 9 6.5C10.3807 6.5 11.5 7.61929 11.5 9ZM9 10.6667C9.92047 10.6667 10.6667 9.92047 10.6667 9C10.6667 8.07952 9.92047 7.33333 9 7.33333C8.07953 7.33333 7.33333 8.07952 7.33333 9C7.33333 9.92047 8.07953 10.6667 9 10.6667ZM18.1667 4.83333L14.8333 7.33306V10.6667L18.1667 13.1667V4.83333Z" fill="white"></path></g><defs><filter id="filter0_d" x="0" y="0" width="22.1667" height="18" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix><feOffset></feOffset><feGaussianBlur stdDeviation="2"></feGaussianBlur><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.26 0"></feColorMatrix><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"></feBlend><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"></feBlend></filter></defs></svg>
                                    <span>00:{('0'+Math.round(item.video.duration)).slice(-2)}</span>
                                </div>
                            </div>:''}
                            </>
                            <>{item.list_image.map(image=>
                                <div className="_2b-JH-" style={{backgroundImage:`url(${image.file})`}}>
                                    <button onClick={(e)=>removeimage(e,image,item)}>
                                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path fillRule="evenodd" clip-rule="evenodd" d="M8.28268 0.908882C8.47794 0.71362 8.79452 0.71362 8.98978 0.908882L9.0908 1.0099C9.28606 1.20516 9.28606 1.52174 9.0908 1.717L1.71669 9.09112C1.52142 9.28638 1.20484 9.28638 1.00958 9.09112L0.908564 8.9901C0.713301 8.79484 0.713301 8.47826 0.908563 8.283L8.28268 0.908882Z" fill="#F6F6F6"></path><path fillRule="evenodd" clip-rule="evenodd" d="M1.00973 0.908882C1.20499 0.71362 1.52157 0.71362 1.71683 0.908882L9.09095 8.28299C9.28621 8.47826 9.28621 8.79484 9.09095 8.9901L8.98993 9.09112C8.79467 9.28638 8.47809 9.28638 8.28283 9.09112L0.908713 1.717C0.713451 1.52174 0.71345 1.20516 0.908713 1.0099L1.00973 0.908882Z" fill="#F6F6F6"></path></svg>
                                    </button>
                                </div>
                            )}
                            {item.list_image.length<5?<>
                            <label  className="_2WUX_c">
                                <svg width="20" height="18" viewBox="0 0 20 18" fill="none"><path fillRule="evenodd" clip-rule="evenodd" d="M6.15377 9.76902C6.15377 11.8927 7.87492 13.6152 9.99992 13.6152C12.1236 13.6152 13.8461 11.8927 13.8461 9.76902C13.8461 7.64466 12.1236 5.92286 9.99992 5.92286C7.87492 5.92286 6.15377 7.64466 6.15377 9.76902ZM5 9.76902C5 7.00777 7.23813 4.76902 10 4.76902C12.7613 4.76902 15 7.00777 15 9.76902C15 12.5296 12.7613 14.769 10 14.769C7.23813 14.769 5 12.5296 5 9.76902ZM1.15385 17.2607C0.489784 17.2607 0 16.725 0 16.0662V4.12224C0 3.4623 0.489784 2.84596 1.15385 2.84596H4.61538L5.21635 1.73273C5.21635 1.73273 5.75421 0.538269 6.41827 0.538269H13.5817C14.2452 0.538269 14.7837 1.73273 14.7837 1.73273L15.3846 2.84596H18.8462C19.5096 2.84596 20 3.4623 20 4.12224V16.0662C20 16.725 19.5096 17.2607 18.8462 17.2607H1.15385Z" fill="black" fill-opacity="0.26"></path></svg>
                                <span className="_1XedQJ">{5-item.list_image.length}/5</span>
                                <input onChange={(e)=>previewFile(e,item)} className="_2M9Egi" type="file" multiple="" accept="image/*"/>
                            </label></>:''}
                            {!item.video?<>
                            <label onclick={(e)=>previewFile(e,item)} className="_2WUX_c">
                                <svg width="20" height="15" viewBox="0 0 20 15" fill="none"><path fillRule="evenodd" clip-rule="evenodd" d="M1 0.0769348C0.447715 0.0769348 0 0.52465 0 1.07693V13.1946C0 13.7469 0.447715 14.1946 1 14.1946H13.1176C13.6699 14.1946 14.1176 13.7469 14.1176 13.1946V1.07693C14.1176 0.52465 13.6699 0.0769348 13.1176 0.0769348H1ZM10.5883 7.13563C10.5883 9.08487 9.00811 10.665 7.05887 10.665C5.10963 10.665 3.52946 9.08487 3.52946 7.13563C3.52946 5.18639 5.10963 3.60622 7.05887 3.60622C9.00811 3.60622 10.5883 5.18639 10.5883 7.13563ZM7.05916 9.48865C8.35865 9.48865 9.4121 8.4352 9.4121 7.13571C9.4121 5.83622 8.35865 4.78277 7.05916 4.78277C5.75966 4.78277 4.70622 5.83622 4.70622 7.13571C4.70622 8.4352 5.75966 9.48865 7.05916 9.48865ZM20.0003 1.25344L15.2944 4.78247V9.48873L20.0003 13.0181V1.25344Z" fill="black" fill-opacity="0.26"></path></svg>
                                <span className="_1XedQJ">1/1</span>
                                <input onChange={(e)=>previewFile(e,item)} className="_2M9Egi" type="file" accept="video/mp4"/>
                            </label></>:''}
                            </>
                            </>
                        :
                        <>
                        <label className="_3AOFq8">
                            <svg width="20" height="18" viewBox="0 0 20 18" fill="none"><path fillRule="evenodd" clip-rule="evenodd" d="M6.15377 9.76895C6.15377 11.8927 7.87492 13.6151 9.99992 13.6151C12.1236 13.6151 13.8461 11.8927 13.8461 9.76895C13.8461 7.6446 12.1236 5.9228 9.99992 5.9228C7.87492 5.9228 6.15377 7.6446 6.15377 9.76895ZM5 9.76896C5 7.00771 7.23813 4.76896 10 4.76896C12.7613 4.76896 15 7.00771 15 9.76896C15 12.5296 12.7613 14.769 10 14.769C7.23813 14.769 5 12.5296 5 9.76896ZM1.15385 17.2606C0.489784 17.2606 0 16.7249 0 16.0662V4.12218C0 3.46224 0.489784 2.8459 1.15385 2.8459H4.61538L5.21635 1.73267C5.21635 1.73267 5.75421 0.538208 6.41827 0.538208H13.5817C14.2452 0.538208 14.7837 1.73267 14.7837 1.73267L15.3846 2.8459H18.8462C19.5096 2.8459 20 3.46224 20 4.12218V16.0662C20 16.7249 19.5096 17.2606 18.8462 17.2606H1.15385Z" fill="#EE4D2D"></path></svg>
                            <span className="_1XedQJ">Thêm Hình ảnh</span>
                            <input className="_2M9Egi" onChange={(e)=>previewFile(e,item)} type="file" accept="image/*"/>
                        </label>
                        <label className="_3AOFq8">
                            <svg width="20" height="15" viewBox="0 0 20 15" fill="none"><path fillRule="evenodd" clip-rule="evenodd" d="M1 0.0769043C0.447715 0.0769043 0 0.524619 0 1.0769V13.1945C0 13.7468 0.447715 14.1945 1 14.1945H13.1176C13.6699 14.1945 14.1176 13.7468 14.1176 13.1945V1.0769C14.1176 0.52462 13.6699 0.0769043 13.1176 0.0769043H1ZM10.5883 7.1356C10.5883 9.08484 9.00811 10.665 7.05887 10.665C5.10963 10.665 3.52946 9.08484 3.52946 7.1356C3.52946 5.18636 5.10963 3.60619 7.05887 3.60619C9.00811 3.60619 10.5883 5.18636 10.5883 7.1356ZM7.05916 9.48862C8.35865 9.48862 9.4121 8.43517 9.4121 7.13568C9.4121 5.83619 8.35865 4.78274 7.05916 4.78274C5.75966 4.78274 4.70622 5.83619 4.70622 7.13568C4.70622 8.43517 5.75966 9.48862 7.05916 9.48862ZM20.0003 1.25341L15.2944 4.78244V9.4887L20.0003 13.0181V1.25341Z" fill="#EE4D2D"></path></svg>
                            <span className="_1XedQJ">Thêm Video</span>
                            <input onChange={(e)=>previewFile(e,item)} className="_2M9Egi" type="file" accept="video/mp4"/>
                        </label>
                        </>
                        }
                    </div>
                    {item!=state.review?<div className="_2RDJL3">{item.info_more.length>=50?item.video||item.list_image.length>0? `Gửi đánh giá để nhận ${item.video&&item.list_image.length>0?'200 Xu!':'100 Xu'}  ${item.video&&item.list_image.length==0 || !item.video&&item.list_image.length>0?`hoặc thêm 1 ${!item.video&&item.list_image.length>0?'video':'hình ảnh'} để nhận 200 Xu`:''}`:"Thêm 1 hình ảnh và 1 video để nhận 200 Xu":`Thêm ${50-item.info_more.length} ký tự và ${item.list_image.length==0?'1 hinh anh':''} ${!item.video?'và 1 video':''} để nhận 200 Xu`}</div>:''}
                </div>
                <div className="rating-modal-handler__rating-anonymous-wrapper">
                    <label className={`stardust-checkbox ${item.anonymous_review?'stardust-checkbox--checked':''}`}>
                        <input onChange={e=>(setanonymous(e,item))} className="stardust-checkbox__input" type="checkbox"/>
                        <div className="stardust-checkbox__box"></div>
                    </label>
                    <div onClick={e=>(setanonymous(e,item))} style={{marginLeft: '4px'}}>
                        <div className="rating-modal-handler__rating-anonymous-hint">Đánh giá ẩn danh</div>
                        <div className="rating-modal-handler__rating-anonymous-username">Tên tài khoản sẽ được hiển thị như {item.anonymous_review?`${user.username.substr(0,1)}${hidestring(user.username)}${user.username.substr(-1)}`:`${user.username}`}</div>
                    </div>
                </div>
                </>:''}
            </div>
        )
    }

    function setopenmodal(e){
        setedit(false)
        setState({...state,review:null})
        setcartitem(null)
        setSubmit(false)
        setShowdata(false)
    }

    function receivexu(){
        let total_xu=0
        list_cartitem.map(cartitem=>{
            if(cartitem.info_more.length>=50){
                if(cartitem.video&& cartitem.list_image.length>0){
                    total_xu+=200
                }
                else if(cartitem.video&& cartitem.list_image.length==0 ||!cartitem.video&& cartitem.list_image.length>0){
                    total_xu+=100
                }
            }
        })
        return total_xu
    }
    
    function checkdisable(){
        let disable=false
        if(state.review){
            if(state.review.review_rating<3){
                if(state.review.rating_bab_category.some(category=>category==0)|| state.review.rating_bab_category.every(category=>category>2)){
                    disable=true
                }
            }
        }
        if(list_cartitem){
            const list_valid=list_cartitem.filter(item=>item.review_rating==0)
            if(list_valid.length>0){
                disable=true
            }

            const valid_bab=list_cartitem.filter(item=>(item.review_rating<3 && item.rating_bab_category.some(category=>category==0)||(item.review_rating<3 && item.rating_bab_category.every(category=>category>2))))
            if(valid_bab.length>0){
                disable=true
            }
        }
        return disable
    }

    function checkvalidrating(){
        let errow=false
        if(state.review){
            if(state.review.review_rating<3 && state.review.rating_bab_category.every(category=>category>2)){
                errow=true
            }
        }
        if(list_cartitem){
            const valid_bab=list_cartitem.filter(item=>item.review_rating<3 && item.rating_bab_category.every(category=>category>2))
            if(valid_bab.length>0){
                errow=true
            }
        }
        return errow
    }

    function showmedia(e,item,index,review){
        const list_files=review.list_file.map(file=>{
            if (item.file_id==file.file_id){
                return({...file,show:!file.show})
            }
            else{
                return({...file,show:false})
            }
        })
        setPreview({width:520,index:index})
        review.list_file=list_files
        setlistreview(review)
    }

    const completecancel=()=>{
        let form=new FormData()
        form.append('order_id',order_choice.id)
        form.append('reason',state.reason_choice)
        
        const orders=list_orders.map(order=>{
            if(order.id==order_choice.id){
                return({...order,canceled:true})
            }
            return({...order})
        })
        updateorder(orders)
        setcancel(false)
        axios.post(purchaselistdURL,form,headers)
        .then(res=>{
            
        })  
    }
    return(
        <>
        {showdata?
        <div className='popup modal__transition-enter-done'>
            <div className="popup__overlay"></div>
            <div className="popup__container">
                {submit && list_cartitem?
                <>
                {receivexu()>0?<>
                <div className="rONIza">
                    <svg enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className="svg-icon WVSFfJ "><linearGradient id="coingold-a" gradientTransform="matrix(1 0 0 -1 0 -810.11)" gradientUnits="userSpaceOnUse" x1="2.9694" x2="12.0447" y1="-811.8111" y2="-823.427"><stop offset="0" stopColor="#f6c430"></stop><stop offset=".5281" stopColor="#ffecaa"></stop><stop offset=".6639" stopColor="#fdde82"></stop><stop offset=".9673" stopColor="#f7bc1e"></stop><stop offset="1" stopColor="#f6b813"></stop></linearGradient><linearGradient id="coingold-b" gradientTransform="matrix(1 0 0 -1 0 -810.11)" gradientUnits="userSpaceOnUse" x1="7.5" x2="7.5" y1="-810.2517" y2="-824.9919"><stop offset="0" stopColor="#e49b00"></stop><stop offset=".9416" stopColor="#d67b00"></stop><stop offset="1" stopColor="#d57900"></stop></linearGradient><linearGradient id="coingold-c" gradientTransform="matrix(1 0 0 -1 0 -810.11)" gradientUnits="userSpaceOnUse" x1="4.0932" x2="10.9068" y1="-813.5499" y2="-821.6702"><stop offset="0" stopColor="#f99d00"></stop><stop offset=".1752" stopColor="#eea10b"></stop><stop offset=".5066" stopColor="#fcd21f"></stop><stop offset=".6657" stopColor="#f2ba10"></stop><stop offset="1" stopColor="#d57900"></stop></linearGradient><linearGradient id="coingold-d" gradientUnits="userSpaceOnUse" x1="5.4204" x2="9.7379" y1="5.0428" y2="10.188"><stop offset="0" stopColor="#ffec88"></stop><stop offset=".5003" stopColor="#fdf4cb"></stop><stop offset=".7556" stopColor="#fceba4"></stop><stop offset="1" stopColor="#fae17a"></stop></linearGradient><g><circle cx="7.5" cy="7.5" fill="url(#coingold-a)" r="7.4"></circle><path d="m7.5.4c3.9 0 7.1 3.2 7.1 7.1s-3.2 7.1-7.1 7.1-7.1-3.2-7.1-7.1 3.2-7.1 7.1-7.1m0-.3c-4.1 0-7.4 3.3-7.4 7.4s3.3 7.4 7.4 7.4 7.4-3.3 7.4-7.4-3.3-7.4-7.4-7.4z" fill="url(#coingold-b)"></path><path d="m14.4 7.7c0-.1 0-.1 0-.2 0-3.8-3.1-6.9-6.9-6.9s-6.9 3.1-6.9 6.9v.2c.1-3.7 3.1-6.7 6.9-6.7s6.8 3 6.9 6.7z" fill="#fff5c9"></path><circle cx="7.5" cy="7.5" fill="url(#coingold-c)" r="5.3"></circle><path d="m11.4 4c1.1 1 1.8 2.4 1.8 3.9 0 2.9-2.4 5.3-5.3 5.3-1.6 0-3-.7-3.9-1.8.9.8 2.2 1.4 3.5 1.4 2.9 0 5.3-2.4 5.3-5.3 0-1.4-.5-2.6-1.4-3.5z" fill="#ffeead"></path><path d="m11.4 4c-1-1.1-2.4-1.8-3.9-1.8-2.9 0-5.3 2.4-5.3 5.3 0 1.6.7 3 1.8 3.9-.8-.9-1.4-2.2-1.4-3.5 0-2.9 2.4-5.3 5.3-5.3 1.4 0 2.6.5 3.5 1.4z" fill="#c97201"></path><path d="m6.2 4.8c-.5.4-.6 1.1-.5 1.7.1.5.5 1 1.1 1.3.7.4 2.4.8 2.4 1.7 0 .2-.1.5-.2.6-.3.4-.8.5-1.3.5-.3 0-.7-.1-1-.2s-.6-.3-.9-.5c-.2-.1-.4 0-.5.1-.1.2 0 .4.1.5.5.4 1 .7 1.7.8.6.1 1.3.1 1.8-.2.5-.2.9-.6 1-1.2s-.1-1.2-.5-1.6c-.5-.5-2-1-2.4-1.3-.3-.2-.6-.5-.6-1 .1-.6.5-.9 1.1-.9.5 0 1.1.1 1.6.4.4.3.8-.4.4-.7-1-.6-2.5-.7-3.3 0z" fill="#c67830"></path><path d="m6.1 4.5c-.5.4-.6 1.1-.5 1.7.1.5.5 1 1.1 1.3.7.4 2.4.8 2.4 1.7 0 .2-.1.5-.2.6-.3.4-.8.5-1.3.5-.3 0-.7-.1-1-.2s-.6-.3-.9-.5c-.2-.1-.4 0-.5.1-.1.2 0 .4.1.5.5.4 1 .7 1.7.8.6.1 1.3.1 1.8-.2.5-.2.9-.6 1-1.2s-.2-1.2-.6-1.6c-.5-.5-1.9-1-2.3-1.3-.3-.2-.6-.5-.6-1 .1-.6.5-.9 1.1-.9.5 0 1.1.1 1.6.4.4.3.8-.4.4-.7-1-.6-2.5-.7-3.3 0z" fill="url(#coingold-d)"></path></g></svg>
                    <div className="_2zzhaB">Chúc mừng bạn đã được tặng {receivexu()} Anhdai Xu</div>
                </div>
                <div onClick={(e)=>setopenmodal(e)} className="popup__close-btn">
                    <svg enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0" className="svg-icon "><path d="m10.7 9.2-3.8-3.8 3.8-3.7c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0l-3.8 3.7-3.8-3.7c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l3.8 3.7-3.8 3.8c-.4.4-.4 1 0 1.4.2.2.5.3.7.3.3 0 .5-.1.7-.3l3.8-3.8 3.8 3.8c.2.2.4.3.7.3s.5-.1.7-.3c.4-.4.4-1 0-1.4z"></path></svg>
                </div></>:<>
                <div className="_1rm71c">
                    <svg width="54" height="54" viewBox="0 0 54 54" fill="none" className="_1SGlmP"><path fillRule="evenodd" clip-rule="evenodd" d="M27 53C41.3594 53 53 41.3594 53 27C53 12.6406 41.3594 1 27 1C12.6406 1 1 12.6406 1 27C1 41.3594 12.6406 53 27 53Z" stroke="#66CC00" strokeWidth="2"></path><path fillRule="evenodd" clip-rule="evenodd" d="M26.7985 36.098L40.3628 22.263C41.273 21.3528 41.1992 19.8032 40.198 18.802C39.1968 17.8008 37.6472 17.727 36.737 18.6372L24.7717 30.8413L17.263 24.0774C16.3528 23.1672 14.8032 23.241 13.802 24.2422C12.8008 25.2435 12.727 26.7931 13.6372 27.7033L23.2458 36.3588C24.156 37.269 25.7056 37.1952 26.7069 36.194C26.7383 36.1625 26.7689 36.1305 26.7985 36.098Z" fill="#66CC00"></path></svg>
                    <div className="_3tAb1N">Cảm ơn bạn đã đánh giá!</div>
                </div>
                <div onClick={(e)=>setopenmodal(e)} className="popup__close-btn">
                <svg enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0" className="svg-icon "><path d="m10.7 9.2-3.8-3.8 3.8-3.7c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0l-3.8 3.7-3.8-3.7c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l3.8 3.7-3.8 3.8c-.4.4-.4 1 0 1.4.2.2.5.3.7.3.3 0 .5-.1.7-.3l3.8-3.8 3.8 3.8c.2.2.4.3.7.3s.5-.1.7-.3c.4-.4.4-1 0-1.4z"></path></svg>
                </div></>}
                </>
                :
                <div className="popup-form _2qWNLV">
                    <div className="popup-form__header">
                        <div className="popup-form__title">
                            {edit?<>
                            {state.review?
                            <div onClick={e=>setedit(false)} className="popup-form__back-btn">
                                <svg height="17" width="21" className="svg-icon icon-back icon-back-to-home"><path d="M3.043 9.3h16.693a.749.749 0 1 0 0-1.5H3.041l5.64-5.639a.753.753 0 0 0 .004-1.066.752.752 0 0 0-1.066.005L.718 8.002a.758.758 0 0 0-.224.533.759.759 0 0 0 .224.561l6.901 6.902a.753.753 0 0 0 1.066.005.752.752 0 0 0-.005-1.066z" fill="#000" fillOpacity=".26" fillRule="evenodd"></path></svg>
                            </div>:''}
                            Đánh giá sản phẩm</>
                            :'Đánh giá Shop'}
                        </div>
                    </div>
                    <div className="popup-form__main">
                        <div className="popup-form__main-container">
                            {statusreview && state.review?
                            <div className="_256LVu">
                                <div className="l5QcqJ">
                                    <div className="WeXJ6A">Gửi đánh giá?</div>
                                    <div className="L7Kltw">Một khi đã gửi đánh giá, bạn sẽ không thể sửa lại nữa.</div>
                                    <div className="vbw-Gz">
                                        <button onClick={e=>setStatusreview(false)} className="cancel-btn">Trở Lại</button>
                                        <button onClick={(e)=>submitreview(e)} type="button" className="btn btn-solid-primary btn--s btn--inline">Hoàn thành</button>
                                    </div>
                                </div>
                            </div>
                            :edit?
                            <>
                            <div ref={inforef} className="_2GNwsI">
                                <svg enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className="svg-icon _2avHKU ">
                                    <linearGradient id="coingold-a" gradientTransform="matrix(1 0 0 -1 0 -810.11)" gradientUnits="userSpaceOnUse" x1="2.9694" x2="12.0447" y1="-811.8111" y2="-823.427"><stop offset="0" stopColor="#f6c430"></stop><stop offset=".5281" stopColor="#ffecaa"></stop><stop offset=".6639" stopColor="#fdde82"></stop><stop offset=".9673" stopColor="#f7bc1e"></stop><stop offset="1" stopColor="#f6b813"></stop></linearGradient><linearGradient id="coingold-b" gradientTransform="matrix(1 0 0 -1 0 -810.11)" gradientUnits="userSpaceOnUse" x1="7.5" x2="7.5" y1="-810.2517" y2="-824.9919"><stop offset="0" stopColor="#e49b00"></stop><stop offset=".9416" stopColor="#d67b00"></stop><stop offset="1" stopColor="#d57900"></stop></linearGradient><linearGradient id="coingold-c" gradientTransform="matrix(1 0 0 -1 0 -810.11)" gradientUnits="userSpaceOnUse" x1="4.0932" x2="10.9068" y1="-813.5499" y2="-821.6702"><stop offset="0" stopColor="#f99d00"></stop><stop offset=".1752" stopColor="#eea10b"></stop><stop offset=".5066" stopColor="#fcd21f"></stop><stop offset=".6657" stopColor="#f2ba10"></stop><stop offset="1" stopColor="#d57900"></stop></linearGradient><linearGradient id="coingold-d" gradientUnits="userSpaceOnUse" x1="5.4204" x2="9.7379" y1="5.0428" y2="10.188"><stop offset="0" stopColor="#ffec88"></stop><stop offset=".5003" stopColor="#fdf4cb"></stop><stop offset=".7556" stopColor="#fceba4"></stop><stop offset="1" stopColor="#fae17a"></stop></linearGradient><g><circle cx="7.5" cy="7.5" fill="url(#coingold-a)" r="7.4"></circle><path d="m7.5.4c3.9 0 7.1 3.2 7.1 7.1s-3.2 7.1-7.1 7.1-7.1-3.2-7.1-7.1 3.2-7.1 7.1-7.1m0-.3c-4.1 0-7.4 3.3-7.4 7.4s3.3 7.4 7.4 7.4 7.4-3.3 7.4-7.4-3.3-7.4-7.4-7.4z" fill="url(#coingold-b)"></path><path d="m14.4 7.7c0-.1 0-.1 0-.2 0-3.8-3.1-6.9-6.9-6.9s-6.9 3.1-6.9 6.9v.2c.1-3.7 3.1-6.7 6.9-6.7s6.8 3 6.9 6.7z" fill="#fff5c9"></path><circle cx="7.5" cy="7.5" fill="url(#coingold-c)" r="5.3"></circle><path d="m11.4 4c1.1 1 1.8 2.4 1.8 3.9 0 2.9-2.4 5.3-5.3 5.3-1.6 0-3-.7-3.9-1.8.9.8 2.2 1.4 3.5 1.4 2.9 0 5.3-2.4 5.3-5.3 0-1.4-.5-2.6-1.4-3.5z" fill="#ffeead"></path><path d="m11.4 4c-1-1.1-2.4-1.8-3.9-1.8-2.9 0-5.3 2.4-5.3 5.3 0 1.6.7 3 1.8 3.9-.8-.9-1.4-2.2-1.4-3.5 0-2.9 2.4-5.3 5.3-5.3 1.4 0 2.6.5 3.5 1.4z" fill="#c97201"></path><path d="m6.2 4.8c-.5.4-.6 1.1-.5 1.7.1.5.5 1 1.1 1.3.7.4 2.4.8 2.4 1.7 0 .2-.1.5-.2.6-.3.4-.8.5-1.3.5-.3 0-.7-.1-1-.2s-.6-.3-.9-.5c-.2-.1-.4 0-.5.1-.1.2 0 .4.1.5.5.4 1 .7 1.7.8.6.1 1.3.1 1.8-.2.5-.2.9-.6 1-1.2s-.1-1.2-.5-1.6c-.5-.5-2-1-2.4-1.3-.3-.2-.6-.5-.6-1 .1-.6.5-.9 1.1-.9.5 0 1.1.1 1.6.4.4.3.8-.4.4-.7-1-.6-2.5-.7-3.3 0z" fill="#c67830"></path><path d="m6.1 4.5c-.5.4-.6 1.1-.5 1.7.1.5.5 1 1.1 1.3.7.4 2.4.8 2.4 1.7 0 .2-.1.5-.2.6-.3.4-.8.5-1.3.5-.3 0-.7-.1-1-.2s-.6-.3-.9-.5c-.2-.1-.4 0-.5.1-.1.2 0 .4.1.5.5.4 1 .7 1.7.8.6.1 1.3.1 1.8-.2.5-.2.9-.6 1-1.2s-.2-1.2-.6-1.6c-.5-.5-1.9-1-2.3-1.3-.3-.2-.6-.5-.6-1 .1-.6.5-.9 1.1-.9.5 0 1.1.1 1.6.4.4.3.8-.4.4-.7-1-.6-2.5-.7-3.3 0z" fill="url(#coingold-d)"></path></g>
                                </svg>
                                <span className="_1j_6i5">Đánh giá và nhận đến 200 Xu!</span>
                                <span onClick={(e)=>setShowinfo(!showinfo)} className="_3g8MuP">
                                    <span className="_2MTf9A"></span>
                                </span>
                                {showinfo?
                                <div className="_13tPpj" style={{top:'2.375rem'}}>
                                    <div className="_3YbzHY">
                                        <div className="_1TTw_a">Điều kiện nhận Xu</div>
                                        <div className="_1EdDt_">Viết một nhận xét về sản phẩm này. Ít nhất 50 ký tự và thêm hình ảnh hoặc video.</div>
                                    </div>
                                    <div className="_3wZAsE">
                                        <div className="_3hwWbt">Đánh giá bằng hình ảnh hoặc Video.</div>
                                        <div className="_3LmBQ1">
                                            <div style={{flex: '1 1 0%'}}>Viết nhận xét về sản phẩm này với ít nhất 1 hình ảnh hoặc 1 video.</div>
                                            <div className="_1Yh4At">100 xu</div>
                                        </div>
                                        <div className="_3LmBQ1">
                                            <div style={{flex: '1 1 0%'}}>Nhận xét với cả hình ảnh và video</div>
                                            <div className="_1Yh4At">200 xu</div>
                                        </div>
                                    </div>
                                    <div className="_3UkxUq">
                                        <div>* Nếu trong 1 đơn hàng có nhiều hơn 1 sản phẩm, người mua sẽ nhận được Xu trên từng sản phẩm nếu đánh giá thỏa điều kiện.</div>
                                        <div>*Anhdai sẽ thu hồi Xu nếu nhận thấy các đánh giá có nội dung không liên quan hoặc không phù hợp.</div><div>* Nếu chỉnh sửa đánh giá đã gửi, người mua sẽ không nhận được Xu</div>
                                        <div>*Bạn sẽ nhận được Xu sau khi đánh giá được gửi thành công</div>
                                        <div>* Không thể nhận xu do hình ảnh hoặc video đánh giá có chất lượng kém.
                                            <a href="https://help.shopee.vn/s/article/Lam-The-Nao-De-Co-1-Bai-Viet-Danh-Gia-Chat-Luong" target="_blank" rel="noopener noreferrer" style={{color: 'rgb(55, 137, 247)', marginLeft: '0.25rem'}}>Xem mẫu</a>
                                        </div>
                                    </div>
                                </div>:''}
                            </div>
                            {state.review?
                                <>{rating_product(state.review)}</>
                            :<>
                            {list_cartitem.map(cartitem=>
                                <>{rating_product(cartitem)}</>
                            )}
                            </>}
                            </>
                            :<>
                            {list_review.map(review=>
                            <div>
                                <div className="_2irnOH">
                                    <a className="c1C69v _26cI_Y" href={`${review.url}?itemId=${review.item_id}`} target="_blank" rel="noopener noreferrer">
                                        <div className="image__wrapper _2ylgGg">
                                            <div className="image__place-holder">
                                                <svg enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className="svg-icon icon-loading-image"><g><rect fill="none" height="8" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" width="10" x="1" y="4.5"></rect><line fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="1" x2="11" y1="6.5" y2="6.5"></line><rect fill="none" height="3" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" width="3" x="11" y="6.5"></rect><line fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="1" x2="11" y1="14.5" y2="14.5"></line><line fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="6" x2="6" y1=".5" y2="3"></line><line fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="3.5" x2="3.5" y1="1" y2="3"></line><line fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="8.5" x2="8.5" y1="1" y2="3"></line></g></svg>
                                            </div>
                                            <div className="image__content" style={{backgroundImage: `url(${review.image})`}}>
                                                <div className="image__content--blur"> </div>
                                            </div>
                                        </div>
                                        <div className="_32UJVi">
                                            <div className="_2e-TQb">{review.name}</div>
                                            <div className="_1WE6N8">{itemvariation(review)}</div>
                                        </div>
                                    </a>
                                    {review.edited?"":<button onClick={(e)=>editreview(e,review)} className="button-outline">Edit</button>}
                                </div>
                                <div className="_3J2rtm">
                                    <div className="JWbkej">
                                        <div className="avatar _24oUec">
                                            <div className="avatar__placeholder">
                                                <svg enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className="svg-icon icon-headshot"><g><circle cx="7.5" cy="4.5" fill="none" r="3.8" strokeMiterlimit="10"></circle><path d="m1.5 14.2c0-3.3 2.7-6 6-6s6 2.7 6 6" fill="none" strokeLinecap="round" strokeMiterlimit="10"></path></g></svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="_2KQmgr">
                                        <div className="_3GnVV_">{review.anonymous_review?`${user.username.substr(0,1)}${hidestring(user.username)}${user.username.substr(-1)}`:`${user.username}`}</div>
                                        <div className="rating-stars__container">
                                            {rating_score(6,review)}
                                        </div>
                                        <div className="n3n-ef">
                                            {review.info_more!=''?<div className="_1pnfng">{review.info_more}</div>:''}
                                            {review.review_text!=''?<div className="_1hqYkJ">{review.review_text.split(',').map(text=><span className="_3-6OVE">{text}</span>)}</div>:''}
                                        </div>
                                        <div className="_2cEE3M">
                                            <div className="rating-modal__image-list-wrapper">
                                                <div className="rating-media-list">
                                                    <div className="rating-media-list__container">
                                                        {review.list_file.map((file,index)=>
                                                            <div onClick={(e)=>showmedia(e,file,index,review)} className={`rating-media-list__image-wrapper rating-media-list__image-wrapper--${file.show?'':'in'}active`}>
                                                                <div className="rating-media-list-image__wrapper">
                                                                    <div className="rating-media-list-image__place-holder">
                                                                        <svg enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className="svg-icon icon-loading-image"><g><rect fill="none" height="8" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" width="10" x="1" y="4.5"></rect><line fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="1" x2="11" y1="6.5" y2="6.5"></line><rect fill="none" height="3" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" width="3" x="11" y="6.5"></rect><line fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="1" x2="11" y1="14.5" y2="14.5"></line><line fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="6" x2="6" y1=".5" y2="3"></line><line fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="3.5" x2="3.5" y1="1" y2="3"></line><line fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="8.5" x2="8.5" y1="1" y2="3"></line></g></svg>
                                                                    </div>
                                                                    <div className="rating-media-list-image__content" style={{backgroundImage: `url(${file.filetype=='video'?file.media_preview:file.file})`}}>
                                                                        <div className="rating-media-list-image__content--blur"> </div>
                                                                    </div>
                                                                </div>
                                                                {file.filetype=='video'?
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
                                                                <ul className="rating-media-list-image-carousel__item-list" style={{marginLeft: `${(preview.index*-preview.width)}px`, marginTop: '0px',transition:'all 500ms ease 0s'}}>
                                                                    {review.list_file.map(file=>
                                                                        <li key={file.id} className="rating-media-list-image-carousel__item rating-media-list-image-carousel__item--fluid" style={{padding: '0px 0.625rem'}}>
                                                                            {file.filetype=='video'?
                                                                            <div className="_43iTyw">
                                                                                <video src={file.file} controls="" className="_12mVqG rating-media-list__zoomed-video-item" controlsList="nodownload"></video>
                                                                            </div>:<img className="rating-media-list__zoomed-image-item" src={file.file}/>}
                                                                        </li>
                                                                    )}
                                                                </ul>
                                                            </div>
                                                            <div onClick={show} className="rating-media-list-carousel-arrow rating-media-list-carousel-arrow--prev rating-media-list-carousel-arrow--hint rating-media-list-carousel-arrow--hidden" role="button" tabIndex="0" style={{opacity: 1, visibility: 'hidden', transform: 'translateX(calc(-50% + 0px))'}}>
                                                                <svg enableBackground="new 0 0 13 20" viewBox="0 0 13 20" x="0" y="0" className="svg-icon icon-arrow-left-bold"><polygon points="4.2 10 12.1 2.1 10 -.1 1 8.9 -.1 10 1 11 10 20 12.1 17.9"></polygon></svg>
                                                            </div>
                                                            <div onClick={show} className="rating-media-list-carousel-arrow rating-media-list-carousel-arrow--next rating-media-list-carousel-arrow--hint" role="button" tabIndex="0" style={{opacity: 1, visibility: 'visible', transform: 'translateX(calc(50% - 0px))'}}>
                                                                <svg enableBackground="new 0 0 13 21" viewBox="0 0 13 21" x="0" y="0" className="svg-icon icon-arrow-right-bold"><polygon points="11.1 9.9 2.1 .9 -.1 3.1 7.9 11 -.1 18.9 2.1 21 11.1 12 12.1 11"></polygon></svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="_29Z0Nq">{("0" + new Date(review.created).getDate()).slice(-2) + "-" + ("0"+(new Date(review.created).getMonth()+1)).slice(-2) + "-" +
                                        new Date(review.created).getFullYear() + " " + ("0" + new Date(review.created).getHours()).slice(-2) + ":" + ("0" + new Date(review.created).getMinutes()).slice(-2).toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' })}</div>
                                    </div>
                                </div>
                            </div>
                            )}</>}
                        </div>
                    </div>
                    <div className="popup-form__footer">
                        {edit?<>
                        <button onClick={e=>{setclosereview(e)}} className="cancel-btn">Trở Lại</button>
                        <button onClick={e=>{list_cartitem?submitreview(e):setStatusreview(true)}} type="button" className={`btn btn-solid-primary ${checkdisable()?'disable':''} btn--s btn--inline _1wSE68`}>Hoàn thành</button>
                        </>:<button onClick={(e)=>setopenreview(e)} className="button-outline">OK</button>}
                    </div>
                </div>}
            </div>  
        </div>:''}
        {cancel?
            <div className='_2IJN-0'>
                <div className="_1lzg0h">
                    <div className="popup-form _1Yqtls">
                        <div className="popup-form__header">
                            <div className="popup-form__title">Chọn Lý Do Hủy</div>
                        </div>
                        <div className="popup-form__main">
                            <div className="popup-form__main-container">
                                <div className="_3rEDTr _2Bit1_">
                                    <svg height="16" width="16" viewBox="0 0 16 16" className="svg-icon _1TQM3A "><g fillRule="evenodd"><path d="m8 15c-3.8596721 0-7-3.1397891-7-6.9994612 0-3.8602109 3.1403279-7.0005388 7-7.0005388 3.8602109 0 7 3.1403279 7 7.0005388 0 3.8596721-3.1397891 6.9994612-7 6.9994612z" fill="none" strokeWidth="1" stroke="currentColor"></path><path d="m10.4132188 9.3999583h-5.050999c-.204396 0-.3841766-.1081321-.4918691-.297583-.0404396-.0712089-.1556047-.3239567.0413188-.6303309.0694507-.1248354.1643959-.2835171.2738467-.4593416.1050552-.1701102.1969235-.3371435.2791214-.5112098.086154-.1789015.1617586-.3705502.2259345-.5709901.0553847-.1771432.0839562-.3674733.0839562-.5652758 0-.2738467.0404396-.5287923.1204398-.7556059.075165-.2197807.1797806-.4193415.3098907-.5934078.125275-.1674729.2747258-.3151655.4457152-.4382426.1397805-.0989013.2826379-.1775828.4276932-.2369235.6247463-.29029 1.6628604-.0523078 1.6487945.0083517.1424179.0589012.2707698.1279123.3890118.2096707.1767036.1217585.333627.2747258.4646163.4540668.1283519.1784619.2312092.3810997.3050556.6013199.0760441.2232971.1147255.4738471.1147255.7437377 0 .1912092.0281319.3802205.0848353.5626385.0637364.2052751.1397805.3995612.2268136.5780231.0887914.1850553.1832971.3542864.2821984.5050559.1046156.1604399.1982421.297583.2826379.4123085.0874727.1160442.1296706.2505499.122198.3876931-.0061539.1107695-.0404396.2162642-.0989013.3041764-.0562639.0870331-.1305497.1591212-.2101103.2026378-.0685716.0404396-.1665937.0892309-.2769236.0892309zm-3.9906114.7572683h3.0423323c-.1878895.8170573-.6949449 1.2255859-1.5211662 1.2255859s-1.3332766-.4085286-1.5211662-1.2255859z" stroke="none" fill="currentColor"></path></g></svg>
                                    <span>Vui lòng chọn lý do hủy đơn hàng. Lưu ý: Đơn đặt hàng của bạn sẽ bị hủy ngay sau khi bạn gửi lý do hủy.</span>
                                </div>
                                <div className="reson_cancel">
                                    {list_reason_cancel.map(item=>
                                        <div onClick={()=>setState({...state,reason_choice:item})} className={`stardust-radio ${state.reason_choice==item?'stardust-radio-button--checked':""}`} tabIndex="0" role="radio" aria-checked="false">
                                            <div className="stardust-radio-button">
                                                <div className="stardust-radio-button__outer-circle">
                                                    <div className="stardust-radio-button__inner-circle"></div>
                                                </div>
                                            </div>
                                            <div className="stardust-radio__content">
                                                <div className="stardust-radio__label">
                                                    <div className='reson-cancel'>{item}</div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="popup-form__footer">
                            <button onClick={()=>setcancel(false)} className="cancel-btn mr-1">Không phải bây giờ</button>
                            <button onClick={()=>completecancel()} type="button" className={`btn btn-solid-primary btn-m btn--inline ${state.reason_choice?'':'disable'} _1wSE68`}>Hủy đơn hàng</button>
                        </div>
                    </div>
                </div>
                <div className="uYEgjK"></div>
            </div>
           :''}
        </>
    )
}

export default memo(Listreview)