import React, {useState} from 'react';
import dayjs from "dayjs";
import {updateDoc, doc, deleteDoc} from 'firebase/firestore'
import {db} from "../../firebase";
import {toast} from "react-hot-toast";

const Message = ({message, uid}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editMessage, setEditMessage] = useState('');

    const updateMessage = async (e, id) => {
        e.preventDefault();

        const messageDoc = doc(db, "messages", id);

        const newFields = {
            text: editMessage,
            isEdited: true,
            editMetadata: {
                timestamp: new Date()
            }
        };

        await updateDoc(messageDoc, newFields)
            .then(() => {
                toast.success("Message updated successfully.")
                setIsEditing(false)
                setEditMessage('')
            })
            .catch(error => {
                toast.error(`${error.code}: ${error.message}`)
            })
    }

    const deleteMessage = async (id) => {
        const messageDoc = doc(db, "messages", id);
        await deleteDoc(messageDoc)
            .then(() => {
                toast.success("Message deleted successfully.")
            })
            .catch(error => {
                toast.error(`${error.code}: ${error.message}`)
            })
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') setIsEditing(false)
    }

    const handleUpdate = () => {
        setIsEditing(true)
        setEditMessage(message.text)
    }

    return (
        <div className="px-4 py-4 hover:bg-secondaryColor transition-colors flex items-start relative"
             onDoubleClick={() => {
                 if (uid === message.user.uid) {
                     handleUpdate()
                 }
             }}>
            {uid === message.user.uid && <div className="absolute top-2 right-8">
                <span className="dropdown group" tabIndex={0}>
                                    <button className="dropdown-button">
                                        <i className="fa-solid fa-ellipsis text-gray-400"/>
                                    </button>
                                    <div className="dropdown-content shadow-lg top-[50%] right-0 !z-50">
                                        <p className="text-white hover:text-gray-300 transition-colors flex gap-2 items-center"
                                           onClick={handleUpdate}>
                                            <i className="fa-solid fa-pen-to-square"/>
                                            Edit
                                        </p>
                                        <div className="w-full h-[1px] bg-gray-700"/>
                                        <p className="transition-colors text-red-500 hover:text-red-600 flex gap-2 items-center"
                                           onClick={() => deleteMessage(message.id)}>
                                            <i className="fa-solid fa-trash"/>
                                            Delete
                                        </p>
                                    </div>
                                </span>
            </div>}

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
                    <span className="text-gray-500 text-xs">
                        {dayjs(message?.createdAt?.seconds * 1000).fromNow()}
                    </span>
                </div>


                <div className="w-full">
                    {isEditing ?
                        <form onSubmit={e => updateMessage(e, message.id)}
                              className="flex flex-row bg-secondaryColor text-white rounded-md px-4 py-3 z-10
                            max-w-screen-lg mx-auto shadow-md relative mb-4">
                            <input
                                type="text"
                                value={editMessage}
                                onChange={e => setEditMessage(e.target.value)}
                                placeholder="Message"
                                id={`message_${message.id}`}
                                className="flex-1 bg-transparent outline-none" onKeyDown={handleKeyDown}/>
                            <button
                                type="submit"
                                disabled={!editMessage}
                                className="font-semibold cursor-pointer text-lg text-thirdColor transition-colors disabled:text-gray-500 disabled:cursor-not-allowed">
                                <i className="fa-solid fa-paper-plane"/>
                            </button>
                        </form>
                        :
                        <p className="text-gray-400 break-words">{message.text}</p>
                    }
                </div>


                {message.isEdited ?
                    <p className="text-gray-500 text-[10px]">(edited {dayjs(message?.editMetadata?.timestamp.seconds * 1000).fromNow()})</p> : null}
            </div>
        </div>
    );
};

export default Message;
