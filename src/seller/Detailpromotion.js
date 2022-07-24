import axios from 'axios';
import React, {useState,useEffect} from 'react'
import Promotioninfo from "../hocs/Promotioninfo"
import {detailcomboURL} from "../urls"
import { useParams,Link } from "react-router-dom";
import { headers } from '../actions/auth';
let Pagesize=5

const Detailpromotion=()=>{
    const { id } = useParams(); 
    const [combo,setCombo]=useState({valid_from:new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).substr(0,16),
    quantity_to_reduced:null,discount_price:null,price_special_sale:null,
    discount_percent:0,limit_order:null,promotion_combo_name:'',combo_type:'1',
    valid_to:new Date(new Date().setHours(new Date().getHours()+1)).toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).substr(0,16)
    })
    const [itemshop,setItem]=useState({items:[],page_count_main:0,items_choice:[],savemain:false
    ,page_count_by:0,byproduct:[],byproduct_choice:[],savebyproduct:false})
    const [loading,setLoading]=useState(false)
    
    useEffect(() => {
        const getJournal = async () => {
            await axios(detailcomboURL+id,headers)
            .then(res=>{
                let data=res.data
                const date={valid_from:new Date(data.valid_from).toDateString(),valid_to:new Date(data.valid_to).toDateString()}
                setCombo(data)
                
                setLoading(true)
                const list_products=data.products.map(item=>{
                    return({...item,enable:true,check:false})
                })
                setItem({...itemshop,items_choice:list_products,page_count_main:Math.ceil(list_products.length / Pagesize)})
          })
        }
        getJournal();
    }, [id])

    return(
        <>
            <Promotioninfo
            item_combo={itemshop}
            loading_content={loading}
            combo_shop={combo}
            edit={true}
            url_combo={detailcomboURL+id}
            
            />
        </>
    )
}
export default Detailpromotion

