
import React, {useState,useEffect,useCallback,useRef,memo} from 'react'

import Calendar from 'react-calendar';
import { timesubmit } from '../constants';
const scrollToRef = (ref) => window.scrollTo(50, ref.current.offsetTop)   

const Datepicker=(props)=>{
    const {item,index,setdatevalid,time,edit,data,setlistdate,listdate}=props
    const [show,setShow]=useState(false)
    const [date,setDate]=useState(()=>{return{time:new Date(),hours:new Date().getHours(),minutes:new Date().getMinutes()}})
    useEffect(()=>{
        if(time){
            setDate({...date,time:time,error:!edit && (new Date(time).getTime()+1000*60<new Date().getTime() || new Date(data.valid_to).getTime()<new Date(data.valid_from).getTime()+3600*1000)?index==0 && new Date(time)<new Date()-1000*60?true:index==1&&new Date(data.valid_to).getTime()<new Date(data.valid_from).getTime()+3600*1000?true:false:false,hours:time.getHours(),minutes:time.getMinutes()})
        }
    },[time,data])
    const hours=(number)=>{
        return Array(number).fill().map((_,i)=>
            <li key={i} name={i} className={`${date.hours==i?'selected':''}`} onClick={(e)=>setDate({...date,hours:i})}>{('0'+i).slice(-2)}</li>
        )
    }
    const datevalid=date.time.toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).substr(0,10)+' '+('0'+date.hours).slice(-2)+':'+("0"+date.minutes).slice(-2)
    let scrollhours = useRef();
    let scrollminutes = useRef();
    useEffect(()=>{
        if(show){
        scrollhours.current.scrollTop=date.hours*32
        scrollminutes.current.scrollTop=date.minutes*32
        }
    },[scrollhours,scrollminutes,show,date])
    const parent=useRef()
    const scrooltimes=(e,name,number)=>{
        Array(number).fill().map((_,i)=>{
             if (e.currentTarget.scrollTop>(i*32-10)&&e.currentTarget.scrollTop<(i*32+15) && e.currentTarget.scrollTop>1){
                setDate({...date,[name]:i})
             }
        })
    }
    const minutes=(number)=>{
        return Array(number).fill().map((_,i)=>
            <li key={i} className={`${date.minutes==i?'selected':''}`} onClick={(e)=>setDate({...date,minutes:i})}>{('0'+i).slice(-2)}</li>
        )
       
    }

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
    return(
        <>
        <div key={index} className="picker-item start-picker">
            <div ref={parent} className="rele">
                <div onClick={(e)=>setShow(!show)} className="hearder_choice hearder item-center" name={index==0?'valid_from':'valid_to'}>
                    <div className="selector__prefix item-centers">
                        <i className="selector__prefix-icon icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M11.5156954,1 C11.7918378,1 12.0156954,1.22385763 12.0156954,1.5 L12.015,2 L14,2 C14.5522847,2 15,2.44771525 15,3 L15,14 C15,14.5522847 14.5522847,15 14,15 L2,15 C1.44771525,15 1,14.5522847 1,14 L1,3 C1,2.44771525 1.44771525,2 2,2 L3.991,2 L3.99143991,1.5 C3.99143991,1.22385763 4.21529754,1 4.49143991,1 C4.76758229,1 4.99143991,1.22385763 4.99143991,1.5 L4.991,2 L11.015,2 L11.0156954,1.5 C11.0156954,1.22385763 11.239553,1 11.5156954,1 Z M14,6 L2,6 L2,14 L14,14 L14,6 Z M5.5,11 C5.77614237,11 6,11.2238576 6,11.5 C6,11.7761424 5.77614237,12 5.5,12 L4.5,12 C4.22385763,12 4,11.7761424 4,11.5 C4,11.2238576 4.22385763,11 4.5,11 L5.5,11 Z M8.5,11 C8.77614237,11 9,11.2238576 9,11.5 C9,11.7761424 8.77614237,12 8.5,12 L7.5,12 C7.22385763,12 7,11.7761424 7,11.5 C7,11.2238576 7.22385763,11 7.5,11 L8.5,11 Z M11.5,11 C11.7761424,11 12,11.2238576 12,11.5 C12,11.7761424 11.7761424,12 11.5,12 L10.5,12 C10.2238576,12 10,11.7761424 10,11.5 C10,11.2238576 10.2238576,11 10.5,11 L11.5,11 Z M5.5,8 C5.77614237,8 6,8.22385763 6,8.5 C6,8.77614237 5.77614237,9 5.5,9 L4.5,9 C4.22385763,9 4,8.77614237 4,8.5 C4,8.22385763 4.22385763,8 4.5,8 L5.5,8 Z M8.5,8 C8.77614237,8 9,8.22385763 9,8.5 C9,8.77614237 8.77614237,9 8.5,9 L7.5,9 C7.22385763,9 7,8.77614237 7,8.5 C7,8.22385763 7.22385763,8 7.5,8 L8.5,8 Z M11.5,8 C11.7761424,8 12,8.22385763 12,8.5 C12,8.77614237 11.7761424,9 11.5,9 L10.5,9 C10.2238576,9 10,8.77614237 10,8.5 C10,8.22385763 10.2238576,8 10.5,8 L11.5,8 Z M3.991,3 L2,3 L2,5 L14,5 L14,3 L12.015,3 L12.0156954,3.5 C12.0156954,3.77614237 11.7918378,4 11.5156954,4 C11.239553,4 11.0156954,3.77614237 11.0156954,3.5 L11.015,3 L4.991,3 L4.99143991,3.5 C4.99143991,3.77614237 4.76758229,4 4.49143991,4 C4.21529754,4 3.99143991,3.77614237 3.99143991,3.5 L3.991,3 Z"></path></svg>
                        </i>
                    </div>
                    <div className="selector__inner">{time.toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).substr(0,10)} {('0'+time.getHours()).slice(-2)}:{('0'+time.getMinutes()).slice(-2)}</div>
                </div>
                
                <div className="date_pickers popper_content" style={{display:`${show?'':'none'}`}}>
                    <div className="d-flex date_picker-date">
                        <div className="calendar-picker">
                            <div className="months">
                            <Calendar  
                                prevLabel={<i className="icon picker-header__icon picker-header__prev"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M6.81066017,8 L10.7803301,4.03033009 C11.0732233,3.73743687 11.0732233,3.26256313 10.7803301,2.96966991 C10.4874369,2.6767767 10.0125631,2.6767767 9.71966991,2.96966991 L5.21966991,7.46966991 C4.9267767,7.76256313 4.9267767,8.23743687 5.21966991,8.53033009 L9.71966991,13.0303301 C10.0125631,13.3232233 10.4874369,13.3232233 10.7803301,13.0303301 C11.0732233,12.7374369 11.0732233,12.2625631 10.7803301,11.9696699 L6.81066017,8 Z"></path></svg></i>}
                                prev2Label={<i className="icon picker-header__icon picker-header__prev"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M6.71966991,2.96966991 C7.01256313,2.6767767 7.48743687,2.6767767 7.78033009,2.96966991 C8.0732233,3.26256313 8.0732233,3.73743687 7.78033009,4.03033009 L7.78033009,4.03033009 L3.81066017,8 L7.78033009,11.9696699 C8.0732233,12.2625631 8.0732233,12.7374369 7.78033009,13.0303301 C7.48743687,13.3232233 7.01256313,13.3232233 6.71966991,13.0303301 L6.71966991,13.0303301 L2.21966991,8.53033009 C1.9267767,8.23743687 1.9267767,7.76256313 2.21966991,7.46966991 L2.21966991,7.46966991 Z M11.7196699,2.96966991 C12.0125631,2.6767767 12.4874369,2.6767767 12.7803301,2.96966991 C13.0732233,3.26256313 13.0732233,3.73743687 12.7803301,4.03033009 L12.7803301,4.03033009 L8.81066017,8 L12.7803301,11.9696699 C13.0732233,12.2625631 13.0732233,12.7374369 12.7803301,13.0303301 C12.4874369,13.3232233 12.0125631,13.3232233 11.7196699,13.0303301 L11.7196699,13.0303301 L7.21966991,8.53033009 C6.9267767,8.23743687 6.9267767,7.76256313 7.21966991,7.46966991 L7.21966991,7.46966991 Z"></path></svg></i>}
                                nextLabel={<i className="icon picker-header__icon picker-header__next" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M9.18933983,8 L5.21966991,11.9696699 C4.9267767,12.2625631 4.9267767,12.7374369 5.21966991,13.0303301 C5.51256313,13.3232233 5.98743687,13.3232233 6.28033009,13.0303301 L10.7803301,8.53033009 C11.0732233,8.23743687 11.0732233,7.76256313 10.7803301,7.46966991 L6.28033009,2.96966991 C5.98743687,2.6767767 5.51256313,2.6767767 5.21966991,2.96966991 C4.9267767,3.26256313 4.9267767,3.73743687 5.21966991,4.03033009 L9.18933983,8 Z"></path></svg></i>}
                                next2Label={<i className="icon picker-header__icon picker-header__next"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M3.21966991,2.96966991 C3.51256313,2.6767767 3.98743687,2.6767767 4.28033009,2.96966991 L4.28033009,2.96966991 L8.78033009,7.46966991 C9.0732233,7.76256313 9.0732233,8.23743687 8.78033009,8.53033009 L8.78033009,8.53033009 L4.28033009,13.0303301 C3.98743687,13.3232233 3.51256313,13.3232233 3.21966991,13.0303301 C2.9267767,12.7374369 2.9267767,12.2625631 3.21966991,11.9696699 L3.21966991,11.9696699 L7.18933983,8 L3.21966991,4.03033009 C2.9267767,3.73743687 2.9267767,3.26256313 3.21966991,2.96966991 Z M8.21966991,2.96966991 C8.51256313,2.6767767 8.98743687,2.6767767 9.28033009,2.96966991 L9.28033009,2.96966991 L13.7803301,7.46966991 C14.0732233,7.76256313 14.0732233,8.23743687 13.7803301,8.53033009 L13.7803301,8.53033009 L9.28033009,13.0303301 C8.98743687,13.3232233 8.51256313,13.3232233 8.21966991,13.0303301 C7.9267767,12.7374369 7.9267767,12.2625631 8.21966991,11.9696699 L8.21966991,11.9696699 L12.1893398,8 L8.21966991,4.03033009 C7.9267767,3.73743687 7.9267767,3.26256313 8.21966991,2.96966991 Z"></path></svg></i>}
                                onClickYear={(value, event) => setDate({...date,show:value})}
                                onChange={(value)=>setDate({...date,time:value})} 
                                tileDisabled={({date, view }) => ((edit && date>new Date(data.valid_to)) || date<new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()))}
                                value={date.time} 
                            />
                            </div>
                        </div>
                        <div className="date-picker-panel__time" >
                            <div className="time-picker-panel">
                                <div className="time-picker-panel__body">
                                    <div className="time-picker-panel__display-box">
                                        <span>:</span>
                                    </div>
                                    <div className="time-spinner time-picker__hour-spinner">
                                        <i onClick={(e)=>setDate({...date,hours:date.hours-1})}  className={`time-spinner__icon ${item.hours==0?'disable':''} up icon`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M7.57253679,6.40074676 L5.1530248,8.66903925 C4.90120463,8.90512066 4.88844585,9.30064304 5.12452726,9.55246321 C5.24268191,9.67849483 5.40773242,9.75 5.58048801,9.75 L10.419512,9.75 C10.76469,9.75 11.044512,9.47017797 11.044512,9.125 C11.044512,8.95224442 10.9730068,8.7871939 10.8469752,8.66903925 L8.42746321,6.40074676 C8.18705183,6.17536109 7.81294817,6.17536109 7.57253679,6.40074676 Z"></path></svg>
                                        </i>
                                        <div className="scrollbar">
                                            <div onScroll={(e)=>scrooltimes(e,'hours',24)} ref={scrollhours} className="scrollbar__wrapper" style={{marginRight: '-20px', paddingRight: '20px'}}>
                                                <div className="scrollbar__content" style={{position:'relative', marginRight: '-20px', paddingRight: '20px'}}>
                                                    <ul className="time-spinner__list">
                                                        {hours(24)}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <i onClick={(e)=>setDate({...date,hours:date.hours+1})} className={`time-spinner__icon ${item.hours==23?'disable':''} down icon`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M7.57253679,9.34925324 L5.1530248,7.08096075 C4.90120463,6.84487934 4.88844585,6.44935696 5.12452726,6.19753679 C5.24268191,6.07150517 5.40773242,6 5.58048801,6 L10.419512,6 C10.76469,6 11.044512,6.27982203 11.044512,6.625 C11.044512,6.79775558 10.9730068,6.9628061 10.8469752,7.08096075 L8.42746321,9.34925324 C8.18705183,9.57463891 7.81294817,9.57463891 7.57253679,9.34925324 Z"></path></svg>
                                        </i>
                                    </div>
                                    <div className="time-spinner time-picker__minute-spinner">
                                        <i onClick={(e)=>setDate({...date,minutes:date.minutes-1})} className={`time-spinner__icon ${item.minutes==0?'disable':''} up icon`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M7.57253679,6.40074676 L5.1530248,8.66903925 C4.90120463,8.90512066 4.88844585,9.30064304 5.12452726,9.55246321 C5.24268191,9.67849483 5.40773242,9.75 5.58048801,9.75 L10.419512,9.75 C10.76469,9.75 11.044512,9.47017797 11.044512,9.125 C11.044512,8.95224442 10.9730068,8.7871939 10.8469752,8.66903925 L8.42746321,6.40074676 C8.18705183,6.17536109 7.81294817,6.17536109 7.57253679,6.40074676 Z"></path></svg>
                                        </i>
                                        <div  className="scrollbar">
                                            <div onScroll={(e)=>scrooltimes(e,'minutes',60)} ref={scrollminutes} className="scrollbar__wrapper" style={{marginRight: '-20px', paddingRight: '20px'}}>
                                                <div className="scrollbar__content" style={{position:'relative', marginRight: '-20px', paddingRight: '20px'}}>
                                                    <ul className="time-spinner__list">
                                                        {minutes(60)}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <i onClick={(e)=>setDate({...date,minutes:date.minutes+1})} className={`time-spinner__icon ${item.minutes==59?'disable':''} down icon`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M7.57253679,9.34925324 L5.1530248,7.08096075 C4.90120463,6.84487934 4.88844585,6.44935696 5.12452726,6.19753679 C5.24268191,6.07150517 5.40773242,6 5.58048801,6 L10.419512,6 C10.76469,6 11.044512,6.27982203 11.044512,6.625 C11.044512,6.79775558 10.9730068,6.9628061 10.8469752,7.08096075 L8.42746321,9.34925324 C8.18705183,9.57463891 7.81294817,9.57463891 7.57253679,9.34925324 Z"></path></svg>
                                        </i>
                                    </div> 
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="date-picker-panel__footer">
                        <button onClick={()=>{setdatevalid(index,date)
                        setShow(false)
                        const datatime=index==0?{valid_from:new Date(datevalid),valid_to:new Date(data.valid_to)}:{valid_to:new Date(datevalid),valid_from:new Date(data.valid_from)}
                        if(new Date(datevalid)<new Date() || datatime.valid_to.getTime()<datatime.valid_from.getTime()+3600*1000){
                            if(new Date(datevalid).getTime()<new Date().getTime()){
                                const listdates=listdate.map(item=>{
                                    if(index==0){
                                        return({...item,error:true,text:`Vui lòng nhập thời gian bắt đầu muộn hơn thời gian hiện tại.`})
                                    }
                                    return({...item,error:false})
                                })
                                setlistdate(listdates)
                            }
                            else{
                                const listdates=listdate.map(item=>{
                                    if(index==0){
                                        return({...item,error:false,text:`Vui lòng nhập thời gian bắt đầu muộn hơn thời gian hiện tại.`})
                                    }
                                    return({...item,error:true,text:'Chương trình phải kéo dài ít nhất là 1h kể từ khi bắt đầu'})
                                })
                                setlistdate(listdates)
                            }
                            
                        }
                        else{
                            setlistdate(listdate.map(item=>{
                                return({...item,error:false})
                            }))
                        }
                        }} className="button-select ">xac nhan</button>
                    </div>
                </div>
            </div>
            {date.error?
            <div data-v-f6241660="" class="error-message" style={{width: `184px`}}>
               {index==1?'Chương trình phải kéo dài ít nhất là 1h kể từ khi bắt đầu':'Vui lòng nhập thời gian bắt đầu muộn hơn thời gian hiện tại.'}
            </div>:""}
        </div>
        <>
        {index==0?<div className="width"></div>:''}</>
    </>
    )
}
const Timeoffer=({data,setdatevalid,edit})=>{
    const [date,setDate]=useState(()=>[{time:new Date(),show:false,hours:new Date().getHours(),minutes:new Date().getMinutes()}
    ,{time:new Date(),show:false,hours:new Date().getHours()+1,minutes:new Date().getMinutes()}])
    useEffect(()=>{
        if(data){
            setDate([{time:new Date(data.valid_from),show:false,hours:new Date(data.valid_from).getHours(),minutes:new Date(data.valid_from).getMinutes()}
            ,{time:new Date(data.valid_to),show:false,hours:new Date(data.valid_to).getHours(),minutes:new Date(data.valid_to).getMinutes()}])
        }
    },[data])
    
    const setlistdate=(data)=>{
        setDate(data)
    }
    
   
    return(
        <div>
            {data?
            <div className="form-item_control">
                {date.map((item,index)=>
                    <Datepicker
                    item={item}
                    index={index}
                    edit={edit}
                    data={data}
                    listdate={date}
                    setlistdate={data=>setlistdate(data)}
                    time={index==0?new Date(data.valid_from):new Date(data.valid_to)}
                    setdatevalid={(index,date)=>setdatevalid(index,date)}
                    />  
                )}     
            </div>:''}
            
            <div className="info_more ">
                <p>The end time of the program must be at least 1 hour after the start time</p>
                <p>Once the program has been created, the duration of the program can only be adjusted to shorten it.</p>
            </div>
        </div>
    )
}
export default memo(Timeoffer)