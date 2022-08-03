import {rating_choice} from "../constants"
import Itemsearch from "./Listitem"
import React, {useState, useEffect,useRef} from 'react'
import SlideshowGallery from "../hocs/Slideshow"
import axios from "axios"
import {useNavigate , Link,useLocation, Navigate,useParams,useSearchParams} from 'react-router-dom';
import { headers } from "../actions/auth";
import { categoryinfoURL, searchURL } from "../urls";
let PageSize=30
const Categorydetail = ({data,category_id}) => {
    const {slug}=useParams();
    const [FormData,setFormData]=useState({minPrice:null,maxPrice:null})
    const [show,setShow]=useState(false)
    const [categories,setCategory]=useState({category_children:[],category_choice:[]})
    const [params, setSearchParams] = useSearchParams();
    const [searchitem,setSearchitem]=useState({page:1,sortby:'pop'})
    const search=Object.fromEntries([...params])
    const [listitem,setListitem]=useState()
    const[type,setType]=useState()
    const[page_count]=useState(1)
    useEffect(()=>{
        (async()=>{
            if(category_id){
                const res =await axios.get(`${categoryinfoURL}?category_id=${category_id}`,headers)
                setCategory(res.data)
            }
        })()
    },[category_id])

    useEffect(()=>{
        (async()=>{
            if(category_id){
            const usesearch=params
            usesearch.set('category_id',category_id)
            const res =await axios.get(`${searchURL}?${usesearch}`,headers)
            setListitem(res.data)
            }
        })()
    },[params,category_id])

    const setsearchitem=(items)=>{
        setSearchitem(items) 
        setSearchParams(items)
    }
    const rating_review_choice=(number,value)=>{
        const rating_score=[]
        for(let i=1;i<number;i++){
            if (value>=i){
                rating_score.push(<svg viewBox="0 0 9.5 8" className="svg-icon rating-stars__star icon-rating-colored"><defs><linearGradient id="ratingStarGradient" x1="50%" x2="50%" y1="0%" y2="100%"><stop offset="0" stopColor="#ffca11"></stop><stop offset="1" stopColor="#ffad27"></stop></linearGradient><polygon id="ratingStar" points="14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903"></polygon></defs><g fill="url(#ratingStarGradient)" fillRule="evenodd" stroke="none" strokeWidth="1"><g transform="translate(-876 -1270)"><g transform="translate(155 992)"><g transform="translate(600 29)"><g transform="translate(10 239)"><g transform="translate(101 10)"><use stroke="#ffa727" strokeWidth=".5" xlinkHref="#ratingStar"></use></g></g></g></g></g></g></svg>)
            }
            else{
                rating_score.push(
                    <div className="rating-stars__star _2Jb05n" style={{width: '14px', height: '14px'}}>
                        <svg viewBox="0 0 30 30" className="_3c6iA8"><defs><linearGradient id="star__hollow" x1="50%" x2="50%" y1="0%" y2="99.0177926%"><stop offset="0%" stopColor="#FFD211"></stop><stop offset="100%" stopColor="#FFAD27"></stop></linearGradient></defs><path fill="none" fillRule="evenodd" stroke="url(#star__hollow)" strokeWidth="2" d="M23.226809 28.390899l-1.543364-9.5505903 6.600997-6.8291523-9.116272-1.4059447-4.01304-8.63019038-4.013041 8.63019038-9.116271 1.4059447 6.600997 6.8291523-1.543364 9.5505903 8.071679-4.5038874 8.071679 4.5038874z"></path></svg>
                        <svg viewBox="0 0 30 30" className="_3c6iA8" style={{width: '0%'}}><defs><linearGradient id="star__solid" x1="50%" x2="50%" y1="0%" y2="100%"><stop offset="0%" stopColor="#FFCA11"></stop><stop offset="100%" stopColor="#FFAD27"></stop></linearGradient></defs><path fill="url(#star__solid)" fillRule="evenodd" d="M14.9988798 25.032153l-8.522024 4.7551739c-.4785069.2670004-.7939037.0347448-.7072938-.5012115l1.6339124-10.1109185-6.8944622-7.1327607c-.3871203-.4005006-.2499178-.7947292.2865507-.8774654l9.5090982-1.46652789L14.5740199.51703028c.2346436-.50460972.6146928-.50543408.8497197 0l4.2693588 9.18141263 9.5090986 1.46652789c.545377.0841102.680337.4700675.28655.8774654l-6.894462 7.1327607 1.633912 10.1109185c.08788.5438118-.232337.7662309-.707293.5012115l-8.5220242-4.7551739z"></path></svg>
                    </div>
                )
            }
        }
        return rating_score
    }
    const setrangeprice=()=>{
        const searchitems={...searchitem,...FormData}
        setsearchitem(searchitems)
    }
    const setsearch=(name,value)=>{
        delete searchitem.order
        const searchitems={...searchitem,[name]:value}
        setsearchitem(searchitems)
    }
    return(
        <div className="category-content">
            <div className="containers category-banners">
                <div style={{width:'100%'}}>
                    <SlideshowGallery
                        list_image={data.image_home}
                        automatic={true}
                        timeout={`2500`}
                        dot={true}
                    />
                </div>
            </div>
            {/*
            <div className="containers _3wA4TW">
                <div className="ofs-carousel">
                    <div className="ofs-carousel__header">
                        <Link className="ofs-carousel__header-left ofs-carousel__header-left--clickable" to="/mall/Thời-Trang-Nam-cat.11035567">Anhdai Mall</Link>
                        <Link className="ofs-carousel__header-right" to="/mall/brands/11035567">
                            <div className="ofs-page__section-header-see-all item-center">Xem tất cả
                                <svg enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0" className="svg-icon icon-arrow-right"><path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></path></svg>
                            </div>
                        </Link>
                    </div>
                    <div className="ofs-carousel__items">
                        <div className="image-carousel">
                            <div className="image-carousel__item-list-wrapper">
                                <ul className="image-carousel__item-list" style={{width: '200%', transform: 'translate(0px, 0px)', transition: 'all 500ms ease 0s'}}>
                                    <li className="image-carousel__item" style={{padding: '0px',width: '16.6667%'}}>
                                        <div className="ofs-carousel__column ofs-carousel__column--two-row">
                                            <div className="ofs-carousel__item">
                                                <Link className="ofs-carousel__shop-cover-image" to="/sp.btw2">
                                                    <div className="_25_r8I">
                                                        <div className="ofs-carousel__cover-image _2GchKS" style={{backgroundImage:`url(&quot;https://cf.shopee.vn/file/267d8d4a6f5cf38e471fcb2a4b2e7584&quot;)`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}}></div>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="ofs-carousel__item">
                                                <Link className="ofs-carousel__shop-cover-image" to="/coolmate.vn">
                                                    <div className="_25_r8I">
                                                        <div className="ofs-carousel__cover-image _2GchKS" style={{backgroundImage: `url(&quot;https://cf.shopee.vn/file/63072c90d0ed6f1acdbc301f4e35f890&quot;)`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}}></div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="carousel-arrow carousel-arrow--prev carousel-arrow--hint carousel-arrow--hidden" role="button" tabIndex="0" style={{opacity: 1, visibility: 'hidden', transform: 'translateX(calc(-50% + 0px))'}}>
                                <svg enableBackground="new 0 0 13 20" viewBox="0 0 13 20" x="0" y="0" className="svg-icon icon-arrow-left-bold"><polygon points="4.2 10 12.1 2.1 10 -.1 1 8.9 -.1 10 1 11 10 20 12.1 17.9"></polygon></svg>
                            </div>
                            <div className="carousel-arrow carousel-arrow--next carousel-arrow--hint" role="button" tabIndex="0" style={{opacity: 1, visibility: 'visible', transform: 'translateX(calc(50% - 0px))'}}>
                                <svg enableBackground="new 0 0 13 21" viewBox="0 0 13 21" x="0" y="0" className="svg-icon icon-arrow-right-bold"><polygon points="11.1 9.9 2.1 .9 -.1 3.1 7.9 11 -.1 18.9 2.1 21 11.1 12 12.1 11"></polygon></svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="containers _3wA4TW">
                <div className="ofs-carousel">
                    <div className="ofs-carousel__header">
                        <Link className="ofs-carousel__header-left ofs-carousel__header-left--clickable" to="/mall/Thời-Trang-Nam-cat.11035567">Anhdai Mall</Link>
                        <Link className="ofs-carousel__header-right" to="/mall/brands/11035567">
                            <div className="ofs-page__section-header-see-all item-center">Xem tất cả
                                <svg enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0" className="svg-icon icon-arrow-right"><path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></path></svg>
                            </div>
                        </Link>
                    </div>
                    <div className="ofs-carousel__items">
                        <div className="image-carousel">
                            <div className="image-carousel__item-list-wrapper">
                                <ul className="image-carousel__item-list" style={{width: '200%', transform: 'translate(0px, 0px)', transition: 'all 500ms ease 0s'}}>
                                    <li className="image-carousel__item" style={{padding: '0px',width: '16.6667%'}}>
                                        <div className="ofs-carousel__column ofs-carousel__column--two-row">
                                            <div className="ofs-carousel__item">
                                                <Link className="ofs-carousel__shop-cover-image" to="/sp.btw2">
                                                    <div className="_25_r8I">
                                                        <div className="ofs-carousel__cover-image _2GchKS" style={{backgroundImage: `url(&quot;https://cf.shopee.vn/file/267d8d4a6f5cf38e471fcb2a4b2e7584&quot;)`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}}></div>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="ofs-carousel__item">
                                                <Link className="ofs-carousel__shop-cover-image" to="/coolmate.vn">
                                                    <div className="_25_r8I">
                                                        <div className="ofs-carousel__cover-image _2GchKS" style={{backgroundImage: `url(&quot;https://cf.shopee.vn/file/63072c90d0ed6f1acdbc301f4e35f890&quot;)`, backgroundSize: 'contain',backgroundRepeat: 'no-repeat'}}></div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </li>                             
                                </ul>
                            </div>
                            <div className="carousel-arrow carousel-arrow--prev carousel-arrow--hint carousel-arrow--hidden" role="button" tabIndex="0" style={{opacity: 1, visibility: 'hidden', transform: 'translateX(calc(-50% + 0px))'}}>
                                <svg enableBackground="new 0 0 13 20" viewBox="0 0 13 20" x="0" y="0" className="svg-icon icon-arrow-left-bold"><polygon points="4.2 10 12.1 2.1 10 -.1 1 8.9 -.1 10 1 11 10 20 12.1 17.9"></polygon></svg>
                            </div>
                            <div className="carousel-arrow carousel-arrow--next carousel-arrow--hint" role="button" tabIndex="0" style={{opacity: 1, visibility: 'visible', transform: 'translateX(calc(50% - 0px))'}}>
                                <svg enableBackground="new 0 0 13 21" viewBox="0 0 13 21" x="0" y="0" className="svg-icon icon-arrow-right-bold"><polygon points="11.1 9.9 2.1 .9 -.1 3.1 7.9 11 -.1 18.9 2.1 21 11.1 12 12.1 11"></polygon></svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>*/}
            {data?
            <div className="d-flex mt-2 containers">
                <div className="filter-panel">
                    <div className="category-list">
                        <Link className="category-list__header" to="/all_categories">
                            <svg viewBox="0 0 12 10" className="svg-icon category-list__header-icon icon-all-cate">
                                <g fillRule="evenodd" stroke="none" strokeWidth="1"><g transform="translate(-373 -208)"><g transform="translate(155 191)"><g transform="translate(218 17)"><path d="m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z"></path><path d="m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z"></path><path d="m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z"></path></g></g></g></g>
                            </svg>
                            Tất cả Danh mục
                        </Link>
                        <div className="category-list__body">
                            <div className="category-list__category">
                                <div className="category-list__main-category category-list__main-category--active">
                                    <Link className="category-list__main-category__link" to={`/${slug}`}>
                                        <svg viewBox="0 0 4 7" className="svg-icon category-list__main-category__caret icon-down-arrow-right-filled"><polygon points="4 3.5 0 0 0 7"></polygon></svg>
                                        {data.title}
                                    </Link>
                                </div>
                                
                                <div className="folding-items category-list__sub-category-list folding-items--folded">
                                    {categories.category_children.map((category,index)=>{
                                        if(index<3){
                                            return (<Link key={index} className="category-list__sub-category" to={category.url}>
                                                <svg viewBox="0 0 4 7" className="svg-icon category-list__sub-category__caret icon-down-arrow-right-filled"><polygon points="4 3.5 0 0 0 7"></polygon>
                                                </svg>{category.title}
                                            </Link>)
                                            }
                                        })
                                    }
                                    {categories.category_children.length>2?
                                    <div className="stardust-dropdown folding-items__toggle">
                                        <div className="stardust-dropdown__item-header">
                                            <div className="category-list__toggle-btn">Thêm
                                                <svg enableBackground="new 0 0 11 11" viewBox="0 0 11 11" role="img" className="stardust-icon stardust-icon-arrow-down"><path stroke="none" d="m11 2.5c0 .1 0 .2-.1.3l-5 6c-.1.1-.3.2-.4.2s-.3-.1-.4-.2l-5-6c-.2-.2-.1-.5.1-.7s.5-.1.7.1l4.6 5.5 4.6-5.5c.2-.2.5-.2.7-.1.1.1.2.3.2.4z"></path></svg>
                                            </div>
                                        </div>

                                        <div className="stardust-dropdown__item-body">
                                            <div className="folding-items__folded-items">
                                                {categories.category_children.map((category,index)=>{
                                                    if(index>=3){
                                                        return (
                                                        <Link key={index} className="category-list__sub-category" to={category.url}>
                                                        <svg viewBox="0 0 4 7" className="svg-icon category-list__sub-category__caret icon-down-arrow-right-filled"><polygon points="4 3.5 0 0 0 7"></polygon>
                                                        </svg>{category.title}
                                                        </Link>)
                                                        }
                                                    })
                                                    }
                                            </div>
                                        </div>
                                    </div>:""}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="search-filter-status _3rumdU">
                        <svg enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className="svg-icon "><g><polyline fill="none" points="5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"></polyline></g></svg>
                        <div className="search-filter-status__text">Bộ lọc tìm kiếm</div>
                    </div>
                    <div className="filter-group facet-filter">
                        <div className="filter-group__header">Theo Danh Mục</div>
                        <div className="folding-items filter-group__body folding-items--folded">
                            {categories.category_choice.map((category,index)=>{
                                if(index<2){
                                    return(
                                        <div key={index} onClick={()=>setsearch('categoryID',category.id)} className="checkbox-filter">
                                            <div className={`checkbox ${search.categoryID!=undefined && search.categoryID==category.id?'checkbox--checked':''}`}>
                                                <label className="checkbox__control">
                                                    <input type="checkbox" name="" value="100557"/>
                                                    <div className={`checkbox__box ${search.categoryID!=undefined && search.categoryID==category.id?'checkbox__box--checked':''}`}>
                                                        {search.categoryID!=undefined && search.categoryID==category.id?
                                                        <svg enableBackground="new 0 0 12 12" viewBox="0 0 12 12" x="0" y="0" className="svg-icon icon-checkbox-ticked checkbox__tick icon-tick-bold"><g><path d="m5.2 10.9c-.2 0-.5-.1-.7-.2l-4.2-3.7c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l3.4 3 5.1-7c .3-.4 1-.5 1.4-.2s.5 1 .2 1.4l-5.7 7.9c-.2.2-.4.4-.7.4 0-.1 0-.1-.1-.1z"></path></g></svg>
                                                        :<i> </i>}
                                                    </div>
                                                    <span className="checkbox__label">{category.title} ({category.count_item}+)</span>
                                                </label>
                                            </div>
                                        </div>
                                    )
                                }
                            })}
                            {categories.category_choice.length>2?
                            <div className="stardust-dropdown folding-items__toggle">
                                <div className="stardust-dropdown__item-header">
                                    <div className="filter-group__toggle-btn">
                                        Thêm<svg enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0" className="svg-icon icon-arrow-down"><g><path d="m11 2.5c0 .1 0 .2-.1.3l-5 6c-.1.1-.3.2-.4.2s-.3-.1-.4-.2l-5-6c-.2-.2-.1-.5.1-.7s.5-.1.7.1l4.6 5.5 4.6-5.5c.2-.2.5-.2.7-.1.1.1.2.3.2.4z"></path></g></svg>
                                    </div>
                                </div>
                                <div className="stardust-dropdown__item-body">
                                    <div className="folding-items__folded-items">
                                    {categories.category_choice.map((category,index)=>{
                                        if(index>2){
                                            return(
                                                <div key={index} className="checkbox-filter">
                                                    <div className={`checkbox ${search.categoryID!=undefined && search.categoryID==category.id?'checkbox--checked':''}`}>
                                                        <label className="checkbox__control">
                                                            <input type="checkbox" name="" value="100557"/>
                                                            <div className={`checkbox__box ${search.categoryID!=undefined && search.categoryID==category.id?'checkbox__box--checked':''}`}>
                                                                {search.categoryID!=undefined && search.categoryID==category.id?
                                                                <svg enableBackground="new 0 0 12 12" viewBox="0 0 12 12" x="0" y="0" className="svg-icon icon-checkbox-ticked checkbox__tick icon-tick-bold"><g><path d="m5.2 10.9c-.2 0-.5-.1-.7-.2l-4.2-3.7c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l3.4 3 5.1-7c .3-.4 1-.5 1.4-.2s.5 1 .2 1.4l-5.7 7.9c-.2.2-.4.4-.7.4 0-.1 0-.1-.1-.1z"></path></g></svg>
                                                                :<i> </i>}
                                                            </div>
                                                            <span className="checkbox__label">{category.title} ({category.count_item}+)</span>
                                                        </label>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    })}
                                    </div>
                                </div>
                            </div>:''}
                        </div>
                    </div>
                    {listitem?
                    <div className="filter-group location-filter">
                        <div className="filter-group__header">Nơi Bán</div>
                        <div className="folding-items filter-group__body folding-items--folded">
                            {listitem.cities.map(item=>
                            <div key={item} onClick={()=>setsearch('locations',item)} className="checkbox-filter filter--active">
                                <div className={`checkbox ${search.locations!=undefined && search.locations==item?'chekbox--checked':''}`}>
                                    <label className="checkbox__control">
                                        <input type="checkbox" name="" value={item}/>
                                        <div className={`checkbox__box ${search.locations!=undefined && search.locations==item?'checkbox__box--checked':''}`}>
                                            {search.locations!=undefined && search.locations==item?
                                            <svg enableBackground="new 0 0 12 12" viewBox="0 0 12 12" x="0" y="0" className="svg-icon icon-checkbox-ticked checkbox__tick icon-tick-bold"><g><path d="m5.2 10.9c-.2 0-.5-.1-.7-.2l-4.2-3.7c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l3.4 3 5.1-7c .3-.4 1-.5 1.4-.2s.5 1 .2 1.4l-5.7 7.9c-.2.2-.4.4-.7.4 0-.1 0-.1-.1-.1z"></path></g></svg>
                                            :<i></i>}
                                        </div>
                                        <span className="checkbox__label">{item}</span>
                                    </label>
                                </div>
                            </div>
                            )}
                        </div>
                    </div>:''}
                    {listitem?
                    <div className="filter-group logistics-filter">
                        <div className="filter-group__header">Đơn Vị Vận Chuyển</div>
                        <div className="folding-items filter-group__body folding-items--folded">
                            {listitem.unitdelivery.map(item=>
                            <div key={item} onClick={()=>setsearch('shippingOptions',item)} className="checkbox-filter filter--active">
                                <div className="checkbox chekbox--checked">
                                    <label className="checkbox__control">
                                        <input type="checkbox" name="" value={item}/>
                                        <div className={`checkbox__box ${search.shippingOptions!=undefined && search.shippingOptions==item?'checkbox__box--checked':''}`}>
                                            {search.shippingOptions!=undefined && search.shippingOptions==item?
                                            <svg enableBackground="new 0 0 12 12" viewBox="0 0 12 12" x="0" y="0" className="svg-icon icon-checkbox-ticked checkbox__tick icon-tick-bold"><g><path d="m5.2 10.9c-.2 0-.5-.1-.7-.2l-4.2-3.7c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l3.4 3 5.1-7c .3-.4 1-.5 1.4-.2s.5 1 .2 1.4l-5.7 7.9c-.2.2-.4.4-.7.4 0-.1 0-.1-.1-.1z"></path></g></svg>
                                            :<i></i>}
                                        </div>
                                        <span className="checkbox__label">{item}</span>
                                    </label>
                                </div>
                            </div>
                            )}
                        </div>
                    </div>:''}
                    {listitem?
                    <div className="filter-group brands-filter">
                        <div className="filter-group__header">Thương Hiệu</div>
                        <div className="folding-items filter-group__body folding-items--folded">
                            {listitem.brands.map(item=>
                            <div key={item} onClick={()=>setsearch('brand',item)} className="checkbox-filter filter--active">
                                <div className="checkbox checkbox--checked">
                                    <label className="checkbox__control">
                                        <input type="checkbox" name="" value={item}/>
                                        <div className={`checkbox__box ${search.brand!=undefined && search.brand==item?'checkbox__box--checked':''}`}>
                                            {search.brand!=undefined && search.brand==item?
                                            <svg enableBackground="new 0 0 12 12" viewBox="0 0 12 12" x="0" y="0" className="svg-icon icon-checkbox-ticked checkbox__tick icon-tick-bold"><g><path d="m5.2 10.9c-.2 0-.5-.1-.7-.2l-4.2-3.7c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l3.4 3 5.1-7c .3-.4 1-.5 1.4-.2s.5 1 .2 1.4l-5.7 7.9c-.2.2-.4.4-.7.4 0-.1 0-.1-.1-.1z"></path></g></svg>
                                            :<i></i>}
                                        </div>
                                        <span className="checkbox__label">{item}</span>
                                    </label>
                                </div>
                            </div>
                            )}
                        </div>
                    </div>:''}
                    <div className="filter-group price-range-filter price-range-filter--vn">
                        <div className="filter-group__header price-range-filter__header">Khoảng Giá</div>
                        <div className="filter-group__body price-range-filter__edit">
                            <div className="price-range-filter__inputs">
                                <input onChange={(e)=>setFormData({...FormData,minPrice:e.target.value})} type="text" maxLength="13" className="price-range-filter__input" placeholder="₫ TỪ" value={FormData.minPrice!=search.minPrice?FormData.minPrice:search.minPrice}/>
                                <div className="price-range-filter__range-line"></div>
                                <input onChange={(e)=>setFormData({...FormData,maxPrice:e.target.value})} type="text" maxLength="13" className="price-range-filter__input" placeholder="₫ ĐẾN" value={FormData.maxPrice!=search.maxPrice?FormData.maxPrice:search.maxPrice}/>
                            </div>
                        </div>
                        <button onClick={()=>setrangeprice()} className="button-solid button-solid--primary _1-VOCH" style={{backgroundColor: 'rgb(238, 77, 45)'}}>Áp dụng</button>
                    </div>
                    {listitem?
                    <div className="filter-group">
                        <div className="filter-group__header">Loại Shop</div>
                        <div className="folding-items filter-group__body folding-items--folded">
                            {listitem.shoptype.map(item=>
                                <div key={item.value} onClick={()=>setsearch('shoptype',item.value)} className="checkbox-filter filter--active">
                                    <div className="checkbox checkbox--checked">
                                        <label className="checkbox__control">
                                            <input type="checkbox" name="" value="5"/>
                                            <div className={`checkbox__box ${search.shoptype!=undefined && search.shoptype==item.value?'checkbox__box--checked':''}`}>
                                                {search.shoptype!=undefined && search.shoptype==item.value?
                                                <svg enableBackground="new 0 0 12 12" viewBox="0 0 12 12" x="0" y="0" className="svg-icon icon-checkbox-ticked checkbox__tick icon-tick-bold"><g><path d="m5.2 10.9c-.2 0-.5-.1-.7-.2l-4.2-3.7c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l3.4 3 5.1-7c .3-.4 1-.5 1.4-.2s.5 1 .2 1.4l-5.7 7.9c-.2.2-.4.4-.7.4 0-.1 0-.1-.1-.1z"></path></g></svg>
                                                :<i></i>}
                                            </div>
                                            <span className="checkbox__label">{item.name}</span>
                                        </label>
                                    </div>
                                </div>
                            )} 
                        </div>
                    </div>:''}
                    {listitem?
                    <div className="filter-group">
                        <div className="filter-group__header">Tình Trạng</div>
                        <div className="folding-items filter-group__body folding-items--folded">
                            {listitem.status.map(item=>
                            <div key={item.value} onClick={()=>setsearchitem('status',item.value)} className="checkbox-filter">
                                <div className="checkbox">
                                    <label className="checkbox__control">
                                        <input type="checkbox" name="" value="9"/>
                                        <div className={`checkbox__box ${search.status!=undefined && search.status==item.value?'checkbox__box--checked':''}`}>
                                            {search.status!=undefined && search.status==item.value?
                                            <svg enableBackground="new 0 0 12 12" viewBox="0 0 12 12" x="0" y="0" className="svg-icon icon-checkbox-ticked checkbox__tick icon-tick-bold"><g><path d="m5.2 10.9c-.2 0-.5-.1-.7-.2l-4.2-3.7c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l3.4 3 5.1-7c .3-.4 1-.5 1.4-.2s.5 1 .2 1.4l-5.7 7.9c-.2.2-.4.4-.7.4 0-.1 0-.1-.1-.1z"></path></g></svg>
                                            :<i></i>}
                                        </div>
                                        <span className="checkbox__label">{item.name}</span>
                                    </label>
                                </div>
                            </div>
                            )}
                            
                        </div>
                    </div>:''}   
                    <div className="filter-group">
                        <div className="filter-group__header">Các lựa chọn thanh toán</div>
                        <div className="folding-items filter-group__body folding-items--folded">
                            <div>
                                <div style={{height: '1px'}}></div>
                            </div>
                        </div>
                    </div>
                    <div className="filter-group _1OOUMW">
                        <div className="filter-group__header">Đánh Giá</div>
                        <div className="folding-items filter-group__body folding-items--folded">
                            {rating_choice.map(item=>{
                                if(item>1){
                                return(
                                    <div key={item} onClick={()=>setsearch('rating',item)} className={`_1LYq_U ${search.rating!=undefined &&parseInt(search.rating)==item?'NvQodS':''}`}>
                                        <div className="rating-stars__container">
                                            {rating_review_choice(6,item)}
                                        </div>
                                        trở lên
                                    </div>)
                                }
                                return(
                                <div key={item} className={`stardust-dropdown folding-items__toggle ${show?'stardust-dropdown--open':''}`}>
                                    <div onClick={()=>setShow(true)} className="stardust-dropdown__item-header">
                                        <div className="filter-group__toggle-btn">Thêm
                                            <svg enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0" className="svg-icon icon-arrow-down"><g><path d="m11 2.5c0 .1 0 .2-.1.3l-5 6c-.1.1-.3.2-.4.2s-.3-.1-.4-.2l-5-6c-.2-.2-.1-.5.1-.7s.5-.1.7.1l4.6 5.5 4.6-5.5c.2-.2.5-.2.7-.1.1.1.2.3.2.4z"></path></g></svg>
                                        </div>
                                    </div>
                                    <div className={`stardust-dropdown__item-body ${show?'stardust-dropdown__item-body--open':''}`}>
                                        <div className="folding-items__folded-items">
                                        <div onClick={()=>setsearch('rating',item)} className={`_1LYq_U ${search.rating!=undefined && parseInt(search.rating)==item?'NvQodS':''}`}>
                                                <div onClick={()=>setsearch('rating',item)} className="rating-stars__container">
                                                    {rating_review_choice(6,item)}
                                                </div>
                                                trở lên
                                            </div>
                                        </div>
                                    </div>
                                </div>)
                            })}
                        </div>
                    </div>
                    <div className="filter-group">
                        <div className="filter-group__header">Dịch Vụ &amp; Khuyến Mãi</div>
                            <div className="folding-items filter-group__body folding-items--folded">
                                <div>
                                    <div style={{height: '1px'}}></div>
                                </div>
                                <div>
                                    <div style={{height: '1px'}}></div>
                                </div>
                            <div className="checkbox-filter">
                                <div className="checkbox">
                                    <label className="checkbox__control">
                                        <input type="checkbox" name="" value="10"/>
                                        <div className="checkbox__box"><i> </i></div>
                                        <span className="checkbox__label">Đang giảm giá</span>
                                    </label>
                                </div>
                            </div>
                            <div className="checkbox-filter">
                                <div className="checkbox">
                                    <label className="checkbox__control">
                                        <input type="checkbox" name="" value="11"/>
                                        <div className="checkbox__box"><i> </i></div>
                                        <span className="checkbox__label">Miễn phí vận chuyển</span>
                                    </label>
                                </div>
                            </div>
                            <div className="stardust-dropdown folding-items__toggle">
                                <div className="stardust-dropdown__item-header">
                                    <div className="filter-group__toggle-btn">Thêm
                                        <svg enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0" className="svg-icon icon-arrow-down"><g><path d="m11 2.5c0 .1 0 .2-.1.3l-5 6c-.1.1-.3.2-.4.2s-.3-.1-.4-.2l-5-6c-.2-.2-.1-.5.1-.7s.5-.1.7.1l4.6 5.5 4.6-5.5c.2-.2.5-.2.7-.1.1.1.2.3.2.4z"></path></g></svg>
                                    </div>
                                </div>
                                <div className="stardust-dropdown__item-body">
                                    <div className="folding-items__folded-items">
                                        <div className="checkbox-filter">
                                            <div className="checkbox">
                                                <label className="checkbox__control">
                                                    <input type="checkbox" name="" value="15"/>
                                                    <div className="checkbox__box"><i> </i></div>
                                                    <span className="checkbox__label">Gì Cũng Rẻ</span>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="checkbox-filter">
                                            <div className="checkbox">
                                                <label className="checkbox__control">
                                                    <input type="checkbox" name="" value="12"/>
                                                    <div className="checkbox__box"><i> </i></div>
                                                    <span className="checkbox__label">Hàng có sẵn</span>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="checkbox-filter">
                                            <div className="checkbox">
                                                <label className="checkbox__control">
                                                    <input type="checkbox" name="" value="14"/>
                                                    <div className="checkbox__box"><i> </i></div>
                                                    <span className="checkbox__label">Mua giá bán buôn/ bán sỉ</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="button-solid button-solid--primary fAQIgA" style={{backgroundcolor: 'rgb(238, 77, 45)'}}>Xóa tất cả</button>
                </div>
                <div className="OQtnd7">
                    <div className="search-item-result">
                        {listitem?
                        <Itemsearch
                        searchitem={searchitem}
                        setsearchitem={(data)=>setsearchitem(data)}
                        setsearch={(name,value)=>setsearch(name,value)}
                        listitem={listitem.list_item_page}
                        search={search}
                        data={listitem}
                        />:''}
                    </div>
                </div>
            </div>:''}
        </div>
  )
}
export default Categorydetail