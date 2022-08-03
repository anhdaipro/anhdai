import React, {useState,useEffect,useCallback,useRef, useMemo} from 'react'
import { dashboardpromotionURL, dashboardvoucherURL } from "../../urls"
import Navbar from "../Navbar"

import NavbarDashboard from "./Navbardashboard"
import Chartdata from "./Chartdata"
import SibaMenu from './SibaMenuDashboard'
import { safe_div } from '../../constants'
const DashboardVoucher=()=>{
    const [stats,setStats]=useState([
    {name:'Doanh số',id:1,info:'Tổng giá trị của các đơn hàng có áp dụng discount Của Shop đã được xác nhận, bao gồm phí vận chuyển và không bao gồm các khuyến mãi khác, tính trong khoảng thời gian đã chọn.',result:0,result_last:0,symbol:true},
    {name:'Nhận',id:2,info:'Tổng số lượt được nhận voucher của Shop trong khoảng thời gian đã chọn.',result:0,result_last:0},
    {name:'Đơn hàng',id:3,info:'Tổng số voucher của Shop được sử dụng trong tất cả các đơn đặt hàng đã xác nhận trong khoảng thời gian đã chọn.',result:0,result_last:0},
    {name:'Tỉ lệ sử dụng',id:4,info:'Tổng số voucher của Shop được sử dụng trong tất cả các đơn đặt hàng đã xác nhận trong khoảng thời gian đã chọn.',result:0,result_last:0},
    {name:'Người mua',id:5,info:'Tổng số lượng người mua duy nhất đã mua sản phẩm có áp dụng khuyến mãi, tính trên toàn bộ các đơn hàng được xác nhận trong khoảng thời gian đã chọn.',result:0,result_last:0},
    {name:'Chi phí',id:6,info:'Tổng chi phí của voucher Shop được áp dụng khi thanh toán, bao gồm phí vận chuyển và không bao gồm các chương trình khuyến mãi khác, trong khoảng thời gian đã chọn.',result:0,result_last:0},])
    const setstats=useCallback((data)=>{
        setStats(current=>current.map(stat=>{
            if(stat.id==1){
                return({...stat,result:data.total_amount,result_last:data.total_amount_last})
            }
            else if(stat.id==2){
                return({...stat,result:data.count_voucher_received,result_last:data.count_voucher_received_last})
            }
            else if(stat.id==3){
                return({...stat,result:data.total_order,result_last:data.total_order_last})
            }
            else if(stat.id==4){
                return({...stat,result:safe_div(data.count_use_voucher,data.count_voucher_received),result_last:safe_div(data.count_use_voucher_last,data.count_voucher_received_last)})
            }
            else if(stat.id==5){
                return({...stat,result:data.number_buyer,result_last:data.number_buyer_last})
            }
           
            else{
                return({...stat,result:data.discount_voucher,result_last:data.discount_voucher_last})
            }
        }))
    },[stats])


    return (
        <div>
            <Navbar/>
            <div className="datacenter-app">
                <div className="data-center-layout vi">
                    <NavbarDashboard/>
                    <div data-v-4ea51c50 className="app-container clearfix">
                        <SibaMenu/>
                        <div style={{marginLeft: '220px'}} className="marketing app-container-body slide-container-body">
                            <div className="clearfix marketing-tools content-container">
                            <div fragment="b4c855caa6" className="sticky"></div>
                                <Chartdata
                                url={dashboardvoucherURL}
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
        </div>
    )
}
export default DashboardVoucher