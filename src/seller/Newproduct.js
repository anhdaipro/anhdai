
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
    const [listmedia,setListmedia]=useState([])
    const [keyword,setKeyword]=useState('')
    const [shipping,setShipping]=useState()
    const [show,setShow]=useState(false)
    const [loading,setLoading]=useState(false)
    const [formData,setformData]=useState({name:'',description:'',height:null,length:null,weight:null,
    price:'',sku_product:'',status:'1',sku_classify:'',inventory:''})
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
            setState({...state,shipping_item:shipping_item})
            setShow(true)
            setListmedia(list_medias)
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
                            listmedia={listmedia}
                            list_choice={state.list_choice}
                            shipping_shop={shipping}
                            shipping_item={state.shipping_item}
                            list_buymore={buymore}
                            list_variation={variation}
                            setshow={value=>setshow(value)}
                        />
                        :
                        <div className="modal__mask" style={{zIndex: 1000014, display: `${show?'':'none'}`}}>
                            <div className="modal__container">
                                <div className="modal__box" style={{display: `${show?'':'none'}`}}>
                                    <div style={{width:'960px'}} className="modal__content modal__content--normal">
                                        <div className="modal__header">
                                            <div data-v-15e71864="" className="image-cropper-header">Chỉnh sửa nghành hàng</div>
                                        </div> 
                                        <div className="modal__body over-height" style={{position: 'relative'}}>
                                            <div className="category-selector-wrap">
                                                <div className="category-selector">
                                                    <div style={{display:'block'}} className="selector">
                                                        <div className="category-search">
                                                            <div className="input search-input">
                                                                <div className="input__inner input__inner--normal    item-center">
                                                                    <div className="input__prefix">
                                                                        <i className="input__prefix-icon icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M31.7 31.7c-.4.4-1 .4-1.3 0l-8.9-8.9c-2.3 2-5.2 3.2-8.5 3.2-7.2 0-13-5.8-13-13S5.8 0 13 0s13 5.8 13 13c0 3.2-1.2 6.2-3.2 8.5l8.9 8.9c.4.3.4.9 0 1.3zM24 13c0-6.1-4.9-11-11-11S2 6.9 2 13s4.9 11 11 11 11-4.9 11-11z" fillRule="evenodd" clipRule="evenodd"></path></svg></i>
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
                                                    
                                                </div>
                                            </div>
                                            
                                        </div> 
                                        <div className="modal__footer with-assist item-space" style={{justifyContent:'space-between'}}>
                                            <div className="category-selected">
                                                <span className="label">Đã chọn :</span>
                                                    {state.list_choice.some(item=>item.id)?
                                                        <>
                                                        {state.list_choice.map((item,i)=>{
                                                            if(item.id){
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
                                            <div>
                                                <button type="button" class="button button--normal"><span>Hủy</span></button>
                                                <button onClick={()=>submit()}  className={`btn-m ${state.list_choice.some(item=>item.choice)?'':'disable'} btn-orange`} type="button">Next</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>}
                    </div>
                </div>:''}
            </div>
        
        </>
    )
}
export default Newproduct