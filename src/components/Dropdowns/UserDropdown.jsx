import React from "react";
import {logout} from "../../firebase";
import {useTranslation} from "react-i18next";

const UserDropdown = ({user}) => {
    const {t} = useTranslation();

    return (
        <span className="dropdown group bg-secondaryColor rounded-full px-3 py-1" tabIndex={0}>
            <button className="dropdown-button">
                <img src={user?.photoURL} alt="User Photo"
                     className="rounded-full w-8 h-8 mr-2"/>
                        <i className="dropdown-icon ml-2 h-5 w-5 fa-solid fa-caret-down text-gray-400"/>
            </button>
            <div className="dropdown-content shadow-lg bottom-[180%] md:left-[0px] left-[25px]">
                <p onClick={logout}
                   className="transition-colors text-red-500 hover:text-red-600 flex gap-2 items-center">
                    <i className="fa-solid fa-person-running"/>
                    {t('LOGOUT')}
                </p>
            </div>
        </span>
    )
}

export default UserDropdown
