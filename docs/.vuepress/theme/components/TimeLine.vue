<template>
    <div class="timeline-wrapper">
        <el-row>
            <el-col
                    :xs="{span: 22, offset:1}"
                    :sm="{span: 22, offset:1}"
                    :md="{span: 16, offset:4}"
                    :lg="{span: 16, offset:4}"
                    :xl="{span: 16, offset:4}">
                <h1 class="title">TimeLine</h1>
                <div class="timeline-content">
                    <dl class="year-block"
                        v-for="year in yearsInOrder"
                        :key="year">
                        <dt class="year-title">{{year}}</dt>
                        <dd class="blog"v-for="blog in timelineList[year]"
                            :key="blog.id"
                            @click="urlSwitch(blog)">
                            <span class="time">{{blog.date | localDate}}</span>
                            <span class="text">{{blog.title}}</span>
                        </dd>
                    </dl>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        props: {
            timelineList: {
                type: Object,
                default() {
                    return {}
                }
            }
        },

        methods: {
            urlSwitch(blog) {
                this.$router.push(blog.path)
            }
        },

        computed: {
          yearsInOrder() {
              let list = []
              if (!this.timelineList)
                  return []
              for (let key in this.timelineList)
                  list.push(key)
              return list.sort((v1, v2) => (v2 - v1))
          }
        },

        filters: {
            localDate(value) {
                return `${value.getMonth()+1}-${value.getDate()}`
            }
        }
    }
</script>

<style lang="stylus">
    .timeline-wrapper
        margin  ($navbarHeight+4rem) 0 50px
        .title
            margin-bottom 20px
            font-size 1.8rem
        .timeline-content
            padding-left 20px
            border-left 3px solid $dollySilver
            .year-block
                margin 30px 0
                .year-title
                    position relative
                    font-size 1.4rem
                    margin-bottom 15px
                    &::before
                        content ''
                        position absolute
                        left -28px
                        top 0.6rem
                        width 10px
                        height 10px
                        border 1px solid $dollySilver
                        border-radius 50%
                        background #fff
                .blog
                    position relative
                    margin 10px 0
                    line-height 2.5rem
                    color rgba(7, 17, 27, 0.4)
                    &:hover
                        color $dollyBlackLight
                        cursor pointer
                        &::before
                            border none
                            background $dollyBlackLight
                    .time
                        margin-right 8px
                        font-size 0.8rem
                    .text
                        font-size 1.25rem
                        vertical-align center
                    &::before
                        content ''
                        position absolute
                        left -26px
                        top 1.25rem
                        width 6px
                        height 6px
                        border 1px solid $dollySilver
                        border-radius 50%
                        background #fff
</style>
