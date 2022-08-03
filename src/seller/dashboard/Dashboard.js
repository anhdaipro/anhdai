import axios from 'axios';
import Navbar from "../Navbar"
import { useParams,Link,useSearchParams } from "react-router-dom";
import React, {useState,useEffect,useCallback,useRef, useMemo} from 'react'
import {timeformat,timevalue,formatter,valid_to,safe_div} from "../../constants"
import {dashboardURL,} from "../../urls"
import { headers } from '../../actions/auth';
import NavbarDashboard from './Navbardashboard';
import Chartdata from './Chartdata';
  
const Dashboard=(props)=>{
    const [stats,setStats]=useState([
        {name:'Doanh số',id:1,info:'Tổng giá trị của các đơn hàng có áp dụng Combo Của Shop đã được xác nhận, bao gồm phí vận chuyển và không bao gồm các khuyến mãi khác, tính trong khoảng thời gian đã chọn.',result:0,result_last:0,symbol:true},
        {name:'Đơn hàng',id:2,info:'Tổng số lượng các đơn hàng bao gồm sản phẩm có áp dụng khuyến mãi được xác nhận, tính trong khoảng thời gian đã chọn.',result:0,result_last:0},
        {name:'Số lượng đã bán',id:3,info:'Tổng số lượng sản phẩm có áp dụng khuyến mãi đã bán, tính trên toàn bộ các đơn hàng được xác nhận trong khoảng thời gian đã chọn.',result:0,result_last:0},
        {name:'Doanh số trên mỗi đơn hàng',id:4,info:'Tổng số lượng người mua duy nhất đã mua sản phẩm có áp dụng khuyến mãi, tính trên toàn bộ các đơn hàng được xác nhận trong khoảng thời gian đã chọn.',result:0,result_last:0}])
        const setstats=(data)=>{
            setStats(current=>current.map(stat=>{
                if(stat.id==1){
                    return({...stat,result:data.total_amount,result_last:data.total_amount_last})
                }
                else if(stat.id==2){
                    return({...stat,result:data.total_order,result_last:data.total_order_last})
                }
                else if(stat.id==3){
                    return({...stat,result:data.total_quantity,result_last:data.total_quantity_last})
                }
                else{
                    return({...stat,result:safe_div(data.total_amount,data.total_order),result_last:safe_div(data.total_amount_last,data.total_order_last)})
            }    
        }))
    }
    return(
        <>  
            <div id="app">
                <Navbar/>
                <div className="data-center-layout">
                    <NavbarDashboard/>
                    <div data-v-47de0c38 className="app-container">
                        <div className="dashboard app-container-body full-container-body">
                            <div fragment="b4c855caa6" className="sticky"></div>
                            <Chartdata
                            widthchart={1208}
                            liststats={stats}
                            setstats={(data)=>setstats(data)}
                            />
                        </div>  
                    </div>
                </div>
            </div>
            
        </> 
    )
}

export default Dashboard