import dayjs from "dayjs"
import "../css/calendar.css"
import React, { useEffect, useMemo, useState } from "react"
import { partition } from "../constants"
const weekDays = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"]
const todayObj = dayjs()
const month_rows=partition(Array(12).fill().map((_,i) =>{
return i}),3)
const year=todayObj.year()
const mod=year%10
const start=year-mod
const end=year+9-mod
const Calendar = (props) => {
    const {time_start,time_end,value,onChange}=props
    const [dayObj, setDayObj] = useState(dayjs())
    const [daychoice,setDaychoice]=useState(dayjs())
    useEffect(()=>{
        if(value){
            setDaychoice(dayjs(value))
        }
    },[value])
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
    const [show,setShow]=useState({show_day:true,show_month:false,show_year:false})
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
    
    const day_prev_month=Array(weekDayOf1).fill().map((_,i) => {
        return({day:dayObjOf1.subtract(weekDayOf1 - i, "day").date(),month:thisMonth-1,out_month:true,year:thisYear})
    })
    const day_in_month=Array(daysInMonth).fill().map((_,i) =>{
        return({day:i+1,month:thisMonth,month_end:i==daysInMonth-1?true:false,month_start:i==0?true:false,year:thisYear})
    }) 
    const day_next_month=Array(6 - weekDayOfLast).fill().map((_,i) => {
        return({day:dayObjOfLast.add(i + 1, "day").date(),month:thisMonth+1,out_month:true,year:thisYear})
    })
    
    const handleDecade=(e,value)=>{
        setListyear(current=>current.map(year=>{
            return (year+value)
        }))
    }
    console.log(listyear)
    const listday=useMemo(()=>{
       return partition([...day_prev_month,...day_in_month,...day_next_month],7)
    },[dayObj])

    console.log(Array(weekDayOf1).fill())
    
    return (
<>
                        <div className="date-picker-panel__date">
                            <div className="picker-header">
                                <i onClick={(e)=>show.show_year?handleDecade(e,-10):handleyearPrev(e)} className="icon picker-header__icon picker-header__prev">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M6.71966991,2.96966991 C7.01256313,2.6767767 7.48743687,2.6767767 7.78033009,2.96966991 C8.0732233,3.26256313 8.0732233,3.73743687 7.78033009,4.03033009 L7.78033009,4.03033009 L3.81066017,8 L7.78033009,11.9696699 C8.0732233,12.2625631 8.0732233,12.7374369 7.78033009,13.0303301 C7.48743687,13.3232233 7.01256313,13.3232233 6.71966991,13.0303301 L6.71966991,13.0303301 L2.21966991,8.53033009 C1.9267767,8.23743687 1.9267767,7.76256313 2.21966991,7.46966991 L2.21966991,7.46966991 Z M11.7196699,2.96966991 C12.0125631,2.6767767 12.4874369,2.6767767 12.7803301,2.96966991 C13.0732233,3.26256313 13.0732233,3.73743687 12.7803301,4.03033009 L12.7803301,4.03033009 L8.81066017,8 L12.7803301,11.9696699 C13.0732233,12.2625631 13.0732233,12.7374369 12.7803301,13.0303301 C12.4874369,13.3232233 12.0125631,13.3232233 11.7196699,13.0303301 L11.7196699,13.0303301 L7.21966991,8.53033009 C6.9267767,8.23743687 6.9267767,7.76256313 7.21966991,7.46966991 L7.21966991,7.46966991 Z"></path></svg>
                                </i> 
                                <i onClick={e=>handlePrev(e)} 
                                className="icon picker-header__icon picker-header__prev" style={{display:`${!show.show_year && !show.show_month?'':'none'}`}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M6.81066017,8 L10.7803301,4.03033009 C11.0732233,3.73743687 11.0732233,3.26256313 10.7803301,2.96966991 C10.4874369,2.6767767 10.0125631,2.6767767 9.71966991,2.96966991 L5.21966991,7.46966991 C4.9267767,7.76256313 4.9267767,8.23743687 5.21966991,8.53033009 L9.71966991,13.0303301 C10.0125631,13.3232233 10.4874369,13.3232233 10.7803301,13.0303301 C11.0732233,12.7374369 11.0732233,12.2625631 10.7803301,11.9696699 L6.81066017,8 Z"></path></svg>
                                </i> 
                                <span className="picker-header__label clickable" onClick={e=>setShow({...show,show_month:true,show_day:false})} style={{display:`${show.show_year||show.show_month?'none':''}`}}>Tháng {thisMonth+1}</span> 
                                <span className="picker-header__label clickable" style={{display:`${show.show_year?'none':''}`}} onClick={e=>setShow({...show,show_year:true,show_day:false})}>{dayObj.year()}</span> 
                                <span className="picker-header__label" style={{display: `${show.show_year?'':'none'}`}}>{listyear[0]} – {listyear[listyear.length-1]}</span> 
                                <i onClick={e=>handleNext(e)} 
                                className="icon picker-header__icon picker-header__next" style={{display:`${!show.show_year && !show.show_month?'':'none'}`}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M9.18933983,8 L5.21966991,11.9696699 C4.9267767,12.2625631 4.9267767,12.7374369 5.21966991,13.0303301 C5.51256313,13.3232233 5.98743687,13.3232233 6.28033009,13.0303301 L10.7803301,8.53033009 C11.0732233,8.23743687 11.0732233,7.76256313 10.7803301,7.46966991 L6.28033009,2.96966991 C5.98743687,2.6767767 5.51256313,2.6767767 5.21966991,2.96966991 C4.9267767,3.26256313 4.9267767,3.73743687 5.21966991,4.03033009 L9.18933983,8 Z"></path></svg>
                                </i> 
                                <i onClick={(e)=>show.show_year?handleDecade(e,10):handleyearNext(e)} className="icon picker-header__icon picker-header__next">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M3.21966991,2.96966991 C3.51256313,2.6767767 3.98743687,2.6767767 4.28033009,2.96966991 L4.28033009,2.96966991 L8.78033009,7.46966991 C9.0732233,7.76256313 9.0732233,8.23743687 8.78033009,8.53033009 L8.78033009,8.53033009 L4.28033009,13.0303301 C3.98743687,13.3232233 3.51256313,13.3232233 3.21966991,13.0303301 C2.9267767,12.7374369 2.9267767,12.2625631 3.21966991,11.9696699 L3.21966991,11.9696699 L7.18933983,8 L3.21966991,4.03033009 C2.9267767,3.73743687 2.9267767,3.26256313 3.21966991,2.96966991 Z M8.21966991,2.96966991 C8.51256313,2.6767767 8.98743687,2.6767767 9.28033009,2.96966991 L9.28033009,2.96966991 L13.7803301,7.46966991 C14.0732233,7.76256313 14.0732233,8.23743687 13.7803301,8.53033009 L13.7803301,8.53033009 L9.28033009,13.0303301 C8.98743687,13.3232233 8.51256313,13.3232233 8.21966991,13.0303301 C7.9267767,12.7374369 7.9267767,12.2625631 8.21966991,11.9696699 L8.21966991,11.9696699 L12.1893398,8 L8.21966991,4.03033009 C7.9267767,3.73743687 7.9267767,3.26256313 8.21966991,2.96966991 Z"></path></svg>
                                </i>
                            </div>
                            <div className="date-table" style={{display:`${!show.show_month &&show.show_day?'':'none'}`}}>
                                <div className="date-table__header">
                                    {weekDays.map(d => 
                                    <div key={d} className="date-table__cell">
                                       
                                        <span className="date-table__cell-inner">{d}</span>
                                        
                                    </div>
                                    )}
                                </div>
                                
                                <div className="date-table__rows">
                                    {listday.map((week,i)=>
                                    <div key={i} className="date-table__row">
                                        {week.map((date,j)=>
                                        <div key={j} onClick={()=>{
                                            setDayObj(dayObj.set('month',date.month).set('date',date.day)) 
                                            onChange(dayObj.set('month',date.month).set('date',date.day))
                                        }} key={j} 
                                            className={`date-table__cell ${date.day === todayObj.date() &&date.month === todayObj.month() &&thisYear === todayObj.year()?"current":""} ${date.day==daychoice.date() && date.year==daychoice.year() && date.month==daychoice.month()?'selected':''} ${date.month_end?'month-end':''} ${date.month_start?'month-start':''} ${date.out_month?'out-of-month':''} ${j==week.length-1?'line-end':''} ${j==0?'line-start':''} ${time_start?dayObj.isBefore(dayjs(time_start)) && dayObj.isAfter(dayjs(time_end))?'disabled':'':''}`}>
                                            <span 
                                            className={`date-table__cell-inner ${date.day === todayObj.date() &&date.month === todayObj.month() && thisYear === todayObj.year()? "current": ""
                                              } ${date.day==daychoice.date() && date.month==daychoice.month() && date.year==daychoice.year()?'selected':''} ${date.month_end?'month-end':''} ${date.month_start?'month-start':''} ${date.out_month?'out-of-month':''} ${j==week.length-1?'line-end':''} ${j==0?'line-start':''}`}>{date.day}</span>
                                        </div>
                                        )}
                                    </div>
                                    )}
                                </div>
                            </div>
                            <div className="month-table" style={{display:`${!show.show_year&&show.show_month?'':'none'}`}}>
                                {month_rows.map(months=>
                                <div className="month-table__row">
                                    {months.map(month=>
                                        <div key={month} onClick={e=>{
                                        setShow({...show,show_month:false,show_day:true})
                                        onChange(dayObj.set('month',month))
                                        setDayObj(dayObj.set('month',month))}} className={`month-table__col ${time_end?dayObj.isBefore(time_start, 'month') || dayObj.isAfter(time_end, 'month')?'disabled':'':''} ${thisMonth==todayObj.month() && thisYear==todayObj.year()?'current':''} ${thisMonth==month && daychoice.year()==thisYear?'selected':''}`}>Tháng {month+1}</div>
                                    )}
                                </div>
                                )}
                            </div>
                            <div className="year-table" style={{display:`${!show.show_year?'none':''}`}}>
                                {years_row.map((years,i)=>
                                <div key={i} className="year-table__row">
                                    {years.map(year=>
                                        <div key={year} onClick={(e)=>{
                                            setShow({...show,show_year:false,show_day:true})
                                            setDayObj(dayObj.set('year',year))
                                            onChange(dayObj.set('year',year))
                                        }} className={`year-table__col current ${time_end?dayObj.isBefore(time_start, 'month') || dayObj.isAfter(time_end, 'month')?'disabled':'':''} ${year==todayObj.year()?'current':''} ${daychoice.year()==year?'selected':''}`}>{year}</div>
                                    )}
                                </div>
                                )}
                            </div>
                            
                        </div>
      </>
    )
  }
  
  export default Calendar