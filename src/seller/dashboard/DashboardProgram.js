
import { dashboardprogramURL, dashboardpromotionURL } from "../../urls"
import Navbar from "../Navbar"

import React, {useState,useEffect,useCallback,useRef, useMemo} from 'react'
import NavbarDashboard from "./Navbardashboard"
import Chartdata from "./Chartdata"
import SibaMenu from "./SibaMenuDashboard"

const DashboardProgram=()=>{
    const [stats,setStats]=useState([
    {name:'Doanh số',id:1,info:'Tổng giá trị của các đơn hàng có áp dụng Combo Của Shop đã được xác nhận, bao gồm phí vận chuyển và không bao gồm các khuyến mãi khác, tính trong khoảng thời gian đã chọn.',result:0,result_last:0,symbol:true},
    {name:'Đơn hàng',id:2,info:'Tổng số lượng các đơn hàng bao gồm sản phẩm có áp dụng khuyến mãi được xác nhận, tính trong khoảng thời gian đã chọn.',result:0,result_last:0},
    {name:'Số lượng đã bán',id:3,info:'Tổng số lượng sản phẩm có áp dụng khuyến mãi đã bán, tính trên toàn bộ các đơn hàng được xác nhận trong khoảng thời gian đã chọn.',result:0,result_last:0},
    {name:'Người mua',id:4,info:'Tổng số lượng người mua duy nhất đã mua sản phẩm có áp dụng khuyến mãi, tính trên toàn bộ các đơn hàng được xác nhận trong khoảng thời gian đã chọn.',result:0,result_last:0}])
    
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
                return({...stat,result:data.number_buyer,result_last:data.number_buyer_last})
            }
            
        }))
    }
    return(
        <>
        <Navbar/>
        <div className="datacenter-app">
            <div className="data-center-layout vi">
                <NavbarDashboard/>
                <div data-v-4ea51c50 className="app-container clearfix">
                    <SibaMenu/>
                    <div style={{marginLeft: '220px'}} className="marketing app-container-body slide-container-body">
                        <div className="clearfix marketing-tools content-container">
                            <Chartdata
                            url={dashboardprogramURL}
                            liststats={stats}
                            promotion={true}
                            widthchart={1064}
                            setstats={data=>setstats(data)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default DashboardProgram
