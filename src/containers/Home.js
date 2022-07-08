import React,{useState,useEffect,createRef} from 'react';
import axios from 'axios';
import Navbar from "./Navbar"
import {localhost,formatter,topsearchURL,ItemRecommend,itemcommon,ItemsellerURL, imagehomeURL,listitemflashsalelURL,listcategoryURL} from "../constants"
import ReactDOM from 'react-dom'
import { logout,headers } from '../actions/auth';
import { Link } from 'react-router-dom';
import Message from "./Chat"
import SlideshowGallery from "../hocs/Slideshow"
function partition(array, n) {
    return array.length ? [array.splice(0, n)].concat(partition(array, n)) : [];
}
const int = 2;
class ImageHome extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
       items:[],list_item_recommend:[],loading:false
      };
    }
  
    componentDidMount() {
      axios.get(imagehomeURL)
      .then(res=>{
        const data = res.data;
        this.setState({items:data.c,loading:true})
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
                        list_image={this.state.items}
                        automatic={true}
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
        </div>
      )
    }
  }

class Category extends React.Component {
    state = {
        transform: 'translate(0px, 0px)',
        error: null,
        categories:[],
        loading:false
    };
  
    componentDidMount() {
      axios.get(listcategoryURL)
      .then(res=>{
        this.setState({loading:true,transform: 'translate(0px, 0px)',categories:partition(res.data.b, int).map(subarray => subarray)});
      })  
      .catch(err => {
        this.setState({ error: err});
      });
    }
    
    prevSlide =(e)=>{
        e.currentTarget.nextElementSibling.style.visibility='visible'
        e.currentTarget.style.visibility='hidden'
        this.setState({transform: 'translate(0px, 0px)'});
    }
    nextSlide = (e) =>{
        e.currentTarget.previousElementSibling.style.visibility='visible'
        e.currentTarget.style.visibility='hidden'
        this.setState({transform: 'translate(-360px, 0px)'});
        
    }
    render() {
    const {categories,transform}=this.state
        const remove=(e)=>{
            var array = [...this.state.categories]
            var index = array.indexOf(e.target.value)
        }
        return (
            <div className="section-category-list">
                <div className="header-section__header item-center">
                    <div className="header-section__header__title">Danh Mục</div>
                </div>
                {this.state.loading?
                <div className="image-carousel">
                    <div className="image-carousel__item-list-wrapper">
                        <ul className="image-carousel__item-list" style={{width: '130%', transform: transform, transition: 'all 500ms ease 0s'}}>
                           {
                            categories.map((item,i)=>
                                <li className="image-carousel__item" key={i}>
                                    <div className="home-category-list__group">
                                        {
                                        item.map(category=>
                                        <Link onClick={remove} to={category.url} key={category.title} className="home-category-list__category-grid">
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
                                </li>
                            )}
                        </ul>
                    </div>
                    <div onClick={this.prevSlide} className="carousel-arrow carousel-arrow--hint carousel-arrow--prev" role="button" tabIndex="0" style={{opacity: 1, visibility: 'hidden', transform: 'translateX(calc(-50% + 0px))'}}>
                        <svg enableBackground="new 0 0 13 20" viewBox="0 0 13 20" x="0" y="0" className="svg-icon icon-arrow-left-bold"><polygon points="4.2 10 12.1 2.1 10 -.1 1 8.9 -.1 10 1 11 10 20 12.1 17.9"></polygon></svg>
                    </div>
                    <div onClick={this.nextSlide} className="carousel-arrow carousel-arrow--hint carousel-arrow--next carousel-arrow--hidden" role="button" tabIndex="0" style={{opacity: 1, visibility: 'visible', transform: 'translateX(calc(50% - 0px))'}}>
                        <svg enableBackground="new 0 0 13 21" viewBox="0 0 13 21" x="0" y="0" className="svg-icon icon-arrow-right-bold"><polygon points="11.1 9.9 2.1 .9 -.1 3.1 7.9 11 -.1 18.9 2.1 21 11.1 12 12.1 11"></polygon></svg>
                    </div>
                </div>:''}
            </div>
        )
    }
}
  
const Itemflashsale =()=> {
    const [state,setState]=useState({items:[],time_end:new Date(),transform:'translate(0px, 0px)',loading:false })
    const [time,setTime]=useState({hours:0,mins:0,seconds:0})
    useEffect(() => {
        const getJournal = async () => {
        await axios.get(listitemflashsalelURL)
        .then(res => {
                const data = res.data;
                const time_end=data.list_flashsale.length>0?data.list_flashsale[0].valid_to:'2022-10-10'
                setState({ ...state,loading:true,items:data.a,time_end:time_end,transform:'translate(0px, 0px)' });
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
                let hour_hexa=document.querySelector('.hour')
            })
        }
        getJournal()
    },[])

    
    
    const prevSlide =(e)=>{
        e.currentTarget.nextElementSibling.style.visibility='visible'
        e.currentTarget.style.visibility='hidden'
        this.setState({transform: 'translate(0px, 0px)'});
    }
    const nextSlide = (e) =>{
        e.currentTarget.previousElementSibling.style.visibility='visible'
        e.currentTarget.style.visibility='hidden'
        this.setState({transform: 'translate(-1000px, 0px)'});
        
    }
    const number=(num,value)=>{
        const list_number=[]
        for(let i=0;i<num;i++){
            list_number.push(
            <div style={{color:'#fff'}} className="countdown-timer__number__item">
                <span>{i}</span>
            </div>)
        }
        return list_number
    }
    const { items,transform} = state;
        return (
            <>
            {state.loading && items.length>0?
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
                            <a href="" className="header-section__header-link">
                                <button className="button-no-outline">Xem tất cả&nbsp;
                                    <svg enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0" className="svg-icon icon-arrow-right"><path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></path></svg>
                                </button>
                            </a>
                        </div>
                    </div>
                    <div className="header-section__content">
                        <div className="image-carousel">
                            <div className="image-carousel__item-list-wrapper">                      
                                <ul style={{width: "266.667%",transform: transform,transition: "all 500ms ease 0s"}}>
                                    {
                                    items.map(item =>
                                        <li key={item.item_id} className="image-carousel__item" style={{width: "200px"}}>
                                            <div className="flash-sale-item-card flash-sale-item-card--home-page">
                                                <a className="flash-sale-item-card-link">
                                                    <div className="flash-sale-item-card__image flash-sale-item-card__image--home-page">
                                                        <div className="_2JCOmq">
                                                            <div className="flash-sale-item-card__image-overlay flash-sale-item-card__image-overlay--home-page _3LhWWQ" style={{backgroundImage:`url(${item.item_image})`,backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}}></div>
                                                        </div>
                                                        <div className="_2JCOmq">
                                                            <div className="flash-sale-item-card__animated-image _3LhWWQ" style={{backgroundImage: `url(${item.item_image})`,backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}}></div>
                                                        </div>
                                                    </div>
                                                    <div className="flash-sale-item-card__lower-wrapper flash-sale-item-card__lower-wrapper flash-sale-item-card__lower-wrapper--home-page">
                                                        <div className="flash-sale-item-card__lower-left">
                                                            <div className="flash-sale-item-card__current-price flash-sale-item-card__current-price--home-page">
                                                                <span className="item-price-dollar-sign">₫ </span>
                                                                <span className="item-price-number">{formatter.format(((item.item_max+item.item_min)/2)*(100-item.percent_discount)/100)}</span> 
                                                            </div>
                                                            <div className="flash-sale-progress-bar__wrapper flash-sale-progress-bar__wrapper--home-page">
                                                                <div className="flash-sale-progress-bar flash-sale-progress-bar--home-page">
                                                                    <div className="flash-sale-progress-bar__text">Đã bán {item.number_order}</div>
                                                                    <div className="flash-sale-progress-bar__complement-wrapper flash-sale-progress-bar__complement-wrapper--home-page">
                                                                        <div className="flash-sale-progress-bar__complement-sizer flash-sale-progress-bar__complement-sizer--home-page" style={{width: `${(1-(item.number_order/item.quantity_limit_flash_sale))*100}%`}}>
                                                                            <div className="flash-sale-progress-bar__complement-color"></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flash-sale-item-card__lower-right">
                                                        </div>
                                                        {item.percent_discount>0?
                                                        <div className="item-card__badge-wrapper fs-item-card__badge-wrapper fs-item-card__badge-wrapper--home-page">
                                                            <div className="_3e3Ul9 _63yEXc XzXrC5 badge" >
                                                                <div className="_1l5jbc">
                                                                    <span className="percent">{item.percent_discount}%</span>
                                                                    <span className="_1GDo5V">giảm</span>
                                                                </div>
                                                            </div>
                                                        </div>:''}
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        )
                                        }
                                    </ul>
                                </div>
                                <div onClick={()=>prevSlide()} className="carousel-arrow carousel-arrow--hint carousel-arrow--prev  carousel-arrow--hidden" role="button" tabIndex={0} style={{opacity: '1', visibility: 'hidden', transform: 'translateX(calc(-50% + 0px))'}}>
                                    <svg enableBackground="new 0 0 13 20" viewBox="0 0 13 20" x="0" y="0" className="svg-icon icon-arrow-left-bold"><polygon points="4.2 10 12.1 2.1 10 -.1 1 8.9 -.1 10 1 11 10 20 12.1 17.9"></polygon></svg>
                                </div>
                                <div onClick={()=>nextSlide()} className="carousel-arrow carousel-arrow--hint carousel-arrow--next" role="button" tabIndex={0} style={{opacity: '1',visibility: 'visible', transform: 'translateX(calc(50% - 0px))'}}>
                                    <svg enableBackground="new 0 0 13 21" viewBox="0 0 13 21" x="0" y="0" className="svg-icon icon-arrow-right-bold"><polygon points="11.1 9.9 2.1 .9 -.1 3.1 7.9 11 -.1 18.9 2.1 21 11.1 12 12.1 11"></polygon></svg>
                                </div>
                            </div>
                        </div>
                    </div>  
            </div>:""}
        </>
    )
}


export default class HomePage extends React.Component {
    state={items:[],item_common:[],list_trend_search:[],list_top_search:[],showimage:true,from_index:0}
    componentDidMount() {
        document.body.onscroll=()=>{
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
                if(clientHeight + scrollTop == scrollHeight && this.state.items.length==0){
                    (async () => {
                        try {
                          const res1 = await axios.get(topsearchURL)
                          this.setState({list_top_search:res1.data.item_top_search,list_trend_search:res1.data.item_top_search})
                        } catch (error) {
                          console.log(error);
                        }
                      })();
                    (async () => {
                        try {
                            const res = await axios.get(ItemRecommend)
                            let data=res.data
                            this.setState({items:data.d});
                        } catch (error) {
                            console.log(error);
                        }
                })();   
            }
        }
    }
    addtrendsearch=(value)=>{
        const from_index= value+3>this.state.list_top_search.length?0:value
        this.setState({from_index:from_index})
    }
    render() {
        const {items}=this.state
        return (
            <>
                <div id="main">
                    <div className="top">
                        <Navbar/>
                    </div>
                    <div className="home-page">
                        <div className="containers">
                        <ImageHome/>
                            <Category/>
                            <Itemflashsale/>
                            <div className="section-trending-search-list">
                                <div className="header-section header-section--simple">
                                    <div className="header-section__header item-center">
                                        <div className="header-section__header__title">
                                            <span>xu hướng tìm kiếm</span>
                                        </div>
                                        <div className="header-section__header-link">
                                            <button onClick={()=>this.addtrendsearch(this.state.from_index+5)} className="button-no-outline">
                                                <svg viewBox="0 0 12 15" className="svg-icon icon-refresh"><path d="M12 7.51268255c0-1.71021918-.7226562-3.30538371-1.9648437-4.43447938-.20507817-.18525749-.52148442-.16965686-.7070313.03315134-.18554687.20475828-.16992188.52067106.03320313.70592856C10.3984375 4.75722109 11 6.08717488 11 7.51268255c0 2.59360495-1.98242187 4.72699125-4.515625 4.96880095l.68164063-.7878318c.1796875-.2086585.15625-.5245713-.05273438-.7039785-.20898438-.1794073-.52539062-.1560063-.70507813.0526521l-1.49609375 1.7336201c-.18164062.2106086-.15625.5284714.05664063.7078787l1.65429688 1.3982065c.21093749.1774572.52539062.1521062.70507812-.0585023.17773438-.2106085.15234375-.5245712-.05859375-.7039785l-.75195313-.6357257C9.58789062 13.2205634 12 10.6484094 12 7.51268255zM2.80273438 11.3523879C1.66796875 10.4085497 1 9.0161934 1 7.51463263c0-2.75741154 2.23828125-4.99220194 5-4.99220194h.01367188l-.7734375.75078037c-.19726563.19305781-.203125.50897059-.00976563.70592855.19335938.19695797.50976563.20280821.70703125.0097504l1.64257813-1.59516453c.19921875-.19305781.20117187-.51287074.00585937-.70982871L6.06054688.14723461c-.1953125-.19500789-.51171875-.19695797-.70703125-.00195008C5.15820313.34029242 5.15625.6562052 5.3515625.85121309l.66992188.67472729H6c-3.31445312 0-6 2.68135846-6 5.99064232 0 1.8018729.80273438 3.4750406 2.16210938 4.6060863.21289062.1755071.52734375.148206.70507812-.0643526.17773438-.2164587.1484375-.5304214-.06445312-.7059285z" fillRule="nonzero"></path></svg>&nbsp;Xem thêm
                                            </button>
                                        </div>
                                    </div>
                                    <div className="header-section__content item-center">
                                        {this.state.list_trend_search.slice(this.state.from_index,this.state.from_index+5).map((item,i)=>
                                                <a className="_2o9bHG X_20U5" href={`/search?keyword=${item.title}`}>
                                                    <div className="_3gOWPW">
                                                        <div className="_1-oDWo">
                                                            <div className="_2-Akqx">{item.tile}</div>
                                                            <div className="SB6LCl">{item.count>1000?`${item.count/1000}k`:item.count}+ sản phẩm</div>
                                                        </div>
                                                    </div>
                                                    <div className="_25_r8I _34PMOY">
                                                        <div className="_1JryA_ _2GchKS" style={{backgroundImage: `url(${item.image})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}}></div>
                                                    </div>
                                                </a>
                                                
                                        )}
                                        
                                    </div> 
                                </div>
                            </div>
                            {/* THIS ONE IS A VALID COMMENT 
                            <div className="header-section c14g1H header-section--simple">
                                <div className="header-section__header item-center">
                                    <div className="header-section__header__title">
                                        <span className="_1HWfeJ">Tìm kiếm hàng đầu</span>
                                    </div>
                                    <a className="header-section__header-link" href="/top_products?catId=VN_BITL0_157">
                                        <button className="button-no-outline">Xem tất cả&nbsp;
                                            <svg enable-background="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0" className="svg-icon icon-arrow-right"><path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></path></svg>
                                        </button>
                                    </a>
                                </div>
                                <div className="header-section__content">
                                    <div className="stardust-carousel">
                                        <div className="stardust-carousel__item-list-wrapper">
                                            <ul className="stardust-carousel__item-list" style={{width: '333%', transition: 'all 500ms ease 0s', transform: 'translateX(0%) translateX(0px)'}}>
                                                {this.state.list_trend_search.map(item=>
                                                <li className="stardust-carousel__item" style={{width: '67%'}}>
                                                    <a className="_2v1m5m _19v7wz" href="/top_products?catId=VN_BITL0_157%3Atop_sold">
                                                        <div className="_2wHcAp">
                                                            <div className="_2vSrVD _1zCwoN _3ZJfNv"></div>
                                                            <div className="_3XtrnR _2IxFy9">
                                                                <img width="invalid-value" height="invalid-value" className="_2LpY01 nO87xn" style={{objectFit: 'contain'}} src={item.image}/>
                                                            </div>
                                                            <div className="_2-yTl9">Bán {item.number_order}k+ / tháng</div>
                                                        </div>
                                                        <div className="_2v3AbD">{item.name}</div>
                                                    </a>
                                                </li>)}
                                            </ul>               
                                        </div>
                                        <div className="stardust-carousel__arrow stardust-carousel__arrow--type-2 stardust-carousel__arrow--prev stardust-carousel__arrow--disabled">
                                            <svg enable-background="new 0 0 13 20" viewBox="0 0 13 20" role="img" className="stardust-icon stardust-icon-arrow-left-bold"><path stroke="none" d="m4.2 10l7.9-7.9-2.1-2.2-9 9-1.1 1.1 1.1 1 9 9 2.1-2.1z"></path></svg>
                                        </div>
                                        <div className="stardust-carousel__arrow stardust-carousel__arrow--type-2 stardust-carousel__arrow--next">
                                            <svg enable-background="new 0 0 13 21" viewBox="0 0 13 21" role="img" className="stardust-icon stardust-icon-arrow-right-bold"><path stroke="none" d="m11.1 9.9l-9-9-2.2 2.2 8 7.9-8 7.9 2.2 2.1 9-9 1-1z"></path></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>*/}
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
                                            <path stroke-linecap="round" d="M1.1,1.1L15.2,15.2"></path>
                                            <path stroke-linecap="round" d="M15,1L0.9,15.1"></path>
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
                                            <div className="_2O4FYU">
                                                {
                                                items.map(item=>
                                                    <div className="_2x8AVA" key={item.item_id}>
                                                        <Link to={{pathname:item.item_url}}>
                                                            <div className="_1C-0ut _3GgDBN">
                                                                <div className="_1gZS6z _1rL6dF">
                                                                    <div className="_25_r8I ggJllv">
                                                                        <img width="invalid-value" height="invalid-value" alt="Apple iPhone 12 Pro 128GB" className="_3-N5L6 _2GchKS" style={{objectFit: 'contain'}} src={item.item_image} />
                                                                        <div className="_39tdMd">
                                                                            <div className="T_lEwS _3MY8oD" style={{color:'rgb(208, 1, 27)'}}>
                                                                                <div className="_1JD7ZJ"></div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="_3nkDd7">
                                                                            <div className="customized-overlay-image">
                                                                                <img src="http://localhost:8000/media/my_web/5a304484b6abd4b950c84d8bc275897b.png" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="_2x8wqR">
                                                                        <div className="_3GAFiR">
                                                                            <div className="ZG__4J">
                                                                                <div className="_10Wbs- _3IqNCf">{item.item_name}</div>
                                                                            </div>
                                                                            <div className="_11xQ9c">
                                                                                {item.percent_discount>0?
                                                                                <div className="_1PWkR nt-medium nt-foot _3nkRL" style={{color: 'rgb(246, 145, 19)'}}>
                                                                                    <svg className="_2DRZW _2xFcL" viewBox="-0.5 -0.5 4 16"><path d="M4 0h-3q-1 0 -1 1a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3q0 1 1 1h3" strokeWidth="1" transform="" stroke="currentColor" fill="#f69113"></path></svg>
                                                                                    <div className="_1FKkT _3Ao0A" style={{color:'white', backgroundColor: 'rgb(246, 145, 19)'}}>{item.percent_discount}% Giảm</div>
                                                                                    <svg className="_2DRZW _2xFcL" viewBox="-0.5 -0.5 4 16"><path d="M4 0h-3q-1 0 -1 1a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3q0 1 1 1h3" strokeWidth="1" transform="rotate(180) translate(-3 -15)" stroke="currentColor" fill="#f69113"></path></svg>
                                                                                </div>:""}
                                                                            </div>
                                                                        </div>
                                                                        <div className="_7rV1tW _3_FVSo">
                                                                            <div className="zp9xm9 _2Dfuwn">
                                                                                <span className="_3DgLDE">₫</span>
                                                                                <span className="_19hRcI">{formatter.format((item.item_max+item.item_min)/2)}</span>
                                                                            </div>
                                                                            <div className="_1uq9fs _3yTzjb"></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="item-card__hover-footer _2dFe5v">Tìm sản phẩm tương tự</div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                    )
                                                }
                                            </div>
                                            <div className="_1AKybG">
                                                <a className="btn-light btn-l btn--inline  _1J-Y2w" href="#">Xem thêm</a>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            :''}
                            </div>
                        </div>
                    </div>
                </div>
                <div id="modal"></div>
                <div id="mini-chat-embedded" style={{position: 'fixed', right: '8px', bottom: '0px', zIndex: 99999}}>
                    <Message/>
                </div>
            </>
        );
      }
}