import { getLyric } from 'api/song'
import { ERR_OK } from 'api/config'
export default class Song {
    constructor({ id, singer, name, album, duration, image, url }) {
            this.id = id
                // this.mid = mid
            this.singer = singer
            this.name = name
            this.album = album
            this.duration = duration
            this.image = image
            this.url = url
                // this.ar = ar
        }
        //获取歌词
    getLyric() {
        if (this.lyric) {
            return Promise.resolve(this.lyric)
        }
        return new Promise((resovle, reject) => {
            getLyric(this.id).then(res => {
                if (res) {
                    // this.lyric = Base64.decode(res.lyric) qq的歌词接口，需要用base64解密，网易云不用
                    this.lyric = res.lrc.lyric
                    resovle(this.lyric)
                } else {
                    reject('no lyric')
                }
                // console.log(this.lyric)
            })
        })
    }
}
export function createSong(hotSongs) {
    return new Song({
        id: hotSongs.id,
        // mid: musicData.songmid,
        singer: filterSinger(hotSongs.ar),
        name: hotSongs.name,
        album: hotSongs.al.name,
        duration: hotSongs.dt,
        image: hotSongs.al.picUrl,
        // url: `https://music.163.com/#/song?id=${hotSongs.id}`,
        url: `http://music.163.com/song/media/outer/url?id=${hotSongs.id}.mp3`
    })
}

//获取歌手名字
function filterSinger(ar) {
    let ret = []
    if (!ar) {
        return ''
    }
    ar.forEach(item => {
        ret.push(item.name)
    })
    return ret.join('/')
}

export function createTopSong(musicData) {
    return new Song({
        id: musicData.privilege.id,
        singer: musicData.ar[0].name,
        name: musicData.name,
        duration: musicData.dt / 1000.847826086957,
        image: musicData.al.picUrl,
        ar: musicData.ar,
        url: `https://v1.itooi.cn/netease/url?id=${musicData.privilege.id}&quality=flac`
    })
}