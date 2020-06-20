<template>
    <div class="blog-card">
        <div class="click-wrapper"
             @click="jumpTo">
            <div class="blog-title">
                {{meta.title}}
            </div>
            <div class="blog-excerpt"
                 v-if="meta.frontmatter.excerpt">
                {{meta.frontmatter.excerpt}}
            </div>
        </div>
        <div class="blog-info">
            <div class="info blog-location">
                <i class="icon icon-user iconfont" />
                <span class="text text-location">{{meta.frontmatter.autor || 'Dolly'}} in {{meta.frontmatter.location}}</span>
            </div>
            <div class="info blog-time">
                <i class="icon icon-time iconfont" />
                <span class="text text-time">{{meta.date | dateString}}</span>
            </div>
            <div class="info blog-tags">
                <i class="icon icon-tags iconfont" />
                <span class="text text-tags" v-for="tag in meta.frontmatter.tags"
                      :key="tag">
                    {{tag}}
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            meta: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        filters: {
            dateString(value) {
                return value.toDateString()
            }
        },
        methods: {
            jumpTo() {
                this.$router.push(this.meta.path)
            }
        }
    }
</script>

<style lang="stylus">
    .blog-card
        background white
        padding 14px
        margin: 0 14px 14px 0;
        box-shadow: $dollyBoxShadow
        line-height 1.75
        &:hover
            box-shadow $dollyBoxShadowHover
        .blog-title
            font-size 1.5rem
            &:hover
                transition .5s ease
                text-decoration underline
                color $dollyGreen
                cursor pointer
        .blog-excerpt
            color $dollyBlackLight
        .blog-info
            display flex
            flex-flow row wrap
            .info
                flex 0 0 auto
                margin-right 10px
                white-space nowrap
                &.blog-time, &.blog-tags
                    color $dollyBlackLight
    @media (max-width: $MQMobile)
        .blog-card
            margin: 0 0 14px;
</style>
