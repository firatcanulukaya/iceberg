import React, {useState} from "react";
import UserDropdown from "../Dropdowns/UserDropdown";
import LangsDropdown from "../Dropdowns/LangsDropdown";
import {stopReplying} from "../../redux/reducers/replyReducer";
import {addMessage} from "../../firebase";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

const ChatBottom = () => {
    const dispatch = useDispatch();
    const {t} = useTranslation();

    const {user} = useSelector(state => state.user);
    const [newMessage, setNewMessage] = useState('');
    const {isReplying, reply} = useSelector(state => state.reply)
    const handleOnSubmit = async e => {
        e.preventDefault();
        setNewMessage('')
        if (isReplying) dispatch(stopReplying())
        await addMessage(newMessage, user, isReplying, reply)
        document.getElementById('messagesUl').scrollTo(0, document.getElementById('messagesUl').scrollHeight)
    };
    const handleKeyDown = (e) => {
        if (e.key === 'Escape') dispatch(stopReplying())
    }

    return (
        <div className="mb-6 mx-4 flex items-center gap-4 flex-col-reverse md:flex-row relative">
            <div className="flex justify-evenly items-center w-full md:w-1/2">
                <UserDropdown user={user}/>
                <LangsDropdown/>
            </div>

            <div className={`reply ${isReplying && 'active'}`}>
                <div className="flex items-center justify-between gap-1">
                    <div className="flex items-center gap-1">
                        <img src={reply?.user.photoURL} className="w-6 h-6 rounded-full" alt=""/>
                        <p className="text-primaryColorAlt text-xs">{t('REPLYING_TO', {name: reply?.user.displayName})}</p>
                    </div>
                    <div className="cursor-pointer" onClick={() => dispatch(stopReplying())}>
                        <i className="fa-solid fa-circle-xmark text-primaryColor opacity-80 hover:opacity-100 transition-opacity"/>
                    </div>
                </div>
            </div>

            <form onSubmit={handleOnSubmit}
                  id="messageForm"
                  className="flex flex-row w-full bg-secondaryColor text-white rounded-md px-4 py-3 z-10 max-w-screen-lg mx-auto shadow-md">
                <input
                    type="text"
                    id="messageInput"
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                    placeholder={t('TYPE_YOUR_MESSAGE')}
                    className="flex-1 bg-transparent outline-none" onKeyDown={handleKeyDown}/>
                <button
                    type="submit"
                    disabled={!newMessage}
                    className="font-semibold cursor-pointer text-lg text-thirdColor transition-colors disabled:text-gray-500 disabled:cursor-not-allowed">
                    <i className="fa-solid fa-paper-plane"/>
                </button>
            </form>
        </div>
    )
}

export default ChatBottom;
