<template>
  <transition name="shownav">
    <header class="navbar"
            ref="navbar"
            :class="[{transparent: navbarOnTop && pageType}]"
            v-show="showBar">
      <SidebarButton @toggle-sidebar="$emit('toggle-sidebar')" />

      <RouterLink
              :to="$localePath"
              class="home-link"
      >
        <img
                v-if="$site.themeConfig.logo"
                class="logo"
                :src="$withBase($site.themeConfig.logo)"
                :alt="$siteTitle"
        >
        <span
                v-if="$siteTitle"
                ref="siteName"
                class="site-name"
                :class="{ 'can-hide': $site.themeConfig.logo }"
        >{{ $siteTitle }}</span>
      </RouterLink>

      <div
              class="links"
              :style="linksWrapMaxWidth ? {
        'max-width': linksWrapMaxWidth + 'px'
      } : {}"
      >

        <div class="mode-switcher" @click="switchMode">
          <i class="iconfont icon-sun" v-show="darkMode"/>
          <i class="iconfont icon-Ioniconsmdmoon" v-show="!darkMode" />
        </div>

        <AlgoliaSearchBox
                v-if="isAlgoliaSearch"
                :options="algolia"
        />

        <SearchBox v-else-if="$site.themeConfig.search !== false && $page.frontmatter.search !== false" />

        <NavLinks class="can-hide" ref="navlinks"/>
      </div>
    </header>
  </transition>
</template>

<script>
import AlgoliaSearchBox from '@AlgoliaSearchBox'
import SearchBox from '@SearchBox'
import SidebarButton from '@theme/components/SidebarButton.vue'
import NavLinks from '@theme/components/NavLinks.vue'

export default {
  name: 'Navbar',

  components: {
    SidebarButton,
    NavLinks,
    SearchBox,
    AlgoliaSearchBox
  },

  props: {
    pageType: {
      type: Boolean,
      default: 0
    }
  },

  data () {
    return {
      linksWrapMaxWidth: null,
      navbarOnTop: true,
      showBar: true,
      lastScroll: 0,
      darkMode: false //JSON.parse(sessionStorage.getItem('mode')) || false
    }
  },

  computed: {
    algolia () {
      return this.$themeLocaleConfig.algolia || this.$site.themeConfig.algolia || {}
    },

    isAlgoliaSearch () {
      return this.algolia && this.algolia.apiKey && this.algolia.indexName
    }
  },

  methods: {
    _onScroll() {
      const el = document.documentElement
      let scrollTop = el.scrollTop
      this.navbarOnTop = scrollTop <= 100;
      if (scrollTop > 300)
        this.showBar = scrollTop  <= this.lastScroll
      this.lastScroll = scrollTop
    },

    switchMode() {
      this.darkMode = !this.darkMode
      this.$emit('switch-mode',this.mode)
      sessionStorage.setItem('mode', JSON.stringify(this.darkMode))
    }
  },

  mounted () {
    this.darkMode = JSON.parse(sessionStorage.getItem('mode')) || false

    const MOBILE_DESKTOP_BREAKPOINT = 719 // refer to config.styl
    const NAVBAR_VERTICAL_PADDING = parseInt(css(this.$el, 'paddingLeft')) + parseInt(css(this.$el, 'paddingRight'))
    const handleLinksWrapWidth = () => {
      if (document.documentElement.clientWidth < MOBILE_DESKTOP_BREAKPOINT) {
        this.linksWrapMaxWidth = null
      } else {
        this.linksWrapMaxWidth = this.$el.offsetWidth - NAVBAR_VERTICAL_PADDING
          - (this.$refs.siteName && this.$refs.siteName.offsetWidth || 0)
      }
    }
    handleLinksWrapWidth()
    window.addEventListener('resize', handleLinksWrapWidth, false)
    window.addEventListener('scroll', this._onScroll)
  }
}

function css (el, property) {
  // NOTE: Known bug, will return 'auto' if style value is 'auto'
  const win = el.ownerDocument.defaultView
  // null means not to return pseudo styles
  return win.getComputedStyle(el, null)[property]
}
</script>

<style lang="stylus">
$navbar-vertical-padding = 0.7rem
$navbar-horizontal-padding = 1.5rem
.shownav-enter-active, .shownav-leave-active
  transition all 1s ease
.shownav-enter, .shownav-leave-to
  transform translate3d(0, -100%, 0)
.shownav-enter-to, .shownav-leave
  transform translate3d(0, 0, 0)
.navbar
  padding $navbar-vertical-padding $navbar-horizontal-padding
  line-height $navbarHeight - 1.4rem
  transition .5s linear
  a, span, img
    display inline-block
  .logo
    height $navbarHeight - 1.4rem
    min-width $navbarHeight - 1.4rem
    margin-right 0.8rem
    vertical-align top
  .site-name
    font-size 1.3rem
    font-weight 600
    color $textColor
    position relative
    font-family: 'Liu Jian Mao Cao', cursive;
    letter-spacing 0.3rem
  .links
    padding-left 1.5rem
    box-sizing border-box
    white-space nowrap
    font-size 0.9rem
    position absolute
    right $navbar-horizontal-padding
    top $navbar-vertical-padding
    display flex
    .mode-switcher
      display inline-block
      margin-right 10px
      padding 6px 20px
      line-height 1.4
      &:hover
        cursor pointer
        border-radius 10px
        background $dollySilver
        transition all .3s linear
    .search-box
      flex: 0 0 auto
      vertical-align top

@media (min-width: $MQMobile)
  .navbar
    &.transparent
        background $navbar-transparent
        border none
        color #fff
        .site-name
          color #fff

@media (max-width: $MQMobile)
  .navbar
    padding-left 4rem
    .can-hide
      display none
    .links
      padding-left 1.5rem
    .site-name
      width calc(100vw - 9.4rem)
      overflow hidden
      white-space nowrap
      text-overflow ellipsis
</style>
