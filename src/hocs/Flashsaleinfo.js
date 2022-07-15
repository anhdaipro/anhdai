import axios from 'axios';
import Navbar from "../seller/Navbar"
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Productoffer from "../seller/Productoffer"
import React, {useState,useEffect,useCallback,useRef} from 'react'
import {localhost,formatter,itemvariation} from "../constants"

import { headers } from '../actions/auth';
const Pagesize=10

const Flashsaleinfo=({url_flashsale,item_flashsale,flashsale_shop,loading_content})=>{
    const [flashsale,setFlashsale]=useState({time:null,hour:null,minutes:null,minutes_to:null,
        hour_to:null
    })
    const dragbtn=useRef()
    const [currentPage, setCurrentPage] = useState({items:1,byproduct:1});
    const [state,setState]=useState({percent_discount:'',timeSecond:5,complete:false,page_input:1,show:false,time_choice:[
        {name:'00:00:00 - 00:30:00',hour:0,minutes:0,hour_to:0,minutes_to:30},
        {name:'00:30:00 - 01:00:00',hour:0,minutes:30,hour_to:1,minutes_to:0},
        {name:'01:00:00 - 06:00:00',hour:1,minutes:0,hour_to:6,minutes_to:0},
        {name:'06:00:00 - 09:00:00',hour:6,minutes:0,hour_to:9,minutes_to:0},
        {name:'09:00:00 - 12:00:00',hour:9,minutes:0,hour_to:12,minutes_to:0},
        {name:'12:00:00 - 13:00:00',hour:12,minutes:0,hour_to:13,minutes_to:0},
        {name:'13:00:00 - 15:00:00',hour:13,minutes:0,hour_to:15,minutes_to:0},
        {name:'15:00:00 - 18:00:00',hour:15,minutes:0,hour_to:18,minutes_to:0},
        {name:'18:00:00 - 21:00:00',hour:18,minutes:0,hour_to:21,minutes_to:0},
        {name:'21:00:00 - 22:00:00',hour:21,minutes:0,hour_to:22,minutes_to:0},
        {name:'22:00:00 - 00:00:00',hour:22,minutes:0,hour_to:24,minutes_to:0}]})
    const [date,setDate]=useState({time:new Date(),hour:new Date().getHours(),minutes:new Date().getMinutes(),
       hour_to:new Date().getHours(),minutes_to:new Date().getMinutes(),
    })
    const [show,setShow]=useState({items:false,byproduct:false})
    const [itemshop,setItem]=useState({items:[],page_count_main:0,items_choice:[],savemain:false
    ,page_count_by:0,byproduct:[],byproduct_choice:[],savebyproduct:false})
    const [loading,setLoading]=useState(false)
    const [showtime,setShowtime]=useState(false)
    useEffect(() => {
        setFlashsale(flashsale_shop)
        setLoading(loading_content)
        setItem(item_flashsale)
      }, [loading_content,item_flashsale,flashsale_shop]);

    const firstpagebyproductIndex=(currentPage.byproduct - 1) * Pagesize;
    const lastPagebyproductIndex = firstpagebyproductIndex + Pagesize;
    const byproductPage=itemshop.byproduct_choice.slice(firstpagebyproductIndex, lastPagebyproductIndex);
    const onChange = (datechoice) => {
        setDate({time:datechoice});
    };
    
    const handlePageChange=useCallback((page,name)=>{
        setCurrentPage({...currentPage,[name]:page})
    },[currentPage])

    const removeitem=(itemmove,keys,value,keys_choice,value_choice,page_current)=>{
        const list_itemchoice=value_choice.filter(item=>item.item_id!=itemmove.item_id)
        const list_item=value.map(ite=>{
            if(ite.item_id==itemmove.item_id){
                return({...ite,check:false})
            }
            else{
                return({...ite})
            }
        })
        setItem({...itemshop,[keys]:list_item,[keys_choice]:list_itemchoice})
        let page=page_current
        if(page>=Math.ceil(list_itemchoice.length / Pagesize)){
            page=Math.ceil(list_itemchoice.length / Pagesize)
        }
        setCurrentPage({...currentPage,[keys]:page})
        handlePageChange(page,keys)
    }

    const setdeletechoice=(keys,value,keys_choice,value_choice,page_current)=>{
        const list_itemchoice=value_choice.filter(item=>!item.check)
        const list_item=value.map(item=>{
            if(list_itemchoice.every(items=>items.item_id!=item.item_id)){
                return({...item,check:false})
            }
            return({...item})
        })
        setItem({...itemshop,[keys_choice]:list_itemchoice,[keys]:list_item})
        let page=page_current
        if(page>=Math.ceil(list_itemchoice.length / Pagesize)){
            page=Math.ceil(list_itemchoice.length / Pagesize)
            
        }
        
        setCurrentPage({...currentPage,[keys]:page})
        handlePageChange(page,keys)
    }
    
     const addbyproduct=(e)=>{
        if(itemshop.items.length==0){
            let url= new URL(url_flashsale)
            let search_params=url.searchParams
            search_params.set('item','item')
            url.search = search_params.toString();
            let new_url = url.toString();
            axios.get(new_url,headers)
            .then(res=>{
                let list_byproduct=res.data.c.filter(item=>itemshop.items_choice.every(itemchoice=>item.item_id!=itemchoice.item_id))
                for(let i in list_byproduct){
                    for(let j in itemshop.byproduct_choice){
                        if(list_byproduct[i].item_id==itemshop.byproduct_choice[j].item_id){
                            list_byproduct[i].check=true
                            
                        }
                       else{
                        list_byproduct[i].check=true
                       }
                    }
                }
                const list_items=res.data.c
                for(let i in list_items){
                    for(let j in itemshop.items_choice){
                        if(list_items[i].item_id==itemshop.items_choice[j].item_id){
                            list_items[i].check=true
                        }
                       else{
                            list_items[i].check=false
                       }
                        
                    }
                }
                setShow({...show,byproduct:true,items:false})
                setItem({...itemshop,items:list_items,page_count_main:Math.ceil(list_items.length / Pagesize),byproduct:list_byproduct,page_count_by:Math.ceil(list_byproduct.length / Pagesize)})  
            })
        }
        else{
        setShow({...show,byproduct:true,items:false})
        const byproduct=itemshop.items.filter(item=>itemshop.items_choice.every(itemchoice=>item.item_id!=itemchoice.item_id))
        setItem({...itemshop,byproduct:byproduct,page_count_by:Math.ceil(byproduct.length / Pagesize)})  
        }
    }

    const setcheckitem=useCallback((item,product,keys)=>{
        const list_item=product.map(ite=>{
            if(item.item_id==ite.item_id){
                return({...ite,check:!ite.check})
            }
            else{
                return({...ite})
            }
        })
        setItem({...itemshop,[keys]:list_item})

    },[itemshop])

    const setcheckall=(e,list_items,keys,value)=>{
        for (let k in value){
            for(let i in list_items){
                    if(e.target.checked==true && list_items[i]==value[k] && keys!='byproduct_choice' && keys!='items_choice' && !itemshop.items_choice.some(ite=>ite.item_id==value[k].item_id)){
                        value[k].check=true
                    }
                    if(e.target.checked==false && list_items[i]==value[k] && keys!='byproduct_choice' && keys!='items_choice' && !itemshop.items_choice.some(ite=>ite.item_id==value[k].item_id)){
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
        let form=new FormData()
        const list_itemscheck=itemshop.byproduct.filter(ite=>ite.check && !itemshop.byproduct_choice.some(item=>item.item_id==ite.item_id))
        list_itemscheck.map(item=>{
            form.append('item_id',item.item_id)
            }
        )
        axios.post(url_flashsale,form,headers)
        .then(res=>{
            const list_itemschoice=res.data.list_product.map(item=>{
                return({...item,check:false,limit_order:'',list_variation:item.list_variation.map(variation=>{
                    return({...variation,enable:false,percent_discount:0,discount_price:variation.price,limit_order:'',check:false})
                })})
            })
    
            itemshop.byproduct_choice=[...list_itemschoice,...itemshop.byproduct_choice]
            setItem({...itemshop,byproduct_choice:itemshop.byproduct_choice})
            setShow({...show,byproduct:false})
        })
        
    }

    const setdiscount=(e,name,variation,item)=>{
        let discount=parseInt(e.target.value)
        const byproduct=item.list_variation.map(varia=>{
            if(varia.product_id==variation.product_id){
                if(name=='discount_price'){
                    if(isNaN(discount)){
                        return({...varia,error:true,discount_price:'',percent_discount:100})
                    }
                    else{
                        if(discount==0||discount==variation.price){
                            return({...varia,error:true,discount_price:discount,percent_discount:Math.round((variation.price-discount)/variation.price*100)})
                        }
                        return({...varia,error:false,discount_price:discount,percent_discount:Math.round((variation.price-discount)/variation.price*100)})
                    }
                }
                else{
                    if(isNaN(discount)){
                        return({...varia,error:true,discount_price:variation.price,percent_discount:''})
                    }
                    if(discount<1||discount>100){
                        return({...varia,error:true,discount_price:variation.price*(1-discount/100),percent_discount:discount,percent_discount:0})
                    }
                    return({...varia,error:false,discount_price:variation.price*(1-discount/100),percent_discount:discount})
                }
            }
            else{
                return({...varia})
            }
        })
        item.list_variation=byproduct
        updatebyproduct(item)
    }
    
    const updateall=(e)=>{
        itemshop.byproduct_choice.map(item=>{
            item.list_variation.map(variation=>{
                variation.percent_discount=state.percent_discount
                variation.discount_price=variation.price*(1-state.percent_discount/100)
                variation.error=false
            })
        })
        setItem({...itemshop,byproduct_choice:itemshop.byproduct_choice})
    }

    const updatechoice=(e)=>{
        const list_product=itemshop.byproduct_choice.map(item=>{
            if(item.check){
                return({...item,limit_order:state.limit_order,list_variation:item.list_variation.map(variation=>{
                    return({...variation,percent_discount:state.percent_discount,discount_price:variation.price(1-state.percent_discount/100),limit_order:state.limit_order})
                })})
            }
            return({...item,list_variation:item.list_variation.map(variation=>{
                if(variation.check){
                    return({...variation,percent_discount:state.percent_discount,discount_price:variation.price(1-state.percent_discount/100),limit_order:state.limit_order})
                }
            })})
        })
        setItem({...itemshop,byproduct_choice:list_product})
    }

    const setenableby=(e,variation,item)=>{
        const byproduct=item.list_variation.map(varia=>{
            if(varia.product_id==variation.product_id){
                if(variation.percent_discount>0&& variation.percent_discount<100){
                    return({...varia,enable:!varia.enable,errow:false})
                }
                return({...varia,error:true})
            }
            else{
                return({...varia})
            }
        })
        item.list_variation=byproduct
        updatebyproduct(item)  
    }

    const setenabledbychoice=(e,value,keys_choice,value_choice)=>{
        for (let i in value_choice){
            if(value_choice[i].check){
                for(let j in value_choice[i].list_variation){
                    if(value_choice[i].list_variation[j].percent_discount>0){
                        value_choice[i].list_variation[j].enable=value
                        value_choice[i].list_variation[j].error=false
                    }
                    else{
                    value_choice[i].list_variation[j].error=true
                    }
                }
            }
        }
        
        setItem({...itemshop,[keys_choice]:value_choice})
    }

    function updatebyproduct(item){
        const list_item=itemshop.byproduct_choice.map(items=>{
            if(item.item_id==items.item_id){
                return({...item})
            }
            else{
                return({...items})
            }
        })
        setItem({...itemshop,byproduct_choice:list_item})
        
    }

    const setvariation=(e,keys)=>{
        e.stopPropagation()
        if(!isNaN(parseInt(e.target.value)) && e.target.value.trim()!=''){
            setState({...state,[keys]:parseInt(e.target.value)})
        }
        else{
            setState({...state,[keys]:''})
        }
    }
    
    const parentref=useRef()
    useEffect(() => {
        document.addEventListener('click', handleClick)
        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [])

    const handleClick = (event) => {
        const { target } = event
        if(parentref.current!=null){
            if (!parentref.current.contains(target)) {
                setShowtime(false)
            }
        }
    }
    
    const setframtime=(item)=>{
        setDate({...date,hour:item.hour,minutes:item.minutes,hour_to:item.hour_to,minutes_to:item.minutes_to})
    }
    const setcheckitemflashsale=(e,itemchoice)=>{
        e.stopPropagation()
        const list_product=itemshop.byproduct_choice.map(item=>{
            if(item.item_id==itemchoice.item_id){
                return({...item,check:!item.check,list_variation:item.list_variation.map(variation=>{
                    return({...variation,check:!item.check})
                })})
            }
            return({...item})
        })
        setItem({...itemshop,byproduct_choice:list_product})
    }
    const setcheckvariation=(e,variationchoice,itemchoice)=>{
        e.stopPropagation()
        const list_product=itemshop.byproduct_choice.map(item=>{
            if(item.item_id==itemchoice.item_id){
                return({...item,list_variation:item.list_variation.map(variation=>{
                    if(variation.product_id==variationchoice.product_id){
                        return({...variation,check:!variation.check})
                    }
                    return({...variation})
                })})
            }
            return({...item})
        })
        setItem({...itemshop,byproduct_choice:list_product})
    }
    const setcheckallitem=(e)=>{
        const list_product=itemshop.byproduct_choice.map(item=>{
            return({...item,check:e.target.checked,list_variation:item.list_variation.map(variation=>{
                return({...variation,check:e.target.checked})
            })})
        })
        setItem({...itemshop,byproduct_choice:list_product})
    }
    const settime=()=>{
       
        setFlashsale({...flashsale,time:date.time,hour:date.hour,minutes:date.minutes,hour_to:date.hour_to,minutes_to:date.minutes_to})
        setState({...state,show:false})
    }

    const selectchoice=()=>{
        let count=0
        itemshop.byproduct_choice.map(item=>{
            item.list_variation.map(variation=>{
                if(variation.check){
                    count+=1
                }
            })
        })
        return count
    }
    const setlimitorderitem=(e,item)=>{
        const list_item=itemshop.byproduct_choice.map(items=>{
            if(item.item_id==items.item_id){
                return({...item,limit_order:!isNaN(e.target.value)?e.target.value:''})
            }
            else{
                return({...item})
            }
        })
        setItem({...itemshop,byproduct_choice:list_item})
    }
    const list_enable_on=itemshop.byproduct_choice.filter(item=>item.list_variation.some(variation=>variation.enable))
    const complete=()=>{
        let form=new FormData()
        form.append('valid_from',`${date.time.toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).substr(0,10)} ${('0'+date.hour).slice(-2)}:${('0'+date.minutes).slice(-2)}`)
        form.append('valid_to',`${date.time.toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).substr(0,10)} ${('0'+date.hour_to).slice(-2)}:${('0'+date.minutes_to).slice(-2)}`)
        list_enable_on.map(item=>{
            form.append('item_id',item.item_id)
            form.append('quantity_limit_flash_sale',item.limit_order!=''?item.limit_order:item.item_inventory)
            item.list_variation.map(variation=>{
                form.append('product_id',variation.product_id)
                form.append('percent_discount',variation.enable?variation.percent_discount:0)
                form.append('number_of_promotional_flash_sale_products',variation.limit_order!=''?variation.limit_order:variation.inventory)
            })
        })

        const list_enable_off=itemshop.byproduct_choice.filter(item=>list_enable_on.every(items=>item.item_id!=items.item_id))
        list_enable_off.map(item=>{
            item.list_variation.map(variation=>{
                form.append('product_id_off',variation.product_id)
            })
        })
        const countDown = setInterval(() => {
            state.timeSecond--;
            setState({...state,complete:true})
            if (state.timeSecond <= 0) {
                clearInterval(countDown)
                setState({...state,complete:false})
            }
        }, 1000);
        axios.post(url_flashsale,form,headers)
        .then(res=>{
        })
    }
    function swap(arr, from, to) {
        arr.splice(from, 1, arr.splice(to, 1, arr[from])[0]);
      }
      
   
    
    
    return(
        <>
            <div id="app">
            <Navbar/>
            <div data-v-39395675="" className="wrapper">
                <div className="wrapper-content">
                    <div className="shop-flash-sale-detail-page">
                        <div data-v-4ad61259="" data-v-1503608e="" className="page-header">
                            <div data-v-4ad61259="" className="page-header-info">
                                <div data-v-4ad61259="" className="page-header-title">Tạo chương trình Flash Sale của Shop</div> 
                            </div> 
                        </div>
                        <div className="card-style">
                            <div data-v-dbcd34d4="" className="info-title">Thông tin cơ bản</div>
                            <div className="shop-flash-sale">
                                <div className="info-item">
                                    <div className="info-item-label info-middle-label">Time frame</div>
                                    <div className="flex-col">
                                        <div className="form-flash-sale">
                                            <div ref={parentref} className="rele">
                                                <div onClick={(e)=>setShowtime(!showtime)} className="time-slot-btn item-center" style={{width: '240px'}}>
                                                    <div className="selector__prefix"><i className="selector__prefix-icon icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M11.5156954,1 C11.7918378,1 12.0156954,1.22385763 12.0156954,1.5 L12.015,2 L14,2 C14.5522847,2 15,2.44771525 15,3 L15,14 C15,14.5522847 14.5522847,15 14,15 L2,15 C1.44771525,15 1,14.5522847 1,14 L1,3 C1,2.44771525 1.44771525,2 2,2 L3.991,2 L3.99143991,1.5 C3.99143991,1.22385763 4.21529754,1 4.49143991,1 C4.76758229,1 4.99143991,1.22385763 4.99143991,1.5 L4.991,2 L11.015,2 L11.0156954,1.5 C11.0156954,1.22385763 11.239553,1 11.5156954,1 Z M14,6 L2,6 L2,14 L14,14 L14,6 Z M5.5,11 C5.77614237,11 6,11.2238576 6,11.5 C6,11.7761424 5.77614237,12 5.5,12 L4.5,12 C4.22385763,12 4,11.7761424 4,11.5 C4,11.2238576 4.22385763,11 4.5,11 L5.5,11 Z M8.5,11 C8.77614237,11 9,11.2238576 9,11.5 C9,11.7761424 8.77614237,12 8.5,12 L7.5,12 C7.22385763,12 7,11.7761424 7,11.5 C7,11.2238576 7.22385763,11 7.5,11 L8.5,11 Z M11.5,11 C11.7761424,11 12,11.2238576 12,11.5 C12,11.7761424 11.7761424,12 11.5,12 L10.5,12 C10.2238576,12 10,11.7761424 10,11.5 C10,11.2238576 10.2238576,11 10.5,11 L11.5,11 Z M5.5,8 C5.77614237,8 6,8.22385763 6,8.5 C6,8.77614237 5.77614237,9 5.5,9 L4.5,9 C4.22385763,9 4,8.77614237 4,8.5 C4,8.22385763 4.22385763,8 4.5,8 L5.5,8 Z M8.5,8 C8.77614237,8 9,8.22385763 9,8.5 C9,8.77614237 8.77614237,9 8.5,9 L7.5,9 C7.22385763,9 7,8.77614237 7,8.5 C7,8.22385763 7.22385763,8 7.5,8 L8.5,8 Z M11.5,8 C11.7761424,8 12,8.22385763 12,8.5 C12,8.77614237 11.7761424,9 11.5,9 L10.5,9 C10.2238576,9 10,8.77614237 10,8.5 C10,8.22385763 10.2238576,8 10.5,8 L11.5,8 Z M3.991,3 L2,3 L2,5 L14,5 L14,3 L12.015,3 L12.0156954,3.5 C12.0156954,3.77614237 11.7918378,4 11.5156954,4 C11.239553,4 11.0156954,3.77614237 11.0156954,3.5 L11.015,3 L4.991,3 L4.99143991,3.5 C4.99143991,3.77614237 4.76758229,4 4.49143991,4 C4.21529754,4 3.99143991,3.77614237 3.99143991,3.5 L3.991,3 Z"></path></svg></i></div>
                                                    <div>{flashsale.hour!=undefined?`${("0"+flashsale.hour).slice(-2)}:${('0'+flashsale.minutes).slice(-2)} ${flashsale.time.toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).substr(0,10)} ~ ${('0'+flashsale.hour_to).slice(-2)}:${('0'+flashsale.minutes_to).slice(-2)}`:'Choose the time frame'}</div>
                                                </div>
                                                {show?
                                                <div className="date_pickers popper_content">
                                                    <div className="model-title">Choose the time frame of the Shop's Flash sale</div>
                                                    <div className="item-center title-content">
                                                        <div className="date_select-text">Date</div>
                                                        <div className="hour_select-text">Hour</div>
                                                    </div>
                                                    <div className="d-flex flash-sale-content px-1">
                                                        <div className="calendar-flash-sale sc border-right">
                                                            <Calendar
                                                            value={date.time}
                                                            onChange={(page)=>onChange(page)} 
                                                            tileDisabled={({date, view }) => (date<new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()) ||date>new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()+7) )}
                                                            />
                                                        </div>
                                                        <div className="time_range">
                                                            <div className="item-center">
                                                                <div className="frame_hour">frame hour</div>
                                                                <div className="frame_product">Product</div>
                                                            </div>
                                                            <div className="range_time_select d-flex-col">
                                                                {state.time_choice.map(item=>{
                                                                    if(new Date(`${date.time.toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).substr(0,10)} ${('0'+item.hour).slice(-2)}:${('0'+item.minutes).slice(-2)}`)>new Date()){
                                                                        return(
                                                                            <div className="item-center">
                                                                                <div onClick={()=>setframtime(item)} className="custom-radio">
                                                                                    <label className="check_input">
                                                                                        {item.name}
                                                                                        <input checked={item.hour==date.hour && item.minutes==date.minutes?true:false} type="radio" name="time-select" className="radio-input"/>
                                                                                        <span className="checkmark"></span>
                                                                                    </label>
                                                                                </div>
                                                                                <div>Số sản phẩm tham gia 10</div>
                                                                            </div>
                                                                        )
                                                                    }
                                                                })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="item-end p-1">
                                                        <button onClick={()=>settime()} className={`button-select ${date.hour!=undefined?'':'disable'} py-1_2`}>Comfirm</button>
                                                    </div>
                                                </div>:''}
                                            </div>    
                                        </div>
                                        <div className="info_more">
                                            <p>The end time of the program must be at least 1 hour after the start time</p>
                                            <p>Once the program has been created, the duration of the program can only be adjusted to shorten it.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="info-item">
                                    <div className="info-item-label">Tieu chí product</div>
                                    <div className="products-criteria-wrapper">
                                        <div className="tab-item active">
                                            <div data-v-4679d5c2="" data-v-261a253a="" className="ellipsis-text-wrapper">
                                                Tất cả
                                            </div>
                                        </div>
                                        <div>All Product Criteria</div>
                                        <div className="limits">
                                            <div className="limit-item-left">
                                                <div className="limit-item">
                                                    <div className="item-text">Số lượng khuyến mãi:1~1000</div>
                                                </div>
                                                <div className="limit-item">
                                                    <div className="item-text">Giá khuyến mãi: Giá sau khuyến mãi là giá thấp nhất trong 7 ngày qua (không tính giá chạy Flash Sale của Shopee)</div>
                                                </div>
                                                <div className="limit-item">
                                                    <div className="item-text">Lượt thích sản phẩm: Không giới hạn</div>
                                                </div>
                                                <div className="limit-item">
                                                    <div className="item-text">Số lượng ₫ơn hàng trong vòng 30 ngày qua: Không giới hạn</div>
                                                </div>
                                                <div className="limit-item">
                                                    <div className="item-text">Thời gian tham gia chương trình tiếp theo: &gt;= 1 ngày (Cùng một sản phẩm không thể ₫ăng ký Flash Sale trong 1 ngày liên tiếp)</div>
                                                </div>
                                            </div> 
                                            <div className="limit-item-left">
                                                <div className="limit-item">
                                                    <div className="item-text">Mức khuyến mãi: 5% ~ 90%</div>
                                                </div>
                                                <div className="limit-item">
                                                    <div className="item-text">Đánh giá sản phẩm: Không giới hạn</div>
                                                </div>
                                                <div className="limit-item">
                                                    <div className="item-text">Hàng ₫ặt trước: Không chấp nhận hàng ₫ặt trước</div>
                                                </div>
                                                <div className="limit-item">
                                                    <div className="item-text">Thời gian chuẩn bị hàng: Không giới hạn ngày</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="main_info">
                            {itemshop.byproduct_choice.length==0?<>
                            <h2 className="card-title">Product offer</h2>
                            <div className="tips">Add products to promotions and set promotional prices.</div>
                            <div className="add-item">
                                <button onClick={()=>addbyproduct()} className={`button--primary ${flashsale.hour!=undefined?'':'disable'} btn-m add-product item-center`}>
                                    <i className="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8.48176704,1.5 C8.75790942,1.5 8.98176704,1.72385763 8.98176704,2 L8.981,7.997 L15,7.99797574 C15.2761424,7.99797574 15.5,8.22183336 15.5,8.49797574 C15.5,8.77411811 15.2761424,8.99797574 15,8.99797574 L8.981,8.997 L8.98176704,15 C8.98176704,15.2761424 8.75790942,15.5 8.48176704,15.5 C8.20562467,15.5 7.98176704,15.2761424 7.98176704,15 L7.981,8.997 L2,8.99797574 C1.72385763,8.99797574 1.5,8.77411811 1.5,8.49797574 C1.5,8.22183336 1.72385763,7.99797574 2,7.99797574 L7.981,7.997 L7.98176704,2 C7.98176704,1.72385763 8.20562467,1.5 8.48176704,1.5 Z"></path></svg></i>
                                    <span className="ml-1_2">Add product</span>  
                                </button>
                            </div></>:<>
                            <div className="item-spaces">
                                <div>
                                    <h3 className="mb-3">Promotional products</h3>
                                </div>
                                <div className="item-center  mb-4">
                                    <button className="button--primary btn-m add-product item-center">
                                        <i className="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8.48176704,1.5 C8.75790942,1.5 8.98176704,1.72385763 8.98176704,2 L8.981,7.997 L15,7.99797574 C15.2761424,7.99797574 15.5,8.22183336 15.5,8.49797574 C15.5,8.77411811 15.2761424,8.99797574 15,8.99797574 L8.981,8.997 L8.98176704,15 C8.98176704,15.2761424 8.75790942,15.5 8.48176704,15.5 C8.20562467,15.5 7.98176704,15.2761424 7.98176704,15 L7.981,8.997 L2,8.99797574 C1.72385763,8.99797574 1.5,8.77411811 1.5,8.49797574 C1.5,8.22183336 1.72385763,7.99797574 2,7.99797574 L7.981,7.997 L7.98176704,2 C7.98176704,1.72385763 8.20562467,1.5 8.48176704,1.5 Z"></path></svg></i>
                                        <span className="ml-1_2">Add product</span>  
                                    </button>
                                </div>
                            </div>
                            
                            <div className="item-spaces setting-item">
                                <div className="batch-setting-panels">
                                    <div className="titles" style={{width: '160px'}}>Setting all</div>
                                    <div className="subtitle">Selected <strong>{selectchoice()}</strong> products</div>
                                </div>
                                
                                <div className="item-center">
                                    <div className="batch-setting-panels batch-form discount-box mx-2">
                                        <div className="mb-1">Offer</div>
                                        <div className="sub-edit-model" error-message="Invalid price"> 
                                            <div className="input-inner"> 
                                                <input onChange={(e)=>setvariation(e,'percent_discount')} value={state.percent_discount} type="text" className="form-select all_discount" placeholder="Enter" style={{height:'30px'}}/>
                                                <div className="input__suffix">
                                                    <span className="input__suffix-split"></span>
                                                    %Reduce
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>  
                                <div className="limit-box">
                                    <div className="mb-1">SL sản phẩm khuyến mãi</div>
                                    <div className="input-inner">
                                        <input onChange={(e)=>setvariation(e,'limit_order')} value={state.limit_order==''?'':state.limit_order} type="text" className="form-select" placeholder={state.limit_order==''?`Không giới hạn`:""} style={{height:'30px'}}/>
                                    </div>
                                </div>
                                <div className="limit-box">
                                    <div className="mb-1">Limit order</div>
                                    <div className="input-inner">
                                        <input onChange={(e)=>setvariation(e,'limit_order')} value={state.limit_order==''?'':state.limit_order} type="text" className="form-select" placeholder={state.limit_order==''?`Không giới hạn`:""} style={{height:'30px'}}/>
                                    </div>
                                </div>
                                
                                <div className="actions">
                                    <button onClick={(e)=>{selectchoice()==0?updateall(e):updatechoice(e)}} className={`btn-m btn-light ${state.percent_discount!=''?'':'disable'}`}>
                                        <span>{selectchoice()==0?'Update all':"Update choice"}</span>
                                    </button>
                                </div>
                                <div className="item-center action-setting">
                                    <button onClick={(e)=>setenabledbychoice(e,false,'byproduct_choice',itemshop.byproduct_choice)} className={`btn-m ml-1 enabled-items ${selectchoice()>0?"":'disable'} btn-light`}>
                                        <span>Turn off</span>
                                    </button>
                                    <button onClick={(e)=>setenabledbychoice(e,true,'byproduct_choice',itemshop.byproduct_choice)} className={`btn-m ml-1 enabled-items ${selectchoice()>0?"":'disable'} btn-light`}>
                                        <span>Turn up</span>
                                    </button>
                                    <button onClick={()=>setdeletechoice('byproduct',itemshop.byproduct,'byproduct_choice',itemshop.byproduct_choice,currentPage.byproduct)} className={`btn-m ml-1 ${selectchoice()>0?"":'disable'} btn-light`}>
                                        <span>Delete</span>
                                    </button>
                                </div>
                            </div>
                            <div className="table edit-table addon-table">
                                <div className="fixed-container">
                                    <div className="discount-items-header edit-mode">
                                        <div className="discount-item-selector item-center">
                                            <label className={`checkbox item-selector ${itemshop.byproduct_choice.some(item=>item.list_variation.some(variation=>variation.check))&& !itemshop.byproduct_choice.every(item=>item.list_variation.every(variation=>variation.check))?'indeterminate':''}`}>
                                                <input onChange={(e)=>setcheckallitem(e)} type="checkbox" checked={itemshop.byproduct_choice.every(item=>item.list_variation.every(variation=>variation.check))?true:false} className="checkbox__input" value=""/> 
                                                <span className="checkbox__indicator">
                                                    <i className="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">{itemshop.byproduct_choice.some(item=>item.list_variation.some(variation=>variation.check))&& !itemshop.byproduct_choice.every(item=>item.list_variation.every(variation=>variation.check))?<path fillRule="evenodd" d="M3.75,7 L12.25,7 C12.6642136,7 13,7.33578644 13,7.75 C13,8.16421356 12.6642136,8.5 12.25,8.5 L3.75,8.5 C3.33578644,8.5 3,8.16421356 3,7.75 C3,7.33578644 3.33578644,7 3.75,7 Z"></path>:<path d="M4.03033009,7.46966991 C3.73743687,7.1767767 3.26256313,7.1767767 2.96966991,7.46966991 C2.6767767,7.76256313 2.6767767,8.23743687 2.96966991,8.53033009 L6.32804531,11.8887055 C6.62093853,12.1815987 7.09581226,12.1815987 7.38870548,11.8887055 L13.2506629,6.02674809 C13.5435561,5.73385487 13.5435561,5.25898114 13.2506629,4.96608792 C12.9577697,4.6731947 12.4828959,4.6731947 12.1900027,4.96608792 L6.8583754,10.2977152 L4.03033009,7.46966991 Z"></path>}</svg></i>
                                                </span>
                                            </label>
                                        </div>
                                        <div className="variation">Product</div>
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
                                        <div className="purchase-limit header-limit" >
                                            limit order
                                            <div className="item-label-icon">
                                                <div className="popover__ref">
                                                    <i className="icon table__cell-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8,1 C11.8659932,1 15,4.13400675 15,8 C15,11.8659932 11.8659932,15 8,15 C4.13400675,15 1,11.8659932 1,8 C1,4.13400675 4.13400675,1 8,1 Z M8,2 C4.6862915,2 2,4.6862915 2,8 C2,11.3137085 4.6862915,14 8,14 C11.3137085,14 14,11.3137085 14,8 C14,4.6862915 11.3137085,2 8,2 Z M7.98750749,10.2375075 C8.40172105,10.2375075 8.73750749,10.5732939 8.73750749,10.9875075 C8.73750749,11.401721 8.40172105,11.7375075 7.98750749,11.7375075 C7.57329392,11.7375075 7.23750749,11.401721 7.23750749,10.9875075 C7.23750749,10.5732939 7.57329392,10.2375075 7.98750749,10.2375075 Z M8.11700238,4.60513307 C9.97011776,4.60513307 10.7745841,6.50497267 9.94298079,7.72186504 C9.76926425,7.97606597 9.56587088,8.14546785 9.27050506,8.31454843 L9.11486938,8.39945305 L8.95824852,8.47993747 C8.56296349,8.68261431 8.49390831,8.75808648 8.49390831,9.0209925 C8.49390831,9.29713488 8.27005069,9.5209925 7.99390831,9.5209925 C7.71776594,9.5209925 7.49390831,9.29713488 7.49390831,9.0209925 C7.49390831,8.34166619 7.7650409,7.99681515 8.35913594,7.6662627 L8.76655168,7.45066498 C8.9424056,7.3502536 9.04307851,7.26633638 9.11735517,7.1576467 C9.52116165,6.56675314 9.11397414,5.60513307 8.11700238,5.60513307 C7.41791504,5.60513307 6.82814953,6.01272878 6.75715965,6.55275918 L6.75,6.66244953 L6.74194433,6.75232516 C6.69960837,6.98557437 6.49545989,7.16244953 6.25,7.16244953 C5.97385763,7.16244953 5.75,6.9385919 5.75,6.66244953 C5.75,5.44256682 6.87194406,4.60513307 8.11700238,4.60513307 Z"></path></svg></i>
                                                </div>
                                                <div className="information_more">The maximum number of products Buyers can buy in the Sale</div>
                                            </div>
                                        </div>
                                        <div className="enable-disable">Turn on/off</div>
                                        <div className="item-action">Action</div>    
                                    </div>
                                </div>
                                <div className="table-body">
                                    {itemshop.byproduct_choice.map((item, index)=>
                                        <div className="discount-item-component edit-mode">
                                        <div className="discount-item-header">
                                            <div className="left">
                                                <div className="d-flex">
                                                    <div className="discount-item-selector item-center">
                                                        <label className={`checkbox item-selector ${item.list_variation.some(variation=>variation.check)&& !item.list_variation.every(variation=>variation.check)?'indeterminate':''}`}>
                                                            <input onChange={(e)=>setcheckitemflashsale(e,item)} 
                                                            checked={item.list_variation.every(variation=>variation.check)?true:false} type="checkbox" className="checkbox__input" value=""/> 
                                                            <span className="checkbox__indicator">
                                                                <i className="icon">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">{item.list_variation.some(variation=>variation.check)&& !item.list_variation.every(variation=>variation.check)?<path fillRule="evenodd" d="M3.75,7 L12.25,7 C12.6642136,7 13,7.33578644 13,7.75 C13,8.16421356 12.6642136,8.5 12.25,8.5 L3.75,8.5 C3.33578644,8.5 3,8.16421356 3,7.75 C3,7.33578644 3.33578644,7 3.75,7 Z"></path>:<path d="M4.03033009,7.46966991 C3.73743687,7.1767767 3.26256313,7.1767767 2.96966991,7.46966991 C2.6767767,7.76256313 2.6767767,8.23743687 2.96966991,8.53033009 L6.32804531,11.8887055 C6.62093853,12.1815987 7.09581226,12.1815987 7.38870548,11.8887055 L13.2506629,6.02674809 C13.5435561,5.73385487 13.5435561,5.25898114 13.2506629,4.96608792 C12.9577697,4.6731947 12.4828959,4.6731947 12.1900027,4.96608792 L6.8583754,10.2977152 L4.03033009,7.46966991 Z"></path>}</svg>
                                                                </i>
                                                            </span>
                                                        </label>
                                                    </div>
                                                    <div className="item-centers">                               
                                                        <img src={item.item_image} alt="" width="36px" height="36px"/>                                
                                                        <div className="item_detail">
                                                            <div className="ellipsis-content">{item.name}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="right">
                                                <div className="d-flex">
                                                <div className="plus-disable-enable d-flex">
                                                    <div className="input-inner">
                                                        <input onChange={(e)=>setlimitorderitem(e,item)} type="text" className="form-select" placeholder="Enter" style={{height:'30px'}}/>
                                                    </div>
                                                </div>
                                                <div data-v-0312ebbd="" className="enable-disable"></div>
                                                <div className="table-edit">
                                                    <button onClick={()=>removeitem(item,'byproduct',itemshop.byproduct,'byproduct_choice',itemshop.byproduct_choice,currentPage.byproduct)} type="button" className=" button btn-light button--circle">
                                                        <i className="icon trash-item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M2,4 C1.72385763,4 1.5,3.77614237 1.5,3.5 C1.5,3.22385763 1.72385763,3 2,3 L6,2.999 L6,2 C6,1.44771525 6.44771525,1 7,1 L10,1 C10.5522847,1 11,1.44771525 11,2 L11,2.999 L15,3 C15.2761424,3 15.5,3.22385763 15.5,3.5 C15.5,3.77614237 15.2761424,4 15,4 L14,4 L14,14 C14,14.5522847 13.5522847,15 13,15 L4,15 C3.44771525,15 3,14.5522847 3,14 L3,4 L2,4 Z M13,4 L4,4 L4,14 L13,14 L13,4 Z M6.5,7 C6.77614237,7 7,7.22385763 7,7.5 L7,11.5 C7,11.7761424 6.77614237,12 6.5,12 C6.22385763,12 6,11.7761424 6,11.5 L6,7.5 C6,7.22385763 6.22385763,7 6.5,7 Z M8.5,6 C8.77614237,6 9,6.22385763 9,6.5 L9,11.5 C9,11.7761424 8.77614237,12 8.5,12 C8.22385763,12 8,11.7761424 8,11.5 L8,6.5 C8,6.22385763 8.22385763,6 8.5,6 Z M10.5,7 C10.7761424,7 11,7.22385763 11,7.5 L11,11.5 C11,11.7761424 10.7761424,12 10.5,12 C10.2238576,12 10,11.7761424 10,11.5 L10,7.5 C10,7.22385763 10.2238576,7 10.5,7 Z M10,2 L7,2 L7,2.999 L10,2.999 L10,2 Z"></path></svg></i>
                                                    </button>
                                                    <div className="action-drag popover popover--dark">
                                                        <div className="popover__ref">
                                                            <button tabIndex={-1}
                                                                style={{ pointerEvents: "none" }} type="button" className="drag-btn button button--circle">
                                                                <i className="icon"><svg xmlns="http://www.w3.org/2000/svg"><path d="M3.684 10.475a.5.5 0 0 1-.707.707l-2.86-2.86a.498.498 0 0 1-.114-.27v-.018A.139.139 0 0 1 0 8l.003-.034.002-.018L0 8c0-.123.044-.235.118-.322l2.859-2.86a.5.5 0 0 1 .707.707L1.708 7.5h5.791V1.711L5.525 3.686a.5.5 0 0 1-.707-.707L7.612.184a.499.499 0 0 1 .776 0l2.794 2.795a.5.5 0 1 1-.707.707L8.499 1.71V7.5h5.79l-1.975-1.975a.5.5 0 1 1 .707-.707l2.795 2.794a.499.499 0 0 1 0 .776l-2.795 2.794a.5.5 0 1 1-.707-.707L14.288 8.5H8.499v5.791l1.976-1.975a.5.5 0 1 1 .707.707l-2.86 2.86a.502.502 0 0 1-.034.026l-.007.002a.463.463 0 0 1-.191.08l-.04.005A.9.9 0 0 1 8 16l-.04-.004h-.011L8 16a.498.498 0 0 1-.282-.087v-.002a.258.258 0 0 1-.04-.029l-2.86-2.859a.5.5 0 1 1 .707-.707L7.5 14.29V8.5H1.71l1.975 1.975z" fillRule="evenodd"></path></svg></i>
                                                            </button>
                                                        </div> 
                                                    </div>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="discount-edit-item-model">
                                            {item.list_variation.map(variation=>
                                            <div className="discount-edit-item-model-component">
                                                <div className="discount-item-selector item-center">
                                                    <label className="checkbox item-selector">
                                                        <input onChange={(e)=>setcheckvariation(e,variation,item)} checked={variation.check?true:false} type="checkbox" className="checkbox__input" value=""/> 
                                                        <span className="checkbox__indicator">
                                                            <i className="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M4.03033009,7.46966991 C3.73743687,7.1767767 3.26256313,7.1767767 2.96966991,7.46966991 C2.6767767,7.76256313 2.6767767,8.23743687 2.96966991,8.53033009 L6.32804531,11.8887055 C6.62093853,12.1815987 7.09581226,12.1815987 7.38870548,11.8887055 L13.2506629,6.02674809 C13.5435561,5.73385487 13.5435561,5.25898114 13.2506629,4.96608792 C12.9577697,4.6731947 12.4828959,4.6731947 12.1900027,4.96608792 L6.8583754,10.2977152 L4.03033009,7.46966991 Z"></path></svg></i>
                                                        </span>
                                                    </label>
                                                </div>
                                                <div className="variation" >{itemvariation(variation)}</div>
                                                <div className="original-price">₫{formatter.format(variation.price)}</div>
                                                <form autocomplete="off" className="form--inline form--label-right header-column_edit">
                                                    <div className="price-discount form-item">
                                                        <label for="discount" className="form-item__label empty">
                                                        </label> 
                                                        <div className="form-item__control">
                                                            <div className="form-item__content">
                                                                <div className="price-discount d-flex">
                                                                    <div className="input currency-input" size="normal" prefix-label="₫" error-message="Giá không hợp lệ" placeholder=" " error="true">
                                                                        <div className={`input__inner ${variation.error?'error':''} input__inner--normal`}>
                                                                            <div className="input__prefix">₫<span className="input__prefix-split"></span></div> 
                                                                            <input onChange={(e)=>setdiscount(e,'discount_price',variation,item)} value={variation.discount_price} type="text" placeholder=" " size="normal" resize="vertical" rows="2" minrows="2" maxLength="13" restrictiontype="value" max="Infinity" min="-Infinity" className="input__input"/> 
                                                                        </div>
                                                                        {variation.error?
                                                                        <p className="input__error-msg">Giá không hợp lệ</p>:''}
                                                                    </div> 
                                                                    <span className="split">or</span> 
                                                                    <div className="input discount-input" size="normal" placeholder=" ">
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
                                                <div className="item-promotion-stock">
                                                    <div className="input-inner">
                                                        <input type="text" className="form-select limit-order" placeholder="Enter" style={{height:'30px'}}/>
                                                    </div>
                                                </div>
                                                <div className="purchase-limit"></div>
                                                <div className="enable-disable">
                                                    <input type="checkbox" onChange={(e)=>setenableby(e,variation,item)} checked={variation.enable?true:false}  className="switch_1 " name="check"/>
                                                </div>
                                                <div className="item-content item-action"></div>   
                                            </div>
                                            )}
                                        </div>
                                    </div>    
                                    )}
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
            </div>
            <div id="modal">
                <Productoffer
                    showmain={show.items}
                    showbyproduct={show.byproduct}
                    loading={loading}
                    items={itemshop.items}
                    sec={state.timeSecond}
                    text={flashsale}
                    complete={state.complete}
                    items_choice={itemshop.items_choice}
                    byproduct={itemshop.byproduct}
                    byproduct_choice={itemshop.byproduct_choice}
                    setcheckitem={(item,product,keys)=>setcheckitem(item,product,keys)}
                    setcheckall={(e,items,keys,value,value_choice)=>setcheckall(e,items,keys,value,value_choice)}
                    submitby={()=>submitby()}
                    setshow={(sho,name)=>setshow(sho,name)}
                />
            </div>
             
        </>
    )
}
export default Flashsaleinfo