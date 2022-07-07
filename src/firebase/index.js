import {initializeApp,} from 'firebase/app';
import {GoogleAuthProvider, getAuth, signInWithPopup, signOut} from "firebase/auth";
import {doc, getDoc, getFirestore, getDocs, collection} from "firebase/firestore";
import {toast} from "react-hot-toast";
import Cookies from "js-cookie";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export const signInGoogle = async () => {
    await signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            toast.success('Logged in.')
            Cookies.set('_USER_TOKEN_', token)
        })
        .catch((error) => {
            toast.error(`${error.code}: ${error.message}`)
        });

}
export const logout = () => {
    signOut(auth).then(() => {
        toast.success('Logout.')
        Cookies.remove('_USER_TOKEN_', { path: '' })
    }).catch((error) => {
        toast.error(error)
    });
}
