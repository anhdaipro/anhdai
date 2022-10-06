import React, {useState,useCallback,useEffect, useRef} from 'react'
import {formatter,timepromotion,percent,timeformat,listchoice,timevalue, choice_option} from "../../constants"
import {useNavigate,useSearchParams} from 'react-router-dom'
import {dataAddonURL, listAddonshopURL,} from "../../urls"
import axios from 'axios'
import { headers } from '../../actions/auth'
import Daterange from '../../hocs/Daterange'
import Navbar from '../Navbar'
import Tabs from '../Tabs'
const now=new Date()
now.setDate(new Date().getDate()-7)
const Listdealshop=()=>{
    const [listdeal,setDeal]=useState([])
    const [loading,setLoading]=useState(true)
    const [count,setCount]=useState(0)
    const [choice,setChoice]=useState('all')
    const [option,setOption]=useState(1)
    const [showoption,setShowoption]=useState(false)
    const optionref=useRef()
    const [keyword,setKeyword]=useState('')
    const [daychoice,setDaychoice]=useState()
    const [params, setSearchParams] = useSearchParams();
    const [stats,setStats]=useState([{name:'Doanh số sản phẩm chính',id:1,info:'Tổng giá trị của các đơn hàng có áp dụng discount Của Shop đã được xác nhận, bao gồm phí vận chuyển và không bao gồm các khuyến mãi khác, tính trong khoảng thời gian đã chọn.',result:0,result_last:0,symbol:true},
    {name:'Doanh số sản phẩm mua kèm',id:2,info:'Tổng số lượng các đơn hàng bao gồm sản phẩm có áp dụng khuyến mãi được xác nhận, tính trong khoảng thời gian đã chọn.',result:0,result_last:0},
    {name:'Đơn hàng',id:3,info:'Tổng số lượng sản phẩm có áp dụng khuyến mãi đã bán, tính trên toàn bộ các đơn hàng được xác nhận trong khoảng thời gian đã chọn.',result:0,result_last:0},
    {name:'Người mua',id:4,info:'Tổng số lượng người mua duy nhất đã mua sản phẩm có áp dụng khuyến mãi, tính trên toàn bộ các đơn hàng được xác nhận trong khoảng thời gian đã chọn.',result:0,result_last:0}])
    const navite=useNavigate()
    useEffect(()=>{
        (async()=>{
            try{
            const obj1=await axios.get(dataAddonURL,headers)
            const datapromotion=stats.map(item=>{
                if(item.id==1){
                    return ({...item,result:obj1.data.amount_main
                        ,result_last:obj1.data.amount_main_last})
                }
                else if(item.id==2){
                    return ({...item,result:obj1.data.amount_byproducts,result_last:obj1.data.amount_byproducts_last})
                    
                }
                else if(item.id==3){
                    return ({...item,result:obj1.data.total_order,result_last:obj1.data.total_order_last})
                }
                else{
                    return ({...item,result:obj1.data.number_buyer,result_last:obj1.data.number_buyer_last})
                }
            })
            setStats(datapromotion)
            }
            catch(err){
                console.log(err)
            }
        })()
    },[])
    
    useEffect(() => {
        document.addEventListener('click', handleClick)
        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [])


    const handleClick = (event) => {
        const { target } = event
        if(optionref.current!=null){
            if (!optionref.current.contains(target)) {
                setShowoption(false)
            }
        }
    }
    useEffect(()=>{
        document.addEventListener('scroll',addItem)
        return () => {
            document.removeEventListener('scroll', addItem)
        }
    },[count,loading,listdeal.length])

    const addItem=()=>{
        (async()=>{
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
            if(count && clientHeight + scrollTop >= scrollHeight-300 && loading && listdeal.length< count){
                setLoading(false)
                const res =await axios.get(`${listAddonshopURL}?&offset=${listdeal.length}`,headers)
                setDeal(current=>[...current,...res.data.data])
                setLoading(true)
            }
        })()
    }

    const setdetail=(item)=>{
        navite(`/marketing/add-on-deal/${item.id}`)
    }
    const searchitem=(e)=>{
      (async()=>{
        if(daychoice){
          params.set('start_day',timevalue(daychoice.start))
          params.set('end_day',timevalue(daychoice.end))
        }
        params.set('option',option)
        params.set('keyword',keyword)
       
        params.set('choice',choice)
        const res =await axios.get(`${listAddonshopURL}?${params}`,headers)
        setDeal([...res.data.data])
        setCount(res.data.count)
        setLoading(true)
    })()
    }
    return(
        <>
            <Navbar/>
            <div data-v-a555442e className="wrapper">
                <div data-v-6b00c90e="" data-v-4d2c3cc3="" className="bundle-list-page"> 
                    
                        <p data-v-771d39f6="" className="list-title">Deal Khuyến Mãi</p>
                        <div data-v-439649ed="" data-v-b811fefc="" data-v-6b00c90e="" className="metrics-dashboard deal-metrics-dashboard card"> 
                            <div className="card__content">
                                <div data-v-439649ed="" className="header">
                                    <div data-v-439649ed="" className="title">
                                        <div data-v-439649ed="" style={{lineHeight: '20px'}}>Chỉ số quan trọng</div> 
                                        <div data-v-439649ed="" className="time">(Từ {timeformat(now)} đến {timeformat(new Date().toDateString())}GMT+7)</div>
                                    </div> 
                                    <div data-v-439649ed="" className="header-action"> 
                                        <button onClick={()=>navite('/datacenter/marketing/tools/addon')} data-v-439649ed="" type="button" className="button button--link button--normal">
                                            <i className="icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M2.5 2a.5.5 0 01.5.5V14h11.5a.5.5 0 110 1h-12a.5.5 0 01-.5-.5v-12a.5.5 0 01.5-.5zm11.818 2.614a.5.5 0 01.119.63l-.05.074-3.6 4.375a.5.5 0 01-.661.1l-.075-.06-1.41-1.37-3.255 3.955a.5.5 0 01-.823-.561l.05-.075 3.6-4.375a.5.5 0 01.661-.1l.075.06 1.41 1.37 3.255-3.955a.5.5 0 01.704-.068z"></path></svg>
                                            </i>
                                            <span>Phân Tích Bán Hàng</span>
                                        </button>
                                    </div>
                                </div> 
                                <div data-v-439649ed="" className="metrics-container">
                                {stats.map((item,i)=>
                                    <div key={i} data-v-439649ed="" className="metrics" style={{flex: '1 1 0%'}}>
                                        <div data-v-439649ed="" className="metrics-title">
                                            <span data-v-439649ed="" className="metrics-name">{item.name}</span> 
                                            <div data-v-439649ed="" className="popover popover--light">
                                                <div className="popover__ref">
                                                    <i data-v-439649ed="" className="icon">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8 1a7 7 0 110 14A7 7 0 018 1zm0 1a6 6 0 100 12A6 6 0 008 2zm-.012 8.238a.75.75 0 110 1.5.75.75 0 010-1.5zm.129-5.633c1.853 0 2.658 1.9 1.826 3.117-.174.254-.377.423-.672.593l-.156.084-.157.08c-.395.204-.464.28-.464.542a.5.5 0 11-1 0c0-.68.271-1.024.865-1.355l.408-.215c.175-.1.276-.185.35-.293.404-.591-.003-1.553-1-1.553-.7 0-1.289.408-1.36.948l-.007.11-.008.09a.5.5 0 01-.992-.09c0-1.22 1.122-2.058 2.367-2.058z"></path></svg>
                                                    </i> 
                                                </div> 
                                                <div className="popper popover__popper popover__popper--light with-arrow" style={{display: 'none', maxWidth: '320px'}}>
                                                    <div className="popover__content">
                                                        <div data-v-439649ed="">{item.info}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> 
                                        <p data-v-439649ed="" className="metrics-data">
                                            {item.symbol?<span className="metrics-symbol">₫</span>:''}
                                            <span className="metrics-number">{formatter.format(item.result)}</span>
                                        </p> 
                                        <p data-v-439649ed="" className="metrics-ratio">so với 7 ngày trước
                                            <span data-v-439649ed="" className="metrics-percent">
                                                <span className="metrics-number">{percent(item.result,item.result_last)}</span>
                                                <span className="metrics-symbol">%</span>
                                            </span>  
                                        </p>
                                    </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div data-v-439649ed="" data-v-b811fefc="" data-v-6b00c90e="" className="bundle-list card landing-page-comp _2zaOUn3Zyivml8-HXb4J7v"> 
                            <div className="card__content">
                                <div className="landing-page-header _2mW7Gn-8Q-tvhNnv_9U9mU">
                                    <div className="landing-page-info">
                                        <div className="landing-page-title">Danh sách mã giảm giá</div>
                                        <div className="landing-page-desc">
                                            <div className="desc-content">Tạo Mã giảm giá toàn shop hoặc Mã giảm giá sản phẩm ngay bây giờ để thu hút người mua.
                                                <a href="//banhang.shopee.vn/edu/courseDetail/93?lessonId=301" target="_blank" rel="noopener noreferrer" className="desc-link">Tìm hiểu thêm</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div data-v-6b00c90e=""> 
                                        <button onClick={()=>navite('/marketing/add-on-deal/new')} data-v-6b00c90e="" type="button" className="btn-new button button--primary button--large">
                                            <i className="icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8.48176704,1.5 C8.75790942,1.5 8.98176704,1.72385763 8.98176704,2 L8.981,7.997 L15,7.99797574 C15.2761424,7.99797574 15.5,8.22183336 15.5,8.49797574 C15.5,8.77411811 15.2761424,8.99797574 15,8.99797574 L8.981,8.997 L8.98176704,15 C8.98176704,15.2761424 8.75790942,15.5 8.48176704,15.5 C8.20562467,15.5 7.98176704,15.2761424 7.98176704,15 L7.981,8.997 L2,8.99797574 C1.72385763,8.99797574 1.5,8.77411811 1.5,8.49797574 C1.5,8.22183336 1.72385763,7.99797574 2,7.99797574 L7.981,7.997 L7.98176704,2 C7.98176704,1.72385763 8.20562467,1.5 8.48176704,1.5 Z"></path></svg>
                                            </i>
                                            <span>Tạo</span>
                                        </button>
                                    </div>
                                </div>
                                <div data-v-439649ed="" className="landing-page-content aguth_iEwtiEw1ejuP3Yg">
                                    <div className="tabs tabs-line tabs-normal tabs-top landing-page-tab">
                                        <Tabs
                                        listchoice={listchoice}
                                        url={listAddonshopURL}
                                        listchoice={listchoice}
                                        choice={choice}
                                        loading={loading}
                                        setchoice={data=>setChoice(data)}
                                        setcount={data=>setCount(data)}
                                        setdata={data=>setDeal(data)}
                                        setloading={data=>setLoading(data)}
                                        />
                                        <div className="tabs__content">
                                            <div className="tabs-tabpane"></div>
                                            <div className="tabs-tabpane" style={{display: 'none'}}></div>
                                            <div className="tabs-tabpane" style={{display: 'none'}}></div>
                                            <div className="tabs-tabpane" style={{display: 'none'}}></div>
                                        </div>
                                    </div>
                                    <div data-v-771d39f6="" className="search-bar landing-page-filter">
                                        <div data-v-40673d96="" data-v-771d39f6="" className="promotion-search">
                                            <div data-v-40673d96="" className="custom-input-group">
                                                <div data-v-40673d96="" className="search-label">Tìm kiếm</div> 
                                                <div data-v-40673d96="" className="input-group search-type">
                                                    <span ref={optionref} className="input-group__prepend" style={{width: '160px'}}>
                                                        <div data-v-40673d96="" className="select">
                                                            <div onClick={e=>setShowoption(!showoption)} tabIndex="0" className="selector selector--normal item-space"> 
                                                                <div className="selector__inner line-clamp--1">{choice_option.find(item=>item.value==option).name}</div> 
                                                                <div className="selector__suffix"> 
                                                                    <i className="selector__suffix-icon icon">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M8,9.18933983 L4.03033009,5.21966991 C3.73743687,4.9267767 3.26256313,4.9267767 2.96966991,5.21966991 C2.6767767,5.51256313 2.6767767,5.98743687 2.96966991,6.28033009 L7.46966991,10.7803301 C7.76256313,11.0732233 8.23743687,11.0732233 8.53033009,10.7803301 L13.0303301,6.28033009 C13.3232233,5.98743687 13.3232233,5.51256313 13.0303301,5.21966991 C12.7374369,4.9267767 12.2625631,4.9267767 11.9696699,5.21966991 L8,9.18933983 Z"></path></svg>
                                                                    </i>
                                                                </div>
                                                            </div> 
                                                            {showoption?
                                                            <div className="select__options">
                                                                {choice_option.map(item=>
                                                                <div key={item.value} onClick={(e)=>{setOption(item.value)
                                                                    setShowoption(false)
                                                                }} data-v-40673d96="" className={`option ${item.value==option?'selected':''}`}>{item.name}</div>
                                                                )}
                                                                
                                                            </div>:''}
                                                        </div>
                                                    </span> 
                                                    <span className="input-group__append">
                                                        <div data-v-40673d96="" className="input search-input">
                                                            <div className="input__inner input__inner--normal"> 
                                                                <input onChange={e=>setKeyword(e.target.value)} type="text" placeholder=" " resize="vertical" rows="2" minrows="2" restrictiontype="value" max="Infinity" min="-Infinity" className="input__input"/> 
                                                            </div>
                                                        </div>
                                                    </span>
                                                </div>
                                            </div> 
                                            <div data-v-40673d96="" className="custom-input-group">
                                                <div data-v-40673d96="" className="search-label">Thời gian khuyến mãi    
                                                </div>
                                               
                                                <Daterange
                                                setDaychoice={data=>setDaychoice(data)}   
                                                daychoice={daychoice}
                                                setcount={data=>setCount(data)}
                                                setdata={data=>setDeal(data)}
                                                setloading={data=>setLoading(data)}
                                                url={listAddonshopURL}
                                                />
                                                
                                            </div>
                                            <div data-v-40673d96="" className="action-btns">
                                                    <button onClick={e=>searchitem(e)} data-v-40673d96="" type="button" className="button btn-orange ">
                                                        <span>Tìm</span>
                                                    </button> 
                                                    <button onClick={()=>{setKeyword()
                                                        setDaychoice()
                                                        setOption(1)
                                                    }} data-v-40673d96="" type="button" className="button btn-light">
                                                            <span>Nhập Lại</span>
                                                    </button>
                                                </div>
                                        </div>
                                    </div>
                                    <div data-v-771d39f6="" className="landing-page-filter-hints">
                                        Có tất cả <em data-v-771d39f6="" place="count">{count}</em> deal Khuyến Mãi
                                    </div>
                                    <div data-v-439649ed="" className="table list-table">
                                        <div className="table__header-container" style={{position: 'sticky', top: '56px', zIndex: 2}}> 
                                            <div className="table__main-header">
                                                <table cellSpacing="0" cellPadding="0" border="0" className="table__header" style={{width: '1214px'}}>
                                                    <colgroup>
                                                        <col width="235"/>
                                                        <col width="196"/>
                                                        <col width="200"/>
                                                        <col width="190"/>
                                                        <col width="136"/>
                                                        <col width="140"/>
                                                        <col width="116"/>
                                                    </colgroup>
                                                    <thead>
                                                        <tr>
                                                            <th colSpan="1" rowSpan="1" className="">
                                                                <div className="table__cell first-cell">
                                                                    <span className="table__cell-label">Tên chương trình</span>
                                                                </div>
                                                            </th>
                                                            <th colSpan="1" rowSpan="1" className="">
                                                                <div className="table__cell">
                                                                    <span className="table__cell-label">Loại deal shock</span>
                                                                </div>
                                                            </th>
                                                            <th colSpan="1" rowSpan="1" className="">
                                                                <div className="table__cell">
                                                                    <span className="table__cell-label">Sản phẩm chính</span>
                                                                </div>
                                                            </th>
                                                            <th colSpan="1" rowSpan="1" className="">
                                                                <div className="table__cell">
                                                                    <span className="table__cell-label">Sản phẩm mua kèm | Quà tặng</span>
                                                                </div>
                                                            </th>
                                                            <th colSpan="1" rowSpan="1" className="">
                                                                <div className="table__cell">
                                                                    <span className="table__cell-label">Trạng thái</span>
                                                                </div>
                                                            </th>
                                                            <th colSpan="1" rowSpan="1" className="">
                                                                <div className="table__cell">
                                                                    <span className="table__cell-label">Thời Gian</span>
                                                                </div>
                                                            </th>
                                                            
                                                            <th colSpan="1" rowSpan="1" className="">
                                                                <div className="table__cell last-cell">
                                                                    <span className="table__cell-label">Thao tác</span>
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
                                                            <div className="scrollbar__thumb visible" style={{left: '0px', width: '0px'}}></div>
                                                        </div>
                                                        <div className="scrollbar__content">
                                                            <div className="table__body">
                                                                <div className="scrollbar__content">
                                                                    <colgroup>
                                                                        <col width="235"/>
                                                                        <col width="196"/>
                                                                        <col width="200"/>
                                                                        <col width="190"/>
                                                                        <col width="136"/>
                                                                        <col width="140"/>
                                                                        <col width="116"/>
                                                                    </colgroup>
                                                                    <tbody>
                                                                        {listdeal.map(deal=>
                                                                        <tr key={deal.id} className="table__row valign-top landing-row">
                                                                            <td className="is-first">
                                                                                <div className="table__cell first-cell">
                                                                                    <div data-v-771d39f6="" className="promotion-info-comp _2rZ--OSu2dBWc9zotVJ3vr" style={{maxWidth: '200px'}}>
                                                                                        <div className="info-right">
                                                                                            <div data-v-76c9812a="" className="ellipsis-text-wrapper info-right-item promotion-name">
                                                                                                <div data-v-76c9812a="" className="tooltip popover popover--dark">
                                                                                                    <div className="popover__ref">
                                                                                                        <div data-v-76c9812a="" className="ellipsis-content single">{deal.program_name_buy_with_shock_deal}</div>
                                                                                                    </div> 
                                                                                                    <div className="popper popover__popper popover__popper--dark tooltip__popper" style={{display: 'none', maxWidth: '280px', wordBreak: 'break-all', overflowWrap: 'break-word'}}>
                                                                                                        <div className="popover__content">{deal.program_name_buy_with_shock_deal}</div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                            <td className="">
                                                                                <div className="table__cell">
                                                                                    <span data-v-771d39f6="">{deal.shock_deal_type=='1'?'Mua kèm deal shock':'Mua để nhận quà'}</span>
                                                                                </div>
                                                                            </td>
                                                                            <td className="">
                                                                                <div className="table__cell">
                                                                                    <div data-v-771d39f6="" className="product-gallery-comp _25_tDRNHeHUHTHoVBXqqAZ">
                                                                                        {deal.main_products.map((item,index)=>{
                                                                                            if(index<5){
                                                                                                return(
                                                                                                <span className="avatar avatar--small product-gallery-item">
                                                                                                    <div className="avatar-img" style={{backgroundImage: `url(${item.image})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center'}}></div>
                                                                                                </span>)
                                                                                            }
                                                                                        })}
                                                                                        {deal.main_products.length>5?<div className="product-gallery-mask gallery-mask__small">+{deal.main_products.length-5}</div>:''}
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                            <td className="">
                                                                                <div className="table__cell">
                                                                                    <div data-v-771d39f6="" className="product-gallery-comp _25_tDRNHeHUHTHoVBXqqAZ">
                                                                                        {deal.byproducts.map((item,index)=>{
                                                                                            if(index<5){
                                                                                                return(
                                                                                                <span className="avatar avatar--small product-gallery-item">
                                                                                                    <div className="avatar-img" style={{backgroundImage: `url(${item.image})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center'}}></div>
                                                                                                </span>)
                                                                                            }
                                                                                        })}
                                                                                        {deal.byproducts.length>5?<div className="product-gallery-mask gallery-mask__small">+{deal.byproducts.length-5}</div>:''}
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                            <td className="">
                                                                                <div className="table__cell">
                                                                                    <div data-v-6b00c90e="" className={`tag tag__information tag--normal ${new Date()>new Date(deal.valid_to)?'invalid':new Date()< new Date(deal.valid_from)?'default':'success'}`}>{new Date()>new Date(deal.valid_to)?'Đã kết thúc':new Date()< new Date(deal.valid_from)?'Sắp diễn ra':'Đang diễn ra'}</div> 
                                                                                </div>
                                                                            </td>
                                                                            
                                                                            <td className="">
                                                                                <div className="table__cell">
                                                                                    
                                                                                    <div data-v-6b00c90e="" className="duration">{timepromotion(deal.valid_from)} -
                                                                                        <div data-v-6b00c90e="">
                                                                                            <span data-v-6b00c90e="" className="">{timepromotion(deal.valid_to)}</span>
                                                                                        </div>
                                                                                    </div>
                                                                                    
                                                                                </div>
                                                                            </td>
                                                                            <td className="is-last">
                                                                                <div className="table__cell last-cell">
                                                                                    <div data-v-6b00c90e="" className="action-list-comp _3MyH5U5zfKZqxZyFzTY6wM">
                                                                                        <div className="action-list-item">
                                                                                            <div className="popover popover--light">
                                                                                                <div className="popover__ref">
                                                                                                    <button onClick={()=>setdetail(deal)} type="button" className="button button--link button--normal">
                                                                                                        <span>Chi tiết</span>
                                                                                                    </button>
                                                                                                </div> 
                                                                                                <div className="popper popover__popper popover__popper--light with-arrow" style={{display: 'none', maxWidth: '320px'}}>
                                                                                                    <div className="popover__content"></div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="action-list-item">
                                                                                            <div className="popover popover--light">
                                                                                                <div className="popover__ref">
                                                                                                    <button type="button" className="button button--link button--normal">
                                                                                                        <span>Đơn hàng</span>
                                                                                                    </button>
                                                                                                </div> 
                                                                                                <div className="popper popover__popper popover__popper--light with-arrow" style={{display: 'none', maxWidth: '320px'}}>
                                                                                                    <div className="popover__content"></div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="action-list-item">
                                                                                            <div className="popover popover--light">
                                                                                                <div className="popover__ref">
                                                                                                    <button type="button" className="button button--link button--normal">
                                                                                                        <span>Sao chép</span>
                                                                                                    </button>
                                                                                                </div> 
                                                                                                <div className="popper popover__popper popover__popper--light with-arrow" style={{display: 'none', maxWidth: '320px'}}>
                                                                                                    <div className="popover__content"></div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                        )}
                                                                    </tbody>
                                                                </div>
                                                            </div>
                                                            {count==0?
                                                            <div className="table__empty">
                                                                <div data-v-6b00c90e="" className="default-page list-no-result">
                                                                    <i className="default-page__icon icon normal">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 88"><g fill="none" fillRule="evenodd" transform="translate(-4 -3)"><rect width="96" height="96" fill="#D8D8D8" opacity="0"></rect><ellipse cx="49" cy="86" fill="#F2F2F2" rx="45" ry="5"></ellipse><g stroke="#D8D8D8" transform="rotate(-8 143.93 -42.979)"><rect width="7" height="19" x="1" y="21" fill="#FAFAFA" rx="2"></rect><path fill="#FAFAFA" d="M10.8736633,41.4199548 C10.8104883,41.4199548 10.7473763,41.4239459 10.6847045,41.4319042 C9.86287689,41.5362633 9.28125369,42.287086 9.38561275,43.1089136 L11.5443429,60.1089136 C11.6394986,60.858265 12.2770247,61.4199548 13.0323935,61.4199548 L16.1748757,61.4199548 C16.9302445,61.4199548 17.5677706,60.858265 17.6629263,60.1089136 L19.8216565,43.1089136 C19.8296148,43.0462418 19.8336059,42.9831299 19.8336059,42.9199548 C19.8336059,42.0915277 19.162033,41.4199548 18.3336059,41.4199548 L10.8736633,41.4199548 Z"></path><path fill="#FFF" d="M6.18492396,14.3994139 C5.49369034,14.5479211 5,15.1589431 5,15.8659496 L5,45.1340504 C5,45.8410569 5.49369034,46.4520789 6.18492396,46.6005861 L66.184924,59.4912111 C66.2884734,59.513458 66.3940878,59.5246754 66.5,59.5246754 C67.3284271,59.5246754 68,58.8531025 68,58.0246754 L68,2.97532465 C68,2.86941241 67.9887827,2.763798 67.9665357,2.66024861 C67.7925241,1.85030328 66.9948693,1.33477721 66.184924,1.50878891 L6.18492396,14.3994139 Z"></path><path fill="#FAFAFA" d="M60.0037917,2.86333895 L60.5236588,58.2648486 L66.080424,59.4645943 C66.1894478,59.4881334 66.3006173,59.5 66.4120933,59.5 C67.2881455,59.5 68,58.7822686 68,57.894856 L68,3.10557927 C68,2.99232089 67.9881413,2.87938372 67.964624,2.76865444 C67.780501,1.90172832 66.936587,1.35098915 66.0816147,1.53558232 L60.0037917,2.86333895 Z"></path></g><g fill="#D8D8D8" transform="translate(80.16 3.04)"><circle cx="10" cy="13" r="3" opacity=".5"></circle><circle cx="2" cy="9" r="2" opacity=".3"></circle><path d="M8.5,1 C7.67157288,1 7,1.67157288 7,2.5 C7,3.32842712 7.67157288,4 8.5,4 C9.32842712,4 10,3.32842712 10,2.5 C10,1.67157288 9.32842712,1 8.5,1 Z M8.5,7.10542736e-15 C9.88071187,7.10542736e-15 11,1.11928813 11,2.5 C11,3.88071187 9.88071187,5 8.5,5 C7.11928813,5 6,3.88071187 6,2.5 C6,1.11928813 7.11928813,7.10542736e-15 8.5,7.10542736e-15 Z" opacity=".3"></path></g></g></svg>
                                                                        </i> 
                                                                        <div className="default-page__content">
                                                                        Không có Deal shock nào
                                                                    </div>
                                                                </div>
                                                            </div>:''}
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
        </>
    )
}

export default Listdealshop