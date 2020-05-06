<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from 'components/music-list/music-list'
  import { ERR_OK } from "api/config"
  import { mapGetters } from "vuex"
  import {getMusicList} from 'api/rank'
  import { createSong } from "common/js/song"

  export default {
    computed:{
    ...mapGetters(["topList"]),
    title() {
      return this.topList.name;
    },
    bgImage() {
      return this.topList.coverImgUrl;
    },
    idx(){
      return this.topList[this.topList.length - 1]
    }
  },
  created(){
      this._getMusicList()
  },
  data(){
      return {
          songs:[],
          songindex:0,
      }
  },
  methods:{
    // _getMusicList() {
    //   let arr = []
    //   for(this.songindex=0;this.songindex<34;this.songindex++){
    //     getMusicList(this.songindex).then(res => {
    //     if (res.code === 200) {
    //       arr.push(res.playlist.tracks)
    //     }
    //   })
    //   }
    //   this.songs = arr
    //   console.log(this.songs)
    // },
    _getMusicList() {
      // if (!this.topList.id) {
      //   this.$router.push({
      //     path: "/rank"
      //   });
      // }
      console.log(this.$store.state.index)
      let i = this.$store.state.index
      getMusicList(i).then(res => {
        if (res.code === 200) {
          this.songs = this._normalizeSongs(res.playlist.tracks)
        }
        console.log(this.songs)
      });
    },
      _normalizeSongs(list){
        let ret =[]
        list.forEach((item) => {
          ret.push(createSong(item))
        })
        // console.log(ret)
        return ret
    }
  },
    components: {
      MusicList
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s ease

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>