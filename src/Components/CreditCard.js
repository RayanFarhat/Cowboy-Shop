import React, { useEffect, useState } from 'react';
import { actionType } from './reducer';
import { useStateValue } from './StateProvider';

/* buld Credit Card components */
function CreditCard() {

    //call the Redux function
    const [{ name, number, date, ccv }, dispatch] = useStateValue();

    //start card info with empty strings
    useEffect(() => {

        dispatch({
            type: actionType.SET_NAME,
            name: '',
        })

        dispatch({
            type: actionType.SET_NUMBER,
            number: '',
        })

        dispatch({
            type: actionType.SET_DATE,
            date: '',
        })

        dispatch({
            type: actionType.SET_CCV,
            ccv: '',
        })

    }, [])

    //handle card name input
    function handleName(event) {

        if (event.target.value.match(/^[a-zA-Z\s]*$/) != null) {

            dispatch({
                type: actionType.SET_NAME,
                name: event.target.value,
            })
        }
        else {
            //make string empty to show error box
            dispatch({
                type: actionType.SET_NAME,
                name: '',
            })
        }
    }

    //handle card number input
    function handleNumber(event) {

        if (event.target.value.match(/^[0-9]+$/) != null) {

            dispatch({
                type: actionType.SET_NUMBER,
                number: event.target.value,
            })
        }
        else {
            //make string empty to show error box
            dispatch({
                type: actionType.SET_NUMBER,
                number: '',
            })
        }
    }

    //handle card date input
    function handleDate(event) {
        const temp = event.target.value;
        if (temp.length === 5) {
            if (temp[0].match(/^\d+$/) != null && temp[1].match(/^\d+$/) != null &&
                temp[2] === '/' && temp[3].match(/^\d+$/) != null && temp[4].match(/^\d+$/) != null) {

                dispatch({
                    type: actionType.SET_DATE,
                    date: event.target.value,
                })
            }
            else {
                //make string empty to show error box
                dispatch({
                    type: actionType.SET_DATE,
                    date: '',
                })
            }
        } else {
            //make string empty to show error box
            dispatch({
                type: actionType.SET_DATE,
                date: '',
            })
        }
    }

    //handle card ccv input
    function handleCcv(event) {

        if (event.target.value.match(/^[0-9]+$/) != null) {
            if (event.target.value.length === 3) {
                dispatch({
                    type: actionType.SET_CCV,
                    ccv: event.target.value,
                })
            } else {
                //make string empty to show error box
                dispatch({
                    type: actionType.SET_CCV,
                    ccv: '',
                })
            }
        }
        else {
            //make string empty to show error box
            dispatch({
                type: actionType.SET_CCV,
                ccv: '',
            })
        }
    }

    return (
        <div className="cardGroup">

            <h2>VISA</h2>

            {/* <!-- name on card -->*/}
            <div className="name">
                <span className="instructions">Name on Card</span>
                <input className="full-name" type="text" maxLength="20" inputMode='text' placeholder="Full Name"
                    autoComplete="cc-csc" onChange={handleName}></input>
            </div>

            {/*<!-- card number -->*/}
            <div className="number">
                <span className="instructions">Card Number</span>
                <input className="card-number" type="text" maxLength="16" placeholder="Card Number"
                    autoComplete="cc-csc" onChange={handleNumber}></input>
            </div>

            {/*<!-- valid / ccv -->*/}
            <div className="date">
                <span className="instructions">Valid Date </span>
                <input type="text" maxLength="5" placeholder="00/00" onChange={handleDate}></input>

                <span className="instructions">CCV </span>
                <input className="ccvinput" type="text" maxLength="3" placeholder="123" onChange={handleCcv}></input>
            </div>

            {/*<!-- shine -->*/}
            <div className="shine"></div>
            <div className="shine shine-layer-two"></div>



        </div>
    );
}

export default CreditCard;
