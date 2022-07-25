import React, {useState,useCallback,useEffect} from 'react'
import {timepromotion,formatter,percent, timeformat,listchoice} from "../constants"
import {listvouchershopURL,dataVoucherURL} from "../urls"
import {useNavigate,useSearchParams} from 'react-router-dom'
import axios from 'axios'
import { headers } from '../actions/auth'
import Navbar from './Navbar'
import Tabs from './Tabs'
const now=new Date()
now.setDate(new Date().getDate()-7)
const Listvoucher=()=>{
    const [listvoucher,setVouchers]=useState([])
    const [loading,setLoading]=useState(true)
    const [count,setCount]=useState(0)
    const [choice,setChoice]=useState('all')
    const [params, setSearchParams] = useSearchParams();
    const navite=useNavigate()
    const [stats,setStats]=useState([{name:'Doanh số',id:1,info:'Tổng giá trị của các đơn hàng có áp dụng discount Của Shop đã được xác nhận, bao gồm phí vận chuyển và không bao gồm các khuyến mãi khác, tính trong khoảng thời gian đã chọn.',result:0,result_last:0,symbol:true},
    {name:'Đơn hàng',id:2,info:'Tổng số lượng các đơn hàng bao gồm sản phẩm có áp dụng khuyến mãi được xác nhận, tính trong khoảng thời gian đã chọn.',result:0,result_last:0},
    {name:'Tỉ lệ sử dụng',id:3,info:'Tổng số lượng sản phẩm có áp dụng khuyến mãi đã bán, tính trên toàn bộ các đơn hàng được xác nhận trong khoảng thời gian đã chọn.',result:0,result_last:0},
    {name:'Người mua',id:4,info:'Tổng số lượng người mua duy nhất đã mua sản phẩm có áp dụng khuyến mãi, tính trên toàn bộ các đơn hàng được xác nhận trong khoảng thời gian đã chọn.',result:0,result_last:0}])
    useEffect(()=>{
        (async()=>{
            const obj1=await axios.get(dataVoucherURL,headers)
            const datadiscount=stats.map(item=>{
                if(item.id==1){
                    return ({...item,result:obj1.data.total_amount,result_last:obj1.data.total_amount_last})
                }
                else if(item.id==2){
                    return ({...item,result:obj1.data.total_order,result_last:obj1.data.total_order_last})
                    
                }
                else if(item.id==3){
                    return ({...item,result:obj1.data.usage_rate,result_last:obj1.data.usage_rate_last})
                }
                else{
                    return ({...item,result:obj1.data.number_buyer,result_last:obj1.data.number_buyer_last})
                }
            })
            setStats(datadiscount)
        })()
       
    },[])
    

    useEffect(()=>{
        document.addEventListener('scroll',addItem)
        return () => {
            document.removeEventListener('scroll', addItem)
        }
    },[count,loading,listvoucher.length])

    const addItem=()=>{
        (async()=>{
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
            if(count && clientHeight + scrollTop >= scrollHeight-300 && loading && listvoucher.length< count){
                setLoading(false)
                const res =await axios.get(`${listvouchershopURL}?&offset=${listvoucher.length}`,headers)
                setVouchers(current=>[...current,...res.data.vouchers])
                setLoading(true)
            }
        })()
    }
    const setdata=data=>setVouchers(data)
    const setdetail=(item)=>{
        navite(`/marketing/vouchers/${item.id}`)
    }
    return(
        <>
        <Navbar/>
        <div data-v-a555442e className="wrapper">
           <div data-v-6b00c90e="" data-v-4d2c3cc3="" className="vouchers-list-page"> 
                <p data-v-6b00c90e="" className="py-1 list-title">Mã Giảm Giá Của Shop</p> 
                <div data-v-439649ed="" data-v-b811fefc="" data-v-6b00c90e="" className="metrics-dashboard voucher-metrics-dashboard card"> 
                    <div className="card__content">
                        <div data-v-439649ed="" className="header">
                            <div data-v-439649ed="" className="title">
                                <div data-v-439649ed="" style={{lineHeight: '20px'}}>Chỉ số quan trọng</div> 
                                <div data-v-439649ed="" className="time">(Từ {timeformat(now)} đến {timeformat(new Date().toDateString())}GMT+7)</div>
                            </div> 
                            <div data-v-439649ed="" className="header-action"> 
                                <button onClick={()=>navite('/datacenter/marketing/tools/voucher')} data-v-439649ed="" type="button" className="button button--link button--normal">
                                    <i className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M2.5 2a.5.5 0 01.5.5V14h11.5a.5.5 0 110 1h-12a.5.5 0 01-.5-.5v-12a.5.5 0 01.5-.5zm11.818 2.614a.5.5 0 01.119.63l-.05.074-3.6 4.375a.5.5 0 01-.661.1l-.075-.06-1.41-1.37-3.255 3.955a.5.5 0 01-.823-.561l.05-.075 3.6-4.375a.5.5 0 01.661-.1l.075.06 1.41 1.37 3.255-3.955a.5.5 0 01.704-.068z"></path></svg>
                                    </i>
                                    <span>Phân Tích Bán Hàng</span>
                                </button>
                            </div>
                        </div> 
                        <div data-v-439649ed="" className="metrics-container">
                            {stats.map(item=>
                            <div data-v-439649ed="" className="metrics" style={{flex: '1 1 0%'}}>
                                <div data-v-439649ed="" className="metrics-title">
                                    <span data-v-439649ed="" className="metrics-name">{item.name}</span> 
                                    <div data-v-439649ed="" className="popover popover--light">
                                        <div className="popover__ref">
                                            <i data-v-439649ed="" className="icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 1a7 7 0 110 14A7 7 0 018 1zm0 1a6 6 0 100 12A6 6 0 008 2zm-.012 8.238a.75.75 0 110 1.5.75.75 0 010-1.5zm.129-5.633c1.853 0 2.658 1.9 1.826 3.117-.174.254-.377.423-.672.593l-.156.084-.157.08c-.395.204-.464.28-.464.542a.5.5 0 11-1 0c0-.68.271-1.024.865-1.355l.408-.215c.175-.1.276-.185.35-.293.404-.591-.003-1.553-1-1.553-.7 0-1.289.408-1.36.948l-.007.11-.008.09a.5.5 0 01-.992-.09c0-1.22 1.122-2.058 2.367-2.058z"></path></svg>
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
                                    <span className="metrics-number">{item.symbol?formatter.format(item.result):item.result}</span>
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
                <div data-v-439649ed="" data-v-b811fefc="" data-v-6b00c90e="" className="card landing-page-comp _2zaOUn3Zyivml8-HXb4J7v"> 
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
                                <button onClick={()=>navite('/marketing/vouchers/new')} data-v-6b00c90e="" type="button" className="btn-new button button--primary button--large">
                                    <i className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8.48176704,1.5 C8.75790942,1.5 8.98176704,1.72385763 8.98176704,2 L8.981,7.997 L15,7.99797574 C15.2761424,7.99797574 15.5,8.22183336 15.5,8.49797574 C15.5,8.77411811 15.2761424,8.99797574 15,8.99797574 L8.981,8.997 L8.98176704,15 C8.98176704,15.2761424 8.75790942,15.5 8.48176704,15.5 C8.20562467,15.5 7.98176704,15.2761424 7.98176704,15 L7.981,8.997 L2,8.99797574 C1.72385763,8.99797574 1.5,8.77411811 1.5,8.49797574 C1.5,8.22183336 1.72385763,7.99797574 2,7.99797574 L7.981,7.997 L7.98176704,2 C7.98176704,1.72385763 8.20562467,1.5 8.48176704,1.5 Z"></path></svg>
                                    </i>
                                    <span>Tạo</span>
                                </button>
                            </div>
                        </div>
                        <div data-v-439649ed="" className="landing-page-content aguth_iEwtiEw1ejuP3Yg">
                            <div className="tabs tabs-line tabs-normal tabs-top landing-page-tab">
                                <Tabs
                                    
                                    url={listvouchershopURL}
                                    listchoice={listchoice}
                                    choice={choice}
                                    loading={loading}
                                    setchoice={data=>setChoice(data)}
                                    setcount={data=>setCount(data)}
                                    setdata={data=>setdata(data)}
                                    setloading={data=>setLoading(data)}
                                />
                                <div className="tabs__content">
                                    <div className="tabs-tabpane"></div>
                                    <div className="tabs-tabpane" style={{display: 'none'}}></div>
                                    <div className="tabs-tabpane" style={{display: 'none'}}></div>
                                    <div className="tabs-tabpane" style={{display: 'none'}}></div>
                                </div>
                            </div>
                            <div data-v-439649ed="" className="table list-table">
                                <div className="table__header-container" style={{position: 'sticky', top: '56px', zIndex: 2}}> 
                                    <div className="table__main-header">
                                        <table cellspacing="0" cellpadding="0" border="0" className="table__header" style={{width: '1214px'}}>
                                            <colgroup>
                                                <col width="284"/>
                                                <col width="186"/>
                                                <col width="186"/>
                                                <col width="136"/>
                                                <col width="136"/>
                                                <col width="162"/>
                                                <col width="124"/>
                                            </colgroup>
                                            <thead>
                                                <tr>
                                                    <th colspan="1" rowspan="1" className="">
                                                        <div className="table__cell first-cell">
                                                            <span className="table__cell-label">Mã voucher
                                                                <span data-v-6b00c90e="" className="vertical-separator"></span> Tên
                                                            </span>
                                                        </div>
                                                    </th>
                                                    <th colspan="1" rowspan="1" className="">
                                                        <div className="table__cell">
                                                            <span className="table__cell-label">Loại mã</span>
                                                        </div>
                                                    </th>
                                                    <th colspan="1" rowspan="1" className="">
                                                        <div className="table__cell">
                                                            <span className="table__cell-label">Giảm giá</span>
                                                        </div>
                                                    </th>
                                                    <th colspan="1" rowspan="1" className="">
                                                        <div className="table__cell">
                                                            <span className="table__cell-label">Tổng số mã giảm giá có thể sử dụng</span>
                                                        </div>
                                                    </th>
                                                    <th colspan="1" rowspan="1" className="">
                                                        <div className="table__cell">
                                                            <span className="table__cell-label">Đã dùng</span>
                                                            <div className="table__cell-actions">
                                                                <div className="popover popover--light table__cell-action table__cell-info"><div className="popover__ref">
                                                                    <i className="icon table__cell-icon">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8,1 C11.8659932,1 15,4.13400675 15,8 C15,11.8659932 11.8659932,15 8,15 C4.13400675,15 1,11.8659932 1,8 C1,4.13400675 4.13400675,1 8,1 Z M8,2 C4.6862915,2 2,4.6862915 2,8 C2,11.3137085 4.6862915,14 8,14 C11.3137085,14 14,11.3137085 14,8 C14,4.6862915 11.3137085,2 8,2 Z M7.98750749,10.2375075 C8.40172105,10.2375075 8.73750749,10.5732939 8.73750749,10.9875075 C8.73750749,11.401721 8.40172105,11.7375075 7.98750749,11.7375075 C7.57329392,11.7375075 7.23750749,11.401721 7.23750749,10.9875075 C7.23750749,10.5732939 7.57329392,10.2375075 7.98750749,10.2375075 Z M8.11700238,4.60513307 C9.97011776,4.60513307 10.7745841,6.50497267 9.94298079,7.72186504 C9.76926425,7.97606597 9.56587088,8.14546785 9.27050506,8.31454843 L9.11486938,8.39945305 L8.95824852,8.47993747 C8.56296349,8.68261431 8.49390831,8.75808648 8.49390831,9.0209925 C8.49390831,9.29713488 8.27005069,9.5209925 7.99390831,9.5209925 C7.71776594,9.5209925 7.49390831,9.29713488 7.49390831,9.0209925 C7.49390831,8.34166619 7.7650409,7.99681515 8.35913594,7.6662627 L8.76655168,7.45066498 C8.9424056,7.3502536 9.04307851,7.26633638 9.11735517,7.1576467 C9.52116165,6.56675314 9.11397414,5.60513307 8.11700238,5.60513307 C7.41791504,5.60513307 6.82814953,6.01272878 6.75715965,6.55275918 L6.75,6.66244953 L6.74194433,6.75232516 C6.69960837,6.98557437 6.49545989,7.16244953 6.25,7.16244953 C5.97385763,7.16244953 5.75,6.9385919 5.75,6.66244953 C5.75,5.44256682 6.87194406,4.60513307 8.11700238,4.60513307 Z"></path></svg>
                                                                    </i>
                                                                </div> 
                                                                <div className="popper popover__popper popover__popper--light with-arrow" style={{display: 'none', maxWidth: '320px'}}>
                                                                    <div className="popover__content">Số lượng mã giảm giá đã sử dụng (không gồm những đơn đã hủy và đơn Trả hàng/Hoàn tiền)</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </th>
                                                    <th colspan="1" rowspan="1" className="">
                                                        <div className="table__cell">
                                                            <span className="table__cell-label">Trạng thái 
                                                        <span data-v-6b00c90e="" className="vertical-separator"></span> 
                                                        <div data-v-6b00c90e="">Thời gian lưu Mã giảm giá</div>
                                                        </span></div>
                                                    </th>
                                                    <th colspan="1" rowspan="1" className="">
                                                        <div className="table__cell last-cell"><span className="table__cell-label">Thao tác</span></div>
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
                                                                <col width="284"/>
                                                                <col width="186"/>
                                                                <col width="186"/>
                                                                <col width="136"/>
                                                                <col width="136"/>
                                                                <col width="162"/>
                                                                <col width="124"/>
                                                            </colgroup>
                                                            <tbody>
                                                                {listvoucher.map(voucher=>
                                                                <tr className="table__row valign-top landing-row">
                                                                    <td className="is-first">
                                                                        <div className="table__cell first-cell">
                                                                            <div data-v-6b00c90e="" className="promotion-info-style promotion-info-comp _2rZ--OSu2dBWc9zotVJ3vr">
                                                                                <div className="info-left">
                                                                                    <div className="promotion-image" style={{width: '56px', height: '56px', backgroundImage: `url(https://res.cloudinary.com/dupep1afe/image/upload/v1649842026/download_3_optpqu.png)`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center'}}></div>
                                                                                </div>
                                                                                <div className="info-right" style={{maxWidth: 'calc((100% - 56px) - 8px)'}}>
                                                                                    <div data-v-76c9812a="" className="ellipsis-text-wrapper info-right-item promotion-name">
                                                                                        <div data-v-76c9812a="" className="tooltip popover popover--dark">
                                                                                            <div className="popover__ref">
                                                                                                <div data-v-76c9812a="" className="ellipsis-content single">{voucher.code}</div>
                                                                                            </div> 
                                                                                            <div className="popper popover__popper popover__popper--dark tooltip__popper" style={{display: 'none', maxWidth: '280px', wordBreak: 'break-all', overflowWrap: 'break-word'}}>
                                                                                                <div className="popover__content">{voucher.code}</div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div data-v-76c9812a="" className="ellipsis-text-wrapper has-tooltips info-right-item promotion-desc">
                                                                                        <div data-v-76c9812a="" className="tooltip popover popover--dark">
                                                                                            <div className="popover__ref">
                                                                                                <div data-v-76c9812a="" className="ellipsis-content single">{voucher.name_of_the_discount_program}</div>
                                                                                            </div>
                                                                                        </div> 
                                                                                        <div className="popper popover__popper popover__popper--dark tooltip__popper" style={{display: 'none', maxWidth: '280px', wordBreak: 'break-all', overflowWrap: 'break-word'}}>
                                                                                            <div className="popover__content">{voucher.name_of_the_discount_program}</div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td className="">
                                                                        <div className="table__cell">
                                                                            <div data-v-6b00c90e="">Mã giảm giá {voucher.code_type=='All'?'toàn Shop':'trên sản phẩm'}</div> 
                                                                            <div data-v-6b00c90e="" className="products">({voucher.code_type=='All'?'Tất cả':`${voucher.count_product}`} sản phẩm)</div>
                                                                        </div>
                                                                    </td>
                                                                    <td className="">
                                                                        <div className="table__cell">{voucher.discount_type=='1'?`${voucher.percent}% GIẢM`:`₫${formatter.format(voucher.amount)}`}</div>
                                                                    </td>
                                                                    <td className="">
                                                                        <div className="table__cell">{voucher.maximum_usage}</div>
                                                                    </td>
                                                                    <td className="">
                                                                        <div className="table__cell">{voucher.number_used}</div>
                                                                    </td>
                                                                    <td className=""><div className="table__cell">
                                                                        <div data-v-6b00c90e="" className={`tag tag__information tag--normal ${new Date()>new Date(voucher.valid_to)?'invalid':new Date()< new Date(voucher.valid_from)?'default':''}`}>{new Date()>new Date(voucher.valid_to)?'Đã kết thúc':new Date()< new Date(voucher.valid_from)?'Sắp diễn ra':'Đang diễn ra'}</div> 
                                                                            <div data-v-6b00c90e="" className="duration">{timepromotion(voucher.valid_from)} -
                                                                                <div data-v-6b00c90e="">
                                                                                    <span data-v-6b00c90e="" className="">{timepromotion(voucher.valid_to)}</span>
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
                                                                                            <button onClick={()=>setdetail(voucher)} type="button" className="button button--link button--normal">
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
                                                            <div class="table__empty">
                                                                <div data-v-6b00c90e="" class="default-page list-no-result">
                                                                    <i class="default-page__icon icon normal">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 92 86"><g fill="none" fill-rule="evenodd" transform="translate(-4 -4)"><rect width="96" height="96"></rect><ellipse cx="49" cy="85" fill="#F2F2F2" rx="45" ry="5"></ellipse><rect width="34" height="15" x="34.5" y="24.5" fill="#FAFAFA" stroke="#D8D8D8" rx="2" transform="rotate(30 51.5 32)"></rect><rect width="33" height="15" x="25.5" y="25.5" fill="#FAFAFA" stroke="#D8D8D8" rx="2" transform="rotate(15 42 33)"></rect><path fill="#FFF" stroke="#D8D8D8" d="M13.5,42.5164023 C17.4090159,42.7736953 20.5,46.0258787 20.5,50 C20.5,53.9741213 17.4090159,57.2263047 13.5,57.4835977 L13.5,73 C13.5,73.8284271 14.1715729,74.5 15,74.5 L83,74.5 C83.8284271,74.5 84.5,73.8284271 84.5,72.9999686 L84.5009752,57.483515 C84.3347628,57.4944876 84.1677086,57.5 84,57.5 C79.8578644,57.5 76.5,54.1421356 76.5,50 C76.5,45.8578644 79.8578644,42.5 84,42.5 C84.1677086,42.5 84.3347628,42.5055124 84.5009752,42.516485 L84.5,27 C84.5,26.1715729 83.8284271,25.5 83,25.5 L15,25.5 C14.1715729,25.5 13.5,26.1715729 13.5,27 L13.5,42.5164023 Z"></path><path fill="#D8D8D8" d="M71.5,59 C71.7761424,59 72,59.2238576 72,59.5 C72,59.7761424 71.7761424,60 71.5,60 L40.5,60 C40.2238576,60 40,59.7761424 40,59.5 C40,59.2238576 40.2238576,59 40.5,59 L71.5,59 Z M59.5,49 C59.7761424,49 60,49.2238576 60,49.5 C60,49.7761424 59.7761424,50 59.5,50 L40.5,50 C40.2238576,50 40,49.7761424 40,49.5 C40,49.2238576 40.2238576,49 40.5,49 L59.5,49 Z M71.5,39 C71.7761424,39 72,39.2238576 72,39.5 C72,39.7761424 71.7761424,40 71.5,40 L40.5,40 C40.2238576,40 40,39.7761424 40,39.5 C40,39.2238576 40.2238576,39 40.5,39 L71.5,39 Z"></path><line x1="28.5" x2="28.5" y1="26" y2="75" stroke="#D8D8D8" stroke-dasharray="4"></line><g fill="#D8D8D8" transform="translate(82.16 4.04)"><circle cx="10" cy="13" r="3" opacity=".5"></circle><circle cx="2" cy="9" r="2" opacity=".3"></circle><path d="M8.5,1 C7.67157288,1 7,1.67157288 7,2.5 C7,3.32842712 7.67157288,4 8.5,4 C9.32842712,4 10,3.32842712 10,2.5 C10,1.67157288 9.32842712,1 8.5,1 Z M8.5,7.10542736e-15 C9.88071187,7.10542736e-15 11,1.11928813 11,2.5 C11,3.88071187 9.88071187,5 8.5,5 C7.11928813,5 6,3.88071187 6,2.5 C6,1.11928813 7.11928813,7.10542736e-15 8.5,7.10542736e-15 Z" opacity=".3"></path></g></g></svg></i> <div class="default-page__content">
                                                                        Không có Mã giảm giá nào
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

export default Listvoucher