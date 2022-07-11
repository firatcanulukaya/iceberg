import React, {useEffect} from 'react';
import Message from "../Message/Message";
import {getMessages} from "../../firebase";
import {useTranslation} from "react-i18next";
import Spinner from "../Loading/Spinner";
import Iceberg from "../../assets/img/logo.png"
import {useSelector} from "react-redux";
import ChatBottom from "./ChatBottom";

const Chat = () => {
    const {t} = useTranslation();
    const {messages, loading} = useSelector(state => state.messages);

    useEffect(() => {
        getMessages();
    }, [])

    useEffect(() => {
        if (messages.length > 0) document.getElementById('messagesUl').scrollTo(0, document.getElementById('messagesUl').scrollHeight)
    }, [messages])


    if (loading) return <div className="flex justify-center items-center h-[100vh] w-full"><Spinner/></div>
    return (
        <div className="w-full lg:w-1/2 border-l-2 border-r-2 border-solid border-secondaryColor h-[100vh] mx-auto">
            <div className="flex flex-col h-full">
                <div className="overflow-auto h-full" id="messagesUl">
                    <div className="py-4 max-w-screen-lg mx-auto">
                        <div
                            className="border-b dark:border-gray-600 border-gray-200 py-8 mb-4 flex flex-col justify-center">
                            <div className="font-bold text-3xl text-center">

                                <p className="mb-1 text-gray-300 font-thin">Welcome to</p>
                                <span className="flex justify-center gap-2">
                                    <img src={Iceberg} alt="Iceberg Logo" className="w-8 h-8"/>
                                    <p className="mb-3 text-gray-300 font-bold">Iceberg</p>
                                </span>
                            </div>
                            <p className="text-gray-500 text-center">
                                {t('BEGGING_OF_THE_CHAT')}
                            </p>
                        </div>
                        <ul>
                            {
                                messages?.map(message => (
                                    <li key={message.id}>
                                        <Message message={message}/>
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
                <ChatBottom/>
            </div>
        </div>
    );
};

export default Chat;
