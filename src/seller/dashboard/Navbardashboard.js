import { Link } from "react-router-dom"
const listitem=[{name:'Tổng quan',url:'/datacenter/dashboard'},
{name:'Sản phẩm',url:'/datacenter/products'},
{name:'Tổng quan',url:'/datacenter/salesservice'},
{name:'Bán hàng và Dịch vụ',url:'/datacenter/traffic'},
{name:'Truy cập',url:'/datacenter/marketing'},
{name:'Marketing',url:'/datacenter/marketing'},
]
const NavbarDashboard=()=>{
    return(
        <div data-v-4ea51c50 className="top-navbar">
            <nav data-v-4ea51c50="">
                {listitem.map((item,index)=>
                <Link key={index} data-v-4ea51c50="" to={item.url} className="nav-tab datacenter-dashboard">
                    <span data-v-4ea51c50="" className="text">{item.name}</span> 
                </Link>
                )}
                
                <Link data-v-4ea51c50="" to="/datacenter/selling" className="nav-tab datacenter-selling">
                    <span data-v-4ea51c50="" className="text">Quân Sư Bán Hàng</span> 
                    <span data-v-4cf53991="" data-v-4ea51c50="" className="badge-wrapper" style={{marginLeft: '4px'}}>
                        <div data-v-4cf53991="" className="badge-x"> 
                            <sup className="badge-x__sup badge-x__sup--dot">
                                <span>
                                </span>
                            </sup>
                        </div>
                    </span>
                </Link>  
                <div data-v-4ea51c50="" className="navbar-right-panel">
                    <Link data-v-4ea51c50="" to="/datacenter/learn" className="learn-more-link normal-learn-more-link mr-16">
                        <i data-v-4ea51c50="" className="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M6.50692156,2 C7.08217707,2 7.87390592,2.44054357 8.51774029,2.86712042 C9.60884094,2.258011 10.160514,2 10.5220425,2 L14.0031784,2 C14.5554632,2 15.0031784,2.44771525 15.0031784,3 L15.0031784,12.9195918 C15.0031784,13.4718638 14.5554504,13.9195687 14.0031784,13.9195687 L10.5075199,13.9195687 C10.1708939,13.9195687 8.93829366,14.7893464 8.5109755,14.7893464 C8.08365734,14.7893464 6.9191394,13.9195687 6.51058323,13.9195687 L3.00003214,13.9195687 C2.44772964,13.9196008 2,13.4718712 2,12.9195687 L2,3 C2,2.44771525 2.44771525,2 3,2 L6.50692156,2 Z M14.0031784,3 L10.5220425,3 C10.3944161,3 9.75539186,3.31590418 9,3.743 L9,13.5246778 C9.39284596,13.3133631 9.67116172,13.1714832 9.83494726,13.0990383 C10.0806256,12.9903709 10.2722293,12.9360787 10.5075199,12.9360787 L14.0031784,12.9360902 L14.0031784,3 Z M6.50692156,3 L3,3 L3,12.9213505 L6.59964678,12.922821 C6.88638522,12.9329781 7.08273474,12.9992251 7.51903855,13.2276522 L8,13.4869496 L8,3.723 C7.33510296,3.28246794 6.74282866,3 6.50692156,3 Z"></path></svg>
                        </i>
                        Tìm hiểu thêm
                    </Link> 
                    <div data-v-37db921b="" data-v-4ea51c50="" className="live-monitor-container">
                    <Link data-v-37db921b="" to="/datacenter/liveboard?ADTAG=mydata" className="live-monitor-btn__normal" target="_blank">
                        <div data-v-145e30cc="" data-v-37db921b="" className="normal">
                            <i data-v-145e30cc="" className="inline-svg-container icon-normal">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.95 3.72302C22.905 3.52929 22.7849 3.36136 22.6162 3.25615C22.4474 3.15095 22.2437 3.11709 22.05 3.16201L18.1395 4.06801C18.0102 4.09792 17.8911 4.16162 17.7944 4.2526C17.6978 4.34358 17.627 4.45859 17.5893 4.58587C17.5516 4.71316 17.5484 4.84816 17.58 4.9771C17.6116 5.10604 17.6768 5.22428 17.769 5.31976L18.6225 6.20252L14.0625 10.2705L11.6948 8.02802C11.5507 7.89162 11.3584 7.81789 11.16 7.82295C10.9617 7.82801 10.7735 7.91145 10.6365 8.05502L5.55675 13.3815C5.25347 13.3182 4.938 13.3503 4.65371 13.4734C4.36941 13.5966 4.13023 13.8048 3.96902 14.0694C3.80782 14.334 3.7325 14.642 3.75342 14.9511C3.77435 15.2602 3.89048 15.5553 4.08587 15.7957C4.28125 16.0362 4.54631 16.2103 4.84461 16.294C5.14291 16.3777 5.45982 16.367 5.7518 16.2634C6.04378 16.1597 6.2965 15.9682 6.47524 15.7151C6.65398 15.4621 6.74996 15.1598 6.75 14.85C6.75 14.6873 6.71775 14.5343 6.66975 14.388L11.2058 9.63152L13.5315 11.8335C13.668 11.9627 13.848 12.0359 14.036 12.0387C14.2239 12.0415 14.406 11.9736 14.5463 11.8485L19.665 7.28252L20.6378 8.28977C20.7299 8.38522 20.8458 8.4545 20.9735 8.49055C21.1012 8.52659 21.2362 8.52811 21.3647 8.49494C21.4932 8.46177 21.6106 8.3951 21.7049 8.30174C21.7992 8.20838 21.867 8.09166 21.9015 7.96352L22.9433 4.08676C22.9755 3.96793 22.9778 3.84297 22.95 3.72302Z" fill="#EE4D2D"></path><path d="M21.75 10.5577C21.5511 10.5577 21.3603 10.6368 21.2197 10.7774C21.079 10.9181 21 11.1088 21 11.3077V17.25C21 17.4489 20.921 17.6397 20.7803 17.7803C20.6397 17.921 20.4489 18 20.25 18H3.75C3.55109 18 3.36032 17.921 3.21967 17.7803C3.07902 17.6397 3 17.4489 3 17.25V3.75C3 3.55109 3.07902 3.36032 3.21967 3.21967C3.36032 3.07902 3.55109 3 3.75 3H16.1873C16.3862 3 16.5769 2.92098 16.7176 2.78033C16.8582 2.63968 16.9373 2.44891 16.9373 2.25C16.9373 2.05109 16.8582 1.86032 16.7176 1.71967C16.5769 1.57902 16.3862 1.5 16.1873 1.5H3.75C3.15326 1.5 2.58097 1.73705 2.15901 2.15901C1.73705 2.58097 1.5 3.15326 1.5 3.75V17.25C1.5 17.8467 1.73705 18.419 2.15901 18.841C2.58097 19.2629 3.15326 19.5 3.75 19.5H20.25C20.8467 19.5 21.419 19.2629 21.841 18.841C22.2629 18.419 22.5 17.8467 22.5 17.25V11.3077C22.5 11.1088 22.421 10.9181 22.2803 10.7774C22.1397 10.6368 21.9489 10.5577 21.75 10.5577ZM21.375 21H2.625C2.42609 21 2.23532 21.079 2.09467 21.2197C1.95402 21.3603 1.875 21.5511 1.875 21.75C1.875 21.9489 1.95402 22.1397 2.09467 22.2803C2.23532 22.421 2.42609 22.5 2.625 22.5H21.375C21.5739 22.5 21.7647 22.421 21.9053 22.2803C22.046 22.1397 22.125 21.9489 22.125 21.75C22.125 21.5511 22.046 21.3603 21.9053 21.2197C21.7647 21.079 21.5739 21 21.375 21Z" fill="#EE4D2D"></path></svg>
                            </i>
                            Theo dõi Trực tiếp
                        </div>
                    </Link>
                </div>
            </div>
        </nav>
    </div> 
    )
}
export default NavbarDashboard