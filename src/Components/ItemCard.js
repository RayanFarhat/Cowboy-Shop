import { AddRounded } from '@mui/icons-material';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import React, { useEffect, useState } from 'react';
import { Items } from './Data';
import { actionType } from './reducer';
import { useStateValue } from './StateProvider';

//array to save items thats in the cart
let cartData = []
let qtysData = []

/* get item data and build his components */
function ItemCard({ imgSrc, name, price, itemId, description }) {
    //create the action when we press add to cart
    const [isCart, setCart] = useState(null);
    //call the Redux function
    const [{ cart, qtys }, dispatch] = useStateValue();

    //when ever isCart got item insert it to the array and use Redux function
    useEffect(() => {

        cartData = cart;
        qtysData = qtys;

        if (isCart !== null) {
            //check if the item already in the cart
            //if yes dont insert it otherwise insert it to the cart
            let isthere = false;
            let count = 0;
            for (var i = 0; i < cart.length; i++) {
                if (cart[i].id !== itemId) {
                    count = count + 1;
                }
            }
            if (count === cart.length) {
                isthere = true;
            }

            if (isthere === true) {

                cartData.push(isCart);
                qtysData.push(1);

                dispatch({
                    type: actionType.SET_CART,
                    cart: cartData,
                })

                dispatch({
                    type: actionType.SET_QTYS,
                    qtys: qtysData,
                })
            }
        }
        //return isCart to null
        setCart(null);
    }, [isCart])

    const addToCart = () => {
        setCart(Items.find(n => n.id === itemId));
    }

    //style of item descriotion
    const contentStyle = {
        background: '#be8e60', color: '#000', width: '150px', font: '10px'
    };

    return (
        <div className="itemCard" id={itemId}>

            <div className="imgBox">
                <img src={imgSrc} alt="" className="itemImg" />
            </div>

            <div className="itemContent">
                <h3 className="itemName">{name}</h3>

                <Popup trigger={<button className="descriptionButton" type="button">Open Description</button>}
                    {...{ contentStyle }} position="top left">
                    <small>{description}</small>
                </Popup>

                <div className="bottom">

                    <h3 className="price"><span>$ </span>{price}</h3>

                    {/* if clicked set the the item in isCart variable if founded in Data file */}
                    <i className="addtoCart" onClick={() => addToCart()}>
                        <AddRounded />
                    </i>
                </div>
            </div>
        </div>
    );
}

export default ItemCard;
