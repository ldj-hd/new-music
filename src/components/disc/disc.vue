<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
import MusicList from "components/music-list/music-list";
import { getSongList } from "api/recommend"
import { mapGetters } from "vuex";
import { createSong } from "common/js/song";
export default {
  data() {
    return { songs: [] };
  },
  created() {
    this._getSongList()
  },
  computed: {
    ...mapGetters(["disc"]),
    title() {
      return this.disc.name
    },
    bgImage() {
      return this.disc.coverImgUrl
    }
  },
  methods: {
    _getSongList() {
        if (!this.disc.id) {
          this.$router.push('/recommend')
          return
        }
      getSongList(this.disc.id).then(res => {
        console.log(this.disc.id);
        if (res.code === 200) {
          console.log(res,111);
          this.songs = this._normalizeSongs(res.playlist.tracks);
          console.log(res.playlist.tracks)
          console.log(this.songs)
        }
      });
    },
    _normalizeSongs(list) {
      let ret = [];
      list.forEach((musicData) => {
        ret.push(createSong(musicData));
      });
      // console.log(ret)
      return ret;
    }
  },
  components: {
    MusicList
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>