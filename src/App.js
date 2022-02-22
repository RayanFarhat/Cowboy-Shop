//////////////////////////////////////////////////////////////
//import react
import React, { useEffect, useState } from 'react';
//////////////////////////////////////////////////////////////
//import firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
//////////////////////////////////////////////////////////////
//import css
import './App.css';
import "./ComponentsStyle/Header.css";
import "./ComponentsStyle/BottomMenu.css";
import "./ComponentsStyle/Banner.css";
import "./ComponentsStyle/Types.css";
import "./ComponentsStyle/Items.css";
import "./ComponentsStyle/CreditCard.css";
import "./ComponentsStyle/Cart.css";
import "./ComponentsStyle/Total_Checkout.css";
import "./ComponentsStyle/order.css";
import "./ComponentsStyle/Responsive.css";
//////////////////////////////////////////////////////////////
//import javascript
import SignIn from './Components/Signin';
import BannerName from './Components/BannerName';
import Header from './Components/Header';
import BottomMenu from './Components/BottomMenu';
import TypeCard from './Components/TypeCard';
import { Types, Items } from './Components/Data';
import ItemCard from './Components/ItemCard';
import CreditCard from './Components/CreditCard';
import CartItem from './Components/CartItem';
import CheckOut from './Components/CheckOut';
import { useStateValue } from './Components/StateProvider';
//////////////////////////////////////////////////////////////
// firebase init
firebase.initializeApp({
  apiKey: "AIzaSyC8NWNO98OfJ6YB_NpxIqd3nUZndX5em7Q",
  authDomain: "ryanshop-98e7a.firebaseapp.com",
  projectId: "ryanshop-98e7a",
  storageBucket: "ryanshop-98e7a.appspot.com",
  messagingSenderId: "198261132720",
  appId: "1:198261132720:web:59c998addb3da057beda75",
  measurementId: "G-7TLVDYEW1L"
})
const auth = firebase.auth();
//////////////////////////////////////////////////////////////
//main app
function App() {
  //get the current user in app
  const [user] = useAuthState(auth);



  return (
    <div className="App">
      {/* if user not log in ask for sign in before open the app */}
      {user ? <Shop /> : <SignIn />}
    </div>
  );
}
//////////////////////////////////////////////////////////////
//main shop page when user is logged in
function Shop() {

  //start with showing first type items and filter items of this type
  const [filterdItems, setFilteredItems] = useState(
    Items.filter((element) => element.itemId === "hat")
  );

  // get and use cart items array to render the items in the cart
  const [{ cart, total }] = useStateValue();

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
  //////////////////////////////////////////////////////////////////////////////////////////////
  //get some user data to display his photo and name
  const auth = getAuth();
  const user = auth.currentUser;
  const displayName = user.displayName;
  const photoURL = user.photoURL;

  //if user is new add him to database
  var isnew = true;
  var docId = "";

  const db = firebase.firestore();

  useEffect(() => {

    checkUsers();

  }, [])

  //read this once
  const checkUsers = async () => {
    const response = db.collection('users');
    const data = await response.get();
    data.docs.forEach(item => {
      if (item.data().userid === user.uid) {
        isnew = false;
        docId = item.id;
      }
    })


    if (isnew === true) {

      db.collection("users").add({
        userid: user.uid,
        username: user.displayName,
      });
    }

    const r = db.collection('users').where("userid", "==", user.uid);
    const a = await r.get();
    a.docs.forEach(item => {
    })

  };


  //////////////////////////////////////////////////////////////////////////////////////////////
  return (

    <div className="Shop">

      {/* Header Section */}
      <Header cartNum={cart ? cart.length : 0} displayName={displayName} photoURL={photoURL} />

      {/* Main Container */}

      <main>
        <div className="mainContainer">
          {/* Banner  */}
          <div className="banner">
            <BannerName name={displayName} />
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

        {/* Right Menu */}
        <div className="rightMenu">


          {/* if nothing in the cart show nothing of items inside the cart */}

          {cart.length === 0 ?
            (<div>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/ryanshop-98e7a.appspot.com/o/emptycart.png?alt=media&token=28b3640c-5071-4a69-b702-d1341d0d95c7"
                alt=""
              />

            </div>)
            : (

              < div className="cartCheckOutContainer">

                {/* Cart's Items Title */}
                <div className="subMenuContainer" >
                  <h3>Cards Items</h3>
                </div>

                <div className="cartContainer">

                  <div className="cartItems">

                    {cart &&
                      cart.map((data) => (
                        //insert the items frim cart array to the Cart
                        <CartItem
                          key={data.id}
                          itemId={data.id}
                          name={data.name}
                          imgSrc={data.imgSrc}
                          price={data.price}
                        />
                      ))}
                  </div>
                </div>

                {/* Cart's Items Title */}
                <div className="subMenuContainer" >
                  <h3>Credit Card</h3>
                </div>
                {/* Credit Card */}
                <div className="creditCardContainer">
                  <div className="creditCard">
                    <CreditCard />
                  </div>
                </div>

                {/* Total price */}
                <div className="totalSetion">
                  <h3>Total</h3>
                  <p><span>$ </span>{total}</p>
                </div>

                {/* button checkOut */}
                <CheckOut />
              </div>
            )}
        </div>
      </main >

      {/* Bottom Menu */}
      <BottomMenu />



    </div >

  );
}



//////////////////
export default App;
