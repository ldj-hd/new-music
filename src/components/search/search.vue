<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box ref="searchBox" @query="onQueryChange"></search-box>
    </div>
    <div class="shortcut-wrapper" v-show="!query" ref="shortcutWrapper">
      <div class="shortcut">
        <div class="hot-key">
          <h1 class="title">热门搜索</h1>
          <ul>
            <li class="item" v-for="item in hotKey" v-on:click="addQuery(item.searchWord)" @click="addQuery(item.searchWord)">
              <span>{{item.searchWord}}</span>
            </li>
          </ul>
        </div>
        <div class="search-history" v-show="searchHistory.length">
          <h1 class="title">
            <span class="text">搜索历史</span>
            <span class="clear" @click="showConfirm">
              <i class="icon-clear"></i>
            </span>
          </h1>
<!--          搜索的历史组件-->
<!--搜索的历史组件-->
          <search-list :searches="searchHistory" @delete="deleteSong"></search-list>
        </div>
      </div>
    </div>
    <div class="search-result" v-show="query" ref="searchResult">
      <suggest :query="query" @select="saveSearch"></suggest>
    </div>
    <confirm ref="confirm"  text="是否清空所有搜索历史" confirmBtnText="清空" @confirm="clearSearchHistory"></confirm>
  </div>
</template>

<script type="text/ecmascript-6">
  import SearchBox from 'base/search-box/search-box'
  import Suggest from 'components/suggest/suggest'
  import SearchList from  'base/search-list/search-list'
  import {mapActions,mapGetters} from 'vuex'
  import {getHotKey} from "api/search";
  import {playlistMixin} from "common/js/mixin";
  import Confirm from 'base/confirm/confirm'

  export default {
    mixins:[playlistMixin],
    data(){
      return{
        hotKey:[],
        query:''
      }
    },
    computed:{
      ...mapGetters([
          'searchHistory'
      ])
    },
    created() {
      this._getHotKey()
    },
    methods:{
      handlePlaylist(playlist){
        const bottom = playlist.length > 0 ? '60px' : '';
        this.$refs.shortcutWrapper.style.bottom = bottom;
        this.$refs.searchResult.style.bottom = bottom
      },
      _getHotKey(){
        getHotKey().then((res) => {
          if(res.code === 200){
            this.hotKey = res.data.slice(0,10)
          }
        })
      },
      //删除搜索历史的记录
      deleteSong(item){
        // console.log(item);
        this.deleteSearchHistory(item)
      },
      //选中全部删除历史的提醒按钮
      showConfirm(){
        this.$refs.confirm.show()
      },
      addQuery(query){
        this.$refs.searchBox.setQuery(query)
      },
      onQueryChange(query){
        this.query = query
      },
      saveSearch(){
        this.saveSearchHistory(this.query)
      },
      ...mapActions([
          'saveSearchHistory',
          'deleteSearchHistory',
          'clearSearchHistory'
      ])
    },
    components:{
      SearchBox,
      Suggest,
      SearchList,
      Confirm
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  * { touch-action: none; } 
  .search
    .search-box-wrapper
      margin: 20px
    .shortcut-wrapper
      position: fixed
      top: 178px
      bottom: 0
      width: 100%
      .shortcut
        height: 100%
        overflow: hidden
        .hot-key
          margin: 0 20px 20px 20px
          .title
            margin-bottom: 20px
            font-size: $font-size-medium
            color: $color-text-l
          .item
            display: inline-block
            padding: 5px 10px
            margin: 0 20px 10px 0
            border-radius: 6px
            background: $color-highlight-background
            font-size: $font-size-medium
            color: $color-text-d
        .search-history
          position: relative
          margin: 0 20px
          .title
            display: flex
            align-items: center
            height: 40px
            font-size: $font-size-medium
            color: $color-text-l
            .text
              flex: 1
            .clear
              extend-click()
              .icon-clear
                font-size: $font-size-medium
                color: $color-text-d
    .search-result
      position: fixed
      width: 100%
      top: 178px
      bottom: 0
</style>