import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import dayjs from "dayjs";
import {doc, deleteDoc} from 'firebase/firestore'
import {toast} from "react-hot-toast";
import {useTranslation} from "react-i18next";
import {db} from "../../firebase";
import relativeTime from 'dayjs/plugin/relativeTime'
import EditMessage from "./EditMessage";
import {startReplying} from "../../redux/reducers/replyReducer";

dayjs.extend(relativeTime);

const Message = ({message}) => {
    const dispatch = useDispatch();
    const {i18n, t} = useTranslation();
    dayjs.locale(i18n.language);
    const [isEditing, setIsEditing] = useState(false);
    const {user} = useSelector(state => state.user);

    const deleteMessage = async (id) => {
        const messageDoc = doc(db, "messages", id);
        await deleteDoc(messageDoc)
            .then(() => {
                toast.success(t('MESSAGE_DELETED'))
            })
            .catch(error => {
                toast.error(error.message)
            })
    }

    const handleUpdate = () => {
        setIsEditing(true)
    }

    const handleReply = () => {
        dispatch(startReplying({
            text: message.text,
            id: message.id,
            user: {
                photoURL: message.user.photoURL,
                displayName: message.user.displayName
            }
        }))
    }

    return (
        <div className="px-4 py-4 hover:bg-secondaryColor transition-colors flex items-start relative"
             onDoubleClick={handleReply}>
            <div className="absolute top-2 right-8">
                <span className="dropdown group" tabIndex={0}>
                                    <button className="dropdown-button">
                                        <i className="fa-solid fa-ellipsis text-gray-400"/>
                                    </button>
                                    <div className="dropdown-content shadow-lg top-[50%] right-0 !z-50">
                                        <p className="text-white hover:text-gray-300 transition-colors flex gap-2 items-center"
                                           onClick={handleReply}>
                                            <i className="fa-solid fa-reply"/>
                                            {t('REPLY')}
                                        </p>
                                        {
                                            user.uid === message.user.uid &&
                                            <>
                                                <div className="w-full h-[1px] bg-gray-700"/>
                                                <p className="text-white hover:text-gray-300 transition-colors flex gap-2 items-center"
                                                   onClick={handleUpdate}>
                                                    <i className="fa-solid fa-pen-to-square"/>
                                                    {t('EDIT')}
                                                </p>
                                                <div className="w-full h-[1px] bg-gray-700"/>
                                                <p className="transition-colors text-red-500 hover:text-red-600 flex gap-2 items-center"
                                                   onClick={() => deleteMessage(message.id)}>
                                                    <i className="fa-solid fa-trash"/>
                                                    {t('DELETE')}
                                                </p>
                                            </>
                                        }
                                    </div>
                                </span>
            </div>

            <div className="flex flex-col">

                {message.isReplied &&
                    <div className="messageReply">
                        <div className="w-4 h-4 rounded-full overflow-hidden">
                            <img src={message.replyMetadata.user.photoURL} alt="reply avatar"/>
                        </div>
                        <div className="font-semibold text-gray-500 text-sm">
                            {message.replyMetadata.user.displayName}
                        </div>
                        <div className="text-xs text-gray-400">
                            {message.replyMetadata.text.length >= 30 ? message.replyMetadata.text.substr(0, 30) + '...' : message.replyMetadata.text}
                        </div>
                    </div>
                }

                <div className="flex">
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
                            ) : <p className="mr-2 text-gray-300">{t('ANONYMOUS')}</p>}
                            <span className="text-gray-500 text-xs">
                        {dayjs(message?.createdAt?.seconds * 1000).fromNow()}
                    </span>
                        </div>

                        <div className="w-full">
                            <p className="text-gray-400 break-words">{message?.text}</p>
                        </div>

                        <EditMessage message={message} open={isEditing} closeModal={() => setIsEditing(false)}/>

                        {message.isEdited ?
                            <p className="text-gray-500 text-[10px]">({t('EDITED_MESSAGE', {time: dayjs(message?.editMetadata?.timestamp.seconds * 1000).fromNow()})})</p> : null}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Message;
