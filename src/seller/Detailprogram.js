import axios from 'axios';
import Programinfo from "../hocs/Programinfo"
import React, {useState, useEffect} from 'react'
import {detailprogramURL} from "../urls"
import { useParams} from "react-router-dom";
import { headers } from '../actions/auth';
let Pagesize=5
const DetailProgram=()=>{
    const { id } = useParams(); 
    const [program,setProgram]=useState({naem_program:'',valid_from:new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).substr(0,16),
    valid_to:new Date(new Date().setHours(new Date().getHours()+1)).toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).substr(0,16)
    })
    const [date,setDate]=useState([{time:new Date(),show:false,hours:new Date().getHours(),minutes:new Date().getMinutes()}
    ,{time:new Date(),show:false,hours:new Date().getHours()+1,minutes:new Date().getMinutes()}])
    const [itemshop,setItem]=useState({items:[],page_count_main:0,items_choice:[],savemain:false
    ,page_count_by:0,byproduct:[],byproduct_choice:[],savebyproduct:false})
    const [loading,setLoading]=useState(false)
    useEffect(() => {
        const getJournal = async () => {
            await axios(detailprogramURL+id,headers)
           // <-- passed to API URL
            .then(res=>{
                let data=res.data
                setProgram(data.program)
                setDate([{time:new Date(data.program.valid_from),show:false,hours:new Date(data.program.valid_from).getHours(),minutes:new Date(data.program.valid_from).getMinutes()}
              ,{time:new Date(data.program.valid_to),show:false,hours:new Date(data.program.valid_to).getHours(),minutes:new Date(data.program.valid_to).getMinutes()}])
                setLoading(true)
                const list_byproduct=data.list_product.map(byproduct=>{
                    return({...byproduct,list_variation:byproduct.list_variation.map(variation=>{
                        if(variation.percent_discount>0){
                            return({...variation,enable:true})
                        }
                        return({...variation,enable:false})
                    })})
                })
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
            <Programinfo
            loading_content={loading}
            item_program={itemshop}
            date_program={date}
            program_shop={program}
            url_program={detailprogramURL+id}
            />
        </>
    )
}
export default DetailProgram