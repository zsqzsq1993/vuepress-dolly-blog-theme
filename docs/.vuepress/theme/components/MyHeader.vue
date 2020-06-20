<template>
    <div>
        <LoadingPage v-show="showPageLoader" ref="loadingPage"/>
        <div class="my-header"
             ref="myHeader"
             @click="_closeSideBar">
            <ul class="carousel">
                <li v-for="(image,idx) in imageList"
                    :key="image.id"
                    class="image-wrapper">
                    <transition name="slide">
                        <img :src="image.src"
                             v-show="idx === showIndex"
                             alt="My header background"
                             ref="carouselImg">
                    </transition>
                </li>
            </ul>
            <div class="carousel-mask" ref="carouselMask"/>
            <div class="carousel-content">
                <h1>Dolly's Blog</h1>
                <h2>Happiness is real when shared</h2>
            </div>
        </div>
    </div>
</template>

<script>
    import LoadingPage from './LoadingPage'
    const CAROUSEL_IMAGES_NUM = 2

    export default {
        components: {
            LoadingPage
        },
        data() {
            return {
                counter: 0,
                images_row: [],
                imgaes_col: [],
                loader: CAROUSEL_IMAGES_NUM,
                showPageLoader: true,
                imageList: [],
            }
        },
        computed: {
            showIndex() {
                return this.counter % this.imageList.length
            }
        },

        mounted() {
            let handler = () => {
                this.loader--
                if (!this.loader) {
                    this._setHeight()
                    this._activateCarousel()
                    this._onResize()
                    this._closeLoadingPage()
                }
            }

            import('../helper/imagesLoader.js').then(imagesLoader => {
                imagesLoader = imagesLoader.default
                this._preLoadImages(imagesLoader)
            }).then(() => {
                this._mediaQuery()
            }).then(() => {
                this.$refs.carouselImg.forEach(img => {
                    img.addEventListener('load', handler, {
                        once: true
                    })
                })
            })
        },

        methods: {
            _preLoadImages(imagesLoader) {
                this.images_row = [this.$withBase('/images/header/row_1.jpg'),this.$withBase('/images/header/row_2.jpg')]
                this.imgaes_col = [this.$withBase('/images/header/col_1.jpg'),this.$withBase('/images/header/col_2.jpg')]
                for (let images of [this.images_row, this.imgaes_col]) {
                    imagesLoader(images, (bool) => {
                        if (!bool) {
                            throw new Error('Loading failed.')
                        }
                    })
                }
            },
            _activateCarousel() {
                import('../helper/animation').then(Animation => {
                    Animation = Animation.default
                    const animation = new Animation(10000)
                    animation.customerFrame((next, time) => {
                        this.counter++
                    }).repeatForever()
                    animation.start()
                })
            },
            _setHeight() {
                let images = this.$refs.carouselImg
                let react = images[this.showIndex].getBoundingClientRect()
                let height = react.bottom - react.top
                let mask = this.$refs.carouselMask
                let header = this.$refs.myHeader
                if (height) {
                    header.style.height = `${height}px`
                    mask.style.height = `${height}px`
                    images.forEach(item => {
                        item.style.height = `${height}px`
                    })
                }
            },
            _mediaQuery() {
                let result = window.matchMedia('(max-width:600px)')
                this.imageList = result.matches? this.imgaes_col
                                               : this.images_row
            },
            _onResize() {
                window.onresize = () => {
                    this._setHeight()
                    this._mediaQuery()
                }
            },
            _closeLoadingPage() {
                const timer = setTimeout(() => {
                    this.showPageLoader = false
                    this.$refs.loadingPage.clearTimer()
                    clearTimeout(timer)
                },500)
            },
            _closeSideBar() {
                this.$emit('close-sidebar')
            }
        }
    }
</script>

<style lang="stylus">
    .my-header
        position relative
        display flex
        overflow hidden
        .carousel
            margin 0
            padding 0
            line-height 0
            .image-wrapper
                position absolute
                left 0
                top 0
                margin 0
                list-style none
                line-height 0
                img
                    width: 100%
                .slide-enter
                    transform translate3d(100%, 0, 0)
                .slide-enter-to, .slide-leave
                    transform: translate3d(0, 0, 0)
                .slide-leave-to
                    transform: translate3d(-100%, 0, 0)
                .slide-enter-active, .slide-leave-active
                    transition: .8s linear
        .carousel-mask
            position absolute
            left 0
            top 0
            z-index 10
            width 100%
            background rgba(0, 0, 0, 0.4)
        .carousel-content
            z-index 20
            margin auto
            text-align center
            color #fff
            h2
                border none
</style>
