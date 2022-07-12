
import axios from 'axios';
import React, {useState, memo} from 'react'
import {updateAddressURL} from "../urls"
import GoogleMaps from './GoogleMap'
import {address_null,typeaddress,} from "../constants"
import { headers } from '../actions/auth';
const Address=({address,show,setshow,list_city,action,city_choice,district_choice,town_choice,setlistaddress,
    setcitychoice,setdistrictchoice,settownchoice,clearaddress,setformdata,addressChoice,
    defaultaddress,deleteAddress
})=>{
    const [state, setState] = useState({loading:false,showcity:false,change:false,level:1,administrative_units:['Tỉnh/Thành phố','Quận/Huyện','Phường/Xã'], message:'',errors: {},address_chocie:''})
    const [errow,setErrow]=useState({name:'',phone_number:'',address:'',city:''})
    function createAddress(){
        let form=new FormData()
        form.append('name',address.name)
        form.append('phone_number',address.phone_number)   
        form.append('default',address.default)
        form.append('city',city_choice.name)
        form.append('district',district_choice.name)
        form.append('town',town_choice.name)
        form.append('address',address.address)
        form.append('address_choice',address.address_choice)
        form.append('address_type','S')
        if(address.id!=undefined){
            form.append('id',address.id)
            form.append('update','update')
        }
        axios.post(updateAddressURL,form,headers)
        .then(res=>{
            let data=res.data
            setlistaddress(data)
            setshow(false)
        })
    }
    
    const rules = [
        {
          field: 'name',
          method: 'isEmpty',
          validWhen: false,
        },
        {
          field: 'name',
          method: 'isLength',
          args: [{min: 5}],
          validWhen: true,
        },
        {
          field: 'email',
          method: 'isEmpty',
          validWhen: false,
        },
        {
          field: 'email',
          method: 'isEmail',
          validWhen: true,
        },
        {
          field: 'address',
          method: 'isEmpty',
          validWhen: false,
        },
       
      ];
    const onChange = (e) =>{
        setformdata(e)
        setErrow({...errow,[e.target.name]:e.target.value})
        
    } 
    function showcity(e){
        e.stopPropagation()
        setState({...state,showcity:true,level:1})
        window.onclick=(event)=>{
            let parent=event.target.closest('.UErLHj')
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
            let parent=event.target.closest('.UErLHj')
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
        setState({...state,change:false,level:1,showcity:false})
    }
    function clearAddress(){
        setState({...state,change:false,level:1})
        clearaddress()
    }
    function setlevel(e,index){
        e.stopPropagation()
        setState({...state,level:index+1})
    }
    function hideErrow(e){
        setErrow({...errow,[e.target.name]:{value:e.target.value,errow:false}})
    }
   
    return(
        <>
        {show?
        <div className="_2IJN-0">
            <div className="_1lzg0h">
                
                <div className="popup-form _2dpFWO">
                    <div className="popup-form__header">
                        <div className="popup-form__title">Địa chỉ mới</div>
                    </div>
                    <div className="popup-form__main">
                        <div className="popup-form__main-container">
                            <div></div>
                            <div className="hR92Km">Để đặt hàng, vui lòng thêm địa chỉ nhận hàng</div>
                            <div className="_1dpE-N">
                                <div className="_7Fiz4c">
                                    <div className="-cdiFe">
                                        <div className={`_3ZW3SX ${errow.name.errow?'FsE2Ma':''}`}>
                                            <div className={`_2PIkC2 ${errow.name.length>0?'_1qqB7v':''}`}>Họ và tên</div>
                                            <input required name="name" onClick={(e)=>hideErrow(e)} onChange={e => onChange(e)} className="_2D9bmD" type="text" placeholder="Họ và tên" maxLength="30" value={address.name}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="_1fsKo2"></div>
                                <div className="_7Fiz4c">
                                    <div className="-cdiFe">
                                        <div className={`_3ZW3SX ${errow.phone_number.errow?'FsE2Ma':''}`}>
                                            <div className={`_2PIkC2 ${errow.phone_number.length>0?'_1qqB7v':''}`}>Số điện thoại</div>
                                            <input required name="phone_number" onClick={(e)=>hideErrow(e)} onChange={e => onChange(e)} className="_2D9bmD" type="text" placeholder="Số điện thoại" value={address.phone_number}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="_355Lqv">
                                <div className="UErLHj">
                                    <div className="_1x-Rjl">
                                        <div className={`B8ZmJ1 ${errow.city.errow?'FsE2Ma':''}`}>
                                            <div className={`_1nHl2N ${city_choice.name==null?'':'_1qqB7v'}`}>Tỉnh/ Thành phố, Quận/Huyện, Phường/Xã</div>
                                            {!state.showcity || state.showcity && state.change?
                                            <div onClick={(e)=>showcity(e)} className={`VrxtdC ${city_choice.name==null?'_1xYZqt':'_3DUJsF'}`}>{city_choice.name==null?'Tỉnh/ Thành phố, Quận/Huyện, Phường/Xã':`${city_choice.name}${district_choice.name!=null?`, ${district_choice.name}`:''}${town_choice.name!=null?`, ${town_choice.name}`:''}`}</div>:""}
                                            <input autocomplete="user-administrative-divisions" className={`_31jzoK ${state.showcity && !state.change?'':'KpFaGj'}`} type="text" placeholder={city_choice.name==null||state.showcity?'Tỉnh/ Thành phố, Quận/Huyện, Phường/Xã':`${city_choice.name}${district_choice.name!=null?`, ${district_choice.name}`:''}${town_choice.name!=null?`, ${town_choice.name}`:''}`} value={city_choice.name==null?'':`${city_choice.name}${district_choice.name!=null?`, ${district_choice.name}`:''}${town_choice.name!=null?`, ${town_choice.name}`:''}`}/>
                                            <div className="_3Z2DL8">
                                                {state.showcity && !state.change?
                                                <div className="HncObj">
                                                    <svg viewBox="0 0 16 16" fill="none" width="16" height="16" color="rgba(0, 0, 0, 0.54)"><path fillRule="evenodd" clip-rule="evenodd" d="M12.492 7.246A5.246 5.246 0 112 7.246a5.246 5.246 0 0110.492 0zm-1.2 4.758a6.246 6.246 0 11.728-.731l2.998 2.997-.73.73-2.996-2.996z" fill="currentColor"></path></svg>
                                                </div>:''}
                                                <div onClick={()=>clearAddress()} className="rqOKpI">{state.showcity && city_choice.name!=null?<svg viewBox="0 0 20 20" fill="none" width="16" height="16" color="rgba(0, 0, 0, 0.26)"><path fillRule="evenodd" clip-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.041 7.102L8.94 10l-2.898 2.898 1.06 1.06L10 11.062l2.898 2.898 1.06-1.06-2.896-2.9 2.898-2.898-1.06-1.06L10 8.938 7.102 6.041l-1.06 1.06z" fill="currentColor"></path></svg>:''}</div>
                                                <div className="_2XlQ7B"></div>
                                            </div>
                                        </div>
                                    </div>
                                    {state.showcity?
                                    <div className="q2wJSK">
                                        <div className="df5pnf">
                                            <div className="_2-Gce8">
                                                {state.administrative_units.map((unit,index)=>
                                                    <div onClick={(e)=>setlevel(e,index)} className={`_26VoYO ${state.level==index+1?'_1xBdI3':''} ${index==0|| index==1&&city_choice.name!=null ||index==2 && city_choice.name!=null && district_choice.name!=null?'':'disable'}`}>{unit}</div>
                                                )}
                                            </div>
                                            <div className="_1NCcLD">
                                                {state.level==1?
                                                <>
                                                {list_city.map(city=>{
                                                    if(city.level==1){
                                                        return(<div onClick={(e)=>setcity(e,city)} className={`_8jiI7u ${city.name==city_choice.name?'_1xBdI3':''}`}>{city.name}</div>)
                                                    }
                                                })}</>:
                                                state.level==2?
                                                <>
                                                {list_city.map(city=>{
                                                    if(city.level==2 && city.matp==city_choice.matp){
                                                        return(<div onClick={(e)=>setdistrict(e,city)} className={`_8jiI7u ${city.name==district_choice.name?'_1xBdI3':''}`}>{city.name}</div>)
                                                    }
                                                })}</>
                                                :<>
                                                {list_city.map(city=>{
                                                    if(city.level==3 && city.maqh==district_choice.maqh){
                                                        return(<div onClick={(e)=>settown(e,city)} className={`_8jiI7u ${city.name==town_choice.name?'_1xBdI3':''}`}>{city.name}</div>)
                                                    }
                                                })}
                                                </>}
                                            </div>
                                        </div>
                                    </div>:""}
                                </div>
                            </div>
                            
                            <div className="_7Fiz4c">
                                <div className="-cdiFe _3tt8fE">
                                    <div className={`_1TuCtm ${errow.address.errow?'FsE2Ma':''}`}>
                                        <div className={`_3v0HIs ${errow.address.length>0?'_1qqB7v':''}`}>Địa chỉ cụ thể</div>
                                        <textarea value={address.address} onClick={(e)=>hideErrow(e)} onChange={e => onChange(e)} name="address" className="_3fTyNS" placeholder="Địa chỉ cụ thể" maxLength="128"></textarea>
                                    </div>
                                    <div className="_2wzPNb"></div>
                                </div>
                            </div>
                            <div className="_355Lqv">
                            {town_choice.name!=null&&errow.address.toString().trim().length>5?
                                <div className="_1khrbP">
                                    <div className="_1wGV5F _1Wbbcs">
                                        <svg fill="none" viewBox="0 0 20 20" className="_3BhS5C"><path fill-rule="evenodd" clip-rule="evenodd" d="M10 20C4.486 20 0 15.515 0 10 0 4.487 4.486 0 10 0c5.515 0 10 4.486 10 10 0 5.515-4.485 10-10 10zm4.386-8.003H5.55c-.357 0-.672-.19-.86-.52-.071-.125-.272-.568.072-1.103.122-.219.288-.496.48-.804.183-.298.344-.59.487-.894a7.76 7.76 0 00.396-1c.096-.309.146-.642.146-.988 0-.479.071-.925.211-1.322.132-.384.315-.733.542-1.038a3.597 3.597 0 011.528-1.18c1.093-.509 2.909-.092 2.884.014.25.103.474.223.68.367.31.212.585.48.814.794a3.948 3.948 0 01.734 2.353c0 .334.05.665.148.984a7.637 7.637 0 00.89 1.895c.184.28.348.52.495.72.153.204.227.44.214.68-.01.193-.07.377-.173.531a1.06 1.06 0 01-.368.355.975.975 0 01-.484.156zm-7.1 2.064L6.225 13 3.75 15.475l1.06 1.06 2.476-2.474zm5.5 0L13.845 13l2.475 2.475-1.06 1.06-2.476-2.474zm-3.5-.5h1.5v3.5h-1.5v-3.5z" fill="#F5BD49"></path></svg>
                                        <div className="bu0HJC">
                                            <div className="_2vJNsC xk851-">Vui lòng ghim địa chỉ chính xác</div>
                                            <div className="_2KM5cH">Hãy chắc chắn vị trí trên bản đồ được ghim đúng để Anhdai gửi hàng cho bạn nhé!</div>
                                        </div>
                                    </div>
                                    <div className="_2F4oEw">
                                        <div className="_1BFeyX _1Phfo7">
                                            <GoogleMaps/>
                                        </div>
                                        <button className="_3Zh1N0"></button>
                                        <button className="TV2hWu LFlESV">Xem bản đồ</button>
                                    </div>
                                </div>:
                                <div className="_2F4oEw">
                                    <div className="_1Phfo7 muxVQ8 _3YR6rI">
                                        <svg fill="none" viewBox="0 0 440 120" preserveAspectRatio="xMidYMid slice" className="QcC92Z"><g clip-path="url(#clip0)"><path fill="#F7F8F9" d="M0 0h440v120H0z"></path><g filter="url(#filter0_d)" stroke="#FBFBFC"><path strokeWidth="10" d="M-6.779-.48l123 61"></path><path strokeWidth="12" d="M11.524 124.548l30-67"></path><path strokeWidth="10" d="M-7.796 33.512l112 55"></path><path strokeWidth="12" d="M103.473 88.664l41-97"></path><path strokeWidth="10" d="M322.96 33.054l35-48m5.078 109.853l-51-10M442.064 94l-78 1"></path><path strokeWidth="12" d="M410.037 130.663l-4-36"></path><path strokeWidth="11" d="M73.36 39.047l28-44"></path><path strokeWidth="12" d="M31.552 19.486l12-26"></path><path strokeWidth="10" d="M116.01 60.422l41 18"></path><path strokeWidth="12" d="M140.286 123.17l41-128"></path><path strokeWidth="10" d="M164.244 42.682l-32-12"></path><path strokeWidth="11" d="M256.298 124.068l-89-81"></path><path strokeWidth="10" d="M242.102 24.626l-78-32M273.319-4.26l-80 71m26.348 26.974l-82 29m184.93-91.441l-102 62"></path><path strokeWidth="11" d="M144.386 123.146l-39-34"></path><path strokeWidth="12" d="M79.949 125.762l25-39"></path><path d="M241.5-7c18 8 70.203 32.864 82 39.5 16 9 39.5 35 39.5 61 0 27-18 34.5-28.5 42.5" strokeWidth="10"></path><path d="M240 23.5c31 25.5 74 52 72.5 62s-51.5 28.333-77 41M337.5 13s23.5-7 28-8S445 7.5 445 7.5" strokeWidth="10"></path><path d="M413 4c-1 13-3.4 40.5-5 42.5s-39.667 9-56 12" strokeWidth="11"></path></g></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h440v120H0z"></path></clipPath><filter id="filter0_d" x="-14" y="-21.892" width="463.232" height="165.869" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix><feOffset></feOffset><feGaussianBlur stdDeviation="2"></feGaussianBlur><feComposite in2="hardAlpha" operator="out"></feComposite><feColorMatrix values="0 0 0 0 0.960784 0 0 0 0 0.964706 0 0 0 0 0.968627 0 0 0 1 0"></feColorMatrix><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"></feBlend><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"></feBlend></filter></defs></svg>
                                        <button className="_2HOAEU _2Owv7_" disabled="">
                                            <svg viewBox="0 0 10 10" className="HfgSBO"><path stroke="none" d="m10 4.5h-4.5v-4.5h-1v4.5h-4.5v1h4.5v4.5h1v-4.5h4.5z"></path></svg>
                                            Thêm vị trí
                                        </button>
                                    </div>
                                </div>
                                
                                }
                                
                            </div>
                            <div className="_2Y_sWW">
                                <div className="TVRZZP">Loại địa chỉ:</div>
                                <div className="item-center">
                                    {typeaddress.map(item=>
                                        <div onClick={()=>addressChoice(item)} className={`_39FXI4 ${address.address_choice==item?'_1L2D6W':''}`}>
                                            <span>{item}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="uuvK6n">
                                <div className="_3M-hd5">
                                    <label className={`stardust-checkbox ${address.default==null?'stardust-checkbox--disabled':''} ${address.default||address.default==null?'stardust-checkbox--checked':''}`}>
                                        <input onChange={()=>defaultaddress()} className="stardust-checkbox__input" checked="" type="checkbox"/>
                                        <div className="stardust-checkbox__box"></div>
                                        Đặt làm địa chỉ mặc đinh
                                    </label>
                                </div>
                                {address.default!=null?
                                <div className="_3M-hd5">
                                    <label className="stardust-checkbox disable">
                                        <input type="checkbox" className="stardust-checkbox__input disable" name="check"/>
                                        <div className="stardust-checkbox__box"></div>Đặt làm địa chỉ lấy hàng
                                    </label>
                                </div>:''}
                            </div>
                            <div className="uuvK6n">{address.default!=null?
                                <div className="_3M-hd5">
                                    <label className="stardust-checkbox disable">
                                        <input type="checkbox" className="stardust-checkbox__input" name="check"/>
                                        <div className="stardust-checkbox__box"></div>Đặt làm địa chỉ trả hàng
                                    </label>
                                </div>:''}
                            </div>
                        </div>
                    </div>
                    <div className="popup-form__footer">
                        <button onClick={()=>setshow(false)} className="cancel-btn">Trở Lại</button>
                        <button onClick={(e)=>createAddress(e)} type="button" className="btn-solid-primary btn btn-m btn--inline">Hoàn thành</button>
                    </div>
                </div>
                
            </div> 
        </div>:""}
        {action?
        <div className="popup modal__transition-enter-done">
            <div className="popup__overlay"></div>
            <div className="popup__container">
                <div className="alert-popup card">
                    <div className="alert-popup__message">Bạn có chắc muốn xoá địa chỉ này?</div>
                    <div className="alert-popup__button-horizontal-layout">
                        <button onClick={e=>deleteAddress(address)} type="button" className="btn btn-solid-primary btn-l btn--inline alert-popup__btn">Xóa</button>
                        <div className="alert-popup__button-spacer"></div>
                        <button type="button" className="btn-light btn btn-l btn--inline alert-popup__btn">Trở Lại</button>
                    </div>
                </div>
            </div>
        </div>:''}
        </>
        )
    }
export default memo(Address)