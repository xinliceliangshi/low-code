// vue.config.js
const { defineConfig } = require('@vue/cli-service')
module.exports =


    {
        // transpileDependencies: true,
    configureWebpack: {
        module: {
            rules: [
                {
                    test: /\.mjs$/,
                    include: /node_modules/,
                    type: "javascript/auto"
                }
            ]
        }
    },

}

