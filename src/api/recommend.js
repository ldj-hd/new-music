import jsonp from 'common/js/jsonp'
import { commonParams, options } from 'api/config'
import axios from 'axios'

//轮播接口，需要模拟webpack dev中的请求头端口
export function getRecommend() {
    const url = 'api/banner'
    return axios.get(url).then((res) => {
        return Promise.resolve(res.data)
    })
}
export function getDiscList() {
    const url = 'api/top/playlist'
    //对象的合并,第一个参数是目标对象，第二个是源对象
    const data = Object.assign({}, {
        cat: '全部',
        pageSize: 20,
        page: 0,
        format: 'json'
    })
    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })

}

export function getSongList(dissid) {
    const url = 'api/playlist/detail'
    const data = { id: dissid }
    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}
