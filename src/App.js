import React from 'react'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import './css/main.css';
import "./css/user.css"
import './css/base.css';
import './css/home.css';
import "./css/vendor.css"
import "./css/dashboard.css"
import "./css/chat.css"
import './css/slideshow.css'
import { Provider } from 'react-redux'
import store  from "./store"
import Home from "./containers/Home"
import Login from "./user/Login"
import Addressuser from "./user/Listaddress"
import Detailview from "./containers/Detailview"
import Purchase from './user/Purchase';
import Profile from './user/Profile';
import Cart from './containers/Cart';
import Checkout from './containers/Checkout';
import Payment from './containers/Payment';
import Searchitem from './containers/Search';
import Layout from "./hocs/Layout"
import Promotion from "./containers/Promotion"
import ResetPassword from './user/ResetPassword';
import ResetPasswordConfirm from './user/ResetPasswordConfirm';
import Signup from './user/Signup';
import Registeremail from "./user/Registeremail"
import Dealshock from './containers/Dealshock'
import Newdealshock from "./seller/promotions/Newdealshock"
import Orderuser from "./user/Order"
import Shipping from "./seller/Shipping"
import Detaildealshock from  "./seller/promotions/Detaildealshock"
import Listproduct from "./seller/Listproduct"
import Dashboard from "./seller/dashboard/Dashboard"
import Detailproduct from "./seller/Detailproduct"
import Listvoucher from "./seller/promotions/Listvoucher"
import Listcomboshop from "./seller/promotions/Listpromotion"
import Listdiscountshop from './seller/promotions/Listprogram'
import Listdealshop from './seller/promotions/Listdealshock'
import Listflashseleshop from './seller/promotions/Listflashsale'
import Newshop from './seller/Newshop'
import Welcomeseller from './seller/Welcome'
import NoPage from './containers/Nopage'
import Loginvendor from "./seller/Login"
import HomePageSeller from './seller/Home'
import Marketing from './seller/Marketing'
import Loginotp from './user/Loginotp'
import Changepassword from './user/Changepassword'
import Phoneuser from './user/Phone'
import  Ratingshop from './seller/Ratingshop'
import Profileshop from './seller/Profileshop'
import Shippingmanagement from "./seller/Shippingmanagement"
import Flashsale from "./containers/Flashsale"
import DashboardVoucher from './seller/dashboard/DashboardVoucher'
import DashboardShockdeal from './seller/dashboard/DashboardShockdeal'
import DashboardFlashsale from './seller/dashboard/DashboardFlashsale'
import DashboardProgram from './seller/dashboard/DashboardProgram'
import DashboardPromotion from './seller/dashboard/DashboardPromotion'
import Calendar from './hocs/Calendar'
import Whell from "./hocs/Whell"
import ListAwardShop from './seller/promotions/ListAwardShop'
import ListFollowerOffer from './seller/promotions/ListFolloweOffer'
import DashboardAward from './seller/dashboard/DashboardAward'
import DashboardOffer from './seller/dashboard/DashboardOffer'
import TopSearch from './containers/search/Topsearch'
import Daily from './containers/search/Daily'
import Voucherinfo from './hocs/Voucherinfo'
import Flashsaleinfo from './hocs/Flashsaleinfo'
import Programinfo from './hocs/Programinfo'
import FollowerOfferInfo from './hocs/FollowerOfferInfo'
import ShopAwardInfo from './hocs/ShopAwardInfo'
import Promotioninfo from './hocs/Promotioninfo'
import GoogleMaps from './hocs/GoogleMap';

const Appstore=()=>{
return(
        <Provider store={store}>
                <BrowserRouter>
                        <Layout>
                                <Routes>
                                        <Route exact path="/" element={<Home/>}/>
                                        <Route exact path='/password/reset/confirm/:uid/:token'element={<ResetPasswordConfirm/>} />
                                        <Route path="*" element={<NoPage />} />
                                        <Route exact path="/game/:id" element={<Whell/>}/>
                                        <Route exact path="/top_products" element={<TopSearch/>}/>
                                        <Route exact path="/calendar" element={<Calendar/>}/>
                                        <Route exact path='/search' element={<Searchitem/>} /> 
                                        <Route exact path='/daily_discover' element={<Daily/>} /> 
                                        <Route exact path="/" element={<Home/>}/>
                                        <Route  path='/buyer/login/otp' element={<Loginotp replace to="/" />} />
                                        <Route  path='/buyer/login' element={<Login replace to="/" />} />
                                        <Route  path='/buyer/signup' element={<Registeremail />} />
                                        <Route exact path="/user/account/phone" element={<Phoneuser/>}/>
                                        <Route exact path="/buyer/signup/phone" element={<Signup/>}/>
                                        <Route exact path="/user/account/password" element={<Changepassword/>}/>
                                        <Route  path='/user/account/address' element={<Addressuser/>} />
                                        <Route exact path='/user/purchase/order/:id' element={<Orderuser/>} /> 
                                        <Route exact path='buyer/reset' element={<ResetPassword/>} />
                                        <Route exact path='/forgot_password/:uid/:token' element={<ResetPasswordConfirm/>} />
                                        <Route  path='/user/account/profile' element={<Profile/>} />
                                        <Route  path='/user/purchase' element={<Purchase/>} />
                                        <Route exact path=':slug' element={<Detailview/>} /> 
                                        <Route exact path='/addon-deal-selection/:deal_id/:id' element={<Dealshock/>} /> 
                                        <Route exact path='/bundle-deal/:id' element={<Promotion/>} /> 
                                        <Route exact path='/cart' element={<Cart/>} /> 
                                        <Route exact path='/flash_sale' element={<Flashsale/>} /> 
                                        <Route exact path='/checkout' element={<Checkout/>} /> 
                                        <Route exact path='/maps' element={<GoogleMaps/>} /> 
                                        <Route exact path='/payment' element={<Payment/>} /> 
                                        <Route exact path='/vendor/login' element={<Loginvendor/>} />
                                        <Route  path='/vendor' element={<HomePageSeller/>} />
                                        <Route  path='/vendor/onboarding' element={<Welcomeseller/>} />
                                        <Route  path='/vendor/onboarding/form' element={<Newshop/>} />
                                        <Route exact path='/vendor/product/new' element={<Detailproduct/>} /> 
                                        <Route exact path='/vendor/marketing' element={<Marketing/>} /> 
                                        <Route exact path='/vendor/product/:id' element={<Detailproduct/>} /> 
                                        <Route exact path='/marketing/vouchers/list' element={<Listvoucher/>} /> 
                                        <Route exact path='/marketing/vouchers/new' element={<Voucherinfo/>} /> 
                                        <Route exact path='/marketing/vouchers/:id' element={<Voucherinfo/>} /> 
                                        <Route exact path='/marketing/add-on-deal/:id' element={<Detaildealshock/>} /> 
                                        <Route exact path='/marketing/add-on-deal/new' element={<Newdealshock/>} /> 
                                        <Route exact path='/marketing/add-on-deal/list' element={<Listdealshop/>} /> 
                                        <Route exact path='/marketing/bundle/new' element={<Promotioninfo/>} /> 
                                        <Route exact path='/marketing/bundle/:id' element={<Promotioninfo/>} /> 
                                        <Route exact path='/marketing/bundle/list' element={<Listcomboshop/>} /> 
                                        <Route path="/marketing/shop-game/list" element={<ListAwardShop />} />
                                        <Route path="/marketing/shop-game/create" element={<ShopAwardInfo />} />
                                        <Route path="/marketing/shop-game/:id" element={<ShopAwardInfo />} />
                                        <Route path="/marketing/follow-prize/list" element={<ListFollowerOffer />} />
                                        <Route path="/marketing/follow-prize/create" element={<FollowerOfferInfo />} />
                                        <Route path="/marketing/follow-prize/:id" element={<FollowerOfferInfo />} />
                                        <Route exact path='/marketing/discount/create' element={<Programinfo/>} /> 
                                        <Route exact path='/marketing/discount/:id' element={<Programinfo/>} />
                                        <Route exact path='/marketing/discount/list' element={<Listdiscountshop/>} />  
                                        <Route exact path='/marketing/flash-sale/new' element={<Flashsaleinfo/>} /> 
                                        <Route exact path='/marketing/flash-sale/:id' element={<Flashsaleinfo/>} /> 
                                        <Route exact path='/marketing/shop-flash-sale/list' element={<Listflashseleshop/>} /> 
                                        <Route exact path='/sale/order' element={<Shippingmanagement/>} /> 
                                        <Route exact path='/vendor/product/list' element={<Listproduct/>} /> 
                                        <Route exact path='/vendor/shipping/list' element={<Shipping/>} /> 
                                        <Route exact path='/datacenter/dashboard' element={<Dashboard/>} />
                                        <Route exact path='datacenter/marketing/tools/voucher' element={<DashboardVoucher/>} />
                                        <Route exact path='datacenter/marketing/tools/flash' element={<DashboardFlashsale/>} />
                                        <Route exact path='/datacenter/marketing/tools/bundle' element={<DashboardPromotion/>} />
                                        <Route exact path='/datacenter/marketing/tools/discount' element={<DashboardProgram/>} />
                                        <Route exact path='/datacenter/marketing/tools/shop-game' element={<DashboardAward/>} />
                                        <Route exact path='/datacenter/marketing/tools/follow-prize' element={<DashboardOffer/>} />
                                        <Route exact path='/datacenter/marketing/tools/addon' element={<DashboardShockdeal/>} />
                                        <Route exact path='/setting/shop/rating' element={<Ratingshop/>} />
                                        <Route exact path='/setting/shop/profile' element={<Profileshop/>} />
                                </Routes>
                        </Layout>
                </BrowserRouter>
        </Provider>
        )
}
export default Appstore
  