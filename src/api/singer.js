import jsonp from 'common/js/jsonp'
import { commonParams, options } from 'api/config'
import axios from 'axios'

export function getSingerList() {
    const url = 'api//toplist/artist'
    return axios.get(url).then((res) => {
        return Promise.resolve(res.data)
    })
}
export function getSingerDetail(singerid) {
    const url = 'api/artists'
    const data = { id: singerid }
    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}