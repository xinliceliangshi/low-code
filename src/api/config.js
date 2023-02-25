import axios from 'axios'
import { ElMessage } from 'element-plus'

//创建axios实例
const Service = axios.create({
    // 设置baseURL地址
    baseURL: 'http://116.62.226.254:8889',
    //定义统一的请求头
    headers: {
        'Content-Type': "application/json;charset=UTF-8"
    },
    //配置请求超时时间
    time: 10000
})

//请求拦截器
Service.interceptors.request.use((config) => {
    //配置请求头
    config.headers.common['Authorization'] = window.sessionStorage.getItem('token') === null ? null : window.sessionStorage.getItem('token')
    return config
})

//响应拦截器
Service.interceptors.response.use((response) => {
    //获取接口返回结果
    const res = response.data
    if (res.code === 1) {
        return res
    }
    else {
        ElMessage.error(res.message)
        return res
    }
})

export default Service