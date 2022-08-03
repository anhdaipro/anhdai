import Navbar from "./Navbar"
import axios from 'axios';
import {shopprofileURL,} from "../urls"
import { headers} from '../actions/auth'
import Sidebamenu from "./Sidebar-menu"
import React, {useRef,useState,useEffect} from "react"
import { matchYoutubeUrl } from "../constants"
import {connect} from 'react-redux'
const Profileshop=({user})=>{
  const submitprofile=(e)=>{
   
    let form=new FormData()
    Object.keys(state).map(item=>{
      if(state[item]!=null){
      form.append(item,state[item])
      }
    })
    list_file.map(item=>{
      if(item.file!=undefined){
        form.append('file',item.file)
      }
      if(item.url!=undefined){
        form.append('url',item.url)
      }
    })
    axios.post(shopprofileURL,form,headers)
    .then(res=>{

    })  
    
  }
  const [loading,setLoading]=useState(false)
  const[data,setData]=useState({show_url:false,url_video:null})
  const [state,setState]=useState({image_cover:null,name:null,description:null,image:null,file:null,file_cover:null})
  const [list_file,setListfile]=useState([])
  const inputfile=useRef(null)
  const inputfileimage=useRef(null)
  const inputfileimagecover=useRef(null)
  const clickinput=(e)=>{
    inputfile.current.click()
  }
  const editimagecover=()=>{
    setState({...state,edit_image_cover:true})
    inputfileimage.current.click()
  }
  const editimage=()=>{
    setState({...state,edit_image_cover:false})
    inputfileimage.current.click()
  }
  
  const  previewFile=(e)=>{
    [].forEach.call(e.target.files, function(file) {
      if(e.target==inputfileimage.current){
        if(!state.edit_image_cover){
          setState({...state,file:file,image:(window.URL || window.webkitURL).createObjectURL(file)})
        }
        else{
          setState({...state,file_cover:file,image_cover:(window.URL || window.webkitURL).createObjectURL(file)})
        }
      }
      else{
        setListfile([...list_file,{image:(window.URL || window.webkitURL).createObjectURL(file),file:file}])
      }
    })
  }
  
  useEffect(()=>{
    (async () => {
      try {
        
        const res = await axios.get(shopprofileURL,headers)
        setLoading(true)
        setListfile(res.data.description_url)
        setState({...state,loading:true,name:res.data.name,image_cover:res.data.image_cover,description:res.data.description}) 
      } catch (error) {
        console.log(error);
      }
  })();
  },[])

  const removeimage=(file)=>{
    const list_url=list_file.filter(item=>item.file!=file.file)
    setListfile(list_url)
  }
  function YouTubeGetID(url){
    url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    return (url[2] !== undefined) ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
  }
  console.log(state)
  const setchoiceurl=(e)=>{
    if(matchYoutubeUrl(data.url_video)){
      const videoId = data.url_video.split(/v\/|v=|youtu\.be\//)[1].split(/[?&]/)[0];
      setListfile([...list_file,{url:data.url_video,image:`https://img.youtube.com/vi/${YouTubeGetID(data.url_video)}/0.jpg`}])
      
      setData({...data,show_url:false,error:false,url_video:false})
    }
    else{
      setData({...data,error:true})
    }
  }
    return(
      <>
        <div id="app">
          <div className="app-content">
            <Navbar/>
            <div className="page-content">
              <Sidebamenu/>
              <div className="page-container has-siderbar">
                <div className="page-content-wrapper"> 
                  {loading?
                  <div data-v-1712dc8c="" className="shop-profile-page">
                    <div data-v-a29caace="" data-v-1712dc8c="" className="header shop-profile-header">
                      <div data-v-a29caace="" className="caption">
                        <div data-v-a29caace="" className="title">Hồ Sơ Shop</div> 
                        <div data-v-a29caace="" className="subtitle">
                          Xem tình trạng Shop và cập nhật hồ sơ Shop của bạn
                        </div>
                      </div> 
                      <div data-v-a29caace="" className="buttons"></div>
                    </div> 
                    <div data-v-1712dc8c="" className="shop-profile-body">
                      <div data-v-1712dc8c="" className="tabs tabs-line tabs-normal tabs-top">
                        <div className="tabs__nav">  
                          <div className="tabs__nav-warp">
                            <div className="tabs__nav-tabs" style={{transform: 'translateX(0px)'}}>
                              <div className="tabs__nav-tab active" style={{whiteSpace: 'normal'}}>Thông tin cơ bản </div>
                            </div> 
                            <div className="tabs__ink-bar" style={{width: '146px', transform: 'translateX(0px)'}}></div>
                          </div> 
                        </div> 
                        <div className="tabs__content">
                          <div data-v-1712dc8c="" className="tabs-tabpane"></div>    
                        </div>
                      </div> 
                      <div data-v-1712dc8c="" className="shop-profile-tab-wrapper">
                        <div data-v-1922e5ee="" data-v-1712dc8c="" className="shop-profile"> 
                          <div data-v-1922e5ee="" className="shop-profile-content">
                            <div data-v-2f57c25a="" data-v-1922e5ee="" className="basic-info-list">
                              <div data-v-2f57c25a="" className="header-info">
                                <div data-v-2f57c25a="" className="cover" style={{backgroundImage: `url(${state.image_cover})`}}>
                                  <div onClick={(e)=>editimagecover(e)} data-v-2f57c25a="" className="cover-edit action">Sửa ảnh bìa</div>
                                </div> 
                                <div data-v-2f57c25a="" className="avatar" style={{backgroundImage: `url(${state.avatar!=null?state.avatar:user!=null?user.avatar:null})`}}>
                                  <div onClick={(e)=>editimage(e)} data-v-2f57c25a="" className="avatar-edit action">Sửa</div>
                                </div> 
                                <div data-v-2f57c25a="" className="user">
                                  <div data-v-2f57c25a="" className="name">{user!=null?user.username:''}</div> 
                                  <div data-v-2f57c25a="" className="join-time">Đã tham gia 23/11/2018
                                </div> 
                                <div data-v-2f57c25a="" className="following">
                                  <div data-v-2f57c25a="" className="item">
                                    <span data-v-2f57c25a="">Người theo </span> 
                                    <span data-v-2f57c25a="">4</span>
                                  </div> 
                                  <div data-v-2f57c25a="" className="split"></div> 
                                  <div data-v-2f57c25a="" className="item">
                                    <span data-v-2f57c25a="">Theo dõi </span> 
                                    <span data-v-2f57c25a="">4</span>
                                  </div>
                                </div>
                              </div> 
                              <div data-v-54c0e24c="" data-v-2f57c25a="" className="uploader image-uploader empty">
                                <div data-v-54c0e24c="" className="image-uploader__wrapper image-uploader__action">
                                  <i data-v-54c0e24c="" className="add-icon icon icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8.48176704,1.5 C8.75790942,1.5 8.98176704,1.72385763 8.98176704,2 L8.981,7.997 L15,7.99797574 C15.2761424,7.99797574 15.5,8.22183336 15.5,8.49797574 C15.5,8.77411811 15.2761424,8.99797574 15,8.99797574 L8.981,8.997 L8.98176704,15 C8.98176704,15.2761424 8.75790942,15.5 8.48176704,15.5 C8.20562467,15.5 7.98176704,15.2761424 7.98176704,15 L7.981,8.997 L2,8.99797574 C1.72385763,8.99797574 1.5,8.77411811 1.5,8.49797574 C1.5,8.22183336 1.72385763,7.99797574 2,7.99797574 L7.981,7.997 L7.98176704,2 C7.98176704,1.72385763 8.20562467,1.5 8.48176704,1.5 Z"></path></svg>
                                  </i>
                                </div> 
                                <div data-v-54c0e24c="" className="upload">
                                  <div className="upload-wrapper">
                                    <input onChange={(e)=>previewFile(e)} ref={inputfileimage} type="file" name="file" accept=".jpg, .jpeg, .png" className="upload__input"/> 
                                    <span data-v-54c0e24c=""></span>
                                  </div>  
                                </div> 
                              </div>
                            </div> 
                            <div data-v-2f57c25a="" className="list-info"> 
                              <div data-v-2f57c25a="" className="info-row">
                                <div data-v-2f57c25a="" className="info-row-left">
                                  <i data-v-2f57c25a="" className="icon icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M3 21v2c0 .6.5 1 1 1h24c.6 0 1-.5 1-1v-2H3zM29 4c0-.6-.5-1-1-1H4c-.4 0-1 .5-1 1v15h26V4zM12 29h8v-3h-8v3zm10-3v3h2v2H8v-2h2v-3H3c-1 0-2-1-2-2V2.9C1 1.9 1.9 1 2.9 1h26.2c1 0 1.9.9 1.9 1.9v20.7c0 1-1 2.4-2 2.4h-7z"></path></svg>
                                  </i> 
                                  <div data-v-2f57c25a="" className="title">Giao diện Shop trên máy tính</div>
                                </div> 
                                <div data-v-2f57c25a="" className="info-row-right action">
                                  <div data-v-2f57c25a="">Xem</div>
                                  <i data-v-2f57c25a="" className="icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M9.18933983,8 L5.21966991,11.9696699 C4.9267767,12.2625631 4.9267767,12.7374369 5.21966991,13.0303301 C5.51256313,13.3232233 5.98743687,13.3232233 6.28033009,13.0303301 L10.7803301,8.53033009 C11.0732233,8.23743687 11.0732233,7.76256313 10.7803301,7.46966991 L6.28033009,2.96966991 C5.98743687,2.6767767 5.51256313,2.6767767 5.21966991,2.96966991 C4.9267767,3.26256313 4.9267767,3.73743687 5.21966991,4.03033009 L9.18933983,8 Z"></path></svg>
                                  </i>
                                </div>
                              </div> 
                              <div data-v-2f57c25a="" className="info-row">
                                <div data-v-2f57c25a="" className="info-row-left">
                                  <i data-v-2f57c25a="" className="icon icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M29.5 12.4h-1.8v18H4.3v-18H2.5V7h7.8c-.4-.6-.6-1.2-.6-1.8 0-2 1.6-3.6 3.6-3.6 1.1 0 2.1.5 2.7 1.3.6-.8 1.6-1.3 2.7-1.3 2 0 3.6 1.6 3.6 3.6 0 .6-.2 1.3-.5 1.8h7.8v5.4zM16.9 28.6h9v-7.2h-9v7.2zm0-9h9v-7.2h-9v7.2zm-10.8 9h9v-7.2h-9v7.2zm0-9h9v-7.2h-9v7.2zm7.2-16.2c-1 0-1.8.8-1.8 1.8S12.3 7 13.3 7s1.8-.8 1.8-1.8-.8-1.8-1.8-1.8zm5.4 0c-1 0-1.8.8-1.8 1.8S17.7 7 18.7 7s1.8-.8 1.8-1.8-.8-1.8-1.8-1.8zm9 5.4H4.3v1.8h23.5V8.8z"></path></svg>
                                  </i> 
                                  <div data-v-2f57c25a="" className="title">Sản phẩm</div>
                                </div> 
                                <a data-v-2f57c25a="" href="/portal/product" className="info-row-right action">
                                   0
                                  <i data-v-2f57c25a="" className="icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M9.18933983,8 L5.21966991,11.9696699 C4.9267767,12.2625631 4.9267767,12.7374369 5.21966991,13.0303301 C5.51256313,13.3232233 5.98743687,13.3232233 6.28033009,13.0303301 L10.7803301,8.53033009 C11.0732233,8.23743687 11.0732233,7.76256313 10.7803301,7.46966991 L6.28033009,2.96966991 C5.98743687,2.6767767 5.51256313,2.6767767 5.21966991,2.96966991 C4.9267767,3.26256313 4.9267767,3.73743687 5.21966991,4.03033009 L9.18933983,8 Z"></path></svg>
                                  </i>
                                </a>
                              </div> 
                              <div data-v-2f57c25a="" className="info-row">
                                <div data-v-2f57c25a="" className="info-row-left">
                                  <i data-v-2f57c25a="" className="icon icon">
                                      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 32 32" xmlspace="preserve"><path d="M0 19V6c0-3.3 2.7-6 6-6h20c3.3 0 6 2.7 6 6v13c0 3.3-2.7 5-6 5H14l-8 8v-8c-3.3 0-6-1.7-6-5zm26 3c2.2 0 4-.8 4-3V6c0-2.2-1.8-4-4-4H6C3.8 2 2 3.8 2 6v13c0 2.2 1.8 3 4 3h2v5l5-5h13zM8 22"></path><circle cx="8" cy="12" r="2"></circle><circle cx="16" cy="12" r="2"></circle><circle cx="24" cy="12" r="2"></circle></svg>
                                  </i> 
                                  <div data-v-2f57c25a="" className="title">Tỉ lệ phản hồi</div>
                                </div> 
                                <div data-v-2f57c25a="" className="info-row-right"> 57% </div>                                  
                              </div> 
                              <div data-v-2f57c25a="" className="info-row">
                                  <div data-v-2f57c25a="" className="info-row-left">
                                    <i data-v-2f57c25a="" className="icon icon">
                                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M16 32C7.2 32 0 24.8 0 16S7.2 0 16 0s16 7.2 16 16-7.2 16-16 16zm0-30C8.3 2 2 8.3 2 16s6.3 14 14 14 14-6.3 14-14S23.7 2 16 2zm4.4 20.7l-5.9-5.9c-.3-.2-.5-.4-.5-.8V7c0-.6.4-1 1-1s1 .4 1 1v8.6l5.7 5.7c.4.4.4 1 0 1.4-.4.4-1 .4-1.3 0z"></path></svg>
                                    </i> 
                                    <div data-v-2f57c25a="" className="title">Thời gian phản hồi</div>
                                  </div> 
                                  <div data-v-2f57c25a="" className="info-row-right">Trong vòng vài tiếng</div>
                                </div>  
                                <div data-v-2f57c25a="" className="info-row">
                                  <div data-v-2f57c25a="" className="info-row-left">
                                    <i data-v-2f57c25a="" className="icon icon">
                                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M16 4.83l3.18 7 .48 1.06 1.16.11 6.76.61L22.27 19l-.75.75.2 1 1.38 7.19-6.1-3.72-1-.64-1 .64-6.15 3.7 1.42-7.16.21-1-.76-.76-5.31-5.39 6.77-.61 1.16-.11.48-1.06 3.18-7M16 0l-5 11-11 1 8.3 8.37L6 32l10-6.07L26 32l-2.31-11.63L32 12l-11-1-5-11z"></path></svg>
                                    </i> 
                                    <div data-v-2f57c25a="" className="title">Đánh Giá Shop</div>
                                  </div> 
                                  <a data-v-2f57c25a="" href="/portal/settings/shop/rating" className="info-row-right action">
                                      0
                                  </a>
                                </div> 
                                <div data-v-2f57c25a="" className="info-row">
                                  <div data-v-2f57c25a="" className="info-row-left">
                                    <i data-v-2f57c25a="" className="icon icon">
                                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M24.2 3.7h-2.1v-.8h-2.5C19.2 1.3 17.7 0 16 0c-1.8 0-3.3 1.3-3.7 2.9H9.8v.8h-2c-3.2 0-5.9 2.6-5.9 5.9v16.5c0 3.3 2.6 5.9 5.9 5.9h16.5c3.2 0 5.9-2.6 5.9-5.9V9.6c-.1-3.2-2.7-5.9-6-5.9zm-12.7 1h2.4v-.9c0-1.1.9-2 2-2s2 .9 2 2v.9h2.4v4.1h-8.9V4.7zm16.4 21.4c0 2-1.6 3.6-3.6 3.6H7.8c-2 0-3.6-1.6-3.6-3.6V9.6c0-2 1.6-3.6 3.6-3.6h2v4.5h12.4V6h2.1c2 0 3.6 1.6 3.6 3.6v16.5zM15.5 25c-.2 0-.4-.1-.5-.2L10.1 21c-.4-.3-.4-.9-.1-1.2.3-.4.9-.4 1.2-.1l4.1 3.3 6.3-9.8c.3-.4.8-.5 1.2-.3.4.3.5.8.3 1.2l-6.8 10.7c-.1.2-.3.4-.6.4-.1-.2-.1-.2-.2-.2z"></path></svg>
                                    </i> 
                                    <div data-v-2f57c25a="" className="title">Tỉ lệ đơn không thành công</div>
                                  </div> 
                                  <a data-v-2f57c25a="" href="https://shopee.vn/orderfulfilment" target="_blank" className="info-row-right action">
                                    0,00%
                                    <i data-v-2f57c25a="" className="icon">
                                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M9.18933983,8 L5.21966991,11.9696699 C4.9267767,12.2625631 4.9267767,12.7374369 5.21966991,13.0303301 C5.51256313,13.3232233 5.98743687,13.3232233 6.28033009,13.0303301 L10.7803301,8.53033009 C11.0732233,8.23743687 11.0732233,7.76256313 10.7803301,7.46966991 L6.28033009,2.96966991 C5.98743687,2.6767767 5.51256313,2.6767767 5.21966991,2.96966991 C4.9267767,3.26256313 4.9267767,3.73743687 5.21966991,4.03033009 L9.18933983,8 Z"></path></svg>
                                    </i>
                                  </a>
                                </div> 
                              </div>
                            </div> 
                            <div data-v-1922e5ee="" className="right">
                              <div data-v-59a709f0="" data-v-1922e5ee="" className="edit-info-form">
                                <form data-v-59a709f0="" autocomplete="off" className="form--label-right">
                                  <div data-v-59a709f0="" className="form-section">
                                    <div data-v-59a709f0="" className="form-title">Tên Shop</div> 
                                    <div data-v-59a709f0="" className="form-content">
                                      <label data-v-59a709f0="">
                                        <input data-v-59a709f0="" type="text" name="profile-nickname" style={{position: 'absolute', opacity: 0}}/>
                                      </label> 
                                      <div data-v-59a709f0="" className="form-item">
                                        <label for="name" className="form-item__label empty"> </label> 
                                        <div className="form-item__control">
                                          <div className="form-item__content">
                                            <div data-v-59a709f0="" className="input name-input">
                                              <div className="input__inner input__inner--normal"> 
                                                <input onChange={(e)=>setState({...state,name:e.target.value})} value={state.name} type="text" placeholder="Tên Shop" name="profile-nickname" resize="vertical" rows="2" minrows="2" maxlength="30" restrictiontype="input" showwordlimit="true" max="Infinity" min="-Infinity" className="input__input"/> 
                                                <div className="input__suffix">
                                                  <span className="input__count">9/30</span>
                                                </div>
                                              </div>
                                            </div> 
                                          </div>  
                                        </div>
                                      </div>
                                    </div>
                                  </div> 
                                  <div data-v-59a709f0="" className="form-section media-location">
                                    <div data-v-59a709f0="" className="form-title">
                                      <span data-v-59a709f0="" className="text">Mô tả hình ảnh và video</span> 
                                      <div data-v-59a709f0="" className="popover popover--light">
                                        <div className="popover__ref">
                                          <i data-v-59a709f0="" className="icon icon">
                                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8,1 C11.8659932,1 15,4.13400675 15,8 C15,11.8659932 11.8659932,15 8,15 C4.13400675,15 1,11.8659932 1,8 C1,4.13400675 4.13400675,1 8,1 Z M8,2 C4.6862915,2 2,4.6862915 2,8 C2,11.3137085 4.6862915,14 8,14 C11.3137085,14 14,11.3137085 14,8 C14,4.6862915 11.3137085,2 8,2 Z M7.98750749,10.2375075 C8.40172105,10.2375075 8.73750749,10.5732939 8.73750749,10.9875075 C8.73750749,11.401721 8.40172105,11.7375075 7.98750749,11.7375075 C7.57329392,11.7375075 7.23750749,11.401721 7.23750749,10.9875075 C7.23750749,10.5732939 7.57329392,10.2375075 7.98750749,10.2375075 Z M8.11700238,4.60513307 C9.97011776,4.60513307 10.7745841,6.50497267 9.94298079,7.72186504 C9.76926425,7.97606597 9.56587088,8.14546785 9.27050506,8.31454843 L9.11486938,8.39945305 L8.95824852,8.47993747 C8.56296349,8.68261431 8.49390831,8.75808648 8.49390831,9.0209925 C8.49390831,9.29713488 8.27005069,9.5209925 7.99390831,9.5209925 C7.71776594,9.5209925 7.49390831,9.29713488 7.49390831,9.0209925 C7.49390831,8.34166619 7.7650409,7.99681515 8.35913594,7.6662627 L8.76655168,7.45066498 C8.9424056,7.3502536 9.04307851,7.26633638 9.11735517,7.1576467 C9.52116165,6.56675314 9.11397414,5.60513307 8.11700238,5.60513307 C7.41791504,5.60513307 6.82814953,6.01272878 6.75715965,6.55275918 L6.75,6.66244953 L6.74194433,6.75232516 C6.69960837,6.98557437 6.49545989,7.16244953 6.25,7.16244953 C5.97385763,7.16244953 5.75,6.9385919 5.75,6.66244953 C5.75,5.44256682 6.87194406,4.60513307 8.11700238,4.60513307 Z"></path></svg>
                                          </i> 
                                        </div> 
                                        <div className="popper popover__popper popover__popper--light media-location-tip" style={{display: 'none', maxWidth: '800px'}}>
                                          <div className="popover__content">
                                            <div data-v-59a709f0="" className="media-location-tip-content">
                                              <div data-v-59a709f0="" className="location-title">Vị trí hiển thị</div> 
                                                <div data-v-59a709f0="" className="location-desc">
                                                    Ảnh và video mà bạn tải lên sẽ được hiển thị trên trang cửa hàng của bạn ở cả phiên bản trên máy tính và ứng dụng.
                                                </div> 
                                                <div data-v-59a709f0="" className="location-body">
                                                  <div data-v-59a709f0="" className="left">
                                                    <img data-v-59a709f0="" src="https://deo.shopeemobile.com/shopee/seller-live-sg/rootpages/static/modules/shop-profile/image/media_location_app.c72540a.jpg" alt=""/> 
                                                    <span data-v-59a709f0="" className="text">Phiên bản ứng dụng</span>
                                                  </div> 
                                                  <div data-v-59a709f0="" className="right">
                                                    <img data-v-59a709f0="" src="https://deo.shopeemobile.com/shopee/seller-live-sg/rootpages/static/modules/shop-profile/image/media_location_pc.8aab8fc.jpg" alt=""/> 
                                                    <span data-v-59a709f0="" className="text">Phiên bản máy tính</span>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div> 
                                      <div data-v-59a709f0="" className="form-content">
                                        <div data-v-0679e818="" data-v-59a709f0="" className="order-list order-list--bottom"> 
                                          {list_file.map(item=>
                                          <div data-v-c5ae603c="" data-v-59a709f0="" className="order-list-item" data-v-0679e818="">
                                            <div data-v-c5ae603c="" className="order-list-item__wrapper">
                                              <div data-v-c5ae603c="" className="order-list-item__controller">
                                                <button data-v-c5ae603c="" disabled="disabled" className="order-list-item__controller-up"> 
                                                  <i data-v-c5ae603c="" className="icon">
                                                    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M558.63 419.027v-93.446h372.203a93.074 93.074 0 0 1 93.074 93.074v187.45a93.074 93.074 0 0 1-93.074 93.075h-371.18l.652 184.658a93.074 93.074 0 0 1-158.877 66.27L27.271 576.693a93.074 93.074 0 0 1 0-131.7L398.822 73.91a93.074 93.074 0 0 1 158.877 65.524l.931 279.594z"></path></svg>
                                                  </i>
                                                </button> 
                                                <button data-v-c5ae603c="" disabled="disabled" className="order-list-item__controller-down"> 
                                                  <i data-v-c5ae603c="" className="icon">
                                                    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M465.37 604.973v93.446H93.167A93.074 93.074 0 0 1 .093 605.345v-187.45a93.074 93.074 0 0 1 93.074-93.075h371.18l-.652-184.658a93.074 93.074 0 0 1 158.877-66.27l374.157 373.414a93.074 93.074 0 0 1 0 131.7L625.178 950.09a93.074 93.074 0 0 1-158.877-65.524l-.931-279.594z"></path></svg>
                                                  </i>
                                                </button>
                                              </div> 
                                              <div data-v-c5ae603c="" className="order-list-item__content">
                                                <div data-v-3f28ab2b="" data-v-59a709f0="" className="media-picker" data-v-c5ae603c="">
                                                  <div data-v-3f28ab2b="" className="media-picker__content">
                                                    <div data-v-54c0e24c="" data-v-3f28ab2b="" className="media-picker__frame image-uploader">
                                                      <div data-v-54c0e24c="" className="image-uploader__wrapper">
                                                        <div data-v-54c0e24c="" className="image-uploader__image contain-image-wrapper"> 
                                                          <img src={item.image!=null?item.image:`https://img.youtube.com/vi/${YouTubeGetID(item.url)}/0.jpg`} className="cdn-image contain-image"/>
                                                        </div> 
                                                       
                                                        <div data-v-54c0e24c="" className="image-uploader__wrapper-overlay">
                                                          <div data-v-54c0e24c="" className="image-uploader__action">Thay đổi hình ảnh</div>
                                                        </div>
                                                      </div> 
                                                    
                                                      <div data-v-54c0e24c="" className="upload">
                                                        <div className="upload-wrapper">
                                                          <input onClick={(e)=>clickinput(e)} type="file" name="file" accept=".jpg, .jpeg, .png" className="upload__input"/> 
                                                          <span data-v-54c0e24c=""></span>
                                                        </div>  
                                                      </div> 
                                                    </div> 
                                                    <div data-v-3f28ab2b="" className="media-picker__form">
                                                      <div data-v-cd1a176a="" data-v-3f28ab2b="" className="url-selector">
                                                        <div data-v-cd1a176a="" className="select">
                                                          <div tabIndex="0" className="selector item-center clearable selector--normal"> 
                                                            <div className="selector__inner placeholder line-clamp--1">Chọn đường dẫn từ...(Tùy chỉnh)</div> 
                                                            <div className="item-center selector__suffix">
                                                              <i className="selector__clear-btn icon">
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8,2 C11.3137085,2 14,4.6862915 14,8 C14,11.3137085 11.3137085,14 8,14 C4.6862915,14 2,11.3137085 2,8 C2,4.6862915 4.6862915,2 8,2 Z M10.5924919,5.27303573 C10.4094355,5.1521972 10.1606887,5.17236516 9.99956233,5.33352414 L9.99956233,5.33352414 L8.00023568,7.33325477 L6.00047136,5.33349045 C5.81628967,5.14930876 5.51767215,5.14930876 5.33349045,5.33349045 L5.33349045,5.33349045 L5.27301564,5.40754038 C5.1522078,5.59059052 5.17239885,5.83931011 5.33355782,6.00040399 L5.33355782,6.00040399 L7.33372614,7.99976432 L5.33352414,9.99956232 L5.33352414,9.99956232 L5.27306194,10.0735738 C5.15220491,10.2566181 5.17234775,10.5053668 5.33349045,10.6665095 L5.33349045,10.6665095 L5.40750807,10.7269643 C5.5905645,10.8478028 5.83931125,10.8276348 6.00043768,10.6664759 L6.00043768,10.6664759 L8.00023568,8.66627386 L9.99959601,10.6664422 L9.99959601,10.6664422 L10.0736337,10.726932 C10.2566595,10.8477768 10.5053831,10.827636 10.6665095,10.6665095 C10.8506912,10.4823279 10.8506912,10.1837103 10.6665095,9.99952864 L10.6665095,9.99952864 L8.66674523,7.99976432 L10.6664759,6.00043767 L10.6664759,6.00043767 L10.7269381,5.92642616 C10.8477951,5.74338194 10.8276522,5.49463316 10.6665095,5.33349045 L10.6665095,5.33349045 Z"></path></svg>
                                                              </i> 
                                                              <i className="selector__suffix-icon icon">
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M8,9.18933983 L4.03033009,5.21966991 C3.73743687,4.9267767 3.26256313,4.9267767 2.96966991,5.21966991 C2.6767767,5.51256313 2.6767767,5.98743687 2.96966991,6.28033009 L7.46966991,10.7803301 C7.76256313,11.0732233 8.23743687,11.0732233 8.53033009,10.7803301 L13.0303301,6.28033009 C13.3232233,5.98743687 13.3232233,5.51256313 13.0303301,5.21966991 C12.7374369,4.9267767 12.2625631,4.9267767 11.9696699,5.21966991 L8,9.18933983 Z"></path></svg>
                                                              </i>
                                                            </div>
                                                          </div> 
                                                        </div>   
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div> 
                                                <div onClick={()=>removeimage(item)} data-v-c5ae603c="" className="order-list-item--close">
                                                  <i data-v-c5ae603c="" className="icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8,1 C11.8659932,1 15,4.13400675 15,8 C15,11.8659932 11.8659932,15 8,15 C4.13400675,15 1,11.8659932 1,8 C1,4.13400675 4.13400675,1 8,1 Z M8.00070711,7.29218611 L5.87867966,5.17157288 C5.68341751,4.97631073 5.36683502,4.97631073 5.17157288,5.17157288 C4.99800652,5.34513923 4.97872137,5.61456363 5.11371742,5.80943177 L5.17157288,5.87867966 L7.29289322,8 L5.17157288,10.1213203 C4.97631073,10.3165825 4.97631073,10.633165 5.17157288,10.8284271 C5.34513923,11.0019935 5.61456363,11.0212786 5.80943177,10.8862826 L5.87867966,10.8284271 L8,8.70710678 L10.1213203,10.8284271 C10.3165825,11.0236893 10.633165,11.0236893 10.8284271,10.8284271 C11.0019935,10.6548608 11.0212786,10.3854364 10.8862826,10.1905682 L10.8284271,10.1213203 L8.70710678,8 L10.8284271,5.87867966 C11.0236893,5.68341751 11.0236893,5.36683502 10.8284271,5.17157288 C10.6548608,4.99800652 10.3854364,4.97872137 10.1905682,5.11371742 L10.1213203,5.17157288 L8.00070711,7.29218611 L5.87867966,5.17157288 L8.00070711,7.29218611 Z"></path></svg>
                                                  </i>
                                                </div>
                                              </div>
                                            </div>
                                          </div>)}
                                          {list_file.length<5?
                                          <div data-v-3f28ab2b="" data-v-59a709f0="" className="media-picker empty" data-v-0679e818="">
                                            <div data-v-3f28ab2b="" className="media-picker__placeholder">
                                              <i data-v-3f28ab2b="" className="add-icon icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8.48176704,1.5 C8.75790942,1.5 8.98176704,1.72385763 8.98176704,2 L8.981,7.997 L15,7.99797574 C15.2761424,7.99797574 15.5,8.22183336 15.5,8.49797574 C15.5,8.77411811 15.2761424,8.99797574 15,8.99797574 L8.981,8.997 L8.98176704,15 C8.98176704,15.2761424 8.75790942,15.5 8.48176704,15.5 C8.20562467,15.5 7.98176704,15.2761424 7.98176704,15 L7.981,8.997 L2,8.99797574 C1.72385763,8.99797574 1.5,8.77411811 1.5,8.49797574 C1.5,8.22183336 1.72385763,7.99797574 2,7.99797574 L7.981,7.997 L7.98176704,2 C7.98176704,1.72385763 8.20562467,1.5 8.48176704,1.5 Z"></path></svg>
                                              </i> 
                                              <div data-v-3f28ab2b="" className="media-picker__placeholder-title">
                                                Thêm Hình ảnh &amp; Video ({5-list_file.length}/5)
                                              </div> 
                                              <div data-v-3f28ab2b="" className="media-picker__picker-image">
                                                <button onClick={(e)=>clickinput(e)} data-v-3f28ab2b="" type="button" className="add-button button button--normal">
                                                  <span>Tải hình ảnh</span>       
                                                </button> 
                                                <div data-v-54c0e24c="" data-v-3f28ab2b="" className="image-uploader empty">
                                                  <div data-v-54c0e24c="" className="image-uploader__wrapper image-uploader__action">
                                                    <i data-v-54c0e24c="" className="add-icon icon icon">
                                                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8.48176704,1.5 C8.75790942,1.5 8.98176704,1.72385763 8.98176704,2 L8.981,7.997 L15,7.99797574 C15.2761424,7.99797574 15.5,8.22183336 15.5,8.49797574 C15.5,8.77411811 15.2761424,8.99797574 15,8.99797574 L8.981,8.997 L8.98176704,15 C8.98176704,15.2761424 8.75790942,15.5 8.48176704,15.5 C8.20562467,15.5 7.98176704,15.2761424 7.98176704,15 L7.981,8.997 L2,8.99797574 C1.72385763,8.99797574 1.5,8.77411811 1.5,8.49797574 C1.5,8.22183336 1.72385763,7.99797574 2,7.99797574 L7.981,7.997 L7.98176704,2 C7.98176704,1.72385763 8.20562467,1.5 8.48176704,1.5 Z"></path></svg>
                                                    </i>
                                                  </div> 
                                                  <div  data-v-54c0e24c="" className="upload">
                                                    <div className="upload-wrapper">
                                                      <input onChange={(e)=>previewFile(e)} ref={inputfile} type="file" name="file" accept=".jpg, .jpeg, .png" className="upload__input"/> 
                                                      <span data-v-54c0e24c=""></span>
                                                    </div>  
                                                  </div> 
                                                </div>
                                              </div> 
                                              <div data-v-3f28ab2b="" className="media-picker__picker-video">
                                                <button onClick={()=>setData({...data,show_url:true})} data-v-3f28ab2b="" type="button" className="add-button button button--normal">
                                                  <span>
                                                        Thêm URL Video YouTube
                                                  </span>
                                                </button> 
                                              </div>
                                            </div>
                                          </div>:''}
                                      </div>
                                    </div>
                                  </div> 
                                  <div data-v-59a709f0="" className="form-section">
                                    <div data-v-59a709f0="" className="form-title">Mô tả Shop</div> 
                                    <div data-v-59a709f0="" className="form-content">
                                      <div data-v-59a709f0="" className="description-form-item form-item">
                                        <label for="description" className="form-item__label empty"> </label> 
                                        <div className="form-item__control">
                                          <div className="form-item__content">
                                            <div data-v-59a709f0="" className="input input__area desc-input">
                                              <textarea value={state.description} onChange={(e)=>setState({...state,description:e.target.value})} type="textarea" placeholder="Nhập mô tả hoặc thông tin về Shop của bạn tại đây" resize="vertical" rows="2" minrows="5" maxlength="500" restrictiontype="input" showwordlimit="true" max="Infinity" min="-Infinity" className="input__inner input__inner--normal" style={{resize: 'vertical', minHeight: '98px'}}></textarea>
                                              <span className="input__count">0/500</span>
                                            </div>
                                          </div>  
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </form>
                              </div> 
                              <button onClick={(e)=>submitprofile(e)} data-v-1922e5ee="" type="button" className="save-button button button--primary button--normal">
                                <span>Lưu</span>
                              </button>
                            </div>
                          </div>
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
          {data.show_url?
          <div className="modal__mask" style={{zIndex: 1000023}}>
            <div className="modal__container">
              <div className="modal__box">
                <div className="modal__content modal__content--medium">
                  <div className="modal__header">
                    <div className="modal__header-inner modal__header-inner__has-close"> 
                      <div className="modal__title">Thêm URL Video YouTube ở đây</div> 
                        <div className="modal__subtitle">Chỉ chấp nhận URL của YouTube</div>
                      </div>
                    </div> 
                    <div className="modal__body" style={{position: 'relative'}}>
                      <div data-v-abd46a46="" className="d-flex url-input-modal__content">
                        <div onMouseLeave={()=>setData({...data,show_close:false})} onMouseEnter={()=>setData({...data,show_close:data.url_video!=null&&data.url_video.trim()!=''?true:false})} data-v-abd46a46="" className="input url-input">
                          <div class={`input__inner input__inner--normal ${data.error!=undefined &&data.error?'error':''}`}> 
                            <input value={data.url_video} onChange={(e)=>setData({...data,url_video:e.target.value})} type="text" placeholder="https://" clearable="true" resize="vertical" rows="2" minrows="2" maxlength="1000" restrictiontype="input" max="Infinity" min="-Infinity" className="input__input"/> 
                            <div onClick={()=>setData({...data,url_video:''})} className="input__suffix" >
                              <i className="input__clear-btn icon" style={{visibility:data.show_close?'':'hidden'}}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8,2 C11.3137085,2 14,4.6862915 14,8 C14,11.3137085 11.3137085,14 8,14 C4.6862915,14 2,11.3137085 2,8 C2,4.6862915 4.6862915,2 8,2 Z M10.5924919,5.27303573 C10.4094355,5.1521972 10.1606887,5.17236516 9.99956233,5.33352414 L9.99956233,5.33352414 L8.00023568,7.33325477 L6.00047136,5.33349045 C5.81628967,5.14930876 5.51767215,5.14930876 5.33349045,5.33349045 L5.33349045,5.33349045 L5.27301564,5.40754038 C5.1522078,5.59059052 5.17239885,5.83931011 5.33355782,6.00040399 L5.33355782,6.00040399 L7.33372614,7.99976432 L5.33352414,9.99956232 L5.33352414,9.99956232 L5.27306194,10.0735738 C5.15220491,10.2566181 5.17234775,10.5053668 5.33349045,10.6665095 L5.33349045,10.6665095 L5.40750807,10.7269643 C5.5905645,10.8478028 5.83931125,10.8276348 6.00043768,10.6664759 L6.00043768,10.6664759 L8.00023568,8.66627386 L9.99959601,10.6664422 L9.99959601,10.6664422 L10.0736337,10.726932 C10.2566595,10.8477768 10.5053831,10.827636 10.6665095,10.6665095 C10.8506912,10.4823279 10.8506912,10.1837103 10.6665095,9.99952864 L10.6665095,9.99952864 L8.66674523,7.99976432 L10.6664759,6.00043767 L10.6664759,6.00043767 L10.7269381,5.92642616 C10.8477951,5.74338194 10.8276522,5.49463316 10.6665095,5.33349045 L10.6665095,5.33349045 Z"></path></svg>
                              </i>
                            </div>
                          </div>
                          {data.error!=undefined &&data.error?
                          <p className="input__error-msg">Vui lòng nhập URL Video trên Youtube hợp lệ</p>:''}
                        </div> 
                      <a data-v-abd46a46="" className="preview-button disabled">Xem trước</a>
                    </div>
                  </div> 
                  <div className="modal__footer"> 
                    <div className="modal__footer-buttons">
                      <button onClick={e=>setData({...data,show_url:false})} type="button" className="button button--normal">
                        <span>Hủy</span>
                      </button> 
                      <button onClick={(e)=>setchoiceurl(e)} type="button" className="button button--primary button--normal" disabled={data.url_video!=''?false:true}>
                        <span>Xác nhận</span>
                      </button>
                    </div>
                  </div>
                </div> 
                <i className="icon modal__close">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M2.85355339,1.98959236 L8.157,7.29314575 L13.4601551,1.98959236 C13.6337215,1.81602601 13.9031459,1.79674086 14.098014,1.93173691 L14.1672619,1.98959236 C14.362524,2.18485451 14.362524,2.501437 14.1672619,2.69669914 L14.1672619,2.69669914 L8.864,8.00014575 L14.1672619,13.3033009 C14.362524,13.498563 14.362524,13.8151455 14.1672619,14.0104076 C13.9719997,14.2056698 13.6554173,14.2056698 13.4601551,14.0104076 L8.157,8.70714575 L2.85355339,14.0104076 C2.67998704,14.183974 2.41056264,14.2032591 2.2156945,14.0682631 L2.14644661,14.0104076 C1.95118446,13.8151455 1.95118446,13.498563 2.14644661,13.3033009 L2.14644661,13.3033009 L7.45,8.00014575 L2.14644661,2.69669914 C1.95118446,2.501437 1.95118446,2.18485451 2.14644661,1.98959236 C2.34170876,1.79433021 2.65829124,1.79433021 2.85355339,1.98959236 Z"></path></svg>
                </i>
              </div>
            </div>
          </div> :''}
        </div>
           
      </>
    )
}
const mapStateToProps = state => ({
  user:state.user
});
export default connect(mapStateToProps)(Profileshop);
