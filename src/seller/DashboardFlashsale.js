import { dashboardprogramURL } from "../urls"
import Dashboard from "./Dashboard"
import React, {useState,useEffect,useCallback,useRef, useMemo} from 'react'

const DashboardFlashsale=()=>{
    const [time,setTime]=useState('currentday')
    return(
        <Dashboard
            timedata={time}
            url={dashboardprogramURL}
        />
    )
}
export default DashboardFlashsale