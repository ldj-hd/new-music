import * as types from './mutations-types'
import { playMode } from 'common/js/config'
import { shuffle } from 'common/js/util'
import {saveSearch,saveFavorite,deleteFavorite,deleteSong,deleteAll} from "common/js/cache";

function findIndex(list, song) {
    return list.findIndex((item) => {
        return item.id === song.id
    })
}


export const selectPlay = function({ commit, state }, { list, index }) {
    // commit修改状态
    commit(types.SET_SEQUENCE_LIST, list)
    if (state.mode === playMode.random) {
        let randomList = shuffle(list)
        commit(types.SET_PLAYLIST, randomList)
        index = findIndex(randomList, list[index])
    } else {
        commit(types.SET_PLAYLIST, list)
    }
    commit(types.SET_CURRENT_INDEX, index)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING_STATE, true)
}


export const randomPlay = function({ commit }, { list }) {
    commit(types.SET_PLAY_MODE, playMode.random)
    commit(types.SET_SEQUENCE_LIST, list)
    let randomList = shuffle(list)
    commit(types.SET_PLAYLIST, randomList)
    commit(types.SET_CURRENT_INDEX, 0)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING_STATE, true)
}

export const insertSong = function({commit,state},song){
    let playlist = state.playlist.slice()
    let sequenceList = state.sequenceList.slice()
    let currentIndex = state.currentIndex
    // 记录当前歌曲
    let currentSong = playlist[currentIndex]
    // 查找当前了列表中是否含有待插入的歌曲，并返回它的索引
    let fpIndex = findIndex(playlist,song)
    // 因为插曲歌曲，所以索引加一
    currentIndex++
    //插入这首歌曲到当前的索引
    playlist.splice(currentIndex,0,song)
    if(fpIndex > -1){
        if(currentIndex > fpIndex){
            playlist.splice(fpIndex,1)
            currentIndex--
        }else{
            playlist.splice(fpIndex + 1,1)
        }
    }

    let currentSIndex = findIndex(sequenceList,currentSong) + 1
    let fsIndex = findIndex(sequenceList,song)
    sequenceList.splice(currentSIndex,0,song)
    if(fsIndex > -1){
        if(currentSIndex > faIndex){
            sequenceList.splice(fsIndex,1)
        }
        else{
            sequenceList.splice(fsIndex + 1,1)
        }
    }
    commit(types.SET_PLAYLIST, playlist)
    commit(types.SET_SEQUENCE_LIST,sequenceList)
    commit(types.SET_CURRENT_INDEX, currentIndex)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING_STATE, true)
}

export const saveSearchHistory = function({commit},query){
  commit(types.SET_SEARCH_HISTORY,saveSearch(query))
}
//删除一条搜索记录
export const deleteSearchHistory= function ({commit},query) {
  commit(types.SET_SEARCH_HISTORY,deleteSong(query))
}
//删除所有记录
export const clearSearchHistory = function ({commit}) {
  commit(types.SET_SEARCH_HISTORY,deleteAll())
}

//添加收藏
export const saveFavoriteList = function ({commit},song) {
  commit(types.SET_FAVORITE_LIST,saveFavorite(song))
}
//取消收藏
export const deleteFavoriteList = function ({commit},song) {
  commit(types.SET_FAVORITE_LIST,deleteFavorite(song))
}

