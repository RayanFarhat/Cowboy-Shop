import React from 'react';
import firebase from 'firebase/compat/app';
import { actionType } from './reducer';
import { useStateValue } from './StateProvider';
import { getAuth } from 'firebase/auth';

/* buld Check out button components */
function CheckOut() {


    ///////////////////////////////////////////////
    //create error box
    const modal = document.querySelector('.modal');
    //make error box disapear when press close button
    const handleClose = async () => {
        modal.style.display = "none";
    }
    ///////////////////////////////////////////////


    //call the Redux function
    const [{ cart, qtys, total, name, number, date, ccv }, dispatch] = useStateValue();
    const db = firebase.firestore();
    const auth = getAuth();
    const user = auth.currentUser;

    const handleSubmit = async (e) => {

        //add order to database`
        e.preventDefault();

        let cartnames = [];
        for (var i = 0; i < cart.length; i++) {
            cartnames[i] = cart[i].name;
        }

        let cartids = [];
        for (var j = 0; j < cart.length; j++) {
            cartids[j] = cart[j].id;
        }

        //get user id
        var docId = "";

        const response = db.collection('users');
        const data = await response.get();
        data.docs.forEach(item => {
            if (item.data().userid === user.uid) {
                docId = item.id;
            }
        })

        //if the card info is wrong show error box
        if (name === '' || number === '' ||
            date === '' || ccv === '') {
            modal.style.display = "block";
        } else {

            //update user daytabase and add the new order to the his orders database
            db.collection("users").doc(docId).collection("orders").add({
                ordercart: cartnames,
                ordercartids: cartids,
                orderqtys: qtys,
                ordertotal: total,
                cardname: name,
                cardnumber: number,
                carddate: date,
                cardccv: ccv,
            });

            //reset data
            cart.length = 0;
            qtys.length = 0;
            var resettotal = 0;
            let resetname = '';
            let resetnumber = '';
            let resetdate = '';
            let resetccv = '';
            const temp = true;

            dispatch({
                type: actionType.SET_TOTAL,
                name: resettotal,
            })

            dispatch({
                type: actionType.SET_NAME,
                name: resetname,
            })

            dispatch({
                type: actionType.SET_NUMBER,
                name: resetnumber,
            })

            dispatch({
                type: actionType.SET_DATE,
                name: resetdate,
            })

            dispatch({
                type: actionType.SET_CCV,
                name: resetccv,
            })

            dispatch({
                type: actionType.SET_RESETDB,
                name: temp,
            })

        }
    }

    return (
        /* know if this items type is active or not */
        <div className="submit">
            <button className="checkOut" onClick={handleSubmit}>Check Out</button>

            {/* if nothing in the cart show nothing of items inside the cart */}
            <div id="myModal" className="modal">

                <div className="modal-content">
                    <span className="close" onClick={handleClose} >&times;</span>
                    <p>The cart info is not right!<br></br>
                        1. full name must be only letters.<br></br>
                        2. card number must be only numbers.<br></br>
                        3. date must be vailed.<br></br>
                        4. ccv must be 3 numbers.<br></br>
                    </p>
                </div>

            </div>


        </div >

    );
}

export default CheckOut;