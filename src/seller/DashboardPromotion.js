import axios from "axios"
import { useState,useEffect } from "react"
import { headers } from "../actions/auth"
import { dashboardpromotionURL } from "../urls"
import Navbar from "./Navbar"
import "../css/dashboard.css"
const DashboardPromotion=()=>{
    
    const [time,setTime]=useState('currentday')
    useEffect(()=>{
        (async()=>{
            const res =await axios.get(`${dashboardpromotionURL}?time=currentday`,headers)
            if(time=='currrent_day'){
                const hours=new Date().getHours()
            }
            else if(time=='month'){
                
            }
        })()
        
    },[time])
    return(
        <>
        <Navbar/>
        <div className="datacenter-app">
            <div className="data-center-layout vi">
                <div data-v-4ea51c50 className="top-navbar">
                    <nav data-v-4ea51c50="">
                        <a data-v-4ea51c50="" href="/datacenter/dashboard" class="nav-tab datacenter-dashboard">
                            <span data-v-4ea51c50="" class="text">Tổng quan</span> </a>
                            <a data-v-4ea51c50="" href="/datacenter/products" class="nav-tab datacenter-products"><span data-v-4ea51c50="" class="text">Sản phẩm</span> </a><a data-v-4ea51c50="" href="/datacenter/salesservice" class="nav-tab datacenter-salesservice"><span data-v-4ea51c50="" class="text">Bán hàng và Dịch vụ</span> </a><a data-v-4ea51c50="" href="/datacenter/traffic" class="nav-tab datacenter-traffic"><span data-v-4ea51c50="" class="text">Truy cập</span> </a><a data-v-4ea51c50="" href="/datacenter/marketing" class="router-link-active nav-tab datacenter-marketing"><span data-v-4ea51c50="" class="text">Marketing</span> </a><a data-v-4ea51c50="" href="/datacenter/selling" class="nav-tab datacenter-selling">
                            <span data-v-4ea51c50="" class="text">Quân Sư Bán Hàng</span> 
                            <span data-v-4cf53991="" data-v-4ea51c50="" class="badge-wrapper" style={{marginLeft: '4px'}}>
                                <div data-v-4cf53991="" class="badge-x"> 
                                <sup class="badge-x__sup badge-x__sup--dot"><span>
                                    </span>
                                    </sup>
                                    </div>
                                    </span></a>  
                                    <div data-v-4ea51c50="" class="navbar-right-panel">
                                        <a data-v-4ea51c50="" href="/datacenter/learn" class="learn-more-link normal-learn-more-link mr-16"><i data-v-4ea51c50="" class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M6.50692156,2 C7.08217707,2 7.87390592,2.44054357 8.51774029,2.86712042 C9.60884094,2.258011 10.160514,2 10.5220425,2 L14.0031784,2 C14.5554632,2 15.0031784,2.44771525 15.0031784,3 L15.0031784,12.9195918 C15.0031784,13.4718638 14.5554504,13.9195687 14.0031784,13.9195687 L10.5075199,13.9195687 C10.1708939,13.9195687 8.93829366,14.7893464 8.5109755,14.7893464 C8.08365734,14.7893464 6.9191394,13.9195687 6.51058323,13.9195687 L3.00003214,13.9195687 C2.44772964,13.9196008 2,13.4718712 2,12.9195687 L2,3 C2,2.44771525 2.44771525,2 3,2 L6.50692156,2 Z M14.0031784,3 L10.5220425,3 C10.3944161,3 9.75539186,3.31590418 9,3.743 L9,13.5246778 C9.39284596,13.3133631 9.67116172,13.1714832 9.83494726,13.0990383 C10.0806256,12.9903709 10.2722293,12.9360787 10.5075199,12.9360787 L14.0031784,12.9360902 L14.0031784,3 Z M6.50692156,3 L3,3 L3,12.9213505 L6.59964678,12.922821 C6.88638522,12.9329781 7.08273474,12.9992251 7.51903855,13.2276522 L8,13.4869496 L8,3.723 C7.33510296,3.28246794 6.74282866,3 6.50692156,3 Z"></path></svg>
                            </i>
                        Tìm hiểu thêm
                        </a> 
                        <div data-v-37db921b="" data-v-4ea51c50="" class="live-monitor-container">
                            <a data-v-37db921b="" href="/datacenter/liveboard?ADTAG=mydata" class="live-monitor-btn__normal" target="_blank">
                                <div data-v-145e30cc="" data-v-37db921b="" class="normal">
                                    <i data-v-145e30cc="" class="inline-svg-container icon-normal">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.95 3.72302C22.905 3.52929 22.7849 3.36136 22.6162 3.25615C22.4474 3.15095 22.2437 3.11709 22.05 3.16201L18.1395 4.06801C18.0102 4.09792 17.8911 4.16162 17.7944 4.2526C17.6978 4.34358 17.627 4.45859 17.5893 4.58587C17.5516 4.71316 17.5484 4.84816 17.58 4.9771C17.6116 5.10604 17.6768 5.22428 17.769 5.31976L18.6225 6.20252L14.0625 10.2705L11.6948 8.02802C11.5507 7.89162 11.3584 7.81789 11.16 7.82295C10.9617 7.82801 10.7735 7.91145 10.6365 8.05502L5.55675 13.3815C5.25347 13.3182 4.938 13.3503 4.65371 13.4734C4.36941 13.5966 4.13023 13.8048 3.96902 14.0694C3.80782 14.334 3.7325 14.642 3.75342 14.9511C3.77435 15.2602 3.89048 15.5553 4.08587 15.7957C4.28125 16.0362 4.54631 16.2103 4.84461 16.294C5.14291 16.3777 5.45982 16.367 5.7518 16.2634C6.04378 16.1597 6.2965 15.9682 6.47524 15.7151C6.65398 15.4621 6.74996 15.1598 6.75 14.85C6.75 14.6873 6.71775 14.5343 6.66975 14.388L11.2058 9.63152L13.5315 11.8335C13.668 11.9627 13.848 12.0359 14.036 12.0387C14.2239 12.0415 14.406 11.9736 14.5463 11.8485L19.665 7.28252L20.6378 8.28977C20.7299 8.38522 20.8458 8.4545 20.9735 8.49055C21.1012 8.52659 21.2362 8.52811 21.3647 8.49494C21.4932 8.46177 21.6106 8.3951 21.7049 8.30174C21.7992 8.20838 21.867 8.09166 21.9015 7.96352L22.9433 4.08676C22.9755 3.96793 22.9778 3.84297 22.95 3.72302Z" fill="#EE4D2D"></path><path d="M21.75 10.5577C21.5511 10.5577 21.3603 10.6368 21.2197 10.7774C21.079 10.9181 21 11.1088 21 11.3077V17.25C21 17.4489 20.921 17.6397 20.7803 17.7803C20.6397 17.921 20.4489 18 20.25 18H3.75C3.55109 18 3.36032 17.921 3.21967 17.7803C3.07902 17.6397 3 17.4489 3 17.25V3.75C3 3.55109 3.07902 3.36032 3.21967 3.21967C3.36032 3.07902 3.55109 3 3.75 3H16.1873C16.3862 3 16.5769 2.92098 16.7176 2.78033C16.8582 2.63968 16.9373 2.44891 16.9373 2.25C16.9373 2.05109 16.8582 1.86032 16.7176 1.71967C16.5769 1.57902 16.3862 1.5 16.1873 1.5H3.75C3.15326 1.5 2.58097 1.73705 2.15901 2.15901C1.73705 2.58097 1.5 3.15326 1.5 3.75V17.25C1.5 17.8467 1.73705 18.419 2.15901 18.841C2.58097 19.2629 3.15326 19.5 3.75 19.5H20.25C20.8467 19.5 21.419 19.2629 21.841 18.841C22.2629 18.419 22.5 17.8467 22.5 17.25V11.3077C22.5 11.1088 22.421 10.9181 22.2803 10.7774C22.1397 10.6368 21.9489 10.5577 21.75 10.5577ZM21.375 21H2.625C2.42609 21 2.23532 21.079 2.09467 21.2197C1.95402 21.3603 1.875 21.5511 1.875 21.75C1.875 21.9489 1.95402 22.1397 2.09467 22.2803C2.23532 22.421 2.42609 22.5 2.625 22.5H21.375C21.5739 22.5 21.7647 22.421 21.9053 22.2803C22.046 22.1397 22.125 21.9489 22.125 21.75C22.125 21.5511 22.046 21.3603 21.9053 21.2197C21.7647 21.079 21.5739 21 21.375 21Z" fill="#EE4D2D"></path></svg>
                        </i>
                        Theo dõi Trực tiếp
                        </div>
                        </a>
                        </div>
                        </div>
                    </nav>
                </div>
                <div data-v-4ea51c50 className="app-container clearfix">
                    <nav data-v-221e6f2c="" data-v-4ea51c50="" class="side-navbar">
                        <section data-v-221e6f2c="">
                            <div data-v-221e6f2c="" class="side-navbar-submenu__title">
                                <i data-v-221e6f2c="" class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M7.48867574,1.10398629 C7.75502705,1.10311845 8.01072116,1.20853969 8.19906099,1.39687952 L14.3951832,7.59300171 C14.7857075,7.983526 14.7857075,8.61669098 14.3951832,9.00721527 L8.94630152,14.4560969 C8.55577722,14.8466212 7.92261224,14.8466212 7.53208795,14.4560969 L1.33596576,8.25997475 C1.14762593,8.07163492 1.04220469,7.81594081 1.04307253,7.5495895 L1.06251211,1.62178395 C1.06341324,1.34692251 1.28600875,1.124327 1.56087019,1.12342587 L7.48867574,1.10398629 Z M7.49195421,2.1039863 L2.06087822,2.12179198 L2.04307254,7.55286797 L8.23919473,13.7489902 L13.6880764,8.30010849 L7.49195421,2.1039863 Z M4.54307253,3.10398629 C5.37149966,3.10398629 6.04307253,3.77555917 6.04307253,4.60398629 C6.04307253,5.43241342 5.37149966,6.10398629 4.54307253,6.10398629 C3.71464541,6.10398629 3.04307253,5.43241342 3.04307253,4.60398629 C3.04307253,3.77555917 3.71464541,3.10398629 4.54307253,3.10398629 Z M4.54307253,4.10398629 C4.26693016,4.10398629 4.04307253,4.32784392 4.04307253,4.60398629 C4.04307253,4.88012867 4.26693016,5.10398629 4.54307253,5.10398629 C4.81921491,5.10398629 5.04307253,4.88012867 5.04307253,4.60398629 C5.04307253,4.32784392 4.81921491,4.10398629 4.54307253,4.10398629 Z"></path></svg></i> <span data-v-221e6f2c="">Công cụ Marketing</span> <i data-v-221e6f2c="" class="icon side-navbar-arrow-rotate0"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M8,6.81066017 L11.9696699,10.7803301 C12.2625631,11.0732233 12.7374369,11.0732233 13.0303301,10.7803301 C13.3232233,10.4874369 13.3232233,10.0125631 13.0303301,9.71966991 L8.53033009,5.21966991 C8.23743687,4.9267767 7.76256313,4.9267767 7.46966991,5.21966991 L2.96966991,9.71966991 C2.6767767,10.0125631 2.6767767,10.4874369 2.96966991,10.7803301 C3.26256313,11.0732233 3.73743687,11.0732233 4.03033009,10.7803301 L8,6.81066017 Z"></path></svg></i></div> <ul data-v-221e6f2c="" class="side-navbar-item-list"><li data-v-221e6f2c="" class="side-navbar-item"><span data-v-221e6f2c="" class="name">Chương Trình Khuyến Mãi</span> </li><li data-v-221e6f2c="" class="side-navbar-item"><span data-v-221e6f2c="" class="name">Combo Khuyến Mãi</span> </li><li data-v-221e6f2c="" class="side-navbar-item"><span data-v-221e6f2c="" class="name">Ưu Đãi Follower</span> </li><li data-v-221e6f2c="" class="side-navbar-item router-link-exact-active router-link-active"><span data-v-221e6f2c="" class="name">Voucher</span> </li><li data-v-221e6f2c="" class="side-navbar-item"><span data-v-221e6f2c="" class="name">Flash Sale Của Shop</span> </li><li data-v-221e6f2c="" class="side-navbar-item"><span data-v-221e6f2c="" class="name">Mua Kèm Deal Sốc</span> </li><li data-v-221e6f2c="" class="side-navbar-item"><span data-v-221e6f2c="" class="name">Giải Thưởng Của Shop</span> </li></ul></section><section data-v-221e6f2c=""><div data-v-221e6f2c="" class="side-navbar-submenu__title"><i data-v-221e6f2c="" class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M14,2 C14.5522847,2 15,2.44771525 15,3 L15,13 C15,13.5522847 14.5522847,14 14,14 L2,14 C1.44771525,14 1,13.5522847 1,13 L1,3 C1,2.44771525 1.44771525,2 2,2 L14,2 Z M14,3 L2,3 L2,13 L14,13 L14,3 Z M6.7242519,5.55343151 L10.7242519,7.55343151 C11.0927762,7.73769364 11.0927762,8.26359657 10.7242519,8.4478587 L6.7242519,10.4478587 C6.39180136,10.614084 6.00064511,10.3723361 6.00064511,10.0006451 L6.00064511,6.00064511 C6.00064511,5.6289541 6.39180136,5.38720624 6.7242519,5.55343151 Z M7.00064511,6.8096621 L7.00064511,9.19162811 L9.38261112,8.00064511 L7.00064511,6.8096621 Z"></path></svg></i> <span data-v-221e6f2c="">Công cụ nội dung</span> <i data-v-221e6f2c="" class="icon side-navbar-arrow-rotate0"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M8,6.81066017 L11.9696699,10.7803301 C12.2625631,11.0732233 12.7374369,11.0732233 13.0303301,10.7803301 C13.3232233,10.4874369 13.3232233,10.0125631 13.0303301,9.71966991 L8.53033009,5.21966991 C8.23743687,4.9267767 7.76256313,4.9267767 7.46966991,5.21966991 L2.96966991,9.71966991 C2.6767767,10.0125631 2.6767767,10.4874369 2.96966991,10.7803301 C3.26256313,11.0732233 3.73743687,11.0732233 4.03033009,10.7803301 L8,6.81066017 Z"></path></svg></i></div> <ul data-v-221e6f2c="" class="side-navbar-item-list"><li data-v-221e6f2c="" class="side-navbar-item"><span data-v-221e6f2c="" class="name">Shopee Live</span> 
                            </li>
                            <li data-v-221e6f2c="" class="side-navbar-item"><span data-v-221e6f2c="" class="name">Shopee Feed</span> </li>
                        </ul>
                        </section>
                    </nav>
                    <div style={{marginLeft: '220px'}} className="marketing app-container-body slide-container-body">
                        <div className="clearfix marketing-tools content-container">
                            <div className="voucher content-container">
                                <div fragment="300b60957e" class="sticky"></div>
                                <div className="fixed-time-selector">
                                    <div className="date-export">
                                        <div className="date-period">
                                            <span>Khung Thời Gian</span>
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
export default DashboardPromotion