import axios from 'axios';
import React, {useState, useEffect,useCallback} from 'react'
import { Navigate, useNavigate } from 'react-router';
import { expiry, headers } from '../actions/auth';
import {address_null,localhost,checkoutURL,formatter,threadlURL,newshopURL,
    itemvariation,arraymove, savevoucherURL,updateAddressURL,cityListURL,listThreadlURL} from "../constants"
import Header from './Header';
const Newshop=()=>{
    const [city,setCity]=useState({list_city:[]})
    const [addresschoice,setAddressChoice]=useState({city_choice:{'name':null,'matp':null,level:1},
    district_choice:{'name':null,'matp':null,level:2,'maqh':null},
    town_choice:null,showcity:false})
    const [error,setError]=useState({name:true,address:true,town:true,phone_number:true})
    const [showerror,setshowError]=useState({name:false,address:false,town:false,phone_number:false})
    const [state,setState]=useState({address:null,loading:false,showcity:false,change:false,level:1,administrative_units:['Tỉnh/Thành phố','Quận/Huyện','Phường/Xã'], message:'',errors: {},address_chocie:''})
    const [show,setShow]=useState(false)
    const [data,setData]=useState(null)
    const navigate=useNavigate()
    const [address,setAddress]=useState({address:'',address_choice:'',default:false,name:null,phone_number:null,city:null,district:null,town:null});
    const [formData,setformData]=useState({name:null,phone_number:null,code:null,email:null})
    useEffect(() => {
        axios.get(newshopURL,headers)
        .then(res=>{
            if(res.data.address.length>0){
                setAddress(res.data.address[0])
            }
            setformData(res.data.info)
        })
    },[])

    const createAddress=()=>{
        setShow(true)
        if(city.list_city.length==0){
            axios.get(cityListURL)
            .then(res=>{
                const list_city=res.data.a
                setCity({list_city:list_city})
                if(address.id!=undefined){
                const city_choice=list_city.find(item=>item.name==address.city && item.level==1)
               
                const district_choice=list_city.find(item=>item.name==address.district && item.matp==city_choice.matp && item.level==2)
                const town_choice=list_city.find(item=>item.name==address.town && item.maqh==district_choice.maqh && item.level==3)
                setAddressChoice({city_choice:{name:address.city,matp:city_choice.matp,level:1},district_choice:{name:address.district,matp:district_choice.matp,level:2,maqh:district_choice.maqh},town_choice:{name:address.town,maqh:town_choice.maqh,level:3}})
                }
            })
        } 
    }
    
    

    function showcity(e){
        e.stopPropagation()
        setState({...state,showcity:true,level:district_choice.name!=null && town_choice.name==null?3:city_choice.name!=null && district_choice.name==null?2:1})
        window.onclick=(event)=>{
            let parent=event.target.closest('.seller-address-common-multiple-level-box')
            if(!e.target.contains(event.target) && !parent){
                setState({...state,change:false,showcity:false})
            }
        }
    }
    function setlevel(e,index){
        e.stopPropagation()
        setState({...state,level:index+1})
        window.onclick=(event)=>{
            let parent=event.target.closest('.seller-address-common-multiple-level-box')
            if(!e.target.contains(event.target) && !parent){
                setState({...state,change:false,showcity:false})
            }
        }
    }

    function setcity(e,city){
        e.stopPropagation()
        setcitychoice(city)
        setState({...state,change:true,level:2})
        window.onclick=(event)=>{
            let parent=event.target.closest('.seller-address-common-multiple-level-box')
            if(!e.target.contains(event.target) && !parent){
                setState({...state,change:false,showcity:false})
            }
        }
    }

    function setdistrict(e,city){
        e.stopPropagation()
        setdistrictchoice(city)
        setState({...state,change:true,level:3})
    }


    function settown(e,city){
        e.stopPropagation()
        settownchoice(city)
        setError({...error,town:false})
        setState({...state,change:false,level:1,showcity:false})
    }
    
    const setcitychoice=(city)=>{
        setAddressChoice({...addresschoice,city_choice:{'name':city.name,'matp':city.matp,level:1},district_choice:{'name':null,'matp':null,level:2,'maqh':null},
        town_choice:{'name':null,'maqh':null,level:3}})
    }

    const setdistrictchoice=(district)=>{
        setAddressChoice({...addresschoice,district_choice:{'name':district.name,'matp':district.matp,level:2,'maqh':district.maqh},town_choice:{'name':null,'maqh':null,level:3}})
    }

    const settownchoice=(town)=>{
        
        setAddressChoice({...addresschoice,town_choice:{'name':town.name,'maqh':town.maqh,level:3}})
    }
    const setaddressuser=(e,name)=>{
        setAddress({...address,[name]:e.target.value})
        if(e.target.value.trim()==''){
            setError({...error,[name]:true})
        }
        else{
            if(name=='phone_number' && isNaN(parseInt(e.target.value))){
                setError({...error,[name]:true})
            }
            else{
            setError({...error,[name]:false})
            }
        }
    }

    const setshowerror=(e,name)=>{
        setshowError({...showerror,[name]:false})
        window.onclick=(event)=>{
            if(!e.target.contains(event.target)){
                if(error[name]){
                    setshowError({...showerror,[name]:true})
                }
                else{
                    setshowError({...showerror,[name]:true})
                }
            }
        }
    }

    const saveinfo=()=>{
        let form=new FormData()
        form.append('name',formData.name)
        form.append('phone_number',formData.phone_number)  
        form.append('city',address.city_choice)  
        axios.post(newshopURL,form,headers)
        .then(res=>{
            
        })
    }
    const {list_city}=city
    console.log(Object.keys(error).map(item=>{return({item:error[item]})}))
    const {city_choice,district_choice,town_choice}=addresschoice
    const createaddress=()=>{
        if(Object.keys(error).map(item=>{return({error:error[item]})}).every(items=>!items.error)){
            let form=new FormData()
            form.append('name',address.name)
            form.append('phone_number',address.phone_number)   
            form.append('default',address.default)
            form.append('city',city_choice.name)
            form.append('district',district_choice.name)
            form.append('town',town_choice.name)
            form.append('address',address.address)
            form.append('address_type','B')
            form.append('address_choice',address.address_choice)
            axios.post(updateAddressURL,form,headers)
            .then(res=>{
                setAddress(res.data)
                setShow(false)
            })
        }
        else{
            setshowError(error)
        }
    }
    const setshow=(value)=>{
        setShow(value)
    }
    if(localStorage.token=='null' || expiry<0){
        window.location.href="/vendor/login"
    }
    console.log(address)
    return(
        <div id="app">
            <div data-v-5634b4d5="" className="onboarding-page">
                <Header/>
                <div data-v-5db6da35="" data-v-5634b4d5="" className="onboarding">
                    <div data-v-5db6da35="" className="onboarding-layout onboarding-layout">
                        <div className="onboarding-layout__header">
                            <div data-v-5db6da35="" className="flows-header"></div>
                        </div>
                        
                        <div className="onboarding-layout__main">
                            <div className="onboarding-layout__content onboarding-layout__card">
                                <div className="content">
                                    <div data-v-5db6da35="" className="flow-content">
                                        <div data-v-5db6da35="" className="flow-step-content">
                                            <div data-v-5db6da35="" className="steps-header">
                                                <div data-v-5db6da35="" className="onboarding-steps has-split" current="0">
                                                    <div className="onboarding-steps__wrap steps steps-label-vertical steps-auto-width steps-dot steps-max-width">
                                                        <div className="onboarding-steps__item step active step-dot">
                                                            <div className="step__head">
                                                                <span className="step__head-dot"></span>
                                                            </div> 
                                                            <div className="step__content step__content-single">
                                                                <div className="tooltip popover popover--dark">
                                                                    <div className="popover__ref">
                                                                        <div className="step-title">
                                                                            <span>Cài đặt thông tin cửa hàng</span>
                                                                        </div>
                                                                    </div> 
                                                                    <div className="popper popover__popper popover__popper--dark tooltip__popper" style={{display: 'none', maxWidth: '280px'}}>
                                                                        <div className="popover__content">Cài đặt thông tin cửa hàng</div>
                                                                        </div></div> 
                                                                    <div className="tooltip popover popover--dark">
                                                                        <div className="popover__ref"><div className="step-desc"><span>
                                                                            </span></div></div> 
                                                                            <div className="popper popover__popper popover__popper--dark tooltip__popper" style={{display: 'none', maxWidth: '280px'}}>
                                                                                <div className="popover__content"></div>
                                                            </div></div></div>
                                                            <div className="step__tail"></div>
                                                        </div>
                                                        <div className="onboarding-steps__item step disabled step-dot">
                                                            <div className="step__head">
                                                                <span className="step__head-dot"></span>
                                                            </div> 
                                                            <div className="step__content step__content-single">
                                                                <div className="tooltip popover popover--dark">
                                                                    <div className="popover__ref">
                                                                        <div className="step-title">
                                                                            <span>Cài đặt vận chuyển</span>
                                                                        </div>
                                                                    </div> 
                                                                    <div className="popper popover__popper popover__popper--dark tooltip__popper" style={{display: 'none', maxWidth: '280px'}}>
                                                                        <div className="popover__content">Cài đặt vận chuyển</div>
                                                                    </div>
                                                                </div> 
                                                                <div className="tooltip popover popover--dark">
                                                                    <div className="popover__ref">
                                                                        <div className="step-desc"><span></span></div>
                                                                    </div> 
                                                                    <div className="popper popover__popper popover__popper--dark tooltip__popper" style={{display: 'none', maxWidth: '280px'}}>
                                                                        <div className="popover__content"></div>
                                                                    </div>
                                                                </div>
                                                            </div> 
                                                            <div className="step__tail"></div>
                                                        </div>
                                                        <div className="onboarding-steps__item step disabled step-dot">
                                                            <div className="step__head">
                                                                <span className="step__head-dot"></span>
                                                            </div> 
                                                            <div className="step__content step__content-single">
                                                                <div className="tooltip popover popover--dark">
                                                                    <div className="popover__ref">
                                                                        <div className="step-title">
                                                                            <span>Đăng bán sản phẩm</span>
                                                                        </div>
                                                                    </div> 
                                                                    <div className="popper popover__popper popover__popper--dark tooltip__popper" style={{display: 'none', maxWidth: '280px'}}>
                                                                        <div className="popover__content">Đăng bán sản phẩm</div>
                                                                    </div>
                                                                </div> 
                                                                <div className="tooltip popover popover--dark">
                                                                    <div className="popover__ref">
                                                                        <div className="step-desc"><span></span></div>
                                                                    </div> 
                                                                    <div className="popper popover__popper popover__popper--dark tooltip__popper" style={{display: 'none', maxWidth: '280px'}}>
                                                                        <div className="popover__content"></div>
                                                                    </div>
                                                                </div>
                                                            </div> 
                                                            <div className="step__tail"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>  
                                            <div data-v-5db6da35="" className="step-content">
                                                <div data-v-204efa35="" data-v-5db6da35="" className="common-form">
                                                    <form data-v-204efa35="" autocomplete="off" className="">
                                                        <div data-v-204efa35="">
                                                            <div data-v-204efa35="" className="onboarding-form-item" prop="form_5_component_13_input" context="[object Object]" editable="1" label="Tên Shop" page_id="3016" required="required" maxlength="30" rules="[object Object]" show-word-limit="true">
                                                                <div className="form-item onboarding-form-item__inner" context="[object Object]" editable="1" page_id="3016" maxlength="30" show-word-limit="true" extra="">
                                                                    <label for="form_5_component_13_input" className="form-item__label">
                                                                        <span className="form-item__reqiured">*</span> Tên Shop
                                                                    </label> 
                                                                    <div className="form-item__control">
                                                                        <div className="form-item__content">
                                                                            <div data-v-204efa35="" className="onboarding-input" componentid="form_5_component_13_input" context="[object Object]" formdata="[object Object]" globalformdata="[object Object]" extra="" label="Tên Shop" page_id="3016" required="required" maxlength="30" rules="[object Object]" show-word-limit="true" style={{width: '384px'}}>
                                                                                <div className="input" componentid="form_5_component_13_input" context="[object Object]" formdata="[object Object]" globalformdata="[object Object]" extra="" label="Tên Shop" page_id="3016" rules="[object Object]">
                                                                                    <div className="input__inner input__inner--normal"> 
                                                                                        <input onChange={e=>setformData({...formData,name:e.target.value})} value={formData.name} type="text" placeholder="Nhập vào" resize="vertical" rows="2" minrows="2" required="required" maxlength="30"  max="Infinity" min="-Infinity" className="input__input"/> 
                                                                                        <div className="input__suffix">
                                                                                            <span className="input__count">{formData.name!=null?formData.name.length:0}/30</span>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>  
                                                                        <div className="form-item__extra"> </div>
                                                                    </div>
                                                                </div> 
                                                            </div>
                                                        </div>
                                                        <div data-v-204efa35="">
                                                            <div data-v-204efa35="" className="onboarding-form-item" prop="form_5_component_15_address" context="[object Object]" editable="1" label="Địa chỉ lấy hàng" page_id="3020" required="required" getshopaddress="function () { [native code] }" getshopaddressid="function () { [native code] }" region="vn" rules="[object Object]">
                                                                <div className="form-item onboarding-form-item__inner" context="[object Object]" editable="1" page_id="3020" getshopaddress="function () { [native code] }" getshopaddressid="function () { [native code] }" region="vn" extra="">
                                                                    <label for="form_5_component_15_address" className="form-item__label">
                                                                        <span className="form-item__reqiured">*</span> Địa chỉ lấy hàng
                                                                    </label> 
                                                                    <div className="form-item__control">
                                                                        <div className="form-item__content">
                                                                            <div data-v-6432e418="" data-v-204efa35="" className="pickup-address" componentid="form_5_component_15_address" context="[object Object]" editable="1" formdata="[object Object]" globalformdata="[object Object]" extra="" label="Địa chỉ lấy hàng" page_id="3020" required="required" region="vn" rules="[object Object]">
                                                                                {address.id!==undefined?<p data-v-6432e418="" className="pickup-address__content">
                                                                                    {address.name} | {address.phone_number}<br/>
                                                                                    {address.address}<br/>
                                                                                    {address.town}<br/>
                                                                                    {address.district}<br/>
                                                                                    {address.city}
                                                                                </p>:''}
                                                                                <button onClick={()=>createAddress()} data-v-6432e418="" type="button" className={`${address.id!=undefined?'button--link':''} button--normal`}>
                                                                                    <span>{address.id!=undefined?'Edit':'+ Thêm'}</span>
                                                                                </button> 
                                                                                {show? 
                                                                                <div data-v-6432e418="" className="seller-address-common-add-or-edit-address">
                                                                                    <div className="modal__mask" style={{zIndex: 1000010}}>
                                                                                        <div className="modal__container">
                                                                                            <div className="modal__box">
                                                                                                <div className="modal__content modal__content--large">
                                                                                                    <div className="modal__header">
                                                                                                        <div>
                                                                                                            <div>
                                                                                                                <div className="title">Thêm Địa Chỉ Mới</div> 
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div> 
                                                                                                    <div className="modal__body over-height" style={{position: 'relative'}}>
                                                                                                        <div className="address-add-or-edit">
                                                                                                            <div>
                                                                                                                <div>
                                                                                                                    <div className="seller-address-common-personal-address-form" addresses="">
                                                                                                                        <form autocomplete="off" className="form--label-top">
                                                                                                                            <div className={`form-item ${error.name && showerror.name?'form-item--error':''}`}>
                                                                                                                                <label for="name" className="form-item__label"> Họ &amp; Tên</label> 
                                                                                                                                <div className="form-item__control">
                                                                                                                                    <div className="form-item__content">
                                                                                                                                        <div className="input">
                                                                                                                                            <div onClick={(e)=>(setshowerror(e,'name'))} className="input__inner input__inner--normal"> 
                                                                                                                                                <input onChange={(e)=>setaddressuser(e,'name')} type="text" value={address.name} placeholder="Nhập vào" resize="vertical" rows="2" minrows="2" restrictiontype="value" max="Infinity" min="-Infinity" className="input__input"/> 
                                                                                                                                            </div>
                                                                                                                                        </div>
                                                                                                                                    </div> 
                                                                                                                                    {error.name && showerror.name?<div className="form-item__error">Không được để trống ô</div>:''}
                                                                                                                                </div>
                                                                                                                            </div>  
                                                                                                                            <div className={`form-item ${error.phone_number && showerror.phone_number?'form-item--error':''}`}>
                                                                                                                                <label for="phone" className="form-item__label"> Số điện thoại</label> 
                                                                                                                                <div className="form-item__control">
                                                                                                                                    <div className="form-item__content">
                                                                                                                                        <div className="input">
                                                                                                                                            <div onClick={(e)=>(setshowerror(e,'phone_number'))} className="input__inner input__inner--normal"> 
                                                                                                                                                <input onChange={(e)=>setaddressuser(e,'phone_number')} value={address.phone_number} type="text" placeholder="Nhập vào" resize="vertical" rows="2" minrows="2" maxlength="64" restrictiontype="input" max="Infinity" min="-Infinity" className="input__input"/> 
                                                                                                                                            </div>
                                                                                                                                        </div>
                                                                                                                                    </div>  
                                                                                                                                    {error.phone_number && showerror.phone_number?<div className="form-item__error">Số điện thoại không hợp lệ</div>:''}
                                                                                                                                </div>
                                                                                                                            </div> 
                                                                                                                            <div className="address-label">Địa chỉ</div> 
                                                                                                                        <div>  
                                                                                                                        <div className={`address-selector form-item ${town_choice!=null && town_choice.name==null?'form-item--error':''}`}>
                                                                                                                            <label for="addressMap" className="form-item__label"> Tỉnh/Thành phố/Quận/Huyện/Phường/Xã</label> 
                                                                                                                            <div className="form-item__control">
                                                                                                                                <div className="form-item__content">
                                                                                                                                    <div className="seller-address-common-multiple-level-box address-selector-container dropdown">
                                                                                                                                        <div onClick={(e)=>showcity(e)} className="multiple-level-label">
                                                                                                                                            <div className={`text-overflow multiple-level-selector-${city_choice.name!=null?'label':'placeholder'}`}>{city_choice.name==null?'Please select':`${city_choice.name}${district_choice.name!=null?`/${district_choice.name}`:''}${town_choice.name!=null?`/${town_choice.name}`:''}`}</div> 
                                                                                                                                            <i className="multiple-level-selector-icon icon">
                                                                                                                                                <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M160 288a32 32 0 0 0-23.6 53.6l352 384A32.11 32.11 0 0 0 512 736a32.39 32.39 0 0 0 23.6-10.3l352-383a32 32 0 0 0-47.1-43.3L512 656.7 183.64 298.4A32 32 0 0 0 160 288z"></path></svg>
                                                                                                                                            </i>
                                                                                                                                        </div>  
                                                                                                                                        <div className="popper seller-address-common-multiple-level-content" style={{display: `${state.showcity?'':'none'}`}}>
                                                                                                                                            <ul className="dropdown-menu" style={{maxWidth: '440px'}}>
                                                                                                                                                <ul className="multiple-level-title">
                                                                                                                                                    {state.administrative_units.map((unit,index)=>
                                                                                                                                                        <li style={{width: '33.3%'}} onClick={(e)=>setlevel(e,index)} className={`multiple-level-title-item ${state.level==index+1?'multiple-level-title-item--active':''} ${index==0|| index==1&&city_choice.name!=null ||index==2 && city_choice.name!=null && district_choice.name!=null?'':'disable'}`}>{unit}</li>
                                                                                                                                                    )}                                                                                                                                                                                                                                                          
                                                                                                                                                </ul> 
                                                                                                                                                <ul className="multiple-level-items">
                                                                                                                                                    {state.level==1?
                                                                                                                                                    <>
                                                                                                                                                    {list_city.map(city=>{
                                                                                                                                                        if(city.level==1){
                                                                                                                                                            return(<div onClick={(e)=>setcity(e,city)} className={`multiple-level-item ${city.name==city_choice.name?'multiple-level-item--active':''}`}>{city.name}</div>)
                                                                                                                                                        }
                                                                                                                                                    })}</>:
                                                                                                                                                   state.level==2?
                                                                                                                                                    <>
                                                                                                                                                    {list_city.map(city=>{
                                                                                                                                                        if(city.level==2 && city.matp==city_choice.matp){
                                                                                                                                                            return(<div onClick={(e)=>setdistrict(e,city)} className={`multiple-level-item ${city.name==district_choice.name?'multiple-level-item--active':''}`}>{city.name}</div>)
                                                                                                                                                        }
                                                                                                                                                    })}</>
                                                                                                                                                    :<>
                                                                                                                                                    {list_city.map(city=>{
                                                                                                                                                        if(city.level==3 && city.maqh==district_choice.maqh){
                                                                                                                                                            return(<div onClick={(e)=>settown(e,city)} className={`multiple-level-item ${city.name==town_choice.name?'multiple-level-item--active':''}`}>{city.name}</div>)
                                                                                                                                                        }
                                                                                                                                                    })}
                                                                                                                                                    </>}
                                                                                                                                                    <li className="multiple-level-item">An Giang</li>
                                                                                                                                                </ul>
                                                                                                                                            </ul>
                                                                                                                                        </div>
                                                                                                                                    </div>
                                                                                                                                </div>  
                                                                                                                                {town_choice!=null && town_choice.name==null?<div className="form-item__error">Địa chỉ không hợp lệ.</div>:''}
                                                                                                                            </div>
                                                                                                                        </div>  
                                                                                                                        <div className={`form-item ${error.address && showerror.address?'form-item--error':''}`}>
                                                                                                                            <label for="address" className="form-item__label"> Địa chỉ chi tiết</label> 
                                                                                                                            <div className="form-item__control">
                                                                                                                                <div className="form-item__content">
                                                                                                                                    <div  onClick={(e)=>(setshowerror(e,'address'))} className="input__area">
                                                                                                                                        <textarea value={address.address} onChange={e=>setaddressuser(e,'address')} type="textarea" placeholder="Số nhà, tên đường.v.v.." resize="vertical" rows="2" minrows="4" restrictiontype="input" max="Infinity" min="-Infinity" className="input__inner input__inner--normal" style={{resize: 'vertical', minHeight: '82px'}}></textarea>
                                                                                                                                    
                                                                                                                                        
                                                                                                                                    </div>
                                                                                                                                </div>  
                                                                                                                                {error.address && showerror.address?<div className="form-item__error">Không được để trống ô.</div>:''}
                                                                                                                            </div>
                                                                                                                        </div> 
                                                                                                                    </div> 
                                                                                                                    <div className="form-item" style={{display: 'none'}}>
                                                                                                                        <label className="form-item__label empty"> </label> 
                                                                                                                        <div className="form-item__control">
                                                                                                                            <div className="form-item__content">
                                                                                                                                <div className="seller-address-common-check-box">
                                                                                                                                    <label className="checkbox disabled">
                                                                                                                                        <input type="checkbox" disabled="disabled" className="checkbox__input" value="Đặt làm địa chỉ mặc đinh"/> 
                                                                                                                                        <span className="checkbox__indicator">
                                                                                                                                            <i className="icon">
                                                                                                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M4.03033009,7.46966991 C3.73743687,7.1767767 3.26256313,7.1767767 2.96966991,7.46966991 C2.6767767,7.76256313 2.6767767,8.23743687 2.96966991,8.53033009 L6.32804531,11.8887055 C6.62093853,12.1815987 7.09581226,12.1815987 7.38870548,11.8887055 L13.2506629,6.02674809 C13.5435561,5.73385487 13.5435561,5.25898114 13.2506629,4.96608792 C12.9577697,4.6731947 12.4828959,4.6731947 12.1900027,4.96608792 L6.8583754,10.2977152 L4.03033009,7.46966991 Z"></path></svg>
                                                                                                                                            </i> 
                                                                                                                                        </span> 
                                                                                                                                        <span className="checkbox__label">Đặt làm địa chỉ mặc đinh</span>
                                                                                                                                    </label> 
                                                                                                                                    <label className="checkbox disabled">
                                                                                                                                        <input type="checkbox" disabled="disabled" className="checkbox__input" value="Đặt làm địa chỉ lấy hàng"/> 
                                                                                                                                        <span className="checkbox__indicator">
                                                                                                                                            <i className="icon">
                                                                                                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M4.03033009,7.46966991 C3.73743687,7.1767767 3.26256313,7.1767767 2.96966991,7.46966991 C2.6767767,7.76256313 2.6767767,8.23743687 2.96966991,8.53033009 L6.32804531,11.8887055 C6.62093853,12.1815987 7.09581226,12.1815987 7.38870548,11.8887055 L13.2506629,6.02674809 C13.5435561,5.73385487 13.5435561,5.25898114 13.2506629,4.96608792 C12.9577697,4.6731947 12.4828959,4.6731947 12.1900027,4.96608792 L6.8583754,10.2977152 L4.03033009,7.46966991 Z"></path></svg>
                                                                                                                                            </i> 
                                                                                                                                        </span> 
                                                                                                                                        <span className="checkbox__label">
                                                                                                                                            Đặt làm địa chỉ lấy hàng
                                                                                                                                        </span>
                                                                                                                                    </label>   
                                                                                                                                    <label className="checkbox disabled">
                                                                                                                                        <input type="checkbox" disabled="disabled" className="checkbox__input" value="Đặt làm địa chỉ trả hàng"/> 
                                                                                                                                        <span className="checkbox__indicator">
                                                                                                                                            <i className="icon">
                                                                                                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M4.03033009,7.46966991 C3.73743687,7.1767767 3.26256313,7.1767767 2.96966991,7.46966991 C2.6767767,7.76256313 2.6767767,8.23743687 2.96966991,8.53033009 L6.32804531,11.8887055 C6.62093853,12.1815987 7.09581226,12.1815987 7.38870548,11.8887055 L13.2506629,6.02674809 C13.5435561,5.73385487 13.5435561,5.25898114 13.2506629,4.96608792 C12.9577697,4.6731947 12.4828959,4.6731947 12.1900027,4.96608792 L6.8583754,10.2977152 L4.03033009,7.46966991 Z"></path></svg></i> </span> <span className="checkbox__label">
                                                                                                                                            Đặt làm địa chỉ trả hàng
                                                                                                                                        </span>
                                                                                                                                    </label>
                                                                                                                                </div>
                                                                                                                            </div>  
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                </form> 
                                                                                                            </div> 
                                                                                                        </div> 
                                                                                                        <div style={{display: 'none'}}>
                                                                                                            <div className="seller-address-common-cvs-address-form">
                                                                                                                <form autocomplete="off" className="formCvs form--label-top">
                                                                                                                    <div className="form-item form-item--large">
                                                                                                                        <label for="name" className="form-item__label empty"> </label> 
                                                                                                                        <div className="form-item__control">
                                                                                                                            <div className="form-item__content">
                                                                                                                                <div className="input" max-length="64">
                                                                                                                                    <div className="input__inner input__inner--large"> 
                                                                                                                                        <input type="text" placeholder="Họ &amp; Tên" size="large" resize="vertical" rows="2" minrows="2" restrictiontype="input" max="Infinity" min="-Infinity" className="input__input"/> 
                                                                                                                                    </div>
                                                                                                                                </div>
                                                                                                                            </div>  
                                                                                                                        </div>
                                                                                                                    </div> 
                                                                                                                        <div className="form-item form-item--large">
                                                                                                                            <label for="phone" className="form-item__label empty"> </label> 
                                                                                                                                <div className="form-item__control">
                                                                                                                                    <div className="form-item__content">
                                                                                                                                        <div className="input" max-length="64">
                                                                                                                                            <div className="input__inner input__inner--large"> 
                                                                                                                                                <input type="text" placeholder="Số điện thoại" size="large" resize="vertical" rows="2" minrows="2" restrictiontype="input" max="Infinity" min="-Infinity" className="input__input" /> 
                                                                                                                                            </div>
                                                                                                                                        </div>
                                                                                                                                    </div>  
                                                                                                                                </div>
                                                                                                                            </div> 
                                                                                                                            <div className="form-item form-item--large">
                                                                                                                                <label for="address" className="form-item__label"> Please Select a Convenience Store</label> 
                                                                                                                                <div className="form-item__control">
                                                                                                                                    <div className="form-item__content">
                                                                                                                                        <div className="cvs">
                                                                                                                                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAMAAAAOusbgAAAC/VBMVEUAgGEAgGEAgGH////tGy31gh8Aa0cAf2BarZkAb0wAbUn2kz30dQcAbksAfl/qAAHqAAf/9+8AdlQBgmMAdFPsCx4AeFcAakXtHC7sDSAAelrrAhb0eQ+l0scAaUT1hycAc1DuIzT+7vAAfFzk8u81m4Ka8+P/makAaUXtHzH0eA2m08gAd1byO0vtHTAAeVn2iSv/+fPM5t9zuahksp8jkXYAaEPtFCfrAA2s1sw8nYXsCBr//Pzr9fP/7vLd7ur+5+nJ4tyTybtQqJIplHoSiWwBXjcAWzP1hSP1+vi329Ky182czcGMxriEwrNgr5xTqZRNpZBBoIkXjXEAcU4AZkH3ITQAVy4AUSbsECH1exPrARP6/fza7Of94+XU6eSp1sv7xcut1cqh0MOYy745m4IzmH8tl30bjnIWim4AhGbvL0DtGSvrBRgAQxX0bgD/+fnw+Pb/+vX+6uzX6+XE4tuIw7SAvq9jvqp3uqlvtqRptKJVrJcvl34Qh2kAcU/wN0f1gyH0cwbzZgD4+/r/9fby9/X/8PT/8vPo8/Dg7+v+8+mb9ubQ5+Hb5d+95dzE4Nm/3ta83dV8va35o6z3m6I3spf2i5UIg2XxTVrwRlHxQU8AYz3wKzzuJTUAVCsAPA3zagD+8/Xj9vTh8Oz8297C4NjA3tf80tax2dCU1sitzcGaxbf817Jyuaj4oaj7kJ5Isptwrpv7x5hbrJgzrZJArJFIpI31hI11o4wcpon6vYcTpYX0cHszlXomjnPzZ3MfhGUQgGHyVmEKfl/yTl0ReFj3mEXvNUX2jTLzHzHwHjHrHC0ASx/1gBv2ARYAOAiw+ezT7+y99ev95Of94eX+69v96dbT3dT7zdKf3M//ucyc0cX93sP83L+Jzr+HzL35tLr5tLmlxbd7x7b8r7Zfwq34pq3/m6z70Kr/k6SErptcpI42pIt1oYlLnYX0eIFClHr5sXMejnI0jXItiWzyWWjyWWb3olj3oFX8P1D/NULwAAjyZQDyWABOqg4MAAAAAnRSTlPy5YB5WPAAAAacSURBVGje7dtlcNNgGMBx6DMSUmgz0tKUAqXQAQUKRUoZG2NM2GAwgTHGNtzd3d3d3d3d3d3d3d39CB1dpGR35IUD7vK/2/Jhd/td8iTv3m1tipSKFH8hRUrm46+UQoZFkmEZlmEZlmEZFk2GZViGZfhXYY2VpjEp0TSlQYA1xO7OkamlFNl5p0ojFWbcbS1AapW3MrJE2EzNBekVNBikwtroyoBQYZNUmCpZGgWuLxk2mKsguAPG6yTP2IQy4yE2yTPGVTUR4LAKaskwVvtXpLODAGDmshKQWGYVLnkBMbaDHxXYdyBN8h2Nf5kOYEwRbxccTkuHabsLThc/I21yzfh6dAnA6KykZ9ZskFgHh/QlEyuXdMb5M6USrUeqGT1XAdRoRCbo0yfBkbR0mKjLwrlF3VLxvfYNguJvSW99Pg8WLq+UDpsKi8Os26zZKoDRvmSRfB4eHLgLIR2mupZmYbHL3KvUOZi5h/TNxbBc+JVJOmxT+wthoRv/5T1AjTiycT4PPuw33iodNmuHJw+Xyt1rE8ByMoE5XQHc2mCQDuNEzWThUmmbPQDYTsYxrhAeYVIjwFjt5OBSPXteBZjgvKvc4DwqHGHPZYz4AbdkYc759rwCMInU61mXhQMxFNjSSRzuEd9sCcBE1uXD7RwKBBgr54JTNcskyHlf7WJdAWynUWCijgs+EJ9FUO4PAM/Jxnw3n2+GEuBsHYYCs0tXOrcGNYd7zvuKTa9PIPMWA2d1CRQ4+V1X1QwZeW6uOLLRDXarhwLb8IEg3gQyF89N8BwHrvp2pVBgMzVc3F1GNua53ulrsF+sYjagwDhRRtRtPjUhH9f1bHwG2IZrzUgwVlYUXk/yXO8iVYFTTQJHgRXGtmJun6wZ9dzHqMkF4FYbQ4Q7isFjSO4T3NhzDPCKMCqQYCxIDJ7orecOeBfw62RBg1V1RNz5vkU82DLEzQF+5TA0uFthEXgc90rrPbeAoDoEGkyV7C1ypcmMbN6eNdx/R0WDbfjsn7rF9kzJ66p73imT+gO/0iUpNNhMBYCUBuI2NFiduHTNTh1pt5cr2iJ1Z3sLgOrr7Pb27YfdXnEd4NqaBcNWtG9vD/LzCooKL5q9q48/MAVQZjQYV5Z1fp/JMXTo8Q1eISHYQICVlZQxlY7cenFkL8CO6YsXV1JOrtR0aLXYGFNIiDX2GTCVIdQoMJPFuXQV1Nnw8tmr+1u1Gi+AQkZDySAf/0iHrW9ls6NaWYuhQVD20gGEWu1T2EBsBaayShwRNnZMhLW4P0Ab6gesLA8A9hiidRXaWizQ4twhVSeIwlBUqcoOTG0tCkQYi0qErerAMn5DXLApeGRmqG1x1AwLaQARFlPdeZkhjFB1gaIqpRPuaESFVT6JsFoRcvzpLN0PuCFVqen5WRXoUe1iy0MHS0MtM+OTBFEvCY7CUOFuwa4ZR0WFVXHN2BbdKcivr4Hw8QnpCIUsuvqdgiq34cI+KlRY26C32IxLd6V2f/+BvTRpxiwc3A0V1jHSd1inHhVepRql07QL94qgqcJlI7ygDqE2UAEMrA2uFQEjOXDvBlpU2GwNAICAGIwInb7BK0bJHB4FxproaU0XweNYYvLeFrBymskxjXmOQ0PfwKLQ0NcAMECjQ4HZpat1cJfs2UsG+jkPtWpGjx27ZuMwWLh57Ma7wBye1K1b38u/fnRqGBEdHem8QmZUGFfWAreKFS9evF+rqtn6MYcSVVsV7wOCwgg1GsxEt3WH7xyrWLHiocOHmM8H9YcPHhsNgmopcWTYWOhnu4D0GdjSkzdBUDitQIaxKHd4vacHpyJNaoCgDg50WOXjDm/hw3HzQdBqDB2uEOwOb/fmwnFF5oCg8kp0WNugMgh7x4Mz6E+DoHoV0GGdZgAIm8CD0+dqJXzc6mvRYYNuCAiblMCDp7JbPfaPa8iwmggDYd0zcmHfKcIFpJrBgACLL13NG/ny4EbNgd/IbmpUmIkOF8L9p6bnwk0aFQM29r8CqLCjgxDOlpUP7xfCgdjvgLHVQrhELgEMgkY5FL8BVtVxg/Nl4MIZu4OgztjvgM3UCOBX1SN5uLXZ9jtgjWln4ILMbLVPlRDAH/0uZs6TVJnLOypoEGC2hlajilPs2lafSU9O5Kd5BEawGbUNFWgwG84JWwv3H+bktPxSG51BzYb/oRcnaLdVHzw4B6fBJwpZBQvGH4EbGmglP1owU0RYPNwthaD/93UgScmwDMuwDMuwDIsmwzIsw/8y/LfePvgNDXr1Qmlbut8AAAAASUVORK5CYII="/> 
                                                                                                                                            <div className="cvsTitle">
                                                                                                                                                <div>7-11</div> 
                                                                                                                                            </div> 
                                                                                                                                            <div className="open">
                                                                                                                                                <i className="icon">
                                                                                                                                                    <svg data-name="图层 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path d="M288 864a32 32 0 0 0 53.6 23.6l384-352A32.11 32.11 0 0 0 736 512a32.39 32.39 0 0 0-10.3-23.6l-383-352a32 32 0 1 0-43.3 47.1L656.7 512 298.4 840.44A32 32 0 0 0 288 864z" data-name="Layer 2"></path></svg>
                                                                                                                                                </i>
                                                                                                                                            </div>
                                                                                                                                        </div>
                                                                                                                                                    
                                                                                                                                    </div>  
                                                                                                                                </div>
                                                                                                                            </div> 
                                                                                                                            <div className="form-item">
                                                                                                                                <label className="form-item__label empty"> </label> 
                                                                                                                                <div className="form-item__control">
                                                                                                                                    <div className="form-item__content">
                                                                                                                                        <label className="checkbox disabled">
                                                                                                                                            <input type="checkbox" disabled="disabled" className="checkbox__input" value="set as default return store"/> 
                                                                                                                                            <span className="checkbox__indicator">
                                                                                                                                                <i className="icon">
                                                                                                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M4.03033009,7.46966991 C3.73743687,7.1767767 3.26256313,7.1767767 2.96966991,7.46966991 C2.6767767,7.76256313 2.6767767,8.23743687 2.96966991,8.53033009 L6.32804531,11.8887055 C6.62093853,12.1815987 7.09581226,12.1815987 7.38870548,11.8887055 L13.2506629,6.02674809 C13.5435561,5.73385487 13.5435561,5.25898114 13.2506629,4.96608792 C12.9577697,4.6731947 12.4828959,4.6731947 12.1900027,4.96608792 L6.8583754,10.2977152 L4.03033009,7.46966991 Z"></path></svg>
                                                                                                                                                </i> 
                                                                                                                                            </span> 
                                                                                                                                            <span className="checkbox__label">set as default return store</span>
                                                                                                                                        </label>
                                                                                                                                    </div>  
                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                                        </form> 
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                                
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <div className="resize-triggers">
                                                                                                        </div>
                                                                                                    </div> 
                                                                                                    <div className="modal__footer">
                                                                                                        <div className="footer">
                                                                                                            <button onClick={()=>setshow(false)} type="button" className="button btn-light ">
                                                                                                                <span>Hủy</span>
                                                                                                            </button> 
                                                                                                
                                                                                                            <button onClick={()=>createaddress()} type="button" className="button btn-orange ">
                                                                                                                <span>Lưu</span>
                                                                                                            </button>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div> 
                                                                                                <i className="icon modal__close">
                                                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M2.85355339,1.98959236 L8.157,7.29314575 L13.4601551,1.98959236 C13.6337215,1.81602601 13.9031459,1.79674086 14.098014,1.93173691 L14.1672619,1.98959236 C14.362524,2.18485451 14.362524,2.501437 14.1672619,2.69669914 L14.1672619,2.69669914 L8.864,8.00014575 L14.1672619,13.3033009 C14.362524,13.498563 14.362524,13.8151455 14.1672619,14.0104076 C13.9719997,14.2056698 13.6554173,14.2056698 13.4601551,14.0104076 L8.157,8.70714575 L2.85355339,14.0104076 C2.67998704,14.183974 2.41056264,14.2032591 2.2156945,14.0682631 L2.14644661,14.0104076 C1.95118446,13.8151455 1.95118446,13.498563 2.14644661,13.3033009 L2.14644661,13.3033009 L7.45,8.00014575 L2.14644661,2.69669914 C1.95118446,2.501437 1.95118446,2.18485451 2.14644661,1.98959236 C2.34170876,1.79433021 2.65829124,1.79433021 2.85355339,1.98959236 Z"></path></svg>
                                                                                                </i>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div> :''}
                                                                            </div>
                                                                        </div>  
                                                                        <div className="form-item__extra"> </div>
                                                                    </div>
                                                                </div> 
                                                            </div>
                                                        </div>
                                                        <div data-v-204efa35="">
                                                            <div data-v-204efa35="" className="onboarding-form-item" prop="form_5_component_17_email" context="[object Object]" editable="2" label="Email" page_id="3024" required="required" maxlength="128" region="vn" rules="[object Object]" show_word_limit="true">
                                                                <div className="form-item onboarding-form-item__inner" context="[object Object]" editable="2" page_id="3024" maxlength="128" region="vn" show_word_limit="true" extra="">
                                                                    <label for="form_5_component_17_email" className="form-item__label">
                                                                        <span className="form-item__reqiured">*</span> Email
                                                                    </label> 
                                                                    <div className="form-item__control">
                                                                        <div className="form-item__content">
                                                                            <div data-v-204efa35="" className="onboarding-input" componentid="form_5_component_17_email" context="[object Object]" formdata="[object Object]" globalformdata="[object Object]" extra="" label="Email" page_id="3024" required="required" maxlength="128" region="vn" rules="[object Object]" show_word_limit="true" style={{width: '384px'}}>
                                                                                <div className="input" componentid="form_5_component_17_email" context="[object Object]" formdata="[object Object]" globalformdata="[object Object]" extra="" label="Email" page_id="3024" region="vn" rules="[object Object]" show_word_limit="true">
                                                                                    <div className="input__inner disable input__inner--normal"> 
                                                                                        <input value={formData.email} type="text" placeholder="Nhập vào" disabled="disabled" resize="vertical" rows="2" minrows="2" required="required" maxlength="128" restrictiontype="input" max="Infinity" min="-Infinity" className="input__input"/> 
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>  
                                                                        <div className="form-item__extra"> </div>
                                                                    </div>
                                                                </div> 
                                                            </div>
                                                        </div>
                                                        <div data-v-204efa35="">
                                                            <div data-v-204efa35="" className="onboarding-phone-vcode-input" id="form_5_component_19_phoneId" formdata="[object Object]" globalformdata="[object Object]" extra="" label="Số điện thoại" page_id="3028" required="required" fieldkey="phone">
                                                                <div className="onboarding-form-item" rules="[object Object]" prop="form_5_component_19_phone.phone" id="form_5_component_19_phoneId" formdata="[object Object]" globalformdata="[object Object]" label="Số điện thoại" page_id="3028" required="required" fieldkey="phone">
                                                                    <div className="form-item form-item--error onboarding-form-item__inner" id="form_5_component_19_phoneId" formdata="[object Object]" globalformdata="[object Object]" page_id="3028" fieldkey="phone" extra="">
                                                                        <label for="form_5_component_19_phone.phone" className="form-item__label">
                                                                            <span className="form-item__reqiured">*</span> Số điện thoại
                                                                        </label> 
                                                                        <div className="form-item__control">
                                                                            <div className="form-item__content">
                                                                                <div className="onboarding-phone-input">
                                                                                    <div className="input phone-input" id="form_5_component_19_phoneId" formdata="[object Object]" globalformdata="[object Object]" extra="" label="Số điện thoại" page_id="3028" fieldkey="phone" style={{width: '384px'}}>
                                                                                        <div className="input__inner input__inner--normal">
                                                                                            <div className="input__prefix">
                                                                                                <div className="fixed-prefix">+84</div>
                                                                                            </div> 
                                                                                            <input value={formData.phone_number!=null?formData.phone_number.slice(-9):''} onChange={e=>setformData({...formData,phone_number:e.target.value})} type="text" placeholder="Nhập vào" resize="vertical" rows="2" minrows="2" required="required" restrictiontype="input" max="Infinity" min="-Infinity" className="input__input"/> 
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div> 
                                                                            <div className="form-item__error">Vui lòng nhập số điện thoại</div> 
                                                                            <div className="form-item__extra"> </div>
                                                                        </div>
                                                                    </div> 
                                                                </div> 
                                                                <div className="onboarding-form-item" rules="[object Object],[object Object]" prop="form_5_component_19_phone.vcode" label="">
                                                                    <div className="form-item form-item--error onboarding-form-item__inner" extra="">
                                                                        <label for="form_5_component_19_phone.vcode" className="form-item__label empty"> </label> 
                                                                        <div className="form-item__control">
                                                                            <div className="form-item__content">
                                                                                <div className="onboarding-vcode-input">
                                                                                    <div className="input vcode-input">
                                                                                        <div className="input__inner input__inner--normal"> 
                                                                                            <input value={formData.code} onChange={e=>setformData({...formData,code:e.target.value})} type="text" placeholder="Nhập vào" resize="vertical" rows="2" minrows="2" restrictiontype="input" max="Infinity" min="-Infinity" className="input__input"/> 
                                                                                        </div>
                                                                                    </div> 
                                                                                    <button type="button" disabled="disabled" className="vcode-button button button--primary button--normal button--outline disabled"><span>Gửi</span></button>
                                                                                </div>
                                                                            </div> 
                                                                            <div className="form-item__error">Vui lòng nhập mã xác minh</div> 
                                                                            <div className="form-item__extra"> </div>
                                                                        </div>
                                                                    </div> 
                                                                </div>
                                                            </div>
                                                        </div>  
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                                <div className="onboarding-layout__footer">
                                    <div data-v-5db6da35="" className="footer">
                                        <div data-v-5db6da35=""></div> 
                                        <div data-v-5db6da35="">
                                            <button onClick={()=>saveinfo()} data-v-5db6da35="" type="button" className="action-btn btn-light save-btn button">
                                                <span>Lưu</span>
                                            </button> 
                                            <button onClick={()=>navigate('/vendor/shipping/list')} data-v-5db6da35="" type="button" className="action-btn next-btn button btn-orange">
                                                <span>Tiếp theo</span>
                                            </button> 
                                        </div>
                                    </div>
                                </div>
                            </div> 
                            <div className="onboarding-layout__aside onboarding-layout__card"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Newshop