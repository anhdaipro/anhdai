import React, { useEffect, useMemo, useState,useRef } from "react"
import { partition,time_end,timevalue,timeformat } from "../constants"
import axios from 'axios';
import { headers } from '../actions/auth';
import Calendar from './Calendar'
import {useNavigate,useSearchParams} from 'react-router-dom'

const time_start=new Date(new Date().setFullYear(new Date().getFullYear() - 20))
const next_month=new Date(new Date().setMonth(new Date().getMonth()+1))
const Daterange=(props)=>{
    const {setDaychoice,daychoice,title}=props
    const [startDate,setStartDate] =useState()
    const [endDate,setEndDate]=useState()
    const [show,setShow]=useState(false)
    const [changeday,setChangeday]=useState(false)
    const parent=useRef()
    const [day1,setDay1]=useState(new Date())
    const [day2,setDay2]=useState(next_month)
    const [range,setRange]=useState({start:null,end:null})
    const end=startDate>endDate?startDate:endDate
    const start=startDate<endDate?startDate:endDate
    useEffect(() => {
        document.addEventListener('click', handleClick)
        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [])
    
    const handleClick = (event) => {
        const { target } = event
        if(parent.current!=null){
            if (!parent.current.contains(target)) {
                setShow(false)
            }
        }
    }
    useEffect(() => {
        if(startDate&&endDate&&changeday){ 
            setDaychoice({start:start,end:end})   
            setShow(false)
        }
    }, [startDate,endDate,changeday])
    const setdayrange=(value)=>{
        if(startDate && endDate){
            setChangeday(false)
            if(!startDate){
            setStartDate(value) 
            setEndDate()
            }
            else{
                setStartDate() 
                setEndDate(value)
            }
            setRange({start:null,end:null})
        }
        else{
            setChangeday(true)
            if(!startDate){
                setStartDate(value)
            }
            else if(!endDate){
                setEndDate(value)
            }
        }   
    }
    const setdaychoice=(data,index)=>{
        if(index==0){
            setDay1(data)
        }
        else{
            setDay2(data)
        }
    }
    return(
        <div ref={parent} data-v-40673d96="" className="date-picker search-time">
            <div className="date-picker__input">
                <div onClick={(e)=>{
                    setShow(!show)
                    if(daychoice){
                        setChangeday(false)
                        setStartDate(daychoice.start)
                        setEndDate(daychoice.end)
                        setRange({start:daychoice.start,end:daychoice.end})
                    }
                    }
                    } tabIndex="0" className={`selector ${daychoice?'active-clearable':''} clearable selector--normal`}>
                    <div className="selector__prefix">
                        <i className="selector__prefix-icon icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M11.5156954,1 C11.7918378,1 12.0156954,1.22385763 12.0156954,1.5 L12.015,2 L14,2 C14.5522847,2 15,2.44771525 15,3 L15,14 C15,14.5522847 14.5522847,15 14,15 L2,15 C1.44771525,15 1,14.5522847 1,14 L1,3 C1,2.44771525 1.44771525,2 2,2 L3.991,2 L3.99143991,1.5 C3.99143991,1.22385763 4.21529754,1 4.49143991,1 C4.76758229,1 4.99143991,1.22385763 4.99143991,1.5 L4.991,2 L11.015,2 L11.0156954,1.5 C11.0156954,1.22385763 11.239553,1 11.5156954,1 Z M14,6 L2,6 L2,14 L14,14 L14,6 Z M5.5,11 C5.77614237,11 6,11.2238576 6,11.5 C6,11.7761424 5.77614237,12 5.5,12 L4.5,12 C4.22385763,12 4,11.7761424 4,11.5 C4,11.2238576 4.22385763,11 4.5,11 L5.5,11 Z M8.5,11 C8.77614237,11 9,11.2238576 9,11.5 C9,11.7761424 8.77614237,12 8.5,12 L7.5,12 C7.22385763,12 7,11.7761424 7,11.5 C7,11.2238576 7.22385763,11 7.5,11 L8.5,11 Z M11.5,11 C11.7761424,11 12,11.2238576 12,11.5 C12,11.7761424 11.7761424,12 11.5,12 L10.5,12 C10.2238576,12 10,11.7761424 10,11.5 C10,11.2238576 10.2238576,11 10.5,11 L11.5,11 Z M5.5,8 C5.77614237,8 6,8.22385763 6,8.5 C6,8.77614237 5.77614237,9 5.5,9 L4.5,9 C4.22385763,9 4,8.77614237 4,8.5 C4,8.22385763 4.22385763,8 4.5,8 L5.5,8 Z M8.5,8 C8.77614237,8 9,8.22385763 9,8.5 C9,8.77614237 8.77614237,9 8.5,9 L7.5,9 C7.22385763,9 7,8.77614237 7,8.5 C7,8.22385763 7.22385763,8 7.5,8 L8.5,8 Z M11.5,8 C11.7761424,8 12,8.22385763 12,8.5 C12,8.77614237 11.7761424,9 11.5,9 L10.5,9 C10.2238576,9 10,8.77614237 10,8.5 C10,8.22385763 10.2238576,8 10.5,8 L11.5,8 Z M3.991,3 L2,3 L2,5 L14,5 L14,3 L12.015,3 L12.0156954,3.5 C12.0156954,3.77614237 11.7918378,4 11.5156954,4 C11.239553,4 11.0156954,3.77614237 11.0156954,3.5 L11.015,3 L4.991,3 L4.99143991,3.5 C4.99143991,3.77614237 4.76758229,4 4.49143991,4 C4.21529754,4 3.99143991,3.77614237 3.99143991,3.5 L3.991,3 Z"></path></svg>
                        </i> 
                    </div> 
                    <div className="selector__inner placeholder line-clamp--1">{daychoice.start && daychoice.end?`${timeformat(daychoice.start)} - ${timeformat(daychoice.end)}`:title}</div> 
                    {daychoice.start && daychoice.end &&(<div className="selector__suffix">
                        <i onClick={(e)=>{
                            e.stopPropagation()
                            setStartDate()
                            setEndDate()
                            setDaychoice({end:null,start:null})}} className="selector__clear-btn icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8,2 C11.3137085,2 14,4.6862915 14,8 C14,11.3137085 11.3137085,14 8,14 C4.6862915,14 2,11.3137085 2,8 C2,4.6862915 4.6862915,2 8,2 Z M10.5924919,5.27303573 C10.4094355,5.1521972 10.1606887,5.17236516 9.99956233,5.33352414 L9.99956233,5.33352414 L8.00023568,7.33325477 L6.00047136,5.33349045 C5.81628967,5.14930876 5.51767215,5.14930876 5.33349045,5.33349045 L5.33349045,5.33349045 L5.27301564,5.40754038 C5.1522078,5.59059052 5.17239885,5.83931011 5.33355782,6.00040399 L5.33355782,6.00040399 L7.33372614,7.99976432 L5.33352414,9.99956232 L5.33352414,9.99956232 L5.27306194,10.0735738 C5.15220491,10.2566181 5.17234775,10.5053668 5.33349045,10.6665095 L5.33349045,10.6665095 L5.40750807,10.7269643 C5.5905645,10.8478028 5.83931125,10.8276348 6.00043768,10.6664759 L6.00043768,10.6664759 L8.00023568,8.66627386 L9.99959601,10.6664422 L9.99959601,10.6664422 L10.0736337,10.726932 C10.2566595,10.8477768 10.5053831,10.827636 10.6665095,10.6665095 C10.8506912,10.4823279 10.8506912,10.1837103 10.6665095,9.99952864 L10.6665095,9.99952864 L8.66674523,7.99976432 L10.6664759,6.00043767 L10.6664759,6.00043767 L10.7269381,5.92642616 C10.8477951,5.74338194 10.8276522,5.49463316 10.6665095,5.33349045 L10.6665095,5.33349045 Z"></path></svg>
                        </i> 
                    </div>)}
                </div>
            </div> 
            <div className="popper date-picker__picker"
            style={{position: `absolute`,display:`${show?'':'none'}`, zIndex: 10006, willChange: `top, left`, transformOrigin: `left top`, top: `40px`, left: `0px`}}
            >
                <div className="daterange-picker-panel">
                    <div className="daterange-picker-panel__body">
                        <div className="daterange-picker-panel__body-left">
                            <Calendar
                                selectRange={true}
                                hideOutMonth={true}
                                time_end={timevalue(time_end)}
                                startDate={startDate}
                                onChange={(value)=>setdayrange(value)}
                                endDate={endDate}
                                choice={'day'}
                                value={startDate}
                                show_month={true}
                                selectmonth={true}
                                index={0}
                                day1={day1}
                                key={0}
                                day2={day2}
                                setdaychoice={(data,index)=>setdaychoice(data,index)}
                                range={range}
                                setrange={(start,end)=>setRange({start:start,end:end})}
                                selectyear={true}
                                selectday={true}
                                time_start={timevalue(time_start)}
                            />
                        </div>
                        <div className="daterange-picker-panel__body-right">
                            <Calendar
                                selectRange={true}
                                time_end={timevalue(time_end)}
                                startDate={startDate}
                                value={endDate}
                                endDate={endDate}
                                index={1}
                                hideOutMonth={true}
                                key={1}
                                day1={day1}
                                day2={day2}
                                setdaychoice={(data,index)=>setdaychoice(data,index)}
                                setrange={(start,end)=>setRange({start:start,end:end})}
                                onChange={(value)=>setdayrange(value)}
                                choice={'day'}
                                show_month={true}
                                next_month={next_month}
                                selectmonth={true}
                                range={range}
                                selectyear={true}
                                selectday={true}
                                time_start={timevalue(time_start)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Daterange