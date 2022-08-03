

import { dashboardAddonURL, dashboardpromotionURL } from "../../urls"
import Navbar from "../Navbar"

import React, {useState,useEffect,useCallback,useRef, useMemo} from 'react'
import NavbarDashboard from "./Navbardashboard"
import Chartdata from "./Chartdata"
import SibaMenu from "./SibaMenuDashboard"
import { safe_div } from "../../constants"

const DashboardShockdeal=()=>{
    const [stats,setStats]=useState([
    {name:'Doanh số (bao gồm Sản phẩm chính và Sản phẩm mua kèm)',id:1,info:'Tổng giá trị của các đơn hàng có áp dụng Combo Của Shop đã được xác nhận, bao gồm phí vận chuyển và không bao gồm các khuyến mãi khác, tính trong khoảng thời gian đã chọn.',result:0,result_last:0,symbol:true},
    {name:'Doanh số sản phẩm chính',id:2,info:'Tổng số lượng Combo Khuyến Mãi đã bán tính trên toàn bộ các đơn hàng được xác nhận, tính trong khoảng thời gian đã chọn.',result:0,result_last:0,symbol:true},
    {name:'Doanh số sản phẩm mua kèm',id:3,info:'Giá trị trung bình của các đơn đặt hàng đã xác nhận với các mặt hàng trong Combo khuyến mãi cho mỗi người mua, bao gồm phí vận chuyển và không bao gồm các khuyến mãi khác, trong khoảng thời gian đã chọn.',result:0,result_last:0,symbol:true},
    {name:'Đơn hàng',id:4,info:'Tổng số lượng các đơn hàng bao gồm sản phẩm có áp dụng khuyến mãi được xác nhận, tính trong khoảng thời gian đã chọn.',result:0,result_last:0},
    {name:'Người mua',id:5,info:'Tổng số lượng người mua duy nhất đã mua sản phẩm có áp dụng khuyến mãi, tính trên toàn bộ các đơn hàng được xác nhận trong khoảng thời gian đã chọn.',result:0,result_last:0},
    {name:'Số lượng sản phẩm chính đã bán',id:6,info:'Tổng số lượng sản phẩm có áp dụng khuyến mãi đã bán, tính trên toàn bộ các đơn hàng được xác nhận trong khoảng thời gian đã chọn.',result:0,result_last:0},
    {name:'Số lượng Sản phẩm mua kèm đã bán',id:7,info:'Tổng số lượng sản phẩm có áp dụng khuyến mãi đã bán, tính trên toàn bộ các đơn hàng được xác nhận trong khoảng thời gian đã chọn.',result:0,result_last:0},
    {name:'Doanh số của sản phẩm chính trên mỗi Người mua',id:8,info:'Tổng số lượng sản phẩm có áp dụng khuyến mãi đã bán, tính trên toàn bộ các đơn hàng được xác nhận trong khoảng thời gian đã chọn.',result:0,result_last:0,symbol:true},
    {name:'Doanh số từ Deal Sốc trên mỗi Người mua',id:9,info:'Tổng số lượng sản phẩm có áp dụng khuyến mãi đã bán, tính trên toàn bộ các đơn hàng được xác nhận trong khoảng thời gian đã chọn.',result:0,result_last:0,symbol:true},])
    
    
    const setstats=(data)=>{
        setStats(current=>current.map(stat=>{
            if(stat.id==1){
                return({...stat,result:data.total_amount,result_last:data.total_amount_last})
            }
            else if(stat.id==2){
                return({...stat,result:data.amount_main,result_last:data.amount_main_last})
            }
            else if(stat.id==3){
                return({...stat,result:data.amount_byproducts,result_last:data.amount_byproducts_last})
            }
            else if(stat.id==4){
                return({...stat,result:data.total_order,result_last:data.total_order_last})
            }
            else if(stat.id==5){
                return({...stat,result:data.number_buyer,result_last:data.number_buyer_last})
            }
            else if(stat.id==6){
                return({...stat,result:data.total_quantity,result_last:data.total_quantity_last})
            }
            else if(stat.id==7){
                return({...stat,result:data.quantity_byproducts,result_last:data.quantity_byproducts_last})
            }
            else if(stat.id==8){
                return({...stat,result:safe_div(data.total_amount,data.number_buyer),result_last:safe_div(data.total_amount_last,data.number_buyer_last)})
            }
            else {
                return({...stat,result:safe_div(data.amount_byproducts,data.number_buyer),result_last:safe_div(data.amount_byproducts_last,data.number_buyer_last)})
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
                            url={dashboardAddonURL}
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
export default DashboardShockdeal
