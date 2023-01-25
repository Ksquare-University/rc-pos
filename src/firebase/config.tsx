import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Project's firebase
export const firebaseConfig = {
  apiKey: 'AIzaSyCj9KeY-Sc9yKem8G0szl1fh28B5FSK2Bg',
  authDomain: 'rappi-clone-itk.firebaseapp.com',
  projectId: 'rappi-clone-itk',
  storageBucket: 'rappi-clone-itk.appspot.com',
  messagingSenderId: '577258984785',
  appId: '1:577258984785:web:5a4515ef3db7ec9f346f70',
  measurementId: 'G-NX1GS5PB21',
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
