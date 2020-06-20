<template>
  <div class="sticky-wrapper">
    <div
            class="theme-container"
            :class="pageClasses"
            @touchstart="onTouchStart"
            @touchend="onTouchEnd"
    >
      <Navbar
              v-if="shouldShowNavbar"
              @toggle-sidebar="toggleSidebar"
              :pageType="$page.frontmatter.home ? true : false"
              @switch-mode="switchMode"
      />

      <div
              class="sidebar-mask"
              @click="toggleSidebar(false)"
      />

      <Sidebar
              :items="sidebarItems"
              @toggle-sidebar="toggleSidebar"
      >
        <template #top>
          <slot name="sidebar-top" />
        </template>
        <template #bottom>
          <slot name="sidebar-bottom" />
        </template>
      </Sidebar>

      <Home v-if="$page.frontmatter.home"
            :blogsList="blogsList"
            :tagsList="tagsList"
            @close-sidebar="isSidebarOpen=false"/>

      <TagsPage
              v-else-if="$page.frontmatter.tagpage"
              :tagsList="tagsList"/>

      <TimeLine
              v-else-if="$page.frontmatter.timeline"
              :timelineList="timelineList" />
      <Page
              v-else
              :sidebar-items="sidebarItems"
      >
        <template #top>
          <slot name="page-top" />
        </template>
        <template #bottom>
          <slot name="page-bottom" />
        </template>
      </Page>
    </div>
    <div class="footer-wrapper">
      <MyFooter />
    </div>
  </div>
</template>

<script>
import Home from '@theme/components/Home.vue'
import Navbar from '@theme/components/Navbar.vue'
import Page from '@theme/components/Page.vue'
import Sidebar from '@theme/components/Sidebar.vue'
import TagsPage from '../components/TagsPage'
import MyFooter from '../components/Footer'
import TimeLine from '../components/TimeLine'

import { resolveSidebarItems } from '../util'

export default {
  name: 'Layout',

  components: {
    Home,
    Page,
    Sidebar,
    Navbar,
    TagsPage,
    MyFooter,
    TimeLine
  },

  data () {
    return {
      isSidebarOpen: false,
      blogsList: [],
      darkMode: false // JSON.parse(sessionStorage.getItem('mode')) || false
    }
  },

  computed: {
    shouldShowNavbar () {
      const { themeConfig } = this.$site
      const { frontmatter } = this.$page
      if (
        frontmatter.navbar === false
        || themeConfig.navbar === false) {
        return false
      }
      return (
        this.$title
        || themeConfig.logo
        || themeConfig.repo
        || themeConfig.nav
        || this.$themeLocaleConfig.nav
      )
    },

    shouldShowSidebar () {
      const { frontmatter } = this.$page
      return (
        !frontmatter.home
        && frontmatter.sidebar !== false
        && this.sidebarItems.length
      )
    },

    sidebarItems () {
      return resolveSidebarItems(
        this.$page,
        this.$page.regularPath,
        this.$site,
        this.$localePath
      )
    },

    pageClasses () {
      const userPageClass = this.$page.frontmatter.pageClass
      return [
        {
          'no-navbar': !this.shouldShowNavbar,
          'sidebar-open': this.isSidebarOpen,
          'no-sidebar': !this.shouldShowSidebar
        },
        userPageClass,
        {
          'dark': this.darkMode
        }
      ]
    },

    tagsList() {
      let list = {}
      if (!this.blogsList)
        return {}
      this.blogsList.forEach(blog => {
        const tags = blog.frontmatter.tags || []
        tags.forEach(tag => {
          if (list.hasOwnProperty(tag)) {
            list[tag].push(blog)
          } else {
            list[tag] = [blog]
          }
        })
      })
      return list
    },

    timelineList() {
      let list = {}
      if (!this.blogsList) {
        return {}
      }
      else {
        this.blogsList.forEach(blog => {
          let year = blog.date.getFullYear()
          if (list.hasOwnProperty(year)) {
            list[year].push(blog)
          } else {
            list[year] = []
            list[year].push(blog)
          }
        })
        return list
      }
    }
  },

  mounted () {
    this.darkMode = JSON.parse(sessionStorage.getItem('mode')) || false

    this.$router.afterEach(() => {
      this.isSidebarOpen = false
    })
    this.blogsList = this._getBlogsList()
  },

  methods: {
    switchMode() {
      this.darkMode = !this.darkMode
    },
    toggleSidebar (to) {
      this.isSidebarOpen = typeof to === 'boolean' ? to : !this.isSidebarOpen
      this.$emit('toggle-sidebar', this.isSidebarOpen)
    },

    // side swipe
    onTouchStart (e) {
      this.touchStart = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      }
    },

    onTouchEnd (e) {
      const dx = e.changedTouches[0].clientX - this.touchStart.x
      const dy = e.changedTouches[0].clientY - this.touchStart.y
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx > 0 && this.touchStart.x <= 80) {
          this.toggleSidebar(true)
        } else {
          this.toggleSidebar(false)
        }
      }
    },

    _getBlogsList() {
      const blogs = this.$site.pages.filter(item => {
        return item.frontmatter.type === 'blog'
      })
      return blogs.map(item => {
        let pathStrings = item.path.split('/')
        let dateStrings = pathStrings[pathStrings.length -2 ]
        let [year,month,day] = dateStrings.split('-').map(item => Number(item))
        let date = new Date(Date.parse(dateStrings)) ||
                   new Date(Date.parse([month, day, year].join('/'))) ||
                   new Date(Date.UTC(year,month-1,day))
        return {
          frontmatter: item.frontmatter,
          headers: item.headers? item.headers:[],
          key: item.key,
          title: item.title,
          path: item.path,
          date
        }
      }).sort((item1, item2) => {
        if(item1.date > item2.date) {
          return -1
        } else if (item1.date < item2.date) {
          return 1
        } else {
          return 0
        }
      })
    }
  }
}
</script>

<style lang="stylus">
  .sticky-wrapper
    display flex
    flex-direction column
    height 100vh
    .theme-container
      flex 1 0 auto
    .footer-wrapper
      flex 0 0 auto
      z-index 20
</style>
