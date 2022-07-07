import React, {useState} from 'react'
import {Toaster} from "react-hot-toast";
import Login from "./components/Login/Login";
import Chat from "./components/Chat/Chat";
import Cookies from "js-cookie";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "./firebase";

const App = () => {
    const [user, setUser] = useState(null);
    const authToken = Cookies.get('_USER_TOKEN_')

    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUser(user)
        } else {
            setUser(null)
        }
    })

    return (
        <React.Fragment>
            <Toaster position="top-center" reverseOrder={false}/>

            {authToken ? <Chat user={user}/> : <Login/>}

        </React.Fragment>
    );
}

export default App;
