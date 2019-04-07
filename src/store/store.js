import { createStore, combineReducers, compose } from 'redux'
import firebase from 'firebase'
// import 'firebase/firestore'
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase'
import { reduxFirestore, firestoreReducer } from 'redux-firestore'
//Reducers
//@todo

const firebaseConfig = {
  apiKey: 'AIzaSyDGh4PRA0ndpInlvf9YBce2u_iNorZFJYk',
  authDomain: 'client-panel-4ea40.firebaseapp.com',
  databaseURL: 'https://client-panel-4ea40.firebaseio.com',
  projectId: 'client-panel-4ea40',
  storageBucket: 'client-panel-4ea40.appspot.com',
  messagingSenderId: '512154521180',
}

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
}

// Init firebase instance
firebase.initializeApp(firebaseConfig)

const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig),
  reduxFirestore(firebase) 
)(createStore)

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer 
})

//create initial state
const initialState = {}

//create store
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

export default store
