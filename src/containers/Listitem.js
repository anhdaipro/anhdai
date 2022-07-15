import {formatter,sort_options,
    rating,sort_price_choice} from "../constants"
import axios from 'axios';
import React, {useState, useEffect,useRef,memo} from 'react'
import Pagination from "../hocs/Pagination"
import {useNavigate, Link,useLocation, Navigate,useParams,useSearchParams} from 'react-router-dom';
const PageSize=30
const Itemsearch=({listitem,setsearch,searchitem,search,data,setsearchitem})=>{
    const [show,setShow]=useState({show_price:false})

    const setsearchprice=(name1,value1,name2,value2)=>{
        delete searchitem.order
        const searchitems={[name2]:value2,...searchitem,[name1]:value1}
        setsearchitem(searchitems)
        setShow({...show,show_price:false})
    }
    
    return(
        <>
            <div className="sort-bar">
                <span className="sort-bar__label">Sắp xếp theo</span>
                <div className="sort-by-options">
                    {sort_options.map(item=>{
                        if(item.value!='price'){
                            return(
                            <div onClick={()=>setsearch('sortby',item.value)} className={`sort-by-options__option ${search.sortby!=undefined && search.sortby==item.value?'sort-by-options__option--selected':search.sortby==undefined && searchitem.sortby==item.value?'sort-by-options__option--selected':''}`}>{item.name}</div>
                            )
                        }
                        return(
                            <div>
                                <div onMouseLeave={()=>setShow({show_price:false})} onMouseEnter={()=>setShow({show_price:true})} className="select-with-status">
                                    <div className="select-with-status__holder select-with-status__box-shadow">
                                        <span className={`select-with-status__${search.order!=undefined?'value':'placeholder'}`}>{search.order!=undefined?sort_price_choice.find(price=>price.value==search.order).name:item.name}</span>
                                        <span>
                                            <svg viewBox="0 0 10 6" className="svg-icon icon-arrow-down-small"><path d="M9.7503478 1.37413402L5.3649665 5.78112957c-.1947815.19574157-.511363.19651982-.7071046.00173827a.50153763.50153763 0 0 1-.0008702-.00086807L.2050664 1.33007451l.0007126-.00071253C.077901 1.18820749 0 1.0009341 0 .79546595 0 .35614224.3561422 0 .7954659 0c.2054682 0 .3927416.07790103.5338961.20577896l.0006632-.00066318.0226101.02261012a.80128317.80128317 0 0 1 .0105706.0105706l3.3619016 3.36190165c.1562097.15620972.4094757.15620972.5656855 0a.42598723.42598723 0 0 0 .0006944-.00069616L8.6678481.20650022l.0009529.0009482C8.8101657.07857935 8.9981733 0 9.2045341 0 9.6438578 0 10 .35614224 10 .79546595c0 .20495443-.077512.39180497-.2048207.53283641l.0003896.00038772-.0096728.00972053a.80044712.80044712 0 0 1-.0355483.03572341z" fillRule="nonzero"></path></svg>
                                        </span>
                                    </div>
                                    <div>
                                        {show.show_price?
                                        <div className='select-with-status__dropdown modal__transition-enter-done'>
                                            {sort_price_choice.map(price=>
                                                <div onClick={()=>setsearchprice('sortby',item.value,'order',price.value)} className='select-with-status__dropdown-item item-space'>
                                                    {price.name}
                                                    {search.order!=undefined && price.value==search.order?
                                                    <svg enable-background="new 0 0 12 12" viewBox="0 0 12 12" x="0" y="0" className="svg-icon icon-tick-bold"><g><path d="m5.2 10.9c-.2 0-.5-.1-.7-.2l-4.2-3.7c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l3.4 3 5.1-7c .3-.4 1-.5 1.4-.2s.5 1 .2 1.4l-5.7 7.9c-.2.2-.4.4-.7.4 0-.1 0-.1-.1-.1z"></path></g></svg>
                                                    :''}
                                                </div>
                                            )}
                                        </div>:''}
                                    </div>
                                </div>
                            </div>
                        )
                    })}  
                </div>
                <div className="mini-page-controller">
                    <div className="mini-page-controller__state">
                        <span className="mini-page-controller__current">1</span>/<span className="mini-page-controller__total">100</span>
                    </div>
                    <button onClick={() => setsearch('page',searchitem.page-1)} className="button-outline mini-page-controller__prev-btn button-outline--disabled" disabled="">
                        <svg viewBox="0 0 7 11" className="svg-icon icon-arrow-left-small"><path d="M4.694078 9.8185598L.2870824 5.4331785c-.1957415-.1947815-.1965198-.511363-.0017382-.7071046a.50867033.50867033 0 0 1 .000868-.0008702L4.7381375.2732784 4.73885.273991c.1411545-.127878.3284279-.205779.5338961-.205779.4393237 0 .7954659.3561422.7954659.7954659 0 .2054682-.077901.3927416-.205779.5338961l.0006632.0006632-.0226101.0226101a.80174653.80174653 0 0 1-.0105706.0105706L2.4680138 4.7933195c-.1562097.1562097-.1562097.4094757 0 .5656855a.45579485.45579485 0 0 0 .0006962.0006944l3.3930018 3.3763607-.0009482.0009529c.128869.1413647.2074484.3293723.2074484.5357331 0 .4393237-.3561422.7954659-.7954659.7954659-.2049545 0-.391805-.077512-.5328365-.2048207l-.0003877.0003896-.0097205-.0096728a.80042023.80042023 0 0 1-.0357234-.0355483z" fillRule="nonzero"></path></svg>
                    </button>
                    <button onClick={() => setsearch('page',searchitem.page+1)} className="button-outline mini-page-controller__next-btn">
                        <svg viewBox="0 0 7 11" className="svg-icon icon-arrow-right-small"><path d="M2.305922 9.81856l4.4069956-4.385381c.1957415-.194782.1965198-.511364.0017382-.707105a.26384055.26384055 0 0 0-.000868-.00087L2.2618625.273278 2.26115.273991C2.1199955.146113 1.9327221.068212 1.7272539.068212c-.4393237 0-.7954659.356142-.7954659.795466 0 .205468.077901.392741.205779.533896l-.0006632.000663.0226101.02261c.0034906.003557.0070143.00708.0105706.010571L4.5319862 4.79332c.1562097.156209.1562097.409475 0 .565685-.0002318.000232-.0004639.000463-.0006962.000694L1.1382882 8.73606l.0009482.000953c-.128869.141365-.2074484.329372-.2074484.535733 0 .439324.3561422.795466.7954659.795466.2049545 0 .391805-.077512.5328365-.204821l.0003877.00039.0097205-.009673c.012278-.011471.0241922-.023327.0357234-.035548z" fillRule="nonzero"></path></svg>
                    </button>
                </div>
            </div>
            {listitem.length>0?
            <div className="home-product">
            {
                listitem.map(item=>
                <div key={item.item_id} className="grid__column-2-4">
                    <Link className="home-product-item" to={item.item_url}>
                    <div className="home-product-item__image" style={{backgroundImage: `url(${item.item_image})`}}></div>
                    <div className="home-product-item-info">
                        <div className="home-product-item__name">{item.item_name}</div>
                        <div className="home-product-item__discount">
                        {item.voucher?
                        <div className="home-product-item__discount-voucher">
                            <svg className="clipath-left" viewBox="-0.5 -0.5 4 16">
                            <path d="M4 0h-3q-1 0 -1 1a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3q0 1 1 1h3" strokeWidth="1" transform="" stroke="currentColor" fill="#f69113"></path>
                            </svg>   
                            <div className="home-product-item__discount-voucher-content">{item.voucher.percent_discount>0?`${item.voucher_percent}%Reduce`:`Giảm ₫${formatter.format(item.voucher_amount)}k`}</div>
                            <svg className="clipath-right" viewBox="-0.5 -0.5 4 16">
                                <path d="M4 0h-3q-1 0 -1 1a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3q0 1 1 1h3" strokeWidth="1" transform="rotate(180) translate(-3 -15)" stroke="currentColor" fill="#f69113"></path>
                            </svg>
                            </div>:''}
                            {item.shock_deal_type!=null?<div className="home-product-item__discount-deal-shock">{item.shock_deal_type=='1'?'Buy with shock deal':"Buy to receive gift"}</div>:
                            item.combo?<div className="home-product-item__discount-deal-shock">combo khuyen mai</div>:
                            ''}
                        </div>
                        <div className="_3_FVSo">  
                            {item.percent_discount>0?
                            <>
                            <div className="home-product-item__price-old zp9xm9">₫{formatter.format((item.max_price+item.min_price)/2)}</div>
                            <div className="home-product-item__price-current">
                            <span className="_1y2DMk">₫</span><span className="_3c5u7X">{formatter.format((item.max_price+item.min_price)/2*(1-item.percent_discount/100))}</span>
                            </div>
                            </>:
                            <div className="home-product-item__price _3c5u7X">₫{formatter.format((item.max_price+item.min_price)/2)}</div>}
                            <div className="_2YM55k">
                            <svg height="12" viewBox="0 0 20 12" width="20" className="svg-icon icon-free-shipping"><g fill="none" fillRule="evenodd" transform=""><rect fill="#00bfa5" fillRule="evenodd" height="9" rx="1" width="12" x="4"></rect><rect height="8" rx="1" stroke="#00bfa5" width="11" x="4.5" y=".5"></rect><rect fill="#00bfa5" fillRule="evenodd" height="7" rx="1" width="7" x="13" y="2"></rect><rect height="6" rx="1" stroke="#00bfa5" width="6" x="13.5" y="2.5"></rect><circle cx="8" cy="10" fill="#00bfa5" r="2"></circle><circle cx="15" cy="10" fill="#00bfa5" r="2"></circle><path d="m6.7082481 6.7999878h-.7082481v-4.2275391h2.8488017v.5976563h-2.1405536v1.2978515h1.9603297v.5800782h-1.9603297zm2.6762505 0v-3.1904297h.6544972v.4892578h.0505892c.0980164-.3134765.4774351-.5419922.9264138-.5419922.0980165 0 .2276512.0087891.3003731.0263672v.6210938c-.053751-.0175782-.2624312-.038086-.3762568-.038086-.5122152 0-.8758247.3017578-.8758247.75v1.8837891zm3.608988-2.7158203c-.5027297 0-.8536919.328125-.8916338.8261719h1.7390022c-.0158092-.5009766-.3446386-.8261719-.8473684-.8261719zm.8442065 1.8544922h.6544972c-.1549293.571289-.7050863.9228515-1.49238.9228515-.9864885 0-1.5903965-.6269531-1.5903965-1.6464843 0-1.0195313.6165553-1.6669922 1.5872347-1.6669922.9580321 0 1.5366455.6064453 1.5366455 1.6083984v.2197266h-2.4314412v.0351562c.0221328.5595703.373095.9140625.9169284.9140625.4110369 0 .6924391-.1376953.8189119-.3867187zm2.6224996-1.8544922c-.5027297 0-.853692.328125-.8916339.8261719h1.7390022c-.0158091-.5009766-.3446386-.8261719-.8473683-.8261719zm.8442064 1.8544922h.6544972c-.1549293.571289-.7050863.9228515-1.49238.9228515-.9864885 0-1.5903965-.6269531-1.5903965-1.6464843 0-1.0195313.6165553-1.6669922 1.5872347-1.6669922.9580321 0 1.5366455.6064453 1.5366455 1.6083984v.2197266h-2.4314412v.0351562c.0221328.5595703.373095.9140625.9169284.9140625.4110369 0 .6924391-.1376953.8189119-.3867187z" fill="#fff"></path><path d="m .5 8.5h3.5v1h-3.5z" fill="#00bfa5"></path><path d="m0 10.15674h3.5v1h-3.5z" fill="#00bfa5"></path><circle cx="8" cy="10" fill="#047565" r="1"></circle><circle cx="15" cy="10" fill="#047565" r="1"></circle></g></svg>
                            </div>
                        </div>
                        <div className="home-product-item__action">
                            <div className="home-product-item__like">
                                <svg height="16" viewBox="0 0 16 16" width="16" version="1.1"><path d="m7.251221 4.2145388c-.549143-.4552525-1.2488781-.7145388-1.951221-.7145388-1.5719593 0-2.8 1.2269253-2.8 2.7970027 0 .5878515.158291 1.1598348.483492 1.7618948.6414654 1.1875754 1.5644044 2.1358244 4.4829309 4.7799304l.5348542.4864596.5326254-.4807607c2.9306205-2.660747 3.8471674-3.6039919 4.486777-4.7931984.3223805-.5993922.4793205-1.1689848.4793205-1.7543257 0-1.5700774-1.2280407-2.7970027-2.8-2.7970027-.7029148 0-1.4032175.2597087-1.9497845.7133288l-.0367779.0309601c-.1203966.1029087-.2318185.2143106-.3329071.3329122l-.3805305.4464557-.3805305-.4464557c-.1010886-.1186016-.2125105-.2300035-.3301434-.3305672z" fill="none" stroke="#000" stroke-opacity=".54"></path></svg>
                            </div>
                            <div className="home-product-item__rating" data-sqe="rating">
                                <div className="rating-stars">
                                    <div className="d-flex">
                                    {rating(6,item)}
                                    </div>
                                </div>
                            </div>
                            <div className="home-product-item__sold item-center">Đã bán {item.num_order}</div>
                        </div>
                        <div className="home-product-item__origin">
                            <span className="home-product-item__brand">{item.item_brand}</span>
                            <span className="home-product-item__origin-name">{item.shop_city}</span>
                        </div>
                        <div className="home-product-item__favourite"> 
                            <span>Yêu thích</span>
                        </div>
                        {item.percent_discount>0?
                        <div className="home-product-item__sale-off">
                            <span className="home-product-item__sale-off-percent">{item.percent_discount}</span>
                            <span className="home-product-item__sale-off-label">GIẢM</span>
                        </div>:''}
                        </div>
                    </Link>
                </div>
                )}
            </div>
            :''}
            <div className="page-controller">
                <Pagination
                    classActive={`button-solid button-solid--primary`}
                    classNormal={`button-no-outline`}
                    classIcon={`icon-button`}
                    currentPage={search.page!=undefined?parseInt(search.page):searchitem.page}
                    totalCount={data.page_count}
                    pageSize={PageSize}
                    onPageChange={page => setsearch('page',page)}
                />
            </div>
        </>
    )
}
export default memo(Itemsearch)