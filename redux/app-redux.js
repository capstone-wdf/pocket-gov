import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { firebase } from '../src/firebase/config'

const SET_USER = 'SET_USER'
const UPDATE_USER = 'UPDATE_USER'

export const setUser = user => {
  return {
    type: SET_USER,
    user
  }
}

export const updateUser = memberId => {
  return {
    type: UPDATE_USER,
    memberId
  }
}

export const fetchUser = (email, password) => {
  return dispatch => {
      firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
          const uid = response.user.uid
          const usersRef = firebase.firestore().collection('users')
          usersRef
              .doc(uid)
              .get()
              .then(firestoreDocument => {
                  if (!firestoreDocument.exists) {
                      alert("User does not exist anymore.")
                      return;
                  }
                  const user = firestoreDocument.data()
                  dispatch(setUser(user))}
      )
      .catch(error => {
        alert(error)
    });
  })
  .catch(error => {
  alert(error)
  })
  }}

  export const updateUserThunk = (userId, memberId) => {
    return dispatch => {
      firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .update({
        members: firebase.firestore.FieldValue.arrayUnion(memberId)
      })
      dispatch(updateUser(memberId))
      // .catch(error => {
      //   alert(error)
      // })
    }}

// initial state
const initialState = {}

// reducer
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return action.user
    case UPDATE_USER:
      return {...state, members : [...state.members, action.memberId]}
    default:
      return state
  }
}

const store = createStore(userReducer, applyMiddleware(thunkMiddleware))

export { store };
