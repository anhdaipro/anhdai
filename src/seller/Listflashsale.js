import React, {useState,useCallback,useEffect} from 'react'
import {formatter,timepromotion} from "../constants"
import {useNavigate} from 'react-router-dom'
import {listflashsaleshopURL,} from "../urls"
import axios from 'axios'
import { headers } from '../actions/auth'
const Listflashseleshop=()=>{
    const [listflashsale,setFlashsale]=useState([])
    const [loading,setLoading]=useState(true)
    const navite=useNavigate()
    useEffect(()=>{
        axios.get(listflashsaleshopURL,headers)
        .then(res=>{
            setFlashsale(res.data)
        })
    },[])

    const setdetail=(item)=>{
        navite(`/vendor/bundle/${item.id}`)
    }
    return(
        <>

                <div data-v-6b00c90e="" data-v-4d2c3cc3="" className="bundle-list-page"> 
                    <div className="wrapper">
                        <p data-v-771d39f6="" className="list-title">flashsale Khuyến Mãi</p>
                        <div data-v-439649ed="" data-v-b811fefc="" data-v-6b00c90e="" className="metrics-dashboard flashsale-metrics-dashboard card"> 
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
                                                        <div data-v-439649ed="">Tổng giá trị của các đơn hàng có áp dụng flashsale Của Shop đã được xác nhận, bao gồm phí vận chuyển và không bao gồm các khuyến mãi khác, tính trong khoảng thời gian đã chọn.</div>
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
                                        <button onClick={()=>navite('/marketing/flash-sale/new')} data-v-6b00c90e="" type="button" className="btn-new button button--primary button--large">
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
                                    <div data-v-771d39f6="" className="search-bar landing-page-filter">
                                        <div data-v-40673d96="" data-v-771d39f6="" className="promotion-search">
                                            <div data-v-40673d96="" className="custom-input-group">
                                                <div data-v-40673d96="" className="search-label">Tìm kiếm</div> 
                                                <div data-v-40673d96="" className="input-group search-type">
                                                    <span className="input-group__prepend" style={{width: '160px'}}>
                                                        <div data-v-40673d96="" className="select">
                                                            <div tabindex="0" className="selector selector--normal"> 
                                                                <div className="selector__inner line-clamp--1">Tên chương trình</div> 
                                                                <div className="selector__suffix"> 
                                                                    <i className="selector__suffix-icon icon">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M8,9.18933983 L4.03033009,5.21966991 C3.73743687,4.9267767 3.26256313,4.9267767 2.96966991,5.21966991 C2.6767767,5.51256313 2.6767767,5.98743687 2.96966991,6.28033009 L7.46966991,10.7803301 C7.76256313,11.0732233 8.23743687,11.0732233 8.53033009,10.7803301 L13.0303301,6.28033009 C13.3232233,5.98743687 13.3232233,5.51256313 13.0303301,5.21966991 C12.7374369,4.9267767 12.2625631,4.9267767 11.9696699,5.21966991 L8,9.18933983 Z"></path></svg>
                                                                    </i>
                                                                </div>
                                                            </div> 
                                                            <div className="popper" style={{display: 'none'}}> 
                                                                <div className="select__menu" style={{maxWidth: '440px', maxHeight: '218px'}}>
                                                                    <div className="scrollbar">
                                                                        <div className="scrollbar__wrapper">
                                                                            <div className="scrollbar__bar vertical">
                                                                                <div className="scrollbar__thumb" style={{top: '0px', height: '0px'}}></div>
                                                                            </div>  
                                                                            <div className="scrollbar__content" style={{position: 'relative'}}>
                                                                                <div className="select__options">
                                                                                    <div data-v-40673d96="" className="option selected">Tên chương trình </div>
                                                                                    <div data-v-40673d96="" className="option">Tên sản phẩm </div>
                                                                                    <div data-v-40673d96="" className="option">Mã sản phẩm </div>
                                                                                </div>
                                                                                
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div> 
                                                                <p className="select__filter-empty" style={{display: 'none'}}></p> 
                                                            </div>
                                                        </div>
                                                    </span> 
                                                    <span className="input-group__append">
                                                        <div data-v-40673d96="" className="input search-input">
                                                            <div className="input__inner input__inner--normal"> 
                                                                <input type="text" placeholder=" " resize="vertical" rows="2" minrows="2" restrictiontype="value" max="Infinity" min="-Infinity" className="input__input"/> 
                                                            </div>
                                                        </div>
                                                    </span>
                                                </div>
                                            </div> 
                                            <div data-v-40673d96="" className="custom-input-group">
                                                <div data-v-40673d96="" className="search-label">Thời gian khuyến mãi
                                                    <div data-v-40673d96="" className="action-btns">
                                                        <button data-v-40673d96="" type="button" className="button button--primary button--normal">
                                                            <span>Tìm</span>
                                                        </button> 
                                                        <button data-v-40673d96="" type="button" className="button button--normal">
                                                            <span>Nhập Lại</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div data-v-771d39f6="" className="landing-page-filter-hints">
                                        Có tất cả <em data-v-771d39f6="" place="count">8</em> flashsale Khuyến Mãi
                                    </div>
                                    <div data-v-439649ed="" className="table list-table">
                                        <div className="table__header-container" style={{position: 'sticky', top: '56px', zIndex: 2}}> 
                                            <div className="table__main-header">
                                                <table cellspacing="0" cellpadding="0" border="0" className="table__header" style={{width: '1214px'}}>
                                                    <colgroup>
                                                        <col width="230"/>
                                                        <col width="218"/>
                                                        <col width="185"/>
                                                        <col width="185"/>
                                                        <col width="155"/>
                                                        <col width="125"/>
                                                        <col width="116"/>

                                                    </colgroup>
                                                    <thead>
                                                        <tr>
                                                            <th colspan="1" rowspan="1" className="">
                                                                <div className="table__cell first-cell">
                                                                    <span className="table__cell-label">Khung giờ</span>
                                                                </div>
                                                            </th>
                                                            <th colspan="1" rowspan="1" className="">
                                                                <div className="table__cell">
                                                                    <span className="table__cell-label">Sản Phẩm</span>
                                                                </div>
                                                            </th>
                                                            <th colspan="1" rowspan="1" className="">
                                                                <div className="table__cell">
                                                                    <span className="table__cell-label">
                                                                        <div data-v-198e0541="" className="column-header reminder-number-header">Lượt Người mua đặt Nhắc nhở</div>
                                                                    </span>
                                                                </div>
                                                            </th>
                                                            <th colspan="1" rowspan="1" className="">
                                                                <div className="table__cell">
                                                                    <span className="table__cell-label">
                                                                        <div data-v-198e0541="" className="column-header reminder-number-header">Lượt nhấp chuột/xem</div>
                                                                    </span>
                                                                </div>
                                                            </th>
                                                            <th colspan="1" rowspan="1" className="">
                                                                <div className="table__cell">
                                                                    <span className="table__cell-label">Trạng thái</span>
                                                                </div>
                                                            </th>
                                                            <th colspan="1" rowspan="1" className="">
                                                                <div className="table__cell">
                                                                    <span className="table__cell-label">Bật/Tắt</span>
                                                                </div>
                                                            </th>
                                                            <th colspan="1" rowspan="1" className="">
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
                                                                    <col width="230"/>
                                                                        <col width="218"/>
                                                                        <col width="185"/>
                                                                        <col width="185"/>
                                                                        <col width="155"/>
                                                                        <col width="125"/>
                                                                        <col width="116"/>
                                                                    </colgroup>
                                                                    <tbody>
                                                                        {listflashsale.map(flashsale=>
                                                                        <tr className="table__row valign-top landing-row">
                                                                            <td className="is-first">
                                                                                <div className="table__cell first-cell">
                                                                                    <div data-v-198e0541="" className="time-slot">{(`0${new Date(flashsale.valid_from).getHours()}`).slice(-2)}:{(`0${new Date(flashsale.valid_from).getMinutes()}`).slice(-2)} {timepromotion(flashsale.valid_to)}</div>
                                                                                </div>
                                                                            </td>
                                                                            <td className="">
                                                                                <div className="table__cell">
                                                                                    <div data-v-198e0541="" className="products">
                                                                                        <div data-v-198e0541="">Bật Flash Sale
                                                                                            <span data-v-198e0541="" className="added-number">0</span>
                                                                                        </div> 
                                                                                        <div data-v-198e0541="" className="available">Số sản phẩm tham gia {flashsale.list_product.length}</div>
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                            <td className="">
                                                                                <div className="table__cell">
                                                                                    <div data-v-198e0541="" className="reminder">
                                                                                        <div data-v-198e0541="" className="reminder-number">-</div>
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                            <td className="">
                                                                                <div className="table__cell">
                                                                                    <div data-v-198e0541="" className="reminder">
                                                                                        <div data-v-198e0541="" className="reminder-number">-</div>
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                            <td className="">
                                                                                <div className="table__cell">
                                                                                    <div data-v-6b00c90e="" className={`tag tag__information tag--normal ${new Date()>new Date(flashsale.valid_to)?'invalid':new Date()< new Date(flashsale.valid_from)?'default':''}`}>{new Date()>new Date(flashsale.valid_to)?'Đã kết thúc':new Date()< new Date(flashsale.valid_from)?'Sắp diễn ra':'Đang diễn ra'}</div> 
                                                                                </div>
                                                                            </td>                                                                           
                                                                            <td className="">
                                                                                <div className="table__cell">
                                                                                    <div data-v-198e0541="" className="enable-disable-status status-enable">
                                                                                        <div data-v-198e0541="" className="popover popover--light">
                                                                                            <div className="popover__ref">
                                                                                                <div data-v-198e0541="" className="switch switch--open switch--normal switch--disabled"></div>
                                                                                            </div> 
                                                                                            <div className="popper popover__popper popover__popper--light with-arrow" style="display: none; max-width: 320px;">
                                                                                                <div className="popover__content">Shop bạn chưa đủ điều kiện để tạo chương trình Flash Sale riêng của Shop.</div>
                                                                                            </div>
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
                                                                                                    <button onClick={()=>setdetail(flashsale)} type="button" className="button button--link button--normal">
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
                </div>
        </>
    )
}

export default Listflashseleshop