// createWebHashHistory 是hash模式就是访问链接带有#
// createWebHistory  是history模式
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

// 引入文件，动态路由

const Login2= () => import("../view/login2.vue");
const myEditor=() =>import("../view/editor.vue");
const editorOption =() =>import("../components/editor-operator.jsx");


const routes = [

    {
        path: "/editor",
        name: "editor",
        component: myEditor,

    },
    {
        path: "/editor/editorOption ",
        name: "editorOption ",
        component: editorOption ,

    },
    {
        path: "/",
        name: "Login2",
        component: Login2,
    },

];

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router