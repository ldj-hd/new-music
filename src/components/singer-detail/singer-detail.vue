<template>
    <transition name="slide">
        <music-list :songs="songs" :title="title" :bg-image="bgImage">
        </music-list>
    </transition>
</template>
<script type="text/ecmascript-6">
    import {mapGetters} from 'vuex'
    import {getSingerDetail} from 'api/singer'
    import {ERR_OK} from 'api/config'
    import {createSong} from 'common/js/song'
    import MusicList from 'components/music-list/music-list'

    export default{
        data(){
            return {
                songs:[]
            }
        },
        computed:{
            title(){
                return this.singer.name
            },
            bgImage(){
                return this.singer.img1v1Url
            },
            //取数据,就是在getters里面拿
            ...mapGetters([
                'singer'
            ])
        },
        created(){
            this._getDetail()
            // console.log(this.singer)
        },
        methods:{
            _getDetail(){
                if(!this.singer.id){
                    this.$router.push('/singer')
                    return
                }
                //通过vuexx获取歌手的id
                getSingerDetail(this.singer.id).then((res) => {
                    if(res.code === 200){
                        console.log(res.hotSongs)
                        this.songs = this._normalizeSongs(res.hotSongs)
                        console.log(this.songs)
                    }
                })
            },
            _normalizeSongs(hotSongs){
                let ret =[]
                hotSongs.forEach((item) => {
                    //获取徐需要的内容
                    ret.push(createSong(item))
                })
                // console.log(ret)
                return ret
            }
        },
        components:{
            MusicList
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>