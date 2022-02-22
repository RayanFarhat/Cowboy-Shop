
/* a trick to save and access values globaly */
// initial values
export const initialState = {
  cart: [],
  total: 0,
  qtys: [],
  name: '',
  number: '',
  date: '',
  ccv: '',
  reserdb: false,
};
// action name for changing the values
export const actionType = {
  SET_CART: "SET_CART",
  SET_TOTAL: "SET_TOTAL",
  SET_QTYS: "SET_QTYS",
  SET_NAME: "SET_NAME",
  SET_NUMBER: "SET_NUMBER",
  SET_DATE: "SET_DATE",
  SET_CCV: "SET_CCV",
  SET_RESETDB: "SET_RESETDB"
};

// catch the action and use it
const reducer = (state, action) => {

  switch (action.type) {
    case actionType.SET_CART:
      return {
        //change cart not all state
        ...state,
        cart: action.cart,
      };

    case actionType.SET_TOTAL:
      return {
        //change total not all state
        ...state,
        total: action.total,
      };

    case actionType.SET_QTYS:
      return {
        //change qty not all state
        ...state,
        qty: action.qtys,
      };

    case actionType.SET_NAME:
      return {
        //change card name not all state
        ...state,
        name: action.name,
      };

    case actionType.SET_NUMBER:
      return {
        //change card number not all state
        ...state,
        number: action.number,
      };

    case actionType.SET_DATE:
      return {
        //change card date not all state
        ...state,
        date: action.date,
      };

    case actionType.SET_CCV:
      return {
        //change card ccv not all state
        ...state,
        ccv: action.ccv,
      };

    case actionType.SET_RESETDB:
      return {
        //change database not all state
        ...state,
        ccv: action.reserdb,
      };


    default:
      return state;
  }
};

export default reducer;
