import axios from 'axios';
import React, {useState,useEffect} from 'react'
import {detailAwardshopURL} from "../../urls"
import { useParams,Link } from "react-router-dom";
import { headers } from '../../actions/auth';
import ShopAwardInfo from '../../hocs/ShopAwardInfo';
import { timevalue,timesubmit } from '../../constants';

const DetailShopAward=()=>{
    const { id } = useParams(); 
    const [shop_award,setShopaward]=useState({valid_from:new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).substr(0,16),
    promotion_combo_name:'',combo_type:'1',
    valid_to:new Date(new Date().setHours(new Date().getHours()+1)).toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).substr(0,16)
    })
    const [listaward,setListaward]=useState([])
    const [loading,setLoading]=useState(false)
    
    useEffect(() => {
        const getJournal = async () => {
            await axios(`${detailAwardshopURL}/${id}`,headers)
            .then(res=>{
                let data=res.data
               
                setShopaward({game_name:data.game_name,valid_from:timesubmit(data.valid_from),valid_to:timesubmit(data.valid_to)})
                
                setLoading(true)
                const list_awards=data.list_awards.map(item=>{
                    return({...item,value:item.id})
                })
                setListaward(list_awards)
          })
        }
        getJournal();
    }, [id])

    return(
        <ShopAwardInfo
        loading_content={loading}
        list_award_shop={listaward}
        edit={true}
        data_shop_award={shop_award}
        url_shop_award={`${detailAwardshopURL}/${id}`}
        />
    )
}
export default DetailShopAward