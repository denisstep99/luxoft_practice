<template>
    <div style="height: 85vh">
        <v-card>
            <swiper :options="swiperOptionTop" class="gallery-top" ref="swiperTop">
                <swiper-slide v-for="image in images" :key="image.link" class="slide-img"
                              v-bind:style="{backgroundImage : `url('${image.link}') `}">
                    <p class="slide-text">{{image.text}}</p>
                </swiper-slide>
            </swiper>
            <swiper :options="swiperOptionThumbs" class="gallery-thumbs" ref="swiperThumbs">
                <swiper-slide v-for="image in images" :key="image.link" class="slide-img"
                              v-bind:style="{backgroundImage : `url('${image.link}')`}"
                >
                    <div class="slide-placeholder" @mouseenter="image.isShown = true"
                         @mouseleave="image.isShown = false">
                        <transition name="fade">
                            <p class="slide-text" v-if="image.isShown && !isTouch">{{image.text}}</p>
                        </transition>
                    </div>
                </swiper-slide>
                <div class="swiper-button-next" slot="button-next"/>
                <div class="swiper-button-prev" slot="button-prev"/>
            </swiper>
        </v-card>
    </div>
</template>
<script> import {swiper} from "vue-awesome-swiper";

export default {
    name: "SliderWidget",
    components: {swiper},
    data: () => ({
        images: [
            {
                link: "https://picsum.photos/id/7/1080/1080",
                text: "Image 1",
                isShown: false
            },
            {
                link: "https://picsum.photos/id/56/1920/1080",
                text: "Image 2",
                isShown: false
            },
            {
                link: "https://picsum.photos/id/92/1080/1080",
                text: "Image 3",
                isShown: false
            },
            {
                link: "https://picsum.photos/id/49/1920/1080",
                text: "Image 4",
                isShown: false
            },
            {
                link: "https://picsum.photos/id/85/1080/1080",
                text: "Image 5",
                isShown: false
            },
            {
                link: "https://picsum.photos/id/5/1920/1080",
                text: "Image 6",
                isShown: false
            },
            {
                link: "https://picsum.photos/id/87/1080/1080",
                text: "Image 7",
                isShown: false
            },
            {
                link: "https://picsum.photos/id/91/1920/1080",
                text: "Image 8",
                isShown: false
            },
            {
                link: "https://picsum.photos/id/90/1080/1080",
                text: "Image 9",
                isShown: false
            },
            {
                link: "https://picsum.photos/id/17/1920/1080",
                text: "Image 10",
                isShown: false
            }
        ],
        isTouch: null,
        swiperOptionTop: {
            spaceBetween: 10,
            touchRatio: 0
        },
        swiperOptionThumbs: {
            spaceBetween: 10,
            slidesPerView: 5,
            touchRatio: 0.5,
            centeredSlides: true,
            slideToClickedSlide: true,
            navigation: {nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev'},
            breakpoints: {
                1024: {
                    slidesPerView: 4,
                },
                640: {
                    slidesPerView: 3,
                },
                320: {
                    slidesPerView: 2,
                }
            }
        }
    }),
    mounted() {
        this.$nextTick(() => {
            const swiperTop = this.$refs.swiperTop.swiper;
            const swiperThumbs = this.$refs.swiperThumbs.swiper;
            swiperTop.controller.control = swiperThumbs;
            swiperThumbs.controller.control = swiperTop;
            this.isTouch = this.touchTest();
        });

    },
    methods: {
        touchTest() {
            if ('ontouchstart' in window ||
                window.DocumentTouch && document instanceof window.DocumentTouch ||
                navigator.maxTouchPoints > 0 ||
                window.navigator.msMaxTouchPoints > 0) {
                return true;
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    .v-card {
        height: 100%;
    }

    .swiper-container {
        background-color: #919191;
    }

    .gallery-top {
        height: calc(80% - 20px) !important;
        width: 100%;
        display: flex;
        align-items: center;

        .swiper-slide {
            background-size: contain;
            background-position: center;
        }
    }


    .gallery-thumbs {
        height: calc(20% + 20px) !important;
        box-sizing: border-box;
        padding: 10px 0;

        .swiper-slide {
            background-size: cover;
            background-position: center;
            box-shadow: 0px 30px 40px rgba(0, 0, 0, 0.1);
            z-index: 2;
        }
        .swiper-slide-active{}
    }

    .gallery-thumbs .swiper-slide {
        width: 25%;
        height: 100%;
    }

    .gallery-thumbs .swiper-slide-active {
        opacity: 1;

    }

    img {
        width: inherit;
        height: inherit;
        padding: 0;
        margin: 0;
    }

    .swiper-button-next {
        height: 30px;
        margin-top: -15px;
    }

    .swiper-button-prev {
        height: 30px;
        margin-top: -15px;
    }


    .slide-text {
        position: absolute;
        bottom: 20px;
        max-width: 50%;
        padding: 7px;
        background: #007aff;
        color: white;
        left: 50%;
        transform: translateX(-50%);
        font-size: 14px;
        opacity: 1;
        z-index: 999;
    }

    .slide-placeholder {
        width: 100%;
        height: 100%;
    }

    p {
        margin: 0;
        padding: 0;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity 200ms;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */
    {
        opacity: 0;
    }

    .wrap {
        width: 100%;
        height: auto;
    }

    @media screen and (max-width: 600px) {
        .swiper-button-next {
            height: 18px;
            margin-top: -9px;
        }
        .swiper-button-prev {
            height: 18px;
            margin-top: -9px;
        }
    }
</style>