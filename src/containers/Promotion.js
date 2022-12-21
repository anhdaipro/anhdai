
import axios from 'axios';

import Navbar from "./Navbar"
import React, {useState, useEffect,useCallback} from 'react'
import Variationitem from '../hocs/Promotion';
import { useParams,Link } from "react-router-dom";
import {promotionURL,addToCartURL} from "../urls"
import {formatter,} from "../constants"
import Message from "./Chat"
import { headers } from '../actions/auth';
const Promotion = () => {
    const { id } = useParams(); // <-- access id match param here
    const [state, setState] = useState({loading:false,products:[],combo_type:'1'});
    const [show,setShow]=useState(true)
    const [loading,setLoading]=useState(false)
    const [errow, setErrow] = useState(false);
    const [warring, setWarring] = useState(false);
    const [cartitem,setCartitem]=useState()
    const [variation, setVariation] = useState({data:null,
        count_size:0,count_color:0,size_id:0,color_id:0,variation_color:[],variation_size:[],
        count_variation:0,quantity:1})
    useEffect(() => {
      (async () => {
            const res=await axios(promotionURL+id,headers())
            let data=res.data
            setLoading(true)
            setState(data)
        })();
    }, [id]);

    const setshow = useCallback((es) => {
        setShow(es);
      }, [show]);
    
    const seterrow=useCallback((err)=>{
        setErrow(err);
      }, [errow]);

    const setwarring=useCallback((war)=>{
        setWarring(war);
      }, [warring]);
    
    const openvariation=(e,data)=>{
        e.preventDefault()
        e.stopPropagation()
        let count_variation=0
        if(data.sizes.length>0){
            count_variation+=1
        }
        if(data.colors.length>0){
            count_variation+=1
        }
        setVariation({...variation,count_variation:count_variation,data:data})
        if(data.colors.length==0&&data.sizes.length==0){
            let form =new FormData()
            form.append('item_id',data.id)
            form.append('quantity',1)
            axios.post(addToCartURL,form,headers())
            .then(res=>{
                setCartitem(res.data)
            })
        }
        else{
            setShow(true)
        }
    }
        
    return(
        <>
            <div  id="main">
                <div className="_193wCc">
                    <div className="item-col top container-wrapper">
                        <Navbar
                        cartitem={cartitem}
                        />
                    </div>
                    <div className="bundle-deal__wrapper">
                        {loading?
                        <div className="bundle-deal">
                            <div className="bundle-deal__head">
                                <div className="bundle-deal__head-icon">
                                    <svg height="26" viewBox="0 0 55 26" width="55"><g fill="#ffcbbb" fillRule="evenodd"><circle cx="11" cy="11" r="11"></circle><circle cx="22" cy="18" opacity=".608639" r="8"></circle><circle cx="49.5" cy="10.5" opacity=".608639" r="5.5"></circle></g></svg>
                                </div>
                                <div className="bundle-deal__title-container">
                                    <div className="bundle-deal__title">{state.combo_type=='1'?`Mua ${state.quantity_to_reduced} & giảm ${state.discount_percent}%`:state.combo_type=='2'?`Mua ${state.quantity_to_reduced} & giảm ₫${formatter.format(state.discount_price)}`:`Mua ${state.quantity_to_reduced} only ₫${formatter.format(state.price_special_sale)}`}</div>
                                </div>
                                <div className="bundle-deal__head-icon">
                                    <svg height="41" viewBox="0 0 55 41" width="55"><g fill="none" fillRule="evenodd" transform="matrix(-1 0 0 1 55 0)"><circle cx="11" cy="11" fill="#ffe1bb" r="11"></circle><circle cx="22" cy="18" fill="#ffcbbb" opacity=".608639" r="8"></circle><circle cx="49.5" cy="35.5" fill="#ffcbbb" opacity=".608639" r="5.5"></circle></g></svg>
                                </div>
                            </div>
                            <div className="bundle-deal__body">
                                <div className="bundle-deal__card-list">
                                    {state.products.map(item=>
                                        <div key={item.id} className='bundle-deal__card'>
                                            <Link data-sqe="link" to={`/${item.url}?itemId=${item.id}`}>
                                                <div className="_1C-0ut">
                                                    <div className="_1gZS6z">
                                                        <div className="_25_r8I ggJllv">
                                                            <img width="invalid-value" height="invalid-value" alt={item.name} className="_3-N5L6 _2GchKS" style={{objectFit: 'contain'}} src={item.image}/>
                                                            <div className="_39tdMd">
                                                                <div className="T_lEwS _1WH8c-" style={{color: 'rgb(242, 82, 32)'}}>
                                                                    <span className="_1OUheB">Yêu thích</span>
                                                                </div>
                                                            </div>
                                                            <div className="_3_Th2m">
                                                                <svg viewBox="0 0 20 20" enableBackground="new 0 0 20 20" className="svg-icon _2MJ96d icon-video-play2"><path d="m10 20c5.5228 0 10-4.4772 10-10 0-5.5228-4.4772-10-10-10-5.5228 0-10 4.4772-10 10 0 5.5228 4.4772 10 10 10z" clipRule="evenodd" fill-opacity=".5" fillRule="evenodd"></path><path d="m7 6.1263c0-0.55798 0.4141-0.78618 0.91986-0.50718l6.6976 3.8599c0.506 0.27899 0.506 0.73534 0 1.0143l-6.6976 3.8876c-0.50603 0.279-0.91986 0.0508-0.91986-0.5072v-7.7474z" fill="#fff"></path></svg>
                                                            </div>
                                                        </div>
                                                        <div className="_2x8wqR">
                                                            <div className="_3GAFiR">
                                                                <div className="ZG__4J">
                                                                    <div className="_10Wbs- _2STCsK _3IqNCf">{item.name}</div>
                                                                </div>
                                                            </div>
                                                            <div className="_13Jarb">
                                                                <div className="_EX7O3">
                                                                    <div className="zp9xm9 kNGSLn">
                                                                        <span className="_1y2DMk">₫</span>
                                                                        <span className="_3c5u7X">{item.min_price}</span>
                                                                        {item.min_price!=item.max_price?
                                                                        <>-
                                                                        <span className="_1y2DMk">₫</span>
                                                                        <span className="_3c5u7X">{item.max_price}</span></>
                                                                        :''}
                                                                    </div>
                                                                </div>
                                                                <div onClick={(e)=>openvariation(e,item)} className="_1cDeok">
                                                                    <div className="_3z_bMk">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className="_3toOwm"><path fillRule="evenodd" clipRule="evenodd" d="M0.5 2.49878H2.14326L3.99234 11.833C4.06191 12.1842 4.37002 12.4372 4.72804 12.4372H12.8281C13.167 12.4372 13.4638 12.2099 13.5522 11.8827L15.5194 4.59456C15.5802 4.36921 15.5327 4.1284 15.3908 3.94309C15.2488 3.75778 15.0287 3.64911 14.7953 3.64911H3.90029L3.49496 1.60304L3.37526 0.998779H2.75926H0.5V2.49878ZM5.34404 10.9372L4.19743 5.14911H13.816L12.2537 10.9372H5.34404ZM4.46721 15.0001C4.91991 15.0001 5.28689 14.6293 5.28689 14.1719C5.28689 13.7145 4.91991 13.3437 4.46721 13.3437C4.01451 13.3437 3.64752 13.7145 3.64752 14.1719C3.64752 14.6293 4.01451 15.0001 4.46721 15.0001ZM12.651 15.0001C13.1037 15.0001 13.4707 14.6293 13.4707 14.1719C13.4707 13.7145 13.1037 13.3437 12.651 13.3437C12.1983 13.3437 11.8313 13.7145 11.8313 14.1719C11.8313 14.6293 12.1983 15.0001 12.651 15.0001Z" fill="white"></path></svg>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" className="c9kS2Y"><path fillRule="evenodd" clipRule="evenodd" fill="#EE4D2D" d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"></path></svg>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                        )}
                                </div>
                            </div>
                        </div>:''}
                    </div>
                </div>
                <div>
                    {warring?
                    <div className="action-toast">
                        <div className="toast">
                            <div className="toast__container">
                            <div className="toast__icon">
                                <div className="action-toast__icon">
                                    {errow?<svg enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className="svg-icon icon-exclamation-mark"><g><path d="m7.5 10.6c.6 0 1-.5 1-1.1v-8.3c0-.6-.4-1.1-1-1.1s-1 .5-1 1.1v8.3c0 .6.4 1.1 1 1.1z"></path><circle cx="7.5" cy="13.4" r="1.5"></circle></g></svg>:
                                    <svg enableBackground="new 0 0 12 12" viewBox="0 0 12 12" x="0" y="0" className="svg-icon icon-tick-bold"><g><path d="m5.2 10.9c-.2 0-.5-.1-.7-.2l-4.2-3.7c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l3.4 3 5.1-7c .3-.4 1-.5 1.4-.2s.5 1 .2 1.4l-5.7 7.9c-.2.2-.4.4-.7.4 0-.1 0-.1-.1-.1z"></path></g></svg>} 
                                </div>
                            </div>
                            <div className="toast__text">{errow?'Vui lòng chọn phân loại hàng trước.':'Sản phẩm đã được thêm vào Giỏ hàng'}</div>
                            </div>
                        </div>
                    </div>
                    :''}
                </div>
            </div>
            <div id="modal">
                {variation.data?
                <Variationitem
                    data={variation.data}
                    count_variation={variation.count_variation}
                    show={show}
                    setshow={es=>setshow(es)}
                    setcartitem={data=>setCartitem(data)}
                    seterrow={err=>seterrow(err)}
                    setwarring={war=>setwarring(war)}
                />:''}
            </div>
           
        </>
    )
}

export default Promotion