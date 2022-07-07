import React from 'react';
import moment from "moment";

const Message = ({createdAt, text, displayName, photoURL}) => {

    return (
        <div className="px-4 py-4 hover:bg-secondaryColor transition-colors overflow-hidden flex items-start">

            <div className="mr-8 w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                {photoURL ? (
                    <img
                        src={photoURL}
                        alt="Avatar"
                        className="object-cover w-full h-full"
                    />
                ) : null}
            </div>

            <div className="flex flex-col">
                <div className="flex items-center mb-1">
                    {displayName ? (
                        <p className="mr-2 text-gray-300">{displayName}</p>
                    ) : null}

                    {
                        createdAt.seconds ? (
                            <span className="text-gray-500 text-xs">{moment(createdAt?.seconds * 1000).fromNow()}</span>
                        ) : null
                    }
                </div>
                <div className="w-full"><p className="text-gray-400 break-words">{text}</p></div>
            </div>
        </div>
    );
};

export default Message;
