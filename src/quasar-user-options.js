
import './styles/quasar.scss'
import lang from 'quasar/lang/pt-BR.js'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/mdi-v4/mdi-v4.css'
import '@quasar/extras/eva-icons/eva-icons.css'
import { AddressbarColor, Notify, Loading } from 'quasar'

// To be used on app.use(Quasar, { ... })
export default {
  config: {},
  plugins: [
    AddressbarColor, Notify, Loading
  ],
  lang: lang
}