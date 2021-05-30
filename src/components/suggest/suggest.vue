<template>
  <scroll class="suggest" :data="result" ref="suggest" >
      <ul class="suggest-list">
        <li class="suggest-item" v-for="item in result"  @click="selectItem(item)">
          <div class="icon">
            <i :class="getIconCls(item)"></i>
          </div>
          <div class="name">
            <p class="text" v-html="getDisplayName(item)"></p>
          </div>
        </li>
<!--        <loading title="" v-show="isshow" ></loading>-->
      </ul>
    <div class="no-result-wrapper" v-show="!result.length">
      <no-result title="抱歉,暂无搜索结果"></no-result>
    </div>
  </scroll>
</template>
<script>
  import {getSearch} from "api/search";
  import Scroll from 'base/scroll/scroll';
  import Loading from 'base/loading/loading';
  import {mapActions} from 'vuex';
  import NoResult from'base/no-result/no-result'

  export default {
    data(){
      return {
        isshow:true,
        limit:50,
        result:[],
      }
    },
  props:{
    query:{
      type:String,
      default:''
    },
    //是否显示歌手
    showSinger:{
      type:Boolean,
      default: true
    }
  },
  methods:{
    search(){
      this.$refs.suggest.scrollTo(0,0)
      getSearch(this.query,this.limit).then((res) => {
        if(res.code === 200){
          this.result = res.result.songs
          this.isshow = false
          console.log(res.result);
        }
      })
    },
    getIconCls(item){
      return 'icon-music'
    },
    getDisplayName(item){
      return item.name
    },
    selectItem(item){
      console.log(item);
      this.insertSong(item);
      //派发一个事件出去
      this.$emit('select')
    },
    ...mapActions([
        'insertSong',
        'selectPlay'
    ])
  },
  watch:{
      //query改变触发调用接口
    query(){
      this.search()
    }
  },
    components:{
      Scroll,
      Loading,
      NoResult
    }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';
@import '~common/stylus/mixin';

.suggest {
  height: 100%;
  overflow: hidden;

  .suggest-list {
    padding: 0 30px;

    .hasmoresing {
      position: relative;
      padding-bottom: 20px;
      text-align: center;
      color: $color-text-d;
    }

    .suggest-item {
      display: flex;
      align-items: center;
      padding-bottom: 20px;
    }

    .icon {
      flex: 0 0 30px;
      width: 30px;

      [class^='icon-'] {
        font-size: 14px;
        color: $color-text-d;
      }
    }

    .name {
      flex: 1;
      font-size: $font-size-medium;
      color: $color-text-d;
      overflow: hidden;

      .text {
        no-wrap();
      }
    }
  }

  .no-result-wrapper {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>