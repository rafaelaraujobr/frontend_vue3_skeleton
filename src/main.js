import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
import globalMixin from './mixins/globalMixin'
import QCalendar from '@quasar/quasar-ui-qcalendar'
import '@quasar/quasar-ui-qcalendar/dist/index.css'

createApp(App).use(Quasar, quasarUserOptions).use(store).use(QCalendar).use(router).mixin(globalMixin).mount('#app')
