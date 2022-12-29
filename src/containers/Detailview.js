
import {categoryURL,itemURL,productinfoURL,shopURL} from "../urls"
import axios from 'axios';
import Navbar from "./Navbar"
import Message from "./Chat"
import {expiry, headers} from "../actions/auth"
import React, {useState, useEffect,useCallback} from 'react'
import { useParams,useLocation,useNavigate,useSearchParams } from "react-router-dom";
import ProductDetail from "./ProductDetail";
import Shopinfo from "./Shop";
import Categorydetail from './Categorydetail'
const Detailview = () => {
  const { slug } = useParams(); // <-- access id match param here
  const [list_threads,setThreads]=useState([]);
  const [data,setData]=useState(null);
  const navigate=useNavigate()
  const [listreport,setListreport]=useState([,{name:'Đánh giá thô tục phản cảm',value:1},
  {name:'Chứa hình ảnh phản cảm, khỏa thân, khiêu dâm',value:2},
  {name:'Đánh giá trùng lặp (thông tin rác)',value:3},
  {name:'Chứa thông tin cá nhân',value:4},{name:'Quảng cáo trái phép',value:5},
  {name:'Đánh giá không chính xác / gây hiểu lầm (ví dụ như: đánh giá và sản phẩm không khớp, ...)',
  value:6},{name:'Vi phạm khác',value:7}])
  const [state, setState] = useState({report_complete:false,report_reson:null,text_report:'',show_report:false,show_thread:false,show_message:false,show_media:false});
  const [reviewchoice,setReviewchoice]=useState(null)
  const [choice,setChoice]=useState()
  const [cartitem,setCartitem]=useState()
  const [shop_id,setShop_id]=useState()
  const [category_id,setCategory_id]=useState()
  const [product_id,setProduct_id]=useState()
  const [params, setSearchParams] = useSearchParams();
  const [searchitem,setSearchitem]=useState({page:1,sortby:'pop'})
  const choices=params.get('itemId') && !params.get('categoryId')?'product':''
  useEffect(() => {
    (async () => {
      const url=params.get('itemId') && !params.get('categoryId')?axios.get(`${itemURL}?${params}`,headers()):axios.get(`${categoryURL}/${slug}`,headers())
      const res = await url
      setData(res.data)
      setChoice(choices)
      if (choices=='product'){
        setProduct_id(res.data.id)
        setCategory_id()
        setShop_id()
      }
      else{
        if(res.data.name){
          setShop_id(res.data.id)
          setCategory_id()
          setProduct_id()
        }
        else{
          setCategory_id(res.data.id)
          setProduct_id()
          setShop_id()
        }
      }
    })();
  },[slug,params])


  const showmediaitem=(file,listmedia)=>{
    const indexchoice=listmedia.indexOf(listmedia.find(item=>file.file===item.file))
    setState({...state,show_media:true,filechoice:file,listmedia:listmedia,indexchoice:indexchoice})
  }
  
  
  const setsearchcategory=(name,value)=>{
    setSearchitem({...searchitem,[name]:value})
  }
  const addcartitem=useCallback((data)=>{
      setCartitem(data)
  },[cartitem])

  const setreport=(e,review)=>{
    setState({...state,show_report:true})
    setReviewchoice(review)
  }
  const setsubmitreport=(e)=>{
    setState({...state,report_complete:false})
    const data={review_id:reviewchoice.id,
    reason:state.report_reson,
    reason:state.report_reson==7?state.text_report:state.report_reson}
    if(localStorage.token &&expiry()>0){
      axios.post(productinfoURL,JSON.stringify(data),headers())
      .then(res=>{
        setState({...state,show_report:false,report_complete:true})
      })
    }
    else{
        navigate(`/buyer/login?next=${window.location}`, { replace: true });
    }
  }
  const setindexchoice=(value)=>{
    const indexchoice=value<0?state.listmedia.length-1:value>state.listmedia.length-1?0:value
    setState({...state,indexchoice:indexchoice})
  }
  window.onclick=(event)=>{
    const parent=event.target.closest('.hoo2kB')
      if(!parent){
        setState({...state,show_media:false})
    }
  }
  const setopenreport=(value)=>{
    setState({...state,show_report:value})
  }

  return(
    <>
      <div id="main">
        <div className="item-col top container-wrapper">
        {data? 
          <Navbar 
            data={data}
            category_id={category_id}
            shop_id={shop_id}
            cartitem={cartitem}
          />:""}
        </div>
        {choice=='' && category_id?
          <Categorydetail
          data={data}
          category_id={category_id}
          listitem={data.list_item_page}
          setsearchcategory={(name,value)=>setsearchcategory(name,value)}
          />
        :''}
        {choice=='product' && product_id?
          <ProductDetail
            data_product={data}
            id={product_id}
            report_complete={state.report_complete}
            
            showmediaitem={(item,listitems)=>showmediaitem(item,listitems)}
            addcartitem={data=>addcartitem(data)}
            setreport={(e,review)=>setreport(e,review)}
            show_report={state.show_report}
          />
        :''}
        {choice==''&&shop_id?
          <Shopinfo
            data={data}
            shop_id={shop_id}
            
            setsearchcategory={(name,value)=>setsearchcategory(name,value)}
        />
        :''}
      </div>
      <div id="modal">
        {state.show_media?
        <div className="_34EwmR">
          <div className="hoo2kB">
            <div className="flex _1P7dnP">
              <div className="_1zceAY">
                <video data-dashjs-player="true" src={state.listmedia.find(item=>state.listmedia.indexOf(item)===state.indexchoice).typefile==='video'?state.listmedia.find(item=>state.listmedia.indexOf(item)===state.indexchoice).file:''} controls={true} className="_1X-zm0" style={{display: `${state.listmedia.find(item=>state.listmedia.indexOf(item)===state.indexchoice).typefile==='video'?'block':'none'}`}}></video>
                <div className="aGIJCo">
                  <div className="_3fAvN4 _1vc1W7" style={{backgroundImage: `url(${state.listmedia.find(item=>state.listmedia.indexOf(item)===state.indexchoice).file})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}}></div>
                </div>
                {state.listmedia.length>1?<>
                <div onClick={()=>setindexchoice(state.indexchoice-1)} className="tWXaTp">
                  <svg enableBackground="new 0 0 13 20" viewBox="0 0 13 20" x="0" y="0" className="svg-icon icon-arrow-left-bold"><polygon points="4.2 10 12.1 2.1 10 -.1 1 8.9 -.1 10 1 11 10 20 12.1 17.9"></polygon></svg>
                </div>
                <div onClick={()=>setindexchoice(state.indexchoice+1)} className="_2H4rB3">
                  <svg enableBackground="new 0 0 13 21" viewBox="0 0 13 21" x="0" y="0" className="svg-icon icon-arrow-right-bold"><polygon points="11.1 9.9 2.1 .9 -.1 3.1 7.9 11 -.1 18.9 2.1 21 11.1 12 12.1 11"></polygon></svg>
                </div>
                </>:''}
              </div>
              <div className="_2ynsA6">
                <div className="WhoL2w">{data.name}</div>
                <div className="_1jTFGt">
                  {state.listmedia.map((item,index)=>
                  <div key={index} onClick={()=>setindexchoice(index)} className="_4yF4f1 _1s7RSK">
                    <div className="aGIJCo">
                      <div className="_2UWcUi _1vc1W7" style={{backgroundImage: `url(${item.image_preview||item.file})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}}></div>
                    </div>
                    <img className="_1RZOE3" src="https://cf.shopee.vn/file/fb826ea87f6ede5704e58d1646815823"/>
                    {item.typefile==='video'?<div className="_2G-j0m">
                      <div className="_2ht6Qj"></div>
                      <div className="_3YTVWT">00:{Math.round(item.duration)}</div>
                    </div>:''}
                    <div className={`${state.listmedia.indexOf(item)===state.indexchoice?'_1KWA0E':''}`}></div>
                    <div className="uPSF7e"></div>
                  </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>:''}
      </div>
      <div id="modal">
        {state.show_report?
        <div className="popup modal__transition-enter-done">
          <div className="popup__overlay"></div>
          <div className="popup__container"><div>
            <div className="popup-form _30Mzmz">
              <div className="popup-form__header">
                <div className="popup-form__title">Báo cáo đánh giá này</div>
              </div>
              <div className="popup-form__main">
                <div className="popup-form__main-container">
                  <div className="_2_PmL5">
                    <div className="_1Q9uGd">Vui lòng chọn lý do báo cáo</div>
                      <ul className="_14IxYb">
                        {listreport.map(item=>
                        <li onClick={()=>setState({...state,report_reson:item.value})} className="_1GiMLw">
                          {item.value==state.report_reson?
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="_3_4tLD"><g filter="url(#filter0_i)"><rect width="18" height="18" rx="9" fill="white"></rect></g><rect x="0.5" y="0.5" width="17" height="17" rx="8.5" stroke="black" strokeOpacity="0.14"></rect><rect width="18" height="18" rx="9" fill="#FF5722"></rect><g filter="url(#filter1_d)"><path fillRule="evenodd" clipRule="evenodd" d="M9 13C11.2091 13 13 11.2091 13 9C13 6.79086 11.2091 5 9 5C6.79086 5 5 6.79086 5 9C5 11.2091 6.79086 13 9 13Z" fill="white"></path></g><defs><filter id="filter0_i" x="0" y="0" width="18" height="19" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix><feOffset dy="2"></feOffset><feGaussianBlur stdDeviation="0.5"></feGaussianBlur><feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"></feComposite><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.09 0"></feColorMatrix><feBlend mode="normal" in2="shape" result="effect1_innerShadow"></feBlend></filter><filter id="filter1_d" x="3" y="5" width="12" height="12" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix><feOffset dy="2"></feOffset><feGaussianBlur stdDeviation="1"></feGaussianBlur><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.02 0"></feColorMatrix><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"></feBlend><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"></feBlend></filter></defs></svg>:
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="_3_4tLD"><g filter="url(#filter0_i)"><rect width="18" height="18" rx="9" fill={`${item.value==state.report_reson?'#FF5722':'white'}`}></rect></g><rect x="0.5" y="0.5" width="17" height="17" rx="8.5" stroke="black" strokeOpacity="0.14"></rect><defs><filter id="filter0_i" x="0" y="0" width="18" height="19" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix><feOffset dy="2"></feOffset><feGaussianBlur stdDeviation="0.5"></feGaussianBlur><feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"></feComposite><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.09 0"></feColorMatrix><feBlend mode="normal" in2="shape" result="effect1_innerShadow"></feBlend></filter></defs></svg>}
                          <div style={{flex: '1 1 0%'}}>{item.name}</div>
                        </li>)}
                      </ul>
                      {state.report_reson==7?
                      <div className="_1fbfyn">
                        <input type="text" onChange={(e)=>setState({...state,text_report:e.target.value})} placeholder="Vui lòng mô tả chi tiết vi phạm (bắt buộc)" maxlength="300" value={state.text_report}/>
                      </div>:''}
                    </div>
                  </div>
                </div>
              </div>
              <div className="popup-form__footer">
                <button onClick={()=>setopenreport(false)} className="cancel-btn">Hủy</button>
                <button onClick={(e)=>setsubmitreport(e)} type="button" className="btn btn-solid-primary btn--s btn--inline btn-orange _3cdPca" disabled={state.report_reson==null ||(state.report_reson==7&&state.text_report.trim()=='')?true:false}>Gửi</button>
              </div>
            </div>
          </div>
        </div>:''}
      </div>
         
      </>
  )
}

export default Detailview;