<template>
    <div>
        <el-row>
            <el-col
                    :xs="{span: 22, offset:1}"
                    :sm="{span: 22, offset:1}"
                    :md="{span: 16, offset:4}"
                    :lg="{span: 16, offset:4}"
                    :xl="{span: 16, offset:4}">
                <div class="page-tags">
                    <div class="tags-wrapper">
                    <TagsList :tags="tagsList"
                              :class-type="0"
                              @choose-tag="handleTagChose($event)"/>
                </div>
                    <ul class="all-blogs">
                    <li v-for="(blogs,tag) in tagsList"
                        :key="tag">
                        <dl class="tag-blogs">
                            <dt class="tag" :id="tag">
                                {{tag}}
                            </dt>
                            <dd v-for="blog in blogs"
                                :key="blog.id"
                                class="blog">
                                <BlogCard :meta="blog"/>
                            </dd>
                        </dl>
                    </li>
                </ul>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import TagsList from './TagsList'
    import BlogCard from './BlogCard'

    export default {
        components: {
            TagsList,
            BlogCard
        },

        props: {
            tagsList: {
                type: Object,
                default() {
                    return {}
                }
            }
        },

        methods: {
          handleTagChose(tag) {
              this.$router.replace(`./#${tag}`)
          }
        },
    }
</script>

<style lang="stylus">
    .page-tags
        margin-top $navbarHeight + 4rem
    .all-blogs
        margin 0 0 50px 0
        padding 10px
        list-style none
        .tag-blogs
            margin 25px 0
            .tag
                margin-bottom 10px
                font-size 1.75rem
                font-weight 400
                line-height 2
            .blog
                margin 0
</style>
