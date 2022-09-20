import React, { useState, useEffect } from 'react';
import { headers } from '../../actions/auths';
import { ItemRecommend, categoryURL } from '../../urls';
import { formatter } from '../../constants';
import newAPI from '../../apis/News';
import {itemrecent,COLOURS} from "../database/itemrecently"
import {imagehome} from "../database/imagehome"
import Svg, { 
  Circle, Ellipse, G, TSpan, TextPath, Path, Polygon, Polyline, Line, Rect, Use, Symbol, Defs, LinearGradient, RadialGradient, Stop, ClipPath, Pattern, Mask 
} from 'react-native-svg'
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StyleSheet
} from 'react-native';
import axios from 'axios';
import Constants from 'expo-constants';
const {width} = Dimensions.get('window');
const height = width*0.6;

export default function Homebuyer ({ navigation }) {
  const [products, setProducts] = useState([]);
  
  //get called on screen loads
  const [imgActive,setimgActive]=useState(0)
  useEffect(() => {
    const source = axios.CancelToken.source();
    const url = ItemRecommend;
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await newAPI.get(agfffffff, headers);
        if (response.status === 200) {
          setProducts(response.data)
          return;
        } else {
          throw new Error("Failed to fetch users");
        }
      } catch (error) {
        if(axios.isCancel(error)){
          console.log('Data fetching cancelled');
        }else{
          setErrorFlag(true);
          setIsLoading(false);
        }
      }
    };
    fetchUsers();
    return () => source.cancel("Data fetching cancelled");
  }, []);
  const onchange=(nativeEvent)=>{
    if(nativeEvent){
      const slice=Math.ceil(nativeEvent.contentOffset.x/nativeEvent.      layoutMeasurement.width)
      if(slice!=imgActive){
        setimgActive(slice)
      }
    }
  }
  const setindex=(index)=>{
    setimgActive(index)
  }
  return (
    <SafeAreaView style={styles.container}>
      
        <View style={styles.wrap}>
          <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.wrap}
          >
            {imagehome.map((item,index)=>
              <Image
                key={item.id}
                source={{uri:item.image}}
                resizeMode='stretch'
                style={styles.wrap}
              ></Image>
            )}
          </ScrollView>
          <View style={styles.searchwrap}>
          <View style={styles.search}>
            <View style={{marginRight:8,flexDirection:'row'}}>
            <View style={{paddingTop:1}}>
              <Svg viewBox="0 0 25 25" width="20" height="20" fill='currentColor' style={styles.svg_icon}>
                <G fill-rule="evenodd" stroke="none" stroke-width="1"><G transform="translate(-1016 -32)"><G><G transform="translate(405 21)"><G transform="translate(611 11)"><Path d="m8 16c4.418278 0 8-3.581722 8-8s-3.581722-8-8-8-8 3.581722-8 8 3.581722 8 8 8zm0-2c-3.3137085 0-6-2.6862915-6-6s2.6862915-6 6-6 6 2.6862915 6 6-2.6862915 6-6 6z"></Path><Path d="m12.2972351 13.7114222 4.9799555 4.919354c.3929077.3881263 1.0260608.3842503 1.4141871-.0086574.3881263-.3929076.3842503-1.0260607-.0086574-1.414187l-4.9799554-4.919354c-.3929077-.3881263-1.0260608-.3842503-1.4141871.0086573-.3881263.3929077-.3842503 1.0260608.0086573 1.4141871z"></Path></G></G></G></G></G>
              </Svg>
              </View>
              <Text style={[styles.textorange,{textTransform:'uppercase'}]}>Ở đay có mã free shop</Text>
            </View>
            <View><Svg width="20" height="18" viewBox="0 0 20 18" style={styles.svg_icon} fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M6.15377 9.76902C6.15377 11.8927 7.87492 13.6152 9.99992 13.6152C12.1236 13.6152 13.8461 11.8927 13.8461 9.76902C13.8461 7.64466 12.1236 5.92286 9.99992 5.92286C7.87492 5.92286 6.15377 7.64466 6.15377 9.76902ZM5 9.76902C5 7.00777 7.23813 4.76902 10 4.76902C12.7613 4.76902 15 7.00777 15 9.76902C15 12.5296 12.7613 14.769 10 14.769C7.23813 14.769 5 12.5296 5 9.76902ZM1.15385 17.2607C0.489784 17.2607 0 16.725 0 16.0662V4.12224C0 3.4623 0.489784 2.84596 1.15385 2.84596H4.61538L5.21635 1.73273C5.21635 1.73273 5.75421 0.538269 6.41827 0.538269H13.5817C14.2452 0.538269 14.7837 1.73273 14.7837 1.73273L15.3846 2.84596H18.8462C19.5096 2.84596 20 3.4623 20 4.12224V16.0662C20 16.725 19.5096 17.2607 18.8462 17.2607H1.15385Z" fill="black" fill-opacity="0.26"></path></Svg></View>
          </View>
          <View>
           <Svg style={{color: '#fff',fill:'#fff',
    stroke: '#fff'}} viewBox="0 0 26.6 25.6" width='26' height='26' ><Polyline fill="none" points="2 1.7 5.5 1.7 9.6 18.3 21.2 18.3 24.6 6.1 7 6.1" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2.5"></Polyline><Circle cx="10.7" cy="23" r="2.2" stroke="none"></Circle><Circle cx="19.7" cy="23" r="2.2" stroke="none"></Circle></Svg>
           </View>
          </View>
          <View style={styles.wrapdot}>
            {imagehome.map((item,index)=>
              <Text
              onPress={()=>setindex(index)}
                key={item.id}
                style={imgActive==index?styles.dotActive:styles.dot}
              >●</Text>
              )}
          </View>
        </View>
      <View style={{
        display:'flex',
        padding:2,
        flexDirection:'row',
        flexWrap: 'wrap',
        justifyContent:'center'
      }}>
      {itemrecent.map((data) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Product', { productID: data.url })
          }
          style={{
            width: '50%',
            padding:4,
          }}>
          <View style={{backgroundColor:'#fff'}}>
            <View
              style={{
                width: '100%',
                height: 160,
                backgroundColor: COLOURS.backgroundLight,
                position: 'relative',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              
              <View
                style={styles.flag}>
                <View style={styles.flagBottom} />
                <Text
                  style={{
                    fontSize: 12,
                    color: '#ee4d2d',
                    fontWeight: 'bold',
                    letterSpacing: 1,
                  }}>
                  {data.percent_discount}%
                </Text>
                <Text style={styles.textwhite}>GIẢM</Text>
              </View>
              <View
                style={styles.shoptypewrap}>
                <View style={styles.flagLeft} />
                <Text
                  style={{
                    fontSize: 12,
                    color: '#fff',
                  }}>
                  Yêu thích
                </Text>
              </View>
            <Image
              source={{uri:data.image}}
              
              style={{
                width: '100%',
                height: '100%',
                
              }}
            />
          </View>
          <Text
            numberOfLines={2}
            style={{
              fontSize: 12,
              color: COLOURS.black,
              marginTop:8,
              fontWeight: '600',
              marginBottom: 4,
            }}>
            {data.name}
          </Text>
          
          <View style={[styles.flexcenter,styles.flexspace,{alignItems: 'center'},{padding:3}]}>
            <View style={styles.flexcenter}>
              <Text style={[styles.textorange,styles.fontsmall]}>₫</Text>
              <Text style={styles.textorange}>{formatter((data.max_price+data.min_price)/2)}</Text>
            </View>
            <Text style={styles.fontsmallest}>đã bán {data.number_order}</Text>
          </View>
        </View>  
        </TouchableOpacity>
      ))}
      </View>
     <View style={styles.bottom}>
        <View style={{display:'flex',
          padding:2,
          flexDirection:'row',
          flexWrap: 'wrap',
          }}>
          <View style={styles.center}>
            <Text style={[styles.textorange,styles.fontbig]}>9.9</Text>
            <Text style={[styles.textorange,styles.fontsmall]}>Home</Text>
          </View>
          <View style={styles.center}>
            <Text>hello</Text>
            <Text style={[styles.fontsmall,imgActive?styles.active:null]}>Feed</Text>
          </View>
          <View style={styles.center}>
            <Text>hello</Text>
            <Text style={[styles.fontsmall,imgActive?styles.active:null]}>Live</Text>
          </View>
          <View style={styles.center}>
            <Text>hello</Text>
            <Text style={[styles.fontsmall,imgActive?styles.active:null]}>Thông báo</Text>
          </View>
          <View style={styles.center}>
            <Text>hello</Text>
            <Text style={[styles.fontsmall,imgActive?styles.active:null]}>Tôi</Text>
          </View>
        </View>
     </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  center:{
    flex:1,justifyContent:'center',alignItems:'center'
  },
  wrap:{
    width,
    height
  },
  search:{
    backgroundColor:'#fff',
    padding:8,
    paddingTop:8,
    paddingBottom:8,
    flexDirection:'row',
    borderRadius:4,
  },
  searchwrap:{
    position:'absolute',
    top:'10%',
    alignItems:'center',
    flexDirection:'row',
    left:10
  },
  flexcenter:{
    flexDirection:'row'
  },
  flexspace:{
    justifyContent:'space-between'
  },
  wrapdot:{
    position:'absolute',
    flexDirection:'row',
    bottom:0,
    alignSelf:'center'
  },
  textorange:{
    color:'#ee4d2d'
  },
  textwhite:{
    color:'#fff'
  },
  active:{
    color:'#ee4d2d',
  },
  fontbig:{
    fontSize:20,
    fontWeight:800
  },
  fontsmall:{
    fontSize:12
  },
  fontsmallest:{
    fontSize:10
  },
  dot:{
    margin:3,
    color:'#fff'
  },
  dotActive:{
    color:'#ee4d2d',
    margin:3,
  }
  ,
  flag:{
    position: 'absolute',
    height: '24%',
    width:40,
    paddingRight:2,
    paddingLeft:2,
    paddingBottom:4,
    paddingTop:2,
    backgroundColor: 'rgba(255,212,36,.9)',
    top: -2,
    zIndex:1000,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shoptypewrap:{
    position: 'absolute',
    paddingRight:4,
    paddingLeft:4,
    paddingBottom:2,
    paddingTop:2,
    backgroundColor: 'rgb(242, 82, 32)',
    top: 2,
    borderTopRightRadius:4,
    borderBottomRightRadius:4,
    zIndex:1000,
    left: -4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flagBottom: {
    position: "absolute",
    left: 0,
    top: '100%',
    width: 0,
    height: 0,
    borderBottomWidth: 6,
    borderBottomColor: "transparent",
    borderLeftWidth: 20,
    borderLeftColor: "rgba(255,212,36,.9)",
    borderRightWidth: 20,
    borderRightColor: "rgba(255,212,36,.9)",
  },
  flagLeft:{
    position:'absolute',
    left:0,
    top:'100%',
    width: 0,
    height: 0,
    borderTopWidth:4,
    borderTopColor:'#333',
    borderLeftWidth: 4,
    borderLeftColor: 'transparent',
  },
  bottom:{
    position:'fixed',
    backgroundColor:'#fff',
    bottom:0,
    left:0,
    right:0
  },
  svg_icon:{
    width: 20,
    height: 20,
    color:'gray',
    fill: 'currentColor',
    position: 'relative',
  }
});


