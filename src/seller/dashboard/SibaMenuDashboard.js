import { Navigate,useNavigate } from "react-router-dom"
import React, {useState,useEffect,useCallback,useRef, useMemo} from 'react'
const listitem=[
    {name:'Chương Trình Khuyến Mãi',url:'/datacenter/marketing/tools/discount'},
    {name:'Combo Khuyến Mãi',url:'/datacenter/marketing/tools/bundle'},
    {name:'Ưu Đãi Follower',url:'/datacenter/marketing/tools/prizet'},
    {name:'Voucher',url:'/datacenter/marketing/tools/voucher'},
    {name:'Flash Sale Của Shop',url:'/datacenter/marketing/tools/flash'},
    {name:'Mua Kèm Deal Sốc',url:'/datacenter/marketing/tools/addon'},
    {name:'Giải Thưởng Của Shop',url:'/datacenter/marketing/tools/game'},
]
const SibaMenu=()=>{
    const navigate=useNavigate()
    const [show,setShow]=useState({content:false,tool:true})
    return (
        <nav data-v-221e6f2c="" data-v-4ea51c50="" className="side-navbar">
            <section onClick={e=>setShow({...show,tool:!show.tool})} data-v-221e6f2c="">
                <div data-v-221e6f2c="" className="side-navbar-submenu__title">
                    <i data-v-221e6f2c="" className="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M7.48867574,1.10398629 C7.75502705,1.10311845 8.01072116,1.20853969 8.19906099,1.39687952 L14.3951832,7.59300171 C14.7857075,7.983526 14.7857075,8.61669098 14.3951832,9.00721527 L8.94630152,14.4560969 C8.55577722,14.8466212 7.92261224,14.8466212 7.53208795,14.4560969 L1.33596576,8.25997475 C1.14762593,8.07163492 1.04220469,7.81594081 1.04307253,7.5495895 L1.06251211,1.62178395 C1.06341324,1.34692251 1.28600875,1.124327 1.56087019,1.12342587 L7.48867574,1.10398629 Z M7.49195421,2.1039863 L2.06087822,2.12179198 L2.04307254,7.55286797 L8.23919473,13.7489902 L13.6880764,8.30010849 L7.49195421,2.1039863 Z M4.54307253,3.10398629 C5.37149966,3.10398629 6.04307253,3.77555917 6.04307253,4.60398629 C6.04307253,5.43241342 5.37149966,6.10398629 4.54307253,6.10398629 C3.71464541,6.10398629 3.04307253,5.43241342 3.04307253,4.60398629 C3.04307253,3.77555917 3.71464541,3.10398629 4.54307253,3.10398629 Z M4.54307253,4.10398629 C4.26693016,4.10398629 4.04307253,4.32784392 4.04307253,4.60398629 C4.04307253,4.88012867 4.26693016,5.10398629 4.54307253,5.10398629 C4.81921491,5.10398629 5.04307253,4.88012867 5.04307253,4.60398629 C5.04307253,4.32784392 4.81921491,4.10398629 4.54307253,4.10398629 Z"></path></svg>
                </i> 
                <span data-v-221e6f2c="">Công cụ Marketing</span> 
                <i data-v-221e6f2c="" className={`icon side-navbar-arrow-rotate${show.tool?0:180}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M8,6.81066017 L11.9696699,10.7803301 C12.2625631,11.0732233 12.7374369,11.0732233 13.0303301,10.7803301 C13.3232233,10.4874369 13.3232233,10.0125631 13.0303301,9.71966991 L8.53033009,5.21966991 C8.23743687,4.9267767 7.76256313,4.9267767 7.46966991,5.21966991 L2.96966991,9.71966991 C2.6767767,10.0125631 2.6767767,10.4874369 2.96966991,10.7803301 C3.26256313,11.0732233 3.73743687,11.0732233 4.03033009,10.7803301 L8,6.81066017 Z"></path></svg>
                </i>
                </div> 
                <ul data-v-221e6f2c="" style={{display:`${show.tool?'':'none'}`}} className="side-navbar-item-list">
                    {listitem.map((item,i)=>
                     <li onClick={e=>navigate(`${item.url}`)} key={i} data-v-221e6f2c="" className="side-navbar-item">
                        <span data-v-221e6f2c="" className="name">{item.name}</span> 
                    </li>
                    )}
                </ul>
            </section>
            <section onClick={e=>setShow({...show,content:!show.content})} data-v-221e6f2c="">
                <div data-v-221e6f2c="" className="side-navbar-submenu__title">
                    <i data-v-221e6f2c="" className="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M14,2 C14.5522847,2 15,2.44771525 15,3 L15,13 C15,13.5522847 14.5522847,14 14,14 L2,14 C1.44771525,14 1,13.5522847 1,13 L1,3 C1,2.44771525 1.44771525,2 2,2 L14,2 Z M14,3 L2,3 L2,13 L14,13 L14,3 Z M6.7242519,5.55343151 L10.7242519,7.55343151 C11.0927762,7.73769364 11.0927762,8.26359657 10.7242519,8.4478587 L6.7242519,10.4478587 C6.39180136,10.614084 6.00064511,10.3723361 6.00064511,10.0006451 L6.00064511,6.00064511 C6.00064511,5.6289541 6.39180136,5.38720624 6.7242519,5.55343151 Z M7.00064511,6.8096621 L7.00064511,9.19162811 L9.38261112,8.00064511 L7.00064511,6.8096621 Z"></path></svg>
                    </i> 
                    <span data-v-221e6f2c="">Công cụ nội dung</span> 
                    <i data-v-221e6f2c="" className={`icon side-navbar-arrow-rotate${show.content?0:180}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M8,6.81066017 L11.9696699,10.7803301 C12.2625631,11.0732233 12.7374369,11.0732233 13.0303301,10.7803301 C13.3232233,10.4874369 13.3232233,10.0125631 13.0303301,9.71966991 L8.53033009,5.21966991 C8.23743687,4.9267767 7.76256313,4.9267767 7.46966991,5.21966991 L2.96966991,9.71966991 C2.6767767,10.0125631 2.6767767,10.4874369 2.96966991,10.7803301 C3.26256313,11.0732233 3.73743687,11.0732233 4.03033009,10.7803301 L8,6.81066017 Z"></path></svg>
                    </i>
                </div> 
                <ul style={{display:`${show.content?'':'none'}`}}  data-v-221e6f2c="" className="side-navbar-item-list">
                    <li data-v-221e6f2c="" className="side-navbar-item">
                        <span data-v-221e6f2c="" className="name">Shopee Live</span> 
                    </li>
                    <li data-v-221e6f2c="" className="side-navbar-item">
                        <span data-v-221e6f2c="" className="name">Shopee Feed</span> 
                    </li>
                </ul>
            </section>
        </nav>  
    )
}
export default SibaMenu