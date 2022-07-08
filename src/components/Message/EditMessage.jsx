import React, {Fragment, useEffect, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {doc, updateDoc} from "firebase/firestore";
import {db} from "../../firebase";
import {toast} from "react-hot-toast";
import {useTranslation} from "react-i18next";

const EditMessage = ({open, closeModal, message}) => {
    const {t} = useTranslation();
    const [editMessage, setEditMessage] = useState('');
    const [canSend, setCanSend] = useState(false);

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
                toast.success(t('MESSAGE_UPDATED'))
                closeModal()
                setEditMessage('')
            })
            .catch(error => {
                toast.error(`${error.code}: ${error.message}`)
            })
    }

    useEffect(() => {
        if (open) setEditMessage(message.text)
    }, [open])

    useEffect(() => {
        if (editMessage.length > 0 && editMessage !== message.text) {
            setCanSend(true)
        } else {
            setCanSend(false)
        }
    }, [editMessage])

    return (
        <Transition appear show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-black bg-opacity-25"/>
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95">
                            <Dialog.Panel
                                className="w-full max-w-md transform overflow-hidden rounded-2xl bg-primaryColor p-6 text-left align-middle shadow-xl transition-all">

                                <form onSubmit={e => updateMessage(e, message.id)}
                                      className="flex flex-row bg-secondaryColor text-white rounded-md px-4 py-3 z-10
                            max-w-screen-lg mx-auto shadow-md relative mb-4">
                                    <input
                                        type="text"
                                        value={editMessage}
                                        onChange={e => setEditMessage(e.target.value)}
                                        placeholder={t('MESSAGE')}
                                        id={`message_${message.id}`}
                                        className="flex-1 bg-transparent outline-none"/>
                                    <button
                                        type="submit"
                                        disabled={!canSend}
                                        className="font-semibold cursor-pointer text-lg text-thirdColor transition-colors disabled:text-gray-500 disabled:cursor-not-allowed">
                                        <i className="fa-solid fa-paper-plane"/>
                                    </button>
                                </form>

                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default EditMessage
