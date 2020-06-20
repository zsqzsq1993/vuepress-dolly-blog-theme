<template>
    <div class="loading-page">
        <div class="loading-wrapper" ref="loading">
            Loading{{dotes[counter % 3]}}
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                timerId: null,
                dotes: ['.','..','...'],
                counter: 0
            }
        },

        mounted() {
            this.setTimer()
        },

        methods: {
            setTimer() {
                this.timerId = setInterval(() => {
                    this.counter++
                },500)
            },
            clearTimer() {
                clearTimeout(this.timerId)
            }
        }
    }
</script>

<style lang="scss">
    @keyframes spin {
        to {
            transform: rotate(1turn);
        }
    }
    @keyframes radius {
        50% {
            border-radius: 50%;
        }
    }
    @keyframes colors {
        33% {
            color: #FD7E15;
        }
        66% {
            color: deeppink;
        }
    }
    @keyframes width {
        50% {
            border-width: .3rem;
        }
    }
    .loading-page {
        z-index: 100;
        display: flex;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(7, 17, 27, 0.3);
        backdrop-filter: blur(5rem);
        .loading-wrapper {
            margin: auto;
            padding: 1rem;
            width: 10rem;
            box-sizing: border-box;
            font-size: 2rem;
            font-weight: 400;
            color: #fff;
            &::before {
                content: '';
                display: block;
                margin: 0 auto 1rem;
                width: 4rem;
                height: 4rem;
                border: 2rem solid;
                color: #3eaf7c;
                box-sizing: border-box;
                animation: 1s spin, .7s radius, 1.1s colors, 1.3s width;
                animation-timing-function: linear;
                animation-iteration-count: infinite;
            }
        }
    }
</style>
