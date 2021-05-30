<template>
  <div class="singer" ref="singer">
    <listview :data="singlist" @select="selectSinger" ref="list"></listview>
    <router-view></router-view>
  </div>
</template>
<script>
import { getSingerList } from "api/singer.js";
import { ERR_OK } from "api/config.js";
import { Singer } from "common/js/singer.js";
import Listview from "base/listview/listview.vue";
import { mapMutations } from "vuex";
import pinyin from "base/pinyin/Convert_Pinyin.js";
import {playlistMixin} from 'common/js/mixin'

const HOT_SINGER_LEN = 10;
const HOT_NAME = "热门";
export default {
  name: "Singer",
  data() {
    return {
      singlist: []
    };
  },
  created() {
    this._getSingerList();
  },
  methods: {
    handlePlaylist(playlist){
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.singer.style.bottom = bottom
        this.$refs.list.refresh()
      },
    _getSingerList() {
      getSingerList().then(res => {
        if (res.code === 200) {
          let list = res.list.artists;
          console.log(list)
          list.sort(function compareFunction(item1, item2) {
            // localeCompare() 方法来实现中文按照拼音排序
            return item1.name.localeCompare(item2.name);//英文首字母进行排序
            //正序排序
          });
          this.singlist = this._normalizeSinger(list);
          console.log(this.singlist)
        }
      });
    },
    _normalizeSinger(list) {
      let arr = [];
      let code = [];
      for (var i = 0; i < 27; i++) {
        // arr数组里面每个item存放title和以这个title开头的歌手
        arr[i] = {};
        if (i == 0) {
          arr[i].title = "热门";
          arr[i].items = [];
        } else {
          arr[i].title = String.fromCharCode(65 + i - 1);
          arr[i].items = [];
        }
      }
      list.forEach((singitem, index) => {
        //获取前十条数据
        if (index < 10) {
          arr[0].items.push(singitem);
        }
        // 此时arr的items还没有歌手，开始遍历每一个arr[],如果歌手的第一个拼音和title一样，放入对对应的arr[].items中
        arr.forEach(item => {
          if (item.title == pinyin.getFullChars(singitem.name).substr(0, 1)) {
            item.items.push(singitem);
          }
        });
      });
      // console.log(arr)
      return arr;
    },
    selectSinger(item) {
      this.$router.push({
        path:`/singer/${item.id}`
      })
      //往state里面写入数据
      this.setSinger(item)
    },
    ...mapMutations({
      //映射成一个方法名
      setSinger: "SET_SINGER"
    })
  },
  components: {
    Listview
  }
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
