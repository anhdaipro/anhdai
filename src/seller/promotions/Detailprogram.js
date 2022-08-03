import axios from 'axios';
import Programinfo from "../../hocs/Programinfo"
import React, {useState, useEffect} from 'react'
import {detailprogramURL} from "../../urls"
import { useParams} from "react-router-dom";
import { headers } from '../../actions/auth';
import { timevalue,timesubmit } from '../../constants';
let Pagesize=5
const DetailProgram=()=>{
    const { id } = useParams(); 
    const [program,setProgram]=useState({naem_program:'',valid_from:new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).substr(0,16),
    valid_to:new Date(new Date().setHours(new Date().getHours()+1)).toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).substr(0,16)
    })
    const [itemshop,setItem]=useState({items:[],page_count_main:0,items_choice:[],savemain:false
    ,page_count_by:0,byproduct:[],byproduct_choice:[],savebyproduct:false})
    const [loading,setLoading]=useState(false)
    useEffect(() => {
        const getJournal = async () => {
            await axios(detailprogramURL+id,headers)
           // <-- passed to API URL
            .then(res=>{
                let data=res.data
                setProgram({...data,valid_from:timesubmit(data.valid_from),valid_to:timesubmit(data.valid_to)})
                setLoading(true)
                const variations=data.variations.map(variation=>{
                    return {...variation,limit:variation.promotion_stock>0?true:false,
                        percent_discount:(variation.price-parseInt(variation.promotion_price))*100/variation.price,
                        promotion_price:parseInt(variation.promotion_price)}
                })
                const list_products=data.products.map(product=>{
                    return({...product,check:false,user_item_limit:variations.find(variation=>variation.user_item_limit)?variations.find(variation=>variation.user_item_limit).user_item_limit:'',
                    limit:variations.some(variation=>variation.user_item_limit)?true:false,variations:variations.filter(variation=>variation.item_id==product.id)})
                })
                setItem({...itemshop,byproduct_choice:list_products,
                page_count_by:Math.ceil(list_products.length / Pagesize)})
          })
        }
        getJournal();
    }, [id]);

    return(
        <>
            <Programinfo
            loading_content={loading}
            item_program={itemshop}
            edit={true}
            program_shop={program}
            url_program={detailprogramURL+id}
            />
        </>
    )
}
export default DetailProgram