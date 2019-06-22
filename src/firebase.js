import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCGPABPUB5QH81BchWuPu0Odo1qtcrwXFk',
  authDomain: 'therhymingreasons.firebaseapp.com',
  databaseURL: 'https://therhymingreasons.firebaseio.com',
  projectId: 'therhymingreasons',
  storageBucket: '',
  messagingSenderId: '966960618264',
  appId: '1:966960618264:web:ea8445cb8e584285'
}
firebase.initializeApp(firebaseConfig)
