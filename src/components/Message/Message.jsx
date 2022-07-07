import React from 'react';
import moment from "moment";

const Message = ({message}) => {

    return (
        <div className="px-4 py-4 hover:bg-secondaryColor transition-colors overflow-hidden flex items-start">

            <div className="mr-8 w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                <img
                    src={message?.user?.photoURL || "https://sade.network/assets/img/user.png"}
                    alt="Avatar"
                    className="object-cover w-full h-full"
                />
            </div>

            <div className="flex flex-col">
                <div className="flex items-center mb-1">
                    {message?.user?.displayName ? (
                        <>
                            <p className="mr-2 text-gray-300">{message?.user?.displayName}</p>
                            <p className="mr-2 text-gray-400">{message?.user?.emailVerified ?
                                <i className="fa-solid fa-check"/> : null}</p>
                        </>
                    ) : <p className="mr-2 text-gray-300">Anonymous</p>}

                    <span className="text-gray-500 text-xs">{moment(message?.createdAt?.seconds * 1000).fromNow()}</span>
                </div>
                <div className="w-full"><p className="text-gray-400 break-words">{message.text}</p></div>
            </div>
        </div>
    );
};

export default Message;
