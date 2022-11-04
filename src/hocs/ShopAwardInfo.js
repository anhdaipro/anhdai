import axios from 'axios';
import Navbar from "../seller/Navbar"
import {Link,useParams} from 'react-router-dom'
import ReactDOM, { render } from 'react-dom'
import Timeoffer from "./Timeoffer"
import React, {useState,useEffect,useCallback,useRef,useMemo} from 'react'
import Pagination from "./Pagination"
import {formatter,discount_type,valid_from,valid_to,time_end,timevalue, award_type,timesubmit} from "../constants"
import { headers } from '../actions/auth';
import { awardshopURL, newAwardshopURL, newshop_awardURL,detailAwardshopURL } from '../urls';
import Productoffer from '../seller/promotions/Productoffer';
let Pagesize=5
const list_awards_default=[
    {value:1,minimum_order_value:3000,maximum_discount:'',quantity:2,amount:2000,percent:'',discount_type:'2',type_award:'1',type_voucher:'Offer'},
    {value:2,minimum_order_value:15000,maximum_discount:'',quantity:2,amount:1000,percent:'',discount_type:'2',type_award:'1',type_voucher:'Offer'},
    {value:3,minimum_order_value:15000,maximum_discount:'',quantity:2,amount:800,percent:'',discount_type:'2',type_award:'1',type_voucher:'Offer'},
]
const ShopAwardInfo=(props)=>{
    const [shop_award,setShopaward]=useState({game_name:'',valid_from:valid_from.toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).substr(0,16),
    valid_to:valid_to.toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).substr(0,16),
    })
    const [listaward,setListaward]=useState([])
    const [loading,setLoading]=useState(false)
    const [show,setShow]=useState(false)
    const [timestart,setTime_start]=useState(()=>timevalue(new Date()))
    const [timeend,setTime_end]=useState(()=>timevalue(time_end))
    const [state,setState]=useState({timeSecond:5,complete:false})
    const [index,setIndex]=useState()
    const [awardchoice,setAwardchoice]=useState()
    const [requestedit,setEditaward]=useState(false)
    const {id}=useParams()
    const edit=id?true:false
    const url=id?`${detailAwardshopURL}/${id}`:newAwardshopURL
    useEffect(() => {
        (async () => {
            if(id){
            const res = await axios(url,headers)
            const data=res.data
            setShopaward({game_name:data.game_name,valid_from:timesubmit(data.valid_from),valid_to:timesubmit(data.valid_to)})
            setTime_end(timesubmit(data.valid_to))
            setTime_start(timesubmit(data.valid_from))
            setLoading(true)
            const list_awards=data.list_awards.map(item=>{
                return({...item,value:item.id})
            })
            setListaward(list_awards)
        }
        else{
            setLoading(true)
        }
        })();
    }, [id])
    
    const setdatevalid=(index,date)=>{
        const dateshop_award=date.time.toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).substr(0,10)+' '+('0'+date.hours).slice(-2)+':'+("0"+date.minutes).slice(-2)
        const datadate=index==0?{valid_from:dateshop_award,valid_to:shop_award.valid_to}:{valid_to:dateshop_award,valid_from:shop_award.valid_from}
        setShopaward({...shop_award,...datadate})
        const data={action:'checkitem',...datadate}
        axios.post(url,JSON.stringify(data),headers)
        .then(res=>{
            const data=res.data.sameitem   
        })
    }

    const budgets=useMemo(()=>{
        return listaward.reduce((total,obj,i)=>{
            const discount=obj.discount_type=='1'?obj.quantity*obj.maximum_discount:obj.quantity*obj.amount
            return total+discount
        },0)
    },[listaward])
    const quantity_award=useMemo(()=>{
        return listaward.reduce((total,obj,i)=>{
            const quantity=obj.quantity!=''?parseInt(obj.quantity):0
            return total+quantity
        },0)
    },[listaward])

    const complete=()=>{
        const datashop_award={valid_from:shop_award.valid_from,valid_to:shop_award.valid_to,game_name:shop_award.game_name}
        const data={...datashop_award,action:'submit',list_award:listaward}
        axios.post(url,JSON.stringify(data),headers)
        .then(res=>{
            if(!res.data.error){
                const countDown = setInterval(() => {
                    state.timeSecond--;
                    setState({...state,complete:true})
                    if (state.timeSecond <= 0) {
                        clearInterval(countDown)
                        setState({...state,complete:false})
                        }
                }, 1000);
            }
        })
    }

    const addaward=(e)=>{
        setListaward([...listaward,...list_awards_default])
    }
    const setform=(e)=>{
        setShopaward({...shop_award,[e.target.name]:e.target.value})
    }
    const editaward=(e,itemchoice,index)=>{
        setShow(true)
        setIndex(itemchoice.value)
    }
    const removeitem=(e,itemchoice)=>{
        setListaward(listaward.filter(item=>itemchoice.value!==item.value))
    }
    
    const setaward=(e)=>{
        setListaward(current=>current.map((item,i)=>{
            if(index==item.value){
                return awardchoice
            }
            return ({...item})
        }))
    }
    function TaoSoNgauNhien(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const addmoreaward=(e)=>{
        setShow(true)
        setEditaward(false)
        const value=TaoSoNgauNhien(4,9999)
        setAwardchoice({value:value,minimum_order_value:'',maximum_discount:'',quantity:'',amount:'',percent:'',discount_type:'1',type_award:'1',type_voucher:'Offer'})
        setIndex(value)
    }
    const [showdiscount,setShowdiscount]=useState(false)
    const parent=useRef()
    useEffect(() => {
        document.addEventListener('click', handleClick)
        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [])
    const handleClick = (event) => {
        const { target } = event
        if(parent.current!=null){
            if (!parent.current.contains(target)) {
                setShowdiscount(false)
            }
        }
    }
    const setlistaward=useCallback((e,itemchoice,name,value)=>{
        setListaward(current=>current.map(item=>{
            if(item.value==itemchoice.value){
            return({...item,[name]:value})
            }
            return({...item})
        }))
    },[])
    return(
        <>
            
            <div id="app">
            <Navbar/>
            
            <div data-v-39395675="" className="wrapper">
                
                <div className="wrapper-content shop-game-edit-page">
                    
                    <div data-v-48e5cded className="bundle-info-container prize-model-wrapper">
                        <h2 className=" p-2">New progrram</h2>
                        
                        <div className="bundle-info card">
                            <h4>info basic</h4>
                            
                            <div data-v-75b2c032 className="base-infos edit-mode">
                            
                            <div data-v-75b2c032 className="base-info-wrapper">
                                
                                <div className="">   
                                    
                                    <div className="item-base-line mb-1">
                                        <label for="" className="form-item__label">
                                            Loại Game
                                        </label>
                                        
                                        
                                        <div className="form-item__content">
                                            <span data-v-75b2c032="" className="each-game-info">Vòng quay may mắn</span>
                                        </div>  
                                        
                                    </div>
                                    
                                    <div className="item-base-line mb-1">
                                        <label for="" className="form-item__label">
                                            Name game
                                        </label>
                                        
                                        <div className="item-col">
                                            
                                            <div className="input-inner" style={{width: '450px'}}> 
                                                <input type="text" value={shop_award.game_name} onChange={(e)=>setform(e)} className="form-select" name="game_name" placeholder="Enter" style={{width: '450px'}} required/>
                                                
                                                <div className="input__suffix">
                                                </div>
                                            </div>
                                            
                                            <div className="info_more">shop_award name not visible to buyers</div>
                                        </div>
                                    </div>
                                    
                                    <div className="item-base-line mb-1">
                                        <label for="" className="form-item__label">Time to save discount code</label>
                                        
                                        <div className="flex-col">
                                            <Timeoffer
                                            data={shop_award}
                                            time_start={timestart}
                                            time_end={timeend}
                                            setdatevalid={(index,date)=>setdatevalid(index,date)}
                                            edit={edit}
                                            />
                                            
                                            <div className="info_more">
                                                <p>The time of the shop_award is too 180 days</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="item-base-line mb-1">
                                        <label for="" className="form-item__label">
                                        Giới hạn lượt chơi mỗi ngày
                                        </label>
                                        
                                        <div className="form-item__content">
                                            <span data-v-75b2c032="" className="each-game-info">4 Lượt</span>
                                        </div>
                                    </div>
                                    
                                    <div className="item-base-line mb-1">
                                        <label for="" className="form-item__label">
                                        Lượt chơi cộng thêm khi chia sẻ Game
                                        </label>
                                        
                                        <div className="form-item__content">
                                            <span data-v-75b2c032="" className="each-game-info">Người chơi sẽ được 1 lượt chơi cộng thêm khi chia sẻ Game, 
                                            tối đa 4 lượt chơi/ ngày</span>
                                        </div>
                                    </div>
                                </div>  
                            </div>
                            
                            <div data-v-75b2c032="" className="game-template">
                                <div data-v-75b2c032="" className="game-sample">
                                <div className="game-sample-imgs" style={{transform: `translateX(-300%)`, transitionDuration: `0.3s`}}>
                                
                                <div className="game-sample-img-wrapper">
                                    
                                    <div className="game-sample-img">
                                        <div className="game-sample-img-content" style={{backgroundImage: `url(https://cf.shopee.vn/file/a6906d750308f2229fd6ba8d9432c9a0)`}}>
                                            </div>
                                            </div>
                                        </div> 
                                    <div className="game-sample-img-wrapper">
                                        <div className="game-sample-img">
                                        <div className="game-sample-img-content" style={{backgroundImage: `url(https://cf.shopee.vn/file/43255e2373a0e042174c1f2984830a47)`}}>
                                            </div>
                                            </div>
                                        </div>
                                    <div className="game-sample-img-wrapper">
                                        <div className="game-sample-img">
                                        <div className="game-sample-img-content" style={{backgroundImage: `url(https://cf.shopee.vn/file/a6906d750308f2229fd6ba8d9432c9a0)`}}>
                                            </div>
                                            </div>
                                        </div> 
                                    <div className="game-sample-img-wrapper">
                                        <div className="game-sample-img">
                                        <div className="game-sample-img-content" style={{backgroundImage: `url(https://cf.shopee.vn/file/43255e2373a0e042174c1f2984830a47)`}}>
                                            </div>
                                            </div>
                                        </div>
                                        </div> 
                                    <div className="game-sample-selector"><ul><li className="active"></li><li className=""></li></ul>
                                    </div> 
                                    <div className="game-sample-tips">
                                Vòng quay may mắn là game vòng quay người chơi có thể nhận được 1 trong số 6 giải mỗi lượt chơi
                                <button type="button" className="learn-more-link button button--link button--normal"><span>Tìm hiểu thêm</span></button>
                                </div>
                                </div>
                                </div>
                        </div>
                        </div>
                    </div>
                    
                    <div data-v-1eec1518 className="budget-and-prizes-wrapper">
                        <div data-v-1eec1518="" className="header">
                            <div data-v-bc4998e0="" data-v-1eec1518="" className="module-title">
                                <span data-v-bc4998e0="" className="title-info">Giải thưởng</span> 
                                {listaward.length==0?
                                <p data-v-bc4998e0="" className="desc-info"> Hệ thống sẽ đề xuất các giải thưởng dựa trên thời gian trò chơi của bạn, bạn có thể chỉnh sửa chúng.</p>
                                :''}
                            </div> 
                            {listaward.length>0?
                            <button onClick={(e)=>addmoreaward(e)} className="button--primary btn-m add-product item-center">
                                <i className="icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8.48176704,1.5 C8.75790942,1.5 8.98176704,1.72385763 8.98176704,2 L8.981,7.997 L15,7.99797574 C15.2761424,7.99797574 15.5,8.22183336 15.5,8.49797574 C15.5,8.77411811 15.2761424,8.99797574 15,8.99797574 L8.981,8.997 L8.98176704,15 C8.98176704,15.2761424 8.75790942,15.5 8.48176704,15.5 C8.20562467,15.5 7.98176704,15.2761424 7.98176704,15 L7.981,8.997 L2,8.99797574 C1.72385763,8.99797574 1.5,8.77411811 1.5,8.49797574 C1.5,8.22183336 1.72385763,7.99797574 2,7.99797574 L7.981,7.997 L7.98176704,2 C7.98176704,1.72385763 8.20562467,1.5 8.48176704,1.5 Z"></path></svg>
                                    </i>
                                <span className="ml-1_2">Thiết lập giải thưởng</span>  
                            </button>:''}
                        </div>
                        <div data-v-79306ef0="" data-v-1eec1518="" className="loading-wrapper">
                            {listaward.length==0?
                            <div data-v-1eec1518="" data-v-79306ef0="" className="budget-wrapper">
                                <div onClick={e=>addaward(e)} data-v-1eec1518="" data-v-79306ef0="" className="action-buttons">
                                    <button data-v-1eec1518="" type="button" className="generate-prizes-btn button button--primary button--normal button--outline" data-v-79306ef0="">
                                        <span>Thiết lập giải thưởng</span>
                                    </button>
                                </div> 
                            </div>:''}
                            <div data-v-1eec1518="" data-v-79306ef0="" className="game-prizes"> 
                                {listaward.length>0 && listaward.length<5?
                                <div data-v-1eec1518="" className="alert prize-tips alert--error" data-v-79306ef0="">
                                    <div className="alert-icon">
                                        <i className="icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8,1 C11.8659932,1 15,4.13400675 15,8 C15,11.8659932 11.8659932,15 8,15 C4.13400675,15 1,11.8659932 1,8 C1,4.13400675 4.13400675,1 8,1 Z M8.00070711,7.29218611 L5.87867966,5.17157288 C5.68341751,4.97631073 5.36683502,4.97631073 5.17157288,5.17157288 C4.99800652,5.34513923 4.97872137,5.61456363 5.11371742,5.80943177 L5.17157288,5.87867966 L7.29289322,8 L5.17157288,10.1213203 C4.97631073,10.3165825 4.97631073,10.633165 5.17157288,10.8284271 C5.34513923,11.0019935 5.61456363,11.0212786 5.80943177,10.8862826 L5.87867966,10.8284271 L8,8.70710678 L10.1213203,10.8284271 C10.3165825,11.0236893 10.633165,11.0236893 10.8284271,10.8284271 C11.0019935,10.6548608 11.0212786,10.3854364 10.8862826,10.1905682 L10.8284271,10.1213203 L8.70710678,8 L10.8284271,5.87867966 C11.0236893,5.68341751 11.0236893,5.36683502 10.8284271,5.17157288 C10.6548608,4.99800652 10.3854364,4.97872137 10.1905682,5.11371742 L10.1213203,5.17157288 L8.00070711,7.29218611 L5.87867966,5.17157288 L8.00070711,7.29218611 Z"></path></svg>
                                        </i>
                                    </div>
                                    <div className="alert-content">
                                        <div className="alert-title">
                                            Vòng quay may mắn yêu cầu ít nhất 5 giải thưởng. Vui lòng thêm giải thưởng để tạo trò chơi.
                                        </div> 
                                    </div>
                                </div>:''}
                                {listaward.length>0?
                                <div data-v-1eec1518="" className="game-prizes-table" data-v-79306ef0="">
                                    <div style={{position:'relative'}} className="table game-prizes-table-content">
                                        <div className="sticky-assist" style={{willChange: `width, height`}}>

                                        </div>
                                        <div className="table__header-container" style={{position: 'sticky', top: '0px', zIndex: 2}}> 
                                        <div className="table__main-header">
                                            <table cellSpacing="0" cellPadding="0" border="0" className="table__header" style={{width: `1214px`}}>
                                                <colgroup>
                                                    <col width="318"/>
                                                    <col width="254"/>
                                                    <col width="224"/>
                                                    <col width="222"/>
                                                    <col width="196"/>
                                                </colgroup>
                                                <thead>
                                                    <tr>
                                                        <th colSpan="1" rowSpan="1" className="">
                                                            <div className="table__cell first-cell">
                                                                <span className="table__cell-label">Giải thưởng</span>
                                                            </div>
                                                        </th>
                                                        <th colSpan="1" rowSpan="1" className="">
                                                            <div className="table__cell">
                                                                <span className="table__cell-label">Mức giảm tối đa</span>
                                                            </div>
                                                        </th>
                                                        <th colSpan="1" rowSpan="1" className="">
                                                            <div className="table__cell">
                                                                <span className="table__cell-label">Giá trị đơn hàng tối thiểu</span>
                                                            </div>
                                                        </th>
                                                        <th colSpan="1" rowSpan="1" className="">
                                                            <div className="table__cell">
                                                                <span className="table__cell-label">
                                                                    <div data-v-1eec1518="" className="table-header">Số lượng Giải thưởng
                                                                        <div data-v-1eec1518="" className="popover popover--light">
                                                                            <div className="popover__ref">
                                                                                <i data-v-1eec1518="" className="icon">
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8,1 C11.8659932,1 15,4.13400675 15,8 C15,11.8659932 11.8659932,15 8,15 C4.13400675,15 1,11.8659932 1,8 C1,4.13400675 4.13400675,1 8,1 Z M8,2 C4.6862915,2 2,4.6862915 2,8 C2,11.3137085 4.6862915,14 8,14 C11.3137085,14 14,11.3137085 14,8 C14,4.6862915 11.3137085,2 8,2 Z M7.98750749,10.2375075 C8.40172105,10.2375075 8.73750749,10.5732939 8.73750749,10.9875075 C8.73750749,11.401721 8.40172105,11.7375075 7.98750749,11.7375075 C7.57329392,11.7375075 7.23750749,11.401721 7.23750749,10.9875075 C7.23750749,10.5732939 7.57329392,10.2375075 7.98750749,10.2375075 Z M8.11700238,4.60513307 C9.97011776,4.60513307 10.7745841,6.50497267 9.94298079,7.72186504 C9.76926425,7.97606597 9.56587088,8.14546785 9.27050506,8.31454843 L9.11486938,8.39945305 L8.95824852,8.47993747 C8.56296349,8.68261431 8.49390831,8.75808648 8.49390831,9.0209925 C8.49390831,9.29713488 8.27005069,9.5209925 7.99390831,9.5209925 C7.71776594,9.5209925 7.49390831,9.29713488 7.49390831,9.0209925 C7.49390831,8.34166619 7.7650409,7.99681515 8.35913594,7.6662627 L8.76655168,7.45066498 C8.9424056,7.3502536 9.04307851,7.26633638 9.11735517,7.1576467 C9.52116165,6.56675314 9.11397414,5.60513307 8.11700238,5.60513307 C7.41791504,5.60513307 6.82814953,6.01272878 6.75715965,6.55275918 L6.75,6.66244953 L6.74194433,6.75232516 C6.69960837,6.98557437 6.49545989,7.16244953 6.25,7.16244953 C5.97385763,7.16244953 5.75,6.9385919 5.75,6.66244953 C5.75,5.44256682 6.87194406,4.60513307 8.11700238,4.60513307 Z"></path></svg>
                                                                                </i> 
                                                                            </div> 
                                                                            <div className="popper popover__popper popover__popper--light with-arrow" style={{display: `none`, maxWidth: `320px`}}>
                                                                                <div className="popover__content">
                                                                                    <div data-v-1eec1518="">
                                                                                    Trò chơi sẽ kết thúc khi tất cả các giải thưởng được nhận hết. Cơ hội trúng thưởng của mỗi giải phụ thuộc vào số lượng giải thưởng. Người mua sẽ có cơ hội cao hơn để nhận được giải thưởng khi số lượng giải thưởng lớn hơn.
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    </span>
                                                                </div>
                                                            </th>
                                                            <th colSpan="1" rowSpan="1" className="">
                                                                <div className="table__cell last-cell">
                                                                    <span className="table__cell-label">Hoạt động</span>
                                                        
                                                                </div>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                </table>
                                            </div> 
                                        </div>
                                        <div className="table__body-container">
                                            <div className="table__main-body">
                                                <div className="scrollbar">
                                                    <div className="scrollbar__wrapper">
                                                        <div className="scrollbar__bar horizontal">
                                                            <div className="scrollbar__thumb visible" style={{left: '0px', width: '0px'}}>
                                                            </div>
                                                        </div>
                                                        <div className="scrollbar__content">
                                                            <div className="table__body">
                                                                <colgroup>
                                                                    <col width="318"/>
                                                                    <col width="254"/>
                                                                    <col width="224"/>
                                                                    <col width="222"/>
                                                                    <col width="196"/>
                                                                        
                                                                </colgroup>
                                                                <tbody>
                                                                    {listaward.map((item,i)=>
                                                                    <tr key={item.value} className="table__row valign-top">
                                                                        <td className="is-first">
                                                                            <div className="table__cell first-cell">
                                                                                <div data-v-1eec1518="" className="promotion-info-style promotion-info-comp src-components-promotion-info-src---promotion-info-comp--2YkTi">
                                                                                    <div className="info-left">
                                                                                        <div className="promotion-image" style={{width: '56px', height: '56px', backgroundImage: `url(${item.discount_type=='1'?'https://res.cloudinary.com/dltj2mkhl/image/upload/v1659149848/download_6_heohbs.png':'https://res.cloudinary.com/dltj2mkhl/image/upload/v1659149848/download_7_fnrlcg.png'})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: `center center`}}>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="info-right" style={{maxWidth: `calc((100% - 56px) - 8px)`}}>
                                                                                        <div data-v-4679d5c2="" className="ellipsis-text-wrapper info-right-item promotion-name">
                                                                                            <div data-v-4679d5c2="" className="tooltip popover popover--dark">
                                                                                                <div className="popover__ref">
                                                                                                    <div data-v-4679d5c2="" className="ellipsis-content single">
                                                                                                        {item.discount_type=='1'?`${item.percent}%`:`₫${formatter.format(item.amount)}`}
                                                                                                    </div>
                                                                                                </div> 
                                                                                                <div className="popper popover__popper popover__popper--dark tooltip__popper" style={{display: `none`, maxWidth: `280px`, wordBreak: `break-all`, overflowWrap: `break-word`}}>
                                                                                                    <div className="popover__content">{item.discount_type=='1'?`${item.percent}`:`₫${formatter.format(item.amount)}`}</div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div data-v-4679d5c2="" className="ellipsis-text-wrapper has-tooltips info-right-item promotion-desc">
                                                                                            <div data-v-4679d5c2="" className="tooltip popover popover--dark">
                                                                                                <div className="popover__ref">
                                                                                                    <div data-v-4679d5c2="" className="ellipsis-content single">
                                                                                                        {item.discount_type=='1'?`Discount`:`Giảm giá - Theo số tiền`}
                                                                                                    </div>
                                                                                                </div> 
                                                                                                <div className="popper popover__popper popover__popper--dark tooltip__popper" style={{display: `none`, maxWidth: `280px`, wordBreak: `break-all`, overflowWrap: `break-word`}}>
                                                                                                    <div className="popover__content">{item.discount_type=='1'?`Discount`:`Giảm giá - Theo số tiền`}</div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td className="">
                                                                            <div className="table__cell">{item.discount_type=='1'?`${formatter.format(item.maximum_discount)}`:'-'}</div>
                                                                            
                                                                        </td>
                                                                        <td className="">
                                                                            <div className="table__cell">
                                                                                ₫{formatter.format(item.minimum_order_value)}
                                                                                
                                                                            </div>
                                                                        </td>
                                                                        <td className="">
                                                                            <div className="table__cell">
                                                                                <div data-v-1eec1518="" className="input quantity-input number-input number-input--normal number-input--no-suffix">
                                                                                    <div className="input__inner input__inner--normal    item-center"> 
                                                                                        <input type="text" value={item.quantity} onChange={e=>setlistaward(e,item,'quantity',isNaN(e.target.value)?item.quantity:e.target.value)} placeholder="0" resize="vertical" rows="2" minrows="2" restrictiontype="value" max="Infinity" min="-Infinity" className="input__input"/> 
                                                                                        <div className="input__suffix">
                                                                                            <div className="number-input__controls">
                                                                                                <div onClick={(e)=>setlistaward(e,item,'quantity',item.quantity+1)} className={`number-input__control up`}>
                                                                                                    <i className="icon">
                                                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M7.57253679,6.40074676 L5.1530248,8.66903925 C4.90120463,8.90512066 4.88844585,9.30064304 5.12452726,9.55246321 C5.24268191,9.67849483 5.40773242,9.75 5.58048801,9.75 L10.419512,9.75 C10.76469,9.75 11.044512,9.47017797 11.044512,9.125 C11.044512,8.95224442 10.9730068,8.7871939 10.8469752,8.66903925 L8.42746321,6.40074676 C8.18705183,6.17536109 7.81294817,6.17536109 7.57253679,6.40074676 Z"></path></svg>
                                                                                                    </i>
                                                                                                </div> 
                                                                                                <div onClick={(e)=>{if(item.quantity>1){setlistaward(e,item,'quantity',item.quantity-1)}}} className={`number-input__control ${item.quantity<=1?'disable':''} down`}>
                                                                                                    <i className="icon">
                                                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M7.57253679,9.34925324 L5.1530248,7.08096075 C4.90120463,6.84487934 4.88844585,6.44935696 5.12452726,6.19753679 C5.24268191,6.07150517 5.40773242,6 5.58048801,6 L10.419512,6 C10.76469,6 11.044512,6.27982203 11.044512,6.625 C11.044512,6.79775558 10.9730068,6.9628061 10.8469752,7.08096075 L8.42746321,9.34925324 C8.18705183,9.57463891 7.81294817,9.57463891 7.57253679,9.34925324 Z"></path></svg>
                                                                                                    </i>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td className="is-last">
                                                                            <div className="table__cell last-cell">
                                                                                <div data-v-079a06a0="" data-v-1eec1518="" className="action-list">
                                                                                    <ul data-v-079a06a0="" className="action-list-wrapper">
                                                                                        <li onClick={e=>{setAwardchoice(item)
                                                                                            setEditaward(true)
                                                                                            setShow(true)
                                                                                            setIndex(item.value)}} data-v-079a06a0="" className="action-item">
                                                                                            <button data-v-079a06a0="" type="button" className="button--link button--normal">
                                                                                                <span> Sửa</span>
                                                                                            </button>
                                                                                        </li>
                                                                                       
                                                                                        <li onClick={e=>removeitem(e,item)} data-v-079a06a0="" className="action-item">
                                                                                            <button data-v-079a06a0="" type="button" className="button--link button--normal">
                                                                                                <span>Xóa</span>                                                                                                                                                                                            
                                                                                            </button>
                                                                                        </li>
                                                                                    </ul>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                    </tr>)}
                                                                </tbody>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <i className="icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8,1 C11.8659932,1 15,4.13400675 15,8 C15,11.8659932 11.8659932,15 8,15 C4.13400675,15 1,11.8659932 1,8 C1,4.13400675 4.13400675,1 8,1 Z M8.00070711,7.29218611 L5.87867966,5.17157288 C5.68341751,4.97631073 5.36683502,4.97631073 5.17157288,5.17157288 C4.99800652,5.34513923 4.97872137,5.61456363 5.11371742,5.80943177 L5.17157288,5.87867966 L7.29289322,8 L5.17157288,10.1213203 C4.97631073,10.3165825 4.97631073,10.633165 5.17157288,10.8284271 C5.34513923,11.0019935 5.61456363,11.0212786 5.80943177,10.8862826 L5.87867966,10.8284271 L8,8.70710678 L10.1213203,10.8284271 C10.3165825,11.0236893 10.633165,11.0236893 10.8284271,10.8284271 C11.0019935,10.6548608 11.0212786,10.3854364 10.8862826,10.1905682 L10.8284271,10.1213203 L8.70710678,8 L10.8284271,5.87867966 C11.0236893,5.68341751 11.0236893,5.36683502 10.8284271,5.17157288 C10.6548608,4.99800652 10.3854364,4.97872137 10.1905682,5.11371742 L10.1213203,5.17157288 L8.00070711,7.29218611 L5.87867966,5.17157288 L8.00070711,7.29218611 Z"></path></svg>
                                        </i>
                                    </div>
                                </div>:''}
                            </div>
                        </div>
                    </div>
                    
                    <div className="bottom-card">
                        
                        <div data-v-121ca16c className="fix-container fixed-bottom action-buttons-wrapper">
                            <div data-v-121ca16c="" data-v-192fa078="" className="outline-wrapper">
                                <div data-v-0a2be7a1="" data-v-121ca16c="" className="prize-outline-wrapper game-prizes-outline-container" data-v-192fa078="">
                                    <div data-v-0a2be7a1="" className="game-prizes-outline bold">
                                        <div data-v-0a2be7a1="" className="prize-outline-item item-center">
                                            <div data-v-0a2be7a1="" className="prize-outline-item-title">
                                                Nhập Giải thưởng của Game:
                                            </div> 
                                        <div data-v-0a2be7a1="" className="prize-outline-item-content">{listaward.length}</div>
                                    </div> 
                                    <div data-v-0a2be7a1="" className="prize-outline-item item-center">
                                        <div data-v-0a2be7a1="" className="prize-outline-item-title">Số lượng Giải thưởng:</div> 
                                            <div data-v-0a2be7a1="" className="prize-outline-item-content">{quantity_award}</div>
                                        </div>  
                                        <div data-v-0a2be7a1="" className="prize-outline-item item-center">
                                            <div data-v-0a2be7a1="" className="item-center prize-outline-item-title">
                                                Voucher Budget
                                                <div data-v-0a2be7a1="" className="popover popover--light">
                                                    <div className="popover__ref">
                                                        <i data-v-0a2be7a1="" className="icon">
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8,1 C11.8659932,1 15,4.13400675 15,8 C15,11.8659932 11.8659932,15 8,15 C4.13400675,15 1,11.8659932 1,8 C1,4.13400675 4.13400675,1 8,1 Z M8,2 C4.6862915,2 2,4.6862915 2,8 C2,11.3137085 4.6862915,14 8,14 C11.3137085,14 14,11.3137085 14,8 C14,4.6862915 11.3137085,2 8,2 Z M7.98750749,10.2375075 C8.40172105,10.2375075 8.73750749,10.5732939 8.73750749,10.9875075 C8.73750749,11.401721 8.40172105,11.7375075 7.98750749,11.7375075 C7.57329392,11.7375075 7.23750749,11.401721 7.23750749,10.9875075 C7.23750749,10.5732939 7.57329392,10.2375075 7.98750749,10.2375075 Z M8.11700238,4.60513307 C9.97011776,4.60513307 10.7745841,6.50497267 9.94298079,7.72186504 C9.76926425,7.97606597 9.56587088,8.14546785 9.27050506,8.31454843 L9.11486938,8.39945305 L8.95824852,8.47993747 C8.56296349,8.68261431 8.49390831,8.75808648 8.49390831,9.0209925 C8.49390831,9.29713488 8.27005069,9.5209925 7.99390831,9.5209925 C7.71776594,9.5209925 7.49390831,9.29713488 7.49390831,9.0209925 C7.49390831,8.34166619 7.7650409,7.99681515 8.35913594,7.6662627 L8.76655168,7.45066498 C8.9424056,7.3502536 9.04307851,7.26633638 9.11735517,7.1576467 C9.52116165,6.56675314 9.11397414,5.60513307 8.11700238,5.60513307 C7.41791504,5.60513307 6.82814953,6.01272878 6.75715965,6.55275918 L6.75,6.66244953 L6.74194433,6.75232516 C6.69960837,6.98557437 6.49545989,7.16244953 6.25,7.16244953 C5.97385763,7.16244953 5.75,6.9385919 5.75,6.66244953 C5.75,5.44256682 6.87194406,4.60513307 8.11700238,4.60513307 Z"></path></svg>
                                                        </i>
                                                    </div> 
                                                    <div className="popper popover__popper popover__popper--light with-arrow" style={{display: 'none', maxWidth: '320px'}}>
                                                        <div className="popover__content">Ngân sách Mã giảm giá sẽ được ước tính dựa trên số lượng giải thưởng. Chi phí thực tế sẽ được khấu trừ mỗi khi Người chơi mua hàng.</div>
                                                    </div>
                                                </div>:
                                            </div> 
                                            <div data-v-0a2be7a1="" className="prize-outline-item-content final-budget">₫{formatter.format(budgets)}</div>
                                        </div>
                                    </div>
                                </div> 
                            </div>
                            <div data-v-121ca16c className="action-buttons">
                                <button className="cancel-btn btn-m btn-light">Cancel</button>
                                <button onClick={()=>complete()} className="save-btn btn-orange btn-m" type="button" >Submit</button>
                            </div>
                        </div>
                    </div>  
                </div>
            </div>
            </div>
            
            <div>
                {show?
                
                <div className="modal__mask" style={{zIndex: 1000023}}>
                    
                    <div className="modal__container">
                        
                        <div className="modal__box">
                            
                            <div className="modal__content modal__content--medium">
                                
                                <div className="modal__header">
                                    
                                    <div className="modal__header-inner modal__header-inner__has-close"> 
                                        
                                        <div className="modal__title">Thêm URL Video YouTube ở đây</div> 
                                    </div>
                                </div> 
                                
                                <div className="modal__body" style={{position: 'relative'}}>
                                    
                                    <div data-v-48e5cded="" className="success-content">
                                        <form data-v-48e5cded="" autocomplete="off" className="reward-setting form--label-top voucher-reward-setting src-components-voucher-reward-setting-src---voucher-reward-setting--1SMAd">
                                            
                                            <div data-v-16507936="" data-v-48e5cded="" className="form-item">
                                                <label for="prizeType" className="form-item__label"> Loại giải thưởng</label> 
                                                
                                                <div className="form-item__control">
                                                    
                                                    <div className="form-item__content">
                                                        
                                                        <div data-v-16507936="" className="radio-group radio-group--normal radio-group--solid">
                                                            {award_type.map(item=>
                                                            <label key={item.value} onChange={e=>setAwardchoice({...awardchoice,type_award:item.value})} data-v-16507936="" className="radio">
                                                                <input checked={item.value==awardchoice.type_award?true:false} type="radio" className="radio__input" value={item.value}/> 
                                                                    <span className="radio__indicator">
                                                                </span> 
                                                                <span className="radio__label">{item.name}</span>
                                                            </label> 
                                                            )}
                                                            
                                                        </div>
                                                    </div>  
                                                </div>
                                            </div>
                                            
                                            <div className="form-item reward-type-form src-components-voucher-reward-setting-src---reward-type-form--10CKM">
                                                <label for="rewardType" className="form-item__label"> Loại Voucher</label> 
                                                
                                                <div className="form-item__control">
                                                    
                                                    <div className="form-item__content">
                                                        
                                                        <div className="radio-group radio-group--normal radio-group--solid">
                                                            <label className="radio">
                                                                <input type="radio" className="radio__input" value="0"/> 
                                                                <span className="radio__indicator">
                                                                </span> 
                                                                <span className="radio__label">Khuyến Mãi</span>
                                                            </label>
                                                        </div>
                                                    </div>  
                                                </div>
                                            </div>
                                            
                                            <div className="form-item">
                                                <label for="discountPercentage" className="form-item__label"> Loại giảm giá | Mức giảm</label> 
                                                
                                                <div className="form-item__control">
                                                    
                                                    <div className="form-item__content">
                                                        
                                                        <div className="discount-amount src-components-voucher-reward-setting-src---discount-amount--30KK_">
                                                            
                                                            <div className="input-group discount-amount-group src-components-voucher-reward-setting-src---discount-amount-group--1SNZl">
                                                                <span className="input-group__prepend" style={{width: `160px`}}>
                                                                    
                                                                    <div ref={parent} className="select discount-type">
                                                                        
                                                                        <div onClick={e=>setShowdiscount(!showdiscount)} tabIndex="0" className="selector selector--normal"> 
                                                                            
                                                                            <div className="selector__inner line-clamp--1">{awardchoice.discount_type=='1'?'Theo phần trăm':'Theo số tiền'}</div> 
                                                                            
                                                                            <div className="selector__suffix"> 
                                                                                <i className="selector__suffix-icon icon">
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M8,9.18933983 L4.03033009,5.21966991 C3.73743687,4.9267767 3.26256313,4.9267767 2.96966991,5.21966991 C2.6767767,5.51256313 2.6767767,5.98743687 2.96966991,6.28033009 L7.46966991,10.7803301 C7.76256313,11.0732233 8.23743687,11.0732233 8.53033009,10.7803301 L13.0303301,6.28033009 C13.3232233,5.98743687 13.3232233,5.51256313 13.0303301,5.21966991 C12.7374369,4.9267767 12.2625631,4.9267767 11.9696699,5.21966991 L8,9.18933983 Z"></path></svg>
                                                                                </i>
                                                                            </div>
                                                                        </div> 
                                                                        
                                                                        <div className="popper" style={{display: `${showdiscount?'':'none'}`}}> 
                                                                            
                                                                            <div className="select__menu" style={{maxWidth: `440px`, maxHeight: `218px`}}>
                                                                                
                                                                                <div className="scrollbar">
                                                                                    
                                                                                    <div className="scrollbar__wrapper">
                                                                                        
                                                                                        <div className="scrollbar__bar vertical">
                                                                                            
                                                                                            <div className="scrollbar__thumb" style={{top: `0px`, height: '0px'}}>

                                                                                            </div>
                                                                                        </div>  
                                                                                        
                                                                                        <div className="scrollbar__content" style={{position: 'relative'}}>
                                                                                            
                                                                                            <div className="select__options">
                                                                                                {discount_type.map(item=><div key={item.value} onClick={e=>{
                                                                                                    setAwardchoice({...awardchoice,discount_type:item.value})
                                                                                                    setShowdiscount(false)
                                                                                            }} className={`option ${awardchoice.discount_type==item.value?'selected':''}`}>{item.name}</div>)}
                                                                                                   
                                                                                            </div>
                                                                                            
                                                                                            <div className="resize-triggers">
                                                                                                
                                                                
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div> 
                                                                            <p className="select__filter-empty" style={{display: `none`}}>
                                            
                                                                            </p> 
                                                                        </div>
                                                                    </div>
                                                                </span> 
                                                                <span className="input-group__append">
                                                                    
                                                                    <div className="discount-amount-wrapper src-components-voucher-reward-setting-src---discount-amount-wrapper--QubKh">
                                                                        {awardchoice.discount_type=='1'?
                                                                        <div className="input discount-input" placeholder="Nhập giá trị lớn hơn 1%">
                                                                            
                                                                            <div className="input__inner input__inner--normal    item-center"> 
                                                                                <input value={awardchoice.percent} onChange={(e)=>setAwardchoice({...awardchoice,percent:isNaN(e.target.value)?awardchoice.percent:e.target.value})} type="text" placeholder="Nhập giá trị lớn hơn 1%" resize="vertical" rows="2" minrows="2" restrictiontype="value" max="Infinity" min="-Infinity" className="input__input"/> 
                                                                                
                                                                                <div className="input__suffix">
                                                                                    <span className="input__suffix-split">
                                                                                    </span>%GIẢM
                                                                                </div>
                                                                            </div>
                                                                        </div>:
                                                                        <div className="input currency-input">
                                                                            <div className="input__inner input__inner--normal    item-center">
                                                                                <div className="input__prefix">₫<span className="input__prefix-split">
                                                                                    </span>
                                                                                </div> 
                                                                                <input value={awardchoice.amount} onChange={e=>setAwardchoice({...awardchoice,amount:!isNaN(e.target.value)?e.target.value:awardchoice.amount})} type="text" placeholder="Nhập vào" resize="vertical" rows="2" minrows="2" maxlength="13" restrictiontype="value" max="Infinity" min="-Infinity" className="input__input"/> 
                                                                            </div>
                                                                        </div>}
                                                                    </div>
                                                                </span> 
                                                            </div>
                                                        </div>
                                                    </div>  
                                                    
                                                    <div className="form-item__extra">

                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="form-item" classname="maximum-price,">
                                                <label for="maxAmountOptions" className="form-item__label"> Mức giảm tối đa</label> 
                                                
                                                <div className="form-item__control">
                                                    
                                                    <div className="form-item__content">
                                                        
                                                        <div className="radio-group radio-group--normal radio-group--solid max-amount-options">
                                                            
                                                            <div>
                                                                
                                                                <div className="form-item">
                                                                    <label for="maximumDiscountPrice" className="form-item__label empty"> </label> 
                                                                    
                                                                    <div className="form-item__control">
                                                                    
                                                                    <div className="form-item__content">
                                                                        
                                                                        <div className="input currency-input max-voucher-amount">
                                                                            
                                                                            <div className="input__inner input__inner--normal    item-center">
                                                                                
                                                                                <div className="input__prefix">₫
                                                                                    <span className="input__prefix-split">
                                                                                    </span>
                                                                                    </div> 
                                                                                    <input value={awardchoice.maximum_discount} onChange={e=>setAwardchoice({...awardchoice,maximum_discount:isNaN(e.target.value)?awardchoice.maximum_discount:e.target.value})} type="text" placeholder="Nhập vào" resize="vertical" rows="2" minrows="2" maxlength="13" restrictiontype="value" max="Infinity" min="-Infinity" className="input__input"/> 
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
                                            
                                            <div className="form-item minimum-basket-prize">
                                                <label for="minimumBasketPrice" className="form-item__label"> Giá trị đơn hàng tối thiểu</label> 
                                                
                                                <div className="form-item__control">
                                                    
                                                    <div className="form-item__content">
                                                        
                                                        <div className="input currency-input minimum-basket-input">
                                                            
                                                            <div className="input__inner input__inner--normal    item-center">
                                                                
                                                                <div className="input__prefix">₫
                                                                    <span className="input__prefix-split">
                                                                    </span>
                                                                </div> 
                                                                <input type="text" value={awardchoice.minimum_order_value} onChange={e=>setAwardchoice({...awardchoice,minimum_order_value:isNaN(e.target.value)?awardchoice.minimum_order_value:e.target.value})} placeholder="Nhập vào" resize="vertical" rows="2" minrows="2" maxlength="13" restrictiontype="value" max="Infinity" min="-Infinity" className="input__input"/> 
                                                            </div>
                                                        </div>
                                                    </div>  
                                                </div>
                                            </div>
                                            
                                            <div className="form-item prize-quantity">
                                                <label for="usageLimitQuantity" className="form-item__label"> Lượt sử dụng tối đa</label> 
                                                
                                                <div className="form-item__control">
                                                    
                                                    <div className="form-item__content">
                                                        
                                                        <div className="input">
                                                            
                                                            <div className="input__inner input__inner--normal    item-center"> 
                                                                <input onChange={(e)=>setAwardchoice({...awardchoice,quantity:isNaN(e.target.value)?awardchoice.quantity:e.target.value})} type="text" placeholder="Nhập vào" resize="vertical" rows="2" minrows="2" restrictiontype="input" max="Infinity" min="-Infinity" className="input__input"/> 
                                                            </div>
                                                        </div>
                                                    </div>  
                                                </div>
                                            </div>
                                            
                                            <div data-v-48e5cded="">
                                                
                                                <div data-v-48e5cded="" className="vertical-item form-item">
                                                    <label className="form-item__label"> Ngày hết hạn</label> 
                                                    
                                                    <div className="form-item__control">
                                                        
                                                        <div className="form-item__content">
                                                            
                                                            <div data-v-48e5cded="" className="bold-content">
                                                                Mã giảm giá sẽ có giá trị trong vòng 7 ngày kể từ khi người mua nhận được.
                                                            </div>
                                                        </div>  
                                                    </div>
                                                </div> 
                                                
                                                <div data-v-48e5cded="" className="vertical-item no-margin-item form-item">
                                                    <label className="form-item__label"> Sản phẩm áp dụng</label> 
                                                    
                                                    <div className="form-item__control">
                                                        
                                                        <div className="form-item__content">
                                                            Tất cả sản phẩm
                                                            
                                                            <div data-v-48e5cded="" className="popover popover--light">
                                                                
                                                                <div className="popover__ref"> 
                                                                    <i data-v-48e5cded="" className="all-products-question-icon icon">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8,1 C11.8659932,1 15,4.13400675 15,8 C15,11.8659932 11.8659932,15 8,15 C4.13400675,15 1,11.8659932 1,8 C1,4.13400675 4.13400675,1 8,1 Z M8,2 C4.6862915,2 2,4.6862915 2,8 C2,11.3137085 4.6862915,14 8,14 C11.3137085,14 14,11.3137085 14,8 C14,4.6862915 11.3137085,2 8,2 Z M7.98750749,10.2375075 C8.40172105,10.2375075 8.73750749,10.5732939 8.73750749,10.9875075 C8.73750749,11.401721 8.40172105,11.7375075 7.98750749,11.7375075 C7.57329392,11.7375075 7.23750749,11.401721 7.23750749,10.9875075 C7.23750749,10.5732939 7.57329392,10.2375075 7.98750749,10.2375075 Z M8.11700238,4.60513307 C9.97011776,4.60513307 10.7745841,6.50497267 9.94298079,7.72186504 C9.76926425,7.97606597 9.56587088,8.14546785 9.27050506,8.31454843 L9.11486938,8.39945305 L8.95824852,8.47993747 C8.56296349,8.68261431 8.49390831,8.75808648 8.49390831,9.0209925 C8.49390831,9.29713488 8.27005069,9.5209925 7.99390831,9.5209925 C7.71776594,9.5209925 7.49390831,9.29713488 7.49390831,9.0209925 C7.49390831,8.34166619 7.7650409,7.99681515 8.35913594,7.6662627 L8.76655168,7.45066498 C8.9424056,7.3502536 9.04307851,7.26633638 9.11735517,7.1576467 C9.52116165,6.56675314 9.11397414,5.60513307 8.11700238,5.60513307 C7.41791504,5.60513307 6.82814953,6.01272878 6.75715965,6.55275918 L6.75,6.66244953 L6.74194433,6.75232516 C6.69960837,6.98557437 6.49545989,7.16244953 6.25,7.16244953 C5.97385763,7.16244953 5.75,6.9385919 5.75,6.66244953 C5.75,5.44256682 6.87194406,4.60513307 8.11700238,4.60513307 Z"></path></svg>
                                                                    </i>
                                                                </div> 
                                                                
                                                                <div className="popper popover__popper popover__popper--light with-arrow" style={{display: `none`, maxWidth: `320px`}}>
                                                                    
                                                                    <div className="popover__content">
                                                                        
                                                                        <div data-v-48e5cded="">
                                                                            Một số sản phẩm sẽ không được tham gia khuyến mãi theo quy định của pháp luật.
                                                                            <a data-v-48e5cded="" href="https://banhang.shopee.vn/edu/article/12073" target="_blank" className="promotion-product-error-blocked-link button button--link button--normal underline">
                                                                                <span>Tìm hiểu thêm.</span>
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>  
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div> 
                                
                                <div className="modal__footer"> 
                                    
                                    <div className="modal__footer-buttons">
                                        <button onClick={e=>{setShow(false)
                                        setAwardchoice()}} type="button" className="button button--normal">
                                            <span>Hủy</span>
                                        </button> 
                                        <button onClick={(e)=>{ 
                                            requestedit?setaward():setListaward([...listaward,awardchoice])
                                            setShow(false)
                                        }} type="button" className="button button--primary button--normal" >
                                            <span>Xác nhận</span>
                                        </button>
                                    </div>
                                </div>
                            </div> 
                            <i onClick={()=>setShow(false)} className="icon modal__close">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M2.85355339,1.98959236 L8.157,7.29314575 L13.4601551,1.98959236 C13.6337215,1.81602601 13.9031459,1.79674086 14.098014,1.93173691 L14.1672619,1.98959236 C14.362524,2.18485451 14.362524,2.501437 14.1672619,2.69669914 L14.1672619,2.69669914 L8.864,8.00014575 L14.1672619,13.3033009 C14.362524,13.498563 14.362524,13.8151455 14.1672619,14.0104076 C13.9719997,14.2056698 13.6554173,14.2056698 13.4601551,14.0104076 L8.157,8.70714575 L2.85355339,14.0104076 C2.67998704,14.183974 2.41056264,14.2032591 2.2156945,14.0682631 L2.14644661,14.0104076 C1.95118446,13.8151455 1.95118446,13.498563 2.14644661,13.3033009 L2.14644661,13.3033009 L7.45,8.00014575 L2.14644661,2.69669914 C1.95118446,2.501437 1.95118446,2.18485451 2.14644661,1.98959236 C2.34170876,1.79433021 2.65829124,1.79433021 2.85355339,1.98959236 Z"></path></svg>
                            </i>
                        </div>
                    </div>
                </div> :''}
            </div>
            <div id="modal">
                {state.complete?
                <div className="sucess-box">
                    <div className="create-sucess" style={{width: '360px'}}>
                        <div className="item-centers">
                            <span className="item-centers item-check-sucess">
                                <i className="icon check-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M4.03 7.47a.75.75 0 00-1.06 1.06l3.358 3.359a.75.75 0 001.06 0l5.863-5.862a.75.75 0 00-1.061-1.06l-5.332 5.33L4.03 7.47z"></path></svg>
                                </i>
                            </span>
                        </div>
                        <div className="item-centers title-sucess">Created a new discount code</div>
                        <div className="item-centers content-sucess">Your discount code is valid from date {new Date(shop_award.valid_from).toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).substr(0,16)} - {new Date(shop_award.valid_to).toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).substr(0,16)}</div>
                        <div className="item-centers">
                            <button className="btn-m btn-light">View detail</button>
                            <button className="btn-m btn-orange">
                                <span className="time-down">Back to product page after ({state.timeSecond}s)</span>
                            </button>
                        </div>
                    </div>
                </div>:""}
            </div>
        </>
    )
}
export default ShopAwardInfo