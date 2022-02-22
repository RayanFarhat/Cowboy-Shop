import { AddRounded, RemoveRounded } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { actionType } from './reducer';
import { useStateValue } from './StateProvider';

let cartItems = []
var totalPrice = 0
let qtysData = []

/* get the item in the cart data and build his components */
function CartItem({ name, imgSrc, price, itemId }) {
    //init the card item with one product at first
    const [qty, setQty] = useState(1);
    //var qty = 1;

    //save the total price
    //const [itemPrice, setItemPrice] = useState(parseInt(qty) * parseInt(price));
    var itemPrice = qty * parseInt(price);

    // get and use cart items array to remove the rendered items in the cart
    const [{ cart, total, qtys }, dispatch] = useStateValue();

    cartItems = cart;
    totalPrice = total;


    useEffect(() => {

        //if total get undifined return his value to 0
        if (isNaN(total)) {
            totalPrice = parseInt(0);
            dispatch({
                type: actionType.SET_TOTAL,
                total: parseInt(0),
            })
        }

        //when ever rerendered update the price
        itemPrice = parseInt(qty) * parseInt(price);

        totalPrice += itemPrice;

        dispatch({
            type: actionType.SET_TOTAL,
            total: totalPrice,
        })

    }, [qty])

    // when clicked on add or remove icons update the Quantity
    const updateQuantity = (action, id) => {

        cartItems = cart;
        totalPrice = total;
        qtysData = qtys;

        if (action === 'add') {
            setQty(qty + 1);

            for (var i = 0; i < cartItems.length; i++) {
                if (cartItems[i].id === id) {
                    qtysData[i] = qty + 1;
                }
            }

            dispatch({
                type: actionType.SET_QTYS,
                qtys: qtysData,
            })

        } else {
            if (qty === 1) {
                //if no more item remove it from the cart
                for (var i = 0; i < cartItems.length; i++) {
                    if (cartItems[i].id === id) {
                        cartItems.splice(i, 1);
                        qtysData.splice(i, 1);
                    }
                }

                dispatch({
                    type: actionType.SET_CART,
                    cart: cartItems,
                })

                dispatch({
                    type: actionType.SET_QTYS,
                    qtys: qtysData,
                })
            }
            else {
                setQty(qty - 1);

                for (var i = 0; i < cartItems.length; i++) {
                    if (cartItems[i].id === id) {
                        qtysData[i] = qty - 1;
                    }
                }

                dispatch({
                    type: actionType.SET_QTYS,
                    qtys: qtysData,
                })
            }
        }

        totalPrice -= itemPrice;


        dispatch({
            type: actionType.SET_TOTAL,
            total: totalPrice,
        })
    }

    return (
        <div className="cartItem">
            <div className="imgBox">
                <img src={imgSrc} alt="" />
            </div>

            <div className="itemSection">
                <h2 className="itemName">{name}</h2>
                <div className="itemQuantity">
                    <span>x {qty}</span>
                    <div className="quantity">
                        <RemoveRounded className="itemRemove" onClick={() => updateQuantity('remove', itemId)} />

                        <AddRounded className="itemAdd" onClick={() => updateQuantity('add', itemId)} />
                    </div>
                </div>
            </div>

            <p className="itemPrice">
                <span className="dolarSign">$ </span>
                <span className="itemPriceValue">{itemPrice}</span>
            </p>

        </div>
    );
}

export default CartItem;
