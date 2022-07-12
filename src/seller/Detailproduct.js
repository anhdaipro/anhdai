
import Sidebamenu from "./Sidebar-menu"
import axios from 'axios';
import Navbar from "./Navbar"
import { useParams,Link, useNavigate } from "react-router-dom";
import React, {useState,useEffect,useCallback,useRef} from 'react'
import {groupBy,} from "../constants"
import ProductDetail from "./Product"
import {shippingshopURL,detailproductURL} from "../urls"
import { headers } from "../actions/auth";
const Detailproduct=()=>{
    const [state,setState]=useState({list_category:[],list_choice:[],list_media:[],
    list_color:[],list_size:[]})
    const { id } = useParams(); 
    const [level,setLevel]=useState(0)
    const [detail,setDetail]=useState()
    const [variation,setVariation]=useState([])
    const [shipping,setShipping]=useState(null)
    const [loading,setLoading]=useState(false)
    const [show,setShow]=useState(true)
    const [formData,setformData]=useState({name:'',description:'',
    price:'',sku:'',inventory:''})
    const [buymore,setBuymore]=useState([])
    const navigate=useNavigate ();
    useEffect(() => {
        const getJournal = async () => {
           await axios.get(detailproductURL+id,headers)
           .then(res=>{
            const list_image_item= res.data.media_upload.filter(file=>file.filetype=='image')
            const list_image_video= res.data.media_upload.find(file=>file.filetype=='video')
            const list_image_remainder=Array(9-list_image_item.length).fill().map((_, i) =>{
                return {id:null,file:null,file_preview:null,duration:0,filetype:'image'}
            })
            const max_level=res.data.list_category.reduce((arr,obj)=>arr.level>obj.level?arr.level:obj.level)
            const video=list_image_video!=undefined?list_image_video:{id:null,file:null,file_preview:null,duration:0,filetype:'video'}
            const list_null=Array(max_level+1-res.data.list_category_choice.length).fill().map((_, i) =>{
                return {id:null,title:null}
            })
            
            const list_category_choice=[...res.data.list_category_choice,...list_null]
            const shipping_item=res.data.list_shipping_item.map(item=>{
                return({...item,enable:true,show:false})
            })
            
            const shipping_item_remainder=res.data.shipping_shop.reduce((arr,obj)=>{
                if(!arr.map(a=>a['method']).includes(obj['method']) && arr.map(a=>a['method']).every(item=>!shipping_item.includes(item))){
                    arr.push({method:obj['method'],enable:false,show:false})
                }
                return arr
            },[])
            
            const list_medias=[...list_image_item,...list_image_remainder,video]
            setLoading(true)
            setformData({...formData,id:res.data.item_id,name:res.data.item_name})
            setState({...state,list_category:res.data.list_category,list_choice:list_category_choice,
            list_media:res.data.media_upload,list_color:res.data.list_color,
            list_size:res.data.list_size,shipping_item:res.data.shipping_item,max_level:max_level+1,list_media:list_medias,shipping_item:[...shipping_item,...shipping_item_remainder]})
            setVariation(res.data.list_variation)
            setShipping(groupBy(res.data.shipping_shop,'method'))
            setBuymore(res.data.buymore)
            })
        }
        getJournal();
    },[id])
    console.log(state.shipping_item)
    const setcategorychoice=(i,category)=>{
            setLevel(i+1)
            console.log(i)
            const list_choices=state.list_choice.map((item,index)=>{
                if(index==i){
                    return({...item,id:category.id,title:category.title,choice:category.choice})
                }
                if(index>i){
                    return({...item,id:null,title:null})
                }
                if(index<i){
                    return({...item})
                }
            })
            setState({...state,list_choice:list_choices})
    }
    
    const submit=()=>{
        if(shipping!=null){
        axios.get(shippingshopURL,headers)
        .then(res=>{
            setShipping(groupBy(res.data.shipping_shop,'method'))
            const list_image=Array(9).fill().map((_, i) =>{
                return {id:null,file:null,file_preview:null,duration:0,filetype:'image'}
            })
            const shipping_item=res.data.shipping_shop.reduce((arr,obj)=>{
                if(!arr.map(a=>a['method']).includes(obj['method'])){
                    arr.push({method:obj['method'],enable:false})
                }
                return arr
            },[])
            const list_medias=[...list_image,{id:null,file:null,file_preview:null,duration:0,filetype:'video'}]
            setState({...state,list_media:list_medias,shipping_item:shipping_item})
            setShow(true)
        })
        }
        else{
            setShow(true)
        }
    }
    const setshow=(value)=>{
        setShow(value)
    }
    
    return(
        <>
            <Navbar/>
        
            <div className="page">
                {loading?
                <div data-v-08b85cce className="product">
                    <div className={`product-${show?'new':'category'}`}>
                        {show?
                        <ProductDetail
                            form={formData}
                            data_item={state}
                            shipping_shop={shipping}
                            shipping_item={state.shipping_item}
                            list_buymore={buymore}
                            list_variation={variation}
                            setshow={value=>setshow(value)}
                        />
                        :
                        <div className="old-wrapper content">
                            <div className="header">
                                <h2 className="card-title mb-1">Add 1 new product</h2>
                                <p className="desc">Please select the appropriate category for your product.</p>
                            </div>
                            <div className="product-name-edit">
                                <label className="label-product">Product name:</label>
                                <div className="input-wrap">
                                    <div className="input-inner--large input-inner"> 
                                        <input onChange={(e)=>setformData({...formData,'name':e.target.value})} type="text" className="form-select name" value={formData.name} id="nameproduct" placeholder="Name Product" minlength="10" maxLength="100"  required/>
                                        <div className="input__suffix">
                                            <span className="input__suffix-split"></span>
                                            {formData.name.length}/100
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="category-selector-wrap">
                                <div className="category-selector">
                                    <div className="selector">
                                        <div className="category-search">
                                            <div className="input search-input">
                                                <div className="input__inner input__inner--normal">
                                                    <div className="input__prefix">
                                                        <i className="input__prefix-icon icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M31.7 31.7c-.4.4-1 .4-1.3 0l-8.9-8.9c-2.3 2-5.2 3.2-8.5 3.2-7.2 0-13-5.8-13-13S5.8 0 13 0s13 5.8 13 13c0 3.2-1.2 6.2-3.2 8.5l8.9 8.9c.4.3.4.9 0 1.3zM24 13c0-6.1-4.9-11-11-11S2 6.9 2 13s4.9 11 11 11 11-4.9 11-11z" fillRule="evenodd" clip-rule="evenodd"></path></svg></i>
                                                    </div> 
                                                    <input type="text" placeholder="Tên Ngành Hàng" resize="vertical" rows="2" minrows="2" restrictiontype="input" max="Infinity" min="-Infinity" className="input__input"/>
                                                </div>
                                            </div> 
                                            <div className="global-project-guide-text" >Chọn ngành hàng chính xác, 
                                                <a href="https://banhang.shopee.vn/edu/category-guide" target="_blank">bấm vào đây để tìm hiểu</a>
                                            </div>
                                        </div>
                                        <div className="category-wrap">
                                            <div className="btn-wrap-left" style={{display: 'none'}}>
                                                <button type="button" className="cat-btn">
                                                    <i className="icon"><svg viewBox="0 0 32 32"><path d="M9.3 17.5l12 11c.6.6 1.5.6 2.1 0 .2-.2.4-.6.4-1s-.2-.8-.4-1l-10.9-10 10.9-10c.6-.6.6-1.5 0-2.1-.3-.3-.7-.4-1-.4-.4 0-.7.1-1 .4L9.5 15.3l-.1.1c-.3.3-.4.7-.4 1.1-.1.4 0 .9.3 1z"></path></svg></i>
                                                </button>
                                            </div>
                                            <div className="btn-wrap-right" style={{right: '0px', display: 'none'}}>
                                                <button type="button" className="cat-btn">
                                                    <i className="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M23.5 15.5l-12-11c-.6-.6-1.5-.6-2.1 0-.2.2-.4.6-.4 1s.2.8.4 1l10.9 10-10.9 10c-.6.6-.6 1.5 0 2.1.3.3.7.4 1 .4.4 0 .7-.1 1-.4l11.9-10.9.1-.1c.3-.3.4-.7.4-1.1.1-.4 0-.8-.3-1z"></path></svg></i>
                                                </button>
                                            </div>
                                            <div className="category-list" style={{left: '0%',width: '1500px'}}>
                                                {Array(5).fill().map((_, i) =>
                                                    <ul  className="scroll-item">
                                                        {i<=level?<>
                                                        {state.list_category.map(category=>{
                                                            if((i>0&&category.level==i && category.parent==state.list_choice[i-1].id && category.level>0) || (category.level==0 && i==0)){
                                                                return(
                                                                <li onClick={()=>setcategorychoice(i,category)} className={`category-item ${category.id==state.list_choice[i].id?'selected':''}`}>
                                                                    <p className="text-overflow">{category.title}</p> 
                                                                    {category.choice?'':
                                                                    <div className="category-item-right">
                                                                        <i className="icon-next icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M23.5 15.5l-12-11c-.6-.6-1.5-.6-2.1 0-.2.2-.4.6-.4 1s.2.8.4 1l10.9 10-10.9 10c-.6.6-.6 1.5 0 2.1.3.3.7.4 1 .4.4 0 .7-.1 1-.4l11.9-10.9.1-.1c.3-.3.4-.7.4-1.1.1-.4 0-.8-.3-1z"></path></svg></i>
                                                                    </div>}
                                                                </li>)
                                                            }
                                                        })}
                                                        </>:''}
                                                    </ul>
                                                )}
                                                
                                            </div>
                                        </div>
                                    </div>
                                    <div className="category-selected">
                                        <span className="label">Đã chọn :</span>
                                        {state.list_choice.some(item=>item.id!=null)?
                                        <>
                                            {state.list_choice.map((item,i)=>{
                                                if(item.id!=null){
                                                    return(
                                                    <span data-v-f8ed38d6="" className="cat-selected-item">
                                                        {i==0?
                                                        <span data-v-f8ed38d6="" style={{display: 'none'}}>&gt;</span>
                                                        :<span data-v-f8ed38d6="">&gt;</span>}
                                                            {item.title}
                                                    </span>)
                                                }
                                            })}
                                        </>:
                                        <span className="no-select">Chưa chọn ngành hàng</span>}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-1">
                                <button onClick={()=>submit()}  className={`btn-l ${formData.name.trim().length>=10 && state.list_choice.some(item=>item.choice)?'':'disable'} btn-orange`} type="button">Next</button>
                            </div>
                        </div>}
                    </div>
                </div>:''}
            </div>
        
        </>
    )
}
export default Detailproduct