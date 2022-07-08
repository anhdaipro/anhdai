import axios from 'axios';
import Navbar from "./Navbar"
import { useParams,Link } from "react-router-dom";
import React, {useState,useEffect,useCallback,useRef} from 'react'
import {timeformat,dashboardURL,timevalue} from "../constants"
import Calendar from 'react-calendar/dist/umd/Calendar';
import Message from '../containers/Chat'
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
import { headers } from '../actions/auth';
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
let today=new Date()
let yesterday=new Date(new Date().setDate(new Date().getDate() - 1))
let lastweek=new Date(new Date().setDate(new Date().getDate() - 7))
let lastmonth=new Date(new Date().setDate(new Date().getDate() - 30))

const Dashboard=()=>{
    const [state,setState]=useState({show_order:false,show:false,typeorder:[{name:'Đơn Đã Xác Nhận',value:'accepted',info:'Tất cả các đơn được người mua đặt hàng thành công. Bao gồm cả đơn đã thanh toán và đơn thanh toán sau khi nhận hàng (trước và sau khi hệ thống Anhdai xác nhận).'},
        {name:'Đơn Đã Thanh Toán',value:'received',info:'Tất cả các đơn được người mua đặt hàng thành công. Bao gồm cả đơn đã thanh toán và đơn thanh toán sau khi nhận hàng (trước và sau khi hệ thống Anhdai xác nhận).'},{name:"Tất cả đơn",value:'all',info:"Tất cả các đơn được người mua đặt hàng thành công. Bao gồm cả đơn đã thanh toán và đơn thanh toán sau khi nhận hàng (trước và sau khi hệ thống Anhdai xác nhận)."}],time:[{name:'Today',time_display:`Tới ${today.getHours()} now`,value:'current_day'},
    {name:'Yesterday',value:'yesterday',time_display:timeformat(yesterday)},
    {name:'Last 7 days',value:'week_before',time_display:timeformat(lastweek) + ' - ' + timeformat(today)},
    {name:'Thirty day ago',value:'month_before',time_display:timeformat(lastmonth) + ' - ' + timeformat(today)}],
    date:[{name:'By day',time:'month',value:null},{name:'By week',time:'month',value:null},{name:'By month',time:'year',value:null},{name:'By year',time:'decade',value:null}],
    time_choice:null,date_choice:'month',hover:null,})
    const [dashboard,setDashboard]=useState({time_choice:`Tới ${today.getHours()} now`,name:'Today',show_time:true,value:'today'})
    const [typeorder,setTypeorder]=useState({ordered:true,name:'all',name_ordertype:"Tất cả đơn"})
    const calendar=useRef();
    const chartRef = useRef();
    const [date,setDate]=useState(new Date())
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
    const [loading,setLoading]=useState(false)
   
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

    useEffect(() => {
        const getJournal = async () => {
            await axios(dashboardURL,headers)
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
    }, []);

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
          console.log('iii')
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
                y: {
                min: 0,
                                                
            }
        },
        }
        setOption({...option,options:options})
    }, [chart]);
    const setshowtime=(item)=>{
        setState({...state,date_choice:item.time,hover:item.name})
        setDashboard({...dashboard,show_time:false})
        setshowcalendar('')
    }
    const setshowdate=(value)=>{
        setState({...state,date_choice:'month',hover:null})
        setDashboard({...dashboard,show_time:true})
        setshowcalendar(value)
    }
    const setshowcalendar=(value)=>{
        calendar.current.style.display=value
    }
    const setdashboardtime=(item)=>{
        let url= new URL(dashboardURL)
        let search_params=url.searchParams
        search_params.set('time',item.value)
        search_params.set('time_choice',item.time)
        Object.keys(typeorder).map(name=>{
            search_params.set([name],typeorder[name])
        })
        url.search = search_params.toString();
        let new_url = url.toString();
        setDashboard({...dashboard,time_choice:item.time_display,name:item.name})
        axios.get(new_url,headers)
        .then(res=>{
            chart.labels=res.data.time
                chart.datasets[0].data=res.data.sum
                chart.datasets[1].data=res.data.count
                setChart(chart)
                setLoading(true)
            setState({...state,show:false})
            console.log(chart)
        })
    }
    const setdaychoice=(value)=>{
        setDate(value)
        setDashboard({...dashboard,name:"By day",time_choice:timeformat(value),value:timevalue(value)})
        let url= new URL(dashboardURL)
        let search_params=url.searchParams
        search_params.set('time','day')
        search_params.set('time_choice',timeformat(value))
        console.log(value)
        Object.keys(typeorder).map(name=>{
            search_params.set([name],typeorder[name])
        })
        
        url.search = search_params.toString();
        let new_url = url.toString();
        axios.get(new_url,headers)
        .then(res=>{
            chart.labels=res.data.time
                chart.datasets[0].data=res.data.sum
                chart.datasets[1].data=res.data.count
                setChart(chart)
                setLoading(true)
            setState({...state,show:false})
        })
    }
    const setshow=(e)=>{
        setState({...state,show:!state.show,show_order:false})
        window.onclick=(event)=>{
            let parent=event.target.closest('.date_picker.popper_content')
            if(!e.target.contains(event.target) && !parent){
                setState({...state,show:false,show_order:false})
            }
        }
    }
    console.log(chart)
    const setshoworder=(e)=>{
        setState({...state,show_order:!state.show_order,show:false})
        window.onclick=(event)=>{
            let parent=event.target.closest('.bi-order-type-picker')
            if(!e.target.contains(event.target) && !parent){
                setState({...state,show_order:false,show:false})
            }
        }
    }
    const setordertype=(item)=>{
        let url= new URL(dashboardURL)
        let search_params=url.searchParams
        search_params.set('time',dashboard.name)
        search_params.set('time_choice',timevalue(dashboard.value))
        setTypeorder({name:item.value,[item.value]:true,name_ordertype:item.name})
        setState({...state,show_order:false})
        search_params.set(item.value,true)
        url.search = search_params.toString();
        let new_url = url.toString();
        axios.get(new_url,headers)
        .then(res=>{
            chart.labels=res.data.time
            chart.datasets[0].data=res.data.sum
            chart.datasets[1].data=res.data.count
            setChart(chart)
            setLoading(true)
            
        })
    }
    const setyearchoice=(value)=>{
        setDate(value)
        setDashboard({...dashboard,name:"By year",time_choice:value.getFullYear(),value:timevalue(value)})
        let url= new URL(dashboardURL)
        let search_params=url.searchParams
        search_params.set('time','year')
        search_params.set('time_choice',timevalue(value))
        Object.keys(typeorder).map(name=>{
            search_params.set([name],typeorder[name])
        })
        
        url.search = search_params.toString();
        let new_url = url.toString();
        axios.get(new_url,headers)
        .then(res=>{
            chart.labels=res.data.time
                chart.datasets[0].data=res.data.sum
                chart.datasets[1].data=res.data.count
                setChart(chart)
                setLoading(true)
            setState({...state,show:false})
        })
    }
    const setmonthchoice=(value)=>{
        setDate(value)
        setDashboard({...dashboard,value:timevalue(value),name:"By month",time_choice:value.getFullYear()+'.'+('0'+(value.getMonth()+1)).slice(-2)})
        let url= new URL(dashboardURL)
        let search_params=url.searchParams
        search_params.set('time','month')
        search_params.set('time_choice',timevalue(value))
        
        Object.keys(typeorder).map(name=>{
            search_params.set([name],typeorder[name])
        })
        
        url.search = search_params.toString();
        let new_url = url.toString();
        axios.get(new_url,headers)
        .then(res=>{
            chart.labels=res.data.time
                chart.datasets[0].data=res.data.sum
                chart.datasets[1].data=res.data.count
                setChart(chart)
                setLoading(true)
            setState({...state,show:false})
        })
    }
    const setweekchoice=(week,value)=>{
        setDate(value)
        setDashboard({...dashboard,value:timevalue(value),name:"By week",time_choice:`${timeformat(value)} - ${timeformat(value.setDate(value.getDate() + 7))}`})
        let url= new URL(dashboardURL)
        let search_params=url.searchParams
        search_params.set('time','week')
        search_params.set('week',week)
        search_params.set('time_choice',timevalue(value))
        Object.keys(typeorder).map(name=>{
            search_params.set([name],typeorder[name])
        })
        
        url.search = search_params.toString();
        let new_url = url.toString();
        axios.get(new_url,headers)
        .then(res=>{
            chart.labels=res.data.time
                chart.datasets[0].data=res.data.sum
                chart.datasets[1].data=res.data.count
                setChart(chart)
                setLoading(true)
            setState({...state,show:false})
        })
    }
    
    return(
        <>  
            <div id="app">
                <Navbar/>
                <div className="data-center-layout">
                    <div data-v-47de0c38="" className="top-navbar">
                        <nav data-v-47de0c38="">
                            <a data-v-47de0c38="" href="/datacenter/dashboard" className="router-link-exact-active router-link-active nav-tab datacenter-dashboard">
                                <span data-v-47de0c38="">Tổng quan</span> 
                            </a>
                            <a data-v-47de0c38="" href="/datacenter/products" className="nav-tab datacenter-products">
                                <span data-v-47de0c38="">Sản phẩm</span> 
                            </a>
                            <a data-v-47de0c38="" href="/datacenter/salesservice" className="nav-tab datacenter-salesservice">
                                <span data-v-47de0c38="">Bán hàng và Dịch vụ</span> 
                            </a>
                            <a data-v-47de0c38="" href="/datacenter/traffic" className="nav-tab datacenter-traffic">
                                <span data-v-47de0c38="">Truy cập</span> 
                            </a>
                            <a data-v-47de0c38="" href="/datacenter/marketing" className="nav-tab datacenter-marketing">
                                <span data-v-47de0c38="">Marketing</span> 
                            </a>
                            <a data-v-47de0c38="" href="/datacenter/selling" className="nav-tab datacenter-selling">
                                <span data-v-47de0c38="">Quân Sư Bán Hàng</span> 
                            </a>  
                            <div data-v-47de0c38="" className="navbar-right-panel">
                                <a data-v-47de0c38="" href="/datacenter/learn" className="learn-more-link normal-learn-more-link mr-16">
                                    <i data-v-47de0c38="" className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M6.50692156,2 C7.08217707,2 7.87390592,2.44054357 8.51774029,2.86712042 C9.60884094,2.258011 10.160514,2 10.5220425,2 L14.0031784,2 C14.5554632,2 15.0031784,2.44771525 15.0031784,3 L15.0031784,12.9195918 C15.0031784,13.4718638 14.5554504,13.9195687 14.0031784,13.9195687 L10.5075199,13.9195687 C10.1708939,13.9195687 8.93829366,14.7893464 8.5109755,14.7893464 C8.08365734,14.7893464 6.9191394,13.9195687 6.51058323,13.9195687 L3.00003214,13.9195687 C2.44772964,13.9196008 2,13.4718712 2,12.9195687 L2,3 C2,2.44771525 2.44771525,2 3,2 L6.50692156,2 Z M14.0031784,3 L10.5220425,3 C10.3944161,3 9.75539186,3.31590418 9,3.743 L9,13.5246778 C9.39284596,13.3133631 9.67116172,13.1714832 9.83494726,13.0990383 C10.0806256,12.9903709 10.2722293,12.9360787 10.5075199,12.9360787 L14.0031784,12.9360902 L14.0031784,3 Z M6.50692156,3 L3,3 L3,12.9213505 L6.59964678,12.922821 C6.88638522,12.9329781 7.08273474,12.9992251 7.51903855,13.2276522 L8,13.4869496 L8,3.723 C7.33510296,3.28246794 6.74282866,3 6.50692156,3 Z"></path></svg>
                                    </i>Tìm hiểu thêm
                                </a>
                                <div data-v-37db921b="" data-v-47de0c38="" className="live-monitor-container">
                                    <a data-v-37db921b="" href="/datacenter/liveboard?ADTAG=mydata&amp;type=confirm" className="live-monitor-btn__normal" target="_blank">
                                        <div data-v-145e30cc="" data-v-37db921b="" className="normal">
                                            <i data-v-145e30cc="" className="inline-svg-container icon-normal">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.95 3.72302C22.905 3.52929 22.7849 3.36136 22.6162 3.25615C22.4474 3.15095 22.2437 3.11709 22.05 3.16201L18.1395 4.06801C18.0102 4.09792 17.8911 4.16162 17.7944 4.2526C17.6978 4.34358 17.627 4.45859 17.5893 4.58587C17.5516 4.71316 17.5484 4.84816 17.58 4.9771C17.6116 5.10604 17.6768 5.22428 17.769 5.31976L18.6225 6.20252L14.0625 10.2705L11.6948 8.02802C11.5507 7.89162 11.3584 7.81789 11.16 7.82295C10.9617 7.82801 10.7735 7.91145 10.6365 8.05502L5.55675 13.3815C5.25347 13.3182 4.938 13.3503 4.65371 13.4734C4.36941 13.5966 4.13023 13.8048 3.96902 14.0694C3.80782 14.334 3.7325 14.642 3.75342 14.9511C3.77435 15.2602 3.89048 15.5553 4.08587 15.7957C4.28125 16.0362 4.54631 16.2103 4.84461 16.294C5.14291 16.3777 5.45982 16.367 5.7518 16.2634C6.04378 16.1597 6.2965 15.9682 6.47524 15.7151C6.65398 15.4621 6.74996 15.1598 6.75 14.85C6.75 14.6873 6.71775 14.5343 6.66975 14.388L11.2058 9.63152L13.5315 11.8335C13.668 11.9627 13.848 12.0359 14.036 12.0387C14.2239 12.0415 14.406 11.9736 14.5463 11.8485L19.665 7.28252L20.6378 8.28977C20.7299 8.38522 20.8458 8.4545 20.9735 8.49055C21.1012 8.52659 21.2362 8.52811 21.3647 8.49494C21.4932 8.46177 21.6106 8.3951 21.7049 8.30174C21.7992 8.20838 21.867 8.09166 21.9015 7.96352L22.9433 4.08676C22.9755 3.96793 22.9778 3.84297 22.95 3.72302Z" fill="#EE4D2D"></path><path d="M21.75 10.5577C21.5511 10.5577 21.3603 10.6368 21.2197 10.7774C21.079 10.9181 21 11.1088 21 11.3077V17.25C21 17.4489 20.921 17.6397 20.7803 17.7803C20.6397 17.921 20.4489 18 20.25 18H3.75C3.55109 18 3.36032 17.921 3.21967 17.7803C3.07902 17.6397 3 17.4489 3 17.25V3.75C3 3.55109 3.07902 3.36032 3.21967 3.21967C3.36032 3.07902 3.55109 3 3.75 3H16.1873C16.3862 3 16.5769 2.92098 16.7176 2.78033C16.8582 2.63968 16.9373 2.44891 16.9373 2.25C16.9373 2.05109 16.8582 1.86032 16.7176 1.71967C16.5769 1.57902 16.3862 1.5 16.1873 1.5H3.75C3.15326 1.5 2.58097 1.73705 2.15901 2.15901C1.73705 2.58097 1.5 3.15326 1.5 3.75V17.25C1.5 17.8467 1.73705 18.419 2.15901 18.841C2.58097 19.2629 3.15326 19.5 3.75 19.5H20.25C20.8467 19.5 21.419 19.2629 21.841 18.841C22.2629 18.419 22.5 17.8467 22.5 17.25V11.3077C22.5 11.1088 22.421 10.9181 22.2803 10.7774C22.1397 10.6368 21.9489 10.5577 21.75 10.5577ZM21.375 21H2.625C2.42609 21 2.23532 21.079 2.09467 21.2197C1.95402 21.3603 1.875 21.5511 1.875 21.75C1.875 21.9489 1.95402 22.1397 2.09467 22.2803C2.23532 22.421 2.42609 22.5 2.625 22.5H21.375C21.5739 22.5 21.7647 22.421 21.9053 22.2803C22.046 22.1397 22.125 21.9489 22.125 21.75C22.125 21.5511 22.046 21.3603 21.9053 21.2197C21.7647 21.079 21.5739 21 21.375 21Z" fill="#EE4D2D"></path></svg>
                                            </i>
                                            Theo dõi Trực tiếp
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </nav>
                    </div>
                    {loading?
                    <div data-v-47de0c38 className="app-container">
                        <div className="dashboard app-container-body full-container-body">
                            <div fragment="b4c855caa6" className="sticky"></div>
                            <div className="fixed-time-selector">
                                <div className="date-export item-center">
                                    <div className='date-period item-center'>
                                        <span className="mr-1">Time frame</span>
                                        <div className="date-export__datepick popover--light">
                                            <div onClick={(e)=>setshow(e)} className="popover__ref">
                                                <div className="bi-date-input track-click-open-time-selector">
                                                    <div data-v-60cec9e5="" className="item-center">
                                                        <i data-v-60cec9e5="" className="icon bi-date-input-icon">
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M11.5156954,1 C11.7918378,1 12.0156954,1.22385763 12.0156954,1.5 L12.015,2 L14,2 C14.5522847,2 15,2.44771525 15,3 L15,14 C15,14.5522847 14.5522847,15 14,15 L2,15 C1.44771525,15 1,14.5522847 1,14 L1,3 C1,2.44771525 1.44771525,2 2,2 L3.991,2 L3.99143991,1.5 C3.99143991,1.22385763 4.21529754,1 4.49143991,1 C4.76758229,1 4.99143991,1.22385763 4.99143991,1.5 L4.991,2 L11.015,2 L11.0156954,1.5 C11.0156954,1.22385763 11.239553,1 11.5156954,1 Z M14,6 L2,6 L2,14 L14,14 L14,6 Z M5.5,11 C5.77614237,11 6,11.2238576 6,11.5 C6,11.7761424 5.77614237,12 5.5,12 L4.5,12 C4.22385763,12 4,11.7761424 4,11.5 C4,11.2238576 4.22385763,11 4.5,11 L5.5,11 Z M8.5,11 C8.77614237,11 9,11.2238576 9,11.5 C9,11.7761424 8.77614237,12 8.5,12 L7.5,12 C7.22385763,12 7,11.7761424 7,11.5 C7,11.2238576 7.22385763,11 7.5,11 L8.5,11 Z M11.5,11 C11.7761424,11 12,11.2238576 12,11.5 C12,11.7761424 11.7761424,12 11.5,12 L10.5,12 C10.2238576,12 10,11.7761424 10,11.5 C10,11.2238576 10.2238576,11 10.5,11 L11.5,11 Z M5.5,8 C5.77614237,8 6,8.22385763 6,8.5 C6,8.77614237 5.77614237,9 5.5,9 L4.5,9 C4.22385763,9 4,8.77614237 4,8.5 C4,8.22385763 4.22385763,8 4.5,8 L5.5,8 Z M8.5,8 C8.77614237,8 9,8.22385763 9,8.5 C9,8.77614237 8.77614237,9 8.5,9 L7.5,9 C7.22385763,9 7,8.77614237 7,8.5 C7,8.22385763 7.22385763,8 7.5,8 L8.5,8 Z M11.5,8 C11.7761424,8 12,8.22385763 12,8.5 C12,8.77614237 11.7761424,9 11.5,9 L10.5,9 C10.2238576,9 10,8.77614237 10,8.5 C10,8.22385763 10.2238576,8 10.5,8 L11.5,8 Z M3.991,3 L2,3 L2,5 L14,5 L14,3 L12.015,3 L12.0156954,3.5 C12.0156954,3.77614237 11.7918378,4 11.5156954,4 C11.239553,4 11.0156954,3.77614237 11.0156954,3.5 L11.015,3 L4.991,3 L4.99143991,3.5 C4.99143991,3.77614237 4.76758229,4 4.49143991,4 C4.21529754,4 3.99143991,3.77614237 3.99143991,3.5 L3.991,3 Z"></path></svg>
                                                        </i> 
                                                        <span className="ml-1_2">{dashboard.name}: </span>
                                                    </div>
                                                    <span data-v-60cec9e5="" className="value">{dashboard.time_choice} (GMT+07)</span>
                                                </div>
                                            </div>
                                                <div className="date_picker popper_content" style={{display:`${state.show?'':'none'}`}}>
                                                    <ul className={`bi-date-shortcuts date-shortcut-list ${dashboard.show_time?'with-display-text':''}`}>
                                                        {state.time.map(item=>
                                                            <li onClick={()=>setdashboardtime(item)} onMouseEnter={()=>setshowdate('none')} className={`date-shortcut-item ${item.time_display==dashboard.time_choice?'active':''}`}>
                                                                <span className="date-shortcut-item__text">{item.name}</span> 
                                                                <span className="date-shortcut-item__display">{item.time_display}</span>
                                                            </li>
                                                        )}
                                                        <li data-v-f7189dec="" className="date-shortcut-split"></li>
                                                        {state.date.map(item=>
                                                            <li onMouseEnter={()=>setshowtime(item)} className={`date-shortcut-item track-click-time-selector with-picker ${state.hover==item.name?'hover':''}`}>
                                                                <span>{item.name}</span>
                                                                <i data-v-f7189dec="" className="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M9.18933983,8 L5.21966991,11.9696699 C4.9267767,12.2625631 4.9267767,12.7374369 5.21966991,13.0303301 C5.51256313,13.3232233 5.98743687,13.3232233 6.28033009,13.0303301 L10.7803301,8.53033009 C11.0732233,8.23743687 11.0732233,7.76256313 10.7803301,7.46966991 L6.28033009,2.96966991 C5.98743687,2.6767767 5.51256313,2.6767767 5.21966991,2.96966991 C4.9267767,3.26256313 4.9267767,3.73743687 5.21966991,4.03033009 L9.18933983,8 Z"></path></svg></i>
                                                            </li>
                                                        )}
                                                        
                                                    </ul>
                                                    <div ref={calendar} className="date-picker-panel" style={{display:'none'}}>
                                                        <div className="date-picker-panel__body">
                                                            <Calendar
                                                                onActiveStartDateChange={({ action, activeStartDate, value, view }) => alert('Changed view to: ', activeStartDate, view)}
                                                                prevLabel={<i className="icon picker-header__icon picker-header__prev"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M6.81066017,8 L10.7803301,4.03033009 C11.0732233,3.73743687 11.0732233,3.26256313 10.7803301,2.96966991 C10.4874369,2.6767767 10.0125631,2.6767767 9.71966991,2.96966991 L5.21966991,7.46966991 C4.9267767,7.76256313 4.9267767,8.23743687 5.21966991,8.53033009 L9.71966991,13.0303301 C10.0125631,13.3232233 10.4874369,13.3232233 10.7803301,13.0303301 C11.0732233,12.7374369 11.0732233,12.2625631 10.7803301,11.9696699 L6.81066017,8 Z"></path></svg></i>}
                                                                prev2Label={<i className="icon picker-header__icon picker-header__prev"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M6.71966991,2.96966991 C7.01256313,2.6767767 7.48743687,2.6767767 7.78033009,2.96966991 C8.0732233,3.26256313 8.0732233,3.73743687 7.78033009,4.03033009 L7.78033009,4.03033009 L3.81066017,8 L7.78033009,11.9696699 C8.0732233,12.2625631 8.0732233,12.7374369 7.78033009,13.0303301 C7.48743687,13.3232233 7.01256313,13.3232233 6.71966991,13.0303301 L6.71966991,13.0303301 L2.21966991,8.53033009 C1.9267767,8.23743687 1.9267767,7.76256313 2.21966991,7.46966991 L2.21966991,7.46966991 Z M11.7196699,2.96966991 C12.0125631,2.6767767 12.4874369,2.6767767 12.7803301,2.96966991 C13.0732233,3.26256313 13.0732233,3.73743687 12.7803301,4.03033009 L12.7803301,4.03033009 L8.81066017,8 L12.7803301,11.9696699 C13.0732233,12.2625631 13.0732233,12.7374369 12.7803301,13.0303301 C12.4874369,13.3232233 12.0125631,13.3232233 11.7196699,13.0303301 L11.7196699,13.0303301 L7.21966991,8.53033009 C6.9267767,8.23743687 6.9267767,7.76256313 7.21966991,7.46966991 L7.21966991,7.46966991 Z"></path></svg></i>}
                                                                nextLabel={<i className="icon picker-header__icon picker-header__next" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M9.18933983,8 L5.21966991,11.9696699 C4.9267767,12.2625631 4.9267767,12.7374369 5.21966991,13.0303301 C5.51256313,13.3232233 5.98743687,13.3232233 6.28033009,13.0303301 L10.7803301,8.53033009 C11.0732233,8.23743687 11.0732233,7.76256313 10.7803301,7.46966991 L6.28033009,2.96966991 C5.98743687,2.6767767 5.51256313,2.6767767 5.21966991,2.96966991 C4.9267767,3.26256313 4.9267767,3.73743687 5.21966991,4.03033009 L9.18933983,8 Z"></path></svg></i>}
                                                                next2Label={<i className="icon picker-header__icon picker-header__next"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M3.21966991,2.96966991 C3.51256313,2.6767767 3.98743687,2.6767767 4.28033009,2.96966991 L4.28033009,2.96966991 L8.78033009,7.46966991 C9.0732233,7.76256313 9.0732233,8.23743687 8.78033009,8.53033009 L8.78033009,8.53033009 L4.28033009,13.0303301 C3.98743687,13.3232233 3.51256313,13.3232233 3.21966991,13.0303301 C2.9267767,12.7374369 2.9267767,12.2625631 3.21966991,11.9696699 L3.21966991,11.9696699 L7.18933983,8 L3.21966991,4.03033009 C2.9267767,3.73743687 2.9267767,3.26256313 3.21966991,2.96966991 Z M8.21966991,2.96966991 C8.51256313,2.6767767 8.98743687,2.6767767 9.28033009,2.96966991 L9.28033009,2.96966991 L13.7803301,7.46966991 C14.0732233,7.76256313 14.0732233,8.23743687 13.7803301,8.53033009 L13.7803301,8.53033009 L9.28033009,13.0303301 C8.98743687,13.3232233 8.51256313,13.3232233 8.21966991,13.0303301 C7.9267767,12.7374369 7.9267767,12.2625631 8.21966991,11.9696699 L8.21966991,11.9696699 L12.1893398,8 L8.21966991,4.03033009 C7.9267767,3.73743687 7.9267767,3.26256313 8.21966991,2.96966991 Z"></path></svg></i>}
                                                                view={state.date_choice}
                                                                onChange={(value)=>setdaychoice(value)}
                                                                value={date}
                                                                showWeekNumbers={true}
                                                                onClickMonth={(value, event) => setmonthchoice(value)}
                                                                onClickYear={(value, event) => setyearchoice(value)}
                                                                onClickWeekNumber={(weekNumber,date,event)=>setweekchoice(weekNumber,date)}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                        </div>
                                    </div>
                                    <div className="order_type_container item-center">
                                        <div className="order-type item-center">
                                            <span>Loại Đơn Hàng</span> 
                                            <div className="order-type-select select ml-1_2">
                                                <div onClick={(e)=>setshoworder(e)} tabindex="0" className="selector selector--normal item-space"> 
                                                    <div className="selector__inner line-clamp--1">{typeorder.name_ordertype}</div> 
                                                    <div className="selector__suffix"> 
                                                        <i className="selector__suffix-icon icon">
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M8,9.18933983 L4.03033009,5.21966991 C3.73743687,4.9267767 3.26256313,4.9267767 2.96966991,5.21966991 C2.6767767,5.51256313 2.6767767,5.98743687 2.96966991,6.28033009 L7.46966991,10.7803301 C7.76256313,11.0732233 8.23743687,11.0732233 8.53033009,10.7803301 L13.0303301,6.28033009 C13.3232233,5.98743687 13.3232233,5.51256313 13.0303301,5.21966991 C12.7374369,4.9267767 12.2625631,4.9267767 11.9696699,5.21966991 L8,9.18933983 Z"></path></svg>
                                                        </i>
                                                    </div>
                                                </div> 
                                                <div className="popper bi-order-type-picker" style={{display: `${state.show_order?"":'none'}`}}> 
                                                    <div className="select__menu" style={{maxWidth: '440px', maxHeight: '218px'}}>
                                                        <div className="scrollbar">
                                                            <div className="scrollbar__wrapper">
                                                                <div className="scrollbar__bar vertical">
                                                                    <div className="scrollbar__thumb" style={{top: '0px', height: '0px'}}></div>
                                                                </div>  
                                                                <div className="scrollbar__content" style={{position: 'relative'}}>
                                                                    <div className="select__options">
                                                                        {state.typeorder.map(item=>
                                                                            <div onClick={()=>setordertype(item)} className={`option ${item.value==typeorder.name?'selected':''}`} id="type_placed_order">
                                                                                <div className="bi_order_type_popover popover popover--light">
                                                                                    <div className="popover__ref">
                                                                                        <div>{item.name}</div>
                                                                                    </div> 
                                                                                    <div className="popper popover__popper popover__popper--light with-arrow bi-order-type-option-popover" style={{display: 'none', maxWidth: '320px'}}>
                                                                                        <div className="popover__content">{item.info}</div>
                                                                                    </div>
                                                                                </div> 
                                                                            </div>
                                                                        )}
                                                                        
                                                                        <div className="point_box">
                                                                            <div className="point bigger"></div> 
                                                                            <div className="point"></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div data-v-6e5f6649="" className="info-tooltip dashboard_order-type-tooltip popover popover--light" style={{color: 'rgb(183, 183, 183)'}}>
                                            <div className="popover__ref">
                                                <i data-v-6e5f6649="" className="icon" style={{cursor: 'pointer'}}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8,1 C11.8659932,1 15,4.13400675 15,8 C15,11.8659932 11.8659932,15 8,15 C4.13400675,15 1,11.8659932 1,8 C1,4.13400675 4.13400675,1 8,1 Z M8,2 C4.6862915,2 2,4.6862915 2,8 C2,11.3137085 4.6862915,14 8,14 C11.3137085,14 14,11.3137085 14,8 C14,4.6862915 11.3137085,2 8,2 Z M7.98750749,10.2375075 C8.40172105,10.2375075 8.73750749,10.5732939 8.73750749,10.9875075 C8.73750749,11.401721 8.40172105,11.7375075 7.98750749,11.7375075 C7.57329392,11.7375075 7.23750749,11.401721 7.23750749,10.9875075 C7.23750749,10.5732939 7.57329392,10.2375075 7.98750749,10.2375075 Z M8.11700238,4.60513307 C9.97011776,4.60513307 10.7745841,6.50497267 9.94298079,7.72186504 C9.76926425,7.97606597 9.56587088,8.14546785 9.27050506,8.31454843 L9.11486938,8.39945305 L8.95824852,8.47993747 C8.56296349,8.68261431 8.49390831,8.75808648 8.49390831,9.0209925 C8.49390831,9.29713488 8.27005069,9.5209925 7.99390831,9.5209925 C7.71776594,9.5209925 7.49390831,9.29713488 7.49390831,9.0209925 C7.49390831,8.34166619 7.7650409,7.99681515 8.35913594,7.6662627 L8.76655168,7.45066498 C8.9424056,7.3502536 9.04307851,7.26633638 9.11735517,7.1576467 C9.52116165,6.56675314 9.11397414,5.60513307 8.11700238,5.60513307 C7.41791504,5.60513307 6.82814953,6.01272878 6.75715965,6.55275918 L6.75,6.66244953 L6.74194433,6.75232516 C6.69960837,6.98557437 6.49545989,7.16244953 6.25,7.16244953 C5.97385763,7.16244953 5.75,6.9385919 5.75,6.66244953 C5.75,5.44256682 6.87194406,4.60513307 8.11700238,4.60513307 Z"></path></svg>
                                                </i>
                                            </div> 
                                            <div className="popper popover__popper popover__popper--light with-arrow" style={{display: 'none', maxWidth: '320px'}}>
                                                <div className="popover__content">
                                                    <span>Các loại đơn hàng là gì?</span>
                                                    <span className="datacenter-link">Tìm hiểu thêm</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="point_box">
                                            <div className="point bigger"></div> 
                                            <div className="point"></div>
                                        </div>
                                    </div>
                                    <button type="button" className="track-click-export button button--normal">
                                        <i className="icon">
                                        
                                        </i>
                                        <span>Tải dữ liệu</span>
                                    </button>
                                </div>

                                <div className="g-container-card">
                                    <div className="" style={{width:'100%'}}>
                                        <span className="g-container-card__title">Important indicator</span>
                                        <div className="item-space my-1">
                                            <div data-v-14d16c20="" data-v-34f6c9f3="" className="key-metric-item track-click-key-metric-item key-metric km-selectable selected" style={{borderTop: '4px solid rgb(38, 115, 221)', width: '188px', marginLeft: '16px'}}>
                                                <div data-v-14d16c20="" className="title">
                                                    <span data-v-14d16c20="" style={{marginRight: '4px'}}>Doanh số</span> 
                                                    <div data-v-6e5f6649="" data-v-14d16c20="" className="info-tooltip popover popover--light" style={{color: 'rgb(183, 183, 183)'}}>
                                                        <div className="popover__ref">
                                                            <i data-v-6e5f6649="" className="icon" style={{cursor: 'pointer'}}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8,1 C11.8659932,1 15,4.13400675 15,8 C15,11.8659932 11.8659932,15 8,15 C4.13400675,15 1,11.8659932 1,8 C1,4.13400675 4.13400675,1 8,1 Z M8,2 C4.6862915,2 2,4.6862915 2,8 C2,11.3137085 4.6862915,14 8,14 C11.3137085,14 14,11.3137085 14,8 C14,4.6862915 11.3137085,2 8,2 Z M7.98750749,10.2375075 C8.40172105,10.2375075 8.73750749,10.5732939 8.73750749,10.9875075 C8.73750749,11.401721 8.40172105,11.7375075 7.98750749,11.7375075 C7.57329392,11.7375075 7.23750749,11.401721 7.23750749,10.9875075 C7.23750749,10.5732939 7.57329392,10.2375075 7.98750749,10.2375075 Z M8.11700238,4.60513307 C9.97011776,4.60513307 10.7745841,6.50497267 9.94298079,7.72186504 C9.76926425,7.97606597 9.56587088,8.14546785 9.27050506,8.31454843 L9.11486938,8.39945305 L8.95824852,8.47993747 C8.56296349,8.68261431 8.49390831,8.75808648 8.49390831,9.0209925 C8.49390831,9.29713488 8.27005069,9.5209925 7.99390831,9.5209925 C7.71776594,9.5209925 7.49390831,9.29713488 7.49390831,9.0209925 C7.49390831,8.34166619 7.7650409,7.99681515 8.35913594,7.6662627 L8.76655168,7.45066498 C8.9424056,7.3502536 9.04307851,7.26633638 9.11735517,7.1576467 C9.52116165,6.56675314 9.11397414,5.60513307 8.11700238,5.60513307 C7.41791504,5.60513307 6.82814953,6.01272878 6.75715965,6.55275918 L6.75,6.66244953 L6.74194433,6.75232516 C6.69960837,6.98557437 6.49545989,7.16244953 6.25,7.16244953 C5.97385763,7.16244953 5.75,6.9385919 5.75,6.66244953 C5.75,5.44256682 6.87194406,4.60513307 8.11700238,4.60513307 Z"></path></svg>
                                                            </i>
                                                        </div> 
                                                        <div className="popper popover__popper popover__popper--light with-arrow" style={{display: 'none', maxWidth: '320px'}}>
                                                            <div className="popover__content">Tổng giá trị của các đơn hàng đã xác nhận (bao gồm không thanh toán khi nhận hàng và xác nhận thanh toán khi nhận hàng) trong khoảng thời gian đã chọn, bao gồm cả các đơn hàng đã hủy và trả hàng / hoàn tiền.</div>
                                                        </div>
                                                    </div>
                                                </div> 
                                                <div data-v-14d16c20="" className="value">
                                                    <label data-v-14d16c20="" className="">
                                                        <span className="currency">
                                                            <span className="currency-symbol">₫</span>
                                                            <span className="currency-value">0</span>
                                                        </span>
                                                    </label>
                                                </div> 
                                                <div data-v-14d16c20="" className="shortcut mt-8">
                                                    <span data-v-14d16c20="" className="vs">so với 00:00-{('0'+new Date().getHours()).slice(-2)}:00 hôm qua</span> 
                                                    <div data-v-14d16c20="" className="percent">
                                                        <i data-v-14d16c20="" className="inline-svg-container icon up-icon" style={{display: 'none'}}>
                                                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.12046 1.57395C4.5011 0.887937 5.48741 0.887414 5.86878 1.57302L9.17336 7.5139C9.54412 8.18044 9.06218 9 8.29946 9L1.69849 9C0.936239 9 0.454246 8.18134 0.824077 7.51482L4.12046 1.57395Z" fill="#30B566"></path></svg>
                                                        </i> 
                                                        <i data-v-14d16c20="" className="inline-svg-container icon down-icon" style={{display: 'none'}}>
                                                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.12046 8.42605C4.5011 9.11206 5.48741 9.11259 5.86878 8.42698L9.17336 2.4861C9.54412 1.81956 9.06218 1 8.29946 1L1.69849 0.999999C0.936239 0.999999 0.454246 1.81866 0.824077 2.48518L4.12046 8.42605Z" fill="#D3321C"></path></svg>
                                                        </i> 
                                                        <div data-v-48a974d6="" data-v-14d16c20="" className="percent-value"> 
                                                            <span data-v-48a974d6="" className="rate-class-name">0,00</span>
                                                            <span data-v-48a974d6="" className="symbol-class-name">%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div data-v-14d16c20="" data-v-34f6c9f3="" className="key-metric-item track-click-key-metric-item key-metric km-selectable selected" style={{borderTop: '4px solid rgb(38, 115, 221)', width: '188px', marginLeft: '16px'}}>
                                                <div data-v-14d16c20="" className="title">
                                                    <span data-v-14d16c20="" style={{marginRight: '4px'}}>Đơn hàng</span> 
                                                    <div data-v-6e5f6649="" data-v-14d16c20="" className="info-tooltip popover popover--light" style={{color: 'rgb(183, 183, 183)'}}>
                                                        <div className="popover__ref">
                                                            <i data-v-6e5f6649="" className="icon" style={{cursor: 'pointer'}}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8,1 C11.8659932,1 15,4.13400675 15,8 C15,11.8659932 11.8659932,15 8,15 C4.13400675,15 1,11.8659932 1,8 C1,4.13400675 4.13400675,1 8,1 Z M8,2 C4.6862915,2 2,4.6862915 2,8 C2,11.3137085 4.6862915,14 8,14 C11.3137085,14 14,11.3137085 14,8 C14,4.6862915 11.3137085,2 8,2 Z M7.98750749,10.2375075 C8.40172105,10.2375075 8.73750749,10.5732939 8.73750749,10.9875075 C8.73750749,11.401721 8.40172105,11.7375075 7.98750749,11.7375075 C7.57329392,11.7375075 7.23750749,11.401721 7.23750749,10.9875075 C7.23750749,10.5732939 7.57329392,10.2375075 7.98750749,10.2375075 Z M8.11700238,4.60513307 C9.97011776,4.60513307 10.7745841,6.50497267 9.94298079,7.72186504 C9.76926425,7.97606597 9.56587088,8.14546785 9.27050506,8.31454843 L9.11486938,8.39945305 L8.95824852,8.47993747 C8.56296349,8.68261431 8.49390831,8.75808648 8.49390831,9.0209925 C8.49390831,9.29713488 8.27005069,9.5209925 7.99390831,9.5209925 C7.71776594,9.5209925 7.49390831,9.29713488 7.49390831,9.0209925 C7.49390831,8.34166619 7.7650409,7.99681515 8.35913594,7.6662627 L8.76655168,7.45066498 C8.9424056,7.3502536 9.04307851,7.26633638 9.11735517,7.1576467 C9.52116165,6.56675314 9.11397414,5.60513307 8.11700238,5.60513307 C7.41791504,5.60513307 6.82814953,6.01272878 6.75715965,6.55275918 L6.75,6.66244953 L6.74194433,6.75232516 C6.69960837,6.98557437 6.49545989,7.16244953 6.25,7.16244953 C5.97385763,7.16244953 5.75,6.9385919 5.75,6.66244953 C5.75,5.44256682 6.87194406,4.60513307 8.11700238,4.60513307 Z"></path></svg>
                                                            </i>
                                                        </div> 
                                                        <div className="popper popover__popper popover__popper--light with-arrow" style={{display: 'none', maxWidth: '320px'}}>
                                                            <div className="popover__content">Tổng giá trị của các đơn hàng đã xác nhận (bao gồm không thanh toán khi nhận hàng và xác nhận thanh toán khi nhận hàng) trong khoảng thời gian đã chọn, bao gồm cả các đơn hàng đã hủy và trả hàng / hoàn tiền.</div>
                                                        </div>
                                                    </div>
                                                </div> 
                                                <div data-v-14d16c20="" className="value">
                                                    <label data-v-14d16c20="" className="number">
                                                        <span className="number">
                                                            <span className="currency-value">0</span>
                                                        </span>
                                                    </label>
                                                </div> 
                                                <div data-v-14d16c20="" className="shortcut mt-8">
                                                    <span data-v-14d16c20="" className="vs">so với 00:00-{('0'+new Date().getHours()).slice(-2)}:00 hôm qua</span> 
                                                    <div data-v-14d16c20="" className="percent">
                                                        <i data-v-14d16c20="" className="inline-svg-container icon up-icon" style={{display: 'none'}}>
                                                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.12046 1.57395C4.5011 0.887937 5.48741 0.887414 5.86878 1.57302L9.17336 7.5139C9.54412 8.18044 9.06218 9 8.29946 9L1.69849 9C0.936239 9 0.454246 8.18134 0.824077 7.51482L4.12046 1.57395Z" fill="#30B566"></path></svg>
                                                        </i> 
                                                        <i data-v-14d16c20="" className="inline-svg-container icon down-icon" style={{display: 'none'}}>
                                                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.12046 8.42605C4.5011 9.11206 5.48741 9.11259 5.86878 8.42698L9.17336 2.4861C9.54412 1.81956 9.06218 1 8.29946 1L1.69849 0.999999C0.936239 0.999999 0.454246 1.81866 0.824077 2.48518L4.12046 8.42605Z" fill="#D3321C"></path></svg>
                                                        </i> 
                                                        <div data-v-48a974d6="" data-v-14d16c20="" className="percent-value"> 
                                                            <span data-v-48a974d6="" className="rate-class-name">0,00</span>
                                                            <span data-v-48a974d6="" className="symbol-class-name">%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div data-v-14d16c20="" data-v-34f6c9f3="" className="key-metric-item track-click-key-metric-item key-metric km-selectable selected" style={{borderTop: '4px solid rgb(38, 115, 221)', width: '188px', marginLeft: '16px'}}>
                                                <div data-v-14d16c20="" className="title">
                                                    <span data-v-14d16c20="" style={{marginRight: '4px'}}>Đơn hàng</span> 
                                                    <div data-v-6e5f6649="" data-v-14d16c20="" className="info-tooltip popover popover--light" style={{color: 'rgb(183, 183, 183)'}}>
                                                        <div className="popover__ref">
                                                            <i data-v-6e5f6649="" className="icon" style={{cursor: 'pointer'}}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8,1 C11.8659932,1 15,4.13400675 15,8 C15,11.8659932 11.8659932,15 8,15 C4.13400675,15 1,11.8659932 1,8 C1,4.13400675 4.13400675,1 8,1 Z M8,2 C4.6862915,2 2,4.6862915 2,8 C2,11.3137085 4.6862915,14 8,14 C11.3137085,14 14,11.3137085 14,8 C14,4.6862915 11.3137085,2 8,2 Z M7.98750749,10.2375075 C8.40172105,10.2375075 8.73750749,10.5732939 8.73750749,10.9875075 C8.73750749,11.401721 8.40172105,11.7375075 7.98750749,11.7375075 C7.57329392,11.7375075 7.23750749,11.401721 7.23750749,10.9875075 C7.23750749,10.5732939 7.57329392,10.2375075 7.98750749,10.2375075 Z M8.11700238,4.60513307 C9.97011776,4.60513307 10.7745841,6.50497267 9.94298079,7.72186504 C9.76926425,7.97606597 9.56587088,8.14546785 9.27050506,8.31454843 L9.11486938,8.39945305 L8.95824852,8.47993747 C8.56296349,8.68261431 8.49390831,8.75808648 8.49390831,9.0209925 C8.49390831,9.29713488 8.27005069,9.5209925 7.99390831,9.5209925 C7.71776594,9.5209925 7.49390831,9.29713488 7.49390831,9.0209925 C7.49390831,8.34166619 7.7650409,7.99681515 8.35913594,7.6662627 L8.76655168,7.45066498 C8.9424056,7.3502536 9.04307851,7.26633638 9.11735517,7.1576467 C9.52116165,6.56675314 9.11397414,5.60513307 8.11700238,5.60513307 C7.41791504,5.60513307 6.82814953,6.01272878 6.75715965,6.55275918 L6.75,6.66244953 L6.74194433,6.75232516 C6.69960837,6.98557437 6.49545989,7.16244953 6.25,7.16244953 C5.97385763,7.16244953 5.75,6.9385919 5.75,6.66244953 C5.75,5.44256682 6.87194406,4.60513307 8.11700238,4.60513307 Z"></path></svg>
                                                            </i>
                                                        </div> 
                                                        <div className="popper popover__popper popover__popper--light with-arrow" style={{display: 'none', maxWidth: '320px'}}>
                                                            <div className="popover__content">Tổng giá trị của các đơn hàng đã xác nhận (bao gồm không thanh toán khi nhận hàng và xác nhận thanh toán khi nhận hàng) trong khoảng thời gian đã chọn, bao gồm cả các đơn hàng đã hủy và trả hàng / hoàn tiền.</div>
                                                        </div>
                                                    </div>
                                                </div> 
                                                <div data-v-14d16c20="" className="value">
                                                    <label data-v-14d16c20="" className="number">
                                                        <span className="number">
                                                            <span className="currency-value">0</span>
                                                        </span>
                                                    </label>
                                                </div> 
                                                <div data-v-14d16c20="" className="shortcut mt-8">
                                                    <span data-v-14d16c20="" className="vs">so với 00:00-{('0'+new Date().getHours()).slice(-2)}:00 hôm qua</span> 
                                                    <div data-v-14d16c20="" className="percent">
                                                        <i data-v-14d16c20="" className="inline-svg-container icon up-icon" style={{display: 'none'}}>
                                                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.12046 1.57395C4.5011 0.887937 5.48741 0.887414 5.86878 1.57302L9.17336 7.5139C9.54412 8.18044 9.06218 9 8.29946 9L1.69849 9C0.936239 9 0.454246 8.18134 0.824077 7.51482L4.12046 1.57395Z" fill="#30B566"></path></svg>
                                                        </i> 
                                                        <i data-v-14d16c20="" className="inline-svg-container icon down-icon" style={{display: 'none'}}>
                                                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.12046 8.42605C4.5011 9.11206 5.48741 9.11259 5.86878 8.42698L9.17336 2.4861C9.54412 1.81956 9.06218 1 8.29946 1L1.69849 0.999999C0.936239 0.999999 0.454246 1.81866 0.824077 2.48518L4.12046 8.42605Z" fill="#D3321C"></path></svg>
                                                        </i> 
                                                        <div data-v-48a974d6="" data-v-14d16c20="" className="percent-value"> 
                                                            <span data-v-48a974d6="" className="rate-class-name">0,00</span>
                                                            <span data-v-48a974d6="" className="symbol-class-name">%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div data-v-14d16c20="" data-v-34f6c9f3="" className="key-metric-item track-click-key-metric-item key-metric km-selectable selected" style={{borderTop: '4px solid rgb(38, 115, 221)', width: '188px', marginLeft: '16px'}}>
                                                <div data-v-14d16c20="" className="title">
                                                    <span data-v-14d16c20="" style={{marginRight: '4px'}}>Đơn hàng</span> 
                                                    <div data-v-6e5f6649="" data-v-14d16c20="" className="info-tooltip popover popover--light" style={{color: 'rgb(183, 183, 183)'}}>
                                                        <div className="popover__ref">
                                                            <i data-v-6e5f6649="" className="icon" style={{cursor: 'pointer'}}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8,1 C11.8659932,1 15,4.13400675 15,8 C15,11.8659932 11.8659932,15 8,15 C4.13400675,15 1,11.8659932 1,8 C1,4.13400675 4.13400675,1 8,1 Z M8,2 C4.6862915,2 2,4.6862915 2,8 C2,11.3137085 4.6862915,14 8,14 C11.3137085,14 14,11.3137085 14,8 C14,4.6862915 11.3137085,2 8,2 Z M7.98750749,10.2375075 C8.40172105,10.2375075 8.73750749,10.5732939 8.73750749,10.9875075 C8.73750749,11.401721 8.40172105,11.7375075 7.98750749,11.7375075 C7.57329392,11.7375075 7.23750749,11.401721 7.23750749,10.9875075 C7.23750749,10.5732939 7.57329392,10.2375075 7.98750749,10.2375075 Z M8.11700238,4.60513307 C9.97011776,4.60513307 10.7745841,6.50497267 9.94298079,7.72186504 C9.76926425,7.97606597 9.56587088,8.14546785 9.27050506,8.31454843 L9.11486938,8.39945305 L8.95824852,8.47993747 C8.56296349,8.68261431 8.49390831,8.75808648 8.49390831,9.0209925 C8.49390831,9.29713488 8.27005069,9.5209925 7.99390831,9.5209925 C7.71776594,9.5209925 7.49390831,9.29713488 7.49390831,9.0209925 C7.49390831,8.34166619 7.7650409,7.99681515 8.35913594,7.6662627 L8.76655168,7.45066498 C8.9424056,7.3502536 9.04307851,7.26633638 9.11735517,7.1576467 C9.52116165,6.56675314 9.11397414,5.60513307 8.11700238,5.60513307 C7.41791504,5.60513307 6.82814953,6.01272878 6.75715965,6.55275918 L6.75,6.66244953 L6.74194433,6.75232516 C6.69960837,6.98557437 6.49545989,7.16244953 6.25,7.16244953 C5.97385763,7.16244953 5.75,6.9385919 5.75,6.66244953 C5.75,5.44256682 6.87194406,4.60513307 8.11700238,4.60513307 Z"></path></svg>
                                                            </i>
                                                        </div> 
                                                        <div className="popper popover__popper popover__popper--light with-arrow" style={{display: 'none', maxWidth: '320px'}}>
                                                            <div className="popover__content">Tổng giá trị của các đơn hàng đã xác nhận (bao gồm không thanh toán khi nhận hàng và xác nhận thanh toán khi nhận hàng) trong khoảng thời gian đã chọn, bao gồm cả các đơn hàng đã hủy và trả hàng / hoàn tiền.</div>
                                                        </div>
                                                    </div>
                                                </div> 
                                                <div data-v-14d16c20="" className="value">
                                                    <label data-v-14d16c20="" className="number">
                                                        <span className="number">
                                                            <span className="currency-value">0</span>
                                                        </span>
                                                    </label>
                                                </div> 
                                                <div data-v-14d16c20="" className="shortcut mt-8">
                                                    <span data-v-14d16c20="" className="vs">so với 00:00-{('0'+new Date().getHours()).slice(-2)}:00 hôm qua</span> 
                                                    <div data-v-14d16c20="" className="percent">
                                                        <i data-v-14d16c20="" className="inline-svg-container icon up-icon" style={{display: 'none'}}>
                                                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.12046 1.57395C4.5011 0.887937 5.48741 0.887414 5.86878 1.57302L9.17336 7.5139C9.54412 8.18044 9.06218 9 8.29946 9L1.69849 9C0.936239 9 0.454246 8.18134 0.824077 7.51482L4.12046 1.57395Z" fill="#30B566"></path></svg>
                                                        </i> 
                                                        <i data-v-14d16c20="" className="inline-svg-container icon down-icon" style={{display: 'none'}}>
                                                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.12046 8.42605C4.5011 9.11206 5.48741 9.11259 5.86878 8.42698L9.17336 2.4861C9.54412 1.81956 9.06218 1 8.29946 1L1.69849 0.999999C0.936239 0.999999 0.454246 1.81866 0.824077 2.48518L4.12046 8.42605Z" fill="#D3321C"></path></svg>
                                                        </i> 
                                                        <div data-v-48a974d6="" data-v-14d16c20="" className="percent-value"> 
                                                            <span data-v-48a974d6="" className="rate-class-name">0,00</span>
                                                            <span data-v-48a974d6="" className="symbol-class-name">%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div data-v-14d16c20="" data-v-34f6c9f3="" className="key-metric-item track-click-key-metric-item key-metric km-selectable selected" style={{borderTop: '4px solid rgb(38, 115, 221)', width: '188px', marginLeft: '16px'}}>
                                                <div data-v-14d16c20="" className="title">
                                                    <span data-v-14d16c20="" style={{marginRight: '4px'}}>Đơn hàng</span> 
                                                    <div data-v-6e5f6649="" data-v-14d16c20="" className="info-tooltip popover popover--light" style={{color: 'rgb(183, 183, 183)'}}>
                                                        <div className="popover__ref">
                                                            <i data-v-6e5f6649="" className="icon" style={{cursor: 'pointer'}}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8,1 C11.8659932,1 15,4.13400675 15,8 C15,11.8659932 11.8659932,15 8,15 C4.13400675,15 1,11.8659932 1,8 C1,4.13400675 4.13400675,1 8,1 Z M8,2 C4.6862915,2 2,4.6862915 2,8 C2,11.3137085 4.6862915,14 8,14 C11.3137085,14 14,11.3137085 14,8 C14,4.6862915 11.3137085,2 8,2 Z M7.98750749,10.2375075 C8.40172105,10.2375075 8.73750749,10.5732939 8.73750749,10.9875075 C8.73750749,11.401721 8.40172105,11.7375075 7.98750749,11.7375075 C7.57329392,11.7375075 7.23750749,11.401721 7.23750749,10.9875075 C7.23750749,10.5732939 7.57329392,10.2375075 7.98750749,10.2375075 Z M8.11700238,4.60513307 C9.97011776,4.60513307 10.7745841,6.50497267 9.94298079,7.72186504 C9.76926425,7.97606597 9.56587088,8.14546785 9.27050506,8.31454843 L9.11486938,8.39945305 L8.95824852,8.47993747 C8.56296349,8.68261431 8.49390831,8.75808648 8.49390831,9.0209925 C8.49390831,9.29713488 8.27005069,9.5209925 7.99390831,9.5209925 C7.71776594,9.5209925 7.49390831,9.29713488 7.49390831,9.0209925 C7.49390831,8.34166619 7.7650409,7.99681515 8.35913594,7.6662627 L8.76655168,7.45066498 C8.9424056,7.3502536 9.04307851,7.26633638 9.11735517,7.1576467 C9.52116165,6.56675314 9.11397414,5.60513307 8.11700238,5.60513307 C7.41791504,5.60513307 6.82814953,6.01272878 6.75715965,6.55275918 L6.75,6.66244953 L6.74194433,6.75232516 C6.69960837,6.98557437 6.49545989,7.16244953 6.25,7.16244953 C5.97385763,7.16244953 5.75,6.9385919 5.75,6.66244953 C5.75,5.44256682 6.87194406,4.60513307 8.11700238,4.60513307 Z"></path></svg>
                                                            </i>
                                                        </div> 
                                                        <div className="popper popover__popper popover__popper--light with-arrow" style={{display: 'none', maxWidth: '320px'}}>
                                                            <div className="popover__content">Tổng giá trị của các đơn hàng đã xác nhận (bao gồm không thanh toán khi nhận hàng và xác nhận thanh toán khi nhận hàng) trong khoảng thời gian đã chọn, bao gồm cả các đơn hàng đã hủy và trả hàng / hoàn tiền.</div>
                                                        </div>
                                                    </div>
                                                </div> 
                                                <div data-v-14d16c20="" className="value">
                                                    <label data-v-14d16c20="" className="number">
                                                        <span className="number">
                                                            <span className="currency-value">0</span>
                                                        </span>
                                                    </label>
                                                </div> 
                                                <div data-v-14d16c20="" className="shortcut mt-8">
                                                    <span data-v-14d16c20="" className="vs">so với 00:00-{('0'+new Date().getHours()).slice(-2)}:00 hôm qua</span> 
                                                    <div data-v-14d16c20="" className="percent">
                                                        <i data-v-14d16c20="" className="inline-svg-container icon up-icon" style={{display: 'none'}}>
                                                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.12046 1.57395C4.5011 0.887937 5.48741 0.887414 5.86878 1.57302L9.17336 7.5139C9.54412 8.18044 9.06218 9 8.29946 9L1.69849 9C0.936239 9 0.454246 8.18134 0.824077 7.51482L4.12046 1.57395Z" fill="#30B566"></path></svg>
                                                        </i> 
                                                        <i data-v-14d16c20="" className="inline-svg-container icon down-icon" style={{display: 'none'}}>
                                                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.12046 8.42605C4.5011 9.11206 5.48741 9.11259 5.86878 8.42698L9.17336 2.4861C9.54412 1.81956 9.06218 1 8.29946 1L1.69849 0.999999C0.936239 0.999999 0.454246 1.81866 0.824077 2.48518L4.12046 8.42605Z" fill="#D3321C"></path></svg>
                                                        </i> 
                                                        <div data-v-48a974d6="" data-v-14d16c20="" className="percent-value"> 
                                                            <span data-v-48a974d6="" className="rate-class-name">0,00</span>
                                                            <span data-v-48a974d6="" className="symbol-class-name">%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div data-v-14d16c20="" data-v-34f6c9f3="" className="key-metric-item track-click-key-metric-item key-metric km-selectable selected" style={{borderTop: '4px solid rgb(38, 115, 221)', width: '188px', marginLeft: '16px'}}>
                                                <div data-v-14d16c20="" className="title">
                                                    <span data-v-14d16c20="" style={{marginRight: '4px'}}>Đơn hàng</span> 
                                                    <div data-v-6e5f6649="" data-v-14d16c20="" className="info-tooltip popover popover--light" style={{color: 'rgb(183, 183, 183)'}}>
                                                        <div className="popover__ref">
                                                            <i data-v-6e5f6649="" className="icon" style={{cursor: 'pointer'}}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8,1 C11.8659932,1 15,4.13400675 15,8 C15,11.8659932 11.8659932,15 8,15 C4.13400675,15 1,11.8659932 1,8 C1,4.13400675 4.13400675,1 8,1 Z M8,2 C4.6862915,2 2,4.6862915 2,8 C2,11.3137085 4.6862915,14 8,14 C11.3137085,14 14,11.3137085 14,8 C14,4.6862915 11.3137085,2 8,2 Z M7.98750749,10.2375075 C8.40172105,10.2375075 8.73750749,10.5732939 8.73750749,10.9875075 C8.73750749,11.401721 8.40172105,11.7375075 7.98750749,11.7375075 C7.57329392,11.7375075 7.23750749,11.401721 7.23750749,10.9875075 C7.23750749,10.5732939 7.57329392,10.2375075 7.98750749,10.2375075 Z M8.11700238,4.60513307 C9.97011776,4.60513307 10.7745841,6.50497267 9.94298079,7.72186504 C9.76926425,7.97606597 9.56587088,8.14546785 9.27050506,8.31454843 L9.11486938,8.39945305 L8.95824852,8.47993747 C8.56296349,8.68261431 8.49390831,8.75808648 8.49390831,9.0209925 C8.49390831,9.29713488 8.27005069,9.5209925 7.99390831,9.5209925 C7.71776594,9.5209925 7.49390831,9.29713488 7.49390831,9.0209925 C7.49390831,8.34166619 7.7650409,7.99681515 8.35913594,7.6662627 L8.76655168,7.45066498 C8.9424056,7.3502536 9.04307851,7.26633638 9.11735517,7.1576467 C9.52116165,6.56675314 9.11397414,5.60513307 8.11700238,5.60513307 C7.41791504,5.60513307 6.82814953,6.01272878 6.75715965,6.55275918 L6.75,6.66244953 L6.74194433,6.75232516 C6.69960837,6.98557437 6.49545989,7.16244953 6.25,7.16244953 C5.97385763,7.16244953 5.75,6.9385919 5.75,6.66244953 C5.75,5.44256682 6.87194406,4.60513307 8.11700238,4.60513307 Z"></path></svg>
                                                            </i>
                                                        </div> 
                                                        <div className="popper popover__popper popover__popper--light with-arrow" style={{display: 'none', maxWidth: '320px'}}>
                                                            <div className="popover__content">Tổng giá trị của các đơn hàng đã xác nhận (bao gồm không thanh toán khi nhận hàng và xác nhận thanh toán khi nhận hàng) trong khoảng thời gian đã chọn, bao gồm cả các đơn hàng đã hủy và trả hàng / hoàn tiền.</div>
                                                        </div>
                                                    </div>
                                                </div> 
                                                <div data-v-14d16c20="" className="value">
                                                    <label data-v-14d16c20="" className="number">
                                                        <span className="number">
                                                            <span className="currency-value">0</span>
                                                        </span>
                                                    </label>
                                                </div> 
                                                <div data-v-14d16c20="" className="shortcut mt-8">
                                                    <span data-v-14d16c20="" className="vs">so với 00:00-{('0'+new Date().getHours()).slice(-2)}:00 hôm qua</span> 
                                                    <div data-v-14d16c20="" className="percent">
                                                        <i data-v-14d16c20="" className="inline-svg-container icon up-icon" style={{display: 'none'}}>
                                                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.12046 1.57395C4.5011 0.887937 5.48741 0.887414 5.86878 1.57302L9.17336 7.5139C9.54412 8.18044 9.06218 9 8.29946 9L1.69849 9C0.936239 9 0.454246 8.18134 0.824077 7.51482L4.12046 1.57395Z" fill="#30B566"></path></svg>
                                                        </i> 
                                                        <i data-v-14d16c20="" className="inline-svg-container icon down-icon" style={{display: 'none'}}>
                                                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.12046 8.42605C4.5011 9.11206 5.48741 9.11259 5.86878 8.42698L9.17336 2.4861C9.54412 1.81956 9.06218 1 8.29946 1L1.69849 0.999999C0.936239 0.999999 0.454246 1.81866 0.824077 2.48518L4.12046 8.42605Z" fill="#D3321C"></path></svg>
                                                        </i> 
                                                        <div data-v-48a974d6="" data-v-14d16c20="" className="percent-value"> 
                                                            <span data-v-48a974d6="" className="rate-class-name">0,00</span>
                                                            <span data-v-48a974d6="" className="symbol-class-name">%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    
                                    <div className="chartBox">
                                        <div style={{position: 'relative', width: '1208px', height: '258px', padding: '0px', margin: '0px', borderWidth: '0px', cursor: 'default'}}>
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
                        </div>
                    </div>:
                    <div className="_3BIslJ">
                        <div className="loading_item item-center">
                            <div className="ball"></div>
                            <div className="ball"></div>
                            <div className="ball"></div>
                        </div>
                    </div>
                    }
                </div>
            </div>
            <div id="mini-chat-embedded" style={{position: 'fixed', right: '8px', bottom: '0px', zIndex: 99999}}>
                <Message/>
            </div>    
        </> 
    )
}

export default Dashboard