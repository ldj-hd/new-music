import axios from 'axios'
import { commonParams, options } from './config'
export function getHotKey() {
    const url = "api/search/hot/detail"
    const data = Object.assign({}, commonParams, {
        uin: 0,
        needNewCode: 1,
        platform: 'h5'
    })
    return axios.get(url, { params: data }).then(res => {
        return Promise.resolve(res.data)
    })
}
 // 默认显示搜索的内容
export function getSearchDef(){
    const url = "api/search/default"
    return axios.get(url).then( (res) => {
        return Promise.resolve(res.data)
    })
}
export function getSearch(keywords,limit) {
    const url = "api/search"
    const data = Object.assign({
        keywords, //关键词
        // limit,
        // type, //搜索类型
        limit, //请求数量
        // page //请求分页
    })
    return axios.get(url, { params: data }).then(res => {
        return Promise.resolve(res.data)
    })
}
// export function getSearch(keyword) {
//     const url = "api/search"
//     const data = Object.assign({
//         keyword //关键词
//     })
//     return axios.get(url, { params: data }).then(res => {
//         return Promise.resolve(res.data)
//     })
// }