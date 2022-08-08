
import Sidebamenu from "./Sidebar-menu"
import axios from 'axios';
import Navbar from "./Navbar"
import { useParams,Link, useNavigate } from "react-router-dom";
import React, {useState,useEffect} from 'react'
import {groupBy} from "../constants"
import ProductDetail from "./Product"
import {newproductURL,shippingshopURL,} from "../urls"
import { headers } from "../actions/auth";
const Newproduct=()=>{
    const [state,setState]=useState({list_category:[],list_choice:[],list_media:[],category:null,
    list_color:[],list_size:[],position:0})
    const [level,setLevel]=useState(0)
    const [variation,setVariation]=useState([])

    const [keyword,setKeyword]=useState('')
    const [shipping,setShipping]=useState()
    const [show,setShow]=useState(false)
    const [loading,setLoading]=useState(false)
    const [formData,setformData]=useState({name:'',description:'',height:null,length:null,weight:null,
    price:'',sku_product:'',status:'1',sku:'',inventory:''})
    const [buymore,setBuymore]=useState([])
    const navigate=useNavigate ();
    useEffect(() => {
           axios.get(newproductURL)
           .then(res=>{
            const max_level=res.data.list_category.reduce((arr,obj)=>arr.level>obj.level?arr:obj).level
            const list_null=Array(max_level+1).fill().map((_, i) =>{
                return {id:null,title:null}
            })
            setState({...state,list_category:res.data.list_category,list_choice:list_null,max_level:max_level+1})
            })
            setLoading(true)
    },[])
    
    const setcategorychoice=(i,category)=>{
            setLevel(i+1)
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
            setState({...state,list_choice:list_choices,position:i})
    }
    
    const submit=()=>{
        axios.get(shippingshopURL,headers)
        .then(res=>{
            setShipping(groupBy(res.data.shipping_shop,'method'))
            const list_image=Array(9).fill().map((_, i) =>{
                return {id:null,file:null,file_preview:null,duration:0,filetype:'image'}
            })
            const shipping_item=res.data.shipping_shop.reduce((arr,obj)=>{
                if(!arr.map(a=>a['method']).includes(obj['method'])){
                    arr.push({method:obj['method'],enable:false,show:false})
                }
                return arr
            },[])
            const list_medias=[...list_image,{id:null,file:null,file_preview:null,duration:0,filetype:'video'}]
            setState({...state,list_media:list_medias,shipping_item:shipping_item})
            setShow(true)
        })
    }
    const setshow=(value)=>{
        setShow(value)
    }
   const setfiltercategory=(e)=>{
        setKeyword(e.target.value)
        setLevel(0)
   }
   console.log(state.list_choice)
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
                                        <input onChange={(e)=>setformData({...formData,'name':e.target.value})} type="text" className="form-select name" value={formData.name} id="nameproduct" placeholder="Name Product" minLength="10" maxLength="120"  required/>
                                        <div className="input__suffix">
                                            <span className="input__suffix-split"></span>
                                            {formData.name.length}/120
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
                                                        <i className="input__prefix-icon icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M31.7 31.7c-.4.4-1 .4-1.3 0l-8.9-8.9c-2.3 2-5.2 3.2-8.5 3.2-7.2 0-13-5.8-13-13S5.8 0 13 0s13 5.8 13 13c0 3.2-1.2 6.2-3.2 8.5l8.9 8.9c.4.3.4.9 0 1.3zM24 13c0-6.1-4.9-11-11-11S2 6.9 2 13s4.9 11 11 11 11-4.9 11-11z" fillRule="evenodd" clipRule="evenodd"></path></svg></i>
                                                    </div> 
                                                    <input value={state.category} onChange={(e)=>setfiltercategory(e)} type="text" placeholder="Tên Ngành Hàng" resize="vertical" rows="2" minrows="2" restrictiontype="input" max="Infinity" min="-Infinity" className="input__input"/>
                                                </div>
                                            </div> 
                                            <div className="global-project-guide-text" >Chọn ngành hàng chính xác, 
                                                <a href="https://banhang.shopee.vn/edu/category-guide" target="_blank">bấm vào đây để tìm hiểu</a>
                                            </div>
                                        </div>
                                        <div className={`${state.category!=null && state.category!='' && !state.list_category.some(category=>category.title.toUpperCase().indexOf(state.category.toUpperCase())>-1)?`category-wrap`:'category_list no-reseach'}`}>
                                            {state.category!=null &&state.category!=''&& !state.list_category.some(category=>category.title.toUpperCase().indexOf(state.category.toUpperCase())>-1)?
                                            <div data-v-f8ed38d6="" className="text-center">
                                            <img data-v-f8ed38d6="" src="data:image/png;base64,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" className="no-result-img"/> 
                                            <p data-v-f8ed38d6="">Không tìm thấy kết quả phù hợp.</p></div>:
                                            <>
                                            <div className="btn-wrap-left" style={{display: `${state.list_choice.filter(item=>item.id!=null && !item.choice).length>2 && state.position>1?'':'none'}`}}>
                                                <button onClick={()=>setState({...state,position:0})} type="button" className="cat-btn">
                                                    <i className="icon"><svg viewBox="0 0 32 32"><path d="M9.3 17.5l12 11c.6.6 1.5.6 2.1 0 .2-.2.4-.6.4-1s-.2-.8-.4-1l-10.9-10 10.9-10c.6-.6.6-1.5 0-2.1-.3-.3-.7-.4-1-.4-.4 0-.7.1-1 .4L9.5 15.3l-.1.1c-.3.3-.4.7-.4 1.1-.1.4 0 .9.3 1z"></path></svg></i>
                                                </button>
                                            </div>
                                            <div className="btn-wrap-right" style={{right: '0px', display: `${state.list_choice.filter(item=>item.id!=null && !item.choice).length>2 && state.position<1?'':'none'}`}}>
                                                <button onClick={()=>setState({...state,position:3})} type="button" className="cat-btn">
                                                    <i className="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M23.5 15.5l-12-11c-.6-.6-1.5-.6-2.1 0-.2.2-.4.6-.4 1s.2.8.4 1l10.9 10-10.9 10c-.6.6-.6 1.5 0 2.1.3.3.7.4 1 .4.4 0 .7-.1 1-.4l11.9-10.9.1-.1c.3-.3.4-.7.4-1.1.1-.4 0-.8-.3-1z"></path></svg></i>
                                                </button>
                                            </div>
                                            <div className="category-list" style={{left: `${state.list_choice.filter(item=>item.id!=null && !item.choice).length<3?0:state.position<2?'0':-20}%`,width: `${(state.max_level+1)*300}px`}}>
                                                {Array(state.max_level).fill().map((_, i) =>
                                                    <ul key={i} className="scroll-item">
                                                        {i<=level?<>
                                                        {state.list_category.map(category=>{
                                                            if((i>0 && category.level==i && category.parent==state.list_choice[i-1].id && category.level>0) || (category.level==0 && i==0 && category.title.indexOf(keyword)>-1)){
                                                                return(
                                                                <li key={category.id} onClick={()=>setcategorychoice(i,category)} className={`category-item ${category.id==state.list_choice[i].id?'selected':''}`}>
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
                                                <ul  className="scroll-item"></ul>
                                                </div></>}
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
export default Newproduct