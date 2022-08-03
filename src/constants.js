
export const star_solid=<>
<svg viewBox="0 0 30 30" className="_3c6iA8"><defs><linearGradient id="star__hollow" x1="50%" x2="50%" y1="0%" y2="99.0177926%"><stop offset="0%" stopColor="#FFD211"></stop><stop offset="100%" stopColor="#FFAD27"></stop></linearGradient></defs><path fill="none" fillRule="evenodd" stroke="url(#star__hollow)" strokeWidth="2" d="M23.226809 28.390899l-1.543364-9.5505903 6.600997-6.8291523-9.116272-1.4059447-4.01304-8.63019038-4.013041 8.63019038-9.116271 1.4059447 6.600997 6.8291523-1.543364 9.5505903 8.071679-4.5038874 8.071679 4.5038874z"></path></svg>
<svg viewBox="0 0 30 30" className="_3c6iA8" style={{width: '100%'}}><defs><linearGradient id="star__solid" x1="50%" x2="50%" y1="0%" y2="100%"><stop offset="0%" stopColor="#FFCA11"></stop><stop offset="100%" stopColor="#FFAD27"></stop></linearGradient></defs><path fill="url(#star__solid)" fillRule="evenodd" d="M14.9988798 25.032153l-8.522024 4.7551739c-.4785069.2670004-.7939037.0347448-.7072938-.5012115l1.6339124-10.1109185-6.8944622-7.1327607c-.3871203-.4005006-.2499178-.7947292.2865507-.8774654l9.5090982-1.46652789L14.5740199.51703028c.2346436-.50460972.6146928-.50543408.8497197 0l4.2693588 9.18141263 9.5090986 1.46652789c.545377.0841102.680337.4700675.28655.8774654l-6.894462 7.1327607 1.633912 10.1109185c.08788.5438118-.232337.7662309-.707293.5012115l-8.5220242-4.7551739z"></path></svg>
</>
export const star_empty=<>
    <svg viewBox="0 0 30 30" className="_3c6iA8"><defs><linearGradient id="star__hollow" x1="50%" x2="50%" y1="0%" y2="99.0177926%"><stop offset="0%" stopColor="#FFD211"></stop><stop offset="100%" stopColor="#FFAD27"></stop></linearGradient></defs><path fill="none" fillRule="evenodd" stroke="url(#star__hollow)" strokeWidth="2" d="M23.226809 28.390899l-1.543364-9.5505903 6.600997-6.8291523-9.116272-1.4059447-4.01304-8.63019038-4.013041 8.63019038-9.116271 1.4059447 6.600997 6.8291523-1.543364 9.5505903 8.071679-4.5038874 8.071679 4.5038874z"></path></svg>
    <svg viewBox="0 0 30 30" className="_3c6iA8" style={{width: '0%'}}><defs><linearGradient id="star__solid" x1="50%" x2="50%" y1="0%" y2="100%"><stop offset="0%" stopColor="#FFCA11"></stop><stop offset="100%" stopColor="#FFAD27"></stop></linearGradient></defs><path fill="url(#star__solid)" fillRule="evenodd" d="M14.9988798 25.032153l-8.522024 4.7551739c-.4785069.2670004-.7939037.0347448-.7072938-.5012115l1.6339124-10.1109185-6.8944622-7.1327607c-.3871203-.4005006-.2499178-.7947292.2865507-.8774654l9.5090982-1.46652789L14.5740199.51703028c.2346436-.50460972.6146928-.50543408.8497197 0l4.2693588 9.18141263 9.5090986 1.46652789c.545377.0841102.680337.4700675.28655.8774654l-6.894462 7.1327607 1.633912 10.1109185c.08788.5438118-.232337.7662309-.707293.5012115l-8.5220242-4.7551739z"></path></svg>
</>

export const list_rating_category_bab=['Product quality','Seller service','Shipping service']
export const formatter = new Intl.NumberFormat('vi-VN', {
  minimumFractionDigits: 0
})
export const listaction=[{value:1,action:"Chỉnh sửa"},{value:2,action:"Chi tiết"},
{value:3,action:"Đơn hàng"},{value:4,action:"Sao chép"},{value:5,action:"Xóa"}]
export const list_review_text_star=[
  [
      'Chất lượng sản phẩm rất kém',
      'Đóng gói sản phẩm rất kém',
      'Shop phục vụ rất kém',
      'Rất không đáng tiền',
      'Thời gian giao hàng rất chậm'
  ],
  [
      'Chất lượng sản phẩm kém',
      'Đóng gói sản phẩm kém',
      'Shop phục vụ kém',
      'Không đáng tiền',
      'Thời gian giao hàng chậm'
      ],
  [
      'Chất lượng sản phẩm tạm được',
      'Đóng gói sản phẩm tạm được',
      'Shop phục vụ tạm được',
      'Giá cả chấp nhận được',
      'Thời gian giao hàng tạm được'
      ],
  [
      'Chất lượng sản phẩm tốt',
      'Đóng gói sản phẩm chắc chắn',
      'Shop phục vụ khá tốt',
      'Đáng đồng tiền',
      'Thời gian giao hàng nhanh'
      ],
  [
      'Chất lượng sản phẩm tuyệt vời',
      'Đóng gói sản phẩm rất đẹp và chắc chắn',
      'Shop phục vụ rất tốt',
      'Rất đáng tiền',
      'Thời gian giao hàng rất nhanh'
      ]
  ]
export  const time_end=new Date()
time_end.setMonth(new Date().getMonth()+6)
export const valid_from=new Date()
valid_from.setHours(new Date().getHours()+1)
valid_from.setMinutes(0)
export const valid_to=new Date()

valid_to.setHours(new Date().getHours()+2)
valid_to.setMinutes(0)
export function rating_score(number,review){
  return Array(number).fill().map((_,k)=>
      <div className="rating-stars__star _2Jb05n" style={{width: '14px', height: '14px'}}>{review.review_rating?k<=review.review_rating?star_solid:star_empty:star_empty}</div>
  )
}
export const regExp = /^[a-zA-Z@.]+$/;
export function validatEemail(email)
{
  var filter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!filter.test(email)) {
      return false;
  }
  return true;
}

export function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), 
      n = bstr.length, 
      u8arr = new Uint8Array(n);
      
  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }
  
  return new File([u8arr], filename, {type:mime});
}

const characters ='abcdefghijklmnopqrstuvwxyz0123456789';
export const generateString=(length)=>{
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
export const list_review_choice=(number)=>{
  const list_review_choice=[]
  list_review_choice.push({name:'All',value:'true',keys:'review'})
  for(let i=number;i>0;i--){
    list_review_choice.push({name:`${i} Sao`,value:i,keys:'review_rating'})
  }
  list_review_choice.push({name:'Có Bình Luận',value:'comment',keys:'comment'},{name:'Có Hình Ảnh / Video',value:'media',keys:'media'})
  return list_review_choice
}
export function TaoSoNgauNhien(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
export function hidestring(username){
  let string=''
  for(let m=1;m<username.length-1;m++){
  string+='*'
  }
  return string
}
export const listchoice=[{name:"Tất cả",value:'all'},
{name:"Đang diễn ra",value:'current'},
{name:'Sắp diễn ra',value:"upcoming"},
{name:'Đã kêt thúc',value:"finished"}
]
export const limit_choice=[{value:false,name:'Unlimit'},{value:true,name:"Limit"}]
export const itemvariation=(data)=>{
  let item_variation=''
  if (data.color_value!='' && data.color_value!='' && data.size_value!=''){
      item_variation=data.color_value+','+data.size_value
      }
  else if(data.color_value!='' && data.size_value==''){
      item_variation=data.color_value
      }
  else if(data.color_value=='' && data.size_value!=''){
      item_variation=data.size_value
  }
  return item_variation
}
export const rating_choice=[5,4,3,2,1]
export const arraymove = (arr, fromIndex, toIndex) =>{
  var element = arr[fromIndex];
  arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, element);
}
export const timeformat=(data)=>{
  return  ("0" + new Date(data).getDate()).slice(-2) + "-" + ("0"+(new Date(data).getMonth()+1)).slice(-2) + "-" +
  new Date(data).getFullYear()
}
export const timevalue=(data)=>{
  return new Date(data).getFullYear() + "-" + ("0"+(new Date(data).getMonth()+1)).slice(-2) + "-" + ("0" + new Date(data).getDate()).slice(-2)
}
export const safe_div=(x,y)=>{
  return y==0?x:x/y
}

export const timesubmit=(data)=>{
  return new Date(data).getFullYear() + "-" + ("0"+(new Date(data).getMonth()+1)).slice(-2) + "-" + ("0" + new Date(data).getDate()).slice(-2)+ " " + ("0" + new Date(data).getHours()).slice(-2) + ":" + ("0" + new Date(data).getMinutes()).slice(-2)
}
export const timecreate=(data)=>{
  return ("0" + new Date(data).getDate()).slice(-2) + "-" + ("0"+(new Date(data).getMonth()+1)).slice(-2) + "-" +
  new Date(data).getFullYear() + " " + ("0" + new Date(data).getHours()).slice(-2) + ":" + ("0" + new Date(data).getMinutes()).slice(-2)
}
export const timeago=(value)=>{
  const totalseconds=(new Date().getTime()-new Date(value).getTime())/1000
  let time=Math.round(totalseconds)+'s'
  if(totalseconds>60 && totalseconds<60*60){
    time=Math.round(totalseconds/60) +'m'
  }
  if(totalseconds>=60*60 && totalseconds<60*60*24){
    time=Math.round(totalseconds/3600) +'h'
  }
  else if(totalseconds>=60*60*24 && totalseconds<60*60*24*30){
    time=Math.round(totalseconds/(60*60*24)) +'d'
  }
  else if(totalseconds>=60*60*24*30 && totalseconds<60*60*24*30*12){
    time=Math.round(totalseconds/(60*60*24*30)) +'m'
  }
  else if(totalseconds>=60*60*24*30*12){
    time=Math.round(totalseconds/(60*60*24*30*12)) +'y'
  }
  return time
}
export const timepromotion=(data)=>{
  return ("0" + new Date(data).getHours()).slice(-2) + ":" + ("0" + new Date(data).getMinutes()).slice(-2)+ " " + ('0'+new Date(data).getDate()).slice(-2) + "-" + ("0"+(new Date(data).getMonth()+1)).slice(-2) + "-" +
  new Date(data).getFullYear()
}
export const pagesize=[12,24,48]
export const list_reason_cancel=[
  'Muốn thay đổi địa chỉ giao hàng',
  'Muốn nhập/thay đổi mã Voucher',
  'Người bán không trả lời thắc mắc / yêu cầu của tôi',
  'Đổi ý không muốn mua nữa',
  'Tìm thấy giá rẻ hơn ở chỗ khác',
  'Khác'
  ]
export function validatePassword(value) {
  let  errors = [];
  if(value!=null){
      if (value.length < 6) {
          errors.push("Your password must be at least 8 characters"); 
      }
      if (value.search(/[a-z]/) < 0) {
          errors.push("Your password must contain at least one letter.");
      }
      if (value.search(/[A-Z]/) < 0) {
          errors.push("Your password must contain at least one letter.");
      }
      if (value.search(/[0-9]/) < 0) {
          errors.push("Your password must contain at least one digit."); 
      }
      if(value.match(/[|\\/~^:,;?!&%$@*+]/)){
          errors.push("Your password must contain at least one digit."); 
      }
  }
  else{
      errors.push("Your password must contain at least one digit."); 
  }
  return errors;
}
export const sort_price_choice=[{name:'Giá: Thấp đến Cao',value:'asc'},{name:'Giá: Cao đến Thấp',value:'desc'}]
export const sort_options=[{name:'Phổ biến',value:"pop"},{name:'Mới nhất',value:"ctime"},{name:'Bán chạy',value:"sales"},{name:'Giá',value:'price'}]
export const code_type=[{image:"http://127.0.0.1:8000/media/my_web/deal.png",name:'Buy with deal shock',value:'1'},
{image:"http://127.0.0.1:8000/media/my_web/gift.png",name:'Buy to receive gift',value:'2'}]
export const combo_type=[{name:'Giảm giá theo %',value:'1'},
{name:'Giảm giá theo số tiền',value:'2'},{name:'Giảm giá đặc biệt',value:'3'}]

export const discount_type=[{name:'Theo phần trăm',value:'1'},
{name:'Theo số tiền',value:'2'}]
export const award_type=[{name:'Mã giảm giá của Shop',value:'1'},{name:'Shopee Xu',value:'2'},]
export function isVietnamesePhoneNumber(number) {
  return /([\+84 |84 |0|+84|84|(+84)|(+84 )]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/.test(number);
}
export const checkDay = (date) => {
  const today = new Date()
  let day=''
  if(date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()){
      if(date.getDate() === (today.getDate())-1 ){
        day='Yesterday'
      }
      if(date.getDate() === (today.getDate())){
        day='Today'
      }
    }
    return day
};

export function groupBy(data, property) {
  return data.reduce((acc, obj) => {
    const key = obj[property];
    console.log(key)
    if (!acc[key]) {  
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, []);
}

export const percent=(value,value_last)=>{
  if(value>0 && value_last==0){
      return `+ 100`
  }
  else if(value==0 && value_last==0 || value==value_last){
      return `0.00`
  }
  else{
      if(value<value_last){
      return `- ${((1- value/value_last)*100).toFixed(2)}`
      }
      else{
          return `+ ${((value/value_last-1)*100).toFixed(2)}`
      }
  }
}
export const partition=(array, n)=>{
  return array.length ? [array.splice(0, n)].concat(partition(array, n)) : [];
}
export const rating=(number,item)=>{
  let result=[]
  if(item.review_rating>0){
    return Array(number).fill().map((_,k)=>{
      let int_start=item.review_rating
      let int_part = Math.trunc(int_start); // returns 3
      let float_part = Number((int_start-int_part).toFixed(2)); 
      if(k<= Math.trunc(item.review_rating)){
        return(
          <div className="rating-stars__star-wrapper">
            <div className="rating-stars__lit" style={{width: '100%'}}>
              <svg enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className="svg-icon rating-stars__gold-star icon-rating-solid"><polygon points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"></polygon></svg>
            </div>
            <svg enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className="svg-icon rating-stars__dark-star icon-rating-solid"><polygon points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"></polygon></svg>
          </div>)
          }
      else{
        return(
          <div className="rating-stars__star-wrapper">
            <div className="rating-stars__lit" style={{width: `${float_part*100}%`}}>
              <svg enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className="svg-icon rating-stars__gold-star icon-rating-solid"><polygon points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"></polygon></svg>
            </div>
            <svg enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className="svg-icon rating-stars__dark-star icon-rating-solid"><polygon points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"></polygon></svg>
          </div>)
        }
      })
    }
  }
export function matchYoutubeUrl(url) {
  var p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  if(url.match(p)){
      return url.match(p)[1];
  }
  return false;
}
export const ratingitem=(number,item)=>{
    let result=[]
    let int_start=item.review_rating
    let int_part = Math.trunc(int_start); // returns 3
    let float_part = Number((int_start-int_part).toFixed(2)); 
    if(item.review_rating>0){
      Array(number).fill().map((_,k)=>{
      if(k<= Math.trunc(item.review_rating)){
        result.push(
          <div className="rating-stars__star-wrapper">
            <div className="rating-stars__lit" style={{width: '100%'}}>
              <svg enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className="svg-icon rating-stars__primary-star icon-rating-solid"><polygon points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4" strokeLinecap="round" stroke-linejoin="round" stroke-miterlimit="10"></polygon></svg></div><svg enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className="svg-icon rating-stars__hollow-star icon-rating"><polygon fill="none" points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4" strokeLinecap="round" stroke-linejoin="round" stroke-miterlimit="10"></polygon></svg>
          </div>)
          }
      else{
        result.push(
          <div className="rating-stars__star-wrapper">
            <div className="rating-stars__lit" style={{width: `${float_part*100}%`}}>
            <svg enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className="svg-icon rating-stars__primary-star icon-rating-solid"><polygon points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4" strokeLinecap="round" stroke-linejoin="round" stroke-miterlimit="10"></polygon></svg>
            </div>
            <svg enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className="svg-icon rating-stars__hollow-star icon-rating"><polygon fill="none" points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4" strokeLinecap="round" stroke-linejoin="round" stroke-miterlimit="10"></polygon></svg>
          </div>)
        }
      })
      }
      return result
}
//user
export const address_null={address:'',address_choice:'',default:null,name:'',phone_number:''}
export const typeaddress=['Văn Phòng','Nhà Riêng']
