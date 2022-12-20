
import Sidebamenu from "./Sidebar-menu"
import axios from 'axios';
import Navbar from "./Navbar"
import { useParams,Link,me } from "react-router-dom";
import React, {useState,useEffect,useCallback,useRef,useMemo} from 'react'
import {chartURL,dashboardURL } from "../urls"
import {timeformat, } from "../constants"
import {headers} from "../actions/auth"
import GradientChart from "./dashboard/GradientChart"
const listhour=Array(25).fill().map((_,i)=>{
    return i
})    
const today=new Date()
const hours=today.getHours()    
const HomePageSeller=()=>{
    const chartRef = useRef();
    const [loading,setLoading]=useState(false)
    const [data,setData]=useState({sum:0,count:0,count_order_waiting_comfirmed:0,count_order_canceled:0,count_order_processed:0,count_order_waiting_processed:0})
    const [listsum,setListsum]=useState([])
    const [time,setTime]=useState('currentday')
    const [listcount,setListcount]=useState([])
    const [labels,setLabels]=useState([])
    const [text,setText]=useState()
    const scale=useMemo(()=>({
        x: {
            grid: {
                display:true, //value
                drawTicks: true,//tich x
                drawBorder: true,//tich x
                drawOnChartArea: false,//dường sọc dohc
            },
            ticks: {
                // For a category axis, the val is the index so the lookup via getLabelForValue is needed
                callback: function(val, index) {
                // Hide every 6nd tick label
                return index % 6 === 0 ? this.getLabelForValue(val) : '';
                },
                    color: 'gray',
                },
            },
        y:{
            beginAtZero: true,
            ticks:{
                display:false //value
            },
            grid: {
                display:true,
                drawTicks: true,//tich value y
                drawBorder: true,//tich value y màu sọc fuction
                drawOnChartArea: false,//dường sọc ngang
            },
            title: {
                display: false,
                text: 'Value',
                color: '#191',
                font: {
                    family: 'Times',
                    size: 20,
                    style: 'normal',
                    lineHeight: 1.2
                },
            }
        }
    }),[])

    const chart=useMemo(()=>{return{
            labels:labels,
            datasets: [
            {
                label: 'Doanh thu',
                data: listsum,
                fill:false,
                borderWidth:1,
                stepped: false,
                borderColor:'rgb(251, 115, 75)',
                backgroundColor: 'rgb(251, 115, 75)',
            },
            {
                label: 'Luot truy cap',
                data: listcount,
                fill:false,
                borderWidth:1,
                stepped: false,
                borderColor:'rgb(88, 183, 241)',
                backgroundColor: 'rgb(88, 183, 241)',
            },
        ],
    }},[listsum,listcount,labels])
    
    useEffect(()=>{
        const getJournal = async () => {
            await axios(`${dashboardURL}?time=currentday`,headers())
           // <-- passed to API URL
            .then(res=>{
                setLoading(true)
                const text_preview=`So với 00 -- ${('0'+hours).slice(-2)} hôm qua`
                setText(text_preview)
                const listtimes=listhour
                const listsumsdata=listtimes.map(item=>{
                    const sumitem=res.data.sum.find(datechoice=>new Date(datechoice.day).getHours()==item)
                    console.log(sumitem)
                    const sum_default=res.data.times.find(date=>date==item)
                    return sumitem?sumitem.sum:sum_default|| sum_default==0?0:null
                })
                const listcountdata=listtimes.map(item=>{
                    const countitem=res.data.count.find(date=>new Date(date.day).getHours()==item)
                    const count_default=res.data.times.find(date=>date==item)
                    return countitem?countitem.count:count_default || count_default==0?0:null
                })
                const times=listtimes.map(item=>{ 
                    if(item==24){
                        return '23:59'
                    }
                    return `${('0'+item).slice(-2)}:00`
                })
                
                setLabels(times)
                setListsum(current=>[...listsumsdata])
                setListcount(current=>[...listcountdata])
          })
        }
        getJournal();
    },[])

   
    return(
        <>
            <Navbar/>
            <div className="app-content">
                <Sidebamenu/>
                <div className="page-container">
                    <div data-v-dce17924="" className="flex-box">
                        <div data-v-dce17924 className="main-column">
                            <div className=" pr-2 main_info">
                                <div>To-Do list
                                    <p>things to do</p>
                                </div>
                                <div className="to-do-box">
                                    <Link to={`/sale/order?type=unpaid`} className="to-do-box-aitem">
                                        <p className="item-title">{data.count_order_waiting_comfirmed}</p>
                                        <p className="item-desc"> Chờ xác nhân</p>
                                    </Link>
                                    <Link className="to-do-box-aitem" to={`/sale/shipment?type=toship&source=to_process`}>
                                        <p className="item-title">{data.count_order_waiting_processed}</p>
                                        <p className="item-desc"> Chờ lấy hàng</p>
                                    </Link>
                                    
                                    <Link className="to-do-box-aitem" to={`/sale/shipment?type=toship&source=processed`}>
                                        <p className="item-title">{data.count_order_processed}</p>
                                        <p className="item-desc">Đã xử lí</p>
                                    </Link>
                                   
                                    <Link className="to-do-box-aitem" to={`/sale/order?type=canceled`}>
                                        <p className="item-title">{data.count_order_canceled}</p>
                                        <p className="item-desc">Order canceled </p>
                                    </Link>
                                    <Link className="to-do-box-aitem" to={`/sale/returnlist`}>
                                        <p className="item-title">0</p>
                                        <p className="item-desc"> Refund</p>
                                    </Link>
                                   
                                    <Link className="to-do-box-aitem" to={`/vendor/product/banned/action`}>
                                        <p className="item-title">0</p>
                                        <p className="item-desc">Banned Product </p>
                                    </Link>
                                    <Link className="to-do-box-aitem" to={`/vendor/product/soldout`}>
                                        <p className="item-title">0</p>
                                        <p className="item-desc">Out of stock product</p>
                                    </Link>
                                    
                                    <Link className="to-do-box-aitem" to={`/web-my-campaigns/campaign?tab=pendingConfirmation`}>
                                        <p className="item-title">0</p>
                                        <p className="item-desc">Promotions</p>
                                    </Link>
                                    
                                </div>
                            </div>
                            <div className="main_info ">
                                <div className="title-box">
                                    <div>
                                        Phân Tích Bán Hàng
                                        <p>Tổng quan về dữ liệu của cửa hàng cho kích thước của đơn hàng đã xác nhận</p>
                                    </div>
                                    <div>
                                        <Link to="datacenter/dashboard">Xem them</Link>
                                    </div>
                                </div>
                                <div className="item-spaces">
                                    <div className="chart">
                                        <div className="" style={{fontSize: '16px'}}>
                                            <p>Doanh số</p>
                                            <p>{data.sum}</p>
                                            <div style={{width: '400px'}}>
                                                <div id="chart"></div>
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <div className="chartBox">
                                                <div style={{position: 'relative', width: '360px', height: '200px', padding: '0px', margin: '0px', borderWidth: '0px', cursor: 'default'}}>
                                                    <GradientChart
                                                        chart={chart}
                                                        time={time}
                                                        listsum={listsum}
                                                        scale={scale}
                                                        datechoice={today}
                                                    />  
                                                </div>
                                            </div>
                                                <div data-v-17c34edb="" className="chart-footer">
                                                <div data-v-17c34edb="" className="chart-legend">
                                                    {chart.datasets.map((item,i)=>
                                                        <span key={i}>
                                                        <span key={item.lable} data-v-17c34edb="" className="circle" style={{background: `${item.backgroundColor}`}}></span> 
                                                        <span data-v-17c34edb="">{item.label}</span>
                                                        </span>
                                                    )}    
                                                </div>
                                            </div>
                                        </div>
                                    </div>                                                                                               
                                    <div className="list-box">
                                    <div className="item-box">
                                        <div className="item-col">
                                            <p>lượt truy cập</p> 
                                            <p className="py-2 h4">0</p>
                                            <div>
                                                <p>với hôm qua</p>
                                            </div>
                                        </div>
                                        <div className="item-col">
                                            <p>viewer</p>
                                            <p className="py-2 h4">0</p>
                                            <div>
                                                <p>với hôm qua</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item-box">
                                        <div className="item-col">
                                            đơn hàng
                                            <p className="py-2 h4">{data.count}</p>
                                            <div>
                                                <p>với hôm qua</p>
                                            </div>
                                        </div>
                                        <div className="item-col">
                                            tỉ lệ chuyển đổi
                                            <p className="py-2 h4">0</p>
                                            <div>
                                                <p>với hôm qua</p>
                                            </div>
                                        </div>
                                    </div>   
                                </div>
                                </div>
                            </div>
                            <div className="item-col pr-2 main_info">
                                <div className="operational">
                                    <div>
                                        Operational Efficiency
                                        <p>Bảng Hiệu Quả Hoạt Động giúp Người Bán hiểu rõ hơn về hoạt động buôn bán của Shop mình dựa trên những chỉ tiêu sau:</p>
                                    </div>
                                    <div>
                                        <a href="">More info</a>
                                    </div>
                                </div>
                                <div className="d-flex flex-row border-bottom">
                                    <div className="item-col pr-2 ">Infringing products</div>
                                    <div className="item-col pr-2 ">Order Management</div>
                                    <div className="item-col pr-2 ">Chăm sóc khách hàng</div>
                                    <div className="item-col pr-2 ">Buyer Satisfaction</div>
                                </div>
                                <table className="table" >
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">Tiêu Chí</th>
                                            <th scope="col">My shop</th>
                                            <th scope="col">Chỉ tiêu</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Product locked/deleted</td>
                                            <td>Pre-or</td>
                                            <td>Other v</td>
                                        </tr>
                                        <tr>
                                            <td>Pre-order rate</td>
                                            <td>Thornton</td>
                                            <td>@fat</td>
                                        </tr>
                                        <tr>
                                            <td>Other violations</td>
                                            <td>the Bird</td>
                                            <td>@twitter</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div data-v-dce17924 className="aside-column">
                            <div className="infomation" style={{height: '270px'}}>
                                <div className="my-1">thông báo</div>
                                <div>🔥 CHÚ Ý VỀ HOẠT ĐỘNG BUFF CHỈ SỐ ẢO</div>
                                <div>Anhdai nghiêm cấm mọi hoạt động buff chỉ số ảo nhằm đảm bảo trải nghiệm mua sắm cho khách hàng. Xem chi tiết TẠI ĐÂY👉</div>
                                <div className="mt-1_2">Mới · 15 Tháng 10 2021</div>
                                <div className='item-center'>
                                    <div className="mini-vouchers__label">Mã giảm giá của Shop</div>
                                    <div className="mini-vouchers__wrapper d-flex flex-auto flex-no-overflow">
                                        <div className="mini-vouchers__vouchers d-flex flex-auto flex-no-overflow">
                                            <div className="voucher-ticket voucher-ticket--VN voucher-ticket--seller-mini-solid mini-voucher-with-popover">
                                                <div className="item-center">
                                                    <span className="voucher-promo-value voucher-promo-value--absolute-value">Giảm ₫5k</span>
                                                </div>
                                            </div>
                                            <div className="voucher-ticket voucher-ticket--VN voucher-ticket--seller-mini-solid mini-voucher-with-popover">
                                                <div className="item-center">
                                                    <span className="voucher-promo-value voucher-promo-value--absolute-value">Giảm 10%</span>
                                                </div>
                                            </div>
                                            <div className="mini-vouchers__mask"></div>
                                        </div>
                                    </div>
                                </div> 
                            </div>  
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}
export default HomePageSeller