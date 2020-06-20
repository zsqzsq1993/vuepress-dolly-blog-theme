<template>
    <div :class="[classType? 'tags-list-1': 'tags-list-0']">
        <div class="title">
            <i class="iconfont icon-tags" />
            <span class="text">Tags</span>
        </div>
        <ul class="tags">
            <li v-for="(blogs, tag, idx) in tags"
                :key="tag"
                @click="chooseTag(tag, blogs)"
                class="tag-wrapper"
                :class="randomList[idx]">
                <span class="text">{{tag}}</span>
                <span class="number">{{blogs.length}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: {
            tags: {
                type: Object,
                default() {
                    return {}
                }
            },
            classType: {
                type: Number,
                default: 1
            }
        },
        methods: {
            chooseTag(tag) {
                this.$emit('choose-tag',tag)
            }
        },
        computed: {
            randomList() {
                const len = Object.getOwnPropertyNames(this.tags).length
                let list = []
                if (this.classType)
                    return new Array(len).fill('')
                else {
                    for(let i=0; i<len; i++) {
                        const randSize = Math.floor(Math.random()*3) + 1
                        const randColor = Math.floor(Math.random()*5) + 1
                        list.push(`color${randColor} size${randSize}`)
                    }
                    return list
                }
            }
        }
    }
</script>

<style lang="stylus">
    @keyframes ants { to { background-position: 100% } }
    .tags-list-1
        padding 10px
        .title
            margin 10px
           font-size 1.2rem
        .tags
            margin 10px
            padding 0
            display flex
            flex-wrap wrap
            .tag-wrapper
                flex none
                padding 5px
                display inline-block
                margin 0 10px 10px 0
                list-style none
                border 1px solid transparent
                border-radius 2px
                background linear-gradient(white, white) padding-box,
                repeating-linear-gradient(-45deg, black, black 25%, white 0, white 50%) 0 / .5rem .5rem
                font-size 0.8rem
                &:hover
                    animation: ants 3s linear infinite;
                    cursor pointer
                .number
                    font-size 0.4rem
                    font-weight 700

    .tags-list-0
        padding 10px
        .title
            display none
        .tags
            padding 0
            display flex
            flex-wrap wrap
            align-items center
            .tag-wrapper
                flex none
                padding 5px 10px
                line-height 1
                display inline-block
                margin 0 10px 10px 0
                list-style none
                border-radius 5px
                color #fff
                box-shadow $dollyBoxShadowHover
                &:hover
                    cursor pointer
                    box-shadow 2px 2px 5px $dollyBlackLight
                &.color1
                    background rgb(248, 178, 106)
                &.color2
                    background rgb(103, 204, 134)
                &.color3
                    background rgb(52, 152, 219)
                &.color4
                    background rgb(132, 155, 135)
                &.color5
                    background #e15b64
                &.size1
                    font-size 1rem
                &.size2
                    font-size 1.25rem
                &.size3
                    font-weight 1.5rem
                .number
                    display none
</style>
