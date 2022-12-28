import axios from 'axios';
import Navbar from "./Navbar"
import {Link,Navigate,useNavigate,useSearchParams} from 'react-router-dom'
import React, {useState, useEffect,useRef} from 'react'
import Sidebamenu from "./Sidebar-menu"
import {formatter, itemvariation} from "../constants"
import { headers,showchat,showthreads } from '../actions/auth';
import {listordersellerURL,} from "../urls"
import Daterange from '../hocs/Daterange';
import Options from './Options';
import Tabs from './Tabs';
import {connect} from "react-redux"
const choice_option=[
    {name:"Mã đơn hàng",value:"1"},
    {name:"Tên người mua",value:"2"},
    {name:"Sản phẩm",value:"3"},
    {name:"Mã vận đơn",value:"4"},
]
const listchoice=[
    {name:'Tất cả',value:undefined},{name:'Chờ xác nhận',value:'unpaid'},
    {name:'Chờ lấy hàng',value:'toship'},{name:'Đang giao',value:'shipping'},{name:'Đã giao',value:'completed'}
    ,{name:'Đơn huỷ',value:'canceled'},{name:'Trả hàng/Hoàn tiền',value:'refund'}
]
const Shippingmanagement=(props)=>{
    const {showchat,showthreads,user}=props
    const [state,setState]=useState({list_order_type:[{name:'Tất cả',type:undefined},{name:'Chờ xác nhận',type:'unpaid'},
    {name:'Chờ lấy hàng',type:'toship'},{name:'Đang giao',type:'shipping'},{name:'Đã giao',type:'completed'}
    ,{name:'Đơn huỷ',type:'canceled'}],show_select:false,listoptionsearch:[{name:'Mã đơn hàng',type:'refcode'},{name:'Tên người mua',type:'username'},{name:'Sản phẩm',type:'product'},{name:'Mã vận đơn',type:'shipping'}]})
    const [params, setSearchParams] = useSearchParams();
    const [loading,setLoading]=useState(false)
    const [daychoice,setDaychoice]=useState({start:null,end:null})
    const [choice,setChoice]=useState()
    const [option,setOption]=useState('1')
    const [keyword,setKeyword]=useState('')
    const inputRef=useRef()
    const [data,setData]=useState([])
    const navigate=useNavigate()
    const {start,end}=daychoice
    useEffect(() => {
        (async () => {
        try {
            const res = await axios.get(listordersellerURL+'?'+params,headers())
            setData(res.data)
            setLoading(true)
            } catch (error) {
              console.log(error);
            }
        })();
      },[params,end,start,option,keyword,choice])

    
    const setshowthread=(e,order)=>{
        let data={member:[user.id,order.user.id],thread:null,send_to:order.user.id}
        showchat(data)
        showthreads()
    } 
    
    const setordertype=(item)=>{
        if(item=='refund'){
            navigate('/sale/returnlist')
        }
        else{
            setChoice(item)
            const type_order=item!=undefined?{type:item}:undefined
            setSearchParams({...params,...type_order})
        }
    }
    const setstatus=  async (order)=>{
        if(!order.accepted){
            const form={status:'1',id:order.id}
            const res= await axios.post(listordersellerURL,JSON.stringify(form),headers())
            setData(current=>current.map(item=>{
                if(item.id===order.id){
                    return ({...item,accepted:true})
                }
                return ({...item,})
            }))
        }
    }
    return(
        <>
        <div id="app">
            <Navbar/>
            <div className="app-content">
                <Sidebamenu/>
                <div className="page-container"> 
                    <div className="page-content-wrapper">
                    {loading?
                        <div className="portal-sale-container">
                            <div className="portal-panel">
                                <div className="tabs tabs-line tabs-normal tabs-top">
                                    <Tabs
                                        listchoice={listchoice}
                                        choice={choice}
                                        loading={loading}
                                        setchoice={data=>setordertype(data)}
                                    />
                                </div> 
                            </div> 
                            <div className="order-list">
                                <div className="padding-wrap">
                                    <div className="order-search-pannel  order-search-pannel-inline order-search-improve">
                                        <div className="order-export">
                                            <span>Ngày đặt hàng</span>
                                            <div className="date-picker">
                                                <div className="date-picker__input">
                                                    <Daterange
                                                    setDaychoice={data=>setDaychoice(data)} 
                                                    daychoice={daychoice}
                                                    title="Chọn thời gian"
                                                    />
                                                </div>
                                                <div className="daterange-picker-panel">
                                                    <div className="daterange-picker-panel__body">
                                                        <div className="daterange-picker-panel__body-left">
                                                            
                                                        </div>
                                                        <div className="daterange-picker-panel__body-right">
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div data-v-55adcd69="" data-v-1cf2a11c="" className="export-button report-export">
                                                <div data-v-55adcd69="" className="latest">
                                                    <button data-v-55adcd69="" type="button" className="export button button--normal">
                                                        <span>Xuất</span>
                                                    </button> 
                                                    <div data-v-55adcd69="" className="popover popover--light">
                                                        <div className="popover__ref">
                                                            <div data-v-55adcd69="" className="badge-x">
                                                                <button data-v-55adcd69="" type="button" className="btn button button--normal">
                                                                    <i className="icon">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12"><path d="M.5.5h11a.5.5 0 1 1 0 1H.5a.5.5 0 0 1 0-1zm0 5h11a.5.5 0 1 1 0 1H.5a.5.5 0 0 1 0-1zm0 5h11a.5.5 0 1 1 0 1H.5a.5.5 0 1 1 0-1z" fillRule="evenodd"></path></svg>
                                                                    </i>
                                                                </button> 
                                                                <sup className="badge-x__sup badge-x__sup--num badge-x__sup--fixed" style={{width: '20px', display: 'none'}}>
                                                                    <span>0</span>
                                                                </sup>
                                                            </div> 
                                                        </div> 
                                                        <div className="popper popover__popper popover__popper--light with-arrow export-button-popover" style={{display: 'none', maxWidth: '400px'}}>
                                                            <div className="popover__content">
                                                                <div data-v-55adcd69="" className="export-container" style={{width: '400px'}}>
                                                                    <div data-v-55adcd69="" className="title">Báo cáo gần nhất</div> 
                                                                    <div data-v-55adcd69="" className="tip">Đây là những báo cáo mà bạn chưa tải về</div> 
                                                                    <div data-v-55adcd69="" className="table list table--empty-data" style={{maxHeight: '250px', position: 'relative'}}>
                                                                        <div className="hidden-columns">
                                                                            <div data-v-55adcd69=""></div> 
                                                                            <div data-v-55adcd69="" className="operation"></div> 
                                                                        </div> 
                                                                        <div className="table__header-container"> 
                                                                            <div className="table__main-header">
                                                                                <table data-v-1aa65c24="" cellSpacing="0" cellPadding="0" border="0" className="table__header" style={{width: '398px'}}>
                                                                                    <colgroup data-v-1aa65c24="">
                                                                                        <col data-v-1aa65c24="" width="250"/><col data-v-1aa65c24="" width="148"/>
                                                                                    </colgroup>
                                                                                    <thead data-v-1aa65c24="">
                                                                                        <tr data-v-1aa65c24="">
                                                                                            <th data-v-1aa65c24="" colSpan="1" rowSpan="1" className="">
                                                                                                <div data-v-1aa65c24="" className="table__cell first-cell">
                                                                                                    <span data-v-1aa65c24="" className="table__cell-label">Tên báo cáo</span>
                                                                                                </div>
                                                                                            </th>
                                                                                            <th data-v-1aa65c24="" colSpan="1" rowSpan="1" className="">
                                                                                                <div data-v-1aa65c24="" className="table__cell align-center last-cell">
                                                                                                    <span data-v-1aa65c24="" className="table__cell-label">Sửa thông tin</span>
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
                                                                                    <div className="scrollbar__wrapper" style={{overflow: 'hidden'}}> 
                                                                                        <div data-v-1aa65c24="" className="scrollbar__bar horizontal">
                                                                                            <div data-v-1aa65c24="" className="scrollbar__thumb" style={{left: '0px', width: '0px'}}></div>
                                                                                        </div> 
                                                                                        <div className="scrollbar__content" style={{position: 'relative'}}>
                                                                                            <table data-v-1aa65c24="" cellSpacing="0" cellPadding="0" border="0" className="table__body" style={{width: '398px'}}>
                                                                                                <colgroup data-v-1aa65c24="">
                                                                                                    <col data-v-1aa65c24="" width="250"/>
                                                                                                    <col data-v-1aa65c24="" width="148"/>
                                                                                                </colgroup>
                                                                                                <tbody data-v-1aa65c24=""></tbody>
                                                                                            </table> 
                                                                                            <div className="table__empty">
                                                                                                <div data-v-55adcd69="" className="result no-result">
                                                                                                    <div data-v-55adcd69="" className="empty-image">
                                                                                                        <img data-v-55adcd69="" src="" alt=""/>
                                                                                                    </div> 
                                                                                                    <div data-v-55adcd69="" className="empty">Bạn đã tải hết tất cả báo cáo hiện có. <br/> Xem báo cáo</div> 
                                                                                                    <div data-v-55adcd69="">
                                                                                                        <a data-v-55adcd69="" href="/portal/settings/shop/reports?type=ps_reports_order" className="" target="_blank">
                                                                                                            <button data-v-55adcd69="" type="button" className="button button--normal">
                                                                                                                <i className="icon">
                                                                                                                    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><g fillRule="evenodd"><path d="M14.938 1.627a.998.998 0 0 0-.626-.566.99.99 0 0 0-.296-.045h-11a.998.998 0 0 0-.955.703.99.99 0 0 0-.045.297v12a.998.998 0 0 0 .703.955.99.99 0 0 0 .297.045h11a.998.998 0 0 0 .955-.703.99.99 0 0 0 .045-.297v-12c0-.136-.028-.27-.079-.39zm-8.922.389v-1h5v1h3v12h-11v-12h3z" fillRule="nonzero"></path><path d="M6.742 0h3.516a1.742 1.742 0 1 1 0 3.484H6.742a1.742 1.742 0 1 1 0-3.484zm0 1a.742.742 0 1 0 0 1.484h3.516a.742.742 0 1 0 0-1.484H6.742z"></path><path d="M5.516 6.016a.5.5 0 1 1 0-1h6a.5.5 0 1 1 0 1h-6zm0 3a.5.5 0 1 1 0-1h6a.5.5 0 1 1 0 1h-6zm0 3a.5.5 0 1 1 0-1h4.734a.5.5 0 1 1 0 1H5.516z" fillRule="nonzero"></path></g></svg>
                                                                                                                </i>
                                                                                                                <span>Báo Cáo Của Tôi</span>
                                                                                                            </button>
                                                                                                        </a>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div> 
                                                                                            <div className="table__loading" style={{display: 'none'}}></div>
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
                                                </div>
                                            </div>
                                        </div>
                                        <div className='order-search-container'>
                                            <Options
                                                    option={option}
                                                    inputRef={inputRef}
                                                    setOption={(data)=>setOption(data)}
                                                    items={choice_option}
                                            />
                                            <div data-v-4325ccd1="" className="order-search-buttons">
                                                <button data-v-4325ccd1="" type="button" className="search-btn button button--primary button--normal">
                                                    <span>Tìm kiếm</span>
                                                </button> 
                                                <button data-v-4325ccd1="" type="button" className="button button--normal">
                                                    <span>Đặt lại</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div data-v-4a7bd8a8="" className="order-panel-header">
                                        <div data-v-4a7bd8a8="" className="title">{data.length} Đơn hàng</div> 
                                        <div data-v-4a7bd8a8="" className="more-action"> 
                                            <div data-v-4a7bd8a8="" className="tab-buttons">
                                                <button data-v-4a7bd8a8="" type="button" className="ship-btn button button--primary button--large">
                                                    <i className="icon">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M4.035 4h7.923l-.238-1.105a.5.5 0 0 0-.49-.395H4.763a.5.5 0 0 0-.489.395L4.035 4zm9.471.065A2 2 0 0 1 15 6v7a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V6a2 2 0 0 1 1.486-1.933l.32-1.488A2 2 0 0 1 4.763 1h6.469a2 2 0 0 1 1.955 1.579l.32 1.486zM13.5 6h-11v7a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V6zM4.75 8h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1 0-1.5zm0 3h2.5a.75.75 0 1 1 0 1.5h-2.5a.75.75 0 1 1 0-1.5z"></path></svg>
                                                    </i>
                                                    <span>Giao Hàng Loạt</span>
                                                </button> 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className='order-list-section'>
                                    <div className="fixed-container">
                                        <div data-v-a414b804="" data-v-dff31658="" className="order-list-header">
                                            <span data-v-a414b804="" data-v-dff31658="" className="item-product">Sản phẩm</span> 
                                            <span data-v-a414b804="" data-v-dff31658="" className="item-total">Tổng Đơn hàng</span> 
                                            <span data-v-a414b804="" data-v-dff31658="" className="item-status">Trạng thái
                                                <span data-v-a414b804="" data-v-dff31658="" className="item-countdown">Đếm ngược</span>
                                            </span> 
                                            <span data-v-a414b804="" data-v-dff31658="" className="item-channel">
                                                <div data-v-a414b804="" className="dropdown" data-v-dff31658="">
                                                    <button data-v-a414b804="" type="button" className="channel-selector button button--normal button--frameless"><span>Vận Chuyển</span>
                                                        <i className="icon">
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M28.2 11.1l-10.9 12s0 .1-.1.2c-.2.2-.5.3-.7.3-.3 0-.5-.1-.7-.3 0 0 0-.1-.1-.2l-10.9-12c-.4-.4-.4-1 0-1.3.4-.4 1-.4 1.3 0l10.4 11.3L26.9 9.8c.4-.4 1-.4 1.3 0 .4.4.4 1 0 1.3z"></path></svg>
                                                        </i>
                                                    </button>  
                                                    <div data-v-a414b804="" className="popper shipping-dropdown" style={{display: 'none',position: 'absolute',zIndex: 1,willChange: 'top, left',transformOrigin: 'left top',top: '18px',left: '0px'}}>
                                                        <ul className="dropdown-menu" style={{maxWidth: '440px'}}>
                                                            <li data-v-a414b804="" className="dropdown-item selected-category"> Vận Chuyển</li>
                                                            <li data-v-a414b804="" className="dropdown-item"> Tiết kiệm</li>
                                                            <li data-v-a414b804="" className="dropdown-item"> Nhanh</li>
                                                            <li data-v-a414b804="" className="dropdown-item"> Hỏa Tốc</li>
                                                            <li data-v-a414b804="" className="dropdown-item"> Khác</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </span> 
                                            <span data-v-a414b804="" data-v-dff31658="" className="item-action">Thao tác</span>
                                        </div>
                                    </div>
                                    <div data-v-a414b804="" className={data.length==0?'no-data':'order-list_body'}>
                                        {data.length==0?
                                        <div data-v-a414b804="" className="default-page">
                                            <i className="default-page__icon icon normal">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 94 93"><g fill="none" fillRule="evenodd" transform="translate(-2)"><rect width="96" height="96"></rect><ellipse cx="47" cy="87" fill="#F2F2F2" rx="45" ry="6"></ellipse><path fill="#FFF" stroke="#D8D8D8" d="M79,55.5384191 L79,84.1647059 C79,85.1783108 78.1452709,86 77.0909091,86 L17.9090909,86 C16.8547291,86 16,85.1783108 16,84.1647059 L16,9.83529412 C16,8.82168917 16.8547291,8 17.9090909,8 L77.0909091,8 C78.1452709,8 79,8.82168917 79,9.83529412 L79,43.6504538 L79,55.5384191 Z"></path><path fill="#FAFAFA" stroke="#D8D8D8" d="M64.32,4.0026087 L56.62,4.0026087 L56.62,3.5026087 C56.62,2.92262436 56.214985,2.5 55.68,2.5 L40.32,2.5 C39.785015,2.5 39.38,2.92262436 39.38,3.5026087 L39.38,4.0026087 L31.68,4.0026087 C31.433015,4.0026087 31.22,4.22488523 31.22,4.50434783 L31.22,12.5182609 C31.22,12.7977235 31.433015,13.02 31.68,13.02 L64.32,13.02 C64.566985,13.02 64.78,12.7977235 64.78,12.5182609 L64.78,4.50434783 C64.78,4.22488523 64.566985,4.0026087 64.32,4.0026087 Z"></path><g fill="#D8D8D8" transform="translate(83)"><circle cx="10" cy="13" r="3" opacity=".5"></circle><circle cx="2" cy="9" r="2" opacity=".3"></circle><path d="M8.5,1 C7.67157288,1 7,1.67157288 7,2.5 C7,3.32842712 7.67157288,4 8.5,4 C9.32842712,4 10,3.32842712 10,2.5 C10,1.67157288 9.32842712,1 8.5,1 Z M8.5,7.10542736e-15 C9.88071187,7.10542736e-15 11,1.11928813 11,2.5 C11,3.88071187 9.88071187,5 8.5,5 C7.11928813,5 6,3.88071187 6,2.5 C6,1.11928813 7.11928813,7.10542736e-15 8.5,7.10542736e-15 Z" opacity=".3"></path></g><path fill="#D8D8D8" d="M48.5,43 C48.7761424,43 49,43.2238576 49,43.5 C49,43.7761424 48.7761424,44 48.5,44 L26.5,44 C26.2238576,44 26,43.7761424 26,43.5 C26,43.2238576 26.2238576,43 26.5,43 L48.5,43 Z M68.5,34 C68.7761424,34 69,34.2238576 69,34.5 C69,34.7761424 68.7761424,35 68.5,35 L26.5,35 C26.2238576,35 26,34.7761424 26,34.5 C26,34.2238576 26.2238576,34 26.5,34 L68.5,34 Z M68.5,25 C68.7761424,25 69,25.2238576 69,25.5 C69,25.7761424 68.7761424,26 68.5,26 L26.5,26 C26.2238576,26 26,25.7761424 26,25.5 C26,25.2238576 26.2238576,25 26.5,25 L68.5,25 Z"></path></g></svg>
                                            </i> 
                                            <div className="default-page__content">Không tìm thấy đơn hàng</div>
                                        </div>:<>
                                        {data.map(order=>
                                        <div className="order-wrap" key={order.id}>
                                            <div className="order-user-id">
                                                <div className="order-user item-center">
                                                    <div className="avatar">
                                                        <div className="avatar__placeholder">
                                                            <svg enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className="svg-icon icon-headshot"><g><circle cx="7.5" cy="4.5" fill="none" r="3.8" stroke-miterlimit="10"></circle><path d="m1.5 14.2c0-3.3 2.7-6 6-6s6 2.7 6 6" fill="none" strokeLinecap="round" stroke-miterlimit="10"></path></g></svg>
                                                        </div>
                                                        <img className="avatar__img" src={order.user.avatar}/>
                                                    </div>
                                                    <span>{order.user.username}</span>
                                                    <button onClick={(e)=>setshowthread(e,order)} className="_13iGI_"><svg viewBox="0 0 16 16" className="svg-icon _2KYoW7 "><g fillRule="evenodd"><path d="M15 4a1 1 0 01.993.883L16 5v9.932a.5.5 0 01-.82.385l-2.061-1.718-8.199.001a1 1 0 01-.98-.8l-.016-.117-.108-1.284 8.058.001a2 2 0 001.976-1.692l.018-.155L14.293 4H15zm-2.48-4a1 1 0 011 1l-.003.077-.646 8.4a1 1 0 01-.997.923l-8.994-.001-2.06 1.718a.5.5 0 01-.233.108l-.087.007a.5.5 0 01-.492-.41L0 11.732V1a1 1 0 011-1h11.52zM3.646 4.246a.5.5 0 000 .708c.305.304.694.526 1.146.682A4.936 4.936 0 006.4 5.9c.464 0 1.02-.062 1.608-.264.452-.156.841-.378 1.146-.682a.5.5 0 10-.708-.708c-.185.186-.445.335-.764.444a4.004 4.004 0 01-2.564 0c-.319-.11-.579-.258-.764-.444a.5.5 0 00-.708 0z"></path></g></svg></button>
                                                </div>
                                                <div className="order-ref-code">ID đơn hàng: {order.ref_code}</div>
                                            </div>
                                            <div className="order-detail">
                                                {order.cart_item.map(cartitem=>
                                                <div key={cartitem.id} className="order-cartitem d-flex">
                                                    <div className="item-product d-flex">
                                                        <div className="item-product-image">
                                                            <div className="image__content" style={{backgroundImage: `url(${cartitem.image})`}}></div>
                                                        </div>
                                                        <div className="order-item-info">
                                                            <div className="order-item-name">{cartitem.name}</div>
                                                            <div>{itemvariation(cartitem)}</div>
                                                        </div>
                                                        <div>{cartitem.quantity}</div>
                                                    </div>
                                                    <div className="item-total">
                                                        <div>₫{formatter.format(cartitem.total_price)}</div>
                                                        <div>{cartitem.canceled}</div>
                                                    </div>
                                                    <div className="item-status">
                                                        <div>{order.received?'Đã giao':order.being_delivered?'Đang vận chuyển':order.canceled?'Đã hủy':order.accepted?'Đã xử lý':!order.canceled && new Date().getTime()>new Date(order.ordered_date).getTime()+30*1000*1800?'Chờ lấy hàng':'Chờ xác nhận'}</div>
                                                        <div></div>
                                                    </div>
                                                    <div className="item-channel">
                                                        <div></div>
                                                    </div>
                                                    <div className="item-action">
                                                        {!order.being_delivered && !order.canceled &&(<button onClick={()=>setstatus(order)} className="btn-m btn-orange">{!order.accepted?"Xác nhận":"Chuẩn bị hàng"}</button>)}
                                                    </div>
                                                </div>)}
                                            </div>
                                        </div>)}</>}
                                    </div>
                                </div>
                            </div>
                        </div> :''}
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}
const mapStateToProps = state => ({
    user:state.user
});

export default connect(mapStateToProps,{showchat,showthreads})(Shippingmanagement);
