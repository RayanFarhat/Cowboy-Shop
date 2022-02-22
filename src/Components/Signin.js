import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import BannerName from './BannerName';
import { Types, Items } from './Data';
import TypeCard from './TypeCard';
import ItemCard from './ItemCard';
import { useStateValue } from './StateProvider';

/* perform sign in action */
function SignIn() {

    //start with showing first type items and filter items of this type
    const [filterdItems, setFilteredItems] = useState(
        Items.filter((element) => element.itemId === "hat")
    );

    // get and use cart items array to render the items in the cart
    const [{ cart }] = useStateValue();

    /* for 'active' style effect */
    useEffect(() => {

        // bottom menu active icon changer
        const bottomIcon = document.querySelectorAll("#bottomIcons li");

        function setMenuActive() {
            bottomIcon.forEach(n => n.classList.remove("active"));
            this.classList.add("active");
        }

        bottomIcon.forEach(n => n.addEventListener("click", setMenuActive))

        // menu category Card active class changer
        const menuCardType = document
            .querySelector(".rowContainer")
            .querySelectorAll(".typeCard");

        function setmenuCardTypeActive() {
            menuCardType.forEach((n) => n.classList.remove("active"));
            this.classList.add("active");
        }

        menuCardType.forEach((n) => n.addEventListener("click", setmenuCardTypeActive));

    }, [filterdItems, cart, cart.length]);

    //filter the items from the type that it get
    const setData = (itemId) => {
        setFilteredItems(Items.filter((element) => element.itemId === itemId));
    };

    const auth = firebase.auth();

    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }

    return (



        <div className="signIn">

            <button className="signInbutton" onClick={signInWithGoogle}>Sign In with Google here</button>

            <div className="banner">
                <BannerName name={",sign in for shopping"} />
                <img
                    src="https://firebasestorage.googleapis.com/v0/b/ryanshop-98e7a.appspot.com/o/homepic.png?alt=media&token=a0a255e5-8e92-4008-9433-e2588722c115"
                    alt=""
                    className="AdPic"
                />



            </div>
            {/* product container */}
            <div className="ProductContainer" >

                {/* Category Title */}
                <div className="subMenuContainer" >
                    <h3>Menu Category</h3>
                </div>

                {/* row of types */}
                <div className="rowContainer" >

                    {/* insert all items types from data to the row */}
                    {
                        Types && Types.map(data => (
                            //filter the items types
                            <div key={data.id} onClick={() => setData(data.itemId)}>
                                <TypeCard imgSrc={data.imgSrc} name={data.name} isActive={data.id === 1 ? true : false} />
                            </div>
                        ))}

                </div>

                {/* all the filtered items */}
                <div className="itemContainer" >
                    {
                        filterdItems && filterdItems.map(data => (
                            <ItemCard key={data.id} itemId={data.id} imgSrc={data.imgSrc} name={data.name}
                                price={data.price} description={data.description} />
                        ))}
                </div>
            </div>





        </div>
    );
}

export default SignIn;