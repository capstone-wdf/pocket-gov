import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { firebase } from "../src/firebase/config";

const SET_USER = "SET_USER";
const LOG_OUT_USER = "LOG_OUT_USER";
const UPDATE_USER_MEM = "UPDATE_USER_MEM";
const UPDATE_USER_BILL = "UPDATE_USER_BILL";
const UNFOLLOW_MEM = "UNFOLLOW_MEM";
const UNFOLLOW_BILL = "UNFOLLOW_BILL";

export const setUser = (user) => {
  return {
    type: SET_USER,
    user,
  };
};

export const updateUserMem = (memberId) => {
  return {
    type: UPDATE_USER_MEM,
    memberId,
  };
};

export const updateUserBill = (billNum) => {
  return {
    type: UPDATE_USER_BILL,
    billNum,
  };
};

export const logOutUser = () => {
  return {
    type: LOG_OUT_USER,
  };
};


export const unfollowMem = (memberId) => {
  return {
    type: UNFOLLOW_MEM,
    memberId
  };
};


export const unfollowBill = (billNum) => {
  return {
    type: UNFOLLOW_BILL,
    billNum
  };
};

export const fetchUser = (email, password) => {
  return (dispatch) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        const usersRef = firebase.firestore().collection("users");
        usersRef
          .doc(uid)
          .get()
          .then((firestoreDocument) => {
            if (!firestoreDocument.exists) {
              alert("User does not exist anymore.");
              return;
            }
            const user = firestoreDocument.data();
            dispatch(setUser(user));
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        alert(error);
      });
  };
};

export const updateUserMemFollowingThunk = (userId, memberId) => {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .update({
        members: firebase.firestore.FieldValue.arrayUnion(memberId),
      });
    dispatch(updateUserMem(memberId));
    // .catch(error => {
    //   alert(error)
    // })
  };
};

export const updateUserBillFollowingThunk = (userId, billNum) => {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .update({
        bills: firebase.firestore.FieldValue.arrayUnion(billNum),
      });
    dispatch(updateUserBill(billNum));
    // .catch(error => {
    //   alert(error)
    // })
  };
};

export const unfollowMemThunk = (userId, memberId) => {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .update({
        members: firebase.firestore.FieldValue.arrayRemove(memberId),
      });
    dispatch(unfollowMem(memberId));
  };
};

export const unfollowBillThunk = (userId, billNum) => {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .update({
        bills: firebase.firestore.FieldValue.arrayRemove(billNum),
      });
    dispatch(unfollowBill(billNum));
  };
};

export const logOutUserThunk = () => {
  return (dispatch) => {
    firebase
      .auth()
      .signOut()
      .then(
        // console.log("User after signout:", user),
        console.log("Signed Out Successfully"),
        dispatch(logOutUser())
      )
      .catch((error) => {
        alert(error);
      });
  };
};



// initial state
const initialState = {};

// reducer
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return action.user;
    case UPDATE_USER_MEM:
      return { ...state, members: [...state.members, action.memberId] };
    case UPDATE_USER_BILL:
      return { ...state, bills: [...state.bills, action.billNum] };
    case UNFOLLOW_MEM:
        return { ...state, members: state.members.filter(id => id !== action.memberId)};
    case UNFOLLOW_BILL:
        return { ...state, bills: state.bills.filter(billNum => billNum !== action.billNum)};
    case LOG_OUT_USER:
      return {};
    default:
      return state;
  }
};

const store = createStore(userReducer, applyMiddleware(thunkMiddleware));

export { store };
