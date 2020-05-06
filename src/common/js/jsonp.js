import originJSONP from 'jsonp'

//封装jsonp
export default function jsonp(url, data, option) {
    url += (url.includes('?') == false ? '?' : '&') + parm(data)
    return new Promise((resolve, reject) => {
        originJSONP(url, option, (err, data) => {
            if (!err) {
                resolve(data)
            } else {
                reject(err)
            }
        })
    })
}

function parm(data) {
    let url = ''
    for (var k in data) {
        let value = data[k] != 'undefind' ? data[k] : ''
        url += `&${k}=${encodeURIComponent(value)}`
    }
    return url ? url.substring(1) : ''
}