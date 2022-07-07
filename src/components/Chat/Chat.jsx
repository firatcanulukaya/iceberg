import React, {useEffect, useRef, useState} from 'react';
import Message from "../Message/Message";
import {db, logout} from "../../firebase";
import {collection, getDocs, onSnapshot, addDoc} from "firebase/firestore";


const Chat = ({user}) => {
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const messagesRef = collection(db, "messages");
    let bottomListRef = document.getElementById('messagesUl')

    const handleOnChange = e => {
        setNewMessage(e.target.value);
    };

    const handleOnSubmit = async e => {
        e.preventDefault();
        setNewMessage('')
        await addDoc(messagesRef, {
            text: newMessage,
            createdAt: new Date(),
            displayName: user.displayName,
            photoURL: user.photoURL
        })
        bottomListRef.scrollTo(0, bottomListRef.scrollHeight)
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await getDocs(messagesRef);
            await setMessages(data.docs.map(doc => ({...doc.data(), id: doc.id})))
            bottomListRef = document.getElementById('messagesUl')
            bottomListRef.scrollTo(0, bottomListRef.scrollHeight)
        }
        fetchData()
    }, [])

    useEffect(() => {
        return onSnapshot(collection(db, "messages"), (snapshot) => {
            setMessages(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
            bottomListRef.scrollTo(0, bottomListRef.scrollHeight)
        });
    }, [])

    return (
        <div className="w-full lg:w-1/2 border-l-2 border-r-2 border-solid border-secondaryColor h-[100vh] mx-auto">
            <div className="flex flex-col h-full">
                <div className="overflow-auto h-full" id="messagesUl">
                    <div className="py-4 max-w-screen-lg mx-auto">
                        <div className="border-b dark:border-gray-600 border-gray-200 py-8 mb-4">
                            <div className="font-bold text-3xl text-center">
                                <p className="mb-1 text-gray-300">Welcome to</p>
                                <p className="mb-3 text-gray-300">Iceberg</p>
                            </div>
                            <p className="text-gray-500 text-center">
                                This is the beginning of this chat.
                            </p>
                            <div className="text-center mt-2">
                                <button
                                    className="bg-red-300 rounded-xl px-5 transition-colors hover:bg-red-400 text-red-700 hover:text-red-800"
                                    onClick={logout}>Logout
                                </button>
                            </div>
                        </div>
                        <ul>
                            {messages
                                ?.sort((first, second) =>
                                    first?.createdAt?.seconds <= second?.createdAt?.seconds ? -1 : 1
                                )
                                ?.map(message => (
                                    <li key={message.id}>
                                        <Message {...message} />
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
                <div className="mb-6 mx-4">
                    <form onSubmit={handleOnSubmit}
                          className="flex flex-row bg-secondaryColor text-white rounded-md px-4 py-3 z-10 max-w-screen-lg mx-auto shadow-md">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={handleOnChange}
                            placeholder="Type your message here..."
                            className="flex-1 bg-transparent outline-none"/>
                        <button
                            type="submit"
                            disabled={!newMessage}
                            className="uppercase font-semibold cursor-pointer text-sm tracking-wider text-gray-500 hover:text-white transition-colors disabled:text-gray-500 disabled:cursor-not-allowed">
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Chat;
