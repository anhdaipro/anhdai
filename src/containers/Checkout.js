import axios from 'axios';
import Navbar from "./Navbar"
import {Link, Navigate,useNavigate} from 'react-router-dom'
import Address from "../hocs/Address"
import { headers,expiry,showchat, showthreads} from '../actions/auth';
import React, {useState, useEffect,useCallback} from 'react'
import { connect } from 'react-redux';
import {formatter,itemvariation,arraymove} from "../constants"
import {localhost,checkoutURL,threadlURL,savevoucherURL,updateAddressURL,cityListURL,listThreadlURL, addressListURL} from "../urls"
import dayjs from 'dayjs';
import styled from 'styled-components'
const Flexcenter=styled.div`
display:flex;
align-items:center;
justify-content:center
`
const Modal=styled(Flexcenter)`
position:fixed;
top:0;
left:0;
right:0;
z-index:9999;
bottom:0;

` 
const ModalWrap=styled.div`
    background: #fff;
    z-index: 10000;
    border-radius: 3px;
    box-shadow: 0 3px 10px 0 rgb(0 0 0 / 14%);
    position: relative;
    width:720px;
}
`

const ModalHeader=styled.div`
    margin-top: 30px;
    margin-right: 30px;
    margin-left: 30px;
    color: #222;
    font-size: 1.25rem;
`
const ModalBody=styled.div`
    display: flex;
    flex-direction: column;
    min-height: 320px;
    max-height: 480px;
    overflow-y: auto;
    box-sizing: border-box;
    margin-top: 16px;
    padding-right: 30px;
    padding-left: 30px;
    overflow: auto;
    .body-title{
        padding-bottom: 9px;
        position: relative;
        margin-top: 12px;
        .title{
            color: #929292;
        };
        .subtitle{
            color: #bbb;
            font-size: .75rem;
            margin-top: 3px;
        }
    }
    
`
const Listitem=styled.div`
    
`
const Item=styled.div`
display:flex;
align-items:center;
margin-bottom:8px;
padding: 20px;
background-color: #fafafa;
cursor:pointer;
box-shadow: inset 4px 0 0 rgb(0 0 0 / 9%);
.item-left{
    flex:1;
    .method{
        margin-right:16px;
        font-size: 1rem;
        font-weight: 500;
    };
    .price{
        margin-left: 3px;
        color: #ee4d2d;
        font-weight: 400;
        font-size: 1rem;
    };
    .time {
        color: #929292;
        font-size: .75rem;
        margin-top: 4px;
    }
};
.item-right{
    font-size:16px;
    color:#ee4d2d
}
`
const ModalFotter=styled.div`
    width: 100%;
    box-sizing: border-box;
    padding-left: 30px;
    padding-right: 30px;
    background: hsla(0,0%,100%,.85);
    .footer-content{
        justify-content:flex-end;
        padding: 20px 0;
        width: 100%;
        border-top: 1px dashed rgba(0,0,0,.09);
        display:flex;
        .btn-light{
            margin-right:16px
        }
    }
`
const Infoitem=(props)=>{
    const {item}=props
    return(
        <div className="_3HkBPE _Fqc2-">
            <div className="_1ASQkt _2rJzUE">
                <img className="_1Qtf1H" src={item.image} width="40" height="40"/>
                <span className="_11r44J">
                <span className="_3F5vLQ">[Mã LTDEC giảm 50K đơn 150K] {item.name}</span>
                </span>
            </div>
            <div className="_1ASQkt Aw_HtH">
            {itemvariation(item)!=''?<span className="_3y8KEH">Loại: {itemvariation(item)}</span>:""}
            </div>
            <div className="_1ASQkt">₫{formatter.format(item.price)}</div>
            <div className="_1ASQkt">{item.quantity}</div>
            <div className="_1ASQkt _2z5WqO">₫{formatter.format(item.total_price)}</div>
        </div>
    )
}
const prices=[
    {method:"Tiết kiệm",price:16400},
    {method:"Nhanh",price:19600},
    {method:"Hỏa tốc",price:39600}
]
const Checkout =({user,showchat})=>{
    const [state,setState] = useState({show_message:false,show_thread:false,loading:false,orders:[],address:null,method_payment:['Ví Điện tử','Thẻ Tín dụng/Ghi nợ',
    'Paypal','Số dư TK Shopee','Payment on delivery'],
    method_choice:'Ví Điện tử',address_choice:null,address_order:null,list_addresses:[],show:false,show_message:false,
    show_message:false})
    const [orders,setOrders]=useState([])
    const [address,setAddress]=useState({address_type:"S",address:'',address_choice:'',default:false,name:'',phone_number:''});
    const [show,setShow]=useState(false)
    const [city,setCity]=useState({list_city:[]})
    
    const [addresschoice,setAddressChoice]=useState({city_choice:{'name':null,'matp':null,level:1},
    district_choice:{'name':null,'matp':null,level:2,'maqh':null},
    town_choice:{'name':null,'maqh':null,level:3},showcity:false})
    if(expiry()<=0 || !localStorage.token){
        window.location.href="/buyer/login"
    }
    const navigate=useNavigate()
    useEffect(() => {
        (async () => {
            const [obj1,obj2]=await axios.all([
                axios.get(checkoutURL,headers()),
                axios.get(`${updateAddressURL}?default=true`,headers())
                ])
                let total=0
                let total_final=0
                let discount_promotion=0
                let discount_voucher=0
                let address_order=null
               
                obj1.data.map((order)=>{
                    total_final+=order.total_final
                    total+=order.total
                    discount_promotion+=order.discount_promotion
                    discount_voucher+=order.discount_voucher
                })
                
                if(obj2.data.length>0){
                    address_order=obj2.data[0]
                }
                else{
                    createAddress()
                }
                setState(prev=>{return{...prev,total_final:total_final,total:total,
                    discount_promotion:discount_promotion,discount_voucher:discount_voucher,
                    address_order:address_order,fee_shipping:fee_shipping,address_choice:address_order
                }})
                const dataorders=obj1.data.map(order=>{
                    return({...order,show_shipping:false,shipping:order.shipping_item[0],fee_shipping:prices.find(item=>item.method==order.shipping_item[0].method).price})
                })
                setOrders(dataorders)
        })()
        
    }, []);
    
    const  checkout = async (e)=>{
        if(state.address_order){
            const form={orders:orders,address_id:state.address_order.id,payment_choice:state.method_choice}
            const res= await axios.post(checkoutURL,JSON.stringify(form),headers())
            const data=res.data
            if(state.method_choice=='Payment on delivery'){
                if(data.waring){
                    alert(data.message)
                }
                navigate("/user/purchase")
            }
            if(state.method_choice=='Paypal'){
                window.location.href="/payment"
            }
        }
    }
    
    function changeaddress(){
        if(state.list_addresses.length==0){
            axios.get(updateAddressURL,headers())
            .then(res=>{
                setState({...state,list_addresses:res.data,show:true})
            })
        }
        else{
            setState({...state,show:true})
        }
    }

    function createAddress(){
        const address_null = {address:'',address_choice:'',default:state.list_addresses.length==0?true:false,name:'',phone_number:''}
        setAddress(address_null)
        setShow(true)
        if(city.list_city.length==0){
            axios.get(cityListURL)
            .then(res=>{
                const list_city=res.data
                setCity({list_city:list_city})
            })
        } 
    }
    
    const setaddressOrder=(e,address)=>{
        state.address_choice=address
        setState({...state,address_chocie:state.address_choice})
    }
    
    const setshow = (es) => {
        setShow(es);
        if(es==false){
            setAddressChoice({city_choice:{'name':null,'matp':null,level:1},
            district_choice:{'name':null,'matp':null,level:2,'maqh':null},
            town_choice:{'name':null,'maqh':null,level:3},showcity:false})   
        }
    }

    const setcitychoice=useCallback((city)=>{
        setAddressChoice({...addresschoice,city_choice:{'name':city.name,'matp':city.matp,level:1},district_choice:{'name':null,'matp':null,level:2,'maqh':null},
        town_choice:{'name':null,'maqh':null,level:3}})
    }, [addresschoice]);

    const setdistrictchoice=(district)=>{
        setAddressChoice({...addresschoice,district_choice:{'name':district.name,'matp':district.matp,level:2,'maqh':district.maqh},town_choice:{'name':null,'maqh':null,level:3}})
    }
    const settownchoice=(town)=>{
        setAddressChoice({...addresschoice,town_choice:{'name':town.name,'maqh':town.maqh,level:3}})
    }

    const setformdata=(e)=>{
        setAddress({...address,[e.target.name]:e.target.value})
    }

    const clearaddress=()=>{
        setAddressChoice({city_choice:{'name':null,'matp':null,level:1},
        district_choice:{'name':null,'matp':null,level:2,'maqh':null},
        town_choice:{'name':null,'maqh':null,level:3},showcity:false})
    }

    const addressChoice=(item)=>{
        setAddress({...address,address_choice:item})
    }

    const setlistaddress=useCallback((data) => {
        const list_addresses=data.id?state.list_addresses.map(address=>{
            if(data.default && data.id!=address.id){
                return({...address,default:false})
            }
            else{
                return({...address})
            }
        }):[...state.list_addresses,data]
        
        const address_choice=state.address_order==null?data:state.address_choice
        setState({...state,list_addresses:list_addresses,address_choice: address_choice,address_order: address_choice})
        
    }, [state]);
    
    const defaultaddress=useCallback(()=>{
        state.address.default=!state.address.default
        setState({...state,address:state.address})
    }, [state]);

    const setshowthread=(e,order)=>{
        e.preventDefault()
        let data={member:[user.id,order.shop.user_id],thread:null}
        showchat(data)
        showthreads()
    }
    const settext=(e,orderchoice)=>{
        setOrders(prev=>prev.map(order=>{
            if(orderchoice.shop==order.shop){
                return({...order,message:e.target.value})
            }
            return({...order})
        }))
    }
    const order=orders.find(order=>order.show_shipping)
    const setorders=(orderchoice,name,value)=>{
        setOrders(prev=>prev.map(order=>{
            if(orderchoice.id==order.id){
                return({...order,shipping_choice:order.shipping,[name]:value})
            }
            return({...order})
        }))
    }
    const setshippingorder=(orderchoice)=>{
        setOrders(prev=>prev.map(order=>{
            if(orderchoice.id==order.id){
                return({...order,show_shipping:false,shipping:order.shipping_choice})
            }
            return({...order})
        }))
    }
    
    const fee_shipping=orders.reduce((total,order)=>{
        return total+prices.find(item=>item.method==order.shipping.method).price
    },0)
    
    return(
        <>
        <div id="main">
            <div className="_193wCc">
                <div className="top container-wrapper">
                    <Navbar
                    hidesearch={true}
                    />
                </div>
                <div className="checkout-content">
                <div className="_3qBcH8">
                    <div className="containers">
                        <div className="_13mnpg">
                            <Link className="dlkJv9" to="/">
                                <svg viewBox="0 0 192 65" className="svg-icon icon-logo"><g fillRule="evenodd"><path d="M35.6717403 44.953764c-.3333497 2.7510509-2.0003116 4.9543414-4.5823845 6.0575984-1.4379707.6145919-3.36871.9463856-4.896954.8421628-2.3840266-.0911143-4.6237865-.6708937-6.6883352-1.7307424-.7375522-.3788551-1.8370513-1.1352759-2.6813095-1.8437757-.213839-.1790053-.239235-.2937577-.0977428-.4944671.0764015-.1151823.2172535-.3229831.5286218-.7791994.45158-.6616533.5079208-.7446018.5587128-.8221779.14448-.2217688.3792333-.2411091.6107855-.0588804.0243289.0189105.0243289.0189105.0426824.0333083.0379873.0294402.0379873.0294402.1276204.0990653.0907002.0706996.14448.1123887.166248.1287205 2.2265285 1.7438508 4.8196989 2.7495466 7.4376251 2.8501162 3.6423042-.0496401 6.2615109-1.6873341 6.7308041-4.2020035.5160305-2.7675977-1.6565047-5.1582742-5.9070334-6.4908212-1.329344-.4166762-4.6895175-1.7616869-5.3090528-2.1250697-2.9094471-1.7071043-4.2697358-3.9430584-4.0763845-6.7048539.296216-3.8283059 3.8501677-6.6835796 8.340785-6.702705 2.0082079-.004083 4.0121475.4132378 5.937338 1.2244562.6816382.2873109 1.8987274.9496089 2.3189359 1.2633517.2420093.1777159.2898136.384872.1510957.60836-.0774686.12958-.2055158.3350171-.4754821.7632974l-.0029878.0047276c-.3553311.5640922-.3664286.5817134-.447952.7136572-.140852.2144625-.3064598.2344475-.5604202.0732783-2.0600669-1.3839063-4.3437898-2.0801572-6.8554368-2.130442-3.126914.061889-5.4706057 1.9228561-5.6246892 4.4579402-.0409751 2.2896772 1.676352 3.9613243 5.3858811 5.2358503 7.529819 2.4196871 10.4113092 5.25648 9.869029 9.7292478M26.3725216 5.42669372c4.9022893 0 8.8982174 4.65220288 9.0851664 10.47578358H17.2875686c.186949-5.8235807 4.1828771-10.47578358 9.084953-10.47578358m25.370857 11.57065968c0-.6047069-.4870064-1.0948761-1.0875481-1.0948761h-11.77736c-.28896-7.68927544-5.7774923-13.82058185-12.5059489-13.82058185-6.7282432 0-12.2167755 6.13130641-12.5057355 13.82058185l-11.79421958.0002149c-.59136492.0107446-1.06748731.4968309-1.06748731 1.0946612 0 .0285807.00106706.0569465.00320118.0848825H.99995732l1.6812605 37.0613963c.00021341.1031483.00405483.2071562.01173767.3118087.00170729.0236381.003628.0470614.00554871.0704847l.00362801.0782207.00405483.004083c.25545428 2.5789222 2.12707837 4.6560709 4.67201764 4.7519129l.00576212.0055872h37.4122078c.0177132.0002149.0354264.0004298.0531396.0004298.0177132 0 .0354264-.0002149.0531396-.0004298h.0796027l.0017073-.0015043c2.589329-.0706995 4.6867431-2.1768587 4.9082648-4.787585l.0012805-.0012893.0017073-.0350275c.0021341-.0275062.0040548-.0547975.0057621-.0823037.0040548-.065757.0068292-.1312992.0078963-.1964115l1.8344904-37.207738h-.0012805c.001067-.0186956.0014939-.0376062.0014939-.0565167M176.465457 41.1518926c.720839-2.3512494 2.900423-3.9186779 5.443734-3.9186779 2.427686 0 4.739107 1.6486899 5.537598 3.9141989l.054826.1556978h-11.082664l.046506-.1512188zm13.50267 3.4063683c.014933.0006399.014933.0006399.036906.0008531.021973-.0002132.021973-.0002132.044372-.0008531.53055-.0243144.950595-.4766911.950595-1.0271786 0-.0266606-.000853-.0496953-.00256-.0865936.000427-.0068251.000427-.020262.000427-.0635588 0-5.1926268-4.070748-9.4007319-9.09145-9.4007319-5.020488 0-9.091235 4.2081051-9.091235 9.4007319 0 .3871116.022399.7731567.067838 1.1568557l.00256.0204753.01408.1013102c.250022 1.8683731 1.047233 3.5831812 2.306302 4.9708108-.00064-.0006399.00064.0006399.007253.0078915 1.396026 1.536289 3.291455 2.5833031 5.393601 2.9748936l.02752.0053321v-.0027727l.13653.0228215c.070186.0119439.144211.0236746.243409.039031 2.766879.332724 5.221231-.0661182 7.299484-1.1127057.511777-.2578611.971928-.5423827 1.37064-.8429007.128211-.0968312.243622-.1904632.34346-.2781231.051412-.0452164.092372-.083181.114131-.1051493.468898-.4830897.498124-.6543572.215249-1.0954297-.31146-.4956734-.586228-.9179769-.821744-1.2675504-.082345-.1224254-.154023-.2267215-.214396-.3133151-.033279-.0475624-.033279-.0475624-.054399-.0776356-.008319-.0117306-.008319-.0117306-.013866-.0191956l-.00256-.0038391c-.256208-.3188605-.431565-.3480805-.715933-.0970445-.030292.0268739-.131624.1051493-.14997.1245582-1.999321 1.775381-4.729508 2.3465571-7.455854 1.7760208-.507724-.1362888-.982595-.3094759-1.419919-.5184948-1.708127-.8565509-2.918343-2.3826022-3.267563-4.1490253l-.02752-.1394881h13.754612zM154.831964 41.1518926c.720831-2.3512494 2.900389-3.9186779 5.44367-3.9186779 2.427657 0 4.739052 1.6486899 5.537747 3.9141989l.054612.1556978h-11.082534l.046505-.1512188zm13.502512 3.4063683c.015146.0006399.015146.0006399.037118.0008531.02176-.0002132.02176-.0002132.044159-.0008531.530543-.0243144.950584-.4766911.950584-1.0271786 0-.0266606-.000854-.0496953-.00256-.0865936.000426-.0068251.000426-.020262.000426-.0635588 0-5.1926268-4.070699-9.4007319-9.091342-9.4007319-5.020217 0-9.091343 4.2081051-9.091343 9.4007319 0 .3871116.022826.7731567.068051 1.1568557l.00256.0204753.01408.1013102c.250019 1.8683731 1.04722 3.5831812 2.306274 4.9708108-.00064-.0006399.00064.0006399.007254.0078915 1.396009 1.536289 3.291417 2.5833031 5.393538 2.9748936l.027519.0053321v-.0027727l.136529.0228215c.070184.0119439.144209.0236746.243619.039031 2.766847.332724 5.22117-.0661182 7.299185-1.1127057.511771-.2578611.971917-.5423827 1.370624-.8429007.128209-.0968312.243619-.1904632.343456-.2781231.051412-.0452164.09237-.083181.11413-.1051493.468892-.4830897.498118-.6543572.215246-1.0954297-.311457-.4956734-.586221-.9179769-.821734-1.2675504-.082344-.1224254-.154022-.2267215-.21418-.3133151-.033492-.0475624-.033492-.0475624-.054612-.0776356-.008319-.0117306-.008319-.0117306-.013866-.0191956l-.002346-.0038391c-.256419-.3188605-.431774-.3480805-.716138-.0970445-.030292.0268739-.131623.1051493-.149969.1245582-1.999084 1.775381-4.729452 2.3465571-7.455767 1.7760208-.507717-.1362888-.982582-.3094759-1.419902-.5184948-1.708107-.8565509-2.918095-2.3826022-3.267311-4.1490253l-.027733-.1394881h13.754451zM138.32144123 49.7357905c-3.38129629 0-6.14681004-2.6808521-6.23169343-6.04042014v-.31621743c.08401943-3.35418649 2.85039714-6.03546919 6.23169343-6.03546919 3.44242097 0 6.23320537 2.7740599 6.23320537 6.1960534 0 3.42199346-2.7907844 6.19605336-6.23320537 6.19605336m.00172791-15.67913203c-2.21776751 0-4.33682838.7553485-6.03989586 2.140764l-.19352548.1573553V34.6208558c0-.4623792-.0993546-.56419733-.56740117-.56419733h-2.17651376c-.47409424 0-.56761716.09428403-.56761716.56419733v27.6400724c0 .4539841.10583425.5641973.56761716.5641973h2.17651376c.46351081 0 .56740117-.1078454.56740117-.5641973V50.734168l.19352548.1573553c1.70328347 1.3856307 3.82234434 2.1409792 6.03989586 2.1409792 5.27140956 0 9.54473746-4.2479474 9.54473746-9.48802964 0-5.239867-4.2733279-9.48781439-9.54473746-9.48781439M115.907646 49.5240292c-3.449458 0-6.245805-2.7496948-6.245805-6.1425854 0-3.3928907 2.79656-6.1427988 6.245805-6.1427988 3.448821 0 6.24538 2.7499081 6.24538 6.1427988 0 3.3926772-2.796346 6.1425854-6.24538 6.1425854m.001914-15.5438312c-5.28187 0-9.563025 4.2112903-9.563025 9.4059406 0 5.1944369 4.281155 9.4059406 9.563025 9.4059406 5.281657 0 9.562387-4.2115037 9.562387-9.4059406 0-5.1946503-4.280517-9.4059406-9.562387-9.4059406M94.5919049 34.1890939c-1.9281307 0-3.7938902.6198995-5.3417715 1.7656047l-.188189.1393105V23.2574169c0-.4254677-.1395825-.5643476-.5649971-.5643476h-2.2782698c-.4600414 0-.5652122.1100273-.5652122.5643476v29.2834155c0 .443339.1135587.5647782.5652122.5647782h2.2782698c.4226187 0 .5649971-.1457701.5649971-.5647782v-9.5648406c.023658-3.011002 2.4931278-5.4412923 5.5299605-5.4412923 3.0445753 0 5.516841 2.4421328 5.5297454 5.4630394v9.5430935c0 .4844647.0806524.5645628.5652122.5645628h2.2726775c.481764 0 .565212-.0824666.565212-.5645628v-9.5710848c-.018066-4.8280677-4.0440197-8.7806537-8.9328471-8.7806537M62.8459442 47.7938061l-.0053397.0081519c-.3248668.4921188-.4609221.6991347-.5369593.8179812-.2560916.3812097-.224267.551113.1668119.8816949.91266.7358184 2.0858968 1.508535 2.8774525 1.8955369 2.2023021 1.076912 4.5810275 1.646045 7.1017886 1.6975309 1.6283921.0821628 3.6734936-.3050536 5.1963734-.9842376 2.7569891-1.2298679 4.5131066-3.6269626 4.8208863-6.5794607.4985136-4.7841067-2.6143125-7.7747902-10.6321784-10.1849709l-.0021359-.0006435c-3.7356476-1.2047686-5.4904836-2.8064071-5.4911243-5.0426086.1099976-2.4715346 2.4015793-4.3179454 5.4932602-4.4331449 2.4904317.0062212 4.6923065.6675996 6.8557356 2.0598624.4562232.2767364.666607.2256796.9733188-.172263.035242-.0587797.1332787-.2012238.543367-.790093l.0012815-.0019308c.3829626-.5500403.5089793-.7336731.5403767-.7879478.258441-.4863266.2214903-.6738208-.244985-1.0046173-.459427-.3290803-1.7535544-1.0024722-2.4936356-1.2978721-2.0583439-.8211991-4.1863175-1.2199998-6.3042524-1.1788111-4.8198184.1046878-8.578747 3.2393171-8.8265087 7.3515337-.1572005 2.9703036 1.350301 5.3588174 4.5000778 7.124567.8829712.4661613 4.1115618 1.6865902 5.6184225 2.1278667 4.2847814 1.2547527 6.5186944 3.5630343 6.0571315 6.2864205-.4192725 2.4743234-3.0117991 4.1199394-6.6498372 4.2325647-2.6382344-.0549182-5.2963324-1.0217793-7.6043603-2.7562084-.0115337-.0083664-.0700567-.0519149-.1779185-.1323615-.1516472-.1130543-.1516472-.1130543-.1742875-.1300017-.4705335-.3247898-.7473431-.2977598-1.0346184.1302162-.0346012.0529875-.3919333.5963776-.5681431.8632459"></path></g></svg>
                                <div className="_2J1x0H">Thanh toán</div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="_1WlhIE">
                    <div className="_1iurwE">
                        <div className="_1G9Cv7"></div>
                        <div className="_1gkIPw">
                            <div className="_1TKMuK">
                                <div className="_20Qrq_">
                                    <div className="_2t2xOY">
                                        <svg height="16" viewBox="0 0 12 16" width="12" className="svg-icon icon-location-marker"><path d="M6 3.2c1.506 0 2.727 1.195 2.727 2.667 0 1.473-1.22 2.666-2.727 2.666S3.273 7.34 3.273 5.867C3.273 4.395 4.493 3.2 6 3.2zM0 6c0-3.315 2.686-6 6-6s6 2.685 6 6c0 2.498-1.964 5.742-6 9.933C1.613 11.743 0 8.498 0 6z" fillRule="evenodd"></path></svg>
                                    </div>
                                    <div>Địa chỉ nhận hàng</div>
                                </div>
                                {state.show?
                                <div className="WtRfuB">
                                    <button onClick={(e)=>createAddress(e)} className="stardust-button _3kjQa7">
                                        <svg enableBackground="new 0 0 10 10" viewBox="0 0 10 10" role="img" className="stardust-icon stardust-icon-plus-sign _3PTu7X"><path stroke="none" d="m10 4.5h-4.5v-4.5h-1v4.5h-4.5v1h4.5v4.5h1v-4.5h4.5z"></path></svg>
                                        Thêm địa chỉ mới
                                    </button>
                                    <Link to="/user/account/address">
                                        <button className="stardust-button checkout-address-selection__manage-btn">Thiết lập địa chỉ</button>
                                    </Link>
                                </div>:""}
                                
                            </div>
                            {state.address_order!=null?
                            <div className={!state.show?'item-center':'_1uZwoD'}>
                                {state.show?<>
                                    <div className="stardust-radio-group">
                                        {state.list_addresses.map(address=>
                                        <div key={address.id} onChange={(e)=>setaddressOrder(e,address)} className="stardust-radio">
                                            <div className="custom-radio">
                                                <label className="check_input">
                                                    <div className="stardust-radio__content">
                                                        <div className="stardust-radio__label">
                                                            <div className="_2Pe7Hh _1n8OVK">
                                                                <div className="_3E850P">{state.address_order.name} (+84) {state.address_order.phone_number}</div>
                                                                <div className="_2F7jaW">{state.address_order.address}, {state.address_order.town}, {state.address_order.district}, {state.address_order.city}</div>
                                                                {state.address_order.default?<div className="_2LiNia">Mặc định</div>:''}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <input type="radio" checked={state.address_order.id==state.address_choice.id?true:false} name="address" className="radio-input"/>
                                                    <span className="checkmark"></span>
                                                </label>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="_1JeHlf">
                                    <button onClick={()=>setState({...state,show:false,address_order:state.address_choice})} className="stardust-button stardust-button--primary _2KXPcN">Hoàn thành</button>
                                    <button onClick={()=>setState({...state,show:false,address_choice:state.address_order})} className="stardust-button _2RTMeT">Trở Lại</button>
                                </div></>:<>
                                <div className="_2Pe7Hh">
                                    <div className="_3E850P">{state.address_order.name} (+84) {state.address_order.phone_number}</div>
                                    <div className="_2F7jaW">{state.address_order.address}, {state.address_order.town}, {state.address_order.district}, {state.address_order.city}</div>
                                    <div className="_2LiNia">Mặc định</div>
                                </div>
                                <div onClick={(e)=>changeaddress(e)} className="_1xGx71">Change</div></>
                                }
                            </div>:''}
                        </div>
                    </div>
                    <div className="_1p19xl">
                        <div className="ktZs2X">
                            <div className="item-center _1_W4l_">
                                <div className="_3GZI6L mpT3lP">
                                    <div className="_3NO6B5">Sản phẩm</div>
                                </div>
                                <div className="_3GZI6L _2vvZhb"></div>
                                <div className="_3GZI6L">Đơn giá</div>
                                <div className="_3GZI6L">Số lượng</div>
                                <div className="_3GZI6L _17w1DK">Thành tiền</div>
                            </div>
                        </div>
                        <div>
                            {orders.map(order=>
                                <div key={order.id} className="jNDkp2">
                                    <div className="QjLA16">
                                        <div className="_2sALOn">
                                            <div className="_127ZmV _3QG1FZ">
                                                <svg viewBox="0 0 24 11"><g fill="#fff" fillRule="evenodd"><path d="M19.615 7.143V1.805a.805.805 0 0 0-1.611 0v5.377H18c0 1.438.634 2.36 1.902 2.77V9.95c.09.032.19.05.293.05.444 0 .805-.334.805-.746a.748.748 0 0 0-.498-.69v-.002c-.59-.22-.885-.694-.885-1.42h-.002zm3 0V1.805a.805.805 0 0 0-1.611 0v5.377H21c0 1.438.634 2.36 1.902 2.77V9.95c.09.032.19.05.293.05.444 0 .805-.334.805-.746a.748.748 0 0 0-.498-.69v-.002c-.59-.22-.885-.694-.885-1.42h-.002zm-7.491-2.985c.01-.366.37-.726.813-.726.45 0 .814.37.814.742v5.058c0 .37-.364.73-.813.73-.395 0-.725-.278-.798-.598a3.166 3.166 0 0 1-1.964.68c-1.77 0-3.268-1.456-3.268-3.254 0-1.797 1.497-3.328 3.268-3.328a3.1 3.1 0 0 1 1.948.696zm-.146 2.594a1.8 1.8 0 1 0-3.6 0 1.8 1.8 0 1 0 3.6 0z"></path><path d="M.078 1.563A.733.733 0 0 1 .565.89c.423-.15.832.16 1.008.52.512 1.056 1.57 1.88 2.99 1.9s2.158-.85 2.71-1.882c.19-.356.626-.74 1.13-.537.342.138.477.4.472.65a.68.68 0 0 1 .004.08v7.63a.75.75 0 0 1-1.5 0V3.67c-.763.72-1.677 1.18-2.842 1.16a4.856 4.856 0 0 1-2.965-1.096V9.25a.75.75 0 0 1-1.5 0V1.648c0-.03.002-.057.005-.085z" fillRule="nonzero"></path></g></svg>
                                            </div>
                                            <span className="_3xBVfW">{order.shop.name}</span>
                                            <div onClick={(e)=>setshowthread(e,order)} className="_3j3nK5">
                                                <svg viewBox="0 0 16 16" className="svg-icon _3WJbe6 "><g fillRule="evenodd"><path d="M15 4a1 1 0 01.993.883L16 5v9.932a.5.5 0 01-.82.385l-2.061-1.718-8.199.001a1 1 0 01-.98-.8l-.016-.117-.108-1.284 8.058.001a2 2 0 001.976-1.692l.018-.155L14.293 4H15zm-2.48-4a1 1 0 011 1l-.003.077-.646 8.4a1 1 0 01-.997.923l-8.994-.001-2.06 1.718a.5.5 0 01-.233.108l-.087.007a.5.5 0 01-.492-.41L0 11.732V1a1 1 0 011-1h11.52zM3.646 4.246a.5.5 0 000 .708c.305.304.694.526 1.146.682A4.936 4.936 0 006.4 5.9c.464 0 1.02-.062 1.608-.264.452-.156.841-.378 1.146-.682a.5.5 0 10-.708-.708c-.185.186-.445.335-.764.444a4.004 4.004 0 01-2.564 0c-.319-.11-.579-.258-.764-.444a.5.5 0 00-.708 0z"></path></g></svg>
                                                Chat ngay
                                            </div>
                                        </div>
                                        <div className="_1oOvbg">
                                            <div className="_39uqs7">
                                                <div className="_14WCeM">
                                                    <div className="_1jqQS1">
                                                        <div className="_2y0Xda">
                                                            <svg fill="none" viewBox="0 -2 23 22" className="svg-icon icon-voucher-line"><g filter="url(#voucher-filter0_d)"><mask id="a" fill="#fff"><path fillRule="evenodd" clipRule="evenodd" d="M1 2h18v2.32a1.5 1.5 0 000 2.75v.65a1.5 1.5 0 000 2.75v.65a1.5 1.5 0 000 2.75V16H1v-2.12a1.5 1.5 0 000-2.75v-.65a1.5 1.5 0 000-2.75v-.65a1.5 1.5 0 000-2.75V2z"></path></mask><path d="M19 2h1V1h-1v1zM1 2V1H0v1h1zm18 2.32l.4.92.6-.26v-.66h-1zm0 2.75h1v-.65l-.6-.26-.4.91zm0 .65l.4.92.6-.26v-.66h-1zm0 2.75h1v-.65l-.6-.26-.4.91zm0 .65l.4.92.6-.26v-.66h-1zm0 2.75h1v-.65l-.6-.26-.4.91zM19 16v1h1v-1h-1zM1 16H0v1h1v-1zm0-2.12l-.4-.92-.6.26v.66h1zm0-2.75H0v.65l.6.26.4-.91zm0-.65l-.4-.92-.6.26v.66h1zm0-2.75H0v.65l.6.26.4-.91zm0-.65l-.4-.92-.6.26v.66h1zm0-2.75H0v.65l.6.26.4-.91zM19 1H1v2h18V1zm1 3.32V2h-2v2.32h2zm-.9 1.38c0-.2.12-.38.3-.46l-.8-1.83a2.5 2.5 0 00-1.5 2.29h2zm.3.46a.5.5 0 01-.3-.46h-2c0 1.03.62 1.9 1.5 2.3l.8-1.84zm.6 1.56v-.65h-2v.65h2zm-.9 1.38c0-.2.12-.38.3-.46l-.8-1.83a2.5 2.5 0 00-1.5 2.29h2zm.3.46a.5.5 0 01-.3-.46h-2c0 1.03.62 1.9 1.5 2.3l.8-1.84zm.6 1.56v-.65h-2v.65h2zm-.9 1.38c0-.2.12-.38.3-.46l-.8-1.83a2.5 2.5 0 00-1.5 2.29h2zm.3.46a.5.5 0 01-.3-.46h-2c0 1.03.62 1.9 1.5 2.3l.8-1.84zM20 16v-2.13h-2V16h2zM1 17h18v-2H1v2zm-1-3.12V16h2v-2.12H0zm1.4.91a2.5 2.5 0 001.5-2.29h-2a.5.5 0 01-.3.46l.8 1.83zm1.5-2.29a2.5 2.5 0 00-1.5-2.3l-.8 1.84c.18.08.3.26.3.46h2zM0 10.48v.65h2v-.65H0zM.9 9.1a.5.5 0 01-.3.46l.8 1.83A2.5 2.5 0 002.9 9.1h-2zm-.3-.46c.18.08.3.26.3.46h2a2.5 2.5 0 00-1.5-2.3L.6 8.65zM0 7.08v.65h2v-.65H0zM.9 5.7a.5.5 0 01-.3.46l.8 1.83A2.5 2.5 0 002.9 5.7h-2zm-.3-.46c.18.08.3.26.3.46h2a2.5 2.5 0 00-1.5-2.3L.6 5.25zM0 2v2.33h2V2H0z" mask="url(#a)"></path></g><path clipRule="evenodd" d="M6.49 14.18h.86v-1.6h-.86v1.6zM6.49 11.18h.86v-1.6h-.86v1.6zM6.49 8.18h.86v-1.6h-.86v1.6zM6.49 5.18h.86v-1.6h-.86v1.6z"></path><defs><filter id="voucher-filter0_d" x="0" y="1" width="20" height="16" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix><feOffset></feOffset><feGaussianBlur stdDeviation=".5"></feGaussianBlur><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.09 0"></feColorMatrix><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"></feBlend><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"></feBlend></filter></defs></svg>
                                                            <div>Voucher của Shop</div>
                                                        </div>
                                                    </div>
                                                    <div className="_1gSjSG">
                                                        <button className="_2QDgKd">
                                                            <span>Chọn Voucher</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            {order.cart_item.map(cartitem=><>
                                                
                                                <Infoitem
                                                    item={cartitem}
                                                    key={cartitem.id}
                                                />
                                                {cartitem.byproducts.map(byproduct=>
                                                    <Infoitem
                                                        key={byproduct.id}
                                                        item={byproduct}
                                                    />
                                                )}
                                                </>
                                            )}
                                        </div>
                                        <div className="_1CMLls">
                                            <div className="_2cbALo _19UxTW">
                                                <div className="_2Bi0_l">
                                                    <span>Lời nhắn:</span>
                                                    <div className="_2RoXL2">
                                                        <div className="_2SbVjg _3FcjyB">
                                                            <div className="-MhUeb nVfi9v">
                                                                <input onChange={(e)=>settext(e,order)} className="_2bfjEn" type="text" placeholder="Lưu ý cho Người bán..." value={order.message}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="_2cbALo _2i5d8_">
                                                <div className="_167h1y">Đơn vị vận chuyển:</div>
                                                <div className="_2v48Zq">
                                                    <div>{order.shipping.method}</div>
                                                    <div className="_3pQMrK">Vui lòng chọn thời gian giao hàng mong muốn</div>
                                                </div>
                                                <div className="_1AYYHD"></div>
                                                <div className="JjgwiH">(Nhanh tay vào ngay "Anhdai Voucher" để săn mã Miễn phí vận chuyển nhé!)</div>
                                                <div onClick={()=>setorders(order,'show_shipping',true)} className="_26DEZ8">Thay đổi</div>
                                                <div className="_1OKizE">₫{formatter.format(prices.find(item=>item.method==order.shipping.method).price)}</div>
                                            </div>
                                        </div>
                                        <div className="_1MFx1Y">
                                            <div className="_3519w5">Tổng số tiền ({order.count} sản phẩm):</div>
                                            <div className="-c5EIK">₫{formatter.format(order.total_final+prices.find(item=>item.method==order.shipping.method).price)}</div>
                                        </div> 
                                    </div>
                                </div>
                            )}
                            
                        </div>
                    </div>
                    <div className="_3pDlnN">
                        <div className="_1ru0hU">
                            <div className="_-4zBNu">
                                <div className="FgeP4U">
                                    <div className="t57Ey0">
                                    <svg fill="none" viewBox="0 -2 23 22" className="svg-icon icon-voucher-line"><g filter="url(#voucher-filter0_d)"><mask id="a" fill="#fff"><path fillRule="evenodd" clipRule="evenodd" d="M1 2h18v2.32a1.5 1.5 0 000 2.75v.65a1.5 1.5 0 000 2.75v.65a1.5 1.5 0 000 2.75V16H1v-2.12a1.5 1.5 0 000-2.75v-.65a1.5 1.5 0 000-2.75v-.65a1.5 1.5 0 000-2.75V2z"></path></mask><path d="M19 2h1V1h-1v1zM1 2V1H0v1h1zm18 2.32l.4.92.6-.26v-.66h-1zm0 2.75h1v-.65l-.6-.26-.4.91zm0 .65l.4.92.6-.26v-.66h-1zm0 2.75h1v-.65l-.6-.26-.4.91zm0 .65l.4.92.6-.26v-.66h-1zm0 2.75h1v-.65l-.6-.26-.4.91zM19 16v1h1v-1h-1zM1 16H0v1h1v-1zm0-2.12l-.4-.92-.6.26v.66h1zm0-2.75H0v.65l.6.26.4-.91zm0-.65l-.4-.92-.6.26v.66h1zm0-2.75H0v.65l.6.26.4-.91zm0-.65l-.4-.92-.6.26v.66h1zm0-2.75H0v.65l.6.26.4-.91zM19 1H1v2h18V1zm1 3.32V2h-2v2.32h2zm-.9 1.38c0-.2.12-.38.3-.46l-.8-1.83a2.5 2.5 0 00-1.5 2.29h2zm.3.46a.5.5 0 01-.3-.46h-2c0 1.03.62 1.9 1.5 2.3l.8-1.84zm.6 1.56v-.65h-2v.65h2zm-.9 1.38c0-.2.12-.38.3-.46l-.8-1.83a2.5 2.5 0 00-1.5 2.29h2zm.3.46a.5.5 0 01-.3-.46h-2c0 1.03.62 1.9 1.5 2.3l.8-1.84zm.6 1.56v-.65h-2v.65h2zm-.9 1.38c0-.2.12-.38.3-.46l-.8-1.83a2.5 2.5 0 00-1.5 2.29h2zm.3.46a.5.5 0 01-.3-.46h-2c0 1.03.62 1.9 1.5 2.3l.8-1.84zM20 16v-2.13h-2V16h2zM1 17h18v-2H1v2zm-1-3.12V16h2v-2.12H0zm1.4.91a2.5 2.5 0 001.5-2.29h-2a.5.5 0 01-.3.46l.8 1.83zm1.5-2.29a2.5 2.5 0 00-1.5-2.3l-.8 1.84c.18.08.3.26.3.46h2zM0 10.48v.65h2v-.65H0zM.9 9.1a.5.5 0 01-.3.46l.8 1.83A2.5 2.5 0 002.9 9.1h-2zm-.3-.46c.18.08.3.26.3.46h2a2.5 2.5 0 00-1.5-2.3L.6 8.65zM0 7.08v.65h2v-.65H0zM.9 5.7a.5.5 0 01-.3.46l.8 1.83A2.5 2.5 0 002.9 5.7h-2zm-.3-.46c.18.08.3.26.3.46h2a2.5 2.5 0 00-1.5-2.3L.6 5.25zM0 2v2.33h2V2H0z" mask="url(#a)"></path></g><path clipRule="evenodd" d="M6.49 14.18h.86v-1.6h-.86v1.6zM6.49 11.18h.86v-1.6h-.86v1.6zM6.49 8.18h.86v-1.6h-.86v1.6zM6.49 5.18h.86v-1.6h-.86v1.6z"></path><defs><filter id="voucher-filter0_d" x="0" y="1" width="20" height="16" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix><feOffset></feOffset><feGaussianBlur stdDeviation=".5"></feGaussianBlur><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.09 0"></feColorMatrix><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"></feBlend><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"></feBlend></filter></defs></svg>
                                    <span className="y4xiL1">Anhdai Voucher</span>
                                    </div>
                                </div>
                            </div>
                            <div className="_3Cew6Y">
                                <button className="jrXNrr">Chọn Voucher</button>
                            </div>
                        </div>
                        <div className="_2geelQ">
                            <div className="_9OwJsb">
                                <svg fill="none" viewBox="0 0 18 18" className="svg-icon _4j8ZJQ icon-coin-line"><path stroke="#FFA600" strokeWidth="1.3" d="M17.35 9A8.35 8.35 0 11.65 9a8.35 8.35 0 0116.7 0z"></path><path fill="#FFA600" fillRule="evenodd" stroke="#FFA600" strokeWidth=".2" d="M6.86 4.723c-.683.576-.998 1.627-.75 2.464.215.725.85 1.258 1.522 1.608.37.193.77.355 1.177.463.1.027.2.051.3.08.098.03.196.062.294.096.06.021.121.044.182.067.017.006.107.041.04.014-.07-.028.071.03.087.037.286.124.56.27.82.44.114.076.045.024.151.111a2.942 2.942 0 01.322.303c.087.093.046.042.114.146.18.275.245.478.235.8-.01.328-.14.659-.325.867-.47.53-1.232.73-1.934.696a4.727 4.727 0 01-1.487-.307c-.45-.182-.852-.462-1.242-.737-.25-.176-.643-.04-.788.197-.17.279-.044.574.207.75.753.532 1.539.946 2.474 1.098.885.144 1.731.124 2.563-.224.78-.326 1.416-.966 1.607-1.772.198-.838-.023-1.644-.61-2.29-.683-.753-1.722-1.17-2.706-1.43a4.563 4.563 0 01-.543-.183c.122.048-.044-.02-.078-.035a4.77 4.77 0 01-.422-.212c-.594-.338-.955-.722-.872-1.369.105-.816.757-1.221 1.555-1.28.808-.06 1.648.135 2.297.554.614.398 1.19-.553.58-.947-1.33-.86-3.504-1.074-4.77-.005z" clipRule="evenodd"></path></svg>
                                <div className="_2admnB">Anhdai Xu</div>
                                <div className="D7rpcx">Không thể sử dụng Xu</div>
                            </div>
                            <div className="_2df0Hz">
                                <div className="_3pEs7y">[-₫0]</div>
                                <label className="stardust-checkbox stardust-checkbox--disabled">
                                    <input type="checkbox" className="check_item" name="check"/>
                                    <div className="stardust-checkbox__box"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="f23wB9">
                        <div className="qXX2_B">
                            <div className="checkout-payment-method-view__current checkout-payment-setting">
                                <div className="checkout-payment-method-view__current-title">Phương thức thanh toán</div>
                                <div className="checkout-payment-setting__payment-methods-tab">
                                    {state.method_payment.map(method=>
                                        <span key={method} tabIndex="0">
                                            <button onClick={()=>setState({...state,method_choice:method})} className={`product-variation ${method==state.method_choice?'product-variation--selected':''}`}>{method=='Số dư TK Shopee'?<div>
                                                <span>Số dư TK Shopee</span>
                                                <span className="_14y5eV _8sLn79">(₫0)</span>
                                            </div>:method}
                                                {method==state.method_choice?
                                                <div className="product-variation__tick">
                                                    <svg enableBackground="new 0 0 12 12" viewBox="0 0 12 12" x="0" y="0" className="svg-icon icon-tick-bold"><g><path d="m5.2 10.9c-.2 0-.5-.1-.7-.2l-4.2-3.7c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l3.4 3 5.1-7c .3-.4 1-.5 1.4-.2s.5 1 .2 1.4l-5.7 7.9c-.2.2-.4.4-.7.4 0-.1 0-.1-.1-.1z"></path></g></svg>
                                                </div>:""}
                                                
                                            </button>
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="checkout-payment-setting__payment-method-options">
                                <div className="checkout-payment-setting__banners">
                                    <div className="channel-banner channel-banner__single" style={{backgroundColor: 'rgb(238, 77, 45)'}}>
                                        <div className="channel-banner__icon" style={{backgroundImage: `url(http://f.shopee.vn/file/9d80581d68a582e3b9c42dd37372a653)`}}></div>
                                        <div className="channel-banner__logo" style={{backgroundImage: `url(http://f.shopee.vn/file/7242e1026006f66c3b0c4ec7d35568f1)`}}></div>
                                        <div className="channel-banner__main-desc">Giảm đến 10%</div>
                                        <div className="channel-banner__sub-desc">Ưu đãi Ví Điện tử</div>
                                    </div>
                                    <div className="bank-transfer-category">
                                        <div className="bank-transfer-category__body">
                                            <div className="checkout-bank-transfer-item">
                                                <div className="stardust-radio" tabIndex="0" role="radio" aria-checked="false" aria-disabled="false">
                                                    <div className="stardust-radio-button">
                                                        <div className="stardust-radio-button__outer-circle">
                                                            <div className="stardust-radio-button__inner-circle"></div>
                                                        </div>
                                                    </div>
                                                    <div className="stardust-radio__content">
                                                        <div className="stardust-radio__label">
                                                            <div className="checkout-bank-transfer-item__card">
                                                                <div className="checkout-bank-transfer-item__icon-container">
                                                                    <img src="http://localhost:8000/media/my_web/37110bc844b571f80e7dd14beb5415e9.png" className="checkout-bank-transfer-item__icon"/>
                                                                </div>
                                                                <div className="checkout-bank-transfer-item__main">
                                                                    <div className="checkout-bank-transfer-item__title">Ví Điện tử Số dư</div>
                                                                    <div className="checkout-bank-transfer-item__subtitle">₫184.400</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bank-transfer-category">
                                <div className="bank-transfer-category__body">
                                    <div className="checkout-bank-transfer-item">
                                        <div className="stardust-radio" tabIndex="0" role="radio" aria-checked="false">
                                            <div className="stardust-radio-button">
                                                <div className="stardust-radio-button__outer-circle">
                                                    <div className="stardust-radio-button__inner-circle"></div>
                                                </div>
                                            </div>
                                            <div className="stardust-radio__content">
                                                <div className="stardust-radio__label">
                                                    <div className="checkout-bank-transfer-item__card">
                                                        <div className="checkout-bank-transfer-item__icon-container">
                                                            <img src="http://cdn.airpay.vn/images_v1/c134/icon_c13425_v001.png" className="checkout-bank-transfer-item__icon"/>
                                                        </div>
                                                        <div className="checkout-bank-transfer-item__main">
                                                        <div className="checkout-bank-transfer-item__title">OCB</div>
                                                        <div className="checkout-bank-transfer-item__subtitle checkout-bank-account-item__number">*3005</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="PC1-mc">
                            <div className="_1i3wS2 _1X3--o RihLPS">Tổng tiền hàng</div>
                            <div className="_1i3wS2 lsNObX RihLPS">₫{formatter.format(state.total)}</div>
                            <div className="_1i3wS2 _1X3--o _1tcGRT">Phí vận chuyển</div>
                            <div className="_1i3wS2 lsNObX _1tcGRT">₫{formatter.format(fee_shipping)}</div>
                            {state.discount_promotion>0?<>
                            <div className="_1i3wS2 _1X3--o _1O3Crk">Combo khuyến mãi</div>
                            <div className="_1i3wS2 lsNObX _1O3Crk">-₫{formatter.format(state.discount_promotion)}</div></>:''}
                            {state.discount_voucher>0?<>
                            <div className="_1i3wS2 _1X3--o _1O3Crk">Deal shock</div>
                            <div className="_1i3wS2 lsNObX _1O3Crk">-₫{formatter.format(state.discount_voucher)}</div></>:''}
                            <div className="_1i3wS2 _1X3--o _1lSnJ4">Tổng thanh toán:</div>
                            <div className="_1i3wS2 _20-5lO lsNObX _1lSnJ4">₫{formatter.format(state.total_final+fee_shipping)}</div>
                            <div className="_3swGZ9">
                                <div className="RVLKaf">
                                    <div className="_28K0Ni">Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo 
                                    <a href="https://shopee.vn/legaldoc/policies/" target="_blank" rel="noopener noreferrer">Điều khoản Shopee</a>
                                    </div>
                                </div>
                                <button disabled={state.address_order?false:true} onClick={(e)=>checkout(e)} className={`stardust-button stardust-button--primary ${state.address_order?'':'disable'} stardust-button--large _1qSlAe`}>Đặt hàng</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
        <div id="modal">
            {show?
                <Address
                show={show}
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
                setlistaddress={item=>setlistaddress(item)}
                addressChoice={item=>addressChoice(item)}
                defaultaddress={()=>defaultaddress()}
            />
            :''}
            {order&&(
                <Modal>
                    <ModalWrap>
                        
                            <ModalHeader>
                                <div className="title">Chọn đơn vị vận chuyển</div>
                            </ModalHeader>
                            <ModalBody>
                                <div className="body-title">
                                    <div className="title">KÊNH VẬN CHUYỂN LIÊN KẾT VỚI SHOPEE</div>
                                    <div className="subtitle">Bạn có thể theo dõi đơn hàng trên ứng dụng Shopee khi chọn một trong các đơn vị vận chuyển:</div> 
                                </div>
                                <Listitem>
                                    {order.shipping_item.map(shipping=>
                                        <Item onClick={()=>setorders(order,'shipping_choice',shipping)} key={shipping.id}>
                                            <div className="item-left">
                                                <div className="d-flex">
                                                    <div className="method">{shipping.method}</div>
                                                    <div className='price'>₫{formatter.format(prices.find(item=>item.method==shipping.method).price)}</div>
                                                </div>
                                                <div className="time">Nhận hàng vào {dayjs().add(3,'day').format("DD")} Th{dayjs().add(3,'day').format("MM")} - {dayjs().add(4,'day').format("DD")} Th{dayjs().add(4,'day').format("MM")}</div>
                                            </div>
                                            {shipping.id==order.shipping_choice.id &&( <div className="item-right">
                                                <svg enable-background="new 0 0 15 15" viewBox="0 0 15 15" role="img" class="stardust-icon stardust-icon-tick"><path stroke="none" d="m6.5 13.6c-.2 0-.5-.1-.7-.2l-5.5-4.8c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l4.7 4 6.8-9.4c.3-.4.9-.5 1.4-.2.4.3.5 1 .2 1.4l-7.4 10.3c-.2.2-.4.4-.7.4 0 0 0 0-.1 0z"></path></svg>
                                            </div>)}
                                        </Item>
                                    )}
                                </Listitem>
                            </ModalBody>
                            <ModalFotter>
                                <div className="footer-content">
                                    <button onClick={()=>setorders(order,'show_shipping',false)} className="btn-m btn-light">TRỞ LẠI</button>
                                    <button onClick={()=>setshippingorder(order)} className="btn-m btn-orange">Hoàn thành</button>
                                </div>
                            </ModalFotter>
                        
                    </ModalWrap>
                </Modal>
            )}
        </div>
        
        </>    
    )
}
const mapStateToProps = state => ({
    isAuthenticated: state.isAuthenticated,user:state.user
});
export default connect(mapStateToProps,{showchat,showthreads})(Checkout);