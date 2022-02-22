import React, { useEffect, useState } from 'react';
import Order from './Order';
import MenuContainer from './MenuContainer';
import { HomeRounded, SummarizeRounded } from '@mui/icons-material';
import firebase from 'firebase/compat/app';
import { actionType } from './reducer';
import { useStateValue } from './StateProvider';
import { getAuth } from 'firebase/auth';

/* build Bottom Menu  components */
function BottomMenu() {

    //get firebase info to update database info
    const db = firebase.firestore();
    const auth = getAuth();
    const user = auth.currentUser;

    const [orders, setOrders] = useState([]);

    //call the Redux function
    const [{ resetdb }, dispatch] = useStateValue();


    //reset the orders and render them when ever new order added to the list
    useEffect(() => {
        resetOrders();
    }, [resetdb])

    const resetOrders = async () => {

        //find user id
        var docId = "";

        const response = db.collection('users');
        const data = await response.get();
        data.docs.forEach(item => {
            if (item.data().userid === user.uid) {
                docId = item.id;
            }
        })


        //update the user order list in the database
        let neworders = [];
        db.collection("users").doc(docId).collection("orders").onSnapshot((QuerySnapshot) => {
            QuerySnapshot.forEach((doc) => {
                neworders.push({
                    ...doc.data(),
                    key: doc.id,
                });
            });
            setOrders(neworders);
            neworders = [];
        });



        //change temp value just to useeffect function called again
        const temp = false;
        dispatch({
            type: actionType.SET_RESETDB,
            name: temp,
        })

    }

    return (

        < footer className="bottomMenu" >
            <ul id="bottomIcons">
                {/* Home icon */}
                <MenuContainer link={'#'} icon={<HomeRounded />} isHome />

                {/* Orders icon */}
                <MenuContainer link={'#'} icon={<SummarizeRounded />} />

                {/* for the selected icon */}
                <div className="indicator ">
                </div>

                {/* orders list ,show text that tell that the list is empty*/}
                <div className="orderList">
                    <h3>Order List :</h3>
                    {
                        orders.length === 0 ?
                            (<div>
                                <h2>No orders yet...!!!</h2>
                            </div>)
                            : (
                                orders && orders.map((order) => (
                                    <Order key={order.key} name={order.cardname} cart={order.ordercart} total={order.ordertotal}
                                        cartids={order.ordercartids} qtys={order.orderqtys} orderid={order.key} />
                                ))
                            )
                    }

                </div>
            </ul>
        </footer >
    );
}

export default BottomMenu;
