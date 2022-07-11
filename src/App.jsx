import React from 'react'
import {Toaster} from "react-hot-toast";
import Login from "./components/Login/Login";
import Chat from "./components/Chat/Chat";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "./firebase";
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "./redux/reducers/userReducer";

const App = () => {
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.user);

    onAuthStateChanged(auth, (user) => {
        if (user) {
            dispatch(setUser(user));
        } else {
            dispatch(setUser(null));
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
