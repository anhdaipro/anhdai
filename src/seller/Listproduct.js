import Sidebamenu from "./Sidebar-menu"
import axios from 'axios';
import Navbar from "./Navbar"
import { useParams,Link, Navigate, useNavigate } from "react-router-dom";
import React, {useState,useEffect,useCallback,useRef} from 'react'
import {itemvariation,pagesize} from "../constants"
import Pagination from "../hocs/Pagination"
import {productshopURL,} from "../urls"
import { headers} from '../actions/auth';
const Listproduct=()=>{
    const [state,setState]=useState({show:false})
    const [itemshop,setItem]=useState({pageitem:[],page_count:1,count_product:1})
    const [loading,setLoading]=useState(false)
    const [show,setShow]=useState(false)
    const [showbatch,setShowbatch]=useState(false)
    const parentref=useRef()
    const toolsref=useRef()
    const navigation=useNavigate()
    const [currentPage, setCurrentPage] = useState({page:1,pagesize:12});
    useEffect(()=>{
        document.addEventListener('click',handleClick)
        return () => {
            document.removeEventListener('click', handleClick)
        }
    },[])
    const handleClick = (event) => {
        const { target } = event
        if(parentref.current){
            if (!parentref.current.contains(target)) {
                setShow(false)
            }
        }
        if(toolsref.current){
            if (!toolsref.current.contains(target)) {
                setShowbatch(false)
            }
        }
    }
    useEffect(() => {
        const getJournal = async () => {
            await axios(productshopURL,headers())
           // <-- passed to API URL
            .then(res=>{
                let data=res.data
                const pageitem=data.pageitem.map(product=>{
                    return({...product,check:false,show:false,variations:product.variations.map(variation=>{
                        if(variation.percent_discount>0){
                            return({...variation,enable:true})
                        }
                        return({...variation,enable:false})
                    })})
                })
                setLoading(true)
                setItem({...itemshop,count_product:data.count_product,pageitem:pageitem,page_count:Math.ceil(data.count_product / currentPage.pagesize)})
          })
        }
        getJournal();
    }, []);
    
    const showallvariation=(itemchoice)=>{
        let url= new URL(productshopURL)
        let search_params=url.searchParams
        search_params.set('item_id',itemchoice.id)
        url.search = search_params.toString();
        let new_url=url.toString();
        if(itemchoice.variations.length==3){
            axios.get(new_url,headers())
            .then(res=>{ 
                let data=res.data
                const pageitem=itemshop.pageitem.map(item=>{
                    if(item.id==itemchoice.id){
                        return({...item,show:!item.show,variations:[...item.variations,...data]})
                    }
                    return({...item})
                })
                setItem({...itemshop,pageitem:pageitem})
            })
        }
        else{
            const pageitem=itemshop.pageitem.map(item=>{
                if(item.id==itemchoice.id){
                    return({...item,show:!item.show})
                }
                return({...item})
            })
            setItem({...itemshop,pageitem:pageitem}) 
        }
    }

    const checkitem=(e,itemchoice)=>{
        const pageitem=itemshop.pageitem.map(item=>{
            if(item.id==itemchoice.id){
                return({...item,check:!item.check})
            }
            return({...item})
        })
        setItem({...itemshop,pageitem:pageitem})
    }

    const setcheckall=(e)=>{
        const pageitem=itemshop.pageitem.map(item=>{
            return({...item,check:e.target.checked})
        })
        setItem({...itemshop,pageitem:pageitem})
    }

    const deleteitemchoice=(e)=>{
        const data={items:itemshop.pageitem.filter(item=>item.check)}
        const pageitem=itemshop.pageitem.filter(item=>!item.check)
        axios.post(productshopURL,JSON.stringify(data),headers())
        .then(res=>{
            let data=res.data
            setLoading(true)
            setItem({...itemshop,pageitem:pageitem,count_product:data.count_product,page_count:Math.ceil(data.count_product / currentPage.pagesize)})
            if(pageitem.length==0){
                setpagechoice(currentPage.page-1,'page','pagesize',currentPage.pagesize)
            }
        })
    }
    const checkall=()=>{
        return(
            <label className={`checkbox item-selector ${!itemshop.pageitem.every(item=>item.check) && itemshop.pageitem.some(item=>item.check)?'indeterminate':''}`}>
                <input onChange={(e)=>setcheckall(e)} checked={itemshop.pageitem.every(item=>item.check)} type="checkbox" className="checkbox__input" value=""/> 
                <span className="checkbox__indicator">
                    <i className="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">{itemshop.pageitem.some(item=>item.check)&&!itemshop.pageitem.every(item=>item.check)?<path fillRule="evenodd" d="M3.75,7 L12.25,7 C12.6642136,7 13,7.33578644 13,7.75 C13,8.16421356 12.6642136,8.5 12.25,8.5 L3.75,8.5 C3.33578644,8.5 3,8.16421356 3,7.75 C3,7.33578644 3.33578644,7 3.75,7 Z"></path>:<path d="M4.03033009,7.46966991 C3.73743687,7.1767767 3.26256313,7.1767767 2.96966991,7.46966991 C2.6767767,7.76256313 2.6767767,8.23743687 2.96966991,8.53033009 L6.32804531,11.8887055 C6.62093853,12.1815987 7.09581226,12.1815987 7.38870548,11.8887055 L13.2506629,6.02674809 C13.5435561,5.73385487 13.5435561,5.25898114 13.2506629,4.96608792 C12.9577697,4.6731947 12.4828959,4.6731947 12.1900027,4.96608792 L6.8583754,10.2977152 L4.03033009,7.46966991 Z"></path>}</svg></i>
                </span>
            </label>
        )
    }
    const setpagechoice=useCallback((page,name_choice,value_choice,name,value)=>{
        if(page!=value_choice){
            let url= new URL(productshopURL)
            let search_params=url.searchParams
            search_params.set([name_choice],page)
            search_params.set([name],value)
            setCurrentPage({...currentPage,[name_choice]:page})
            url.search = search_params.toString();
            setLoading(false)
            setLoading(false)
            setState({show:false})
            let new_url = url.toString();
            axios.get(new_url,headers())
            .then(res=>{ 
                let data=res.data
                setLoading(true)
                setItem({...itemshop,count_product:data.count_product,pageitem:data.pageitem,page_count:Math.ceil(data.count_product / currentPage.pagesize)})
            })
        }
    },[itemshop,currentPage])
    return(
        <>
        <div className="app-content">
            <Navbar/>
            <div className="page-content">
                <Sidebamenu/>
                <div className="page-container"> 
                    <div className="product-filter-card pl-1">
                        <div className="d-flex item_info">
                            <div className=" item-center input-group">
                                <div ref={parentref} onClick={()=>setShow(!show)} className="input-group_choice item-center">
                                    <div className="input-choice item-center" style={{width: '140px'}}>
                                        <div style={{width: '120px'}} >SKU sản phẩm</div>
                                        <div className="">
                                            <i className="selector__suffix-icon icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M8,9.18933983 L4.03033009,5.21966991 C3.73743687,4.9267767 3.26256313,4.9267767 2.96966991,5.21966991 C2.6767767,5.51256313 2.6767767,5.98743687 2.96966991,6.28033009 L7.46966991,10.7803301 C7.76256313,11.0732233 8.23743687,11.0732233 8.53033009,10.7803301 L13.0303301,6.28033009 C13.3232233,5.98743687 13.3232233,5.51256313 13.0303301,5.21966991 C12.7374369,4.9267767 12.2625631,4.9267767 11.9696699,5.21966991 L8,9.18933983 Z"></path></svg></i>
                                        </div>
                                    </div>
                                    {show?
                                    <div className="select__options">
                                        <div className="">
                                            <div className="variation-option">
                                                Tên sản phẩm
                                            </div>
                                            <div className="variation-option ">
                                                SKU sản phẩm
                                            </div>
                                            <div className="variation-option">
                                                SKU phân loại
                                            </div>
                                            <div className="variation-option">
                                                Phân loại hàng
                                            </div>
                                            <div className="variation-option">
                                                Mã sản phẩm
                                            </div>
                                        </div>
                                    </div> :''}
                                </div>
                                <div className="input-inner item-center">
                                    <input type="text" className="form-selects"  placeholder="Enter"/>
                                </div>
                            </div>
                            <div className="item-center input-group-right">
                                <div className="form-item-content">
                                    Catalog
                                </div>
                                <div className="input-inner item-center"> 
                                    <input type="text" className="form-input" name="price" placeholder="Enter" />
                                    <button  type="button" className="edit-btn button--link button--normal" >
                                        <i className="icon"><svg data-name="图层 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path d="M988.1 316.06a127.07 127.07 0 0 0-37.5-90.5L798.4 73.36c-49.9-49.9-131.1-49.9-181.1 0l-91.8 91.8-.3.3-.3.3-470.2 470.4a63.47 63.47 0 0 0-18.8 45.2v242.7a64.06 64.06 0 0 0 64 64h242.8a63.47 63.47 0 0 0 45.2-18.8l470.6-470.6 92.1-92.1a127.07 127.07 0 0 0 37.5-90.5zm-842.9 320l402.7-402.7 242.8 242.7-402.8 402.8zm-45.3 288v-242.7l242.7 242.7zm805.5-562.7l-69.5 69.4-242.7-242.7 69.5-69.5a64.22 64.22 0 0 1 90.6 0l152.2 152.2a64.37 64.37 0 0 1-.1 90.6z" data-name="Layer 1"></path></svg></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex item_info">
                            <div className="item-center filter-col-left">
                                <div className="form-item-content">
                                    Catalog
                                </div>
                                <div className="input-inner item-center "> 
                                    <input type="text" className="form-input" name="price" placeholder="Enter" />
                                </div>
                                <div className="width"></div>
                                <div className="input-inner item-center"> 
                                    <input type="text" className="form-input" name="price" placeholder="Enter" />
                                </div>
                            </div>
                            <div className="item-center filter-col-right">
                                <div className="form-item-content">
                                    Sold
                                </div>
                                <div className="input-inner item-center"> 
                                    <input type="text" className="form-input"  name="price" placeholder="Enter" />
                                </div>
                                <div className="width"></div>
                                <div className="input-inner item-center"> 
                                    <input type="text" className="form-input"  name="price" placeholder="Enter" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <button className="searchs btn-m btn-orange">Search</button>
                            <button className="cancel btn-m btn-light">Enter Agian</button>
                        </div>
                    </div>
                    <div className="product-list-main">
                        <div className="portal-panel">
                            <div className="tabs tabs-line">
                                <div className="tabs__nav">
                                    <div className="tabs__nav-warp">
                                        <div className="tabs__nav-tabs">
                                            <div className="tabs__nav-tab active">
                                                <div className="item-center">All</div>
                                            </div>
                                            <div className="tabs__nav-tab ">
                                                <div className="item-center">Active</div>
                                            </div>
                                            <div className="tabs__nav-tab ">
                                                <div className="item-center">Out of stock
                                                    <span className="tab-badge">0</span>
                                                </div>
                                            </div>
                                            <div className="tabs__nav-tab ">
                                                <div className="item-center">Violate
                                                    <span className="tab-badge">0</span>
                                                </div>
                                            </div>
                                            <div className="tabs__nav-tab ">
                                                <div className="item-center">Hidden
                                                    <span className="tab-badge">0</span>
                                                </div>
                                            </div>
                                            <div className="tabs__nav-tab ">
                                                <div className="item-center">Not posted yet
                                                    <span className="tab-badge">0</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tabs__ink-bar" style={{width: '50px', transform: 'translateX(0px)'}}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="list-panel">
                            <div className="list-all">
                                <div className="d-flex process-product">
                                    <div className="title-box">
                                        <div className="page-title-box">
                                            <div className="page-title">{itemshop.count_product} products</div> 
                                            <div className="percent-box">
                                                <div className="percent-bar">
                                                    <div className="percent-bar-progress" style={{width:`${itemshop.count_product}%`}}>
                                                    </div>
                                                </div> 
                                                <div className="percent-des">
                                                    Can post {100-itemshop.count_product} more products
                                                    <div className="popover popover--light">
                                                        <div className="popover__ref">
                                                            <i className="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8,1 C11.8659932,1 15,4.13400675 15,8 C15,11.8659932 11.8659932,15 8,15 C4.13400675,15 1,11.8659932 1,8 C1,4.13400675 4.13400675,1 8,1 Z M8,2 C4.6862915,2 2,4.6862915 2,8 C2,11.3137085 4.6862915,14 8,14 C11.3137085,14 14,11.3137085 14,8 C14,4.6862915 11.3137085,2 8,2 Z M7.98750749,10.2375075 C8.40172105,10.2375075 8.73750749,10.5732939 8.73750749,10.9875075 C8.73750749,11.401721 8.40172105,11.7375075 7.98750749,11.7375075 C7.57329392,11.7375075 7.23750749,11.401721 7.23750749,10.9875075 C7.23750749,10.5732939 7.57329392,10.2375075 7.98750749,10.2375075 Z M8.11700238,4.60513307 C9.97011776,4.60513307 10.7745841,6.50497267 9.94298079,7.72186504 C9.76926425,7.97606597 9.56587088,8.14546785 9.27050506,8.31454843 L9.11486938,8.39945305 L8.95824852,8.47993747 C8.56296349,8.68261431 8.49390831,8.75808648 8.49390831,9.0209925 C8.49390831,9.29713488 8.27005069,9.5209925 7.99390831,9.5209925 C7.71776594,9.5209925 7.49390831,9.29713488 7.49390831,9.0209925 C7.49390831,8.34166619 7.7650409,7.99681515 8.35913594,7.6662627 L8.76655168,7.45066498 C8.9424056,7.3502536 9.04307851,7.26633638 9.11735517,7.1576467 C9.52116165,6.56675314 9.11397414,5.60513307 8.11700238,5.60513307 C7.41791504,5.60513307 6.82814953,6.01272878 6.75715965,6.55275918 L6.75,6.66244953 L6.74194433,6.75232516 C6.69960837,6.98557437 6.49545989,7.16244953 6.25,7.16244953 C5.97385763,7.16244953 5.75,6.9385919 5.75,6.66244953 C5.75,5.44256682 6.87194406,4.60513307 8.11700238,4.60513307 Z"></path></svg></i>
                                                        </div> 
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item-center">
                                        <div className="bi-action">
                                            <button  type="button" className="button-link button--large"><span>
                                                optimize product
                                            </span>
                                            </button>
                                        </div>
                                        <div className="mx-1">
                                            <button className="add-product btn-orange btn-m">
                                                <i className="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8.48176704,1.5 C8.75790942,1.5 8.98176704,1.72385763 8.98176704,2 L8.981,7.997 L15,7.99797574 C15.2761424,7.99797574 15.5,8.22183336 15.5,8.49797574 C15.5,8.77411811 15.2761424,8.99797574 15,8.99797574 L8.981,8.997 L8.98176704,15 C8.98176704,15.2761424 8.75790942,15.5 8.48176704,15.5 C8.20562467,15.5 7.98176704,15.2761424 7.98176704,15 L7.981,8.997 L2,8.99797574 C1.72385763,8.99797574 1.5,8.77411811 1.5,8.49797574 C1.5,8.22183336 1.72385763,7.99797574 2,7.99797574 L7.981,7.997 L7.98176704,2 C7.98176704,1.72385763 8.20562467,1.5 8.48176704,1.5 Z"></path></svg></i>
                                                <span className="ml-1_2">Add one product</span>  
                                            </button>
                                        </div>
                                        <div ref={toolsref} onClick={()=>setShowbatch(!showbatch)} className="input-group_choice item-center" >
                                            <div className="input-choice item-center" style={{width: '190px'}}>
                                                <div style={{width: '160px'}}>Batch processing tools</div> 
                                                <div className="">
                                                    <i className="selector__suffix-icon icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M8,9.18933983 L4.03033009,5.21966991 C3.73743687,4.9267767 3.26256313,4.9267767 2.96966991,5.21966991 C2.6767767,5.51256313 2.6767767,5.98743687 2.96966991,6.28033009 L7.46966991,10.7803301 C7.76256313,11.0732233 8.23743687,11.0732233 8.53033009,10.7803301 L13.0303301,6.28033009 C13.3232233,5.98743687 13.3232233,5.51256313 13.0303301,5.21966991 C12.7374369,4.9267767 12.2625631,4.9267767 11.9696699,5.21966991 L8,9.18933983 Z"></path></svg></i>
                                                </div>
                                            </div>
                                            {showbatch?
                                            <div className="select__options" >
                                                <div className="p-1">
                                                    <div className="dropdown-items" style={{maxWidth: '440px'}}>
                                                        <li className="mass-update-item ">
                                                            Đăng Hàng Loạt
                                                        </li> 
                                                        <li  className="mass-update-item ">
                                                            Cập Nhật Hàng Loạt
                                                        </li> 
                                                        <li  className="mass-update-item ">
                                                            Cập Nhật Thuộc Tính
                                                        </li>
                                                    </div>
                                                </div>
                                            </div>:''}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product-and-pagination-wrap list">
                                {loading?
                                <div className="product-list-view">
                                    <div className="product-list-header">
                                        <div className="item_heading" style={{width:'300px'}}>
                                            <div className="item-center pr-1_2">
                                                {checkall()}
                                            </div>
                                            <div className=" item-center">Product</div>
                                        </div>
                                        
                                        <div className="">
                                            <div className="item-center">
                                                <div className="variation-sku">
                                                    <span>Sku classify</span>
                                                </div>
                                                <div className="variation-item">
                                                    <span>Catelog classify</span> 
                                                </div>
                                                <div className="variation-price item-center">
                                                    <span>Price</span>
                                                    <div className="table__cell-action table__cell-icon table__sort-icons">
                                                        <i className="icon table__sort-icon up"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M7.57253679,6.40074676 L5.1530248,8.66903925 C4.90120463,8.90512066 4.88844585,9.30064304 5.12452726,9.55246321 C5.24268191,9.67849483 5.40773242,9.75 5.58048801,9.75 L10.419512,9.75 C10.76469,9.75 11.044512,9.47017797 11.044512,9.125 C11.044512,8.95224442 10.9730068,8.7871939 10.8469752,8.66903925 L8.42746321,6.40074676 C8.18705183,6.17536109 7.81294817,6.17536109 7.57253679,6.40074676 Z"></path></svg></i>
                                                        <i className="icon table__sort-icon down"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M7.57253679,9.34925324 L5.1530248,7.08096075 C4.90120463,6.84487934 4.88844585,6.44935696 5.12452726,6.19753679 C5.24268191,6.07150517 5.40773242,6 5.58048801,6 L10.419512,6 C10.76469,6 11.044512,6.27982203 11.044512,6.625 C11.044512,6.79775558 10.9730068,6.9628061 10.8469752,7.08096075 L8.42746321,9.34925324 C8.18705183,9.57463891 7.81294817,9.57463891 7.57253679,9.34925324 Z"></path></svg></i>
                                                    </div>
                                                </div>
                                                <div className="variation-inventory item-center">
                                                    <span>Inventory</span>
                                                    <div className="table__cell-action table__cell-icon table__sort-icons">
                                                        <i className="icon table__sort-icon up"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M7.57253679,6.40074676 L5.1530248,8.66903925 C4.90120463,8.90512066 4.88844585,9.30064304 5.12452726,9.55246321 C5.24268191,9.67849483 5.40773242,9.75 5.58048801,9.75 L10.419512,9.75 C10.76469,9.75 11.044512,9.47017797 11.044512,9.125 C11.044512,8.95224442 10.9730068,8.7871939 10.8469752,8.66903925 L8.42746321,6.40074676 C8.18705183,6.17536109 7.81294817,6.17536109 7.57253679,6.40074676 Z"></path></svg></i>
                                                        <i className="icon table__sort-icon down"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M7.57253679,9.34925324 L5.1530248,7.08096075 C4.90120463,6.84487934 4.88844585,6.44935696 5.12452726,6.19753679 C5.24268191,6.07150517 5.40773242,6 5.58048801,6 L10.419512,6 C10.76469,6 11.044512,6.27982203 11.044512,6.625 C11.044512,6.79775558 10.9730068,6.9628061 10.8469752,7.08096075 L8.42746321,9.34925324 C8.18705183,9.57463891 7.81294817,9.57463891 7.57253679,9.34925324 Z"></path></svg></i>
                                                    </div>
                                                </div>
                                                <div className="variation-number-order item-center">
                                                    <span>Sold</span>
                                                    <div className="table__cell-action table__cell-icon table__sort-icons">
                                                        <i className="icon table__sort-icon up"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M7.57253679,6.40074676 L5.1530248,8.66903925 C4.90120463,8.90512066 4.88844585,9.30064304 5.12452726,9.55246321 C5.24268191,9.67849483 5.40773242,9.75 5.58048801,9.75 L10.419512,9.75 C10.76469,9.75 11.044512,9.47017797 11.044512,9.125 C11.044512,8.95224442 10.9730068,8.7871939 10.8469752,8.66903925 L8.42746321,6.40074676 C8.18705183,6.17536109 7.81294817,6.17536109 7.57253679,6.40074676 Z"></path></svg></i>
                                                        <i className="icon table__sort-icon down"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M7.57253679,9.34925324 L5.1530248,7.08096075 C4.90120463,6.84487934 4.88844585,6.44935696 5.12452726,6.19753679 C5.24268191,6.07150517 5.40773242,6 5.58048801,6 L10.419512,6 C10.76469,6 11.044512,6.27982203 11.044512,6.625 C11.044512,6.79775558 10.9730068,6.9628061 10.8469752,7.08096075 L8.42746321,9.34925324 C8.18705183,9.57463891 7.81294817,9.57463891 7.57253679,9.34925324 Z"></path></svg></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table-edit">
                                            <span>Change info</span>
                                        </div> 
                                    </div>
                                    <div className="product-list-wrap">
                                        {itemshop.count_product>0?
                                        <>
                                        {itemshop.pageitem.map(item=>
                                        <div key={item.id} className="product-list-card product-list-item">
                                            <div className="item_heading">
                                                <div className="item-center">
                                                    <div className="submit_form pr-1_2">
                                                        <label className="checkbox item-selector">
                                                            <input onChange={(e)=>checkitem(e,item)} checked={item.check} type="checkbox" className="checkbox__input" /> 
                                                            <span className="checkbox__indicator">
                                                                <i className="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M4.03033009,7.46966991 C3.73743687,7.1767767 3.26256313,7.1767767 2.96966991,7.46966991 C2.6767767,7.76256313 2.6767767,8.23743687 2.96966991,8.53033009 L6.32804531,11.8887055 C6.62093853,12.1815987 7.09581226,12.1815987 7.38870548,11.8887055 L13.2506629,6.02674809 C13.5435561,5.73385487 13.5435561,5.25898114 13.2506629,4.96608792 C12.9577697,4.6731947 12.4828959,4.6731947 12.1900027,4.96608792 L6.8583754,10.2977152 L4.03033009,7.46966991 Z"></path></svg></i>
                                                            </span>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="item-center" >
                                                    <Link to={`vendor/product/${item.id}`}>
                                                        <img src={item.image} alt="" width="52px" height="52px"/> 
                                                    </Link>
                                                    <div className="item_detail">
                                                        <div className="product-name-wrap">{item.name}</div>
                                                        <div className="product-sku">  
                                                            <span>Sku product : {item.sku!=null?item.sku:'-'}</span>
                                                        </div>
                                                        <div className="product-meta">
                                                            <div className="product-meta-item">
                                                                <div className="popover popover--light">
                                                                    <div className="popover__ref">
                                                                        <i className="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8,3 C11.2768566,3 14.2509832,4.73532307 15.8639541,7.49526828 C16.0461435,7.80701139 16.0461267,8.19275955 15.8639103,8.50448682 C14.2503225,11.2649365 11.2766689,13 8,13 C4.72361081,13 1.74984512,11.2651739 0.136703532,8.50585685 C-0.0454653311,8.19425267 -0.0455747862,7.8086603 0.136417142,7.49695275 C1.74851701,4.73582102 4.72261636,3 8,3 Z M8,4 C5.00862607,4 2.39683566,5.60872276 1,8.0011597 C2.39756369,10.3917256 5.00904299,12 8,12 C10.990957,12 13.6024363,10.3917256 15.0005844,7.99984002 C13.6031643,5.60872276 10.9913739,4 8,4 Z M8,4.5 C9.93299662,4.5 11.5,6.06700338 11.5,8 C11.5,9.93299662 9.93299662,11.5 8,11.5 C6.06700338,11.5 4.5,9.93299662 4.5,8 C4.5,6.06700338 6.06700338,4.5 8,4.5 Z M8,5.5 C6.61928813,5.5 5.5,6.61928813 5.5,8 C5.5,9.38071187 6.61928813,10.5 8,10.5 C9.38071187,10.5 10.5,9.38071187 10.5,8 C10.5,6.61928813 9.38071187,5.5 8,5.5 Z"></path></svg></i>
                                                                    </div> 
                                                                </div> 
                                                                <span className="product-meta-number text-overflow">0</span>
                                                            </div> 
                                                            <div className="product-meta-item product-meta-like">
                                                                <i className="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M7.71842712,13.881728 L2.23834957,8.40165043 C0.773883476,6.93718434 0.773883476,4.56281566 2.23834957,3.09834957 C3.65231683,1.68438231 5.9145167,1.63562482 7.38698276,2.9520771 L8.072,3.628 L8.60244214,3.09834957 C10.0669082,1.63388348 12.4412769,1.63388348 13.905743,3.09834957 C15.3702091,4.56281566 15.3702091,6.93718434 13.905743,8.40165043 L8.42553789,13.881732 C8.23027112,14.0769864 7.9136917,14.0769846 7.71842712,13.881728 Z M13.1986362,7.69454365 C14.272578,6.62060185 14.272578,4.87939815 13.1986362,3.80545635 C12.1246944,2.73151455 10.3834907,2.73151455 9.30902064,3.80598425 L8.42760306,4.68608625 C8.23313326,4.8802658 7.91840125,4.88109992 7.72290493,4.68795389 L6.72047402,3.69757431 L6.72047402,3.69757431 C5.637171,2.72905166 3.97820217,2.77271053 2.94545635,3.80545635 C1.87151455,4.87939815 1.87151455,6.62060185 2.94545635,7.69454365 L8.07198849,12.8210758 L13.1986362,7.69454365 Z"></path></svg></i> 
                                                                <span className="product-meta-number text-overflow">0</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="">
                                                {item.variations.map((variation,i)=>{
                                                    if(i<3){
                                                        return(
                                                        <div key={variation.variation_id} className='item-center -item'>
                                                            <div className="variation-sku">{variation.sku!=undefined?variation.sku:''}</div>
                                                            <div className="variation-item">{itemvariation(variation)}</div>
                                                            <div className="variation-price">{variation.price}</div>
                                                            <div className="variation-inventory">{variation.inventory}</div>
                                                            <div className="variation-number-order">{variation.number_order}</div>
                                                        </div> 
                                                        )
                                                    } 
                                                    if(i>2 && item.show){
                                                        return(
                                                            <div key={variation.variation_id} className='item-center -item'>
                                                                <div className="variation-sku">{variation.sku!=undefined?variation.sku:''}</div>
                                                                <div className="variation-item">{itemvariation(variation)}</div>
                                                                <div className="variation-price">{variation.price}</div>
                                                                <div className="variation-inventory">{variation.inventory}</div>
                                                                <div className="variation-number-order">{variation.number_order}</div>
                                                            </div> 
                                                        )  
                                                    }
                                                }
                                                )}
                                                {item.count_variation>3?
                                                <div className="product-more-models -item">
                                                    <div onClick={()=>showallvariation(item)} className="product-more-models__content item-center">
                                                        <button type="button" className="show_all_variation button--normal">
                                                            <span>{item.show?'Close':`${item.count_variation-3} classsify other`}</span>
                                                            <i className="icon">
                                                                {item.show?<svg viewBox="-111 113 32 32"><path d="M-106.2 135l10.9-12s0-.1.1-.2c.2-.2.5-.3.7-.3.3 0 .5.1.7.3 0 0 0 .1.1.2l10.9 12c.4.4.4 1 0 1.3-.4.4-1 .4-1.3 0L-94.5 125l-10.4 11.3c-.4.4-1 .4-1.3 0-.4-.4-.4-1 0-1.3z"></path></svg>:<svg viewBox="0 0 32 32"><path d="M28.2 11.1l-10.9 12s0 .1-.1.2c-.2.2-.5.3-.7.3-.3 0-.5-.1-.7-.3 0 0 0-.1-.1-.2l-10.9-12c-.4-.4-.4-1 0-1.3.4-.4 1-.4 1.3 0l10.4 11.3L26.9 9.8c.4-.4 1-.4 1.3 0 .4.4.4 1 0 1.3z"></path></svg>}
                                                            </i>   
                                                        </button>
                                                    </div>
                                                </div>:''}
                                            </div>
                                            <div className='table-edit'>
                                                <button onClick={()=>navigation(`/vendor/product/${item.id}`)} type="button" className="button-link mb-1">
                                                    <span>Modify</span>
                                                </button>
                                                <div className="dropdown dropdown">
                                                    <button type="button" className="button--link " style={{marginBottom: '4px'}}>
                                                        <span>Xem thêm</span>
                                                    </button>  
                                                    <div className="popper dropdown-menu" style={{display: 'none',position: 'absolute', zIndex: 1, willChange: 'top, left', transformOrigin: 'right top', top: '20px', left:'-210px'}} x-placement="bottom-end">
                                                        <ul className="dropdown-menu" style={{maxWidth: '440px'}}>
                                                            <li className="dropdown-item">Xem trước</li> 
                                                            <li className="dropdown-item">Ẩn</li> 
                                                            <li className="dropdown-item">Bắt đầu Quảng cáo Tìm Kiếm Sản Phẩm</li> 
                                                            <li className="dropdown-item">Bắt đầu Quảng Cáo Khám Phá</li> 
                                                            <li className="dropdown-item">
                                                                <div  className="boost-button boost-no-padding">
                                                                    <div  className="boost-button-text">Đẩy sản phẩm</div>
                                                                </div>  
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        )}
                                        </>:''}
                                    </div>
                                    {itemshop.count_product>0?
                                    <div className="with-assist">
                                        <div className="item-center page-pagination">
                                            <Pagination
                                                classActive={`pager__page active`}
                                                classNormal={`pager__page`}
                                                classIcon={`pager__page`}
                                                currentPage={currentPage.page}
                                                totalCount={Math.ceil(itemshop.count_product / currentPage.pagesize)}
                                                Pagesize={currentPage.pagesize}
                                                onPageChange={(page) => setpagechoice(page,'page',currentPage.page,'pagesize',currentPage.pagesize)}
                                            />
                                        </div>
                                        <div className="pagination-sizes pagination__part">
                                        <div className="dropdown">
                                                <span onClick={()=>setState({...state,show:!state.show})} className="pagination-sizes__content">{currentPage.pagesize}/pages
                                                    <i className="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M8,9.18933983 L4.03033009,5.21966991 C3.73743687,4.9267767 3.26256313,4.9267767 2.96966991,5.21966991 C2.6767767,5.51256313 2.6767767,5.98743687 2.96966991,6.28033009 L7.46966991,10.7803301 C7.76256313,11.0732233 8.23743687,11.0732233 8.53033009,10.7803301 L13.0303301,6.28033009 C13.3232233,5.98743687 13.3232233,5.51256313 13.0303301,5.21966991 C12.7374369,4.9267767 12.2625631,4.9267767 11.9696699,5.21966991 L8,9.18933983 Z"></path></svg></i>
                                                </span>  
                                                <div className="popper pagination-sizes__popper" style={{display: `${state.show?'':'none'}`}}>
                                                    <ul className="dropdown-menu" style={{maxWidth: '440px'}}>
                                                        {pagesize.map(item=>{
                                                            if(item<itemshop.count_product){
                                                                return(
                                                                <li onClick={()=>setpagechoice(item,'pagesize',currentPage.pagesize,'page',currentPage.page)} className="dropdown-item"> <span>{item}</span>
                                                                    {currentPage.pagesize ==item?
                                                                    <i className="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M4.03033009,7.46966991 C3.73743687,7.1767767 3.26256313,7.1767767 2.96966991,7.46966991 C2.6767767,7.76256313 2.6767767,8.23743687 2.96966991,8.53033009 L6.32804531,11.8887055 C6.62093853,12.1815987 7.09581226,12.1815987 7.38870548,11.8887055 L13.2506629,6.02674809 C13.5435561,5.73385487 13.5435561,5.25898114 13.2506629,4.96608792 C12.9577697,4.6731947 12.4828959,4.6731947 12.1900027,4.96608792 L6.8583754,10.2977152 L4.03033009,7.46966991 Z"></path></svg></i> 
                                                                    :''}
                                                                </li>)
                                                            }
                                                            }
                                                        )}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>:''}
                                </div>:
                                <div className="loading">
                                    <div className="loading_item item-center">
                                        <div className="ball"></div>
                                        <div className="ball"></div>
                                        <div className="ball"></div>
                                    </div>
                                </div>}
                            </div>
                            {itemshop.pageitem.some(item=>item.check)?
                            <div className="fix-container">
                                <div className="item-center fix-bottom-card">
                                    <div className="item-center">
                                        <div className="submit_form pr-1_2">
                                            {checkall()}
                                        </div>
                                        <div className="">Choice All</div>
                                        <div className="chon">
                                            <span className="select-tips">Selected <span>{itemshop.pageitem.filter(item=>item.check).length}</span> products</span>
                                        </div> 
                                    </div>
                                    <button onClick={()=>deleteitemchoice()} className="btn-m btn-light delete_item">Delete</button>
                                    <button className="btn-m btn-light hiden_item">Hide</button>
                                </div>
                            </div>:""}
                        </div>
                    </div>
                </div>
            </div>
            </div> 
             
           
        </>
    )
}

export default Listproduct