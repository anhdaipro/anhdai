import {
    PayPalScriptProvider,
    PayPalHostedFieldsProvider,
    PayPalHostedField,
    usePayPalHostedFields,
    PayPalButtons,
    BraintreePayPalButtons,
} from "@paypal/react-paypal-js";
import {threadlURL,paymentURL} from "../constants"
import axios from 'axios';
import Navbar from "./Navbar"
import { headers} from '../actions/auth';
import React, {useState, useEffect,useCallback} from 'react'
const SubmitPayment = () => {
    // Here declare the variable containing the hostedField instance
    const hostedFields = usePayPalHostedFields();

    const submitHandler = () => {
        if (!typeof hostedFields.submit !== "function") return; // validate that `submit()` exists before using it
        hostedFields
            .submit({
                // The full name as shown in the card and billing address
                cardholderName: "John Wick",
            })
            .then((order) => {
                fetch(
                    "/your-server-side-integration-endpoint/capture-payment-info"
                )
                    .then((response) => response.json())
                    .then((data) => {
                        // Inside the data you can find all the information related to the payment
                    })
                    .catch((err) => {
                        // Handle any error
                    });
            });
    };

    return <button onClick={submitHandler}>Pay</button>;
};

export default function Payment() {
    const [state,setState] = useState({amount:0})
    const [show,setShow]=useState(false)
    useEffect(() => {
        const getJournal = async () => {
            await axios.get(paymentURL,headers)
            .then(res=>{
                setState({amount:res.data.amount})
                setShow(true)
            })
        }
        getJournal();
    }, []);
    return (
        <>  
            <div className="top container-wrapper">
                <Navbar/>
            </div>
            {show?
            <div className="containers">
                <div className="payment-safe-page">
                    <div className="_8Cs56x UeFxZG">
                    <div className="item-centers">    
                    <div id="paypal-button-container">
                        <PayPalScriptProvider
                            options={{
                                "client-id": "AY2deOMPkfo32qrQ_fKeXYeJkJlAGPh5N-9pdDFXISyUydAwgRKRPRGhiQF6aBnG68V6czG5JsulM2mX",
                                
                            }}
                        >
                            <PayPalButtons
                                createOrder={(data, actions) => {
                                    return actions.order.create({
                                        purchase_units: [
                                            {
                                                amount: {
                                                    value: state.amount,
                                                },
                                            },
                                        ],
                                    });
                                }}
                                onApprove={(data, actions) =>{
                                    return actions.order.capture().then(function (details) {
                                        let form=new FormData()
                                        form.append('payID',details.purchase_units[0].payments.captures[0].id)
                                    
                                        axios.post(paymentURL,form,headers)
                                        .then(res=>{
                                            
                                        })
                                        .catch(function(err){
                                            alert('Error: ', err)
                                        })
                                    });
                                }}
                            />
                        </PayPalScriptProvider>
                    </div>
                </div>
                    </div>
                </div>

            </div>:""}
        </>
    );
}
