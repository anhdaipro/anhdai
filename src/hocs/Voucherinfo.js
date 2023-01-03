import axios from 'axios';
import Navbar from "../seller/Navbar"
import Timeoffer from "./Timeoffer"
import {Link,useNavigate, useParams} from 'react-router-dom'
import Productoffer from "../seller/promotions/Productoffer"
import React, {useState,useEffect,useCallback,memo,useMemo} from 'react'
import Pagination from "./Pagination"
import {detailvoucherURL, vouchershopURL} from "../urls"
import {formatter,valid_from,valid_to,time_end,timevalue,timesubmit} from "../constants"
import {headers} from "../actions/auth"
let Pagesize=5
const Voucherinfo=(props)=>{
    const navigate=useNavigate();
    const [state,setState]=useState({timeSecond:5,code_type:[{image:'http://localhost:8000/media/my_web/shop.png',value:'All',name:"All product"},
        {image:'http://localhost:8000/media/my_web/product.png',value:'Product',name:"Product"}],
        discount_type:[{value:'1',name:"Percent"},{value:'2',name:"Amount"}],voucher_type:[
        {value:'Offer'},{value:'Complete coin'}],setting_display:[
        {value:'Show many',name:'Show many places'},{value:'Not public',name:'not public'},
        {value:'Share',name:'Share througth code vourcher'}],
        limit:[{value:'L',name:'Limited'},{value:'U',name:'Unlimited'}],open_discount:false,open_time:false})
    const [voucher,setVoucher]=useState({name_of_the_discount_program:'',code_type:'All',code:'',
        discount_type:'1',amount:null,percent:null,
        maximum_usage:null,voucher_type:"Offer",maximum_discount:0,minimum_order_value:null,
        valid_from:valid_from.toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).substr(0,16),
        valid_to:valid_to.toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).substr(0,16),
        setting_display:'Show many'})
    const [itemshop,setItem]=useState({items:[],page_count_main:0,items_choice:[],savemain:false
        ,page_count_by:0,byproduct:[],byproduct_choice:[],savebyproduct:false})
    const [open,setOpen]=useState(false)
    const [show,setShow]=useState({items:false,byproduct:false})
    const [currentPage, setCurrentPage] = useState({items:1,byproduct:1});
    const [loading,setLoading]=useState(false)
    const [timeend,setTime_end]=useState(()=>time_end.toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).substr(0,16))
    const [timestart,setTime_start]=useState(()=>new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).substr(0,16))
    const {id}=useParams()
    const [editprogram,setEditprogram]=useState(true)
    const edit =id?true:false
    const url_voucher=id?`${detailvoucherURL}/${id}`:vouchershopURL
    useEffect(() => {
        (async () => {
            if(id){
                const res = await axios(url_voucher,headers())
                const data=res.data
                const limit=data.maximum_discount==null?'U':'L'
                setVoucher({...data,limit:limit,valid_from:timesubmit(data.valid_from),valid_to:timesubmit(data.valid_to)})
                setLoading(true)
                setTime_end(timesubmit(data.valid_to))
                setTime_start(timesubmit(data.valid_from))
                if (new Date(data.valid_from)<=new Date()  && new Date(data.valid_to) >=new Date()){
                    setEditprogram(false)
                }
                setItem({...itemshop,items_choice:data.products,page_count_main:Math.ceil(data.products.length / Pagesize)})
            }
            else{
                setLoading(true)
            }
        })();
    }, [id]);
    
    const currentitemPage=useMemo(()=>{
        const firstPageIndex = (currentPage.items - 1) * Pagesize;
        const lastPageIndex = firstPageIndex + Pagesize;
        return itemshop.items_choice.slice(firstPageIndex, lastPageIndex);
    },[currentPage,itemshop.items_choice])
    const setshow=(sho,name)=>{
        setShow({...show,[name]:sho})
    }

    
    const opendiscount=(e)=>{
        setState({...state,open_discount:!state.open_discount})
        window.onclick=(event)=>{
            let parent=event.target.closest('.select__menu')
            if(!e.target.contains(event.target) && !parent){
                setState({...state,open_discount:false})
            }
        }
    }
    
    const handlePageChange=useCallback((page,name)=>{
        setCurrentPage({...currentPage,[name]:page})
    },[currentPage])

    const setform=(e)=>{
        setVoucher({...voucher,[e.target.name]:e.target.value})
    }
    
    const valid=voucher.name_of_the_discount_program && voucher.code && voucher.minimum_order_value && editprogram
    const complete= async ()=>{
        if(valid){
            const datavoucher=voucher
            delete datavoucher.products
            const data={list_items:itemshop.items_choice.map(item=>{
                return(item.id)
            }),...datavoucher}
            
            const res= await axios.post(url_voucher,JSON.stringify(data),headers())
            const countDown = setInterval(() => {
                state.timeSecond--;
                setState({...state,complete:true})
                if (state.timeSecond <= 0) {
                    clearInterval(countDown)
                    setState({...state,complete:false})
                    navigate('/marketing/vouchers/list')
                }
            }, 1000);
        }
        else{
            return
        }
    }

    const setcheckitem=(item,product,keys)=>{
        const list_item=product.map(ite=>{
            if(item.id==ite.id){
                return({...ite,check:!ite.check})
            }
            else{
                return({...ite})
            }
        })
        setItem({...itemshop,[keys]:list_item})
       
    }

    const setcheckall=(e,list_items,keys,value,value_choice)=>{
        const listitems=value.map(item=>{
            if(e.target.checked){
                return({...item,check:list_items.some(product=>product.id==item.id)?true:item.check})
            }
            return({...item,check:list_items.some(product=>product.id==item.id) && !item.disable?false:item.check})
        })
       
        setItem({...itemshop,[keys]:listitems})
    }

    const submit=()=>{
        const list_itemscheck=itemshop.items.filter(ite=>ite.check && !itemshop.items_choice.some(item=>item.id==ite.id))
        const list_itemschoice=list_itemscheck.map(item=>{
            return({...item,check:false,enable:true})
        })
        itemshop.items_choice=[...list_itemschoice,...itemshop.items_choice]
        setItem({...itemshop,items_choice:itemshop.items_choice})
        setShow({...show,items:false})
    }

    
    const removeitem=(itemmove,keys,value,keys_choice,value_choice,page_current)=>{
        const list_itemchoice=value_choice.filter(item=>item.id!=itemmove.id)
        const list_item=value.map(ite=>{
            if(ite.id==itemmove.id){
                return({...ite,check:false})
            }
            else{
                return({...ite})
            }
        })
        setItem({...itemshop,[keys]:list_item,[keys_choice]:list_itemchoice})
        setpageitem(keys,list_itemchoice,page_current)
    }

    const setpageitem=(keys,list_itemchoice,page_current)=>{
        const page=list_itemchoice.length==0?1:page_current>=Math.ceil(list_itemchoice.length / Pagesize)?Math.ceil(list_itemchoice.length / Pagesize):page_current
        setCurrentPage({...currentPage,[keys]:page})
        handlePageChange(page,keys)
    }
    
    const setdatevalid=(index,date)=>{
        if(index==0){
            setVoucher({...voucher,valid_from:date.time.toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).substr(0,10)+' '+('0'+date.hours).slice(-2)+':'+("0"+date.minutes).slice(-2)})
        }
        else{
            setVoucher({...voucher,valid_to:date.time.toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).substr(0,10)+' '+('0'+date.hours).slice(-2)+':'+("0"+date.minutes).slice(-2)})
        }
    }

    const additem=(e)=>{
        setLoading(true)
        setShow({...show,items:true,byproduct:false})
        if(itemshop.items.length==0){
            let url= new URL(url_voucher)
            let search_params=url.searchParams
            search_params.set('item','item')
            url.search = search_params.toString();
            let new_url = url.toString();
            axios.get(new_url,headers())
            .then(res=>{
                const items=res.data.filter(item=>itemshop.byproduct_choice.every(itemchoice=>item.id!=itemchoice.id))
                const list_items=items.map(item=>{
                if(itemshop.items_choice.some(product=>product.id==item.id)){
                    return({...item,check:true,disable:true})
                }
                return({...item,check:false})
                })
                setItem({...itemshop,itemshops:res.data,items:list_items,page_count_main:Math.ceil(list_items.length / Pagesize)})  
            })
        }  
        else{
            const items=itemshop.items.filter(item=>itemshop.byproduct_choice.every(itemchoice=>item.id!=itemchoice.id))
            const list_items=items.map(item=>{
                if(itemshop.items_choice.some(product=>product.id==item.id)){
                    return({...item,check:true,disable:true})
                }
                return({...item,check:false})
                })
            setItem({...itemshop,items:list_items,page_count_main:Math.ceil(list_items.length / Pagesize)})  
        }
    }

    const setdiscount=(item)=>{
        setVoucher({...voucher,discount_type:item.value})
        setState({...state,open_discount:false})
    }

    return(
        <>
            <div id="app">
                <Navbar/>
                <div className="wrapper">
                    {loading &&(<div className="content-wrapper">
                        <div className="banner">
                            Tạo mã giảm giá mới
                        </div>
                        <div className="voucher-shop-container">
                            <div className="vourcher-shop">
                                <div className="voucher-basic-info">
                                    <h4>info basic</h4>
                                    <div className="basic-info-wrapper">
                                        <div>
                                            <div className="item-base-lines">
                                                <label for="" className="form-item__label">Code type</label>
                                                <div className="d-flex">
                                                    {state.code_type.map(item=>
                                                    <div onClick={()=>setVoucher({...voucher,code_type:item.value})} className="voucher-card">
                                                        <img src={item.image} alt=""/>
                                                        <span className="mx-1">Voucher {item.name}</span> 
                                                        <div className={`top-right ${item.value==voucher.code_type?'top-right-active':''}`}>
                                                            <i className="icon icons _197TMCnJUWA9y6pE8Fp4-1">
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M4.03 7.47a.75.75 0 00-1.06 1.06l3.358 3.359a.75.75 0 001.06 0l5.863-5.862a.75.75 0 00-1.061-1.06l-5.332 5.33L4.03 7.47z"></path></svg>
                                                            </i>
                                                        </div>
                                                    </div>
                                                    )}  
                                                </div>
                                            </div>
                                            <div className="item-base-lines ">
                                                <label for="" className="form-item__label">
                                                    Name of the discount program 
                                                </label>
                                                <div className="item-col">
                                                    <div className="input-inner" style={{width: '450px'}}> 
                                                        <input onChange={(e)=>setform(e)} type="text" value={voucher.name_of_the_discount_program}  className="form-select" name="name_of_the_discount_program" placeholder="Enter" style={{width: '450px'}} required/>
                                                        <div className="input__suffix"></div>
                                                    </div>
                                                    <div className="info_more">Coupon name not visible to buyers</div>
                                                </div>
                                            </div>
                                            <div className="item-base-lines ">
                                                <label for="" className="form-item__label">Voucher code</label>
                                                <div className="item-col">
                                                    <div className="input-inner" style={{width: '450px'}}> 
                                                        <input onChange={(e)=>setform(e)} type="text" value={voucher.code.toUpperCase()} className="form-select" name="code" maxLength="5" placeholder="Enter" style={{width: '450px'}} required/>
                                                        <div className="input__suffix"></div>
                                                    </div>
                                                    <div className="info_more">
                                                        <p>Please enter only alphabetic characters (A-Z), numbers (0-9); maximum 5 characters.</p> 
                                                        <p>The full discount code is:EB7P</p> 
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="item-base-lines ">
                                                <label for="" className="form-item__label">Time to save discount code</label>
                                                <Timeoffer
                                                   edit={edit}
                                                    data={voucher}
                                                    valid_from={voucher.valid_from}
                                                    valid_to={voucher.valid_to}
                                                    time_end={timevalue(time_end)}
                                                    time_start={timestart}
                                                    setdatevalid={(index,date)=>setdatevalid(index,date)}
                                                 
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <img src="https://deo.shopeemobile.com/shopee/seller-live-sg/rootpages/static/modules/vouchers/image/multilang_voucher_illustration_vn.29df4f1.png" alt=""/>
                                        </div>
                                    </div>
                                </div>
                                <div className="voucher-reward-setting">
                                    <h4>Setting basic</h4>
                                    
                                        <div >
                                            <div className="item-base-lines reward-type-form">
                                                <label for="" className="form-item__label">Type voucher</label>
                                                <div className="d-flex">   
                                                    {state.voucher_type.map(item=>
                                                    <div onClick={()=>setVoucher({...voucher,voucher_type:item.value})} className="custom-radio">
                                                        <label className="check_input">{item.value}
                                                            <input type="radio" checked={item.value===voucher.voucher_type?true:false} name="voucher_type"/>
                                                            <span className="checkmark"></span>
                                                        </label>
                                                    </div>
                                                    )}  
                                                </div>
                                            </div>
                                            <div className="smart_discount" >
                                                <div>Smart discount code</div>
                                                <input type="checkbox" value="" className="switch_1 " name="check" />
                                            </div>
                                            <div className="item-base-lines">  
                                                <label className="form-item__label" for="price" >Discount type</label>
                                                <div className="form-item__control">
                                                    <div className="form-item__content">
                                                        <div className="discount-amount">
                                                            <div className="input-group discount-amount-group d-flex">
                                                                <span onClick={(e)=>opendiscount(e)} className="input-group__prepend" style={{width: '160px'}}>
                                                                    <div className="select discount-type">
                                                                        <div tabIndex="0" className="selector item-space selector--normal">
                                                                            <div className="selector__inner line-clamp--1">{voucher.discount_type=='1'?"Percent":'Amount'}</div> 
                                                                            <div className="selector__suffix">
                                                                                <i className="selector__suffix-icon icon">
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M8,9.18933983 L4.03033009,5.21966991 C3.73743687,4.9267767 3.26256313,4.9267767 2.96966991,5.21966991 C2.6767767,5.51256313 2.6767767,5.98743687 2.96966991,6.28033009 L7.46966991,10.7803301 C7.76256313,11.0732233 8.23743687,11.0732233 8.53033009,10.7803301 L13.0303301,6.28033009 C13.3232233,5.98743687 13.3232233,5.51256313 13.0303301,5.21966991 C12.7374369,4.9267767 12.2625631,4.9267767 11.9696699,5.21966991 L8,9.18933983 Z"></path></svg>
                                                                                </i>
                                                                            </div>
                                                                        </div> 
                                                                    </div>
                                                                </span> 
                                                                <span className="input-group__append">
                                                                    <div className="discount-amount-wrapper _2a1tAIRs54WPp0HU8eeDzK">
                                                                        <div className="input currency-input">
                                                                            <div className="input__inner input__inner--normal    item-center">
                                                                                {voucher.discount_type=="2"?
                                                                                <>
                                                                                <div className="input__prefix">₫
                                                                                    <span className="input__prefix-split"></span>
                                                                                </div> 
                                                                                <input onChange={(e)=>setform(e)} value={voucher.amount} type="text" placeholder="Nhập vào" name='amount' resize="vertical" rows="2" minrows="2" maxLength="13" restrictiontype="value" max="Infinity" min="-Infinity" className="input__input"/>
                                                                                </>:
                                                                                <>
                                                                                <input type="text" onChange={(e)=>setform(e)} value={voucher.percent} placeholder=" " name='percent' size="normal" resize="vertical" rows="2" minrows="2" restrictiontype="value" max="Infinity" min="-Infinity" className="input__input"/> 
                                                                                <div className="input__suffix"><span className="input__suffix-split"></span>%GIẢM</div>
                                                                                </>}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="popper" style={{display:state.open_discount?'block':'none',top:'110%',position:'absolute'}}> 
                                                        <div className="select__menu" style={{maxWidth: '440px', maxHeight: '218px'}}>
                                                            <div className="scrollbar">
                                                                <div className="scrollbar__wrapper">
                                                                    <div className="scrollbar__bar vertical">
                                                                        <div className="scrollbar__thumb" style={{top: '0px', height: '0px'}}></div>
                                                                    </div>  
                                                                    <div className="scrollbar__content" style={{position: 'relative'}}>
                                                                        <div className="select__options">
                                                                            {state.discount_type.map(item=>
                                                                                <div onClick={(e)=>setdiscount(item)} data-v-0d5f8626="" className={`option ${item.value==voucher.discount_type?'selected':''}`}>{item.name}</div>     
                                                                            )}
                                                                            
                                                                        </div>
                                                                        <div className="resize-triggers">
                                                                            <div className="expand-trigger">
                                                                                <div style={{width: '1px', height: '1px'}}></div>
                                                                            </div>
                                                                            <div className="contract-trigger"></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div> 
                                                        <p className="select__filter-empty" style={{display: 'none'}}></p> 
                                                    </div>
                                                </div>
                                            </div>
                                            {voucher.discount_type=='1'?
                                            <div className="item-base-lines mb-1">                                        
                                                <label className="form-item__label" for="discount_price" >Maximum discount</label>                                          
                                                <div className="max_discount-option">
                                                    <div className="d-flex pb-1">
                                                        {state.limit.map(item=>
                                                        <div onClick={()=>setVoucher({...voucher,limit:item.value})} className=" custom-radio">
                                                            <label className="check_input">{item.name}
                                                                <input type="radio" checked={voucher.limit==item.value?true:false} className="custom-input"/>
                                                                <span className="checkmark"></span>
                                                            </label>
                                                        </div>
                                                        )}  
                                                    </div>
                                                    {voucher.limit=='L'?
                                                    <div className="form-item__control">
                                                        <div className="form-item__content">
                                                            <div className="input currency-input max-voucher-amount">
                                                                <div className="input__inner input__inner--normal    item-center">
                                                                    <div className="input__prefix">
                                                                        ₫<span className="input__prefix-split"></span>
                                                                    </div> 
                                                                    <input onChange={(e)=>setVoucher({...voucher,maximum_discount:e.target.value})} type="text" placeholder="Nhập vào" resize="vertical" rows="2" minrows="2" maxlength="13" restrictiontype="value" max="Infinity" min="-Infinity" className="input__input"/> 
                                                                </div>
                                                            </div>
                                                        </div> 
                                                    </div>:''}
                                                </div>
                                            </div>:''}
                                            <div className="item-base-lines minium-basket-prize ">
                                                <label className="form-item__label" for="price" >Minimum order value</label>
                                                <div className="input-inner" style={{width: '400px'}}> 
                                                    <input onChange={(e)=>setform(e)} type="text" className="form-select weigth" value={voucher.minimum_order_value} name="minimum_order_value" placeholder="Enter" style={{width: '400px'}} required/>
                                                </div>
                                            </div>
                                            <div className="item-base-lines prize-quntity">
                                                <label className="form-item__label" for="price" >Maximum usage</label>
                                                <div className="my-1">
                                                    <div className="input-inner" style={{width: '400px'}}> 
                                                        <input onChange={(e)=>setform(e)} type="text" className="form-select" value={voucher.maximum_usage} name="maximum_usage" placeholder="Enter" style={{width: '400px'}} required/>
                                                    </div>
                                                    <div className="info_more"><p className="reminder">Tổng số Mã giảm giá có thể sử dụng</p></div>
                                                </div>
                                            </div>
                                        </div>
                                    
                                </div>
                                <div className="voucher-display">
                                    <h2>Show discount codes and applicable products</h2>
                                    <div className="item-base-lines">                                   
                                        <label className="form-item__label" for="price" >Setting display</label>
                                        <div className="item-col">
                                            {state.setting_display.map(item=>
                                                <div onClick={()=>setVoucher({...voucher,setting_display:item.value})} className="custom-radio pb-1">
                                                    <label className="check_input">{item.name}
                                                        <input type="radio" name="setting_display" checked={item.value==voucher.setting_display?true:false} className="custom-input"/>
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className=" item-base-lines">
                                        <label className="form-item__label" for="price" >Product apply</label>
                                        <div className="change-product">
                                            {voucher.code_type=='All'?`All product`:
                                            itemshop.items_choice.length>0?
                                            <>
                                            <div className="item-spaces mb-1">
                                                <div className="add-product_hint">
                                                    <span className="count_number"></span> selected products
                                                </div>
                                                <div className="change-item">
                                                    <button onClick={(e)=>additem(e)} className="button--primary btn-m add-product item-center">
                                                        <i className="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8.48176704,1.5 C8.75790942,1.5 8.98176704,1.72385763 8.98176704,2 L8.981,7.997 L15,7.99797574 C15.2761424,7.99797574 15.5,8.22183336 15.5,8.49797574 C15.5,8.77411811 15.2761424,8.99797574 15,8.99797574 L8.981,8.997 L8.98176704,15 C8.98176704,15.2761424 8.75790942,15.5 8.48176704,15.5 C8.20562467,15.5 7.98176704,15.2761424 7.98176704,15 L7.981,8.997 L2,8.99797574 C1.72385763,8.99797574 1.5,8.77411811 1.5,8.49797574 C1.5,8.22183336 1.72385763,7.99797574 2,7.99797574 L7.981,7.997 L7.98176704,2 C7.98176704,1.72385763 8.20562467,1.5 8.48176704,1.5 Z"></path></svg></i>
                                                        <span className="ml-1_2">Add product</span>  
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="content-vocher ">
                                                <div className="table__header--container" style={{width: '760px'}}>
                                                    <div className="item" style={{width:'320px'}}>
                                                        <div className="">Product</div>
                                                    </div>
                                                    <div className="item-center voucher-heading">
                                                        <div className='item-prices'>
                                                            Price
                                                        </div>
                                                        <div className="item-stocks item-center">
                                                            <span>Inventory</span>
                                                            <div className="item-label-icon">
                                                                <div className="popover__ref item-center">
                                                                    <i className="icon table__cell-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8,1 C11.8659932,1 15,4.13400675 15,8 C15,11.8659932 11.8659932,15 8,15 C4.13400675,15 1,11.8659932 1,8 C1,4.13400675 4.13400675,1 8,1 Z M8,2 C4.6862915,2 2,4.6862915 2,8 C2,11.3137085 4.6862915,14 8,14 C11.3137085,14 14,11.3137085 14,8 C14,4.6862915 11.3137085,2 8,2 Z M7.98750749,10.2375075 C8.40172105,10.2375075 8.73750749,10.5732939 8.73750749,10.9875075 C8.73750749,11.401721 8.40172105,11.7375075 7.98750749,11.7375075 C7.57329392,11.7375075 7.23750749,11.401721 7.23750749,10.9875075 C7.23750749,10.5732939 7.57329392,10.2375075 7.98750749,10.2375075 Z M8.11700238,4.60513307 C9.97011776,4.60513307 10.7745841,6.50497267 9.94298079,7.72186504 C9.76926425,7.97606597 9.56587088,8.14546785 9.27050506,8.31454843 L9.11486938,8.39945305 L8.95824852,8.47993747 C8.56296349,8.68261431 8.49390831,8.75808648 8.49390831,9.0209925 C8.49390831,9.29713488 8.27005069,9.5209925 7.99390831,9.5209925 C7.71776594,9.5209925 7.49390831,9.29713488 7.49390831,9.0209925 C7.49390831,8.34166619 7.7650409,7.99681515 8.35913594,7.6662627 L8.76655168,7.45066498 C8.9424056,7.3502536 9.04307851,7.26633638 9.11735517,7.1576467 C9.52116165,6.56675314 9.11397414,5.60513307 8.11700238,5.60513307 C7.41791504,5.60513307 6.82814953,6.01272878 6.75715965,6.55275918 L6.75,6.66244953 L6.74194433,6.75232516 C6.69960837,6.98557437 6.49545989,7.16244953 6.25,7.16244953 C5.97385763,7.16244953 5.75,6.9385919 5.75,6.66244953 C5.75,5.44256682 6.87194406,4.60513307 8.11700238,4.60513307 Z"></path></svg></i>
                                                                </div>
                                                                <div className="information_more">Total products available</div>
                                                            </div>
                                                        </div>
                                                        <div className="item-action">
                                                            Action 
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="table__body-container" style={{width: '760px'}}>
                                                    <div className="item-shop">
                                                        {currentitemPage.map(item=>
                                                        <div key={item.id} className="item">
                                                            <div className="item-discount">
                                                                <div className="item_heading" style={{width:'320px'}}> 
                                                                    <div className="item-center" >
                                                                        <img src={item.image} alt="" width="40px" height="40px"/>
                                                                        <div className="item_detail">
                                                                            <div className="ellipsis-content">
                                                                                {item.name}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="d-flex item-center">
                                                                    <div className='item-prices'>
                                                                        ₫{formatter.format(item.min_price)} {item.min_price!=item.max_price?`- ${formatter.format(item.max_price)}`:''}
                                                                    </div>
                                                                    <div className="item-stocks">{item.total_inventory}</div>
                                                                    <div className="item-action">
                                                                        <button onClick={()=>removeitem(item,'items',itemshop.items,'items_choice',itemshop.items_choice,currentPage.items)} data-v-625f739d="" type="button" className="action button button--normal button--circle">
                                                                            <i className="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M2,4 C1.72385763,4 1.5,3.77614237 1.5,3.5 C1.5,3.22385763 1.72385763,3 2,3 L6,2.999 L6,2 C6,1.44771525 6.44771525,1 7,1 L10,1 C10.5522847,1 11,1.44771525 11,2 L11,2.999 L15,3 C15.2761424,3 15.5,3.22385763 15.5,3.5 C15.5,3.77614237 15.2761424,4 15,4 L14,4 L14,14 C14,14.5522847 13.5522847,15 13,15 L4,15 C3.44771525,15 3,14.5522847 3,14 L3,4 L2,4 Z M13,4 L4,4 L4,14 L13,14 L13,4 Z M6.5,7 C6.77614237,7 7,7.22385763 7,7.5 L7,11.5 C7,11.7761424 6.77614237,12 6.5,12 C6.22385763,12 6,11.7761424 6,11.5 L6,7.5 C6,7.22385763 6.22385763,7 6.5,7 Z M8.5,6 C8.77614237,6 9,6.22385763 9,6.5 L9,11.5 C9,11.7761424 8.77614237,12 8.5,12 C8.22385763,12 8,11.7761424 8,11.5 L8,6.5 C8,6.22385763 8.22385763,6 8.5,6 Z M10.5,7 C10.7761424,7 11,7.22385763 11,7.5 L11,11.5 C11,11.7761424 10.7761424,12 10.5,12 C10.2238576,12 10,11.7761424 10,11.5 L10,7.5 C10,7.22385763 10.2238576,7 10.5,7 Z M10,2 L7,2 L7,2.999 L10,2.999 L10,2 Z"></path></svg>
                                                                        </i></button>
                                                                    </div>
                                                                </div>
                                                            </div>   
                                                        </div> 
                                                        )}
                                                    </div>
                                                    <div className="with-assist">
                                                        <div className="item-center page-pagination">
                                                        <Pagination
                                                            classActive={`pager__page active`}
                                                            classNormal={`pager__page`}
                                                            classIcon={`pager__page`}
                                                            currentPage={currentPage.items}
                                                            totalCount={Math.ceil(itemshop.items_choice.length / Pagesize)}
                                                            Pagesize={Pagesize}
                                                            onPageChange={(page) => handlePageChange(page,'items')}
                                                        />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div></>:
                                            <button onClick={(e)=>additem(e)} className="button--primary btn-m add-product item-center">
                                                <i className="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8.48176704,1.5 C8.75790942,1.5 8.98176704,1.72385763 8.98176704,2 L8.981,7.997 L15,7.99797574 C15.2761424,7.99797574 15.5,8.22183336 15.5,8.49797574 C15.5,8.77411811 15.2761424,8.99797574 15,8.99797574 L8.981,8.997 L8.98176704,15 C8.98176704,15.2761424 8.75790942,15.5 8.48176704,15.5 C8.20562467,15.5 7.98176704,15.2761424 7.98176704,15 L7.981,8.997 L2,8.99797574 C1.72385763,8.99797574 1.5,8.77411811 1.5,8.49797574 C1.5,8.22183336 1.72385763,7.99797574 2,7.99797574 L7.981,7.997 L7.98176704,2 C7.98176704,1.72385763 8.20562467,1.5 8.48176704,1.5 Z"></path></svg></i>
                                                <span className="ml-1_2">Add product</span>  
                                            </button>}
                                        </div>
                                    </div>
                                </div>  
                            </div>
                            <div className="bottom-card">
                                <div className="fix-container fixed-bottom">
                                    <div className="action-button">
                                        <button className="cancel-btn btn-m btn-light">Cancel</button>
                                        <button onClick={(e)=>complete(e)} className="submit save-btn btn-orange mr-1 btn-m" type="button" >Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>)}
                </div>
            </div>
            <div id="modal">
                <Productoffer
                    showmain={show.items}
                    showbyproduct={show.byproduct}
                    loading={loading}
                    items={itemshop.items}
                    limit={100}
                    sec={state.timeSecond}
                    text={voucher}
                    complete={state.complete}
                    items_choice={itemshop.items_choice}
                    byproduct={itemshop.byproduct}
                    byproduct_choice={itemshop.byproduct_choice}
                    setcheckitem={(item,product,keys)=>setcheckitem(item,product,keys)}
                    setcheckall={(e,items,keys,value)=>setcheckall(e,items,keys,value)}
                    submit={()=>submit()}
                    setshow={(sho,name)=>setshow(sho,name)}
                />
            </div>
            
        </>
    )
}
export default memo(Voucherinfo)