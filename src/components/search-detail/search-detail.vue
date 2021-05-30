<template>
    <transition name="slide">
        <music-list :songs="songs" :title="title" :bg-image="bgImage">
        </music-list>
    </transition>
</template>
<script>
import MusicList from 'components/music-list/music-list'
import {createSong} from 'common/js/song'
import {mapGetters} from 'vuex'
export default {
  components: {
    MusicList
  },
  data () {
    return {

    };
  },
  computed: {
    ...mapGetters([
      'searchsongs'
    ])
  },
  methods: {

  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>