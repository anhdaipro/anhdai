import React, {useState,useCallback,useEffect} from 'react'
import {listvouchershopURL,timepromotion,formatter} from "../constants"
import Voucherinfo from "../hocs/Voucherinfo"
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { headers } from '../actions/auth'
const Listvoucher=()=>{
    const [listvoucher,setVoucher]=useState([])
    const [loading,setLoading]=useState(true)
    const navite=useNavigate()
    useEffect(()=>{
        axios.get(listvouchershopURL,headers)
        .then(res=>{
            setVoucher(res.data)
        })
    },[])
    const setdetail=(item)=>{
        navite(`/marketing/vouchers/${item.id}`)
    }
    return(
        <>
           <div data-v-6b00c90e="" data-v-4d2c3cc3="" className="vouchers-list-page"> 
                <p data-v-6b00c90e="" className="vouchers-list-page-title">Mã Giảm Giá Của Shop</p> 
                <div data-v-439649ed="" data-v-b811fefc="" data-v-6b00c90e="" className="metrics-dashboard voucher-metrics-dashboard card"> 
                    <div className="card__content">
                        <div data-v-439649ed="" className="header">
                            <div data-v-439649ed="" className="title">
                                <div data-v-439649ed="" style={{lineHeight: '20px'}}>Chỉ số quan trọng</div> 
                                <div data-v-439649ed="" className="time">(Từ 06-04-2022 đến 13-04-2022GMT+7)</div>
                            </div> 
                            <div data-v-439649ed="" className="header-action"> 
                                <button data-v-439649ed="" type="button" className="button button--link button--normal">
                                    <i className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M2.5 2a.5.5 0 01.5.5V14h11.5a.5.5 0 110 1h-12a.5.5 0 01-.5-.5v-12a.5.5 0 01.5-.5zm11.818 2.614a.5.5 0 01.119.63l-.05.074-3.6 4.375a.5.5 0 01-.661.1l-.075-.06-1.41-1.37-3.255 3.955a.5.5 0 01-.823-.561l.05-.075 3.6-4.375a.5.5 0 01.661-.1l.075.06 1.41 1.37 3.255-3.955a.5.5 0 01.704-.068z"></path></svg>
                                    </i>
                                    <span>Phân Tích Bán Hàng</span>
                                </button>
                            </div>
                        </div> 
                        <div data-v-439649ed="" className="metrics-container">
                            <div data-v-439649ed="" className="metrics" style={{flex: '1 1 0%'}}>
                                <div data-v-439649ed="" className="metrics-title">
                                    <span data-v-439649ed="" className="metrics-name">Doanh Số</span> 
                                    <div data-v-439649ed="" className="popover popover--light">
                                        <div className="popover__ref">
                                            <i data-v-439649ed="" className="icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 1a7 7 0 110 14A7 7 0 018 1zm0 1a6 6 0 100 12A6 6 0 008 2zm-.012 8.238a.75.75 0 110 1.5.75.75 0 010-1.5zm.129-5.633c1.853 0 2.658 1.9 1.826 3.117-.174.254-.377.423-.672.593l-.156.084-.157.08c-.395.204-.464.28-.464.542a.5.5 0 11-1 0c0-.68.271-1.024.865-1.355l.408-.215c.175-.1.276-.185.35-.293.404-.591-.003-1.553-1-1.553-.7 0-1.289.408-1.36.948l-.007.11-.008.09a.5.5 0 01-.992-.09c0-1.22 1.122-2.058 2.367-2.058z"></path></svg>
                                            </i> 
                                        </div> 
                                        <div className="popper popover__popper popover__popper--light with-arrow" style={{display: 'none', maxWidth: '320px'}}>
                                            <div className="popover__content">
                                                <div data-v-439649ed="">Tổng giá trị của các đơn hàng có áp dụng Voucher Của Shop đã được xác nhận, bao gồm phí vận chuyển và không bao gồm các khuyến mãi khác, tính trong khoảng thời gian đã chọn.</div>
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                                <p data-v-439649ed="" className="metrics-data">
                                    <span className="metrics-symbol">₫</span>
                                    <span className="metrics-number">0</span>
                                </p> 
                                <p data-v-439649ed="" className="metrics-ratio">so với 7 ngày trước
                                    <span data-v-439649ed="" className="metrics-percent">
                                        <span className="metrics-number">0.00</span>
                                        <span className="metrics-symbol">%</span>
                                    </span>  
                                </p>
                            </div>
                            
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
                                <button data-v-6b00c90e="" type="button" className="btn-new button button--primary button--large">
                                    <i className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8.48176704,1.5 C8.75790942,1.5 8.98176704,1.72385763 8.98176704,2 L8.981,7.997 L15,7.99797574 C15.2761424,7.99797574 15.5,8.22183336 15.5,8.49797574 C15.5,8.77411811 15.2761424,8.99797574 15,8.99797574 L8.981,8.997 L8.98176704,15 C8.98176704,15.2761424 8.75790942,15.5 8.48176704,15.5 C8.20562467,15.5 7.98176704,15.2761424 7.98176704,15 L7.981,8.997 L2,8.99797574 C1.72385763,8.99797574 1.5,8.77411811 1.5,8.49797574 C1.5,8.22183336 1.72385763,7.99797574 2,7.99797574 L7.981,7.997 L7.98176704,2 C7.98176704,1.72385763 8.20562467,1.5 8.48176704,1.5 Z"></path></svg>
                                    </i>
                                    <span>Tạo</span>
                                </button>
                            </div>
                        </div>
                        <div data-v-439649ed="" className="landing-page-content aguth_iEwtiEw1ejuP3Yg">
                            <div className="tabs tabs-line tabs-normal tabs-top landing-page-tab">
                                <div className="tabs__nav">  
                                    <div className="tabs__nav-warp">
                                        <div className="tabs__nav-tabs" style={{transform: 'translateX(0px)'}}>
                                            <div className="tabs__nav-tab active" style={{whiteSpace: 'normal'}}>Tất cả </div>
                                            <div className="tabs__nav-tab" style={{whiteSpace: 'normal'}}>Đang diễn ra </div>
                                            <div className="tabs__nav-tab" style={{whiteSpace: 'normal'}}>Sắp diễn ra </div>
                                            <div className="tabs__nav-tab" style={{whiteSpace: 'normal'}}>Đã kết thúc </div>
                                        </div> 
                                        <div className="tabs__ink-bar" style={{width: '72px', transform: 'translateX(0px)'}}></div>
                                    </div> 
                                </div> 
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