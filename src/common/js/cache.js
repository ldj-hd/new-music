//操作缓存的问题
import storage from 'good-storage'

const SEARCH_KEY = '__search__'
const SEARCH_MAX_LENGTH = 15

const FAVORITE_KEY = '__favorite__'
const FAVORITE_MAX_LENGTH = 200

//arr原数组，val值，compare比较函数，maxLen数组长度
function insertArray(arr,val,compare,maxLen) {
  const index = arr.findIndex(compare)
  if(index === 0){
    return
  }
  if(index > 0){
    arr.splice(index,1)
  }
  arr.unshift(val)
  if(maxLen && arr.length > maxLen){
    arr.pop()
  }
}
//删除一个数组的操作
function deleteFromArray(arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

export function saveSearch(query){
  let searches = storage.get(SEARCH_KEY,[])
  insertArray(searches,query,(item) => {
    return item === query
  },SEARCH_MAX_LENGTH)
  //先保存
  storage.set(SEARCH_KEY,searches)
  return searches
}


//删除其中一条搜索记录
export function deleteSong(query) {
  let searches = storage.get(SEARCH_KEY,[])
  searches =  searches.filter(function (item) {
    return item !== query
  })
  storage.set(SEARCH_KEY,searches)
  return searches
}
//删除全部
export  function deleteAll() {
  let searches = storage.get(SEARCH_KEY,[]);
  searches = [];
  storage.set(SEARCH_KEY,searches)
  return searches
}


//重本地缓存读取seardhList
export function loadSearch() {
  return storage.get(SEARCH_KEY,[])
}

//增加收藏操作
export function saveFavorite(song){
  let songs = storage.get(FAVORITE_KEY,[]);
  insertArray(songs,song,(item) => {
    return song.is === item.id
  },FAVORITE_MAX_LENGTH)
  storage.set(FAVORITE_KEY,songs)
  return songs
}
//删除收藏操作
export function deleteFavorite(song) {
  let songs = storage.get(FAVORITE_KEY,[])
  deleteFromArray(songs,(item) => {
    return song.id === item.id
  })
  storage.set(FAVORITE_KEY,songs)
  return songs
}

//获取初始值的时候加载
export function loadFavorite() {
  return storage.get(FAVORITE_KEY,[])
}

