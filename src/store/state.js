import { playMode } from 'common/js/config'
import {loadSearch,loadFavorite} from "common/js/cache";

const state = {
    singer: {},
    playing: false,
    fullScreen: false,
    playlist: [],
    sequenceList: [],
    mode: playMode.sequence, //播放模式
    currentIndex: -1,
    disc: {},
    topList: {},
    index: {},
    searchsongs:[],
  //本地存储数据
    searchHistory:loadSearch(),
    favoriteList:loadFavorite()
}

export default state