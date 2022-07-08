import React, {useState} from 'react'
import {Toaster} from "react-hot-toast";
import Login from "./components/Login/Login";
import Chat from "./components/Chat/Chat";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "./firebase";

const App = () => {
    const [user, setUser] = useState(null);

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
            {user ? <Chat user={user}/> : <Login/>}
        </React.Fragment>
    );
}

export default App;
