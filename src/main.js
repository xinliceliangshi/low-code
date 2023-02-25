import  { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import VideoPlayer from 'vue-video-player'
import router from '../src/router/index.ts';
import store from './store'
require('vue-video-player/node_modules/video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
require('video.js/dist/video-js.css');
require('vue-video-player/src/custom-theme.css');

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import Vuex from "vuex";

const app = createApp(App)

     //关键代码

app.use(VideoPlayer)
app.use(router)
app.use(store)
app.use(Vuex)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(ElementPlus)

app.mount('#app')