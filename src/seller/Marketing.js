import axios from 'axios';
import Navbar from "./Navbar"
import {Link,useNavigate} from 'react-router-dom'
import Sidebamenu from "./Sidebar-menu"
import React, {useState, useEffect,useCallback} from 'react'
  
const Marketing=()=>{
    const [state,setState]=useState({promotion_activities:[
    {name:'Mã Giảm Giá Của Shop',info:'Công cụ tăng đơn hàng bằng cách tạo mã giảm giá tặng cho người mua',url:'/marketing/vouchers/list',new:false},
    {name:'Chương Trình Của Shop',info:'Công cụ tăng đơn hàng bằng cách tạo chương trình giảm giá',url:'/marketing/discount/list',new:false},
    {name:'Combo Khuyến Mãi',info:'Tạo Combo Khuyến Mãi để tăng giá trị đơn hàng trên mỗi Người mua',url:'/marketing/bundle/list',new:false},
    {name:'Mua Kèm Deal Sốc',info:'Công cụ giúp tăng đơn hàng bằng cách tạo các Deal Sốc',url:'/marketing/add-on-deal/list',new:false},
    {name:'Flash Sale Của Shop',info:'ông cụ giúp tăng doanh số bằng cách tạo khuyến mãi khủng trong các khung giờ nhất định',url:'/marketing/shop-flash-sale/list',new:false},
    {name:'Xu Của Shop',info:'Dùng Xu của Shop làm phần thưởng thu hút Người mua tham gia các hoạt động của Shop',url:'/marketing/vouchers',new:false},
    ],buyer_engagement:[
    {name:'Giải thưởng của shop',info:'Thu hút Người mua ghé thăm và mua sắm nhiều hơn tại shop của bạn nhờ các Game vui nhộn với giải thưởng hấp dẫn',url:'/marketing/shop-game/list',new:false},
    {name:'Ưu Đãi Follower',info:'Khuyến khích người mua theo dõi Shop bằng cách tặng voucher cho Người theo dõi mới',url:'/marketing/follow-prize/list',new:false},
    {name:'Quảng cáo Shopee',info:'Tăng mức độ hiển thị sản phẩm, thúc đẩy doanh số bán hàng',url:'/marketing/vouchers',new:false},
   ],increase_traffic:[{name:'Mã Giảm Giá Của Shop',info:'Công cụ tăng đơn hàng bằng cách tạo mã giảm giá tặng cho người mua',url:'/marketing/vouchers',new:false},
   {name:'Chương Trình Của Shop',info:'Công cụ tăng đơn hàng bằng cách tạo chương trình giảm giá',url:'/marketing/vouchers',new:false},
   {name:'Combo Khuyến Mãi',info:'Tạo Combo Khuyến Mãi để tăng giá trị đơn hàng trên mỗi Người mua',url:'/marketing/vouchers',new:false}]})
   const [loading,setLoading]=useState(true)
    return(
        <>
            <div id="app">
                <Navbar/>
                <div className="app-content">
                    <Sidebamenu/>
                    <div className="page-container"> 
                        {loading?
                        <div className="page-content-wrapper">
                            <div data-v-cf2572e4="" className="marketing-home-page">
                                <div data-v-28c1a2fc="" data-v-cf2572e4="" className="user-guide-wrapper"> 
                                    <div data-v-cf2572e4="" data-v-28c1a2fc="" className="card">
                                    <div data-v-cf2572e4="" data-v-28c1a2fc="" className="title">Chương Trình Của Sho</div> 
                                    <div data-v-cf2572e4="" data-v-28c1a2fc="" className="events">
                                        <div data-v-cf2572e4="" data-v-28c1a2fc="" className="carousel">
                                            <div data-v-cf2572e4="" data-v-28c1a2fc="" className="sub-title">Chương Trình Mới</div> 
                                            <div data-v-cf2572e4="" className="pagination" data-v-28c1a2fc="">
                                                <div className="pager pagination__part">
                                                    <button type="button" disabled="disabled" className="button button--small button--frameless button--block disabled pager__button-prev">
                                                        <i className="icon">
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M6.81066017,8 L10.7803301,4.03033009 C11.0732233,3.73743687 11.0732233,3.26256313 10.7803301,2.96966991 C10.4874369,2.6767767 10.0125631,2.6767767 9.71966991,2.96966991 L5.21966991,7.46966991 C4.9267767,7.76256313 4.9267767,8.23743687 5.21966991,8.53033009 L9.71966991,13.0303301 C10.0125631,13.3232233 10.4874369,13.3232233 10.7803301,13.0303301 C11.0732233,12.7374369 11.0732233,12.2625631 10.7803301,11.9696699 L6.81066017,8 Z"></path></svg>
                                                        </i>
                                                    </button>  
                                                    <div className="pager__pages pager__pages--simple">
                                                        <span className="pager__current">1</span> 
                                                        <span className="pager__split">/</span> 
                                                        <span className="pager__total">3</span>
                                                    </div> 
                                                    <button type="button" className="button button--small button--frameless button--block pager__button-next">
                                                        <i className="icon">
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M9.18933983,8 L5.21966991,11.9696699 C4.9267767,12.2625631 4.9267767,12.7374369 5.21966991,13.0303301 C5.51256313,13.3232233 5.98743687,13.3232233 6.28033009,13.0303301 L10.7803301,8.53033009 C11.0732233,8.23743687 11.0732233,7.76256313 10.7803301,7.46966991 L6.28033009,2.96966991 C5.98743687,2.6767767 5.51256313,2.6767767 5.21966991,2.96966991 C4.9267767,3.26256313 4.9267767,3.73743687 5.21966991,4.03033009 L9.18933983,8 Z"></path></svg>
                                                        </i>
                                                    </button>
                                                </div>
                                            </div> 
                                            <div data-v-302d501c="" data-v-cf2572e4="" className="nomination-carousel" data-v-28c1a2fc="" style={{transform: 'translateX(0px)'}}>
                                                <div data-v-6467d0b6="" data-v-302d501c="" className="nomination-card">
                                                    <div data-v-6467d0b6="" className="banner"> 
                                                    <img data-v-6467d0b6="" src="https://cf.shopee.vn/file/b7d56b2cf7f8b0e02f7fb9effdd3dd0d"/> 
                                                    <div data-v-6467d0b6="" className="mask"></div> 
                                                    <div data-v-6467d0b6="" className="tag tag tag__campaign tag--normal default">Đăng Ký Sản Phẩm</div>
                                                </div> 
                                                <div data-v-6467d0b6="" className="title">[SALE THỜI TRANG]  | [ĐỒNG GIÁ] - [0h00 22.04.2022 – 23h59 22.04.2022]</div>
                                            </div>
                                            <div data-v-6467d0b6="" data-v-302d501c="" className="nomination-card">
                                                <div data-v-6467d0b6="" className="banner"> 
                                                <img data-v-6467d0b6="" src="https://cf.shopee.vn/file/6924f848cf044dde75cf108fe517effd"/> 
                                                <div data-v-6467d0b6="" className="mask"></div> 
                                                <div data-v-6467d0b6="" className="tag tag tag__campaign tag--normal default">Đăng Ký Sản Phẩm</div>
                                            </div> 
                                            <div data-v-6467d0b6="" className="title">[THỜI TRANG] - [SALE CUỐI THÁNG] - [0H00' - 23H59' 23.04.22]</div>
                                            </div>
                                            <div data-v-6467d0b6="" data-v-302d501c="" className="nomination-card">
                                                <div data-v-6467d0b6="" className="banner"> 
                                                <img data-v-6467d0b6="" src="https://cf.shopee.vn/file/805f145e058a240f84e5e98ef5c65723"/> <div data-v-6467d0b6="" className="mask"></div> <div data-v-6467d0b6="" className="tag tag tag__campaign tag--normal default">
                                                Đăng Ký Sản Phẩm
                                                </div></div> <div data-v-6467d0b6="" className="title">
                                                SIÊU SALE ĐỜI SỐNG - ĐÓN HÈ RỰC LỬA (9-14/5)
                                            </div></div><div data-v-6467d0b6="" data-v-302d501c="" className="nomination-card"><div data-v-6467d0b6="" className="banner"> <img data-v-6467d0b6="" src="https://cf.shopee.vn/file/9712a09747b2ac017e4df9814cbde679"/> <div data-v-6467d0b6="" className="mask"></div> <div data-v-6467d0b6="" className="tag tag tag__campaign tag--normal default">
                                                Đăng Ký Sản Phẩm
                                                </div></div> <div data-v-6467d0b6="" className="title">
                                                [ĐỜI SỐNG - SALE CUỐI THÁNG LƯƠNG VỀ] Deal hot từ 99K
                                            </div></div><div data-v-6467d0b6="" data-v-302d501c="" className="nomination-card"><div data-v-6467d0b6="" className="banner"> <img data-v-6467d0b6="" src="https://cf.shopee.vn/file/ab4ae589f9515f63a09603546200bcd1"/> <div data-v-6467d0b6="" className="mask"></div> <div data-v-6467d0b6="" className="tag tag tag__campaign tag--normal default">
                                                Đăng Ký Sản Phẩm
                                                </div></div> <div data-v-6467d0b6="" className="title">
                                                Uyen LS - test
                                            </div></div><div data-v-6467d0b6="" data-v-302d501c="" className="nomination-card"><div data-v-6467d0b6="" className="banner"> <img data-v-6467d0b6="" src="https://cf.shopee.vn/file/3505b6dd3a26198043f7934dae6cc5c8"/> <div data-v-6467d0b6="" className="mask"></div> <div data-v-6467d0b6="" className="tag tag tag__campaign tag--normal default">
                                                Đăng Ký Sản Phẩm
                                                </div></div> <div data-v-6467d0b6="" className="title">
                                                        NGÀNH HÀNG THỜI TRANG - SIÊU HỘI HOÀN XU - [00:00 05.05.2022 - 23:59 05.05.2022]
                                                </div></div><div data-v-6467d0b6="" data-v-302d501c="" className="nomination-card"><div data-v-6467d0b6="" className="banner"> <img data-v-6467d0b6="" src="https://cf.shopee.vn/file/67a15b9cd87be449ca8ec5e10d0ed647"/> <div data-v-6467d0b6="" className="mask"></div> <div data-v-6467d0b6="" className="tag tag tag__campaign tag--normal default">
                                                    Đăng Ký Sản Phẩm
                                                    </div></div> <div data-v-6467d0b6="" className="title">
                                                    NGÀNH HÀNG THỜI TRANG - SIÊU SALE CUỐI THÁNG - [00:00 25.04.2022 - 23:59 25.04.2022]
                                                </div></div><div data-v-6467d0b6="" data-v-302d501c="" className="nomination-card"><div data-v-6467d0b6="" className="banner"> <img data-v-6467d0b6="" src="https://cf.shopee.vn/file/a8beb7641b50c4220975d3ec21174057"/> <div data-v-6467d0b6="" className="mask"></div> <div data-v-6467d0b6="" className="tag tag tag__campaign tag--normal default">
                                                    Đăng Ký Sản Phẩm
                                                    </div></div> <div data-v-6467d0b6="" className="title">
                                                    [PHONG CÁCH SỐNG] DEAL GIÁ RẺ TỪ 1K 15.04 - 21.04
                                                    </div></div><div data-v-6467d0b6="" data-v-302d501c="" className="nomination-card"><div data-v-6467d0b6="" className="banner"> <img data-v-6467d0b6="" src="https://cf.shopee.vn/file/fbb301092e8f8fbe90bd9c89b2a5de88"/> <div data-v-6467d0b6="" className="mask"></div> <div data-v-6467d0b6="" className="tag tag tag__campaign tag--normal default">
                                                        Đăng Ký Sản Phẩm
                                                        </div></div> <div data-v-6467d0b6="" className="title">
                                                        [NGÀNH HÀNG THÚ CƯNG] [THÁNG 4/2022] ĐẠI TIỆC THÚ CƯNG THÁNG 4
                                                        </div></div></div></div> <div data-v-cf2572e4="" data-v-28c1a2fc="" className="marketing-cards-wrapper"><div data-v-cf2572e4="" data-v-28c1a2fc="" className="sub-title">
                                                                Đăng ký tham gia Chương trình của Shopee
                                                            </div> <div data-v-cf2572e4="" data-v-28c1a2fc="" className="marketing-cards"><div data-v-1dc6fe85="" data-v-cf2572e4="" className="marketing-card" data-v-28c1a2fc=""><div data-v-1dc6fe85="" className="icon-wrapper events">  <i data-v-1dc6fe85="" className="icon icon"><svg viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg"><path d="M15.573 35.133l.023-.133.011.195.02.212.034.259c.064.413.189.915.433 1.18.21.227.663.326.907.342l-.054.01-.088.027c-.176.06-.491.215-.797.607-.071.09-.128.303-.176.578l-.045.294-.04.321-.053.54-.092 1.048-.021.18-.022.129c-.01.05-.022.078-.034.078l-.066-.624-.098-.8-.075-.53-.085-.514-.03-.16-.061-.297a5.562 5.562 0 0 0-.032-.132c-.069-.27-.326-.427-.62-.554l-.504-.198.065.004.12-.003c.216-.014.574-.083.872-.345.114-.1.225-.432.315-.786l.072-.305.121-.623zM27.984 17c2.579 0 4.694 2.337 4.906 5.312l.013.237h4.632c.21 0 .385.155.421.36l.007.08-.728 15.086c-.083.995-.832 1.808-1.78 1.911l-.15.01H20.513c-.949-.037-1.659-.788-1.817-1.747l-.02-.162-.67-15.082.007-.095a.435.435 0 0 1 .337-.353l.076-.008h4.639C23.18 19.462 25.338 17 27.984 17zm-.054 9c-1.887.008-3.397 1.138-3.525 2.672-.084 1.111.506 2.014 1.729 2.68l.108.053.16.069.277.111.496.189.515.185.446.149.333.102c1.404.456 2.082 1.189 1.92 1.999-.156.776-1.066 1.302-2.373 1.318a4.916 4.916 0 0 1-2.292-.686l-.232-.143-.357-.25-.07-.044a.422.422 0 0 0-.432.014l-.06.05-.066.08-.411.562-.047.074c-.087.17-.022.33.137.454.343.267.789.553 1.097.7.84.4 1.753.62 2.721.655a5.07 5.07 0 0 0 2.027-.325c1.096-.436 1.811-1.314 1.954-2.407.232-1.778-.987-2.9-4.043-3.812-1.344-.43-1.933-.957-1.92-1.65.05-.764.845-1.349 1.938-1.369.9.017 1.75.245 2.534.734.192.113.386.104.525-.033l.056-.066.368-.546.039-.072c.074-.172.021-.366-.17-.496l-.06-.039-.157-.092-.093-.05-.27-.137a5.697 5.697 0 0 0-.38-.17A6.6 6.6 0 0 0 27.93 26zm.049-7.55c-1.876 0-3.416 1.708-3.58 3.887l-.012.22h7.184c-.074-2.283-1.654-4.107-3.592-4.107zm11.601-3.317l.023-.133.01.195.02.212.035.259c.063.413.189.915.433 1.18.21.227.663.326.907.342l-.09.029-.138.052c-.211.088-.517.252-.679.51-.072.114-.133.373-.186.697l-.05.342-.066.556-.123 1.187-.03.232c-.02.13-.04.207-.06.207l-.046-.36-.105-.762-.093-.62-.104-.626c-.055-.303-.111-.583-.166-.8-.069-.27-.3-.383-.574-.476l-.368-.12-.116-.045.065.004.12-.003c.216-.014.574-.083.873-.345.114-.1.224-.432.314-.786l.072-.305.122-.623z" fillRule="evenodd"></path></svg></i></div> <div data-v-1dc6fe85="" className="info"><div data-v-1dc6fe85="" className="name">
                                                            Đăng Ký Sản Phẩm
                                                            </div> <div data-v-1dc6fe85="" className="desc">
                                                            Tham gia các chương trình khuyến mãi để tiếp cận gần hơn với người mua
                                                            </div> </div></div><div data-v-1dc6fe85="" data-v-cf2572e4="" className="marketing-card" data-v-28c1a2fc=""><div data-v-1dc6fe85="" className="icon-wrapper events">  <i data-v-1dc6fe85="" className="icon icon"><svg viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg"><path opacity=".96" fillRule="evenodd" clipRule="evenodd" d="M22 19v3.25a.75.75 0 0 0 1.493.102l.007-.102V19H39a2 2 0 0 1 2 2v3.4c-1.972 0-3.571 1.612-3.571 3.6 0 1.924 1.497 3.496 3.381 3.595l.19.005V35a2 2 0 0 1-2 2H23.5v-3.25a.75.75 0 0 0-.648-.743L22.75 33a.75.75 0 0 0-.743.648L22 33.75V37h-4a2 2 0 0 1-2-2v-3.4c1.972 0 3.571-1.612 3.571-3.6S17.972 24.4 16 24.4V21a2 2 0 0 1 2-2h4zm8.317 5.75c-1.293.027-2.321.839-2.39 1.929-.045.793.38 1.431 1.226 1.88l.228.099.329.125.543.188.303.093c.906.252 1.333.669 1.255 1.114-.073.409-.573.71-1.327.732a2.94 2.94 0 0 1-1.462-.446l-.28-.19c-.238-.155-.472-.13-.637.099l-.268.387c-.147.203-.107.407.096.57.233.179.48.333.74.463a4.494 4.494 0 0 0 1.822.416c.463.013.927-.07 1.357-.244.755-.32 1.242-.949 1.327-1.72.139-1.257-.712-2.031-2.75-2.611-.787-.24-1.115-.524-1.115-.878.019-.389.44-.71 1.048-.732a2.785 2.785 0 0 1 1.488.426c.242.14.444.094.601-.107l.276-.38c.137-.244.095-.446-.14-.603a4.343 4.343 0 0 0-.651-.32 4.333 4.333 0 0 0-1.62-.29zM22.75 25a.75.75 0 0 0-.743.648L22 25.75v4.5a.75.75 0 0 0 1.493.102l.007-.102v-4.5a.75.75 0 0 0-.75-.75z"></path></svg></i></div> <div data-v-1dc6fe85="" className="info"><div data-v-1dc6fe85="" className="name">
                                                            Đăng Ký Mã Giảm Giá
                                                                </div> 
                                                                <div data-v-1dc6fe85="" className="desc">
                                                                Tăng lượt sử dụng Mã giảm giá thông qua Chương trình của Shopee
                                                            </div> 
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> 
                                    <div data-v-cf2572e4="" data-v-28c1a2fc="" className="card marketing-tools">
                                        <h2 data-v-cf2572e4="" data-v-28c1a2fc="" className="title">Công Cụ Marketing</h2> 
                                        <div data-v-cf2572e4="" data-v-28c1a2fc="" className="search-products">
                                            <i data-v-cf2572e4="" className="icon icon" data-v-28c1a2fc="">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M6.99383468,0.993751221 C10.3075432,0.993751221 12.9938347,3.68004272 12.9938347,6.99375122 C12.9938347,8.46891634 12.4614742,9.81974201 11.5783922,10.8645893 L14.8572322,14.1431825 C15.0524943,14.3384447 15.0524943,14.6550272 14.8572322,14.8502893 C14.6836658,15.0238557 14.4142414,15.0431408 14.2193733,14.9081448 L14.1501254,14.8502893 L10.8716694,11.5723862 C9.82585916,12.45901 8.47229467,12.9937512 6.99383468,12.9937512 C3.68012618,12.9937512 0.993834675,10.3074597 0.993834675,6.99375122 C0.993834675,3.68004272 3.68012618,0.993751221 6.99383468,0.993751221 Z M6.99383468,1.99375122 C4.23241093,1.99375122 1.99383468,4.23232747 1.99383468,6.99375122 C1.99383468,9.75517497 4.23241093,11.9937512 6.99383468,11.9937512 C9.75525842,11.9937512 11.9938347,9.75517497 11.9938347,6.99375122 C11.9938347,4.23232747 9.75525842,1.99375122 6.99383468,1.99375122 Z"></path></svg>
                                            </i> 
                                            <span data-v-cf2572e4="" data-v-28c1a2fc="" className="desc">Xem chương trình khuyến mãi của shop</span>
                                        </div>  
                                        <div data-v-cf2572e4="" data-v-28c1a2fc="" className="promotion-activities">
                                            <div data-v-cf2572e4="" data-v-28c1a2fc="" className="sub-title">Tăng doanh số bằng các Công cụ Marketing</div> 
                                            <div data-v-cf2572e4="" data-v-28c1a2fc="" className="marketing-cards">
                                            {state.promotion_activities.map(item=>
                                            <div onClick={()=>window.open(item.url)} data-v-1dc6fe85="" data-v-cf2572e4="" className="marketing-card" data-v-28c1a2fc="">
                                                <div data-v-1dc6fe85="" className="icon-wrapper promotion-activities">
                                                    {item.new?
                                                    <div data-v-1dc6fe85="" className="ribbon badge-x">
                                                        <sup className="badge-x__sup badge-x__sup--new">
                                                            <span>New</span>
                                                        </sup>
                                                    </div>  :''}
                                                    <i data-v-1dc6fe85="" className="icon icon">
                                                        <svg viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg"><path d="M39 32v7a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-7h4zm-5.5 0v6a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2v-6h16zm-17.465-5.803v1.785A1.448 1.448 0 0 0 15.61 29c0 .828.714 1.5 1.594 1.5h.295V32h-.333C15.417 32 14 30.657 14 29c0-1.28.845-2.371 2.035-2.803zm24.43 0c1.19.432 2.035 1.524 2.035 2.803 0 1.657-1.418 3-3.167 3H39v-1.5h.517c.88 0 1.594-.672 1.594-1.5 0-.494-.254-.933-.646-1.206v-1.597zM38 23a1 1 0 0 1 1 1v6.5h-4V24a1 1 0 0 1 1-1h2zm-12.5-7a4 4 0 0 1 4 4h2a2 2 0 0 1 2 2v8.5h-16V22a2 2 0 0 1 2-2h2a4 4 0 0 1 4-4zm0 1.5A2.5 2.5 0 0 0 23 20h5a2.5 2.5 0 0 0-2.5-2.5z" fillRule="nonzero"></path></svg>
                                                    </i>
                                                </div> 
                                                <div data-v-1dc6fe85="" className="info">
                                                    <div data-v-1dc6fe85="" className="name">{item.name}</div> 
                                                    <div data-v-1dc6fe85="" className="desc">{item.info}</div> 
                                                </div>
                                            </div>
                                            )}
                                            </div>
                                        </div>
                                        <div data-v-cf2572e4="" data-v-28c1a2fc="" className="buyer-engagement">
                                            <div data-v-cf2572e4="" data-v-28c1a2fc="" className="sub-title">Tiếp cận với nhiều người mua hơn</div> 
                                            <div data-v-cf2572e4="" data-v-28c1a2fc="" className="marketing-cards">
                                            {state.buyer_engagement.map(item=>
                                                <div onClick={()=>window.open(item.url)} data-v-1dc6fe85="" data-v-cf2572e4="" className="marketing-card" data-v-28c1a2fc="">
                                                    <div data-v-1dc6fe85="" className="icon-wrapper buyer-engagement">
                                                        {item.new?
                                                        <div data-v-1dc6fe85="" className="ribbon badge-x"> 
                                                            <sup className="badge-x__sup badge-x__sup--new">
                                                                <span>New</span>
                                                            </sup>
                                                        </div> :''}
                                                        <i data-v-1dc6fe85="" className="icon icon">
                                                            <svg viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg"><path d="M35.522 18a2 2 0 0 1 1.912 1.413l4.407 14.358.035.13c.486 2.066-.46 3.099-2.835 3.099-2.21 0-4.41-1.422-6.599-4.267a2 2 0 0 0-1.585-.78L28 31.951v.02h-2.956a2 2 0 0 0-1.6.798C21.327 35.59 19.165 37 16.96 37c-2.376 0-3.321-1.033-2.835-3.1l.035-.13 4.407-14.357a2 2 0 0 1 1.749-1.406l.163-.007h15.044zM23 22a.75.75 0 0 0-.743.648l-.007.102v1.5h-1.5a.75.75 0 0 0-.102 1.493l.102.007h1.499l.001 1.5a.75.75 0 0 0 1.493.102l.007-.102-.001-1.5h1.501a.75.75 0 0 0 .102-1.493l-.102-.007h-1.5v-1.5A.75.75 0 0 0 23 22zm10 0a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0 1.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" fillRule="evenodd"></path></svg>
                                                        </i>
                                                    </div> 
                                                    <div data-v-1dc6fe85="" className="info">
                                                        <div data-v-1dc6fe85="" className="name">{item.name}</div> 
                                                        <div data-v-1dc6fe85="" className="desc">{item.info}</div> 
                                                    </div>
                                                </div>
                                            
                                            )}      
                                            </div> 
                                        </div>
                                        <div data-v-cf2572e4="" data-v-28c1a2fc="" className="increase-traffic">
                                            <div data-v-cf2572e4="" data-v-28c1a2fc="" className="sub-title">Tăng lượt truy cập cho shop của bạn</div> 
                                            <div data-v-cf2572e4="" data-v-28c1a2fc="" className="marketing-cards">
                                                {state.increase_traffic.map(item=>
                                            
                                                <div onClick={()=>window.open(item.url)} data-v-1dc6fe85="" data-v-cf2572e4="" className="marketing-card" data-v-28c1a2fc="">
                                                    <div data-v-1dc6fe85="" className="icon-wrapper increase-traffic">
                                                        {item.new?
                                                        <div data-v-1dc6fe85="" className="ribbon badge-x"> 
                                                            <sup className="badge-x__sup badge-x__sup--new">
                                                                <span>New</span>
                                                            </sup>
                                                        </div>  :''}
                                                        <i data-v-1dc6fe85="" className="icon icon">
                                                            <svg viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg"><path d="M38.025 19.473A1.98 1.98 0 0 1 40 21.458v16.557A1.98 1.98 0 0 1 38.025 40H21.431a1.98 1.98 0 0 1-1.975-1.985v-.98h15.472a1.98 1.98 0 0 0 1.975-1.984V19.473h1.122zM33.622 16a1.98 1.98 0 0 1 1.975 1.985v15.723a1.98 1.98 0 0 1-1.975 1.985H17.975A1.98 1.98 0 0 1 16 33.708V17.985A1.98 1.98 0 0 1 17.975 16h15.647zm-8.167 5.096l-.047.075-1.21 2.463-2.704.395a.44.44 0 0 0-.298.679l.057.067 1.957 1.917-.462 2.706a.435.435 0 0 0 .55.494l.082-.033 2.418-1.277 2.419 1.277a.434.434 0 0 0 .638-.382l-.006-.079-.462-2.706 1.957-1.917a.438.438 0 0 0-.165-.728l-.077-.018-2.704-.395-1.21-2.463a.437.437 0 0 0-.674-.137l-.06.062z" fillRule="evenodd"></path></svg>
                                                        </i>
                                                    </div> 
                                                    <div data-v-1dc6fe85="" className="info">
                                                        <div data-v-1dc6fe85="" className="name">{item.name}</div> 
                                                        <div data-v-1dc6fe85="" className="desc">{item.info}</div> 
                                                    </div>
                                                </div>
                                            
                                            )}
                                            </div>
                                        </div>
                                    </div>
                                </div>  
                            </div>
                        </div>
                        :''}
                    </div> 
                </div>       
            </div>
           
        </>
    )
}
export default Marketing