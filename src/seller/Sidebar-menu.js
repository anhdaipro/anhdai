
import {originweb} from "../constants"
import React, { useState } from 'react';
import {Link} from 'react-router-dom';

const Sidebarmenu=()=>{
    const [state,setState]=useState([
    {info:[{name:'Setting shipping',url:'/vendor/shipping/list'},{name:'Shipping management',url:'/sale/order'}],show:false,name:'Delivery',src:''},
    {info:[{name:'All',url:'/sale/order'},{name:'Canceled',url:'/sale/order?type=canceled'},{name:'Trả Hàng/Hoàn Tiền',url:'/sale/returnlist'}],show:true,name:'Order Management',src:''},
    {info:[{name:'All product',url:'/vendor/product/list'},{name:'Add Product',url:'/vendor/product/new'},],show:true,name:'Manage product',src:''},
    {info:[{name:'Marketing channel',url:'/vendor/marketing'},{name:'Adventity',url:'/vendor/marketing'},
    {name:'Vocher shop',url:'/marketing/vouchers/list'}],show:true,name:'Marketing channel',src:''},
    {info:[{name:'Sales Analysis',url:'/vendor/datacenter'},{name:'Operational Efficiency',url:'/vendor/shipping'},
    ],show:true,name:'Data',src:''},
    {info:[{name:'Shop Rating',url:'/setting/shop/rating'},
    {name:'Shop Profile',url:'/setting/shop/profile'},{name:'Decorate shop',url:'/vendor/shipping'},
    {name:'Shop Catalog',url:'/vendor/shipping'},
    ],show:true,name:'Shop Manager',src:''},
    {info:[{name:'Address',url:'/vendor/shipping'},{name:'Shop setting',url:'/vendor/shipping'},
    {name:'Account',url:'/vendor/shipping'}
    ],show:true,name:'Shop setting',src:''}
    ])

    const setshow=(itemchoice)=>{
        const list_item=state.map(item=>{
            if(item.info===itemchoice.info){
                return({...item,show:!item.show})
            }
            return({...item})
        })
        setState(list_item)
    }

    return(
        <div className="sidebar-container">
            <div className="siderbar">
                {state.map(item=>
                    <div className={`seller sidebar-menu ${item.show?'':'sidebar-menu-collapse'}`}>
                    <div className="item-center sidebar-menu-item ">
                        <img className="sidebar-menu-icon" src={item.src} alt=""/>
                        <span className="sidebar-menu-item-text">{item.name}</span>
                        <span className="sidebar-menu-item-space"></span>
                        <i onClick={()=>setshow(item)} className="sidebar-menu-item-collapse icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M8 6.81l3.97 3.97a.75.75 0 0 0 1.06-1.06l-4.5-4.5a.75.75 0 0 0-1.06 0l-4.5 4.5a.75.75 0 0 0 1.06 1.06L8 6.81z"></path></svg>
                        </i>
                    </div>
                    <div className="item-col sidebar-submenu">
                        {item.info.map(product=>
                            <Link className={`sidebar-submenu-item ${originweb+product.url==window.location?'active':''}`} to={product.url}>{product.name}</Link>
                        )}
                    </div>
                </div>
                )}
            </div>
        </div>
    )
}
export default Sidebarmenu