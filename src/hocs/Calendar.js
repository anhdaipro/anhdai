import dayjs from "dayjs"
import "../css/calendar.css"
import React, { useEffect, useMemo, useState } from "react"
import { partition,timevalue } from "../constants"
const weekDays = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"]
const todayObj = dayjs()
const month_rows=partition(Array(12).fill().map((_,i) =>{
return i}),3)
const year=todayObj.year()
const mod=year%10
const start=year-mod
const end=year+9-mod
var weekOfYear = require('dayjs/plugin/weekOfYear')
dayjs.extend(weekOfYear)
var isBetween = require('dayjs/plugin/isBetween')
dayjs.extend(isBetween)
const count_valid_framtime =(arr,value)=>{
    return arr.filter(item=>new Date(`${timevalue(value)} ${('0'+item.hour).slice(-2)}:${('0'+item.minutes).slice(-2)}`)>new Date()).length
}
const Calendar = (props) => {
    const {time_start,time_end,value,onChange,className,onClickMonth,onClickWeek,
        next_month,index,day1,day2,setdaychoice,hideOutMonth,children,list_fram_time_choice,
        onClickYear,selectmonth,selectyear,selectday,selectweek,choice,startDate,endDate,
        selectRange,show_month,show_year,show_decade,setrange,range}=props
    const [dayObj, setDayObj] = useState(dayjs())
    const [daychoice,setDaychoice]=useState()
    const [show,setShow]=useState({month:true,decade:false,year:false})
    useEffect(()=>{
        if(value){
            setDaychoice(dayjs(value))
        }
    },[value])
    useEffect(()=>{
        if(next_month){
            setDayObj(dayjs(next_month))
        }
    },[next_month])
    
    console.log(value)

    useEffect(()=>{
        if(show_month){
            setShow({...show,month:true,year:false,decade:false})
        }
        if(show_decade){
            setShow({...show,decade:true,year:false,month:false})
        }
        if(show_year){
            setShow({...show,decade:false,year:true,month:false})
        }
    },[show_month,show_year,show_decade])
    
   console.log(show_year)
   console.log(show_month)
    const thisYear = dayObj.year()
    const thisMonth = dayObj.month() // (January as 0, December as 11)
    const daysInMonth = dayObj.daysInMonth()
    const dayObjOf1 = dayjs(`${thisYear}-${thisMonth + 1}-1`)
    const weekDayOf1 = dayObjOf1.day() // (Sunday as 0, Saturday as 6)
    const dayObjOfLast = dayjs(`${thisYear}-${thisMonth + 1}-${daysInMonth}`)
    const weekDayOfLast = dayObjOfLast.day()
    const [listyear,setListyear]=useState(()=>
        Array(end - start + 1).fill().map((_, idx) => start + idx)
    )
    
    const years_row=useMemo(()=>{
        return partition([...listyear],3)
    },[listyear])
    const handleyearNext = () => {
      setDayObj(dayObj.add(1, "year"))
    }
    const handlePrev = () => {
        setDayObj(dayObj.subtract(1, "month"))
    }
    const handleNext = () => {
      setDayObj(dayObj.add(1, "month"))
    }
    const handleyearPrev=()=>{
        setDayObj(dayObj.subtract(1, "year"))
    }
   
    const handleDecade=(e,value)=>{
        setListyear(current=>current.map(year=>{
            return (year+value)
        }))
    }
   console.log(dayjs(value).week())
    const [listweek,setListweek]=useState([])
    const endday=startDate>endDate?startDate:endDate
    const startday=startDate<endDate?startDate:endDate
    useEffect(()=>{
        if(dayObj){
            if(setdaychoice){
            setdaychoice(new Date(dayObj),index)
            }
            const day_prev_month=Array(weekDayOf1).fill().map((_,i) => {
                return({day:dayObjOf1.subtract(weekDayOf1 - i, "day").date(),month:thisMonth-1,out_month:true,year:thisYear,hide:hideOutMonth?true:false,disabled:dayjs(`${thisYear}-${thisMonth-1+1}-${dayObjOf1.subtract(weekDayOf1 - i, "day").date()}`).isBetween(time_start,time_end,'day','[]')?false:true})
            })
            const day_in_month=Array(daysInMonth).fill().map((_,i) =>{
                return({day:i+1,month:thisMonth,month_end:i==daysInMonth-1?true:false,month_start:i==0?true:false,year:thisYear,disabled:dayjs(`${thisYear}-${thisMonth+1}-${i+1}`).isBetween(time_start,time_end,'day','[]')?false:true})
            }) 
            const day_next_month=Array(6 - weekDayOfLast).fill().map((_,i) => {
                return({day:dayObjOfLast.add(i + 1, "day").date(),month:thisMonth+1,out_month:true,year:thisYear,hide:hideOutMonth?true:false,disabled:dayjs(`${thisYear}-${thisMonth+1+1}-${dayObjOfLast.add(i + 1, "day").date()}`).isBetween(time_start,time_end,'day','[]')?false:true})
            })
            setListweek(partition([...day_prev_month,...day_in_month,...day_next_month],7))
        }
      
    },[dayObj,time_start,time_end])
    
    const setchoiceweek=(e,index,value)=>{
        setListweek(current=>current.map((item,i)=>{
            if(i==index){
                return(item.map(day=>{
                    return({...day,weekchoice:value})
                }))
            }
            return(item)
        }))
    }
    console.log(time_end)
    const setday=(e,date,week)=>{
        const daychoices=choice=='week'?week[0].day:date.day
        const month_choice=choice=='week'?week[0].month:date.month
        const value=new Date(dayjs().set('year',date.year).set('month',month_choice).set('date',daychoices))
        const value_choice=new Date(dayjs().set('year',week[week.length-1].year).set('month',week[week.length-1].month).set('date',week[week.length-1].day))
        if(!date.disabled){
            setDaychoice(dayjs().set('year',date.year).set('month',month_choice).set('date',daychoices))
            onChange(value)
            setDayObj(dayjs().set('year',date.year).set('month',month_choice).set('date',daychoices))
        }
        if(choice=='week'){
            onClickWeek(value,value_choice)
        }
        else{
            if(selectRange){
                const startDay=startDate?startDate:endDate
                const start=startDay<value?startDay:value
                const end=startDay>value?startDay:value
                 setrange(start,end)
            }
        }
    }
    const setrangeday=(e,index,date,value)=>{
        if(startDate && endDate){
            return 
        }
        else{
            if(startDate || endDate){
            const startDay=startDate?startDate:endDate
            const daychoierange=dayObj.set('month',date.month).set('date',date.day)
            const start=startDay<daychoierange?startDay:daychoierange
            const end=startDay>daychoierange?startDay:daychoierange
            
            setListweek(current=>current.map(week=>{
                return(week.map(item=>{
                    if(value){
                        setrange(start,end)
                        if(dayjs(start).isSame(`${item.year}-${item.month+1}-${item.day}`,'day')){
                            return ({...item,choice:value,range:value,start:true})
                        }
                        else if(dayjs(end).isSame(`${item.year}-${item.month+1}-${item.day}`,'day')){
                            return ({...item,choice:value,range:value,end:true})
                        }
                        else{
                            if(dayjs(`${item.year}-${item.month+1}-${item.day}`).isBetween(start,end, 'day', '()')){
                                return ({...item,range:value,choice:false})
                            }
                            return ({...item,range:false,choice:false})
                        }  
                    }
                    else{
                        setrange(null,null)
                        return ({...item,range:false,choice:false})
                    }
                }))
            }))
            }
        }
    }
    return (
<>
                        <div className="date-picker-panel__date">
                            <div className="picker-header">
                                <i onClick={(e)=>show.decade?handleDecade(e,-10):handleyearPrev(e)} 
                                className={`icon ${selectRange?index==1 && dayjs(timevalue(day2)).subtract(1, "year").isBefore(timevalue(day1),'year')?'disable':'':''} picker-header__icon picker-header__prev`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M6.71966991,2.96966991 C7.01256313,2.6767767 7.48743687,2.6767767 7.78033009,2.96966991 C8.0732233,3.26256313 8.0732233,3.73743687 7.78033009,4.03033009 L7.78033009,4.03033009 L3.81066017,8 L7.78033009,11.9696699 C8.0732233,12.2625631 8.0732233,12.7374369 7.78033009,13.0303301 C7.48743687,13.3232233 7.01256313,13.3232233 6.71966991,13.0303301 L6.71966991,13.0303301 L2.21966991,8.53033009 C1.9267767,8.23743687 1.9267767,7.76256313 2.21966991,7.46966991 L2.21966991,7.46966991 Z M11.7196699,2.96966991 C12.0125631,2.6767767 12.4874369,2.6767767 12.7803301,2.96966991 C13.0732233,3.26256313 13.0732233,3.73743687 12.7803301,4.03033009 L12.7803301,4.03033009 L8.81066017,8 L12.7803301,11.9696699 C13.0732233,12.2625631 13.0732233,12.7374369 12.7803301,13.0303301 C12.4874369,13.3232233 12.0125631,13.3232233 11.7196699,13.0303301 L11.7196699,13.0303301 L7.21966991,8.53033009 C6.9267767,8.23743687 6.9267767,7.76256313 7.21966991,7.46966991 L7.21966991,7.46966991 Z"></path></svg>
                                </i> 
                                <i onClick={e=>handlePrev(e)} 
                                className={`icon ${selectRange?index==1 && dayjs(timevalue(day2)).subtract(1, "month").isSame(timevalue(day1),'month')?'disable':'':''} picker-header__icon picker-header__prev`} style={{display:`${!show.decade && !show.year?'':'none'}`}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M6.81066017,8 L10.7803301,4.03033009 C11.0732233,3.73743687 11.0732233,3.26256313 10.7803301,2.96966991 C10.4874369,2.6767767 10.0125631,2.6767767 9.71966991,2.96966991 L5.21966991,7.46966991 C4.9267767,7.76256313 4.9267767,8.23743687 5.21966991,8.53033009 L9.71966991,13.0303301 C10.0125631,13.3232233 10.4874369,13.3232233 10.7803301,13.0303301 C11.0732233,12.7374369 11.0732233,12.2625631 10.7803301,11.9696699 L6.81066017,8 Z"></path></svg>
                                </i> 
                                <span className="picker-header__label clickable" onClick={e=>setShow({...show,year:true,month:false})} style={{display:`${show.decade||show.year?'none':''}`}}>{`Tháng ${thisMonth+1}`}</span> 
                                <span className="picker-header__label mg-4 clickable" style={{display:`${show.decade?'none':''}`}} onClick={e=>setShow({...show,decade:true,month:false})}>{dayObj.year()}</span> 
                                <span className="picker-header__label" style={{display: `${show.decade?'':'none'}`}}>{`${listyear[0]} – ${listyear[listyear.length-1]}`}</span> 
                                <i onClick={e=>handleNext(e)} 
                                className={`icon ${selectRange?index==0 && dayjs(timevalue(day1)).add(1, "month").isSame(timevalue(day2),'month')?'disable':'':''} picker-header__icon picker-header__next`} style={{display:`${!show.decade && !show.year?'':'none'}`}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M9.18933983,8 L5.21966991,11.9696699 C4.9267767,12.2625631 4.9267767,12.7374369 5.21966991,13.0303301 C5.51256313,13.3232233 5.98743687,13.3232233 6.28033009,13.0303301 L10.7803301,8.53033009 C11.0732233,8.23743687 11.0732233,7.76256313 10.7803301,7.46966991 L6.28033009,2.96966991 C5.98743687,2.6767767 5.51256313,2.6767767 5.21966991,2.96966991 C4.9267767,3.26256313 4.9267767,3.73743687 5.21966991,4.03033009 L9.18933983,8 Z"></path></svg>
                                </i> 
                                <i onClick={(e)=>show.decade?handleDecade(e,10):handleyearNext(e)} 
                                className={`icon ${selectRange?index==0 && dayjs(timevalue(day1)).add(1, "year").isAfter(timevalue(day2),'year')?'disable':'':''} picker-header__icon picker-header__next`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M3.21966991,2.96966991 C3.51256313,2.6767767 3.98743687,2.6767767 4.28033009,2.96966991 L4.28033009,2.96966991 L8.78033009,7.46966991 C9.0732233,7.76256313 9.0732233,8.23743687 8.78033009,8.53033009 L8.78033009,8.53033009 L4.28033009,13.0303301 C3.98743687,13.3232233 3.51256313,13.3232233 3.21966991,13.0303301 C2.9267767,12.7374369 2.9267767,12.2625631 3.21966991,11.9696699 L3.21966991,11.9696699 L7.18933983,8 L3.21966991,4.03033009 C2.9267767,3.73743687 2.9267767,3.26256313 3.21966991,2.96966991 Z M8.21966991,2.96966991 C8.51256313,2.6767767 8.98743687,2.6767767 9.28033009,2.96966991 L9.28033009,2.96966991 L13.7803301,7.46966991 C14.0732233,7.76256313 14.0732233,8.23743687 13.7803301,8.53033009 L13.7803301,8.53033009 L9.28033009,13.0303301 C8.98743687,13.3232233 8.51256313,13.3232233 8.21966991,13.0303301 C7.9267767,12.7374369 7.9267767,12.2625631 8.21966991,11.9696699 L8.21966991,11.9696699 L12.1893398,8 L8.21966991,4.03033009 C7.9267767,3.73743687 7.9267767,3.26256313 8.21966991,2.96966991 Z"></path></svg>
                                </i>
                            </div>
                            <div className="date-table" style={{display:`${!show.year && !show.decade &&show.month?'':'none'}`}}>
                                <div className="date-table__header">
                                    {weekDays.map(d => 
                                    <div key={d} className="date-table__cell">
                                        <span className="date-table__cell-inner">{d}</span>
                                    </div>
                                    )}
                                </div>
                                
                                <div className="date-table__rows">
                                    {listweek.map((week,i)=>
                                    <div onMouseEnter={e=>{
                                        if(choice=='week'){setchoiceweek(e,i,true)}}} onMouseLeave={e=>{if(choice=='week'){setchoiceweek(e,i,false)}}} key={i} className="date-table__row">
                                        {week.map((date,j)=>
                                        <>
                                        {date.hide?<div className="date-table__cell out-of-month is-empty">
                                            <span className="date-table__cell-inner out-of-month is-empty"></span>
                                        </div>:
                                        <div key={j} 
                                            onMouseEnter={(e)=>{
                                                if(selectRange){
                                                    setrangeday(e,j,date,true)
                                                }
                                                }}
                                            onMouseLeave={(e)=>{
                                                if(selectRange){
                                                    setrangeday(e,j,date,false)
                                                }
                                            }}
                                            onClick={(e)=>setday(e,date,week)}
                                            className={`date-table__cell 
                                            ${selectRange?startDate && dayjs(startDate).isSame(`${date.year}-${date.month+1}-${date.day}`,'day') ||endDate && dayjs(endDate).isSame(`${date.year}-${date.month+1}-${date.day}`,'day') || date.choice?'selected':'':''}
                                            ${selectRange && (startDate || endDate) && !date.choice?dayjs(`${date.year}-${date.month+1}-${date.day}`,'day').isBetween(timevalue(range.start),timevalue(range.end),'day', '()') || date.range?'in-range':'':''}
                                            ${choice=='week' && !date.out_month && !date.disabled && (date.weekchoice || (selectweek && daychoice && daychoice.isSame(`${date.year}-${date.month+1}-${date.day}`,'week')))?`${date.day==week.filter(item=>!item.disabled)[0].day?'range-start':date.day==week.filter(item=>!item.disabled)[week.filter(item=>!item.disabled).length-1].day?'range-end':'in-range'} ${selectweek && daychoice.isSame(`${date.year}-${date.month+1}-${date.day}`,'week')?'week-selection':'week-selecting'}`:''} 
                                            ${todayObj.isSame(`${date.year}-${date.month+1}-${date.day}`,'day')? "current": ""}${
                                            ((choice=='week' && !date.out_month && !date.disabled && selectweek &&daychoice.isSame(`${date.year}-${date.month+1}-${date.day}`,'week')) && (date.day==week.filter(item=>!item.disabled)[0].day ||date.day==week.filter(item=>!item.disabled)[week.filter(item=>!item.disabled).length-1].day)) ||(choice=='day' && !selectRange && selectday && daychoice &&daychoice.isSame(timevalue(`${date.year}-${date.month+1}-${date.day}`),'day'))?'selected':''} 
                                            ${date.month_end?'month-end':''} ${date.month_start?'month-start':''} ${date.out_month?'out-of-month':''} ${date.day==week.filter(item=>!item.hide)[week.filter(item=>!item.hide).length-1].day?'line-end':''} ${week.find(item=>!item.hide).day==date.day?'line-start':''} 
                                            ${!date.disabled?'':'disabled'}`}>
                                            <span 
                                            className={`date-table__cell-inner 
                                            ${choice=='week' && !date.out_month && !date.disabled && (date.weekchoice || (selectweek && daychoice && daychoice.isSame(`${date.year}-${date.month+1}-${date.day}`,'week')))?`${date.day==week.filter(item=>!item.disabled)[0].day?'range-start':date.day==week.filter(item=>!item.disabled)[week.filter(item=>!item.disabled).length-1].day?'range-end':'in-range'} ${selectweek && daychoice.isSame(`${date.year}-${date.month+1}-${date.day}`,'week')?'week-selection':'week-selecting'}`:''} 
                                            ${todayObj.isSame(`${date.year}-${date.month+1}-${date.day}`,'day')? "current": ""} 
                                            ${!date.disabled?'':'disabled'}
                                            ${selectRange ?startDate && dayjs(startDate).isSame(`${date.year}-${date.month+1}-${date.day}`,'day') ||endDate && dayjs(endDate).isSame(`${date.year}-${date.month+1}-${date.day}`,'day') || date.choice?'selected':'':''}
                                            ${selectRange && (startDate || endDate) && !date.choice?dayjs(`${date.year}-${date.month+1}-${date.day}`,'day').isBetween(timevalue(range.start),timevalue(range.end),'day', '()') || date.range?'in-range':'':''}${
                                            ((choice=='week' && !date.out_month && !date.disabled && selectweek &&daychoice.isSame(`${date.year}-${date.month+1}-${date.day}`,'week')) && (date.day==week.filter(item=>!item.disabled)[0].day ||date.day==week.filter(item=>!item.disabled)[week.filter(item=>!item.disabled).length-1].day)) ||(choice=='day' && !selectRange && selectday && daychoice &&daychoice.isSame(timevalue(`${date.year}-${date.month+1}-${date.day}`),'day'))?' selected':''} 
                                            ${date.month_end?'month-end':''} ${date.month_start?'month-start':''} ${date.out_month?'out-of-month':''} ${j==week.filter(item=>!item.hide).length-1?'line-end':''} ${week.find(item=>!item.hide).day==date.day?'line-start':''}`}>
                                            {children?<div data-v-3321a628="" className={`${!date.disabled?'timeslots':'no-timeslot'} ${dayObj.set('date',date.day).set('month',date.month).isSame(timevalue(new Date()),'day')?'current':'valid'}`}>
                                                <p data-v-3321a628="" className="date-text">{date.day}</p> 
                                                {count_valid_framtime(list_fram_time_choice,new Date(`${date.year}-${date.month+1}-${date.day}`))?<p data-v-3321a628="" className="slots-count">{count_valid_framtime(list_fram_time_choice,new Date(`${date.year}-${date.month+1}-${date.day}`))} khung giờ</p>:''}
                                            </div>:
                                            `${date.day}`}
                                            </span>
                                        </div>
                                        }
                                        </>
                                        )}
                                    </div>
                                    )}
                                </div>
                            </div>
                            <div className="month-table" style={{display:`${!show.decade&&show.year?'':'none'}`}}>
                                {month_rows.map((months,i)=>
                                <div key={i} className="month-table__row">
                                    {months.map(month=>
                                        <div key={month} onClick={e=>{
                                        if(dayObj.set('month',month).isBetween(time_start,time_end,'month','[]')){
                                            if(choice=='day' ||choice=='week'){
                                                setShow({...show,year:false,month:true})
                                            }       
                                            if(choice=='month'){
                                                onClickMonth(new Date(dayObj.set('month',month).set('year',thisYear)))
                                            }
                                            setDayObj(dayObj.set('month',month))}
                                        }} className={`month-table__col ${time_end?!dayObj.set('month',month).isBetween(time_start,time_end,'month','[]')?'disabled':'':''} ${thisMonth==todayObj.month() && thisYear==todayObj.year()?'current':''} ${selectmonth &&thisMonth==month && daychoice&& daychoice.year()==thisYear && dayObj.set('month',month).isBetween(time_start,time_end,'month','[]')?'selected':''}`}>Tháng {month+1}</div>
                                    )}
                                </div>
                                )}
                            </div>
                            <div className="year-table" style={{display:`${!show.decade?'none':''}`}}>
                                {years_row.map((years,i)=>
                                <div key={i} className="year-table__row">
                                    {years.map(year=>
                                        <div key={year} onClick={(e)=>{
                                            if(dayObj.set('year',year).isBetween(time_start,time_end, 'year','[]')){
                                                if(choice=='day' ||choice=='week'){
                                                setShow({...show,decade:false,month:true})
                                                }
                                                setDayObj(dayObj.set('year',year))
                                                if(choice=='year'){
                                                onClickYear(new Date(dayObj.set('year',year)))
                                            }}
                                        }} className={`year-table__col current ${!dayObj.set('year',year).isBetween(time_start,time_end, 'year','[]')?'disabled':''} ${year==todayObj.year()?'current':''} ${selectyear && daychoice&& daychoice.year()==year && dayObj.set('year',year).isBetween(time_start,time_end, 'year','[]')?'selected':''}`}>{year}</div>
                                    )}
                                </div>
                                )}
                            </div>
                            
                        </div>
      </>
    )
  }
  
  export default Calendar