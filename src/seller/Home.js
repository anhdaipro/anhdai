
import Sidebamenu from "./Sidebar-menu"
import axios from 'axios';
import Navbar from "./Navbar"
import { useParams,Link } from "react-router-dom";
import React, {useState,useEffect,useCallback,useRef} from 'react'
import {chartURL } from "../urls"
import {timeformat, } from "../constants"
import {headers} from "../actions/auth"

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Line } from 'react-chartjs-2';
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
const HomePageSeller=()=>{
    const chartRef = useRef();
    const [loading,setLoading]=useState(false)
    const [data,setData]=useState({sum:0,count:0,count_order_waiting_comfirmed:0,count_order_canceled:0,count_order_processed:0,count_order_waiting_processed:0})
    const [chart,setChart]=useState({
        labels:[],
            datasets: [
            {
                label: 'Doanh thu',
                data: [],
                fill:true,
                borderColor: 'rgb(38, 115, 221)',
                backgroundColor: 'rgb(38, 115, 221)',
            },
            {
                label: 'Luot truy cap',
                data: [],
                fill:true,
                borderColor: 'rgb(88, 183, 241)',
                backgroundColor: 'rgb(88, 183, 241)',
            },
            ],
        })
    const [option,setOption]=useState({options:{
        responsive: true,
            plugins:{
                legend: {
                display: false,
                },                      
            },
            maintainAspectRatio: false,
            scales: {
            y: {
                min: 0,                                 
            }
        },
    }})
    
    useEffect(()=>{
        const getJournal = async () => {
            await axios(chartURL,headers)
           // <-- passed to API URL
            .then(res=>{
                const arr=Array(25).fill().map((_,i)=>{
                    return ('0'+i).slice(-2)+':00'
                })
                const sums=res.data.sum.reduce((total,item)=>{
                    return(total+item)
                },0)
                const counts=res.data.count.reduce((count,item)=>{
                    return(count+item)
                },0)
                setData({...data,sum:sums,count:counts,count_order_waiting_comfirmed:res.data.count_order_waiting_comfirmed,
                count_order_canceled:res.data.count_order_canceled,count_order_processed:res.data.count_order_processed,
                count_order_waiting_processed:res.data.count_order_waiting_processed})
                
                const data_chart={
                    labels:arr,
                    datasets: [
                    {
                        label: 'Doanh thu',
                        data: res.data.sum,
                        fill:true,
                        borderColor: 'rgb(38, 115, 221)',
                        backgroundColor: 'rgb(38, 115, 221)',
                    },
                    {
                        label: 'Luot truy cap',
                        data: res.data.count,
                        fill:true,
                        borderColor: 'rgb(88, 183, 241)',
                        backgroundColor: 'rgb(88, 183, 241)',
                    },
                    ],
                }
                setChart(data_chart)
                setLoading(true)
          })
        }
        getJournal();
    },[])

    useEffect(() => {
        const getOrCreateTooltip = (chart) => {
            let tooltipEl = chart.canvas.parentNode.querySelector('div');          
            if (!tooltipEl) {
            tooltipEl = document.createElement('div');
            tooltipEl.style.position='absolute'
            tooltipEl.style.font='14px / 21px &quot;Microsoft YaHei&quot'
            tooltipEl.style.padding= '0px'
            tooltipEl.style. border= '1px solid rgb(229, 229, 229)'
            tooltipEl.style.background = 'rgba(255, 255, 255, 0.95)';
            tooltipEl.style.borderRadius = '4px';
            tooltipEl.style.color = 'rgb(255, 255, 255)';
            tooltipEl.style.display = 'block';
            tooltipEl.style.pointerEvents = 'none';
            tooltipEl.style.boxShadow= 'rgba(0, 0, 0, 0.12) 0px 6px 16px 0px';
            tooltipEl.style.whiteSpace= 'nowrap';
            tooltipEl.style.zIndex= 9999999;
            tooltipEl.style.transform = 'translate(-50%, 0) , top 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s';
            tooltipEl.style.transition = 'left 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s';
            const table = document.createElement('div');
            table.style.fontFamily='Roboto'
            table.style.fontSize='14px'
            table.style.color='#333'
            tooltipEl.appendChild(table);
            chart.canvas.parentNode.appendChild(tooltipEl);
          }
        
          return tooltipEl;
        };
        
        const externalTooltipHandler = (context) => {
          // Tooltip Element
          const {chart, tooltip} = context;
          const tooltipEl = getOrCreateTooltip(chart);
        
          // Hide if no tooltip
          if (tooltip.opacity === 0) {
            tooltipEl.style.opacity = 0;
            return;
          }
          
          // Set Text
          const tableRoot = tooltipEl.querySelector('div')
          tableRoot.innerHTML=''
          if (tooltip.body) {
            
            const titleLines = tooltip.title || [];
            const bodyLines = tooltip.body.map(b => b.lines);
            console.log(tooltip.body)
            
            titleLines.forEach(title => {
                const x = document.createElement('div');
                tableRoot.appendChild(x)
                x.style.paddingLeft='12px'
                x.style.height='30px'
                x.style.lineHeight='30px'
                x.style.background= '#f6f6f6'
                x.style.fontSize='12px'
                x.style.color='#666'
                x.textContent=`${title} ${timeformat(new Date())}`
            });
            
            bodyLines.map((body, i) => {
                console.log(body)
              const colors = tooltip.labelColors[i];
              const y = document.createElement('div');
              tableRoot.appendChild(y);
              console.log(colors)
              y.style.display='flex';
              y.style.alignItems='center'
              y.style.margin='16px 12px'
              y.innerHTML=`
              <span style="background: ${colors.backgroundColor};border-radius:50%;width:10px;height:10px;margin-right:8px;"></span>
              ${body[0].split(': ')[0]}<span style="padding-left:16px;flex:1;text-align:right;font-weight:500;">${body[0].split(': ')[1]}</span>
              `

            });
          }
          const {offsetLeft: positionX, offsetTop: positionY} = chart.canvas;
        
          // Display, position, and set styles for font
          tooltipEl.style.opacity = 1;
          tooltipEl.style.left = positionX + tooltip.caretX+10+'px';
          tooltipEl.style.top = positionY + tooltip.caretY-tooltipEl.offsetHeight-20 + 'px';
        };
        const options={
            responsive: true,
                plugins:{
                    legend: {
                    display: false,
                },
                    tooltip:{
                    enabled:false,
                    external: externalTooltipHandler,
                    }                            
                },
                maintainAspectRatio: false,
                scales: {
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
                        min:0,
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
            }
        }
        setOption({...option,options:options})
    }, [chart]);
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
                                        <a href="{% url 'vendor:dashboard' %}">Xem them</a>
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
                                                    <Line
                                                        style={{
                                                        position: 'absolute',
                                                        left: '0px',
                                                        top: 0,
                                                        width: '1208px',
                                                        height:'285px',
                                                        userSelect: 'none',
                                                        padding: 0,
                                                        margin: 0,
                                                        borderWidth: 0}}
                                                        ref={chartRef}
                                                        options={option.options}
                                                        data={chart}
                                                    />
                                                </div>
                                            </div>
                                                <div data-v-17c34edb="" className="chart-footer">
                                                <div data-v-17c34edb="" className="chart-legend">
                                                    {chart.datasets.map(item=>
                                                        <>
                                                        <span data-v-17c34edb="" className="circle" style={{background: `${item.backgroundColor}`}}></span> 
                                                        <span data-v-17c34edb="">{item.label}</span>
                                                        </>
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
                                <div class='item-center'>
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