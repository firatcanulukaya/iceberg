import React, {useState} from "react";
import {useTranslation} from 'react-i18next'
import Cookies from "js-cookie";
import {toast} from "react-hot-toast";

const LangsDropdown = () => {
    const {i18n, t} = useTranslation();
    const [langs] = useState(i18n.languages);

    const handleChangeLang = lang => {
        i18n.changeLanguage(lang)
            .then(() => {
                toast.success(t('LANGUAGE_CHANGED', {lang: lang}))
            })
            .catch(error => {
                toast.error(error)
            })
        Cookies.set('__LANG', lang)
    }

    return (
        <span className="dropdown group bg-secondaryColor rounded-full px-3 py-1" tabIndex={0}>
            <button className="dropdown-button">
                <p className="text-gray-400">{i18n.language.toUpperCase()}</p>
                        <i className="dropdown-icon ml-2 h-5 w-5 fa-solid fa-caret-down text-gray-400"/>
            </button>
            <div className="dropdown-content shadow-lg bottom-[180%] md:left-0 right-0">
                {langs.map((lang, index) => (
                    <button
                        className={`text-left !text-sm !px-3 !w-full text-gray-300 ${i18n.language === lang ? `!text-thirdColor` : null}`}
                        key={index}
                        onClick={() => handleChangeLang(lang)}>
                        {lang.toUpperCase()}
                    </button>
                ))}
            </div>
        </span>
    )
}

export default LangsDropdown
