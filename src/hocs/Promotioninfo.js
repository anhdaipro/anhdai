import axios from 'axios';
import Navbar from "../seller/Navbar"
import {Link,useNavigate,useParams} from 'react-router-dom'
import ReactDOM, { render } from 'react-dom'
import Timeoffer from "./Timeoffer"
import Productoffer from "../seller/Productoffer"
import React, {useState,useEffect,useCallback,useRef,memo,useMemo} from 'react'
import Pagination from "./Pagination"
import {newcomboURL,} from "../urls"
import {formatter,timesubmit,combo_type,valid_from,valid_to} from "../constants"
import { headers } from '../actions/auth';
import {debounce} from 'lodash'
let Pagesize=5
const Promotioninfo=({combo_shop,edit,item_combo,loading_content,disable,url_combo})=>{
    const navite=useNavigate()
    const {id}=useParams()
    const [combo,setCombo]=useState(()=>{return{
        quantity_to_reduced:'',discount_price:'',price_special_sale:'',
        discount_percent:0,limit_order:'',promotion_combo_name:'',combo_type:'1',
        valid_from:valid_from.toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).substr(0,16),
        valid_to:valid_to.toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).substr(0,16),
    }})
    const [currentPage, setCurrentPage] = useState({items:1,byproduct:1});
    const [state,setState]=useState({timeSecond:5,complete:false,page_input:1,combo_type:[{name:'Giảm giá theo %',value:'1'},
        {name:'Giảm giá theo số tiền',value:'2'},{name:'Giảm giá đặc biệt',value:'3'}]})
    const [show,setShow]=useState({items:false,byproduct:false})
    const [itemshop,setItem]=useState({items:[],page_count_main:0,items_choice:[],savemain:false
        ,page_count_by:0,byproduct:[],byproduct_choice:[],savebyproduct:false})
    const [loading,setLoading]=useState(false)
    const [sameitem,setSameitem]=useState([])
    const [duplicate,setDuplicate]=useState(false)
    const list_enable_on=itemshop.items_choice.filter(item=>item.enable)
    const item_unvalid=list_enable_on.some(item=>sameitem.some(product=>product==item.id))
    
    useEffect(() => {
        if(combo_shop){
        setLoading(loading_content)
        setCombo(combo_shop)
        setItem(item_combo)
        }
      }, [loading_content,item_combo,combo_shop]);
    
    
    const currentitemPage=useMemo(()=>{
        const firstPageIndex = (currentPage.items - 1) * Pagesize;
        const lastPageIndex = firstPageIndex + Pagesize;
        return itemshop.items_choice.slice(firstPageIndex, lastPageIndex);
    },[currentPage,itemshop.items_choice])

    const setdatevalid=(index,date)=>{
        const datecombo=date.time.toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).substr(0,10)+' '+('0'+date.hours).slice(-2)+':'+("0"+date.minutes).slice(-2)
        const datadate=index==0?{valid_from:datecombo,valid_to:combo.valid_to}:{valid_to:datecombo,valid_from:combo.valid_from}
        setCombo({...combo,...datadate})
        if(list_enable_on.length>0){
            const data={action:'checkitem',...datadate,list_items:list_enable_on.map(item=>{
                return(item.id)
            })}
            axios.post(url_combo,JSON.stringify(data),headers)
            .then(res=>{
                const data=res.data.sameitem
                if(res.data.error){
                    seteterror(data)
                    setSameitem(data)
                }
                else{
                    setSameitem([])
                }
            })
        }
    }

    const seteterror=(data)=>{
        setDuplicate(true)
        const itemchoice=itemshop.items_choice.map(item=>{
            return({...item,enable:data.some(product=>product==item.id)?false:true})
        })
        setItem({...itemshop,items_choice:itemchoice})
    }
    
    const setform=(name,value)=>{
        setCombo({...combo,[name]:value})
    }


    const setcombotype=(item)=>{
        setCombo({...combo,combo_type:item.value})
    }

    const additem=(e)=>{
        setLoading(true)
        setShow({...show,items:true,byproduct:false})
            const url = id?`${newcomboURL}?combo_id=${id}&valid_from=${timesubmit(combo.valid_from)}&valid_to=${timesubmit(combo.valid_to)}`:`${newcomboURL}?&valid_from=${timesubmit(combo.valid_from)}&valid_to=${timesubmit(combo.valid_to)}`
            axios.get(url,headers)
            .then(res=>{
                const items=res.data.filter(item=>itemshop.byproduct_choice.every(itemchoice=>item.id!=itemchoice.id))
                const list_items=items.map(item=>{
                if(itemshop.items_choice.some(product=>product.id==item.id)){
                    return({...item,check:true,disable:true})
                }
                return({...item,check:false})
                })
                setItem({...itemshop,itemshops:res.data,items:list_items,page_count_main:Math.ceil(list_items.length / Pagesize)})  
            })
    }
    
    const handlePageChange=useCallback((page,name)=>{
        setCurrentPage({...currentPage,[name]:page})
    },[currentPage])

    const setcheckitem=(item,product,keys)=>{
        const list_item=product.map(ite=>{
            if(item.id==ite.id){
                return({...ite,check:!ite.check})
            }
            else{
                return({...ite})
            }
        })
        setItem(current=>{return {...current,[keys]:list_item}})
        
    }

    const setcheckall=(e,list_items,keys,value)=>{
        const listitems=value.map(item=>{
            if(e.target.checked){
                return({...item,check:list_items.some(product=>product.id==item.id)?true:item.check})
            }
            return({...item,check:list_items.some(product=>product.id==item.id) && !item.disable?false:item.check})
        })
       
        setItem({...itemshop,[keys]:listitems})
    }

    const setshow=useCallback((sho,name)=>{
        setShow({...show,[name]:sho})
    },[show])

    const setenableitem=(e,product,value,key)=>{
        const list_item=value.map(ite=>{
            if(product.id==ite.id){
                return({...ite,enable:!ite.enable})
            }
            else{
                return({...ite})
            }
        })
        setItem({...itemshop,[key]:list_item}) 
    }

    const removeitem=(itemmove,keys,value,keys_choice,value_choice,page_current)=>{
        const list_itemchoice=value_choice.filter(item=>item.id!=itemmove.id)
        const list_item=value.map(ite=>{
            if(ite.id==itemmove.id){
                return({...ite,check:false})
            }
            else{
                return({...ite})
            }
        })
        setItem({...itemshop,[keys]:list_item,[keys_choice]:list_itemchoice})
        setpageitem(keys,list_itemchoice,page_current)
    }

    const setenabledchoice=(e,value)=>{
        const list_item=itemshop.items_choice.map(item=>{
            if(item.check){
                return({...item,enable:value})
            }
            else{
                return({...item})
            }
        })
        setItem({...itemshop,items_choice:list_item})
    }

    const setdeletechoice=(keys,value,keys_choice,value_choice,page_current)=>{
        const list_itemchoice=value_choice.filter(item=>!item.check)
        const list_item=value.map(item=>{
            if(list_itemchoice.every(items=>items.id!=item.id)){
                return({...item,check:false})
            }
            return({...item})
        })
        setItem({...itemshop,[keys_choice]:list_itemchoice,[keys]:list_item})
        setpageitem(keys,list_itemchoice,page_current)
    }

    const setpageitem=(keys,list_itemchoice,page_current)=>{
        const page=list_itemchoice.length==0?1:page_current>=Math.ceil(list_itemchoice.length / Pagesize)?Math.ceil(list_itemchoice.length / Pagesize):page_current
        setCurrentPage({...currentPage,[keys]:page})
        handlePageChange(page,keys)
    }

    const setpage=(itemchoice,name)=>{
        let page=state.page_input
        if(state.page_input>Math.ceil(itemchoice.length / Pagesize)){
            setState({...state,page_input:Math.ceil(itemchoice.length / Pagesize)})
            page=Math.ceil(itemchoice.length / Pagesize)
        }
        if(state.page_input<1){
            page=1
            setState({...state,page_input:1})
        }
        handlePageChange(page,name)
    }
    const submit=useCallback(()=>{
        const list_itemscheck=itemshop.items.filter(ite=>ite.check && !itemshop.items_choice.some(item=>item.id==ite.id))
        const list_itemschoice=list_itemscheck.map(item=>{
            return({...item,check:false,enable:true})
        })
        itemshop.items_choice=[...list_itemschoice,...itemshop.items_choice]
        setItem({...itemshop,items_choice:itemshop.items_choice})
        setShow({...show,items:false})
    },[itemshop])

    const complete=()=>{
        if(!item_unvalid){
            const datacombo=combo
            delete datacombo.products
            const data={list_items:list_enable_on.map(item=>{
            return(item.id)}),...datacombo}
            axios.post(url_combo,JSON.stringify(data),headers)
            .then(res=>{
                const data=res.data.sameitem
                if(!res.data.error){
                    const countDown = setInterval(() => {
                    state.timeSecond--;
                    setState({...state,complete:true})
                    if (state.timeSecond <= 0) {
                        clearInterval(countDown)
                        setState({...state,complete:false})
                        navite('/marketing/bundle/list')
                    }
                }, 1000);
            }
            else{
                setSameitem(data)
                seteterror(data)
            }
        })
        }
        else{
            seteterror(sameitem)
        }
    }

    return(
        <>  
            <div id="app">
            <Navbar/>
            <div data-v-39395675="" className="wrapper">
                <div className="wrapper-content">
                    <div className="bundle-info-container">
                        <div className="bundle-info card">
                            <h4>info basic</h4>
                            <div className="basic-info-wrapper">
                                <div className="">   
                                    <div className="item-base-line mb-1">
                                        <label for="" className="form-item__label">
                                            Promotion Combo Name
                                        </label>
                                        <div className="item-col">
                                            <div className="input-inner" style={{width: '450px'}}> 
                                                <input onChange={(e)=>setform(e.target.name,e.target.value)} type="text"  className="form-select" value={combo.promotion_combo_name} name="promotion_combo_name" placeholder="Enter" style={{width: '450px'}} required/>
                                                <div className="input__suffix">
                                                </div>
                                            </div>
                                            <div className="info_more">Coupon name not visible to buyers</div>
                                        </div>
                                    </div>
                                    <div className="item-base-line mb-1">
                                        <label for="" className="form-item__label">Time to save discount code</label>
                                        <div className="flex-col">
                                            <Timeoffer
                                            edit={edit}
                                            data={combo}
                                            setdatevalid={(index,date)=>setdatevalid(index,date)}
                                            />
                                            <div className="info_more">
                                                <p>The end time of the program must be at least 1 hour after the start time</p>
                                                <p>Once the program has been created, the duration of the program can only be adjusted to shorten it.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" rule-type item-base-line">  
                                        <label className="form-item__label" for="price" >Combo type</label>
                                        <div className="item-col option-combo">
                                            <div className="custom-radio bundle-info-form item-col mb-1">
                                                <div data-v-539aa17b="" className="radio-group radio-group--normal radio-group--solid">
                                                    {combo_type.map((combos,index)=>{
                                                        return(
                                                            <>
                                                            <label key={index} onClick={()=>setcombotype(combos)} className="check_input mb-1">{combos.name}
                                                                <input type="radio" name="combo_type" checked={combos.value==combo.combo_type?true:false} className="custom-input" />
                                                                <span className="checkmark"></span>
                                                            </label>
                                                            
                                                            {combos.value==combo.combo_type?
                                                            <div data-v-539aa17b="" className="bundle-type-detail">
                                                                <div data-v-539aa17b="" className="rule-detail form-item-wrapper-normal empty-label">
                                                                    Mua 
                                                                    <div data-v-539aa17b="" className="amount-input-item input-fragment mb-1">
                                                                        
                                                                        <div className="form-item__control">
                                                                            <div className="form-item__content">
                                                                                <div data-v-539aa17b="" className="input">
                                                                                    <div className="input__inner input__inner--normal">
                                                                                        <input onChange={(e)=>setform('quantity_to_reduced',isNaN(e.target.value)?combo.quantity_to_reduced:e.target.value)}  value={combo.quantity_to_reduced} type="text" placeholder=" " resize="vertical" rows="2" minrows="2" maxLength="9" restrictiontype="input" max="Infinity" min="-Infinity" className="input__input"/>
                                                                                    </div>
                                                                                </div>
                                                                                sản phẩm {combos.value=='3'?'chỉ với giá':'để được giảm'} 
                                                                            </div> 
                                                                        </div>
                                                                    </div> 
                                                                    <div data-v-539aa17b="" className="discount-percentage-input-item form-item input-fragment mb-1" slot="discountPercentage">
                                                                        <div className="form-item__control">
                                                                            <div className="form-item__content">
                                                                                <div data-v-539aa17b="" className="input discount-input" placeholder=" ">
                                                                                    <div className="input__inner input__inner--normal">
                                                                                        {combos.value=='1'?<>
                                                                                        <input name='discount_percent' value={combo.discount_percent} onChange={(e)=>setform('discount_percent',isNaN(e.target.value)?combo.discount_percent:e.target.value)} type="text" placeholder=" " resize="vertical" rows="2" minrows="2" restrictiontype="value" max="Infinity" min="-Infinity" className="input__input"/> 
                                                                                        <div className="input__suffix">
                                                                                            <span className="input__suffix-split"></span>%GIẢM
                                                                                        </div></>:<>
                                                                                        <div className="input__prefix">₫
                                                                                            <span className="input__prefix-split"></span>
                                                                                        </div> 
                                                                                        <input onChange={(e)=>setform(e.target.name,isNaN(e.target.value)?combos.value=='2'?combo.discount_price:combo.price_special_sale:e.target.value)} name={combos.value=='2'?'discount_price':'price_special_sale'} value={combo.combo_type=='1'?'':combo.combo_type=='2'?combo.discount_price:combo.price_special_sale} type="text" placeholder=" " resize="vertical" rows="2" minrows="2" maxLength="13" restrictiontype="value" max="Infinity" min="-Infinity" className="input__input"/>
                                                                                        </>} 
                                                                                    </div> 
                                                                                </div>
                                                                            </div> 
                                                                        </div>
                                                                    </div>
                                                                </div> 
                                                            </div>:''}
                                                            </>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item-base-line prize-quntity">
                                        <label className="form-item__label" for="price" >Limit order</label>
                                        <div className="item-col my-1">
                                            <div className="input-inner" style={{width: '400px'}}> 
                                                <input onChange={e=>setform('limit_order',isNaN(e.target.value)?combo.limit_order:e.target.value)} type="text" value={combo.limit_order} className="form-select" name="limit_order" placeholder="Enter" style={{width: '400px'}} required/>
                                                <div className="input__suffix"></div>
                                            </div>
                                            <div className="info_more">
                                                <p className="reminder">Maximum number of Promotion Combos that one buyer can place</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div data-v-539aa17b="" style={{backgroundImage:`url("http://localhost:8000/media/my_web/base_info_vn.8e539b2.png")`}} className="bundle-info-img vn"></div>
                                
                            </div>
                        </div>
                    </div>
                    <div className="main_info">
                        {itemshop.items_choice.length==0?<>
                        <h2 className="card-title">Products of Combo Promotion</h2>
                        <div className="tips">Please add products to the Promotion Combo.</div>
                        <div className="add-item">
                            <button onClick={()=>additem()} className="button--primary btn-m add-product item-center">
                                <i className="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8.48176704,1.5 C8.75790942,1.5 8.98176704,1.72385763 8.98176704,2 L8.981,7.997 L15,7.99797574 C15.2761424,7.99797574 15.5,8.22183336 15.5,8.49797574 C15.5,8.77411811 15.2761424,8.99797574 15,8.99797574 L8.981,8.997 L8.98176704,15 C8.98176704,15.2761424 8.75790942,15.5 8.48176704,15.5 C8.20562467,15.5 7.98176704,15.2761424 7.98176704,15 L7.981,8.997 L2,8.99797574 C1.72385763,8.99797574 1.5,8.77411811 1.5,8.49797574 C1.5,8.22183336 1.72385763,7.99797574 2,7.99797574 L7.981,7.997 L7.98176704,2 C7.98176704,1.72385763 8.20562467,1.5 8.48176704,1.5 Z"></path></svg></i>
                                <span className="ml-1_2">Add product</span>  
                            </button>
                        </div></>:<>
                        <div className="item-spaces">
                            <div>
                                <div className="title">Sản phẩm của Combo Khuyến Mãi</div>
                                <div className="tips">Các sản phẩm trong Combo Khuyến Mãi cần có cùng một kênh vận chuyển</div>
                            </div>
                            <div className="change-item">
                                <button onClick={()=>additem()} className="add-product button--primary btn-m">
                                    <i className="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8.48176704,1.5 C8.75790942,1.5 8.98176704,1.72385763 8.98176704,2 L8.981,7.997 L15,7.99797574 C15.2761424,7.99797574 15.5,8.22183336 15.5,8.49797574 C15.5,8.77411811 15.2761424,8.99797574 15,8.99797574 L8.981,8.997 L8.98176704,15 C8.98176704,15.2761424 8.75790942,15.5 8.48176704,15.5 C8.20562467,15.5 7.98176704,15.2761424 7.98176704,15 L7.981,8.997 L2,8.99797574 C1.72385763,8.99797574 1.5,8.77411811 1.5,8.49797574 C1.5,8.22183336 1.72385763,7.99797574 2,7.99797574 L7.981,7.997 L7.98176704,2 C7.98176704,1.72385763 8.20562467,1.5 8.48176704,1.5 Z"></path></svg></i>
                                    <span className="ml-1_2">Add product</span> 
                                </button>
                            </div>
                        </div>
                        <div className="item_main-content">
                            <div className="item-spaces my-1">
                                <p className="enabled">
                                    <span>{list_enable_on.length}</span> product is enabled on a total of <span>{itemshop.items_choice.length}</span> products
                                </p>
                            </div>
                            <div className="item-spaces batch-setting-panel">
                                <div className="batch-setting">
                                    <div className="titles">Batch Setup</div>
                                    <div className="subtitle">selected <strong>{itemshop.items_choice.filter(item=>item.check).length}</strong> products</div>
                                </div>
                                <div className="item-spaces">
                                    <button onClick={(e)=>setenabledchoice(e,false)} className={`btn-m ml-1 ${itemshop.items_choice.some(item=>item.check)?"":'disable'} btn-light`}>Batch disable</button>
                                    <button onClick={(e)=>setenabledchoice(e,true)} className={`btn-m  ml-1 ${itemshop.items_choice.some(item=>item.check)?"":'disable'} btn-light`}>Batch activation</button>
                                    <button onClick={()=>setdeletechoice('items',itemshop.items,'items_choice',itemshop.items_choice,currentPage.items)} className={`btn-m btn-light ${itemshop.items_choice.some(item=>item.check)?"":'disable'} ml-1`}>Delete</button>
                                </div>
                            </div>
                            <div className="content-box my-1">
                                <div className="table__header--container">
                                    <div className="item_heading" style={{width:'440px'}}>
                                        <div className="item-center form-check-item">
                                            <label className={`checkbox item-selector ${currentitemPage.some(ite=>ite.check)&&!currentitemPage.every(ite=>ite.check)?'indeterminate':''}`}>
                                                <input onChange={(e)=>setcheckall(e,currentitemPage,'items_choice',itemshop.items_choice)} type="checkbox" checked={currentitemPage.every(ite=>ite.check)?true:false} className="checkbox__input" value=""/> 
                                                <span className="checkbox__indicator">
                                                    <i className="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">{currentitemPage.some(ite=>ite.check)&&!currentitemPage.every(ite=>ite.check)?<path fillRule="evenodd" d="M3.75,7 L12.25,7 C12.6642136,7 13,7.33578644 13,7.75 C13,8.16421356 12.6642136,8.5 12.25,8.5 L3.75,8.5 C3.33578644,8.5 3,8.16421356 3,7.75 C3,7.33578644 3.33578644,7 3.75,7 Z"></path>:<path d="M4.03033009,7.46966991 C3.73743687,7.1767767 3.26256313,7.1767767 2.96966991,7.46966991 C2.6767767,7.76256313 2.6767767,8.23743687 2.96966991,8.53033009 L6.32804531,11.8887055 C6.62093853,12.1815987 7.09581226,12.1815987 7.38870548,11.8887055 L13.2506629,6.02674809 C13.5435561,5.73385487 13.5435561,5.25898114 13.2506629,4.96608792 C12.9577697,4.6731947 12.4828959,4.6731947 12.1900027,4.96608792 L6.8583754,10.2977152 L4.03033009,7.46966991 Z"></path>}</svg></i>
                                                </span> 
                                            </label>
                                        </div>
                                        <div className=" item-center">Product name</div>
                                    </div>
                                    <div className="table_main-header" style={{width:'800px'}}>
                                        <div>
                                            <span>Current Selling Price</span>
                                            <div className="table__cell-action table__cell-icon table__sort-icons">
                                                <i className="icon table__sort-icon up"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M7.57253679,6.40074676 L5.1530248,8.66903925 C4.90120463,8.90512066 4.88844585,9.30064304 5.12452726,9.55246321 C5.24268191,9.67849483 5.40773242,9.75 5.58048801,9.75 L10.419512,9.75 C10.76469,9.75 11.044512,9.47017797 11.044512,9.125 C11.044512,8.95224442 10.9730068,8.7871939 10.8469752,8.66903925 L8.42746321,6.40074676 C8.18705183,6.17536109 7.81294817,6.17536109 7.57253679,6.40074676 Z"></path></svg></i>
                                                <i className="icon table__sort-icon down"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M7.57253679,9.34925324 L5.1530248,7.08096075 C4.90120463,6.84487934 4.88844585,6.44935696 5.12452726,6.19753679 C5.24268191,6.07150517 5.40773242,6 5.58048801,6 L10.419512,6 C10.76469,6 11.044512,6.27982203 11.044512,6.625 C11.044512,6.79775558 10.9730068,6.9628061 10.8469752,7.08096075 L8.42746321,9.34925324 C8.18705183,9.57463891 7.81294817,9.57463891 7.57253679,9.34925324 Z"></path></svg></i>
                                            </div>
                                        </div>
                                        <div>
                                            <span>Inventory</span>
                                            <div className="popover__ref">
                                                <i className="icon table__cell-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8,1 C11.8659932,1 15,4.13400675 15,8 C15,11.8659932 11.8659932,15 8,15 C4.13400675,15 1,11.8659932 1,8 C1,4.13400675 4.13400675,1 8,1 Z M8,2 C4.6862915,2 2,4.6862915 2,8 C2,11.3137085 4.6862915,14 8,14 C11.3137085,14 14,11.3137085 14,8 C14,4.6862915 11.3137085,2 8,2 Z M7.98750749,10.2375075 C8.40172105,10.2375075 8.73750749,10.5732939 8.73750749,10.9875075 C8.73750749,11.401721 8.40172105,11.7375075 7.98750749,11.7375075 C7.57329392,11.7375075 7.23750749,11.401721 7.23750749,10.9875075 C7.23750749,10.5732939 7.57329392,10.2375075 7.98750749,10.2375075 Z M8.11700238,4.60513307 C9.97011776,4.60513307 10.7745841,6.50497267 9.94298079,7.72186504 C9.76926425,7.97606597 9.56587088,8.14546785 9.27050506,8.31454843 L9.11486938,8.39945305 L8.95824852,8.47993747 C8.56296349,8.68261431 8.49390831,8.75808648 8.49390831,9.0209925 C8.49390831,9.29713488 8.27005069,9.5209925 7.99390831,9.5209925 C7.71776594,9.5209925 7.49390831,9.29713488 7.49390831,9.0209925 C7.49390831,8.34166619 7.7650409,7.99681515 8.35913594,7.6662627 L8.76655168,7.45066498 C8.9424056,7.3502536 9.04307851,7.26633638 9.11735517,7.1576467 C9.52116165,6.56675314 9.11397414,5.60513307 8.11700238,5.60513307 C7.41791504,5.60513307 6.82814953,6.01272878 6.75715965,6.55275918 L6.75,6.66244953 L6.74194433,6.75232516 C6.69960837,6.98557437 6.49545989,7.16244953 6.25,7.16244953 C5.97385763,7.16244953 5.75,6.9385919 5.75,6.66244953 C5.75,5.44256682 6.87194406,4.60513307 8.11700238,4.60513307 Z"></path></svg></i>
                                            </div>
                                        </div>
                                        <div className="column_edit-shipping">
                                            <span>Delivery info</span> 
                                        </div>
                                        <div className="status">
                                            <span>Activate/Deactivate</span>
                                        </div>
                                        <div className="table-edit">
                                            <span>Action</span>
                                        </div> 
                                    </div>
                                </div>
                                <div className="table__body-container">
                                    <div className="item-shop">
                                    {currentitemPage.map(item=>
                                        <div key={item.id} className="item">
                                            <div className="item-discount">
                                                <div className="item_heading" style={{width:'440px'}}>
                                                    <div className="item-center form-check-item">
                                                       <label className="checkbox item-selector">
                                                            <input checked={item.check?true:false} onChange={()=>setcheckitem(item,itemshop.items_choice,'items_choice')} type="checkbox" className="checkbox__input" value=""/> 
                                                            <span className="checkbox__indicator">
                                                                <i className="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M4.03033009,7.46966991 C3.73743687,7.1767767 3.26256313,7.1767767 2.96966991,7.46966991 C2.6767767,7.76256313 2.6767767,8.23743687 2.96966991,8.53033009 L6.32804531,11.8887055 C6.62093853,12.1815987 7.09581226,12.1815987 7.38870548,11.8887055 L13.2506629,6.02674809 C13.5435561,5.73385487 13.5435561,5.25898114 13.2506629,4.96608792 C12.9577697,4.6731947 12.4828959,4.6731947 12.1900027,4.96608792 L6.8583754,10.2977152 L4.03033009,7.46966991 Z"></path></svg></i>
                                                            </span>
                                                        </label>
                                                    </div>
                                                    <div className="item-center" >
                                                        <img src={item.image} alt="" width="52px" height="52px"/>
                                                        <div className="item_detail">
                                                            <div className="ellipsis-content">{item.name}</div>
                                                            <div className="product-sku"><span>SKU :</span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="table_main-header" style={{width:'800px'}}>
                                                    <div>
                                                        ₫{formatter.format(item.min_price)} {item.min_price!=item.max_price?`- ${formatter.format(item.max_price)}`:''}
                                                    </div>
                                                    <div>{item.total_inventory}</div>
                                                    <div className="column_edit-shipping">{item.shipping}</div>
                                                    <div className="item-center status">
                                                        <input type="checkbox" onChange={(e)=>setenableitem(e,item,itemshop.items_choice,'items_choice')} checked={item.enable?true:false}  className="switch_1 " name="check"/>
                                                        {sameitem.some(product=>product==item.id)?
                                                        <div data-v-6ec5aca5="" class="item-update-error popover popover--light">
                                                            <div class="popover__ref">
                                                                <span data-v-6ec5aca5="">
                                                                    <i data-v-6ec5aca5="" class="icon">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0-.875a6.125 6.125 0 1 0 0-12.25 6.125 6.125 0 0 0 0 12.25zm1.35-3.313c.22 0 .4.154.4.344 0 .19-.18.344-.4.344h-2.7c-.22 0-.4-.154-.4-.344 0-.19.18-.344.4-.344h.95V6.938H6.93c-.221 0-.4-.154-.4-.344 0-.19.179-.344.4-.344H8c.222 0 .4.154.4.344v4.218h.95zM8 4.875A.437.437 0 1 1 8 4a.437.437 0 0 1 0 .875z"></path></svg>
                                                                    </i>
                                                                </span> 
                                                            </div> 
                                                        </div>:''}
                                                    </div>
                                                    <div className="table-edit">
                                                        <button onClick={()=>removeitem(item,'items',itemshop.items,'items_choice',itemshop.items_choice,currentPage.items)} data-v-625f739d="" type="button" class="action button button--normal button--circle">
                                                            <i class="icon">
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M2,4 C1.72385763,4 1.5,3.77614237 1.5,3.5 C1.5,3.22385763 1.72385763,3 2,3 L6,2.999 L6,2 C6,1.44771525 6.44771525,1 7,1 L10,1 C10.5522847,1 11,1.44771525 11,2 L11,2.999 L15,3 C15.2761424,3 15.5,3.22385763 15.5,3.5 C15.5,3.77614237 15.2761424,4 15,4 L14,4 L14,14 C14,14.5522847 13.5522847,15 13,15 L4,15 C3.44771525,15 3,14.5522847 3,14 L3,4 L2,4 Z M13,4 L4,4 L4,14 L13,14 L13,4 Z M6.5,7 C6.77614237,7 7,7.22385763 7,7.5 L7,11.5 C7,11.7761424 6.77614237,12 6.5,12 C6.22385763,12 6,11.7761424 6,11.5 L6,7.5 C6,7.22385763 6.22385763,7 6.5,7 Z M8.5,6 C8.77614237,6 9,6.22385763 9,6.5 L9,11.5 C9,11.7761424 8.77614237,12 8.5,12 C8.22385763,12 8,11.7761424 8,11.5 L8,6.5 C8,6.22385763 8.22385763,6 8.5,6 Z M10.5,7 C10.7761424,7 11,7.22385763 11,7.5 L11,11.5 C11,11.7761424 10.7761424,12 10.5,12 C10.2238576,12 10,11.7761424 10,11.5 L10,7.5 C10,7.22385763 10.2238576,7 10.5,7 Z M10,2 L7,2 L7,2.999 L10,2.999 L10,2 Z"></path></svg>
                                                            </i>
                                                        </button>
                                                       
                                                    </div>
                                                </div> 
                                            </div> 
                                        </div>
                                    )}
                                    </div>
                                    <div className="with-assist">
                                        <div className="item-center page-pagination">
                                            <Pagination
                                                classActive={`buttons active`}
                                                classNormal={`buttons`}
                                                classIcon={`buttons`}
                                                currentPage={currentPage.items}
                                                totalCount={Math.ceil(itemshop.items_choice.length / Pagesize)}
                                                Pagesize={Pagesize}
                                                onPageChange={(page) => handlePageChange(page,'items')}
                                            />
                                        </div>
                                        <div className="pagination-jumperpagination__part">
                                            <span className="pagination-jumper__label">Go to page</span>
                                            <div className="pagination-jumper__input">
                                            <div className="number-input  number-input--no-suffix">
                                                <input onChange={(e)=>setState({...state,page_input:isNaN(e.target.value)?state.page_input:e.target.value})} type="text" value={state.page_input}  className="input_input"/>
                                            </div>
                                            <button onClick={()=>setpage(itemshop.items_choice,'items')} type="button" className="button btn-m btn-light "><span>Go</span></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> </>} 
                    </div>
                    <div className="bottom-card">
                        <div className="fix-container fixed-bottom">
                            <div className="action-button">
                                <button className="cancel btn-m btn-light">Cancel</button>
                                <button onClick={()=>complete()} className="submit btn-orange btn-m" type="button" >Submit</button>
                            </div>
                        </div>
                    </div>  
                </div>
            </div>
            </div>
            <div id="modal">
                {show.items || show.byproduct || state.complete||duplicate?
                <Productoffer
                    showmain={show.items}
                    showbyproduct={show.byproduct}
                    loading={loading}
                    items={itemshop.items}
                    sec={state.timeSecond}
                    text={combo}
                    duplicate={duplicate}
                    texterror={`Combo Khuyến Mãi`}
                    setDuplicate={data=>setDuplicate(data)}
                    complete={state.complete}
                    items_choice={itemshop.items_choice}
                    byproduct={itemshop.byproduct}
                    byproduct_choice={itemshop.byproduct_choice}
                    setcheckitem={(item,product,keys)=>setcheckitem(item,product,keys)}
                    setcheckall={(e,items,keys,value)=>setcheckall(e,items,keys,value)}
                    submit={()=>submit()}
                    setshow={(sho,name)=>setshow(sho,name)}
                />:''}
            </div>
               
        </>
    )
}
export default memo(Promotioninfo)