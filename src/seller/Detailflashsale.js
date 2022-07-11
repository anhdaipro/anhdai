import axios from 'axios';
import React, {useState,useEffect} from 'react'
import { useParams} from "react-router-dom";
import Flashsaleinfo from "../hocs/Flashsaleinfo"
import {detailflashsaleURL} from "../urls"
import { headers } from '../actions/auth';
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
                setFlashsale({time:new Date(data.flashsale.valid_from),hour:new Date(data.flashsale.valid_from).getHours(),minutes:new Date(data.flashsale.valid_from).getMinutes(),
                    hour_to:new Date(data.flashsale.valid_to).getHours(),minutes_to:new Date(data.flashsale.valid_to).getMinutes()})
                setDate({...date,time:new Date(data.flashsale.valid_from),hour:new Date(data.flashsale.valid_from).getHours(),minutes:new Date(data.flashsale.valid_from).getMinutes(),
                hour_to:new Date(data.flashsale.valid_to).getHours(),minutes_to:new Date(data.flashsale.valid_to).getMinutes()})
                const list_byproduct=data.list_product.map(byproduct=>{
                    return({...byproduct,list_variation:byproduct.list_variation.map(variation=>{
                        if(variation.percent_discount>0){
                            return({...variation,enable:true})
                        }
                        return({...variation,enable:false})
                    })})
                })
                setLoading(true)
                const list_enable_on=list_byproduct.filter(item=>item.list_variation.some(variation=>variation.percent_discount>0))
                const list_enable_off=list_byproduct.filter(item=>list_enable_on.every(items=>item.item_id!=items.item_id))
                const byproduct_choice=[...list_enable_on,...list_enable_off]
                setItem({...itemshop,byproduct_choice:byproduct_choice,savemain:true,savebyproduct:true,
                page_count_by:Math.ceil(data.list_product.length / Pagesize)})
                console.log(itemshop.byproduct_choice)
          })
        }
        getJournal();
    }, [id]);
    return(
        <>
            <Flashsaleinfo
            date_flashsale={date}
            item_flashsale={itemshop}
            flashsale_shop={flashsale}
            loading_content={loading}
            url_flashsale={detailflashsaleURL+id}
            />
        </>
    )
}
export default Newflashsale