import Navbar from "../containers/Navbar"
import User from "./User"
import Address from "../hocs/Address"
import axios from 'axios';
import React, {useState, useEffect,useCallback} from 'react'
import { headers,expiry } from "../actions/auth";
import {updateAddressURL,cityListURL} from "../urls"
import {connect} from "react-redux"
const Addressuser = ({user}) =>{
    const [state, setState] = useState({list_addresses:[],username:null,image:null,address:null});
    const [show,setShow]=useState(false)
    const [action,setAction]=useState(false)
    const [address,setAddress]=useState({address:'',address_choice:'',default:false,name:'',phone_number:''});
    const [city,setCity]=useState({list_city:[]})
    const [addresschoice,setAddressChoice]=useState({city_choice:{'name':null,'matp':null,level:1},
    district_choice:{'name':null,'matp':null,level:2,'maqh':null},
    town_choice:{'name':null,'maqh':null,level:3},showcity:false})
    if(expiry()<=0 || !localStorage.token){
        window.location.href="/buyer/login"
    }
    useEffect(() => {
        const getJournal = async () => {
            await axios.get(updateAddressURL,headers())
            // <-- passed to API URL
            .then(res=>{
                let data=res.data
                setState({...state,list_addresses:data,loading:true
                })
            })
            }
            getJournal();
        }, []);
    useEffect(()=>{
        axios.get(cityListURL)
        .then(res=>{
            setCity({list_city:res.data})
        })
    },[])    
    function editaddress(e,address){
        setShow(true)
        const city_choice=city.list_city.find(item=>item.name==address.city && item.level==1)    
        const district_choice=city.list_city.find(item=>item.name==address.district && item.matp==city_choice.matp && item.level==2)
        const town_choice=city.list_city.find(item=>item.name==address.town && item.maqh==district_choice.maqh && item.level==3)
        setAddressChoice(prev=>{return{...prev,city_choice:{name:address.city,matp:city_choice.matp,level:1},district_choice:{name:address.district,matp:district_choice.matp,level:2,maqh:district_choice.maqh},town_choice:{name:address.town,maqh:town_choice.maqh,level:3}}})
        setAddress(address)
    }

    function createAddress(e){
        const address_null = {address:'',address_choice:'',default:state.list_addresses.length==0?true:false,name:'',phone_number:''}
        setAddress(address)
        setShow(true)
        if(city.list_city.length==0){
            axios.get(cityListURL)
            .then(res=>{
                const list_city=res.data
                setCity({list_city:list_city})
            })
        } 
    }

    function setdefault(e,address){
        const data={action:'default',id:address.id}
        const list_addresses=state.list_addresses.map(item=>{
            if(item.id==address.id){
                return ({...item,default:true})
            }
            else{
                return ({...item,default:false})
            }
        })
        setState({...state,list_addresses:list_addresses})
        axios.post(updateAddressURL,JSON.stringify(data),headers())
        .then(res=>{
        })   
    }

    const setdelete=(e,address)=>{
        setAction(true)
        setState({...state,address:address})
    }

    const deleteAddress=useCallback((address)=>{
        const data={action:'delete',id:address.id}
        const list_addresses=state.list_addresses.filter(item=>item.id!=address.id)
        setState({...state,list_addresses:list_addresses})
        setAction(false)
        axios.post(updateAddressURL,JSON.stringify(data),headers())
        .then(res=>{
        })
    }, [state]);

    const setshow = useCallback((es) => {
        setShow(es);
        if(es==false){
            setAddressChoice({city_choice:{'name':null,'matp':null,level:1},
            district_choice:{'name':null,'matp':null,level:2,'maqh':null},
            town_choice:{'name':null,'maqh':null,level:3},showcity:false})   
        }
    }, [show,addresschoice]);

    const setcitychoice=useCallback((city)=>{
        setAddressChoice({...addresschoice,city_choice:{'name':city.name,'matp':city.matp,level:1},district_choice:{'name':null,'matp':null,level:2,'maqh':null},
        town_choice:{'name':null,'maqh':null,level:3}})
    }, [addresschoice]);

    const setdistrictchoice=useCallback((district)=>{
        setAddressChoice({...addresschoice,district_choice:{'name':district.name,'matp':district.matp,level:2,'maqh':district.maqh},town_choice:{'name':null,'maqh':null,level:3}})
    }, [addresschoice]);

    const settownchoice=useCallback((town)=>{
        setAddressChoice({...addresschoice,town_choice:{'name':town.name,'maqh':town.maqh,level:3}})
    }, [addresschoice]);

    const setformdata=useCallback((e)=>{
        const address=state.address
        const name=e.target.name
        address[name]=e.target.value
        setState({...state,address:address})
    }, [state]);

    const clearaddress=useCallback(()=>{
        setAddressChoice({city_choice:{'name':null,'matp':null,level:1},
        district_choice:{'name':null,'matp':null,level:2,'maqh':null},
        town_choice:{'name':null,'maqh':null,level:3},showcity:false})
    }, [addresschoice]);

    const addressChoice=useCallback((item)=>{
        state.address.address_choice=item
        setState({...state,address:state.address})
    }, [state]);

    const setlistaddress=useCallback((data) => {
        const list_addresses=data.id?state.list_addresses.map(address=>{
            if(data.default && data.id!=address.id){
                return({...address,default:false})
            }
            else{
                return({...address})
            }
        }):[...state.list_addresses,data]
        
        setState({...state,list_addresses:list_addresses})
    }, [state]);
    
    const defaultaddress=useCallback(()=>{
        state.address.default=!state.address.default
        setState({...state,address:state.address})
    }, [state]);


    return(
        <>
        <div id="main">
            <div className="_193wCc">
                <div className="item-col top container-wrapper">
                    <Navbar/>
                </div>
                <div className="containers _1QwuCJ">
                    {user?
                    <User
                    username={user.username}
                    image={user.avatar}
                    />:''}
                    <div className="_3D9BVC">
                        <div className="h4QDlo" role="main">
                            <div className="my-address-tab">
                                <div className="my-account-section">
                                    <div className="my-account-section__header">
                                        <div className="my-account-section__header-left">
                                            <div className="my-account-section__header-title">Địa chỉ của tôi</div>
                                            <div className="my-account-section__header-subtitle"></div>
                                        </div>
                                        <div className="my-account-section__header-button">
                                            <div className="d-flex">
                                                <button onClick={(e)=>createAddress(e)} className="button-solid button-solid--primary button-solid--address-tab">
                                                    <div className="button-with-icon">
                                                        <div className="button-with-icon__icon">
                                                            <svg enableBackground="new 0 0 10 10" viewBox="0 0 10 10" x="0" y="0" className="svg-icon icon-plus-sign"><polygon points="10 4.5 5.5 4.5 5.5 0 4.5 0 4.5 4.5 0 4.5 0 5.5 4.5 5.5 4.5 10 5.5 10 5.5 5.5 10 5.5"></polygon></svg>
                                                        </div>
                                                        <div>Thêm địa chỉ mới</div>
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="list-addresses">
                                    {
                                        state.list_addresses.map(address=>
                                            <div className="_3fZIYj" key={address.id}>
                                                <div className="LCj8k6">
                                                    <div className="_3GTy8o _2v5k6F">
                                                        <div className="_32PpLR">Họ và tên</div>
                                                        <div className="_1MhO3e _18k4Kw">
                                                            <span className="IL7NA_">{address.name}</span>
                                                            {address.default?
                                                            <><div className="bacc-default-badge">Mặc định</div>
                                                            <div className="iGiRqe">Địa chỉ lấy hàng</div>
                                                            <div className="iGiRqe">Địa chỉ trả hàng</div></>:''}
                                                        </div>
                                                    </div>
                                                    <div className="_3GTy8o">
                                                        <div className="_32PpLR">Số điện thoại</div>
                                                        <div className="_1MhO3e">(+84) {address.phone_number}</div>
                                                    </div>
                                                    <div className="_3GTy8o _3U-s42">
                                                        <div className="_32PpLR">Địa chỉ</div>
                                                        <div className="_1MhO3e">
                                                            <span>{address.address}<br/>{address.town}<br/>{address.district}<br/>{address.city}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="_3M1yd1">
                                                    <div className="j_zi1b">
                                                        <button onClick={(e)=>editaddress(e,address)} className="bacc-secondary-action-btn">Sửa</button>
                                                        {!address.default?<button  onClick={(e)=>{setdelete(e,address)}}className="bacc-secondary-action-btn">Xóa</button>:''}
                                                    </div>
                                                    <div className="j_zi1b">
                                                        <button type="button" onClick={(e)=>setdefault(e,address)} className={`btn btn-light btn--s btn--inline ${address.default?'disable':''} ihZMq_`}>Thiết lập mặc định</button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}  
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
        <div id="modal">
            <Address
                show={show}
                action={action}
                list_city={city.list_city}
                city_choice={addresschoice.city_choice}
                district_choice={addresschoice.district_choice}
                town_choice={addresschoice.town_choice}
                setshow={es=>setshow(es)}
                address={address}
                setcitychoice={city=>setcitychoice(city)}
                setdistrictchoice={district=>setdistrictchoice(district)}
                settownchoice={town=>settownchoice(town)}
                clearaddress={()=>clearaddress()}
                setformdata={e=>setformdata(e)}
                addressChoice={item=>addressChoice(item)}
                setlistaddress={item=>setlistaddress(item)}
                defaultaddress={()=>defaultaddress()}
                deleteAddress={address=>deleteAddress(address)}
            />
        </div>
          
        </>
    )
    
}

const mapStateToProps = state => ({
    isAuthenticated: state.isAuthenticated,user:state.user
});

export default connect(mapStateToProps)(Addressuser);