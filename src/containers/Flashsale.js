
import axios from 'axios';
import Navbar from "./Navbar"
import React, {useState, useEffect,useRef} from 'react'
import { useParams,Link,useNavigate,useSearchParams, Navigate } from "react-router-dom";
import Message from "./Chat"
import { headers} from '../actions/auth';
import { flashsaleURL, listflashsaleURL } from '../urls';
import { formatter } from '../constants';

const Flashsale=()=>{
    const [items,setItems]=useState([])
    const [flashsale,setFlashsale]=useState()
    const [time,setTime]=useState({hours:0,mins:0,seconds:0})
    const [params, setSearchParams] = useSearchParams();
    const [listflashsale,setListflashsale]=useState([])
    const navigate=useNavigate()
    useEffect(() => {
        (async()=>{
            const res= await axios.get(listflashsaleURL,headers)
            setListflashsale(res.data)
        })()
    }, [])
    useEffect(() => {
        (async()=>{
            const res= await axios.get(`${flashsaleURL}?${params}`,headers)
            setItems(res.data.items_flash_sale)
            setFlashsale({id:res.data.id,valid_from:res.data.valid_from,valid_to:res.data.valid_to})
        })()
    }, [params])
    console.log(time)
    useEffect(()=>{
        if(flashsale){
            const countDown= setInterval(() => timer(), 1000);
            const  timer=()=> {
            const time_end=new Date()>new Date(flashsale.valid_from)?flashsale.valid_to:flashsale.valid_from
            const FalshsaleDate = new Date(time_end);
            const currentDate = new Date();
            let totalSeconds = (FalshsaleDate - currentDate) / 1000;
            setTime(current=>{return{...current,hours:Math.floor(totalSeconds / 3600) % 24,
            mins: Math.floor(totalSeconds / 60) % 60,
            seconds:Math.floor(totalSeconds) % 60}})
        }
        return ()=> clearInterval(countDown)
    }
    },[flashsale])
    const number=(number,value)=>{
        return Array(number).fill().map((_,i)=>
            <div key={i} style={{color:'#fff'}} className="countdown-timer__number__item">
                <span>{i}</span>
            </div>
        )
    }
    return(
        <div>
            <div className="item-col top container-wrapper">
                <Navbar/>
            </div>
            <div>
                <div className="container cIVWIZ" style={{backgroundImage: `url(https://cf.shopee.vn/file/9b8788e953ec12e7703d30f246f40427)`}}></div>
                <div className="uqKrnc TyE46o">  
                    <div className="item-centers flash_sale-header">  
                        <div className="header-section__header item-center">
                            <div className="header-section__header__title item-center">
                                <div className="flash-sale-header-with-countdown-timer__wrapper item-center">
                                    <div className="flash-sale-header-with-countdown-timer__header"></div>
                                    <div className="flash-sale-header-with-countdown-timer item-center">
                                        <div className="countdown-timer__number">
                                            <div className="countdown-timer__number__hexa countdown-timer__number__hexa--hour" style={{animationDelay: '-1744s',transform:`translateY(-${('0'+time.hours).slice(-2,-1)*17}px)`}}>
                                                {number(10,('0'+time.hours).slice(-2,-1))}
                                            </div>
                                            <div className="countdown-timer__number__deca countdown-timer__number__deca--hour" style={{animationDelay: '-1744s',transform:`translateY(-${('0'+time.hours).slice(-1)*17}px)`}}>
                                                {number(10,('0'+time.hours).slice(-1))} 
                                            </div>
                                        </div>
                                        <div className="countdown-timer__colon">:</div>
                                        <div className="countdown-timer__number">
                                            <div className="countdown-timer__number__hexa countdown-timer__number__hexa--minute" style={{animationDelay: '-174s',transform:`translateY(-${('0'+time.mins).slice(-2,-1)*17}px)`}}>
                                                {number(10,('0'+time.mins).slice(-2,-1))} 
                                            </div>
                                            <div className="countdown-timer__number__deca countdown-timer__number__deca--minute" style={{animationDelay: '-174s',transform:`translateY(-${('0'+time.mins).slice(-1)*17}px)`}}>
                                                {number(10,('0'+time.mins).slice(-1))}  
                                            </div>
                                        </div>
                                        <div className="countdown-timer__colon">:</div>
                                        <div className="countdown-timer__number">
                                            <div className="countdown-timer__number__hexa countdown-timer__number__hexa--second" style={{animationDelay: '-18s',transform:`translateY(-${('0'+time.seconds).slice(-2,-1)*17}px)`}}>
                                                {number(10,('0'+time.seconds).slice(-2,-1))}
                                            </div>
                                            <div className="countdown-timer__number__deca countdown-timer__number__deca--second" style={{animationDelay: '-9s',transform:`translateY(-${('0'+time.seconds).slice(-1)*17}px)`}}>
                                                {number(10,('0'+time.seconds).slice(-1))}
                                            </div>
                                        </div>
                                    </div>
                                </div>   
                            </div>
                        </div>
                    </div>  
                </div> 
                <div>
                    <div className="psdx2P container">
                        <div className="image-carousel">
                            <div className="image-carousel__item-list-wrapper">
                                <ul className="image-carousel__item-list" style={{width: '100%', transform: 'translate(0px, 0px)'}}>
                                    {listflashsale.map(item=>
                                    <li key={item.id} className="image-carousel__item" style={{padding: '0px', width: '20%'}}>
                                        <div>
                                            <Link className="oNZiNS HEIdWf" to={`/flash_sale?promotionId=${item.id}`}>
                                                <div className="UCDJ9O">{`${('0'+new Date(item.valid_from).getHours()).slice(-2)}:${('0'+new Date(item.valid_from).getMinutes()).slice(-2)}`}</div>
                                                <div className="higiZo">{new Date(item.valid_from)<new Date()?'Đang diễn ra':'Sắp diễn ra'}</div>
                                            </Link>
                                        </div>
                                    </li>
                                    )}
                                    
                                </ul>
                            </div>
                            <div className="carousel-arrow carousel-arrow--prev carousel-arrow--hidden" role="button" tabIndex="0" style={{opacity: 1, visibility: 'hidden'}}><svg viewBox="0 0 13 20" width="13" height="22" className="svg-icon icon-arrow-left-bold-round"><path d="M11 2l-9.2832 9L11 20" strokeWidth="3" fill="none" fillRule="evenodd" strokeLinecap="round" stroke-linejoin="round"></path></svg></div>
                            <div className="carousel-arrow carousel-arrow--next carousel-arrow--hidden" role="button" tabIndex="0" style={{opacity: 1, visibility: 'hidden'}}><svg viewBox="0 0 13 20" width="13" height="22" className="svg-icon icon-arrow-right-bold-round"><path d="M2 2l9.2832 9L2 20" strokeWidth="3" fill="none" fillRule="evenodd" strokeLinecap="round" stroke-linejoin="round"></path></svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="navbar-with-more-menu">
                        <div className="container navbar-with-more-menu__wrapper" style={{backgroundColor: 'rgb(255, 255, 255)'}}>
                            <div className="navbar-with-more-menu__items">
                                <a className="navbar-with-more-menu__item navbar-with-more-menu__item--active" href="/flash_sale?categoryId=0&amp;fromItem=14170394189&amp;promotionId=102326587293697">
                                    <span>Top Picks</span>
                                </a>
                                <a className="navbar-with-more-menu__item" href="/flash_sale?categoryId=34&amp;fromItem=14170394189&amp;promotionId=102326587293697">
                                    <span>HÀNG HIỆU GIÁ TỐT</span>
                                </a>
                                <a className="navbar-with-more-menu__item" href="/flash_sale?categoryId=12&amp;fromItem=14170394189&amp;promotionId=102326587293697">
                                    <span>ĐỒNG GIÁ 1K</span>
                                </a>
                                <a className="navbar-with-more-menu__item" href="/flash_sale?categoryId=26&amp;fromItem=14170394189&amp;promotionId=102326587293697">
                                    <span>ĐỒNG GIÁ 9K</span>
                                </a>
                                <a className="navbar-with-more-menu__item" href="/flash_sale?categoryId=57&amp;fromItem=14170394189&amp;promotionId=102326587293697">
                                    <span>ĐỒNG GIÁ 99K</span>
                                </a>
                                <a className="navbar-with-more-menu__item" href="/flash_sale?categoryId=15&amp;fromItem=14170394189&amp;promotionId=102326587293697">
                                    <span>SHOPEE PREMIUM</span>
                                </a>
                                <div className="navbar-with-more-menu__item navbar-with-more-menu__more">
                                    <div className="navbar-with-more-menu__more-label">Thêm</div>
                                    <svg enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className="svg-icon icon-down-arrow-filled"><path d="m6.5 12.9-6-7.9s-1.4-1.5.5-1.5h13s1.8 0 .6 1.5l-6 7.9c-.1 0-.9 1.3-2.1 0z"></path></svg>
                                
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        {flashsale?
                        <div className="VUCDM7">
                            {items.map(item=>
                            <div key={item.id} className="B3+pb+ N8hR+F y+U+-m">

                                <Link className="PMpbYz" to={`${item.url}?itemId=${item.id}`}>
                                    <div className="FSzItq qifRic">
                                        <div className="DKMfci">
                                            <div className="_6y1ec4 qOUKdN LKoGAt" style={{backgroundImage: `url(https://cf.shopee.vn/file/3ecec90a54dfc9a7a6c83e44c4d67a3a_tn)`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}}></div>
                                        </div>
                                        <div className="DKMfci">
                                            <div className="_8+rkhW LKoGAt" style={{backgroundImage: `url(${item.image})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}}></div>
                                        </div>
                                    </div>
                                    <div className="LERASq _5W9sdV">
                                        <div className="OHv6Qr" title="DỤNG CỤ NGHIỀN TỎI HÀNH GỪNG HUOHOU SÁNG TẠO TIỆN LỢI DÀNH CHO NHÀ BẾP">{item.name}</div>
                                    </div>
                                        <div className="IKgh3U">
                                            <div className="qOgYxF">
                                                <span className="-92Xgq">₫ </span>
                                                <span>{(item.max_price+item.min_price)/2}</span>
                                            </div>
                                        </div>
                                        <div className="_02pRMf"><div className="_6C-j0b">
                                            <div className="dgZNpS sQmr2P">
                                            <div className="qOgYxF">
                                            <span className="-92Xgq">₫ </span>
                                            <span className="_6Xxkav">{new Date(flashsale.valid_from)<new Date()?formatter.format(item.discount_price):item.discount_price.toString().substr(1)}</span></div>
                                        </div>
                                        <div className="FH50xK">
                                            <div className="HIIASx">
                                                <div className="Ygavkn">{item.number_order/item.promotion_stock>0.8?'Sắp cháy hàng':`Đã bán ${item.number_order}`}</div>
                                                    <div className="NiQ2DI">
                                                        <div className="NwnNg9" style={{width: `${(1-(item.number_order/item.promotion_stock))*100}%`}}>
                                                            
                                                            <div className="zYeAeX"></div>
                                                            
                                                        </div>
                                                        
                                                    </div>
                                                    {item.number_order/item.promotion_stock>0.5?
                                                    <div className="Xm0-Ex"></div>:''}
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div onClick={()=>navigate(`/${item.slug}?itemId=${item.id}`)}>
                                            <div className="fQZ-l0">Mua ngay</div>
                                        </div>
                                       
                                        <div className="aS+-QV">
                                            <div className="_5ICO3M yV54ZD X7gzZ7">
                                                <div className="_8PundJ">
                                                    <span className="percent-flash">{item.percent_discount}%</span>
                                                    <span className="tSV5KQ">giảm</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            )}
                        </div>:''}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Flashsale