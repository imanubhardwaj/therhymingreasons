import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCXf7aYrruuUM3karOJ7m6xXSyfgdiPteE',
  authDomain: 'the-rhyming-reasons.firebaseapp.com',
  databaseURL: 'https://the-rhyming-reasons.firebaseio.com',
  projectId: 'the-rhyming-reasons',
  storageBucket: '',
  messagingSenderId: '991073968221',
  appId: '1:991073968221:web:670320cc961d21df'
}
firebase.initializeApp(firebaseConfig)
