import axios from 'axios';
import Navbar from "../seller/Navbar"
import {Link,useParams} from 'react-router-dom'
import ReactDOM, { render } from 'react-dom'
import Timeoffer from "./Timeoffer"
import Productoffer from "../seller/Productoffer"
import React, {useState,useEffect,useCallback,useRef} from 'react'
import Pagination from "./Pagination"

import {formatter,itemvariation,limit_choice} from "../constants"
import { headers } from '../actions/auth';
import { newprogramURL } from '../urls';
let Pagesize=5

const Limit=(props)=>{
    const [show,setShow]=useState(false)
    const parent=useRef()
    const {item,name,setlimit,keys}=props
    useEffect(() => {
        document.addEventListener('click', handleClick)
        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [])

    const handleClick = (event) => {
        const { target } = event
        if(parent.current!=null){
            if (!parent.current.contains(target)) {
                setShow(false)
            }
        }
    }
    return(
        <div ref={parent} className="popover__ref">
            <div data-v-0d5f8626="" className={`${item.limit?'d-flex':''}`} prepend-width="110">
                <div data-v-0d5f8626="" className="select" style={{width: '110px',position:'relative'}}>
                    <div onClick={(e)=>setShow(!show)} tabindex="0" className="selector item-space selector--normal"> 
                        <div className="selector__inner line-clamp--1">{item.limit?'Giới hạn':"Không giới hạn"}</div> 
                        <div className="selector__suffix"> 
                            <i className="selector__suffix-icon icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M8,9.18933983 L4.03033009,5.21966991 C3.73743687,4.9267767 3.26256313,4.9267767 2.96966991,5.21966991 C2.6767767,5.51256313 2.6767767,5.98743687 2.96966991,6.28033009 L7.46966991,10.7803301 C7.76256313,11.0732233 8.23743687,11.0732233 8.53033009,10.7803301 L13.0303301,6.28033009 C13.3232233,5.98743687 13.3232233,5.51256313 13.0303301,5.21966991 C12.7374369,4.9267767 12.2625631,4.9267767 11.9696699,5.21966991 L8,9.18933983 Z"></path></svg>
                            </i>
                        </div>
                    </div>
                    <div className="popper" style={{display:show?'block':'none',top:'40px',position:'absolute',width: '100%'}}> 
                        <div className="select__menu" style={{maxWidth: '440px', maxHeight: '218px'}}>
                            <div className="scrollbar">
                                <div className="scrollbar__wrapper">
                                    <div className="scrollbar__bar vertical">
                                        <div className="scrollbar__thumb" style={{top: '0px', height: '0px'}}></div>
                                    </div>  
                                    <div className="scrollbar__content" style={{position: 'relative'}}>
                                        <div className="select__options">
                                            {limit_choice.map(choice=>
                                            <div value={choice.value} onClick={(e)=>{
                                                setlimit(e,item,name,'limit',choice.value)
                                                setShow(false)
                                            }} data-v-0d5f8626="" className={`option ${item.limit==choice.value?'selected':''}`}>{choice.name}</div>     
                                            )}
                                            
                                        </div>
                                        <div className="resize-triggers">
                                            <div className="expand-trigger">
                                                <div style={{width: '1px', height: '1px'}}></div>
                                            </div>
                                            <div className="contract-trigger"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> 
                        <p className="select__filter-empty" style={{display: 'none'}}></p> 
                    </div>
                </div> 
                {item.limit?
                <span className="input-group__append">
                    <div data-v-0d5f8626="" className="input" style={{width: '60px'}}>
                        <div className="input__inner input__inner--normal"> 
                            <input value={keys=='user_item_limit'?item.user_item_limit:item.promotion_stock} onChange={(e)=>setlimit(e,item,name,keys=='user_item_limit'?'user_item_limit':'promotion_stock',e.target.value)} type="text" placeholder=" " resize="vertical" rows="2" minrows="2" restrictiontype="value" max="Infinity" min="-Infinity" className="input__input"/> 
                        </div>
                    </div>
                </span>:''}
            </div> 
        </div> 
    )
}

const Programinfo=({loading_content,item_program,date_program,program_shop,url_program})=>{
    const [program,setProgram]=useState({name_program:'',valid_from:new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).substr(0,16),
    valid_to:new Date(new Date().setHours(new Date().getHours()+1)).toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).substr(0,16)
    })
    const [limititem,setLimititem]=useState({show:false,limit:false,user_item_limit:''})
    const [limitvariation,setLimitvariation]=useState({show:false,limit:false,promotion_stock:'',percent_discount:''})
    const [currentPage, setCurrentPage] = useState({items:1,byproduct:1});
    const [state,setState]=useState({timeSecond:5,complete:false,page_input:1,percent_discount:''})
    const [date,setDate]=useState([{time:new Date(),show:false,hours:new Date().getHours(),minutes:new Date().getMinutes()}
    ,{time:new Date(),show:false,hours:new Date().getHours()+1,minutes:new Date().getMinutes()}])
    const [show,setShow]=useState({items:false,byproduct:false})
    const [itemshop,setItem]=useState({items:[],page_count_main:0,items_choice:[],savemain:false
    ,page_count_by:0,byproduct:[],byproduct_choice:[],savebyproduct:false})
    const [loading,setLoading]=useState(false)
    const {id}=useParams()
    useEffect(() => {
        setDate(date_program)
        setProgram(program_shop)
        setLoading(loading_content)
        setItem(item_program)
      }, [date_program,loading_content,item_program,program_shop]);
   
    const firstpagebyproductIndex=(currentPage.byproduct - 1) * Pagesize;
    const lastPagebyproductIndex = firstpagebyproductIndex + Pagesize;
    const byproductPage=itemshop.byproduct_choice.slice(firstpagebyproductIndex, lastPagebyproductIndex);
    const onChange = (datechoice) => {
        const list_date=date.map(item=>{
            if(item.show){
                return({...item,time:datechoice})
            }
            return({...item})
        })

        setDate(list_date);
    };

    const handlePageChange=useCallback((page,name)=>{
        setCurrentPage({...currentPage,[name]:page})
    },[currentPage])

    const settimechoice=(value,index,name)=>{
        const list_date=date.map((item,i)=>{
            if(i==index){
                console.log(name)
                return({...item,[name]:value})
            }
            return({...item})
        })
        setDate(list_date); 
    }

    const setindexchoice=(list_date)=>{
        setDate(list_date);
    }
    const list_enable_on=itemshop.byproduct_choice.filter(item=>item.variations.some(variation=>variation.enable))
    const setdatevalid=(index)=>{
        if(index==0){
            setProgram({...program,valid_from:date[index].time.toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).substr(0,10)+' '+('0'+date[index].hours).slice(-2)+':'+("0"+date[index].minutes).slice(-2)})
        }
        else{
            setProgram({...program,valid_to:date[index].time.toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).substr(0,10)+' '+('0'+date[index].hours).slice(-2)+':'+("0"+date[index].minutes).slice(-2)})
        }
    }

    const setform=(e)=>{
        setProgram({...program,[e.target.name]:e.target.value})
    }

    const addbyproduct=(e)=>{
        console.log('lllllllllllll')
        
        if(itemshop.items.length==0){
            setShow({...show,byproduct:true,items:false})
            const url=id?`${newprogramURL}?item=item&program_id=${id}`:`${newprogramURL}?item=item`
            axios.get(url,headers)
            .then(res=>{
                setLoading(true)
                const list_byproduct=res.data.filter(item=>itemshop.items_choice.every(itemchoice=>item.id!=itemchoice.id))
                console.log('lllllllllllll')
                const byproduct=list_byproduct.map(item=>{
                    if(itemshop.byproduct_choice.some(by=>by.id==item.id)){
                        return({...item,check:true})
                    }
                     return({...item,check:false})
                })
                
                setItem({...itemshop,itemshops:res.data,byproduct:byproduct,page_count_by:Math.ceil(byproduct.length / Pagesize)})  
            })
        }
        else{
            setShow({...show,byproduct:true,items:false})
            setLoading(true)
            console.log('ggggg')
            const list_byproduct=itemshop.itemshops.filter(item=>itemshop.items_choice.every(itemchoice=>item.id!=itemchoice.id))
            const byproduct=list_byproduct.map(item=>{
                if(itemshop.byproduct_choice.some(by=>by.id==item.id)){
                    return({...item,check:true})
                }
                    return({...item,check:false})
            })
            
            setItem({...itemshop,byproduct:byproduct,page_count_by:Math.ceil(byproduct.length / Pagesize)})  
        }
    }
    console.log(itemshop.items)
    const setcheckitem=useCallback((item,product,keys)=>{
        const list_item=product.map(ite=>{
            if(item.id==ite.id){
                return({...ite,check:!ite.check})
            }
            else{
                return({...ite})
            }
        })
        setItem({...itemshop,[keys]:list_item})
        console.log({[keys]:list_item})
    },[itemshop])

    const setcheckall=(e,list_items,keys,value)=>{
        e.stopPropagation()
        for (let k in value){
            for(let i in list_items){
                if(e.target.checked==true && list_items[i]==value[k] && keys!='byproduct_choice' && keys!='items_choice' && !itemshop.items_choice.some(ite=>ite.id==value[k].id)){
                    value[k].check=true
                }
                if(e.target.checked==false && list_items[i]==value[k] && keys!='byproduct_choice' && keys!='items_choice' && !itemshop.items_choice.some(ite=>ite.id==value[k].id)){
                    value[k].check=false
                }
                if(e.target.checked==true && list_items[i]==value[k]){
                    if(keys=='byproduct_choice' || keys=='items_choice'){
                        value[k].check=true
                    }
                }
                if(e.target.checked==false && list_items[i]==value[k]){
                    if(keys=='byproduct_choice' || keys=='items_choice'){
                        value[k].check=false
                    }
                }
            }
        }
        setItem({...itemshop,[keys]:value})
    }

    const setshow=(sho,name)=>{
        setShow({...show,[name]:sho})
    }

    const submitby=()=>{
        
        const list_itemscheck=itemshop.byproduct.filter(ite=>ite.check && !itemshop.byproduct_choice.some(item=>item.id==ite.id))
        const data={list_items:list_itemscheck.map(item=>{return item.id}),
        action:'getitem'
        }
        axios.post(url_program,JSON.stringify(data),headers)
        .then(res=>{
            const list_itemschoice=res.data.map(item=>{
                return({...item,check:false,show:false,limit:false,user_item_limit:'',variations:item.variations.map(variation=>{
                    return({...variation,promotion_stock:'',enable:true,show:false,limit:false,percent_discount:0,promotion_price:variation.price})
                })})})
            
            const databyproduct=[...list_itemschoice,...itemshop.byproduct_choice]
            setItem({...itemshop,byproduct_choice:databyproduct})
            setShow({...show,byproduct:false})
            
        })
        
    }

    const removeitem=(itemmove,keys,value,keys_choice,value_choice,page_current)=>{
        const list_itemchoice=value_choice.filter(item=>item.id!=itemmove.id)
        const list_item=value.map(ite=>{
            if(ite.id==itemmove.id){
                return({...ite,check:false})
            }
            return({...ite})
        })
        setItem({...itemshop,[keys]:list_item,[keys_choice]:list_itemchoice})
        let page=page_current
        if(page>=Math.ceil(list_itemchoice.length / Pagesize)){
            page=Math.ceil(list_itemchoice.length / Pagesize)
            console.log(list_itemchoice.length)
        }
        setCurrentPage({...currentPage,[keys]:page})
        handlePageChange(page,keys)
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
        let page=page_current
        if(page>=Math.ceil(list_itemchoice.length / Pagesize)){
            page=Math.ceil(list_itemchoice.length / Pagesize)
            console.log(list_itemchoice.length)
        }
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

    const setdiscount=(e,name,variation,item)=>{
        let discount=parseInt(e.target.value)
        const byproduct=item.variations.map(varia=>{
            if(varia.variation_id==variation.variation_id){
                if(name=='promotion_price'){
                    if(isNaN(discount)){
                        return({...varia,error:true,promotion_price:'',percent_discount:100})
                    }
                    else{
                        if(discount==0||discount==variation.price){
                            return({...varia,error:true,promotion_price:discount,percent_discount:Math.round((variation.price-discount)/variation.price*100)})
                        }
                        return({...varia,error:false,promotion_price:discount,percent_discount:Math.round((variation.price-discount)/variation.price*100)})
                    }
                }
                else{
                    if(isNaN(discount)){
                        return({...varia,error:true,promotion_price:variation.price,percent_discount:''})
                    }
                    if(discount<1||discount>100){
                        return({...varia,error:true,promotion_price:variation.price*(1-discount/100),percent_discount:discount,percent_discount:0})
                    }
                    return({...varia,error:false,promotion_price:variation.price*(1-discount/100),percent_discount:discount})
                }
            }
            else{
                return({...varia})
            }
        })
        item.variations=byproduct
        updatebyproduct(item)
    }
    
    const updateall=(e)=>{
        e.stopPropagation()
        const list_byproduct=itemshop.byproduct_choice.map(byproduct=>{
            return({...byproduct,show:limititem.show,limit:limititem.limit,user_item_limit:limititem.user_item_limit!=''?limititem.user_item_limit:byproduct.user_item_limit,variations:byproduct.variations.map(variation=>{
                return({...variation,show:limitvariation.show,limit:limitvariation.limit,promotion_stock:limitvariation.promotion_stock!=''?limitvariation.promotion_stock:''
                ,percent_discount:limitvariation.percent_discount!=''?limitvariation.percent_discount:variation.percent_discount,
                promotion_price:variation.price*(1-(limitvariation.percent_discount/100))})
            })})
        })
        setItem({...itemshop,byproduct_choice:list_byproduct})
    }

    const updatechoice=(e)=>{
        e.stopPropagation()
        const list_byproduct=itemshop.byproduct_choice.map(byproduct=>{
            if(byproduct.check){
                return({...byproduct,show:limititem.show,limit:limititem.limit,user_item_limit:limititem.user_item_limit?limititem.user_item_limit!='':byproduct.user_item_limit,variations:byproduct.variations.map(variation=>{
                return({...variation,show:limitvariation.show,limit:limitvariation.limit,
                    percent_discount:limitvariation.percent_discount!=''?limitvariation.percent_discount:variation.percent_discount,
                    promotion_price:variation.price*(1-(limitvariation.percent_discount/100))})
            })})
            }
            return({...byproduct})
        })
        setItem({...itemshop,byproduct_choice:list_byproduct})
    }

    const setenableby=(e,variation,item)=>{
        const byproduct=item.variations.map(varia=>{
            if(varia.variation_id==variation.variation_id){
                return({...varia,enable:!varia.enable})
            }
            else{
                return({...varia})
            }
        })
        item.variations=byproduct
        updatebyproduct(item)
    }

  
    function setshowfalseproduct(keys){
        const byproduct=itemshop.byproduct_choice.map(item=>{
            return({...item,[keys]:false,variations:item.variations.map(variation=>{
                return({...variation,[keys]:false})
            })})
        })
        setItem({...itemshop,byproduct_choice:byproduct})
    }

    const setlimit=(e,itemchoice,name,keys,value)=>{
        if(name=='item' || name=='variation'){
                const byproduct=itemshop.byproduct_choice.map(item=>{
                if(name=='item'){
                    if(item.id==itemchoice.id){
                        if(keys=='limit'){
                            return({...item,[keys]:value,show:false})
                        }
                        return({...item,[keys]:value})
                    }
                    return({...item})
                }
                else{
                    return({...item,variations:item.variations.map(variation=>{
                        if(variation.variation_id==itemchoice.variation_id){
                            if(keys=='limit'){
                                return({...variation,[keys]:value,show:false})
                            }
                            return({...variation,[keys]:value})
                        }
                        
                        return({...variation})
                        
                    })})
                }
            })
            setItem({...itemshop,byproduct_choice:byproduct})
            
        }
        else{
            if(name=='allitem'){
                setLimititem({...limititem,[keys]:value})
                if(keys=='limit'){
                    setLimititem({...limititem,[keys]:value,show:false})
                }
            }
            else{
                setLimitvariation({...limitvariation,[keys]:value})
                if(keys=='limit'){
                    setLimitvariation({...limitvariation,[keys]:value,show:false})
                }
            }
           
        }
        
    }

    const setvariation=(e,keys)=>{
        let item=parseInt(e.target.value)
        if(!isNaN(parseInt(e.target.value)) && e.target.value.trim()!=''){
            setLimitvariation({...limitvariation,[keys]:item})
        }
        else{
            setLimitvariation({...limitvariation,[keys]:''})
        }
    }
    
    
    function updatebyproduct(item){
        const list_item=itemshop.byproduct_choice.map(items=>{
            if(item.id==items.id){
                return({...item})
            }
            else{
                return({...items})
            }
        })
        setItem({...itemshop,byproduct_choice:list_item})
        
    }
    console.log(itemshop.items)
    const complete=()=>{
        const list_product=list_enable_on.map(item=>{
            return(item.id)
        })
        
        const discount_model_list=list_enable_on.reduce((arr,obj,i)=>{
            const datavariation= obj.variations.map(variation=>{
                return({promotion_price:variation.promotion_price,id:variation.id,
                    enable:variation.enable,promotion_price_after_tax:variation.promotion_price,
                    variation_id:variation.variation_id,item_id:variation.item_id,
                    promotion_stock:variation.promotion_stock?variation.promotion_stock:0,
                    user_item_limit:obj.user_item_limit?obj.user_item_limit:0})
            })
            return [...arr,...datavariation]
        },[])
        const dataprogram={valid_from:program.valid_from,valid_to:program.valid_to,name_program:program.name_program}
        const data={...dataprogram,action:'submit',list_items:list_product,discount_model_list:discount_model_list}
        
        const countDown = setInterval(() => {
            state.timeSecond--;
            setState({...state,complete:true})
            if (state.timeSecond <= 0) {
                clearInterval(countDown)
                setState({...state,complete:false})
            }
        }, 1000);

        axios.post(url_program,JSON.stringify(data),headers)
        .then(res=>{
        })
    }

    return(
        <>
            <div id="app">
            <Navbar/>
            <div data-v-39395675="" className="wrapper">
                <div className="wrapper-content">
                    <div className="bundle-info-container">
                        <h2 className=" p-2">New progrram</h2>
                        <div className="bundle-info card">
                            <h4>info basic</h4>
                            <div className="basic-info-wrapper">
                                <div className="">   
                                    <div className="item-base-line mb-1">
                                        <label for="" className="form-item__label">
                                            Name program
                                        </label>
                                        <div className="item-col">
                                            <div className="input-inner" style={{width: '450px'}}> 
                                                <input type="text" value={program.name_program} onChange={(e)=>setform(e)} className="form-select" name="name_program" placeholder="Enter" style={{width: '450px'}} required/>
                                                <div className="input__suffix">
                                                </div>
                                            </div>
                                            <div className="info_more">Program name not visible to buyers</div>
                                        </div>
                                    </div>
                                    <div className="item-base-line mb-1">
                                        <label for="" className="form-item__label">Time to save discount code</label>
                                        <div className="flex-col">
                                            <Timeoffer
                                            date={date}
                                            onChange={(page)=>onChange(page)}
                                            setdatevalid={(index)=>setdatevalid(index)}
                                            settimechoice={(value,index,name)=>settimechoice(value,index,name)}
                                            setindexchoice={list_date=>setindexchoice(list_date)}
                                            />
                                            <div className="info_more">
                                                <p>The time of the program is too 180 days</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>  
                            </div>
                        </div>
                    </div>
                    <div className="main_info">
                        {itemshop.byproduct_choice.length==0?<>
                        <h2 className="card-title">Products of program Promotion</h2>
                        <div className="tips">Please add products to the Promotion program.</div>
                        <div className="add-item">
                            <button onClick={(e)=>addbyproduct(e)} className="button--primary btn-m add-product item-center">
                                <i className="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8.48176704,1.5 C8.75790942,1.5 8.98176704,1.72385763 8.98176704,2 L8.981,7.997 L15,7.99797574 C15.2761424,7.99797574 15.5,8.22183336 15.5,8.49797574 C15.5,8.77411811 15.2761424,8.99797574 15,8.99797574 L8.981,8.997 L8.98176704,15 C8.98176704,15.2761424 8.75790942,15.5 8.48176704,15.5 C8.20562467,15.5 7.98176704,15.2761424 7.98176704,15 L7.981,8.997 L2,8.99797574 C1.72385763,8.99797574 1.5,8.77411811 1.5,8.49797574 C1.5,8.22183336 1.72385763,7.99797574 2,7.99797574 L7.981,7.997 L7.98176704,2 C7.98176704,1.72385763 8.20562467,1.5 8.48176704,1.5 Z"></path></svg></i>
                                <span className="ml-1_2">Add product</span>  
                            </button>
                        </div></>:<>
                        <div className="item-spaces">
                            <div>
                                <h3 className="mb-3">Promotional products</h3>
                            </div>
                            <div className="item-center  mb-4">
                                <button onClick={(e)=>addbyproduct(e)} className="button--primary btn-m add-product item-center">
                                    <i className="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8.48176704,1.5 C8.75790942,1.5 8.98176704,1.72385763 8.98176704,2 L8.981,7.997 L15,7.99797574 C15.2761424,7.99797574 15.5,8.22183336 15.5,8.49797574 C15.5,8.77411811 15.2761424,8.99797574 15,8.99797574 L8.981,8.997 L8.98176704,15 C8.98176704,15.2761424 8.75790942,15.5 8.48176704,15.5 C8.20562467,15.5 7.98176704,15.2761424 7.98176704,15 L7.981,8.997 L2,8.99797574 C1.72385763,8.99797574 1.5,8.77411811 1.5,8.49797574 C1.5,8.22183336 1.72385763,7.99797574 2,7.99797574 L7.981,7.997 L7.98176704,2 C7.98176704,1.72385763 8.20562467,1.5 8.48176704,1.5 Z"></path></svg></i>
                                    <span className="ml-1_2">Add product</span>  
                                </button>
                            </div>
                        </div>
                        <div className=" list-filter-hints">Total of 
                            <em place="count"> </em> products
                        </div>
                        <div className="item-spaces setting-item">
                            <div className="batch-setting-panels">
                                <div className="titles" style={{width: '160px'}}>Setting all</div>
                                <div className="subtitle">Selected <strong>{itemshop.byproduct_choice.filter(item=>item.check).length}</strong> products</div>
                            </div>
                            <div className="item-center">
                                <div className="batch-setting-panels batch-form discount-box mx-2">
                                    <div className="mb-1">Offer</div>
                                    <div className="sub-edit-model" error-message="Invalid Promotion Information"> 
                                        <div className="input-inner"> 
                                            <input onChange={(e)=>setvariation(e,'percent_discount')} value={limitvariation.percent_discount} type="text" placeholder=" " resize="vertical" rows="2" minrows="2"  max="Infinity" min="-Infinity" className="form-select all_discount"/>
                                            <div className="input__suffix">
                                                <span className="input__suffix-split"></span>
                                                %Reduce
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>  
                            <div className="promotion-box">
                                <div className="mb-1">Number of promotional products</div>
                                <div className="item-promotion-stock d-flex discount-group-input">
                                    <Limit
                                        item={limitvariation}
                                        name="allvariation"
                                        keys={'promotion_stock'}
                                        setlimit={(e,itemchoice,name,keys,value)=>setlimit(e,itemchoice,name,keys,value)}
                                    />
                                </div>
                            </div>
                            <div className="limit-box-purchase">
                                <div className="mb-1">Maximum purchase limit per customer</div>
                                <div className="item-promotion-stock d-flex discount-group-input">
                                    <Limit
                                        item={limititem}
                                        name="allitem"
                                        keys={'user_item_limit'}
                                        setlimit={(e,itemchoice,name,keys,value)=>setlimit(e,itemchoice,name,keys,value)}
                                    />
                                </div>
                            </div>
                            <div className="item-center">
                                <button onClick={(e)=>itemshop.byproduct_choice.some(item=>item.check)?updatechoice(e):updateall(e)} className={`btn-m ml-1 ${limitvariation.percent_discount!=''?"":'disable'} btn-light`}>{itemshop.byproduct_choice.some(item=>item.check)?'Choice update':'Update all'}</button>
                                <button onClick={()=>setdeletechoice('byproduct',itemshop.byproduct,'byproduct_choice',itemshop.byproduct_choice,currentPage.byproduct)} className={`btn-m ml-1 ${itemshop.byproduct_choice.some(item=>item.check)?"":'disable'} btn-light`}>Delete</button>
                            </div>
                        </div>
                        <div className="table edit-table addon-table edit-mode">
                            <div className="fixed-container">
                                <div className="discount-items-table edit-mode">
                                    
                                    <label className={`checkbox item-selector ${byproductPage.some(ite=>ite.check)&&!byproductPage.every(ite=>ite.check)?'indeterminate':''}`}>
                                        <input 
                                            onChange={(e)=>setcheckall(e,byproductPage,'byproduct_choice',itemshop.byproduct_choice)} 
                                            checked={byproductPage.every(ite=>ite.check)?true:false} 
                                            type="checkbox" className="checkbox__input"/> 
                                        <span className="checkbox__indicator">
                                            <i className="icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">{byproductPage.some(ite=>ite.check)&&!byproductPage.every(ite=>ite.check)?<path fillRule="evenodd" d="M3.75,7 L12.25,7 C12.6642136,7 13,7.33578644 13,7.75 C13,8.16421356 12.6642136,8.5 12.25,8.5 L3.75,8.5 C3.33578644,8.5 3,8.16421356 3,7.75 C3,7.33578644 3.33578644,7 3.75,7 Z"></path>:<path d="M4.03033009,7.46966991 C3.73743687,7.1767767 3.26256313,7.1767767 2.96966991,7.46966991 C2.6767767,7.76256313 2.6767767,8.23743687 2.96966991,8.53033009 L6.32804531,11.8887055 C6.62093853,12.1815987 7.09581226,12.1815987 7.38870548,11.8887055 L13.2506629,6.02674809 C13.5435561,5.73385487 13.5435561,5.25898114 13.2506629,4.96608792 C12.9577697,4.6731947 12.4828959,4.6731947 12.1900027,4.96608792 L6.8583754,10.2977152 L4.03033009,7.46966991 Z"></path>}</svg>
                                            </i>
                                        </span>
                                    </label>
                                    
                                    <div className="item-product-name">Product</div>
                                    <div className="original-price">
                                        Price origin
                                    </div>
                                    <div className="item-discounted-price">
                                        price after reduction
                                    </div>
                                    <div data-v-2b0f041c="" data-v-dff31658="" className="item-relationship">Or</div>
                                    <div className="item-discounts">Discount</div>
                                    <div className="item-stock d-flex" >
                                        Inventory
                                        <div className="item-label-icon">
                                            <div className="popover__ref">
                                                <i className="icon table__cell-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8,1 C11.8659932,1 15,4.13400675 15,8 C15,11.8659932 11.8659932,15 8,15 C4.13400675,15 1,11.8659932 1,8 C1,4.13400675 4.13400675,1 8,1 Z M8,2 C4.6862915,2 2,4.6862915 2,8 C2,11.3137085 4.6862915,14 8,14 C11.3137085,14 14,11.3137085 14,8 C14,4.6862915 11.3137085,2 8,2 Z M7.98750749,10.2375075 C8.40172105,10.2375075 8.73750749,10.5732939 8.73750749,10.9875075 C8.73750749,11.401721 8.40172105,11.7375075 7.98750749,11.7375075 C7.57329392,11.7375075 7.23750749,11.401721 7.23750749,10.9875075 C7.23750749,10.5732939 7.57329392,10.2375075 7.98750749,10.2375075 Z M8.11700238,4.60513307 C9.97011776,4.60513307 10.7745841,6.50497267 9.94298079,7.72186504 C9.76926425,7.97606597 9.56587088,8.14546785 9.27050506,8.31454843 L9.11486938,8.39945305 L8.95824852,8.47993747 C8.56296349,8.68261431 8.49390831,8.75808648 8.49390831,9.0209925 C8.49390831,9.29713488 8.27005069,9.5209925 7.99390831,9.5209925 C7.71776594,9.5209925 7.49390831,9.29713488 7.49390831,9.0209925 C7.49390831,8.34166619 7.7650409,7.99681515 8.35913594,7.6662627 L8.76655168,7.45066498 C8.9424056,7.3502536 9.04307851,7.26633638 9.11735517,7.1576467 C9.52116165,6.56675314 9.11397414,5.60513307 8.11700238,5.60513307 C7.41791504,5.60513307 6.82814953,6.01272878 6.75715965,6.55275918 L6.75,6.66244953 L6.74194433,6.75232516 C6.69960837,6.98557437 6.49545989,7.16244953 6.25,7.16244953 C5.97385763,7.16244953 5.75,6.9385919 5.75,6.66244953 C5.75,5.44256682 6.87194406,4.60513307 8.11700238,4.60513307 Z"></path></svg></i>
                                            </div>
                                            <div className="information_more">Total products available</div>
                                        </div>
                                    </div>
                                    <div className="item-promotion-stock">
                                        Qty of promotional products
                                        <div className="item-label-icon">
                                            <div className="popover__ref">
                                                <i className="icon table__cell-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8,1 C11.8659932,1 15,4.13400675 15,8 C15,11.8659932 11.8659932,15 8,15 C4.13400675,15 1,11.8659932 1,8 C1,4.13400675 4.13400675,1 8,1 Z M8,2 C4.6862915,2 2,4.6862915 2,8 C2,11.3137085 4.6862915,14 8,14 C11.3137085,14 14,11.3137085 14,8 C14,4.6862915 11.3137085,2 8,2 Z M7.98750749,10.2375075 C8.40172105,10.2375075 8.73750749,10.5732939 8.73750749,10.9875075 C8.73750749,11.401721 8.40172105,11.7375075 7.98750749,11.7375075 C7.57329392,11.7375075 7.23750749,11.401721 7.23750749,10.9875075 C7.23750749,10.5732939 7.57329392,10.2375075 7.98750749,10.2375075 Z M8.11700238,4.60513307 C9.97011776,4.60513307 10.7745841,6.50497267 9.94298079,7.72186504 C9.76926425,7.97606597 9.56587088,8.14546785 9.27050506,8.31454843 L9.11486938,8.39945305 L8.95824852,8.47993747 C8.56296349,8.68261431 8.49390831,8.75808648 8.49390831,9.0209925 C8.49390831,9.29713488 8.27005069,9.5209925 7.99390831,9.5209925 C7.71776594,9.5209925 7.49390831,9.29713488 7.49390831,9.0209925 C7.49390831,8.34166619 7.7650409,7.99681515 8.35913594,7.6662627 L8.76655168,7.45066498 C8.9424056,7.3502536 9.04307851,7.26633638 9.11735517,7.1576467 C9.52116165,6.56675314 9.11397414,5.60513307 8.11700238,5.60513307 C7.41791504,5.60513307 6.82814953,6.01272878 6.75715965,6.55275918 L6.75,6.66244953 L6.74194433,6.75232516 C6.69960837,6.98557437 6.49545989,7.16244953 6.25,7.16244953 C5.97385763,7.16244953 5.75,6.9385919 5.75,6.66244953 C5.75,5.44256682 6.87194406,4.60513307 8.11700238,4.60513307 Z"></path></svg></i>
                                            </div>
                                            <div className="information_more">
                                                Number of products exclusive to the Promotion.
                                                To ensure enough product is available for the program, this quantity will be deducted from the total quantity of the product until the program ends. If the number of promotional products is set to "Unlimited", all products will be sold at the promotional price for the duration of the promotion.
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item-purchase-limit" >
                                        limit order
                                        <div className="item-label-icon">
                                            <div className="popover__ref">
                                                <i className="icon table__cell-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8,1 C11.8659932,1 15,4.13400675 15,8 C15,11.8659932 11.8659932,15 8,15 C4.13400675,15 1,11.8659932 1,8 C1,4.13400675 4.13400675,1 8,1 Z M8,2 C4.6862915,2 2,4.6862915 2,8 C2,11.3137085 4.6862915,14 8,14 C11.3137085,14 14,11.3137085 14,8 C14,4.6862915 11.3137085,2 8,2 Z M7.98750749,10.2375075 C8.40172105,10.2375075 8.73750749,10.5732939 8.73750749,10.9875075 C8.73750749,11.401721 8.40172105,11.7375075 7.98750749,11.7375075 C7.57329392,11.7375075 7.23750749,11.401721 7.23750749,10.9875075 C7.23750749,10.5732939 7.57329392,10.2375075 7.98750749,10.2375075 Z M8.11700238,4.60513307 C9.97011776,4.60513307 10.7745841,6.50497267 9.94298079,7.72186504 C9.76926425,7.97606597 9.56587088,8.14546785 9.27050506,8.31454843 L9.11486938,8.39945305 L8.95824852,8.47993747 C8.56296349,8.68261431 8.49390831,8.75808648 8.49390831,9.0209925 C8.49390831,9.29713488 8.27005069,9.5209925 7.99390831,9.5209925 C7.71776594,9.5209925 7.49390831,9.29713488 7.49390831,9.0209925 C7.49390831,8.34166619 7.7650409,7.99681515 8.35913594,7.6662627 L8.76655168,7.45066498 C8.9424056,7.3502536 9.04307851,7.26633638 9.11735517,7.1576467 C9.52116165,6.56675314 9.11397414,5.60513307 8.11700238,5.60513307 C7.41791504,5.60513307 6.82814953,6.01272878 6.75715965,6.55275918 L6.75,6.66244953 L6.74194433,6.75232516 C6.69960837,6.98557437 6.49545989,7.16244953 6.25,7.16244953 C5.97385763,7.16244953 5.75,6.9385919 5.75,6.66244953 C5.75,5.44256682 6.87194406,4.60513307 8.11700238,4.60513307 Z"></path></svg></i>
                                            </div>
                                            <div className="information_more">The maximum number of products Buyers can buy in the Sale</div>
                                        </div>
                                    </div>
                                    <div className="item-enable-disable">Turn on/off</div>
                                    <div className="item-action">Action</div>    
                                </div>
                            </div>
                            <div className="table-body">
                                {byproductPage.map(item=>
                                    <div key={item.id} className="discount-item-component edit-mode">
                                        <div className="discount-item-header">
                                            <div className="left">
                                                <div className="d-flex">
                                                    
                                                        <label className="checkbox item-selector">
                                                            <input type="checkbox" checked={item.check?true:false} onChange={(e)=>setcheckitem(item,itemshop.byproduct_choice,'byproduct_choice')} className="checkbox__input" value=""/> 
                                                            <span className="checkbox__indicator">
                                                                <i className="icon">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M4.03033009,7.46966991 C3.73743687,7.1767767 3.26256313,7.1767767 2.96966991,7.46966991 C2.6767767,7.76256313 2.6767767,8.23743687 2.96966991,8.53033009 L6.32804531,11.8887055 C6.62093853,12.1815987 7.09581226,12.1815987 7.38870548,11.8887055 L13.2506629,6.02674809 C13.5435561,5.73385487 13.5435561,5.25898114 13.2506629,4.96608792 C12.9577697,4.6731947 12.4828959,4.6731947 12.1900027,4.96608792 L6.8583754,10.2977152 L4.03033009,7.46966991 Z"></path></svg>
                                                                </i> 
                                                            </span> 
                                                        </label>
                                                    
                                                    <div className="item-centers">                               
                                                        <img src={item.image} alt="" width="36px" height="36px"/>                                
                                                        <div className="item_detail">
                                                            <div className="ellipsis-content">{item.name}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="right">
                                                <div className="d-flex">
                                                    <div className="item-purchase-limit plus-disable-enable d-flex ">
                                                        <Limit
                                                            item={item}
                                                            name="item"
                                                            keys={'user_item_limit'}
                                                            setlimit={(e,itemchoice,name,keys,value)=>setlimit(e,itemchoice,name,keys,value)}
                                                        />
                                                    </div>    
                                                    <div className="item-action">
                                                        
                                                            <button onClick={()=>removeitem(item,'byproduct',itemshop.byproduct,'byproduct_choice',itemshop.byproduct_choice,currentPage.byproduct)} type="button" className=" button btn-light button--circle">
                                                                <i className="icon trash-item" >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M2,4 C1.72385763,4 1.5,3.77614237 1.5,3.5 C1.5,3.22385763 1.72385763,3 2,3 L6,2.999 L6,2 C6,1.44771525 6.44771525,1 7,1 L10,1 C10.5522847,1 11,1.44771525 11,2 L11,2.999 L15,3 C15.2761424,3 15.5,3.22385763 15.5,3.5 C15.5,3.77614237 15.2761424,4 15,4 L14,4 L14,14 C14,14.5522847 13.5522847,15 13,15 L4,15 C3.44771525,15 3,14.5522847 3,14 L3,4 L2,4 Z M13,4 L4,4 L4,14 L13,14 L13,4 Z M6.5,7 C6.77614237,7 7,7.22385763 7,7.5 L7,11.5 C7,11.7761424 6.77614237,12 6.5,12 C6.22385763,12 6,11.7761424 6,11.5 L6,7.5 C6,7.22385763 6.22385763,7 6.5,7 Z M8.5,6 C8.77614237,6 9,6.22385763 9,6.5 L9,11.5 C9,11.7761424 8.77614237,12 8.5,12 C8.22385763,12 8,11.7761424 8,11.5 L8,6.5 C8,6.22385763 8.22385763,6 8.5,6 Z M10.5,7 C10.7761424,7 11,7.22385763 11,7.5 L11,11.5 C11,11.7761424 10.7761424,12 10.5,12 C10.2238576,12 10,11.7761424 10,11.5 L10,7.5 C10,7.22385763 10.2238576,7 10.5,7 Z M10,2 L7,2 L7,2.999 L10,2.999 L10,2 Z"></path></svg>
                                                                </i>
                                                            </button>
                                                       
                                                    </div>
                                                </div>
                                            </div>
                                            
                                        </div>
                                        <div className="discount-edit-item-model-list">
                                            {item.variations.map(variation=>
                                            <div key={variation.variation_id} className="discount-edit-item-model-component">
                                                <div className="item-variation" >{itemvariation(variation)}</div>
                                                <div className="item-price">₫{formatter.format(variation.price)}</div>
                                                <form autocomplete="off" className="form--inline form--label-right header-column_edit">
                                                    <div className="price-discount form-item">
                                                        <label for="discount" className="form-item__label empty">
                                                        </label> 
                                                        <div className="form-item__control">
                                                            <div className="form-item__content">
                                                                <div className="price-discount-input d-flex">
                                                                    <div className={`input currency-input ${variation.enable?'':'disable'}`} size="normal" prefix-label="₫" error-message="Giá không hợp lệ" placeholder=" " error="true">
                                                                        <div className={`input__inner ${variation.error?'error':''} input__inner--normal`}>
                                                                        <div className="input__prefix">₫<span className="input__prefix-split"></span></div> 
                                                                            <input onChange={(e)=>setdiscount(e,'promotion_price',variation,item)} value={variation.promotion_price} type="text" placeholder=" " size="normal" resize="vertical" rows="2" minrows="2" maxLength="13" restrictiontype="value" max="Infinity" min="-Infinity" className="input__input"/> 
                                                                        </div>
                                                                        {variation.error?
                                                                        <p className="input__error-msg">Giá không hợp lệ</p>:''}
                                                                    </div> 
                                                                    <span className="split">or</span> 
                                                                    <div className={`input currency-input ${variation.enable?'':'disable'}`} size="normal" placeholder=" ">
                                                                        <div className="input__inner input__inner--normal">
                                                                            <input type="text" onChange={(e)=>setdiscount(e,'percent_discount',variation,item)} value={variation.percent_discount>0?('0'+variation.percent_discount).slice(-2):'0'} placeholder=" " size="normal" resize="vertical" rows="2" minrows="2" restrictiontype="value" max="Infinity" min="-Infinity" className="input__input"/> 
                                                                            <div className="input__suffix"><span className="input__suffix-split"></span>%GIẢM</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                    
                                                            </div> 
                                                            {variation.percent_discount>69?
                                                            <div className="threshold-notice rule-tips">
                                                                <span className="low-discount-percentage-tips">
                                                                    <span>Mức khuyến mãi đang lớn hơn 69% giá hiện tại</span>
                                                                </span>
                                                            </div>:
                                                                    ""}
                                                        </div>
                                                    </div> 
                                                </form>
                                                <div className="item-stock"> 
                                                    {variation.inventory}
                                                </div>
                                                <div data-v-4bd6b952="" className={`item-content item-promotion-stock ${variation.enable?'':'disable'}`}>
                                                    <div  data-v-0d5f8626="" data-v-4bd6b952="" className="popover popover--light limit-group-comp">
                                                        <Limit
                                                            item={variation}
                                                            name="variation"
                                                            keys={'promotion_stock'}
                                                            setlimit={(e,itemchoice,name,keys,value)=>setlimit(e,itemchoice,name,keys,value)}
                                                        />
                                                        <div className="popper popover__popper popover__popper--light with-arrow" style={{display: 'none', maxWidth: '320px'}}>
                                                            <div className="popover__content">Số lượng sản phẩm khuyến mãi không thể điều chỉnh sau khi cài đặt chương trình. Nếu muốn điều chỉnh, vui lòng xóa sản phẩm khỏi chương trình và thêm vào lại.</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div  className="item-content item-purchase-limit"></div>
                                                <div className="item-enable-disable">
                                                    <input onChange={(e)=>setenableby(e,variation,item)} checked={variation.enable?true:false} type="checkbox" className="switch_1"/>
                                                </div>
                                                <div className="item-content item-action"></div>   
                                            </div>
                                            )}
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
                                        currentPage={currentPage.byproduct}
                                        totalCount={Math.ceil(itemshop.byproduct_choice.length / Pagesize)}
                                        Pagesize={Pagesize}
                                        onPageChange={(page,name)=>handlePageChange(page,'byproduct')}
                                    />
                                </div>
                                <div className="pagination-jumperpagination__part">
                                    <span className="pagination-jumper__label">Go to page</span>
                                    <div className="pagination-jumper__input">
                                        <div className="number-input  number-input--no-suffix">
                                            <input onChange={(e)=>setState({...state,page_input:parseInt(e.target.value)})} type="text" value={state.page_input}  className="input_input"/>
                                        </div>
                                        <button onClick={()=>setpage(itemshop.byproduct_choice)} type="button" className="button btn-m btn-light "><span>Go</span></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </>} 
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
                <Productoffer
                    showmain={show.items}
                    showbyproduct={show.byproduct}
                    loading={loading}
                    items={itemshop.items}
                    sec={state.timeSecond}
                    text={program}
                    complete={state.complete}
                    items_choice={itemshop.items_choice}
                    byproduct={itemshop.byproduct}
                    byproduct_choice={itemshop.byproduct_choice}
                    setcheckitem={(item,product,keys)=>setcheckitem(item,product,keys)}
                    setcheckall={(e,items,keys,value)=>setcheckall(e,items,keys,value)}
                    setshow={(sho,name)=>setshow(sho,name)}
                    submitby={()=>submitby()}
                />
            </div>  
        </>
    )
}
export default Programinfo