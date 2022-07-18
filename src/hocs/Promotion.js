
import axios from 'axios';
import React, {useState, useEffect,memo} from 'react'
import {formatter,} from "../constants"
import { headers } from '../actions/auth';
import {addToCartURL} from "../urls"
const Variationitem=({show,data,count_variation,setshow,seterrow,setwarring})=>{
    const [state, setState] = useState({data:data,inventory:null,price:null,percent_discount:null,product_id:0});
    const [variation, setVariation] = useState({
        count_size:0,count_color:0,size_id:0,color_id:0,variation_color:[],variation_size:[],
        quantity:1})
    const minus=(e)=>{
        variation.quantity-=1
        setVariation({...variation,quantity:variation.quantity})
    }
    const add=(e)=>{
        variation.quantity+=1
        setVariation({...variation,quantity:variation.quantity})
    }
    
    const setcolor=(e,item)=>{ 
        e.preventDefault()
        e.target.classList.toggle('product-variation--selected')
        if(e.target.classList.contains('product-variation--selected')){
          setVariation({...variation,color_id:item.id,variation_color:item.variation,count_color:1})
        }
        else{
          setVariation({...variation,color_id:0,variation_color:[],count_color:0})
        }
        get_price(item,'color_id')
    }
    const setsize=(e,item)=>{
        e.target.classList.toggle('product-variation--selected')
        if(e.target.classList.contains('product-variation--selected')){
          setVariation({...variation,size_id:item.id,variation_size:item.variation,count_size:1})
          
        }
        else{
          setVariation({...variation,size_id:0,variation_size:[],count_size:0})
        }
        get_price(item,'size_id')
    }
    function get_price(item,name){
        setTimeout(function(){
            let variation_active=document.querySelectorAll('.product-variation--selected')
            if(variation_active.length>=count_variation){
            let url=new URL(addToCartURL)
            let search_params=url.searchParams
            search_params.append('item_id',state.data.item_id)
            if(variation.color_id!=0){
              search_params.set('color_id',variation.color_id)
            }
            if(variation.size_id!=0){
              search_params.set('size_id',variation.size_id)
            }
            search_params.set([name],item.id)
            url.search = search_params.toString();
            let new_url = url.toString();
            axios.get(new_url)
            .then(res => { 
                setState({...state,
                    product_id:res.data.id,inventory:res.data.inventory,
                    price:res.data.price,percent_discount:res.data.percent_discout})
            }) 
          }
          else{
            setState({...state,inventory:null,price:null,percent_discount:null,product_id:0});
          }
        },10)
    }
    
    const addtocart=(e)=>{
        setshow(true)
        setwarring(true)
        setTimeout(function(){
            setwarring(false)
        },2500)
        seterrow(true)
        let variation_active=document.querySelectorAll('.product-variation--selected')
        if(variation_active.length>=count_variation){
            seterrow(false)
            setwarring(true)
            let form =new FormData()
            form.append('id',state.product_id)
            form.append('item_id',state.data.item_id)
            form.append('quantity',variation.quantity) 
            axios.post(addToCartURL,form,headers)
            .then(res=>{
            let data=res.data
            setshow(false)
            setVariation({
                count_size:0,count_color:0,size_id:0,color_id:0,variation_color:[],variation_size:[],
                quantity:1})
            setState({data:data,inventory:null,price:null,percent_discount:null,product_id:0})
          })
        }  
    }

    return(
        <>
        {show?
       <div className="_2IJN-0">
            <div className="_1lzg0h">
                <div className="popup-form _2Sctso">
                    <div className="popup-form__main">
                        <div className="mlJd9h popup-form__main-container">
                            <div className="_3WGoff">
                                <h2 className="_1zFCl4">{data.name}</h2>
                                <div className="_1KT0Ub _15STwc">
                                    <div className="_2cH9zc" style={{display: 'none'}}>
                                        <div className="image-placeholder _2E6Dva">
                                            <svg enableBackground="new 0 0 54 61" viewBox="0 0 54 61" role="img" className="stardust-icon stardust-icon-Anhdai icon-tiny"><path stroke="none" d="M35.67,44.95 C35.34,47.70 33.67,49.91 31.09,51.01 C29.65,51.63 27.72,51.96 26.19,51.85 C23.81,51.76 21.57,51.18 19.50,50.12 C18.77,49.74 17.67,48.99 16.82,48.28 C16.61,48.10 16.58,47.99 16.73,47.78 C16.80,47.67 16.94,47.46 17.25,47.01 C17.71,46.34 17.76,46.26 17.81,46.18 C17.96,45.96 18.19,45.94 18.42,46.12 C18.45,46.14 18.45,46.14 18.47,46.16 C18.50,46.19 18.50,46.19 18.59,46.26 C18.68,46.33 18.74,46.37 18.76,46.39 C20.99,48.13 23.58,49.13 26.20,49.24 C29.84,49.19 32.46,47.55 32.93,45.03 C33.44,42.27 31.27,39.88 27.02,38.54 C25.69,38.13 22.33,36.78 21.71,36.42 C18.80,34.71 17.44,32.47 17.64,29.71 C17.93,25.88 21.49,23.03 25.98,23.01 C27.98,23.01 29.99,23.42 31.91,24.23 C32.60,24.52 33.81,25.18 34.23,25.50 C34.47,25.68 34.52,25.88 34.38,26.11 C34.31,26.24 34.18,26.44 33.91,26.87 L33.91,26.87 C33.55,27.44 33.54,27.46 33.46,27.59 C33.32,27.80 33.15,27.82 32.90,27.66 C30.84,26.28 28.55,25.58 26.04,25.53 C22.91,25.59 20.57,27.45 20.42,29.99 C20.38,32.28 22.09,33.95 25.80,35.22 C33.33,37.64 36.21,40.48 35.67,44.95 M26.37,5.43 C31.27,5.43 35.27,10.08 35.46,15.90 L17.29,15.90 C17.47,10.08 21.47,5.43 26.37,5.43 M51.74,17.00 C51.74,16.39 51.26,15.90 50.66,15.90 L50.64,15.90 L38.88,15.90 C38.59,8.21 33.10,2.08 26.37,2.08 C19.64,2.08 14.16,8.21 13.87,15.90 L2.07,15.90 C1.48,15.91 1.01,16.40 1.01,17.00 C1.01,17.03 1.01,17.05 1.01,17.08 L1.00,17.08 L2.68,54.14 C2.68,54.25 2.69,54.35 2.69,54.46 C2.69,54.48 2.70,54.50 2.70,54.53 L2.70,54.60 L2.71,54.61 C2.96,57.19 4.83,59.26 7.38,59.36 L7.38,59.37 L44.80,59.37 C44.81,59.37 44.83,59.37 44.85,59.37 C44.87,59.37 44.88,59.37 44.90,59.37 L44.98,59.37 L44.98,59.36 C47.57,59.29 49.67,57.19 49.89,54.58 L49.89,54.58 L49.90,54.54 C49.90,54.51 49.90,54.49 49.90,54.46 C49.90,54.39 49.91,54.33 49.91,54.26 L51.74,17.05 L51.74,17.05 C51.74,17.04 51.74,17.02 51.74,17.00"></path></svg>
                                        </div>
                                        <div className="center WlrGVu">
                                            <video data-dashjs-player="true" className="Wzsnw7" autoplay=""></video>
                                        </div>
                                    </div>
                                    <div className="_25_r8I">
                                        <div className="_3Q7kBy _2GchKS" style={{backgroundImage: `url(${data.image})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}}></div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="_22HL8L">
                                <div className="_1jDr2X">Giá</div>
                                <div className="_1qtz9c _3AQURl">{state.price!=null?
                                state.discount_percent!=0?`₫${formatter.format(state.price-state.price*state.percent_discount/100)}`:`₫${formatter.format(state.price)}`:data.min_price!=data.max_price?`₫${formatter.format(data.min_price)}-₫${formatter.format(data.max_price)}`:`₫${formatter.format(data.min_price)}`}</div>
                                {data.colors.length>0?
                                <>
                                <div className="zmmo4P">{data.colors[0].name}:</div>
                                <div className="_1qtz9c EXuKem">
                                    {data.colors.map(item=>
                                        <button onClick={(e)=>setcolor(e,item)} className={`product-variation ${variation.variation_size.length>0?`${item.variation.some(r=> variation.variation_size.includes(r))?'':'disable'}`:''} ${item.id==variation.color_id?'product-variation--selected':''}`} aria-label={item.value}>{item.value}
                                            {variation.color_id==item.id?
                                            <div className="product-variation__tick">
                                                <svg enableBackground="new 0 0 12 12" viewBox="0 0 12 12" x="0" y="0" className="svg-icon icon-tick-bold"><g><path d="m5.2 10.9c-.2 0-.5-.1-.7-.2l-4.2-3.7c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l3.4 3 5.1-7c .3-.4 1-.5 1.4-.2s.5 1 .2 1.4l-5.7 7.9c-.2.2-.4.4-.7.4 0-.1 0-.1-.1-.1z"></path></g></svg>
                                            </div>
                                        :''}
                                        </button>
                                    )}
                                </div>
                                <div className="D4ynUb"></div></>
                                :''}
                                {data.sizes.length>0?
                                <>
                                <div className="zmmo4P">{data.sizes[0].name}:</div>
                                <div className="_1qtz9c EXuKem">
                                    {data.sizes.map(item=>
                                        <button onClick={(e)=>setsize(e,item)} className={`product-variation ${variation.variation_color.length>0?`${item.variation.some(r=> variation.variation_color.includes(r))?'':'disable'}`:''} ${item.id==variation.size_id?'product-variation--selected':''}`} aria-label={item.value}>{item.value}
                                        {variation.size_id==item.id?
                                            <div className="product-variation__tick">
                                                <svg enableBackground="new 0 0 12 12" viewBox="0 0 12 12" x="0" y="0" className="svg-icon icon-tick-bold"><g><path d="m5.2 10.9c-.2 0-.5-.1-.7-.2l-4.2-3.7c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l3.4 3 5.1-7c .3-.4 1-.5 1.4-.2s.5 1 .2 1.4l-5.7 7.9c-.2.2-.4.4-.7.4 0-.1 0-.1-.1-.1z"></path></g></svg>
                                            </div>
                                        :''}
                                        </button>
                                    )}
                                </div>
                                <div className="D4ynUb"></div></>
                                :''}
                                <div className="_1I2URr">Số lượng:</div>
                                <div className="_1XKkWz">
                                    <div className="_16mL_A input-quantity">
                                        <button onClick={e=>minus(e)} className={`_2KdYzP ${variation.quantity==1?'disable':''}`}>
                                            <svg enableBackground="new 0 0 10 10" viewBox="0 0 10 10" x="0" y="0" className="svg-icon "><polygon points="4.5 4.5 3.5 4.5 0 4.5 0 5.5 3.5 5.5 4.5 5.5 10 5.5 10 4.5"></polygon></svg>
                                        </button>
                                        <input className="_2KdYzP iRO3yj" type="text" role="spinbutton" aria-valuenow="1" value={variation.quantity}/>
                                        <button onClick={e=>add(e)} className="_2KdYzP">
                                            <svg enableBackground="new 0 0 10 10" viewBox="0 0 10 10" x="0" y="0" className="svg-icon icon-plus-sign"><polygon points="10 4.5 5.5 4.5 5.5 0 4.5 0 4.5 4.5 0 4.5 0 5.5 4.5 5.5 4.5 10 5.5 10 5.5 5.5 10 5.5"></polygon></svg>
                                        </button>
                                    </div>
                                    <span className="_3VByTI">{state.inventory!=null?state.inventory:data.inventory} sản phẩm có sẵn</span>
                                </div>
                                <div className="_1LAmaq"></div>
                            </div>
                            <div className="_1Q2kEe">
                                <button type="button" onClick={()=>setshow(false)} className="btn btn-clear btn--l btn--inline _3K1Y8C">Trở Lại</button>
                                <button type="button" onClick={e=>addtocart(e)} className="btn btn-solid-primary btn--l btn--inline _3EvAvw" aria-disabled="false">
                                    <svg enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className="svg-icon _1UqtQa icon-add-to-cart"><g><g><polyline fill="none" points=".5 .5 2.7 .5 5.2 11 12.4 11 14.5 3.5 3.7 3.5" strokeLinecap="round" strokeLinejoin="round" stroke-miterlimit="10"></polyline><circle cx="6" cy="13.5" r="1" stroke="none"></circle><circle cx="11.5" cy="13.5" r="1" stroke="none"></circle></g><line fill="none" strokeLinecap="round" stroke-miterlimit="10" x1="7.5" x2="10.5" y1="7" y2="7"></line><line fill="none" strokeLinecap="round" stroke-miterlimit="10" x1="9" x2="9" y1="8.5" y2="5.5"></line></g></svg>
                                    <span>thêm vào giỏ hàng</span>
                                </button>
                            </div>     
                        </div>
                    </div>
                </div>
            </div>    
       </div>:''}
       </>
    )
}
export default memo(Variationitem);