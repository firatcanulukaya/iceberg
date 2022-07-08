import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'
import Cookies from 'js-cookie'

const preferedLang = Cookies.get('__LANG')

i18n.use(initReactI18next).init({
    fallbackLng: preferedLang || 'en',
    lng: preferedLang || 'en',
    resources: {
        tr: {
            translations: require('./languages/tr.json')
        },
        en: {
            translations: require('./languages/en.json')
        }
    },
    ns: ['translations'],
    defaultNS: 'translations'
})

i18n.languages = ['tr', 'en']

export default i18n
