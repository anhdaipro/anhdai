
import React, {useState,useCallback,useEffect,useRef} from 'react'
import {useNavigate,useSearchParams} from 'react-router-dom'
import axios from 'axios'
import { headers } from '../actions/auth'
const Tabs=(props)=>{
    const {choice,loading,listchoice,setchoice}=props
    const [params, setSearchParams] = useSearchParams();
    const tabs_ink =useRef()
    const parent =useRef()
    
    const [left,setLeft]=useState(0)
    const [width,setWidth]=useState(0)
    useEffect(()=>{
        const active=document.querySelector('.tabs__nav-tab.active')
        if(loading){
            setWidth(active.offsetWidth)
        }
    },[loading])
    return(
        <div className="tabs__nav">  
            <div className="tabs__nav-warp">
                <div ref={parent} className="tabs__nav-tabs" style={{transform: 'translateX(0px)'}}>
                    {listchoice.map(item=>
                    <div onClick={(e)=>{
                        setWidth(e.currentTarget.offsetWidth)
                        setLeft(e.currentTarget.offsetLeft)
                        setchoice(item.value)
                    }
                    } key={item.value} className={`tabs__nav-tab ${choice==item.value?'active':''}`} style={{whiteSpace: 'normal'}}>{item.name}</div>
                    )}
                </div> 
                <div ref={tabs_ink} className="tabs__ink-bar" style={{width: `${width}px`, transform: `translateX(${left}px)`}}></div>
            </div> 
        </div> 
    )
}
export default Tabs