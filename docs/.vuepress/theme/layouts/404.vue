<template>
  <div class="theme-container">
    <div class="theme-default-content">
      <h1>404</h1>

      <blockquote>{{ getMsg() }}</blockquote>

      <RouterLink to="/">
        Take me home.
      </RouterLink>
    </div>
    <div class="log theme-default-content">
      <h3 class="text">
        Please come back after
        Dolly loses weight!!
      </h3>
      <img :src="$withBase('/images/404/logo.png')"
           alt="My logo">
      <img :src="$withBase('/images/404/logo1.png')"
           alt="My logo">
      <img :src="$withBase('/images/404/logo2.png')"
           alt="My logo">
    </div>
  </div>
</template>

<script>
const msgs = [
  `There's nothing here.`,
  `How did we get here?`,
  `That's a Four-Oh-Four.`,
  `Looks like we've got some broken links.`
]

export default {
  methods: {
    getMsg () {
      return msgs[Math.floor(Math.random() * msgs.length)]
    }
  }
}
</script>

<style lang="stylus">
  .text
    padding-top 20px !important

  .log
    padding-top 0 !important
    img
      margin 0 !important
      width 150px
      height 150px
</style>
