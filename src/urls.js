export const localhost = "https://anhdai.herokuapp.com";
const apiURL = "/api/v4";
export const endpoint = `${localhost}${apiURL}`;
export const refreshtokenURL=`${localhost}${apiURL}/refresh/token`
export const loginURL=`${localhost}${apiURL}/login`
export const user =`${localhost}${apiURL}/user-id/`
export const forgotpasswordURL=`${endpoint}/buyer/forgot_password`;
export const purchaselistdURL=`${endpoint}/purchase`;
export const addresslistdURL=`${endpoint}/get_address`;
export const profiledURL=`${endpoint}/profile`;
export const updateuseronlineURL=`${endpoint}/update/pnline`
export const resetpassdURL=`${endpoint}/user/account/password-reset`;
export const cityListURL = `${endpoint}/get_city`;
export const passwordURL=`${endpoint}/user/account/password`;
export const dealURL=`${endpoint}/addon-deal-selection`
export const byproductdealURL=`${endpoint}/deal/byproduct`
export const promotionURL=`${endpoint}/bundle-deal/`
export const otpURL=`${endpoint}/resend-sms`
export const updateURL=`${endpoint}/update/image`
export const categoryhomeURL=`${endpoint}/category/home`
export const changepassURL=`${endpoint}/change/password/`
export const registeremailURL=`${endpoint}/register/email`
export const verifyemailURL=`${endpoint}/verify/email`
export const buyagainURL=`${endpoint}/buy_again`
export const itemURL=`${endpoint}/item/get`
//home
export const savevoucherURL=`${endpoint}/save_voucher`
export const imagehomeURL=`${endpoint}/imagehome`;
export const listcategoryURL=`${endpoint}/categories`;
export const listitemflashsalelURL=`${endpoint}/products`;
export const reviewURL=`${endpoint}/review`;
export const ItemRecommend=`${endpoint}/product/recommend`;
export const searchURL=`${endpoint}/search`
export const updateAddressURL = `${endpoint}/update_address`;
export const ItemsellerURL=`${endpoint}/item/seller`;
export const itemcommon=`${endpoint}/item/common`

export const categoryURL = `${endpoint}/category`;
export const  categoryinfoURL=`${endpoint}/categoryinfo`
export const verifyotpURL=`${endpoint}/verify-sms`;
export const addressListURL = addressType =>
  `${endpoint}/addresses/?address_type=${addressType}`;
export const itemrecentlyURL= `${endpoint}/item/recently`
export const shopURL=`${endpoint}/shop/get`
export const updatefileURL=`${endpoint}/upload-file`
export const productinfoURL=`${endpoint}/productinfo`
export const searchshopURL=`${endpoint}/shop/search`
export const shopinfoURL=`${endpoint}/shopinfo`
export const topsearchURL=`${endpoint}/top-search`
export const  flashsaleURL=`${endpoint}/flash_sale`
export const listflashsaleURL=`${endpoint}/flash_sale/list`
//cart
export const listorderURL=`${endpoint}/listorder`
export const orderURL=`${endpoint}/order/`
export const updatecartURL = `${endpoint}/updatecart`;
export const  cartviewURL=`${endpoint}/cart`;
export const  cartURL=`${endpoint}/cartview`;
export const addToCartURL = `${endpoint}/add-to-cart`;
export const shoporderURL = `${endpoint}/shop/order`;
export const paymentURL = `${endpoint}/payment`;
export const addToCartBatchURL = `${endpoint}/add-to-cart-batch`;
export const checkoutURL = `${endpoint}/checkout`;
//chat
const apichat=`${localhost}/api/v1`
export const conversationsURL=`${apichat}/conversations`
export const threadlURL=`${apichat}/message`;
export const listThreadlURL=`${apichat}/thread/list`
export const createthreadURL=`${apichat}/thread/new`
//vendor
export const originweb =window.location.origin

const apivendorURL = "/api/v3";
//prmotions
export const vouchershopURL=`${localhost}${apivendorURL}/voucher/new`;
export const dealDetailshopURL=`${localhost}${apivendorURL}/deal_shock/`;
export const itemdealURL=`${localhost}${apivendorURL}/item_deal_shock`;
export const newdealURL=`${localhost}${apivendorURL}/new_deal`
export const newcomboURL=`${localhost}${apivendorURL}/new_combo`
export const detailcomboURL=`${localhost}${apivendorURL}/combo/`
export const newprogramURL=`${localhost}${apivendorURL}/discount/create`
export const detailprogramURL=`${localhost}${apivendorURL}/discount/`
export const detailvoucherURL=`${localhost}${apivendorURL}/voucher/`
export const newflashsaleURL=`${localhost}${apivendorURL}/flashsale/create`
export const detailflashsaleURL=`${localhost}${apivendorURL}/flashsale/`
export const newAwardshopURL=`${localhost}${apivendorURL}/shop-game/new`
export const detailAwardshopURL=`${localhost}${apivendorURL}/shop-game`
export const listAwardshopURL=`${localhost}${apivendorURL}/shop-game/list`
export const newFollowOffershopURL=`${localhost}${apivendorURL}/follow-prize/new`
export const detailFollowOffershopURL=`${localhost}${apivendorURL}/follow-prize`
export const listFollowOffershopURL=`${localhost}${apivendorURL}/follow-prize/list`
export const listvouchershopURL=`${localhost}${apivendorURL}/vouchers/list`
export const listdiscountshopURL=`${localhost}${apivendorURL}/list/discount`
export const listcomboshopURL=`${localhost}${apivendorURL}/bundle/list`
export const listAddonshopURL=`${localhost}${apivendorURL}/add-on-deal/list`
export const listflashsaleshopURL=`${localhost}${apivendorURL}/shop-flash-sale/list`

///shop
export const newproductdetailURL=`${localhost}${apivendorURL}/product/new`
export const shippingshopURL=`${localhost}${apivendorURL}/shipping/shop/list`
export const updateimageURL = `${localhost}${apivendorURL}/product/update_image`
export const listshippingURL=`${localhost}${apivendorURL}/shipping/list`
export const newshopURL =`${localhost}${apivendorURL}/shop/create`
export const infosellerURL=`${localhost}${apivendorURL}/infoseller`
export const chartURL=`${localhost}${apivendorURL}/home/seller`
export const shopprofileURL=`${localhost}${apivendorURL}/shop/profile`
export const listordersellerURL=`${localhost}${apivendorURL}/shop/order`
export const shopratingURL=`${localhost}${apivendorURL}/shop/rating`;
export const productshopURL=`${localhost}${apivendorURL}/product/list`;
export const listProductshopURL=`${localhost}${apivendorURL}/product`
export const newproductURL=`${localhost}${apivendorURL}/product/category`
export const detailproductURL=`${localhost}${apivendorURL}/product/`


//dashboard
const apidashboardURL="/api/v2"
export const dashboardURL=`${localhost}${apidashboardURL}/dashboard`
export const dashboardpromotionURL=`${localhost}${apidashboardURL}/dashboard/bundle`
export const dashboardvoucherURL=`${localhost}${apidashboardURL}/dashboard/voucher`
export const dashboardflashsaleURL=`${localhost}${apidashboardURL}/dashboard/flash`
export const dashboardAddonURL=`${localhost}${apidashboardURL}/dashboard/addon`
export const dashboardprogramURL=`${localhost}${apidashboardURL}/dashboard/discount`
export const dashboardOfferURL=`${localhost}${apidashboardURL}/dashboard/prize`
export const dashboardAwardURL=`${localhost}${apidashboardURL}/dashboard/game`
export const dataProgramURL=`${localhost}${apidashboardURL}/data/discount`
export const dataPromotionURL=`${localhost}${apidashboardURL}/data/bundle`
export const dataFlashsaleURL=`${localhost}${apidashboardURL}/data/flash`
export const dataVoucherURL=`${localhost}${apidashboardURL}/data/voucher`
export const dataAddonURL=`${localhost}${apidashboardURL}/data/addon`
export const dataOfferURL=`${localhost}${apidashboardURL}/data/prize`
export const dataShopawardURL=`${localhost}${apidashboardURL}/data/game`