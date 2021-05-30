import axios from 'axios'

// export function getTopList() {
//     const url = 'api/topList/detail'
//     const data = {
//         pageSize: 100,
//         page: 0,
//     }
//     return axios.get(url, { params: data }).then(res => {
//         return Promise.resolve(res.data)
//     })
// }

export function getTopList(index) {
    const url = `api/top/list?idx=${index}`
    const data = {
        index: index,
        pageSize: 100,
        page: 0,
    }
    return axios.get(url, { params: data }).then(res => {
        return Promise.resolve(res.data)
    })
}
export function bd(){
    const url = `api/toplist`
    return axios.get(url).then((res) => {
        return Promise.resolve(res.data)
    })
}

export function getMusicList(index) {
    const url = `api/top/list?idx=${index}`
    const data = {
        index: index,
        pageSize: 100,
        page: 0,
    }
    return axios.get(url, { params: data }).then(res => {
        return Promise.resolve(res.data)
    })
}