import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { ArrowLeftStartOnRectangleIcon } from '@heroicons/vue/24/outline';
import { PlusCircleIcon, PencilSquareIcon } from '@heroicons/vue/20/solid'; 
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faFacebookF, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';

library.add(faSearch, faSignOut, faFacebookF, faTwitter, faInstagram, faYoutube);

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component('font-awesome-icon', FontAwesomeIcon);
app.component('arrow-left-start-on-rectangle-icon', ArrowLeftStartOnRectangleIcon);
app.component('plus-circle-icon', PlusCircleIcon);  
app.component('pencil-square-icon', PencilSquareIcon); 

app.mount('#app')
