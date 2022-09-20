import React, { useState, useEffect } from 'react';
import { headers } from '../../actions/auths';
import { ItemRecommend, categoryURL } from '../../urls';
import { formatter } from '../../constants';
import {itemrecent,COLOURS} from "../database/itemrecently"
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import axios from 'axios';
const Cart=()=>{
  return(
    <View>
    </View>
  )
}