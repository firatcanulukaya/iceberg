import {initializeApp,} from 'firebase/app';
import {getAnalytics} from "firebase/analytics";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signOut,
    FacebookAuthProvider,
    GithubAuthProvider
} from "firebase/auth";
import {addDoc, collection, getDocs, getFirestore, onSnapshot, orderBy, query} from "firebase/firestore";
import {toast} from "react-hot-toast";
import Cookies from "js-cookie";
import i18n from '../localization/config';
import {store} from "../redux/store";
import {setMessages} from "../redux/reducers/messagesReducer";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
export const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const githubProvider = new GithubAuthProvider();
const messagesRef = collection(db, "messages");

onSnapshot(query(messagesRef, orderBy('createdAt', 'asc')), async (snapshot) => {
    await store.dispatch(setMessages(snapshot.docs.map(doc => ({...doc.data(), id: doc.id}))));
    document.getElementById('messagesUl').scrollTo(0, document.getElementById('messagesUl').scrollHeight)
});

export const getMessages = async () => {
    const data = await getDocs(query(messagesRef, orderBy("createdAt", "asc")));
    await store.dispatch(setMessages(data.docs.map(doc => ({...doc.data(), id: doc.id}))))
    document.getElementById('messagesUl').scrollTo(0, document.getElementById('messagesUl').scrollHeight)
}

export const signInGoogle = async () => {
    await signInWithPopup(auth, googleProvider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            toast.success(i18n.t('LOGIN_SUCESS'));
            Cookies.set('_USER_TOKEN_', token)
        })
        .catch((error) => {
            toast.error(`${error.code}: ${error.message}`)
        });
}

export const signInFacebook = async () => {
    await signInWithPopup(auth, facebookProvider)
        .then((result) => {
            const credential = FacebookAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            toast.success(i18n.t('LOGIN_SUCESS'));
            Cookies.set('_USER_TOKEN_', token)
        })
        .catch((error) => {
            toast.error(`${error.code}: ${error.message}`)
        });
}

export const signInGithub = async () => {
    await signInWithPopup(auth, githubProvider)
        .then((result) => {
            const credential = GithubAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            toast.success(i18n.t('LOGIN_SUCESS'));
            Cookies.set('_USER_TOKEN_', token)
        })
        .catch((error) => {
            toast.error(`${error.code}: ${error.message}`)
        });
}

export const logout = () => {
    signOut(auth).then(() => {
        toast.success(i18n.t('LOGOUT_SUCESS'))
        Cookies.remove('_USER_TOKEN_', {path: ''})
    }).catch((error) => {
        toast.error(error)
    });
}

export const addMessage = async (message, user, isReplying, reply) => {
    await addDoc(messagesRef, {
        text: message,
        createdAt: new Date(),
        user: {
            displayName: user.displayName,
            photoURL: user.photoURL,
            uid: user.uid,
            emailVerified: user.emailVerified
        },
        isEdited: false,
        editMetadata: {},
        isReplied: isReplying,
        replyMetadata: {
            ...reply
        },
    })
}
