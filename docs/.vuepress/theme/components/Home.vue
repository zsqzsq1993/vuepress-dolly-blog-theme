<template>
  <div>
    <MyHeader
            @close-sidebar="$emit('close-sidebar')"/>
    <div class="home">
        <el-row>
          <el-col :xl="16" :lg="16" :md="16" :sm="24" :xs="24">
            <div class="blogs-list">
              <div class="blog"
                  v-for="blog in currentBlogsList"
                  :key="blog.id">
                <BlogCard :meta="blog" />
              </div>
            </div>
          </el-col>
          <el-col :xl="8" :lg="8" :md="8" :sm="24" :xs="24" class="test">
            <div class="side-bar">
              <div class="personal-info-wrapper">
                <div class="avatar-wrapper">
                  <img class="avatar"
                       :src="$withBase('/images/avatar.jpg')"
                       alt="My Avatar"
                       width="120"
                       height="120">
                </div>
                <div class="name-wrapper">Dolly Zhang</div>
                <div class="numbers-wrapper">
                  <div class="numbers">
                    <div class="title">Articles</div>
                    <div class="text">{{blogsList.length}}</div>
                  </div>
                  <div class="numbers">
                    <div class="title">Tags</div>
                    <div class="text">{{Object.getOwnPropertyNames(tagsList).length}}</div>
                  </div>
                </div>
                <div class="contacts-wrapper">
                  <span class="icon-wrapper"><i class="iconfont icon-github"/></span>
                  <span class="icon-wrapper"><i class="iconfont icon-weibo"/></span>
                  <span class="icon-wrapper"><i class="iconfont icon-zhihu"/></span>
                  <span class="icon-wrapper"><i class="iconfont icon-email"/></span>
                </div>
              </div>
              <div class="tags-wrapper">
                <TagsList :tags="tagsList"
                          @choose-tag="handleTagChosen($event)"/>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="pagination-wrapper">
              <el-pagination
                      @current-change="handleCurrentChange($event)"
                      @prev-click="handlePrevClick"
                      @next-click="handleNextClick"
                      :current-page="currentPage"
                      :page-size="pageSize"
                      layout="prev, pager, next, jumper"
                      :total="blogsList.length"
                      hide-on-single-page>
              </el-pagination>
            </div>
          </el-col>
        </el-row>
      </div>
  </div>
</template>

<script>
import NavLink from '@theme/components/NavLink.vue'
import MyHeader from './MyHeader.vue'
import BlogCard from './BlogCard'
import TagsList from './TagsList'
import LoadingPage from './LoadingPage'

const PAGE_SIZE = 6

export default {
  name: 'Home',

  components: {
    MyHeader,
    NavLink,
    BlogCard,
    TagsList,
    LoadingPage
  },

  props: {
    blogsList: {
      type: Array,
      default() {
        return []
      }
    },
    tagsList: {
      type: Object,
      default() {
        return {}
      }
    }
  },

  data() {
    return {
      pageSize: PAGE_SIZE,
      currentPage: 1,
      totalPage: Math.ceil(this.blogsList / PAGE_SIZE),
    }
  },

  methods: {
    handleCurrentChange(page){
      this.currentPage = page
      this._backTop()
    },
    handlePrevClick() {
      this.currentPage--
      this._backTop()
    },
    handleNextClick() {
      this.currentPage++
      this._backTop()
    },
    _backTop() {
      document.documentElement.scrollTop = 0
    },
    handleTagChosen(tag) {
      this.$router.push(`/tags/#${tag}`)
    }
  },

  computed: {
    currentBlogsList() {
      if (this.currentPage !== this.totalPage) {
        return this.blogsList.slice((this.currentPage-1)*PAGE_SIZE,this.currentPage*PAGE_SIZE)
      } else {
        return this.blogsList.slice((this.currentPage-1)*PAGE_SIZE)
      }
    }
  }
}
</script>

<style lang="stylus">
.home
  padding 24px
  .test
    position sticky
    top 10px
  .side-bar
    padding 14px
    box-shadow $dollyBoxShadow
    .personal-info-wrapper
      border-bottom 1px solid $dollySilver
      .avatar-wrapper
        margin 20px 0
        text-align center
        .avatar
          border-radius 50%
          box-shadow $dollyBoxShadowHover
      .name-wrapper
        text-align center
        font-size 1.8rem
        margin-bottom 14px
      .numbers-wrapper
        display flex
        margin-bottom 14px
        .numbers
          flex 1 0 auto
          text-align center
          font-size 1.2rem
          line-height 1.6
      .contacts-wrapper
        display flex
        justify-content space-around
        padding 0 15px
        margin-bottom 20px
        .iconfont
          font-size 2rem

  .pagination-wrapper
    text-align center
</style>
