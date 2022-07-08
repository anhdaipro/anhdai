import axios from 'axios';
import Navbar from "./Navbar"
import {Link} from 'react-router-dom'
import Address from "../hocs/Address"
import Listaddress from "./Listaddress"
import React, {useState, useEffect,useCallback} from 'react'
import ReactDOM, { render } from 'react-dom'
import {address_null,localhost,checkoutURL,formatter,threadlURL,
    itemvariation,arraymove, savevoucherURL,updateAddressURL,cityListURL} from "../constants"
