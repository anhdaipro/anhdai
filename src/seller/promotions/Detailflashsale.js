import axios from 'axios';
import React, {useState,useEffect} from 'react'
import { useParams} from "react-router-dom";
import Flashsaleinfo from "../../hocs/Flashsaleinfo"
import {detailflashsaleURL} from "../../urls"
import { headers } from '../../actions/auth';
let Pagesize=5
const Newflashsale=()=>{
    const { id } = useParams(); 
    const [flashsale,setFlashsale]=useState({time:null,hour:null,minutes:null,minutes_to:null,
        hour_to:null
    })
    const [date,setDate]=useState({time:null,hour:null,minutes:null,minutes_to:null,
        hour_to:null})
    const [show,setShow]=useState({items:false,byproduct:false})
    const [itemshop,setItem]=useState({items:[],page_count_main:0,items_choice:[],savemain:false
    ,page_count_by:0,byproduct:[],byproduct_choice:[],savebyproduct:false})
    const [loading,setLoading]=useState(false)
    useEffect(() => {
        const getJournal = async () => {
            await axios(detailflashsaleURL+id,headers)
           // <-- passed to API URL
            .then(res=>{
                let data=res.data
                setFlashsale({time:new Date(data.valid_from),hour:new Date(data.valid_from).getHours(),minutes:new Date(data.valid_from).getMinutes(),
                    hour_to:new Date(data.valid_to).getHours(),minutes_to:new Date(data.valid_to).getMinutes()})
                setDate({...date,time:new Date(data.valid_from),hour:new Date(data.valid_from).getHours(),minutes:new Date(data.valid_from).getMinutes(),
                hour_to:new Date(data.valid_to).getHours(),minutes_to:new Date(data.valid_to).getMinutes()})
                const variations=data.variations.map(variation=>{
                    return {...variation,
                        percent_discount:(variation.price-parseInt(variation.promotion_price))*100/variation.price,
                        promotion_price:parseInt(variation.promotion_price)}
                })
                const list_products=data.products.map(product=>{
                    return({...product,check:false,user_item_limit:variations.find(variation=>variation.user_item_limit)?variations.find(variation=>variation.user_item_limit).user_item_limit:'',
                    variations:variations.filter(variation=>variation.item_id==product.id)})
                })
                setItem({...itemshop,byproduct_choice:list_products,
                page_count_by:Math.ceil(list_products.length / Pagesize)})
          })
        }
        getJournal();
    }, [id]);
    return(
        <>
            <Flashsaleinfo
            date_flashsale={date}
            item_flashsale={itemshop}
            edit={true}
            flashsale_shop={flashsale}
            loading_content={loading}
            url_flashsale={detailflashsaleURL+id}
            />
        </>
    )
}
export default Newflashsale