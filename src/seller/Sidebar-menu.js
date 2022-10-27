
import {originweb} from "../urls"
import React, { useState } from 'react';
import {Link} from 'react-router-dom';

const Sidebarmenu=()=>{
    const [state,setState]=useState([
    {info:[{name:'Setting shipping',url:'/vendor/shipping/list'},{name:'Shipping management',url:'/sale/order'}],show:false,name:'Delivery',src:'https://cf.shopee.vn/file/c15905d5a6284687c4a6ad00d0feb511'},
    {info:[{name:'All',url:'/sale/order'},{name:'Canceled',url:'/sale/order?type=canceled'},{name:'Trả Hàng/Hoàn Tiền',url:'/sale/returnlist'}],show:true,name:'Order Management',src:'https://cf.shopee.vn/file/f82f8ccb649afcdf4f07f1dd9c41bcb0'},
    {info:[{name:'All product',url:'/vendor/product/list'},{name:'Add Product',url:'/vendor/product/new'},],show:true,name:'Manage product',src:'https://cf.shopee.vn/file/3fa3bdb20eb201ae3f157ee8d11a39d5'},
    {info:[{name:'Marketing channel',url:'/vendor/marketing'},{name:'Adventity',url:'/vendor/marketing'},
    {name:'Vocher shop',url:'/marketing/vouchers/list'}],show:true,name:'Marketing channel',src:'https://cf.shopee.vn/file/2f9d62dd7e037c22608ac75dfb84a409'},
    {info:[{name:'Sales Analysis',url:'/datacenter/dashboard'},{name:'Operational Efficiency',url:'/vendor/shipping'},
    ],show:true,name:'Data',src:'https://cf.shopee.vn/file/09759afab8ae066ca5e1630bc19133a1'},
    {info:[{name:'Shop Rating',url:'/setting/shop/rating'},
    {name:'Shop Profile',url:'/setting/shop/profile'},{name:'Decorate shop',url:'/vendor/shipping'},
    {name:'Shop Catalog',url:'/vendor/shipping'},
    ],show:true,name:'Shop Manager',src:'https://cf.shopee.vn/file/6b1ffcde1ff12621088110f419a5283a'},
    {info:[{name:'Address',url:'/vendor/shipping'},{name:'Shop setting',url:'/vendor/shipping'},
    {name:'Account',url:'/vendor/shipping'}
    ],show:true,name:'Shop setting',src:'https://cf.shopee.vn/file/789f116a0778cf137519cadb1165d70f'}
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
                    <div key={item.id} className={`seller sidebar-menu ${item.show?'':'sidebar-menu-collapse'}`}>
                    <div className="item-center sidebar-menu-item ">
                        <img className="sidebar-menu-icon" src={item.src} alt=""/>
                        <span className="sidebar-menu-item-text">{item.name}</span>
                        <span className="sidebar-menu-item-space"></span>
                        <i onClick={()=>setshow(item)} className="sidebar-menu-item-collapse icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M8 6.81l3.97 3.97a.75.75 0 0 0 1.06-1.06l-4.5-4.5a.75.75 0 0 0-1.06 0l-4.5 4.5a.75.75 0 0 0 1.06 1.06L8 6.81z"></path></svg>
                        </i>
                    </div>
                    <div className="item-col sidebar-submenu">
                        {item.info.map((product,index)=>
                            <Link key={index} className={`sidebar-submenu-item ${originweb+product.url==window.location?'active':''}`} to={product.url}>{product.name}</Link>
                        )}
                    </div>
                </div>
                )}
            </div>
        </div>
    )
}
export default Sidebarmenu