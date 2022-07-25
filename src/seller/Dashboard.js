import axios from 'axios';
import Navbar from "./Navbar"
import { useParams,Link,useSearchParams } from "react-router-dom";
import React, {useState,useEffect,useCallback,useRef, useMemo} from 'react'
import {timeformat,timevalue,formatter} from "../constants"
import Calendar from 'react-calendar/dist/umd/Calendar';
import {dashboardURL,} from "../urls"
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
import NavbarDashboard from './dashboard/Navbardashboard';
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
const today=new Date()
const yesterday=new Date(new Date().setDate(new Date().getDate() - 1))
const lastweek=new Date(new Date().setDate(new Date().getDate() - 7))
const lastmonth=new Date(new Date().setDate(new Date().getDate() - 30))
const Importantstats=[{id:1,name:'Doanh số',type:'symbol',info:'Tổng giá trị của các đơn hàng bao gồm sản phẩm từ Combo Khuyến Mãi được xác nhận (bao gồm phí vận chuyển nhưng không bao gồm những khuyến mãi khác), tính trong khoảng thời gian đã chọn.',percent:0},
{id:2,name:"Đơn hàng",type:'number',info:'',text:'',percent:0},
{id:3,name:'Số lương sản phẩm đã bán',type:'number',info:'',text:'',percent:0},
{id:4,name:'Người mua',type:'number',info:'',text:'',percent:0,},
{id:5,name:'Số lượng Combo Khuyến Mãi đã bán',type:'number',info:'',text:'',percent:0,}
,{id:6,name:'Doanh số trên mỗi Người mua',type:'number',info:'',text:'',percent:0,}]
const listtypeorder=[{name:'Đơn Đã Xác Nhận',value:'accepted',info:'Tất cả các đơn được người mua đặt hàng thành công. Bao gồm cả đơn đã thanh toán và đơn thanh toán sau khi nhận hàng (trước và sau khi hệ thống Anhdai xác nhận).'},
{name:'Đơn Đã Thanh Toán',value:'received',info:'Tất cả các đơn được người mua đặt hàng thành công. Bao gồm cả đơn đã thanh toán và đơn thanh toán sau khi nhận hàng (trước và sau khi hệ thống Anhdai xác nhận).'},
{name:"Tất cả đơn",value:'all',info:"Tất cả các đơn được người mua đặt hàng thành công. Bao gồm cả đơn đã thanh toán và đơn thanh toán sau khi nhận hàng (trước và sau khi hệ thống Anhdai xác nhận)."}]
const stylechart=`position:absolute;
    font:14px / 21px &quot;Microsoft YaHei&quot;
    padding:0px;
    border:1px solid rgb(229, 229, 229);
    background:rgba(255, 255, 255, 0.95);
    border-radius:4px;
    color:rgb(255, 255, 255);
    display:block;
    pointer-events:none;
    box-shadow:rgba(0, 0, 0, 0.12) 0px 6px 16px 0px;
    white-space:nowrap;
    z-index:9999999;
    transform:translate(-50%, 0) , top 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s;
    transition:left 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s`
const Dashboard=(props)=>{
    const {datatime,promotion,url}=props
    const [state,setState]=useState(()=>{return{time:[{name:'Today',time_display:`Tới ${today.getHours()} now`,value:'current_day'},
    {name:'Yesterday',value:'yesterday',time_display:timeformat(yesterday)},
    {name:'Last 7 days',value:'week_before',time_display:timeformat(lastweek) + ' - ' + timeformat(today)},
    {name:'Thirty day ago',value:'month_before',time_display:timeformat(lastmonth) + ' - ' + timeformat(today)}],
    date:[{name:'By day',time:'month',value:null},{name:'By week',time:'month',value:null},{name:'By month',time:'year',value:null},{name:'By year',time:'decade',value:null}],
    time_choice:null,date_choice:'month',hover:null,}})
    const [dashboard,setDashboard]=useState({time_choice:`Tới ${today.getHours()} now`,name:'Today',show_time:true,value:'today'})
    const [typeorder,setTypeorder]=useState('all')
    const calendar=useRef();
    const [timechoice,setTimechoice]=useState()
    const [params, setSearchParams] = useSearchParams();
    const [time,setTime]=useState()
    const chartRef = useRef();
    const [show,setShow]=useState({show_order:false,show:false})
    const [date,setDate]=useState(()=>new Date())
    const [labels,setLabels]=useState([])
    const [sum,setSum]=useState(0)
    const [count,setCount]=useState(0)
    const [listsum,setListsum]=useState([])
    const [listcount,setListcount]=useState([])
    const typeorderref=useRef()
    const dateref=useRef()
    const chart=useMemo(()=>{return{
            labels:labels,
            datasets: [
            {
                label: 'Doanh thu',
                data: listsum,
                fill:true,
                borderColor: 'rgb(38, 115, 221)',
                backgroundColor: 'rgb(38, 115, 221)',
            },
            {
                label: 'Luot truy cap',
                data: listcount,
                fill:true,
                borderColor: 'rgb(88, 183, 241)',
                backgroundColor: 'rgb(88, 183, 241)',
            },
        ],
    }},[listsum,listcount,labels])

    const [loading,setLoading]=useState(false)
    const [options,setOptions]=useState({
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
    })

    useEffect(() => {
        document.addEventListener('click', handleClick)
        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [])
    const handleClick = (event) => {
        const { target } = event
        if(typeorderref.current!=null){
            if (!typeorderref.current.contains(target)) {
                setShow(current=>{return {...current,show_order:false}})
            }
        }
        if(dateref.current!=null){
            if (!dateref.current.contains(target)) {
                setShow(current=>{return {...current,show:false}})
            }
        }
    }

    useEffect(() => {
        (async () => {
                const urldata=url?url:dashboardURL
                const res= await axios(`${urldata}`,headers)
            // <-- passed to API URL
                const arr=Array(25).fill().map((_,i)=>{
                return ('0'+i).slice(-2)+':00'
                })
                const sum=res.data.sum.reduce((total,item)=>{
                    return(total+item)
                },0)
                const count=res.data.count.reduce((count,item)=>{
                    return(count+item)
                },0)
                setSum(sum)
                setLabels(arr)
                setCount(count)
                setListsum(res.data.sum)
                setListcount(res.data.count)
                setLoading(true)
        })();
    }, []);
    
    useEffect(() => {
        const getOrCreateTooltip = (chart) => {
            let tooltipEl = chart.canvas.parentNode.querySelector('div');          
            if (!tooltipEl) {
            tooltipEl = document.createElement('div');
            tooltipEl.style=stylechart
            console.log(tooltipEl)
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
        setOptions(options)
    }, []);

    useEffect(()=>{
        (async()=>{
            if(time){
                const urldata=url?url:dashboardURL
                const search_params=params
                search_params.set('time',time)
                search_params.set('time_choice',timechoice)
                if(!promotion){
                    search_params.set('typeorder',typeorder)
                }
                setShow({...show,show:false,show_order:false})
                const res=await axios.get(`${urldata}?${search_params}`,headers)
                const sum=res.data.sum.reduce((total,item)=>{
                    return(total+item)
                },0)
                const count=res.data.count.reduce((count,item)=>{
                    return(count+item)
                },0)
                setSum(sum)
                setCount(count)
                setListsum(res.data.sum)
                setListcount(res.data.count)
                setLoading(true)
                setLabels(res.data.time)
            }
        })()
    },[typeorder,promotion,time,timechoice])
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
        setTimechoice(item.time)
        setTime(item.value)
        setDashboard({...dashboard,time_choice:item.time_display,name:item.name})
    }
    const setdaychoice=(value)=>{
        setDate(value)
        setTimechoice(timeformat(value))
        setTime('day')
        setDashboard({...dashboard,name:"By day",time_choice:timeformat(value),value:timevalue(value)})
    }
    const setshow=(e)=>{
        setShow({...show,show:!state.show})
    }
   
    const setshoworder=(e)=>{
        setShow({...show,show_order:!show.show_order})
    }

    const setordertype=(item)=>{
        setTypeorder(item.value)
        setShow({...show,show_order:false})
    }
    const setyearchoice=(value)=>{
        setDate(value)
        setTime('year')
        setDashboard({...dashboard,name:"By year",time_choice:value.getFullYear(),value:timevalue(value)})
        setTimechoice(timevalue(value))
    }
    const setmonthchoice=(value)=>{
        setDate(value)
        setTime('month')
        setTimechoice(timevalue(value))
        setDashboard({...dashboard,value:timevalue(value),name:"By month",time_choice:value.getFullYear()+'.'+('0'+(value.getMonth()+1)).slice(-2)})
    }
    const setweekchoice=(week,value)=>{
        setDate(value)
        setTime('week')
        setTimechoice(timevalue(value))
        setDashboard({...dashboard,value:timevalue(value),name:"By week",time_choice:`${timeformat(value)} - ${timeformat(value.setDate(value.getDate() + 7))}`})
    }
    
    return(
        <>  
            <div id="app">
                <Navbar/>
                <div className="data-center-layout">
                    <NavbarDashboard/>
                    {loading?
                    <div data-v-47de0c38 className="app-container">
                        <div className="dashboard app-container-body full-container-body">
                            <div fragment="b4c855caa6" className="sticky"></div>
                            <div className="fixed-time-selector">
                                <div className="date-export item-center">
                                    <div className='date-period item-center'>
                                        <span className="mr-1">Time frame</span>
                                        <div ref={dateref} className="date-export__datepick popover--light">
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
                                                <div className="date_picker popper_content" style={{display:`${show.show?'':'none'}`}}>
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
                                    {promotion?'':
                                    <div className="order_type_container item-center">
                                        <div className="order-type item-center">
                                            <span>Loại Đơn Hàng</span> 
                                            <div ref={typeorderref} className="order-type-select select ml-1_2">
                                                <div onClick={(e)=>setshoworder(e)} tabindex="0" className="selector selector--normal item-space"> 
                                                    <div className="selector__inner line-clamp--1">{listtypeorder.find(item=>item.value==typeorder).name}</div> 
                                                    <div className="selector__suffix"> 
                                                        <i className="selector__suffix-icon icon">
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M8,9.18933983 L4.03033009,5.21966991 C3.73743687,4.9267767 3.26256313,4.9267767 2.96966991,5.21966991 C2.6767767,5.51256313 2.6767767,5.98743687 2.96966991,6.28033009 L7.46966991,10.7803301 C7.76256313,11.0732233 8.23743687,11.0732233 8.53033009,10.7803301 L13.0303301,6.28033009 C13.3232233,5.98743687 13.3232233,5.51256313 13.0303301,5.21966991 C12.7374369,4.9267767 12.2625631,4.9267767 11.9696699,5.21966991 L8,9.18933983 Z"></path></svg>
                                                        </i>
                                                    </div>
                                                </div> 
                                                <div className="popper bi-order-type-picker" style={{display: `${show.show_order?"":'none'}`}}> 
                                                    <div className="select__menu" style={{maxWidth: '440px', maxHeight: '218px'}}>
                                                        <div className="scrollbar">
                                                            <div className="scrollbar__wrapper">
                                                                <div className="scrollbar__bar vertical">
                                                                    <div className="scrollbar__thumb" style={{top: '0px', height: '0px'}}></div>
                                                                </div>  
                                                                <div className="scrollbar__content" style={{position: 'relative'}}>
                                                                    <div className="select__options">
                                                                        {listtypeorder.map(item=>
                                                                            <div key={item.value} onClick={()=>setordertype(item)} className={`option ${item.value==typeorder?'selected':''}`} id="type_placed_order">
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
                                    </div>}
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
                                                            <span className="currency-value">{formatter.format(sum)}</span>
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
                                                            <span className="currency-value">{count}</span>
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
                                            options={options}
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
            
        </> 
    )
}

export default Dashboard