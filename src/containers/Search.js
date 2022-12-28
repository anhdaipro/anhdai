import axios from 'axios';
import Navbar from "./Navbar"
import React, {useState, useEffect} from 'react'
import {rating_choice} from "../constants"
import Itemsearch from "./Listitem"
import {searchURL,} from "../urls"
import { useParams,useLocation, Navigate,useSearchParams } from "react-router-dom";
const Searchitem=()=>{
    let location =useLocation();
    
    const [data, setData] = useState(null);
    const [params, setSearchParams] = useSearchParams();
    const shop=new URLSearchParams(document.location.search).get('shop')
    const category=new URLSearchParams(document.location.search).get('shop')
    const [searchitem,setSearchitem]=useState({page:1,sortby:'pop',keyword:new URLSearchParams(document.location.search).get('keyword'),
    })
    const [FormData,setFormData]=useState({minPrice:null,maxPrice:null})
    const [show,setShow]=useState(false)
    
   
    
    useEffect(() => {
        if(params.get('shop')!=null){
            setSearchitem({...searchitem,shop:params.get('shop')});
        }
        if(params.get('category')!=null){
            setSearchitem({...searchitem,category:params.get('category')});
        }
        const getJournal = async () => {
        await axios.get(searchURL+'?'+params)
          .then(res=>{
              setData(res.data)
            })
        }
      getJournal();
    },[params])

    const search=Object.fromEntries([...params])
   
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

    const setsearchitem=(items)=>{
        setSearchitem(items) 
        setSearchParams(items)
    }

    return(
        <>
        <div id="main">
            <div className="_193wCc">
                <div className="item-col top container-wrapper">
                    <Navbar
                        params={params}
                    />
                </div>
                {data!=null?
                <div className="containers _1rdaqq">
                    <div className="filter-panel">
                        <div className="search-filter-status _3rumdU">
                            <svg enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className="svg-icon "><g><polyline fill="none" points="5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"></polyline></g></svg>
                            <div className="search-filter-status__text">Bộ lọc tìm kiếm</div>
                        </div>
                        <div className="filter-group facet-filter">
                            <div className="filter-group__header">Theo Danh Mục</div>
                            <div className="folding-items filter-group__body folding-items--folded">
                                {data.category_choice.map((category,index)=>{
                                    if(index<2){
                                        return(
                                            <div onClick={()=>setsearch('categoryID',category.id)} className="checkbox-filter">
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
                                {data.category_choice.length>2?
                                <div className="stardust-dropdown folding-items__toggle">
                                    <div className="stardust-dropdown__item-header">
                                        <div className="filter-group__toggle-btn">
                                            Thêm<svg enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0" className="svg-icon icon-arrow-down"><g><path d="m11 2.5c0 .1 0 .2-.1.3l-5 6c-.1.1-.3.2-.4.2s-.3-.1-.4-.2l-5-6c-.2-.2-.1-.5.1-.7s.5-.1.7.1l4.6 5.5 4.6-5.5c.2-.2.5-.2.7-.1.1.1.2.3.2.4z"></path></g></svg>
                                        </div>
                                    </div>
                                    <div className="stardust-dropdown__item-body">
                                        <div className="folding-items__folded-items">
                                        {data.category_choice.map((category,index)=>{
                                            if(index>2){
                                                return(
                                                    <div className="checkbox-filter">
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
                        <div className="filter-group location-filter">
                            <div className="filter-group__header">Nơi Bán</div>
                            <div className="folding-items filter-group__body folding-items--folded">
                                {data.cities.map(item=>
                                <div onClick={()=>setsearch('locations',item)} className="checkbox-filter filter--active">
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
                        </div>
                        <div className="filter-group logistics-filter">
                            <div className="filter-group__header">Đơn Vị Vận Chuyển</div>
                            <div className="folding-items filter-group__body folding-items--folded">
                                {data.unitdelivery.map(item=>
                                <div onClick={()=>setsearch('shippingOptions',item)} className="checkbox-filter filter--active">
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
                        </div>
                        <div className="filter-group brands-filter">
                            <div className="filter-group__header">Thương Hiệu</div>
                            <div className="folding-items filter-group__body folding-items--folded">
                                {data.brands.map(item=>
                                <div onClick={()=>setsearch('brand',item)} className="checkbox-filter filter--active">
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
                        </div>
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
                        <div className="filter-group">
                            <div className="filter-group__header">Loại Shop</div>
                            <div className="folding-items filter-group__body folding-items--folded">
                                {data.shoptype.map(item=>
                                    <div onClick={()=>setsearch('shoptype',item.value)} className="checkbox-filter filter--active">
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
                        </div>
                        <div className="filter-group">
                            <div className="filter-group__header">Tình Trạng</div>
                            <div className="folding-items filter-group__body folding-items--folded">
                                {data.status.map(item=>
                                <div onClick={()=>setsearch('status',item.value)} className="checkbox-filter">
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
                        </div>    
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
                                        <div onClick={()=>setsearch('rating',item)} className={`_1LYq_U ${search.rating!=undefined &&parseInt(search.rating)==item?'NvQodS':''}`}>
                                            <div className="rating-stars__container">
                                                {rating_review_choice(6,item)}
                                            </div>
                                            trở lên
                                        </div>)
                                    }
                                    return(
                                    <div className={`stardust-dropdown folding-items__toggle ${show?'stardust-dropdown--open':''}`}>
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
                        <div className="search-user-brief">
                            <div className="header-section header-section--simple">
                                <div className="header-section__header">
                                    <div className="header-section__header__title">Shop liên quan đến <span>
                                        <span>"</span>
                                        <span className="search-user-brief__header-text-highlight">{search.keyword}</span>
                                        <span>"</span>
                                        </span>
                                    </div>
                                    <a className="header-section__header-link" tabIndex="-1" href="/search_user?keyword=yyy">
                                        <button className="button-no-outline">
                                            Thêm kết quả&nbsp;<svg enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0" className="svg-icon icon-arrow-right"><path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></path></svg>
                                        </button>
                                    </a>
                                </div>
                                <div className="header-section__content">
                                    <div className="search-user-item search-user-item--short">
                                        <a className="search-user-item__leading" href="/yyyes.vn">
                                            <div className="avatar">
                                                <div className="avatar__placeholder">
                                                    <svg enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className="svg-icon icon-headshot"><g><circle cx="7.5" cy="4.5" fill="none" r="3.8" stroke-miterlimit="10"></circle><path d="m1.5 14.2c0-3.3 2.7-6 6-6s6 2.7 6 6" fill="none" strokeLinecap="round" stroke-miterlimit="10"></path></g></svg>
                                                </div>
                                                <div className="_25_r8I avatar__img-wrapper">
                                                    <div className="avatar__img _2GchKS" style={{backgroundImage: `url(&quot;https://cf.shopee.vn/file/dbaef76b77f09111ded3a82bb9cdb726_tn&quot;)`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}}></div>
                                                </div>
                                            </div>
                                            <div className="search-user-item__leading__prefer-badge-wrapper">
                                                <div className="_2vYHuP _3KOA3x _1Syx5m">Yêu thích</div>
                                            </div>
                                        </a>
                                        <a className="search-user-item__shop-info" href="/yyyes.vn">
                                            <div className="search-user-item__nickname">yyyes.vn</div>
                                            <div className="search-user-item__username">yyyes.vn</div>
                                            <div className="search-user-item__follow-count">
                                                <span className="search-user-item__follow-count-number">3,7k</span>
                                                <span> Người theo dõi</span>
                                                <span> | </span>
                                                <span className="search-user-item__follow-count-number">8</span>
                                                <span> Đang Theo</span>
                                            </div>
                                        </a>
                                        <div className="search-user-item__statistics">
                                            <div className="search-user-seller-info-item">
                                                <div className="search-user-seller-info-item__wrapper">
                                                    <div className="search-user-seller-info-item__header">
                                                        <svg enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className="svg-icon icon-products"><g><path d="m10 1 4.5 2.5-.5 3h-2v7.5h-9v-7.5h-2l-.5-3 4.6-2.5c.3 1.1 1.3 1.9 2.4 1.9s2.1-.8 2.5-1.9z" fill="none" strokeLinecap="round" stroke-linejoin="round" stroke-miterlimit="10"></path><line fill="none" strokeLinecap="round" stroke-miterlimit="10" x1="3" x2="12" y1="11.5" y2="11.5"></line></g></svg>
                                                        <span className="search-user-seller-info-item__primary-text">651</span>
                                                    </div>
                                                     <div className="search-user-seller-info-item__complement-text">Sản phẩm</div>
                                                </div>
                                            </div>
                                            <div className="search-user-seller-info-item">
                                                <div className="search-user-seller-info-item__wrapper">
                                                    <div className="search-user-seller-info-item__header">
                                                        <svg enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className="svg-icon icon-rating"><polygon fill="none" points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4" strokeLinecap="round" stroke-linejoin="round" stroke-miterlimit="10"></polygon></svg>
                                                        <span className="search-user-seller-info-item__primary-text">4.6</span>
                                                    </div>
                                                    <div className="search-user-seller-info-item__complement-text">Đánh giá</div>
                                                </div>
                                            </div>
                                            <div className="search-user-seller-info-item">
                                                <div className="search-user-seller-info-item__wrapper">
                                                    <div className="search-user-seller-info-item__header">
                                                        <svg enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className="svg-icon "><g><polygon fill="none" points="14 10.8 7 10.8 3 13.8 3 10.8 1 10.8 1 1.2 14 1.2" stroke-linejoin="round" stroke-miterlimit="10"></polygon><circle cx="4" cy="5.8" r="1" stroke="none"></circle><circle cx="7.5" cy="5.8" r="1" stroke="none"></circle><circle cx="11" cy="5.8" r="1" stroke="none"></circle></g></svg>
                                                        <span className="search-user-seller-info-item__primary-text">91%</span>
                                                    </div>
                                                    <div className="search-user-seller-info-item__complement-text">tỉ lệ phản hồi</div>
                                                </div>
                                            </div>
                                            <div className="search-user-seller-info-item">
                                                <div className="search-user-seller-info-item__wrapper">
                                                    <div className="search-user-seller-info-item__header">
                                                        <svg enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className="svg-icon "><g><polyline fill="none" points="7.2 3.5 7.2 7.8 10.5 7.8" strokeLinecap="round" stroke-linejoin="round" stroke-miterlimit="10"></polyline><circle cx="7.5" cy="7.5" fill="none" r="6.5" stroke-miterlimit="10"></circle></g></svg>
                                                        <span className="search-user-seller-info-item__primary-text">trong vài giờ</span>
                                                    </div>
                                                    <div className="search-user-seller-info-item__complement-text">thời gian phản hồi</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="search-item-result">
                            <h1 className="search-result-header">
                                <svg viewBox="0 0 18 24" className="svg-icon icon-hint-bulb"><g transform="translate(-355 -149)"><g transform="translate(355 149)"><g fillRule="nonzero" transform="translate(5.4 19.155556)"><path d="m1.08489412 1.77777778h5.1879153c.51164401 0 .92641344-.39796911.92641344-.88888889s-.41476943-.88888889-.92641344-.88888889h-5.1879153c-.51164402 0-.92641345.39796911-.92641345.88888889s.41476943.88888889.92641345.88888889z"></path><g transform="translate(1.9 2.666667)"><path d="m .75 1.77777778h2.1c.41421356 0 .75-.39796911.75-.88888889s-.33578644-.88888889-.75-.88888889h-2.1c-.41421356 0-.75.39796911-.75.88888889s.33578644.88888889.75.88888889z"></path></g></g><path d="m8.1 8.77777718v4.66666782c0 .4295545.40294373.7777772.9.7777772s.9-.3482227.9-.7777772v-4.66666782c0-.42955447-.40294373-.77777718-.9-.77777718s-.9.34822271-.9.77777718z" fillRule="nonzero"></path><path d="m8.1 5.33333333v.88889432c0 .49091978.40294373.88888889.9.88888889s.9-.39796911.9-.88888889v-.88889432c0-.49091977-.40294373-.88888889-.9-.88888889s-.9.39796912-.9.88888889z" fillRule="nonzero"></path><path d="m8.80092773 0c-4.86181776 0-8.80092773 3.97866667-8.80092773 8.88888889 0 1.69422221.47617651 3.26933331 1.295126 4.61333331l2.50316913 3.9768889c.30201078.4782222.84303623.7697778 1.42482388.7697778h7.17785139c.7077799 0 1.3618277-.368 1.7027479-.9617778l2.3252977-4.0213333c.7411308-1.2888889 1.1728395-2.7786667 1.1728395-4.37688891 0-4.91022222-3.9409628-8.88888889-8.80092777-8.88888889m0 1.77777778c3.82979317 0 6.94810087 3.18933333 6.94810087 7.11111111 0 1.24444441-.3168334 2.43022221-.9393833 3.51466671l-2.3252977 4.0213333c-.0166754.0284444-.0481735.0462222-.0833772.0462222h-7.07224026l-2.43461454-3.8648889c-.68184029-1.12-1.04128871-2.4053333-1.04128871-3.71733331 0-3.92177778 3.11645483-7.11111111 6.94810084-7.11111111"></path></g></g></svg>
                                    <span className="search-result-header__text">Kết quả tìm kiếm cho từ khoá '
                                    <span className="search-result-header__text-highlight" style={{color: 'rgb(238, 77, 45)', fontWeight: 400}}>{search.keyword}</span>'
                                </span>
                            </h1>
                            <Itemsearch
                            searchitem={searchitem}
                            setsearch={setsearch}
                            listitem={data.list_item_page}
                            setsearchitem={items=>setsearchitem(items)}
                            search={search}
                            data={data}
                            />
                        </div>
                    </div>
                </div>:''}
            </div>
        </div>
        
        </> 
    )
}

export default Searchitem