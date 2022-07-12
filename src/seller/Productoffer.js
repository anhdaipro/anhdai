import Pagination from "../hocs/Pagination"
import axios from 'axios';
import React, {useState, useEffect,memo,useMemo,useCallback} from 'react'
import {formatter,} from "../constants"
let PageSize = 10;
const Productoffer=({loading,items,items_choice,setcheckitem,setcheckall,submit,submitby,
    setshow,page_count_main,page_count_by,sec,text,complete,
    showmain,showbyproduct,byproduct,byproduct_choice})=>{
    let list_items=items
    let page_count=Math.ceil(items.length / PageSize)
    let name='items'
    let choice_product=items_choice
    const [currentPage, setCurrentPage] = useState(1);
    const [state,setState]=useState({list_items:[]})
    console.log(state)
    console.log(list_items)
    const [check, setCheck] = useState(false);
    const handlePageChange=useCallback((page)=>{
        setCurrentPage(page)
    },[currentPage])
    
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    
    if(showbyproduct){
        list_items=byproduct
        choice_product=byproduct_choice
        name='byproduct'
        page_count=Math.ceil(byproduct.length / PageSize)
    }
    const currentitemPage=list_items.slice(firstPageIndex, lastPageIndex);
    console.log(currentitemPage)
    function list_productshop(item,product,name,product_choice){
        return(
            <div key={item.id} className="item">
                <div className={`item-discount ${product_choice.some(ite=>item.item_id==ite.item_id)?"disable":""}`}>
                    <div className="item_heading" style={{width:'360px'}}> 
                        <div className="item-center">
                            <label className="checkbox item-selector">
                                <input onChange={()=>setcheckitem(item,product,name)} type="checkbox" disabled={product_choice.some(ite=>item.item_id==ite.item_id)?true:false} checked={item.check?true:false} className="checkbox__input" value=""/> 
                                <span className="checkbox__indicator">
                                    <i className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M4.03033009,7.46966991 C3.73743687,7.1767767 3.26256313,7.1767767 2.96966991,7.46966991 C2.6767767,7.76256313 2.6767767,8.23743687 2.96966991,8.53033009 L6.32804531,11.8887055 C6.62093853,12.1815987 7.09581226,12.1815987 7.38870548,11.8887055 L13.2506629,6.02674809 C13.5435561,5.73385487 13.5435561,5.25898114 13.2506629,4.96608792 C12.9577697,4.6731947 12.4828959,4.6731947 12.1900027,4.96608792 L6.8583754,10.2977152 L4.03033009,7.46966991 Z"></path></svg>
                                    </i>
                                </span> 
                            </label>
                        </div>
                        <div className="item-center product-name-image" >
                            <img src={item.item_image} alt="" width="36px" height="36px"/>
                            <div className="item_detail">
                                <div className="ellipsis-content">{item.item_name}</div>
                                <div className="product-sku">Sku : </div>
                            </div>
                        </div>
                    </div>
                    <div className="table_main-header">
                        <div className="item-center">{item.number_order}</div>
                        <div className="item-center">
                            ₫{formatter.format(item.min_price)} {item.min_price!=item.max_price?<>- <br/> ₫{formatter.format(item.max_price)}</>:''}                                          
                        </div>
                        <div className="item-center">{item.item_inventory}</div>
                    </div> 
                </div>
            </div>
        )
    }
    return(
        <>
        {showmain || showbyproduct?
        <div className="content-box-item">
            <div className="modal__container">
                <div className="modal__box">
                    <div className="product-modal modal__content">
                        <div className="modal__header">
                            <div className="product-modal-header">
                                <p className="title">Choice product</p> 
                                <i onClick={()=>setshow(false,name)} className="close-btn icon">
                                    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M557.3 513l226.3-226.3c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L512 467.7 285.7 241.5c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L466.7 513 240.5 739.3c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L512 558.3l226.3 226.3c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L557.3 513z"></path></svg>
                                </i> 
                                <div className="tabs tabs tabs-line tabs-normal tabs-top">
                                    <div className="tabs__nav">
                                        <div className="tabs__nav-warp">
                                            <div className="tabs__nav-tabs" style={{transform: 'translateX(0px)'}}>
                                                <div className="tabs__nav-tab active" style={{whiteSpace: 'normal'}}>Choice</div>
                                                <div className="tabs__nav-tab" style={{whiteSpace: 'normal'}}>Post Product List</div>
                                            </div> 
                                            <div className="tabs__ink-bar" style={{width: '68px', transform: 'translateX(0px)'}}></div>
                                        </div>
                                    </div> 
                                    <div className="tabs__content">
                                        <div className="tabs-tabpane"></div> 
                                        <div className="tabs-tabpane" style={{display: 'none'}}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal__body">
                            <div className="product-selector-modal">
                                <div className="selector-panel">
                                    <div className="products-panel-header group-category">
                                        <form className="form--inline">
                                            <div className="item-center form-item">
                                                <label className="form-item__label">Categories</label>
                                                <div className="input-category-choice item-center">
                                                    <div className=" item-center input-choice" style={{width: '190px'}}>
                                                        <div className="ellipsis-content" style={{width: '160px'}}>All categories</div> 
                                                        <div className="selector__suffix">
                                                            <i className="selector__suffix-icon icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M8,9.18933983 L4.03033009,5.21966991 C3.73743687,4.9267767 3.26256313,4.9267767 2.96966991,5.21966991 C2.6767767,5.51256313 2.6767767,5.98743687 2.96966991,6.28033009 L7.46966991,10.7803301 C7.76256313,11.0732233 8.23743687,11.0732233 8.53033009,10.7803301 L13.0303301,6.28033009 C13.3232233,5.98743687 13.3232233,5.51256313 13.0303301,5.21966991 C12.7374369,4.9267767 12.2625631,4.9267767 11.9696699,5.21966991 L8,9.18933983 Z"></path></svg></i>
                                                        </div>
                                                    </div>
                                                    <div className="popper" x-placement="bottom-start" style={{position: 'absolute',display:'none',zIndex: 1000054, willChange: 'top, left', transformOrigin: 'left top', top: '32px', left: '90px'}}>
                                                        <div className="d-flex category">
                                                            <div className="cascader-menu" style={{maxHeight: '306px', maxWidth: '320px'}}>
                                                                <div className="scrollbar">
                                                                    <div className="scrollbar__wrapper">
                                                                        <div className="scrollbar__bar vertical">
                                                                            <div className="scrollbar__thumb" style={{top: '0px', height: '0px'}}></div>
                                                                        </div> 
                                                                        <div className="scrollbar__content" style={{position: 'relative'}}>
                                                                            <div className="cascader-menu__items">
                                                                                <div className="cascader-menu__item">All category</div>
                                                                                <div className="cascader-menu__item has-children selected">Categories
                                                                                    <i className="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M9.18933983,8 L5.21966991,11.9696699 C4.9267767,12.2625631 4.9267767,12.7374369 5.21966991,13.0303301 C5.51256313,13.3232233 5.98743687,13.3232233 6.28033009,13.0303301 L10.7803301,8.53033009 C11.0732233,8.23743687 11.0732233,7.76256313 10.7803301,7.46966991 L6.28033009,2.96966991 C5.98743687,2.6767767 5.51256313,2.6767767 5.21966991,2.96966991 C4.9267767,3.26256313 4.9267767,3.73743687 5.21966991,4.03033009 L9.18933983,8 Z"></path></svg></i>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="resize-triggers">
                                                                                    <div className="expand-trigger">
                                                                                        <div style={{width: '142px', height: '81px'}}></div>
                                                                                    </div>
                                                                                <div className="contract-trigger"></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div> 
                                                                <div className="right-border" style={{left: '320px', display: 'none'}}></div>
                                                            </div>       
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="item-center form-item">
                                                
                                                <label className="form-item__label" for="price" >Search</label>
                                                
                                                <div className=" item-center input-group">
                                                    <div className="input-group_choice item-center">
                                                        <div className="input-choice item-center" style={{width: '120px'}}>
                                                            <div style={{width: '100px'}}>Product name</div>
                                                            <div className="selector__suffix">
                                                                <i className="selector__suffix-icon icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M8,9.18933983 L4.03033009,5.21966991 C3.73743687,4.9267767 3.26256313,4.9267767 2.96966991,5.21966991 C2.6767767,5.51256313 2.6767767,5.98743687 2.96966991,6.28033009 L7.46966991,10.7803301 C7.76256313,11.0732233 8.23743687,11.0732233 8.53033009,10.7803301 L13.0303301,6.28033009 C13.3232233,5.98743687 13.3232233,5.51256313 13.0303301,5.21966991 C12.7374369,4.9267767 12.2625631,4.9267767 11.9696699,5.21966991 L8,9.18933983 Z"></path></svg></i>
                                                            </div>
                                                        </div>
                                                        <div className="select__options">
                                                            <div className="p-1_2">
                                                                <div className="variation-option">Product name</div>
                                                                <div className="variation-option">Product code</div>
                                                            </div>
                                                        </div> 
                                                    </div>
                                                    <div className="input">
                                                        <div className="input-inner item-center">
                                                            <input type="text" className="form-selects" placeholder="Enter"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                        <div className="item-spaces py-1 mr-1">
                                            <div className="buttions">
                                                <button className="btn-m btn-orange">Search </button>
                                                <button className="btn-m btn-light">Enter again</button>
                                            </div>
                                            <div className="item-center">
                                                <div className="item-center">
                                                    <label className="checkbox item-selector">
                                                        <input type="checkbox" className="checkbox__input" value=""/> 
                                                        <span className="checkbox__indicator">
                                                            <i className="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M4.03033009,7.46966991 C3.73743687,7.1767767 3.26256313,7.1767767 2.96966991,7.46966991 C2.6767767,7.76256313 2.6767767,8.23743687 2.96966991,8.53033009 L6.32804531,11.8887055 C6.62093853,12.1815987 7.09581226,12.1815987 7.38870548,11.8887055 L13.2506629,6.02674809 C13.5435561,5.73385487 13.5435561,5.25898114 13.2506629,4.96608792 C12.9577697,4.6731947 12.4828959,4.6731947 12.1900027,4.96608792 L6.8583754,10.2977152 L4.03033009,7.46966991 Z"></path></svg></i>
                                                        </span> 
                                                    </label>
                                                </div>
                                                <div><span>See all</span></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="content-box mb-1">
                                        <div className="table__header--container">
                                            <div className="item_heading" style={{width:'360px'}}>
                                                <div className="item-center">
                                                    <label className={`checkbox item-selector ${currentitemPage.some(ite=>ite.check)&&!currentitemPage.every(ite=>ite.check)?'indeterminate':''}`}>
                                                        <input onChange={(e)=>setcheckall(e,currentitemPage,name,list_items,choice_product)} type="checkbox" checked={currentitemPage.every(ite=>ite.check)?true:false} className="checkbox__input" value=""/> 
                                                        <span className="checkbox__indicator">
                                                            <i className="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">{currentitemPage.some(ite=>ite.check)&&!currentitemPage.every(ite=>ite.check)?<path fillRule="evenodd" d="M3.75,7 L12.25,7 C12.6642136,7 13,7.33578644 13,7.75 C13,8.16421356 12.6642136,8.5 12.25,8.5 L3.75,8.5 C3.33578644,8.5 3,8.16421356 3,7.75 C3,7.33578644 3.33578644,7 3.75,7 Z"></path>:<path d="M4.03033009,7.46966991 C3.73743687,7.1767767 3.26256313,7.1767767 2.96966991,7.46966991 C2.6767767,7.76256313 2.6767767,8.23743687 2.96966991,8.53033009 L6.32804531,11.8887055 C6.62093853,12.1815987 7.09581226,12.1815987 7.38870548,11.8887055 L13.2506629,6.02674809 C13.5435561,5.73385487 13.5435561,5.25898114 13.2506629,4.96608792 C12.9577697,4.6731947 12.4828959,4.6731947 12.1900027,4.96608792 L6.8583754,10.2977152 L4.03033009,7.46966991 Z"></path>}</svg></i>
                                                        </span> 
                                                    </label>
                                                </div>
                                                <div className=" item-center">Product</div>
                                            </div>
                                            <div className="table_main-header">
                                                <div className="item-center">
                                                    <span>Sold</span>
                                                    <div className="table__cell-action table__cell-icon table__sort-icons">
                                                        <i className="icon table__sort-icon up"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M7.57253679,6.40074676 L5.1530248,8.66903925 C4.90120463,8.90512066 4.88844585,9.30064304 5.12452726,9.55246321 C5.24268191,9.67849483 5.40773242,9.75 5.58048801,9.75 L10.419512,9.75 C10.76469,9.75 11.044512,9.47017797 11.044512,9.125 C11.044512,8.95224442 10.9730068,8.7871939 10.8469752,8.66903925 L8.42746321,6.40074676 C8.18705183,6.17536109 7.81294817,6.17536109 7.57253679,6.40074676 Z"></path></svg></i>
                                                        <i className="icon table__sort-icon down"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M7.57253679,9.34925324 L5.1530248,7.08096075 C4.90120463,6.84487934 4.88844585,6.44935696 5.12452726,6.19753679 C5.24268191,6.07150517 5.40773242,6 5.58048801,6 L10.419512,6 C10.76469,6 11.044512,6.27982203 11.044512,6.625 C11.044512,6.79775558 10.9730068,6.9628061 10.8469752,7.08096075 L8.42746321,9.34925324 C8.18705183,9.57463891 7.81294817,9.57463891 7.57253679,9.34925324 Z"></path></svg></i>
                                                    </div>
                                                </div>
                                                <div className="item-center">
                                                    <span>Price</span>
                                                    <div className="table__cell-action table__cell-icon table__sort-icons">
                                                        <i className="icon table__sort-icon up"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M7.57253679,6.40074676 L5.1530248,8.66903925 C4.90120463,8.90512066 4.88844585,9.30064304 5.12452726,9.55246321 C5.24268191,9.67849483 5.40773242,9.75 5.58048801,9.75 L10.419512,9.75 C10.76469,9.75 11.044512,9.47017797 11.044512,9.125 C11.044512,8.95224442 10.9730068,8.7871939 10.8469752,8.66903925 L8.42746321,6.40074676 C8.18705183,6.17536109 7.81294817,6.17536109 7.57253679,6.40074676 Z"></path></svg></i>
                                                        <i className="icon table__sort-icon down"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M7.57253679,9.34925324 L5.1530248,7.08096075 C4.90120463,6.84487934 4.88844585,6.44935696 5.12452726,6.19753679 C5.24268191,6.07150517 5.40773242,6 5.58048801,6 L10.419512,6 C10.76469,6 11.044512,6.27982203 11.044512,6.625 C11.044512,6.79775558 10.9730068,6.9628061 10.8469752,7.08096075 L8.42746321,9.34925324 C8.18705183,9.57463891 7.81294817,9.57463891 7.57253679,9.34925324 Z"></path></svg></i>
                                                    </div>
                                                </div>
                                                <div className="item-center">
                                                    <span>Inventory</span>
                                                    <div className="item-label-icon">
                                                        <div className="popover__ref item-center">
                                                            <i className="icon table__cell-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8,1 C11.8659932,1 15,4.13400675 15,8 C15,11.8659932 11.8659932,15 8,15 C4.13400675,15 1,11.8659932 1,8 C1,4.13400675 4.13400675,1 8,1 Z M8,2 C4.6862915,2 2,4.6862915 2,8 C2,11.3137085 4.6862915,14 8,14 C11.3137085,14 14,11.3137085 14,8 C14,4.6862915 11.3137085,2 8,2 Z M7.98750749,10.2375075 C8.40172105,10.2375075 8.73750749,10.5732939 8.73750749,10.9875075 C8.73750749,11.401721 8.40172105,11.7375075 7.98750749,11.7375075 C7.57329392,11.7375075 7.23750749,11.401721 7.23750749,10.9875075 C7.23750749,10.5732939 7.57329392,10.2375075 7.98750749,10.2375075 Z M8.11700238,4.60513307 C9.97011776,4.60513307 10.7745841,6.50497267 9.94298079,7.72186504 C9.76926425,7.97606597 9.56587088,8.14546785 9.27050506,8.31454843 L9.11486938,8.39945305 L8.95824852,8.47993747 C8.56296349,8.68261431 8.49390831,8.75808648 8.49390831,9.0209925 C8.49390831,9.29713488 8.27005069,9.5209925 7.99390831,9.5209925 C7.71776594,9.5209925 7.49390831,9.29713488 7.49390831,9.0209925 C7.49390831,8.34166619 7.7650409,7.99681515 8.35913594,7.6662627 L8.76655168,7.45066498 C8.9424056,7.3502536 9.04307851,7.26633638 9.11735517,7.1576467 C9.52116165,6.56675314 9.11397414,5.60513307 8.11700238,5.60513307 C7.41791504,5.60513307 6.82814953,6.01272878 6.75715965,6.55275918 L6.75,6.66244953 L6.74194433,6.75232516 C6.69960837,6.98557437 6.49545989,7.16244953 6.25,7.16244953 C5.97385763,7.16244953 5.75,6.9385919 5.75,6.66244953 C5.75,5.44256682 6.87194406,4.60513307 8.11700238,4.60513307 Z"></path></svg></i>
                                                        </div>
                                                        <div className="information_more">Total products available</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {loading?
                                        <div className="table__body-container">
                                            <div className="item-shop">
                                                {currentitemPage.map(item =>{
                                                    if(showmain){
                                                        return <>{list_productshop(item,items,name,items_choice)}</>
                                                    }
                                                    else{
                                                        return <>{list_productshop(item,byproduct,name,byproduct_choice)}</>
                                                    }
                                                }
                                                )}
                                                
                                            </div>
                                            <div className="item-end">
                                                <div className="item-center page-pagination">
                                                    <Pagination
                                                    classActive={`buttons active`}
                                                    classNormal={`buttons`}
                                                    classIcon={`buttons`}
                                                    currentPage={currentPage}
                                                    totalCount={page_count}
                                                    pageSize={PageSize}
                                                    onPageChange={(page) => handlePageChange(page)}
                                                    
                                                    />
                                                </div>
                                            </div>
                                        </div>:
                                        
                                        <div className="loading">
                                            <div className="loading_item item-center">
                                                <div className="ball"></div>
                                                <div className="ball"></div>
                                                <div className="ball"></div>
                                            </div>
                                        </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`modal__footer ${list_items.some(item=>item.check)?'with-assist':''}`}>
                            {list_items.some(item=>item.check)?
                            <div data-v-4e1fc126="" className="footer-assist">
                                <span data-v-4e1fc126="" className="select-tips">Đã chọn<span> {list_items.filter(item=>item.check).length}</span> sản phẩm</span>
                            </div>
                            :''}
                            <div className="modal__footer-buttons">
                                <button onClick={()=>setshow(false,name)} className="cancel btn-m btn-light">Cancel</button>
                                <button onClick={()=>{showmain?submit():submitby()}} className={`comfirm ${list_items.some(item=>item.check) || choice_product.length>0?'':'disable'} btn-orange btn-m`}>Comfirm</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>:""}
        {complete?
        <div className="sucess-box">
        <div className="create-sucess" style={{width: '360px'}}>
            <div className="item-centers">
                <span className="item-centers item-check-sucess">
                    <i className="icon check-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M4.03 7.47a.75.75 0 00-1.06 1.06l3.358 3.359a.75.75 0 001.06 0l5.863-5.862a.75.75 0 00-1.061-1.06l-5.332 5.33L4.03 7.47z"></path></svg>
                    </i>
                </span>
            </div>
            <div className="item-centers title-sucess">Created a new discount code</div>
            <div className="item-centers content-sucess">Your discount code is valid from date {new Date(text.valid_from).toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).substr(0,16)} - {new Date(text.valid_to).toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).substr(0,16)}</div>
            <div className="item-centers">
                <button className="btn-m btn-light">View detail</button>
                <button className="btn-m btn-orange">
                    <span className="time-down">Back to product page after ({sec}s)</span>
                </button>
            </div>
        </div>
        </div>:""}
        </>
    )
}
export default memo(Productoffer)