import axios from 'axios';
import Navbar from "./Navbar"
import {Link} from 'react-router-dom'
import React, {useState, useEffect,useCallback} from 'react'
import Sidebamenu from "./Sidebar-menu"
import {listshippingURL,} from "../urls"
import {groupBy,itemvariation,arraymove} from "../constants"
import { headers } from '../actions/auth';
const Shipping=()=>{
    const [data,setData]=useState(null)
    const [loading,setLoading]=useState(false)
    useEffect(() => {
        const getJournal = async () => {
            await axios(listshippingURL,headers())
           // <-- passed to API URL
            .then(res=>{
                setData(groupBy(res.data.list_shipping,'method'))
                
                setLoading(true)
          })
        }
        getJournal();
    }, []);

    const setenable=(keys,value,itemchoice)=>{
        const list_shipping=value.map(item=>{
            if(itemchoice.id==item.id){
            return({...item,enable:!item.enable})
            }
            return({...item})
        })
        setData({...data,[keys]:list_shipping})
        axios.post(listshippingURL,JSON.stringify({id:itemchoice.id}),headers())
        .then(res=>{

        })
    }
    return(
        <>
            <div id="app">
                <Navbar/>
                <div className="app-content">
                    <Sidebamenu/>
                    <div className="page-container"> 
                        {loading?
                        <div className="page-content-wrapper">
                            <div className="shipping-setting-item">
                                <header data-v-0e2ec95c="" className="header">
                                    <div data-v-0e2ec95c="" className="title">Cài Đặt Vận Chuyển</div> 
                                    <div data-v-0e2ec95c="" className="sub-title">Thiết lập vận chuyển</div>
                                </header>
                                <div className="shipping-channel-settings">
                                    <div className="channel-container">
                                        <div className="shipping-3pl-masking-setting">
                                            <div className="panel">
                                                <div data-v-0bf10a3a="" className="panel-header">
                                                    <i data-v-0bf10a3a="" className="panel-header-icon icon">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M9.42424101,1 C9.81932838,1 10.13961,1.3135709 10.1396099,1.70022322 L10.1399895,2.88453442 C10.6106121,3.07329231 11.0524792,3.32361449 11.4540715,3.6278745 L12.5025761,3.03605471 C12.8447318,2.84265006 13.2822446,2.95742497 13.4797882,3.29241166 L14.9040326,5.70758834 C15.1015763,6.04257503 14.9843451,6.47092084 14.6423767,6.66421956 L13.597125,7.25562936 C13.6312143,7.50218321 13.6484404,7.7519749 13.6484404,8.00380202 C13.6484404,8.25344794 13.6315115,8.50109498 13.5980064,8.74557215 L14.6421894,9.33567451 C14.9843451,9.52907916 15.1015763,9.95742497 14.9040326,10.2924117 L13.4797882,12.7075883 C13.2822446,13.042575 12.8447318,13.1573499 12.5025518,12.9639316 L11.4605139,12.3748415 C11.057216,12.6813023 10.6131395,12.933298 10.139989,13.1230698 L10.13961,14.2996198 C10.13961,14.6864291 9.81932838,15 9.42424101,15 L6.5757523,15 C6.18066493,15 5.86038334,14.6864291 5.86038348,14.2999832 L5.85951006,13.1228715 C5.38662373,12.9331543 4.94278577,12.68128 4.5396826,12.3749959 L3.49741724,12.9639453 C3.15526154,13.1573499 2.71774876,13.042575 2.52020507,12.7075883 L1.09596072,10.2924117 C0.898417034,9.95742497 1.01564823,9.52907916 1.35781623,9.33566756 L2.4019758,8.74549075 C2.3684781,8.50103998 2.35155288,8.25342021 2.35155288,8.00380202 C2.35155288,7.7520028 2.36877517,7.50223854 2.40285696,7.25571123 L1.35780393,6.66432549 C1.01564823,6.47092084 0.898417034,6.04257503 1.09596072,5.70758834 L2.52020507,3.29241166 C2.71774876,2.95742497 3.15526154,2.84265006 3.49704111,3.03584231 L4.54615772,3.6276958 C4.8672684,3.38443783 5.21412554,3.17566312 5.58084089,3.00527018 L5.85950881,2.88473297 L5.86038334,1.7003802 C5.86038334,1.3135709 6.18066493,1 6.5757523,1 L9.42424101,1 Z M9.11775052,2.00054315 L6.88211751,2.00054315 L6.88094201,3.59268473 L6.53221952,3.70680635 C5.94351231,3.89946447 5.40131662,4.20707002 4.93675049,4.60924875 L4.66150577,4.84753037 L3.25208152,4.0524111 L2.13421884,5.94803799 L3.53958223,6.74331992 L3.46634318,7.09601049 C3.40479888,7.39238372 3.37350853,7.69597076 3.37350853,8.00380202 C3.37350853,8.30976401 3.40441999,8.61153495 3.4652268,8.90620062 L3.53797136,9.25871584 L2.13421884,10.052096 L3.2519732,11.9474052 L4.65565494,11.1542315 L4.93117919,11.3935244 C5.39696126,11.7980563 5.9411393,12.107363 6.53221952,12.3007977 L6.88094068,12.4149189 L6.8821163,13.9994569 L9.11775098,13.9994569 L9.11826129,12.4151275 L9.46719783,12.3009861 C10.0585928,12.1075337 10.603051,11.7980912 11.0690333,11.393334 L11.344618,11.1539583 L12.7480504,11.9473538 L13.8657646,10.0521128 L12.4619891,9.25883747 L12.5347476,8.90629209 C12.5955669,8.61159745 12.6264848,8.30979571 12.6264848,8.00380202 C12.6264848,7.69593887 12.595188,7.39232084 12.533631,7.09591849 L12.4603779,6.74319761 L13.8657646,5.94802122 L12.7479468,4.0524704 L11.3388112,4.84784552 L11.0634968,4.60946867 C10.5987225,4.20705063 10.0562343,3.89929889 9.46719783,3.7066179 L9.11826072,3.59247634 L9.11775052,2.00054315 Z M8,5.20070068 C9.54601033,5.20070068 10.7992993,6.45398967 10.7992993,8 C10.7992993,9.54601033 9.54601033,10.7992993 8,10.7992993 C6.45398967,10.7992993 5.20070068,9.54601033 5.20070068,8 C5.20070068,6.45398967 6.45398967,5.20070068 8,5.20070068 Z M8,6.20070068 C7.00627442,6.20070068 6.20070068,7.00627442 6.20070068,8 C6.20070068,8.99372558 7.00627442,9.79929932 8,9.79929932 C8.99372558,9.79929932 9.79929932,8.99372558 9.79929932,8 C9.79929932,7.00627442 8.99372558,6.20070068 8,6.20070068 Z"></path></svg>
                                                    </i> 
                                                    <div data-v-0bf10a3a="">
                                                        <div data-v-0bf10a3a="" className="panel-header-title">Cài Đặt Phương Thức Vận Chuyển</div> 
                                                        <div data-v-0bf10a3a="" className="panel-header-subtitle">Thiết lập phương thức vận chuyển cho Shop của bạn.</div>
                                                    </div>
                                                </div>
                                                <div className="shipping-container mask-shipping-container">
                                                
                                                    {Object.keys(data).map(key=>
                                                        <div data-v-0bf10a3a="" className="section">
                                                            <div data-v-0bf10a3a="" className="section-header">
                                                                <div data-v-0bf10a3a="" className="section-header-desc">
                                                                    <div data-v-0bf10a3a="" className="section-header-title">
                                                                        <span data-v-0bf10a3a="">{key}</span>   
                                                                    </div> 
                                                                    <div data-v-0bf10a3a="" className="subtitle">Khi lựa chọn những phương thức vận chuyển được Anhdai hỗ trợ, Người mua sẽ được cập nhật liên tục về trạng thái đơn hàng.</div>
                                                                </div> 
                                                                <div data-v-0bf10a3a="" className="section-header-action">
                                                                    <button data-v-0bf10a3a="" type="button" className="button button--normal">
                                                                        <span>Thu gọn</span>
                                                                        <i className="icon">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M8,6.81066017 L11.9696699,10.7803301 C12.2625631,11.0732233 12.7374369,11.0732233 13.0303301,10.7803301 C13.3232233,10.4874369 13.3232233,10.0125631 13.0303301,9.71966991 L8.53033009,5.21966991 C8.23743687,4.9267767 7.76256313,4.9267767 7.46966991,5.21966991 L2.96966991,9.71966991 C2.6767767,10.0125631 2.6767767,10.4874369 2.96966991,10.7803301 C3.26256313,11.0732233 3.73743687,11.0732233 4.03033009,10.7803301 L8,6.81066017 Z"></path></svg>
                                                                        </i>
                                                                    </button>
                                                                </div>
                                                            </div> 
                                                            <div data-v-0bf10a3a="" className="section-body">
                                                                <div data-v-4243444f="" data-v-0bf10a3a="" className="mask-channel-toggle"></div> 
                                                                <div data-v-0bf10a3a="" className="mask-channel-list">
                                                                    {data[key].map(item=>
                                                                    <div key={item.id} data-v-1de1e554="" data-v-0bf10a3a="" className="shipping-item-box" logistics-channels="[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]" common-config="[object Object]">
                                                                        <div data-v-1de1e554="" className="grid shipping-item-header">
                                                                            <div data-v-1de1e554="" className="col grid vertical-center">
                                                                                <div data-v-1de1e554="" className="channel-label">
                                                                                    <div data-v-1de1e554="" className="col name">{item.shipping_unit}</div>
                                                                                </div> 
                                                                                <div data-v-2f3bc8d7="" data-v-1de1e554="" className="shipping-free"></div>
                                                                            </div> 
                                                                            <div data-v-1de1e554="" className="grid shipping-item-action">
                                                                                <div data-v-1de1e554="" className="loading-wrap"></div> 
                                                                                <div data-v-64ef5326="" data-v-1de1e554="">
                                                                                    <input onChange={()=>setenable(key,data[key],item)} checked={item.enable?true:false} type="checkbox" className="switch_1" name="check"/>
                                                                                </div> 
                                                                                <i data-v-1de1e554="" className="icon">
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M8,9.18933983 L4.03033009,5.21966991 C3.73743687,4.9267767 3.26256313,4.9267767 2.96966991,5.21966991 C2.6767767,5.51256313 2.6767767,5.98743687 2.96966991,6.28033009 L7.46966991,10.7803301 C7.76256313,11.0732233 8.23743687,11.0732233 8.53033009,10.7803301 L13.0303301,6.28033009 C13.3232233,5.98743687 13.3232233,5.51256313 13.0303301,5.21966991 C12.7374369,4.9267767 12.2625631,4.9267767 11.9696699,5.21966991 L8,9.18933983 Z"></path></svg>
                                                                                </i>
                                                                            </div>
                                                                        </div> 
                                                                    </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div> 
                                    <div data-v-de658a02="" data-v-0e2ec95c="" class="shipping-other-settings">  <div data-v-4cad06e3="" data-v-de658a02="" class="settings-card"> <div data-v-787e388e="" data-v-de658a02="" class="settings-card-row disabled" data-v-4cad06e3=""><div data-v-787e388e="" className="flex-center" ><div data-v-787e388e="" class="icon"><i data-v-787e388e="" class="icon icon-grey"><svg data-name="图层 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path d="M832 448h-32V224a31.94 31.94 0 0 0-9.4-22.6l-128-128A31.94 31.94 0 0 0 640 64H288a64.06 64.06 0 0 0-64 64v320h-32A128.12 128.12 0 0 0 64 576v192a64.06 64.06 0 0 0 64 64h96v64a64.06 64.06 0 0 0 64 64h448a64.06 64.06 0 0 0 64-64v-64h96a64.06 64.06 0 0 0 64-64V576a128.12 128.12 0 0 0-128-128zM672 173.3l18.7 18.7H672zM288 128h320v96a32 32 0 0 0 32 32h96v192H288zm448 768H288V736h448v160zm160-128h-96v-32a64.06 64.06 0 0 0-64-64H288a64.06 64.06 0 0 0-64 64v32h-96V576a64.06 64.06 0 0 1 64-64h640a64.06 64.06 0 0 1 64 64z" data-name="Layer 1"></path></svg></i></div> <div data-v-787e388e="" class="desc"><div data-v-787e388e="" class="title">
        In Nhiệt (Thermal)
      </div> <div data-v-787e388e="" class="subtitle">
          Bật In Nhiệt cho các Phiếu Xuất Hàng của tất cả phương thức vận chuyển.
        </div></div> <div data-v-787e388e="" class="operations"> <div data-v-787e388e="" class="switch switch--close switch--normal"></div></div></div> </div></div> </div>
                                </div>
                            </div>
                        </div>:''}
                    </div>
                </div>
            </div>
             
        </>
    )
}
export default Shipping