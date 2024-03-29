import React,{useState,useEffect,createRef} from 'react';
import axios from 'axios';
import Navbar from "./Navbar"
import {formatter,partition} from "../constants"
import {ItemRecommend,topsearchURL,imagehomeURL,trendsearchURL,listitemflashsalelURL,listcategoryURL} from "../urls"
import { Link } from 'react-router-dom';
import SlideshowGallery from "../hocs/Slideshow"
import { headers } from '../actions/auth';
import Dailyreacomment from './home/Dailyrecommend';
import styled from "styled-components"
import Brand from './home/Brand';
import Items from './home/Displayitem';

const ListItem=styled.div`
    display: flex;
    justify-content: space-around;
    background-color: #fff;
    width: 1200px;
    margin: 10px auto 0;
    min-height: 108px;
`
const StyleLink=styled(Link)`
    display: block;
    text-decoration: none;
    color: #d0011b;
    text-transform: uppercase;
    font-weight: 500;
    font-size: 1.0625rem;
    line-height: 1.0625rem;
    align-self: center;
`

const Header=styled.div`
    display: flex;
    align-items:center;
    background: #fff;
    height: 3.75rem;
    justify-content: center;
    border-bottom: 1px solid rgba(0,0,0,.05);
    padding: 0 1.25rem;
`
const Background=styled.div`
    width: 45px;
    height: 45px;
    border-radius: 50%;
    margin: 18px auto 8px;
`
const Image=styled.div`
    background-image: url(${props=>props.image});
    background-size: contain;
    height:100%;
    background-repeat: no-repeat;
`
const Image1=styled.img`
width:17px;height:17px;
margin-right:4px
`
const Styletext=styled.div`
    line-height: 1.5625rem;
    font-weight: 500;
`
const Boxitem=styled(Styletext)`
    bottom: 0;
    position:absolute;
    left: 0;
    width: 100%;
    height: 1.5625rem;
    background-color: rgba(0,0,0,.26);
    color: #fff;
    text-align: center;
`
const Name=styled(Styletext)`
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    font-size: .8125rem;
    max-width: 150px;
    margin-bottom: 8px;
    word-wrap: break-word;
    overflow: hidden;
    line-height: .875rem;
    color: #222;
    letter-spacing: 0;
    text-align: center;
`
const Stylediv=styled.div`
flex: 1;
    font-weight: 400;
    text-transform: capitalize;
    margin-left: 15px;
    padding-left: 15px;
    border-left: 1px solid #d8d8d8;
    display: flex;
`
const ImageBackground=styled.div`
    background-size: cover;
    background-image:url(${props=>props.image});
    background-repeat: no-repeat;
    width: 100%;
    padding-top: 100%;

`
const Title=styled.div`
    overflow: hidden;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    margin-top: 1.25rem;
    color: #555;
    font-size: 1.125rem;
    text-align: left;
    text-transform: capitalize;
    word-break: break-word;
`
const listitem=[
    {name:'Shopee food',image:'https://cf.shopee.vn/file/46a2a2c810622f314d78455da5e5d926_xhdpi'},
    {name:'Săn thưởng 100K xu',image:'https://cf.shopee.vn/file/46a2a2c810622f314d78455da5e5d926_xhdpi'},
    {name:'Khung giờ săn sale',image:'https://cf.shopee.vn/file/46a2a2c810622f314d78455da5e5d926_xhdpi'},
    {name:'Gì Cũng Rẻ - Mua Là Freeship',image:'https://cf.shopee.vn/file/b3535d7e56c58c4ebe9a87672d38cc5e_xhdpi'},
    {name:'Flash Sale',image:'https://cf.shopee.vn/file/93acaac785c19b09180b01cc34a4c17e_xhdpi'},
    {name:'Thứ 4 Freeship - x4 Ưu Đãi',image:'https://cf.shopee.vn/file/a8d76bca057ba0b117dcf8e1ef068d16_xhdpi'},
    {name:'Bắt Trend - Giá Sốc',image:'https://cf.shopee.vn/file/1975fb1af4ae3c22878d04f6f440b6f9_xhdpi'},
    {name:'Hoàn Xu Xtra Từ 100K',image:'https://cf.shopee.vn/file/21a4856d1fecd4eda143748661315dba_xhdpi'},
    {name:'Hàng Hiệu Giá Tốt',image:'https://cf.shopee.vn/file/8d6d5ee795e7675fed39d31ba04c3b92_xhdpi'},
    {name:'Hàng Quốc Tế',image:'https://cf.shopee.vn/file/a08ab28962514a626195ef0415411585_xhdpi'},
    {name:'Nạp thẻ & Dịch vụ',image:'https://cf.shopee.vn/file/9df57ba80ca225e67c08a8a0d8cc7b85_xhdpi'}
]
const int = 2;
class ImageHome extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
       items:[],list_item_recommend:[],loading:false
      };
    }
  
    componentDidMount() {
      axios.get(imagehomeURL,headers())
      .then(res=>{
        const data = res.data;
        this.setState({items:data,loading:true})
      })
        
    }
    navigationPrevRef = createRef()
    navigationNextRef = createRef()
    render() {
    const {items} = this.state
      return (
        <div className="section-banner-hotword--no-skin" style={{width: '1263px', marginLeft: '-31.5px'}}>
            <div className="containers d-flex">
                {this.state.loading?
                <div className="full-home-banners">
                    
                    <SlideshowGallery
                        slides={items}
                        automatic={true}
                        top={29.5003}
                        timeout={`2500`}
                        dot={true}
                    />
                </div>:''}
                <div className="full-home-banners__right-wrapper">
                    <Link className="full-home-banners__right-banner" to="/m/mo-the-vib">
                        <div className="_25_r8I full-home-banners__full-height full-home-banners__light-background">
                            <div className="full-home-banners__right-banner-image _2GchKS" style={{backgroundImage: `url(https://res.cloudinary.com/dupep1afe/image/upload/v1649896459/file/6278de50db87bd29802561a48234c232_xhdpi_w9g7xz.png)`,backgroundSize:'cover',backgroundRepeat: 'no-repeat'}}></div>
                        </div>
                    </Link>
                    <Link className="full-home-banners__right-banner" to="/m/HCM-uu-dai-bat-ngo">
                        <div className="_25_r8I full-home-banners__full-height full-home-banners__light-background">
                            <div className="full-home-banners__right-banner-image _2GchKS" style={{backgroundImage: `url(https://res.cloudinary.com/dupep1afe/image/upload/v1649896458/file/1927455215e171ecbe00553ab73d9cc6_xhdpi_npvbwj.png)`,backgroundSize:'cover',backgroundRepeat: 'no-repeat'}} ></div>
                        </div>
                    </Link>
                </div>
            </div>
            <ListItem>
                {listitem.map((item,i)=>
                <Link key={i} to='/'>
                    <div style={{width:'100px'}}>
                        <Background>
                            <Image image={item.image}></Image>
                        </Background>
                        <Name>{item.name}</Name>
                    </div>
                </Link>
                )}
                
            </ListItem>
        </div>
      )
    }
  }

class Category extends React.Component {
    state = {
        transform: 'translate(0px, 0px)',
        translateY:0,
        error: null,
        categories:[],
        loading:false
    };
  
    componentDidMount() {
      axios.get(listcategoryURL,headers())
      .then(res=>{
        this.setState({loading:true,transform: 'translate(0px, 0px)',categories:partition(res.data, int).map(subarray => subarray)});
      
    })  
      .catch(err => {
        this.setState({ error: err});
      });
    }
    
    render() {
        const {categories}=this.state
        const itemdisplay=(item)=>{
            return(
                <div className="home-category-list__group">
                    {
                        item.map(category=>
                        <Link to={`/${category.slug}`} key={category.id} className="home-category-list__category-grid">
                            <div className="_5XYhbS">
                                <div className="WCwWZw">
                                    <div className="_25_r8I _3K5s_h">
                                        <div className="_3K5s_h _2GchKS" style={{backgroundImage:`url(${category.image})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}}></div>
                                    </div>
                                </div>
                                <div className="_3DLGAG">
                                    <div className="_13sfos">{category.title}</div>
                                </div>
                            </div>
                        </Link>
                    )}
                                    
                </div>
            )
        }
        return (
            <div className="section-category-list">
                <div className="header-section__header item-center">
                    <div className="header-section__header__title">Danh Mục</div>
                </div>
                <Items
                    itemdisplay={itemdisplay}
                    num_display={10}
                    num_show={10}
                    width={1200}
                    items={categories}
                />
            </div>
        )
    }
}
  
const Itemflashsale =(props)=> {
    const [state,setState]=useState({items:[],time_end:new Date(),transform:'translate(0px, 0px)',loading:false })
    const [time,setTime]=useState({hours:0,mins:0,seconds:0})
   
    useEffect(() => {
        const getJournal = async () => {
        await axios.get(listitemflashsalelURL,headers())
        .then(res => {
                const data = res.data;
                const time_end=data.valid_to
                setState({ ...state,id:res.data.id,loading:true,items:data.items_flash_sale,time_end:time_end,transform:'translate(0px, 0px)' });
                const countDown= setInterval(() => timer(), 1000);
                const  timer=()=> {
                    const FalshsaleDate = new Date(time_end);
                    const currentDate = new Date();
                    let totalSeconds = (FalshsaleDate - currentDate) / 1000;
                    setTime({hours:Math.floor(totalSeconds / 3600) % 24,
                        mins: Math.floor(totalSeconds / 60) % 60,
                        seconds:Math.floor(totalSeconds) % 60})
                    if(totalSeconds<=0){
                        totalSeconds=0
                        clearInterval(countDown);
                    }
                }
                
            })
        }
        getJournal()
    },[])

    const itemdisplay=(item)=>{
        return(
            <div className="flash-sale-item-card flash-sale-item-card--home-page">
                <Link className="flash-sale-item-card-link" to={`/flash_sale?fromItem=${item.id}&promotionId=${id}`}>
                    <div className="flash-sale-item-card__image flash-sale-item-card__image--home-page">
                        <div className="_2JCOmq">
                            <div className="flash-sale-item-card__image-overlay flash-sale-item-card__image-overlay--home-page _3LhWWQ" style={{backgroundImage:`url(${item.image})`,backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}}></div>
                        </div>
                        <div className="_2JCOmq">
                            <div className="flash-sale-item-card__animated-image _3LhWWQ" style={{backgroundImage: `url(${item.image})`,backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}}></div>
                        </div>
                    </div>
                    <div className="flash-sale-item-card__lower-wrapper flash-sale-item-card__lower-wrapper flash-sale-item-card__lower-wrapper--home-page">
                        <div className="flash-sale-item-card__lower-left">
                            <div className="flash-sale-item-card__current-price flash-sale-item-card__current-price--home-page">
                                <span className="item-price-dollar-sign">₫ </span>
                                <span className="item-price-number">{formatter.format(item.discount_price)}</span> 
                            </div>
                            
                            <div className="flash-sale-progress-bar__wrapper flash-sale-progress-bar__wrapper--home-page">
                                <div className="HIIASx">
                                    <div className="Ygavkn">{item.number_order/item.promotion_stock>0.8?'Sắp cháy hàng':`Đã bán ${item.number_order}`}</div>
                                    <div className="NiQ2DI">
                                        <div className="NwnNg9" style={{width: `${(1-(item.number_order/item.promotion_stock))*100}%`}}> 
                                            <div className="zYeAeX"></div>
                                        </div>
                                    
                                    </div>
                                    {item.number_order/item.promotion_stock>0.5&&(<div className="Xm0-Ex"></div>)}
                                </div>
                            </div>
                        </div>
                        <div className="flash-sale-item-card__lower-right">
                        </div>
                        
                        <div className="item-card__badge-wrapper fs-item-card__badge-wrapper fs-item-card__badge-wrapper--home-page">
                            <div className="_3e3Ul9 _63yEXc XzXrC5" >
                                <div className="_1l5jbc">
                                    <span className="percent-flash">{item.percent_discount}%</span>
                                    <span className="_1GDo5V">giảm</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>  
        )
    }
    
    const number=(number,value)=>{
        return Array(number).fill().map((_,i)=>
            <div key={i} style={{color:'#fff'}} className="countdown-timer__number__item">
                <span>{i}</span>
            </div>
        )
    }
    const { items,id} = state;
    
        return (
            <>
            {state.loading && state.id?
            <div className="flash-sale-overview-carousel">
                <div className="header-section--simple">
                    <div className="header-section__header">
                        <div className="header-section__header__title item-space">
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
                            <Link to={`/flash_sale?promotionId=${id}`} className="header-section__header-link">
                                <button className="button-no-outline">Xem tất cả&nbsp;
                                    <svg enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0" className="svg-icon icon-arrow-right"><path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></path></svg>
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="header-section__content">
                        <Items
                            itemdisplay={itemdisplay}
                            num_display={6}
                            num_show={5}
                            width={1200}
                            items={items}
                        />
                    </div>
                </div>  
            </div>:""}
        </>
    )
}

const Topsearch=(props)=>{
    const [items,setItems]=useState([])
    useEffect(()=>{
        (async () => {
            try {
              const res = await axios.get(trendsearchURL,headers())
              setItems(res.data)
            } catch (error) {
              console.log(error);
            }
        })();
    },[])

    const itemdisplay=(item)=>{
        return(
            <Link className="_2v1m5m _19v7wz" to="/top_products?catId=VN_BITL0_157%3Atop_sold">
                <div className="_2wHcAp" style={{position:'relative'}}>
                    <div className="_2vSrVD _1zCwoN _3ZJfNv"></div>
                    <ImageBackground image={item.image}>             
                    </ImageBackground>
                    <Boxitem>Bán {item.number_order}k+ / tháng</Boxitem>
                </div>
                <Title>{item.title}</Title>
            </Link>
        )
    }
    return(
        <Items
            itemdisplay={itemdisplay}
            num_display={6}
            num_show={5}
            width={1200}
            items={items}
        />
    )
}

const Toptrends=(props)=>{
    const [toptrend,setToptrend]=useState([])
    const [state,setState]=useState({from_index:0})
    console.log(toptrend)
    useEffect(() => {
        (async () => {
            try {
              const res1 = await axios.get(topsearchURL,headers())
                setToptrend(res1.data.item_top_search)
            } catch (error) {
              console.log(error);
            }
        })();
        
    }, [])
    const addtrendsearch=(value)=>{
        const from_index= value+3>toptrend.length?0:value
        setState({from_index:from_index})
    }
    return(
        toptrend.length>0 && (<div className="section-trending-search-list">
            <div className="header-section header-section--simple">
                <div className="header-section__header item-center">
                    <div className="header-section__header__title">
                        <span>xu hướng tìm kiếm</span>
                    </div>
                    <div className="header-section__header-link">
                        <button onClick={()=>addtrendsearch(state.from_index+5)} className="button-no-outline">
                            <svg viewBox="0 0 12 15" className="svg-icon icon-refresh"><path d="M12 7.51268255c0-1.71021918-.7226562-3.30538371-1.9648437-4.43447938-.20507817-.18525749-.52148442-.16965686-.7070313.03315134-.18554687.20475828-.16992188.52067106.03320313.70592856C10.3984375 4.75722109 11 6.08717488 11 7.51268255c0 2.59360495-1.98242187 4.72699125-4.515625 4.96880095l.68164063-.7878318c.1796875-.2086585.15625-.5245713-.05273438-.7039785-.20898438-.1794073-.52539062-.1560063-.70507813.0526521l-1.49609375 1.7336201c-.18164062.2106086-.15625.5284714.05664063.7078787l1.65429688 1.3982065c.21093749.1774572.52539062.1521062.70507812-.0585023.17773438-.2106085.15234375-.5245712-.05859375-.7039785l-.75195313-.6357257C9.58789062 13.2205634 12 10.6484094 12 7.51268255zM2.80273438 11.3523879C1.66796875 10.4085497 1 9.0161934 1 7.51463263c0-2.75741154 2.23828125-4.99220194 5-4.99220194h.01367188l-.7734375.75078037c-.19726563.19305781-.203125.50897059-.00976563.70592855.19335938.19695797.50976563.20280821.70703125.0097504l1.64257813-1.59516453c.19921875-.19305781.20117187-.51287074.00585937-.70982871L6.06054688.14723461c-.1953125-.19500789-.51171875-.19695797-.70703125-.00195008C5.15820313.34029242 5.15625.6562052 5.3515625.85121309l.66992188.67472729H6c-3.31445312 0-6 2.68135846-6 5.99064232 0 1.8018729.80273438 3.4750406 2.16210938 4.6060863.21289062.1755071.52734375.148206.70507812-.0643526.17773438-.2164587.1484375-.5304214-.06445312-.7059285z" fillRule="nonzero"></path></svg>&nbsp;Xem thêm
                        </button>
                    </div>
                </div>
                <div className="header-section__content item-center">
                    {toptrend.slice(state.from_index,state.from_index+5).map((item,i)=>
                        <Link key={item.id} className="_2o9bHG X_20U5" to={`/search?keyword=${item.title}`}>
                            <div className="_3gOWPW">
                                <div className="_1-oDWo">
                                    <div className="_2-Akqx">{item.tile}</div>
                                    <div className="SB6LCl">{item.count>1000?`${item.count/1000}k`:item.count}+ sản phẩm</div>
                                </div>
                            </div>
                            <div className="_25_r8I _34PMOY">
                                <div className="_1JryA_ _2GchKS" style={{backgroundImage: `url(${item.image})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}}></div>
                            </div>
                        </Link>                         
                    )}                   
                </div> 
            </div>
        </div>)
    )
}

export default class HomePage extends React.Component {
    state={items:[],loading:false,item_common:[],list_trend_search:[],list_top_search:[],showimage:true,from_index:0,categories:[]}
    componentDidMount() {  
        
        document.addEventListener('scroll',this.addItem)
    }
    
    componentWillUnmount() {
        document.removeEventListener('scroll', this.addItem)
    }
    addItem=()=>{
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
            if(clientHeight + scrollTop >= scrollHeight -200 && !this.state.loading){
                (async () => {
                    try {
                    this.setState({loading:true,})
                      const res1 = await axios.get(topsearchURL,headers())

                      this.setState({loading:true,list_trend_search:res1.data.item_top_search})
                    } catch (error) {
                      console.log(error);
                    }
                  })();
                (async () => {
                    try {
                        const res = await axios.get(ItemRecommend,headers())
                        let data=res.data
                        this.setState({items:data});
                    } catch (error) {
                        console.log(error);
                    }
            })();   
        }
    }
    
    render() {
        const {items,categories,list_trend_search,list_top_search}=this.state
       
        return (
            <>
                <div id="main">
                    <div className="top top--sticky">
                        <Navbar/>
                    </div>
                    <div className="home-page" style={{marginTop:'7.375rem'}}>
                        <div className="containers">
                            <ImageHome/>
                            <Category
                            />
                            <Itemflashsale
                            />
                            
                            <div class="homepage-mall-section">
                                    <div class="header-section header-section--simple">
                                        <Header>
                                            <div class="header-section__header__title">
                                                <div class="_9FdTU0 item-center">
                                                    <StyleLink to="/mall">Shopee Mall</StyleLink>
                                                    <Stylediv>
                                                        <div class="item-center mr-1">
                                                            <Image1 class="a8XyX2" src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/homepage/6c502a2641457578b0d5f5153b53dd5d.png"/>
                                                            7 ngày miễn phí trả hàng
                                                        </div>
                                                        <div class="item-center mr-1">
                                                            <Image1 class="a8XyX2" src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/homepage/511aca04cc3ba9234ab0e4fcf20768a2.png"/>
                                                            Hàng chính hãng 100%
                                                        </div>
                                                        <div class="item-center mr-1">
                                                            <Image1 class="a8XyX2" src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/homepage/16ead7e0a68c3cff9f32910e4be08122.png"/>
                                                            Miễn phí vận chuyển
                                                        </div>
                                                    </Stylediv>
                                                </div>
                                            </div>
                                            <div class="header-section__header-link">
                                                <button class="button-no-outline">
                                                    <a class="QRUn3m" href="/mall">
                                                        <div class="_3cpToV item-center">Xem tất cả
                                                            <div class="_0P+BHf">
                                                                <svg enable-background="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0" class="svg-icon icon-arrow-right"><path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></path></svg>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </button>
                                            </div>
                                        </Header>
                                        <div class="header-section__content">
                                            
                                            <Brand
                                           
                                            />
                                            
                                        </div>
                                    </div>
                                </div>
                            <Toptrends/>
                            <div className="header-section header-section--simple">
                                <div className="header-section__header item-center">
                                    <div className="header-section__header__title">
                                        <span className="_1HWfeJ">Tìm kiếm hàng đầu</span>
                                    </div>
                                    <Link className="header-section__header-link" to="/top_products?catId=VN_BITL0_157">
                                        <button className="button-no-outline">Xem tất cả&nbsp;
                                            <svg enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0" className="svg-icon icon-arrow-right"><path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></path></svg>
                                        </button>
                                    </Link>
                                </div>
                                
                                <div className="header-section__content">
                                    <Topsearch
                                    />
                                    
                                </div>
                            </div>
                            <div className="section-recommend-products-wrapper">
                                <div className="_25hUNg"></div>
                            </div>
                            {this.state.showimage?
                            <div className="home-popup__background">
                                <div className="home-popup__content">
                                    <div className="simple-banner with-placeholder" >
                                        <a target="_self" href="https://shopee.vn/shopdunk_official_store">
                                            <img className="banner-image" src="https://cf.shopee.vn/file/994fadc9e70bef62ff2cdeda622bf0e3"/>
                                        </a>
                                    </div>
                                    <div className="home-popup__close-area">
                                        <div onClick={()=>this.setState({showimage:false})} className="popup__close-btn">
                                            <svg viewBox="0 0 16 16" stroke="#EE4D2D" className="home-popup__close-button">
                                            <path strokeLinecap="round" d="M1.1,1.1L15.2,15.2"></path>
                                            <path strokeLinecap="round" d="M15,1L0.9,15.1"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>:''}
                            <div className="section-recommend-products-wrapper">
                            {items.length>0?
                                <div className="_25hUNg">
                                    <div className="stardust-tabs-header-anchor"></div>
                                    <nav className="stardust-tabs-header-wrapper" style={{top: '7.375rem'}}>
                                        <ul className="stardust-tabs-header">
                                            <li className="stardust-tabs-header__tab stardust-tabs-header__tab--active">
                                                <div className="_3PV6yx _3W1Hcc" style={{background: 'rgb(238, 77, 45)'}}></div>
                                                <div className="P_cEoj">
                                                    <span style={{color: 'rgb(238, 77, 45)'}}>GỢI Ý HÔM NAY</span>
                                                </div>
                                            </li>
                                            <li className="stardust-tabs-header__tab">
                                                <div className="_3PV6yx _3W1Hcc" style={{background: 'rgb(238, 77, 45)'}}></div>
                                                <div className="P_cEoj">
                                                    <img src="https://cf.shopee.vn/file/7d71045b07d8ca61a0b378c90ac3a56d" style={{width: 'auto', height: '1.25rem'}} />
                                                </div>
                                            </li>
                                        </ul>
                                        <i className="stardust-tabs-header__tab-indicator" style={{display: 'none', width: '216px', transform: 'translateX(0px)'}}></i>
                                    </nav>
                                    <div className="stardust-tabs-panels"></div>
                                    <div className="stardust-tabs-panels">
                                        <section className="stardust-tabs-panels__panel">
                                            <Dailyreacomment
                                            items={items}
                                            />
                                            
                                        </section>
                                    </div>
                                </div>
                            :''}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
      }
}