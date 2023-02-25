import Service from "./config";

const get = (config) => {
    return Service({
        ...config,
        method: 'get',
        params: config.data
    })
}


const post = (config) => {
    return Service({
        ...config,
        method: 'post',
        data: config.data
    })
}

export default {
    get,
    post
}