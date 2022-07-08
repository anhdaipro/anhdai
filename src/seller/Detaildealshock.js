import axios from 'axios';
import Navbar from "./Navbar"
import { useParams,Link } from "react-router-dom";
import Productoffer from "./Productoffer"
import React, {useState,useEffect,useCallback,useRef} from 'react'
import ReactDOM, { render } from 'react-dom'
import {localhost,formatter,dealDetailshopURL,itemdealURL,itemvariation} from "../constants"
import Pagination from "../hocs/Pagination"
import Dealshockinfo from "../hocs/Dealshockinfo"
import Message from '../containers/Chat'
import { headers } from '../actions/auth';
let Pagesize=5
const Detaildealshock=()=>{
    const { id } = useParams(); 
    const [state,setState]=useState({timeSecond:5,edit:false,
    item_remove:0,save:true,page_input:1,limit_order:'',index_choice:2,complete:false,
    percent_discount:'',show:false,total_price:0,total_discount:0,minutes:10,hours:0,hours_to:0,minutes_to:0})
    const [deal,setDeal]=useState(null)
    const [itemshop,setItem]=useState({itemshops:[],items:[],page_count_main:0,items_choice:[],savemain:false
        ,page_count_by:0,byproduct:[],byproduct_choice:[],savebyproduct:false})
    const [show,setShow]=useState({items:false,byproduct:false})
    const [loading,setLoading]=useState(false)
    const [currentPage, setCurrentPage] = useState({items:1,byproduct:1});
    const [current, setCurrent] = useState(1);
    const [disable,setDisable]=useState(true)
    const[date,setDate]=useState({deal_date:[new Date(),new Date()]})
    const firstPageIndex = (currentPage.items - 1) * Pagesize;
    const lastPageIndex = firstPageIndex + Pagesize;
    const currentitemPage=itemshop.items_choice.slice(firstPageIndex, lastPageIndex);
    console.log(currentitemPage)
    const firstpagebyproductIndex=(currentPage.byproduct - 1) * Pagesize;
    const lastPagebyproductIndex = firstpagebyproductIndex + Pagesize;
    const byproductPage=itemshop.byproduct_choice.slice(firstpagebyproductIndex, lastPagebyproductIndex);
    useEffect(() => {
        const getJournal = async () => {
            await axios(dealDetailshopURL+id,headers)
           // <-- passed to API URL
            .then(res=>{
                let data=res.data
                setDeal(data.deal_shock)
                setState({...state,loading:true})
                setDate([{time:new Date(data.deal_shock.valid_from),show:false,hours:new Date(data.deal_shock.valid_from).getHours(),minutes:new Date(data.deal_shock.valid_from).getMinutes()}
              ,{time:new Date(data.deal_shock.valid_to),show:false,hours:new Date(data.deal_shock.valid_to).getHours(),minutes:new Date(data.deal_shock.valid_to).getMinutes()}])
                setLoading(true)
                const list_byproduct=data.byproduct_choice.map(byproduct=>{
                    return({...byproduct,list_variation:byproduct.list_variation.map(variation=>{
                        if(variation.percent_discount>0){
                            return({...variation,enable:true})
                        }
                        return({...variation,enable:false})
                    })})
                })
                let savemain=false
                if(data.items_choice.length>0){
                    savemain=true
                }
                let savebyproduct=false
                if(data.byproduct_choice.length>0){
                    savebyproduct=true
                }
                
                const list_enable_on=list_byproduct.filter(item=>item.list_variation.some(variation=>variation.percent_discount>0))
                const list_enable_off=list_byproduct.filter(item=>list_enable_on.every(items=>item.item_id!=items.item_id))
                const byproduct_choice=[...list_enable_on,...list_enable_off]
                console.log(list_byproduct)
                setItem({...itemshop,items_choice:data.items_choice,byproduct_choice:byproduct_choice,savemain:savemain,savebyproduct:savebyproduct,
                page_count_main:Math.ceil(data.items_choice.length / Pagesize),page_count_by:Math.ceil(data.byproduct_choice.length / Pagesize)})
          })
        }
        getJournal();
    }, [id]);
    
    const onChange = useCallback((datechoice)=> {
        const list_date=date.map(item=>{
            if(item.show){
                return({...item,time:datechoice})
            }
            return({...item})
        })

        setDate(list_date);
    },[date])

    const handlePageChange=(page,name)=>{
        setCurrentPage({...currentPage,[name]:page})
    }

    const additem=(e)=>{
        setLoading(true)
        setShow({...show,items:true,byproduct:false})
        if(itemshop.items.length==0){
            let url=new URL(dealDetailshopURL+id)
            let search_params=url.searchParams
            search_params.append('item','ok')
           
            url.search = search_params.toString();
            let new_url = url.toString();
            axios.get(new_url,headers)
            .then(res=>{
                const items=res.data.c.filter(item=>itemshop.byproduct_choice.every(itemchoice=>item.item_id!=itemchoice.item_id))
                const list_items=items.map(item=>{
                if(itemshop.items_choice.some(product=>product.item_id==item.item_id)){
                    return({...item,check:true})
                }
                return({...item,check:false})
                })
                setItem({...itemshop,itemshops:res.data.c,items:list_items,page_count_main:Math.ceil(list_items.length / Pagesize)})  
            })
        }
        else{
            const items=itemshop.itemshops.filter(item=>itemshop.byproduct_choice.every(itemchoice=>item.item_id!=itemchoice.item_id))
            const list_items=items.map(item=>{
                if(itemshop.items_choice.some(product=>product.item_id==item.item_id)){
                    return({...item,check:true})
                }
                return({...item,check:false})
                })
            setItem({...itemshop,items:list_items,page_count_main:Math.ceil(list_items.length / Pagesize)})  
        }
    }

    const addbyproduct=(e)=>{
        setShow({...show,byproduct:true,items:false})
        if(itemshop.items.length==0){
            axios.get(itemdealURL,headers)
            .then(res=>{
                const list_byproduct=res.data.c.filter(item=>itemshop.items_choice.every(itemchoice=>item.item_id!=itemchoice.item_id))
                const byproduct=list_byproduct.map(item=>{
                    if(itemshop.byproduct_choice.some(by=>by.item_id==item.item_id)){
                        return({...item,check:true})
                    }
                     return({...item,check:false})
                })
                
                setItem({...itemshop,itemshops:res.data.c,byproduct:byproduct,page_count_by:Math.ceil(byproduct.length / Pagesize)})  
            })
        }
        else{
            const list_byproduct=itemshop.itemshops.filter(item=>itemshop.items_choice.every(itemchoice=>item.item_id!=itemchoice.item_id))
            const byproduct=list_byproduct.map(item=>{
                if(itemshop.byproduct_choice.some(by=>by.item_id==item.item_id)){
                    return({...item,check:true})
                }
                    return({...item,check:false})
            })
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
        console.log({[keys]:list_item})
    },[itemshop])

    const setcheckall=(e,list_items,keys,value,value_choice)=>{
        for (let k in value){
            for(let i in list_items){
                if(e.target.checked==true && list_items[i]==value[k] && keys!='byproduct_choice' && keys!='items_choice' && !value_choice.some(ite=>ite.item_id==value[k].item_id)){
                    value[k].check=true
                }
                if(e.target.checked==false && list_items[i]==value[k] && keys!='byproduct_choice' && keys!='items_choice' && !value_choice.some(ite=>ite.item_id==value[k].item_id)){
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

    const submit=useCallback(()=>{
        
        const list_itemscheck=itemshop.items.filter(ite=>ite.check && !itemshop.items_choice.some(item=>item.item_id==ite.item_id))
        const list_itemschoice=list_itemscheck.map(item=>{
            return({...item,check:false,enable:true})
        })
        console.log(list_itemschoice)
        itemshop.items_choice=[...list_itemschoice,...itemshop.items_choice]
        setItem({...itemshop,items_choice:itemshop.items_choice})
        setShow({...show,items:false})
    },[itemshop,show])

    const submitby=()=>{
        let form=new FormData()
        const list_itemscheck=itemshop.byproduct.filter(ite=>ite.check && !itemshop.byproduct_choice.some(item=>item.item_id==ite.item_id))
        list_itemscheck.map(item=>{
            form.append('byproduct_id',item.item_id)
            }
        )
        axios.post(dealDetailshopURL+id,form,headers)
        .then(res=>{
            const list_itemschoice=res.data.list_byproduct.map(item=>{
                return({...item,list_variation:item.list_variation.map(variation=>{
                    return({...variation,enable:false,percent_discount:0,discount_price:variation.price,limit_order:''})
                })})})
            
            itemshop.byproduct_choice=[...list_itemschoice,...itemshop.byproduct_choice]
            setItem({...itemshop,byproduct_choice:itemshop.byproduct_choice})
            setShow({...show,byproduct:false})
            console.log(itemshop.byproduct_choice)
        })
        
    }

    const setenableitem=(e,product,value,key)=>{
        const list_item=value.map(ite=>{
            if(product.item_id==ite.item_id){
                return({...ite,enable:!ite.enable})
            }
            else{
                return({...ite})
            }
        })
        setItem({...itemshop,[key]:list_item}) 
    }

    const removeitem=(itemmove,keys,value,keys_choice,value_choice,page_current)=>{
        const list_itemchoice=value_choice.filter(item=>item.item_id!=itemmove.item_id)
        const list_item=value.map(ite=>{
            if(ite.item_id==itemmove.item_id){
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

    const save=(keys,value,keys_choice,value_choice)=>{
        if(keys_choice=='items_choice'){
        const list_enable_on=value_choice.filter(item=>item.enable)
        const list_enable_off=value_choice.filter(item=>!item.enable)
        const list_item=[...list_enable_on,...list_enable_off]
        setItem({...itemshop,[keys]:value,[keys_choice]:list_item})
        }
        else{
            const valid=value_choice.every(item=>item.list_variation.every(variation=>variation.percent_discount>0 && variation.percent_discount<100))
            const list_enable_off=value_choice.filter(item=>list_enable_on.every(items=>item.item_id!=items.item_id))
            const list_item=[...list_enable_on,...list_enable_off]
            if(valid || !value || deal.shock_deal_type=='2'){
                setItem({...itemshop,[keys]:value,[keys_choice]:list_item})
            }
            else{
                const list_byproduct=value_choice.map(byproduct=>{
                    return({...byproduct,list_variation:byproduct.list_variation.map(variation=>{
                        if(variation.percent_discount>0){
                            return({...variation,error:false})
                        }
                        return({...variation,enable:true})
                    })})
                })
                setItem({...itemshop,[keys_choice]:list_byproduct})
            }
        }
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
            if(list_itemchoice.every(items=>items.item_id!=item.item_id)){
                return({...item,check:false})
            }
            return({...item})
        })
        setItem({...itemshop,[keys_choice]:list_itemchoice,[keys]:list_item})
        let page=page_current
        if(page>=Math.ceil(list_itemchoice.length / Pagesize)){
            page=Math.ceil(list_itemchoice.length / Pagesize)
            if(list_itemchoice.length==0){
                page=1
            }
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
        const byproduct=item.list_variation.map(varia=>{
            if(varia.variation_id==variation.variation_id){
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
        const list_byproduct=itemshop.byproduct_choice.map(byproduct=>{
            return({...byproduct,list_variation:byproduct.list_variation.map(variation=>{
                if(byproduct.check){
                    if(state.percent_discount!==''){
                        return({...variation,percent_discount:state.percent_discount,discount_price:variation.price*(1-state.percent_discount/100)})
                    }
                    if(state.limit_order!=''){
                        return({...variation,limit_order:state.limit_order})
                    } 
                    return({...variation})
                }
                return({...variation})
            })})
        })
        
        setItem({...itemshop,byproduct_choice:list_byproduct})
    }

    const setenableby=(e,variation,item)=>{
        const byproduct=item.list_variation.map(varia=>{
            if(varia.variation_id==variation.variation_id){
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
        const list_byproduct=value_choice.map(byproduct=>{
            return({...byproduct,list_variation:byproduct.list_variation.map(variation=>{
                if(byproduct.check){
                    if(variation.percent_discount>0){
                        return({...variation,enable:value,error:false})
                    }
                    else{
                        return({...variation,error:true})
                    }
                }
                return({...variation})
            })})
        })
    
        
        setItem({...itemshop,[keys_choice]:list_byproduct})
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

    function get_percent_discount(item){
        const list_variation_enable=item.list_variation.filter(variation=>variation.enable)
        let item_chocie=list_variation_enable.find(c => c.percent_discount==Math.max.apply(Math, list_variation_enable.map(function(o) { return o.percent_discount })));
        return item_chocie
    }
    
    const list_enable_on=itemshop.byproduct_choice.filter(item=>item.list_variation.some(variation=>variation.enable))
    
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

    const get_price=()=>{
        let price_box={total_price:0,total_discount:0}
        list_enable_on.map((item,index)=>{
            if(index<2){
                price_box.total_price+=get_percent_discount(item).price
                price_box.total_discount+=get_percent_discount(item).discount_price
            }
        })
        return price_box
    }
    
   
    const setindexchoice=useCallback((list_date)=>{
        setDate(list_date);
    },[date])

    const setdatevalid=useCallback((index)=>{
        if(index==0){
            deal.valid_from=date[index].time.toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).substr(0,10)+' '+('0'+date[index].hours).slice(-2)+':'+("0"+date[index].minutes).slice(-2)
            setDeal({...deal,valid_from:deal.valid_from})

        }
        else{
            setDeal({...deal,valid_to:deal.valid_to})
            deal.valid_to=date[index].time.toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).substr(0,10)+' '+('0'+date[index].hours).slice(-2)+':'+("0"+date[index].minutes).slice(-2)
        }
    },[deal])

    const setform=useCallback((e)=>{
        setDeal({...deal,[e.target.name]:e.target.value})
    },[deal])

    const editdeal=useCallback(()=>{
        let form=new FormData()
        form.append('edit',true)
        Object.keys(deal).map(item=>{
            form.append(item,deal[item])
            }
        )
        axios.post(dealDetailshopURL+id,form,headers)
        .then(res=>{
            setDeal(res.data)
            setState({...state,edit:false})
        })
    },[state])

    const setvariation=(e,keys)=>{
        let item=parseInt(e.target.value)
        if(!isNaN(e.target.value) && e.target.value.trim()!=''){
            setState({...state,[keys]:item})
        }
        else{
            setState({...state,[keys]:''})
        }
    }

    const setdrag=()=>{

    }

    const complete=()=>{
        let form=new FormData()
        itemshop.items_choice.map(item=>{
            if(item.enable){
            form.append('item_id',item.item_id)
            }
        })
        list_enable_on.map(item=>{
            form.append('byproduct_id',item.item_id)
            item.list_variation.map(variation=>{
                form.append('variation_id',variation.variation_id)
                form.append('percent_discount',variation.enable?variation.percent_discount:0)
                form.append('limit_order',variation.limit_order!=''?variation.limit_order:variation.inventory)
            })
        })
        const list_enable_off=itemshop.byproduct_choice.filter(item=>list_enable_on.every(items=>item.item_id!=items.item_id))
        list_enable_off.map(item=>{
            item.list_variation.map(variation=>{
                form.append('variation_id_off',variation.variation_id)
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

        axios.post(dealDetailshopURL+id,form,headers)
        .then(res=>{
        })
    }

   
    return(
        <>
            <Navbar/>
            <div data-v-39395675="" className="wrapper">
                <div className="content-wrapper">
                {loading?
                <div className="main-deal-shock">
                    <h2 className=" p-2">Detail Deal shock</h2>
                        <div className="main_info info-basic-deal">
                            {state.edit?
                                <Dealshockinfo
                                    editdeal={()=>editdeal()}
                                    setform={(e)=>setform(e)}
                                    settimechoice={(value,index,name)=>settimechoice(value,index,name)}
                                    setindexchoice={(list_date)=>setindexchoice(list_date)}
                                    setdatevalid={(index)=>setdatevalid(index)}
                                    onChange={(datechoice)=>onChange(datechoice)}
                                    disable={disable}
                                    date={date}
                                    deal={deal}
                                />
                            :
                            <>
                            <div className="item-space ">
                                <div><span>Basic information</span> </div>
                                <button onClick={()=>setState({...state,edit:true})} className="button--link item-center">
                                    <i className="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M13.7698326,4.53553391 L11.6485122,2.41421356 L9.52719188,4.53553391 L11.6485122,6.65685425 L13.7698326,4.53553391 Z M10.9414054,7.36396103 L8.8200851,5.24264069 L2.71213203,11.3505938 L2.5,13.6840461 L4.83345238,13.4719141 L10.9414054,7.36396103 Z M12.355619,1.70710678 L14.4769394,3.82842712 C14.8674636,4.21895142 14.8674636,4.8521164 14.4769394,5.24264069 L5.54055916,14.1790209 C5.37514107,14.344439 5.1569639,14.4466277 4.92398812,14.4678073 L2.59053575,14.6799393 C2.04051912,14.7299408 1.55410831,14.3245985 1.50410679,13.7745819 C1.49863107,13.7143489 1.49863107,13.6537434 1.50410679,13.5935104 L1.71623883,11.260058 C1.73741844,11.0270822 1.83960716,10.8089051 2.00502525,10.643487 L10.9414054,1.70710678 C11.3319297,1.31658249 11.9650947,1.31658249 12.355619,1.70710678 Z"></path></svg></i>
                                    <span>Change</span> 
                                </button>
                            </div>
                            <div className="item-space pr-2">
                                <div>
                                    <span>Shock Deal Type: </span>
                                    <span className="shock_type">{deal.shock_deal_type=='1'?'Buy with deal shock':'buy to receive gifts'}</span>  
                                </div>
                                <div className="item-center">
                                    <span>Shock Deal Name: </span> 
                                    <div className="item-label-icon">
                                        <div className="popover__ref item-center item-centers">
                                            <i className="icon table__cell-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8,1 C11.8659932,1 15,4.13400675 15,8 C15,11.8659932 11.8659932,15 8,15 C4.13400675,15 1,11.8659932 1,8 C1,4.13400675 4.13400675,1 8,1 Z M8,2 C4.6862915,2 2,4.6862915 2,8 C2,11.3137085 4.6862915,14 8,14 C11.3137085,14 14,11.3137085 14,8 C14,4.6862915 11.3137085,2 8,2 Z M7.98750749,10.2375075 C8.40172105,10.2375075 8.73750749,10.5732939 8.73750749,10.9875075 C8.73750749,11.401721 8.40172105,11.7375075 7.98750749,11.7375075 C7.57329392,11.7375075 7.23750749,11.401721 7.23750749,10.9875075 C7.23750749,10.5732939 7.57329392,10.2375075 7.98750749,10.2375075 Z M8.11700238,4.60513307 C9.97011776,4.60513307 10.7745841,6.50497267 9.94298079,7.72186504 C9.76926425,7.97606597 9.56587088,8.14546785 9.27050506,8.31454843 L9.11486938,8.39945305 L8.95824852,8.47993747 C8.56296349,8.68261431 8.49390831,8.75808648 8.49390831,9.0209925 C8.49390831,9.29713488 8.27005069,9.5209925 7.99390831,9.5209925 C7.71776594,9.5209925 7.49390831,9.29713488 7.49390831,9.0209925 C7.49390831,8.34166619 7.7650409,7.99681515 8.35913594,7.6662627 L8.76655168,7.45066498 C8.9424056,7.3502536 9.04307851,7.26633638 9.11735517,7.1576467 C9.52116165,6.56675314 9.11397414,5.60513307 8.11700238,5.60513307 C7.41791504,5.60513307 6.82814953,6.01272878 6.75715965,6.55275918 L6.75,6.66244953 L6.74194433,6.75232516 C6.69960837,6.98557437 6.49545989,7.16244953 6.25,7.16244953 C5.97385763,7.16244953 5.75,6.9385919 5.75,6.66244953 C5.75,5.44256682 6.87194406,4.60513307 8.11700238,4.60513307 Z"></path></svg></i>
                                        </div>
                                        <div className="information_more">The program name Buy to get gifts is not visible to buyers.</div>
                                    </div>
                                    <span>{deal.program_name_buy_with_shock_deal}</span>
                                    </div>
                                <div>
                                    <span>Program time: </span>
                                    <span className="time_deal_shock">{new Date(deal.valid_from).toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).substr(0,16)} - {new Date(deal.valid_to).toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).substr(0,16)}</span>
                                </div>    
                            </div>
                            <div className="d-flex">
                                {deal.shock_deal_type=='1'?
                                <><span>Limited product bundles: </span>
                                <div className="item-label-icon ">
                                    <div className="popover__ref item-center item-centers">
                                        <i className="icon table__cell-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8,1 C11.8659932,1 15,4.13400675 15,8 C15,11.8659932 11.8659932,15 8,15 C4.13400675,15 1,11.8659932 1,8 C1,4.13400675 4.13400675,1 8,1 Z M8,2 C4.6862915,2 2,4.6862915 2,8 C2,11.3137085 4.6862915,14 8,14 C11.3137085,14 14,11.3137085 14,8 C14,4.6862915 11.3137085,2 8,2 Z M7.98750749,10.2375075 C8.40172105,10.2375075 8.73750749,10.5732939 8.73750749,10.9875075 C8.73750749,11.401721 8.40172105,11.7375075 7.98750749,11.7375075 C7.57329392,11.7375075 7.23750749,11.401721 7.23750749,10.9875075 C7.23750749,10.5732939 7.57329392,10.2375075 7.98750749,10.2375075 Z M8.11700238,4.60513307 C9.97011776,4.60513307 10.7745841,6.50497267 9.94298079,7.72186504 C9.76926425,7.97606597 9.56587088,8.14546785 9.27050506,8.31454843 L9.11486938,8.39945305 L8.95824852,8.47993747 C8.56296349,8.68261431 8.49390831,8.75808648 8.49390831,9.0209925 C8.49390831,9.29713488 8.27005069,9.5209925 7.99390831,9.5209925 C7.71776594,9.5209925 7.49390831,9.29713488 7.49390831,9.0209925 C7.49390831,8.34166619 7.7650409,7.99681515 8.35913594,7.6662627 L8.76655168,7.45066498 C8.9424056,7.3502536 9.04307851,7.26633638 9.11735517,7.1576467 C9.52116165,6.56675314 9.11397414,5.60513307 8.11700238,5.60513307 C7.41791504,5.60513307 6.82814953,6.01272878 6.75715965,6.55275918 L6.75,6.66244953 L6.74194433,6.75232516 C6.69960837,6.98557437 6.49545989,7.16244953 6.25,7.16244953 C5.97385763,7.16244953 5.75,6.9385919 5.75,6.66244953 C5.75,5.44256682 6.87194406,4.60513307 8.11700238,4.60513307 Z"></path></svg></i>
                                    </div>
                                    <div className="information_more">Maximum quantity per customer is included with each order</div>
                                </div>
                                <span> {deal.limited_product_bundles}</span></>
                                :<>
                                Conditions for receiving gifts: 
                                <span> Buy<strong> {deal.minimum_price_to_receive_gift} </strong>  to receive <strong> {deal.number_gift} </strong> gift</span>
                                </>}
                            </div>
                            </>}
                        </div>
                        <div className="discount-info main_product">
                            {itemshop.items_choice.length>0?<>
                            <div className="item-spaces">
                                <div className="card-title">Main product</div>
                                <div className="change-item">
                                    {!itemshop.savemain?
                                    <button onClick={e=>additem(e)} className="add-product button--primary btn-m">
                                        <i className="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8.48176704,1.5 C8.75790942,1.5 8.98176704,1.72385763 8.98176704,2 L8.981,7.997 L15,7.99797574 C15.2761424,7.99797574 15.5,8.22183336 15.5,8.49797574 C15.5,8.77411811 15.2761424,8.99797574 15,8.99797574 L8.981,8.997 L8.98176704,15 C8.98176704,15.2761424 8.75790942,15.5 8.48176704,15.5 C8.20562467,15.5 7.98176704,15.2761424 7.98176704,15 L7.981,8.997 L2,8.99797574 C1.72385763,8.99797574 1.5,8.77411811 1.5,8.49797574 C1.5,8.22183336 1.72385763,7.99797574 2,7.99797574 L7.981,7.997 L7.98176704,2 C7.98176704,1.72385763 8.20562467,1.5 8.48176704,1.5 Z"></path></svg></i>
                                        <span className="ml-1_2">Add product</span>  
                                    </button>:
                                    <button onClick={()=>save('savemain',false,'items_choice',itemshop.items_choice)} data-v-3b5d1a68="" type="button" className={`button button--link ${itemshop.byproduct_choice.length>0 && !itemshop.savebyproduct?"disable":''} button--normal`}>
                                        <i className="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M13.7698326,4.53553391 L11.6485122,2.41421356 L9.52719188,4.53553391 L11.6485122,6.65685425 L13.7698326,4.53553391 Z M10.9414054,7.36396103 L8.8200851,5.24264069 L2.71213203,11.3505938 L2.5,13.6840461 L4.83345238,13.4719141 L10.9414054,7.36396103 Z M12.355619,1.70710678 L14.4769394,3.82842712 C14.8674636,4.21895142 14.8674636,4.8521164 14.4769394,5.24264069 L5.54055916,14.1790209 C5.37514107,14.344439 5.1569639,14.4466277 4.92398812,14.4678073 L2.59053575,14.6799393 C2.04051912,14.7299408 1.55410831,14.3245985 1.50410679,13.7745819 C1.49863107,13.7143489 1.49863107,13.6537434 1.50410679,13.5935104 L1.71623883,11.260058 C1.73741844,11.0270822 1.83960716,10.8089051 2.00502525,10.643487 L10.9414054,1.70710678 C11.3319297,1.31658249 11.9650947,1.31658249 12.355619,1.70710678 Z"></path></svg></i>
                                        <span>Thay đổi</span>
                                    </button>}
                                </div>
                            </div>
                            <div className="tips">The maximum amount of each customer can buy is 100 main products in the same program Shock Deal</div>
                            <div className="item_main-content">
                                <div className="products-panel-header my-1">
                                    <form className="form--inline">
                                        <div className="search-input main-item-search">
                                            <div className="input-group item-center search-type">
                                                <div className="input-group__prepend" style={{width: '160px'}}>
                                                    <div className="select-choices  item-center">
                                                    <div className="selector-inner ">SKU product </div> 
                                                    <div className="selector__suffix">
                                                        <i className="selector__suffix-icon icon">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M8,9.18933983 L4.03033009,5.21966991 C3.73743687,4.9267767 3.26256313,4.9267767 2.96966991,5.21966991 C2.6767767,5.51256313 2.6767767,5.98743687 2.96966991,6.28033009 L7.46966991,10.7803301 C7.76256313,11.0732233 8.23743687,11.0732233 8.53033009,10.7803301 L13.0303301,6.28033009 C13.3232233,5.98743687 13.3232233,5.51256313 13.0303301,5.21966991 C12.7374369,4.9267767 12.2625631,4.9267767 11.9696699,5.21966991 L8,9.18933983 Z"></path></svg>
                                                        </i>
                                                    </div>
                                                    </div>
                                                    <div className="select__options">
                                                    <div className="p-1_2">
                                                        <div className="variation-option">Product name</div>                                            
                                                        <div className="variation-option ">SKU product</div>                                                          
                                                    </div>
                                                    </div> 
                                                </div> 
                                                <div className="input-group__append">
                                                <div className="search-input" style={{width:'300px'}}>
                                                    <div className="item-center input-inner">
                                                        <input type="text" placeholder=" " clearable="true" resize="vertical" rows="2" minrows="2" restrictiontype="value" max="Infinity" min="-Infinity" className="input__input"/> 
                                                        <div className="input_suffix">
                                                            <i className="input__clear-btn icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8,2 C11.3137085,2 14,4.6862915 14,8 C14,11.3137085 11.3137085,14 8,14 C4.6862915,14 2,11.3137085 2,8 C2,4.6862915 4.6862915,2 8,2 Z M10.5924919,5.27303573 C10.4094355,5.1521972 10.1606887,5.17236516 9.99956233,5.33352414 L9.99956233,5.33352414 L8.00023568,7.33325477 L6.00047136,5.33349045 C5.81628967,5.14930876 5.51767215,5.14930876 5.33349045,5.33349045 L5.33349045,5.33349045 L5.27301564,5.40754038 C5.1522078,5.59059052 5.17239885,5.83931011 5.33355782,6.00040399 L5.33355782,6.00040399 L7.33372614,7.99976432 L5.33352414,9.99956232 L5.33352414,9.99956232 L5.27306194,10.0735738 C5.15220491,10.2566181 5.17234775,10.5053668 5.33349045,10.6665095 L5.33349045,10.6665095 L5.40750807,10.7269643 C5.5905645,10.8478028 5.83931125,10.8276348 6.00043768,10.6664759 L6.00043768,10.6664759 L8.00023568,8.66627386 L9.99959601,10.6664422 L9.99959601,10.6664422 L10.0736337,10.726932 C10.2566595,10.8477768 10.5053831,10.827636 10.6665095,10.6665095 C10.8506912,10.4823279 10.8506912,10.1837103 10.6665095,9.99952864 L10.6665095,9.99952864 L8.66674523,7.99976432 L10.6664759,6.00043767 L10.6664759,6.00043767 L10.7269381,5.92642616 C10.8477951,5.74338194 10.8276522,5.49463316 10.6665095,5.33349045 L10.6665095,5.33349045 Z"></path></svg></i>
                                                            <div  className="search-btn">
                                                            <i className="icon icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M6.994.994a6 6 0 014.584 9.87l3.28 3.28a.5.5 0 01-.639.764l-.069-.058-3.278-3.278A6 6 0 116.994.993zm0 1a5 5 0 100 10 5 5 0 000-10z"></path></svg></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    <div className="item-spaces my-1">
                                        <p className="enabled">
                                            <span>{itemshop.items_choice.filter(item=>item.enable).length}</span> product is enabled on a total of <span>{itemshop.items_choice.length}</span> products
                                        </p>
                                    </div>
                                </div>
                                {itemshop.savemain?"":
                                <div className="item-spaces batch-setting-panel">
                                    <div className="batch-setting">
                                        <div className="titles">Batch Setup</div>
                                        <div className="subtitle">selected <strong>{itemshop.items_choice.filter(item=>item.check).length}</strong> products</div>
                                    </div>
                                    <div className="item-spaces">
                                        <button onClick={(e)=>setenabledchoice(e,false)} className={`btn-m enabled-items ${itemshop.items_choice.some(item=>item.check)?"":'disable'} btn-light`}>Turn off</button>
                                        <button onClick={(e)=>setenabledchoice(e,true)} className={`btn-m btn-light ${itemshop.items_choice.some(item=>item.check)?"":'disable'} enabled-items mx-1`}>Turn on</button>
                                        <button onClick={()=>setdeletechoice('items',itemshop.items,'items_choice',itemshop.items_choice,currentPage.items)} className={`btn-m btn-light ${itemshop.items_choice.some(item=>item.check)?"":'disable'} delete-items mx-1`}>Delete</button>
                                    </div>
                                </div>}
                                <div className="content-box">
                                    <div className="table__header--container">
                                        <div className="item_heading" style={{width:'440px'}}>
                                            {itemshop.savemain?"":
                                            <div className="item-center form-check-item">
                                                <label className={`checkbox item-selector ${currentitemPage.some(ite=>ite.check)&&!currentitemPage.every(ite=>ite.check)?'indeterminate':''}`}>
                                                    <input onChange={(e)=>setcheckall(e,currentitemPage,'items_choice',itemshop.items_choice)} type="checkbox" checked={currentitemPage.every(ite=>ite.check)?true:false} className="checkbox__input" value=""/> 
                                                    <span className="checkbox__indicator">
                                                        <i className="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">{currentitemPage.some(ite=>ite.check)&&!currentitemPage.every(ite=>ite.check)?<path fillRule="evenodd" d="M3.75,7 L12.25,7 C12.6642136,7 13,7.33578644 13,7.75 C13,8.16421356 12.6642136,8.5 12.25,8.5 L3.75,8.5 C3.33578644,8.5 3,8.16421356 3,7.75 C3,7.33578644 3.33578644,7 3.75,7 Z"></path>:<path d="M4.03033009,7.46966991 C3.73743687,7.1767767 3.26256313,7.1767767 2.96966991,7.46966991 C2.6767767,7.76256313 2.6767767,8.23743687 2.96966991,8.53033009 L6.32804531,11.8887055 C6.62093853,12.1815987 7.09581226,12.1815987 7.38870548,11.8887055 L13.2506629,6.02674809 C13.5435561,5.73385487 13.5435561,5.25898114 13.2506629,4.96608792 C12.9577697,4.6731947 12.4828959,4.6731947 12.1900027,4.96608792 L6.8583754,10.2977152 L4.03033009,7.46966991 Z"></path>}</svg></i>
                                                    </span> 
                                                </label>
                                            </div>}
                                            <div className=" item-center">Product name</div>
                                        </div>
                                        <div className="table_main-header" style={{width:'800px'}}>
                                            <div>
                                                <span>Current Selling Price</span>
                                            </div>
                                            <div>
                                                <span>Inventory</span>
                                                <div className="item-label-icon">
                                                    <div className="popover__ref item-center item-centers">
                                                        <i className="icon table__cell-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8,1 C11.8659932,1 15,4.13400675 15,8 C15,11.8659932 11.8659932,15 8,15 C4.13400675,15 1,11.8659932 1,8 C1,4.13400675 4.13400675,1 8,1 Z M8,2 C4.6862915,2 2,4.6862915 2,8 C2,11.3137085 4.6862915,14 8,14 C11.3137085,14 14,11.3137085 14,8 C14,4.6862915 11.3137085,2 8,2 Z M7.98750749,10.2375075 C8.40172105,10.2375075 8.73750749,10.5732939 8.73750749,10.9875075 C8.73750749,11.401721 8.40172105,11.7375075 7.98750749,11.7375075 C7.57329392,11.7375075 7.23750749,11.401721 7.23750749,10.9875075 C7.23750749,10.5732939 7.57329392,10.2375075 7.98750749,10.2375075 Z M8.11700238,4.60513307 C9.97011776,4.60513307 10.7745841,6.50497267 9.94298079,7.72186504 C9.76926425,7.97606597 9.56587088,8.14546785 9.27050506,8.31454843 L9.11486938,8.39945305 L8.95824852,8.47993747 C8.56296349,8.68261431 8.49390831,8.75808648 8.49390831,9.0209925 C8.49390831,9.29713488 8.27005069,9.5209925 7.99390831,9.5209925 C7.71776594,9.5209925 7.49390831,9.29713488 7.49390831,9.0209925 C7.49390831,8.34166619 7.7650409,7.99681515 8.35913594,7.6662627 L8.76655168,7.45066498 C8.9424056,7.3502536 9.04307851,7.26633638 9.11735517,7.1576467 C9.52116165,6.56675314 9.11397414,5.60513307 8.11700238,5.60513307 C7.41791504,5.60513307 6.82814953,6.01272878 6.75715965,6.55275918 L6.75,6.66244953 L6.74194433,6.75232516 C6.69960837,6.98557437 6.49545989,7.16244953 6.25,7.16244953 C5.97385763,7.16244953 5.75,6.9385919 5.75,6.66244953 C5.75,5.44256682 6.87194406,4.60513307 8.11700238,4.60513307 Z"></path></svg></i>
                                                    </div>
                                                    <div className="information_more">Inventory quantity of the product</div>
                                                </div>
                                            </div>
                                            <div className="column_edit-shipping">
                                                <span>Delivery</span> 
                                            </div>
                                            <div className="status">
                                                <span>Status</span>
                                            </div>
                                            {itemshop.savemain?'':
                                            <div className="table-edit">
                                                <span>Action</span>
                                            </div>}
                                        </div>
                                    </div>
                                    <div className="table__body-container">
                                        <div className="item-shop">
                                            {currentitemPage.map(item=>
                                            <div>
                                                <div className={`item-discount ${itemshop.savemain && !item.enable?'disable':''}`}>
                                                    <div className="item_heading" style={{width:'440px'}}>
                                                        {itemshop.savemain?"":
                                                        <div className="item-center form-check-item">
                                                            <label className="checkbox item-selector">
                                                                <input checked={item.check?true:false} onChange={()=>setcheckitem(item,itemshop.items_choice,'items_choice')} type="checkbox" className="checkbox__input" value=""/> 
                                                                <span className="checkbox__indicator">
                                                                    <i className="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M4.03033009,7.46966991 C3.73743687,7.1767767 3.26256313,7.1767767 2.96966991,7.46966991 C2.6767767,7.76256313 2.6767767,8.23743687 2.96966991,8.53033009 L6.32804531,11.8887055 C6.62093853,12.1815987 7.09581226,12.1815987 7.38870548,11.8887055 L13.2506629,6.02674809 C13.5435561,5.73385487 13.5435561,5.25898114 13.2506629,4.96608792 C12.9577697,4.6731947 12.4828959,4.6731947 12.1900027,4.96608792 L6.8583754,10.2977152 L4.03033009,7.46966991 Z"></path></svg></i>
                                                                </span>
                                                            </label>
                                                        </div>}
                                                        <div className="item-center" >
                                                            <img src={item.item_image} alt="" width="52px" height="52px"/>
                                                            <div className="item_detail">
                                                                <div className="ellipsis-content">{item.item_name}</div>
                                                                <div className="product-sku"><span>SKU :</span> </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="table_main-header" style={{width:'800px'}}>
                                                        <div className="main-price">
                                                            ₫{formatter.format(item.item_min)} {item.item_min!=item.item_max?`- ${formatter.format(item.item_max)}`:''}
                                                        </div>
                                                        <div>{item.item_inventory}</div>
                                                        <div className="column_edit-shipping">{item.item_shipping}</div>
                                                        <div className="item-center status">
                                                            {itemshop.savemain?<span  className="status-desc">{item.enable?'On':"Off"}</span>:
                                                            <input type="checkbox" onChange={(e)=>setenableitem(e,item,itemshop.items_choice,'items_choice')} checked={item.enable?true:false}  className="switch_1 " name="check"/>
                                                            }
                                                        </div>
                                                        {itemshop.savemain?'':
                                                        <div className="table-edit">
                                                            <i onClick={()=>removeitem(item,'items',itemshop.items,'items_choice',itemshop.items_choice,currentPage.items)} className="trash-icon icon">
                                                                <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                                                    <g fillRule="nonzero"><path d="M14.516 3.016h-4v-1a.998.998 0 0 0-.703-.955.99.99 0 0 0-.297-.045h-3a.998.998 0 0 0-.955.703.99.99 0 0 0-.045.297v1h-4a.5.5 0 1 0 0 1h1v10a.998.998 0 0 0 .703.955.99.99 0 0 0 .297.045h9a.998.998 0 0 0 .955-.703.99.99 0 0 0 .045-.297v-10h1a.5.5 0 1 0 0-1zm-8-1h3v1h-3v-1zm6 12h-9v-10h9v10z"></path><path d="M5.516 12.016a.5.5 0 0 0 .5-.5v-4a.5.5 0 1 0-1 0v4a.5.5 0 0 0 .5.5zM8.016 12.016a.5.5 0 0 0 .5-.5v-5a.5.5 0 1 0-1 0v5a.5.5 0 0 0 .5.5zM10.516 12.016a.5.5 0 0 0 .5-.5v-4a.5.5 0 1 0-1 0v4a.5.5 0 0 0 .5.5z"></path></g>
                                                                </svg>
                                                            </i>
                                                        </div>}
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
                                                    onPageChange={(page,name) => handlePageChange(page,'items')}
                                                />
                                            </div>
                                            <div className="pagination-jumperpagination__part">
                                                <span className="pagination-jumper__label">Go to page</span>
                                                <div className="pagination-jumper__input">
                                                <div className="number-input  number-input--no-suffix">
                                                    <input onChange={(e)=>setState({...state,page_input:parseInt(e.target.value)})} type="text" value={state.page_input}  className="input_input"/>
                                                </div>
                                                <button onClick={()=>setpage(itemshop.items_choice,'items')} type="button" className="button btn-m btn-light "><span>Go</span></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {itemshop.savemain?"":
                                <div className="section-bottom">
                                    <button onClick={()=>save('savemain',true,'items_choice',itemshop.items_choice)} className="save-main-product btn-m btn-orange">Save</button>
                                </div>}
                            </div>
                            </> : <>               
                            <div className="card-title">Main product</div>
                            <div className="tips">The maximum amount of each customer can buy is 100 main products in the same program Shock Deal</div>
                            <div className="add-item">
                                {itemshop.saveitems?
                                <button onClick={()=>save('saveitems',false,'items_choice',itemshop.items_choice)} data-v-3b5d1a68="" type="button" className={`button button--link ${itemshop.byproduct_choice.length>0 && !itemshop.byproduct?"disable":''} button--normal`}>
                                    <i className="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M13.7698326,4.53553391 L11.6485122,2.41421356 L9.52719188,4.53553391 L11.6485122,6.65685425 L13.7698326,4.53553391 Z M10.9414054,7.36396103 L8.8200851,5.24264069 L2.71213203,11.3505938 L2.5,13.6840461 L4.83345238,13.4719141 L10.9414054,7.36396103 Z M12.355619,1.70710678 L14.4769394,3.82842712 C14.8674636,4.21895142 14.8674636,4.8521164 14.4769394,5.24264069 L5.54055916,14.1790209 C5.37514107,14.344439 5.1569639,14.4466277 4.92398812,14.4678073 L2.59053575,14.6799393 C2.04051912,14.7299408 1.55410831,14.3245985 1.50410679,13.7745819 C1.49863107,13.7143489 1.49863107,13.6537434 1.50410679,13.5935104 L1.71623883,11.260058 C1.73741844,11.0270822 1.83960716,10.8089051 2.00502525,10.643487 L10.9414054,1.70710678 C11.3319297,1.31658249 11.9650947,1.31658249 12.355619,1.70710678 Z"></path></svg></i>
                                    <span>Thay đổi</span>
                                </button>
                                :
                                <button onClick={(e)=>additem(e)} className="button--primary btn-m add-product item-center">
                                    <i className="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8.48176704,1.5 C8.75790942,1.5 8.98176704,1.72385763 8.98176704,2 L8.981,7.997 L15,7.99797574 C15.2761424,7.99797574 15.5,8.22183336 15.5,8.49797574 C15.5,8.77411811 15.2761424,8.99797574 15,8.99797574 L8.981,8.997 L8.98176704,15 C8.98176704,15.2761424 8.75790942,15.5 8.48176704,15.5 C8.20562467,15.5 7.98176704,15.2761424 7.98176704,15 L7.981,8.997 L2,8.99797574 C1.72385763,8.99797574 1.5,8.77411811 1.5,8.49797574 C1.5,8.22183336 1.72385763,7.99797574 2,7.99797574 L7.981,7.997 L7.98176704,2 C7.98176704,1.72385763 8.20562467,1.5 8.48176704,1.5 Z"></path></svg></i>
                                    <span className="ml-1_2">Add product</span>  
                                </button>
                                }
                            </div></>}     
                        </div>
                    
                        <div className="discount-info sub-item">
                            <div className="info__view">
                                <div className="item-spaces">
                                    {deal.shock_deal_type=='1'?<>
                                        <div className="card-title">Bundled products</div>
                                        <div className="tips">Buyers can enjoy discounted purchases when they purchase any major product.</div>
                                    </>:<>
                                        <div className="card-title">Gift</div>
                                        <div className="tips">Buyers can only receive gifts once per order.</div>
                                    </>
                                    }
                                    {itemshop.byproduct_choice.length>0?
                                    <div className="add-item">
                                    {itemshop.savebyproduct?
                                    <button onClick={()=>save('savebyproduct',false,'byproduct_choice',itemshop.byproduct_choice)} data-v-3b5d1a68="" type="button" className={`button button--link ${itemshop.items_choice.length>0 && !itemshop.savemain?"disable":''} button--normal`}>
                                        <i className="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M13.7698326,4.53553391 L11.6485122,2.41421356 L9.52719188,4.53553391 L11.6485122,6.65685425 L13.7698326,4.53553391 Z M10.9414054,7.36396103 L8.8200851,5.24264069 L2.71213203,11.3505938 L2.5,13.6840461 L4.83345238,13.4719141 L10.9414054,7.36396103 Z M12.355619,1.70710678 L14.4769394,3.82842712 C14.8674636,4.21895142 14.8674636,4.8521164 14.4769394,5.24264069 L5.54055916,14.1790209 C5.37514107,14.344439 5.1569639,14.4466277 4.92398812,14.4678073 L2.59053575,14.6799393 C2.04051912,14.7299408 1.55410831,14.3245985 1.50410679,13.7745819 C1.49863107,13.7143489 1.49863107,13.6537434 1.50410679,13.5935104 L1.71623883,11.260058 C1.73741844,11.0270822 1.83960716,10.8089051 2.00502525,10.643487 L10.9414054,1.70710678 C11.3319297,1.31658249 11.9650947,1.31658249 12.355619,1.70710678 Z"></path></svg></i>
                                        <span>Thay đổi</span>
                                    </button>:
                                    <button onClick={(e)=>addbyproduct(e)} className="button--primary btn-m add-product item-center">
                                        <i className="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8.48176704,1.5 C8.75790942,1.5 8.98176704,1.72385763 8.98176704,2 L8.981,7.997 L15,7.99797574 C15.2761424,7.99797574 15.5,8.22183336 15.5,8.49797574 C15.5,8.77411811 15.2761424,8.99797574 15,8.99797574 L8.981,8.997 L8.98176704,15 C8.98176704,15.2761424 8.75790942,15.5 8.48176704,15.5 C8.20562467,15.5 7.98176704,15.2761424 7.98176704,15 L7.981,8.997 L2,8.99797574 C1.72385763,8.99797574 1.5,8.77411811 1.5,8.49797574 C1.5,8.22183336 1.72385763,7.99797574 2,7.99797574 L7.981,7.997 L7.98176704,2 C7.98176704,1.72385763 8.20562467,1.5 8.48176704,1.5 Z"></path></svg></i>
                                        <span className="ml-1_2">Add product</span>  
                                    </button>}
                                    </div>:""}
                                </div>
                                {itemshop.savemain && itemshop.byproduct_choice.length==0?
                                <div className="add-item">
                                    <button onClick={(e)=>addbyproduct(e)} className="button--primary btn-m add-product item-center">
                                        <i className="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8.48176704,1.5 C8.75790942,1.5 8.98176704,1.72385763 8.98176704,2 L8.981,7.997 L15,7.99797574 C15.2761424,7.99797574 15.5,8.22183336 15.5,8.49797574 C15.5,8.77411811 15.2761424,8.99797574 15,8.99797574 L8.981,8.997 L8.98176704,15 C8.98176704,15.2761424 8.75790942,15.5 8.48176704,15.5 C8.20562467,15.5 7.98176704,15.2761424 7.98176704,15 L7.981,8.997 L2,8.99797574 C1.72385763,8.99797574 1.5,8.77411811 1.5,8.49797574 C1.5,8.22183336 1.72385763,7.99797574 2,7.99797574 L7.981,7.997 L7.98176704,2 C7.98176704,1.72385763 8.20562467,1.5 8.48176704,1.5 Z"></path></svg></i>
                                        <span className="ml-1_2">Add product</span>  
                                    </button>
                                </div>:itemshop.byproduct_choice.length>0?<>
                                <div className="search-input main-item-search">
                                    <div className="input-group item-center search-type">
                                        <div className="input-group__prepend " style={{width: '160px'}}>
                                            <div className="select-choices  item-center">
                                                <div className="selector-inner ">SKU product</div> 
                                                <div className="selector__suffix">
                                                    <i className="selector__suffix-icon icon">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M8,9.18933983 L4.03033009,5.21966991 C3.73743687,4.9267767 3.26256313,4.9267767 2.96966991,5.21966991 C2.6767767,5.51256313 2.6767767,5.98743687 2.96966991,6.28033009 L7.46966991,10.7803301 C7.76256313,11.0732233 8.23743687,11.0732233 8.53033009,10.7803301 L13.0303301,6.28033009 C13.3232233,5.98743687 13.3232233,5.51256313 13.0303301,5.21966991 C12.7374369,4.9267767 12.2625631,4.9267767 11.9696699,5.21966991 L8,9.18933983 Z"></path></svg>
                                                    </i>
                                                </div>
                                            </div>
                                            <div className="select__options">
                                                <div className="p-1_2">
                                                    <div className="variation-option">Product name</div>                                                    
                                                    <div className="variation-option">SKU product</div>                                                                                                         
                                                </div>
                                            </div> 
                                        </div> 
                                        <div className="input-group__append">
                                            <div className="search-input" style={{width:'300px'}}>
                                                <div className="item-center input-inner">
                                                    <input type="text" placeholder=" " clearable="true" resize="vertical" rows="2" minrows="2" restrictiontype="value" max="Infinity" min="-Infinity" className="input__input"/> 
                                                    <div className="input_suffix">
                                                        <i className="input__clear-btn icon">
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8,2 C11.3137085,2 14,4.6862915 14,8 C14,11.3137085 11.3137085,14 8,14 C4.6862915,14 2,11.3137085 2,8 C2,4.6862915 4.6862915,2 8,2 Z M10.5924919,5.27303573 C10.4094355,5.1521972 10.1606887,5.17236516 9.99956233,5.33352414 L9.99956233,5.33352414 L8.00023568,7.33325477 L6.00047136,5.33349045 C5.81628967,5.14930876 5.51767215,5.14930876 5.33349045,5.33349045 L5.33349045,5.33349045 L5.27301564,5.40754038 C5.1522078,5.59059052 5.17239885,5.83931011 5.33355782,6.00040399 L5.33355782,6.00040399 L7.33372614,7.99976432 L5.33352414,9.99956232 L5.33352414,9.99956232 L5.27306194,10.0735738 C5.15220491,10.2566181 5.17234775,10.5053668 5.33349045,10.6665095 L5.33349045,10.6665095 L5.40750807,10.7269643 C5.5905645,10.8478028 5.83931125,10.8276348 6.00043768,10.6664759 L6.00043768,10.6664759 L8.00023568,8.66627386 L9.99959601,10.6664422 L9.99959601,10.6664422 L10.0736337,10.726932 C10.2566595,10.8477768 10.5053831,10.827636 10.6665095,10.6665095 C10.8506912,10.4823279 10.8506912,10.1837103 10.6665095,9.99952864 L10.6665095,9.99952864 L8.66674523,7.99976432 L10.6664759,6.00043767 L10.6664759,6.00043767 L10.7269381,5.92642616 C10.8477951,5.74338194 10.8276522,5.49463316 10.6665095,5.33349045 L10.6665095,5.33349045 Z"></path></svg>
                                                        </i>
                                                        <div  className="search-btn">
                                                            <i  className="icon icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M6.994.994a6 6 0 014.584 9.87l3.28 3.28a.5.5 0 01-.639.764l-.069-.058-3.278-3.278A6 6 0 116.994.993zm0 1a5 5 0 100 10 5 5 0 000-10z"></path></svg>
                                                            </i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="section-header-tips">
                                    <p className="enabled">
                                    <span>{itemshop.byproduct_choice.filter(item=>item.list_variation.some(variation=>variation.enable)).length}</span> sản phẩm được bật, trên tổng <span>{itemshop.byproduct_choice.length}</span> sản phẩm</p>
                                </div>
                                {itemshop.savebyproduct?"":
                                <div className="item-spaces setting-item">
                                    <div className="batch-setting-panels">
                                        <div className="titles" style={{width: '160px'}}>Setting all</div>
                                        <div className="subtitle">Selected <strong>{itemshop.byproduct_choice.filter(item=>item.check).length}</strong> products</div>
                                    </div>
                                    {deal.shock_deal_type=='1'?<>
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
                                        <div className="mb-1">Limit order</div>
                                        <div className="input-inner">
                                            <input onChange={(e)=>setvariation(e,'limit_order')} value={state.limit_order==''?'':state.limit_order} type="text" className="form-select" placeholder={state.limit_order==''?`Không giới hạn`:""} style={{height:'30px'}}/>
                                        </div>
                                    </div>
                                    <div className="actions ml-2">
                                        <button onClick={(e)=>updatechoice(e)} className={`btn-m btn-light ${itemshop.byproduct_choice.some(item=>item.check)?"":'disable'}`}>
                                        <span>Update by choice</span>
                                        </button>
                                    </div>
                                    <div className="actions">
                                            <button onClick={(e)=>updateall(e)} className={`btn-m btn-light ${state.percent_discount>0?'':'disable'}`}>
                                            <span>Update all</span>
                                            </button>
                                    </div></>:""}
                                    <div className="item-center action-setting">
                                        <button onClick={(e)=>setenabledbychoice(e,false,'byproduct_choice',itemshop.byproduct_choice)} className={`btn-m ml-1 enabled-items ${itemshop.byproduct_choice.some(item=>item.check)?"":'disable'} btn-light`}>
                                            <span>Turn off</span>
                                        </button>
                                        <button onClick={(e)=>setenabledbychoice(e,true,'byproduct_choice',itemshop.byproduct_choice)} className={`btn-m ml-1 enabled-items ${itemshop.byproduct_choice.some(item=>item.check)?"":'disable'} btn-light`}>
                                            <span>Turn up</span>
                                        </button>
                                        <button onClick={()=>setdeletechoice('byproduct',itemshop.byproduct,'byproduct_choice',itemshop.byproduct_choice,currentPage.byproduct)} className={`btn-m ml-1 ${itemshop.byproduct_choice.some(item=>item.check)?"":'disable'} btn-light`}>
                                            <span>Delete</span>
                                        </button>
                                    </div>
                                </div>}
                                
                                <div className="table edit-table addon-table">
                                    <div className="table-header">
                                        <div className="product header-column_edit">
                                            {itemshop.savebyproduct?'':
                                            <label className={`checkbox checkbox ${byproductPage.some(item=>item.check) && !byproductPage.every(item=>item.check)?'indeterminate':''}`}>
                                                <input onChange={(e)=>setcheckall(e,byproductPage,'byproduct_choice',itemshop.byproduct_choice)}
                                                checked={byproductPage.every(item=>item.check)?true:false} 
                                                type="checkbox" className="checkbox__input"/> 
                                                <span className="checkbox__indicator">
                                                    <i className="icon">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">{byproductPage.some(item=>item.check) && !byproductPage.every(item=>item.check)?<path fillRule="evenodd" d="M3.75,7 L12.25,7 C12.6642136,7 13,7.33578644 13,7.75 C13,8.16421356 12.6642136,8.5 12.25,8.5 L3.75,8.5 C3.33578644,8.5 3,8.16421356 3,7.75 C3,7.33578644 3.33578644,7 3.75,7 Z"></path>:<path d="M4.03033009,7.46966991 C3.73743687,7.1767767 3.26256313,7.1767767 2.96966991,7.46966991 C2.6767767,7.76256313 2.6767767,8.23743687 2.96966991,8.53033009 L6.32804531,11.8887055 C6.62093853,12.1815987 7.09581226,12.1815987 7.38870548,11.8887055 L13.2506629,6.02674809 C13.5435561,5.73385487 13.5435561,5.25898114 13.2506629,4.96608792 C12.9577697,4.6731947 12.4828959,4.6731947 12.1900027,4.96608792 L6.8583754,10.2977152 L4.03033009,7.46966991 Z"></path>}</svg>
                                                    </i> 
                                                </span> 
                                            </label>}
                                            Phân Loại
                                        </div> 
                                        <div className="input-price header-column_edit">Giá Bán Hiện Tại</div>
                                        <div className="addon-price header-column_edit">Giá {deal.shock_deal_type=='1'?'Mua Kèm':'Gifts'}</div>  
                                        {deal.shock_deal_type=='1'?                
                                        <div className="addon-discount header-column_edit">
                                            Khuyến Mãi
                                        </div> :''}
                                        <div className="stock header-column_edit"><div className="custom-header-cell"><span className="cell-label">Số Lượng Hàng</span> <div className="cell-actions"> <div className="cell-action cell-info popover popover--light"><div className="popover__ref"><i className="table__cell-icon icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8,1 C11.8659932,1 15,4.13400675 15,8 C15,11.8659932 11.8659932,15 8,15 C4.13400675,15 1,11.8659932 1,8 C1,4.13400675 4.13400675,1 8,1 Z M8,2 C4.6862915,2 2,4.6862915 2,8 C2,11.3137085 4.6862915,14 8,14 C11.3137085,14 14,11.3137085 14,8 C14,4.6862915 11.3137085,2 8,2 Z M7.98750749,10.2375075 C8.40172105,10.2375075 8.73750749,10.5732939 8.73750749,10.9875075 C8.73750749,11.401721 8.40172105,11.7375075 7.98750749,11.7375075 C7.57329392,11.7375075 7.23750749,11.401721 7.23750749,10.9875075 C7.23750749,10.5732939 7.57329392,10.2375075 7.98750749,10.2375075 Z M8.11700238,4.60513307 C9.97011776,4.60513307 10.7745841,6.50497267 9.94298079,7.72186504 C9.76926425,7.97606597 9.56587088,8.14546785 9.27050506,8.31454843 L9.11486938,8.39945305 L8.95824852,8.47993747 C8.56296349,8.68261431 8.49390831,8.75808648 8.49390831,9.0209925 C8.49390831,9.29713488 8.27005069,9.5209925 7.99390831,9.5209925 C7.71776594,9.5209925 7.49390831,9.29713488 7.49390831,9.0209925 C7.49390831,8.34166619 7.7650409,7.99681515 8.35913594,7.6662627 L8.76655168,7.45066498 C8.9424056,7.3502536 9.04307851,7.26633638 9.11735517,7.1576467 C9.52116165,6.56675314 9.11397414,5.60513307 8.11700238,5.60513307 C7.41791504,5.60513307 6.82814953,6.01272878 6.75715965,6.55275918 L6.75,6.66244953 L6.74194433,6.75232516 C6.69960837,6.98557437 6.49545989,7.16244953 6.25,7.16244953 C5.97385763,7.16244953 5.75,6.9385919 5.75,6.66244953 C5.75,5.44256682 6.87194406,4.60513307 8.11700238,4.60513307 Z"></path></svg></i></div> <div className="popper popover__popper popover__popper--light with-arrow" style={{display: 'none', maxWidth: '320px'}}><div className="popover__content">Số lượng tồn kho của sản phẩm.</div></div></div></div></div></div>  <div className="shipping header-column_edit">
                                            Vận chuyển
                                        </div> 
                                        {deal.shock_deal_type=='1'? 
                                        <div className="purchase-limit header-column_edit">
                                            Giới hạn đặt hàng
                                        </div> :''}
                                        <div className="status header-column_edit">
                                            Trạng thái
                                        </div> 
                                        {itemshop.savebyproduct?'':
                                        <div className="action header-column_edit">
                                            Hoạt động
                                        </div>}
                                    </div>
                                    <div className={`table-body ${deal.shock_deal_type=='1'?'':'gift_table'}`}>
                                        {byproductPage.map(item=>
                                        <div className="sub-edit-item">
                                            <div className="outer-rows">
                                                <div className="product item header-column_edit">
                                                    {itemshop.savebyproduct?'':
                                                    <label className="checkbox checkbox">
                                                        <input type="checkbox" checked={item.check?true:false} onChange={()=>setcheckitem(item,itemshop.byproduct_choice,'byproduct_choice')} className="checkbox__input" value=""/> 
                                                        <span className="checkbox__indicator">
                                                            <i className="icon">
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M4.03033009,7.46966991 C3.73743687,7.1767767 3.26256313,7.1767767 2.96966991,7.46966991 C2.6767767,7.76256313 2.6767767,8.23743687 2.96966991,8.53033009 L6.32804531,11.8887055 C6.62093853,12.1815987 7.09581226,12.1815987 7.38870548,11.8887055 L13.2506629,6.02674809 C13.5435561,5.73385487 13.5435561,5.25898114 13.2506629,4.96608792 C12.9577697,4.6731947 12.4828959,4.6731947 12.1900027,4.96608792 L6.8583754,10.2977152 L4.03033009,7.46966991 Z"></path></svg>
                                                            </i> 
                                                        </span> 
                                                    </label> }
                                                    <img src={item.item_image} alt="" className="product-preview"/> 
                                                    <div className="product-info">
                                                        <div className="name-wrapper">
                                                            <div className="tooltip popover popover--dark">
                                                                <div className="popover__ref">
                                                                    <span className="name">{item.item_name}</span>
                                                                </div> 
                                                                <div className="popper popover__popper popover__popper--dark tooltip__popper" style={{display: 'none', maxWidth: '320px'}}>
                                                                    <div className="popover__content">{item.item_name}</div>
                                                                </div>
                                                            </div>
                                                        </div> 
                                                    </div>
                                                </div> 
                                                {itemshop.savebyproduct?"":
                                                <div className="action header-column_edit">
                                                    <span>
                                                        <button onClick={()=>removeitem(item,'byproduct',itemshop.byproduct,'byproduct_choice',itemshop.byproduct_choice,currentPage.byproduct)} type="button" className="action-del button button--normal button--circle">
                                                            <i className="icon trash-icon">
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M2,4 C1.72385763,4 1.5,3.77614237 1.5,3.5 C1.5,3.22385763 1.72385763,3 2,3 L6,2.999 L6,2 C6,1.44771525 6.44771525,1 7,1 L10,1 C10.5522847,1 11,1.44771525 11,2 L11,2.999 L15,3 C15.2761424,3 15.5,3.22385763 15.5,3.5 C15.5,3.77614237 15.2761424,4 15,4 L14,4 L14,14 C14,14.5522847 13.5522847,15 13,15 L4,15 C3.44771525,15 3,14.5522847 3,14 L3,4 L2,4 Z M13,4 L4,4 L4,14 L13,14 L13,4 Z M6.5,7 C6.77614237,7 7,7.22385763 7,7.5 L7,11.5 C7,11.7761424 6.77614237,12 6.5,12 C6.22385763,12 6,11.7761424 6,11.5 L6,7.5 C6,7.22385763 6.22385763,7 6.5,7 Z M8.5,6 C8.77614237,6 9,6.22385763 9,6.5 L9,11.5 C9,11.7761424 8.77614237,12 8.5,12 C8.22385763,12 8,11.7761424 8,11.5 L8,6.5 C8,6.22385763 8.22385763,6 8.5,6 Z M10.5,7 C10.7761424,7 11,7.22385763 11,7.5 L11,11.5 C11,11.7761424 10.7761424,12 10.5,12 C10.2238576,12 10,11.7761424 10,11.5 L10,7.5 C10,7.22385763 10.2238576,7 10.5,7 Z M10,2 L7,2 L7,2.999 L10,2.999 L10,2 Z"></path></svg>
                                                            </i>
                                                        </button>
                                                    </span>
                                                </div>}
                                            </div>
                                            <div className="inner-rows">
                                                {item.list_variation.map(variation=>
                                                <ul className="sub-edit-model inner-row">
                                                    <li className={`variation header-column_edit ${itemshop.savebyproduct?'save':''}`}>
                                                        <div className="tooltip popover popover--dark">
                                                            <div className="popover__ref">
                                                                <span  className="desc">{itemvariation(variation)}</span>
                                                            </div> 
                                                        </div>
                                                    </li> 
                                                    <li  className="input-price header-column_edit">
                                                        <div  className="input-price">₫{formatter.format(variation.price)}</div>
                                                    </li> 
                                                    {deal.shock_deal_type=='1'?
                                                    itemshop.savebyproduct?<>
                                                    <li data-v-42a890c0="" className="input-price header-column_edit">₫{formatter.format(variation.discount_price)}</li>
                                                    <li data-v-42a890c0="" className="addon-discount header-column_edit">
                                                        <div data-v-42a890c0="" className="tag tag__promotion tag--normal default">{variation.percent_discount}%GIẢM</div> 
                                                    </li></>:
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
                                                    </form>:<li className="addon-price header-column_edit gift">₫0</li>}
                                                    <li className="stock header-column_edit">{variation.inventory}</li> 
                                                    <li className={`shipping header-column_edit ${itemshop.savebyproduct?'save':''}`}>
                                                        <div className="tooltip warning-tip popover popover--dark">
                                                            <div className="popover__ref"><span  className="desc">Nhanh</span></div> 
                                                                <div className="popper popover__popper popover__popper--dark tooltip__popper" style={{display: 'none', maxWidth: '320px'}}>
                                                                <div className="popover__content">Nhanh</div>
                                                            </div>
                                                        </div>
                                                    </li> 
                                                    {deal.shock_deal_type=='1'?
                                                    <li  className="purchase-limit header-column_edit">
                                                        <div data-v-3a502cb8=""  className="input purchase-limit-input">
                                                            {itemshop.savebyproduct?variation.limit_order==''?"Unlimit":variation.limit_order:
                                                            <div className="input__inner input__inner--normal">
                                                                <input value={variation.limit_order} type="text" placeholder={variation.limit_order==''?'Không giới hạn':variation.limit_order} resize="vertical" rows="2" minrows="2" restrictiontype="value" max="Infinity" min="-Infinity" className="input__input"/> 
                                                            </div>}
                                                        </div>
                                                    </li> :''}
                                                    <li className="status header-column_edit">
                                                        {itemshop.savebyproduct?variation.enable?'On':"Off":
                                                        <input type="checkbox" onChange={(e)=>setenableby(e,variation,item)} checked={variation.enable?true:false}  className="switch_1 " name="check"/>
                                                        }
                                                    </li>
                                                    {itemshop.savebyproduct?'':
                                                    <li className="action header-column_edit"></li>}
                                                </ul>)}
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
                                {itemshop.savebyproduct?'':
                                <div className="section-bottom">
                                    <button onClick={()=>save('savebyproduct',true,'byproduct_choice',itemshop.byproduct_choice)} className="save-by btn-m btn-orange">Save</button>
                                </div>}
                            
                            </>:'' 
                            }
                            </div>
                            {deal.shock_deal_type=='1' && list_enable_on.lengt>0 && itemshop.items_choice.filter(item=>item.enable).length>0?
                            <>
                            <div onClick={()=>setState({...state,show:!state.show})} className={`foldline-container fold ${state.show?'show-up':''}`}>
                                <div className="line"></div> 
                                <div className="content">
                                    <span className="desc">Set up display of by-products</span> 
                                    <i className="icon icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M8,6.81066017 L11.9696699,10.7803301 C12.2625631,11.0732233 12.7374369,11.0732233 13.0303301,10.7803301 C13.3232233,10.4874369 13.3232233,10.0125631 13.0303301,9.71966991 L8.53033009,5.21966991 C8.23743687,4.9267767 7.76256313,4.9267767 7.46966991,5.21966991 L2.96966991,9.71966991 C2.6767767,10.0125631 2.6767767,10.4874369 2.96966991,10.7803301 C3.26256313,11.0732233 3.73743687,11.0732233 4.03033009,10.7803301 L8,6.81066017 Z"></path></svg>
                                    </i>
                                </div> 
                                <div className="line"></div>
                            </div>
                            <div>
                                <div className="product-order products-order" style={{display:`${state.show?"block":'none'}`}}>
                                    <div className="section-container showPreview">
                                        <div className="section-titles">
                                            <div className="title">Order of Display of Bundled Products</div> 
                                            <div className="tips">You can reorder your bundled products. The first 2 products will be displayed on the main product page in the App and the first 4 will be displayed on the PC.</div>
                                        </div>
                                    </div>
                                    <div className="display-container">
                                        <div className="table-box">
                                            <div className="display-order-table">
                                                <div className="display-order-header">
                                                    <div className="display-item-name">Product name</div>
                                                    <div className="display-item-price">Promotion price</div>
                                                    <div className="display-item-sales">Sold</div>
                                                    <div className="display-item-action">Arrange</div>
                                                </div>
                                                <div className="display-order-body">
                                                    
                                                        
                                                        {list_enable_on.map(item=>
                                                        <div className="display-order-row">
                                                            <div className="display-order-inner-row">
                                                                <div className="display-item-name">
                                                                    <img className="display-item-img" src={item.item_image} alt="" width="36px" height="36px"/>
                                                                    <div className="product-name">{item.item_name}</div>
                                                                </div>
                                                                <div className="display-item-price">
                                                                    <div className="display-item-price-discount">₫{formatter.format(get_percent_discount(item).discount_price)}</div>
                                                                    <div className="display-item-price-origin">₫{formatter.format(get_percent_discount(item).price)}</div>
                                                                </div>
                                                                <div className="display-item-sales">{item.num_order}</div>
                                                                <div className="display-item-action">
                                                                    <div className=" sort-btn-item popover popover--dark">
                                                                        <div className="popover__ref">
                                                                            <button type="button" className="sort-top-btn  button--circle " delay="1000">
                                                                                <i className="icon"><svg xmlns="http://www.w3.org/2000/svg"><path d="M7 3a.5.5 0 0 1 .398.197l4.905 4.907a.5.5 0 0 1-.707.707L7.5 4.715V15.5a.5.5 0 1 1-1 0V4.714L2.404 8.811a.5.5 0 0 1-.707-.707l4.905-4.907A.5.5 0 0 1 7 3zm6.5-3a.5.5 0 1 1 0 1H.5a.5.5 0 0 1 0-1h13z" fillRule="evenodd"></path></svg></i>
                                                                            </button>
                                                                        </div> 
                                                                        <div className="popper popover__popper popover__popper--dark __popper" style={{maxWidth: '280px', position: 'absolute', zIndex: 1, willChange: 'top, left', transformOrigin: 'center bottom', display: 'none', top: '60px', left: '660px'}} x-placement="top">
                                                                            <div className="popover__content">Move to the top</div>
                                                                        </div>
                                                                    </div> 
                                                                    <div className=" sort-btn-item popover popover--dark">
                                                                        <div className="popover__ref">
                                                                            <button type="button" className="sort-bottom-btn  button--circle" delay="1000">
                                                                                <i className="icon"><svg xmlns="http://www.w3.org/2000/svg"><path d="M7 13a.5.5 0 0 1-.398-.197L1.697 7.896a.5.5 0 0 1 .707-.707L6.5 11.285V.5a.5.5 0 1 1 1 0v10.786l4.096-4.097a.5.5 0 0 1 .707.707l-4.905 4.907A.5.5 0 0 1 7 13zM.5 16a.5.5 0 1 1 0-1h13a.5.5 0 0 1 0 1H.5z" fillRule="evenodd"></path></svg></i>
                                                                            </button>
                                                                        </div> 
                                                                        <div className="popper popover__popper popover__popper--dark __popper" style={{maxWidth: '280px', position: 'absolute', zIndex: 1, willChange: 'top, left', transformOrigin: 'center bottom', top: '14px', left: '652px', display: 'none'}} x-placement="top">
                                                                            <div className="popover__content">Scroll to the bottom</div>
                                                                        </div>
                                                                    </div> 
                                                                    <div className=" sort-btn-item popover popover--dark">
                                                                        <div onClick={()=>setdrag()} className="popover__ref">
                                                                            <button type="button" className="drag-btn  button--circle" delay="1000">
                                                                                <i className="icon"><svg xmlns="http://www.w3.org/2000/svg"><path d="M3.684 10.475a.5.5 0 0 1-.707.707l-2.86-2.86a.498.498 0 0 1-.114-.27v-.018A.139.139 0 0 1 0 8l.003-.034.002-.018L0 8c0-.123.044-.235.118-.322l2.859-2.86a.5.5 0 0 1 .707.707L1.708 7.5h5.791V1.711L5.525 3.686a.5.5 0 0 1-.707-.707L7.612.184a.499.499 0 0 1 .776 0l2.794 2.795a.5.5 0 1 1-.707.707L8.499 1.71V7.5h5.79l-1.975-1.975a.5.5 0 1 1 .707-.707l2.795 2.794a.499.499 0 0 1 0 .776l-2.795 2.794a.5.5 0 1 1-.707-.707L14.288 8.5H8.499v5.791l1.976-1.975a.5.5 0 1 1 .707.707l-2.86 2.86a.502.502 0 0 1-.034.026l-.007.002a.463.463 0 0 1-.191.08l-.04.005A.9.9 0 0 1 8 16l-.04-.004h-.011L8 16a.498.498 0 0 1-.282-.087v-.002a.258.258 0 0 1-.04-.029l-2.86-2.859a.5.5 0 1 1 .707-.707L7.5 14.29V8.5H1.71l1.975 1.975z" fillRule="evenodd"></path></svg></i>
                                                                            </button>
                                                                        </div> 
                                                                        <div onClick={()=>setdrag()} className="popper popover__popper popover__popper--dark __popper reorder-drag-popper" style={{maxWidth: '280px', position: 'absolute', zIndex: 1, willChange: 'top, left', transformOrigin: 'center bottom', display: 'none', top: '60px', left: '760px'}} x-placement="top">
                                                                            <div className="popover__content">Drag &amp; Drop</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        )}
                                                    
                                                </div>
                                            </div>
                                        </div>
                                        <div className="preview-box">
                                            <div className="preview-container">
                                                <div className="screen-box" style={{backgroundImage: `url(http://localhost:8000/media/my_web/edit_display_vn.9161c6c.png)`}}>
                                                    <div className="products">
                                                        <div className="product">
                                                            <div className="product-img">
                                                                <img src={itemshop.items_choice[0].item_image} alt="" className="product-preview"/>
                                                            </div> 
                                                            <p className="price-box">
                                                                <span className="price">₫{formatter.format(itemshop.items_choice[0].item_min)} {itemshop.items_choice[0].item_max!=itemshop.items_choice[0].item_min?`- ₫${formatter.format(itemshop.items_choice[0].item_max)}`:''}</span>
                                                            </p>
                                                        </div>
                                                        {list_enable_on.length>1?
                                                        <>
                                                            {list_enable_on.map((item,index)=>{
                                                                if(index<2){
                                                                    return(<>
                                                                        <div className="plus-split">+</div> 
                                                                        <div className="product">
                                                                            <div className="product-img">
                                                                                <img src={item.item_image} alt="" className="product-preview"/>
                                                                            </div>
                                                                            <p className="price-box"><span className="price">₫{formatter.format(get_percent_discount(item).discount_price)}</span></p>
                                                                            <p className="price-origin-box"><span className="price-origin">₫{formatter.format(get_percent_discount(item).price)}</span></p>
                                                                        </div></>
                                                                    )
                                                                }
                                                            }
                                                            )}
                                                        </>
                                                        :<>
                                                        {list_enable_on.map(item=>
                                                            <>
                                                            <div className="plus-split">+</div> 
                                                            <div className="product">
                                                                <div className="product-img">
                                                                    <img src={item.item_image} alt="" className="product-preview"/>
                                                                </div>
                                                                <p className="price-box"><span className="price">₫{formatter.format(get_percent_discount(item).discount_price)}</span></p>
                                                                <p className="price-origin-box"><span className="price-origin">₫{formatter.format(get_percent_discount(item).price)}</span></p>
                                                            </div></>
                                                        )}
                                                        <div className="plus-split">+</div> 
                                                        <div className="product">
                                                            <div className="product-img empty">
                                                            </div> 
                                                            <p className="price-box"><span className="price"></span></p> 
                                                            <p className="price-origin-box">
                                                                <span className="price-origin"></span>
                                                            </p>
                                                        </div>
                                                        </>}
                                                     
                                                    </div> 
                                                    <div className="price-total">
                                                        <p className="price-box">
                                                            <span className="price">₫{formatter.format(itemshop.items_choice[0].item_min+get_price().total_discount)} {itemshop.items_choice[0].item_min!=itemshop.items_choice[0].item_max?` - ₫${formatter.format(itemshop.items_choice[0].item_min+get_price().total_discount)}`:""}</span>
                                                        </p> 
                                                        <p className="price-origin-box">
                                                            <span className="price-origin">₫{formatter.format(itemshop.items_choice[0].item_min+get_price().total_price)} {itemshop.items_choice[0].item_min!=itemshop.items_choice[0].item_max?` - ₫${formatter.format(itemshop.items_choice[0].item_min+get_price().total_price)}`:""}</span>
                                                        </p>
                                                    </div>
                                                </div> 
                                                <p className="desc">Preview</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </>:""}
                        </div>
                        <div className="bottom-card">
                            <div className="fix-container fixed-bottom">
                            <div className="action-button">
                                <button className="cancel btn-m btn-light">Cancel</button>
                                <button onClick={()=>complete()} className="submit btn-orange btn-m" type="button" >Submit</button>
                            </div>
                            </div>
                        </div>
                    </div>:''}
                </div>
            </div>
            <div id="modal">
                <Productoffer
                    showmain={show.items}
                    showbyproduct={show.byproduct}
                    loading={loading}
                    items={itemshop.items}
                    sec={state.timeSecond}
                    text={deal}
                    complete={state.complete}
                    items_choice={itemshop.items_choice}
                    byproduct={itemshop.byproduct}
                    byproduct_choice={itemshop.byproduct_choice}
                    setcheckitem={(item,product,keys)=>setcheckitem(item,product,keys)}
                    setcheckall={(e,items,keys,value,value_choice)=>setcheckall(e,items,keys,value,value_choice)}
                    submit={()=>submit()}
                    submitby={()=>submitby()}
                    setshow={(sho,name)=>setshow(sho,name)}
                />
            </div>
            <div id="mini-chat-embedded" style={{position: 'fixed', right: '8px', bottom: '0px', zIndex: 99999}}>
                <Message/>
            </div>    
        </>
    )
}
export default Detaildealshock
