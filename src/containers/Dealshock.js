import axios from 'axios';
import Navbar from "./Navbar"
import React, {useState, useEffect} from 'react'
import { useParams,Link,useNavigate } from "react-router-dom";
import Message from "./Chat"
import { headers} from '../actions/auth';
import {localhost,threadlURL,dealURL,addToCartBatchURL,updatecartURL,} from "../urls"
import {formatter,itemvariation} from "../constants"


const Dealshock = () => {
    let navigate = useNavigate();
    const { id } = useParams(); // <-- access id match param here
    const {deal_id}=useParams()
    const [state, setState] = useState({loading:false,items:[]});
    const [waring, setWaring] = useState({warring:false})
    const [variation, setVariation] = useState({count_size:0,count_color:0,size_id:0,color_id:0,variation_color:[],variation_size:[],count_variation:0,product_id:0})
    useEffect(() => {
      const getJournal = async () => {
        await axios(`${dealURL}/${id}`,headers)
         // <-- passed to API URL
        .then(res=>{
          let data=res.data
            setState({...state,items:data.list_product,loading:true,deal_id:data.deal_id,cartitem_id:data.cartitem_id})
        })
      }
      getJournal();
    }, [id]);

    function setcolor(e,item){ 
        e.target.classList.toggle('product-variation--selected')
        if(e.target.classList.contains('product-variation--selected')){
            setVariation({...variation,color_id:item.id,variation_color:item.variation,count_color:1})
        }
        else{
            setVariation({...variation,color_id:0,variation_color:[],count_color:0})
        }
      }
    function setsize(e,item){
        e.target.classList.toggle('product-variation--selected')
        if(e.target.classList.contains('product-variation--selected')){
            setVariation({...variation,size_id:item.id,variation_size:item.variation,count_size:1})
        }
        else{
            setVariation({...variation,size_id:0,variation_size:[],count_size:0})
        }
    }

    
    const addtocart=(e,data)=>{
        let url=new URL(addToCartBatchURL)
        let search_params=url.searchParams
        search_params.append('item_id',data.item_id)
        if(variation.size_id!=0){
            search_params.set('size_id',variation.size_id)
        }
        if(variation.color_id!=0){
            search_params.set('color_id',variation.color_id)
        }
        
        url.search = search_params.toString();
        let new_url = url.toString();
        axios.get(new_url)
        .then(res => { 
            const list_item=state.items.map(item=>{
                if(item.item_id==data.item_id){
                    return{...item,product_id:res.data.product_id,price:res.data.price,discount_price:res.data.discount_price,
                    size_value:res.data.size_value,color_value:res.data.color_value,
                    inventory:res.data.inventory,show:false,check:true
                    }
                }
                else{
                    return{...item}
                }
            })
            setState({...state,items:list_item})
        }) 
    }

    const add=(e,data)=>{
        e.stopPropagation()
        data.quantity+=1
        adjust(e,data)
    }

    const minus=(e,data)=>{
        e.stopPropagation()
        data.quantity-=1
        adjust(e,data)
    }
    
    function adjust(e,data){
        const list_item=state.items.map(item=>{
            if(item.item_id==data.item_id){
                return {...item,quantity:data.quantity}
            }
            else{
                return{...item}
            }
        })
        setState({...state,items:list_item})
    }

    const check_variation=(e,data)=>{
        e.stopPropagation()
        const list_item=state.items.map(item=>{
            if (item.item_id==data.item_id){
                if(item.product_id!=undefined ){
                    return {...item, check: !data.check};
                }
                else{
                    return {...item,check: !item.check,show:!item.show}; 
                }
            }
            else{
                return {...item}; 
            }
        })
        setState({...state,items:list_item})
        if(data.product_id==undefined){
            open_variation(e,data)
        }
    }
    function variationitem(e,data){
        const list_items=state.items.map(item=>{
            if (item.item_id==data.item_id){
                return {...item, show: !item.show};
            }
            else{
                return {...item, show: false}; 
            }
        })
        setState({...state,items:list_items})
        open_variation(e,data)
        window.onclick=(event)=>{
            let parent=event.target.closest('.stardust-popover__popover.stardust-popover__popover--show')
            let check=event.target.closest('._3sIKhY')
            if(!e.target.contains(event.target) && !parent && !check){
                const list_item=state.items.map(item=>{
                    return {...item, show: false}
                })
                setState({...state,items:list_item})
                setVariation({...variation,color_id:0,variation_color:[],size_id:0,variation_size:[],count_variation:0,count_color:0,count_size:0})
            }
        }
    }

    function open_variation(e,data){
        let color_id=0
        let size_id=0
        let count_variation=0
        let count_size=0
        let count_color=0
        let variation_color=[]
        let variation_size=[]
        if(data.sizes.length>0){
            count_variation+=1
        }
        if(data.colors.length>0){
            count_variation+=1
        }
        if(data.size_value!=''){
            count_size=1
        }
        if(data.color_value!=''){
            count_color=1
        }

        for(let i in data.colors){
            if(data.color_value==data.colors[i].value){
                color_id=data.color[i].id
                variation_color=data.color[i].variation
            }
        } 
        for(let i in data.size){
            if(data.size_value==data.size[i].value){
                size_id=data.size[i].id
                variation_size=data.size[i].variation
            }
        }
        setVariation({...variation,color_id:color_id,variation_color:variation_color,size_id:size_id,variation_size:variation_size,count_variation:count_variation,count_color:count_color,count_size:count_size})
    }

    const addtocartbatch=(e)=>{
        e.stopPropagation()
        const main_product=state.items.find(item=>item.main)
        const byproducts=state.items.filter(item=>!item.main).map(item=>{
            return({byproduct_id:item.byproduct_id,quantity:main_product.quantity,check:item.check,
            product_id:item.product_id})
        })
        const data={cartitem_id:state.cartitem_id,deal_id:state.deal_id,
        product_id:main_product.product_id,quantity:main_product.quantity,
        byproducts:byproducts,item_id:main_product.item_id}
        
        axios.post(addToCartBatchURL,JSON.stringify(data),headers)
        .then(resp => {
            
        })
    }

    function infoitem(data){
        return(
        <div>
            <section className="_5e65mA" id={`${data.main?`${data.id} mainitem`:''}`}>
                <div className="_3sIKhY">
                    <label onChange={(e)=>check_variation(e,data)} className={`stardust-checkbox _1elx1R ${data.main?'disable':''} ${data.check?'stardust-checkbox--checked':''}`}>
                        <input  checked={data.check?true:false} className="stardust-checkbox__input" type="checkbox"/>
                        <div className="stardust-checkbox__box"></div>
                    </label>
                    
                    <Link className="_2WnPtj" to={`${data.item_url}?itemId=${data.item_id}`}>
                        <img className="_2QpYlF" src={`${data.item_image}`}/>
                    </Link >
                    <div className="q7k-yX">
                        <p className="_2eCTrn">{data.item_name}</p>
                    </div>
                    <div className="stardust-popover _348Lnr" id="stardust-popover5">
                        {data.colors.length==0&&data.sizes.length==0?
                        '':
                        <div onClick={(e)=>variationitem(e,data)} className="stardust-popover__target">
                            <section className="_1ZJFg-">
                                <p className="_3xmRCz">Phân loại hàng: <span className={`_2gAeVA ${data.show?'_2zsvOt':''}`}></span></p>
                                <p className={`_3xwsg0 ${itemvariation(data)==''?'_3yv-rn':''}`}>{itemvariation(data)!=''?itemvariation(data):'Chọn loại hàng'}</p>
                            </section>
                        </div>}
                        {data.show?
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
                                                    <button key={item.id} onClick={(e)=>setcolor(e,item)} className={`product-variation ${variation.variation_size.length>0?`${item.variation.some(r=> variation.variation_size.includes(r))?'':'disable'}`:''} ${item.id==variation.color_id?'product-variation--selected':''}`} aria-label={item.value}>{item.value}
                                                        {variation.color_id==item.id?
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
                                                    <button key={item.value} onClick={(e)=>setsize(e,item)} className={`product-variation ${variation.variation_color.length>0?`${item.variation.some(r=> variation.variation_color.includes(r))?'':' disable'}`:''}${item.id==variation.size_id?'product-variation--selected':''}`} aria-label={item.value}>{item.value}
                                                        {variation.size_id==item.id?
                                                        <div className="product-variation__tick">
                                                        <svg enableBackground="new 0 0 12 12" viewBox="0 0 12 12" x="0" y="0" className="svg-icon icon-tick-bold"><g><path d="m5.2 10.9c-.2 0-.5-.1-.7-.2l-4.2-3.7c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l3.4 3 5.1-7c .3-.4 1-.5 1.4-.2s.5 1 .2 1.4l-5.7 7.9c-.2.2-.4.4-.7.4 0-.1 0-.1-.1-.1z"></path></g></svg>
                                                        </div>
                                                        :''}
                                                    </button>
                                                )}
                                            </div>:''}
                                        </div>
                                        <div className="_270oIB">
                                            <button type="button" className="btn btn-light btn--s btn--inline">Trở Lại</button>
                                            <button onClick={(e)=>addtocart(e,data)} type="button" className={`btn btn-solid-primary btn--s btn--inline ${variation.count_variation==variation.count_size+variation.count_color?'':'disable'}`}>Xác nhận</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>:''}
                    </div>
                </div>
                <div className="tZZGU7">
                    {data.get_deal?
                    <><p className="_3Y8VHD">₫{formatter.format(data.price)}</p></>:
                    <><p className="_2SppbF">₫{formatter.format(data.price)}</p>
                    <p className="_3Y8VHD">₫{formatter.format(data.price-data.discount_price)}</p></>}
                </div>
                <div className="_1c_C5d">
                    <div className="_3C0fR8 input-quantity">
                        <button onClick={(e)=>minus(e,data)} className="_3rtT2g ${disable=data.quantity==1?'_2kT4OF':''}">
                            <svg enableBackground="new 0 0 10 10" viewBox="0 0 10 10" x="0" y="0" className="svg-icon "><polygon points="4.5 4.5 3.5 4.5 0 4.5 0 5.5 3.5 5.5 4.5 5.5 10 5.5 10 4.5"></polygon></svg>
                        </button>
                        <input className="_3rtT2g _3ayKTG" type="text" role="spinbutton" aria-valuenow="1" value={data.quantity}/>
                        <button onClick={(e)=>add(e,data)} className="_3rtT2g">
                            <svg enableBackground="new 0 0 10 10" viewBox="0 0 10 10" x="0" y="0" className="svg-icon icon-plus-sign"><polygon points="10 4.5 5.5 4.5 5.5 0 4.5 0 4.5 4.5 0 4.5 0 5.5 4.5 5.5 4.5 10 5.5 10 5.5 5.5 10 5.5"></polygon></svg>
                        </button>
                    </div>
                </div>
            </section>
        </div>
        )
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
                                {state.items.map((item,i)=>{
                                    if(item.main==true){
                                        return(<>{infoitem(item)}</>)
                                        }
                                    }  
                                )}
                            </ul>
                            <div className="_1yRvoH">Tận hưởng nhiều ưu đãi hơn khi Mua thêm deal sốc</div>
                            <ul className="_1-rihf">
                                {state.items.map((item,i)=>{
                                    if(item.main==false){
                                    return(<>{infoitem(item)}</>)
                                    }
                                }
                                )}
                            </ul>
                            <fotter className="_3f-aPF _11tJdh">
                                <p>Đã chọn {state.items.filter(item=>item.check==true && item.main==false).length}/{state.items.filter(item=>item.main==false).length}</p>
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