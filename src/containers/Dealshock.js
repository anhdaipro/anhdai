import axios from 'axios';
import Navbar from "./Navbar"
import React, {useState, useEffect,useRef} from 'react'
import { useParams,Link,useNavigate } from "react-router-dom";
import Message from "./Chat"
import { headers} from '../actions/auth';
import {localhost,threadlURL,dealURL,addToCartBatchURL,updatecartURL, byproductdealURL,} from "../urls"
import {formatter,itemvariation} from "../constants"

const Infoitem=(props)=>{
    const {data,setlistitem,updatevariation}=props
    const [show,setShow]=useState(false)
    const [state,setState]=useState({page_no:1,size_id:null,color_id:null,variation_color:[],variation_size:[],count_variation:0,product_id:0,size_value:'',color_value:''})
    const itemref=useRef()
    const checkref=useRef()
    useEffect(() => {
        document.addEventListener('click', handleClick)
        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [])

    const handleClick = (event) => {
        const { target } = event
        if(itemref.current!=null){
            if (!itemref.current.contains(target) && !checkref.current.contains(target)) {
                setShow(false)
            }
        }
    }
    
    const  variation=(e)=>{
        const size=data.sizes.find(size=>size.value==data.size_value)
        const color=data.colors.find(color=>color.value==data.color_value)
        setState({...state,size_id:size?size.id:null,color_id:color?color.id:null,color_value:data.color_value,
            size_value:data.size_value,
            variation_color:color?color.variation:[],variation_size:size?size.variation:[],count_variation:data.count_variation,product_id:data.product_id})
    }
    
    const setcolor=(e,item)=>{ 
        e.target.classList.toggle('product-variation--selected')
        if(e.target.classList.contains('product-variation--selected')){
          setState({...state,color_id:item.id,variation_color:item.variation,color_value:item.value})  
        }
        else{
          setState({...state,color_id:null,variation_color:[],color_value:''})
        }
    }

    const setsize=(e,item)=>{
        e.target.classList.toggle('product-variation--selected')
        if(e.target.classList.contains('product-variation--selected')){
          setState({...state,size_id:item.id,variation_size:item.variation,size_value:item.value}) 
        }
        else{
          setState({...state,size_id:null,variation_size:[],size_value:''})
        }
    }
    return(
    <div key={data.id}>
        <section className="_5e65mA" id={`${data.main?`${data.id} mainitem`:''}`}>
            <div className="_3sIKhY">
                <label ref={checkref} onChange={(e)=>{
                    setlistitem(e,data,'check',!data.check)
                    if(!data.product_id){
                        setShow(!show)
                        variation(e)
                    }
                    }} className={`stardust-checkbox _1elx1R ${data.main?'disable':''} ${data.check?'stardust-checkbox--checked':''}`}>
                    <input  checked={data.check?true:false} className="stardust-checkbox__input" type="checkbox"/>
                    <div className="stardust-checkbox__box"></div>
                </label>
                <Link className="_2WnPtj" to={`${data.url}?itemId=${data.item_id}`}>
                    <img className="_2QpYlF" src={`${data.image}`}/>
                </Link >
                <div className="q7k-yX">
                    <p className="_2eCTrn">{data.name}</p>
                </div>
                <div ref={itemref} className="stardust-popover _348Lnr" id="stardust-popover5">
                    {data.colors.length==0&&data.sizes.length==0?
                    '':
                    <div onClick={(e)=>{
                        setShow(!show)
                        variation(e)
                        }} className="stardust-popover__target">
                        <section className="_1ZJFg-">
                            <p className="_3xmRCz">Phân loại hàng: <span className={`_2gAeVA ${data.show?'_2zsvOt':''}`}></span></p>
                            <p className={`_3xwsg0 ${itemvariation(data)==''?'_3yv-rn':''}`}>{itemvariation(data)!=''?itemvariation(data):'Chọn loại hàng'}</p>
                        </section>
                    </div>}
                    {show?
                    <div
                    className="stardust-popover__popover stardust-popover__popover--show stardust-popover__popover--border"
                    style={{top:'80px',right:'-120px'}}
                    >
                        <div className="stardust-popover__arrow" style={{top: '1px', left: '209.508px', transform: 'translate(-4px, -100%)', borderBottom: '10px solid rgba(0, 0, 0, 0.09)', borderLeft: '10px solid transparent', borderRight: '10px solid transparent'}}>
                            <div className="stardust-popover__arrow--inner" style={{borderBottom: '8px solid transparent', borderLeft: '8px solid transparent', borderRight: '8px solid transparent', bottom: '-10px'}}></div>
                        </div>
                        <div>
                            <div className="_3RMcd-">
                                <div className="_2AlHh9">
                                    <div className="_22Wxvt">
                                        {data.colors.length>0?
                                        <div className="NwiGnj">
                                            <div className="_3qC1Fg">{data.colors[0].name}:</div>
                                            {data.colors.map(item=>
                                                <button key={item.id} onClick={(e)=>setcolor(e,item)} className={`product-variation ${state.variation_size.length>0?`${item.variation.some(r=> state.variation_size.includes(r))?'':'disable'}`:''} ${item.id==state.color_id?'product-variation--selected':''}`} aria-label={item.value}>{item.value}
                                                    {state.color_id==item.id?
                                                    <div className="product-variation__tick">
                                                    <svg enableBackground="new 0 0 12 12" viewBox="0 0 12 12" x="0" y="0" className="svg-icon icon-tick-bold"><g><path d="m5.2 10.9c-.2 0-.5-.1-.7-.2l-4.2-3.7c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l3.4 3 5.1-7c .3-.4 1-.5 1.4-.2s.5 1 .2 1.4l-5.7 7.9c-.2.2-.4.4-.7.4 0-.1 0-.1-.1-.1z"></path></g></svg>
                                                    </div>
                                                    :''}
                                                </button>
                                            )}
                                        </div>:''}
                                        {data.sizes.length>0?
                                        <div className="NwiGnj">
                                            <div className="_3qC1Fg">{data.sizes[0].name}:</div>
                                            {data.sizes.map(item=>
                                                <button key={item.id} onClick={(e)=>setsize(e,item)} className={`product-variation ${state.variation_color.length>0?`${item.variation.some(r=> state.variation_color.includes(r))?'':' disable'}`:''}${item.id==state.size_id?'product-variation--selected':''}`} aria-label={item.value}>{item.value}
                                                    {state.size_id==item.id?
                                                    <div className="product-variation__tick">
                                                    <svg enableBackground="new 0 0 12 12" viewBox="0 0 12 12" x="0" y="0" className="svg-icon icon-tick-bold"><g><path d="m5.2 10.9c-.2 0-.5-.1-.7-.2l-4.2-3.7c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l3.4 3 5.1-7c .3-.4 1-.5 1.4-.2s.5 1 .2 1.4l-5.7 7.9c-.2.2-.4.4-.7.4 0-.1 0-.1-.1-.1z"></path></g></svg>
                                                    </div>
                                                    :''}
                                                </button>
                                            )}
                                        </div>:''}
                                    </div>
                                    <div className="_270oIB">
                                        <button onClick={(e)=>setShow(false)} type="button" className="btn btn-light btn--s btn--inline">Trở Lại</button>
                                        <button onClick={(e)=>{
                                            updatevariation(e,data,state.color_id,state.size_id)
                                            setShow(false)}} type="button"  className={`${(data.count_variation==2 && state.color_id&&state.size_id && (data.size_value!=state.size_value ||data.color_value!=state.color_value))|| (data.count_variation==1 &&  (state.color_id && state.color_value!=data.color_value|| state.size_id && state.size_value!=data.size_value))?'':'disable'} button-solid button-solid--primary`}>Xác nhận</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>:''}
                </div>
            </div>
            <div className="tZZGU7">
                {data.main || (!data.percent_discount && !data.product_id)?
                <><p className="_3Y8VHD">₫{formatter.format(data.product_id?data.price:((data.min_price+data.max_price)/2))}</p></>:
                <><p className="_2SppbF">₫{formatter.format(data.product_id?data.price:(data.min_price+data.max_price)/2)}</p>
                <p className="_3Y8VHD">₫{formatter.format(data.product_id?data.discount_price:((data.min_price+data.max_price)/2)*(1-data.percent_discount/100))}</p></>}
            </div>
            <div className="_1c_C5d">
                <div className="_3C0fR8 input-quantity">
                    <button disabled={data.quantity<=1?true:false} onClick={(e)=>setlistitem(e,data,'quantity',data.quantity-1)} className={`_3rtT2g ${data.quantity==1?'_2kT4OF':''}`}>
                        <svg enableBackground="new 0 0 10 10" viewBox="0 0 10 10" x="0" y="0" className="svg-icon "><polygon points="4.5 4.5 3.5 4.5 0 4.5 0 5.5 3.5 5.5 4.5 5.5 10 5.5 10 4.5"></polygon></svg>
                    </button>
                    <input onChange={(e)=>setlistitem(e,data,'quantity',isNaN(e.target.value)?data.quantity:e.target.value)} className="_3rtT2g _3ayKTG" type="text" role="spinbutton" aria-valuenow="1" value={data.quantity}/>
                    <button onClick={(e)=>setlistitem(e,data,'quantity',data.quantity+1)} className="_3rtT2g">
                        <svg enableBackground="new 0 0 10 10" viewBox="0 0 10 10" x="0" y="0" className="svg-icon icon-plus-sign"><polygon points="10 4.5 5.5 4.5 5.5 0 4.5 0 4.5 4.5 0 4.5 0 5.5 4.5 5.5 4.5 10 5.5 10 5.5 5.5 10 5.5"></polygon></svg>
                    </button>
                </div>
            </div>
        </section>
    </div>
    )
}

const Dealshock = () => {
    let navigate = useNavigate();
    const { id } = useParams(); // <-- access id match param here
    const { deal_id } = useParams();
    const [state, setState] = useState({loading:false,items:[]});
    const [items,setItems]=useState([])
    const [waring, setWaring] = useState({warring:false})
    const [loading, setLoading] = useState(false)
    const [cart_id,setCart_id]=useState()
    const [count,setCount]=useState(0)
    const [byproduct,setByproduct]=useState([])
    const [variation, setVariation] = useState({count_size:0,count_color:0,size_id:0,color_id:0,variation_color:[],variation_size:[],count_variation:0,product_id:0})
    useEffect(() => {
        (async()=>{
            const obj1=await axios.get(`${dealURL}/${deal_id}/${id}`,headers)
            const byproductcart=obj1.data.byproducts.map(item=>{
                return({...item,check:true,byproduct_id:item.id})
            })
            setLoading(true)
            setItems([...items,obj1.data.variation_choice,...byproductcart])
            setState({...state,loading:true,cartitem_id:obj1.data.cartitem_id})
            setCart_id(obj1.data.cartitem_id)
            const url= obj1.data.cartitem_id?axios.get(`${byproductdealURL}/${deal_id}?cart_id=${obj1.data.cartitem_id}`,headers):axios.get(`${byproductdealURL}/${deal_id}`,headers)
            const obj2=await url
            const byproductdeal=obj2.data.byproducts.map(item=>{
                return({...item,check:false,item_id:item.id,quantity:1,size_value:'',color_value:''})
            })
            setItems(current =>[...current,...byproductdeal])
            setCount(obj2.data.count)
        })()
    }, [deal_id,id]);

    useEffect(()=>{
        document.addEventListener('scroll',addItem)
        return () => {
            document.removeEventListener('scroll', addItem)
        }
    },[count,loading,cart_id,items.length])

    const addItem=()=>{
        (async()=>{
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
            if(count && clientHeight + scrollTop >= scrollHeight-300 && loading && items.length< count){
                setLoading(false)
                const url= cart_id?axios.get(`${byproductdealURL}/${deal_id}?cart_id=${cart_id}&offset=${items.length-1}`,headers):axios.get(`${byproductdealURL}/${deal_id}?offset=${items.length-1}`,headers)
                const res =await url
                const byproductdeal=res.data.byproducts.map(item=>{
                    return({...item,check:false,item_id:item.id,quantity:1,size_value:'',color_value:''})
                })
                setLoading(true)
                setItems(current=>[...current,...byproductdeal])
            }
        })()
    }
  
    const updatevariation=(e,itemchoice,color_id,size_id)=>{
        let url=new URL(addToCartBatchURL)
        let search_params=url.searchParams
        search_params.set('item_id',itemchoice.item_id)
        if(color_id){
            search_params.set('color_id',color_id)
        }
        if(size_id){
            search_params.set('size_id',size_id)
        }
        url.search = search_params.toString();
        let new_url = url.toString();
        axios.get(new_url,headers)
        .then(res=>{
            const listitem=items.map(item=>{
                if(item.item_id==itemchoice.item_id){
                    return({...item,...res.data,check:true})
                }
                return({...item})
            })  
            setItems(listitem)
        }) 
    }
    
    const setlistitem=(e,itemchoice,name,value)=>{
        const list_item=items.map(item=>{
            if(item.item_id==itemchoice.item_id){
                return {...item,[name]:value}
            }
            else{
                return{...item}
            }
        })
        setItems(list_item)
    }
    
    const addtocartbatch=(e)=>{
        e.stopPropagation()
        const main_product=items.find(item=>item.main)
        const byproducts=items.filter(item=>!item.main &&item.product_id).map(item=>{
            return({byproduct_id:item.byproduct_id,quantity:item.quantity!=''?item.quantity:1,check:item.check,
            product_id:item.product_id,item_id:item.item_id})
        })
        const data={cartitem_id:cart_id,deal_id:deal_id,action:'edit',
        product_id:main_product.product_id,quantity:main_product.quantity!=''?main_product.quantity:1,
        byproducts:byproducts,item_id:main_product.item_id}
        
        axios.post(addToCartBatchURL,JSON.stringify(data),headers)
        .then(resp => {
            
        })
    }

    return(
        <>
        <div id="main">
            <div className="item-col top container-wrapper">
                <Navbar/>
            </div>
            <div className="_2I6yhs">
                <section className="_1Ccsst theme--ofs">
                    {state.loading?
                    <div className="_2I6yhs">
                        <div className="_1Ccsst">
                            <div className="_2f8NBJ">
                                <p className="_3S-XY7">Mua thêm deal sốc</p>
                                <p className="_2u_uRt">Đơn giá</p>
                                <p className="aJVWq_">Số lượng</p>
                            </div>
                            <ul className="_1-rihf">
                                {items.map((item,i)=>{
                                    if(item.main){
                                        return(<>{<Infoitem
                                            data={item}
                                            updatevariation={(e,item,color_id,size_id)=>updatevariation(e,item,color_id,size_id)}
                                            setlistitem={(e,item,name,value)=>setlistitem(e,item,name,value)}
                                        />}</>)
                                        }
                                    }  
                                )}
                            </ul>
                            <div className="_1yRvoH">Tận hưởng nhiều ưu đãi hơn khi Mua thêm deal sốc</div>
                            <ul className="_1-rihf">
                                {items.map((item,i)=>{
                                    if(!item.main){
                                    return(<><Infoitem
                                        data={item}
                                        updatevariation={(e,item,color_id,size_id)=>updatevariation(e,item,color_id,size_id)}
                                        setlistitem={(e,item,name,value)=>setlistitem(e,item,name,value)}
                                    /></>)
                                    }
                                }
                                )}
                            </ul>
                            <fotter className="_3f-aPF _11tJdh">
                                <p>Đã chọn {items.filter(item=>item.check && !item.main).length}/{items.filter(item=>!item.main).length}</p>
                                <button onClick={e=>addtocartbatch(e)} type="button" className="btn btn-solid-primary btn--s btn--inline _35l9Gd gKaJLW" aria-disabled="false">OK</button>
                            </fotter>
                            <div className="_3DKXdq"></div>
                        </div>
                    </div>
                    :
                    <div className="_3BIslJ">
                        <div className="loading_item item-center">
                            <div className="ball"></div>
                            <div className="ball"></div>
                            <div className="ball"></div>
                        </div>
                    </div>}
                </section>
            </div>
        </div>  
            
        </>
    )
}

export default Dealshock