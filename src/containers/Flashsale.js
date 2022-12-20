
import axios from 'axios';
import Navbar from "./Navbar"
import React, {useState, useEffect,useRef} from 'react'
import { useParams,Link,useNavigate,useSearchParams, Navigate } from "react-router-dom";
import Message from "./Chat"
import { headers} from '../actions/auth';
import { flashsaleURL, listflashsaleURL } from '../urls';
import { formatter } from '../constants';
import styled from "styled-components"
const StyledLink  = styled(Link)`
    background-color:${props=>props.active?'#ee4d2d':'#414142'};
    justify-content:center;
    align-items:center;
    display:flex;
    flex-direction:column;
    height:4rem;
    position: relative;
    color:${props=>props.active?'#fff':'#c3c3c3'};
`;
const StyleText=styled.div`
font-size:1.5rem;
`
const StyledText1=styled.div`
text-transform: capitalize;
`
const Background=styled.div`
padding-top: 240px;
background-image: url(https://cf.shopee.vn/file/9ec673f17e637893c11a2a983045e7c6);
`
const Box=styled.div`
width: 5.5rem;
height:${props=>props.primary?2.5:2.6875}rem;
align-self: end;
`
const Stylediv=styled.div`
background-color:${props=>props.primary?'#ee4d2d':'#fff'};
border: 1px solid #ee4d2d;
border-radius: 0.25rem;
box-sizing: border-box;
height: 100%;
width: 100%;
display: flex;
align-items: center;
justify-content: center;
text-transform: capitalize;
text-align: center;
font-weight: 400;
font-size: 1.125rem;
    
color:${props=>props.primary?'#fff':'#ee4d2d'};
`
const StyleDicount=styled.div`
font-size: 1.75rem;
font-weight: 400;
height: 2.0625rem;
color:#ee4d2d;
`
const Flex=styled.div`
display:flex
`
const Flexbox=styled(Flex)`
flex-direction:column;
flex:1
`
const Boxcontent=styled.div`
display: flex;
    flex-direction: column;
    padding: 0.6875rem 1rem 1rem;
`
const Itemname=styled.div`
color: rgba(0,0,0,.87);
    font-size: 1rem;
    font-weight: 400;
    height: 3rem;
    word-wrap: break-word;
    line-height: 1.5rem;
    overflow: hidden;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
`
const Loading=styled.div`
margin-top:2rem
`
const listitem=[
    {name:'',url:''},
    {name:'',url:''},
    {name:'',url:''},
    {name:'',url:''},
    {name:'',url:''},
    {name:'',url:''},

]
const Flashsale=()=>{
    const [items,setItems]=useState([])
    const [flashsale,setFlashsale]=useState()
    const [loading,setLoading]=useState(false)
    const [time,setTime]=useState({hours:0,mins:0,seconds:0})
    const [params, setSearchParams] = useSearchParams();
    const [listflashsale,setListflashsale]=useState([])
    const navigate=useNavigate()
    useEffect(() => {
        (async()=>{
            const res= await axios.get(listflashsaleURL,headers())
            setListflashsale(res.data)
            setLoading(true)
        })()
    }, [])
    useEffect(() => {
        (async()=>{
            setLoading(false)
            const res= await axios.get(`${flashsaleURL}?${params}`,headers())
            setItems(res.data.items_flash_sale)
            setLoading(true)
            setFlashsale({id:res.data.id,valid_from:res.data.valid_from,valid_to:res.data.valid_to})
        })()
    }, [params])
    console.log(params.get('promotionId'))
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
    const displaydiscount=(value)=>{
        if (value.length==5){
        return value.split('').map((key,i)=><>{i>=value.length-3 ||key=='.'?key:'?'}</>)
        }
        else if(value.length>8){
            return value.split('').map((key,i)=><>{i==0||i>=value.length-5 ||key=='.'?key:'?'}</>)
        }
        else{
            return value.split('').map((key,i)=><>{i==0||i>=value.length-3 ||key=='.'?key:'?'}</>)
        }
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
                <Background className="containers"></Background>
                <div>
                    <div className="psdx2P containers mb-1">
                        <div className="image-carousel">
                            <div className="image-carousel__item-list-wrapper">
                                <ul className="image-carousel__item-list" style={{width: '100%', transform: 'translate(0px, 0px)'}}>
                                    {listflashsale.map(item=>
                                    <li key={item.id} className="image-carousel__item" style={{padding: '0px', width: '20%'}}>
                                        <div>
                                            <StyledLink active={params.get('promotionId')==item.id?true:false} to={`/flash_sale?promotionId=${item.id}`}>
                                                <StyleText>{`${('0'+new Date(item.valid_from).getHours()).slice(-2)}:${('0'+new Date(item.valid_from).getMinutes()).slice(-2)}`}</StyleText>
                                                <StyledText1>{new Date(item.valid_from)<new Date()?'Đang diễn ra':'Sắp diễn ra'}</StyledText1>
                                            </StyledLink>
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
                        <div className="containers navbar-with-more-menu__wrapper" style={{backgroundColor: 'rgb(255, 255, 255)'}}>
                            <div className="navbar-with-more-menu__items">
                                <Link className="navbar-with-more-menu__item navbar-with-more-menu__item--active" to={`/flash_sale?categoryId=0&fromItem=${params.get('fromItem')}&promotionId=${params.get('promotionId')}`}>
                                    <span>Top Picks</span>
                                </Link>
                                <Link className="navbar-with-more-menu__item" to={`/flash_sale?categoryId=34&fromItem=${params.get('fromItem')}&promotionId=${params.get('promotionId')}`}>
                                    <span>HÀNG HIỆU GIÁ TỐT</span>
                                </Link>
                                <Link className="navbar-with-more-menu__item" to={`/flash_sale?categoryId=12&fromItem=${params.get('fromItem')}&promotionId=${params.get('promotionId')}`}>
                                    <span>ĐỒNG GIÁ 1K</span>
                                </Link>
                                <Link className="navbar-with-more-menu__item" to={`/flash_sale?categoryId=26&fromItem=${params.get('fromItem')}&promotionId=${params.get('promotionId')}`}>
                                    <span>ĐỒNG GIÁ 9K</span>
                                </Link>
                                <Link className="navbar-with-more-menu__item" to={`/flash_sale?categoryId=57&fromItem=${params.get('fromItem')}&promotionId=${params.get('promotionId')}`}>
                                    <span>ĐỒNG GIÁ 99K</span>
                                </Link>
                                <Link className="navbar-with-more-menu__item" to={`/flash_sale?categoryId=15&fromItem=${params.get('fromItem')}&promotionId=${params.get('promotionId')}`}>
                                    <span>SHOPEE PREMIUM</span>
                                </Link>
                                <div className="navbar-with-more-menu__item navbar-with-more-menu__more">
                                    <div className="navbar-with-more-menu__more-label">Thêm</div>
                                    <svg enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className="svg-icon icon-down-arrow-filled"><path d="m6.5 12.9-6-7.9s-1.4-1.5.5-1.5h13s1.8 0 .6 1.5l-6 7.9c-.1 0-.9 1.3-2.1 0z"></path></svg>
                                
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        {flashsale?
                        loading?
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
                                    <Boxcontent>
                                        <Itemname>
                                            <div className="OHv6Qr" title="DỤNG CỤ NGHIỀN TỎI HÀNH GỪNG HUOHOU SÁNG TẠO TIỆN LỢI DÀNH CHO NHÀ BẾP">{item.name}</div>
                                        </Itemname>
                                    
                                        <Flex>
                                            <Flexbox>
                                                <div className="IKgh3U">
                                                    <div className="qOgYxF">
                                                        <span className="-92Xgq">₫ </span>
                                                        <span>{(item.max_price+item.min_price)/2}</span>
                                                    </div>
                                                </div>
                                                <StyleDicount>
                                                    <div className="qOgYxF">
                                                        <span className="-92Xgq">₫ </span>
                                                        <span className="_6Xxkav">{new Date(flashsale.valid_from)<new Date()?formatter.format((item.discount_price/1000).toFixed(0)*1000):displaydiscount(formatter.format((item.discount_price/1000).toFixed(0)*1000))}</span>
                                                    </div>
                                                </StyleDicount>
                                                {new Date(flashsale.valid_from)<new Date()?
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
                                                </div>:''}
                                            </Flexbox>
                                            <Box primary={new Date(flashsale.valid_from)<new Date()?true:false} onClick={()=>navigate(`/${item.slug}?itemId=${item.id}`)}>
                                                <Stylediv primary={new Date(flashsale.valid_from)<new Date()?true:false}>{new Date(flashsale.valid_from)<new Date()?'Mua ngay':'Xem chi tiết'}</Stylediv>
                                            </Box>
                                        
                                        </Flex>
                                    </Boxcontent>
                                    {new Date(flashsale.valid_from)<new Date()?
                                        <div className="aS+-QV">
                                            <div className="_5ICO3M yV54ZD X7gzZ7">
                                                <div className="_8PundJ">
                                                    <span className="percent-flash">{item.percent_discount}%</span>
                                                    <span className="tSV5KQ">giảm</span>
                                                </div>
                                            </div>
                                        </div>:''}
                                </Link>
                            </div>
                            )}
                        </div>:
                        <Loading className="loading_item item-center">
                            <div className="ball"></div>
                            <div className="ball"></div>
                            <div className="ball"></div>
                        </Loading>
                    :''}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Flashsale