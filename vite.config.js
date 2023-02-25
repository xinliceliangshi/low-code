///<reference types="vitest">
import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"
import {defineConfig} from "vite";

export default defineConfig({
    test:{
        globals:true,
        environment:"jsdom",
        transformMode:{
            web:[/.jsx$/],
        },
        "include": [
            "../low-code-wy/test/test.js",

        ],
    },

    plugin:[vueJsx(),vue()],

    testMatch: [
        '**/test/*.js'
    ]

});



