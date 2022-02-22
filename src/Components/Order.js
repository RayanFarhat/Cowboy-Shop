import React from 'react';
import Popup from 'reactjs-popup';
import firebase from 'firebase/compat/app';
import { getAuth } from 'firebase/auth';

/* get order info and build his components in the order list */
function Order({ name, cart, cartids, qtys, orderid, total }) {
    //style of item descriotion
    const contentStyle = {
        background: '#be8e60', color: '#000', width: '150px', font: '10px', height: '80px', overflow: 'scroll',
    };

    //merge cart arrays to one
    let allcart = [];
    for (var i = 0; i < cart.length; i++) {
        allcart.push({
            name: cart[i],
            id: cartids[i],
            quantity: qtys[i],
        });
    }

    const db = firebase.firestore();
    const auth = getAuth();
    const user = auth.currentUser;

    //delete order from database
    const handleDelete = async (e) => {

        //get user id
        var docId = "";

        const response = db.collection('users');
        const data = await response.get();
        data.docs.forEach(item => {
            if (item.data().userid === user.uid) {
                docId = item.id;
            }
        })

        //update users database and delete the order from orders database for this user
        db.collection("users").doc(docId).collection("orders").onSnapshot((QuerySnapshot) => {
            QuerySnapshot.forEach((doc) => {
                if (doc.id === orderid) {
                    doc.ref.delete();
                }
            });
        });
    }

    return (
        <div className="order">
            <h4>Ordered by :<br></br>{name}</h4>

            {/* button to list the ordered items */}
            <Popup trigger={<button className="details" type="button">Order Details</button>}
                {...{ contentStyle }} position="top left">
                <small>Cost is {total}$.<br></br></small>
                {/* list the ordered items */}
                {
                    allcart && allcart.map((item) => (
                        <small key={item.id}>{item.quantity} of {item.name}.<br></br></small>

                    ))
                }
            </Popup>

            {/* button to cancel and delete the order */}
            <button className="delete" onClick={handleDelete}>Cancel Order</button>
        </div>
    );
}

export default Order;
